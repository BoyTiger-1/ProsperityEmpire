/* ── ACHIEVEMENTS DATA ── */
const ACHIEVEMENTS_DATA = [
  // ── EARLY GAME ──
  { id:'firstClick',    name:'First Step',        emoji:'👆', desc:'Click to generate your first Labor unit.',                reward:{ capital:5 },    check: gs => gs.stats.totalClicks >= 1 },
  { id:'click100',      name:'Hard Worker',        emoji:'💪', desc:'Click 100 times.',                                        reward:{ capital:50 },   check: gs => gs.stats.totalClicks >= 100 },
  { id:'click1000',     name:'Tireless Grinder',   emoji:'🔥', desc:'Click 1,000 times.',                                     reward:{ capital:500 },  check: gs => gs.stats.totalClicks >= 1000 },
  { id:'click5000',     name:'Iron Fist',          emoji:'⚒️', desc:'Click 5,000 times.',                                     reward:{ capital:2000 }, check: gs => gs.stats.totalClicks >= 5000 },
  { id:'click10000',    name:'Compulsive Chancellor',emoji:'🤝',desc:'Click 10,000 times.',                                   reward:{ capital:10000 },check: gs => gs.stats.totalClicks >= 10000 },
  { id:'click50000',    name:'Legendary Laborer',  emoji:'🦾', desc:'Click 50,000 times.',                                    reward:{ influence:20 }, check: gs => gs.stats.totalClicks >= 50000 },

  // ── CAPITAL MILESTONES ──
  { id:'cap1k',         name:'First Thousand',     emoji:'💵', desc:'Accumulate 1,000 Capital.',                              reward:{ knowledge:10 }, check: gs => gs.stats.totalCapitalEarned >= 1000 },
  { id:'cap100k',       name:'Six Figures',        emoji:'💰', desc:'Accumulate 100,000 Capital.',                            reward:{ knowledge:50 }, check: gs => gs.stats.totalCapitalEarned >= 100000 },
  { id:'cap1m',         name:'Millionaire',        emoji:'🤑', desc:'Accumulate 1,000,000 Capital.',                          reward:{ influence:5 },  check: gs => gs.stats.totalCapitalEarned >= 1000000 },
  { id:'cap10m',        name:'Ten Million',        emoji:'💎', desc:'Accumulate 10,000,000 Capital.',                         reward:{ knowledge:500 },check: gs => gs.stats.totalCapitalEarned >= 10000000 },
  { id:'cap100m',       name:'Tycoon',             emoji:'🎩', desc:'Accumulate 100,000,000 Capital.',                        reward:{ influence:25 }, check: gs => gs.stats.totalCapitalEarned >= 100000000 },
  { id:'cap1b',         name:'Billionaire',        emoji:'🏆', desc:'Accumulate 1,000,000,000 Capital.',                      reward:{ influence:50 }, check: gs => gs.stats.totalCapitalEarned >= 1000000000 },
  { id:'cap10b',        name:'Titan of Finance',   emoji:'🏛️', desc:'Accumulate 10,000,000,000 Capital.',                    reward:{ influence:200 },check: gs => gs.stats.totalCapitalEarned >= 10000000000 },

  // ── TOTAL BUILDINGS ──
  { id:'firstBuilding', name:'Builder',            emoji:'🏗️', desc:'Construct your first building.',                         reward:{ capital:20 },  check: gs => gs.stats.totalBuildings >= 1 },
  { id:'bld10',         name:'Town Planner',       emoji:'🏘️', desc:'Own 10 buildings total.',                                reward:{ capital:100 }, check: gs => gs.stats.totalBuildings >= 10 },
  { id:'bld50',         name:'City Builder',       emoji:'🏙️', desc:'Own 50 buildings total.',                                reward:{ capital:500 }, check: gs => gs.stats.totalBuildings >= 50 },
  { id:'bld100',        name:'Major City',         emoji:'🏗️', desc:'Own 100 buildings total.',                               reward:{ capital:2000 },check: gs => gs.stats.totalBuildings >= 100 },
  { id:'bld200',        name:'Grand City',         emoji:'🌆', desc:'Own 200 buildings total.',                                reward:{ capital:5000 },check: gs => gs.stats.totalBuildings >= 200 },
  { id:'bld500',        name:'Megacity',           emoji:'🌇', desc:'Own 500 buildings total.',                                reward:{ capital:20000},check: gs => gs.stats.totalBuildings >= 500 },
  { id:'bld1000',       name:'Empire of Stone',    emoji:'🏰', desc:'Own 1,000 buildings total.',                              reward:{ influence:50 },check: gs => gs.stats.totalBuildings >= 1000 },

  // ── SPECIFIC BUILDINGS ──
  { id:'hut10',         name:'Village',            emoji:'🏠', desc:'Own 10 Huts.',                                            reward:{ capital:50 },  check: gs => (gs.buildings.hut||0) >= 10 },
  { id:'farmFirst',     name:'Dirt Under Nails',   emoji:'🌾', desc:'Build your first Farm.',                                  reward:{ food:100 },    check: gs => (gs.buildings.farm||0) >= 1 },
  { id:'farm10',        name:'Agricultural Base',  emoji:'🚜', desc:'Own 10 Farms.',                                           reward:{ capital:200 }, check: gs => (gs.buildings.farm||0) >= 10 },
  { id:'farm20',        name:'Breadbasket',        emoji:'🌾', desc:'Own 20 Farms.',                                           reward:{ food:500 },    check: gs => (gs.buildings.farm||0) >= 20 },
  { id:'workshop5',     name:'Workshop Foreman',   emoji:'🔨', desc:'Own 5 Workshops.',                                        reward:{ goods:50 },    check: gs => (gs.buildings.workshop||0) >= 5 },
  { id:'workshop20',    name:'Industrial Base',    emoji:'⚙️', desc:'Own 20 Workshops.',                                      reward:{ capital:1000 },check: gs => (gs.buildings.workshop||0) >= 20 },
  { id:'market5',       name:'Marketplace',        emoji:'🛒', desc:'Own 5 Markets.',                                          reward:{ capital:300 }, check: gs => (gs.buildings.market||0) >= 5 },
  { id:'school5',       name:'Educated Population',emoji:'📚', desc:'Own 5 Schools.',                                          reward:{ knowledge:50 },check: gs => (gs.buildings.school||0) >= 5 },
  { id:'school10',      name:'Center of Learning', emoji:'🏫', desc:'Own 10 Schools.',                                         reward:{ knowledge:200},check: gs => (gs.buildings.school||0) >= 10 },
  { id:'tradePostFirst',name:'Trade Routes Open',  emoji:'🗺️', desc:'Build your first Trading Post.',                          reward:{ capital:500 }, check: gs => (gs.buildings.tradingPost||0) >= 1 },
  { id:'factoryFirst',  name:'Industrial Age',     emoji:'🏭', desc:'Build your first Factory.',                               reward:{ goods:200 },   check: gs => (gs.buildings.factory||0) >= 1 },
  { id:'factory5',      name:'Manufacturing Hub',  emoji:'🔩', desc:'Own 5 Factories.',                                        reward:{ goods:500 },   check: gs => (gs.buildings.factory||0) >= 5 },
  { id:'factory10',     name:'Industrial Empire',  emoji:'⚙️', desc:'Own 10 Factories.',                                      reward:{ capital:2000 },check: gs => (gs.buildings.factory||0) >= 10 },
  { id:'bankFirst',     name:'Banker',             emoji:'🏦', desc:'Build your first Bank.',                                  reward:{ capital:500 }, check: gs => (gs.buildings.bank||0) >= 1 },
  { id:'bank5',         name:'Banking Sector',     emoji:'💳', desc:'Own 5 Banks.',                                            reward:{ capital:2000 },check: gs => (gs.buildings.bank||0) >= 5 },
  { id:'univFirst',     name:'Enlightenment',      emoji:'🎓', desc:'Build your first University.',                            reward:{ knowledge:100},check: gs => (gs.buildings.university||0) >= 1 },
  { id:'univ5',         name:'Academic Hub',       emoji:'🏫', desc:'Own 5 Universities.',                                     reward:{ knowledge:500},check: gs => (gs.buildings.university||0) >= 5 },
  { id:'centralFirst',  name:'Central Authority',  emoji:'🏛️', desc:'Build the Central Bank.',                                reward:{ influence:20 },check: gs => (gs.buildings.centralBank||0) >= 1 },
  { id:'spacePortBld',  name:'Space Pioneer',      emoji:'🚀', desc:'Build the Space Port.',                                   reward:{ influence:200},check: gs => (gs.buildings.spacePort||0) >= 1 },

  // ── PRODUCTION RATES ──
  { id:'prodLabor10',   name:'Labor Mill',         emoji:'⛏️', desc:'Produce 10 Labor per second.',                           reward:{ capital:100 }, check: gs => (gs.resources.labor?.perSec||0) >= 10 },
  { id:'prodCapital100',name:'Cash Flow',          emoji:'💸', desc:'Produce 100 Capital per second.',                        reward:{ knowledge:50 },check: gs => (gs.resources.capital?.perSec||0) >= 100 },
  { id:'prodCapital1k', name:'Revenue Stream',     emoji:'📈', desc:'Produce 1,000 Capital per second.',                      reward:{ knowledge:200},check: gs => (gs.resources.capital?.perSec||0) >= 1000 },
  { id:'prodCapital10k',name:'Financial Engine',   emoji:'💹', desc:'Produce 10,000 Capital per second.',                     reward:{ influence:10 },check: gs => (gs.resources.capital?.perSec||0) >= 10000 },
  { id:'prodGoods100',  name:'Mass Production',    emoji:'📦', desc:'Produce 100 Goods per second.',                          reward:{ capital:500 }, check: gs => (gs.resources.goods?.perSec||0) >= 100 },

  // ── RESOURCE STOCKPILES ──
  { id:'food10k',       name:'Granary Full',       emoji:'🌽', desc:'Have 10,000 Food in storage.',                           reward:{ capital:200 }, check: gs => (gs.resources.food?.amount||0) >= 10000 },
  { id:'goods5k',       name:'Full Warehouse',     emoji:'📦', desc:'Have 5,000 Goods in storage.',                           reward:{ capital:500 }, check: gs => (gs.resources.goods?.amount||0) >= 5000 },
  { id:'knowl1k',       name:'Knowledge Vault',    emoji:'📖', desc:'Accumulate 1,000 Knowledge.',                            reward:{ capital:300 }, check: gs => (gs.resources.knowledge?.amount||0) >= 1000 },
  { id:'influence50',   name:'Rising Power',       emoji:'🌟', desc:'Accumulate 50 Influence.',                               reward:{ capital:500 }, check: gs => (gs.resources.influence?.amount||0) >= 50 },
  { id:'influence500',  name:'World Power',        emoji:'🌍', desc:'Accumulate 500 Influence.',                              reward:{ capital:5000 },check: gs => (gs.resources.influence?.amount||0) >= 500 },

  // ── RESEARCH ──
  { id:'firstTech',     name:'Scholar',            emoji:'🔬', desc:'Research your first technology.',                        reward:{ knowledge:20 }, check: gs => gs.stats.totalTechsUnlocked >= 1 },
  { id:'tech5',         name:'Curious Mind',       emoji:'🔍', desc:'Unlock 5 technologies.',                                  reward:{ knowledge:50 }, check: gs => gs.stats.totalTechsUnlocked >= 5 },
  { id:'tech10',        name:'Polymath',           emoji:'📚', desc:'Unlock 10 technologies.',                                  reward:{ knowledge:100 },check: gs => gs.stats.totalTechsUnlocked >= 10 },
  { id:'tech20',        name:'Grand Engineer',     emoji:'🔧', desc:'Unlock 20 technologies.',                                  reward:{ knowledge:200 },check: gs => gs.stats.totalTechsUnlocked >= 20 },
  { id:'tech25',        name:'Renaissance Mind',   emoji:'🧠', desc:'Unlock 25 technologies.',                                  reward:{ knowledge:500 },check: gs => gs.stats.totalTechsUnlocked >= 25 },
  { id:'industrial',    name:'Industrial Pioneer', emoji:'🏭', desc:'Unlock Industrial Revolution.',                           reward:{ goods:500 },    check: gs => gs.techs.industrial_revolution >= 1 },
  { id:'banking',       name:'Financier',          emoji:'💳', desc:'Unlock Banking System.',                                  reward:{ capital:1000 }, check: gs => gs.techs.banking_system >= 1 },
  { id:'space_t',       name:'Space Age',          emoji:'🚀', desc:'Unlock Space Economy.',                                    reward:{ influence:100 },check: gs => gs.techs.space_economy >= 1 },

  // ── EDUCATION ──
  { id:'firstAnswer',   name:'Student',            emoji:'📝', desc:'Answer your first financial question.',                  reward:{ knowledge:5 },  check: gs => gs.learning.totalAnswered >= 1 },
  { id:'q10correct',    name:'Quick Learner',       emoji:'✅', desc:'Answer 10 questions correctly.',                         reward:{ capital:100 },  check: gs => gs.learning.totalCorrect >= 10 },
  { id:'q50correct',    name:'Financial Literacy',  emoji:'📖', desc:'Answer 50 questions correctly.',                         reward:{ capital:500 },  check: gs => gs.learning.totalCorrect >= 50 },
  { id:'q100correct',   name:'Finance Expert',      emoji:'🎓', desc:'Answer 100 questions correctly.',                        reward:{ capital:2000 }, check: gs => gs.learning.totalCorrect >= 100 },
  { id:'q200correct',   name:'Finance Scholar',     emoji:'🏅', desc:'Answer 200 questions correctly.',                        reward:{ capital:5000 }, check: gs => gs.learning.totalCorrect >= 200 },
  { id:'q500correct',   name:'Professor',           emoji:'🏆', desc:'Answer 500 questions correctly.',                        reward:{ influence:50 }, check: gs => gs.learning.totalCorrect >= 500 },
  { id:'q1000correct',  name:'Living Textbook',     emoji:'🌠', desc:'Answer 1,000 questions correctly.',                      reward:{ influence:100 },check: gs => gs.learning.totalCorrect >= 1000 },
  { id:'perfect5',      name:'Perfect Score',       emoji:'⭐', desc:'Answer 5 questions in a row correctly.',                 reward:{ capital:300 },  check: gs => gs.learning.streak >= 5 },
  { id:'streak10',      name:'Hot Streak',          emoji:'🔥', desc:'Answer 10 questions in a row correctly.',                reward:{ capital:1000 }, check: gs => gs.learning.streak >= 10 },
  { id:'streak25',      name:'Unbreakable',         emoji:'⚡', desc:'Answer 25 questions in a row correctly.',                reward:{ knowledge:500 },check: gs => gs.learning.streak >= 25 },
  { id:'streak50',      name:'Invincible',          emoji:'💫', desc:'Answer 50 questions in a row correctly.',                reward:{ influence:20 }, check: gs => gs.learning.streak >= 50 },
  { id:'proficiency50', name:'Half Way There',      emoji:'📊', desc:'Reach 50% Financial Proficiency.',                       reward:{ capital:500 },  check: gs => gs.learning.proficiency >= 50 },
  { id:'proficiency100',name:'Financial Master',    emoji:'🎓', desc:'Reach 100% Financial Proficiency.',                      reward:{ influence:50 }, check: gs => gs.learning.proficiency >= 100 },
  { id:'concepts10',    name:'Broad Knowledge',     emoji:'🧠', desc:'Study 10 different financial concepts.',                 reward:{ knowledge:100 },check: gs => Object.keys(gs.learning.concepts).length >= 10 },
  { id:'concepts20',    name:'Complete Curriculum', emoji:'📖', desc:'Study 20 different financial concepts.',                 reward:{ knowledge:300 },check: gs => Object.keys(gs.learning.concepts).length >= 20 },
  { id:'masteredMicro', name:'Micro Master',        emoji:'📊', desc:'Master Microeconomics concepts.',                        reward:{ capital:1000 }, check: gs => checkConceptMastery(gs, ['supply_demand','opportunity_cost','elasticity','compound_interest']) },
  { id:'masteredMacro', name:'Macro Master',        emoji:'🌍', desc:'Master Macroeconomics concepts.',                        reward:{ influence:10 }, check: gs => checkConceptMastery(gs, ['monetary_policy','fiscal_policy','gdp','inflation']) },

  // ── MARKETS ──
  { id:'firstTrade',    name:'Day Trader',          emoji:'📈', desc:'Make your first market trade.',                          reward:{ capital:100 },  check: gs => gs.stats.totalTrades >= 1 },
  { id:'trade10',       name:'Active Investor',     emoji:'💹', desc:'Make 10 market trades.',                                  reward:{ capital:500 },  check: gs => gs.stats.totalTrades >= 10 },
  { id:'trade50',       name:'Veteran Trader',      emoji:'📊', desc:'Make 50 market trades.',                                  reward:{ capital:2000 }, check: gs => gs.stats.totalTrades >= 50 },
  { id:'trade100',      name:'Market Veteran',      emoji:'📈', desc:'Make 100 market trades.',                                 reward:{ influence:10 }, check: gs => gs.stats.totalTrades >= 100 },
  { id:'trade200',      name:'Market Master',       emoji:'🏦', desc:'Make 200 market trades.',                                 reward:{ capital:5000 }, check: gs => gs.stats.totalTrades >= 200 },
  { id:'profitTrade',   name:'In the Green',        emoji:'🟢', desc:'Make a profitable investment.',                           reward:{ capital:200 },  check: gs => gs.stats.profitableTrades >= 1 },
  { id:'bigProfit',     name:'Market Wizard',       emoji:'🧙', desc:'Earn 10,000 Capital from investments.',                   reward:{ influence:5 },  check: gs => gs.stats.totalInvestmentProfit >= 10000 },
  { id:'bigProfit2',    name:'Portfolio King',      emoji:'💰', desc:'Earn 1,000,000 Capital from investments.',               reward:{ influence:50 }, check: gs => gs.stats.totalInvestmentProfit >= 1000000 },
  { id:'bigProfit3',    name:'Hedge Fund',          emoji:'🏦', desc:'Earn 10,000,000 Capital from investments.',              reward:{ influence:100 },check: gs => gs.stats.totalInvestmentProfit >= 10000000 },
  { id:'bigProfit4',    name:'Wall Street Legend',  emoji:'🌐', desc:'Earn 1,000,000,000 Capital from investments.',           reward:{ influence:500 },check: gs => gs.stats.totalInvestmentProfit >= 1000000000 },

  // ── POPULATION ──
  { id:'pop100',        name:'Town',                emoji:'👥', desc:'Reach a population of 100.',                             reward:{ capital:200 },  check: gs => (gs.population||0) >= 100 },
  { id:'pop1000',       name:'City',               emoji:'🏙️', desc:'Reach a population of 1,000.',                           reward:{ capital:2000 }, check: gs => (gs.population||0) >= 1000 },
  { id:'pop10000',      name:'Metropolis',         emoji:'🌆', desc:'Reach a population of 10,000.',                           reward:{ influence:10 }, check: gs => (gs.population||0) >= 10000 },
  { id:'pop50000',      name:'Great City',         emoji:'🌃', desc:'Reach a population of 50,000.',                           reward:{ influence:25 }, check: gs => (gs.population||0) >= 50000 },
  { id:'pop100000',     name:'Megalopolis',        emoji:'🌉', desc:'Reach a population of 100,000.',                          reward:{ influence:100 },check: gs => (gs.population||0) >= 100000 },
  { id:'happiness75',   name:'Content Society',    emoji:'😌', desc:'Achieve 75%+ Happiness.',                                 reward:{ capital:200 },  check: gs => (gs.happiness||0) >= 75 },
  { id:'happiness90',   name:'Happy Society',      emoji:'😊', desc:'Achieve 90%+ Happiness.',                                 reward:{ capital:500 },  check: gs => (gs.happiness||0) >= 90 },
  { id:'happiness95',   name:'Utopia',             emoji:'🌈', desc:'Achieve 95%+ Happiness.',                                 reward:{ influence:50 }, check: gs => (gs.happiness||0) >= 95 },

  // ── POLICIES ──
  { id:'firstPolicy',   name:'Legislator',         emoji:'⚖️', desc:'Enable your first policy.',                              reward:{ influence:10 }, check: gs => Object.values(gs.policies||{}).filter(Boolean).length >= 1 },
  { id:'policies5',     name:'Policy Maker',       emoji:'📜', desc:'Enable 5 policies simultaneously.',                      reward:{ influence:50 }, check: gs => Object.values(gs.policies||{}).filter(Boolean).length >= 5 },
  { id:'policies10',    name:'Governing Body',     emoji:'🏛️', desc:'Enable 10 policies simultaneously.',                     reward:{ influence:100 },check: gs => Object.values(gs.policies||{}).filter(Boolean).length >= 10 },

  // ── WORLD EVENTS ──
  { id:'firstEvent',    name:'Crisis Manager',     emoji:'⚠️', desc:'Experience your first world event.',                     reward:{ capital:300 },  check: gs => EventsEngine.eventHistory.length >= 1 },
  { id:'events10',      name:'Weathered Ruler',    emoji:'🌪️', desc:'Survive 10 world events.',                                reward:{ influence:10 }, check: gs => EventsEngine.eventHistory.length >= 10 },
  { id:'events25',      name:'Unshakeable',        emoji:'🗿', desc:'Survive 25 world events.',                                reward:{ influence:25 }, check: gs => EventsEngine.eventHistory.length >= 25 },

  // ── PRESTIGE ──
  { id:'firstPrestige', name:'Rebirth',            emoji:'♻️', desc:'Prestige for the first time.',                            reward:{ influence:100 },check: gs => gs.prestige.count >= 1 },
  { id:'prestige3',     name:'Phoenix',            emoji:'🔥', desc:'Prestige 3 times.',                                        reward:{ influence:200 },check: gs => gs.prestige.count >= 3 },
  { id:'prestige5',     name:'Five Lives',         emoji:'⭐', desc:'Prestige 5 times.',                                        reward:{ influence:500 },check: gs => gs.prestige.count >= 5 },
  { id:'prestige10',    name:'Eternal Chancellor', emoji:'♾️', desc:'Prestige 10 times.',                                       reward:{ influence:1000},check: gs => gs.prestige.count >= 10 },
  { id:'prestige20',    name:'Immortal Chancellor',emoji:'👑', desc:'Prestige 20 times.',                                       reward:{ influence:2000},check: gs => gs.prestige.count >= 20 },

  // ── SPECIAL ──
  { id:'offline1hr',    name:'Passive Income',     emoji:'💤', desc:'Earn resources while offline for 1 hour.',                reward:{ capital:200 },  check: gs => gs.stats.totalOfflineTime >= 3600 },
  { id:'offline8hr',    name:'Overnight Growth',   emoji:'🌙', desc:'Earn resources offline for 8 hours.',                     reward:{ capital:2000 }, check: gs => gs.stats.totalOfflineTime >= 28800 },
  { id:'offline24hr',   name:'Dedicated Economy',  emoji:'🌐', desc:'Accumulate 24 hours of offline time total.',              reward:{ influence:25 }, check: gs => gs.stats.totalOfflineTime >= 86400 },
  { id:'allBuildings',  name:'Complete City',      emoji:'🌟', desc:'Own at least 1 of every building type.',                  reward:{ influence:25 }, check: gs => checkAllBuildings(gs) },
  { id:'midPhase',      name:'Growing Empire',     emoji:'🌱', desc:'Reach the Mid-Economy phase.',                            reward:{ capital:2000 }, check: gs => gs.phase === 'mid' || gs.phase === 'late' || gs.phase === 'advanced' },
  { id:'latePhase',     name:'Industrial Power',   emoji:'⚙️', desc:'Reach the Late Economy phase.',                          reward:{ knowledge:1000},check: gs => gs.phase === 'late' || gs.phase === 'advanced' },
  { id:'perfectEmpire', name:'Prosperity Empire',  emoji:'👑', desc:'Reach the Advanced economic phase.',                      reward:{ influence:100 },check: gs => gs.phase === 'advanced' },
  { id:'empireAge1hr',  name:'Survivor',           emoji:'⏱️', desc:'Keep your empire running for 1 hour.',                   reward:{ capital:500 },  check: gs => (gs.session.empireAge||0) >= 3600 },
  { id:'empireAge12hr', name:'Long Game',          emoji:'🕰️', desc:'Keep your empire running for 12 hours.',                 reward:{ influence:20 }, check: gs => (gs.session.empireAge||0) >= 43200 },
  { id:'taxCollector',  name:'Tax Collector',      emoji:'🧾', desc:'Set your tax rate above 25%.',                            reward:{ capital:300 },  check: gs => (gs.taxRate||0) >= 0.25 },
  { id:'freeMarket',    name:'Free Market',        emoji:'🕊️', desc:'Set your tax rate to 5% or below.',                      reward:{ goods:200 },    check: gs => (gs.taxRate||0) <= 0.05 },
];

function checkConceptMastery(gs, concepts) {
  return concepts.every(c => (gs.learning.concepts[c]?.mastery || 0) >= 0.75);
}

function checkAllBuildings(gs) {
  return Object.keys(BUILDINGS).every(id => (gs.buildings[id] || 0) >= 1);
}
