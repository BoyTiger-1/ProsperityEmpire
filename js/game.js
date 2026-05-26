/* ── GAME STATE ── Single source of truth */
const GS = {
  // Core Resources
  resources: {
    labor:     { amount:0,   perSec:0, color:'#c8922a' },
    food:      { amount:0,   perSec:0, color:'#4caf7a' },
    wood:      { amount:0,   perSec:0, color:'#78716c' },
    stone:     { amount:0,   perSec:0, color:'#94a3b8' },
    coal:      { amount:0,   perSec:0, color:'#6b7280' },
    energy:    { amount:0,   perSec:0, color:'#e8b84b' },
    goods:     { amount:0,   perSec:0, color:'#a78bfa' },
    capital:   { amount:150, perSec:0, color:'#f5d878' },
    knowledge: { amount:0,   perSec:0, color:'#22d3ee' },
    influence: { amount:0,   perSec:0, color:'#c084fc' },
  },

  // Buildings owned
  buildings: {},

  // Worker allocations per building
  workerAlloc: {},   // buildingId → workers manually assigned

  // Technologies unlocked
  techs: {},

  // Global production multipliers
  multipliers: {
    all: 1,
    labor: 1, food: 1, wood: 1, stone: 1, coal: 1,
    energy: 1, goods: 1, capital: 1, knowledge: 1, influence: 1,
    laborEfficiency: 1, investmentReturns: 1,
    clickPower: 1, happiness: 1,
  },

  // Event modifiers (temporary)
  eventMods: {},

  // Prestige
  prestige: {
    count: 0,
    influence: 0,
    permanentMultiplier: 1,
    upgrades: {},
  },

  // Click power
  clickPower: 1,
  clickCombo: 0,
  lastClickTime: 0,

  // Population & happiness
  population: 10,
  maxPopulation: 0,
  happiness: 60,       // 0–100
  taxRate: 0.15,       // 15% default

  // City health metrics
  pollution: 0,        // 0–100, from industry
  educationLevel: 0,   // 0–100, from schools
  crimeRate: 0,        // 0–100, from low happiness + overcrowding
  housingStress: 0,    // 0–100, population vs max capacity
  popGrowthRate: 0,    // per-second population change

  // Active policies
  policies: {},        // { policyId: true }

  // Learning / Academy
  learning: {
    proficiency: 0,
    concepts: {},
    recentQuestions: [],
    currentQuestion: null,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    pendingReward: null,
    phase: 'early',
  },

  // Market portfolio
  portfolio: {
    stocks: {},
    bonds: {},
    commodities: {},
  },

  // Active global events
  activeEvents: [],

  // Nation relations
  nations: {},

  // Active milestones
  milestones: [],

  // Unlocked achievements
  achievements: new Set(),

  // News log — newest first
  newsLog: [],

  // Game phase
  phase: 'early',

  // Stats
  stats: {
    totalClicks: 0,
    totalCapitalEarned: 0,
    totalBuildings: 0,
    totalTechsUnlocked: 0,
    totalTrades: 0,
    profitableTrades: 0,
    totalInvestmentProfit: 0,
    totalOfflineTime: 0,
    totalQuestionsAnswered: 0,
    totalQuestionsCorrect: 0,
  },

  // Session
  session: {
    startTime: Date.now(),
    lastSave: null,
    lastActive: Date.now(),
    empireAge: 0,
    empireAgeLabel: '0 days',
  },

  // Tutorial state
  tutorial: {
    active: false,
    step: 0,
    completed: false,
  },

  // UI state
  ui: {
    buildFilter: 'all',
    buyMultiplier: 1,
    activeMarket: 'stocks',
    activeCodex: null,
    notifications: [],
  },
};

// ── Empire name ──
let empireName = 'Humble Hamlet';

