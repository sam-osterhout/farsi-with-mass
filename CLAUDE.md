# Farsi course

A course for Sam to learn spoken Persian (Farsi) well enough to hold real conversations with his wife, Massoumeh (Mass), and to read and write by summer 2027. This file sets the rules for every chapter and for the app that runs them. Read it before writing content or code.

## The learner

- A writer by trade. Loves verbs, structure, the sound of words, and where words come from (hamsar = ham "same" + sar "head"). Give him the whole system, not just the piece the lesson needs.
- Has finished 20 vocabulary sets in Mango Languages. Every word he's seen is in `farsi_word_list.csv` (about 775 words).
- **Can't read Persian script yet.** He learned the alphabet in early 2026 and forgot it. Never put Persian in front of him without phonetics (see Language rules).
- His ear for Farsi is weak. Listening has to be trained on purpose, not just exposed.
- Loves quizzes. Loves writing by hand. Wants the course to live in his paper notebook and in the kitchen as well as in the app.
- Studies 20 minutes a day on his laptop (sometimes up to 45). Uses his iPhone for flashcards and listening.
- Talks with Mass in Farsi every day. She was born in Tehran and speaks kitchen-table Farsi with slang. She can't read script either. She takes part only in conversations and does no preparation.
- Wants to teach his American daughters to speak (not read yet). Their ages aren't recorded here; ask before tuning activities to an age.
- Dream: whisper-gossip with Mass in public, in Farsi. A thread of "gossip kit" phrases runs through the course.

## Language rules

- **Spoken Tehrani Persian comes first.** Teach the form people actually say (می‌ریم, خونه, می‌خوام) as the main form. Show the written/formal form next to it when it differs, labeled as written.
- **Phonetics on every Persian word and sentence, always.** That includes quiz prompts, answer options, verb tables, chips, cards, and stories. The only exceptions are reading tests, where hiding the phonetics is the test (read-it questions, secret messages).
- **Phonetics fade by letter, not by chapter.** The app knows which letters Sam has learned. Words made only of learned letters get a "you can read this" mark, and an optional setting hides their phonetics behind a tap. Never remove phonetics wholesale.
- **Precise phonetic style** (Sam chose this over Mango style): `ā` for the long a (bidār, khune), `a` for the short a, `i`, `u`, `e`, `o`, `ey`, `ow`, `kh`, `gh` (for both ق and غ), `sh`, `ch`, `zh`, `'` for a glottal stop. Lowercase, no stress marks. Use hyphens only for clarity (khaste-am, nun-o panir). `data/words.json` has a `tr` field converted from Mango spelling by `tools/convert_pron.py`; hand corrections go in its `OVERRIDES`.
- **English support fades slowly:** English translation on everything through Chapter 16; from Chapter 17, English on request. Instructions stay in English until Sam asks otherwise.
- **No typing in Persian script.** Sam has no Persian keyboard. "Type what you hear" answers are typed in English letters and checked loosely.
- **No unscripted speaking prompts until Chapter 5.** Until then, speaking is shadowing (repeat after the voice, record, compare) and conversation cards.

## Vocabulary rules

- `farsi_word_list.csv` is the master list (the copy at `~/Desktop/Farsi/farsi_word_list.csv` is kept in sync). Every chapter adds its new words to it, along with words Mass teaches in conversation, which Sam logs in the app.
- Columns: `id, mango_set, theme, english, persian_written, mango_pronunciation, persian_spoken, spoken_pronunciation, note, also_in_sets, chapter, source` (source is mango, course, or mass).
- Each chapter introduces 15–20 new words. Other Persian in a chapter should use known words; when a scene needs an unknown word, give it phonetics and meaning like everything else. Look up review words by their Persian spelling, not by remembered ids.
- Never present words in a fixed order. Shuffle drills, and use words inside sentences rather than lists.
- Every lesson opens with a retrieval warm-up of older words that feeds the spaced-repetition schedule.
- The spoken forms (in the list and in `tools/verbs.py`) were written by Claude and haven't been checked by a native speaker. If Sam reports that Mass says something differently, update the source and rebuild.

## Course shape

`data/course.json` is the map: 30 chapters in four seasons (house; out in the world; spring; summer), from the week of Nov 16, 2026 to June 2027, with milestones. Keep it current when chapters change. Every chapter runs six tracks:

