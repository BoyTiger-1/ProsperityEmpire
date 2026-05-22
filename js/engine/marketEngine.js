/* ── MARKET ENGINE ── Price simulation, buy/sell logic */
const MarketEngine = {

  // Initialize price histories
  init() {
    for (const stock of MARKET_DATA.stocks) {
      stock.currentPrice = stock.basePrice;
      stock.history = Array(20).fill(stock.basePrice);
    }
    for (const commodity of MARKET_DATA.commodities) {
      commodity.currentPrice = commodity.basePrice;
      commodity.history = Array(20).fill(commodity.basePrice);
    }
  },

  // Simulate price movements (called every MARKET_UPDATE ms)
  update() {
    for (const stock of MARKET_DATA.stocks) {
      const change = (Math.random() - 0.48) * stock.volatility + stock.trend;
      stock.currentPrice = Math.max(stock.basePrice * 0.1, stock.currentPrice * (1 + change));
      stock.history.push(stock.currentPrice);
      if (stock.history.length > 40) stock.history.shift();
    }
    for (const commodity of MARKET_DATA.commodities) {
      const change = (Math.random() - 0.48) * commodity.volatility + commodity.trend;
      commodity.currentPrice = Math.max(commodity.basePrice * 0.05, commodity.currentPrice * (1 + change));
      commodity.history.push(commodity.currentPrice);
      if (commodity.history.length > 40) commodity.history.shift();
    }
    // Forex drift
    for (const fx of MARKET_DATA.forex) {
      if (fx.id === 'usd') continue;
      const change = (Math.random() - 0.5) * fx.volatility;
      fx.rate = Math.max(fx.rate * 0.5, Math.min(fx.rate * 2, fx.rate * (1 + change)));
    }
    // Passive income from portfolio (dividends)
    this.payDividends();
    if (window.MarketsUI) MarketsUI.render();
  },

  payDividends() {
    for (const [id, pos] of Object.entries(GS.portfolio.stocks)) {
      const stock = MARKET_DATA.stocks.find(s => s.id === id);
      if (!stock || !pos.shares) continue;
      const dividend = stock.currentPrice * stock.dividendYield * pos.shares / 365 * (CFG.MARKET_UPDATE / 1000);
      const withReturn = dividend * GS.multipliers.investmentReturns;
      GS.resources.capital.amount += withReturn;
      GS.stats.totalInvestmentProfit += withReturn;
    }
  },

  buyStock(stockId, shares) {
    if (!this.isMarketUnlocked()) return false;
    const stock = MARKET_DATA.stocks.find(s => s.id === stockId);
    if (!stock) return false;
    shares = Math.max(0.01, shares);
    const cost = stock.currentPrice * shares;
    if (!Production.canAfford({ capital: cost })) {
      Notifications.show('💸 Not Enough Capital', FMT.currency(cost) + ' required.', 'error');
      return false;
    }
    Production.deductCost({ capital: cost });
    if (!GS.portfolio.stocks[stockId]) GS.portfolio.stocks[stockId] = { shares:0, avgPrice:0 };
    const pos = GS.portfolio.stocks[stockId];
    const totalCost = pos.shares * pos.avgPrice + cost;
    pos.shares += shares;
    pos.avgPrice = totalCost / pos.shares;
    GS.stats.totalTrades++;
    Notifications.show(`📈 Bought ${FMT.num(shares)} × ${stock.name}`, `Spent ${FMT.currency(cost)}`, 'success');
    NewsEngine.add('market', `Purchased ${FMT.num(shares, 2)} shares of ${stock.name}`, `Cost: ${FMT.currency(cost)}`);
    AchievementEngine.check();
    return true;
  },

  sellStock(stockId, shares) {
    if (!this.isMarketUnlocked()) return false;
    const stock = MARKET_DATA.stocks.find(s => s.id === stockId);
    const pos = GS.portfolio.stocks[stockId];
    if (!stock || !pos || !pos.shares) {
      Notifications.show('❌ No Position', 'You don\'t own this stock.', 'error');
      return false;
    }
    shares = Math.min(shares, pos.shares);
    const proceeds = stock.currentPrice * shares * GS.multipliers.investmentReturns;
    const cost = pos.avgPrice * shares;
    const profit = proceeds - cost;
    GS.resources.capital.amount += proceeds;
    GS.stats.totalCapitalEarned += proceeds;
    GS.stats.totalInvestmentProfit += profit;
    GS.stats.totalTrades++;
    if (profit > 0) GS.stats.profitableTrades++;
    pos.shares -= shares;
    if (pos.shares < 0.001) delete GS.portfolio.stocks[stockId];
    Notifications.show(`📉 Sold ${FMT.num(shares)} × ${stock.name}`, `Earned ${FMT.currency(proceeds)} (P&L: ${profit >= 0 ? '+' : ''}${FMT.currency(profit)})`, profit >= 0 ? 'success' : 'error');
    NewsEngine.add('market', `Sold ${FMT.num(shares, 2)} shares of ${stock.name}`, `P&L: ${profit >= 0 ? '+' : ''}${FMT.currency(profit)}`);
    AchievementEngine.check();
    return true;
  },

  buyCommodity(commId, units) {
    if (!this.isMarketUnlocked()) return false;
    const comm = MARKET_DATA.commodities.find(c => c.id === commId);
    if (!comm) return false;
    units = Math.max(0.001, units);
    const cost = comm.currentPrice * units;
    if (!Production.canAfford({ capital: cost })) {
      Notifications.show('💸 Not Enough Capital', FMT.currency(cost) + ' required.', 'error');
      return false;
    }
    Production.deductCost({ capital: cost });
    if (!GS.portfolio.commodities[commId]) GS.portfolio.commodities[commId] = { units:0, avgPrice:0 };
    const pos = GS.portfolio.commodities[commId];
    const totalCost = pos.units * pos.avgPrice + cost;
    pos.units += units;
    pos.avgPrice = totalCost / pos.units;
    GS.stats.totalTrades++;
    Notifications.show(`⛏️ Bought ${FMT.num(units)} ${comm.unit} of ${comm.name}`, FMT.currency(cost), 'success');
    AchievementEngine.check();
    return true;
  },

  sellCommodity(commId, units) {
    const comm = MARKET_DATA.commodities.find(c => c.id === commId);
    const pos = GS.portfolio.commodities[commId];
    if (!comm || !pos || !pos.units) {
      Notifications.show('❌ No Position', 'You don\'t hold this commodity.', 'error');
      return false;
    }
    units = Math.min(units, pos.units);
    const proceeds = comm.currentPrice * units * GS.multipliers.investmentReturns;
    const cost = pos.avgPrice * units;
    const profit = proceeds - cost;
    GS.resources.capital.amount += proceeds;
    GS.stats.totalCapitalEarned += proceeds;
    GS.stats.totalInvestmentProfit += profit;
    GS.stats.totalTrades++;
    if (profit > 0) GS.stats.profitableTrades++;
    pos.units -= units;
    if (pos.units < 0.0001) delete GS.portfolio.commodities[commId];
    Notifications.show(`💰 Sold ${comm.name}`, `Earned ${FMT.currency(proceeds)}`, profit >= 0 ? 'success' : 'error');
    AchievementEngine.check();
    return true;
  },

  isMarketUnlocked() {
    return (GS.buildings.tradingPost || 0) >= 1 || (GS.buildings.bank || 0) >= 1 || (GS.buildings.stockExchange || 0) >= 1;
  },

  // Get total portfolio value
  getPortfolioValue() {
    let total = 0;
    for (const [id, pos] of Object.entries(GS.portfolio.stocks)) {
      const stock = MARKET_DATA.stocks.find(s => s.id === id);
      if (stock) total += stock.currentPrice * pos.shares;
    }
    for (const [id, pos] of Object.entries(GS.portfolio.commodities)) {
      const comm = MARKET_DATA.commodities.find(c => c.id === id);
      if (comm) total += comm.currentPrice * pos.units;
    }
    return total;
  },
};
