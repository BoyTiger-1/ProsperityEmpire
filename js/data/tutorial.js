/* ── TUTORIAL STEPS — Complete Walkthrough ── */
const TUTORIAL_STEPS = [

  // ── WELCOME ──
  {
    id: 'welcome',
    title: 'Welcome to Prosperity Empire',
    body: 'You are the founding Chancellor of a new civilisation. Starting from nothing, you will grow a humble settlement into a global financial empire — learning real economics, investing, and finance along the way. This tutorial will guide you through every system. Click Next to begin.',
    target: null,
    action: null,
  },

  // ── FIRST CLICK ──
  {
    id: 'click_intro',
    title: 'The City Crest — Your First Resource',
    body: 'Every empire starts with Labour. Labour is the most fundamental resource — workers who power your early economy. Click the large city icon in the centre of the Empire tab to generate Labour Units manually.',
    target: '#click-zone',
    action: null,
  },
  {
    id: 'click_more',
    title: 'Click Power',
    body: 'Each click generates Labour based on your Click Power (shown below the city crest). As you research technologies and build specialised structures, your Click Power will multiply. Right now, click 10–20 times to accumulate your first Labour units — you need at least 15 to build your first Farm.',
    target: '#click-zone',
    action: 'click',
  },

  // ── RESOURCES ──
  {
    id: 'resources_header',
    title: 'Your Resource Panel',
    body: 'The header bar shows all your resources and their per-second rates. Capital 💰 is your main currency — everything costs Capital. Labour 👷 drives early production. Knowledge 🔬 unlocks research. Food 🌾 feeds your population. Watch these numbers grow as you build.',
    target: '#hdr-resources',
    action: null,
  },
  {
    id: 'resources_rates',
    title: 'Per-Second Rates',
    body: 'The small numbers next to each resource show how much you earn (green) or spend (red) per second automatically. Positive rates mean your buildings are working. Your goal is to make every resource flow positive — a self-sustaining empire that earns while you sleep.',
    target: '#hdr-resources',
    action: null,
  },

  // ── BUILDINGS ──
  {
    id: 'buildings_tab',
    title: 'The Buildings Tab',
    body: 'Buildings are the engine of your empire. Each building produces resources automatically every second. Click the BUILDINGS tab now to see what is available to you.',
    target: '[data-tab="buildings"]',
    action: 'tab',
  },
  {
    id: 'first_farm',
    title: 'Build Your First Farm',
    body: 'Farms produce Food. Food is consumed by your population — if you run out, population declines and so does your Labour production. A Farm costs 15 Capital. If you have enough, click BUY x1 on the Farm card. It will immediately start producing 1.5 Food/second.',
    target: '#buildings-grid',
    action: null,
  },
  {
    id: 'lumber_mill',
    title: 'Lumber Mill — Wood for Growth',
    body: 'Wood is needed to build many structures. A Lumber Mill turns Labour into Wood automatically. Build one when you can afford it. Notice how each building shows its PRODUCES and CONSUMES rates — always check that you have enough of the consumed resource before buying.',
    target: '#buildings-grid',
    action: null,
  },
  {
    id: 'workshop',
    title: 'The Workshop — Your Capital Engine',
    body: 'The Workshop converts Goods into Capital — your primary income. Workshops require Wood and Labour, so make sure your Lumber Mill is running first. The more Workshops you build, the faster Capital flows in. Workshops are the backbone of the early economy.',
    target: '#buildings-grid',
    action: null,
  },
  {
    id: 'buy_qty',
    title: 'Buy Multipliers — x1, x10, x100, MAX',
    body: 'Once you have some buildings, use the BUY buttons at the top to purchase multiple at once. BUY MAX automatically calculates the most you can afford and buys them all instantly. This is the fastest way to scale up mid-game — stack those Workshops!',
    target: '[data-buy]',
    action: null,
  },
  {
    id: 'building_filter',
    title: 'Filter by Tier',
    body: 'Buildings are sorted into Tiers (I through IV). Tier I buildings are basic producers. Tier II are mid-game. Tier III and IV are late-game powerhouses. Use the ALL / TIER buttons to filter the grid. Locked buildings become available as you meet their unlock requirements.',
    target: '[data-filter]',
    action: null,
  },

  // ── PRODUCTION REPORT ──
  {
    id: 'production_panel',
    title: 'Production Report',
    body: 'Scroll down in the Empire tab to find the Production Report. It shows your total income and spending per second across all resources. This is your economic dashboard — check it after every batch of buildings to make sure no resource is draining to zero.',
    target: '#production-panel',
    action: null,
  },

  // ── RESEARCH ──
  {
    id: 'research_tab',
    title: 'The Research Tab — Permanent Multipliers',
    body: 'Research is where your empire truly accelerates. Technologies cost Knowledge Points (KP) and give permanent multipliers to production, click power, and more. Click the RESEARCH tab now.',
    target: '[data-tab="research"]',
    action: 'tab',
  },
  {
    id: 'research_kp',
    title: 'Knowledge Points',
    body: 'The KP counter at the top shows your current Knowledge Points and rate of accumulation. You earn KP from Schools, Universities, and the Academy. Spend it on technologies in the tree below. Higher-level technologies unlock even more powerful ones — always research from left to right in each branch.',
    target: '#kp-display',
    action: null,
  },
  {
    id: 'research_first',
    title: 'Researching Your First Technology',
    body: 'Look for tech cards with a green border — those are ones you can currently afford. Click any affordable tech to research it instantly. Start with Agricultural Methods (doubles farm output) or Tool Making (boosts Labour production). Each technology level stacks multiplicatively.',
    target: '#research-branches',
    action: null,
  },

  // ── ACADEMY ──
  {
    id: 'academy_tab',
    title: 'The Financial Academy',
    body: 'The Academy is where you learn real financial concepts and earn bonus resources for correct answers. Every question teaches genuine economics — compound interest, supply and demand, market theory, and more. Your Academy proficiency permanently boosts rewards. Click the ACADEMY tab.',
    target: '[data-tab="academy"]',
    action: 'tab',
  },
  {
    id: 'academy_question',
    title: 'Answering Questions',
    body: 'Click "Ask Me a Question" to receive a financial question. Read carefully, then click your answer. If correct, you earn the shown reward (Capital, Knowledge, or other resources). If incorrect, you see the right answer and an explanation. There is no penalty for wrong answers — learning is the point.',
    target: '#question-area',
    action: null,
  },
  {
    id: 'academy_streak',
    title: 'Streaks and Proficiency',
    body: 'Answer consecutive questions correctly to build a Streak. Your Financial Proficiency score (0–100%) grows with correct answers and scales up all Academy rewards. Higher proficiency also unlocks more advanced questions covering macroeconomics, derivatives, and global finance.',
    target: '#quiz-stats',
    action: null,
  },

  // ── MARKETS ──
  {
    id: 'markets_intro',
    title: 'The Markets — Investing for Growth',
    body: 'Once you build a Trading Post (requires 5 Markets + 5 Workshops), the MARKETS tab unlocks. There you can invest in stocks, bonds, commodities, and forex. Markets can dramatically accelerate your Capital growth — but carry real risk. A diversified portfolio across asset types is safer than concentrating in one.',
    target: '[data-tab="markets"]',
    action: 'tab',
  },
  {
    id: 'markets_types',
    title: 'Asset Classes in the Markets',
    body: 'STOCKS: fractional ownership of companies. High volatility, high long-term return. BONDS: fixed-income loans. Stable, lower return. COMMODITIES: raw materials (food, metals). Cyclical. FOREX: currency pairs. Speculative. The PORTFOLIO tab tracks your total holdings and profit/loss in real time.',
    target: '[data-tab="markets"]',
    action: null,
  },

  // ── POLICIES ──
  {
    id: 'policies_tab',
    title: 'Government Policies — Economic Doctrine',
    body: 'As your empire grows, the POLICIES tab lets you choose an economic doctrine and specific policies. These create powerful empire-wide multipliers — but some policies conflict with others. Choosing Free Market boosts capital income. Command Economy boosts production but reduces happiness.',
    target: '[data-tab="policies"]',
    action: 'tab',
  },
  {
    id: 'policies_tradeoffs',
    title: 'Real Economic Trade-offs',
    body: 'Every policy reflects a genuine economic debate. Progressive taxation raises equality but may reduce growth. Free trade boosts efficiency but harms domestic producers. These are the same debates that real governments face — and there is no universally correct answer. Your choice shapes your empire.',
    target: '#policies-body',
    action: null,
  },

  // ── WORLD ──
  {
    id: 'world_tab',
    title: 'The World Tab — Events and Diplomacy',
    body: 'The WORLD tab shows random economic events affecting your empire (droughts, booms, trade disruptions) and your diplomatic relations with other nations. Some events offer choices — read them carefully, as they have real consequences for your resources.',
    target: '[data-tab="world"]',
    action: 'tab',
  },

  // ── NEWS ──
  {
    id: 'news_column',
    title: 'The Prosperity Times',
    body: 'The right column is your empire newspaper. Every significant event — buildings constructed, technologies researched, Academy answers, market moves, and world events — appears as a headline. Scroll it to review your empire history. The more active you are, the richer the chronicle.',
    target: '#news-column',
    action: null,
  },

  // ── SAVE ──
  {
    id: 'saving',
    title: 'Saving Your Progress',
    body: 'Your progress is saved automatically every 30 seconds. You can also press the SAVE button in the header or use Ctrl+S at any time. Prosperity Empire also calculates offline earnings when you return after being away — so your empire grows even when you close the browser.',
    target: '#btn-save',
    action: null,
  },

  // ── PRESTIGE ──
  {
    id: 'prestige_hint',
    title: 'Prestige — Rebirth for Permanent Power',
    body: 'Once you reach the Advanced economic phase (very late game), the PRESTIGE tab lets you reset your empire in exchange for permanent multipliers on all future runs. Each prestige cycle makes you stronger forever. This is end-game content — focus on growing your economy first.',
    target: null,
    action: null,
  },

  // ── DONE ──
  {
    id: 'done',
    title: 'Your Empire Awaits, Chancellor',
    body: 'You now know every system in Prosperity Empire. The path forward: click for Labour, build Farms and Workshops, research technologies, answer Academy questions, and let compound growth do the rest. Remember: Knowledge is your greatest asset. Good luck building your financial civilisation!',
    target: null,
    action: null,
  },
];