- **Talk.** One household scene per day (audio first, English hidden until tapped), a conversation card for Mass each day, and two weekend cards. Topics: schedules, work, this week and last week, plans and travel, food and the kitchen, family and in-laws, feelings and arguments, gossip in public.
- **Verb lab.** Full tables for every verb taught: present, past, and command, all six persons (man, to, u, mā, shomā, unā), with a negative toggle and written forms on request. Compounds share a table with tabs (boland shodan / bidār shodan / shodan), so Sam sees that only the light verb changes. Each verb has a short "story" for a writer: stems, quirks, etymology. Tenses are added to the tables as the course reaches them.
- **Ear gym.** Minimal pairs in both voices, then test rounds; spoken-vs-written rule cards (ān→un, -ad→-e); shadowing with recording; mixed review on day 5.
- **Reading & writing.** 10 letters a week in shape families (Chapter 1: ا آ ب پ ت ث ن ی د ر و; then ذ ز ژ ج چ ح خ س ش م; then ص ض ط ظ ع غ ف ق ک گ; then ل ه and the extras), so the alphabet is done by mid-December. Letter examples may use only letters already taught. Then decoding, real texts, and writing.
- **Word stories & verse.** Root families (bin-, ham-, -gāh, -stān…) and one line of poetry per chapter, glossed word by word.
- **Home.** Teach the girls (games, routines, speaking only), kitchen labels to print and tape up, the gossip kit.

Each day also has **In your notebook**: 10 minutes of paper tasks, with a printable tracing sheet for that day.

## Building content

- Chapter content lives in `data/chapter-N.json`, generated by a Python builder (`tools/build_ch1.py` for Chapter 1; copy its pattern for new chapters). Don't hand-edit the JSON.
- `tools/content.py` holds the helpers: `P(fa, tr, en, w=, wtr=)` makes a Persian item with audio; `table()` builds verb tables from row specs.
- `tools/verbs.py` is the verb bank, written as rows of `spoken script | spoken phonetics | written script | written phonetics`, with phonetics markup `{prefix}stem[ending]`. The builder writes `data/verbs.json`.
- Step types the app renders: warmup, listen, story, words, verbs, ear, rule, earmix, script, secret, shadow, check, verbgym, notebook, talk, teach, gossip, verse, roots, massvoice. Question types: mc, listen, read, type, build, conj (conj is generated from the verb bank).
- Building also writes `data/audio-manifest.json`.

## Audio

- Generate every clip with `.venv/bin/python tools/gen_audio.py`, which reads the manifest, makes only missing files, normalizes to -16 LUFS, and stitches scene files. It uses Microsoft's Persian neural voices through `edge-tts`: `fa-IR-DilaraNeural` (d) and `fa-IR-FaridNeural` (f). Mass's lines use Dilara and Sam's use Farid; everything else alternates. Ear-training pairs record both voices.
- Filenames are content hashes (`audio/tts/<hash>.mp3`), so rebuilding is idempotent and regeneration is safe.
- Feed the voices the spoken spelling. Listen for mispronunciations and note them here.

## The app

- One static web app (`index.html`, `app.js`, `style.css`), no build step, serving every chapter from the data files. Routes: `#dashboard`, `#map`, `#chapter/N`, `#chapter/N/day/D`, `#flashcards`, `#wordlog`, `#print/N/D` (tracing sheet), `#labels/N` (kitchen labels).
- All Persian is drawn through `fa()` / `faChip()` in `app.js`, which attach phonetics and audio. Don't render Persian any other way.
- Works on a laptop and on an iPhone. Progress, spaced-repetition state, and settings live in localStorage (prefix `farsi_`). Hosted on GitHub Pages at https://sam-osterhout.github.io/farsi-with-mass/.
- Design: Persian blue, turquoise, coral, and sand; Vazirmatn for Persian; Crimson Pro and DM Sans for English.

## Files

- `farsi_word_list.csv`: master vocabulary list
- `data/`: words, verbs, course map, chapters, audio manifest
- `tools/`: builders, audio generator, phonetics converter
- `CLAUDE.md`: this file
- `mango-screenshots/` (not in git): the source for the word list. Some lists were cut off, so a few Mango words may be missing.
