/* ── ACHIEVEMENT ENGINE ── */
const AchievementEngine = {
  check() {
    for (const ach of ACHIEVEMENTS_DATA) {
      if (GS.achievements.has(ach.id)) continue;
      let unlocked = false;
      try { unlocked = ach.check(GS); } catch(e) {}
      if (unlocked) this.unlock(ach);
    }
  },

  unlock(ach) {
    GS.achievements.add(ach.id);
    // Apply reward
    if (ach.reward) {
      for (const [res, amt] of Object.entries(ach.reward)) {
        if (GS.resources[res]) {
          GS.resources[res].amount += amt;
          if (res === 'capital') GS.stats.totalCapitalEarned += amt;
        }
      }
    }
    Notifications.show(`🏆 Achievement: ${ach.name}`, ach.desc, 'gold', 5000);
    NewsEngine.add('achieve', `🏆 Honour awarded: ${ach.name}`, ach.desc);
    if (window.AchievementsUI) AchievementsUI.render();
  },

  getProgress() {
    const total = ACHIEVEMENTS_DATA.length;
    const unlocked = GS.achievements.size;
    return { total, unlocked, pct: total ? unlocked/total : 0 };
  },
};
