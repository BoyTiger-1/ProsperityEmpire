/* ── MAIN ENTRY POINT ── Bootstraps the game */
(function () {
  'use strict';

  let lastTick      = Date.now();
  let lastSave      = Date.now();
  let lastMarket    = Date.now();
  let lastEvent     = Date.now();
  let lastFullRender= Date.now();

  function init() {
    const bar    = document.getElementById('loading-bar');
    const status = document.getElementById('loading-status');

    const steps = [
      [10,  'Initializing resources...'],
      [25,  'Loading building data...'],
      [40,  'Calibrating markets...'],
      [60,  'Loading question bank...'],
      [75,  'Restoring saved game...'],
      [90,  'Starting economy...'],
      [100, 'Ready!'],
    ];

    let i = 0;
    const stepInterval = setInterval(() => {
      if (i >= steps.length) { clearInterval(stepInterval); startGame(); return; }
      const [pct, msg] = steps[i++];
      bar.style.width = pct + '%';
      status.textContent = msg;
    }, 120);
  }

  function startGame() {
    // ── Core subsystems ──
    Notifications.init();
    Modals.init();
    Tabs.init();

    MarketEngine.init();
    EventsEngine.init();

    // ── UI modules ──
    EmpireUI.init();
    BuildingsUI.init();
    ResearchUI.init();
    MarketsUI.init();
    AcademyUI.init();
    CodexUI.init();
    WorldUI.init();
    PrestigeUI.init();
    AchievementsUI.init();
    PoliciesUI.init();
    TutorialUI.init();
    NewsUI.init();

    // ── Load or fresh start ──
    const loaded = SaveEngine.load();

    // ── Header/phase display ──
    document.getElementById('hdr-phase').textContent   = PHASE_LABELS[GS.phase];
    document.getElementById('empire-name').textContent = empireName;

    // ── Wire save button ──
    document.getElementById('btn-save').addEventListener('click', () => {
      if (SaveEngine.save()) Notifications.show('💾 Saved', 'Progress recorded.', 'success', 2000);
    });

    // ── Ctrl+S shortcut ──
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (SaveEngine.save()) Notifications.show('💾 Saved', 'Ctrl+S — progress recorded.', 'success', 2000);
      }
    });

    // ── Wire reset button (hold 3s) ──
    let resetTimer = null;
    const btnReset = document.getElementById('btn-reset');
    btnReset.addEventListener('mousedown', () => {
      resetTimer = setTimeout(() => {
        Modals.show('🔄 Reset Empire', 'This will permanently delete ALL progress. Are you absolutely sure?', [
          { label:'YES, RESET EVERYTHING', cls:'btn-danger', action: () => SaveEngine.reset() },
          { label:'Cancel', cls:'btn-ghost' },
        ]);
      }, 3000);
    });
    btnReset.addEventListener('mouseup',    () => clearTimeout(resetTimer));
    btnReset.addEventListener('mouseleave', () => clearTimeout(resetTimer));

    // ── Initial calculations ──
    Production.recalculate();
    PopulationEngine.recalculate();

    // ── Initial renders ──
    EmpireUI.render();
    EmpireUI.renderHeader();
    NewsUI.render();

    // ── Hide loading, show game ──
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('game-container').classList.remove('hidden');

    // ── Tutorial (only on fresh start) ──
    if (!loaded && !GS.tutorial.completed) {
      setTimeout(() => {
        TutorialUI.start();
        Notifications.show('🏛️ Welcome to Prosperity Empire!', 'Follow the tutorial to begin, or skip and explore freely.', 'gold', 7000);
      }, 800);
    } else if (!loaded) {
      setTimeout(() => {
        Notifications.show('🏛️ Welcome to Prosperity Empire!', 'Click the city crest to generate Labour. Build Farms and Workshops to start your empire!', 'gold', 8000);
      }, 500);
    }

    // ── Stagger first question ──
    setTimeout(() => {
      LearningEngine.triggerQuestion();
      if (typeof AcademyUI !== 'undefined') AcademyUI.render();
    }, 4000);

    // ── Opening news entries ──
    if (!GS.newsLog || GS.newsLog.length === 0) {
      NewsEngine.add('info', 'Prosperity Empire founded', 'A new financial civilisation takes its first steps.');
      NewsEngine.add('info', 'Economy initialised — Labour production active', 'Click the city crest to begin generating Labour units.');
    }

    // ── Start main loop ──
    requestAnimationFrame(gameLoop);
  }

  function gameLoop(timestamp) {
    const now  = Date.now();
    const dtMs = Math.min(now - lastTick, 5000);
    const dt   = dtMs / 1000;
    lastTick   = now;

    // Session age
    GS.session.empireAge += dt;

    // Tick production
    Production.tick(dt);

    // Tick population
    PopulationEngine.tick(dt);

    // Update phase
    updatePhase();

    // Header (every tick)
    EmpireUI.renderHeader();

    // Full render every 500ms
    if (now - lastFullRender > 500) {
      lastFullRender = now;
      const tab = Tabs.current;
      if (tab === 'empire')       EmpireUI.render();
      if (tab === 'buildings')    BuildingsUI.fastUpdate();
      if (tab === 'research')     ResearchUI.fastUpdate();
      if (tab === 'world')        WorldUI.fastUpdate();
      // policies & achievements only re-render on tab switch or user action — no 500ms rebuild
    }

    // Market update
    if (now - lastMarket > CFG.MARKET_UPDATE) {
      lastMarket = now;
      MarketEngine.update();
    }

    // Events
    if (now - lastEvent > CFG.EVENT_CHECK) {
      lastEvent = now;
      EventsEngine.maybeSpawnEvent();
      EventsEngine.tick();
    }

    // Autosave
    if (now - lastSave > CFG.SAVE_INTERVAL) {
      lastSave = now;
      SaveEngine.save();
    }

    requestAnimationFrame(gameLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
