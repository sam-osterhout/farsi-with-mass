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
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  };

  // ─── State ──────────────────────────────────
  const state = {
    words: [],
    chapters: {},
    srs: {},
    wordLog: [],
    progress: {},
    currentView: 'dashboard',
    currentChapter: null,
    currentDay: null,
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

  // ─── Progress Tracking ─────────────────────
  function initProgress() {
    state.progress = load('progress', {});
  }

  function markStepDone(chNum, dayNum, stepIdx) {
    const key = chNum + '_' + dayNum + '_' + stepIdx;
    state.progress[key] = true;
    save('progress', state.progress);
  }

  function isStepDone(chNum, dayNum, stepIdx) {
    return !!state.progress[chNum + '_' + dayNum + '_' + stepIdx];
  }

  function getDayProgress(chNum, dayNum) {
    const ch = state.chapters[chNum];
    if (!ch || !ch.days) return { done: 0, total: 0 };
    const day = ch.days.find(function(d) { return d.number === dayNum; });
    if (!day) return { done: 0, total: 0 };
    var total = day.steps.length;
    var done = 0;
    for (var i = 0; i < total; i++) {
      if (isStepDone(chNum, dayNum, i)) done++;
    }
    return { done: done, total: total };
  }

  function getChapterProgress(chNum) {
    const ch = state.chapters[chNum];
    if (!ch || !ch.days) return { done: 0, total: 0 };
    var totalDone = 0, totalSteps = 0;
    for (var d = 0; d < ch.days.length; d++) {
      var p = getDayProgress(chNum, ch.days[d].number);
      totalDone += p.done;
      totalSteps += p.total;
    }
    return { done: totalDone, total: totalSteps };
  }

  // ─── SRS Engine (SM-2 inspired) ─────────────
  function initSRS() {
    state.srs = load('srs', {});
  }

  function getSRSCard(wordId) {
    if (!state.srs[wordId]) {
      state.srs[wordId] = { ease: 2.5, interval: 0, repetitions: 0, due: Date.now(), lastReview: null };
    }
    return state.srs[wordId];
  }

  function reviewSRS(wordId, quality) {
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

  function getDueWords() { return state.words.filter(function(w) { return isDue(w.id); }); }
  function getLearnedCount() { return Object.values(state.srs).filter(function(c) { return c.repetitions >= 2; }).length; }

  // ─── Audio ──────────────────────────────────
  let currentAudio = null;

  function playAudio(path) {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    if (!path) return;
    currentAudio = new Audio(path);
    currentAudio.play().catch(function() {});
  }

  function audioButton(path, size) {
    if (!path) return '';
    const cls = size === 'lg' ? 'audio-btn audio-btn-lg' : size === 'sm' ? 'audio-btn audio-btn-sm' : 'audio-btn';
    return '<button class="' + cls + '" onclick="window.app.playAudio(\'' + esc(path) + '\')" title="Play audio">' + ICONS.play + '</button>';
  }

  // ─── Utilities ──────────────────────────────
  function esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
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
      if (parts[2] === 'day' && parts[3]) {
        state.currentDay = parseInt(parts[3]);
        navigate('day');
      } else {
        state.currentDay = null;
        navigate('chapter');
      }
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
    setTimeout(function() { el.classList.remove('show'); }, 2200);
  }

  // ─── Word Display ──────────────────────────
  function wordDisplay(word, opts) {
    opts = opts || {};
    const spoken = word.persian_spoken || word.persian_written;
    const written = word.persian_written;
    const pron = word.spoken_pronunciation || word.pronunciation;
    const showWritten = spoken !== written;
    const audioPath = word.audio || '';

    var html = '<div class="word-card">';
    html += '<div class="word-persian">' + esc(spoken) + '</div>';
    if (showWritten) {
      html += '<div class="word-written"><span class="written-label">written</span> ' + esc(written) + '</div>';
    }
    html += '<div class="word-pronunciation">' + esc(pron) + '</div>';
    html += '<div class="word-english">' + esc(word.english) + '</div>';
    if (audioPath) {
      html += '<div style="margin-top:var(--space-sm)">' + audioButton(audioPath) + '</div>';
    }
    if (opts.example) {
      html += '<div class="word-example">' + opts.example + '</div>';
    }
    html += '</div>';
    return html;
  }

  // ─── Render ─────────────────────────────────
  function render() {
    const app = $('#app');
    var html = '';
    switch (state.currentView) {
      case 'dashboard': html = renderDashboard(); break;
      case 'chapter': html = renderChapter(); break;
      case 'day': html = renderDay(); break;
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
      { id: 'chapter', icon: ICONS.book, label: 'Learn', hash: state.currentChapter ? 'chapter/' + state.currentChapter : 'chapter/1' },
      { id: 'flashcards', icon: ICONS.cards, label: 'Review' },
      { id: 'wordlog', icon: ICONS.edit, label: 'Words' },
    ];
    var html = '<nav class="nav">';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var active = (state.currentView === it.id || (it.id === 'chapter' && state.currentView === 'day')) ? ' active' : '';
      var hash = it.hash || it.id;
      html += '<a href="#' + hash + '" class="nav-item' + active + '">' + it.icon + '<span>' + it.label + '</span></a>';
    }
    html += '</nav>';
    return html;
  }

  // ─── Dashboard ──────────────────────────────
  function renderDashboard() {
    const total = state.words.length;
    const due = getDueWords().length;
    const learned = getLearnedCount();
    const chapterKeys = Object.keys(state.chapters).sort(function(a, b) { return a - b; });

    var html = '<div class="main">';
    html += '<div class="dashboard-header"><h1>Farsi with Mass</h1><div class="subtitle">فارسی با مسعومه</div></div>';

    html += '<div class="stats-row">';
    html += '<div class="stat-card"><span class="stat-number">' + total + '</span><span class="stat-label">Words</span></div>';
    html += '<div class="stat-card"><span class="stat-number">' + learned + '</span><span class="stat-label">Learned</span></div>';
    html += '<div class="stat-card"><span class="stat-number">' + due + '</span><span class="stat-label">Due</span></div>';
    html += '</div>';

    if (due > 0) {
      html += '<a href="#flashcards" class="btn btn-coral btn-block">Review ' + due + ' due card' + (due !== 1 ? 's' : '') + '</a>';
    }

    html += '<h2 style="margin-bottom:var(--space-md)">Chapters</h2>';

    for (var k = 0; k < chapterKeys.length; k++) {
      var num = chapterKeys[k];
      var ch = state.chapters[num];
      var newWords = ch.words ? ch.words.filter(function(w) { return w.isNew; }).length : 0;
      var prog = getChapterProgress(num);
      var pct = prog.total > 0 ? Math.round(prog.done / prog.total * 100) : 0;
      var dayCount = ch.days ? ch.days.length : 0;

      html += '<a href="#chapter/' + num + '" class="chapter-card" style="text-decoration:none;color:inherit">';
      html += '<div class="chapter-number">Chapter ' + num + '</div>';
      html += '<h2>' + esc(ch.title) + '</h2>';
      html += '<div class="chapter-theme">' + esc(ch.description || ch.theme) + '</div>';
      html += '<div class="chapter-card-meta"><span>' + newWords + ' new words</span><span>' + dayCount + ' days</span></div>';
      if (prog.total > 0) {
        html += '<div class="progress-bar-container"><div class="progress-bar" style="width:' + pct + '%"></div></div>';
        html += '<div class="text-xs text-muted" style="margin-top:4px">' + pct + '% complete</div>';
      }
      html += '</a>';
    }

    // Mango review
    html += '<h2 style="margin:var(--space-lg) 0 var(--space-md)">Mango Review</h2>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-sm)">';
    const sets = [];
    var seen = {};
    for (var w = 0; w < state.words.length; w++) {
      if (state.words[w].mango_set && !seen[state.words[w].mango_set]) {
        sets.push(state.words[w].mango_set);
        seen[state.words[w].mango_set] = true;
      }
    }
    sets.sort(function(a, b) { return a - b; });
    for (var s = 0; s < sets.length; s++) {
      var count = state.words.filter(function(w) { return w.mango_set === sets[s]; }).length;
      html += '<button class="btn btn-secondary btn-sm" onclick="window.app.startMangoReview(' + sets[s] + ')">Set ' + sets[s] + ' <span class="text-muted text-xs">(' + count + ')</span></button>';
    }
    html += '</div></div>';
    return html;
  }

  // ─── Chapter Overview ──────────────────────
  function renderChapter() {
    var num = state.currentChapter;
    var ch = state.chapters[num];
    if (!ch) {
      return '<div class="main"><div class="empty-state"><h3>Chapter not found</h3><a href="#dashboard" class="btn btn-primary" style="margin-top:var(--space-md)">Back to Home</a></div></div>';
    }

    var html = '<div class="main">';
    html += '<a href="#dashboard" class="text-sm text-muted back-link" style="text-decoration:none">' + ICONS.chevLeft + ' Back</a>';

    html += '<div class="chapter-overview-header">';
    html += '<div class="chapter-number">Chapter ' + num + '</div>';
    html += '<h1>' + esc(ch.title) + '</h1>';
    html += '<div class="chapter-theme">' + esc(ch.description || ch.theme) + '</div>';
    html += '</div>';

    // Objectives
    if (ch.objectives) {
      html += '<div class="objectives-box">';
      html += '<h3>By the end of this week, you can:</h3><ul>';
      for (var i = 0; i < ch.objectives.length; i++) {
        html += '<li>' + esc(ch.objectives[i]) + '</li>';
      }
      html += '</ul></div>';
    }

    // Days
    html += '<div class="day-list">';
    if (ch.days) {
      for (var d = 0; d < ch.days.length; d++) {
        var day = ch.days[d];
        var prog = getDayProgress(num, day.number);
        var isDone = prog.done === prog.total && prog.total > 0;
        var isStarted = prog.done > 0 && !isDone;
        var statusIcon = isDone ? '<span class="day-status done">' + ICONS.check + '</span>' : isStarted ? '<span class="day-status started">▶</span>' : '<span class="day-status pending">' + day.number + '</span>';

        html += '<a href="#chapter/' + num + '/day/' + day.number + '" class="day-card' + (isDone ? ' completed' : '') + '" style="text-decoration:none;color:inherit">';
        html += statusIcon;
        html += '<div class="day-card-content">';
        html += '<div class="day-card-title">' + esc(day.title) + '</div>';
        html += '<div class="day-card-subtitle">' + esc(day.subtitle) + '</div>';
        html += '<div class="text-xs text-muted">' + esc(day.objective) + '</div>';
        if (day.newWordIds && day.newWordIds.length > 0) {
          html += '<div class="text-xs text-muted" style="margin-top:4px">' + day.newWordIds.length + ' new words</div>';
        }
        html += '</div>';
        if (prog.total > 0) {
          html += '<div class="day-progress"><div class="day-progress-text">' + prog.done + '/' + prog.total + '</div></div>';
        }
        html += '</a>';
      }
    }
    html += '</div>';

    // Weekend cards
    if (ch.weekendCards) {
      html += '<h2 style="margin:var(--space-xl) 0 var(--space-md)">Weekend Conversations</h2>';
      html += renderConvCards(ch.weekendCards);
    }

    // Flashcard link
    html += '<div style="margin-top:var(--space-xl);text-align:center">';
    html += '<a href="#flashcards" class="btn btn-turquoise">Practice Chapter ' + num + ' Flashcards</a>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ─── Day View ──────────────────────────────
  function renderDay() {
    var num = state.currentChapter;
    var dayNum = state.currentDay;
    var ch = state.chapters[num];
    if (!ch || !ch.days) {
      return '<div class="main"><div class="empty-state"><h3>Day not found</h3></div></div>';
    }

    var day = ch.days.find(function(d) { return d.number === dayNum; });
    if (!day) {
      return '<div class="main"><div class="empty-state"><h3>Day not found</h3></div></div>';
    }

    var html = '<div class="main">';
    html += '<a href="#chapter/' + num + '" class="text-sm text-muted back-link" style="text-decoration:none">' + ICONS.chevLeft + ' Chapter ' + num + '</a>';

    html += '<div class="day-header">';
    html += '<div class="day-label">Day ' + dayNum + '</div>';
    html += '<h1>' + esc(day.title) + '</h1>';
    html += '<div class="day-subtitle">' + esc(day.subtitle) + '</div>';
    html += '<div class="day-objective">' + esc(day.objective) + '</div>';
    html += '</div>';

    // Render each step
    for (var i = 0; i < day.steps.length; i++) {
      var step = day.steps[i];
      var done = isStepDone(num, dayNum, i);
      html += '<div class="step-block' + (done ? ' step-done' : '') + '" id="step_' + i + '">';
      html += '<div class="step-header">';
      html += '<span class="step-number">' + (done ? ICONS.check : (i + 1)) + '</span>';
      html += '<h2 class="step-title">' + esc(step.title) + '</h2>';
      html += '</div>';

      html += renderStep(step, num, dayNum, i);
      html += '</div>';
    }

    // Day navigation
    var prevDay = dayNum > 1 ? dayNum - 1 : null;
    var nextDay = ch.days.find(function(d) { return d.number === dayNum + 1; }) ? dayNum + 1 : null;

    html += '<div class="day-nav">';
    if (prevDay) {
      html += '<a href="#chapter/' + num + '/day/' + prevDay + '" class="btn btn-secondary">' + ICONS.chevLeft + ' Day ' + prevDay + '</a>';
    } else {
      html += '<div></div>';
    }
    if (nextDay) {
      html += '<a href="#chapter/' + num + '/day/' + nextDay + '" class="btn btn-primary">Day ' + nextDay + ' ' + ICONS.chevRight + '</a>';
    } else {
      html += '<a href="#chapter/' + num + '" class="btn btn-primary">Back to Chapter</a>';
    }
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ─── Step Renderer ─────────────────────────
  function renderStep(step, chNum, dayNum, stepIdx) {
    var html = '';
    switch (step.type) {
      case 'listen': html = renderListenStep(step); break;
      case 'words': html = renderWordsStep(step, chNum, dayNum); break;
      case 'pattern': html = renderPatternStep(step); break;
      case 'grammar': html = renderGrammarStep(step); break;
      case 'writing': html = renderWritingStep(step); break;
      case 'drill': html = renderDrillStep(step, stepIdx); break;
      case 'speak': html = renderSpeakStep(step, stepIdx); break;
      case 'talkWithMass': html = renderTalkStep(step); break;
      case 'check': html = renderCheckStep(step, chNum, dayNum, stepIdx); break;
      case 'read': html = renderReadStep(step); break;
      case 'typing': html = renderTypingStep(step); break;
      case 'story': html = renderStoryStep(step); break;
      case 'culture': html = renderCultureStep(step); break;
      case 'teachTheGirls': html = renderTeachStep(step); break;
    }
    return html;
  }

  function renderListenStep(step) {
    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }
    if (step.audio) {
      html += '<div style="text-align:center;margin:var(--space-md) 0">' + audioButton(step.audio, 'lg') + '<div class="text-sm text-muted" style="margin-top:var(--space-xs)">Listen to the full scene</div></div>';
    }

    if (step.lines) {
      html += '<div class="dialogue-block">';
      for (var i = 0; i < step.lines.length; i++) {
        var line = step.lines[i];
        var speakerClass = line.speaker ? line.speaker.toLowerCase() : '';
        html += '<div class="dialogue-line ' + speakerClass + '">';
        if (line.speaker) {
          html += '<div class="speaker-label ' + speakerClass + '">' + esc(line.speaker) + '</div>';
        }
        html += '<div class="dialogue-text">';
        html += '<div class="dialogue-persian">' + esc(line.persian) + '</div>';
        html += '<div class="pronunciation">' + esc(line.pronunciation) + '</div>';
        if (step.hideEnglish) {
          html += '<div class="dialogue-hidden" onclick="this.classList.toggle(\'revealed\')">' + esc(line.english) + '</div>';
        } else {
          html += '<div class="dialogue-hidden" onclick="this.classList.toggle(\'revealed\')">' + esc(line.english) + '</div>';
        }
        html += '</div>';
        if (line.audio) html += audioButton(line.audio, 'sm');
        html += '</div>';
      }
      html += '</div>';
    }
    return html;
  }

  function renderWordsStep(step, chNum, dayNum) {
    var ch = state.chapters[chNum];
    if (!ch) return '';
    var day = ch.days.find(function(d) { return d.number === dayNum; });
    if (!day) return '';

    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }

    // New words for this day
    var newIds = day.newWordIds || [];
    var newWords = [];
    for (var i = 0; i < newIds.length; i++) {
      var w = ch.words.find(function(x) { return x.id === newIds[i]; });
      if (w) newWords.push(w);
    }

    if (newWords.length > 0) {
      html += '<div class="word-grid">';
      for (var n = 0; n < newWords.length; n++) {
        var word = newWords[n];
        var ex = word.example ? '<span class="persian-inline">' + esc(word.example.persian) + '</span><br><span class="pronunciation">' + esc(word.example.pronunciation) + '</span><br>' + esc(word.example.english) : '';
        html += wordDisplay(word, { example: ex });
      }
      html += '</div>';
    }

    // Review words
    var revIds = day.reviewWordIds || [];
    if (revIds.length > 0) {
      var revWords = [];
      for (var r = 0; r < revIds.length; r++) {
        var rw = ch.words.find(function(x) { return x.id === revIds[r]; });
        if (rw) revWords.push(rw);
      }
      if (revWords.length > 0) {
        html += '<h3 style="margin:var(--space-lg) 0 var(--space-sm)">Review Words</h3>';
        html += '<p class="text-muted text-sm" style="margin-bottom:var(--space-md)">Words you already know, showing up here.</p>';
        html += '<div class="word-grid">';
        for (var rv = 0; rv < revWords.length; rv++) {
          html += wordDisplay(revWords[rv]);
        }
        html += '</div>';
      }
    }

    return html;
  }

  function renderPatternStep(step) {
    var html = '';
    if (step.content) {
      html += '<div class="grammar-explanation">' + step.content + '</div>';
    }
    if (step.examples) {
      html += '<h3 style="margin:var(--space-lg) 0 var(--space-md)">Examples</h3>';
      for (var i = 0; i < step.examples.length; i++) {
        var ex = step.examples[i];
        html += '<div class="example-block">';
        html += '<div class="example-text">';
        html += '<div class="example-persian">' + esc(ex.persian) + '</div>';
        html += '<div class="example-pronunciation">' + esc(ex.pronunciation) + '</div>';
        html += '<div class="example-english">' + esc(ex.english) + '</div>';
        html += '</div>';
        if (ex.audio) html += audioButton(ex.audio);
        html += '</div>';
      }
    }
    if (step.note) {
      html += '<div class="pattern-note">' + esc(step.note) + '</div>';
    }
    return html;
  }

  function renderGrammarStep(step) {
    var html = '';
    if (step.explanation) {
      html += '<div class="grammar-explanation">' + step.explanation + '</div>';
    }
    if (step.tables) {
      for (var t = 0; t < step.tables.length; t++) {
        var tbl = step.tables[t];
        html += '<div class="conj-table">';
        html += '<div class="conj-header">';
        html += '<span class="conj-verb">' + esc(tbl.verb) + '</span>';
        if (tbl.verbPronunciation) html += ' <span class="conj-verb-pron">(' + esc(tbl.verbPronunciation) + ')</span>';
        html += ' — ' + esc(tbl.meaning);
        if (tbl.stem && tbl.stem !== '—') html += ' <span class="conj-stem">stem: ' + esc(tbl.stem) + '</span>';
        html += '</div>';
        html += '<table class="conj-grid"><tbody>';
        for (var r = 0; r < tbl.rows.length; r++) {
          var row = tbl.rows[r];
          html += '<tr>';
          html += '<td class="conj-label">' + esc(row.label) + '</td>';
          html += '<td class="conj-persian">' + esc(row.example || row.persian) + '</td>';
          html += '<td class="conj-pron">' + esc(row.pronunciation) + '</td>';
          html += '<td class="conj-eng">' + esc(row.english) + '</td>';
          html += '</tr>';
        }
        html += '</tbody></table></div>';
      }
    }
    if (step.note) {
      html += '<div class="pattern-note">' + esc(step.note) + '</div>';
    }
    return html;
  }

  function renderWritingStep(step) {
    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }
    if (step.letters) {
      html += '<div class="letter-grid">';
      for (var i = 0; i < step.letters.length; i++) {
        var lt = step.letters[i];
        html += '<div class="letter-card">';
        html += '<div class="letter-big">' + esc(lt.letter) + '</div>';
        html += '<div class="letter-name">' + esc(lt.name) + '</div>';
        html += '<div class="letter-sound">' + esc(lt.sound) + '</div>';
        if (lt.forms) {
          html += '<div class="letter-forms">';
          html += '<span class="form-label">Forms:</span> ';
          var fkeys = ['initial', 'medial', 'final', 'isolated'];
          var flabels = ['Initial', 'Medial', 'Final', 'Isolated'];
          for (var f = 0; f < fkeys.length; f++) {
            if (lt.forms[fkeys[f]]) {
              html += '<span class="letter-form"><span class="form-pos">' + flabels[f] + '</span> ' + esc(lt.forms[fkeys[f]]) + '</span>';
            }
          }
          html += '</div>';
        }
        if (lt.examples) {
          html += '<div class="letter-examples">';
          for (var e = 0; e < lt.examples.length; e++) {
            var ex = lt.examples[e];
            html += '<span class="letter-ex-word">' + esc(ex.word) + '</span> <span class="letter-ex-meaning">(' + esc(ex.meaning) + ')</span> ';
          }
          html += '</div>';
        }
        if (lt.tip) {
          html += '<div class="letter-tip">' + esc(lt.tip) + '</div>';
        }
        html += '</div>';
      }
      html += '</div>';
    }
    if (step.practice) {
      html += '<h3 style="margin:var(--space-lg) 0 var(--space-md)">Practice</h3>';
      for (var p = 0; p < step.practice.length; p++) {
        var pr = step.practice[p];
        if (pr.options) {
          html += '<div class="writing-quiz">';
          html += '<p class="quiz-prompt">' + esc(pr.prompt) + '</p>';
          html += '<div class="quiz-options">';
          for (var o = 0; o < pr.options.length; o++) {
            html += '<button class="quiz-option" onclick="window.app.checkWritingQuiz(this,' + pr.correct + ',' + o + ')">' + esc(pr.options[o]) + '</button>';
          }
          html += '</div></div>';
        } else {
          html += '<div class="writing-practice-prompt">';
          html += '<p>' + esc(pr.prompt) + '</p>';
          if (pr.answer) {
            html += '<div class="writing-answer-reveal" style="display:none"><span class="persian-text">' + esc(pr.answer) + '</span></div>';
            html += '<button class="btn btn--outline" onclick="this.previousElementSibling.style.display=\'block\';this.style.display=\'none\'">Show Answer</button>';
          }
          html += '</div>';
        }
      }
    }
    return html;
  }

  function renderDrillStep(step, stepIdx) {
    var html = '';
    if (!step.exercises) return html;
    for (var i = 0; i < step.exercises.length; i++) {
      var ex = step.exercises[i];
      html += renderExercise(ex, 'drill_' + stepIdx + '_' + i);
    }
    return html;
  }

  function renderSpeakStep(step, stepIdx) {
    var html = '';
    html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    if (step.audio) {
      html += '<div style="margin:var(--space-md) 0">' + audioButton(step.audio, 'lg') + '</div>';
    }
    if (step.timeLimit) {
      html += '<div class="timer" id="timer_speak_' + stepIdx + '">' + step.timeLimit + 's</div>';
      html += '<button class="btn btn-coral btn-sm" onclick="window.app.startTimer(\'speak_' + stepIdx + '\', ' + step.timeLimit + ')">Start Timer</button>';
    }
    if (step.hints) {
      html += '<div class="hint-list">';
      for (var h = 0; h < step.hints.length; h++) {
        html += '<span class="hint-chip">' + esc(step.hints[h]) + '</span>';
      }
      html += '</div>';
    }
    if (step.model) {
      html += '<div id="model_speak_' + stepIdx + '" style="display:none" class="model-answer">';
      html += '<div class="text-sm text-muted" style="margin-bottom:var(--space-xs)">Model answer</div>';
      html += '<div class="example-persian">' + esc(step.model.persian || '') + '</div>';
      html += '<div class="pronunciation">' + esc(step.model.pronunciation || '') + '</div>';
      html += '<div>' + esc(step.model.english || '') + '</div>';
      html += '</div>';
      html += '<div style="margin-top:var(--space-md)"><button class="btn btn-sm btn-ghost" onclick="document.getElementById(\'model_speak_' + stepIdx + '\').style.display=\'block\'">' + ICONS.eye + ' Show model answer</button></div>';
    }
    return html;
  }

  function renderTalkStep(step) {
    var html = '<div class="conv-card">';
    html += '<h3>' + esc(step.topic) + '</h3>';
    if (step.openers) {
      html += '<div style="margin-bottom:var(--space-sm)"><div class="text-xs text-muted" style="margin-bottom:var(--space-xs)">Start with:</div>';
      for (var o = 0; o < step.openers.length; o++) {
        html += '<div class="conv-opener">' + esc(step.openers[o].persian);
        html += '<div class="pronunciation text-sm">' + esc(step.openers[o].pronunciation) + '</div>';
        html += '<div class="text-sm">' + esc(step.openers[o].english) + '</div></div>';
      }
      html += '</div>';
    }
    if (step.practiceWords) {
      html += '<div class="text-xs text-muted" style="margin-bottom:var(--space-xs)">Try to use:</div>';
      html += '<div class="conv-practice">';
      for (var p = 0; p < step.practiceWords.length; p++) {
        html += '<span class="conv-practice-word">' + esc(step.practiceWords[p]) + '</span>';
      }
      html += '</div>';
    }
    if (step.massNote) {
      html += '<div class="conv-mass-note"><div class="conv-mass-label">Note for Mass</div>' + esc(step.massNote) + '</div>';
    }
    html += '</div>';
    html += '<div style="margin-top:var(--space-md);text-align:center"><a href="#wordlog" class="btn btn-sm btn-ghost">' + ICONS.plus + ' Log words Mass taught you</a></div>';
    return html;
  }

  function renderCheckStep(step, chNum, dayNum, stepIdx) {
    var html = '';
    if (step.description) {
      html += '<p class="step-instruction">' + esc(step.description) + '</p>';
    }
    if (step.questions) {
      for (var i = 0; i < step.questions.length; i++) {
        html += renderQuestion(step.questions[i], 'check_' + stepIdx + '_' + i, chNum, dayNum, stepIdx);
      }
    }
    return html;
  }

  function renderReadStep(step) {
    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }
    if (step.text) {
      html += '<div class="reading-text">' + esc(step.text.persian) + '</div>';
      html += '<div style="margin-bottom:var(--space-lg)">';
      html += '<button class="btn btn-sm btn-ghost" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display===\'none\'?\'block\':\'none\'">' + ICONS.eye + ' Show translation</button>';
      html += '<div style="display:none;margin-top:var(--space-sm);padding:var(--space-md);background:var(--white);border-radius:var(--radius-sm)">';
      html += '<div class="pronunciation">' + esc(step.text.pronunciation || '') + '</div>';
      html += '<div>' + esc(step.text.english || '') + '</div></div></div>';
    }
    return html;
  }

  function renderTypingStep(step) {
    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }
    if (step.exercises) {
      for (var i = 0; i < step.exercises.length; i++) {
        var t = step.exercises[i];
        html += '<div class="exercise-block">';
        html += '<div class="exercise-prompt">' + esc(t.english) + '</div>';
        html += '<input class="dictation-input" id="typing_' + i + '" placeholder="Type in Persian..." dir="rtl">';
        html += '<div style="margin-top:var(--space-sm)">';
        html += '<button class="btn btn-sm btn-turquoise" onclick="window.app.checkTyping(' + i + ', \'' + esc(t.answer) + '\')">Check</button>';
        html += '<button class="btn btn-sm btn-ghost" onclick="window.app.revealTyping(' + i + ', \'' + esc(t.answer) + '\')">Show</button>';
        html += '</div>';
        html += '<div id="typing_result_' + i + '" class="exercise-answer" style="display:none"></div>';
        html += '</div>';
      }
    }
    return html;
  }

  function renderStoryStep(step) {
    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }
    if (step.audio) {
      html += '<div class="story-header"><div class="story-listen-btn">' + audioButton(step.audio, 'lg') + '</div></div>';
    }
    if (step.lines) {
      for (var i = 0; i < step.lines.length; i++) {
        var line = step.lines[i];
        var isDialogue = !!line.speaker;
        html += '<div class="story-line' + (isDialogue ? ' dialogue' : '') + '">';
        if (isDialogue) html += '<div class="story-speaker">' + esc(line.speaker) + '</div>';
        html += '<div class="story-text">';
        html += '<div class="story-persian">' + esc(line.persian) + '</div>';
        html += '<div class="pronunciation">' + esc(line.pronunciation) + '</div>';
        html += '<div class="dialogue-hidden" onclick="this.classList.toggle(\'revealed\')">' + esc(line.english) + '</div>';
        html += '</div>';
        if (line.audio) html += audioButton(line.audio, 'sm');
        html += '</div>';
      }
    }
    if (step.questions) {
      html += '<h3 style="margin:var(--space-xl) 0 var(--space-md)">Check Your Understanding</h3>';
      for (var q = 0; q < step.questions.length; q++) {
        html += renderQuestion(step.questions[q], 'story_q_' + q);
      }
    }
    return html;
  }

  function renderCultureStep(step) {
    var html = '<div class="culture-block">';
    if (step.content) html += step.content;
    html += '</div>';
    return html;
  }

  function renderTeachStep(step) {
    var html = '';
    if (step.instruction) {
      html += '<p class="step-instruction">' + esc(step.instruction) + '</p>';
    }
    html += '<div class="teach-grid">';
    if (step.activities) {
      for (var i = 0; i < step.activities.length; i++) {
        var a = step.activities[i];
        html += '<div class="teach-card">';
        html += '<div class="teach-word">' + esc(a.persian) + '</div>';
        html += '<div class="teach-pron">' + esc(a.pronunciation) + ' — ' + esc(a.english) + '</div>';
        html += '<div class="teach-game">' + esc(a.game) + '</div>';
        html += '</div>';
      }
    }
    html += '</div>';
    return html;
  }

  // ─── Conversation Cards ────────────────────
  function renderConvCards(cards) {
    var html = '<div class="conv-cards">';
    for (var c = 0; c < cards.length; c++) {
      var card = cards[c];
      html += '<div class="conv-card">';
      html += '<div class="conv-card-day">' + esc(card.day) + '</div>';
      html += '<h3>' + esc(card.topic) + '</h3>';
      if (card.openers) {
        html += '<div style="margin-bottom:var(--space-sm)"><div class="text-xs text-muted" style="margin-bottom:var(--space-xs)">Start with:</div>';
        for (var o = 0; o < card.openers.length; o++) {
          html += '<div class="conv-opener">' + esc(card.openers[o].persian);
          html += '<div class="pronunciation text-sm">' + esc(card.openers[o].pronunciation) + '</div>';
          html += '<div class="text-sm">' + esc(card.openers[o].english) + '</div></div>';
        }
        html += '</div>';
      }
      if (card.practiceWords) {
        html += '<div class="text-xs text-muted" style="margin-bottom:var(--space-xs)">Try to use:</div><div class="conv-practice">';
        for (var p = 0; p < card.practiceWords.length; p++) {
          html += '<span class="conv-practice-word">' + esc(card.practiceWords[p]) + '</span>';
        }
        html += '</div>';
      }
      if (card.massNote) {
        html += '<div class="conv-mass-note"><div class="conv-mass-label">Note for Mass</div>' + esc(card.massNote) + '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  // ─── Exercise Renderer ──────────────────────
  function renderExercise(ex, id) {
    var html = '<div class="exercise-block" id="ex_' + id + '">';

    if (ex.type === 'dictation') {
      html += '<div class="exercise-prompt">' + esc(ex.instruction || 'Listen and type what you hear.') + '</div>';
      if (ex.audio) html += '<div style="margin:var(--space-sm) 0">' + audioButton(ex.audio, 'lg') + '</div>';
      html += '<input class="dictation-input" id="input_' + id + '" placeholder="Type what you hear..." dir="rtl">';
      html += '<div style="margin-top:var(--space-sm)">';
      html += '<button class="btn btn-sm btn-turquoise" onclick="window.app.checkExercise(\'' + id + '\', \'' + esc(ex.answer) + '\')">Check</button>';
      html += '<button class="btn btn-sm btn-ghost" onclick="window.app.revealExercise(\'' + id + '\', \'' + esc(ex.answer) + '\')">Show</button>';
      html += '</div>';
      html += '<div id="result_' + id + '" class="exercise-answer" style="display:none"></div>';
    } else if (ex.type === 'fill-blank' || ex.type === 'translate') {
      html += '<div class="exercise-prompt">' + (ex.prompt || '') + '</div>';
      html += '<input class="exercise-input" id="input_' + id + '" dir="' + (ex.rtl ? 'rtl' : 'ltr') + '"' + (ex.rtl ? ' style="font-family:var(--font-persian);font-size:1.2rem"' : '') + ' placeholder="' + esc(ex.placeholder || 'Your answer...') + '">';
      html += '<div style="margin-top:var(--space-sm)">';
      html += '<button class="btn btn-sm btn-turquoise" onclick="window.app.checkExercise(\'' + id + '\', \'' + esc(ex.answer) + '\')">Check</button>';
      html += '<button class="btn btn-sm btn-ghost" onclick="window.app.revealExercise(\'' + id + '\', \'' + esc(ex.answer) + '\')">Show</button>';
      html += '</div>';
      html += '<div id="result_' + id + '" class="exercise-answer" style="display:none"></div>';
    } else if (ex.type === 'multiple-choice') {
      html += '<div class="exercise-prompt">' + (ex.prompt || '') + '</div>';
      html += renderQuestion({ question: '', options: ex.options, correct: ex.correct }, id);
    }

    html += '</div>';
    return html;
  }

  // ─── Question Renderer ──────────────────────
  function renderQuestion(q, id, chNum, dayNum, stepIdx) {
    var html = '<div class="question-block" id="q_' + id + '">';
    if (q.question) html += '<div class="question-text">' + esc(q.question) + '</div>';
    html += '<div class="question-options">';
    for (var i = 0; i < (q.options || []).length; i++) {
      var extra = '';
      if (chNum !== undefined) {
        extra = ', ' + chNum + ', ' + dayNum + ', ' + stepIdx;
      }
      html += '<button class="question-option" onclick="window.app.answerQuestion(\'' + id + '\', ' + i + ', ' + q.correct + extra + ')">' + esc(q.options[i]) + '</button>';
    }
    html += '</div></div>';
    return html;
  }

  // ─── Flashcards View ────────────────────────
  function renderFlashcards() {
    var html = '<div class="main">';
    html += '<div class="flash-header"><h1>Review</h1></div>';

    var filters = [
      { id: 'due', label: 'Due (' + getDueWords().length + ')' },
      { id: 'all', label: 'All (' + state.words.length + ')' },
    ];
    for (var num in state.chapters) {
      var ch = state.chapters[num];
      var chWords = (ch.words || []).filter(function(w) { return w.isNew; });
      filters.push({ id: 'ch' + num, label: 'Ch ' + num + ' (' + chWords.length + ')' });
    }
    var mangoSets = [];
    var seenSets = {};
    for (var w = 0; w < state.words.length; w++) {
      if (state.words[w].mango_set && !seenSets[state.words[w].mango_set]) {
        mangoSets.push(state.words[w].mango_set);
        seenSets[state.words[w].mango_set] = true;
      }
    }
    mangoSets.sort(function(a, b) { return a - b; });
    for (var s = 0; s < mangoSets.length; s++) {
      filters.push({ id: 'mango' + mangoSets[s], label: 'Mango ' + mangoSets[s] });
    }

    html += '<div class="flash-filters">';
    for (var f = 0; f < filters.length; f++) {
      var active = state.flashcardFilter === filters[f].id ? ' active' : '';
      html += '<button class="filter-btn' + active + '" onclick="window.app.setFlashFilter(\'' + filters[f].id + '\')">' + filters[f].label + '</button>';
    }
    html += '</div>';

    var deck = state.flashcardDeck;
    if (deck.length === 0) {
      html += '<div class="flash-done"><h2>All caught up!</h2><p>No cards to review right now.</p></div></div>';
      return html;
    }

    var idx = state.flashcardIndex;
    var word = deck[idx];
    if (!word) {
      html += '<div class="flash-done"><h2>Session complete!</h2><p>Nice work.</p><button class="btn btn-primary" onclick="window.app.resetFlashcards()">Start Over</button></div></div>';
      return html;
    }

    html += '<div class="flash-counter">' + (idx + 1) + ' / ' + deck.length + '</div>';

    var spoken = word.persian_spoken || word.persian_written;
    var written = word.persian_written;
    var pron = word.spoken_pronunciation || word.pronunciation;
    var showWritten = spoken !== written;
    var audioPath = word.audio || '';

    html += '<div class="flashcard-scene"><div class="flashcard' + (state.flashcardFlipped ? ' flipped' : '') + '" onclick="window.app.flipCard()">';
    html += '<div class="flashcard-face flashcard-front">';
    html += '<div class="word-persian">' + esc(spoken) + '</div>';
    if (showWritten) html += '<div class="word-written"><span class="written-label">written</span> ' + esc(written) + '</div>';
    if (audioPath) html += '<div style="margin-top:var(--space-sm)">' + audioButton(audioPath) + '</div>';
    html += '<div class="flash-hint" style="margin-top:var(--space-md)">Tap to reveal</div></div>';
    html += '<div class="flashcard-face flashcard-back">';
    html += '<div class="word-english">' + esc(word.english) + '</div>';
    html += '<div class="word-pronunciation">' + esc(pron) + '</div>';
    html += '<div class="word-persian" style="font-size:1.5rem;margin-top:var(--space-sm)">' + esc(spoken) + '</div>';
    if (word.note) html += '<div class="text-sm text-muted" style="margin-top:var(--space-sm)">' + esc(word.note) + '</div>';
    html += '</div></div></div>';

    if (state.flashcardFlipped) {
      html += '<div class="rating-buttons">';
      html += '<button class="rating-btn forgot" onclick="window.app.rateCard(0)">Forgot</button>';
      html += '<button class="rating-btn hard" onclick="window.app.rateCard(1)">Hard</button>';
      html += '<button class="rating-btn good" onclick="window.app.rateCard(2)">Good</button>';
      html += '<button class="rating-btn easy" onclick="window.app.rateCard(3)">Easy</button>';
      html += '</div>';
    }

    html += '<div class="flash-nav">';
    html += '<button class="flash-nav-btn" onclick="window.app.prevCard()"' + (idx === 0 ? ' disabled' : '') + '>' + ICONS.chevLeft + '</button>';
    html += '<button class="flash-nav-btn" onclick="window.app.skipCard()">' + ICONS.chevRight + '</button>';
    html += '</div></div>';
    return html;
  }

  // ─── Word Log View ──────────────────────────
  function renderWordLog() {
    var html = '<div class="main">';
    html += '<div class="wordlog-form">';
    html += '<h2>Log a Word from Mass</h2>';
    html += '<p class="text-muted text-sm" style="margin-bottom:var(--space-md)">Add words Mass teaches you in conversation.</p>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label>Persian (spoken)</label><input id="wl_persian" dir="rtl" placeholder="فارسی"></div>';
    html += '<div class="form-group"><label>English</label><input id="wl_english" placeholder="English meaning"></div>';
    html += '</div><div class="form-row">';
    html += '<div class="form-group"><label>Pronunciation</label><input id="wl_pron" placeholder="e.g. dorost"></div>';
    html += '<div class="form-group"><label>Written form (if different)</label><input id="wl_written" dir="rtl" placeholder="Optional"></div>';
    html += '</div>';
    html += '<div class="form-group"><label>Note</label><input id="wl_note" placeholder="Context, example, or how Mass used it"></div>';
    html += '<button class="btn btn-coral" onclick="window.app.addWord()">' + ICONS.plus + ' Add Word</button>';
    html += '</div>';

    var log = state.wordLog.slice().reverse();
    if (log.length > 0) {
      html += '<h2 style="margin-bottom:var(--space-md)">Words from Mass (' + log.length + ')</h2>';
      html += '<div class="wordlog-list">';
      for (var i = 0; i < log.length; i++) {
        var w = log[i];
        html += '<div class="wordlog-item">';
        html += '<div class="wordlog-item-persian">' + esc(w.persian_spoken) + '</div>';
        html += '<div class="wordlog-item-details">';
        html += '<div class="wordlog-item-english">' + esc(w.english) + '</div>';
        html += '<div class="wordlog-item-pronunciation">' + esc(w.spoken_pronunciation) + '</div>';
        if (w.note) html += '<div class="text-xs text-muted">' + esc(w.note) + '</div>';
        html += '</div>';
        html += '<div class="wordlog-item-date">' + new Date(w.added).toLocaleDateString() + '</div>';
        html += '<div class="wordlog-item-actions"><button class="wordlog-delete" onclick="window.app.deleteWord(' + w.id + ')" title="Remove">' + ICONS.trash + '</button></div>';
        html += '</div>';
      }
      html += '</div>';
    } else {
      html += '<div class="empty-state"><h3>No words logged yet</h3><p>After conversations with Mass, add the words she teaches you here.</p></div>';
    }
    html += '</div>';
    return html;
  }

  // ─── Flashcard Actions ──────────────────────
  function buildDeck(filter) {
    var words = [];
    if (filter === 'due') { words = getDueWords(); }
    else if (filter === 'all') { words = state.words.slice(); }
    else if (filter.indexOf('ch') === 0) {
      var num = filter.slice(2);
      var ch = state.chapters[num];
      if (ch && ch.words) {
        var ids = ch.words.filter(function(w) { return w.isNew; }).map(function(w) { return w.id; });
        words = state.words.filter(function(w) { return ids.indexOf(w.id) >= 0; });
      }
    } else if (filter.indexOf('mango') === 0) {
      var set = parseInt(filter.slice(5));
      words = state.words.filter(function(w) { return w.mango_set === set; });
    }
    return shuffle(words);
  }

  function setFlashFilter(f) { state.flashcardFilter = f; state.flashcardDeck = buildDeck(f); state.flashcardIndex = 0; state.flashcardFlipped = false; render(); }
  function flipCard() { state.flashcardFlipped = !state.flashcardFlipped; render(); }
  function rateCard(q) { var w = state.flashcardDeck[state.flashcardIndex]; if (w) reviewSRS(w.id, q); state.flashcardIndex++; state.flashcardFlipped = false; render(); }
  function prevCard() { if (state.flashcardIndex > 0) { state.flashcardIndex--; state.flashcardFlipped = false; render(); } }
  function skipCard() { state.flashcardIndex++; state.flashcardFlipped = false; render(); }
  function resetFlashcards() { state.flashcardDeck = buildDeck(state.flashcardFilter); state.flashcardIndex = 0; state.flashcardFlipped = false; render(); }
  function startMangoReview(set) { state.flashcardFilter = 'mango' + set; state.flashcardDeck = buildDeck('mango' + set); state.flashcardIndex = 0; state.flashcardFlipped = false; location.hash = 'flashcards'; }

  // ─── Word Log Actions ──────────────────────
  function addWord() {
    var persian = ($('#wl_persian') || {}).value; persian = persian ? persian.trim() : '';
    var english = ($('#wl_english') || {}).value; english = english ? english.trim() : '';
    var pron = ($('#wl_pron') || {}).value; pron = pron ? pron.trim() : '';
    var written = ($('#wl_written') || {}).value; written = written ? written.trim() : '';
    var note = ($('#wl_note') || {}).value; note = note ? note.trim() : '';
    if (!persian || !english) { toast('Persian and English are required'); return; }

    var maxId = 0;
    for (var i = 0; i < state.words.length; i++) { if (state.words[i].id > maxId) maxId = state.words[i].id; }
    for (var j = 0; j < state.wordLog.length; j++) { if (state.wordLog[j].id > maxId) maxId = state.wordLog[j].id; }

    var word = { id: maxId + 1, mango_set: 0, theme: '', english: english, persian_written: written || persian, pronunciation: pron, persian_spoken: persian, spoken_pronunciation: pron, note: note, source: 'mass', added: Date.now() };
    state.wordLog.push(word);
    state.words.push(word);
    save('wordLog', state.wordLog);
    toast('Word added!');
    render();
  }

  function deleteWord(id) {
    state.wordLog = state.wordLog.filter(function(w) { return w.id !== id; });
    state.words = state.words.filter(function(w) { return w.id !== id || w.source !== 'mass'; });
    save('wordLog', state.wordLog);
    toast('Word removed');
    render();
  }

  // ─── Exercise Actions ──────────────────────
  function checkExercise(id, answer) {
    var input = $('#input_' + id);
    var result = $('#result_' + id);
    if (!input || !result) return;
    var val = input.value.trim().replace(/‌/g, '');
    var norm = answer.replace(/‌/g, '');
    if (val === norm) {
      input.classList.add('correct'); input.classList.remove('incorrect');
      result.innerHTML = '<span style="color:var(--success)">Correct!</span>';
    } else {
      input.classList.add('incorrect'); input.classList.remove('correct');
      result.innerHTML = '<span style="color:var(--error)">Not quite.</span> Answer: <span class="persian-inline" style="font-weight:700">' + esc(answer) + '</span>';
    }
    result.style.display = 'block';
  }

  function revealExercise(id, answer) {
    var result = $('#result_' + id);
    if (!result) return;
    result.innerHTML = 'Answer: <span class="persian-inline" style="font-weight:700">' + esc(answer) + '</span>';
    result.style.display = 'block';
  }

  function checkTyping(i, answer) {
    var input = $('#typing_' + i);
    var result = $('#typing_result_' + i);
    if (!input || !result) return;
    var val = input.value.trim().replace(/‌/g, '');
    var norm = answer.replace(/‌/g, '');
    if (val === norm) {
      result.innerHTML = '<span style="color:var(--success)">Correct!</span>';
    } else {
      result.innerHTML = 'Not quite. <span class="persian-inline" style="font-weight:700">' + esc(answer) + '</span>';
    }
    result.style.display = 'block';
  }

  function revealTyping(i, answer) {
    var result = $('#typing_result_' + i);
    if (result) {
      result.innerHTML = '<span class="persian-inline" style="font-weight:700;font-size:1.2rem">' + esc(answer) + '</span>';
      result.style.display = 'block';
    }
  }

  function answerQuestion(id, selected, correct, chNum, dayNum, stepIdx) {
    var block = $('#q_' + id);
    if (!block) return;
    var options = block.querySelectorAll('.question-option');
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = true;
      options[i].onclick = null;
      if (i === correct) options[i].classList.add('correct');
      if (i === selected && i !== correct) options[i].classList.add('incorrect');
    }
    if (selected === correct && chNum !== undefined) {
      markStepDone(chNum, dayNum, stepIdx);
      var stepEl = $('#step_' + stepIdx);
      if (stepEl) stepEl.classList.add('step-done');
    }
  }

  // ─── Timer ──────────────────────────────────
  var timerInterval = null;
  function startTimer(id, seconds) {
    if (timerInterval) clearInterval(timerInterval);
    var remaining = seconds;
    var el = $('#timer_' + id);
    if (!el) return;
    el.classList.add('active');
    el.textContent = remaining + 's';
    timerInterval = setInterval(function() {
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

  function checkWritingQuiz(btn, correctIdx, chosenIdx) {
    var siblings = btn.parentElement.querySelectorAll('.quiz-option');
    for (var i = 0; i < siblings.length; i++) {
      siblings[i].disabled = true;
      if (i === correctIdx) siblings[i].classList.add('correct');
    }
    if (chosenIdx !== correctIdx) btn.classList.add('incorrect');
  }

  // ─── Bind Events ───────────────────────────
  function bindEvents() {
    $$('.audio-btn').forEach(function(btn) { btn.addEventListener('click', function(e) { e.stopPropagation(); }); });
  }

  // ─── Data Loading ───────────────────────────
  async function loadWords() {
    try {
      var res = await fetch('data/words.json?v=' + Date.now());
      state.words = await res.json();
    } catch (e) { state.words = []; }
    state.wordLog = load('wordLog', []);
    for (var i = 0; i < state.wordLog.length; i++) {
      var found = false;
      for (var j = 0; j < state.words.length; j++) {
        if (state.words[j].id === state.wordLog[i].id) { found = true; break; }
      }
      if (!found) state.words.push(state.wordLog[i]);
    }
  }

  async function loadChapters() {
    for (var i = 1; i <= 20; i++) {
      try {
        var res = await fetch('data/chapter-' + i + '.json?v=' + Date.now());
        if (res.ok) { state.chapters[i] = await res.json(); } else { break; }
      } catch (e) { break; }
    }
  }

  // ─── Init ───────────────────────────────────
  async function init() {
    initSRS();
    initProgress();
    await loadWords();
    await loadChapters();
    state.flashcardDeck = buildDeck('due');

    window.app = {
      playAudio: playAudio,
      flipCard: flipCard,
      rateCard: rateCard,
      prevCard: prevCard,
      skipCard: skipCard,
      resetFlashcards: resetFlashcards,
      setFlashFilter: setFlashFilter,
      startMangoReview: startMangoReview,
      addWord: addWord,
      deleteWord: deleteWord,
      checkExercise: checkExercise,
      revealExercise: revealExercise,
      checkTyping: checkTyping,
      revealTyping: revealTyping,
      answerQuestion: answerQuestion,
      startTimer: startTimer,
      checkWritingQuiz: checkWritingQuiz,
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  init();
})();
