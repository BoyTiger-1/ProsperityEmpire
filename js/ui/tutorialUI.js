/* ── TUTORIAL UI ── Spotlight overlay */
const TutorialUI = {
  _step: 0,
  _active: false,

  init() {
    document.getElementById('tut-next').addEventListener('click', () => this.next());
    document.getElementById('tut-skip').addEventListener('click', () => this.skip());
  },

  start() {
    if (GS.tutorial.completed) return;
    this._step = 0;
    this._active = true;
    GS.tutorial.active = true;
    document.getElementById('tutorial-overlay').classList.remove('hidden');
    this._show(this._step);
  },

  next() {
    this._step++;
    if (this._step >= TUTORIAL_STEPS.length) {
      this.complete();
    } else {
      this._show(this._step);
    }
  },

  skip() {
    this.complete();
  },

  complete() {
    this._active = false;
    GS.tutorial.active = false;
    GS.tutorial.completed = true;
    document.getElementById('tutorial-overlay').classList.add('hidden');
    this._clearSpotlight();
    NewsEngine.add('info', 'Tutorial complete — your empire begins in earnest', 'Chancellor, the future is yours to build.');
    Notifications.show('🎓 Tutorial Complete!', 'Good luck building your empire!', 'gold', 4000);
  },

  _show(idx) {
    const step = TUTORIAL_STEPS[idx];
    if (!step) return;

    document.getElementById('tut-step-indicator').textContent = `Step ${idx + 1} of ${TUTORIAL_STEPS.length}`;
    document.getElementById('tut-title').textContent = step.title;
    document.getElementById('tut-body').textContent = step.body;

    const nextBtn = document.getElementById('tut-next');
    nextBtn.textContent = idx === TUTORIAL_STEPS.length - 1 ? 'Begin ✦' : 'Next →';

    if (step.target) {
      this._spotlightElement(step.target);
      if (step.action === 'tab') {
        const tabEl = document.querySelector(step.target);
        if (tabEl) tabEl.click();
      }
    } else {
      this._clearSpotlight();
    }
  },

  _spotlightElement(selector) {
    const el = document.querySelector(selector);
    const spot = document.getElementById('tutorial-spotlight');
    if (!el || !spot) return;

    const rect = el.getBoundingClientRect();
    const pad = 6;
    spot.style.left   = (rect.left   - pad) + 'px';
    spot.style.top    = (rect.top    - pad + window.scrollY) + 'px';
    spot.style.width  = (rect.width  + pad * 2) + 'px';
    spot.style.height = (rect.height + pad * 2) + 'px';
    spot.style.display = 'block';
  },

  _clearSpotlight() {
    const spot = document.getElementById('tutorial-spotlight');
    if (spot) { spot.style.display = 'none'; }
  },
};
