/* ── RESEARCH ENGINE ── */
const ResearchEngine = {

  getCost(techId) {
    const def = TECHNOLOGIES[techId];
    if (!def) return null;
    const level = GS.techs[techId] || 0;
    if (level >= def.maxLevel) return null;
    return { knowledge: def.costPerLevel[level] };
  },

  isUnlocked(techId) {
    const def = TECHNOLOGIES[techId];
    if (!def) return false;
    if (!def.prereq) return true;
    return (GS.techs[def.prereq] || 0) >= 1;
  },

  isMaxed(techId) {
    const def = TECHNOLOGIES[techId];
    if (!def) return true;
    return (GS.techs[techId] || 0) >= def.maxLevel;
  },

  research(techId) {
    if (!this.isUnlocked(techId)) {
      Notifications.show('🔒 Locked', 'Research prerequisites not met.', 'error');
      return false;
    }
    if (this.isMaxed(techId)) {
      Notifications.show('✅ Maxed', 'This technology is already at maximum level.', 'info');
      return false;
    }
    const cost = this.getCost(techId);
    if (!cost || !Production.canAfford(cost)) {
      Notifications.show('💸 Not Enough Knowledge', `Need ${FMT.num(cost?.knowledge || 0)} KP`, 'error');
      return false;
    }
    Production.deductCost(cost);
    GS.techs[techId] = (GS.techs[techId] || 0) + 1;
    GS.stats.totalTechsUnlocked++;
    const def = TECHNOLOGIES[techId];
    // Apply effect
    if (def.effect_fn) {
      try { def.effect_fn(GS); } catch(e) { console.warn('Tech effect error:', techId, e); }
    }
    Production.recalculate();
    const level = GS.techs[techId];
    const maxLevel = def.maxLevel;
    Notifications.show(`🔬 Researched: ${def.name}`, `Level ${level}/${maxLevel} — ${def.effect}`, 'gold');
    NewsEngine.add('research', `Discovery: ${def.name} (Lv ${level})`, def.effect);
    AchievementEngine.check();
    PolicyEngine.checkUnlocks();
    return true;
  },

  // Reset all tech effects (for prestige)
  resetEffects() {
    GS.multipliers = {
      all:1, labor:1, food:1, wood:1, stone:1, coal:1,
      energy:1, goods:1, capital:1, knowledge:1, influence:1,
      laborEfficiency:1, investmentReturns:1,
      clickPower:1, happiness:1,
    };
    GS.clickPower = 1;
  },

  // Re-apply all owned tech effects
  reapplyAll() {
    this.resetEffects();
    for (const [techId, level] of Object.entries(GS.techs)) {
      const def = TECHNOLOGIES[techId];
      if (!def || !def.effect_fn) continue;
      for (let i = 0; i < level; i++) {
        try { def.effect_fn(GS); } catch(e) {}
      }
    }
  },
};
