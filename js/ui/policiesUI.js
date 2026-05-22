/* ── POLICIES TAB UI ── */
const PoliciesUI = {
  init() {
    Tabs.register('policies', () => this.render());
  },

  render() {
    const body = document.getElementById('policies-body');

    // Group by category
    const grouped = {};
    for (const cat of Object.keys(POLICY_CATEGORIES)) grouped[cat] = [];
    for (const p of POLICIES_DATA) (grouped[p.category] = grouped[p.category] || []).push(p);

    body.innerHTML = Object.entries(POLICY_CATEGORIES).map(([catId, cat]) => {
      const policies = grouped[catId] || [];
      return `<div class="policy-category">
        <div class="policy-cat-head" style="border-color:${cat.color}">
          <span class="policy-cat-label" style="color:${cat.color}">${cat.label}</span>
          <span class="policy-cat-desc">${cat.desc}</span>
        </div>
        <div class="policy-cards">
          ${policies.map(p => this._renderCard(p)).join('')}
        </div>
      </div>`;
    }).join('');
  },

  _renderCard(p) {
    const isActive = !!GS.policies[p.id];
    const isLocked = !this._isUnlocked(p);
    const lockReason = isLocked ? this._getLockReason(p) : '';

    // Check if exclusively blocked
    const isBlocked = !isActive && p.exclusive && p.exclusive.some(eid => GS.policies[eid]);
    const blockingPolicy = isBlocked ? POLICIES_DATA.find(pd => GS.policies[pd.id] && p.exclusive.includes(pd.id)) : null;

    let stateClass = 'policy-inactive';
    if (isActive) stateClass = 'policy-active';
    else if (isLocked) stateClass = 'policy-locked';
    else if (isBlocked) stateClass = 'policy-blocked';

    return `<div class="policy-card ${stateClass}" data-policy="${p.id}">
      <div class="policy-card-head">
        <span class="policy-emoji">${p.emoji}</span>
        <div class="policy-name-block">
          <div class="policy-name">${p.name}</div>
          <div class="policy-effect">${p.effect}</div>
        </div>
        ${isActive ? '<span class="policy-badge-active">ACTIVE</span>' : ''}
        ${isLocked ? '<span class="policy-badge-locked">🔒</span>' : ''}
      </div>
      <div class="policy-desc">${p.desc}</div>
      ${isLocked ? `<div class="policy-lock-reason">${lockReason}</div>` : ''}
      ${isBlocked ? `<div class="policy-lock-reason">Conflicts with: ${blockingPolicy ? blockingPolicy.name : 'active policy'}</div>` : ''}
      ${!isLocked && !isBlocked ? `<button class="btn-policy ${isActive ? 'btn-policy-revoke' : ''}" onclick="PoliciesUI.toggle('${p.id}')">${isActive ? 'Repeal' : 'Enact'}</button>` : ''}
    </div>`;
  },

  _isUnlocked(p) {
    if (!p.unlock) return true;
    const u = p.unlock;
    if (u.research && !(GS.techs[u.research] >= 1)) return false;
    if (u.buildings) {
      for (const [bid, req] of Object.entries(u.buildings)) {
        if ((GS.buildings[bid] || 0) < req) return false;
      }
    }
    return true;
  },

  _getLockReason(p) {
    if (!p.unlock) return '';
    const u = p.unlock;
    const parts = [];
    if (u.research) parts.push(`Requires: ${TECHNOLOGIES[u.research]?.name || u.research}`);
    if (u.buildings) {
      for (const [bid, req] of Object.entries(u.buildings)) {
        parts.push(`Requires ${req}× ${BUILDINGS[bid]?.name || bid}`);
      }
    }
    return parts.join(', ');
  },

  toggle(policyId) {
    const p = POLICIES_DATA.find(pd => pd.id === policyId);
    if (!p) return;

    if (GS.policies[policyId]) {
      // Repeal
      p.revert(GS);
      delete GS.policies[policyId];
      NewsEngine.add('policy', `Policy repealed: ${p.name}`, p.desc);
      Notifications.show(`📜 Policy Repealed`, p.name, 'info', 3000);
    } else {
      if (!this._isUnlocked(p)) return;
      const conflict = p.exclusive && p.exclusive.find(eid => GS.policies[eid]);
      if (conflict) {
        Notifications.show('⚠️ Policy Conflict', 'Repeal the conflicting policy first.', 'error');
        return;
      }
      p.apply(GS);
      GS.policies[policyId] = true;
      NewsEngine.add('policy', `New edict: ${p.name}`, p.effect);
      Notifications.show(`📜 Policy Enacted`, `${p.name} — ${p.effect}`, 'gold', 4000);
    }

    Production.recalculate();
    this.render();
  },
};
