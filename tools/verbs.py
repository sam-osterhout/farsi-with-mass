"""The verb bank. Spoken Tehrani forms first, written forms after.

Row format: spoken script | spoken phonetics | written script | written phonetics
Phonetics markup: {prefix} stem [ending]. Spoken forms were written by Claude
and haven't been checked by a native speaker; correct them here if Mass says otherwise.
"""
from content import table, P

AMADAN = dict(
    present='''
میام | {mi}yā[m] | می‌آیم | {mi}āy[am]
میای | {mi}yā[y] | می‌آیی | {mi}āy[i]
میاد | {mi}yā[d] | می‌آید | {mi}āy[ad]
میایم | {mi}yā[ym] | می‌آییم | {mi}āy[im]
میاین | {mi}yā[yn] | می‌آیید | {mi}āy[id]
میان | {mi}yā[n] | می‌آیند | {mi}āy[and]''',
    past='''
اومدم | umad[am] | آمدم | āmad[am]
اومدی | umad[i] | آمدی | āmad[i]
اومد | umad | آمد | āmad
اومدیم | umad[im] | آمدیم | āmad[im]
اومدین | umad[in] | آمدید | āmad[id]
اومدن | umad[an] | آمدند | āmad[and]''',
    imp='''
بیا | {bi}yā | بیا | {bi}yā
بیاین | {bi}yā[yn] | بیایید | {bi}yāy[id]
نیا | {na}yā | نیا | {na}yā
نیاین | {na}yā[yn] | نیایید | {na}yāy[id]''',
)
AMADAN_NEG_PAST = '''
نیومدم | {na}yumad[am] | نیامدم | {na}yāmad[am]
نیومدی | {na}yumad[i] | نیامدی | {na}yāmad[i]
نیومد | {na}yumad | نیامد | {na}yāmad
نیومدیم | {na}yumad[im] | نیامدیم | {na}yāmad[im]
نیومدین | {na}yumad[in] | نیامدید | {na}yāmad[id]
نیومدن | {na}yumad[an] | نیامدند | {na}yāmad[and]'''

RAFTAN = dict(
    present='''
می‌رم | {mi}r[am] | می‌روم | {mi}rav[am]
می‌ری | {mi}r[i] | می‌روی | {mi}rav[i]
می‌ره | {mi}r[e] | می‌رود | {mi}rav[ad]
می‌ریم | {mi}r[im] | می‌رویم | {mi}rav[im]
می‌رین | {mi}r[in] | می‌روید | {mi}rav[id]
می‌رن | {mi}r[an] | می‌روند | {mi}rav[and]''',
    past='''
رفتم | raft[am] | رفتم | raft[am]
رفتی | raft[i] | رفتی | raft[i]
رفت | raft | رفت | raft
رفتیم | raft[im] | رفتیم | raft[im]
رفتین | raft[in] | رفتید | raft[id]
رفتن | raft[an] | رفتند | raft[and]''',
    imp='''
برو | {bo}ro | برو | {bo}ro
برین | {bo}r[in] | بروید | {be}rav[id]
نرو | {na}ro | نرو | {na}ro
نرین | {na}r[in] | نروید | {na}rav[id]''',
)

SHODAN = dict(
    present='''
می‌شم | {mi}sh[am] | می‌شوم | {mi}shav[am]
می‌شی | {mi}sh[i] | می‌شوی | {mi}shav[i]
می‌شه | {mi}sh[e] | می‌شود | {mi}shav[ad]
می‌شیم | {mi}sh[im] | می‌شویم | {mi}shav[im]
می‌شین | {mi}sh[in] | می‌شوید | {mi}shav[id]
می‌شن | {mi}sh[an] | می‌شوند | {mi}shav[and]''',
    past='''
شدم | shod[am] | شدم | shod[am]
شدی | shod[i] | شدی | shod[i]
شد | shod | شد | shod
شدیم | shod[im] | شدیم | shod[im]
شدین | shod[in] | شدید | shod[id]
شدن | shod[an] | شدند | shod[and]''',
    imp='''
بشو | {be}sho | بشو | {be}sho
بشین | {be}sh[in] | بشوید | {be}shav[id]
نشو | {na}sho | نشو | {na}sho
نشین | {na}sh[in] | نشوید | {na}shav[id]''',
)
SHODAN_BARE_IMP = '''
شو | sho | شو | sho
شین | sh[in] | شوید | shav[id]
نشو | {na}sho | نشو | {na}sho
نشین | {na}sh[in] | نشوید | {na}shav[id]'''

