/* ── ACHIEVEMENTS TAB UI ── */
const AchievementsUI = {
  init() {
    Tabs.register('achievements', () => this.render());
  },

  render() {
    const prog = AchievementEngine.getProgress();
    document.getElementById('ach-progress-text').textContent = `${prog.unlocked} / ${prog.total} Achievements Unlocked`;
    document.getElementById('ach-progress-fill').style.width = (prog.pct * 100) + '%';

    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = ACHIEVEMENTS_DATA.map(ach => {
      const unlocked = GS.achievements.has(ach.id);
      const rewardStr = ach.reward ? Object.entries(ach.reward).map(([r,a]) => `+${a} ${RESOURCE_META[r]?.emoji||''}${RESOURCE_META[r]?.name||r}`).join(', ') : '';
      return `<div class="ach-card ${unlocked?'unlocked':'locked'}">
        <span class="ach-icon">${ach.emoji}</span>
        <div class="ach-info">
          <div class="ach-name">${ach.name}</div>
          <div class="ach-desc">${ach.desc}</div>
          ${rewardStr ? `<div class="ach-reward">Reward: ${rewardStr}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  },
};
