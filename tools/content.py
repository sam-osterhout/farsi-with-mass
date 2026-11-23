"""Shared helpers for building course data: Persian items, audio manifest, verb tables.

Every Persian item is a dict {fa, tr, en?, w?, wtr?, audio?}:
  fa  spoken Tehrani script     tr  precise phonetics (ā, i, u, kh, gh, sh, ch, zh, ')
  w   written/formal script     wtr its phonetics
Audio paths are content-hashed so regeneration is idempotent.
"""
import contextlib
import csv
import hashlib
import itertools
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = {}
_voices = itertools.cycle('df')  # d = fa-IR-DilaraNeural, f = fa-IR-FaridNeural


def reset_voices():
    """Start the d/f alternation fresh. Chapter builders call this after build_verbs(),
    so adding verbs to the bank never shifts the voices (and audio hashes) of a chapter."""
    global _voices
    _voices = itertools.cycle('df')


class _Voices:
    """The d/f alternation, counting how many voices it has handed out."""
    def __init__(self, start='d'):
        self._cycle = itertools.cycle('df' if start == 'd' else 'fd')
        self.used = 0

    def __iter__(self):
        return self

    def __next__(self):
        self.used += 1
        return next(self._cycle)


@contextlib.contextmanager
def voice_scope(start='d', advance_outer=False):
    """Build a block with its own d/f alternation, then restore the outer one.
    The verb bank is built this way, so its audio is the same whichever builder runs it.
    advance_outer=True moves the outer alternation on as if the block had used it
    (Chapter 1 was first built that way, and its audio names depend on it)."""
    global _voices
    saved = _voices
    _voices = _Voices(start)
    try:
        yield
    finally:
        used = _voices.used
        _voices = saved
        if advance_outer:
            for _ in range(used):
                next(_voices)


def audio_for(text, voice=None, rate=None):
    voice = voice or next(_voices)
    key = hashlib.sha1(f'{text}|{voice}|{rate or ""}'.encode()).hexdigest()[:12]
    path = f'audio/tts/{key}.mp3'
    entry = {'text': text, 'voice': voice}
    if rate:
        entry['rate'] = rate
    MANIFEST[path] = entry
    return path


def concat(paths, gap=0.5):
    key = hashlib.sha1('|'.join(paths).encode()).hexdigest()[:12]
    path = f'audio/tts/scene_{key}.mp3'
    MANIFEST[path] = {'concat': paths, 'gap': gap}
    return path


def P(fa, tr, en=None, w=None, wtr=None, v=None, rate=None, say=None, audio=True, both=False):
    """A Persian item. both=True also records the other voice (for ear training)."""
    d = {'fa': fa, 'tr': tr}
    if en:
        d['en'] = en
    if w and w != fa:
        d['w'] = w
        d['wtr'] = wtr
    if audio:
        voice = v or next(_voices)
        d['audio'] = audio_for(say or fa, voice, rate)
        if both:
            d['audio2'] = audio_for(say or fa, 'f' if voice == 'd' else 'd', rate)
    return d


# ── Verb tables ────────────────────────────────────────────

PERSONS = [
    {'fa': 'من', 'tr': 'man', 'en': 'I'},
    {'fa': 'تو', 'tr': 'to', 'en': 'you'},
    {'fa': 'او', 'tr': 'u', 'en': 'he / she'},
    {'fa': 'ما', 'tr': 'mā', 'en': 'we'},
    {'fa': 'شما', 'tr': 'shomā', 'en': 'you (formal / plural)'},
    {'fa': 'اونا', 'tr': 'unā', 'en': 'they', 'w': 'آنها', 'wtr': 'ānhā'},
]
SUBJ = ['I', 'you', 'he/she', 'we', 'you (polite/plural)', 'they']


def parts(marked):
    """'{mi}r[am]' -> [['p','mi'],['s','r'],['e','am']]; plain text is stem."""
    out = []
    for m in re.finditer(r'\{([^}]*)\}|\[([^\]]*)\]|([^{\[]+)', marked):
        if m.group(1) is not None:
            out.append(['p', m.group(1)])
        elif m.group(2) is not None:
            out.append(['e', m.group(2)])
        else:
            out.append(['s', m.group(3)])
    return out


def plain(marked):
    return ''.join(t for _, t in parts(marked))


def form(fa, trm, w=None, wtrm=None, en=None, prefix=None, voice=None):
    """One conjugated form. prefix = (fa, tr) of a compound's first word."""
    p = parts(trm)
    if prefix:
        fa = prefix[0] + ' ' + fa
        w = prefix[0] + ' ' + (w or fa.split(' ', 1)[1])
        p = [['w', prefix[1] + ' ']] + p
        wtrm = prefix[1] + ' ' + (wtrm or trm)
    d = {'fa': fa, 'tr': ''.join(t for _, t in p), 'trp': p}
    if en:
        d['en'] = en
    if w and w != fa:
        d['w'] = w
        d['wtr'] = plain(wtrm) if wtrm else None
    d['audio'] = audio_for(fa, voice)
    return d


def _rows(spec):
    """Parse 'fa | trmarked | w | wtrmarked' lines."""
    rows = []
    for line in spec.strip().splitlines():
        cells = [c.strip() for c in line.split('|')]
        while len(cells) < 4:
            cells.append('')
        rows.append(cells)
    return rows


