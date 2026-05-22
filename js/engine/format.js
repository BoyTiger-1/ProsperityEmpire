/* ── NUMBER FORMATTING ── */
const FMT = {
  SUFFIXES: ['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc'],

  num(n, decimals = 2) {
    if (n === undefined || n === null || isNaN(n)) return '0';
    if (n < 0) return '-' + this.num(-n, decimals);
    if (n < 1000) return +n.toFixed(decimals) + '';
    const exp = Math.min(Math.floor(Math.log10(n) / 3), this.SUFFIXES.length - 1);
    const scaled = n / Math.pow(1000, exp);
    return scaled.toFixed(decimals) + this.SUFFIXES[exp];
  },

  rate(n) {
    if (n === 0) return '0/s';
    const sign = n > 0 ? '+' : '';
    return sign + this.num(n, 1) + '/s';
  },

  pct(n) { return (n * 100).toFixed(1) + '%'; },

  time(seconds) {
    seconds = Math.floor(seconds);
    if (seconds < 60)  return seconds + 's';
    if (seconds < 3600) return Math.floor(seconds/60) + 'm ' + (seconds%60) + 's';
    const h = Math.floor(seconds/3600);
    const m = Math.floor((seconds%3600)/60);
    return h + 'h ' + m + 'm';
  },

  playtime(ms) {
    const s = ms / 1000;
    if (s < 60)   return Math.floor(s) + ' seconds';
    if (s < 3600) return Math.floor(s/60) + ' minutes';
    if (s < 86400)return Math.floor(s/3600) + ' hours';
    return Math.floor(s/86400) + ' days';
  },

  currency(n) { return '💰' + this.num(n, 2); },

  stars(diff) {
    const n = Math.min(5, Math.max(1, Math.round(diff)));
    return '⭐'.repeat(n) + '☆'.repeat(5-n);
  },
};
