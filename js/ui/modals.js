/* ── MODAL SYSTEM ── */
const Modals = {
  overlay: null,
  box: null,

  init() {
    this.overlay = document.getElementById('modal-overlay');
    this.box = document.getElementById('modal-box');
    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.close();
    });
  },

  show(title, bodyHTML, buttons = []) {
    let btnHTML = buttons.map(b =>
      `<button class="btn ${b.cls||'btn-ghost'}" data-action="${b.label}">${b.label}</button>`
    ).join('');
    if (!btnHTML) btnHTML = `<button class="btn btn-ghost" data-action="Close">Close</button>`;

    this.box.innerHTML = `
      <div class="modal-title">${title}</div>
      <div class="modal-body">${bodyHTML}</div>
      <div class="modal-actions">${btnHTML}</div>`;

    buttons.forEach(b => {
      const el = this.box.querySelector(`[data-action="${b.label}"]`);
      if (el && b.action) el.addEventListener('click', () => { b.action(); this.close(); });
    });
    this.box.querySelector('[data-action="Close"]')?.addEventListener('click', () => this.close());

    this.overlay.classList.remove('hidden');
  },

  close() { this.overlay.classList.add('hidden'); },
};