NESHASTAN = dict(
    present='''
می‌شینم | {mi}shin[am] | می‌نشینم | {mi}neshin[am]
می‌شینی | {mi}shin[i] | می‌نشینی | {mi}neshin[i]
می‌شینه | {mi}shin[e] | می‌نشیند | {mi}neshin[ad]
می‌شینیم | {mi}shin[im] | می‌نشینیم | {mi}neshin[im]
می‌شینین | {mi}shin[in] | می‌نشینید | {mi}neshin[id]
می‌شینن | {mi}shin[an] | می‌نشینند | {mi}neshin[and]''',
    past='''
نشستم | neshast[am] | نشستم | neshast[am]
نشستی | neshast[i] | نشستی | neshast[i]
نشست | neshast | نشست | neshast
نشستیم | neshast[im] | نشستیم | neshast[im]
نشستین | neshast[in] | نشستید | neshast[id]
نشستن | neshast[an] | نشستند | neshast[and]''',
    imp='''
بشین | {be}shin | بنشین | {be}neshin
بشینین | {be}shin[in] | بنشینید | {be}neshin[id]
نشین | {na}shin | ننشین | {na}neshin
نشینین | {na}shin[in] | ننشینید | {na}neshin[id]''',
)

KARDAN = dict(
    present='''
می‌کنم | {mi}kon[am] | می‌کنم | {mi}kon[am]
می‌کنی | {mi}kon[i] | می‌کنی | {mi}kon[i]
می‌کنه | {mi}kon[e] | می‌کند | {mi}kon[ad]
می‌کنیم | {mi}kon[im] | می‌کنیم | {mi}kon[im]
می‌کنین | {mi}kon[in] | می‌کنید | {mi}kon[id]
می‌کنن | {mi}kon[an] | می‌کنند | {mi}kon[and]''',
    past='''
کردم | kard[am] | کردم | kard[am]
کردی | kard[i] | کردی | kard[i]
کرد | kard | کرد | kard
کردیم | kard[im] | کردیم | kard[im]
کردین | kard[in] | کردید | kard[id]
کردن | kard[an] | کردند | kard[and]''',
    imp='''
بکن | {bo}kon | بکن | {bo}kon
بکنین | {bo}kon[in] | بکنید | {bo}kon[id]
نکن | {na}kon | نکن | {na}kon
نکنین | {na}kon[in] | نکنید | {na}kon[id]''',
)
KARDAN_BARE_IMP = '''
کن | kon | کن | kon
کنین | kon[in] | کنید | kon[id]
نکن | {na}kon | نکن | {na}kon
نکنین | {na}kon[in] | نکنید | {na}kon[id]'''

DIDAN = dict(
    present='''
می‌بینم | {mi}bin[am] | می‌بینم | {mi}bin[am]
می‌بینی | {mi}bin[i] | می‌بینی | {mi}bin[i]
می‌بینه | {mi}bin[e] | می‌بیند | {mi}bin[ad]
می‌بینیم | {mi}bin[im] | می‌بینیم | {mi}bin[im]
می‌بینین | {mi}bin[in] | می‌بینید | {mi}bin[id]
می‌بینن | {mi}bin[an] | می‌بینند | {mi}bin[and]''',
    past='''
دیدم | did[am] | دیدم | did[am]
دیدی | did[i] | دیدی | did[i]
دید | did | دید | did
دیدیم | did[im] | دیدیم | did[im]
دیدین | did[in] | دیدید | did[id]
دیدن | did[an] | دیدند | did[and]''',
    imp='''
ببین | {be}bin | ببین | {be}bin
ببینین | {be}bin[in] | ببینید | {be}bin[id]
نبین | {na}bin | نبین | {na}bin
نبینین | {na}bin[in] | نبینید | {na}bin[id]''',
)

