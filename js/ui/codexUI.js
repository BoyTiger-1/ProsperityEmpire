/* ── CODEX TAB UI ── */
const CodexUI = {
  init() {
    Tabs.register('codex', () => this.render());
  },

  render() {
    this.renderSidebar();
    if (GS.ui.activeCodex) this.renderEntry(GS.ui.activeCodex);
    else this.renderWelcome();
  },

  renderSidebar() {
    const sidebar = document.getElementById('codex-sidebar');
    sidebar.innerHTML = CODEX_DATA.categories.map(cat => {
      const entries = CODEX_DATA.entries.filter(e => e.cat === cat.id);
      if (!entries.length) return '';
      return `<div class="codex-cat">${cat.name}</div>` +
        entries.map(e =>
          `<div class="codex-entry-link ${GS.ui.activeCodex === e.id ? 'active' : ''}" onclick="CodexUI.openEntry('${e.id}')">${e.title}</div>`
        ).join('');
    }).join('');
  },

  openEntry(id) {
    GS.ui.activeCodex = id;
    this.renderSidebar();
    this.renderEntry(id);
  },

  renderEntry(id) {
    const entry = CODEX_DATA.entries.find(e => e.id === id);
    if (!entry) return;
    document.getElementById('codex-body').innerHTML = `
      <div class="codex-article">
        <h2>${entry.title}</h2>
        <div class="codex-subtitle">${entry.subtitle}</div>
        ${entry.body}
      </div>`;
  },

  renderWelcome() {
    document.getElementById('codex-body').innerHTML = `
      <div class="codex-article">
        <h2>📚 Economic Codex</h2>
        <div class="codex-subtitle">Your financial encyclopedia</div>
        <p>The Economic Codex contains comprehensive explanations of every financial and economic concept in Prosperity Empire.</p>
        <p>Select a topic from the sidebar to begin learning. Concepts are organized by complexity — start with Economics Basics and work your way to Advanced Finance.</p>
        <h3>Quick Stats</h3>
        <p>You have mastered <strong style="color:var(--gold)">${Object.values(GS.learning.concepts).filter(c=>c.mastery>=0.75).length}</strong> of <strong style="color:var(--gold)">${CODEX_DATA.entries.length}</strong> topics.</p>
      </div>`;
  },
};
