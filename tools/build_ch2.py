"""Build Chapter 2 ("Our day"), the verb bank, and the audio manifest.

Run from the project root:  python3 tools/build_ch2.py
Then generate audio:          .venv/bin/python tools/gen_audio.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content import P, PERSONS, concat, write_json, save_manifest, reset_voices, sync_word_list, ROOT  # noqa: E402
from verbs import build_verbs  # noqa: E402

WORDS = json.load(open(os.path.join(ROOT, 'data', 'words.json')))
CH1_LETTERS = ['ا', 'آ', 'ب', 'پ', 'ت', 'ث', 'ن', 'ی', 'د', 'ر', 'و']


def wid(fa):
    """Id of a word Sam already has, looked up by its Persian spelling."""
    for key in ('persian_spoken', 'persian_written'):
        for w in WORDS:
            if w.get(key) == fa:
                return w['id']
    raise KeyError(fa)


def word(id_, fa, tr, en, w=None, wtr=None, root=None, ex=None, new=True):
    d = {'id': id_, 'isNew': new, **P(fa, tr, en, w=w, wtr=wtr)}
    if root:
        d['root'] = root
    if ex:
        d['example'] = ex
    return d


def review(fa, tr, en, w=None, wtr=None):
    return word(wid(fa), fa, tr, en, w=w, wtr=wtr, new=False)


def scene(lines):
    """lines: (speaker, fa, tr, en). Mass = Dilara, Sam = Farid."""
    out = []
    for spk, fa, tr, en in lines:
        item = P(fa, tr, en, v={'Mass': 'd', 'Sam': 'f'}.get(spk, 'd'))
        if spk:
            item['speaker'] = spk
        out.append(item)
    return out, concat([l['audio'] for l in out], gap=0.6)


def pair(a, b, contrast):
    return {'a': P(*a, both=True), 'b': P(*b, both=True), 'contrast': contrast}


def conj(verb, variant, tense, person):
    return {'type': 'conj', 'verb': verb, 'variant': variant, 'tense': tense, 'person': person}


def opt(fa, tr, en=None):
    return P(fa, tr, en, audio=False)


def read_q(fa, answer, others):
    return {'type': 'read', 'item': P(fa, answer), 'options': [answer] + others, 'answer': 0}


def letter(ch, name, sound, forms, connects, tip, examples):
    return {'ch': ch, 'name': name, 'sound': sound, 'forms': forms, 'connects': connects, 'tip': tip,
            'examples': [P(*e) for e in examples]}


JOINS = lambda ch: {'initial': ch + 'ـ', 'medial': 'ـ' + ch + 'ـ', 'final': 'ـ' + ch, 'isolated': ch}  # noqa: E731
NOJOIN = lambda ch: {'isolated': ch, 'final': 'ـ' + ch}  # noqa: E731


# ── Words ──────────────────────────────────────────────────
NEW = [
    # Day 1: what time is it?
    word(1019, 'وقت', 'vaght', 'time', root='From Arabic. Vaght dāri? is “do you have time?”, and vaght-e shām is dinner time.',
         ex=P('وقت داری؟', 'vaght dāri?', 'Do you have time?')),
    word(1020, 'کی', 'key', 'when?', root='Spelled exactly like ki (who?): کی. Only the vowel and the context tell them apart. Key miyāy? When are you coming? Ki miyād? Who’s coming?',
         ex=P('کی میای خونه؟', 'key miyāy khune?', 'When are you coming home?')),
    word(1021, 'نیم', 'nim', 'half', root='Clock times add -o nim, “and a half”: haft-o nim is 7:30. A nimru (half-face) is a fried egg, sunny side up.',
         ex=P('ساعت هفت و نیمه.', 'sā’at haft-o nime.', 'It’s seven thirty.')),
    word(1022, 'ربع', 'rob’', 'quarter (of an hour)', root='Arabic for one fourth. Listen for the catch at the end: rob’. Se-o rob’ is 3:15.',
         ex=P('یه ربع صبر کن.', 'ye rob’ sabr kon.', 'Wait a quarter of an hour.')),
    word(1023, 'ظهر', 'zohr', 'noon', root='Also the name of the noon prayer. Ba’d az zohr, “after noon,” is the afternoon, the same idea as English.',
         ex=P('ظهر میای خونه؟', 'zohr miyāy khune?', 'Are you coming home at noon?')),
    word(1024, 'هفته', 'hafte', 'week', root='From haft, seven: a seven-ness. Careful: sā’at hafte means “it’s seven o’clock” (haft + -e, is). Same sound, different words.',
         ex=P('این هفته خیلی کار دارم.', 'in hafte kheyli kār dāram.', 'I have a lot of work this week.')),
    # Day 2: at work
    word(1025, 'سر کار', 'sar-e kār', 'at work', root='Literally “at the head of the work.” Sar (head) is everywhere: hamsar, and saram sholughe, “my head is crowded,” I’m swamped.',
         ex=P('سر کاری؟', 'sar-e kāri?', 'Are you at work?')),
    word(1026, 'جلسه', 'jalase', 'meeting', root='From the Arabic for “to sit”: a sitting.',
         ex=P('ساعت ده جلسه دارم.', 'sā’at-e dah jalase dāram.', 'I have a meeting at ten.')),
    word(1027, 'معمولاً', 'ma’mulan', 'usually', root='The -an ending, written with a little double stroke over the alef (ـاً), makes adverbs out of Arabic words: ma’mulan (usually), ba’dan (later), masalan (for example).',
         ex=P('معمولاً ساعت شش میام خونه.', 'ma’mulan sā’at-e shish miyām khune.', 'I usually come home at six.')),
    word(1028, 'هیچ‌وقت', 'hichvaght', 'never', root='hich (none) + vaght (time): no-time. Persian doubles the negative: hichvaght nemiyād, literally “he no-time doesn’t come,” is “he never comes.”',
         ex=P('هیچ‌وقت دیر نمیاد.', 'hichvaght dir nemiyād.', 'He’s never late. (he never comes late)')),
    word(1029, 'خسته نباشی', 'khaste nabāshi', 'well done; welcome back (to someone who’s been working)',
         root='Literally “may you not be tired.” You say it to anyone who has been working: at the door after work, to a cashier, to a plumber. The answer is salāmat bāshi, “may you be well.”',
         ex=P('خسته نباشی! سلامت باشی.', 'khaste nabāshi! salāmat bāshi.', 'Well done today! Thanks, you too.')),
    # Day 3: pickups
    word(1030, 'مدرسه', 'madrese', 'school', root='From the Arabic for “to study”: the place of study. The same root gives dars, a lesson.',
         ex=P('مدرسه ساعت سه تعطیل می‌شه.', 'madrese sā’at-e se ta’til mishe.', 'School gets out at three.')),
    word(1031, 'دنبال', 'donbāl', 'after; going to get (someone)', root='Literally “the tail end, following.” Miram donbāl-e bachchehā, “I’m going after the kids,” is how Persian says I’ll pick up the kids.',
         ex=P('می‌رم دنبال بچه‌ها.', 'miram donbāl-e bachchehā.', 'I’m going to pick up the kids.')),
    word(1032, 'ماشین', 'māshin', 'car', root='From French machine. In Persian, the machine is the car.',
         ex=P('ماشین کجاست؟', 'māshin kojāst?', 'Where’s the car?')),
    word(1033, 'ترافیک', 'terāfik', 'traffic', root='Tehran’s traffic is legendary, so this word gets a lot of use. Persian doesn’t start a syllable with two consonants, so tr gets an e: te-rāfik.',
         ex=P('ترافیکه!', 'terāfike!', 'There’s traffic! (it’s traffic)')),
    # Day 4: the turkey
    word(1034, 'سه‌شنبه', 'seshanbe', 'Tuesday', root='se (three) + shanbe (Saturday): the third day after Saturday. The whole system is Day 5’s word story.',
         ex=P('سه‌شنبه جلسه دارم.', 'seshanbe jalase dāram.', 'I have a meeting on Tuesday.')),
    word(1035, 'پنج‌شنبه', 'panjshanbe', 'Thursday', root='panj (five) + shanbe. In Iran the weekend is Thursday and Friday, so Thursday night is the big night out.',
         ex=P('پنج‌شنبه خونه‌ای؟', 'panjshanbe khune-i?', 'Are you home on Thursday?')),
    word(1036, 'بوقلمون', 'bughalamun', 'turkey', root='The word also means chameleon, or anything that changes color. The turkey got it for its wattles, which flush red, blue, and white.',
         ex=P('بوقلمون دوست داری؟', 'bughalamun dust dāri?', 'Do you like turkey?')),
    word(1037, 'حرف', 'harf', 'talk; a word; a letter', root='Harf zadan, “to strike words,” is to talk. Harf-e mardom, people’s talk, is gossip. And every letter you’re learning is a harf.',
         ex=P('حرف نزن!', 'harf nazan!', 'Hush! (don’t talk)')),
]
NEW_IDS = {w['tr']: w['id'] for w in NEW}

REVIEW = [
    review('ساعت', 'sā’at', 'hour; clock; o’clock'),
    review('امروز', 'emruz', 'today'),
    review('شام', 'shām', 'dinner'),
    review('همیشه', 'hamishe', 'always'),
    review('شلوغ', 'sholugh', 'busy; crowded'),
    review('فردا', 'fardā', 'tomorrow'),
    review('کار', 'kār', 'work'),
    review('بچه', 'bachche', 'child'),
    review('تعطیل', 'ta’til', 'closed; off (school, work)'),
    review('کجا', 'kojā', 'where'),
    review('مهمون', 'mehmun', 'guest', w='مهمان', wtr='mehmān'),
    review('شاید', 'shāyad', 'maybe'),
    review('خیلی', 'kheyli', 'very; a lot'),
    review('شنبه', 'shanbe', 'Saturday'),
    review('یکشنبه', 'yekshanbe', 'Sunday'),
    review('دوشنبه', 'doshanbe', 'Monday'),
    review('چهارشنبه', 'chāharshanbe', 'Wednesday'),
    review('جمعه', 'jome', 'Friday'),
]
RID = {r['tr']: r['id'] for r in REVIEW}


# ── Letters ────────────────────────────────────────────────
L_ZE = letter('ز', 'ze', 'z', NOJOIN('ز'), False,
              'Re with a dot on top: the same short slide below the line, and like re it never joins forward.',
              [('روز', 'ruz', 'day'), ('زود', 'zud', 'early; quick')])
L_ZAL = letter('ذ', 'zāl', 'z (in words from Arabic)', NOJOIN('ذ'), False,
               'Dāl with a dot. In Arabic it’s the th of “this”; Persian says plain z. It’s rare. Recognize it, don’t sweat it.',
               [('ذرت', 'zorrat', 'corn')])
L_ZHE = letter('ژ', 'zhe', 'zh, like the s in “measure”', NOJOIN('ژ'), False,
               'Re with three dots. Arabic has no zh, so Persian added dots to make one, the way it did for p. With ژ you’ve met all seven letters that never join forward: ا د ذ ر ز ژ و.',
               [('ژاپن', 'zhāpon', 'Japan'), ('بیژن', 'bizhan', 'Bizhan (a hero of the Shahnameh)')])
L_JIM = letter('ج', 'jim', 'j', JOINS('ج'), True,
               'A cup with a tail and one dot inside. At the start or in the middle of a word the tail drops off and only the hook is left.',
               [('جا', 'jā', 'place'), ('برنج', 'berenj', 'rice')])
L_CHE = letter('چ', 'che', 'ch', JOINS('چ'), True,
               'The same cup with three dots: another Persian addition (p, ch, zh, and next week g). Now you can write chāy.',
               [('چای', 'chāy', 'tea'), ('چرا', 'cherā', 'why')])
L_HE = letter('ح', 'he', 'h', JOINS('ح'), True,
              'The cup with no dots. One of two letters for h; this one comes in words from Arabic, like hāl and hosele. Say it as plain breath.',
              [('حنا', 'hanā', 'henna'), ('حتی', 'hattā', 'even')])
L_KHE = letter('خ', 'khe', 'kh, the scrape in “Bach”', JOINS('خ'), True,
               'The cup with one dot on top. Watch for خوا: when kh is followed by وا, the و is silent. خواب is khāb. It’s why khāstan (want) is spelled خواستن.',
               [('خوب', 'khub', 'good'), ('خواب', 'khāb', 'sleep'), ('بخور', 'bokhor', 'eat!')])
L_SIN = letter('س', 'sin', 's', JOINS('س'), True,
               'Three little teeth on the line, then a bowl at the end of a word. Joined up, it’s just the row of teeth.',
               [('سیب', 'sib', 'apple'), ('دست', 'dast', 'hand'), ('سبز', 'sabz', 'green')])
L_SHIN = letter('ش', 'shin', 'sh', JOINS('ش'), True,
                'The same teeth with three dots on top. Three dots over teeth is sh.',
                [('شب', 'shab', 'night'), ('پیش', 'pish', 'ago; near')])
L_MIM = letter('م', 'mim', 'm', JOINS('م'), True,
               'A small loop. At the end of a word it drops a tail straight down. You’ll write it constantly: it’s the -am of every “I” verb.',
               [('شام', 'shām', 'dinner'), ('امروز', 'emruz', 'today'), ('می‌دونم', 'midunam', 'I know')])
LETTERS = ['ز', 'ذ', 'ژ', 'ج', 'چ', 'ح', 'خ', 'س', 'ش', 'م']


# ── Days ───────────────────────────────────────────────────
def day1():
    lines, full = scene([
        ('Sam', 'ساعت چنده؟', 'sā’at chande?', 'What time is it?'),
        ('Mass', 'هفت و نیم.', 'haft-o nim.', 'Seven thirty.'),
        ('Sam', 'وای، دیرم شد!', 'vāy, diram shod!', 'Oh no, I’m late!'),
        ('Mass', 'نه، وقت داری. یه ربع وقت داری.', 'na, vaght dāri. ye rob’ vaght dāri.', 'No, you have time. You have a quarter of an hour.'),
        ('Sam', 'امروز ظهر کار دارم.', 'emruz zohr kār dāram.', 'Today at noon I’m busy. (I have work)'),
        ('Mass', 'کی میای خونه؟', 'key miyāy khune?', 'When are you coming home?'),
        ('Sam', 'ساعت شش.', 'sā’at-e shish.', 'At six.'),
        ('Mass', 'شام می‌خوای؟', 'shām mikhāy?', 'Do you want dinner?'),
        ('Sam', 'آره! همیشه می‌خوام.', 'āre! hamishe mikhām.', 'Yes! I always want dinner.'),
    ])
    return {
        'number': 1,
        'title': P('ساعت چنده؟', 'sā’at chande?', 'What time is it?'),
        'subtitle': 'Want and have: the two verbs that plan a day',
        'objective': 'Tell the time, say what you want and what you have on today, and read روز (day).',
        'newWordIds': [1019, 1020, 1021, 1022, 1023, 1024],
        'reviewWordIds': [RID['sā’at'], RID['shām'], RID['hamishe'], RID['emruz']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 6,
             'instruction': 'A new chapter, the same habit: pull old words out of memory first.'},
            {'type': 'listen', 'title': 'Listen first', 'minutes': 3, 'audio': full,
             'instruction': 'Monday morning. Sam has lost track of time. Play the scene twice before you look at the words, then tap a line to reveal its English.',
             'lines': lines},
            {'type': 'words', 'title': 'New words', 'minutes': 5,
             'instruction': 'Six words for the clock and the calendar. Tap each one, say it out loud, and read its story.'},
            {'type': 'verbs', 'title': 'Verb lab: want and have', 'minutes': 8, 'verbs': ['khastan', 'dashtan'],
             'intro': '<b>The present, in depth.</b> One form covers three English tenses: <b>mikhām</b> is I want, I’m wanting, and, with a time word, I’ll want. The mark is <b>mi-</b>, and the stress lands on it: MI-khām. Two everyday verbs break the rule. <b>budan</b> hides inside its endings (khubam), and <b>dāshtan</b> never takes mi-: <b>dāram</b>, I have. Dāshtan is how Persian plans a day: vaght dāram (I have time), kār dāram (I’m busy, literally “I have work”), jalase dāram (I have a meeting). Leave the dust dāshtan tab for Day 4.',
             'quiz': [conj('khastan', 'khastan', 'present', 0), conj('khastan', 'khastan', 'present', 1), conj('khastan', 'khastan', 'past', 0),
                      conj('khastan', 'khastan', 'neg_present', 2), conj('dashtan', 'dashtan', 'present', 0), conj('dashtan', 'dashtan', 'neg_present', 3),
                      conj('dashtan', 'dashtan', 'past', 1), conj('dashtan', 'dashtan', 'neg_past', 0)]},
            {'type': 'ear', 'title': 'Ear gym: gh or g?', 'minutes': 3,
             'instruction': 'Persian gh (written ق or غ; Tehranis say them the same) is made farther back than g, where you gargle. English has nothing like it, so your ear keeps filing it under g. Play each pair until the gh sounds rough and the g sounds clean, then take the test.',
             'pairs': [pair(('قند', 'ghand', 'a sugar cube'), ('گند', 'gand', 'a stink'), 'gh / g'),
                       pair(('غاز', 'ghāz', 'goose'), ('گاز', 'gāz', 'gas; a bite'), 'gh / g'),
                       pair(('غول', 'ghul', 'a giant, an ogre'), ('گول', 'gul', 'a trick'), 'gh / g')],
             'rounds': 6},
            {'type': 'script', 'title': 'Reading: ز ذ ژ', 'minutes': 6, 'letters': [L_ZE, L_ZAL, L_ZHE],
             'intro': 'Week two of the alphabet. You already own the shapes. These three are re and dāl wearing dots, so the only new thing to learn is where the dots go. All three refuse to join forward, like their parents.',
             'readIt': [read_q('روز', 'ruz', ['zud', 'dur', 'rāz']), read_q('زود', 'zud', ['dur', 'ruz', 'zir']),
                        read_q('ذرت', 'zorrat', ['dorost', 'zard', 'barādar']), read_q('ژاپن', 'zhāpon', ['zābon', 'pedar', 'bizhan'])],
             'aside': 'Roz, the English name, is Persian ruz, day. So is Nowruz, the Persian New Year: now (new) + ruz (day). You can read روز now; you’ll be able to read نوروز in two weeks.'},
            {'type': 'shadow', 'title': 'Shadow the scene', 'minutes': 3,
             'instruction': 'Play a line, then say it on top of the voice. Lean on mi-: shām MI-khāy? Record yourself and compare.',
             'lines': [lines[0], lines[3], lines[5], lines[7]]},
            {'type': 'check', 'title': 'Day 1 check', 'minutes': 4, 'questions': [
                {'type': 'listen', 'item': P('ساعت هفت و نیمه', 'sā’at haft-o nime', 'It’s seven thirty'), 'options': ['It’s 7:30.', 'It’s 7:15.', 'It’s 6:30.', 'It’s 7:00.'], 'answer': 0},
                {'type': 'mc', 'prompt': 'Mass asks “key miyāy khune?” What does she want to know?', 'options': ['When you’re coming home', 'Who is coming home', 'Whether you’re home', 'Where you’re going'], 'answer': 0,
                 'explain': 'key (when) and ki (who) are both spelled کی. Your ear tells them apart, not your eye.'},
                conj('khastan', 'khastan', 'present', 0),
                {'type': 'mc', 'prompt': 'How do you say “I’m busy” (I have work)?', 'options': [opt('کار دارم', 'kār dāram'), opt('کار می‌دارم', 'kār midāram'), opt('کار داشت', 'kār dāsht'), opt('کار می‌خوام', 'kār mikhām')], 'answer': 0,
                 'explain': 'dāshtan never takes mi- in the present.'},
                conj('dashtan', 'dashtan', 'neg_present', 1),
                {'type': 'listen', 'item': P('قند', 'ghand', 'a sugar cube'), 'options': ['ghand: a sugar cube', 'gand: a stink', 'ghāz: goose', 'gāz: gas'], 'answer': 0},
                {'type': 'type', 'item': P('ظهر', 'zohr', 'noon'), 'prompt': 'Type what you hear, in English letters.'},
                read_q('روز', 'ruz', ['zud', 'dur', 'rāz']),
                {'type': 'build', 'en': 'Do you want dinner?', 'tiles': [opt('شام', 'shām'), opt('می‌خوای؟', 'mikhāy?')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Write ز, ذ, and ژ five times each, saying the sound every time. Then write all seven letters that never join forward in one row: ا د ذ ر ز ژ و.',
                'Write روز, زود, ذرت, and ژاپن three times each, with phonetics and meaning underneath.',
                'Draw a clock face. Around it, write the hours in phonetics: sā’at-e yek… sā’at-e davāzdah. Under it, write haft-o nim and se-o rob’.',
                'Copy the present of khāstan from the verb lab. Cover it and write it again from memory.',
                'Add khāstan and dāshtan to “Verbs I own,” with both stems. Note beside dāshtan: no mi-.',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'What’s on today?', 'openers': [
                P('امروز چی کار داری؟', 'emruz chi kār dāri?', 'What do you have on today?'),
                P('کی میای خونه؟', 'key miyāy khune?', 'When are you coming home?'),
                P('ساعت چنده؟', 'sā’at chande?', 'What time is it?'),
             ], 'practice': [opt('وقت', 'vaght'), opt('کی؟', 'key?'), opt('نیم', 'nim'), opt('ربع', 'rob’'), opt('ظهر', 'zohr'), opt('می‌خوام', 'mikhām'), opt('دارم', 'dāram')],
             'massNote': 'Sam is learning to tell time. Ask him the time whenever you think of it, and make him answer in Farsi: “haft-o nim,” “se-o rob’.”'},
            {'type': 'teach', 'title': 'Teach the girls: Sā’at chande, āghā gorge?',
             'game': '“What’s the time, Mr. Wolf?” in Persian. You’re the wolf (gorg), back turned. The girls call “sā’at chande, āghā gorge?” and you answer an hour; they take that many steps toward you, counting out loud in Farsi. When you shout “vaght-e shāme!” (dinner time!), turn and chase. Whoever gets caught is the next wolf, and has to answer in Farsi.',
             'items': [P('ساعت چنده، آقا گرگه؟', 'sā’at chande, āghā gorge?', 'What time is it, Mr. Wolf?'),
                       P('ساعت سه!', 'sā’at se!', 'Three o’clock!'), P('ساعت پنج!', 'sā’at panj!', 'Five o’clock!'),
                       P('یک، دو، سه، چهار، پنج', 'yek, do, se, chāhār, panj', 'one, two, three, four, five'),
                       P('وقت شامه!', 'vaght-e shāme!', 'Dinner time! (run!)')]},
        ],
    }


def day2():
    lines, full = scene([
        ('Mass', 'خسته نباشی!', 'khaste nabāshi!', 'Welcome home! (may you not be tired)'),
        ('Sam', 'مرسی. سرم خیلی شلوغ بود.', 'mersi. saram kheyli sholugh bud.', 'Thanks. I was swamped. (my head was very crowded)'),
        ('Mass', 'جلسه داشتی؟', 'jalase dāshti?', 'Did you have a meeting?'),
        ('Sam', 'آره، سه تا. معمولاً یکی دارم.', 'āre, se tā. ma’mulan yeki dāram.', 'Yes, three. Usually I have one.'),
        ('Mass', 'فردا ظهر میای خونه؟', 'fardā zohr miyāy khune?', 'Are you coming home at noon tomorrow?'),
        ('Sam', 'نه، نمی‌تونم. فردا هم جلسه دارم.', 'na, nemitunam. fardā ham jalase dāram.', 'No, I can’t. I have a meeting tomorrow too.'),
        ('Mass', 'تو هیچ‌وقت خونه نیستی!', 'to hichvaght khune nisti!', 'You’re never home!'),
        ('Sam', 'می‌دونم، می‌دونم…', 'midunam, midunam…', 'I know, I know…'),
    ])
    return {
        'number': 2,
        'title': P('سر کار', 'sar-e kār', 'At work'),
        'subtitle': 'Know and can, and the two most useful “no”s',
        'objective': 'Talk about work and meetings, say what you know and what you can do, hear the glottal stop, and read چای and خواب.',
        'newWordIds': [1025, 1026, 1027, 1028, 1029],
        'reviewWordIds': [RID['sholugh'], RID['fardā'], RID['kār']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 6, 'instruction': 'Yesterday’s words and some old friends from Mango.'},
            {'type': 'listen', 'title': 'Listen first', 'minutes': 3, 'audio': full,
             'instruction': 'Evening. Sam comes home from work. Listen twice, then tap lines for the English.', 'lines': lines},
            {'type': 'words', 'title': 'New words', 'minutes': 4, 'instruction': 'Five words for the working day, including the greeting every Iranian worker hears.'},
            {'type': 'verbs', 'title': 'Verb lab: know and can', 'minutes': 8, 'verbs': ['dunestan', 'tunestan'],
             'intro': '<b>dunestan</b> (know) and <b>tunestan</b> (can) are near twins. Both lose a syllable in speech, and their forms rhyme all the way down: midunam, mitunam. Their negatives may be the most useful words this week: <b>nemidunam</b> (I don’t know) and <b>nemitunam</b> (I can’t). The negative of any mi- verb is ne-mi-, and the stress jumps forward to ne-: NE-midunam. Neither verb has an everyday command.',
             'quiz': [conj('dunestan', 'dunestan', 'present', 0), conj('dunestan', 'dunestan', 'neg_present', 0), conj('dunestan', 'dunestan', 'past', 1),
                      conj('tunestan', 'tunestan', 'present', 1), conj('tunestan', 'tunestan', 'neg_present', 0), conj('tunestan', 'tunestan', 'past', 0),
                      conj('tunestan', 'tunestan', 'neg_past', 3), conj('dunestan', 'dunestan', 'neg_present', 4)]},
            {'type': 'ear', 'title': 'Ear gym: the glottal stop', 'minutes': 3,
             'instruction': 'The apostrophe in ba’d, sā’at, and rob’ is a glottal stop: the tiny catch in the middle of “uh-oh.” It’s written with ع or ء, letters you’ll meet next week. In fast Tehrani speech the catch often melts into a longer vowel, so ba’d can sound almost like bād (wind). Listen for the catch.',
             'pairs': [pair(('بد', 'bad', 'bad'), ('بعد', 'ba’d', 'after; then'), 'a / a’'),
                       pair(('باد', 'bād', 'wind'), ('بعد', 'ba’d', 'after; then'), 'ā / a’'),
                       pair(('رد', 'rad', 'a trace, a mark'), ('رعد', 'ra’d', 'thunder'), 'a / a’')],
             'rounds': 6},
            {'type': 'script', 'title': 'Reading: ج چ ح خ', 'minutes': 7, 'letters': [L_JIM, L_CHE, L_HE, L_KHE],
             'intro': 'One body, four letters. The cup-with-a-tail shape is the same in all of them; the dots do the work: one inside for j, three inside for ch, none for h, one on top for kh. Learn the body once and the dots are just labels.',
             'readIt': [read_q('چای', 'chāy', ['jā', 'khāb', 'hanā']), read_q('برنج', 'berenj', ['pedar', 'birun', 'panj']),
                        read_q('خوب', 'khub', ['khāb', 'jub', 'chub']), read_q('خواب', 'khāb', ['khub', 'āb', 'khāhar']),
                        read_q('چرا', 'cherā', ['jā', 'chāy', 'harā'])],
             'aside': 'You can now read the word on every Persian tea glass: چای. And خواب has a ghost in it: the و is silent, a leftover from how the word was said a thousand years ago.'},
            {'type': 'shadow', 'title': 'Shadow the scene', 'minutes': 3,
             'instruction': 'Copy the tune of “khaste nabāshi”: it falls at the end, like a kind word, not a question. In nemitunam, lean on ne-.',
             'lines': [lines[0], lines[3], lines[5], lines[7]]},
            {'type': 'check', 'title': 'Day 2 check', 'minutes': 4, 'questions': [
                {'type': 'listen', 'item': P('خسته نباشی', 'khaste nabāshi', 'Well done; welcome back'), 'options': ['Well done / welcome back', 'Are you tired?', 'I’m not tired.', 'Don’t be late.'], 'answer': 0},
                conj('dunestan', 'dunestan', 'neg_present', 0),
                conj('tunestan', 'tunestan', 'present', 1),
                conj('tunestan', 'tunestan', 'neg_past', 0),
                {'type': 'mc', 'prompt': 'How do you say “He’s never late”?', 'options': [opt('هیچ‌وقت دیر نمیاد', 'hichvaght dir nemiyād'), opt('هیچ‌وقت دیر میاد', 'hichvaght dir miyād'), opt('همیشه دیر میاد', 'hamishe dir miyād'), opt('معمولاً دیر میاد', 'ma’mulan dir miyād')], 'answer': 0,
                 'explain': 'Persian doubles the negative: “never” plus “doesn’t come.”'},
                {'type': 'listen', 'item': P('بعد', 'ba’d', 'after; then'), 'options': ['ba’d: after', 'bad: bad', 'bād: wind'], 'answer': 0},
                read_q('چای', 'chāy', ['jā', 'khāb', 'chub']),
                read_q('خواب', 'khāb', ['khub', 'āb', 'khāhar']),
                {'type': 'build', 'en': 'I usually have one meeting.', 'tiles': [opt('معمولاً', 'ma’mulan'), opt('یه جلسه', 'ye jalase'), opt('دارم', 'dāram')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Write ج, چ, ح, and خ in all four shapes. The body never changes; say the sound as you add the dots.',
                'Write چای, برنج, خوب, and خواب with phonetics and meaning. Under خواب, write: the و is silent.',
                'Write tomorrow’s real schedule in phonetics: sā’at-e hasht…, zohr…, sā’at-e shish… Use ma’mulan or hichvaght at least once.',
                'Write two tables side by side, all six persons: midunam / nemidunam and mitunam / nemitunam.',
                'Add dunestan and tunestan to “Verbs I own.”',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'Work', 'openers': [
                P('خسته نباشی!', 'khaste nabāshi!', 'Well done today!'),
                P('جلسه داشتی؟', 'jalase dāshti?', 'Did you have a meeting?'),
                P('سرت شلوغه؟', 'saret sholughe?', 'Are you busy?'),
             ], 'practice': [opt('سر کار', 'sar-e kār'), opt('جلسه', 'jalase'), opt('معمولاً', 'ma’mulan'), opt('هیچ‌وقت', 'hichvaght'), opt('می‌دونم', 'midunam'), opt('نمی‌تونم', 'nemitunam')],
             'massNote': 'When Sam finishes work, greet him with “khaste nabāshi!” He should answer “salāmat bāshi.” Then ask about his day.'},
        ],
    }


def day3():
    lines, full = scene([
        ('Mass', 'کجایی؟', 'kojāyi?', 'Where are you?'),
        ('Sam', 'تو ماشینم. ترافیکه!', 'tu māshinam. terāfike!', 'I’m in the car. There’s traffic!'),
        ('Mass', 'می‌ری دنبال بچه‌ها؟', 'miri donbāl-e bachchehā?', 'Are you picking up the kids?'),
        ('Sam', 'آره. مدرسه ساعت سه تعطیل می‌شه؟', 'āre. madrese sā’at-e se ta’til mishe?', 'Yes. School gets out at three?'),
        ('Mass', 'نه، سه و ربع.', 'na, se-o rob’.', 'No, three fifteen.'),
        ('Sam', 'باشه. چیزی می‌خوای؟', 'bāshe. chizi mikhāy?', 'Okay. Do you want anything?'),
        ('Mass', 'آره، شیر می‌خوام.', 'āre, shir mikhām.', 'Yes, I want milk.'),
        ('Mass', 'به بچه‌ها بگو شام ماکارونیه!', 'be bachchehā begu shām mākāroniye!', 'Tell the kids dinner is macaroni!'),
        ('Sam', 'می‌گم.', 'migam.', 'I’ll tell them.'),
    ])
    return {
        'number': 3,
        'title': P('دنبال بچه‌ها', 'donbāl-e bachchehā', 'Picking up the kids'),
        'subtitle': 'Say and give, and how verbs shrink in Mass’s mouth',
        'objective': 'Follow a phone call from the car, tell and give, hear written verbs shrink into spoken ones, and read امروز and شام. That makes 21 letters.',
        'newWordIds': [1030, 1031, 1032, 1033],
        'reviewWordIds': [RID['bachche'], RID['ta’til'], RID['kojā']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 6, 'instruction': 'Retrieval first, always.'},
            {'type': 'listen', 'title': 'Listen first', 'minutes': 3, 'audio': full,
             'instruction': 'A phone call at 2:45. Sam is stuck in traffic. Listen twice before reading.', 'lines': lines},
            {'type': 'words', 'title': 'New words', 'minutes': 4, 'instruction': 'Four words for the school run.'},
            {'type': 'verbs', 'title': 'Verb lab: say and give', 'minutes': 8, 'verbs': ['goftan', 'dadan'],
             'intro': '<b>goftan</b> (say) and <b>dādan</b> (give) both have written present stems that speech crushes: gu- becomes g-, dah- becomes d-. That leaves pairs one sound apart: <b>mige</b> (says) and <b>mide</b> (gives). Commands are back: <b>begu!</b> (tell me!), <b>nagu!</b> (don’t tell!), <b>bede!</b> (give it!), <b>nade!</b> (don’t give it!). Leave the gush dādan tab for Day 4.',
             'quiz': [conj('goftan', 'goftan', 'present', 0), conj('goftan', 'goftan', 'imperative', 0), conj('goftan', 'goftan', 'imperative', 2),
                      conj('goftan', 'goftan', 'past', 2), conj('dadan', 'dadan', 'present', 2), conj('dadan', 'dadan', 'imperative', 0),
                      conj('dadan', 'dadan', 'neg_past', 0), conj('dadan', 'dadan', 'imperative', 3)]},
            {'type': 'rule', 'title': 'Ear gym: written vs. spoken, part 2', 'minutes': 4,
             'instruction': 'Last week: ān becomes un, and -ad becomes -e. This week’s verbs lose whole chunks, and “is” shrinks to a single sound. Learn both columns: the left is what you’ll read, the right is what you’ll hear.',
             'rules': [
                 {'name': 'stems shrink', 'text': 'In speech, the middle of the present stem drops out: khāh → khā, dān → dun, tavān → tun, guy → g, dah → d.', 'examples': [
                     (P('می‌خواهم', 'mikhāham', 'I want (written)', v='d'), P('می‌خوام', 'mikhām', 'I want (spoken)', v='d')),
                     (P('می‌دانم', 'midānam', 'I know (written)', v='f'), P('می‌دونم', 'midunam', 'I know (spoken)', v='f')),
                     (P('می‌توانم', 'mitavānam', 'I can (written)', v='d'), P('می‌تونم', 'mitunam', 'I can (spoken)', v='d')),
                     (P('می‌گویم', 'miguyam', 'I say (written)', v='f'), P('می‌گم', 'migam', 'I say (spoken)', v='f')),
                     (P('می‌دهم', 'midaham', 'I give (written)', v='d'), P('می‌دم', 'midam', 'I give (spoken)', v='d'))]},
                 {'name': 'ast → -e', 'text': '“Is” (ast) becomes an -e stuck to the end of the word, or -st after a vowel.', 'examples': [
                     (P('ساعت هفت است', 'sā’at haft ast', 'it’s seven o’clock (written)', v='f'), P('ساعت هفته', 'sā’at hafte', 'it’s seven o’clock (spoken)', v='f')),
                     (P('کجا است؟', 'kojā ast?', 'where is it? (written)', v='d'), P('کجاست؟', 'kojāst?', 'where is it? (spoken)', v='d')),
                     (P('چه است؟', 'che ast?', 'what is it? (written)', v='f'), P('چیه؟', 'chiye?', 'what is it? (spoken)', v='f')),
                     (P('خوب است', 'khub ast', 'it’s good (written)', v='d'), P('خوبه', 'khube', 'it’s good (spoken)', v='d'))]},
             ], 'rounds': 6},
            {'type': 'script', 'title': 'Reading: س ش م', 'minutes': 6, 'letters': [L_SIN, L_SHIN, L_MIM],
             'intro': 'Teeth and a loop. Sin and shin are the same row of teeth; three dots make it sh. Mim is the last letter of the week, and the one you’ll write most, because every “I” verb ends in it: midunam, mikhām, dāram.',
             'readIt': [read_q('شب', 'shab', ['sib', 'sabz', 'shām']), read_q('امروز', 'emruz', ['diruz', 'emshab', 'ruz']),
                        read_q('سیب', 'sib', ['shab', 'dast', 'sabz']), read_q('می‌دونم', 'midunam', ['midunan', 'nemidunam', 'midam']),
                        read_q('شام', 'shām', ['shab', 'sām', 'jām'])],
             'aside': 'With mim you can read the endings of every verb you know. Try دارم (dāram), می‌خوام (mikhām), and نمی‌دونم (nemidunam): every letter in them is yours.'},
            {'type': 'shadow', 'title': 'Shadow the scene', 'minutes': 3,
             'instruction': 'Stress lives on mi-: MI-ri, MI-gam. In a negative it jumps to ne-: NE-migam. Match where Mass leans, then record.',
             'lines': [lines[2], lines[4], lines[7], lines[8]]},
            {'type': 'check', 'title': 'Day 3 check', 'minutes': 4, 'questions': [
                {'type': 'listen', 'item': P('می‌رم دنبال بچه‌ها', 'miram donbāl-e bachchehā', 'I’m going to pick up the kids'), 'options': ['I’m going to pick up the kids.', 'The kids are at school.', 'I’m in the car.', 'There’s traffic.'], 'answer': 0},
                conj('goftan', 'goftan', 'imperative', 0),
                conj('goftan', 'goftan', 'present', 2),
                conj('dadan', 'dadan', 'imperative', 2),
                conj('dadan', 'dadan', 'past', 0),
                {'type': 'mc', 'prompt': 'Mass says “sā’at hafte.” What does she mean?', 'options': ['It’s seven o’clock.', 'It’s a week.', 'Seven weeks.', 'For an hour.'], 'answer': 0,
                 'explain': 'haft (seven) + -e (is). It sounds exactly like hafte, week. Context decides.'},
                {'type': 'mc', 'prompt': 'Mass would say می‌خواهم (mikhāham) as…', 'options': [opt('می‌خوام', 'mikhām'), opt('می‌خواد', 'mikhād'), opt('خواستم', 'khāstam'), opt('می‌خوای', 'mikhāy')], 'answer': 0},
                read_q('امروز', 'emruz', ['diruz', 'emshab', 'ruz']),
                read_q('شب', 'shab', ['sib', 'shām', 'sabz']),
                {'type': 'type', 'item': P('ماشین', 'māshin', 'car'), 'prompt': 'Type what you hear, in English letters.'},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Write س, ش, and م five times each. Then write all 21 letters you know, from memory, and check.',
                'Write شب, سیب, شام, امروز, and می‌دونم with phonetics and meaning.',
                'Write the five written → spoken verb pairs from the ear gym (mikhāham → mikhām…). Say each spoken one with the stress on mi-.',
                'Write five things you say to the kids, in phonetics, using begu, nagu, bede, and nade.',
                'Add goftan and dādan to “Verbs I own.”',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'Pickups and errands', 'openers': [
                P('کی می‌ره دنبال بچه‌ها؟', 'ki mire donbāl-e bachchehā?', 'Who’s picking up the kids?'),
                P('چیزی می‌خوای؟', 'chizi mikhāy?', 'Do you want anything?'),
                P('ماشین کجاست؟', 'māshin kojāst?', 'Where’s the car?'),
             ], 'practice': [opt('دنبال', 'donbāl'), opt('مدرسه', 'madrese'), opt('ماشین', 'māshin'), opt('ترافیک', 'terāfik'), opt('بگو', 'begu'), opt('بده', 'bede')],
             'massNote': 'Sam is learning say and give. At dinner, ask him for things in Farsi (“nun-o bede,” pass the bread) and make him tell you things (“begu!”).'},
        ],
    }


def day4():
    story, full = scene([
        ('', 'پنج‌شنبه‌ست. سام و معصومه دوباره پشت پنجره‌ان.', 'panjshanbe-st. sām-o ma’sume dobāre posht-e panjere-an.', 'It’s Thursday. Sam and Massoumeh are at the window again.'),
        ('Mass', 'ببین! همسایه داره میاد.', 'bebin! hamsāye dāre miyād.', 'Look! The neighbor’s coming.'),
        ('Sam', 'چی داره؟', 'chi dāre?', 'What’s he got?'),
        ('Mass', 'یه بوقلمون! خیلی بزرگه.', 'ye bughalamun! kheyli bozorge.', 'A turkey! It’s huge.'),
        ('Sam', 'برای کیه؟', 'barāye kiye?', 'Who’s it for?'),
        ('Mass', 'نمی‌دونم. ولی اون هیچ‌وقت مهمون نداره!', 'nemidunam. vali un hichvaght mehmun nadāre!', 'I don’t know. But he never has guests!'),
        ('Sam', 'شاید امسال داره.', 'shāyad emsāl dāre.', 'Maybe this year he does.'),
        ('Mass', 'هیس! داره گوش می‌ده!', 'his! dāre gush mide!', 'Shh! He’s listening!'),
        ('Sam', 'چیزی نگفتیم که!', 'chizi nagoftim ke!', 'We didn’t say anything!'),
    ])
    khayyam = [P('این قافلهٔ عمر عجب می‌گذرد', 'in ghāfele-ye omr ajab migozarad', 'This caravan of life passes strangely.', v='f'),
               P('دریاب دمی که با طرب می‌گذرد', 'daryāb dami ke bā tarab migozarad', 'Seize a moment that passes in joy.', v='f')]
    gossip = [P('می‌دونی چی شد؟', 'miduni chi shod?', 'Do you know what happened?'), P('بگو!', 'begu!', 'Tell me!'),
              P('نمی‌دونم.', 'nemidunam.', 'I don’t know.'), P('کسی نمی‌دونه.', 'kasi nemidune.', 'Nobody knows.'),
              P('به کسی نگو!', 'be kasi nagu!', 'Don’t tell anyone!'), P('داره میاد!', 'dāre miyād!', 'Here he comes! (he’s coming)'),
              P('داره گوش می‌ده.', 'dāre gush mide.', 'He’s listening.'), P('حرف نزن!', 'harf nazan!', 'Hush! (don’t talk)')]
    return {
        'number': 4,
        'title': P('بوقلمون', 'bughalamun', 'The turkey'),
        'subtitle': 'Story day: right now (dāram miram), gossip kit part 2, and Khayyam on time',
        'objective': 'Follow the second story, say what’s happening right now, gossip with dunestan and goftan, and read a quatrain of Khayyam with a word-by-word key.',
        'newWordIds': [1034, 1035, 1036, 1037],
        'reviewWordIds': [RID['mehmun'], RID['shāyad'], RID['kheyli']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 8, 'instruction': 'Mixed: this week and older words.'},
            {'type': 'story', 'title': 'Story, episode 2: The turkey', 'minutes': 6, 'audio': full,
             'instruction': 'Thanksgiving. The lazy neighbor from episode 1 is up to something. Listen to the whole episode before reading, then read along line by line.',
             'lines': story, 'questions': [
                 {'type': 'mc', 'prompt': 'What is the neighbor carrying?', 'options': ['a huge turkey', 'groceries', 'a child', 'nothing'], 'answer': 0},
                 {'type': 'mc', 'prompt': 'Why is Mass surprised?', 'options': ['He never has guests.', 'He’s never home.', 'He never cooks.', 'He’s never late.'], 'answer': 0},
                 {'type': 'mc', 'prompt': 'Why does Mass say “his!”?', 'options': [opt('داره گوش می‌ده', 'dāre gush mide', 'He’s listening.'), opt('داره میاد', 'dāre miyād', 'He’s coming.'), opt('نمی‌دونم', 'nemidunam', 'I don’t know.'), opt('خیلی بزرگه', 'kheyli bozorge', 'It’s huge.')], 'answer': 0},
             ]},
            {'type': 'words', 'title': 'New words', 'minutes': 3, 'instruction': 'Two days of the week, the bird of the day, and the word for talk.'},
            {'type': 'verbs', 'title': 'Verb lab: right now, and two compounds', 'minutes': 8, 'verbs': ['dashtan', 'dadan'],
             'intro': '<b>Right now.</b> The plain present already means “I go, I’m going, I’ll go.” When you need “I’m in the middle of it,” put dāshtan in front, conjugated for the same person: <b>dāram miram</b> (I’m on my way), <b>dāre miyād</b> (he’s coming), <b>dārim mikhorim</b> (we’re eating). Both halves change with the person. This form has no negative: for “I’m not going,” just say nemiram. <b>Two compounds.</b> Open the tabs: dust (friend) + dāshtan = like or love, and gush (ear) + dādan = listen. As with sabr kardan, only the verb changes.',
             'quiz': [conj('dashtan', 'dust_dashtan', 'present', 0), conj('dashtan', 'dust_dashtan', 'neg_present', 1),
                      conj('dadan', 'gush_dadan', 'imperative', 0), conj('dadan', 'gush_dadan', 'past', 2),
                      {'type': 'mc', 'prompt': '“We’re eating” (right now):', 'options': [opt('داریم می‌خوریم', 'dārim mikhorim'), opt('داریم خوردیم', 'dārim khordim'), opt('می‌خوریم داریم', 'mikhorim dārim'), opt('داره می‌خوره', 'dāre mikhore')], 'answer': 0},
                      {'type': 'mc', 'prompt': '“I’m not going” is…', 'options': [opt('نمی‌رم', 'nemiram'), opt('ندارم می‌رم', 'nadāram miram'), opt('دارم نمی‌رم', 'dāram nemiram'), opt('نرفتم', 'naraftam')], 'answer': 0,
                       'explain': 'The “right now” form has no negative. Use the plain present.'},
                      {'type': 'mc', 'prompt': '“The kids are coming” (right now):', 'options': [opt('بچه‌ها دارن میان', 'bachchehā dāran miyān'), opt('بچه‌ها داره میاد', 'bachchehā dāre miyād'), opt('بچه‌ها دارن اومدن', 'bachchehā dāran umadan'), opt('بچه‌ها میان', 'bachchehā miyān')], 'answer': 0,
                       'explain': 'Both halves agree with “they”: dāran + miyān.'}]},
            {'type': 'gossip', 'title': 'Gossip kit, part 2', 'minutes': 3,
             'intro': 'Part 1 was for pointing. Part 2 is for the news itself: who knows, who’s telling, and who might be listening.',
             'phrases': gossip,
             'proverb': P('زبان سرخ سر سبز می‌دهد بر باد', 'zabān-e sorkh sar-e sabz midahad bar bād', 'The red tongue gives the green head to the wind. (Loose talk costs heads.)'),
             'tip': 'When the person you’re talking about walks in, switch topics without a pause. Ask loudly: “shām chi dārim?” (What’s for dinner?)'},
            {'type': 'verse', 'title': 'Khayyam on time', 'minutes': 4, 'poet': 'Omar Khayyam of Nishapur, 11th–12th century',
             'lines': khayyam,
             'gloss': [opt('این', 'in', 'this'), opt('قافله', 'ghāfele', 'caravan'), opt('ـهٔ', '-ye', 'of'), opt('عمر', 'omr', 'life, a lifetime'),
                       opt('عجب', 'ajab', 'strangely, wondrously'), opt('می‌گذرد', 'migozarad', 'passes (Mass would say migzare)'),
                       opt('دریاب', 'daryāb', 'seize! grasp!'), opt('دمی', 'dami', 'a breath; a moment'), opt('که', 'ke', 'that'),
                       opt('با', 'bā', 'with'), opt('طرب', 'tarab', 'joy')],
             'note': 'Khayyam was an astronomer before he was a poet. He helped reform the Persian solar calendar, famously accurate and still in use, so this is a poem about time from a man who measured it. Dam means breath, and a moment is one breath long. The quatrain ends: “Cupbearer, why grieve over tomorrow? Bring the cup: the night is passing.”'},
            {'type': 'roots', 'title': 'Word stories: the -gāh family', 'minutes': 3,
             'intro': '-gāh turns a noun or a verb stem into the place where it happens. It also means time: gāhi is “sometimes.” Place and time in one syllable.',
             'items': [
                 {'word': P('دانشگاه', 'dāneshgāh', 'university'), 'parts': [opt('دانش', 'dānesh', 'knowledge (from dunestan)'), opt('گاه', 'gāh', 'place')], 'story': 'The place of knowing. The dān is the same as in midunam.'},
                 {'word': P('فرودگاه', 'forudgāh', 'airport'), 'parts': [opt('فرود', 'forud', 'landing, coming down'), opt('گاه', 'gāh', 'place')], 'story': 'The place of coming down.'},
                 {'word': P('خوابگاه', 'khābgāh', 'dormitory'), 'parts': [opt('خواب', 'khāb', 'sleep'), opt('گاه', 'gāh', 'place')], 'story': 'The place of sleep, with the silent vāv you met on Day 2.'},
                 {'word': P('ایستگاه', 'istgāh', 'station; bus stop'), 'parts': [opt('ایست', 'ist', 'stop (stem of istādan, to stand)'), opt('گاه', 'gāh', 'place')], 'story': 'The place of standing still.'},
                 {'word': P('گاهی', 'gāhi', 'sometimes'), 'parts': [opt('گاه', 'gāh', 'time'), opt('ی', '-i', 'a, one')], 'story': 'A time: sometimes.'},
             ]},
            {'type': 'check', 'title': 'Day 4 check', 'minutes': 4, 'questions': [
                conj('dashtan', 'dust_dashtan', 'present', 0),
                conj('dadan', 'gush_dadan', 'imperative', 0),
                {'type': 'mc', 'prompt': 'How do you say “He’s coming” (right now)?', 'options': [opt('داره میاد', 'dāre miyād'), opt('میاد داره', 'miyād dāre'), opt('داره', 'dāre'), opt('اومد', 'umad')], 'answer': 0},
                {'type': 'listen', 'item': P('به کسی نگو', 'be kasi nagu', 'Don’t tell anyone'), 'options': ['Don’t tell anyone!', 'Nobody knows.', 'Tell me!', 'I don’t know.'], 'answer': 0},
                {'type': 'mc', 'prompt': '-gāh means…', 'options': ['place (and sometimes time)', 'knowledge', 'sleep', 'to stand'], 'answer': 0},
                read_q('چرا', 'cherā', ['jā', 'chāy', 'harā']),
                {'type': 'build', 'en': 'Do you know what happened?', 'tiles': [opt('می‌دونی', 'miduni'), opt('چی', 'chi'), opt('شد؟', 'shod?')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Copy Khayyam’s two lines in phonetics with the English under them. Underline both migozarad.',
                'Add the -gāh family to “Word stories,” with the parts of each word.',
                'Write the gossip kit, part 2, in phonetics. Mark three for Sunday’s walk.',
                'Write five “right now” sentences about your house in phonetics: dāram chāy mikhoram, bachchehā dāran miyān…',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'Thanksgiving', 'openers': [
                P('بوقلمون دوست داری؟', 'bughalamun dust dāri?', 'Do you like turkey?'),
                P('چی دوست داری؟', 'chi dust dāri?', 'What do you like?'),
                P('مهمون داریم؟', 'mehmun dārim?', 'Do we have guests?'),
             ], 'practice': [opt('دوست دارم', 'dust dāram'), opt('دوست ندارم', 'dust nadāram'), opt('بوقلمون', 'bughalamun'), opt('پنج‌شنبه', 'panjshanbe'), opt('داره میاد', 'dāre miyād')],
             'massNote': 'It’s Thanksgiving week. At dinner, go around the table: “chi dust dāri?” Sam answers with “… dust dāram.”'},
        ],
    }


def day5():
    secret = [P('چای می‌خوری؟', 'chāy mikhori?', 'Will you have some tea?'), P('شب بخیر!', 'shab bekheyr!', 'Good night!'),
              P('زود باش!', 'zud bāsh!', 'Hurry up!'), P('نمی‌دونم.', 'nemidunam.', 'I don’t know.'),
              P('امروز و دیروز', 'emruz-o diruz', 'today and yesterday'), P('سیب و پنیر', 'sib-o panir', 'apples and cheese'),
              P('می‌خوام بخوابم.', 'mikhām bekhābam.', 'I want to sleep.')]
    return {
        'number': 5,
        'title': P('هفته‌ی ما', 'hafte-ye mā', 'Our week'),
        'subtitle': 'Review day: six verbs, ten letters, and the days of the week',
        'objective': 'Conjugate the six new verbs on demand, read seven phrases with no help, and plan next week with Mass.',
        'newWordIds': [],
        'reviewWordIds': [RID['shanbe'], RID['yekshanbe'], RID['doshanbe'], RID['chāharshanbe'], RID['jome']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: the whole week', 'minutes': 3, 'count': 10, 'chapterOnly': True, 'instruction': 'Ten words from this chapter, shuffled.'},
            {'type': 'earmix', 'title': 'Ear gym: mixed review', 'minutes': 4, 'instruction': 'gh against g, and the glottal stop, shuffled together.', 'rounds': 10},
            {'type': 'verbgym', 'title': 'Verb gym: this week’s six', 'minutes': 8, 'count': 14, 'verbs': ['dashtan', 'khastan', 'dunestan', 'tunestan', 'goftan', 'dadan'],
             'instruction': 'Random persons, tenses, and verbs, negatives included. A wrong answer shows you the right one.'},
            {'type': 'secret', 'title': 'Secret messages', 'minutes': 5,
             'instruction': 'Every letter in these is one you’ve learned. Read each one out loud, then tap to check.', 'items': secret},
            {'type': 'roots', 'title': 'Word stories: the days of the week', 'minutes': 4,
             'intro': 'Shanbe, from the same root as Sabbath, anchors the Persian week. After it, the days are just a count: one-shanbe, two-shanbe, up to five. Then Friday, jome, breaks the pattern. In fast speech the n slides toward m before b: shambe, yekshambe.',
             'items': [
                 {'word': P('یکشنبه', 'yekshanbe', 'Sunday'), 'parts': [opt('یک', 'yek', 'one'), opt('شنبه', 'shanbe', 'Saturday')], 'story': 'One after Saturday.'},
                 {'word': P('دوشنبه', 'doshanbe', 'Monday'), 'parts': [opt('دو', 'do', 'two'), opt('شنبه', 'shanbe', 'Saturday')], 'story': 'Two after Saturday.'},
                 {'word': P('سه‌شنبه', 'seshanbe', 'Tuesday'), 'parts': [opt('سه', 'se', 'three'), opt('شنبه', 'shanbe', 'Saturday')], 'story': 'Three after Saturday.'},
                 {'word': P('چهارشنبه', 'chāharshanbe', 'Wednesday'), 'parts': [opt('چهار', 'chāhār', 'four'), opt('شنبه', 'shanbe', 'Saturday')], 'story': 'Four after Saturday. Chāharshanbe Suri, the fire-jumping night before Nowruz, is held on the eve of the year’s last Wednesday.'},
                 {'word': P('پنج‌شنبه', 'panjshanbe', 'Thursday'), 'parts': [opt('پنج', 'panj', 'five'), opt('شنبه', 'shanbe', 'Saturday')], 'story': 'Five after Saturday, and the start of the Iranian weekend.'},
                 {'word': P('جمعه', 'jome', 'Friday'), 'parts': [opt('جمع', 'jam’', 'gathering')], 'story': 'The day of gathering, for Friday prayers. The pattern breaks for the day of rest.'},
             ]},
            {'type': 'check', 'title': 'Chapter 2 check', 'minutes': 5, 'questions': [
                conj('khastan', 'khastan', 'present', 3), conj('dashtan', 'dashtan', 'neg_present', 0), conj('dunestan', 'dunestan', 'present', 1),
                conj('tunestan', 'tunestan', 'neg_present', 2), conj('goftan', 'goftan', 'imperative', 2), conj('dadan', 'dadan', 'present', 4),
                conj('dashtan', 'dashtan', 'past', 3),
                {'type': 'listen', 'item': P('سه و ربع', 'se-o rob’', 'three fifteen'), 'options': ['3:15', '3:30', '3:45', '4:15'], 'answer': 0},
                {'type': 'mc', 'prompt': 'Which day is Tuesday?', 'options': [opt('سه‌شنبه', 'seshanbe'), opt('شنبه', 'shanbe'), opt('چهارشنبه', 'chāharshanbe'), opt('دوشنبه', 'doshanbe')], 'answer': 0},
                read_q('سیب', 'sib', ['shab', 'sabz', 'dast']),
                {'type': 'build', 'en': 'I don’t know, I can’t.', 'tiles': [opt('نمی‌دونم', 'nemidunam'), opt('نمی‌تونم', 'nemitunam')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 12, 'print': True, 'tasks': [
                'From memory, write this week’s 10 letters in every shape they take. Then check.',
                'Write the days of the week in phonetics, Saturday first, and circle the number hiding in each.',
                'Write the seven secret messages in script, with phonetics under each.',
                'Verb chart from memory: the present of all six new verbs, I-form only, positive and negative (dāram / nadāram…).',
                'Write a paragraph in phonetics about a normal weekday: when you get up, work, pick up the kids, and eat dinner.',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'How was the week?', 'openers': [
                P('هفته‌ت چطور بود؟', 'hafte-t chetor bud?', 'How was your week?'),
                P('چی دوست داشتی؟', 'chi dust dāshti?', 'What did you like?'),
                P('تونستی بخوابی؟', 'tunesti bekhābi?', 'Did you manage to sleep?'),
             ], 'practice': [opt('داشتم', 'dāshtam'), opt('خواستم', 'khāstam'), opt('گفتم', 'goftam'), opt('دادم', 'dādam'), opt('تونستم', 'tunestam'), opt('نمی‌دونم', 'nemidunam')],
             'massNote': 'Sam knows the past tense of six new verbs. Ask him about his week and push for full sentences.'},
            {'type': 'teach', 'title': 'Teach the girls: the pickup routine',
             'game': 'Use these at every pickup this week, same order, same tune. Kids learn routines, not vocabulary. The first week, accept any answer to “ruzet chetor bud?” in any language.',
             'items': [P('روزت چطور بود؟', 'ruzet chetor bud?', 'How was your day?'), P('خوب بود؟', 'khub bud?', 'Was it good?'),
                       P('چی خوردی؟', 'chi khordi?', 'What did you eat?'), P('خسته نباشی!', 'khaste nabāshi!', 'Good job today!'),
                       P('بزن بریم!', 'bezan berim!', 'Let’s go! (literally “hit it, let’s go”)'), P('داد نزن!', 'dād nazan!', 'Don’t yell!')]},
            {'type': 'massvoice', 'title': 'Optional: Mass’s voice', 'minutes': 0,
             'instruction': 'If Mass is willing, ask her to record these on her phone at her normal speed. Her real voice will teach your ear more than any computer. Listen on walks.',
             'items': [P('ساعت چنده؟', 'sā’at chande?', 'What time is it?'), P('هفت و نیم.', 'haft-o nim.', 'Seven thirty.'),
                       P('خسته نباشی!', 'khaste nabāshi!', 'Welcome home!'), P('نمی‌دونم، نمی‌تونم.', 'nemidunam, nemitunam.', 'I don’t know, I can’t.'),
                       P('می‌ری دنبال بچه‌ها؟', 'miri donbāl-e bachchehā?', 'Are you picking up the kids?'),
                       P('به بچه‌ها بگو شام ماکارونیه!', 'be bachchehā begu shām mākāroniye!', 'Tell the kids dinner is macaroni!'),
                       P('ببین! همسایه داره میاد.', 'bebin! hamsāye dāre miyād.', 'Look! The neighbor’s coming.'),
                       P('هیس! داره گوش می‌ده!', 'his! dāre gush mide!', 'Shh! He’s listening!')]},
        ],
    }


def chapter():
    days = [day1(), day2(), day3(), day4(), day5()]
    labels = [
        P('ساعت', 'sā’at', 'clock'), P('وقت شامه!', 'vaght-e shāme!', 'dinner time! (stove)'),
        P('خسته نباشی!', 'khaste nabāshi!', 'welcome home! (front door, inside)'), P('ماشین', 'māshin', 'car (key hook)'),
        P('امروز', 'emruz', 'today (calendar)'), P('شنبه', 'shanbe', 'Saturday (calendar)'), P('یکشنبه', 'yekshanbe', 'Sunday (calendar)'),
        P('دوشنبه', 'doshanbe', 'Monday (calendar)'), P('سه‌شنبه', 'seshanbe', 'Tuesday (calendar)'), P('چهارشنبه', 'chāharshanbe', 'Wednesday (calendar)'),
        P('پنج‌شنبه', 'panjshanbe', 'Thursday (calendar)'), P('جمعه', 'jome', 'Friday (calendar)'),
        P('شیر', 'shir', 'milk (fridge)'), P('برنج', 'berenj', 'rice (pantry)'), P('سیب', 'sib', 'apples (fruit bowl)'),
        P('گوش بده!', 'gush bede!', 'listen! (kids’ room)'), P('نمی‌دونم!', 'nemidunam!', 'I don’t know! (junk drawer)'),
    ]
    weekend = [
        {'day': 'Saturday', 'topic': 'Next week, day by day', 'openers': [
            P('این هفته چی کار داری؟', 'in hafte chi kār dāri?', 'What do you have on this week?'),
            P('دوشنبه کجایی؟', 'doshanbe kojāyi?', 'Where are you on Monday?'),
            P('کی می‌ره دنبال بچه‌ها؟', 'ki mire donbāl-e bachchehā?', 'Who’s picking up the kids?')],
         'practice': [opt('شنبه', 'shanbe'), opt('سه‌شنبه', 'seshanbe'), opt('پنج‌شنبه', 'panjshanbe'), opt('جلسه دارم', 'jalase dāram'), opt('نمی‌تونم', 'nemitunam')],
         'massNote': 'Plan next week together, day by day, in Farsi. Sam knows the days and can say what he has on each: “seshanbe jalase dāram.”'},
        {'day': 'Sunday', 'topic': 'Gossip walk, part 2', 'openers': [
            P('می‌دونی چی شد؟', 'miduni chi shod?', 'Do you know what happened?'),
            P('به کسی نگو!', 'be kasi nagu!', 'Don’t tell anyone!'),
            P('داره گوش می‌ده!', 'dāre gush mide!', 'He’s listening!')],
         'practice': [opt('بگو!', 'begu!'), opt('نمی‌دونم', 'nemidunam'), opt('کسی نمی‌دونه', 'kasi nemidune'), opt('حرف نزن!', 'harf nazan!'), opt('داره میاد!', 'dāre miyād!')],
         'massNote': 'Go somewhere with people. Tell Sam a piece of gossip in Farsi (real or invented), starting with “miduni chi shod?” He has to say “begu!”'},
    ]
    return {
        'number': 2,
        'season': 1,
        'week': '2026-11-23',
        'title': P('روزمون', 'ruzemun', 'Our day'),
        'description': 'Schedules, work, and the school run. Six verbs that run a day (have, want, know, can, say, give), telling time, and ten more letters.',
        'objectives': [
            'Ask and tell the time, and talk about today, this week, work, and pickups.',
            'Conjugate six new verbs (have, want, know, can, say, give) in present and past, with negatives, and say what’s happening right now (dāram miram).',
            'Hear gh against g, catch the glottal stop, and recognize how this week’s verbs shrink in speech.',
            'Read and write 10 more letters (ز ذ ژ ج چ ح خ س ش م): 21 in all, including every letter that never joins forward.',
            'Add eight phrases to the gossip kit, and play “Sā’at chande, āghā gorge?” with the girls.',
        ],
        'letters': LETTERS,
        'words': NEW + REVIEW,
        'days': days,
        'weekendCards': weekend,
        'labels': labels,
    }


# ── Checks ─────────────────────────────────────────────────
def check_letters(ch):
    """Reading material may use only letters already taught. Fail loudly if not."""
    norm = lambda s: ''.join(c for c in s if '؀' <= c <= 'ۿ' and c not in 'ًٌٍَُِّْٰ‌،؛؟ـ')  # noqa: E731
    known = set(CH1_LETTERS)
    problems = []
    for d in ch['days']:
        for s in d['steps']:
            if s['type'] == 'script':
                for l in s['letters']:
                    known.add(l['ch'])
                    for e in l['examples']:
                        bad = set(norm(e['fa'])) - known
                        if bad:
                            problems.append(f"day {d['number']} {l['ch']} example {e['fa']}: {' '.join(sorted(bad))}")
                for q in s.get('readIt', []):
                    bad = set(norm(q['item']['fa'])) - known
                    if bad:
                        problems.append(f"day {d['number']} readIt {q['item']['fa']}: {' '.join(sorted(bad))}")
            items = s.get('items', []) if s['type'] == 'secret' else [q['item'] for q in s.get('questions', []) if q.get('type') == 'read']
            for it in items:
                bad = set(norm(it['fa'])) - known
                if bad:
                    problems.append(f"day {d['number']} {s['type']} {it['fa']}: {' '.join(sorted(bad))}")
    if problems:
        raise SystemExit('Letters not yet taught:\n  ' + '\n  '.join(problems))


if __name__ == '__main__':
    verbs = build_verbs()
    write_json('data/verbs.json', {'persons': PERSONS, 'verbs': verbs})
    reset_voices()
    ch = chapter()
    check_letters(ch)
    write_json('data/chapter-2.json', ch)
    sync_word_list(NEW, chapter=2, theme='Our Day')
    save_manifest()
