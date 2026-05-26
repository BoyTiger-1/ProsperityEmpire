/* ── PRODUCTION ENGINE ── Calculates per-second rates and applies ticks */
const Production = {

  // Get combined multiplier for a resource
  getMultiplier(resId) {
    const m = GS.multipliers;
    const em = GS.eventMods;
    let mul = m.all * (m[resId] || 1) * (em.all || 1) * (em[resId] || 1);
    mul *= GS.prestige.permanentMultiplier;
    // Happiness multiplier affects all production (labour morale)
    if (typeof PopulationEngine !== 'undefined') {
      mul *= PopulationEngine.getHappinessMultiplier();
    }
    // Cost modifier from policies (negative multiplier on costs, not directly here)
    return Math.max(0, mul);
  },

  // Calculate total per-second production for all resources
  recalculate() {
    // Reset rates
    for (const res of Object.values(GS.resources)) {
      res.perSec = 0;
    }

    // Sum all building contributions
    for (const [bldId, count] of Object.entries(GS.buildings)) {
      if (!count) continue;
      const def = BUILDINGS[bldId];
      if (!def) continue;

      // Worker efficiency multiplier
      const maxW = (BUILDING_WORKERS[bldId] || 0) * count;
      const workerEff = maxW > 0
        ? Math.min(1, (GS.workerAlloc[bldId] ?? maxW) / maxW)
        : 1;

      // Production
      if (def.produces) {
        for (const [res, rate] of Object.entries(def.produces)) {
          if (GS.resources[res]) {
            GS.resources[res].perSec += rate * count * workerEff * this.getMultiplier(res);
          }
        }
      }

      // Consumption (negative)
      if (def.consumes) {
        for (const [res, rate] of Object.entries(def.consumes)) {
          if (GS.resources[res]) {
            // Labor efficiency reduces labor consumption
            const laborMod = (res === 'labor') ? (1 / (GS.multipliers.laborEfficiency || 1)) : 1;
            GS.resources[res].perSec -= rate * count * workerEff * laborMod;
          }
        }
      }
    }

    // Capital from selling goods (market rate)
    const goodsSellingRate = Math.max(0, -GS.resources.goods.perSec) * 0;
    // (goods are consumed by trading posts which produce capital directly)
  },

  // Apply one tick of production
  tick(dt) {
    for (const [resId, res] of Object.entries(GS.resources)) {
      if (!res.perSec) continue;
      const change = res.perSec * dt;
      res.amount = Math.max(0, res.amount + change);
      if (change > 0 && resId === 'capital') {
        GS.stats.totalCapitalEarned += change;
      }
    }

  },

  // Calculate offline gains
  calcOffline(seconds) {
    seconds = Math.min(seconds, CFG.OFFLINE_CAP_HRS * 3600);
    const gains = {};
    for (const [resId, res] of Object.entries(GS.resources)) {
      if (res.perSec > 0) {
        gains[resId] = res.perSec * seconds;
      }
    }
    return gains;
  },

  // Apply offline gains
  applyOffline(gains) {
    for (const [resId, amount] of Object.entries(gains)) {
      if (GS.resources[resId]) {
        GS.resources[resId].amount += amount;
        if (resId === 'capital') GS.stats.totalCapitalEarned += amount;
      }
    }
  },

  // Returns true if player can afford given cost object
  canAfford(cost) {
    for (const [res, amount] of Object.entries(cost)) {
      if ((GS.resources[res]?.amount || 0) < amount) return false;
    }
    return true;
  },

  // Deduct cost from resources
  deductCost(cost) {
    for (const [res, amount] of Object.entries(cost)) {
      if (GS.resources[res]) GS.resources[res].amount -= amount;
    }
  },
};
