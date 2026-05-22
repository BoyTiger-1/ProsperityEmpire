/* ── MARKETS TAB UI ── */
const MarketsUI = {
  init() {
    Tabs.register('markets', () => this.render());
    document.querySelectorAll('.mkt-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mkt-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        GS.ui.activeMarket = btn.dataset.mkt;
        this.render();
      });
    });
  },

  render() {
    const body = document.getElementById('markets-body');
    const market = GS.ui.activeMarket;
    const unlocked = MarketEngine.isMarketUnlocked();

    if (!unlocked && market !== 'portfolio') {
      body.innerHTML = `<div class="market-locked">
        <div class="empty-icon">🔒</div>
        <h3>Market Locked</h3>
        <p>Build a <strong>Trading Post</strong> (5 Markets + 5 Workshops) to unlock the markets.</p>
      </div>`;
      return;
    }

    switch(market) {
      case 'stocks':      this.renderStocks(body); break;
      case 'bonds':       this.renderBonds(body); break;
      case 'commodities': this.renderCommodities(body); break;
      case 'forex':       this.renderForex(body); break;
      case 'portfolio':   this.renderPortfolio(body); break;
    }
  },

  renderStocks(body) {
    body.innerHTML = `<div class="market-grid">${
      MARKET_DATA.stocks.map(s => {
        const prev = s.history[s.history.length-2] || s.currentPrice;
        const change = (s.currentPrice - prev) / prev;
        const changePct = (change * 100).toFixed(2);
        const updown = change >= 0 ? 'up' : 'down';
        const chartHTML = this.miniChart(s.history, updown === 'up' ? '#10b981' : '#ef4444');
        const pos = GS.portfolio.stocks[s.id];
        const posText = pos ? `<div style="font-size:11px;color:var(--txt3)">Held: ${FMT.num(pos.shares)} @ ${FMT.num(pos.avgPrice)}</div>` : '';

        return `<div class="asset-card">
          <div class="asset-header">
            <div>
              <div class="asset-name">${s.name}</div>
              <div class="asset-ticker">${s.ticker} • ${s.sector}</div>
              ${posText}
            </div>
            <div style="text-align:right">
              <div class="asset-price">${FMT.num(s.currentPrice)}</div>
              <div class="asset-change ${updown}">${change>=0?'+':''}${changePct}%</div>
            </div>
          </div>
          <div class="price-chart">${chartHTML}</div>
          <div style="font-size:11px;color:var(--txt2);margin-bottom:8px">${s.desc}</div>
          <div style="font-size:11px;color:var(--txt3);margin-bottom:8px">Dividend Yield: ${(s.dividendYield*100).toFixed(1)}%</div>
          <div class="asset-actions">
            <input class="buy-input" type="number" value="1" min="0.01" step="1" id="stock-qty-${s.id}" placeholder="Shares">
            <button class="btn btn-primary" style="padding:6px 10px;font-size:12px" onclick="MarketsUI.tradeStock('${s.id}',true)">Buy</button>
            <button class="btn btn-danger" style="padding:6px 10px;font-size:12px" onclick="MarketsUI.tradeStock('${s.id}',false)">Sell</button>
          </div>
        </div>`;
      }).join('')
    }</div>`;
  },

  tradeStock(id, isBuy) {
    const inputEl = document.getElementById('stock-qty-' + id);
    const qty = parseFloat(inputEl?.value || 1);
    if (isBuy) MarketEngine.buyStock(id, qty);
    else MarketEngine.sellStock(id, qty);
    this.render();
  },

  renderCommodities(body) {
    body.innerHTML = `<div class="market-grid">${
      MARKET_DATA.commodities.map(c => {
        const prev = c.history[c.history.length-2] || c.currentPrice;
        const change = (c.currentPrice - prev) / prev;
        const changePct = (change * 100).toFixed(2);
        const updown = change >= 0 ? 'up' : 'down';
        const chartHTML = this.miniChart(c.history, updown === 'up' ? '#10b981' : '#ef4444');
        const pos = GS.portfolio.commodities[c.id];
        const posText = pos ? `<div style="font-size:11px;color:var(--txt3)">Held: ${FMT.num(pos.units)} ${c.unit}</div>` : '';

        return `<div class="asset-card">
          <div class="asset-header">
            <div>
              <div class="asset-name">${c.emoji} ${c.name}</div>
              <div class="asset-ticker">per ${c.unit}</div>
              ${posText}
            </div>
            <div style="text-align:right">
              <div class="asset-price">${FMT.num(c.currentPrice)}</div>
              <div class="asset-change ${updown}">${change>=0?'+':''}${changePct}%</div>
            </div>
          </div>
          <div class="price-chart">${chartHTML}</div>
          <div style="font-size:11px;color:var(--txt2);margin-bottom:8px">${c.desc}</div>
          <div class="asset-actions">
            <input class="buy-input" type="number" value="1" min="0.001" step="1" id="comm-qty-${c.id}" placeholder="Units">
            <button class="btn btn-primary" style="padding:6px 10px;font-size:12px" onclick="MarketsUI.tradeCommodity('${c.id}',true)">Buy</button>
            <button class="btn btn-danger" style="padding:6px 10px;font-size:12px" onclick="MarketsUI.tradeCommodity('${c.id}',false)">Sell</button>
          </div>
        </div>`;
      }).join('')
    }</div>`;
  },

  tradeCommodity(id, isBuy) {
    const inputEl = document.getElementById('comm-qty-' + id);
    const qty = parseFloat(inputEl?.value || 1);
    if (isBuy) MarketEngine.buyCommodity(id, qty);
    else MarketEngine.sellCommodity(id, qty);
    this.render();
  },

  renderBonds(body) {
    body.innerHTML = `<div class="market-grid">${
      MARKET_DATA.bonds.map(b => `
        <div class="asset-card">
          <div class="asset-header">
            <div>
              <div class="asset-name">${b.name}</div>
              <div class="asset-ticker">${b.type} • ${b.maturity}yr maturity</div>
            </div>
            <div style="text-align:right">
              <div class="asset-price">${(b.yield * 100).toFixed(2)}% yield</div>
              <div class="asset-change" style="color:var(--txt2)">Risk: ${(b.risk * 100).toFixed(0)}%</div>
            </div>
          </div>
          <div style="font-size:11px;color:var(--txt2);margin:8px 0">${b.desc}</div>
          <div style="font-size:11px;color:var(--txt3)">Estimated return/yr on 1,000C: <strong class="green">${FMT.num(1000*b.yield*(1-b.risk))}C</strong></div>
          <div class="asset-actions" style="margin-top:10px">
            <input class="buy-input" type="number" value="1000" min="100" step="100" id="bond-qty-${b.id}" placeholder="Capital (face value)">
            <button class="btn btn-primary" style="padding:6px 10px;font-size:12px" onclick="MarketsUI.buyBond('${b.id}')">Buy</button>
          </div>
        </div>`).join('')
    }</div>`;
  },

  buyBond(bondId) {
    const bond = MARKET_DATA.bonds.find(b => b.id === bondId);
    if (!bond) return;
    const inputEl = document.getElementById('bond-qty-' + bondId);
    const amount = parseFloat(inputEl?.value || 1000);
    if (!Production.canAfford({ capital: amount })) {
      Notifications.show('💸 Not enough Capital', FMT.currency(amount) + ' required.', 'error');
      return;
    }
    Production.deductCost({ capital: amount });
    // Bonds pay out over time — simplified: instant return
    const netReturn = amount * bond.yield * (1 - (Math.random() < bond.risk ? 1 : 0));
    setTimeout(() => {
      GS.resources.capital.amount += amount + netReturn;
      GS.stats.totalCapitalEarned += netReturn;
      GS.stats.totalTrades++;
      GS.stats.profitableTrades++;
      Notifications.show(`📋 Bond Matured: ${bond.name}`, `Returned ${FMT.currency(amount + netReturn)}`, 'gold');
      AchievementEngine.check();
    }, bond.maturity * 10000);
    Notifications.show(`📋 Purchased Bond`, `${bond.name} — ${FMT.currency(amount)} invested`, 'success');
    GS.stats.totalTrades++;
    AchievementEngine.check();
  },

  renderForex(body) {
    body.innerHTML = `<div class="market-grid">${
      MARKET_DATA.forex.map(fx => `
        <div class="asset-card">
          <div class="asset-header">
            <div>
              <div class="asset-name">${fx.emoji} ${fx.name}</div>
              <div class="asset-ticker">${fx.symbol} / Capital</div>
            </div>
            <div style="text-align:right">
              <div class="asset-price">${fx.rate.toFixed(4)}</div>
            </div>
          </div>
          <div style="font-size:11px;color:var(--txt2);margin:8px 0">
            Convert: 1,000 Capital = ${FMT.num(1000 * fx.rate)} ${fx.symbol}
          </div>
        </div>`).join('')
    }</div>`;
  },

  renderPortfolio(body) {
    const portVal = MarketEngine.getPortfolioValue();
    let rows = '';
    for (const [id, pos] of Object.entries(GS.portfolio.stocks)) {
      const s = MARKET_DATA.stocks.find(x => x.id === id);
      if (!s || !pos.shares) continue;
      const cv = s.currentPrice * pos.shares;
      const cost = pos.avgPrice * pos.shares;
      const pnl = cv - cost;
      rows += `<tr>
        <td>${s.name}</td><td>${s.ticker}</td>
        <td>${FMT.num(pos.shares)}</td>
        <td>${FMT.num(pos.avgPrice)}</td>
        <td>${FMT.num(s.currentPrice)}</td>
        <td style="color:${pnl>=0?'var(--green)':'var(--red)'}">${pnl>=0?'+':''}${FMT.num(pnl)}</td>
        <td><button class="btn btn-danger" style="padding:4px 8px;font-size:11px" onclick="MarketEngine.sellStock('${id}',${pos.shares});MarketsUI.render()">Sell All</button></td>
      </tr>`;
    }
    for (const [id, pos] of Object.entries(GS.portfolio.commodities)) {
      const c = MARKET_DATA.commodities.find(x => x.id === id);
      if (!c || !pos.units) continue;
      const cv = c.currentPrice * pos.units;
      const cost = pos.avgPrice * pos.units;
      const pnl = cv - cost;
      rows += `<tr>
        <td>${c.name}</td><td>COMM</td>
        <td>${FMT.num(pos.units)}</td>
        <td>${FMT.num(pos.avgPrice)}</td>
        <td>${FMT.num(c.currentPrice)}</td>
        <td style="color:${pnl>=0?'var(--green)':'var(--red)'}">${pnl>=0?'+':''}${FMT.num(pnl)}</td>
        <td><button class="btn btn-danger" style="padding:4px 8px;font-size:11px" onclick="MarketEngine.sellCommodity('${id}',${pos.units});MarketsUI.render()">Sell All</button></td>
      </tr>`;
    }

    body.innerHTML = `
      <div class="panel" style="margin-bottom:12px">
        <div style="display:flex;gap:24px;align-items:center">
          <div>
            <div style="font-size:12px;color:var(--txt3)">Total Portfolio Value</div>
            <div class="capital-big">${FMT.num(portVal)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--txt3)">Total Investment Profit</div>
            <div style="font-size:20px;font-weight:700;color:var(--green)">${FMT.num(GS.stats.totalInvestmentProfit)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--txt3)">Total Trades</div>
            <div style="font-size:20px;font-weight:700">${GS.stats.totalTrades}</div>
          </div>
        </div>
      </div>
      ${rows ? `<div class="panel">
        <div class="panel-title">💼 Open Positions</div>
        <table class="portfolio-table">
          <thead><tr><th>Asset</th><th>Ticker</th><th>Qty</th><th>Avg Cost</th><th>Current</th><th>P&L</th><th>Action</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>` : '<div class="empty-state"><div class="empty-icon">💼</div><p>No open positions. Buy stocks or commodities to start investing!</p></div>'}`;
  },

  miniChart(history, color) {
    if (!history || history.length < 2) return '';
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    return history.map(v => {
      const h = Math.max(4, ((v - min) / range) * 42);
      return `<div class="price-bar" style="height:${h}px;background:${color}"></div>`;
    }).join('');
  },
};
