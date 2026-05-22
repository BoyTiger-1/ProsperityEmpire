/* ── ADAPTIVE LEARNING ENGINE ── */
const LearningEngine = {

  // Get next question based on phase, concept mastery, difficulty
  getNextQuestion(concept = null) {
    const phase = GS.phase;
    const recent = GS.learning.recentQuestions.slice(-10);

    // Filter by phase progression
    const phaseOrder = ['early','mid','late','advanced'];
    const phaseIdx = phaseOrder.indexOf(phase);
    const allowedPhases = phaseOrder.slice(0, phaseIdx + 2); // can see next phase too

    let pool = QUESTION_BANK.filter(q =>
      allowedPhases.includes(q.phase) &&
      !recent.includes(q.id)
    );

    // Filter by concept if specified
    if (concept) {
      const conceptPool = pool.filter(q => q.concept === concept);
      if (conceptPool.length > 0) pool = conceptPool;
    } else {
      // Weight toward unmasted concepts
      const undermastered = pool.filter(q => {
        const m = GS.learning.concepts[q.concept];
        return !m || m.mastery < 0.75;
      });
      if (undermastered.length > 0 && Math.random() < 0.7) pool = undermastered;
    }

    if (pool.length === 0) {
      pool = QUESTION_BANK.filter(q => allowedPhases.includes(q.phase));
    }

    // Adaptive difficulty
    const targetDifficulty = this.getTargetDifficulty();
    pool.sort((a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty));

    // Pick from top candidates with some randomness
    const topN = Math.min(5, pool.length);
    return pool[Math.floor(Math.random() * topN)];
  },

  getTargetDifficulty() {
    const correct = GS.learning.totalCorrect;
    const total = GS.learning.totalAnswered;
    if (total < 5) return 1;
    const accuracy = correct / total;
    if (accuracy > 0.85) return Math.min(5, 1 + Math.floor(GS.learning.proficiency / 20));
    if (accuracy < 0.40) return 1;
    return Math.max(1, Math.min(5, Math.round(2 + GS.learning.proficiency / 25)));
  },

  // Present question to UI
  triggerQuestion(concept = null) {
    const q = this.getNextQuestion(concept);
    if (!q) return;
    GS.learning.currentQuestion = q;
    if (typeof AcademyUI !== 'undefined') AcademyUI.showQuestion(q);
  },

  // Process answer
  answer(questionId, selectedOption) {
    const q = QUESTION_BANK.find(x => x.id === questionId);
    if (!q) return;
    const correct = selectedOption === q.answer;
    GS.learning.totalAnswered++;
    GS.stats.totalQuestionsAnswered++;
    if (correct) {
      GS.learning.totalCorrect++;
      GS.stats.totalQuestionsCorrect = (GS.stats.totalQuestionsCorrect||0) + 1;
      GS.learning.streak++;
      GS.learning.proficiency = Math.min(100, GS.learning.proficiency + 1);
      NewsEngine.add('quiz', `Correct: ${q.text.substring(0,60)}${q.text.length>60?'…':''}`, `Concept: ${q.concept.replace(/_/g,' ')}`);
    } else {
      GS.learning.streak = 0;
      GS.learning.proficiency = Math.max(0, GS.learning.proficiency - 0.5);
      NewsEngine.add('quiz', `Incorrect answer — review: ${q.concept.replace(/_/g,' ')}`, q.explanation ? q.explanation.substring(0,80) : '');
    }

    // Update concept mastery
    if (!GS.learning.concepts[q.concept]) {
      GS.learning.concepts[q.concept] = { mastery:0, answered:0, correct:0 };
    }
    const cm = GS.learning.concepts[q.concept];
    cm.answered++;
    if (correct) cm.correct++;
    cm.mastery = cm.correct / cm.answered;

    // Track recent
    GS.learning.recentQuestions.push(q.id);
    if (GS.learning.recentQuestions.length > 20) GS.learning.recentQuestions.shift();

    // Give reward
    if (correct && q.reward) {
      const mul = 1 + GS.learning.proficiency / 100;
      for (const [res, amt] of Object.entries(q.reward)) {
        if (GS.resources[res]) {
          const actual = Math.round(amt * mul);
          GS.resources[res].amount += actual;
          if (res === 'capital') GS.stats.totalCapitalEarned += actual;
        }
      }
      GS.learning.pendingReward = q.reward;
    }

    AchievementEngine.check();
    return { correct, q };
  },
};
