/* ── SAVE / LOAD ENGINE ── localStorage persistence */
const SaveEngine = {
  KEY: 'prosperityEmpire_v1',

  save() {
    try {
      const data = {
        version: CFG.VERSION,
        savedAt: Date.now(),
        resources: {},
        buildings: GS.buildings,
        workerAlloc: GS.workerAlloc,
        techs: GS.techs,
        portfolio: GS.portfolio,
        prestige: GS.prestige,
        multipliers: GS.multipliers,
        clickPower: GS.clickPower,
        population: GS.population,
        maxPopulation: GS.maxPopulation,
        happiness: GS.happiness,
        taxRate: GS.taxRate,
        policies: GS.policies,
        learning: {
          proficiency: GS.learning.proficiency,
          concepts: GS.learning.concepts,
          totalAnswered: GS.learning.totalAnswered,
          totalCorrect: GS.learning.totalCorrect,
          streak: GS.learning.streak,
          recentQuestions: GS.learning.recentQuestions,
        },
        achievements: Array.from(GS.achievements),
        stats: GS.stats,
        session: { empireAge: GS.session.empireAge },
        phase: GS.phase,
        empireName: empireName,
        eventHistory: EventsEngine.eventHistory,
        newsLog: (GS.newsLog || []).slice(0, 60),
        tutorial: GS.tutorial,
        nations: GS.nations,
      };
      // Save resource amounts
      for (const [id, r] of Object.entries(GS.resources)) {
        data.resources[id] = r.amount;
      }
      localStorage.setItem(this.KEY, JSON.stringify(data));
      GS.session.lastSave = Date.now();
      return true;
    } catch(e) {
      console.error('Save failed:', e);
      return false;
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);

      // Restore resources
      for (const [id, amount] of Object.entries(data.resources || {})) {
        if (GS.resources[id]) GS.resources[id].amount = amount || 0;
      }
      GS.buildings    = data.buildings || {};
      GS.workerAlloc  = data.workerAlloc || {};
      GS.techs        = data.techs || {};
      GS.portfolio    = data.portfolio || { stocks:{}, bonds:{}, commodities:{} };
      GS.prestige     = data.prestige || GS.prestige;
      GS.multipliers  = Object.assign(GS.multipliers, data.multipliers || {});
      GS.clickPower   = data.clickPower || 1;
      GS.phase        = data.phase || 'early';
      GS.learning     = Object.assign(GS.learning, data.learning || {});
      GS.stats        = Object.assign(GS.stats, data.stats || {});
      GS.session.empireAge = data.session?.empireAge || 0;
      GS.achievements = new Set(data.achievements || []);
      GS.population   = (data.population != null) ? data.population : 10;
      GS.maxPopulation = data.maxPopulation || 0;
      GS.happiness    = data.happiness || 60;
      GS.taxRate      = data.taxRate || 0.15;
      GS.policies     = data.policies || {};
      GS.nations      = data.nations || {};
      GS.newsLog      = data.newsLog || [];
      GS.tutorial     = Object.assign(GS.tutorial, data.tutorial || {});
      EventsEngine.eventHistory = data.eventHistory || [];
      if (data.empireName) empireName = data.empireName;

      // Re-apply tech effects then policy effects
      ResearchEngine.reapplyAll();
      PolicyEngine.reapplyAll();
      Production.recalculate();
      PopulationEngine.recalculate();

      // Offline progression
      const offlineSeconds = Math.max(0, (Date.now() - data.savedAt) / 1000);
      if (offlineSeconds > 30) {
        const gains = Production.calcOffline(offlineSeconds);
        Production.applyOffline(gains);
        GS.stats.totalOfflineTime = (GS.stats.totalOfflineTime || 0) + offlineSeconds;
        setTimeout(() => this.showOfflineModal(offlineSeconds, gains), 1000);
      }
      return true;
    } catch(e) {
      console.error('Load failed:', e);
      return false;
    }
  },

  showOfflineModal(seconds, gains) {
    const hasGains = Object.values(gains).some(v => v > 0.01);
    if (!hasGains) return;
    let gainsHTML = '<div class="offline-gains">';
    for (const [res, amt] of Object.entries(gains)) {
      if (amt < 0.01) continue;
      gainsHTML += `<div class="offline-gain-item">
        <span class="offline-gain-icon">${RESOURCE_META[res]?.emoji || '📦'}</span>
        <span class="offline-gain-amount">+${FMT.num(amt)}</span>
        <span class="offline-gain-label">${RESOURCE_META[res]?.name || res}</span>
      </div>`;
    }
    gainsHTML += '</div>';
    Modals.show(
      `💤 Welcome Back! (${FMT.time(seconds)} away)`,
      `Your empire kept working while you were gone!${gainsHTML}`,
      [{ label:'Continue', cls:'btn-gold', action: () => {} }]
    );
  },

  reset() {
    localStorage.removeItem(this.KEY);
    location.reload();
  },
};
