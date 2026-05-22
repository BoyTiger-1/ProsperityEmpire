/* ── TAB SYSTEM ── */
const Tabs = {
  current: 'empire',
  renderFns: {},

  init() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchTo(btn.dataset.tab));
    });
  },

  register(tabId, renderFn) { this.renderFns[tabId] = renderFn; },

  switchTo(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const tab = document.getElementById('tab-' + tabId);
    if (!tab) return;
    tab.classList.remove('hidden');
    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
    this.current = tabId;
    if (this.renderFns[tabId]) this.renderFns[tabId]();
  },
};
