/* ── PRESTIGE ENGINE ── */
const PRESTIGE_UPGRADES = [
  {
    id:'startCapital', name:'Golden Inheritance', emoji:'💰',
    desc:'Start each run with 500 extra Capital.',
    maxLevel:5, baseCost:100,
    apply: (gs, level) => { gs.resources.capital.amount += 500 * level; },
  },
  {
    id:'prodBonus', name:'Economic Legacy', emoji:'📈',
    desc:'+5% all production per level — permanent across all runs.',
    maxLevel:20, baseCost:50,
    apply: (gs, level) => { gs.prestige.permanentMultiplier = 1 + level * 0.05; },
  },
  {
    id:'clickBoost', name:'Industrious Lineage', emoji:'💪',
    desc:'+10 Labor per click per level.',
    maxLevel:10, baseCost:75,
    apply: (gs, level) => { gs.clickPower += 10 * level; },
  },
  {
    id:'questBonus', name:'Scholar\'s Heritage', emoji:'🎓',
    desc:'+50% rewards from correct financial questions per level.',
    maxLevel:5, baseCost:200,
    apply: () => {},
  },
  {
    id:'offlineBonus', name:'Passive Empire', emoji:'💤',
    desc:'+25% offline earnings per level.',
    maxLevel:4, baseCost:150,
    apply: () => {},
  },
  {
    id:'marketEdge', name:'Market Wisdom', emoji:'📊',
    desc:'+20% investment returns per level.',
    maxLevel:5, baseCost:250,
    apply: (gs, level) => { gs.multipliers.investmentReturns += level * 0.20; },
  },
  {
    id:'startKP', name:'Scholar\'s Foundation', emoji:'🔬',
    desc:'Start each run with 100 Knowledge Points per level.',
    maxLevel:5, baseCost:100,
    apply: (gs, level) => { gs.resources.knowledge.amount += 100 * level; },
  },
  {
    id:'influenceBonus', name:'Imperial Prestige', emoji:'✨',
    desc:'+10% Influence gain per level.',
    maxLevel:10, baseCost:300,
    apply: (gs, level) => { gs.multipliers.influence += level * 0.10; },
  },
];

const PrestigeEngine = {

  canPrestige() {
    return GS.resources.influence.amount >= CFG.PRESTIGE_REQ_INF;
  },

  getInfluenceGain() {
    const cap = GS.resources.capital.amount;
    const bld = Object.values(GS.buildings).reduce((a,v)=>a+v,0);
    return Math.floor(Math.log10(Math.max(1, cap)) * 5 + bld * 0.5);
  },

  getUpgradeCost(upgradeId) {
    const upg = PRESTIGE_UPGRADES.find(u => u.id === upgradeId);
    if (!upg) return Infinity;
    const level = GS.prestige.upgrades[upgradeId] || 0;
    if (level >= upg.maxLevel) return Infinity;
    return Math.floor(upg.baseCost * Math.pow(1.5, level));
  },

  buyUpgrade(upgradeId) {
    const upg = PRESTIGE_UPGRADES.find(u => u.id === upgradeId);
    if (!upg) return false;
    const level = GS.prestige.upgrades[upgradeId] || 0;
    if (level >= upg.maxLevel) {
      Notifications.show('✅ Maxed', 'Already at maximum level.', 'info');
      return false;
    }
    const cost = this.getUpgradeCost(upgradeId);
    if (GS.prestige.influence < cost) {
      Notifications.show('✨ Not Enough Influence', `Need ${FMT.num(cost)} Influence.`, 'error');
      return false;
    }
    GS.prestige.influence -= cost;
    GS.prestige.upgrades[upgradeId] = level + 1;
    Notifications.show(`✨ ${upg.name} Lv.${level+1}`, upg.desc, 'gold');
    return true;
  },

  prestige() {
    if (!this.canPrestige()) {
      Notifications.show('✨ Not Ready', `Need ${FMT.num(CFG.PRESTIGE_REQ_INF)} Influence to Prestige.`, 'error');
      return;
    }

    const infGain = this.getInfluenceGain();
    GS.prestige.count++;
    GS.prestige.influence += infGain + GS.resources.influence.amount;

    // Reset empire state
    GS.buildings = {};
    GS.techs = {};
    GS.portfolio = { stocks:{}, bonds:{}, commodities:{} };
    GS.activeEvents = [];
    GS.eventMods = {};

    // Reset resources
    for (const res of Object.values(GS.resources)) {
      res.amount = 0;
      res.perSec = 0;
    }
    GS.resources.capital.amount = 100;

    // Reapply prestige upgrades
    ResearchEngine.resetEffects();
    for (const [upgId, level] of Object.entries(GS.prestige.upgrades)) {
      const upg = PRESTIGE_UPGRADES.find(u => u.id === upgId);
      if (upg?.apply) { try { upg.apply(GS, level); } catch(e) {} }
    }

    GS.phase = 'early';
    GS.learning.phase = 'early';
    Production.recalculate();

    Notifications.show(`✨ Prestige #${GS.prestige.count}`, `Gained ${FMT.num(infGain)} Influence. Empire reborn!`, 'gold');
    Tabs.switchTo('empire');
    if (window.PrestigeUI) PrestigeUI.render();
  },
};
