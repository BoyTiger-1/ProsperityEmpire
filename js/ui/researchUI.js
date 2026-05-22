/* ── RESEARCH TAB UI ── */
const ResearchUI = {
  _techSig: null,

  init() {
    Tabs.register('research', () => { this._techSig = null; this.render(); });
  },

  render() {
    document.getElementById('kp-display').textContent = FMT.num(GS.resources.knowledge.amount);
    document.getElementById('kp-rate-display').textContent = FMT.num(GS.resources.knowledge.perSec, 2);

    const container = document.getElementById('research-branches');
    const branches = {};
    for (const tech of Object.values(TECHNOLOGIES)) {
      if (!branches[tech.branch]) branches[tech.branch] = [];
      branches[tech.branch].push(tech);
    }

    container.innerHTML = Object.entries(branches).map(([branch, techs]) => {
      const techCards = techs.map(def => this.renderTechCard(def)).join('');
      return `<div class="branch-section">
        <div class="branch-title">${branch}</div>
        <div class="branch-techs">${techCards}</div>
      </div>`;
    }).join('');

    // Bind click events
    container.querySelectorAll('.tech-card[data-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        if (ResearchEngine.research(id)) this.render();
      });
    });
  },

  renderTechCard(def) {
    const level = GS.techs[def.id] || 0;
    const unlocked = ResearchEngine.isUnlocked(def.id);
    const maxed = ResearchEngine.isMaxed(def.id);
    const cost = ResearchEngine.getCost(def.id);
    const affordable = cost && Production.canAfford(cost);

    let cls = '';
    if (maxed) cls = 'maxed';
    else if (level > 0) cls = 'unlocked';
    else if (!unlocked) cls = 'locked';
    else if (affordable) cls = 'affordable';

    const prereqDef = def.prereq ? TECHNOLOGIES[def.prereq] : null;
    const prereqText = def.prereq && !unlocked ? `Requires: ${prereqDef?.name || def.prereq}` : '';

    return `<div class="tech-card ${cls}" data-id="${def.id}" title="${def.name}">
      <div class="tech-emoji">${def.emoji}</div>
      <div class="tech-name">${def.name}</div>
      <div class="tech-level">${maxed ? '✅ Maxed' : `Level ${level}/${def.maxLevel}`}</div>
      <div class="tech-desc">${def.desc}</div>
      ${prereqText ? `<div class="muted" style="font-size:10px;margin-top:4px">🔒 ${prereqText}</div>` : ''}
      ${cost ? `<div class="tech-cost">🔬 Cost: ${FMT.num(cost.knowledge)} KP</div>` : ''}
      <div class="tech-effect">⚡ ${def.effect}</div>
    </div>`;
  },

  // Called every 500ms — patches without full DOM rebuild
  fastUpdate() {
    if (Tabs.current !== 'research') return;

    const kpEl = document.getElementById('kp-display');
    if (kpEl) { const v = FMT.num(GS.resources.knowledge.amount); if (kpEl.textContent !== v) kpEl.textContent = v; }
    const rateEl = document.getElementById('kp-rate-display');
    if (rateEl) { const v = FMT.num(GS.resources.knowledge.perSec, 2); if (rateEl.textContent !== v) rateEl.textContent = v; }

    // Full rebuild only when tech levels change (research complete)
    const sig = JSON.stringify(GS.techs);
    if (this._techSig !== sig) {
      this._techSig = sig;
      this.render();
      return;
    }

    // Otherwise just patch affordability classes — no DOM wipe
    document.querySelectorAll('.tech-card[data-id]').forEach(card => {
      const id = card.dataset.id;
      if (!TECHNOLOGIES[id]) return;
      const maxed    = ResearchEngine.isMaxed(id);
      const unlocked = ResearchEngine.isUnlocked(id);
      const cost     = ResearchEngine.getCost(id);
      const aff      = !maxed && unlocked && !!(cost && Production.canAfford(cost));
      card.classList.toggle('affordable', aff);
    });
  },
};
