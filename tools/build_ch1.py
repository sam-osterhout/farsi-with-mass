"""Build Chapter 1 ("Good Morning"), the verb bank, and the audio manifest.

Run from the project root:  python3 tools/build_ch1.py
Then generate audio:          .venv/bin/python tools/gen_audio.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content import P, PERSONS, concat, write_json, save_manifest, ROOT  # noqa: E402
from verbs import build_verbs  # noqa: E402

WORDS = json.load(open(os.path.join(ROOT, 'data', 'words.json')))


def wid(fa):
    for w in WORDS:
        if w.get('persian_spoken') == fa:
            return w['id']
    raise KeyError(fa)


def word(id_, fa, tr, en, w=None, wtr=None, root=None, ex=None, new=True):
    d = {'id': id_, 'isNew': new, **P(fa, tr, en, w=w, wtr=wtr)}
    if root:
        d['root'] = root
    if ex:
        d['example'] = ex
    return d


# ── Words ──────────────────────────────────────────────────
NEW = [
    word(1006, 'بیدار', 'bidār', 'awake', ex=P('بیداری؟', 'bidāri?', 'Are you awake?')),
    word(1005, 'خسته', 'khaste', 'tired', root='From the old verb khastan, “to wound.” Tired is, literally, wounded.',
         ex=P('خسته‌ای؟', 'khaste-i?', 'Are you tired?')),
    word(1010, 'بلند شو', 'boland sho', 'get up!', root='boland (tall, high) + sho (become!). Become tall.',
         ex=P('بلند شو، دیر شد.', 'boland sho, dir shod.', 'Get up, it’s late.')),
    word(1007, 'بیا', 'biyā', 'come!', ex=P('بیا اینجا.', 'biyā injā.', 'Come here.')),
    word(1008, 'برو', 'boro', 'go!', ex=P('برو بیرون.', 'boro birun.', 'Go outside.')),
    word(1017, 'صبحونه', 'sobhune', 'breakfast', w='صبحانه', wtr='sobhāne',
         root='sobh (morning) + -āne, the suffix of belonging: the morning thing. Spoken Tehrani turns ān into un.',
         ex=P('صبحونه حاضره.', 'sobhune hāzere.', 'Breakfast is ready.')),
    word(1009, 'بشین', 'beshin', 'sit!', w='بنشین', wtr='beneshin', ex=P('بیا بشین.', 'biyā beshin.', 'Come sit.')),
    word(1011, 'صبر کن', 'sabr kon', 'wait!', root='sabr (patience) + kon (do!). Do patience.',
         ex=P('یه کم صبر کن.', 'ye kam sabr kon.', 'Wait a little.')),
    word(1014, 'یه کم', 'ye kam', 'a little', w='یک کم', wtr='yek kam', ex=P('یه کم چای می‌خوای؟', 'ye kam chāy mikhāy?', 'Do you want a little tea?')),
    word(1013, 'دوباره', 'dobāre', 'again', root='do (two) + bār (a time). A second time.',
         ex=P('دوباره بگو.', 'dobāre begu.', 'Say it again.')),
    word(1001, 'گشنه', 'goshne', 'hungry', w='گرسنه', wtr='gorosne', ex=P('گشنمه.', 'goshname.', 'I’m hungry. (literally “my hunger is”)')),
    word(1002, 'تشنه', 'teshne', 'thirsty', ex=P('تشنه‌ای؟', 'teshne-i?', 'Are you thirsty?')),
    word(1003, 'خوشحال', 'khoshhāl', 'happy', root='khosh (good) + hāl (state, condition). The same hāl as in hālet chetore, “how is your state?”',
         ex=P('خوشحالم که اینجایی.', 'khoshhālam ke injāyi.', 'I’m happy you’re here.')),
    word(1004, 'ناراحت', 'nārāhat', 'upset', root='nā- (not) + rāhat (at ease). Not at ease.',
         ex=P('چرا ناراحتی؟', 'cherā nārāhati?', 'Why are you upset?')),
    word(1015, 'حوصله', 'hosele', 'patience, mood for something',
         root='From the Arabic word for a bird’s crop, the pouch that holds its food. Your hosele is how much you can hold.',
         ex=P('حوصله ندارم.', 'hosele nadāram.', 'I’m not in the mood.')),
    word(1016, 'عجله', 'ajale', 'hurry, rush', ex=P('عجله نکن.', 'ajale nakon.', 'Don’t rush.')),
    word(1012, 'ببین', 'bebin', 'look! see!', root='be- + bin, the present stem of didan (to see). The same bin as durbin, the “far-seer” (camera).',
         ex=P('ببین چی درست کردم.', 'bebin chi dorost kardam.', 'Look what I made.')),
    word(1018, 'نگاه کن', 'negāh kon', 'look! (at something)', root='negāh (a look) + kon (do!). Do a look.',
         ex=P('نگاه کن! بارون میاد.', 'negāh kon! bārun miyād.', 'Look! It’s raining. (literally “rain comes”)')),
]


def review(fa, tr, en, w=None, wtr=None):
    return word(wid(fa), fa, tr, en, w=w, wtr=wtr, new=False)


REVIEW = [
    review('سلام', 'salām', 'hello'),
    review('آره', 'āre', 'yes', w='بله', wtr='bale') if any(w.get('persian_spoken') == 'آره' for w in WORDS) else None,
    review('خونه', 'khune', 'house, home', w='خانه', wtr='khāne'),
    review('نون', 'nun', 'bread', w='نان', wtr='nān'),
    review('پنیر', 'panir', 'cheese'),
    review('دیر', 'dir', 'late'),
    review('یواش', 'yavāsh', 'slowly, quietly'),
    review('آقا', 'āghā', 'sir, man'),
    review('خانوم', 'khānum', 'woman, wife, ma’am', w='خانم', wtr='khānom'),
    review('الان', 'alān', 'now'),
    review('اون', 'un', 'that; he/she', w='آن', wtr='ān'),
    review('بیرون', 'birun', 'outside', w='بیرون', wtr='birun'),
    review('در', 'dar', 'door'),
    review('دوربین', 'durbin', 'camera'),
    review('همسر', 'hamsar', 'spouse'),
    review('همکار', 'hamkār', 'co-worker'),
    review('پدر', 'pedar', 'father'),
    review('برادر', 'barādar', 'brother'),
    review('بارون', 'bārun', 'rain', w='باران', wtr='bārān'),
    review('باد', 'bād', 'wind'),
    review('دور', 'dur', 'far'),
]
REVIEW = [r for r in REVIEW if r]
RID = {r['tr']: r['id'] for r in REVIEW}


# ── Helpers for steps ──────────────────────────────────────
def scene(lines):
    """lines: (speaker, fa, tr, en). Mass = Dilara, Sam = Farid."""
    out = []
    for spk, fa, tr, en in lines:
        voice = {'Mass': 'd', 'Sam': 'f'}.get(spk, 'd')
        item = P(fa, tr, en, v=voice)
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


# ── Letters ────────────────────────────────────────────────
def letter(ch, name, sound, forms, connects, tip, examples):
    return {'ch': ch, 'name': name, 'sound': sound, 'forms': forms, 'connects': connects, 'tip': tip,
            'examples': [P(*e) for e in examples]}


L_ALEF = letter('ا', 'alef', 'ā in the middle or end of a word; at the very start it carries a short vowel (a, e, o)',
                {'isolated': 'ا', 'final': 'ـا'}, False,
                'One stroke, top to bottom. Alef never joins the letter after it, so there’s always a little gap to its left.',
                [('آب', 'āb', 'water'), ('بابا', 'bābā', 'dad')])
L_MADDE = letter('آ', 'alef madde', 'ā at the start of a word',
                 {'isolated': 'آ'}, False,
                 'Alef with a wavy hat (madde, “stretch”). The hat stretches the start of a word into a long ā: āb, āre, āghā.',
                 [('آب', 'āb', 'water')])
L_BE = letter('ب', 'be', 'b', {'initial': 'بـ', 'medial': 'ـبـ', 'final': 'ـب', 'isolated': 'ب'}, True,
              'A shallow boat, written right to left, then one dot underneath. Joined up, it shrinks to a small tooth with a dot below.',
              [('بابا', 'bābā', 'dad'), ('آب', 'āb', 'water')])
L_PE = letter('پ', 'pe', 'p', {'initial': 'پـ', 'medial': 'ـپـ', 'final': 'ـپ', 'isolated': 'پ'}, True,
              'The same boat as be, with three dots below. Arabic has no p sound, so Persian added the dots to make one. It’s a Persian letter.',
              [('پا', 'pā', 'foot, leg')])
L_TE = letter('ت', 'te', 't', {'initial': 'تـ', 'medial': 'ـتـ', 'final': 'ـت', 'isolated': 'ت'}, True,
              'The boat again, with two dots on top. Below means b or p; above means t, s, or n.',
              [('تاب', 'tāb', 'a swing'), ('تب', 'tab', 'fever')])
L_SE = letter('ث', 'se', 's (a rare spelling)', {'initial': 'ثـ', 'medial': 'ـثـ', 'final': 'ـث', 'isolated': 'ث'}, True,
              'Three dots on top. It sounds exactly like s and shows up only in words borrowed from Arabic, like masalan (for example). Learn to recognize it; you’ll rarely write it.',
              [])
L_NUN = letter('ن', 'nun', 'n', {'initial': 'نـ', 'medial': 'ـنـ', 'final': 'ـن', 'isolated': 'ن'}, True,
               'One dot on top. At the end of a word it becomes a deep bowl that dips below the line. In the middle it looks like be with the dot moved upstairs.',
               [('نان', 'nān', 'bread (written; Mass says nun)'), ('نی', 'ney', 'reed flute')])
L_YE = letter('ی', 'ye', 'y, or the vowel i (and ey at the end of some words)',
              {'initial': 'یـ', 'medial': 'ـیـ', 'final': 'ـی', 'isolated': 'ی'}, True,
              'Two dots below while it’s joining; at the end of a word the Persian ye drops its dots and curls back like a swan. It writes the long i in bidār and biyā.',
              [('بیا', 'biyā', 'come!'), ('آبی', 'ābi', 'blue'), ('بینی', 'bini', 'nose')])
L_DAL = letter('د', 'dāl', 'd', {'isolated': 'د', 'final': 'ـد'}, False,
               'A bent elbow sitting on the line. Like alef, it never joins the letter after it.',
               [('دیر', 'dir', 'late'), ('در', 'dar', 'door')])
L_RE = letter('ر', 're', 'r (lightly tapped, like the tt in Spanish “pero”)', {'isolated': 'ر', 'final': 'ـر'}, False,
              'A short slide that dips below the line. Never joins forward. Next week, dots turn it into z (ز) and zh (ژ).',
              [('برو', 'boro', 'go!'), ('پنیر', 'panir', 'cheese')])
L_VAV = letter('و', 'vāv', 'v, or the vowels u and o', {'isolated': 'و', 'final': 'ـو'}, False,
               'A small loop with a tail below the line. It writes v in vaght, u in nun, o in boro and to. Never joins forward.',
               [('نون', 'nun', 'bread'), ('تو', 'to', 'you'), ('دور', 'dur', 'far')])


def read_q(fa, answer, others):
    opts = [answer] + others
    return {'type': 'read', 'item': P(fa, answer), 'options': opts, 'answer': 0}


# ── Days ───────────────────────────────────────────────────
def day1():
    lines, full = scene([
        ('Mass', 'صبح بخیر! بیدار شو.', 'sobh bekheyr! bidār sho.', 'Good morning! Wake up.'),
        ('Sam', 'صبح بخیر… خسته‌ام.', 'sobh bekheyr… khaste-am.', 'Good morning… I’m tired.'),
        ('Mass', 'بلند شو! دیر شد.', 'boland sho! dir shod.', 'Get up! It got late.'),
        ('Sam', 'باشه، باشه… الان میام.', 'bāshe, bāshe… alān miyām.', 'Okay, okay… I’m coming now.'),
        ('Mass', 'زود باش! بیا.', 'zud bāsh! biyā.', 'Hurry up! Come.'),
        ('Sam', 'اومدم!', 'umadam!', 'Coming! (literally “I came!”)'),
    ])
    return {
        'number': 1,
        'title': P('بیدار شو', 'bidār sho', 'Wake up'),
        'subtitle': 'Come and go: the first two verbs of every morning',
        'objective': 'Understand Mass’s wake-up commands, conjugate come and go in three tenses, and read your first word: آب.',
        'newWordIds': [1006, 1005, 1010, 1007, 1008],
        'reviewWordIds': [RID['dir'], RID['alān']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 6,
             'instruction': 'Every lesson opens by pulling old words out of memory. Getting some wrong is how the remembering gets stronger.'},
            {'type': 'listen', 'title': 'Listen first', 'minutes': 3, 'audio': full,
             'instruction': 'It’s 7 a.m. Sam is still in bed. Mass is already up. Play the scene twice before you look at the words. The English is hidden: tap a line to reveal it.',
             'lines': lines},
            {'type': 'words', 'title': 'New words', 'minutes': 4,
             'instruction': 'Five words from the scene. Tap to hear each one, say it out loud, and read the small story under the words that have one.'},
            {'type': 'verbs', 'title': 'Verb lab: come and go', 'minutes': 8, 'verbs': ['amadan', 'raftan'],
             'intro': 'This week’s focus is the command (biyā! boro!), but a verb only makes sense once you see its whole life. Every Persian verb has two stems: one for the past and one for the present. The endings stay the same everywhere: <b>-am</b> (I), <b>-i</b> (you), <b>-e</b> (he/she), <b>-im</b> (we), <b>-in</b> (you, polite or plural), <b>-an</b> (they). In the tables, the prefix is coral, the stem is blue, and the ending is green. Tap any form to hear it.',
             'quiz': [conj('raftan', 'raftan', 'past', 0), conj('raftan', 'raftan', 'present', 2), conj('amadan', 'amadan', 'present', 0),
                      conj('amadan', 'amadan', 'past', 3), conj('raftan', 'raftan', 'imperative', 2), conj('amadan', 'amadan', 'imperative', 1),
                      conj('raftan', 'raftan', 'neg_present', 0), conj('amadan', 'amadan', 'neg_past', 1)]},
            {'type': 'ear', 'title': 'Ear gym: ā or a?', 'minutes': 3,
             'instruction': 'Persian has a long, open ā (like “father”) and a short a (like “cat”). They change meaning. Listen to each pair until you can hear the difference, then take the test. Two voices speak, because hearing many voices trains the ear faster.',
             'pairs': [pair(('باد', 'bād', 'wind'), ('بد', 'bad', 'bad'), 'ā / a'),
                       pair(('ماست', 'māst', 'yogurt'), ('مست', 'mast', 'drunk'), 'ā / a'),
                       pair(('کار', 'kār', 'work'), ('کم', 'kam', 'a little'), 'ā / a')],
             'rounds': 6},
            {'type': 'script', 'title': 'Reading: ا آ ب پ', 'minutes': 6, 'letters': [L_ALEF, L_MADDE, L_BE, L_PE],
             'intro': 'Persian runs right to left, and most letters hold hands with the next one, so each letter has up to four shapes: alone, at the start, in the middle, and at the end. The good news is that the shape barely changes. What changes are the dots. Learn letters in families: sound first, then shape, then name.',
             'readIt': [read_q('آب', 'āb', ['bābā', 'pā', 'ab']), read_q('بابا', 'bābā', ['pāpā', 'āb', 'bā']),
                        read_q('پا', 'pā', ['bā', 'āb', 'pāpā'])]},
            {'type': 'shadow', 'title': 'Shadow Mass', 'minutes': 3,
             'instruction': 'Play a line, then say it right on top of the voice, matching the rhythm and melody. Record yourself and compare. Shadowing trains your mouth and your ear together.',
             'lines': [lines[0], lines[2], lines[4], lines[5]]},
            {'type': 'check', 'title': 'Day 1 check', 'minutes': 4, 'questions': [
                {'type': 'listen', 'item': P('بلند شو', 'boland sho', 'Get up!'), 'options': ['Get up!', 'Come!', 'Go!', 'Wake up!'], 'answer': 0},
                {'type': 'mc', 'prompt': 'How do you say “Come!”?', 'options': [opt('بیا', 'biyā'), opt('برو', 'boro'), opt('بشین', 'beshin'), opt('بلند شو', 'boland sho')], 'answer': 0},
                conj('raftan', 'raftan', 'past', 0),
                {'type': 'mc', 'prompt': 'Mass calls you from the kitchen. You’re on your way. What do you shout?',
                 'options': [opt('اومدم!', 'umadam!'), opt('می‌رم!', 'miram!'), opt('برو!', 'boro!'), opt('نیا!', 'nayā!')], 'answer': 0,
                 'explain': 'Persian says “I came!” while it’s still coming.'},
                {'type': 'type', 'item': P('برو', 'boro', 'Go!'), 'prompt': 'Type what you hear, in English letters.'},
                read_q('آب', 'āb', ['pā', 'bābā', 'ab']),
                {'type': 'build', 'en': 'Okay, I’m coming now.', 'tiles': [opt('باشه', 'bāshe'), opt('الان', 'alān'), opt('میام', 'miyām')]},
                conj('amadan', 'amadan', 'present', 4),
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Persian books open from what you’d call the back. Flip your notebook over and start on the right-hand page. This notebook is now Persian.',
                'Write ا, آ, ب, and پ five times each, right to left, saying the sound every time: ā… b… p…',
                'Write آب (āb), بابا (bābā), and پا (pā) three times each. Under each one, write the phonetics and the meaning.',
                'Copy the past tense of raftan (go) from the verb lab, in phonetics: raftam, rafti, raft… Then cover it and write it again from memory.',
                'On a page at the back, start a list called “Verbs I own.” Add umadan and raftan with both stems.',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'Waking up', 'openers': [
                P('صبح بخیر! بیدار شدی؟', 'sobh bekheyr! bidār shodi?', 'Good morning! Did you wake up?'),
                P('خسته‌ای؟', 'khaste-i?', 'Are you tired?'),
                P('کی بیدار شدی؟', 'key bidār shodi?', 'When did you wake up?'),
             ], 'practice': [opt('بیدار', 'bidār'), opt('خسته', 'khaste'), opt('بلند شو', 'boland sho'), opt('بیا', 'biyā'), opt('برو', 'boro'), opt('اومدم!', 'umadam!')],
             'massNote': 'Sam is practicing come and go. When you call him, make him answer “umadam!”'},
            {'type': 'teach', 'title': 'Teach the girls: Bābā mige', 'game': 'Simon Says, Persian style. “Bābā mige…” means “Dad says…”. Call a command and they do it, but only if you said “Bābā mige” first. Older kids can take a turn calling the commands to catch you out.',
             'items': [P('بابا میگه بیا!', 'bābā mige biyā!', 'Dad says come!'), P('بابا میگه برو!', 'bābā mige boro!', 'Dad says go!'),
                       P('بابا میگه بشین!', 'bābā mige beshin!', 'Dad says sit!'), P('بابا میگه بلند شو!', 'bābā mige boland sho!', 'Dad says stand up!'),
                       P('بابا میگه ببین!', 'bābā mige bebin!', 'Dad says look!')]},
        ],
    }


def day2():
    lines, full = scene([
        ('Mass', 'صبحونه حاضره. بیا بشین.', 'sobhune hāzere. biyā beshin.', 'Breakfast is ready. Come sit.'),
        ('Sam', 'چای هست؟', 'chāy hast?', 'Is there tea?'),
        ('Mass', 'آره. یه کم صبر کن.', 'āre. ye kam sabr kon.', 'Yes. Wait a little.'),
        ('Sam', 'نون و پنیر هم هست؟', 'nun-o panir ham hast?', 'Is there bread and cheese too?'),
        ('Mass', 'آره عزیزم. بشین، بخور.', 'āre azizam. beshin, bokhor.', 'Yes, dear. Sit, eat.'),
        ('Sam', 'ممنون! دوباره چای!', 'mamnun! dobāre chāy!', 'Thanks! Tea again!'),
    ])
    return {
        'number': 2,
        'title': P('صبحونه حاضره', 'sobhune hāzere', 'Breakfast is ready'),
        'subtitle': 'Sit, wait, get up, wake up: the verb that becomes',
        'objective': 'Follow a breakfast exchange, see how one helper verb builds “get up” and “wake up,” and read بیا and نان.',
        'newWordIds': [1017, 1009, 1011, 1014, 1013],
        'reviewWordIds': [RID['nun'], RID['panir']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 6, 'instruction': 'Yesterday’s words and some old friends from Mango.'},
            {'type': 'listen', 'title': 'Listen first', 'minutes': 3, 'audio': full,
             'instruction': 'Breakfast. Listen twice, then tap lines for the English.', 'lines': lines},
            {'type': 'words', 'title': 'New words', 'minutes': 4, 'instruction': 'Five words for the table.'},
            {'type': 'verbs', 'title': 'Verb lab: become and sit', 'minutes': 8, 'verbs': ['shodan', 'neshastan'],
             'intro': '<b>shodan</b> means “to become,” and it’s the engine behind half of yesterday’s words. Put an adjective in front and only shodan conjugates: <b>boland</b> (tall) + shodan = get up; <b>bidār</b> (awake) + shodan = wake up. Switch between them with the tabs and watch only the second word change. In these compounds the command drops its be-: boland sho, not boland besho.',
             'quiz': [conj('shodan', 'boland_shodan', 'present', 0), conj('shodan', 'bidar_shodan', 'past', 1),
                      conj('neshastan', 'neshastan', 'past', 3), conj('neshastan', 'neshastan', 'imperative', 0),
                      conj('shodan', 'boland_shodan', 'imperative', 2), conj('neshastan', 'neshastan', 'present', 5),
                      conj('shodan', 'bidar_shodan', 'neg_past', 0), conj('neshastan', 'neshastan', 'imperative', 1)]},
            {'type': 'ear', 'title': 'Ear gym: kh or h?', 'minutes': 3,
             'instruction': 'Persian kh (خ) is a scrape at the back of the throat, like the ch in Bach. Plain h (ح or ه) is just breath. Mass’s “hālet chetore” starts with breath, not a scrape.',
             'pairs': [pair(('خال', 'khāl', 'a mole, beauty mark'), ('حال', 'hāl', 'state, condition'), 'kh / h'),
                       pair(('خر', 'khar', 'donkey'), ('هر', 'har', 'every'), 'kh / h'),
                       pair(('خواب', 'khāb', 'sleep'), ('آب', 'āb', 'water'), 'kh / nothing')],
             'rounds': 6},
            {'type': 'script', 'title': 'Reading: ت ث ن ی', 'minutes': 6, 'letters': [L_TE, L_SE, L_NUN, L_YE],
             'intro': 'Four letters that share be’s boat. The dots tell them apart: two on top for t, three on top for s, one on top for n. Ye is the shape-shifter: it’s y, it’s the long i, and at the end of a word it loses its dots. Short vowels (a, e, o) usually aren’t written at all. You supply them from memory of the word, and as a speaker you already have that memory.',
             'readIt': [read_q('بیا', 'biyā', ['bābā', 'tāb', 'boro']), read_q('نان', 'nān', ['bān', 'tān', 'nun']),
                        read_q('آبی', 'ābi', ['āb', 'bini', 'tāb']), read_q('نی', 'ney', ['bi', 'ti', 'pā'])],
             'aside': 'نی (ney) is the reed flute, the first image of Rumi’s Masnavi: “Listen to this reed, how it complains.” You can already read the word that starts the most famous poem in the language.'},
            {'type': 'shadow', 'title': 'Shadow Mass', 'minutes': 3, 'instruction': 'Match her rhythm. Record, compare, repeat.',
             'lines': [lines[0], lines[2], lines[4]]},
            {'type': 'check', 'title': 'Day 2 check', 'minutes': 4, 'questions': [
                {'type': 'listen', 'item': P('صبر کن', 'sabr kon', 'Wait!'), 'options': ['Wait!', 'Sit!', 'Look!', 'Again!'], 'answer': 0},
                {'type': 'mc', 'prompt': 'Mass has set the table. Which line means “Come sit”?', 'options': [opt('بیا بشین', 'biyā beshin'), opt('بیا ببین', 'biyā bebin'), opt('برو بشین', 'boro beshin'), opt('بلند شو', 'boland sho')], 'answer': 0},
                conj('neshastan', 'neshastan', 'past', 3),
                conj('shodan', 'boland_shodan', 'present', 0),
                {'type': 'mc', 'prompt': 'Which means “a little”?', 'options': [opt('یه کم', 'ye kam'), opt('دوباره', 'dobāre'), opt('صبر', 'sabr'), opt('حوصله', 'hosele')], 'answer': 0},
                {'type': 'type', 'item': P('دوباره', 'dobāre', 'again'), 'prompt': 'Type what you hear, in English letters.'},
                read_q('نان', 'nān', ['bān', 'nun', 'tān']),
                {'type': 'build', 'en': 'Wait a little.', 'tiles': [opt('یه کم', 'ye kam'), opt('صبر کن', 'sabr kon')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Write ت, ث, ن, and ی five times each in all their shapes. Say the sound every time.',
                'Write بیا, نان, آبی, and نی. Under each: phonetics and meaning.',
                'Draw a two-column table: “boland misham / boland shodam,” all six persons, from memory. Check it against the verb lab.',
                'Add shodan and neshastan to “Verbs I own.” Note the collision: nashin = “don’t sit” and “don’t become.”',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'At the breakfast table', 'openers': [
                P('صبحونه چی می‌خوری؟', 'sobhune chi mikhori?', 'What are you having for breakfast?'),
                P('چای می‌خوای؟', 'chāy mikhāy?', 'Do you want tea?'),
                P('بیا بشین.', 'biyā beshin.', 'Come sit.'),
             ], 'practice': [opt('صبحونه', 'sobhune'), opt('بشین', 'beshin'), opt('صبر کن', 'sabr kon'), opt('یه کم', 'ye kam'), opt('دوباره', 'dobāre')],
             'massNote': 'Sam is learning sit, wait, and again. When he says something, ask him to say it again: “dobāre begu!”'},
        ],
    }


def day3():
    lines, full = scene([
        ('Sam', 'حالت چطوره؟', 'hālet chetore?', 'How are you?'),
        ('Mass', 'خوبم، ولی خسته‌ام. تو چطوری؟', 'khubam, vali khaste-am. to chetori?', 'I’m fine, but I’m tired. How are you?'),
        ('Sam', 'من خوشحالم! ولی گشنمه.', 'man khoshhālam! vali goshname.', 'I’m happy! But I’m hungry.'),
        ('Mass', 'عجله نکن. صبحونه حاضره.', 'ajale nakon. sobhune hāzere.', 'Don’t rush. Breakfast is ready.'),
        ('Sam', 'چرا ناراحتی؟', 'cherā nārāhati?', 'Why are you upset?'),
        ('Mass', 'ناراحت نیستم. فقط حوصله ندارم.', 'nārāhat nistam. faghat hosele nadāram.', 'I’m not upset. I’m just not in the mood.'),
    ])
    return {
        'number': 3,
        'title': P('حالت چطوره؟', 'hālet chetore?', 'How are you?'),
        'subtitle': 'Be and do: feelings, and the verb that builds verbs',
        'objective': 'Say how you feel with the hidden “be” endings, use kardan to wait and hurry, and read بیدار and برو on your own.',
        'newWordIds': [1001, 1002, 1003, 1004, 1015, 1016],
        'reviewWordIds': [RID['khune']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 6, 'instruction': 'Retrieval first, always.'},
            {'type': 'listen', 'title': 'Listen first', 'minutes': 3, 'audio': full, 'instruction': 'A morning check-in. Listen twice before reading.', 'lines': lines},
            {'type': 'words', 'title': 'New words', 'minutes': 5, 'instruction': 'Six words for how you feel.'},
            {'type': 'verbs', 'title': 'Verb lab: be and do', 'minutes': 9, 'verbs': ['budan', 'kardan'],
             'intro': '<b>budan</b> (to be) hides in the present: the endings alone carry it. Khub (fine) + am = <b>khubam</b>, I’m fine. After a word ending in a vowel, like khaste, the endings sit apart: khaste-am. In the negative, “be” borrows its own word: <b>nistam</b>, I’m not. <b>kardan</b> (to do) is the Lego verb: patience + do = wait; haste + do = hurry; a look + do = look.',
             'quiz': [conj('budan', 'budan_khaste', 'present', 1), conj('budan', 'budan_khoshhal', 'present', 0), conj('budan', 'budan_khub', 'neg_present', 0),
                      conj('budan', 'budan_khaste', 'past', 0), conj('kardan', 'ajale_kardan', 'imperative', 2), conj('kardan', 'sabr_kardan', 'present', 0),
                      conj('kardan', 'sabr_kardan', 'past', 3), conj('kardan', 'negah_kardan', 'imperative', 0)]},
            {'type': 'rule', 'title': 'Ear gym: written vs. spoken', 'minutes': 4,
             'instruction': 'Why does Mass say khune when the dictionary says khāne? Spoken Tehrani follows rules, and once you know them, her speech stops sounding like a different language from the textbook.',
             'rules': [
                 {'name': 'ān → un', 'text': 'A long ā before n becomes u.', 'examples': [
                     (P('خانه', 'khāne', 'house (written)', v='d'), P('خونه', 'khune', 'house (spoken)', v='d')),
                     (P('صبحانه', 'sobhāne', 'breakfast (written)', v='f'), P('صبحونه', 'sobhune', 'breakfast (spoken)', v='f')),
                     (P('نان', 'nān', 'bread (written)', v='d'), P('نون', 'nun', 'bread (spoken)', v='d')),
                     (P('باران', 'bārān', 'rain (written)', v='f'), P('بارون', 'bārun', 'rain (spoken)', v='f'))]},
                 {'name': 'verbs shrink', 'text': 'Written -ad becomes -e, -id becomes -in, -and becomes -an, and stems get squeezed.', 'examples': [
                     (P('می‌رود', 'miravad', 'goes (written)', v='d'), P('می‌ره', 'mire', 'goes (spoken)', v='d')),
                     (P('می‌آید', 'miāyad', 'comes (written)', v='f'), P('میاد', 'miyād', 'comes (spoken)', v='f')),
                     (P('می‌نشینید', 'mineshinid', 'you sit (written)', v='d'), P('می‌شینین', 'mishinin', 'you sit (spoken)', v='d'))]},
             ], 'rounds': 6},
            {'type': 'script', 'title': 'Reading: د ر و (the letters that never join forward)', 'minutes': 7, 'letters': [L_DAL, L_RE, L_VAV],
             'intro': 'Seven Persian letters refuse to join the letter after them: ا د ذ ر ز ژ و. You’ve met four. After one of them, the next letter starts fresh, which is why بیدار has a gap after the alef. With these three, a lot of your vocabulary suddenly becomes readable.',
             'readIt': [read_q('بیدار', 'bidār', ['pedar', 'dir', 'barādar']), read_q('برو', 'boro', ['biyā', 'birun', 'dur']),
                        read_q('پنیر', 'panir', ['pedar', 'birun', 'nun']), read_q('نون', 'nun', ['nān', 'dur', 'tu']),
                        read_q('برو بیرون', 'boro birun', ['biyā tu', 'bārun', 'dur'])],
             'aside': 'Two phrases you can now read and use at the front door: بیا تو (biyā tu, come in!) and برو بیرون (boro birun, go outside!).'},
            {'type': 'shadow', 'title': 'Shadow Mass', 'minutes': 3, 'instruction': 'Feelings carry melody. Copy her tune, not just her words.',
             'lines': [lines[1], lines[3], lines[5]]},
            {'type': 'check', 'title': 'Day 3 check', 'minutes': 4, 'questions': [
                {'type': 'listen', 'item': P('خوشحالم', 'khoshhālam', 'I’m happy'), 'options': ['I’m happy', 'I’m tired', 'I’m hungry', 'I’m upset'], 'answer': 0},
                conj('budan', 'budan_khaste', 'present', 1),
                conj('kardan', 'ajale_kardan', 'imperative', 2),
                {'type': 'mc', 'prompt': 'How do you say “I’m not upset”?', 'options': [opt('ناراحت نیستم', 'nārāhat nistam'), opt('ناراحت نبودم', 'nārāhat nabudam'), opt('ناراحتم', 'nārāhatam'), opt('ناراحت نکن', 'nārāhat nakon')], 'answer': 0},
                read_q('بیدار', 'bidār', ['pedar', 'dir', 'barādar']),
                read_q('برو بیرون', 'boro birun', ['biyā tu', 'bārun', 'dur']),
                {'type': 'type', 'item': P('تشنه', 'teshne', 'thirsty'), 'prompt': 'Type what you hear, in English letters.'},
                {'type': 'build', 'en': 'Why are you upset?', 'tiles': [opt('چرا', 'cherā'), opt('ناراحتی؟', 'nārāhati?')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Write د, ر, and و five times each. Then write all 10 letters from this week in a row, from memory.',
                'Write these words in script, with phonetics and meaning under each: بیدار، برو، دیر، پنیر، نون، بیرون، دوربین.',
                'Write a feelings table in phonetics: khaste-am, khaste-i, khastas… then the same for khoshhāl.',
                'Write three true sentences about how you feel today, in phonetics. Read them to Mass.',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'How are you, really?', 'openers': [
                P('حالت چطوره؟', 'hālet chetore?', 'How are you?'),
                P('خسته‌ای؟', 'khaste-i?', 'Are you tired?'),
                P('چرا ناراحتی؟', 'cherā nārāhati?', 'Why are you upset?'),
             ], 'practice': [opt('خوشحال', 'khoshhāl'), opt('ناراحت', 'nārāhat'), opt('گشنه', 'goshne'), opt('تشنه', 'teshne'), opt('حوصله', 'hosele')],
             'massNote': 'Sam is learning to say how he feels (khaste-am, khoshhālam). Ask him how he is, and make him answer in full.'},
        ],
    }


def day4():
    story, full = scene([
        ('', 'صبحه. سام و معصومه تو خونه‌ان.', 'sobhe. sām-o ma’sume tu khune-an.', 'It’s morning. Sam and Massoumeh are at home.'),
        ('Mass', 'ببین! اون آقا رو ببین!', 'bebin! un āghā ro bebin!', 'Look! Look at that man!'),
        ('Sam', 'کدوم آقا؟', 'kodum āghā?', 'Which man?'),
        ('Mass', 'یواش! نگاه نکن!', 'yavāsh! negāh nakon!', 'Quietly! Don’t look!'),
        ('Sam', 'دیرش شد!', 'dir-esh shod!', 'He’s late!'),
        ('Mass', 'آره. هر روز دیر می‌ره.', 'āre. har ruz dir mire.', 'Yes. Every day he leaves late.'),
        ('Sam', 'بیچاره! خسته‌س.', 'bichāre! khastas.', 'Poor guy! He’s tired.'),
        ('Mass', 'نه، تنبله!', 'na, tanbale!', 'No, he’s lazy!'),
    ])
    hafez = [P('صبح است ساقیا قدحی پر شراب کن', 'sobh ast sāghiyā ghadahi por sharāb kon', 'It’s morning, cupbearer: fill a cup with wine.', v='f'),
             P('دور فلک درنگ ندارد شتاب کن', 'dowr-e falak derang nadārad shetāb kon', 'The turning sky won’t linger. Hurry.', v='f')]
    gossip = [P('ببین!', 'bebin!', 'Look!'), P('اون آقا رو ببین.', 'un āghā ro bebin.', 'Look at that man.'),
              P('اون خانومو ببین.', 'un khānum-o bebin.', 'Look at that woman.'), P('یواش!', 'yavāsh!', 'Quietly!'),
              P('نگاه نکن!', 'negāh nakon!', 'Don’t look!'), P('دیدی؟!', 'didi?!', 'Did you see?!'),
              P('الان نه.', 'alān na.', 'Not now.'), P('بعداً می‌گم.', 'ba’dan migam.', 'I’ll tell you later.')]
    return {
        'number': 4,
        'title': P('همسایه', 'hamsāye', 'The neighbor'),
        'subtitle': 'Story day: see and eat, the first gossip, and a line of Hafez',
        'objective': 'Follow a short story, gossip quietly with Mass, and read a line of Hafez with a word-by-word key.',
        'newWordIds': [1012, 1018],
        'reviewWordIds': [RID['yavāsh'], RID['āghā'], RID['khānum'], RID['un']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: what do you remember?', 'minutes': 2, 'count': 8, 'instruction': 'Mixed: this week and older words.'},
            {'type': 'story', 'title': 'Story, episode 1: The neighbor', 'minutes': 6, 'audio': full,
             'instruction': 'Sam and Massoumeh, by the window, every episode. Listen to the whole episode before reading. Then read along line by line.',
             'lines': story, 'questions': [
                 {'type': 'mc', 'prompt': 'Who is late?', 'options': ['the man across the street', 'Sam', 'Massoumeh', 'nobody'], 'answer': 0},
                 {'type': 'mc', 'prompt': 'What does Mass tell Sam when he turns to look?', 'options': [opt('نگاه نکن!', 'negāh nakon!', 'Don’t look!'), opt('بیا!', 'biyā!', 'Come!'), opt('برو!', 'boro!', 'Go!'), opt('بشین!', 'beshin!', 'Sit!')], 'answer': 0},
                 {'type': 'mc', 'prompt': 'Sam thinks the man is tired. What does Mass think?', 'options': ['He’s lazy.', 'He’s sick.', 'He’s happy.', 'He’s hungry.'], 'answer': 0},
             ]},
            {'type': 'words', 'title': 'New words', 'minutes': 2, 'instruction': 'Two ways to say look, plus the review words the story leans on.'},
            {'type': 'verbs', 'title': 'Verb lab: see and eat', 'minutes': 8, 'verbs': ['didan', 'khordan'],
             'intro': '<b>didan</b> (to see) has one of the most useful present stems in the language: <b>bin</b>. <b>khordan</b> (to eat) covers drinking too: Persians eat their tea. Use the tabs to try khordan with breakfast and with tea, and notice that the command keeps its bo- here.',
             'quiz': [conj('didan', 'didan', 'past', 1), conj('didan', 'didan', 'present', 0), conj('khordan', 'sobhune_khordan', 'past', 0),
                      conj('khordan', 'chay_khordan', 'present', 4), conj('didan', 'didan', 'imperative', 2), conj('khordan', 'khordan', 'imperative', 0),
                      conj('didan', 'didan', 'neg_past', 0), conj('khordan', 'khordan', 'neg_present', 2)]},
            {'type': 'gossip', 'title': 'Gossip kit, part 1', 'minutes': 3,
             'intro': 'Your dream is to hold a whispered conversation with Mass in public. It starts with eight phrases, almost all of them commands you now know how to build.',
             'phrases': gossip,
             'proverb': P('دیوار موش داره، موش هم گوش داره.', 'divār mush dāre, mush ham gush dāre.', 'The wall has mice, and the mice have ears.'),
             'tip': 'Assume the person at the next table speaks Persian. Tehranis are everywhere.'},
            {'type': 'verse', 'title': 'A line of Hafez', 'minutes': 4, 'poet': 'Hafez of Shiraz, 14th century',
             'lines': hafez,
             'gloss': [opt('صبح', 'sobh', 'morning'), opt('است', 'ast', 'is (written form of -e)'), opt('ساقیا', 'sāghiyā', 'O cupbearer'),
                       opt('قدحی', 'ghadahi', 'a cup'), opt('پر', 'por', 'full'), opt('شراب', 'sharāb', 'wine'), opt('کن', 'kon', 'make! (from kardan)'),
                       opt('دور فلک', 'dowr-e falak', 'the turning of the sky'), opt('درنگ', 'derang', 'delay'), opt('ندارد', 'nadārad', 'doesn’t have'),
                       opt('شتاب', 'shetāb', 'haste')],
             'note': 'Both halves end on kon, the same command as in sabr kon. Hafez gives two orders: fill the cup, and hurry. Iranians open his book at random for a fortune (fāl-e Hafez), above all on Yalda night, December 21. You’ll do that in Chapter 5.'},
            {'type': 'roots', 'title': 'Word stories: the bin family', 'minutes': 3, 'items': [
                {'word': P('دوربین', 'durbin', 'camera'), 'parts': [opt('دور', 'dur', 'far'), opt('بین', 'bin', 'see (stem of didan)')], 'story': 'A far-seer. Originally binoculars, now any camera.'},
                {'word': P('خوش‌بین', 'khoshbin', 'optimist'), 'parts': [opt('خوش', 'khosh', 'good'), opt('بین', 'bin', 'see')], 'story': 'Someone who sees good.'},
                {'word': P('بدبین', 'badbin', 'pessimist'), 'parts': [opt('بد', 'bad', 'bad'), opt('بین', 'bin', 'see')], 'story': 'Someone who sees bad. It also means suspicious, as in suspicious of your neighbors.'},
             ]},
            {'type': 'check', 'title': 'Day 4 check', 'minutes': 4, 'questions': [
                conj('didan', 'didan', 'past', 1),
                conj('khordan', 'sobhune_khordan', 'past', 0),
                {'type': 'mc', 'prompt': 'Whisper “Quietly!”', 'options': [opt('یواش!', 'yavāsh!'), opt('ببین!', 'bebin!'), opt('دیدی؟', 'didi?'), opt('دیر!', 'dir!')], 'answer': 0},
                {'type': 'listen', 'item': P('اون آقا رو ببین', 'un āghā ro bebin', 'Look at that man'), 'options': ['Look at that man.', 'Look at that woman.', 'Don’t look!', 'Did you see?'], 'answer': 0},
                read_q('دوربین', 'durbin', ['dur', 'birun', 'bidār']),
                {'type': 'mc', 'prompt': 'In Hafez’s line, kon is the same verb as in…', 'options': [opt('صبر کن', 'sabr kon'), opt('برو', 'boro'), opt('ببین', 'bebin'), opt('بیدار', 'bidār')], 'answer': 0},
                {'type': 'build', 'en': 'Did you see? Don’t look!', 'tiles': [opt('دیدی؟', 'didi?'), opt('نگاه نکن!', 'negāh nakon!')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 10, 'print': True, 'tasks': [
                'Copy Hafez’s couplet in phonetics, with the English under it. Underline both kon.',
                'Start a page at the back called “Word stories.” Add durbin, khoshbin, badbin, and the words with a story from this week (khaste, sobhune, dobāre, khoshhāl, nārāhat).',
                'Write the gossip kit in phonetics. Pick your three favorites and mark them for this weekend.',
                'In script, write دوربین and بیرون. You can write every letter in them.',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'People-watching', 'openers': [
                P('اون آقا رو ببین!', 'un āghā ro bebin!', 'Look at that man!'),
                P('دیدی؟!', 'didi?!', 'Did you see?!'),
                P('یواش!', 'yavāsh!', 'Quietly!'),
             ], 'practice': [opt('ببین', 'bebin'), opt('نگاه کن', 'negāh kon'), opt('یواش', 'yavāsh'), opt('دیدی؟', 'didi?'), opt('بعداً می‌گم', 'ba’dan migam')],
             'massNote': 'Sam is learning to gossip. Point at someone on TV or out the window and whisper about them in Farsi.'},
        ],
    }


def day5():
    secret = [P('بابا، بیا تو!', 'bābā, biyā tu!', 'Dad, come in!'), P('نون و پنیر', 'nun-o panir', 'bread and cheese'),
              P('برو بیرون!', 'boro birun!', 'Go outside!'), P('پدر و برادر', 'pedar-o barādar', 'father and brother'),
              P('دیر', 'dir', 'late'), P('بارون', 'bārun', 'rain')]
    return {
        'number': 5,
        'title': P('همه با هم', 'hame bā ham', 'All together'),
        'subtitle': 'Review day: all eight verbs, all ten letters, and the ham- family',
        'objective': 'Conjugate eight verbs on demand, read six phrases with no help, and plan the weekend with Mass.',
        'newWordIds': [],
        'reviewWordIds': [RID['hamsar'], RID['hamkār']],
        'steps': [
            {'type': 'warmup', 'title': 'Warm-up: the whole week', 'minutes': 3, 'count': 10, 'chapterOnly': True, 'instruction': 'Ten words from this chapter, shuffled.'},
            {'type': 'earmix', 'title': 'Ear gym: mixed review', 'minutes': 4, 'instruction': 'Every pair from this week, shuffled together. Mixing them is harder, and harder is better for memory.', 'rounds': 10},
            {'type': 'verbgym', 'title': 'Verb gym: all eight verbs', 'minutes': 8, 'count': 14,
             'instruction': 'Random persons, tenses, and verbs, including negatives. It isn’t meant to be easy. A wrong answer shows you the right one.'},
            {'type': 'secret', 'title': 'Secret messages', 'minutes': 5,
             'instruction': 'Every letter in these phrases is one you learned this week. Read each one out loud, then tap to check.', 'items': secret},
            {'type': 'roots', 'title': 'Word stories: the ham- family', 'minutes': 4, 'intro': 'You described hamsar as “other head.” It’s closer to “same head”: ham means same, together, or shared.',
             'items': [
                 {'word': P('همسر', 'hamsar', 'spouse'), 'parts': [opt('هم', 'ham', 'same, shared'), opt('سر', 'sar', 'head')], 'story': 'One who shares your head, usually glossed as sharing a pillow. Massoumeh is your hamsar.'},
                 {'word': P('همسایه', 'hamsāye', 'neighbor'), 'parts': [opt('هم', 'ham', 'shared'), opt('سایه', 'sāye', 'shade, shadow')], 'story': 'The people who share your shade. Like the lazy man in the story.'},
                 {'word': P('همکار', 'hamkār', 'co-worker'), 'parts': [opt('هم', 'ham', 'shared'), opt('کار', 'kār', 'work')], 'story': 'One who shares your work.'},
                 {'word': P('همراه', 'hamrāh', 'companion; also, a cell phone'), 'parts': [opt('هم', 'ham', 'shared'), opt('راه', 'rāh', 'road')], 'story': 'One who shares your road. Iranians call a cell phone a “mobile” or a telefon-e hamrāh, the phone that travels with you.'},
             ]},
            {'type': 'check', 'title': 'Chapter 1 check', 'minutes': 5, 'questions': [
                conj('raftan', 'raftan', 'past', 3), conj('amadan', 'amadan', 'imperative', 0), conj('shodan', 'bidar_shodan', 'past', 0),
                conj('neshastan', 'neshastan', 'imperative', 2), conj('budan', 'budan_khub', 'present', 1), conj('kardan', 'sabr_kardan', 'imperative', 0),
                conj('didan', 'didan', 'past', 1), conj('khordan', 'khordan', 'present', 0),
                {'type': 'listen', 'item': P('بیا بشین، صبحونه بخور', 'biyā beshin, sobhune bokhor', 'Come sit, eat breakfast'), 'options': ['Come sit, eat breakfast.', 'Go outside, it’s late.', 'Wait a little, I’m coming.', 'Look, it’s raining.'], 'answer': 0},
                read_q('پنیر', 'panir', ['pedar', 'birun', 'bārun']),
                {'type': 'build', 'en': 'Get up, it’s late!', 'tiles': [opt('بلند شو', 'boland sho'), opt('دیر', 'dir'), opt('شد', 'shod')]},
            ]},
            {'type': 'notebook', 'title': 'In your notebook', 'minutes': 12, 'print': True, 'tasks': [
                'From memory, write all 10 letters in every shape they take. Then check.',
                'Write the six secret messages in script, then the phonetics under each.',
                'Fill one page with a verb chart from memory: raftan, umadan, didan, and khordan in the past tense, all six persons.',
                'Write five sentences about your morning in phonetics. Use at least three different verbs and one negative.',
                'Add the ham- family to “Word stories.”',
            ]},
            {'type': 'talk', 'title': 'Talk with Mass', 'topic': 'What did you do today?', 'openers': [
                P('امروز چیکار کردی؟', 'emruz chikār kardi?', 'What did you do today?'),
                P('صبحونه چی خوردی؟', 'sobhune chi khordi?', 'What did you have for breakfast?'),
                P('کجا رفتی؟', 'kojā rafti?', 'Where did you go?'),
             ], 'practice': [opt('رفتم', 'raftam'), opt('اومدم', 'umadam'), opt('خوردم', 'khordam'), opt('دیدم', 'didam'), opt('نشستم', 'neshastam')],
             'massNote': 'Sam has learned the past tense of eight verbs. Ask him what he did today, and push for full sentences.'},
            {'type': 'teach', 'title': 'Teach the girls: a morning routine',
             'game': 'Pick one line a day and use it every morning this week. Routines beat lessons with kids. By Friday it’s just how mornings sound.',
             'items': [P('صبح بخیر!', 'sobh bekheyr!', 'Good morning!'), P('بیدار شو!', 'bidār sho!', 'Wake up!'),
                       P('صبحونه بخور!', 'sobhune bokhor!', 'Eat your breakfast!'), P('زود باش!', 'zud bāsh!', 'Hurry up!'),
                       P('خوب باشین!', 'khub bāshin!', 'Be good, everyone!'), P('خداحافظ!', 'khodāhāfez!', 'Goodbye!')]},
            {'type': 'massvoice', 'title': 'Optional: Mass’s voice', 'minutes': 0,
             'instruction': 'The computer voices are clear but tidy. Real speech is faster and messier, and the fastest way to train your ear is many real voices. If Mass is willing, ask her to record these on her phone at her normal speed. Listen to them on walks.',
             'items': [P('صبح بخیر! بیدار شو.', 'sobh bekheyr! bidār sho.', 'Good morning! Wake up.'),
                       P('بلند شو، دیر شد!', 'boland sho, dir shod!', 'Get up, it’s late!'),
                       P('صبحونه حاضره. بیا بشین.', 'sobhune hāzere. biyā beshin.', 'Breakfast is ready. Come sit.'),
                       P('یه کم صبر کن.', 'ye kam sabr kon.', 'Wait a little.'),
                       P('خسته‌ای؟', 'khaste-i?', 'Are you tired?'),
                       P('چرا ناراحتی؟', 'cherā nārāhati?', 'Why are you upset?'),
                       P('اون آقا رو ببین!', 'un āghā ro bebin!', 'Look at that man!'),
                       P('یواش! نگاه نکن!', 'yavāsh! negāh nakon!', 'Quietly! Don’t look!')]},
        ],
    }


def chapter():
    days = [day1(), day2(), day3(), day4(), day5()]
    labels = [
        P('در', 'dar', 'door'), P('بیا تو!', 'biyā tu!', 'come in! (front door, inside)'), P('برو بیرون!', 'boro birun!', 'go outside! (back door)'),
        P('آب', 'āb', 'water (sink)'), P('نون', 'nun', 'bread (bread box)'), P('پنیر', 'panir', 'cheese (fridge)'),
        P('چای', 'chāy', 'tea (kettle)'), P('صبر کن…', 'sabr kon…', 'wait… (kettle)'), P('صبحونه', 'sobhune', 'breakfast (table)'),
        P('بشین!', 'beshin!', 'sit! (chair)'), P('میز', 'miz', 'table'), P('صندلی', 'sandali', 'chair'),
        P('پنجره', 'panjere', 'window'), P('نگاه کن!', 'negāh kon!', 'look! (window)'), P('بیدار شو!', 'bidār sho!', 'wake up! (bedroom door)'),
        P('بلند شو!', 'boland sho!', 'get up! (bedside)'), P('یواش!', 'yavāsh!', 'quietly! (kids’ door)'), P('دوربین', 'durbin', 'camera'),
    ]
    weekend = [
        {'day': 'Saturday', 'topic': 'Weekend plans', 'openers': [
            P('فردا کجا می‌ریم؟', 'fardā kojā mirim?', 'Where are we going tomorrow?'),
            P('بریم بیرون؟', 'berim birun?', 'Shall we go out?'),
            P('کی بیدار شدی؟', 'key bidār shodi?', 'When did you wake up?')],
         'practice': [opt('می‌ریم', 'mirim'), opt('میایم', 'miyāym'), opt('بیرون', 'birun'), opt('دیر', 'dir')],
         'massNote': 'Sam knows the present tense also means the near future: “fardā mirim” = we’ll go tomorrow. Make plans with him in Farsi.'},
        {'day': 'Sunday', 'topic': 'First gossip walk', 'openers': [
            P('اون خانومو ببین.', 'un khānum-o bebin.', 'Look at that woman.'),
            P('نگاه نکن!', 'negāh nakon!', 'Don’t look!'),
            P('بعداً می‌گم.', 'ba’dan migam.', 'I’ll tell you later.')],
         'practice': [opt('ببین', 'bebin'), opt('یواش', 'yavāsh'), opt('دیدی؟', 'didi?'), opt('خسته‌س', 'khastas'), opt('تنبله', 'tanbale')],
         'massNote': 'Go somewhere public: a café, a grocery store, a park. Sam wants to whisper about people in Farsi. Keep it kind… or don’t.'},
    ]
    return {
        'number': 1,
        'season': 1,
        'week': '2026-11-16',
        'title': P('صبح بخیر', 'sobh bekheyr', 'Good morning'),
        'description': 'The house wakes up. Commands, the first eight verbs in three tenses, and the first ten letters.',
        'objectives': [
            'Understand and give the commands of a morning: wake up, get up, come, go, sit, wait, look, eat.',
            'Conjugate eight verbs in present, past, and command, with negatives, for all six persons.',
            'Hear the difference between ā and a, kh and h, and written and spoken forms.',
            'Read and write 10 letters (ا آ ب پ ت ث ن ی د ر و) and about 25 real words made from them.',
            'Whisper your first gossip to Mass, and teach the girls “Bābā mige.”',
        ],
        'letters': ['ا', 'آ', 'ب', 'پ', 'ت', 'ث', 'ن', 'ی', 'د', 'ر', 'و'],
        'words': NEW + REVIEW,
        'days': days,
        'weekendCards': weekend,
        'labels': labels,
    }


if __name__ == '__main__':
    verbs = build_verbs()
    write_json('data/verbs.json', {'persons': PERSONS, 'verbs': verbs})
    write_json('data/chapter-1.json', chapter())
    save_manifest()
