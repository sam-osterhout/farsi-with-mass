"""Generate every mp3 listed in data/audio-manifest.json that doesn't exist yet.

Voices: d = fa-IR-DilaraNeural, f = fa-IR-FaridNeural. Audio is normalized to -16 LUFS.
Run: .venv/bin/python tools/gen_audio.py
"""
import asyncio
import json
import os
import subprocess
import tempfile

import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICES = {'d': 'fa-IR-DilaraNeural', 'f': 'fa-IR-FaridNeural'}
CONCURRENCY = 6


def normalize(path):
    tmp = path + '.tmp.mp3'
    try:
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', path, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
                        '-ar', '24000', '-b:a', '48k', tmp], check=True)
        os.replace(tmp, path)
    except (subprocess.CalledProcessError, FileNotFoundError):
        if os.path.exists(tmp):
            os.remove(tmp)


async def speak(rel, entry, sem):
    path = os.path.join(ROOT, rel)
    async with sem:
        for attempt in range(3):
            try:
                kwargs = {'rate': entry['rate']} if entry.get('rate') else {}
                await edge_tts.Communicate(entry['text'], VOICES[entry['voice']], **kwargs).save(path)
                await asyncio.to_thread(normalize, path)
                return
            except Exception as e:  # network hiccups
                if attempt == 2:
                    print('FAILED', rel, entry['text'], e)
                await asyncio.sleep(2)


def join(rel, entry):
    path = os.path.join(ROOT, rel)
    with tempfile.TemporaryDirectory() as tmp:
        silence = os.path.join(tmp, 'gap.mp3')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono',
                        '-t', str(entry.get('gap', 0.5)), '-b:a', '48k', silence], check=True)
        listing = os.path.join(tmp, 'list.txt')
        with open(listing, 'w') as f:
            for i, part in enumerate(entry['concat']):
                if i:
                    f.write(f"file '{silence}'\n")
                f.write(f"file '{os.path.join(ROOT, part)}'\n")
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listing,
                        '-ar', '24000', '-ac', '1', '-b:a', '48k', path], check=True)


async def main():
    manifest = json.load(open(os.path.join(ROOT, 'data', 'audio-manifest.json')))
    os.makedirs(os.path.join(ROOT, 'audio', 'tts'), exist_ok=True)
    todo = {k: v for k, v in manifest.items() if 'text' in v and not os.path.exists(os.path.join(ROOT, k))}
    print(f'{len(todo)} clips to generate')
    sem = asyncio.Semaphore(CONCURRENCY)
    await asyncio.gather(*(speak(k, v, sem) for k, v in todo.items()))
    for k, v in manifest.items():
        if 'concat' in v and not os.path.exists(os.path.join(ROOT, k)):
            join(k, v)
            print('scene', k)
    missing = [k for k in manifest if not os.path.exists(os.path.join(ROOT, k))]
    print('done;', len(missing), 'missing')


if __name__ == '__main__':
    asyncio.run(main())