// ── Phase thresholds ──
const PHASE_THRESHOLDS = {
  mid:      { capital: 1000,   buildings: 8 },
  late:     { capital: 75000,  buildings: 40 },
  advanced: { capital: 5000000, buildings: 120 },
};

const PHASE_LABELS = {
  early:    'Early Economy',
  mid:      'Industrial Age',
  late:     'Global Economy',
  advanced: 'Financial Empire',
};

const BUILDING_WORKERS = {
  farm:2, lumberMill:2, quarry:3, market:2, workshop:3,
  coalMine:4, textileMill:5, tradingPost:4, library:2,
  fishery:2, school:3, warehouse:4, factory:8, powerPlant:6,
  university:6, bank:5, steelMill:10, mint:5, harbor:8,
  insurance:4, oilRefinery:8, hospital:8, airport:10,
  stockExchange:8, globalTradeHub:12, researchInstitute:10,
  centralBank:15, techPark:12, solarFarm:3, cryptoFarm:4,
  investmentFirm:8, mediaEmpire:10, spacePort:25,
};

const CITY_EMOJIS = {
  early:    '🏘️',
  mid:      '🏭',
  late:     '🌆',
  advanced: '🏙️',
};

// ── Resource display order ──
const RESOURCE_ORDER = ['labor','food','wood','stone','coal','energy','goods','capital','knowledge','influence'];

const RESOURCE_META = {
  labor:     { name:'Labor',     emoji:'👷', desc:'Your workforce. Required for most production.' },
  food:      { name:'Food',      emoji:'🌾', desc:'Feeds your population. Required by housing.' },
  wood:      { name:'Wood',      emoji:'🪵', desc:'Basic construction material.' },
  stone:     { name:'Stone',     emoji:'🪨', desc:'Durable building material.' },
  coal:      { name:'Coal',      emoji:'⚒️', desc:'Fuel for industry and energy.' },
  energy:    { name:'Energy',    emoji:'⚡', desc:'Powers advanced buildings.' },
  goods:     { name:'Goods',     emoji:'📦', desc:'Manufactured products — sell for Capital.' },
  capital:   { name:'Capital',   emoji:'💰', desc:'Your primary currency.' },
  knowledge: { name:'Knowledge', emoji:'🔬', desc:'Research currency. Unlocks technologies.' },
  influence: { name:'Influence', emoji:'✨', desc:'Global prestige. Enables permanent upgrades.' },
};

function updatePhase() {
  const c = GS.resources.capital.amount;
  const b = Object.values(GS.buildings).reduce((a,v)=>a+v, 0);
  let newPhase = 'early';
  if      (c >= PHASE_THRESHOLDS.advanced.capital && b >= PHASE_THRESHOLDS.advanced.buildings) newPhase = 'advanced';
  else if (c >= PHASE_THRESHOLDS.late.capital     && b >= PHASE_THRESHOLDS.late.buildings)     newPhase = 'late';
  else if (c >= PHASE_THRESHOLDS.mid.capital      && b >= PHASE_THRESHOLDS.mid.buildings)      newPhase = 'mid';

  if (newPhase !== GS.phase) {
    const old = GS.phase;
    GS.phase = newPhase;
    GS.learning.phase = newPhase;
    Notifications.show('🎉 New Era!', `Your empire has entered the ${PHASE_LABELS[newPhase]}!`, 'gold', 6000);
    NewsEngine.add('info', `Empire enters the ${PHASE_LABELS[newPhase]}`, 'A new chapter in financial history begins.');
    document.getElementById('hdr-phase').textContent = PHASE_LABELS[newPhase];
    if (old === 'early' && newPhase === 'mid') empireName = 'Prosperous Town';
    if (old === 'mid'   && newPhase === 'late') empireName = 'Industrial City';
    if (old === 'late'  && newPhase === 'advanced') empireName = 'Financial Capital';
    document.getElementById('empire-name').textContent = empireName;
    if (typeof CityScene !== 'undefined') CityScene.rebuildCity();
  }
}
