/* ── CONFIG ── Game-wide constants */
const CFG = {
  TICK_MS:        100,       // main loop interval
  SAVE_INTERVAL:  30000,     // autosave every 30s
  MARKET_UPDATE:  5000,      // market price update interval
  EVENT_CHECK:    35000,     // check for new global events
  OFFLINE_CAP_HRS: 24,       // max offline progression hours
  CLICK_BASE:     1,         // base labor per click
  COST_SCALE:     1.15,      // default building cost scaling
  KP_PER_CORRECT: 2,         // knowledge points for correct answer
  CAP_PER_CORRECT:10,        // capital bonus for correct answer
  MASTERY_THRESHOLD: 0.75,   // concept mastery threshold
  PRESTIGE_REQ_INF: 1000,    // min influence to prestige
  VERSION: '1.0.0',
};
