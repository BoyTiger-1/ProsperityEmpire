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

  getSellValue(bldId, qty = 1) {
    const def = BUILDINGS[bldId];
    if (!def) return {};
    const owned = GS.buildings[bldId] || 0;
    if (owned <= 0) return {};
    qty = Math.min(qty, owned);
    const scale = def.scaling || CFG.COST_SCALE;
    const value = {};
    for (const [res, base] of Object.entries(def.baseCost)) {
      let total = 0;
      for (let i = 0; i < qty; i++) {
        total += base * Math.pow(scale, owned - 1 - i);
      }
      value[res] = Math.floor(total * 0.5);
    }
    return value;
  },

  sell(bldId, qty = 1) {
    const owned = GS.buildings[bldId] || 0;
    if (owned <= 0) {
      Notifications.show('❌ Nothing to sell', 'You have no buildings of this type.', 'error');
      return false;
    }
    qty = Math.min(qty, owned);
    const refund = this.getSellValue(bldId, qty);
    for (const [res, amt] of Object.entries(refund)) {
      if (GS.resources[res]) GS.resources[res].amount += amt;
    }
    GS.buildings[bldId] -= qty;
    GS.stats.totalBuildings = Math.max(0, GS.stats.totalBuildings - qty);
    Production.recalculate();
    PopulationEngine.recalculate();
    const def = BUILDINGS[bldId];
    const refundStr = Object.entries(refund).map(([r, v]) =>
      `${RESOURCE_META[r]?.emoji || ''} ${FMT.num(v)} ${RESOURCE_META[r]?.name || r}`
    ).join(', ');
    Notifications.show(`🔨 Sold ${qty > 1 ? qty + '× ' : ''}${def.name}`, `Refunded: ${refundStr}`, 'info');
    AchievementEngine.check();
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
