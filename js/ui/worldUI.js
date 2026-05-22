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
    el.innerHTML = `
      <div style="font-size:12px;color:var(--txt2);line-height:1.6">
        <p>Diplomacy events occur automatically based on your empire's growth and decisions during events.</p>
        <p>Maintaining friendly relations provides trade bonuses. Hostile relations may trigger sanctions.</p>
        <div style="margin-top:12px">
          <strong style="color:var(--gold)">Current Influence: <span id="world-inf-val">${FMT.num(GS.resources.influence.amount)}</span></strong><br>
          <span style="color:var(--txt3);font-size:11px">High Influence unlocks special diplomatic options.</span>
        </div>
      </div>`;
  },
};
