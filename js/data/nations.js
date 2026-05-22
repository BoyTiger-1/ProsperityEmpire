/* ── RIVAL NATIONS DATA ── */
const NATIONS_DATA = [
  {
    id:'ironhaven', name:'Ironhaven', flag:'⚔️',
    desc:'A militaristic industrial nation. Strong manufacturing, aggressive trade.',
    specialty:'Manufacturing', gdp:50000, relation:'neutral',
    color:'#ef4444',
    traits:['Industrial Power','Trade Competitor','Tech Innovator'],
    events:[
      { type:'tradeWar', text:'Ironhaven imposes tariffs on your exports!', effect:'-20% trade income for 60s' },
      { type:'tradeAgreement', text:'Ironhaven proposes a free trade deal!', reward:'+15% goods price for 120s' },
      { type:'techRivalry', text:'Ironhaven launches a competing research program.' },
    ],
  },
  {
    id:'verdania', name:'Verdania', flag:'🌿',
    desc:'An agrarian paradise focused on sustainable farming and green energy.',
    specialty:'Agriculture & Green Energy', gdp:35000, relation:'friendly',
    color:'#10b981',
    traits:['Green Economy','Food Exporter','Peaceful'],
    events:[
      { type:'foodTrade', text:'Verdania offers to buy your surplus food.', reward:'+500 Capital instantly' },
      { type:'greenTech', text:'Verdania shares renewable energy research!', reward:'+200 Knowledge' },
      { type:'cropDisease', text:'A crop disease from Verdania spreads to your farms.', effect:'-30% Food for 45s' },
    ],
  },
  {
    id:'goldCoast', name:'Gold Coast Confederation', flag:'💰',
    desc:'A wealthy trading nation controlling strategic sea routes.',
    specialty:'Trade & Finance', gdp:120000, relation:'neutral',
    color:'#f59e0b',
    traits:['Financial Hub','Trade Routes','Banking Power'],
    events:[
      { type:'investment', text:'Gold Coast investors offer to fund your expansion!', reward:'+2000 Capital' },
      { type:'tariff', text:'Gold Coast demands transit fees on your trade routes.', effect:'-10% Capital for 90s' },
      { type:'financialPartnership', text:'Gold Coast Bank offers a partnership deal.' },
    ],
  },
  {
    id:'techsylvania', name:'Techsylvania', flag:'💻',
    desc:'A cutting-edge tech state. First to adopt every new technology.',
    specialty:'Technology & Innovation', gdp:200000, relation:'neutral',
    color:'#3b82f6',
    traits:['Tech Leader','High KP','AI Pioneer'],
    events:[
      { type:'techLeak', text:'Techsylvania hackers steal your research data!', effect:'-500 Knowledge instantly' },
      { type:'techLicense', text:'Techsylvania offers to license advanced technology.', reward:'+1000 Knowledge' },
      { type:'techRace', text:'Techsylvania announces a Manhattan-scale research push.' },
    ],
  },
  {
    id:'stonewall', name:'Stonewall Republic', flag:'🏔️',
    desc:'A mountain nation rich in minerals and stone. Controls raw material exports.',
    specialty:'Mining & Resources', gdp:25000, relation:'hostile',
    color:'#94a3b8',
    traits:['Resource Rich','Protectionist','Mining Giant'],
    events:[
      { type:'embargo', text:'Stonewall embargoes stone and coal exports to you!', effect:'-50% Stone & Coal for 60s' },
      { type:'miningRights', text:'Stonewall grants mining rights in exchange for Capital.', cost:'1000 Capital', reward:'+50% Stone for 120s' },
      { type:'tradeNormalization', text:'Stonewall agrees to normalize trade relations.' },
    ],
  },
];
