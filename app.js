/* ══════════════════════════════════════════════
   FARSI WITH MASS — Application
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── SVG Icons ──────────────────────────────
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  };

  // ─── State ──────────────────────────────────
  const state = {
    words: [],
    chapters: {},
    srs: {},
    wordLog: [],
    currentView: 'dashboard',
    currentChapter: null,
    currentSection: 'words',
    flashcardFilter: 'due',
    flashcardIndex: 0,
    flashcardFlipped: false,
    flashcardDeck: [],
  };

  // ─── Storage ────────────────────────────────
  const STORAGE_PREFIX = 'farsi_';

  function save(key, value) {
    try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch (e) { /* full */ }
  }

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  // ─── SRS Engine (SM-2 inspired) ─────────────
  function initSRS() {
    state.srs = load('srs', {});
  }

  function getSRSCard(wordId) {
    if (!state.srs[wordId]) {
      state.srs[wordId] = {
        ease: 2.5,
        interval: 0,
        repetitions: 0,
        due: Date.now(),
        lastReview: null,
      };
    }
    return state.srs[wordId];
  }

  function reviewSRS(wordId, quality) {
    // quality: 0=forgot, 1=hard, 2=good, 3=easy
    const card = getSRSCard(wordId);
    const now = Date.now();
    const DAY = 86400000;

    if (quality < 2) {
      card.repetitions = 0;
      card.interval = quality === 0 ? 0 : 1;
    } else {
      card.repetitions++;
      if (card.repetitions === 1) card.interval = 1;
      else if (card.repetitions === 2) card.interval = 3;
      else card.interval = Math.round(card.interval * card.ease);
    }

    card.ease += (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
    if (card.ease < 1.3) card.ease = 1.3;

    card.due = now + card.interval * DAY;
    card.lastReview = now;
    state.srs[wordId] = card;
    save('srs', state.srs);
  }

  function isDue(wordId) {
    const card = state.srs[wordId];
    if (!card) return true;
    return Date.now() >= card.due;
  }

  function getDueWords() {
    return state.words.filter(w => isDue(w.id));
  }

  function getLearnedCount() {
    return Object.values(state.srs).filter(c => c.repetitions >= 2).length;
  }

  // ─── Audio ──────────────────────────────────
  let currentAudio = null;

  function playAudio(path) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (!path) return;
    currentAudio = new Audio(path);
    currentAudio.play().catch(() => {});
  }

  function audioButton(path, size) {
    const cls = size === 'lg' ? 'audio-btn audio-btn-lg' : size === 'sm' ? 'audio-btn audio-btn-sm' : 'audio-btn';
    return `<button class="${cls}" onclick="window.app.playAudio('${esc(path)}')" title="Play audio">${ICONS.play}</button>`;
  }

  // ─── Utilities ──────────────────────────────
  function esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  // ─── Routing ────────────────────────────────
  function navigate(view, params) {
    state.currentView = view;
    if (params) Object.assign(state, params);
    render();
    window.scrollTo(0, 0);
  }

  function handleHash() {
    const hash = location.hash.slice(1) || 'dashboard';
    const parts = hash.split('/');
    const view = parts[0];

    if (view === 'chapter' && parts[1]) {
      state.currentChapter = parseInt(parts[1]);
      state.currentSection = parts[2] || 'words';
      navigate('chapter');
    } else if (view === 'flashcards') {
      navigate('flashcards');
    } else if (view === 'wordlog') {
      navigate('wordlog');
    } else {
      navigate('dashboard');
    }
  }

  // ─── Toast ──────────────────────────────────
  function toast(msg) {
    let el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ─── Word Display (Chapters 1-8: script + pronunciation + English) ──
  function wordDisplay(word, opts = {}) {
    const spoken = word.persian_spoken || word.persian_written;
    const written = word.persian_written;
    const pron = word.spoken_pronunciation || word.pronunciation;
    const showWritten = spoken !== written;
    const audioPath = word.audio || (word.id ? `audio/word_${word.id}.mp3` : '');

    let html = '<div class="word-card">';
    html += `<div class="word-persian">${esc(spoken)}</div>`;
    if (showWritten) {
      html += `<div class="word-written"><span class="written-label">written</span> ${esc(written)}</div>`;
    }
    html += `<div class="word-pronunciation">${esc(pron)}</div>`;
    html += `<div class="word-english">${esc(word.english)}</div>`;
    if (audioPath) {
      html += `<div style="margin-top:var(--space-sm)">${audioButton(audioPath)}</div>`;
    }
    if (opts.example) {
      html += `<div class="word-example">${opts.example}</div>`;
    }
    html += '</div>';
    return html;
  }

  // ─── Render ─────────────────────────────────
  function render() {
    const app = $('#app');
    let html = '';

    switch (state.currentView) {
      case 'dashboard': html = renderDashboard(); break;
      case 'chapter': html = renderChapter(); break;
      case 'flashcards': html = renderFlashcards(); break;
      case 'wordlog': html = renderWordLog(); break;
    }

    html += renderNav();
    app.innerHTML = html;
    bindEvents();
  }

  // ─── Navigation Bar ─────────────────────────
  function renderNav() {
    const items = [
      { id: 'dashboard', icon: ICONS.home, label: 'Home' },
      { id: 'chapter', icon: ICONS.book, label: 'Learn', hash: state.currentChapter ? `chapter/${state.currentChapter}` : 'chapter/1' },
      { id: 'flashcards', icon: ICONS.cards, label: 'Review' },
      { id: 'wordlog', icon: ICONS.edit, label: 'Words' },
    ];

    return '<nav class="nav">' + items.map(it => {
      const active = state.currentView === it.id ? ' active' : '';
      const hash = it.hash || it.id;
      return `<a href="#${hash}" class="nav-item${active}">
        ${it.icon}<span>${it.label}</span>
      </a>`;
    }).join('') + '</nav>';
  }

  // ─── Dashboard ──────────────────────────────
  function renderDashboard() {
    const total = state.words.length;
    const due = getDueWords().length;
    const learned = getLearnedCount();
    const chapterKeys = Object.keys(state.chapters).sort((a, b) => a - b);

    let html = '<div class="main">';
    html += '<div class="dashboard-header">';
    html += '<h1>Farsi with Mass</h1>';
    html += '<div class="subtitle">فارسی با مسعومه</div>';
    html += '</div>';

    html += '<div class="stats-row">';
    html += `<div class="stat-card"><span class="stat-number">${total}</span><span class="stat-label">Words</span></div>`;
    html += `<div class="stat-card"><span class="stat-number">${learned}</span><span class="stat-label">Learned</span></div>`;
    html += `<div class="stat-card"><span class="stat-number">${due}</span><span class="stat-label">Due</span></div>`;
    html += '</div>';

    if (due > 0) {
      html += `<a href="#flashcards" class="btn btn-coral btn-block">Review ${due} due card${due !== 1 ? 's' : ''}</a>`;
    }

    html += '<h2 style="margin-bottom:var(--space-md)">Chapters</h2>';

    if (chapterKeys.length === 0) {
      html += '<div class="empty-state"><h3>No chapters yet</h3><p>Chapter data is loading or not available.</p></div>';
    } else {
      for (const num of chapterKeys) {
        const ch = state.chapters[num];
        const newWords = ch.words ? ch.words.filter(w => w.isNew).length : 0;
        html += `<a href="#chapter/${num}" class="chapter-card" style="text-decoration:none;color:inherit">
          <div class="chapter-number">Chapter ${num}</div>
          <h2>${esc(ch.title)}</h2>
          <div class="chapter-theme">${esc(ch.theme)}</div>
          <div class="chapter-card-meta">
            <span>${newWords} new words</span>
            <span>8 sections</span>
          </div>
        </a>`;
      }
    }

    // Mango review shortcut
    html += '<h2 style="margin:var(--space-lg) 0 var(--space-md)">Mango Review</h2>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-sm)">';
    const sets = [...new Set(state.words.filter(w => w.mango_set).map(w => w.mango_set))].sort((a, b) => a - b);
    for (const s of sets) {
      const count = state.words.filter(w => w.mango_set === s).length;
      html += `<button class="btn btn-secondary btn-sm" onclick="window.app.startMangoReview(${s})">Set ${s} <span class="text-muted text-xs">(${count})</span></button>`;
    }
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ─── Chapter View ───────────────────────────
  function renderChapter() {
    const num = state.currentChapter;
    const ch = state.chapters[num];

    if (!ch) {
      return '<div class="main"><div class="empty-state"><h3>Chapter not found</h3><p>This chapter hasn\'t been created yet.</p><a href="#dashboard" class="btn btn-primary" style="margin-top:var(--space-md)">Back to Home</a></div></div>';
    }

    const sections = [
      { id: 'words', label: 'Words' },
      { id: 'grammar', label: 'Grammar' },
      { id: 'listening', label: 'Listening' },
      { id: 'speaking', label: 'Speaking' },
      { id: 'reading', label: 'Reading' },
      { id: 'story', label: 'Story' },
      { id: 'culture', label: 'Culture' },
      { id: 'cards', label: 'Cards' },
    ];

    let html = '<div class="main">';
    html += '<div class="chapter-view-header">';
    html += `<a href="#dashboard" class="text-sm text-muted back-link" style="text-decoration:none">${ICONS.chevLeft} Back</a>`;
    html += `<div class="chapter-number">Chapter ${num}</div>`;
    html += `<h1>${esc(ch.title)}</h1>`;
    html += `<p class="text-muted">${esc(ch.theme)}</p>`;
    html += '</div>';

    html += '<div class="section-tabs">';
    for (const s of sections) {
      const active = state.currentSection === s.id ? ' active' : '';
      html += `<button class="section-tab${active}" onclick="window.app.setSection('${s.id}')">${s.label}</button>`;
    }
    html += '</div>';

    html += '<div class="section-content">';
    switch (state.currentSection) {
      case 'words': html += renderWordsSection(ch); break;
      case 'grammar': html += renderGrammarSection(ch); break;
      case 'listening': html += renderListeningSection(ch); break;
      case 'speaking': html += renderSpeakingSection(ch); break;
      case 'reading': html += renderReadingSection(ch); break;
      case 'story': html += renderStorySection(ch); break;
      case 'culture': html += renderCultureSection(ch); break;
      case 'cards': html += renderConvCardsSection(ch); break;
    }
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ─── Chapter: Words Section ─────────────────
  function renderWordsSection(ch) {
    if (!ch.words || ch.words.length === 0) {
      return '<div class="empty-state"><p>No words for this chapter yet.</p></div>';
    }

    let html = '<div class="section-header"><h2>New Words</h2><p>Learn these new words, then review them with flashcards.</p></div>';

    const newWords = shuffle(ch.words.filter(w => w.isNew));
    const reviewWords = shuffle(ch.words.filter(w => !w.isNew));

    if (newWords.length > 0) {
      html += '<div class="word-grid">';
      for (const w of newWords) {
        html += wordDisplay(w, { example: w.example ? `<span class="persian-inline">${esc(w.example.persian)}</span><br><span class="pronunciation">${esc(w.example.pronunciation)}</span><br>${esc(w.example.english)}` : '' });
      }
      html += '</div>';
    }

    if (reviewWords.length > 0) {
      html += '<h2 style="margin:var(--space-xl) 0 var(--space-md)">Review Words</h2>';
      html += '<p class="text-muted text-sm" style="margin-bottom:var(--space-md)">Words you\'ve seen before, showing up in a new context.</p>';
      html += '<div class="word-grid">';
      for (const w of reviewWords) {
        html += wordDisplay(w);
      }
      html += '</div>';
    }

    html += `<div style="margin-top:var(--space-xl);text-align:center">
      <a href="#flashcards" class="btn btn-turquoise">Practice with Flashcards</a>
    </div>`;

    return html;
  }

  // ─── Chapter: Grammar Section ───────────────
  function renderGrammarSection(ch) {
    const g = ch.grammar;
    if (!g) return '<div class="empty-state"><p>No grammar content yet.</p></div>';

    let html = '<div class="section-header"><h2>' + esc(g.title) + '</h2><p>' + esc(g.subtitle || '') + '</p></div>';

    html += '<div class="grammar-explanation">';
    html += g.explanation || '';
    html += '</div>';

    if (g.formation) {
      html += '<h3 style="margin:var(--space-lg) 0 var(--space-md)">How to form it</h3>';
      for (let i = 0; i < g.formation.length; i++) {
        html += `<div class="formation-step"><div class="step-number">${i + 1}</div><div>${g.formation[i]}</div></div>`;
      }
    }

    if (g.examples) {
      html += '<h3 style="margin:var(--space-lg) 0 var(--space-md)">Examples</h3>';
      for (const ex of g.examples) {
        const audioPath = ex.audio || '';
        html += `<div class="example-block">
          <div class="example-text">
            <div class="example-persian">${esc(ex.persian)}</div>
            <div class="example-pronunciation">${esc(ex.pronunciation)}</div>
            <div class="example-english">${esc(ex.english)}</div>
          </div>
          ${audioPath ? audioButton(audioPath) : ''}
        </div>`;
      }
    }

    if (g.exercises) {
      html += '<h3 style="margin:var(--space-lg) 0 var(--space-md)">Practice</h3>';
      for (let i = 0; i < g.exercises.length; i++) {
        const ex = g.exercises[i];
        html += renderExercise(ex, `grammar_${i}`);
      }
    }

    return html;
  }

  // ─── Chapter: Listening Section ─────────────
  function renderListeningSection(ch) {
    const l = ch.listening;
    if (!l) return '<div class="empty-state"><p>No listening content yet.</p></div>';

    let html = '<div class="section-header"><h2>Listening</h2><p>Listen first, then read. Train your ear before your eyes.</p></div>';

    if (l.dialogue) {
      html += '<h3 style="margin-bottom:var(--space-md)">' + esc(l.dialogue.title || 'Dialogue') + '</h3>';
      html += '<div class="dialogue-block">';
      if (l.dialogue.context) {
        html += `<div class="dialogue-context">${esc(l.dialogue.context)}</div>`;
      }
      if (l.dialogue.audio) {
        html += `<div style="text-align:center;margin-bottom:var(--space-md)">${audioButton(l.dialogue.audio, 'lg')}<div class="text-sm text-muted" style="margin-top:var(--space-xs)">Listen to the whole dialogue</div></div>`;
      }
      for (const line of (l.dialogue.lines || [])) {
        const speakerClass = line.speaker.toLowerCase();
        html += `<div class="dialogue-line ${speakerClass}">
          <div class="speaker-label ${speakerClass}">${esc(line.speaker)}</div>
          <div class="dialogue-text">
            <div class="dialogue-persian">${esc(line.persian)}</div>
            <div class="pronunciation">${esc(line.pronunciation)}</div>
            <div class="dialogue-hidden" onclick="this.classList.toggle('revealed')">${esc(line.english)}</div>
          </div>
          ${line.audio ? audioButton(line.audio, 'sm') : ''}
        </div>`;
      }
      html += '</div>';
    }

    if (l.dictation) {
      html += '<h3 style="margin:var(--space-xl) 0 var(--space-md)">Dictation</h3>';
      html += '<p class="text-muted text-sm" style="margin-bottom:var(--space-md)">Listen and type what you hear in Persian script.</p>';
      for (let i = 0; i < l.dictation.length; i++) {
        const d = l.dictation[i];
        html += `<div class="dictation-block">
          <div>${audioButton(d.audio, 'lg')}</div>
          <input class="dictation-input" id="dictation_${i}" placeholder="Type what you hear..." dir="rtl">
          <div style="margin-top:var(--space-sm)">
            <button class="btn btn-sm btn-turquoise" onclick="window.app.checkDictation(${i}, '${esc(d.answer)}')">Check</button>
            <button class="btn btn-sm btn-ghost" onclick="window.app.revealDictation(${i}, '${esc(d.answer)}')">Show answer</button>
          </div>
          <div id="dictation_result_${i}" class="exercise-answer" style="display:none"></div>
        </div>`;
      }
    }

    if (l.comprehension) {
      html += '<h3 style="margin:var(--space-xl) 0 var(--space-md)">Comprehension</h3>';
      for (let i = 0; i < l.comprehension.length; i++) {
        html += renderQuestion(l.comprehension[i], `comp_${i}`);
      }
    }

    return html;
  }

  // ─── Chapter: Speaking Section ──────────────
  function renderSpeakingSection(ch) {
    const s = ch.speaking;
    if (!s) return '<div class="empty-state"><p>No speaking content yet.</p></div>';

    let html = '<div class="section-header"><h2>Speaking</h2><p>Answer aloud in Persian. Don\'t peek at the model answer until you\'ve tried.</p></div>';

    for (let i = 0; i < s.prompts.length; i++) {
      const p = s.prompts[i];
      html += `<div class="speaking-prompt">
        <h3>${esc(p.title)}</h3>
        <p class="text-muted">${esc(p.instruction)}</p>`;

      if (p.audio) {
        html += `<div style="margin:var(--space-md) 0">${audioButton(p.audio, 'lg')}</div>`;
      }

      if (p.timeLimit) {
        html += `<div class="timer" id="timer_${i}">${p.timeLimit}s</div>
          <button class="btn btn-coral btn-sm" onclick="window.app.startTimer(${i}, ${p.timeLimit})">Start Timer</button>`;
      }

      if (p.hints) {
        html += '<div class="hint-list">';
        for (const h of p.hints) {
          html += `<span class="hint-chip">${esc(h)}</span>`;
        }
        html += '</div>';
      }

      html += `<div id="model_${i}" style="display:none" class="model-answer">
        <div class="text-sm text-muted" style="margin-bottom:var(--space-xs)">Model answer</div>
        <div class="example-persian">${esc(p.model?.persian || '')}</div>
        <div class="pronunciation">${esc(p.model?.pronunciation || '')}</div>
        <div>${esc(p.model?.english || '')}</div>
      </div>`;

      html += `<div style="margin-top:var(--space-md)">
        <button class="btn btn-sm btn-ghost" onclick="document.getElementById('model_${i}').style.display='block'">
          ${ICONS.eye} Show model answer
        </button>
      </div>`;

      html += '</div>';
    }

    return html;
  }

  // ─── Chapter: Reading Section ───────────────
  function renderReadingSection(ch) {
    const r = ch.reading;
    if (!r) return '<div class="empty-state"><p>No reading content yet.</p></div>';

    let html = '<div class="section-header"><h2>Reading &amp; Writing</h2><p>Read without vowel marks. Then practice writing.</p></div>';

    if (r.text) {
      html += `<div class="reading-text">${esc(r.text.persian)}</div>`;
      html += `<div style="margin-bottom:var(--space-lg)">
        <button class="btn btn-sm btn-ghost" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
          ${ICONS.eye} Show translation
        </button>
        <div style="display:none;margin-top:var(--space-sm);padding:var(--space-md);background:var(--white);border-radius:var(--radius-sm)">
          <div class="pronunciation">${esc(r.text.pronunciation || '')}</div>
          <div>${esc(r.text.english || '')}</div>
        </div>
      </div>`;
    }

    if (r.typing) {
      html += '<h3 style="margin:var(--space-lg) 0 var(--space-md)">Typing Practice</h3>';
      html += '<p class="text-muted text-sm" style="margin-bottom:var(--space-md)">Type these sentences in Persian script.</p>';
      for (let i = 0; i < r.typing.length; i++) {
        const t = r.typing[i];
        html += `<div class="exercise-block">
          <div class="exercise-prompt">${esc(t.english)}</div>
          <input class="dictation-input" id="typing_${i}" placeholder="Type in Persian..." dir="rtl">
          <div style="margin-top:var(--space-sm)">
            <button class="btn btn-sm btn-turquoise" onclick="window.app.checkTyping(${i}, '${esc(t.answer)}')">Check</button>
            <button class="btn btn-sm btn-ghost" onclick="window.app.revealTyping(${i}, '${esc(t.answer)}')">Show</button>
          </div>
          <div id="typing_result_${i}" class="exercise-answer" style="display:none"></div>
        </div>`;
      }
    }

    return html;
  }

  // ─── Chapter: Story Section ─────────────────
  function renderStorySection(ch) {
    const s = ch.story;
    if (!s) return '<div class="empty-state"><p>No story yet.</p></div>';

    let html = '<div class="section-header">';
    html += `<h2>${esc(s.title)}</h2>`;
    html += `<p class="text-muted">${esc(s.subtitle || '')}</p>`;
    html += '</div>';

    html += '<div class="story-header">';
    html += '<p class="text-muted text-sm">Listen to the story first, then read along.</p>';
    if (s.audio) {
      html += `<div class="story-listen-btn">${audioButton(s.audio, 'lg')}</div>`;
    }
    html += '</div>';

    for (const line of (s.lines || [])) {
      const isDialogue = !!line.speaker;
      html += `<div class="story-line${isDialogue ? ' dialogue' : ''}">`;
      if (isDialogue) {
        html += `<div class="story-speaker">${esc(line.speaker)}</div>`;
      }
      html += `<div class="story-text">
        <div class="story-persian">${esc(line.persian)}</div>
        <div class="pronunciation">${esc(line.pronunciation)}</div>
        <div class="dialogue-hidden" onclick="this.classList.toggle('revealed')">${esc(line.english)}</div>
      </div>`;
      if (line.audio) html += audioButton(line.audio, 'sm');
      html += '</div>';
    }

    if (s.questions) {
      html += '<h3 style="margin:var(--space-xl) 0 var(--space-md)">Check Your Understanding</h3>';
      for (let i = 0; i < s.questions.length; i++) {
        html += renderQuestion(s.questions[i], `story_q_${i}`);
      }
    }

    return html;
  }

  // ─── Chapter: Culture Section ───────────────
  function renderCultureSection(ch) {
    const c = ch.culture;
    if (!c) return '<div class="empty-state"><p>No culture content yet.</p></div>';

    let html = '<div class="culture-block">';
    html += `<h2>${esc(c.title)}</h2>`;
    html += c.content || '';
    html += '</div>';
    return html;
  }

  // ─── Chapter: Conversation Cards ────────────
  function renderConvCardsSection(ch) {
    const cards = ch.conversationCards;
    if (!cards || cards.length === 0) return '<div class="empty-state"><p>No conversation cards yet.</p></div>';

    let html = '<div class="section-header"><h2>Conversation Cards for Mass</h2><p>One card per day. Use these to start your Farsi conversations.</p></div>';

    html += '<div class="conv-cards">';
    for (const card of cards) {
      html += '<div class="conv-card">';
      html += `<div class="conv-card-day">${esc(card.day)}</div>`;
      html += `<h3>${esc(card.topic)}</h3>`;

      if (card.openers) {
        html += '<div style="margin-bottom:var(--space-sm)"><div class="text-xs text-muted" style="margin-bottom:var(--space-xs)">Start with:</div>';
        for (const o of card.openers) {
          html += `<div class="conv-opener">
            ${esc(o.persian)}
            <div class="pronunciation text-sm">${esc(o.pronunciation)}</div>
            <div class="text-sm">${esc(o.english)}</div>
          </div>`;
        }
        html += '</div>';
      }

      if (card.practiceWords) {
        html += '<div class="text-xs text-muted" style="margin-bottom:var(--space-xs)">Try to use:</div>';
        html += '<div class="conv-practice">';
        for (const w of card.practiceWords) {
          html += `<span class="conv-practice-word">${esc(w)}</span>`;
        }
        html += '</div>';
      }

      if (card.massNote) {
        html += `<div class="conv-mass-note">
          <div class="conv-mass-label">Note for Mass</div>
          ${esc(card.massNote)}
        </div>`;
      }

      html += '</div>';
    }
    html += '</div>';

    html += `<div style="margin-top:var(--space-lg);padding:var(--space-lg);background:var(--turquoise-pale);border-radius:var(--radius-md);text-align:center">
      <p>After your conversation, log any new words Mass taught you!</p>
      <a href="#wordlog" class="btn btn-turquoise" style="margin-top:var(--space-sm)">${ICONS.plus} Add Words</a>
    </div>`;

    return html;
  }

  // ─── Exercise Renderer ──────────────────────
  function renderExercise(ex, id) {
    let html = `<div class="exercise-block" id="ex_${id}">`;
    html += `<h4>${esc(ex.type || 'Exercise')}</h4>`;
    html += `<div class="exercise-prompt">${ex.prompt}</div>`;

    if (ex.type === 'fill-blank' || ex.type === 'translate') {
      html += `<input class="exercise-input" id="input_${id}" dir="${ex.rtl ? 'rtl' : 'ltr'}" ${ex.rtl ? 'style="font-family:var(--font-persian);font-size:1.2rem"' : ''} placeholder="${esc(ex.placeholder || 'Your answer...')}">`;
      html += `<div style="margin-top:var(--space-sm)">
        <button class="btn btn-sm btn-turquoise" onclick="window.app.checkExercise('${id}', '${esc(ex.answer)}')">Check</button>
        <button class="btn btn-sm btn-ghost" onclick="window.app.revealExercise('${id}', '${esc(ex.answer)}')">Show</button>
      </div>`;
    } else if (ex.type === 'multiple-choice') {
      html += renderQuestion({ question: '', options: ex.options, correct: ex.correct }, id);
    }

    html += `<div id="result_${id}" class="exercise-answer" style="display:none"></div>`;
    html += '</div>';
    return html;
  }

  // ─── Question Renderer ──────────────────────
  function renderQuestion(q, id) {
    let html = `<div class="question-block" id="q_${id}">`;
    if (q.question) html += `<div class="question-text">${esc(q.question)}</div>`;
    html += '<div class="question-options">';
    for (let i = 0; i < (q.options || []).length; i++) {
      html += `<button class="question-option" onclick="window.app.answerQuestion('${id}', ${i}, ${q.correct})">${esc(q.options[i])}</button>`;
    }
    html += '</div></div>';
    return html;
  }

  // ─── Flashcards View ────────────────────────
  function renderFlashcards() {
    let html = '<div class="main">';
    html += '<div class="flash-header"><h1>Review</h1></div>';

    // Filters
    const filters = [
      { id: 'due', label: `Due (${getDueWords().length})` },
      { id: 'all', label: `All (${state.words.length})` },
    ];
    // Add chapter filters
    for (const num of Object.keys(state.chapters).sort((a, b) => a - b)) {
      const ch = state.chapters[num];
      const chWords = (ch.words || []).filter(w => w.isNew);
      filters.push({ id: `ch${num}`, label: `Ch ${num} (${chWords.length})` });
    }
    // Add mango set filters
    const mangoSets = [...new Set(state.words.filter(w => w.mango_set).map(w => w.mango_set))].sort((a, b) => a - b);
    for (const s of mangoSets) {
      filters.push({ id: `mango${s}`, label: `Mango ${s}` });
    }

    html += '<div class="flash-filters">';
    for (const f of filters) {
      const active = state.flashcardFilter === f.id ? ' active' : '';
      html += `<button class="filter-btn${active}" onclick="window.app.setFlashFilter('${f.id}')">${f.label}</button>`;
    }
    html += '</div>';

    const deck = state.flashcardDeck;

    if (deck.length === 0) {
      html += '<div class="flash-done"><h2>All caught up!</h2><p>No cards to review right now. Come back later or pick a different set.</p></div>';
      html += '</div>';
      return html;
    }

    const idx = state.flashcardIndex;
    const word = deck[idx];
    if (!word) {
      html += '<div class="flash-done"><h2>Session complete!</h2><p>Nice work. You reviewed all the cards in this set.</p><button class="btn btn-primary" onclick="window.app.resetFlashcards()">Start Over</button></div>';
      html += '</div>';
      return html;
    }

    html += `<div class="flash-counter">${idx + 1} / ${deck.length}</div>`;

    const spoken = word.persian_spoken || word.persian_written;
    const written = word.persian_written;
    const pron = word.spoken_pronunciation || word.pronunciation;
    const showWritten = spoken !== written;
    const audioPath = word.audio || `audio/word_${word.id}.mp3`;

    html += `<div class="flashcard-scene">
      <div class="flashcard${state.flashcardFlipped ? ' flipped' : ''}" onclick="window.app.flipCard()">
        <div class="flashcard-face flashcard-front">
          <div class="word-persian">${esc(spoken)}</div>
          ${showWritten ? `<div class="word-written"><span class="written-label">written</span> ${esc(written)}</div>` : ''}
          <div style="margin-top:var(--space-sm)">${audioButton(audioPath)}</div>
          <div class="flash-hint" style="margin-top:var(--space-md)">Tap to reveal</div>
        </div>
        <div class="flashcard-face flashcard-back">
          <div class="word-english">${esc(word.english)}</div>
          <div class="word-pronunciation">${esc(pron)}</div>
          <div class="word-persian" style="font-size:1.5rem;margin-top:var(--space-sm)">${esc(spoken)}</div>
          ${word.note ? `<div class="text-sm text-muted" style="margin-top:var(--space-sm)">${esc(word.note)}</div>` : ''}
        </div>
      </div>
    </div>`;

    if (state.flashcardFlipped) {
      html += '<div class="rating-buttons">';
      html += `<button class="rating-btn forgot" onclick="window.app.rateCard(0)">Forgot</button>`;
      html += `<button class="rating-btn hard" onclick="window.app.rateCard(1)">Hard</button>`;
      html += `<button class="rating-btn good" onclick="window.app.rateCard(2)">Good</button>`;
      html += `<button class="rating-btn easy" onclick="window.app.rateCard(3)">Easy</button>`;
      html += '</div>';
    }

    html += '<div class="flash-nav">';
    html += `<button class="flash-nav-btn" onclick="window.app.prevCard()" ${idx === 0 ? 'disabled' : ''}>${ICONS.chevLeft}</button>`;
    html += `<button class="flash-nav-btn" onclick="window.app.skipCard()">${ICONS.chevRight}</button>`;
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ─── Word Log View ──────────────────────────
  function renderWordLog() {
    let html = '<div class="main">';
    html += '<div class="wordlog-form">';
    html += '<h2>Log a Word from Mass</h2>';
    html += '<p class="text-muted text-sm" style="margin-bottom:var(--space-md)">Add words Mass teaches you in conversation.</p>';

    html += '<div class="form-row">';
    html += `<div class="form-group"><label>Persian (spoken)</label><input id="wl_persian" dir="rtl" placeholder="فارسی"></div>`;
    html += `<div class="form-group"><label>English</label><input id="wl_english" placeholder="English meaning"></div>`;
    html += '</div>';
    html += '<div class="form-row">';
    html += `<div class="form-group"><label>Pronunciation</label><input id="wl_pron" placeholder="e.g. dorost"></div>`;
    html += `<div class="form-group"><label>Written form (if different)</label><input id="wl_written" dir="rtl" placeholder="Optional"></div>`;
    html += '</div>';
    html += `<div class="form-group"><label>Note</label><input id="wl_note" placeholder="Context, example, or how Mass used it"></div>`;

    html += `<button class="btn btn-coral" onclick="window.app.addWord()">${ICONS.plus} Add Word</button>`;
    html += '</div>';

    // Word log list
    const log = [...state.wordLog].reverse();
    if (log.length > 0) {
      html += `<h2 style="margin-bottom:var(--space-md)">Words from Mass (${log.length})</h2>`;
      html += '<div class="wordlog-list">';
      for (const w of log) {
        html += `<div class="wordlog-item">
          <div class="wordlog-item-persian">${esc(w.persian_spoken)}</div>
          <div class="wordlog-item-details">
            <div class="wordlog-item-english">${esc(w.english)}</div>
            <div class="wordlog-item-pronunciation">${esc(w.spoken_pronunciation)}</div>
            ${w.note ? `<div class="text-xs text-muted">${esc(w.note)}</div>` : ''}
          </div>
          <div class="wordlog-item-date">${new Date(w.added).toLocaleDateString()}</div>
          <div class="wordlog-item-actions">
            <button class="wordlog-delete" onclick="window.app.deleteWord(${w.id})" title="Remove">${ICONS.trash}</button>
          </div>
        </div>`;
      }
      html += '</div>';
    } else {
      html += '<div class="empty-state"><h3>No words logged yet</h3><p>After your conversations with Mass, add the new words she teaches you here.</p></div>';
    }

    html += '</div>';
    return html;
  }

  // ─── Flashcard Actions ──────────────────────
  function buildDeck(filter) {
    let words = [];
    if (filter === 'due') {
      words = getDueWords();
    } else if (filter === 'all') {
      words = [...state.words];
    } else if (filter.startsWith('ch')) {
      const num = filter.slice(2);
      const ch = state.chapters[num];
      if (ch && ch.words) {
        const ids = ch.words.filter(w => w.isNew).map(w => w.id);
        words = state.words.filter(w => ids.includes(w.id));
      }
    } else if (filter.startsWith('mango')) {
      const set = parseInt(filter.slice(5));
      words = state.words.filter(w => w.mango_set === set);
    }
    return shuffle(words);
  }

  function setFlashFilter(filter) {
    state.flashcardFilter = filter;
    state.flashcardDeck = buildDeck(filter);
    state.flashcardIndex = 0;
    state.flashcardFlipped = false;
    render();
  }

  function flipCard() {
    state.flashcardFlipped = !state.flashcardFlipped;
    render();
  }

  function rateCard(quality) {
    const word = state.flashcardDeck[state.flashcardIndex];
    if (word) reviewSRS(word.id, quality);
    state.flashcardIndex++;
    state.flashcardFlipped = false;
    render();
  }

  function prevCard() {
    if (state.flashcardIndex > 0) {
      state.flashcardIndex--;
      state.flashcardFlipped = false;
      render();
    }
  }

  function skipCard() {
    state.flashcardIndex++;
    state.flashcardFlipped = false;
    render();
  }

  function resetFlashcards() {
    state.flashcardDeck = buildDeck(state.flashcardFilter);
    state.flashcardIndex = 0;
    state.flashcardFlipped = false;
    render();
  }

  function startMangoReview(set) {
    state.flashcardFilter = `mango${set}`;
    state.flashcardDeck = buildDeck(`mango${set}`);
    state.flashcardIndex = 0;
    state.flashcardFlipped = false;
    location.hash = 'flashcards';
  }

  // ─── Word Log Actions ──────────────────────
  function addWord() {
    const persian = $('#wl_persian')?.value.trim();
    const english = $('#wl_english')?.value.trim();
    const pron = $('#wl_pron')?.value.trim();
    const written = $('#wl_written')?.value.trim();
    const note = $('#wl_note')?.value.trim();

    if (!persian || !english) {
      toast('Persian and English are required');
      return;
    }

    const maxId = Math.max(0, ...state.words.map(w => w.id), ...state.wordLog.map(w => w.id));
    const word = {
      id: maxId + 1,
      mango_set: 0,
      theme: '',
      english,
      persian_written: written || persian,
      pronunciation: pron,
      persian_spoken: persian,
      spoken_pronunciation: pron,
      note,
      source: 'mass',
      added: Date.now(),
    };

    state.wordLog.push(word);
    state.words.push(word);
    save('wordLog', state.wordLog);
    toast('Word added!');
    render();
  }

  function deleteWord(id) {
    state.wordLog = state.wordLog.filter(w => w.id !== id);
    state.words = state.words.filter(w => w.id !== id || w.source !== 'mass');
    save('wordLog', state.wordLog);
    toast('Word removed');
    render();
  }

  // ─── Exercise Actions ──────────────────────
  function checkExercise(id, answer) {
    const input = $(`#input_${id}`);
    const result = $(`#result_${id}`);
    if (!input || !result) return;

    const val = input.value.trim();
    const normalizedAnswer = answer.replace(/‌/g, '').trim();
    const normalizedVal = val.replace(/‌/g, '').trim();

    if (normalizedVal === normalizedAnswer) {
      input.classList.add('correct');
      input.classList.remove('incorrect');
      result.innerHTML = '<span style="color:var(--success)">Correct!</span>';
    } else {
      input.classList.add('incorrect');
      input.classList.remove('correct');
      result.innerHTML = `<span style="color:var(--error)">Not quite.</span> Answer: <span class="persian-inline" style="font-weight:700">${esc(answer)}</span>`;
    }
    result.style.display = 'block';
    result.classList.add('show');
  }

  function revealExercise(id, answer) {
    const result = $(`#result_${id}`);
    if (!result) return;
    result.innerHTML = `Answer: <span class="persian-inline" style="font-weight:700">${esc(answer)}</span>`;
    result.style.display = 'block';
    result.classList.add('show');
  }

  function checkDictation(i, answer) { checkExercise(`dictation_${i}`, answer); }
  function revealDictation(i, answer) {
    const result = $(`#dictation_result_${i}`);
    if (result) {
      result.innerHTML = `<span class="persian-inline" style="font-weight:700;font-size:1.2rem">${esc(answer)}</span>`;
      result.style.display = 'block';
    }
  }

  function checkTyping(i, answer) {
    const input = $(`#typing_${i}`);
    const result = $(`#typing_result_${i}`);
    if (!input || !result) return;
    const val = input.value.trim().replace(/‌/g, '');
    const norm = answer.replace(/‌/g, '');
    if (val === norm) {
      result.innerHTML = '<span style="color:var(--success)">Correct!</span>';
    } else {
      result.innerHTML = `Not quite. <span class="persian-inline" style="font-weight:700">${esc(answer)}</span>`;
    }
    result.style.display = 'block';
  }

  function revealTyping(i, answer) {
    const result = $(`#typing_result_${i}`);
    if (result) {
      result.innerHTML = `<span class="persian-inline" style="font-weight:700;font-size:1.2rem">${esc(answer)}</span>`;
      result.style.display = 'block';
    }
  }

  function answerQuestion(id, selected, correct) {
    const block = $(`#q_${id}`);
    if (!block) return;
    const options = block.querySelectorAll('.question-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      opt.onclick = null;
      if (i === correct) opt.classList.add('correct');
      if (i === selected && i !== correct) opt.classList.add('incorrect');
    });
  }

  function setSection(section) {
    state.currentSection = section;
    const num = state.currentChapter;
    history.replaceState(null, '', `#chapter/${num}/${section}`);
    render();
  }

  // ─── Timer ──────────────────────────────────
  let timerInterval = null;

  function startTimer(id, seconds) {
    if (timerInterval) clearInterval(timerInterval);
    let remaining = seconds;
    const el = $(`#timer_${id}`);
    if (!el) return;
    el.classList.add('active');
    el.textContent = remaining + 's';

    timerInterval = setInterval(() => {
      remaining--;
      el.textContent = remaining + 's';
      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        el.classList.remove('active');
        el.textContent = "Time's up!";
      }
    }, 1000);
  }

  // ─── Bind Events ───────────────────────────
  function bindEvents() {
    // Audio buttons bubble through onclick attributes
    // Flashcard click bubbles through onclick attributes
    // Stop audio button propagation on flashcard
    $$('.audio-btn').forEach(btn => {
      btn.addEventListener('click', e => e.stopPropagation());
    });
  }

  // ─── Data Loading ───────────────────────────
  async function loadWords() {
    try {
      const res = await fetch('data/words.json?v=' + Date.now());
      state.words = await res.json();
    } catch (e) {
      console.warn('Could not load words.json:', e);
      state.words = [];
    }

    // Merge in word log
    state.wordLog = load('wordLog', []);
    for (const w of state.wordLog) {
      if (!state.words.find(existing => existing.id === w.id)) {
        state.words.push(w);
      }
    }
  }

  async function loadChapters() {
    // Try to load chapters 1 through 20
    for (let i = 1; i <= 20; i++) {
      try {
        const res = await fetch(`data/chapter-${i}.json?v=${Date.now()}`);
        if (res.ok) {
          state.chapters[i] = await res.json();
        } else {
          break;
        }
      } catch (e) {
        break;
      }
    }
  }

  // ─── Init ───────────────────────────────────
  async function init() {
    initSRS();
    await loadWords();
    await loadChapters();

    state.flashcardDeck = buildDeck('due');

    // Public API for onclick handlers
    window.app = {
      playAudio: playAudio,
      flipCard,
      rateCard,
      prevCard,
      skipCard,
      resetFlashcards,
      setFlashFilter,
      startMangoReview,
      setSection,
      addWord,
      deleteWord,
      checkExercise,
      revealExercise,
      checkDictation,
      revealDictation,
      checkTyping,
      revealTyping,
      answerQuestion,
      startTimer,
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  init();
})();
