"""Add a precise-style `tr` field to data/words.json from the Mango-style spelling.

Mango style: ah = long a, ee = i, oo = u, caps mark stress, hyphens split syllables.
Precise style: ā, i, u, lowercase, no hyphens. "ah" becomes ā only when the Persian
spelling has as many ا/آ as the phonetics has "ah"; otherwise the word is flagged.
Run: python3 tools/convert_pron.py [--report]
"""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, 'data', 'words.json')
VOWELS = 'aeiouā'


def convert(pron, script):
    s = pron.lower().replace('-', '').strip()
    s = s.replace('ee', 'i').replace('oo', 'u')
    alefs = sum(script.count(c) for c in 'اآ')
    # "ah" followed by a vowel is a real h (sahar), never a long a
    candidates = [m.start() for m in re.finditer(r'ah(?![aeiouā])', s)]
    flag = False
    if candidates and alefs == 0:
        # no alef in the script: "ah" is a + h when the word has ه/ح, else a short a
        s = re.sub(r'ah(?![aeiouā])', 'ah' if re.search('[هح]', script) else 'a', s)
    else:
        if len(candidates) > alefs:
            flag = True
        s = re.sub(r'ah(?![aeiouā])', 'ā', s)
    s = re.sub(r'eh\b', 'e', s)
    return s, flag


# Hand corrections for words the rules can't resolve
OVERRIDES = {
    33: 'mifahmam', 36: 'bebakhshid', 57: 'maryam', 72: 'khoshvaght',
    85: 'takht-e jamshid', 88: 'sefārat', 95: 'naghshe', 99: 'jelo',
    133: 'faghat', 154: 'dah', 155: 'yāzdah', 156: 'davāzdah', 157: 'sizdah',
    159: 'punzdah', 160: 'shunzdah', 161: 'hivdah', 162: 'hijdah', 163: 'nuzdah',
    215: 'negah dār', 241: 'badan', 278: 'neveshtan', 374: 'bah bah',
    607: 'sahrā', 266: 'tāblo',
}


def main():
    words = json.load(open(PATH))
    flagged = []
    for w in words:
        pron = w.get('spoken_pronunciation') or w.get('pronunciation') or ''
        script = w.get('persian_spoken') or w.get('persian_written') or ''
        tr, flag = convert(pron, script)
        if w['id'] in OVERRIDES:
            tr, flag = OVERRIDES[w['id']], False
        w['tr'] = tr
        if flag:
            flagged.append((w['id'], script, pron, tr))
    json.dump(words, open(PATH, 'w'), ensure_ascii=False, indent=1)
    if '--report' in sys.argv:
        for f in flagged:
            print(*f, sep=' | ')
    print(f'{len(words)} words converted, {len(flagged)} flagged for review')


if __name__ == '__main__':
    main()