KHORDAN = dict(
    present='''
می‌خورم | {mi}khor[am] | می‌خورم | {mi}khor[am]
می‌خوری | {mi}khor[i] | می‌خوری | {mi}khor[i]
می‌خوره | {mi}khor[e] | می‌خورد | {mi}khor[ad]
می‌خوریم | {mi}khor[im] | می‌خوریم | {mi}khor[im]
می‌خورین | {mi}khor[in] | می‌خورید | {mi}khor[id]
می‌خورن | {mi}khor[an] | می‌خورند | {mi}khor[and]''',
    past='''
خوردم | khord[am] | خوردم | khord[am]
خوردی | khord[i] | خوردی | khord[i]
خورد | khord | خورد | khord
خوردیم | khord[im] | خوردیم | khord[im]
خوردین | khord[in] | خوردید | khord[id]
خوردن | khord[an] | خوردند | khord[and]''',
    imp='''
بخور | {bo}khor | بخور | {bo}khor
بخورین | {bo}khor[in] | بخورید | {bo}khor[id]
نخور | {na}khor | نخور | {na}khor
نخورین | {na}khor[in] | نخورید | {na}khor[id]''',
)


def budan(adj_fa, adj_tr, vowel_final=False):
    """'To be' with an adjective. The present hides inside the endings."""
    a, t = adj_fa, adj_tr
    if vowel_final:
        present = f'''
{a}‌ام | {t}-[am] | {a}‌ام | {t}-[am]
{a}‌ای | {t}-[i] | {a}‌ای | {t}-[i]
{a}‌س | {t[:-1]}a[s] | {a} است | {t} [ast]
{a}‌ایم | {t}-[im] | {a}‌ایم | {t}-[im]
{a}‌این | {t}-[in] | {a}‌اید | {t}-[id]
{a}‌ان | {t}-[an] | {a}‌اند | {t}-[and]'''
    else:
        present = f'''
{a}م | {t}[am] | {a}م | {t}[am]
{a}ی | {t}[i] | {a}ی | {t}[i]
{a}ه | {t}[e] | {a} است | {t} [ast]
{a}یم | {t}[im] | {a}یم | {t}[im]
{a}ین | {t}[in] | {a}ید | {t}[id]
{a}ن | {t}[an] | {a}ند | {t}[and]'''
    neg_present = f'''
{a} نیستم | {t} nist[am] | {a} نیستم | {t} nist[am]
{a} نیستی | {t} nist[i] | {a} نیستی | {t} nist[i]
{a} نیست | {t} nist | {a} نیست | {t} nist
{a} نیستیم | {t} nist[im] | {a} نیستیم | {t} nist[im]
{a} نیستین | {t} nist[in] | {a} نیستید | {t} nist[id]
{a} نیستن | {t} nist[an] | {a} نیستند | {t} nist[and]'''
    past = f'''
{a} بودم | {t} bud[am] | {a} بودم | {t} bud[am]
{a} بودی | {t} bud[i] | {a} بودی | {t} bud[i]
{a} بود | {t} bud | {a} بود | {t} bud
{a} بودیم | {t} bud[im] | {a} بودیم | {t} bud[im]
{a} بودین | {t} bud[in] | {a} بودید | {t} bud[id]
{a} بودن | {t} bud[an] | {a} بودند | {t} bud[and]'''
    neg_past = f'''
{a} نبودم | {t} {{na}}bud[am] | {a} نبودم | {t} {{na}}bud[am]
{a} نبودی | {t} {{na}}bud[i] | {a} نبودی | {t} {{na}}bud[i]
{a} نبود | {t} {{na}}bud | {a} نبود | {t} {{na}}bud
{a} نبودیم | {t} {{na}}bud[im] | {a} نبودیم | {t} {{na}}bud[im]
{a} نبودین | {t} {{na}}bud[in] | {a} نبودید | {t} {{na}}bud[id]
{a} نبودن | {t} {{na}}bud[an] | {a} نبودند | {t} {{na}}bud[and]'''
    imp = f'''
{a} باش | {t} bāsh | {a} باش | {t} bāsh
{a} باشین | {t} bāsh[in] | {a} باشید | {t} bāsh[id]
{a} نباش | {t} {{na}}bāsh | {a} نباش | {t} {{na}}bāsh
{a} نباشین | {t} {{na}}bāsh[in] | {a} نباشید | {t} {{na}}bāsh[id]'''
    return dict(present=present, past=past, imp=imp), neg_present, neg_past


