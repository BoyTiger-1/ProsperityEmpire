/* ── BUILDINGS TAB UI ── */
const BuildingsUI = {
  init() {
    Tabs.register('buildings', () => this.render());

    // Filter buttons (data-filter attribute)
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        GS.ui.buildFilter = btn.dataset.filter;
        this.render();
      });
    });

    // Buy-quantity buttons (data-buy attribute)
    document.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-buy]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        GS.ui.buyMultiplier = btn.dataset.buy === 'max' ? 'max' : parseInt(btn.dataset.buy);
        this.render();
      });
    });
  },

  render() {
    const grid = document.getElementById('buildings-grid');
    const filter = GS.ui.buildFilter;
    const qty    = GS.ui.buyMultiplier;
    let buildings = Object.values(BUILDINGS);
    if (filter !== 'all') buildings = buildings.filter(b => b.tier === parseInt(filter));
    // Hide locked buildings that are too far ahead — only show when within reach
    buildings = buildings.filter(def => BuildingEngine.isUnlocked(def.id) || this._isWithinReach(def));

    grid.innerHTML = buildings.map(def => this._cardHTML(def, qty)).join('');

    // Wire buy buttons via event listeners (no inline onclick = no escaping issues)
    grid.querySelectorAll('.bld-btn[data-bld]').forEach(btn => {
      btn.addEventListener('click', () => {
        BuildingEngine.buy(btn.dataset.bld);
        this.render();
      });
    });
  },

  _cardHTML(def, qty) {
    const unlocked  = BuildingEngine.isUnlocked(def.id);
    const count     = GS.buildings[def.id] || 0;
    const buyQty    = qty === 'max' ? Math.max(1, BuildingEngine.getMaxBuyable(def.id)) : qty;
    const cost      = BuildingEngine.getCost(def.id, buyQty);
    const affordable = unlocked && Production.canAfford(cost);

    const costHTML = Object.entries(cost).map(([res, amt]) => {
      const hasIt = (GS.resources[res]?.amount || 0) >= amt;
      return `<span class="cost-tag ${hasIt?'can-afford':'cant-afford'}">${RESOURCE_META[res]?.emoji||'📦'} ${FMT.num(amt)}</span>`;
    }).join('');

    const prodHTML = [
      ...Object.entries(def.produces||{}).map(([res, rate]) =>
        `<span class="bld-prod-tag">${RESOURCE_META[res]?.emoji||'📦'} +${rate}/s</span>`
      ),
      ...Object.entries(def.consumes||{}).map(([res, rate]) =>
        `<span class="bld-cons-tag">${RESOURCE_META[res]?.emoji||'📦'} −${rate}/s</span>`
      ),
    ].join('');

    const tierColor = ['','var(--green3)','var(--cyan)','var(--gold2)','#c084fc'][def.tier] || 'var(--txt4)';
    const tierLabel = ['','I','II','III','IV'][def.tier] || '?';

    return `<div class="building-card ${unlocked?'':'locked'} ${affordable?'affordable':''}" data-id="${def.id}">
      <div class="bld-header">
        <span class="bld-emoji">${def.emoji}</span>
        <div class="bld-meta">
          <div class="bld-name">${def.name}</div>
          <div class="bld-tier" style="color:${tierColor}">TIER ${tierLabel}</div>
        </div>
        <span class="bld-count" data-count="${def.id}">${count}</span>
      </div>
      <div class="bld-desc">${def.desc}</div>
      <div class="bld-tags">${prodHTML}</div>
      <div class="bld-cost" data-cost="${def.id}">${costHTML}</div>
      ${unlocked
        ? `<button class="bld-btn" data-bld="${def.id}" ${affordable?'':'disabled'}>
            ${qty === 'max' ? 'BUY MAX ('+buyQty+')' : 'BUY ×'+buyQty}
           </button>`
        : `<div class="bld-locked-msg">🔒 ${this.getLockMsg(def)}</div>`
      }
      ${def.flavorText ? `<div class="bld-flavor">${def.flavorText}</div>` : ''}
    </div>`;
  },

  // Called every 500ms from main loop — only patches numbers, never rebuilds DOM
  fastUpdate() {
    if (Tabs.current !== 'buildings') return;
    const grid = document.getElementById('buildings-grid');
    if (!grid) return;
    const qty = GS.ui.buyMultiplier;

    grid.querySelectorAll('.building-card').forEach(card => {
      const bldId = card.dataset.id;
      if (!bldId || !BUILDINGS[bldId]) return;
      const def     = BUILDINGS[bldId];
      const unlocked = BuildingEngine.isUnlocked(def.id);
      const buyQty  = qty === 'max' ? Math.max(1, BuildingEngine.getMaxBuyable(def.id)) : qty;
      const cost    = BuildingEngine.getCost(def.id, buyQty);
      const affordable = unlocked && Production.canAfford(cost);

      // Patch count
      const countEl = card.querySelector('[data-count]');
      if (countEl) {
        const newCount = String(GS.buildings[bldId] || 0);
        if (countEl.textContent !== newCount) countEl.textContent = newCount;
      }

      // Patch cost tags
      const costEl = card.querySelector('[data-cost]');
      if (costEl) {
        const newCost = Object.entries(cost).map(([res, amt]) => {
          const hasIt = (GS.resources[res]?.amount || 0) >= amt;
          return `<span class="cost-tag ${hasIt?'can-afford':'cant-afford'}">${RESOURCE_META[res]?.emoji||'📦'} ${FMT.num(amt)}</span>`;
        }).join('');
        if (costEl.innerHTML !== newCost) costEl.innerHTML = newCost;
      }

      // Patch button
      const btn = card.querySelector('.bld-btn');
      if (btn) btn.disabled = !affordable;

      // Patch card class
      if (affordable && !card.classList.contains('affordable')) card.classList.add('affordable');
      if (!affordable && card.classList.contains('affordable')) card.classList.remove('affordable');
    });
  },

  _isWithinReach(def) {
    if (!def.unlock) return true;
    const u = def.unlock;
    // Hide research-gated buildings if not yet in the right phase
    if (u.research && !(GS.techs[u.research] >= 1)) {
      if (GS.phase === 'early') return false;
    }
    // Hide if building requirements are more than 3× what the player has
    if (u.buildings) {
      for (const [bid, req] of Object.entries(u.buildings)) {
        const have = GS.buildings[bid] || 0;
        if (req > 3 && have < req * 0.25) return false;
      }
    }
    return true;
  },

  getLockMsg(def) {
    if (!def.unlock) return 'Not yet available.';
    const parts = [];
    if (def.unlock.research) parts.push(`Research: ${TECHNOLOGIES[def.unlock.research]?.name || def.unlock.research}`);
    if (def.unlock.buildings) {
      for (const [bid, req] of Object.entries(def.unlock.buildings)) {
        const have = GS.buildings[bid] || 0;
        parts.push(`${BUILDINGS[bid]?.name||bid}: ${have}/${req}`);
      }
    }
    return parts.join(' · ');
  },
};
