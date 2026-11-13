/* ══════════════════════════════════════════════
   FARSI WITH MASS — Application
   Rule one: Persian never appears without its phonetics.
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Icons ──────────────────────────────────
  const svg = (p, fill) => '<svg viewBox="0 0 24 24" fill="' + (fill ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  const ICONS = {
    home: svg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
    book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
    cards: svg('<rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="22" x2="16" y2="22"/>'),
    map: svg('<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>'),
    edit: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    play: svg('<polygon points="6 4 20 12 6 20 6 4"/>', true),
    slow: svg('<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>'),
    mic: svg('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/>'),
    stop: svg('<rect x="6" y="6" width="12" height="12" rx="1"/>', true),
    check: svg('<polyline points="20 6 9 17 4 12"/>'),
    x: svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    left: svg('<polyline points="15 18 9 12 15 6"/>'),
    right: svg('<polyline points="9 18 15 12 9 6"/>'),
    trash: svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    plus: svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
    print: svg('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'),
    pen: svg('<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'),
    eye: svg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
    shuffle: svg('<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>'),
  };

  const ALPHABET = 'ا آ ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی'.split(' ');
  const LETTER_COUNT = 32; // آ counts with ا

  // ─── State ──────────────────────────────────
  const state = {
    words: [], chapters: {}, verbs: null, course: null,
    srs: {}, wordLog: [], progress: {}, settings: {},
    view: 'dashboard', ch: null, day: null, printCh: null, printDay: null,
    flash: { filter: 'due', mode: 'fa2en', index: 0, flipped: false, deck: [] },
  };
  const QZ = {};      // question key -> runtime record
  const GROUPS = {};  // step key -> { keys: [], ch, day, step }
  const ROUNDS = {};  // step key -> ear/rule round state
  const VUI = {};     // verb table UI state
  const RECS = {};    // shadow recordings: key -> object URL
  const GEN = {};     // cached generated content per step key

  // ─── Storage ────────────────────────────────
  const PREFIX = 'farsi_';
  function save(key, value) { try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ } }
  function load(key, fallback) {
    try { const raw = localStorage.getItem(PREFIX + key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }

  // ─── Utilities ──────────────────────────────
  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function toast(msg) {
    let el = $('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ─── Progress ───────────────────────────────
  const sk = (ch, day, i) => ch + '_' + day + '_' + i;
  function isDone(ch, day, i) { return !!state.progress[sk(ch, day, i)]; }
  function markDone(ch, day, i) {
    const key = sk(ch, day, i);
    if (state.progress[key]) return;
    state.progress[key] = true;
    save('progress', state.progress);
    const el = $('#step_' + i);
    if (el && state.view === 'day') {
      el.classList.add('step-done');
      const num = $('.step-number', el);
      if (num) num.innerHTML = ICONS.check;
      const btn = $('.mark-done', el);
      if (btn) btn.outerHTML = '<div class="done-note">' + ICONS.check + ' Done</div>';
    }
    const step = getDay(ch, day).steps[i];
    if (step.type === 'script') toast('Letters learned: ' + step.letters.map((l) => l.ch).join(' '));
  }
  function getDay(ch, day) { return state.chapters[ch].days.find((d) => d.number === day); }
  function dayProgress(ch, day) {
    const d = getDay(ch, day);
    const steps = d.steps.filter((s) => s.type !== 'massvoice');
    let done = 0;
    d.steps.forEach((s, i) => { if (s.type !== 'massvoice' && isDone(ch, day, i)) done++; });
    return { done, total: steps.length };
  }
  function chapterProgress(ch) {
    let done = 0, total = 0;
    state.chapters[ch].days.forEach((d) => { const p = dayProgress(ch, d.number); done += p.done; total += p.total; });
    return { done, total };
  }

  // ─── Letters learned ───────────────────────
  function learnedLetters() {
    const set = new Set();
    Object.keys(state.chapters).forEach((c) => {
      state.chapters[c].days.forEach((d) => {
        d.steps.forEach((s, i) => {
          if (s.type === 'script' && isDone(+c, d.number, i)) s.letters.forEach((l) => { set.add(l.ch); if (l.ch === 'ا') set.add('آ'); });
        });
      });
    });
    return set;
  }
  function normalizeScript(text) {
    return (text || '').replace(/[ً-ٰٟ‌‍\s.,!?؟،؛:…«»"'()\-–—]/g, '')
      .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[أإ]/g, 'ا').replace(/ة/g, 'ه').replace(/ـ/g, '');
  }
  let LEARNED = new Set();
  function canRead(fa) {
    if (!LEARNED.size || !fa) return false;
    const chars = normalizeScript(fa);
    if (!chars) return false;
    for (const c of chars) if (!LEARNED.has(c)) return false;
    return true;
  }

  // ─── SRS (SM-2 inspired) ────────────────────
  function srsCard(id) {
    if (!state.srs[id]) state.srs[id] = { ease: 2.5, interval: 0, reps: 0, due: Date.now(), last: null };
    return state.srs[id];
  }
  function review(id, quality) {
    const c = srsCard(id), DAY = 86400000;
    if (quality < 2) { c.reps = 0; c.interval = quality === 0 ? 0 : 1; }
    else { c.reps++; c.interval = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.interval * c.ease); }
    c.ease = Math.max(1.3, c.ease + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02)));
    c.due = Date.now() + c.interval * DAY;
    c.last = Date.now();
    save('srs', state.srs);
  }
  const isDue = (id) => !state.srs[id] || Date.now() >= state.srs[id].due;
  const seen = (id) => !!state.srs[id] && state.srs[id].last;

  // ─── Audio ──────────────────────────────────
  let current = null;
  function play(path, rate) {
    if (current) { current.pause(); current = null; }
    if (!path) return;
    current = new Audio(path);
    current.playbackRate = rate || 1;
    if ('preservesPitch' in current) current.preservesPitch = true;
    current.play().catch(() => {});
  }
  function audioBtn(path, size, rate) {
    if (!path) return '';
    return '<button class="audio-btn' + (size ? ' audio-btn-' + size : '') + '" data-audio="' + esc(path) + '"' + (rate ? ' data-rate="' + rate + '"' : '') + ' title="Play" aria-label="Play">' + ICONS.play + '</button>';
  }
  function slowBtn(path) {
    if (!path) return '';
    return '<button class="audio-btn audio-btn-slow" data-audio="' + esc(path) + '" data-rate="0.7" title="Play slowly" aria-label="Play slowly">' + ICONS.slow + '</button>';
  }

  // ─── Persian display ───────────────────────
  // The single place Persian is drawn: script, phonetics, meaning, audio.
  function fa(item, opts) {
    opts = opts || {};
    if (!item) return '';
    const readable = canRead(item.fa);
    const fade = readable && state.settings.fadeTr && !opts.keepTr;
    const size = opts.size || 'md';
    let h = '<div class="fa fa-' + size + (readable ? ' readable' : '') + (opts.cls ? ' ' + opts.cls : '') + '">';
    h += '<div class="fa-line">';
    if (!opts.noAudio && item.audio) h += audioBtn(item.audio, size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : '');
    h += '<span class="fa-script" lang="fa" dir="rtl">' + esc(item.fa) + '</span>';
    if (readable) h += '<span class="read-badge" title="Every letter here is one you’ve learned">' + ICONS.check + '</span>';
    h += '</div>';
    h += '<div class="fa-tr' + (fade ? ' faded' : '') + '"' + (fade ? ' data-act="reveal"' : '') + '>' + trHtml(item) + '</div>';
    if (item.en && !opts.noEn) {
      h += opts.hideEn ? '<div class="fa-en hidden-en" data-act="reveal">' + esc(item.en) + '</div>' : '<div class="fa-en">' + esc(item.en) + '</div>';
    }
    if (item.w && (state.settings.showWritten || opts.written)) {
      h += '<div class="fa-written"><span class="written-label">written</span> <span lang="fa" dir="rtl">' + esc(item.w) + '</span> <span class="fa-wtr">' + esc(item.wtr || '') + '</span></div>';
    }
    h += '</div>';
    return h;
  }
  function trHtml(item) {
    if (!item.trp) return esc(item.tr);
    return item.trp.map(([k, t]) => '<span class="tp-' + k + '">' + esc(t) + '</span>').join('');
  }
  // Compact form for options and chips: script over phonetics.
  function faChip(item, showEn) {
    const readable = canRead(item.fa);
    return '<span class="chip-fa' + (readable ? ' readable' : '') + '"><span class="chip-script" lang="fa" dir="rtl">' + esc(item.fa) + '</span>' +
      '<span class="chip-tr">' + trHtml(item) + '</span>' + (showEn && item.en ? '<span class="chip-en">' + esc(item.en) + '</span>' : '') + '</span>';
  }

  // ─── Routing ────────────────────────────────
  function handleHash() {
    const parts = (location.hash.slice(1) || 'dashboard').split('/');
    const view = parts[0];
    document.body.classList.toggle('print-mode', view === 'print' || view === 'labels');
    if (view === 'chapter' && parts[1]) {
      state.ch = +parts[1];
      if (parts[2] === 'day' && parts[3]) { state.day = +parts[3]; state.view = 'day'; } else { state.day = null; state.view = 'chapter'; }
    } else if (view === 'print') { state.printCh = +parts[1]; state.printDay = +parts[2]; state.view = 'print'; }
    else if (view === 'labels') { state.printCh = +parts[1]; state.view = 'labels'; }
    else if (['flashcards', 'wordlog', 'map'].includes(view)) state.view = view;
    else state.view = 'dashboard';
    render();
    const target = parts[4] === 'step' ? $('#step_' + parts[5]) : null;
    if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
  }

  function render() {
    LEARNED = learnedLetters();
    const views = { dashboard: renderDashboard, map: renderMap, chapter: renderChapter, day: renderDay, flashcards: renderFlashcards, wordlog: renderWordLog, print: renderPrint, labels: renderLabels };
    let html = (views[state.view] || renderDashboard)();
    if (state.view !== 'print' && state.view !== 'labels') html += renderNav();
    $('#app').innerHTML = html;
    afterRender();
  }

  function renderNav() {
    const cur = state.ch || 1;
    const items = [
      { id: 'dashboard', icon: ICONS.home, label: 'Home', hash: 'dashboard' },
      { id: 'chapter', icon: ICONS.book, label: 'Learn', hash: 'chapter/' + cur },
      { id: 'flashcards', icon: ICONS.cards, label: 'Review', hash: 'flashcards' },
      { id: 'map', icon: ICONS.map, label: 'Course', hash: 'map' },
      { id: 'wordlog', icon: ICONS.edit, label: 'Mass’s words', hash: 'wordlog' },
    ];
    return '<nav class="nav">' + items.map((it) => {
      const active = state.view === it.id || (it.id === 'chapter' && state.view === 'day');
      return '<a href="#' + it.hash + '" class="nav-item' + (active ? ' active' : '') + '">' + it.icon + '<span>' + it.label + '</span></a>';
    }).join('') + '</nav>';
  }

  // ─── Dashboard ──────────────────────────────
  function nextDay() {
    const chs = Object.keys(state.chapters).map(Number).sort((a, b) => a - b);
    for (const c of chs) for (const d of state.chapters[c].days) {
      const p = dayProgress(c, d.number);
      if (p.done < p.total) return { ch: c, day: d };
    }
    return null;
  }

  function renderDashboard() {
    const due = state.words.filter((w) => isDue(w.id)).length;
    const nd = nextDay();
    let h = '<div class="main">';
    h += '<header class="dash-head"><div class="dash-fa" lang="fa" dir="rtl">فارسی با معصومه</div><h1>Farsi with Mass</h1>';
    h += '<p class="dash-goal">' + esc(state.course ? state.course.goal : '') + '</p></header>';

    if (nd) {
      const ch = state.chapters[nd.ch];
      h += '<a class="today-card" href="#chapter/' + nd.ch + '/day/' + nd.day.number + '">';
      h += '<div class="today-kicker">Today · Chapter ' + nd.ch + ', Day ' + nd.day.number + '</div>';
      h += '<div class="today-title">' + esc(nd.day.title.en) + '</div>';
      h += '<div class="today-fa"><span lang="fa" dir="rtl">' + esc(nd.day.title.fa) + '</span> <span class="today-tr">' + esc(nd.day.title.tr) + '</span></div>';
      h += '<div class="today-sub">' + esc(nd.day.subtitle) + '</div>';
      const mins = nd.day.steps.reduce((a, s) => a + (s.type === 'notebook' ? 0 : s.minutes || 0), 0);
      h += '<div class="today-meta"><span>' + ICONS.book + ' ~' + mins + ' min on screen</span><span>' + ICONS.pen + ' ~10 min on paper</span><span>' + esc(ch.title.en) + '</span></div>';
      h += '<span class="btn btn-coral">Start ' + ICONS.right + '</span></a>';
    }

    h += '<div class="stats-row">';
    h += '<div class="stat-card"><span class="stat-number">' + Math.min(LEARNED.has('آ') ? LEARNED.size - 1 : LEARNED.size, LETTER_COUNT) + '<small>/32</small></span><span class="stat-label">letters</span></div>';
    h += '<div class="stat-card"><span class="stat-number">' + Object.values(state.srs).filter((c) => c.reps >= 2).length + '</span><span class="stat-label">words solid</span></div>';
    h += '<a class="stat-card" href="#flashcards"><span class="stat-number">' + due + '</span><span class="stat-label">due for review</span></a>';
    h += '</div>';

    h += '<section class="panel"><div class="panel-head"><h2>Your alphabet</h2><span class="text-muted text-sm">Letters light up as you learn them</span></div>';
    h += '<div class="alpha-grid" dir="rtl">' + ALPHABET.map((l) => '<span class="alpha' + (LEARNED.has(l) ? ' on' : '') + '" lang="fa">' + l + '</span>').join('') + '</div></section>';

    h += '<section class="panel"><div class="panel-head"><h2>Chapters</h2><a href="#map" class="text-sm">See the whole course ' + ICONS.right + '</a></div>';
    Object.keys(state.chapters).map(Number).sort((a, b) => a - b).forEach((n) => {
      const ch = state.chapters[n], p = chapterProgress(n), pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
      h += '<a href="#chapter/' + n + '" class="chapter-card"><div class="chapter-number">Chapter ' + n + '</div>';
      h += '<h3>' + esc(ch.title.en) + ' <span class="chapter-fa" lang="fa" dir="rtl">' + esc(ch.title.fa) + '</span> <span class="chapter-tr">' + esc(ch.title.tr) + '</span></h3>';
      h += '<div class="chapter-theme">' + esc(ch.description) + '</div>';
      h += '<div class="progress-bar-container"><div class="progress-bar" style="width:' + pct + '%"></div></div><div class="text-xs text-muted">' + pct + '% complete</div></a>';
    });
    h += '</section>';

    h += '<section class="panel"><h2>Settings</h2>';
    h += toggle('fadeTr', 'Hide phonetics on words I can read', 'Words made only of letters you’ve learned show the script first; tap to see the phonetics. Off by default.');
    h += toggle('showWritten', 'Show written (formal) forms', 'Adds the dictionary spelling under spoken forms, e.g. خانه khāne under خونه khune.');
    h += '</section>';

    h += '<details class="panel"><summary><h2>Mango review sets</h2></summary><div class="mango-grid">';
    const sets = [...new Set(state.words.map((w) => w.mango_set).filter(Boolean))].sort((a, b) => a - b);
    h += sets.map((s) => '<button class="btn btn-secondary btn-sm" data-act="mango" data-set="' + s + '">Set ' + s + '</button>').join('');
    h += '</div></details></div>';
    return h;
  }
  function toggle(key, label, desc) {
    return '<label class="setting"><input type="checkbox" data-act="setting" data-key="' + key + '"' + (state.settings[key] ? ' checked' : '') + '><span><b>' + esc(label) + '</b><br><span class="text-sm text-muted">' + esc(desc) + '</span></span></label>';
  }

  // ─── Course map ─────────────────────────────
  function renderMap() {
    const c = state.course;
    let h = '<div class="main"><header class="map-head"><h1>The course</h1><p>' + esc(c.goal) + '</p></header>';
    h += '<div class="week-shape">' + ['screen', 'paper', 'kitchen'].map((k) => '<div><b>' + k[0].toUpperCase() + k.slice(1) + '</b><p>' + esc(c.week[k]) + '</p></div>').join('') + '</div>';
    h += '<h2>Six tracks, every chapter</h2><div class="tracks">' + c.tracks.map((t) => '<div class="track track-' + t.id + '"><b>' + esc(t.name) + '</b><p>' + esc(t.desc) + '</p></div>').join('') + '</div>';
    h += '<h2>Milestones</h2><ol class="milestones">' + c.milestones.map((m) => '<li><span class="ms-date">' + fmtDate(m.date) + '</span>' + esc(m.text) + '</li>').join('') + '</ol>';
    c.seasons.forEach((s) => {
      h += '<section class="season"><div class="season-head"><span class="season-n">Season ' + s.n + '</span><h2>' + esc(s.name) + '</h2><span class="text-muted">' + esc(s.dates) + '</span></div>';
      s.chapters.forEach((ch) => {
        const ready = !!state.chapters[ch.n];
        h += '<' + (ready ? 'a href="#chapter/' + ch.n + '"' : 'div') + ' class="map-ch' + (ready ? ' ready' : '') + '">';
        h += '<div class="map-ch-top"><span class="map-n">' + ch.n + '</span><span class="map-week">week of ' + fmtDate(ch.week) + '</span>' + (ready ? '<span class="map-ready">ready</span>' : '') + '</div>';
        h += '<div class="map-title">' + esc(ch.en) + ' <span lang="fa" dir="rtl">' + esc(ch.fa) + '</span> <span class="map-tr">' + esc(ch.tr) + '</span></div>';
        h += '<dl class="map-tracks"><dt>Talk</dt><dd>' + esc(ch.talk) + '</dd><dt>Verbs</dt><dd>' + esc(ch.verbs) + '</dd><dt>Ear</dt><dd>' + esc(ch.ear) + '</dd><dt>Script</dt><dd><span lang="fa">' + esc(ch.script) + '</span></dd><dt>Roots</dt><dd>' + esc(ch.roots) + '</dd></dl>';
        h += '</' + (ready ? 'a' : 'div') + '>';
      });
      h += '</section>';
    });
    return h + '</div>';
  }
  function fmtDate(iso) { return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }

  // ─── Chapter overview ──────────────────────
  function renderChapter() {
    const n = state.ch, ch = state.chapters[n];
    if (!ch) return '<div class="main"><div class="empty-state"><h3>Chapter ' + n + ' isn’t written yet.</h3><a href="#map" class="btn btn-primary">See the course map</a></div></div>';
    let h = '<div class="main"><a href="#dashboard" class="back-link">' + ICONS.left + ' Home</a>';
    h += '<header class="chapter-head"><div class="chapter-number">Chapter ' + n + ' · week of ' + fmtDate(ch.week) + '</div>';
    h += '<h1>' + esc(ch.title.en) + '</h1>' + fa(ch.title, { size: 'lg', noEn: true });
    h += '<p class="chapter-theme">' + esc(ch.description) + '</p></header>';
    h += '<div class="objectives-box"><h3>By the end of this week, you can:</h3><ul>' + ch.objectives.map((o) => '<li>' + esc(o) + '</li>').join('') + '</ul></div>';
    h += '<div class="letters-week"><span class="text-sm text-muted">This week’s letters</span><div dir="rtl">' + ch.letters.map((l) => '<span class="alpha' + (LEARNED.has(l) ? ' on' : '') + '" lang="fa">' + l + '</span>').join('') + '</div></div>';
    h += '<div class="day-list">';
    ch.days.forEach((d) => {
      const p = dayProgress(n, d.number), done = p.done === p.total;
      const mins = d.steps.reduce((a, s) => a + (s.type === 'notebook' ? 0 : s.minutes || 0), 0);
      h += '<a href="#chapter/' + n + '/day/' + d.number + '" class="day-card' + (done ? ' completed' : '') + '">';
      h += '<span class="day-status ' + (done ? 'done' : p.done ? 'started' : 'pending') + '">' + (done ? ICONS.check : d.number) + '</span>';
      h += '<div class="day-card-content"><div class="day-card-title">' + esc(d.title.en) + ' <span lang="fa" dir="rtl" class="day-card-fa">' + esc(d.title.fa) + '</span> <span class="day-card-tr">' + esc(d.title.tr) + '</span></div>';
      h += '<div class="day-card-subtitle">' + esc(d.subtitle) + '</div><div class="text-xs text-muted">~' + mins + ' min · ' + d.steps.length + ' steps · ' + p.done + '/' + p.total + ' done</div></div></a>';
    });
    h += '</div>';
    h += '<h2 class="section-h">Weekend with Mass</h2><div class="conv-cards">' + ch.weekendCards.map((c) => talkCard(c)).join('') + '</div>';
    h += '<h2 class="section-h">In the house</h2><div class="house-links">';
    h += '<a class="btn btn-secondary" href="#labels/' + n + '" target="_blank">' + ICONS.print + ' Print kitchen labels</a>';
    h += '<a class="btn btn-secondary" href="#flashcards" data-act="flashfilter" data-filter="ch' + n + '">' + ICONS.cards + ' Chapter ' + n + ' flashcards</a></div>';
    return h + '</div>';
  }

  // ─── Day view ───────────────────────────────
  const STEP_LABEL = {
    warmup: 'Warm-up', listen: 'Listen', words: 'Words', verbs: 'Verb lab', ear: 'Ear gym', rule: 'Ear gym', earmix: 'Ear gym',
    script: 'Reading & writing', shadow: 'Speak', check: 'Quiz', notebook: 'Paper', talk: 'Kitchen', teach: 'The girls', story: 'Story',
    gossip: 'Gossip kit', verse: 'Verse', roots: 'Word stories', verbgym: 'Verb lab', secret: 'Reading', massvoice: 'Optional',
  };

  function renderDay() {
    const n = state.ch, ch = state.chapters[n];
    const d = ch && getDay(n, state.day);
    if (!d) return '<div class="main"><div class="empty-state"><h3>Day not found</h3></div></div>';
    let h = '<div class="main"><a href="#chapter/' + n + '" class="back-link">' + ICONS.left + ' Chapter ' + n + ': ' + esc(ch.title.en) + '</a>';
    h += '<header class="day-header"><div class="day-label">Day ' + d.number + '</div><h1>' + esc(d.title.en) + '</h1>' + fa(d.title, { size: 'lg', noEn: true });
    h += '<div class="day-subtitle">' + esc(d.subtitle) + '</div><div class="day-objective">' + esc(d.objective) + '</div>';
    h += '<nav class="step-index">' + d.steps.map((s, i) => '<a href="#chapter/' + n + '/day/' + d.number + '/step/' + i + '" class="' + (isDone(n, d.number, i) ? 'done' : '') + '">' + esc(STEP_LABEL[s.type] || s.type) + '</a>').join('') + '</nav></header>';
    d.steps.forEach((s, i) => {
      const done = isDone(n, d.number, i), key = sk(n, d.number, i);
      h += '<section class="step-block step-' + s.type + (done ? ' step-done' : '') + '" id="step_' + i + '">';
      h += '<div class="step-header"><span class="step-number">' + (done ? ICONS.check : i + 1) + '</span><div><div class="step-kicker">' + esc(STEP_LABEL[s.type] || '') + (s.minutes ? ' · ' + s.minutes + ' min' : '') + '</div><h2 class="step-title">' + esc(s.title) + '</h2></div></div>';
      h += renderStep(s, { ch: n, day: d.number, i, key });
      if (!['check', 'warmup', 'ear', 'rule', 'earmix', 'verbgym', 'massvoice'].includes(s.type)) {
        h += done ? '<div class="done-note">' + ICONS.check + ' Done</div>' : '<button class="btn btn-secondary mark-done" data-act="done" data-step="' + i + '">' + ICONS.check + ' ' + (s.type === 'script' ? 'I’ve learned these letters' : s.type === 'notebook' ? 'Done on paper' : 'Mark done') + '</button>';
      }
      h += '</section>';
    });
    const next = ch.days.find((x) => x.number === d.number + 1);
    h += '<div class="day-nav">' + (d.number > 1 ? '<a href="#chapter/' + n + '/day/' + (d.number - 1) + '" class="btn btn-secondary">' + ICONS.left + ' Day ' + (d.number - 1) + '</a>' : '<span></span>');
    h += next ? '<a href="#chapter/' + n + '/day/' + next.number + '" class="btn btn-primary">Day ' + next.number + ' ' + ICONS.right + '</a>' : '<a href="#chapter/' + n + '" class="btn btn-primary">Back to chapter</a>';
    return h + '</div></div>';
  }

  function renderStep(s, ctx) {
    const R = {
      warmup: stepWarmup, listen: stepListen, story: stepListen, words: stepWords, verbs: stepVerbs, ear: stepEar, rule: stepRule, earmix: stepEarMix,
      script: stepScript, shadow: stepShadow, check: stepCheck, notebook: stepNotebook, talk: (st) => talkCard(st) + '<p class="log-link"><a href="#wordlog">' + ICONS.plus + ' Log words Mass taught you</a></p>',
      teach: stepTeach, gossip: stepGossip, verse: stepVerse, roots: stepRoots, verbgym: stepVerbGym, secret: stepSecret, massvoice: stepMassVoice,
    };
    return (R[s.type] || (() => ''))(s, ctx);
  }
  const instr = (s) => (s.instruction ? '<p class="step-instruction">' + esc(s.instruction) + '</p>' : '');

  // Warm-up: retrieval of older words, feeding the SRS
  function stepWarmup(s, ctx) {
    if (!GEN[ctx.key]) {
      const ch = state.chapters[ctx.ch];
      let pool;
      if (s.chapterOnly) pool = ch.words.filter((w) => w.isNew);
      else {
        const earlier = [];
        ch.days.filter((d) => d.number < ctx.day).forEach((d) => (d.newWordIds || []).forEach((id) => { const w = ch.words.find((x) => x.id === id); if (w) earlier.push(w); }));
        const mango = shuffle(state.words.filter((w) => w.source === 'mango' && w.tr && isDue(w.id) && !/\(|stem/.test(w.english))).slice(0, 40).map(wordItem);
        const seenDue = mango.filter((w) => seen(w.id));
        pool = shuffle(earlier).slice(0, 3).concat(shuffle(seenDue.length >= 3 ? seenDue : mango));
      }
      const items = shuffle(pool).slice(0, s.count || 6);
      const allEn = state.words.map((w) => w.english).concat(ch.words.map((w) => w.en));
      GEN[ctx.key] = items.map((it) => {
        const wrong = shuffle([...new Set(allEn.filter((e) => e && e !== it.en))]).slice(0, 3);
        return { type: 'mc', item: it, prompt: 'What does this mean?', options: [it.en].concat(wrong), answer: 0, srsId: it.id };
      });
    }
    return instr(s) + quizGroup(GEN[ctx.key], ctx);
  }
  function wordItem(w) {
    return { id: w.id, fa: w.persian_spoken || w.persian_written, tr: w.tr || w.spoken_pronunciation, en: w.english, audio: w.audio && w.audio.indexOf('tts') > 0 ? w.audio : undefined, w: w.persian_written !== w.persian_spoken ? w.persian_written : undefined };
  }

  function stepListen(s, ctx) {
    let h = instr(s);
    if (s.audio) h += '<div class="scene-play">' + audioBtn(s.audio, 'xl') + '<div><b>Play the whole scene</b><div class="scene-sub">' + slowBtn(s.audio) + ' or slowly</div></div></div>';
    h += '<div class="dialogue-block">' + s.lines.map((l) => '<div class="dialogue-line ' + (l.speaker || 'narrator').toLowerCase() + '">' + (l.speaker ? '<div class="speaker-label">' + esc(l.speaker) + '</div>' : '') + fa(l, { hideEn: true }) + slowBtn(l.audio) + '</div>').join('') + '</div>';
    if (s.questions) h += '<h3 class="sub-h">Did you follow it?</h3>' + quizGroup(s.questions, ctx, true);
    return h;
  }

  function stepWords(s, ctx) {
    const ch = state.chapters[ctx.ch], d = getDay(ctx.ch, ctx.day);
    const byId = (id) => ch.words.find((w) => w.id === id);
    let h = instr(s) + '<div class="word-grid">';
    (d.newWordIds || []).map(byId).filter(Boolean).forEach((w) => {
      h += '<div class="word-card">' + fa(w, { size: 'lg', written: true });
      if (w.root) h += '<div class="word-root"><span class="root-label">Word story</span>' + esc(w.root) + '</div>';
      if (w.example) h += '<div class="word-example">' + fa(w.example, { size: 'sm' }) + '</div>';
      h += '</div>';
    });
    h += '</div>';
    const rev = (d.reviewWordIds || []).map(byId).filter(Boolean);
    if (rev.length) h += '<h3 class="sub-h">Words you already know, showing up today</h3><div class="chip-row">' + rev.map((w) => '<span class="chip-wrap">' + audioBtn(w.audio, 'sm') + faChip(w, true) + '</span>').join('') + '</div>';
    return h;
  }

  // ─── Verb lab ───────────────────────────────
  function stepVerbs(s, ctx) {
    let h = '<div class="verb-intro">' + s.intro + '</div>';
    h += '<div class="verb-legend"><span class="tp-p">prefix</span> <span class="tp-s">stem</span> <span class="tp-e">ending</span>' +
      '<label class="mini-toggle"><input type="checkbox" data-act="setting" data-key="showWritten"' + (state.settings.showWritten ? ' checked' : '') + '> written forms</label></div>';
    s.verbs.forEach((vid) => { h += '<div class="verb-card" id="verb_' + ctx.key + '_' + vid + '">' + verbCard(vid, ctx.key) + '</div>'; });
    if (s.quiz) h += '<h3 class="sub-h">Quick drill</h3>' + quizGroup(s.quiz, ctx);
    return h;
  }
  function verbCard(vid, key) {
    const v = state.verbs.verbs[vid], ui = VUI[key + vid] || (VUI[key + vid] = { v: 0, neg: false });
    const variant = v.variants[ui.v];
    let h = '<div class="verb-head">' + fa(v.inf, { size: 'lg', written: true }) + '<div class="verb-stems"><div><span>past stem</span><b>' + esc(v.stems.past) + '</b></div><div><span>present stem</span><b>' + esc(v.stems.present) + '</b></div></div></div>';
    h += '<p class="verb-story">' + esc(v.story) + '</p>';
    if (v.variants.length > 1) {
      h += '<div class="verb-tabs">' + v.variants.map((x, i) => '<button class="verb-tab' + (i === ui.v ? ' active' : '') + '" data-act="variant" data-key="' + key + '" data-verb="' + vid + '" data-i="' + i + '"><span lang="fa" dir="rtl">' + esc(x.label.fa) + '</span> ' + esc(x.label.tr) + ' <small>' + esc(x.label.en) + '</small></button>').join('') + '</div>';
    }
    h += '<div class="verb-switch"><button class="seg' + (!ui.neg ? ' active' : '') + '" data-act="neg" data-key="' + key + '" data-verb="' + vid + '" data-neg="0">Positive</button><button class="seg' + (ui.neg ? ' active' : '') + '" data-act="neg" data-key="' + key + '" data-verb="' + vid + '" data-neg="1">Negative</button></div>';
    const P = state.verbs.persons;
    const pres = ui.neg ? variant.neg_present : variant.present, past = ui.neg ? variant.neg_past : variant.past;
    h += '<table class="conj"><thead><tr><th></th><th>Present<small>I go · I’m going · I’ll go</small></th><th>Past<small>I went</small></th></tr></thead><tbody>';
    P.forEach((p, i) => {
      h += '<tr><th class="conj-person"><span lang="fa" dir="rtl">' + esc(p.fa) + '</span><span class="cp-tr">' + esc(p.tr) + '</span><span class="cp-en">' + esc(p.en) + '</span></th>' + conjCell(pres[i]) + conjCell(past[i]) + '</tr>';
    });
    h += '</tbody></table>';
    const imp = variant.imperative;
    h += '<div class="imp-head">Commands</div><table class="conj conj-imp"><tbody>';
    h += '<tr><th class="conj-person"><span lang="fa" dir="rtl">تو</span><span class="cp-tr">to</span><span class="cp-en">one person, casual</span></th>' + conjCell(imp[0]) + conjCell(imp[2]) + '</tr>';
    h += '<tr><th class="conj-person"><span lang="fa" dir="rtl">شما</span><span class="cp-tr">shomā</span><span class="cp-en">polite, or a group</span></th>' + conjCell(imp[1]) + conjCell(imp[3]) + '</tr>';
    return h + '</tbody></table>';
  }
  function conjCell(f) {
    let h = '<td class="conj-cell" data-audio="' + esc(f.audio) + '"><span class="cc-fa" lang="fa" dir="rtl">' + esc(f.fa) + '</span><span class="cc-tr">' + trHtml(f) + '</span><span class="cc-en">' + esc(f.en) + '</span>';
    if (state.settings.showWritten && f.w) h += '<span class="cc-w"><span lang="fa" dir="rtl">' + esc(f.w) + '</span> ' + esc(f.wtr || '') + '</span>';
    return h + '</td>';
  }

  function conjQuestion(q) {
    const v = state.verbs.verbs[q.verb], variant = v.variants.find((x) => x.id === q.variant) || v.variants[0];
    const forms = variant[q.tense], target = forms[q.person];
    const pool = forms.filter((f) => f.tr !== target.tr && f.en !== target.en);
    const other = { present: 'past', past: 'present', neg_present: 'present', neg_past: 'past', imperative: 'present' }[q.tense];
    const swap = other && variant[other] && variant[other][q.person] && variant[other][q.person].tr !== target.tr ? [variant[other][q.person]] : [];
    const distract = shuffle(swap.concat(shuffle(pool).slice(0, 3))).filter((f, i, a) => a.findIndex((x) => x.tr === f.tr) === i).slice(0, 3);
    const tenseName = { present: 'present', past: 'past', imperative: 'command', neg_present: 'present, negative', neg_past: 'past, negative' }[q.tense];
    return { type: 'mc', prompt: 'How do you say <b>“' + esc(target.en) + '”</b>?', promptHtml: true, sub: variant.label.tr + ' (' + variant.label.en + ') · ' + tenseName, options: [target].concat(distract), answer: 0, after: target };
  }

  // ─── Questions ──────────────────────────────
  let qCounter = 0;
  function quizGroup(questions, ctx, noMark) {
    const keys = [];
    let h = '<div class="quiz">';
    questions.forEach((q0) => {
      const q = q0.type === 'conj' ? conjQuestion(q0) : q0;
      const key = 'q' + (++qCounter);
      keys.push(key);
      h += renderQuestion(q, key);
    });
    if (!noMark) GROUPS[ctx.key] = { keys, ch: ctx.ch, day: ctx.day, step: ctx.i };
    h += '<div class="quiz-score" id="score_' + ctx.key + '"></div></div>';
    keys.forEach((k) => { QZ[k].group = noMark ? null : ctx.key; });
    return h;
  }

  function renderQuestion(q, key) {
    const order = q.options ? shuffle(q.options.map((_, i) => i)) : [];
    const rec = { q, answered: false, answer: order.indexOf(q.answer), order };
    QZ[key] = rec;
    let h = '<div class="question" id="' + key + '">';
    if (q.type === 'listen') {
      h += '<div class="q-prompt">Listen. What did you hear?</div><div class="q-audio">' + audioBtn(q.item.audio, 'lg') + slowBtn(q.item.audio) + '</div>';
    } else if (q.type === 'read') {
      h += '<div class="q-prompt">Read it out loud, then pick what it says.</div><div class="q-read" lang="fa" dir="rtl">' + esc(q.item.fa) + '</div>';
    } else if (q.type === 'type') {
      rec.answer = -1;
      h += '<div class="q-prompt">' + esc(q.prompt || 'Type what you hear.') + '</div><div class="q-audio">' + audioBtn(q.item.audio, 'lg') + slowBtn(q.item.audio) + '</div>';
      h += '<div class="type-row"><input class="type-input" id="in_' + key + '" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="e.g. bidar"><button class="btn btn-turquoise" data-act="type" data-key="' + key + '">Check</button></div>';
      h += '<div class="q-hint">Spell it however it sounds: a or ā, ee or i. Close counts.</div>';
      return h + '<div class="q-feedback"></div></div>';
    } else if (q.type === 'build') {
      rec.answer = -1;
      rec.picked = [];
      h += '<div class="q-prompt">Build it in Persian: <b>' + esc(q.en) + '</b></div><div class="build-answer" dir="rtl" id="ba_' + key + '"><span class="build-placeholder">tap the pieces in order</span></div>';
      h += '<div class="build-tiles" dir="rtl">' + shuffle(q.tiles.map((t, i) => [t, i])).map(([t, i]) => '<button class="tile" data-act="tile" data-key="' + key + '" data-i="' + i + '">' + faChip(t) + '</button>').join('') + '</div>';
      h += '<button class="btn btn-turquoise btn-sm" data-act="build" data-key="' + key + '">Check</button>';
      return h + '<div class="q-feedback"></div></div>';
    } else {
      h += '<div class="q-prompt">' + (q.promptHtml ? q.prompt : esc(q.prompt)) + '</div>';
      if (q.sub) h += '<div class="q-sub">' + esc(q.sub) + '</div>';
      if (q.item) h += '<div class="q-item">' + fa(q.item, { noEn: true }) + '</div>';
    }
    h += '<div class="q-options">' + order.map((oi, pos) => {
      const o = q.options[oi];
      const inner = typeof o === 'string' ? (q.type === 'read' ? '<span class="opt-tr">' + esc(o) + '</span>' : esc(o)) : faChip(o, false);
      return '<button class="q-option" data-act="answer" data-key="' + key + '" data-i="' + pos + '">' + inner + '</button>';
    }).join('') + '</div>';
    return h + '<div class="q-feedback"></div></div>';
  }

  function settle(key, correct, feedbackHtml) {
    const rec = QZ[key];
    if (rec.answered) return;
    rec.answered = true;
    rec.correct = correct;
    const el = document.getElementById(key);
    el.classList.add(correct ? 'is-right' : 'is-wrong');
    const fb = $('.q-feedback', el);
    if (fb) fb.innerHTML = (correct ? '<span class="fb-right">' + ICONS.check + ' Yes.</span> ' : '<span class="fb-wrong">' + ICONS.x + ' Not quite.</span> ') + (feedbackHtml || '');
    if (rec.q.srsId) review(rec.q.srsId, correct ? 2 : 0);
    const g = rec.group && GROUPS[rec.group];
    if (g && g.keys.every((k) => QZ[k].answered)) {
      const right = g.keys.filter((k) => QZ[k].correct).length;
      const sc = document.getElementById('score_' + rec.group);
      if (sc) sc.innerHTML = '<b>' + right + ' / ' + g.keys.length + '</b> ' + (right === g.keys.length ? 'Clean sweep.' : right >= g.keys.length * 0.7 ? 'Solid. Look again at the ones you missed.' : 'These will come back in review. That’s the point.') + ' <button class="btn btn-ghost btn-sm" data-act="redo" data-key="' + rec.group + '">' + ICONS.shuffle + ' Again</button>';
      markDone(g.ch, g.day, g.step);
    }
  }

  function answer(key, pos) {
    const rec = QZ[key];
    if (!rec || rec.answered) return;
    const el = document.getElementById(key);
    const btns = $$('.q-option', el);
    btns.forEach((b, i) => { b.disabled = true; if (i === rec.answer) b.classList.add('correct'); });
    const correct = pos === rec.answer;
    if (!correct) btns[pos].classList.add('incorrect');
    const q = rec.q;
    let fb = '';
    if (q.type === 'listen' || q.type === 'read' || (q.item && q.type === 'mc')) fb = fa(q.item, { size: 'sm' });
    if (q.after) { fb = fa(q.after, { size: 'sm' }); play(q.after.audio); }
    else if (q.type === 'read' || q.type === 'mc' && q.item) play(q.item.audio);
    if (q.explain) fb += '<div class="q-explain">' + esc(q.explain) + '</div>';
    settle(key, correct, fb);
  }

  function trNorm(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/ah(?![aeiou])/g, 'a').replace(/eh\b/g, 'e').replace(/q/g, 'gh').replace(/x/g, 'kh')
      .replace(/[^a-z]/g, '').replace(/(.)\1+/g, '$1');
  }
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i].concat(Array(n).fill(0)));
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function checkType(key) {
    const rec = QZ[key];
    if (!rec || rec.answered) return;
    const val = $('#in_' + key).value;
    if (!val.trim()) return;
    const a = trNorm(val), b = trNorm(rec.q.item.tr), dist = lev(a, b);
    const ok = dist <= (b.length > 5 ? 1 : 0);
    play(rec.q.item.audio);
    settle(key, ok, (ok && dist ? 'Close enough. ' : '') + fa(rec.q.item, { size: 'sm' }));
  }

  function tapTile(key, i) {
    const rec = QZ[key];
    if (!rec || rec.answered) return;
    const idx = rec.picked.indexOf(i);
    if (idx >= 0) rec.picked.splice(idx, 1); else rec.picked.push(i);
    const box = $('#ba_' + key);
    box.innerHTML = rec.picked.length ? rec.picked.map((p) => '<button class="tile in" data-act="tile" data-key="' + key + '" data-i="' + p + '">' + faChip(rec.q.tiles[p]) + '</button>').join('') : '<span class="build-placeholder">tap the pieces in order</span>';
    $$('.build-tiles .tile', document.getElementById(key)).forEach((t) => t.classList.toggle('used', rec.picked.includes(+t.dataset.i)));
  }
  function checkBuild(key) {
    const rec = QZ[key];
    if (!rec || rec.answered || !rec.picked.length) return;
    const ok = rec.picked.length === rec.q.tiles.length && rec.picked.every((p, i) => p === i);
    const full = { fa: rec.q.tiles.map((t) => t.fa).join(' '), tr: rec.q.tiles.map((t) => t.tr).join(' '), en: rec.q.en };
    settle(key, ok, fa(full, { size: 'sm', noAudio: true }) + (ok ? '' : '<div class="q-explain">Persian usually puts the verb last.</div>'));
  }

  function redo(groupKey) {
    delete GEN[groupKey];
    const g = GROUPS[groupKey];
    const sec = $('#step_' + g.step);
    const s = getDay(g.ch, g.day).steps[g.step];
    const body = renderStep(s, { ch: g.ch, day: g.day, i: g.step, key: groupKey });
    const head = $('.step-header', sec).outerHTML;
    sec.innerHTML = head + body;
  }

  // ─── Ear gym ────────────────────────────────
  function stepEar(s, ctx) {
    let h = instr(s) + '<div class="pairs">';
    s.pairs.forEach((p) => {
      h += '<div class="pair"><div class="pair-contrast">' + esc(p.contrast) + '</div><div class="pair-row">';
      [p.a, p.b].forEach((x) => { h += '<div class="pair-side">' + fa(x, { size: 'md' }) + '<div class="voices">' + audioBtn(x.audio, 'sm') + '<small>voice 1</small>' + audioBtn(x.audio2, 'sm') + '<small>voice 2</small></div></div>'; });
      h += '</div></div>';
    });
    h += '</div>';
    return h + roundsBox(ctx, s.rounds || 6, 'Test your ear');
  }
  function stepRule(s, ctx) {
    let h = instr(s);
    s.rules.forEach((r) => {
      h += '<div class="rule-card"><div class="rule-name">' + esc(r.name) + '</div><p>' + esc(r.text) + '</p><div class="rule-rows">';
      r.examples.forEach(([w, sp]) => { h += '<div class="rule-row"><div class="rule-w"><span class="rule-tag">written</span>' + fa(w, { size: 'sm' }) + '</div><span class="rule-arrow">→</span><div class="rule-s"><span class="rule-tag spoken">Mass says</span>' + fa(sp, { size: 'sm' }) + '</div></div>'; });
      h += '</div></div>';
    });
    return h + roundsBox(ctx, s.rounds || 6, 'Written or spoken?');
  }
  function stepEarMix(s, ctx) { return instr(s) + roundsBox(ctx, s.rounds || 10, 'Mixed pairs'); }
  function roundsBox(ctx, n, label) {
    return '<div class="rounds" id="rounds_' + ctx.key + '"><button class="btn btn-coral" data-act="round-start" data-key="' + ctx.key + '">' + ICONS.play + ' ' + esc(label) + ' (' + n + ' rounds)</button></div>';
  }
  function roundItems(key) {
    const [c, d, i] = key.split('_').map(Number);
    const s = getDay(c, d).steps[i];
    if (s.type === 'ear') return s.pairs.map((p) => ({ kind: 'pair', p }));
    if (s.type === 'rule') return [].concat(...s.rules.map((r) => r.examples.map(([w, sp]) => ({ kind: 'rule', w, sp }))));
    const all = [];
    state.chapters[c].days.forEach((dd) => dd.steps.forEach((st) => { if (st.type === 'ear') st.pairs.forEach((p) => all.push({ kind: 'pair', p })); }));
    return all;
  }
  function roundStart(key) {
    const [c, d, i] = key.split('_').map(Number);
    const s = getDay(c, d).steps[i];
    ROUNDS[key] = { n: s.rounds || 6, k: 0, right: 0, items: roundItems(key) };
    roundNext(key);
  }
  function roundNext(key) {
    const R = ROUNDS[key];
    const box = $('#rounds_' + key);
    if (R.k >= R.n) {
      box.innerHTML = '<div class="round-done"><b>' + R.right + ' / ' + R.n + '</b> ' + (R.right === R.n ? 'Your ear is getting it.' : 'Run it again tomorrow. Ears train slowly, then suddenly.') + ' <button class="btn btn-ghost btn-sm" data-act="round-start" data-key="' + key + '">' + ICONS.shuffle + ' Again</button></div>';
      const [c, d, i] = key.split('_').map(Number);
      markDone(c, d, i);
      return;
    }
    const it = pick(R.items);
    let h = '<div class="round-count">Round ' + (R.k + 1) + ' of ' + R.n + '</div>';
    if (it.kind === 'pair') {
      const which = Math.random() < 0.5 ? 'a' : 'b', x = it.p[which];
      R.cur = { answer: which, audio: Math.random() < 0.5 ? x.audio : (x.audio2 || x.audio) };
      h += '<div class="round-play">' + audioBtn(R.cur.audio, 'xl') + '<span>Which word did you hear?</span></div><div class="round-opts">';
      ['a', 'b'].forEach((w) => { h += '<button class="q-option" data-act="round-answer" data-key="' + key + '" data-v="' + w + '">' + faChip(it.p[w], true) + '</button>'; });
    } else {
      const which = Math.random() < 0.5 ? 'w' : 'sp';
      R.cur = { answer: which, audio: it[which].audio, item: it };
      h += '<div class="round-play">' + audioBtn(R.cur.audio, 'xl') + '<span>Written form, or how Mass says it?</span></div><div class="round-opts">';
      h += '<button class="q-option" data-act="round-answer" data-key="' + key + '" data-v="w">Written<br><small>' + esc(it.w.tr) + '</small></button>';
      h += '<button class="q-option" data-act="round-answer" data-key="' + key + '" data-v="sp">Mass says<br><small>' + esc(it.sp.tr) + '</small></button>';
    }
    box.innerHTML = h + '</div><div class="q-feedback"></div>';
    play(R.cur.audio);
  }
  function roundAnswer(key, v) {
    const R = ROUNDS[key];
    if (!R || R.cur.done) return;
    R.cur.done = true;
    const ok = v === R.cur.answer;
    if (ok) R.right++;
    R.k++;
    const box = $('#rounds_' + key);
    $$('.q-option', box).forEach((b) => { b.disabled = true; if (b.dataset.v === R.cur.answer) b.classList.add('correct'); else if (b.dataset.v === v) b.classList.add('incorrect'); });
    $('.q-feedback', box).innerHTML = (ok ? '<span class="fb-right">' + ICONS.check + ' Yes.</span>' : '<span class="fb-wrong">' + ICONS.x + ' Listen again.</span> ' + audioBtn(R.cur.audio, 'sm')) + ' <button class="btn btn-primary btn-sm" data-act="round-next" data-key="' + key + '">Next ' + ICONS.right + '</button>';
  }

  // ─── Reading & writing ─────────────────────
  function stepScript(s, ctx) {
    let h = '<p class="step-instruction">' + esc(s.intro) + '</p><div class="letter-grid">';
    s.letters.forEach((l) => {
      h += '<div class="letter-card"><div class="letter-top"><div class="letter-big" lang="fa">' + l.ch + '</div><div><div class="letter-sound">' + esc(l.sound) + '</div><div class="letter-name">' + esc(l.name) + '</div>' + (l.connects ? '' : '<div class="letter-nojoin">never joins forward</div>') + '</div></div>';
      h += '<div class="letter-forms" dir="rtl">' + ['isolated', 'initial', 'medial', 'final'].filter((k) => l.forms[k]).map((k) => '<div class="lf"><span class="lf-g" lang="fa">' + esc(l.forms[k]) + '</span><span class="lf-l">' + { isolated: 'alone', initial: 'start', medial: 'middle', final: 'end' }[k] + '</span></div>').join('') + '</div>';
      h += '<p class="letter-tip">' + esc(l.tip) + '</p>';
      if (l.examples.length) h += '<div class="letter-ex">' + l.examples.map((e) => fa(e, { size: 'sm', keepTr: true })).join('') + '</div>';
      h += '</div>';
    });
    h += '</div>';
    if (s.aside) h += '<div class="aside">' + esc(s.aside) + '</div>';
    if (s.readIt) h += '<h3 class="sub-h">Read it</h3>' + quizGroup(s.readIt, ctx, true);
    h += '<div class="print-row"><a class="btn btn-secondary" href="#print/' + ctx.ch + '/' + ctx.day + '" target="_blank">' + ICONS.print + ' Print a tracing sheet</a></div>';
    return h;
  }

  function stepSecret(s) {
    return instr(s) + '<div class="secret-grid">' + s.items.map((it) => '<div class="secret" data-act="secret"><div class="secret-fa" lang="fa" dir="rtl">' + esc(it.fa) + '</div><div class="secret-reveal">' + fa(it, { size: 'sm', keepTr: true }) + '</div><div class="secret-hint">tap to check</div></div>').join('') + '</div>';
  }

  // ─── Speaking ───────────────────────────────
  function stepShadow(s, ctx) {
    const canRec = !!(navigator.mediaDevices && window.MediaRecorder);
    let h = instr(s) + '<div class="shadow-list">';
    s.lines.forEach((l, j) => {
      const key = ctx.key + '_' + j;
      h += '<div class="shadow-line">' + fa(l) + '<div class="shadow-ctrl">' + slowBtn(l.audio);
      if (canRec) h += '<button class="rec-btn" data-act="rec" data-key="' + key + '">' + ICONS.mic + ' Record</button><span class="rec-mine" id="mine_' + key + '">' + (RECS[key] ? '<button class="btn btn-ghost btn-sm" data-act="mine" data-key="' + key + '">' + ICONS.play + ' Mine</button>' : '') + '</span>';
      h += '</div></div>';
    });
    return h + '</div>' + (canRec ? '' : '<p class="text-sm text-muted">Recording isn’t available in this browser. Shadow out loud anyway.</p>');
  }
  let recorder = null, recKey = null;
  async function toggleRec(key, btn) {
    if (recorder && recorder.state === 'recording') { recorder.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      recorder = new MediaRecorder(stream);
      recKey = key;
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (RECS[recKey]) URL.revokeObjectURL(RECS[recKey]);
        RECS[recKey] = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }));
        btn.classList.remove('recording');
        btn.innerHTML = ICONS.mic + ' Record';
        $('#mine_' + recKey).innerHTML = '<button class="btn btn-ghost btn-sm" data-act="mine" data-key="' + recKey + '">' + ICONS.play + ' Mine</button>';
        play(RECS[recKey]);
      };
      recorder.start();
      btn.classList.add('recording');
      btn.innerHTML = ICONS.stop + ' Stop';
    } catch (e) { toast('Microphone not available'); }
  }

  // ─── Quiz / check ──────────────────────────
  function stepCheck(s, ctx) { return quizGroup(s.questions, ctx); }
  function stepVerbGym(s, ctx) {
    if (!GEN[ctx.key]) {
      const qs = [];
      const tenses = ['present', 'past', 'imperative', 'neg_present', 'neg_past'];
      for (let k = 0; k < (s.count || 12); k++) {
        const vid = pick(Object.keys(state.verbs.verbs)), v = state.verbs.verbs[vid], variant = pick(v.variants), tense = pick(tenses);
        qs.push({ type: 'conj', verb: vid, variant: variant.id, tense, person: Math.floor(Math.random() * (tense === 'imperative' ? 4 : 6)) });
      }
      GEN[ctx.key] = qs;
    }
    return instr(s) + quizGroup(GEN[ctx.key], ctx);
  }

  // ─── Paper ──────────────────────────────────
  function stepNotebook(s, ctx) {
    let h = '<p class="step-instruction">Pen and paper. Writing by hand is how letters stick: people who learn new letters by hand recognize them better weeks later.</p><ol class="tasks">';
    s.tasks.forEach((t, j) => {
      const k = 'nb_' + ctx.key + '_' + j, on = !!state.progress[k];
      h += '<li><label><input type="checkbox" data-act="task" data-k="' + k + '"' + (on ? ' checked' : '') + '><span>' + esc(t) + '</span></label></li>';
    });
    h += '</ol>';
    if (s.print) h += '<div class="print-row"><a class="btn btn-secondary" href="#print/' + ctx.ch + '/' + ctx.day + '" target="_blank">' + ICONS.print + ' Print today’s tracing sheet</a><a class="btn btn-ghost" href="#labels/' + ctx.ch + '" target="_blank">' + ICONS.print + ' Kitchen labels</a></div>';
    return h;
  }

  // ─── Home & heart ───────────────────────────
  function talkCard(c) {
    let h = '<div class="conv-card">' + (c.day ? '<div class="conv-card-day">' + esc(c.day) + '</div>' : '') + '<h3>' + esc(c.topic) + '</h3>';
    h += '<div class="conv-label">Open with</div>' + c.openers.map((o) => '<div class="conv-opener">' + fa(o, { size: 'sm' }) + '</div>').join('');
    h += '<div class="conv-label">Try to use</div><div class="chip-row">' + c.practice.map((p) => faChip(p)).join('') + '</div>';
    h += '<div class="conv-mass-note"><div class="conv-mass-label">For Mass</div>' + esc(c.massNote) + '</div></div>';
    return h;
  }
  function stepTeach(s) {
    return '<p class="step-instruction">' + esc(s.game) + '</p><div class="teach-grid">' + s.items.map((it) => '<div class="teach-card">' + fa(it) + '</div>').join('') + '</div>';
  }
  function stepGossip(s) {
    let h = '<p class="step-instruction">' + esc(s.intro) + '</p><div class="gossip-list">' + s.phrases.map((p) => '<div class="gossip">' + fa(p) + slowBtn(p.audio) + '</div>').join('') + '</div>';
    h += '<div class="proverb"><div class="conv-label">A proverb for the occasion</div>' + fa(s.proverb) + '</div>';
    return h + '<p class="aside">' + esc(s.tip) + '</p>';
  }
  function stepVerse(s) {
    let h = '<div class="verse"><div class="verse-poet">' + esc(s.poet) + '</div>' + s.lines.map((l) => fa(l, { size: 'lg', cls: 'verse-line' }) + slowBtn(l.audio)).join('') + '</div>';
    h += '<div class="conv-label">Word by word, right to left</div><div class="chip-row" dir="rtl">' + s.gloss.map((g) => faChip(g, true)).join('') + '</div>';
    return h + '<p class="aside">' + esc(s.note) + '</p>';
  }
  function stepRoots(s) {
    let h = s.intro ? '<p class="step-instruction">' + esc(s.intro) + '</p>' : '';
    return h + '<div class="roots">' + s.items.map((r) => '<div class="root">' + '<div class="root-eq" dir="rtl">' + r.parts.map((p) => faChip(p, true)).join('<span class="plus">+</span>') + '<span class="plus">=</span>' + faChip(r.word, true) + audioBtn(r.word.audio, 'sm') + '</div><p>' + esc(r.story) + '</p></div>').join('') + '</div>';
  }
  function stepMassVoice(s) {
    return instr(s) + '<ol class="massvoice">' + s.items.map((it) => '<li>' + fa(it, { size: 'sm' }) + '</li>').join('') + '</ol>';
  }

  // ─── Print: tracing sheet ──────────────────
  function renderPrint() {
    const ch = state.chapters[state.printCh], d = ch && getDay(state.printCh, state.printDay);
    if (!d) return '<div class="sheet">Not found</div>';
    const script = d.steps.find((s) => s.type === 'script');
    const letters = script ? script.letters : [];
    let words = [];
    if (script) words = (script.readIt || []).map((q) => q.item).concat(...letters.map((l) => l.examples));
    else {
      const sec = d.steps.find((s) => s.type === 'secret');
      words = sec ? sec.items : [];
    }
    words = words.filter((w, i, a) => a.findIndex((x) => x.fa === w.fa) === i);
    const verbStep = d.steps.find((s) => s.type === 'verbs');
    let h = '<div class="sheet-bar"><button class="btn btn-primary" onclick="window.print()">' + ICONS.print + ' Print</button><a href="#chapter/' + state.printCh + '/day/' + state.printDay + '" class="btn btn-ghost">Back to the lesson</a></div>';
    h += '<div class="sheet"><div class="sheet-head"><div><b>Farsi with Mass</b> · Chapter ' + state.printCh + ', Day ' + d.number + ' · ' + esc(d.title.en) + '</div><div>Date ________</div></div>';
    if (!letters.length) {
      const all = [];
      ch.days.forEach((dd) => dd.steps.forEach((s) => { if (s.type === 'script') all.push(...s.letters); }));
      h += '<h2>Write every letter from memory, in every shape</h2><p class="sheet-note">Then check against the key at the bottom of the page.</p>';
      all.forEach(() => { h += '<div class="trace-row blank"></div>'; });
      h += '<p class="sheet-key" dir="rtl" lang="fa">' + all.map((l) => l.ch).join('  ') + '</p>';
    }
    letters.forEach((l) => {
      h += '<div class="sheet-letter"><div class="sl-model"><span class="sl-big" lang="fa">' + l.ch + '</span><span>' + esc(l.name) + '<br><small>' + esc(l.sound.split(',')[0]) + '</small></span></div>';
      h += '<div class="trace-row" dir="rtl" lang="fa">' + Array(7).fill('<span class="trace">' + l.ch + '</span>').join('') + '</div>';
      const forms = ['isolated', 'initial', 'medial', 'final'].filter((k) => l.forms[k]).map((k) => l.forms[k]);
      h += '<div class="trace-row small" dir="rtl" lang="fa">' + [].concat(forms, forms).map((f) => '<span class="trace">' + f + '</span>').join('') + '</div>';
      h += '<div class="trace-row blank"></div></div>';
    });
    if (words.length) {
      h += '<h2>Words</h2><div class="sheet-words">' + words.map((w) => '<div class="sw"><div class="trace-word" lang="fa" dir="rtl">' + esc(w.fa) + '</div><div class="sw-tr">' + esc(w.tr) + (w.en ? ' · ' + esc(w.en) : '') + '</div><div class="sw-line"></div><div class="sw-line"></div></div>').join('') + '</div>';
    }
    if (verbStep) {
      const v = state.verbs.verbs[verbStep.verbs[0]], variant = v.variants[0];
      h += '<h2>From memory: ' + esc(variant.label.tr) + ' (' + esc(variant.label.en) + '), in phonetics</h2><table class="sheet-verb"><tr><th></th><th>present</th><th>past</th></tr>';
      state.verbs.persons.forEach((p, i) => { h += '<tr><td>' + esc(p.tr) + ' <small>' + esc(p.en) + '</small></td><td></td><td></td></tr>'; });
      h += '</table><p class="sheet-key">Key: ' + variant.present.map((f) => esc(f.tr)).join(', ') + ' / ' + variant.past.map((f) => esc(f.tr)).join(', ') + '</p>';
    }
    return h + '</div>';
  }

  function renderLabels() {
    const ch = state.chapters[state.printCh];
    if (!ch) return '';
    let h = '<div class="sheet-bar"><button class="btn btn-primary" onclick="window.print()">' + ICONS.print + ' Print</button><a href="#chapter/' + state.printCh + '" class="btn btn-ghost">Back</a><span class="text-sm text-muted">Cut along the dashes and tape them up around the house.</span></div>';
    h += '<div class="labels">' + ch.labels.map((l) => '<div class="label' + (/!|…/.test(l.fa) ? ' cmd' : '') + '"><div class="label-fa" lang="fa" dir="rtl">' + esc(l.fa) + '</div><div class="label-tr">' + esc(l.tr) + '</div><div class="label-en">' + esc(l.en) + '</div></div>').join('') + '</div>';
    return h;
  }

  // ─── Flashcards ─────────────────────────────
  function flashItem(w) {
    const chw = chapterWord(w.id);
    return chw || wordItem(w);
  }
  function chapterWord(id) {
    for (const c of Object.values(state.chapters)) { const w = c.words.find((x) => x.id === id); if (w) return w; }
    return null;
  }
  function buildDeck(filter) {
    let words = [];
    if (filter === 'due') words = state.words.filter((w) => isDue(w.id) && (seen(w.id) || w.chapter)).concat(state.words.filter((w) => isDue(w.id) && !seen(w.id) && !w.chapter).slice(0, 15));
    else if (filter === 'all') words = state.words.slice();
    else if (filter.startsWith('ch')) { const c = state.chapters[filter.slice(2)]; const ids = c ? c.words.filter((x) => x.isNew).map((x) => x.id) : []; words = state.words.filter((w) => ids.includes(w.id)); }
    else if (filter.startsWith('mango')) words = state.words.filter((w) => w.mango_set === +filter.slice(5));
    return shuffle(words.filter((w) => !/\(stem\)|stem\)/.test(w.english)));
  }
  function renderFlashcards() {
    const F = state.flash;
    let h = '<div class="main"><header class="flash-header"><h1>Review</h1>';
    h += '<div class="seg-row">' + [['fa2en', 'Persian → English'], ['en2fa', 'English → Persian']].map(([m, l]) => '<button class="seg' + (F.mode === m ? ' active' : '') + '" data-act="flashmode" data-mode="' + m + '">' + l + '</button>').join('') + '</div></header>';
    const filters = [['due', 'Due'], ['all', 'All']].concat(Object.keys(state.chapters).map((n) => ['ch' + n, 'Chapter ' + n]));
    h += '<div class="flash-filters">' + filters.map(([id, l]) => '<button class="filter-btn' + (F.filter === id ? ' active' : '') + '" data-act="flashfilter" data-filter="' + id + '">' + l + '</button>').join('') + (F.filter.startsWith('mango') ? '<button class="filter-btn active">Mango ' + F.filter.slice(5) + '</button>' : '') + '</div>';
    const w = F.deck[F.index];
    if (!F.deck.length) return h + '<div class="flash-done"><h2>All caught up.</h2><p>Nothing due right now.</p></div></div>';
    if (!w) return h + '<div class="flash-done"><h2>Session complete.</h2><button class="btn btn-primary" data-act="flashreset">Start over</button></div></div>';
    const it = flashItem(w);
    h += '<div class="flash-counter">' + (F.index + 1) + ' / ' + F.deck.length + '</div><div class="flashcard-scene"><div class="flashcard' + (F.flipped ? ' flipped' : '') + '" data-act="flip">';
    const front = F.mode === 'fa2en' ? fa(it, { size: 'xl', noEn: true }) : '<div class="flash-en">' + esc(it.en) + '</div>';
    const back = F.mode === 'fa2en' ? '<div class="flash-en">' + esc(it.en) + '</div>' + (it.root ? '<div class="word-root">' + esc(it.root) + '</div>' : '') : fa(it, { size: 'xl', noEn: true, written: true });
    h += '<div class="flashcard-face flashcard-front">' + front + '<div class="flash-hint">tap to flip</div></div><div class="flashcard-face flashcard-back">' + back + '</div></div></div>';
    if (F.flipped) h += '<div class="rating-buttons">' + [['forgot', 'Forgot', 0], ['hard', 'Hard', 1], ['good', 'Good', 2], ['easy', 'Easy', 3]].map(([c, l, q]) => '<button class="rating-btn ' + c + '" data-act="rate" data-q="' + q + '">' + l + '</button>').join('') + '</div>';
    h += '<div class="flash-nav"><button class="flash-nav-btn" data-act="prevcard"' + (F.index === 0 ? ' disabled' : '') + '>' + ICONS.left + '</button><button class="flash-nav-btn" data-act="skipcard">' + ICONS.right + '</button></div></div>';
    return h;
  }

  // ─── Mass's words ───────────────────────────
  function renderWordLog() {
    let h = '<div class="main"><div class="wordlog-form"><h2>Log a word from Mass</h2><p class="text-muted text-sm">Words she uses in conversation. They join your review deck.</p>';
    h += '<div class="form-row"><div class="form-group"><label>How it sounds</label><input id="wl_tr" placeholder="e.g. dorost"></div><div class="form-group"><label>English</label><input id="wl_en" placeholder="meaning"></div></div>';
    h += '<div class="form-row"><div class="form-group"><label>Persian script (optional, ask Mass)</label><input id="wl_fa" dir="rtl" placeholder="فارسی"></div><div class="form-group"><label>Note</label><input id="wl_note" placeholder="how she used it"></div></div>';
    h += '<button class="btn btn-coral" data-act="addword">' + ICONS.plus + ' Add word</button></div>';
    const log = state.wordLog.slice().reverse();
    if (!log.length) return h + '<div class="empty-state"><h3>No words yet</h3><p>After you talk with Mass, add the words she used here.</p></div></div>';
    h += '<h2 class="section-h">From Mass (' + log.length + ')</h2><div class="wordlog-list">' + log.map((w) => '<div class="wordlog-item"><div class="wordlog-item-persian" lang="fa" dir="rtl">' + esc(w.persian_spoken || '') + '</div><div class="wordlog-item-details"><b>' + esc(w.tr) + '</b> · ' + esc(w.english) + (w.note ? '<div class="text-xs text-muted">' + esc(w.note) + '</div>' : '') + '</div><div class="wordlog-item-date">' + new Date(w.added).toLocaleDateString() + '</div><button class="wordlog-delete" data-act="delword" data-id="' + w.id + '">' + ICONS.trash + '</button></div>').join('') + '</div>';
    return h + '</div>';
  }
  function addWord() {
    const v = (id) => ($('#' + id).value || '').trim();
    const tr = v('wl_tr'), en = v('wl_en');
    if (!tr || !en) { toast('Add how it sounds and what it means'); return; }
    const maxId = Math.max(0, ...state.words.map((w) => w.id), ...state.wordLog.map((w) => w.id));
    const w = { id: maxId + 1, english: en, tr, spoken_pronunciation: tr, persian_spoken: v('wl_fa'), persian_written: v('wl_fa'), note: v('wl_note'), source: 'mass', added: Date.now() };
    state.wordLog.push(w);
    state.words.push(w);
    save('wordLog', state.wordLog);
    toast('Added');
    render();
  }

  // ─── Events ────────────────────────────────
  function afterRender() {
    $$('.type-input').forEach((inp) => inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkType(inp.id.slice(3)); }));
  }

  document.addEventListener('click', (e) => {
    const au = e.target.closest('[data-audio]');
    if (au && !e.target.closest('[data-act]')) { e.preventDefault(); e.stopPropagation(); play(au.dataset.audio, +au.dataset.rate || 1); return; }
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const a = el.dataset.act, key = el.dataset.key;
    switch (a) {
      case 'answer': answer(key, +el.dataset.i); break;
      case 'type': checkType(key); break;
      case 'tile': tapTile(key, +el.dataset.i); break;
      case 'build': checkBuild(key); break;
      case 'redo': redo(key); break;
      case 'reveal': el.classList.toggle('revealed'); break;
      case 'secret': el.classList.add('open'); { const item = $('.secret-reveal [data-audio]', el); if (item) play(item.dataset.audio); } break;
      case 'done': markDone(state.ch, state.day, +el.dataset.step); if (getDay(state.ch, state.day).steps[+el.dataset.step].type === 'script') render(); break;
      case 'task': state.progress[el.dataset.k] = el.checked; save('progress', state.progress); break;
      case 'variant': VUI[key + el.dataset.verb].v = +el.dataset.i; $('#verb_' + key + '_' + el.dataset.verb).innerHTML = verbCard(el.dataset.verb, key); break;
      case 'neg': VUI[key + el.dataset.verb].neg = el.dataset.neg === '1'; $('#verb_' + key + '_' + el.dataset.verb).innerHTML = verbCard(el.dataset.verb, key); break;
      case 'setting': state.settings[el.dataset.key] = el.checked; save('settings', state.settings); render(); break;
      case 'round-start': roundStart(key); break;
      case 'round-next': roundNext(key); break;
      case 'round-answer': roundAnswer(key, el.dataset.v); break;
      case 'rec': toggleRec(key, el); break;
      case 'mine': play(RECS[key]); break;
      case 'flip': state.flash.flipped = !state.flash.flipped; render(); if (state.flash.flipped && state.flash.mode === 'en2fa') { const w = state.flash.deck[state.flash.index]; const it = w && flashItem(w); if (it && it.audio) play(it.audio); } break;
      case 'rate': { const w = state.flash.deck[state.flash.index]; if (w) review(w.id, +el.dataset.q); state.flash.index++; state.flash.flipped = false; render(); break; }
      case 'prevcard': if (state.flash.index > 0) { state.flash.index--; state.flash.flipped = false; render(); } break;
      case 'skipcard': state.flash.index++; state.flash.flipped = false; render(); break;
      case 'flashreset': setFilter(state.flash.filter); break;
      case 'flashfilter': setFilter(el.dataset.filter); if (state.view !== 'flashcards') { e.preventDefault(); location.hash = 'flashcards'; } break;
      case 'flashmode': state.flash.mode = el.dataset.mode; state.flash.flipped = false; render(); break;
      case 'mango': setFilter('mango' + el.dataset.set); location.hash = 'flashcards'; break;
      case 'addword': addWord(); break;
      case 'delword': state.wordLog = state.wordLog.filter((w) => w.id !== +el.dataset.id); state.words = state.words.filter((w) => w.id !== +el.dataset.id || w.source !== 'mass'); save('wordLog', state.wordLog); render(); break;
    }
  });
  function setFilter(f) { Object.assign(state.flash, { filter: f, deck: buildDeck(f), index: 0, flipped: false }); if (state.view === 'flashcards') render(); }

  // ─── Data loading ───────────────────────────
  async function getJSON(path) { const r = await fetch(path + '?v=' + Date.now()); if (!r.ok) throw new Error(path); return r.json(); }
  async function init() {
    state.srs = load('srs', {});
    state.progress = load('progress', {});
    state.settings = load('settings', { fadeTr: false, showWritten: false });
    state.wordLog = load('wordLog', []);
    const [words, verbs, course] = await Promise.all([getJSON('data/words.json'), getJSON('data/verbs.json'), getJSON('data/course.json')]);
    state.words = words; state.verbs = verbs; state.course = course;
    for (let i = 1; i <= 40; i++) { try { state.chapters[i] = await getJSON('data/chapter-' + i + '.json'); } catch (e) { break; } }
    // Chapter words carry the authoritative phonetics and audio for their ids
    Object.values(state.chapters).forEach((c) => c.words.forEach((cw) => {
      const w = state.words.find((x) => x.id === cw.id);
      if (w) Object.assign(w, { tr: cw.tr, audio: cw.audio, persian_spoken: cw.fa });
      else state.words.push({ id: cw.id, english: cw.en, persian_spoken: cw.fa, persian_written: cw.w || cw.fa, tr: cw.tr, audio: cw.audio, chapter: c.number, source: 'course' });
    }));
    state.wordLog.forEach((w) => { if (!state.words.find((x) => x.id === w.id)) state.words.push(w); });
    state.flash.deck = buildDeck('due');
    window.addEventListener('hashchange', handleHash);
    handleHash();
  }
  init();
})();