def build_verbs():
    bud_khub, np_khub, npast_khub = budan('خوب', 'khub')
    bud_khosh, np_khosh, npast_khosh = budan('خوشحال', 'khoshhāl')
    bud_khaste, np_khaste, npast_khaste = budan('خسته', 'khaste', vowel_final=True)

    verbs = {
        'amadan': {
            'inf': P('اومدن', 'umadan', 'to come', w='آمدن', wtr='āmadan'),
            'stems': {'past': 'umad- (written āmad-)', 'present': 'ā- / yā-'},
            'irregular': True,
            'story': 'Come. The two stems barely resemble each other: past umad-, present ā-, which sounds like yā- after mi- or bi-. Persian shouts “umadam!” (literally “I came!”) to mean “Coming!”, as if it has already arrived. “Khosh umadi” (welcome) is literally “you came well.”',
            'variants': [
                {'id': 'amadan', 'label': P('اومدن', 'umadan', 'to come'), **table(AMADAN, ('come', 'comes', 'came'), neg_past_spec=AMADAN_NEG_PAST)},
            ],
        },
        'raftan': {
            'inf': P('رفتن', 'raftan', 'to go'),
            'stems': {'past': 'raft-', 'present': 'rav- (spoken: just r-)'},
            'irregular': True,
            'story': 'Go. In the present, the stem rav- shrinks to a single r: miram, I go. In the command, be- becomes bo- because the o in ro pulls the vowel toward itself: boro. Persian likes its vowels to rhyme. The stem makes nouns too: piyāde-ro, the “foot-goer,” is a sidewalk.',
            'variants': [
                {'id': 'raftan', 'label': P('رفتن', 'raftan', 'to go'), **table(RAFTAN, ('go', 'goes', 'went'))},
            ],
        },
        'shodan': {
            'inf': P('شدن', 'shodan', 'to become'),
            'stems': {'past': 'shod-', 'present': 'shav- (spoken: just sh-)'},
            'irregular': True,
            'story': 'Become. The busiest verb in the house: it turns an adjective into an event. Boland (tall) + shodan gives “get up,” literally “become tall.” Bidār (awake) + shodan gives “wake up.” Only shodan changes; the adjective stays put. One collision to watch: nashin can mean “don’t become” (to a group) and also “don’t sit.” Context decides.',
            'variants': [
                {'id': 'boland_shodan', 'label': P('بلند شدن', 'boland shodan', 'to get up'), **table(SHODAN, ('get up', 'gets up', 'got up'), prefix=('بلند', 'boland'), imp_spec=SHODAN_BARE_IMP)},
                {'id': 'bidar_shodan', 'label': P('بیدار شدن', 'bidār shodan', 'to wake up'), **table(SHODAN, ('wake up', 'wakes up', 'woke up'), prefix=('بیدار', 'bidār'), imp_spec=SHODAN_BARE_IMP)},
                {'id': 'shodan', 'label': P('شدن', 'shodan', 'to become'), **table(SHODAN, ('become', 'becomes', 'became'))},
            ],
        },
        'neshastan': {
            'inf': P('نشستن', 'neshastan', 'to sit'),
            'stems': {'past': 'neshast-', 'present': 'neshin- (spoken: shin-)'},
            'irregular': True,
            'story': 'Sit. Spoken Tehrani swallows the first syllable of the present stem: mineshinam becomes mishinam. The stem also makes people: shahr-neshin (city-sitter) is a city dweller, and ruz-neshin, the “day-sitter,” is a person stuck at home.',
            'variants': [
                {'id': 'neshastan', 'label': P('نشستن', 'neshastan', 'to sit'), **table(NESHASTAN, ('sit', 'sits', 'sat'))},
            ],
        },
        'budan': {
            'inf': P('بودن', 'budan', 'to be'),
            'stems': {'past': 'bud-', 'present': 'hidden in the endings (-am, -i, -e…), or bāsh- for commands'},
            'irregular': True,
            'story': 'Be. A cousin of English “be,” from the same ancient root. In the present it hides: the endings do the work, so khubam means “I’m fine.” It shows itself in the past (budam, I was) and borrows its own word for “not” (nistam, I’m not). To someone who has been working, Persians say “khaste nabāshi”: may you not be tired.',
            'variants': [
                {'id': 'budan_khub', 'label': P('خوب بودن', 'khub budan', 'to be fine / good'), **table(bud_khub, ('be fine', 'is fine', 'was fine'), neg_present_spec=np_khub, neg_past_spec=npast_khub, be='fine')},
                {'id': 'budan_khoshhal', 'label': P('خوشحال بودن', 'khoshhāl budan', 'to be happy'), **table(bud_khosh, ('be happy', 'is happy', 'was happy'), neg_present_spec=np_khosh, neg_past_spec=npast_khosh, be='happy')},
                {'id': 'budan_khaste', 'label': P('خسته بودن', 'khaste budan', 'to be tired'), **table(bud_khaste, ('be tired', 'is tired', 'was tired'), neg_present_spec=np_khaste, neg_past_spec=npast_khaste, be='tired')},
            ],
        },
        'kardan': {
            'inf': P('کردن', 'kardan', 'to do, to make'),
            'stems': {'past': 'kard-', 'present': 'kon-'},
            'irregular': True,
            'story': 'Do, make. Same ancient root as the Sanskrit karma. Persian builds verbs from it like Lego: sabr (patience) + kardan is “wait,” ajale (haste) + kardan is “hurry,” negāh (a look) + kardan is “look.” In these compounds the command usually drops bo-: sabr kon, not sabr bokon.',
            'variants': [
                {'id': 'sabr_kardan', 'label': P('صبر کردن', 'sabr kardan', 'to wait'), **table(KARDAN, ('wait', 'waits', 'waited'), prefix=('صبر', 'sabr'), imp_spec=KARDAN_BARE_IMP)},
                {'id': 'ajale_kardan', 'label': P('عجله کردن', 'ajale kardan', 'to hurry'), **table(KARDAN, ('hurry', 'hurries', 'hurried'), prefix=('عجله', 'ajale'), imp_spec=KARDAN_BARE_IMP)},
                {'id': 'negah_kardan', 'label': P('نگاه کردن', 'negāh kardan', 'to look'), **table(KARDAN, ('look', 'looks', 'looked'), prefix=('نگاه', 'negāh'), imp_spec=KARDAN_BARE_IMP)},
                {'id': 'kardan', 'label': P('کردن', 'kardan', 'to do'), **table(KARDAN, ('do', 'does', 'did'))},
            ],
        },
        'didan': {
            'inf': P('دیدن', 'didan', 'to see'),
            'stems': {'past': 'did-', 'present': 'bin-'},
            'irregular': True,
            'story': 'See. Past did-, present bin-, and that bin is everywhere: durbin (far-seer) is a camera, khoshbin (good-seer) an optimist, badbin (bad-seer) a pessimist. And “didi?!” (did you see?!) is the gossip’s favorite word.',
            'variants': [
                {'id': 'didan', 'label': P('دیدن', 'didan', 'to see'), **table(DIDAN, ('see', 'sees', 'saw'))},
            ],
        },
        'khordan': {
            'inf': P('خوردن', 'khordan', 'to eat'),
            'stems': {'past': 'khord-', 'present': 'khor-'},
            'irregular': False,
            'story': 'Eat. Persians also eat water and tea: āb khordan, chāy khordan. Here the command keeps its bo-, because breakfast and tea are things being eaten, not part of the verb: sobhune bokhor!',
            'variants': [
                {'id': 'khordan', 'label': P('خوردن', 'khordan', 'to eat'), **table(KHORDAN, ('eat', 'eats', 'ate'))},
                {'id': 'sobhune_khordan', 'label': P('صبحونه خوردن', 'sobhune khordan', 'to eat breakfast'), **table(KHORDAN, ('eat breakfast', 'eats breakfast', 'ate breakfast'), prefix=('صبحونه', 'sobhune'))},
                {'id': 'chay_khordan', 'label': P('چای خوردن', 'chāy khordan', 'to drink tea'), **table(KHORDAN, ('drink tea', 'drinks tea', 'drank tea'), prefix=('چای', 'chāy'))},
            ],
        },
    }
    return verbs
