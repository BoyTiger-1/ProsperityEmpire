/* ── GLOBAL EVENTS DATA ── */
const GLOBAL_EVENTS = [
  // POSITIVE EVENTS
  {
    id:'goldRush', name:'Gold Rush!', type:'positive', emoji:'⛏️',
    desc:'A major mineral deposit discovered! Raw material production surges.',
    effect:'×2 Stone & Coal production for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.stone = (gs.eventMods.stone||1)*2; gs.eventMods.coal = (gs.eventMods.coal||1)*2; },
    revert: gs => { gs.eventMods.stone = (gs.eventMods.stone||2)/2; gs.eventMods.coal = (gs.eventMods.coal||2)/2; },
  },
  {
    id:'harvestFestival', name:'Harvest Festival', type:'positive', emoji:'🌾',
    desc:'Perfect weather conditions yield an extraordinary harvest this season.',
    effect:'×3 Food production for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.food = (gs.eventMods.food||1)*3; },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||3)/3; },
  },
  {
    id:'tradeBoom', name:'Trade Boom', type:'positive', emoji:'📦',
    desc:'Regional demand for your goods spikes. Merchants flock to your markets.',
    effect:'×2 Capital generation for 120 seconds.',
    duration:120,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*2; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||2)/2; },
  },
  {
    id:'inventorVisit', name:'Brilliant Inventor Visits', type:'positive', emoji:'💡',
    desc:'A renowned inventor shares breakthrough ideas with your researchers.',
    effect:'×5 Knowledge generation for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*5; },
    revert: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||5)/5; },
  },
  {
    id:'investorConference', name:'Global Investor Conference', type:'positive', emoji:'🤝',
    desc:'Foreign capital floods in. Your financial sector booms.',
    effect:'+500% Capital for 45 seconds. Bonus: +1,000 Capital immediately.',
    duration:45,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.resources.capital += 1000; gs.eventMods.capital = (gs.eventMods.capital||1)*6; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||6)/6; },
  },
  {
    id:'techBreakthrough', name:'Technological Breakthrough', type:'positive', emoji:'🚀',
    desc:'Your research institutes achieve a major breakthrough!',
    effect:'All production ×1.5 for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.all = (gs.eventMods.all||1)*1.5; },
    revert: gs => { gs.eventMods.all = (gs.eventMods.all||1.5)/1.5; },
  },
  {
    id:'migrationWave', name:'Migration Wave', type:'positive', emoji:'🚶',
    desc:'Skilled workers immigrate to your empire, boosting Labor supply and population.',
    effect:'×2 Labor for 120s. Gain up to +40 population immediately.',
    duration:120,
    trigger:{ minPhase:'early' },
    apply: gs => {
      gs.eventMods.labor = (gs.eventMods.labor||1)*2;
      const gain = Math.min(40, Math.max(0, gs.maxPopulation - gs.population));
      gs.population = Math.min(gs.maxPopulation, gs.population + gain);
    },
    revert: gs => { gs.eventMods.labor = (gs.eventMods.labor||2)/2; },
  },
  {
    id:'bullMarket', name:'Bull Market', type:'positive', emoji:'🐂',
    desc:'Financial markets surge. Investment returns skyrocket.',
    effect:'×3 Capital from Banks and Stock Exchanges for 60s.',
    duration:60,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.financial = (gs.eventMods.financial||1)*3; },
    revert: gs => { gs.eventMods.financial = (gs.eventMods.financial||3)/3; },
  },

  // NEGATIVE EVENTS
  {
    id:'drought', name:'Drought', type:'negative', emoji:'☀️',
    desc:'Prolonged drought devastates crops. Food production drops.',
    effect:'-70% Food production for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.food = (gs.eventMods.food||1)*0.3; },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||0.3)/0.3; },
  },
  {
    id:'workerStrike', name:'Worker Strike', type:'negative', emoji:'✊',
    desc:'Unhappy workers down tools! Production halted at factories.',
    effect:'-50% Goods and Labor production for 45 seconds.',
    duration:45,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.goods = (gs.eventMods.goods||1)*0.5; gs.eventMods.labor = (gs.eventMods.labor||1)*0.5; },
    revert: gs => { gs.eventMods.goods = (gs.eventMods.goods||0.5)/0.5; gs.eventMods.labor = (gs.eventMods.labor||0.5)/0.5; },
  },
  {
    id:'powerOutage', name:'Power Outage', type:'negative', emoji:'🔌',
    desc:'Widespread power failure disrupts industrial production.',
    effect:'-80% Energy production and -40% Goods for 30 seconds.',
    duration:30,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.energy = (gs.eventMods.energy||1)*0.2; gs.eventMods.goods = (gs.eventMods.goods||1)*0.6; },
    revert: gs => { gs.eventMods.energy = (gs.eventMods.energy||0.2)/0.2; gs.eventMods.goods = (gs.eventMods.goods||0.6)/0.6; },
  },
  {
    id:'recession', name:'Economic Recession', type:'negative', emoji:'📉',
    desc:'The business cycle turns down. Demand contracts across all sectors.',
    effect:'-50% all Capital generation for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*0.5; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.5)/0.5; },
  },
  {
    id:'flood', name:'Devastating Flood', type:'negative', emoji:'🌊',
    desc:'Floodwaters damage infrastructure and farms.',
    effect:'-60% Food & -30% Goods for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.food = (gs.eventMods.food||1)*0.4; gs.eventMods.goods = (gs.eventMods.goods||1)*0.7; },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||0.4)/0.4; gs.eventMods.goods = (gs.eventMods.goods||0.7)/0.7; },
  },
  {
    id:'supplyShock', name:'Supply Chain Shock', type:'negative', emoji:'🚢',
    desc:'Global supply chains disrupted. Materials become scarce.',
    effect:'-40% Wood & Stone production for 75 seconds.',
    duration:75,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.wood = (gs.eventMods.wood||1)*0.6; gs.eventMods.stone = (gs.eventMods.stone||1)*0.6; },
    revert: gs => { gs.eventMods.wood = (gs.eventMods.wood||0.6)/0.6; gs.eventMods.stone = (gs.eventMods.stone||0.6)/0.6; },
  },
  {
    id:'pandemic', name:'Disease Outbreak', type:'negative', emoji:'🦠',
    desc:'A disease spreads through your population. People die and labor force shrinks.',
    effect:'-60% Labor for 120s. Lose up to 8% of population.',
    duration:120,
    trigger:{ minPhase:'early' },
    apply: gs => {
      gs.eventMods.labor = (gs.eventMods.labor||1)*0.4;
      const loss = Math.floor(gs.population * 0.08);
      gs.population = Math.max(0, gs.population - loss);
    },
    revert: gs => { gs.eventMods.labor = (gs.eventMods.labor||0.4)/0.4; },
  },
  {
    id:'bankRun', name:'Bank Run', type:'negative', emoji:'🏃',
    desc:'Fear spreads — citizens withdraw savings en masse from banks.',
    effect:'-80% Capital from Banks for 45 seconds. Lose 5% of Capital savings.',
    duration:45,
    trigger:{ minPhase:'mid' },
    apply: gs => {
      gs.resources.capital *= 0.95;
      gs.eventMods.financial = (gs.eventMods.financial||1)*0.2;
    },
    revert: gs => { gs.eventMods.financial = (gs.eventMods.financial||0.2)/0.2; },
  },
  {
    id:'cyberAttack', name:'Cyber Attack', type:'negative', emoji:'💻',
    desc:'Hackers target your digital infrastructure. Tech production halts.',
    effect:'-70% Knowledge generation for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*0.3; },
    revert: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||0.3)/0.3; },
  },

  // NEUTRAL / OPPORTUNITY EVENTS
  {
    id:'diplomaticMission', name:'Diplomatic Mission', type:'neutral', emoji:'🤝',
    desc:'A foreign delegation arrives. Accept their trade proposal?',
    effect:'Choose: accept for +500 Capital instantly, or decline.',
    duration:30,
    trigger:{ minPhase:'mid' },
    isChoice:true,
    acceptReward: gs => { gs.resources.capital += 500; },
    choices:['Accept Deal (+500 Capital)','Decline'],
  },
  {
    id:'investmentOpportunity', name:'Investment Opportunity', type:'neutral', emoji:'💰',
    desc:'A risky venture offers potential high returns. Invest 200 Capital?',
    effect:'50% chance: triple your investment. 50% chance: lose it all.',
    duration:20,
    trigger:{ minPhase:'early' },
    isChoice:true,
    isGamble:true,
    gamblingCost:200,
    winReward: gs => { gs.resources.capital += 600; },
    choices:['Invest 200 Capital (50/50)','Pass'],
  },
  {
    id:'naturalDisaster', name:'Natural Disaster Warning', type:'neutral', emoji:'⚠️',
    desc:'Forecasters predict a storm. Spend Capital to fortify infrastructure?',
    effect:'Spend 300 Capital to prevent -70% production for 90 seconds.',
    duration:15,
    trigger:{ minPhase:'early' },
    isChoice:true,
    acceptCost:300,
    choices:['Fortify (spend 300C)','Take the risk'],
  },

  // ════ MORE POSITIVE EVENTS ════
  {
    id:'techInnovation', name:'Technology Breakthrough', type:'positive', emoji:'💡',
    desc:'Your researchers make an unexpected discovery. Knowledge generation doubles!',
    effect:'×2 Knowledge production for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*2; },
    revert: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||2)/2; },
  },
  {
    id:'touristBoom', name:'Tourism Boom', type:'positive', emoji:'🗺️',
    desc:'Word of your empire\'s prosperity attracts visitors. Capital and Influence surge.',
    effect:'×1.8 Capital & ×2 Influence for 120 seconds.',
    duration:120,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*1.8; gs.eventMods.influence = (gs.eventMods.influence||1)*2; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||1.8)/1.8; gs.eventMods.influence = (gs.eventMods.influence||2)/2; },
  },
  {
    id:'energySurplus', name:'Energy Surplus', type:'positive', emoji:'⚡',
    desc:'Favourable conditions create a massive energy surplus. All production boosted.',
    effect:'×1.5 all production for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.all = (gs.eventMods.all||1)*1.5; },
    revert: gs => { gs.eventMods.all = (gs.eventMods.all||1.5)/1.5; },
  },
  {
    id:'immigrationWave', name:'Immigration Wave', type:'positive', emoji:'🚶',
    desc:'Skilled workers emigrate to your prosperous empire. Labour and Knowledge rise.',
    effect:'×2 Labour & ×1.5 Knowledge for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.labor = (gs.eventMods.labor||1)*2; gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*1.5; },
    revert: gs => { gs.eventMods.labor = (gs.eventMods.labor||2)/2; gs.eventMods.knowledge = (gs.eventMods.knowledge||1.5)/1.5; },
  },
  {
    id:'stockRally', name:'Bull Market Rally', type:'positive', emoji:'🐂',
    desc:'Investor confidence soars. Capital production and influence surge across all sectors.',
    effect:'×2.5 Capital production for 120 seconds.',
    duration:120,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*2.5; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||2.5)/2.5; },
  },
  {
    id:'goodWeather', name:'Favourable Climate Season', type:'positive', emoji:'☀️',
    desc:'Ideal growing conditions boost agricultural output empire-wide.',
    effect:'×2.5 Food production for 75 seconds.',
    duration:75,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.food = (gs.eventMods.food||1)*2.5; },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||2.5)/2.5; },
  },

  // ════ MORE NEGATIVE EVENTS ════
  {
    id:'tradeWar', name:'Trade War Escalation', type:'negative', emoji:'⚔️',
    desc:'Tariff disputes erupt with a rival nation. Trade income collapses.',
    effect:'−50% Capital production for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*0.5; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.5)/0.5; },
  },
  {
    id:'marketCrash', name:'Market Crash', type:'negative', emoji:'📉',
    desc:'Panic selling triggers a financial crisis. Capital generation plummets.',
    effect:'−60% Capital production for 120 seconds.',
    duration:120,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*0.4; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.4)/0.4; },
  },
  {
    id:'energyCrisis', name:'Energy Crisis', type:'negative', emoji:'🔋',
    desc:'Supply disruptions cause an energy shortage. All energy-dependent buildings suffer.',
    effect:'−60% Energy production for 60 seconds.',
    duration:60,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.energy = (gs.eventMods.energy||1)*0.4; },
    revert: gs => { gs.eventMods.energy = (gs.eventMods.energy||0.4)/0.4; },
  },
  {
    id:'laborStrike', name:'General Strike', type:'negative', emoji:'✊',
    desc:'Workers demand better conditions and walk out. Labour production halves.',
    effect:'−50% Labour production for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.labor = (gs.eventMods.labor||1)*0.5; },
    revert: gs => { gs.eventMods.labor = (gs.eventMods.labor||0.5)/0.5; },
  },
  {
    id:'dataBreach', name:'Corporate Data Breach', type:'negative', emoji:'🔓',
    desc:'Hackers exfiltrate sensitive financial data. Knowledge and Capital drop.',
    effect:'−40% Knowledge & −30% Capital for 75 seconds.',
    duration:75,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*0.6; gs.eventMods.capital = (gs.eventMods.capital||1)*0.7; },
    revert: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||0.6)/0.6; gs.eventMods.capital = (gs.eventMods.capital||0.7)/0.7; },
  },

  // ════ MORE NEUTRAL / CHOICE EVENTS ════
  {
    id:'foreignAid', name:'Foreign Aid Request', type:'neutral', emoji:'🤲',
    desc:'A struggling neighbour requests aid. Donate Capital to earn Influence?',
    effect:'Spend 1,000 Capital to gain +50 Influence.',
    duration:25,
    trigger:{ minPhase:'mid' },
    isChoice:true,
    acceptCost:1000,
    acceptReward: gs => { gs.resources.influence.amount = (gs.resources.influence.amount||0) + 50; },
    choices:['Donate (−1,000 Capital, +50 Influence)','Decline'],
  },
  {
    id:'researchGrant', name:'Research Grant Available', type:'neutral', emoji:'🔬',
    desc:'A foundation offers to co-fund your research. Match their investment?',
    effect:'Spend 500 Capital → triple Knowledge for 120 seconds.',
    duration:20,
    trigger:{ minPhase:'mid' },
    isChoice:true,
    acceptCost:500,
    acceptReward: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*3; setTimeout(() => { gs.eventMods.knowledge = (gs.eventMods.knowledge||3)/3; }, 120000); },
    choices:['Match Grant (−500 Capital)','Decline'],
  },
  {
    id:'bigInvestment', name:'Major Investment Offer', type:'neutral', emoji:'🏦',
    desc:'A foreign investor offers to inject capital into your empire. Accept?',
    effect:'50% chance: receive 5,000 Capital. 50% chance: only 500 Capital.',
    duration:20,
    trigger:{ minPhase:'mid' },
    isChoice:true,
    isGamble:true,
    gamblingCost:0,
    winReward: gs => { gs.resources.capital.amount += 5000; gs.stats.totalCapitalEarned += 5000; },
    acceptReward: gs => { gs.resources.capital.amount += 500; gs.stats.totalCapitalEarned += 500; },
    choices:['Accept Investment (variable return)','Decline'],
  },

  // ════ POPULATION EVENTS ════
  {
    id:'greatPlague', name:'Great Plague', type:'negative', emoji:'💀',
    desc:'A devastating plague sweeps through your empire. Population plummets.',
    effect:'-15% population immediately. -50% Labor & Food for 150s.',
    duration:150,
    trigger:{ minPhase:'early' },
    apply: gs => {
      const loss = Math.floor(gs.population * 0.15);
      gs.population = Math.max(1, gs.population - loss);
      gs.eventMods.labor = (gs.eventMods.labor||1)*0.5;
      gs.eventMods.food  = (gs.eventMods.food||1)*0.5;
    },
    revert: gs => {
      gs.eventMods.labor = (gs.eventMods.labor||0.5)/0.5;
      gs.eventMods.food  = (gs.eventMods.food||0.5)/0.5;
    },
  },
  {
    id:'babyBoom', name:'Baby Boom', type:'positive', emoji:'👶',
    desc:'A period of peace and prosperity triggers a population surge!',
    effect:'+20% population (up to housing cap). ×1.3 Food for 90s.',
    duration:90,
    trigger:{ minPhase:'early' },
    apply: gs => {
      const gain = Math.min(Math.floor(gs.population * 0.20), gs.maxPopulation - gs.population);
      gs.population = Math.min(gs.maxPopulation, gs.population + Math.max(0, gain));
      gs.eventMods.food = (gs.eventMods.food||1)*1.3;
    },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||1.3)/1.3; },
  },
  {
    id:'famine', name:'Famine', type:'negative', emoji:'🌾',
    desc:'Crop failures and drought cause famine. Citizens starve and flee.',
    effect:'-10% population. -80% Food for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'early' },
    apply: gs => {
      const loss = Math.floor(gs.population * 0.10);
      gs.population = Math.max(0, gs.population - loss);
      gs.eventMods.food = (gs.eventMods.food||1)*0.2;
    },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||0.2)/0.2; },
  },
  {
    id:'refugeeFlux', name:'Refugee Influx', type:'positive', emoji:'🏘️',
    desc:'Refugees from a distant war seek safety in your empire.',
    effect:'Gain +60 population (up to housing cap). +20% Labour for 60s.',
    duration:60,
    trigger:{ minPhase:'mid' },
    apply: gs => {
      const gain = Math.min(60, Math.max(0, gs.maxPopulation - gs.population));
      gs.population += gain;
      gs.eventMods.labor = (gs.eventMods.labor||1)*1.2;
    },
    revert: gs => { gs.eventMods.labor = (gs.eventMods.labor||1.2)/1.2; },
  },
  {
    id:'warDraft', name:'Wartime Draft', type:'negative', emoji:'⚔️',
    desc:'A neighboring conflict pulls citizens away from productive work.',
    effect:'-12% population. -40% Labor for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => {
      const loss = Math.floor(gs.population * 0.12);
      gs.population = Math.max(0, gs.population - loss);
      gs.eventMods.labor = (gs.eventMods.labor||1)*0.6;
    },
    revert: gs => { gs.eventMods.labor = (gs.eventMods.labor||0.6)/0.6; },
  },
  {
    id:'emigrationCrisis', name:'Emigration Crisis', type:'negative', emoji:'🚪',
    desc:'Low happiness drives citizens to leave your empire in search of better lives.',
    effect:'-18% population if happiness < 50. -30% Capital.',
    duration:60,
    trigger:{ minPhase:'early' },
    apply: gs => {
      if (gs.happiness < 50) {
        const loss = Math.floor(gs.population * 0.18);
        gs.population = Math.max(0, gs.population - loss);
      }
      gs.eventMods.capital = (gs.eventMods.capital||1)*0.7;
    },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.7)/0.7; },
  },
  {
    id:'birthRatePolicy', name:'Pro-Natalist Policy', type:'neutral', emoji:'👨‍👩‍👧',
    desc:'Implement a pro-natalist policy? Investment boosts long-term population.',
    effect:'Spend 800 Capital → gain up to +50 population over housing cap.',
    duration:20,
    trigger:{ minPhase:'mid' },
    isChoice:true,
    acceptCost:800,
    acceptReward: gs => {
      const gain = Math.min(50, Math.max(0, gs.maxPopulation - gs.population));
      gs.population += gain;
    },
    choices:['Implement Policy (−800 Capital)','Decline'],
  },

  // ════ ADDITIONAL EVENTS ════
  {
    id:'earthquake', name:'Earthquake', type:'negative', emoji:'🌋',
    desc:'A tremor shakes your empire! Infrastructure damaged.',
    effect:'-50% Goods & Stone for 60 seconds. -5% population.',
    duration:60,
    trigger:{ minPhase:'early' },
    apply: gs => {
      gs.eventMods.goods = (gs.eventMods.goods||1)*0.5;
      gs.eventMods.stone = (gs.eventMods.stone||1)*0.5;
      const loss = Math.floor(gs.population * 0.05);
      gs.population = Math.max(1, gs.population - loss);
    },
    revert: gs => {
      gs.eventMods.goods = (gs.eventMods.goods||0.5)/0.5;
      gs.eventMods.stone = (gs.eventMods.stone||0.5)/0.5;
    },
  },
  {
    id:'worldExpo', name:'World Exposition', type:'positive', emoji:'🌐',
    desc:'Your empire hosts a grand world expo. Prestige and trade surge.',
    effect:'×2.5 Influence & ×1.8 Capital for 120 seconds.',
    duration:120,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.influence = (gs.eventMods.influence||1)*2.5; gs.eventMods.capital = (gs.eventMods.capital||1)*1.8; },
    revert: gs => { gs.eventMods.influence = (gs.eventMods.influence||2.5)/2.5; gs.eventMods.capital = (gs.eventMods.capital||1.8)/1.8; },
  },
  {
    id:'archFind', name:'Archaeological Discovery', type:'positive', emoji:'🏺',
    desc:'Archaeologists uncover a trove of ancient artefacts, sparking national pride.',
    effect:'+800 Knowledge & +200 Influence immediately.',
    duration:1,
    trigger:{ minPhase:'mid' },
    apply: gs => {
      if (gs.resources.knowledge) gs.resources.knowledge.amount += 800;
      if (gs.resources.influence) gs.resources.influence.amount += 200;
    },
    revert: gs => {},
  },
  {
    id:'currencyCrisis', name:'Currency Devaluation', type:'negative', emoji:'💱',
    desc:'Speculative attacks batter your currency. Exports boom but imports cost more.',
    effect:'-40% Capital income, +50% Goods output for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*0.6; gs.eventMods.goods = (gs.eventMods.goods||1)*1.5; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.6)/0.6; gs.eventMods.goods = (gs.eventMods.goods||1.5)/1.5; },
  },
  {
    id:'startupBoom', name:'Tech Startup Boom', type:'positive', emoji:'🦄',
    desc:'A wave of innovation startups puts your empire on the global tech map.',
    effect:'×3 Knowledge & ×2 Capital for 90 seconds.',
    duration:90,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||1)*3; gs.eventMods.capital = (gs.eventMods.capital||1)*2; },
    revert: gs => { gs.eventMods.knowledge = (gs.eventMods.knowledge||3)/3; gs.eventMods.capital = (gs.eventMods.capital||2)/2; },
  },
  {
    id:'harvestMoon', name:'Harvest Moon Festival', type:'positive', emoji:'🌕',
    desc:'A bountiful moon festival lifts spirits. Food output and happiness soar.',
    effect:'×2 Food for 90 seconds. Happiness boosted.',
    duration:90,
    trigger:{ minPhase:'early' },
    apply: gs => { gs.eventMods.food = (gs.eventMods.food||1)*2; gs.happiness = Math.min(100, gs.happiness + 12); },
    revert: gs => { gs.eventMods.food = (gs.eventMods.food||2)/2; },
  },
  {
    id:'debtCrisis', name:'Sovereign Debt Scare', type:'negative', emoji:'📜',
    desc:'Bond markets lose confidence. Interest rates spike, squeezing the economy.',
    effect:'-35% Capital & -20% Goods for 120 seconds.',
    duration:120,
    trigger:{ minPhase:'late' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*0.65; gs.eventMods.goods = (gs.eventMods.goods||1)*0.8; },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.65)/0.65; gs.eventMods.goods = (gs.eventMods.goods||0.8)/0.8; },
  },
  {
    id:'renewableRush', name:'Renewable Energy Rush', type:'positive', emoji:'🌱',
    desc:'Green energy investment floods in. Energy production soars and pollution falls.',
    effect:'×3 Energy for 120s. Pollution reduced by 15 points.',
    duration:120,
    trigger:{ minPhase:'mid' },
    apply: gs => {
      gs.eventMods.energy = (gs.eventMods.energy||1)*3;
      gs.pollution = Math.max(0, (gs.pollution||0) - 15);
    },
    revert: gs => { gs.eventMods.energy = (gs.eventMods.energy||3)/3; },
  },
  {
    id:'criminalNetwork', name:'Crime Syndicate Emerges', type:'negative', emoji:'🕵️',
    desc:'An organised crime network operates in the shadows, siphoning capital.',
    effect:'-20% Capital for 90 seconds. Crime rate +15.',
    duration:90,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.capital = (gs.eventMods.capital||1)*0.8; gs.crimeRate = Math.min(100, (gs.crimeRate||0) + 15); },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.8)/0.8; gs.crimeRate = Math.max(0, (gs.crimeRate||15) - 15); },
  },
  {
    id:'peaceDividend', name:'Peace Dividend', type:'positive', emoji:'🕊️',
    desc:'An era of peace reduces military spending. All production improves.',
    effect:'×1.6 all production for 150 seconds.',
    duration:150,
    trigger:{ minPhase:'mid' },
    apply: gs => { gs.eventMods.all = (gs.eventMods.all||1)*1.6; },
    revert: gs => { gs.eventMods.all = (gs.eventMods.all||1.6)/1.6; },
  },
  {
    id:'climateAccord', name:'Climate Accord Signed', type:'neutral', emoji:'🌍',
    desc:'A global climate treaty invites participation. Comply for prestige?',
    effect:'Spend 600 Capital → reduce Pollution by 30 & gain +80 Influence.',
    duration:25,
    trigger:{ minPhase:'mid' },
    isChoice:true,
    acceptCost:600,
    acceptReward: gs => {
      gs.pollution = Math.max(0, (gs.pollution||0) - 30);
      if (gs.resources.influence) gs.resources.influence.amount += 80;
    },
    choices:['Sign Accord (−600 Capital)','Decline'],
  },
  {
    id:'taxRevolt', name:'Taxpayer Revolt', type:'negative', emoji:'😤',
    desc:'Overtaxed citizens protest loudly. Happiness and capital both suffer.',
    effect:'-25% Capital for 60 seconds. Happiness −12.',
    duration:60,
    trigger:{ minPhase:'early' },
    apply: gs => {
      gs.eventMods.capital = (gs.eventMods.capital||1)*0.75;
      gs.happiness = Math.max(0, gs.happiness - 12);
    },
    revert: gs => { gs.eventMods.capital = (gs.eventMods.capital||0.75)/0.75; },
  },
];
