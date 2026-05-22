/* ── NEWS UI ── "The Prosperity Times" newspaper feed */
const NewsUI = {
  _container: null,
  _maxVisible: 60,

  init() {
    this._container = document.getElementById('news-feed');
    this.render();
  },

  render() {
    if (!this._container) return;
    const log = GS.newsLog || [];
    if (!log.length) {
      this._container.innerHTML = '<div class="news-empty">Your empire\'s chronicle awaits its first entry…</div>';
      return;
    }
    this._container.innerHTML = log.slice(0, this._maxVisible).map(e => this._renderEntry(e)).join('');
  },

  push(entry) {
    if (!this._container) return;
    const el = document.createElement('div');
    el.innerHTML = this._renderEntry(entry);
    const child = el.firstChild;
    child.classList.add('news-entry-new');
    this._container.insertBefore(child, this._container.firstChild);

    // Trim excess
    while (this._container.children.length > this._maxVisible) {
      this._container.removeChild(this._container.lastChild);
    }

    // Update dateline
    this._updateDateline();
  },

  _renderEntry(e) {
    const icon = NewsEngine.getCategoryIcon(e.category);
    const age = this._formatAge(e.time);
    return `<div class="news-entry news-cat-${e.category}">
      <div class="news-entry-head">
        <span class="news-cat-badge">${icon} ${e.category.toUpperCase()}</span>
        <span class="news-entry-time">${age}</span>
      </div>
      <div class="news-entry-headline">${e.headline}</div>
      ${e.subtext ? `<div class="news-entry-sub">${e.subtext}</div>` : ''}
    </div>`;
  },

  _formatAge(empireSeconds) {
    const day = Math.floor(empireSeconds / 60) + 1;
    return `Day ${day}`;
  },

  _updateDateline() {
    const day = Math.floor((GS.session.empireAge || 0) / 60) + 1;
    const vol = GS.prestige.count + 1;
    const el = document.getElementById('news-dateline');
    if (el) el.textContent = `Vol. ${toRoman(vol)} — Day ${day}`;
  },
};

function toRoman(n) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  let r = '';
  for (let i = 0; i < vals.length; i++) { while (n >= vals[i]) { r += syms[i]; n -= vals[i]; } }
  return r || 'I';
}
