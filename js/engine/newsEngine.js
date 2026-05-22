/* ── NEWS ENGINE ── Central event log for "The Prosperity Times" */
const NewsEngine = {
  MAX_ENTRIES: 120,

  add(category, headline, subtext) {
    if (!GS.newsLog) GS.newsLog = [];
    const entry = {
      id: Date.now() + Math.random(),
      category,           // 'build' | 'research' | 'event' | 'market' | 'quiz' | 'achieve' | 'prestige' | 'policy' | 'info'
      headline,
      subtext: subtext || '',
      time: GS.session.empireAge || 0,
      ts: Date.now(),
    };
    GS.newsLog.unshift(entry);
    if (GS.newsLog.length > this.MAX_ENTRIES) GS.newsLog.length = this.MAX_ENTRIES;
    if (window.NewsUI) NewsUI.push(entry);
  },

  getCategoryIcon(cat) {
    return { build:'🏗️', research:'🔬', event:'⚡', market:'📈', quiz:'🎓', achieve:'🏆', prestige:'✨', policy:'📜', info:'📰' }[cat] || '◆';
  },
};
