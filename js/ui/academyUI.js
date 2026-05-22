/* ── ACADEMY TAB UI ── */
const AcademyUI = {
  _answered: false,
  _currentQ: null,

  init() {
    Tabs.register('academy', () => this.render());
  },

  render() {
    this.renderMastery();
    this.renderStats();
    if (!GS.learning.currentQuestion) {
      this._answered = false;
      this._currentQ = null;
      this.showPrompt();
    } else if (!this._answered) {
      if (this._currentQ !== GS.learning.currentQuestion) {
        this._currentQ = GS.learning.currentQuestion;
        this.showQuestion(GS.learning.currentQuestion);
      }
    }
    // If answered, leave existing feedback+next-btn in place — don't re-render
  },

  showPrompt() {
    const area = document.getElementById('question-area');
    if (!area) return;
    area.innerHTML = `<div class="question-container">
      <div class="academy-prompt">
        <div class="academy-prompt-icon">🎓</div>
        <h3 class="academy-prompt-title">Financial Academy</h3>
        <p class="academy-prompt-sub">Answer questions to earn bonus resources and build your Financial Proficiency.</p>
        <p class="academy-prompt-stats">Proficiency: <strong>${GS.learning.proficiency.toFixed(1)}%</strong> · Streak: <strong>${GS.learning.streak}</strong></p>
        <button class="btn btn-gold" id="btn-start-question">Ask Me a Question</button>
      </div>
    </div>`;
    document.getElementById('btn-start-question')?.addEventListener('click', () => this.startQuestion());
  },

  startQuestion() {
    this._answered = false;
    this._currentQ = null;
    GS.learning.currentQuestion = null;
    LearningEngine.triggerQuestion();
    // triggerQuestion calls showQuestion directly
  },

  showQuestion(q) {
    const area = document.getElementById('question-area');
    if (!area) return;
    this._answered = false;
    this._currentQ = q;

    const diffStars = FMT.stars(q.difficulty);
    const phaseLabels = {
      early:    '📘 Fundamentals',
      mid:      '📊 Business Finance',
      late:     '🌍 Macroeconomics',
      advanced: '🔬 Advanced Finance',
    };
    const rewardStr = q.reward
      ? Object.entries(q.reward).map(([r,a]) => `+${a} ${RESOURCE_META[r]?.emoji||''}${RESOURCE_META[r]?.name||r}`).join(' · ')
      : '';

    area.innerHTML = `<div class="question-container">
      <div class="question-meta-row">
        <span class="question-phase-badge">${phaseLabels[q.phase] || q.phase}</span>
        <span class="q-concept-badge">${q.concept.replace(/_/g,' ')}</span>
        <span class="q-difficulty">${diffStars}</span>
      </div>
      <div class="question-text">${q.text}</div>
      <div class="question-options" id="q-options-${q.id}"></div>
      ${rewardStr ? `<div class="question-reward-hint">🎁 Correct: ${rewardStr}</div>` : ''}
    </div>`;

    // Wire options with event listeners — no inline onclick, no escaping issues
    const optContainer = document.getElementById(`q-options-${q.id}`);
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `${String.fromCharCode(65+i)}. ${opt}`;
      btn.dataset.opt = opt;
      btn.addEventListener('click', () => this._selectAnswer(q, opt, btn));
      optContainer.appendChild(btn);
    });

    this.renderMastery();
  },

  _selectAnswer(q, selected, clickedBtn) {
    if (this._answered) return;
    this._answered = true;

    const result = LearningEngine.answer(q.id, selected);
    if (!result) return;
    const correct = result.correct;

    // Style all buttons
    const container = document.querySelector('.question-container');
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.opt === q.answer)              btn.classList.add('correct');
      else if (btn.dataset.opt === selected && !correct) btn.classList.add('wrong');
    });

    // Feedback
    const rewardStr = correct && q.reward
      ? Object.entries(q.reward).map(([r,a]) => `+${a} ${RESOURCE_META[r]?.emoji||''}${RESOURCE_META[r]?.name||r}`).join(' · ')
      : '';

    const fb = document.createElement('div');
    fb.className = `question-feedback ${correct?'correct':'wrong'}`;
    fb.innerHTML = `<div class="feedback-verdict">${correct ? '✅ Correct!' : '❌ Incorrect'}</div>
      <div class="feedback-explanation">${q.explanation}</div>
      ${rewardStr && correct  ? `<div class="question-reward">Earned: ${rewardStr}</div>` : ''}
      ${!correct ? `<div class="feedback-answer">Correct answer: ${q.answer}</div>` : ''}`;
    container.appendChild(fb);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'question-next-btn';
    nextBtn.textContent = '→ Next Question';
    nextBtn.addEventListener('click', () => {
      this._answered = false;
      this._currentQ = null;
      GS.learning.currentQuestion = null;
      this.startQuestion();
    });
    container.appendChild(nextBtn);

    if (correct) Notifications.show('🎓 Correct!', rewardStr || q.concept.replace(/_/g,' '), 'gold', 3000);
    this.renderMastery();
    this.renderStats();
    AchievementEngine.check();
  },

  renderMastery() {
    const el = document.getElementById('mastery-display');
    if (!el) return;
    const concepts = Object.entries(GS.learning.concepts)
      .sort((a,b) => b[1].mastery - a[1].mastery)
      .slice(0, 12);
    if (!concepts.length) {
      el.innerHTML = '<div class="mastery-empty">Answer questions to track concept mastery.</div>';
      return;
    }
    el.innerHTML = concepts.map(([concept, data]) => `
      <div class="mastery-concept">
        <span class="mastery-label">${concept.replace(/_/g,' ')}</span>
        <div class="mastery-bar"><div class="mastery-fill" style="width:${data.mastery*100}%;background:${data.mastery>=0.75?'var(--green3)':'var(--gold)'}"></div></div>
        <span class="mastery-pct">${Math.round(data.mastery*100)}%</span>
      </div>`).join('');
  },

  renderStats() {
    const el = document.getElementById('quiz-stats');
    if (!el) return;
    const total    = GS.learning.totalAnswered || 0;
    const correct  = GS.learning.totalCorrect  || 0;
    const accuracy = total ? (correct/total*100).toFixed(1) : '0.0';
    el.innerHTML = [
      ['Answered',   total],
      ['Correct',    correct],
      ['Accuracy',   accuracy + '%'],
      ['Streak',     GS.learning.streak],
      ['Proficiency',GS.learning.proficiency.toFixed(1) + '%'],
      ['Concepts',   Object.keys(GS.learning.concepts).length],
    ].map(([k,v]) => `<div class="stat-row"><span class="stat-label">${k}</span><span class="stat-val">${v}</span></div>`).join('');
  },
};
