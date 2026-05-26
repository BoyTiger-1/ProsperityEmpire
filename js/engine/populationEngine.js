/* ── POPULATION ENGINE ── Population, happiness, housing */
const PopulationEngine = {
  // Housing buildings and how many citizens each provides
  HOUSING: {
    hut:           5,
    cottage:       10,
    house:         20,
    apartment:     50,
    tenement:      80,
    residentialBlock: 150,
    suburb:        300,
  },

  recalculate() {
    // Max population from housing
    let maxPop = 0;
    for (const [bldId, cap] of Object.entries(this.HOUSING)) {
      maxPop += (GS.buildings[bldId] || 0) * cap;
    }
    GS.maxPopulation = maxPop;

    // Actual population grows toward max, modulated by food supply
    const foodRate = GS.resources.food.perSec;
    const foodNeeded = GS.population * 0.002; // 0.002 food/sec per person
    const foodSurplus = foodRate - foodNeeded;

    const growthRate = foodSurplus >= 0 ? 0.01 : -0.005;
    const targetPop = foodSurplus >= 0 ? maxPop : GS.population * 0.9;
    GS.population = Math.max(0, Math.min(GS.maxPopulation, GS.population + (targetPop - GS.population) * growthRate));
    GS.population = Math.round(GS.population);
  },

  tick(dt) {
    if (GS.maxPopulation <= 0) { GS.population = 0; return; }

    const foodRate = GS.resources.food.perSec;
    const foodNeeded = GS.population * 0.002;
    const surplus = foodRate - foodNeeded;

    let growthPerSec = surplus >= 0
      ? Math.min(2, GS.maxPopulation * 0.001 + 0.1)
      : -Math.min(5, GS.population * 0.002 + 0.1);

    // Hospitals reduce death rate and boost natural growth
    const hospitals = GS.buildings.hospital || 0;
    if (hospitals > 0) {
      if (growthPerSec > 0) growthPerSec *= (1 + hospitals * 0.18);
      else growthPerSec *= Math.max(0.15, 1 - hospitals * 0.12);
    }

    // Happiness-based immigration: high happiness attracts settlers
    if (GS.happiness > 68 && GS.population < GS.maxPopulation) {
      growthPerSec += (GS.happiness - 68) * 0.006;
    }
    // Very low happiness accelerates emigration
    if (GS.happiness < 30 && GS.population > 0) {
      growthPerSec -= (30 - GS.happiness) * 0.004;
    }

    GS.popGrowthRate = growthPerSec;
    GS.population = Math.max(0, Math.min(GS.maxPopulation, GS.population + growthPerSec * dt));
    GS.population = Math.round(GS.population);

    this.updateCityMetrics();
    this.updateHappiness(dt);
    this.updatePopBar();
  },

  updateCityMetrics() {
    const b = GS.buildings;
    // Pollution: industrial buildings generate it, clean buildings reduce it
    const polSrc = { coalMine:4, factory:7, steelMill:11, powerPlant:8, oilRefinery:9, cryptoFarm:5, textileMill:3 };
    const polSink = { solarFarm:6, hospital:2, school:1, university:2 };
    let rawPol = 0;
    for (const [id, v] of Object.entries(polSrc)) rawPol += (b[id]||0) * v;
    for (const [id, v] of Object.entries(polSink)) rawPol -= (b[id]||0) * v;
    GS.pollution = Math.max(0, Math.min(100, rawPol));

    // Education: from learning/knowledge buildings
    const eduSrc = { school:5, library:8, university:20, researchInstitute:30, techPark:15, mediaEmpire:8 };
    let rawEdu = 0;
    for (const [id, v] of Object.entries(eduSrc)) rawEdu += (b[id]||0) * v;
    GS.educationLevel = Math.min(100, rawEdu);

    // Crime: from overcrowding + low happiness, reduced by education
    const popRatio = GS.maxPopulation > 0 ? GS.population / GS.maxPopulation : 0;
    const crimeOvr = Math.max(0, popRatio - 0.72) * 110;
    const crimeUnhap = Math.max(0, 45 - GS.happiness) * 0.7;
    const crimeEduRed = GS.educationLevel * 0.25;
    GS.crimeRate = Math.max(0, Math.min(100, crimeOvr + crimeUnhap - crimeEduRed));

    // Housing stress
    GS.housingStress = GS.maxPopulation > 0 ? (GS.population / GS.maxPopulation) * 100 : 0;

    // Housing crisis notifications
    if (GS.housingStress >= 100 && GS.maxPopulation > 0 && !GS._housingCrisisNotified) {
      GS._housingCrisisNotified = true;
      if (typeof Notifications !== 'undefined')
        Notifications.show('🏘️ Housing Crisis!', 'Population has reached maximum capacity. Build more housing or people will leave!', 'error', 6000);
    } else if (GS.housingStress < 95) {
      GS._housingCrisisNotified = false;
    }
    if (GS.housingStress >= 85 && GS.housingStress < 100 && !GS._housingShortageNotified) {
      GS._housingShortageNotified = true;
      if (typeof Notifications !== 'undefined')
        Notifications.show('🏠 Housing Shortage', 'Nearly full! Expand housing to keep growing.', 'warning', 5000);
    } else if (GS.housingStress < 80) {
      GS._housingShortageNotified = false;
    }
  },

  updateHappiness(dt) {
    // Target happiness based on conditions
    let target = 50;

    // Food surplus helps
    const foodRate = GS.resources.food.perSec;
    const foodNeeded = GS.population * 0.002;
    if (foodRate >= foodNeeded * 1.5) target += 15;
    else if (foodRate >= foodNeeded) target += 5;
    else if (foodRate < foodNeeded * 0.5) target -= 20;

    // High capital income helps
    if (GS.resources.capital.perSec > 100) target += 10;
    else if (GS.resources.capital.perSec > 10) target += 5;

    // Overcrowding hurts
    if (GS.maxPopulation > 0 && GS.population / GS.maxPopulation > 0.9) target -= 10;

    // High tax hurts
    if (GS.taxRate > 0.25) target -= 10;
    else if (GS.taxRate < 0.1) target += 5;

    // Healthcare from hospitals boosts happiness
    const hospitals = GS.buildings.hospital || 0;
    if (hospitals >= 3) target += 12;
    else if (hospitals >= 1) target += 5;

    // Pollution penalty
    if (GS.pollution > 75) target -= 20;
    else if (GS.pollution > 50) target -= 10;
    else if (GS.pollution > 25) target -= 5;

    // Crime penalty
    if (GS.crimeRate > 60) target -= 18;
    else if (GS.crimeRate > 35) target -= 8;
    else if (GS.crimeRate > 20) target -= 3;

    // Education bonus
    if (GS.educationLevel > 70) target += 12;
    else if (GS.educationLevel > 40) target += 6;
    else if (GS.educationLevel > 20) target += 3;

    // Housing overcrowding penalty (beyond what's in overpopulation check)
    if (GS.housingStress > 95) target -= 12;
    else if (GS.housingStress > 85) target -= 5;

    // Clamp target
    target = Math.max(10, Math.min(95, target));

    // Drift toward target
    GS.happiness += (target - GS.happiness) * 0.02 * dt;
    GS.happiness = Math.max(0, Math.min(100, GS.happiness));
  },

  updatePopBar() {
    const valEl = document.getElementById('pop-val');
    if (valEl) valEl.textContent = FMT.num(GS.population, 0) + (GS.maxPopulation ? ' / ' + FMT.num(GS.maxPopulation, 0) : '');

    const hapFill = document.getElementById('hap-fill');
    if (hapFill) hapFill.style.width = GS.happiness.toFixed(0) + '%';

    const hapVal = document.getElementById('hap-val');
    if (hapVal) hapVal.textContent = GS.happiness.toFixed(0) + '%';

    const rateEl = document.getElementById('pop-rate');
    if (rateEl && GS.popGrowthRate !== undefined) {
      const r = GS.popGrowthRate;
      rateEl.textContent = (r >= 0 ? '+' : '') + r.toFixed(1) + '/s';
      rateEl.style.color = r > 0 ? '#7ecb7e' : r < 0 ? '#cc4444' : '#aaa';
    }
  },

  // Happiness multiplier applied to production
  getHappinessMultiplier() {
    // 0.5× at 0% → 1.0× at 50% → 1.3× at 100%
    return 0.5 + (GS.happiness / 100) * 0.8;
  },
};
