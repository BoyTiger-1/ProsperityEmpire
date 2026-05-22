/* ── BUILDING ENGINE ── */
const BuildingEngine = {

  getCost(bldId, qty = 1) {
    const def = BUILDINGS[bldId];
    if (!def) return null;
    const owned = GS.buildings[bldId] || 0;
    const scale = def.scaling || CFG.COST_SCALE;
    const cost = {};
    for (const [res, base] of Object.entries(def.baseCost)) {
      // Sum geometric series: base * scale^owned * (scale^qty - 1) / (scale - 1)
      let total = 0;
      for (let i = 0; i < qty; i++) {
        total += base * Math.pow(scale, owned + i);
      }
      cost[res] = total;
    }
    return cost;
  },

  getMaxBuyable(bldId) {
    const def = BUILDINGS[bldId];
    if (!def) return 0;
    let qty = 0;
    while (true) {
      const cost = this.getCost(bldId, qty + 1);
      if (!Production.canAfford(cost)) break;
      qty++;
      if (qty >= 500) break;
    }
    return qty;
  },

  isUnlocked(bldId) {
    const def = BUILDINGS[bldId];
    if (!def || !def.unlock) return true;
    const u = def.unlock;
    if (u.research && !(GS.techs[u.research] >= 1)) return false;
    if (u.buildings) {
      for (const [bid, req] of Object.entries(u.buildings)) {
        if ((GS.buildings[bid] || 0) < req) return false;
      }
    }
    return true;
  },

  buy(bldId, qty = 1) {
    if (!this.isUnlocked(bldId)) {
      Notifications.show('🔒 Locked', 'Unlock requirements not met.', 'error');
      return false;
    }
    qty = Math.max(1, qty);
    if (GS.ui.buyMultiplier === 'max') {
      qty = Math.max(1, this.getMaxBuyable(bldId));
    } else {
      qty = GS.ui.buyMultiplier;
    }
    const cost = this.getCost(bldId, qty);
    if (!Production.canAfford(cost)) {
      Notifications.show('💸 Insufficient Resources', 'You cannot afford this.', 'error');
      return false;
    }
    Production.deductCost(cost);
    GS.buildings[bldId] = (GS.buildings[bldId] || 0) + qty;
    GS.stats.totalBuildings += qty;
    Production.recalculate();
    PopulationEngine.recalculate();
    const def = BUILDINGS[bldId];
    const owned = GS.buildings[bldId];
    Notifications.show(`🏗️ Built ${def.name}`, `You now own ${owned} × ${def.emoji}`, 'success');
    NewsEngine.add('build', `${def.emoji} ${qty > 1 ? qty + '× ' : ''}${def.name} constructed`, def.flavorText || def.desc || '');

    // Trigger educational question on first purchase
    if (owned === qty && def.concept) {
      setTimeout(() => LearningEngine.triggerQuestion(def.concept), 1500);
    }
    AchievementEngine.check();
    PolicyEngine.checkUnlocks();
    updatePhase();
    return true;
  },
};
