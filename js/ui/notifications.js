/* ── NOTIFICATIONS ── */
const Notifications = {
  queue: [],
  area: null,

  init() { this.area = document.getElementById('notif-area'); },

  show(title, message, type = 'info', duration = 4000) {
    if (!this.area) return;
    const el = document.createElement('div');
    el.className = `notif notif-${type}`;
    const icons = { success:'✅', error:'❌', gold:'💰', info:'ℹ️' };
    el.innerHTML = `<span class="notif-icon">${icons[type]||'ℹ️'}</span>
      <div class="notif-msg">
        <div class="notif-title">${title}</div>
        ${message ? `<div class="notif-sub">${message}</div>` : ''}
      </div>`;
    this.area.appendChild(el);
    el.addEventListener('click', () => this.dismiss(el));
    setTimeout(() => this.dismiss(el), duration);
  },

  dismiss(el) {
    if (!el.parentNode) return;
    el.classList.add('notif-out');
    setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 320);
  },
};
