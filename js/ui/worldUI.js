/* ── WORLD TAB UI ── */
const WorldUI = {
  _eventSig: '',
  _nationSig: '',

  init() {
    Tabs.register('world', () => { this._eventSig = ''; this._nationSig = ''; this.render(); });
  },

  render() {
    this.renderEvents();
    this.renderNations();
    this.renderDiplomacy();
  },

  // Called every 500ms — only patches timers; full rebuild only when event list changes
  fastUpdate() {
    if (Tabs.current !== 'world') return;

    const sig = GS.activeEvents.map(ae => ae.id).join(',');
    if (this._eventSig !== sig) {
      this._eventSig = sig;
      this.renderEvents();
      return;
    }
    // Patch timers in-place
    document.querySelectorAll('.event-timer[data-eid]').forEach(el => {
      const ae = GS.activeEvents.find(e => e.id === el.dataset.eid);
      if (ae) el.textContent = FMT.time(Math.max(0, (ae.endTime - Date.now()) / 1000));
    });

    // Patch diplomacy influence value
    const infEl = document.getElementById('world-inf-val');
    if (infEl) { const v = FMT.num(GS.resources.influence.amount); if (infEl.textContent !== v) infEl.textContent = v; }
  },

  renderEvents() {
    const list = document.getElementById('world-events-list');
    if (!GS.activeEvents.length) {
      list.innerHTML = '<div class="muted" style="padding:8px;font-size:12px">No active events. Events occur periodically as your empire grows.</div>';
    } else {
      list.innerHTML = GS.activeEvents.map(ae => {
        const evt = ae.def;
        const remaining = Math.max(0, (ae.endTime - Date.now()) / 1000);
        return `<div class="event-card ${evt.type}">
          <span class="event-timer" data-eid="${ae.id}">${FMT.time(remaining)}</span>
          <div class="event-name">${evt.emoji} ${evt.name}</div>
          <div class="event-desc">${evt.desc}</div>
          <div class="event-effect">Effect: ${evt.effect}</div>
          ${evt.isChoice && !ae.resolved ? `
            <div style="margin-top:10px;display:flex;gap:8px">
              ${evt.choices.map((c,i) => `<button class="btn btn-${i===0?'gold':'ghost'}" style="font-size:12px;padding:6px 12px" onclick="EventsEngine.resolveChoice('${ae.id}',${i});WorldUI.render()">${c}</button>`).join('')}
            </div>` : ''}
        </div>`;
      }).join('');
    }

    // Event history
    const hist = document.getElementById('world-event-history');
    hist.innerHTML = EventsEngine.eventHistory.slice(0,8).map(h =>
      `<div style="font-size:12px;color:var(--txt3);padding:4px 0;border-bottom:1px solid var(--bg3)">${h.emoji} ${h.name}</div>`
    ).join('') || '<div class="muted" style="font-size:12px">No events yet.</div>';
  },

  renderNations() {
    const list = document.getElementById('world-nations-list');
    list.innerHTML = NATIONS_DATA.map(n => {
      const rel = GS.nations[n.id] || n.relation;
      return `<div class="nation-card">
        <span class="nation-flag">${n.flag}</span>
        <div class="nation-info">
          <div class="nation-name">${n.name}</div>
          <div class="nation-stats">Specialty: ${n.specialty} • GDP: ${FMT.num(n.gdp)}</div>
          <div class="nation-stats">${n.desc}</div>
          <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">
            ${n.traits.map(t=>`<span style="font-size:10px;background:var(--bg4);border-radius:99px;padding:2px 6px;color:var(--txt3)">${t}</span>`).join('')}
          </div>
        </div>
        <span class="nation-relation ${rel}">${rel.charAt(0).toUpperCase()+rel.slice(1)}</span>
      </div>`;
    }).join('');
  },

  renderDiplomacy() {
    const el = document.getElementById('world-diplomacy');
    const inf = GS.resources.influence.amount;

    const UPGRADE_COST = { hostile: 300, neutral: 200 };
    const NEXT_REL     = { hostile: 'neutral', neutral: 'friendly', friendly: 'allied' };
    const REL_ORDER    = ['hostile', 'neutral', 'friendly', 'allied'];

    const rows = NATIONS_DATA.map(n => {
      const rel = GS.nations[n.id] || n.relation;
      const nextRel = NEXT_REL[rel];
      const cost = UPGRADE_COST[rel];
      const canAfford = inf >= (cost || Infinity);
      const btnHTML = nextRel && cost
        ? `<button class="btn btn-ghost" style="font-size:10px;padding:3px 8px;margin-top:4px;${!canAfford?'opacity:0.45':''}"
             onclick="WorldUI.improvRelation('${n.id}')" ${!canAfford?'disabled':''}>
             Send Ambassador (${FMT.num(cost)} ✨)
           </button>`
        : rel === 'allied'
        ? `<span style="font-size:10px;color:var(--gold)">★ Allied</span>`
        : `<span style="font-size:10px;color:var(--txt3)">Max relation</span>`;

      return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--bg3)">
        <span style="font-size:18px">${n.flag}</span>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:700">${n.name}</div>
          <div style="font-size:10px;color:var(--txt3)">${n.specialty}</div>
          ${btnHTML}
        </div>
        <span class="nation-relation ${rel}">${rel.charAt(0).toUpperCase()+rel.slice(1)}</span>
      </div>`;
    }).join('');

    // Active trade bonuses from friendly/allied nations
    const bonuses = NATIONS_DATA.filter(n => {
      const rel = GS.nations[n.id] || n.relation;
      return rel === 'friendly' || rel === 'allied';
    }).map(n => {
      const rel = GS.nations[n.id] || n.relation;
      const bonus = rel === 'allied' ? `+20% ${n.specialty} bonus` : `+10% ${n.specialty} bonus`;
      return `<div style="font-size:11px;color:var(--green3);padding:2px 0">${n.flag} ${n.name}: ${bonus}</div>`;
    }).join('') || '<div style="font-size:11px;color:var(--txt3)">No active trade bonuses.</div>';

    el.innerHTML = `
      <div style="margin-bottom:10px">
        <strong style="color:var(--gold);font-size:13px">Influence: <span id="world-inf-val">${FMT.num(inf)}</span> ✨</strong>
        <span style="color:var(--txt3);font-size:10px;margin-left:6px">Spend to improve relations</span>
      </div>
      <div style="margin-bottom:12px">${rows}</div>
      <div style="background:var(--bg3);border-radius:6px;padding:8px">
        <div style="font-size:11px;font-weight:700;color:var(--txt2);margin-bottom:4px">Active Trade Bonuses</div>
        ${bonuses}
      </div>`;
  },

  improvRelation(nationId) {
    const n = NATIONS_DATA.find(nd => nd.id === nationId);
    if (!n) return;
    const rel = GS.nations[nationId] || n.relation;
    const UPGRADE_COST = { hostile: 300, neutral: 200 };
    const NEXT_REL     = { hostile: 'neutral', neutral: 'friendly' };
    const cost = UPGRADE_COST[rel];
    const nextRel = NEXT_REL[rel];
    if (!cost || !nextRel) return;
    if (GS.resources.influence.amount < cost) {
      Notifications.show('✨ Not enough Influence', `Need ${FMT.num(cost)} Influence to send ambassador.`, 'error');
      return;
    }
    GS.resources.influence.amount -= cost;
    GS.nations[nationId] = nextRel;
    Notifications.show(`🤝 Diplomacy`, `Relations with ${n.name} improved to ${nextRel}!`, 'success');
    NewsEngine.add('diplomacy', `🤝 ${n.name}`, `Relations improved to ${nextRel}.`);
    this.render();
  },
};
