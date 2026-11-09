"""Generate audio for Chapter 1 words and sentences using edge-tts."""
import asyncio
import edge_tts
import os

FEMALE = "fa-IR-DilaraNeural"
MALE = "fa-IR-FaridNeural"

AUDIO_DIR = "audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

async def gen(text, voice, filename):
    path = os.path.join(AUDIO_DIR, filename)
    if os.path.exists(path):
        return
    comm = edge_tts.Communicate(text, voice)
    await comm.save(path)
    print(f"  {filename}")

async def main():
    tasks = []

    # New words (alternate voices: odd=female, even=male)
    words = [
        (1001, "گشنه"),
        (1002, "تشنه"),
        (1003, "خوشحال"),
        (1004, "ناراحت"),
        (1005, "خسته"),
        (1006, "بیدار"),
        (1007, "بیا"),
        (1008, "برو"),
        (1009, "بشین"),
        (1010, "بلند شو"),
        (1011, "صبر کن"),
        (1012, "ببین"),
        (1013, "دوباره"),
        (1014, "یه کم"),
        (1015, "حوصله"),
        (1016, "عجله"),
        (1017, "صبحونه"),
    ]

    print("Words:")
    for wid, text in words:
        voice = FEMALE if wid % 2 == 1 else MALE
        tasks.append(gen(text, voice, f"word_{wid}.mp3"))

    # Grammar examples (alternate voices)
    grammar = [
        ("ch1_gram_1.mp3", "بیا اینجا", FEMALE),
        ("ch1_gram_2.mp3", "برو دستاتو بشور", MALE),
        ("ch1_gram_3.mp3", "بشین صبحونه بخور", FEMALE),
        ("ch1_gram_4.mp3", "بلند شو دیر شده", MALE),
        ("ch1_gram_5.mp3", "صبر کن الان میام", FEMALE),
        ("ch1_gram_6.mp3", "ببین چی درست کردم", MALE),
        ("ch1_gram_7.mp3", "عجله نکن", FEMALE),
        ("ch1_gram_8.mp3", "دوباره بگو", MALE),
    ]

    print("\nGrammar examples:")
    for fname, text, voice in grammar:
        tasks.append(gen(text, voice, fname))

    # Dialogue lines (Mass=female, Sam=male)
    dialogue = [
        ("ch1_dial_1.mp3", "صبح بخیر! بیدار شو.", FEMALE),
        ("ch1_dial_2.mp3", "صبح بخیر، خسته ام.", MALE),
        ("ch1_dial_3.mp3", "بلند شو صبحونه حاضره.", FEMALE),
        ("ch1_dial_4.mp3", "صبر کن یه کم.", MALE),
        ("ch1_dial_5.mp3", "بیا چای بخور. تشنه نیستی؟", FEMALE),
        ("ch1_dial_6.mp3", "آره ممنون. گشنمم.", MALE),
        ("ch1_dial_7.mp3", "بشین الان میارم.", FEMALE),
        ("ch1_dial_8.mp3", "خوشحالم ممنون.", MALE),
    ]

    # Full dialogue
    full_dialogue = " ".join(t for _, t, _ in dialogue)
    tasks.append(gen(full_dialogue, FEMALE, "ch1_dialogue.mp3"))

    print("\nDialogue lines:")
    for fname, text, voice in dialogue:
        tasks.append(gen(text, voice, fname))

    # Dictation
    dictation = [
        ("ch1_dict_1.mp3", "بلند شو", FEMALE),
        ("ch1_dict_2.mp3", "من گشنمه", MALE),
        ("ch1_dict_3.mp3", "صبر کن", FEMALE),
        ("ch1_dict_4.mp3", "بیا اینجا", MALE),
    ]

    print("\nDictation:")
    for fname, text, voice in dictation:
        tasks.append(gen(text, voice, fname))

    # Speaking prompts
    tasks.append(gen("صبح بخیر! حالت چطوره؟ صبحونه خوردی؟", FEMALE, "ch1_speak_prompt_1.mp3"))

    # Story
    story_lines = [
        "صبح بود. خونه ساکت بود.",
        "بلند شو! صبح بخیر!",
        "صبح بخیر، خسته ام.",
        "بیا صبحونه بخور. گشنه نیستی؟",
        "آره خیلی گشنمه. چای هم هست؟",
        "آره بشین. الان میارم.",
        "سام نشست. چای خورد. خوشحال بود.",
        "ممنون! خوشحالم.",
        "خواهش می کنم. عجله نکن.",
    ]
    full_story = " ".join(story_lines)
    tasks.append(gen(full_story, FEMALE, "ch1_story.mp3"))

    print("\nStory + full dialogue + speaking prompts")

    await asyncio.gather(*tasks)
    print("\nDone! All audio generated.")

asyncio.run(main())
