/* ── SUPABASE CONFIG ── Fill in your project values to enable cloud saves.
   Create a free project at https://supabase.com, then paste your URL and anon key here.
   Leave empty strings to disable cloud saves. */
const SUPABASE_URL      = 'https://nospmnolqmcokikejach.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vc3Btbm9scW1jb2tpa2VqYWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NDU0NDAiLCJleHAiOjIwOTU0MjE0NDB9.GZcX_wjOUhz2EPEEmtIj8n6h8Dazc6C2s_xrYK59f_k';

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
