/* ── EMPIRE TAB UI ── */
const EmpireUI = {
  _comboCount: 0,
  _comboTimer: null,
  _activeBldId: null,

  init() {
    // 3D full-screen city
    if (typeof THREE !== 'undefined' && typeof CityScene !== 'undefined') {
      CityScene.init('city-3d-container');
    }

    // City rename
    const renameBtn   = document.getElementById('btn-rename');
    const renameInput = document.getElementById('rename-input');
    const nameEl      = document.getElementById('empire-name');
    if (renameBtn) {
      renameBtn.addEventListener('click', () => {
        renameInput.value = empireName;
        renameInput.style.display = 'inline-block';
        nameEl.style.display = 'none';
        renameBtn.style.display = 'none';
        renameInput.focus(); renameInput.select();
      });
      const _commit = () => {
        const v = renameInput.value.trim();
        if (v) { empireName = v; nameEl.textContent = v; SaveEngine.save(); }
        renameInput.style.display = 'none';
        nameEl.style.display = '';
        renameBtn.style.display = '';
      };
      renameInput.addEventListener('blur', _commit);
      renameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') e.target.blur();
        if (e.key === 'Escape') { renameInput.value = empireName; e.target.blur(); }
      });
    }

    // Building panel close
    document.getElementById('bp-close')?.addEventListener('click', () => {
      this.hideBuildingPanel();
      if (typeof CityScene !== 'undefined') CityScene.clearSelection();
    });

    // Empire info panel toggle
    const fabBtn    = document.getElementById('btn-empire-info');
    const infoPanel = document.getElementById('empire-info-panel');
    const closeBtn  = document.getElementById('btn-empire-info-close');
    if (fabBtn && infoPanel) {
      fabBtn.addEventListener('click', () => {
        const open = infoPanel.classList.toggle('eip-open');
        if (open) {
          this.renderProduction(); this.renderStats();
          this.renderAdvisors();  this.renderMilestones();
          if (typeof NewsUI !== 'undefined') NewsUI.render();
        }
      });
    }
    if (closeBtn && infoPanel) {
      closeBtn.addEventListener('click', () => infoPanel.classList.remove('eip-open'));
    }

    // Building panel buy buttons
    document.getElementById('bp-buy1')?.addEventListener('click',  () => this._buyFromPanel(1));
    document.getElementById('bp-buy10')?.addEventListener('click', () => this._buyFromPanel(10));

    Tabs.register('empire', () => this.render());
  },

  _buyFromPanel(qty) {
    if (!this._activeBldId) return;
    for (let i = 0; i < qty; i++) BuildingEngine.buy(this._activeBldId);
    this.showBuildingPanel(this._activeBldId);
  },

  // ── Called by CityScene when a 3D building is clicked ──
  showBuildingPanel(bldId) {
    this._activeBldId = bldId;
    const def = BUILDINGS[bldId];
    if (!def) return;

    const panel = document.getElementById('building-panel');
    if (!panel) return;

    const count  = GS.buildings[bldId] || 0;
    const cost1  = BuildingEngine.getCost(bldId, 1);
    const cost10 = BuildingEngine.getCost(bldId, 10);
    const can1   = BuildingEngine.isUnlocked(bldId) && Production.canAfford(cost1);
    const can10  = BuildingEngine.isUnlocked(bldId) && Production.canAfford(cost10);
    const tierNames = ['','I','II','III','IV'];

    document.getElementById('bp-emoji').textContent = def.emoji;
    document.getElementById('bp-name').textContent  = def.name;
    document.getElementById('bp-tier').textContent  = `TIER ${tierNames[def.tier] || def.tier}`;
    document.getElementById('bp-count').textContent = `×${count}`;

    const hintEl = document.getElementById('bp-hint');
    if (hintEl) hintEl.style.display = 'none';

    const prodLines = [
      ...Object.entries(def.produces || {}).map(([r, v]) =>
        `<span style="color:var(--green3)">▲</span> ${RESOURCE_META[r]?.emoji||''} +${v}/s ${RESOURCE_META[r]?.name||r}`),
      ...Object.entries(def.consumes || {}).map(([r, v]) =>
        `<span style="color:var(--red3)">▼</span> ${RESOURCE_META[r]?.emoji||''} −${v}/s ${RESOURCE_META[r]?.name||r}`),
    ];
    document.getElementById('bp-production').innerHTML =
      prodLines.join('<br>') || '<span style="color:var(--txt4)">No production</span>';

    document.getElementById('bp-cost').innerHTML = Object.entries(cost1).map(([res, amt]) => {
      const has = (GS.resources[res]?.amount || 0) >= amt;
      return `<span class="cost-tag ${has?'can-afford':'cant-afford'}">${RESOURCE_META[res]?.emoji||'📦'} ${FMT.num(amt)}</span>`;
    }).join('');

    const btn1  = document.getElementById('bp-buy1');
    const btn10 = document.getElementById('bp-buy10');
    if (btn1)  { btn1.disabled  = !can1;  btn1.textContent  = 'BUY ×1'; }
    if (btn10) { btn10.disabled = !can10; btn10.textContent = 'BUY ×10'; }

    const descEl = document.getElementById('bp-desc');
    if (descEl) descEl.textContent = def.desc || '';

    panel.classList.add('bp-open');
  },

  hideBuildingPanel() {
    this._activeBldId = null;
    const panel = document.getElementById('building-panel');
    if (panel) panel.classList.remove('bp-open');
    const hintEl = document.getElementById('bp-hint');
    if (hintEl) hintEl.style.display = '';
  },

  // ── Labour click (called by CityScene on empty ground click) ──
  _handleClick(e) {
    const now = Date.now();
    const timeSinceLast = now - (GS.lastClickTime || 0);

    if (timeSinceLast < 600) {
      this._comboCount = Math.min((this._comboCount || 0) + 1, 20);
    } else {
      this._comboCount = 1;
    }
    GS.lastClickTime = now;

    const comboMult = 1 + (this._comboCount - 1) * 0.1;
    const base  = (GS.clickPower || 1) * (GS.prestige.permanentMultiplier || 1) * (GS.multipliers.clickPower || 1);
    const labor = base * comboMult;

    GS.resources.labor.amount += labor;
    GS.stats.totalClicks++;
    this._spawnFloat(e, '+' + FMT.num(labor, 1) + ' Labor');

    clearTimeout(this._comboTimer);
    const display = document.getElementById('combo-display');
    if (display) {
      if (this._comboCount >= 3) {
        display.textContent = `×${comboMult.toFixed(1)} COMBO! (${this._comboCount})`;
        display.style.opacity = '1';
      } else {
        display.style.opacity = '0';
      }
      this._comboTimer = setTimeout(() => {
        display.style.opacity = '0';
        this._comboCount = 0;
      }, 800);
    }

    AchievementEngine.check();
  },

  _spawnFloat(e, text) {
    const zone = document.getElementById('click-floats');
    if (!zone) return;
    const el = document.createElement('div');
    el.className = 'click-float';
    el.textContent = text;
    const cx = (e && e.clientX) || window.innerWidth * 0.5;
    const cy = (e && e.clientY) || window.innerHeight * 0.5;
    el.style.left = (cx - 20 + (Math.random()-0.5)*60) + 'px';
    el.style.top  = (cy - 20 + (Math.random()-0.5)*30) + 'px';
    zone.appendChild(el);
    setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 900);
  },

  renderHeader() {
    const container = document.getElementById('hdr-resources');
    if (!container) return;
    const showRes = ['food','goods','capital','knowledge','influence'];
    container.innerHTML = showRes.map(id => {
      const r    = GS.resources[id];
      const meta = RESOURCE_META[id];
      const rateStr   = FMT.rate(r.perSec);
      const rateClass = r.perSec < 0 ? 'neg' : '';
      return `<div class="hdr-res">
        <span class="hdr-res-icon">${meta.emoji}</span>
        <span>
          <span class="hdr-res-val">${FMT.num(r.amount)}</span>
          <span class="hdr-res-rate ${rateClass}"> ${rateStr}</span>
        </span>
      </div>`;
    }).join('');

    document.getElementById('hdr-time').textContent = FMT.playtime(Date.now() - GS.session.startTime);
    this._updateTicker();

    // Keep building panel costs live
    if (this._activeBldId) this.showBuildingPanel(this._activeBldId);
  },

  _updateTicker() {
    const inner = document.getElementById('ticker-inner');
    if (!inner) return;
    const items = [
      `CAPITAL ${FMT.rate(GS.resources.capital.perSec)}`,
      `LABOUR ${FMT.num(GS.resources.labor.amount, 0)}`,
      `KNOWLEDGE ${FMT.num(GS.resources.knowledge.amount, 0)}`,
      `POPULATION ${FMT.num(GS.population, 0)}`,
      `HAPPINESS ${GS.happiness.toFixed(0)}%`,
      `PHASE: ${PHASE_LABELS[GS.phase]}`,
      `BUILDINGS: ${Object.values(GS.buildings).reduce((a,v)=>a+v,0)}`,
      `TECHS: ${Object.keys(GS.techs).length}`,
    ];
    if (typeof MarketEngine !== 'undefined' && MarketEngine.isMarketUnlocked()) {
      const portVal = MarketEngine.getPortfolioValue();
      if (portVal > 0) items.push(`PORTFOLIO: ${FMT.currency(portVal)}`);
    }
    inner.textContent = items.join('   ◆   ');
  },

  renderResourcePanel() {
    const panel = document.getElementById('resource-panel');
    if (!panel) return;
    panel.innerHTML = RESOURCE_ORDER.map(id => {
      const r    = GS.resources[id];
      const meta = RESOURCE_META[id];
      if (r.amount < 0.001 && r.perSec === 0 && id !== 'capital') return '';
      const rateStr   = FMT.rate(r.perSec);
      const rateClass = r.perSec < 0 ? 'neg' : '';
      const pct = Math.min(100, (r.amount / Math.max(1, r.amount + 100)) * 100);
      return `<div class="res-row">
        <span class="res-icon">${meta.emoji}</span>
        <div class="res-info">
          <div class="res-name">${meta.name}</div>
          <div class="res-amounts">
            <span class="res-val">${FMT.num(r.amount)}</span>
            <span class="res-rate ${rateClass}">${rateStr}</span>
          </div>
          <div class="res-bar-wrap"><div class="res-bar-fill" style="background:${r.color};width:${pct}%"></div></div>
        </div>
      </div>`;
    }).filter(Boolean).join('');
  },

  renderProduction() {
    const list = document.getElementById('production-list');
    if (!list) return;
    const rows = RESOURCE_ORDER.map(id => {
      const r = GS.resources[id];
      if (Math.abs(r.perSec) < 0.0001) return null;
      const cls  = r.perSec >= 0 ? 'pos' : 'neg';
      const meta = RESOURCE_META[id];
      return `<div class="prod-row">
        <span class="prod-label">${meta.emoji} ${meta.name}</span>
        <span class="prod-value ${cls}">${FMT.rate(r.perSec)}</span>
      </div>`;
    }).filter(Boolean);
    list.innerHTML = rows.length
      ? rows.join('')
      : '<div class="muted-note">Build structures to generate resources.</div>';
  },

  renderStats() {
    const list = document.getElementById('stats-list');
    if (!list) return;
    const bldCount = Object.values(GS.buildings).reduce((a,v)=>a+v,0);
    const portVal  = MarketEngine.getPortfolioValue();
    list.innerHTML = [
      ['Empire Name',          empireName],
      ['Economic Phase',       PHASE_LABELS[GS.phase]],
      ['Empire Age',           FMT.playtime(GS.session.empireAge * 1000)],
      ['Population',           FMT.num(GS.population,0) + ' / ' + FMT.num(GS.maxPopulation,0)],
      ['Happiness',            GS.happiness.toFixed(0) + '%'],
      ['Tax Rate',             (GS.taxRate*100).toFixed(0) + '%'],
      ['Total Capital Earned', FMT.currency(GS.stats.totalCapitalEarned)],
      ['Buildings Owned',      FMT.num(bldCount,0)],
      ['Technologies',         Object.keys(GS.techs).length],
      ['Academy Score',        (GS.learning.totalCorrect||0) + ' / ' + (GS.learning.totalAnswered||0)],
      ['Portfolio Value',      FMT.currency(portVal)],
      ['Prestige Count',       GS.prestige.count],
      ['Achievements',         GS.achievements.size + ' / ' + ACHIEVEMENTS_DATA.length],
    ].map(([k,v]) => `<div class="stat-row"><span class="stat-label">${k}</span><span class="stat-val">${v}</span></div>`).join('');
  },

  renderAdvisors() {
    const list = document.getElementById('advisors-list');
    if (!list) return;
    const messages = this._getAdvisorMessages();
    list.innerHTML = messages.map(m =>
      `<div class="advisor-item">
        <span class="advisor-avatar">${m.avatar}</span>
        <div>
          <div class="advisor-name">${m.name}</div>
          <div class="advisor-msg">${m.message}</div>
        </div>
      </div>`
    ).join('');
  },

  _getAdvisorMessages() {
    const msgs = [];
    const cap      = GS.resources.capital.amount;
    const capRate  = GS.resources.capital.perSec;
    const bldCount = Object.values(GS.buildings).reduce((a,v)=>a+v,0);

    if (cap < 50) {
      msgs.push({avatar:'👷', name:'Chief Economist', message:'Click the 3D city to generate Labour. Build Farms and Workshops to start your production chain.'});
    } else if (!GS.buildings.farm || (GS.buildings.farm||0) < 1) {
      msgs.push({avatar:'🌾', name:'Agricultural Minister', message:'Build a Farm to generate Food. Food is required by your population and fuels early growth.'});
    } else if (!GS.buildings.workshop || (GS.buildings.workshop||0) < 1) {
      msgs.push({avatar:'👷', name:'Chief Economist', message:'A Workshop converts raw materials into Goods — your primary Capital source.'});
    } else if (!GS.buildings.tradingPost) {
      msgs.push({avatar:'📊', name:'Market Analyst', message:'Construct a Trading Post to dramatically increase Capital income through organised commerce.'});
    } else if (capRate < 2) {
      msgs.push({avatar:'📊', name:'Market Analyst', message:'Capital income is low. Expand your Goods production chain — more Workshops and Trading Posts.'});
    } else if (!GS.techs.banking_system) {
      msgs.push({avatar:'🏦', name:'Central Banker', message:'Research Banking System to unlock Banks and greatly increase passive Capital generation.'});
    } else {
      msgs.push({avatar:'🏦', name:'Central Banker', message:'Consider the Markets tab for investment opportunities. A diversified portfolio accelerates growth.'});
    }

    if (GS.happiness < 40) {
      msgs.push({avatar:'🏛️', name:'Social Minister', message:'Happiness is critical! Build housing, increase food supply, and visit Policies for social reforms.'});
    } else if ((GS.learning.totalAnswered||0) < 5) {
      msgs.push({avatar:'🎓', name:'Finance Professor', message:'The Academy has financial questions. Answer them to earn bonus resources and Knowledge Points!'});
    } else if (bldCount > 20 && !GS.policies.free_market && !GS.policies.mixed_economy && !GS.policies.command_economy) {
      msgs.push({avatar:'📜', name:'Policy Adviser', message:'Your empire is large enough for an economic doctrine. Visit Policies to choose your strategy.'});
    }

    return msgs.slice(0,3);
  },

  renderMilestones() {
    const list = document.getElementById('milestones-list');
    if (!list) return;
    const milestones = this._getMilestones();
    list.innerHTML = milestones.map(m => `
      <div class="milestone-item">
        <span class="milestone-icon">${m.emoji}</span>
        <div class="milestone-info">
          <div class="milestone-name">${m.name}</div>
          <div class="milestone-desc">${m.desc}</div>
          <div class="milestone-bar"><div class="milestone-fill" style="width:${Math.min(100,m.pct).toFixed(1)}%"></div></div>
        </div>
      </div>`).join('');
  },

  _getMilestones() {
    const milestones = [];
    const cap = GS.resources.capital.amount;
    const bld = Object.values(GS.buildings).reduce((a,v)=>a+v,0);

    if (GS.phase === 'early') {
      const capPct = Math.min(100,(cap/1000)*100);
      const bldPct = Math.min(100,(bld/8)*100);
      milestones.push({emoji:'🏭', name:'Industrial Age', desc:'1,000 Capital & 8 buildings', pct:(capPct+bldPct)/2});
    }
    if (GS.phase === 'mid') {
      milestones.push({emoji:'🌐', name:'Global Economy', desc:'75,000 Capital & 40 buildings',
        pct:Math.min(100,(cap/75000)*100*0.5+(bld/40)*100*0.5)});
    }
    milestones.push({emoji:'🎓', name:'Scholar',       desc:'Answer 50 questions correctly',   pct:Math.min(100,((GS.learning.totalCorrect||0)/50)*100)});
    milestones.push({emoji:'💰', name:'First Million', desc:'Earn 1,000,000 Capital total',     pct:Math.min(100,((GS.stats.totalCapitalEarned||0)/1000000)*100)});
    milestones.push({emoji:'😊', name:'Content Citizens', desc:'Reach 75% Happiness',           pct:Math.min(100,(GS.happiness/75)*100)});

    return milestones.slice(0,4);
  },

  render() {
    this.renderResourcePanel();
    PopulationEngine.updatePopBar();
    const cpLabel = document.getElementById('click-power');
    if (cpLabel) {
      const eff = GS.clickPower * GS.prestige.permanentMultiplier * (GS.multipliers.clickPower || 1);
      cpLabel.textContent = `⚡ +${FMT.num(eff, 1)} Labour / click`;
    }
    // Refresh info panel if open
    const infoPanel = document.getElementById('empire-info-panel');
    if (infoPanel && infoPanel.classList.contains('eip-open')) {
      this.renderProduction(); this.renderStats();
      this.renderAdvisors();  this.renderMilestones();
    }
  },
};
