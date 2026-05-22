/* ── MARKET DATA — Stocks, Bonds, Commodities, Forex ── */

const MARKET_DATA = {

  stocks: [
    {
      id:'agriCorp', name:'AgriCorp Holdings', ticker:'AGRI', sector:'Agriculture',
      basePrice:45, volatility:0.03, trend:0.001, dividendYield:0.03,
      desc:'World\'s largest agricultural conglomerate. Stable, reliable dividends.',
      peRange:[15,25], history:[],
    },
    {
      id:'ironWorks', name:'Iron Works Industrial', ticker:'IWI', sector:'Manufacturing',
      basePrice:78, volatility:0.05, trend:0.002, dividendYield:0.015,
      desc:'Heavy industrial manufacturer. Cyclical — booms in expansion, struggles in recession.',
      peRange:[10,20], history:[],
    },
    {
      id:'powerGrid', name:'PowerGrid Utilities', ticker:'PWGR', sector:'Energy',
      basePrice:120, volatility:0.02, trend:0.0005, dividendYield:0.045,
      desc:'Regulated utility. Very stable price, excellent dividends.',
      peRange:[18,28], history:[],
    },
    {
      id:'tradeWinds', name:'TradeWinds Commerce', ticker:'TRDW', sector:'Commerce',
      basePrice:95, volatility:0.04, trend:0.003, dividendYield:0.01,
      desc:'Global trading company. High growth potential, low current yield.',
      peRange:[20,40], history:[],
    },
    {
      id:'firstBank', name:'First Imperial Bank', ticker:'FIB', sector:'Finance',
      basePrice:210, volatility:0.04, trend:0.002, dividendYield:0.02,
      desc:'Largest bank in the empire. Leveraged to interest rate changes.',
      peRange:[10,16], history:[],
    },
    {
      id:'techVentures', name:'TechVentures Inc.', ticker:'TECH', sector:'Technology',
      basePrice:340, volatility:0.08, trend:0.006, dividendYield:0.001,
      desc:'High-growth tech startup portfolio. High risk, high reward.',
      peRange:[40,100], history:[],
    },
    {
      id:'greenEnergy', name:'GreenEnergy Corp', ticker:'GRNE', sector:'Renewables',
      basePrice:155, volatility:0.06, trend:0.004, dividendYield:0.008,
      desc:'Renewable energy leader. ESG premium. Growing policy tailwinds.',
      peRange:[30,60], history:[],
    },
    {
      id:'globalPharm', name:'GlobalPharma Ltd', ticker:'GPHM', sector:'Healthcare',
      basePrice:185, volatility:0.035, trend:0.002, dividendYield:0.025,
      desc:'Defensive healthcare giant. Low correlation with economic cycles.',
      peRange:[18,30], history:[],
    },
  ],

  bonds: [
    {
      id:'govBond1yr', name:'1-Year Government Bond', type:'government',
      maturity:1, yield:0.02, price:100, risk:0.01,
      desc:'Short-term sovereign debt. Near risk-free. Low return.',
    },
    {
      id:'govBond5yr', name:'5-Year Government Bond', type:'government',
      maturity:5, yield:0.035, price:100, risk:0.02,
      desc:'Medium-term sovereign debt. Moderate yield, very safe.',
    },
    {
      id:'govBond10yr', name:'10-Year Treasury Bond', type:'government',
      maturity:10, yield:0.045, price:100, risk:0.03,
      desc:'Benchmark 10-year bond. Standard risk-free rate proxy.',
    },
    {
      id:'corpBondIG', name:'Investment Grade Corporate', type:'corporate',
      maturity:5, yield:0.065, price:100, risk:0.08,
      desc:'High-quality corporate bond. Extra yield over government bonds.',
    },
    {
      id:'corpBondHY', name:'High-Yield ("Junk") Bond', type:'corporate',
      maturity:3, yield:0.12, price:95, risk:0.25,
      desc:'Below investment-grade. High yield compensates for default risk.',
    },
    {
      id:'inflationLinked', name:'Inflation-Linked Bond', type:'government',
      maturity:5, yield:0.01, price:100, risk:0.02,
      desc:'Principal adjusts with inflation. Protects real purchasing power.',
    },
  ],

  commodities: [
    {
      id:'gold', name:'Gold', emoji:'🥇', unit:'oz',
      basePrice:1800, volatility:0.02, trend:0.0005,
      desc:'Safe-haven asset. Performs well during uncertainty and inflation.',
      history:[],
    },
    {
      id:'oil', name:'Crude Oil', emoji:'🛢️', unit:'barrel',
      basePrice:80, volatility:0.06, trend:0.001,
      desc:'Highly cyclical energy commodity. OPEC supply greatly influences price.',
      history:[],
    },
    {
      id:'wheat', name:'Wheat', emoji:'🌾', unit:'bushel',
      basePrice:7, volatility:0.05, trend:0.0,
      desc:'Essential food commodity. Price affected by weather and geopolitics.',
      history:[],
    },
    {
      id:'copper', name:'Copper', emoji:'🔶', unit:'lb',
      basePrice:4.2, volatility:0.04, trend:0.001,
      desc:'"Dr. Copper" — used as an economic indicator. Rises with industrial growth.',
      history:[],
    },
    {
      id:'bitcoin', name:'Bitcoin', emoji:'₿', unit:'BTC',
      basePrice:42000, volatility:0.15, trend:0.003,
      desc:'The original cryptocurrency. Extreme volatility. Finite supply of 21M.',
      history:[],
    },
    {
      id:'naturalGas', name:'Natural Gas', emoji:'💨', unit:'MMBtu',
      basePrice:3.5, volatility:0.08, trend:0.0,
      desc:'Seasonal energy commodity. Volatile in winter months.',
      history:[],
    },
  ],

  forex: [
    { id:'usd', name:'US Dollar', symbol:'$', emoji:'🇺🇸', rate:1.0, volatility:0 },
    { id:'eur', name:'Euro', symbol:'€', emoji:'🇪🇺', rate:1.08, volatility:0.004 },
    { id:'gbp', name:'British Pound', symbol:'£', emoji:'🇬🇧', rate:1.26, volatility:0.005 },
    { id:'jpy', name:'Japanese Yen', symbol:'¥', emoji:'🇯🇵', rate:0.0067, volatility:0.003 },
    { id:'cny', name:'Chinese Yuan', symbol:'¥', emoji:'🇨🇳', rate:0.138, volatility:0.002 },
    { id:'brl', name:'Brazilian Real', symbol:'R$', emoji:'🇧🇷', rate:0.19, volatility:0.008 },
  ],
};

// Portfolio tracking
const PORTFOLIO = {
  stocks: {},    // { assetId: { shares, avgPrice } }
  bonds: {},     // { assetId: { units, purchaseYield } }
  commodities:{},// { assetId: { units, avgPrice } }
  forex: {},     // { assetId: { amount, rate } }
};