def neg_marked(trm, prefix):
    p = parts(trm)
    if p and p[0][0] == 'p':
        p[0][1] = prefix + p[0][1]
    else:
        p.insert(0, ['p', prefix])
    return ''.join('{%s}' % t if k == 'p' else '[%s]' % t if k == 'e' else t for k, t in p)


def en_present(i, base, third, neg=False, be=None):
    if be:
        verb = ['am', 'are', 'is', 'are', 'are', 'are'][i]
        return f"{SUBJ[i]} {verb}{' not' if neg else ''} {be}"
    if neg:
        return f"{SUBJ[i]} {'doesn’t' if i == 2 else 'don’t'} {base}"
    return f"{SUBJ[i]} {third if i == 2 else base}"


def en_past(i, base, past, neg=False, be=None):
    if be:
        verb = 'was' if i in (0, 2) else 'were'
        return f"{SUBJ[i]} {verb}{' not' if neg else ''} {be}"
    return f"{SUBJ[i]} didn’t {base}" if neg else f"{SUBJ[i]} {past}"


def table(base, en, prefix=None, imp_spec=None, neg_present_spec=None, neg_past_spec=None, be=None, en_forms=None):
    """Build present/past/imperative (+ negatives) for one verb or compound.

    base: dict with 'present','past','imp' spec strings (fa | tr | w | wtr).
          Leave out 'imp' for a verb with no everyday command (tunestan, dāshtan).
    en: (base, third, past) English, e.g. ('go', 'goes', 'went').
    en_forms: {tense: [English per row]} for verbs English can't conjugate regularly (can / could).
    """
    b, third, past = en
    out = {'present': [], 'past': [], 'imperative': [], 'neg_present': [], 'neg_past': []}
    for i, (fa, trm, w, wtrm) in enumerate(_rows(base['present'])):
        out['present'].append(form(fa, trm, w or None, wtrm or None, en_present(i, b, third, be=be), prefix))
    for i, (fa, trm, w, wtrm) in enumerate(_rows(base['past'])):
        out['past'].append(form(fa, trm, w or None, wtrm or None, en_past(i, b, past, be=be), prefix))
    if neg_present_spec:
        rows = _rows(neg_present_spec)
    else:
        rows = [('ن' + fa, neg_marked(trm, 'ne'), ('ن' + w) if w else '', neg_marked(wtrm, 'ne') if wtrm else '')
                for fa, trm, w, wtrm in _rows(base['present'])]
    for i, (fa, trm, w, wtrm) in enumerate(rows):
        out['neg_present'].append(form(fa, trm, w or None, wtrm or None, en_present(i, b, third, neg=True, be=be), prefix))
    if neg_past_spec:
        rows = _rows(neg_past_spec)
    else:
        rows = [('ن' + fa, neg_marked(trm, 'na'), ('ن' + w) if w else '', neg_marked(wtrm, 'na') if wtrm else '')
                for fa, trm, w, wtrm in _rows(base['past'])]
    for i, (fa, trm, w, wtrm) in enumerate(rows):
        out['neg_past'].append(form(fa, trm, w or None, wtrm or None, en_past(i, b, past, neg=True, be=be), prefix))
    imp_en = [f'{b}!', f'{b}! (polite, or to more than one)', f'don’t {b}!', f'don’t {b}! (polite, or to more than one)']
    if be:
        imp_en = [f'be {be}!', f'be {be}! (polite, or to more than one)', f'don’t be {be}!', f'don’t be {be}! (polite, or to more than one)']
    imp = imp_spec or base.get('imp')
    if imp:
        for i, (fa, trm, w, wtrm) in enumerate(_rows(imp)):
            out['imperative'].append(form(fa, trm, w or None, wtrm or None, imp_en[i], prefix))
    for tense, labels in (en_forms or {}).items():
        for f, label in zip(out[tense], labels):
            f['en'] = label
    return out


CSV_COLUMNS = ['id', 'mango_set', 'theme', 'english', 'persian_written', 'mango_pronunciation', 'persian_spoken',
               'spoken_pronunciation', 'note', 'also_in_sets', 'chapter', 'source']


def sync_word_list(words, chapter, theme):
    """Append a chapter's new words to farsi_word_list.csv (the master list).
    Rows already in the list, matched by id, are left as they are."""
    path = os.path.join(ROOT, 'farsi_word_list.csv')
    with open(path, encoding='utf-8-sig') as f:
        have = {row['id'] for row in csv.DictReader(f)}
    added = 0
    with open(path, 'a', encoding='utf-8', newline='') as f:
        out = csv.writer(f, lineterminator='\n')
        for w in words:
            if str(w['id']) in have:
                continue
            out.writerow([w['id'], '', theme, w['en'], w.get('w') or w['fa'], '', w['fa'], w['tr'],
                          w.get('note', ''), '', chapter, 'course'])
            added += 1
    print(f'word list: {added} new rows')


def write_json(rel, data):
    path = os.path.join(ROOT, rel)
    with open(path, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print('wrote', rel)


def save_manifest():
    path = os.path.join(ROOT, 'data', 'audio-manifest.json')
    existing = {}
    if os.path.exists(path):
        existing = json.load(open(path))
    existing.update(MANIFEST)
    with open(path, 'w') as f:
        json.dump(existing, f, ensure_ascii=False, indent=1)
    print(f'manifest: {len(MANIFEST)} entries this build, {len(existing)} total')
