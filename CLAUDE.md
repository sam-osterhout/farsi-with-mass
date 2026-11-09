# Farsi course

A course for Sam to learn spoken Persian (Farsi) well enough to hold real conversations with his wife, Massoumeh (Mass), who is a native speaker. This file sets the rules for every chapter and for the app that runs them. Read it before writing content or code.

## The learner

- Has finished 20 vocabulary sets in Mango Languages. Every word he's seen is in `farsi_word_list.csv` (about 750 words).
- Reads Persian script. Prefers real text without vowel marks.
- Still uses Mango for review and listening, but it has gone stale. He recalls words by their place in Mango's lists rather than as living language. The course has to break that habit.
- Wants more listening practice and more off-the-cuff speaking and thinking.
- Studies 20 minutes a day on his laptop (sometimes up to 45). Would also like flashcards and listening on his iPhone.
- Talks with Mass in Farsi every day. She takes part only in those conversations and does no preparation or checking.

## Language rules

- **Spoken Tehrani Persian comes first.** Teach the form people actually say (می‌ریم, خونه, می‌خوام) as the main form. Show the written/formal form next to it when it differs, labeled as written.
- **English support fades over the course:**
  - Chapters 1–8: every Persian line shows the script, a pronunciation in English letters, and an English translation. All instructions are in English.
  - Chapters 9–16: the script and English translation. Pronunciation appears only for new words.
  - Chapters 17 on: Persian only, with English shown on request. Instructions stay in English until Sam asks otherwise.
- **Pronunciation spelling** follows the style Mango uses, so it's familiar: `ah` for the long a (خانه = khooneh, باشه = bahsheh), `a` for the short a, `ee`, `oo`, `e`, `o`, `kh`, `gh`, `zh`, and `'` for a glottal stop. No capital letters for stress.

## Vocabulary rules

- `farsi_word_list.csv` is the master list. Every chapter adds its new words to it, along with words Mass teaches in conversation, which Sam logs in the app.
- Columns: `id, mango_set, theme, english, persian_written, mango_pronunciation, persian_spoken, spoken_pronunciation, note, also_in_sets`. New rows also need `chapter` (the chapter that introduced the word) and `source` (mango, course, or mass).
- Each chapter introduces 15–20 new words. All other Persian in the chapter uses only known words. Check every chapter against the list before it's finished.
- Never present words in a fixed order. Shuffle drills, and use words inside new sentences rather than lists.
- Older words come back on a spaced-repetition schedule and are mixed into every chapter's exercises.
- The spoken forms in the list were written by Claude and haven't been checked by a native speaker. If Sam reports that Mass says something differently, update the list.

## Chapter structure

One chapter covers one week: five laptop sessions of about 20 minutes, a weekend review, and seven conversation cards, one for each day.

Each chapter has these sections:

- **Words.** 15–20 new words with audio, plus review words due that day.
- **Grammar.** One main point, shown in real sentences. Spoken forms first.
- **Listening.** Audio first and text after. Includes dictation (hear it, type it), slowed playback, and comprehension questions.
- **Speaking.** Unscripted prompts. A question plays and Sam answers aloud within a time limit; he describes a picture or talks for a minute on a topic. No model answer is shown until afterward.
- **Reading and writing.** Short texts without vowel marks, handwriting practice (printable), and typing on a Persian keyboard.
- **Story.** One episode of a serialized story with recurring characters, written only with known words and listened to before it's read.
- **Culture.** Taarof, food, holidays (Yalda on December 21, Nowruz), Hafez and fal-e Hafez, family customs. Tie to the chapter's theme where possible.
- **Conversation cards for Mass.** One per day. Each card has a topic, three or four questions Sam can open with, the chapter's words and phrases to try to use, and one line in English telling Mass what he's practicing. Afterward Sam logs new words she used, and they join the master list.

## Chapter themes

Keep the themes in the household, family, and scheduling situations Sam deals with every day. Early chapters should consolidate the Mango vocabulary in spoken form before adding much that's new.

## Audio

- Generate an mp3 for every word, sentence, dialogue line, and story episode using Microsoft's Persian neural voices through the `edge-tts` Python package (`fa-IR-DilaraNeural` and `fa-IR-FaridNeural`; alternate them so Sam hears two voices).
- Feed the voices the spoken spelling so they read casual speech. Listen for words they mispronounce and note them.
- Store audio under `audio/` with filenames keyed by word id or sentence id so it can be regenerated.

## The app

- One web app that serves every chapter. Chapter content lives in data files (one JSON file per chapter), not in hand-written pages.
- Works on a laptop and on an iPhone. Lessons are built for the laptop; flashcards and listening drills also work well on a phone.
- Progress and spaced-repetition state are stored in the browser for now. Hosting it online (e.g. GitHub Pages) lets the phone open it too.
- Design system carried over from earlier lessons: Persian blue, turquoise, coral, and sand; Vazirmatn for Persian text; Crimson Pro and DM Sans for English text.
- Keep printable worksheets (tracing and writing) available for each chapter as PDFs.

## Files

- `farsi_word_list.csv`: master vocabulary list
- `CLAUDE.md`: this file
- Mango screenshots: the source for the word list. Some lists were cut off at the top or bottom, so a few Mango words may be missing.
