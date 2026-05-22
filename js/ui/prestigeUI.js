/* ── PRESTIGE TAB UI ── */
const PrestigeUI = {
  init() {
    Tabs.register('prestige', () => this.render());
  },

  render() {
    const body = document.getElementById('prestige-body');
    const canPrestige = PrestigeEngine.canPrestige();
    const infGain = PrestigeEngine.getInfluenceGain();
    const totalInf = GS.prestige.influence;

    body.innerHTML = `<div class="prestige-container">
      <div class="prestige-header">
        <h2>✨ PRESTIGE SYSTEM</h2>
        <p style="color:var(--txt2)">Reset your empire in exchange for permanent <strong style="color:var(--purple)">Influence</strong> — the currency of legacy.</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px">
        <div class="panel" style="text-align:center">
          <div style="font-size:12px;color:var(--txt3)">Prestige Count</div>
          <div style="font-size:32px;font-weight:900;color:var(--gold)">${GS.prestige.count}</div>
        </div>
        <div class="panel" style="text-align:center">
          <div style="font-size:12px;color:var(--txt3)">Stored Influence</div>
          <div style="font-size:32px;font-weight:900;color:var(--purple)">${FMT.num(totalInf)} ✨</div>
        </div>
        <div class="panel" style="text-align:center">
          <div style="font-size:12px;color:var(--txt3)">Prestige Multiplier</div>
          <div style="font-size:32px;font-weight:900;color:var(--cyan)">${GS.prestige.permanentMultiplier.toFixed(2)}×</div>
        </div>
      </div>

      <div class="panel" style="margin-bottom:24px">
        <div class="panel-title">🔄 Ascend — Reset for Influence</div>
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div>
            <p style="color:var(--txt2);margin-bottom:8px">You currently have <strong style="color:var(--txt)">${FMT.num(GS.resources.influence.amount)}</strong> Influence (need ${FMT.num(CFG.PRESTIGE_REQ_INF)} to Prestige).</p>
            <p style="color:var(--txt2);margin-bottom:8px">Ascending will reset your empire but grant: <strong style="color:var(--purple)">+${FMT.num(infGain)} Influence</strong></p>
            <p style="font-size:12px;color:var(--txt3)">Your buildings, technologies, and resources will be reset. Stored Influence and upgrades are permanent.</p>
          </div>
          <button class="btn btn-gold" style="padding:12px 24px;font-size:16px" ${canPrestige?'':'disabled'}
            onclick="Modals.show('✨ Confirm Prestige','Are you sure? Your empire will be reset. You will gain ${infGain} Influence.',[{label:'Ascend!',cls:'btn-gold',action:()=>PrestigeEngine.prestige()},{label:'Cancel',cls:'btn-ghost'}])">
            ✨ PRESTIGE ${canPrestige ? `(+${FMT.num(infGain)} INF)` : `(Need ${FMT.num(CFG.PRESTIGE_REQ_INF - GS.resources.influence.amount)} more)`}
          </button>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">✨ Permanent Upgrades (Spend Stored Influence)</div>
        <div class="prestige-upgrades">
          ${PRESTIGE_UPGRADES.map(upg => {
            const level = GS.prestige.upgrades[upg.id] || 0;
            const maxed = level >= upg.maxLevel;
            const cost = PrestigeEngine.getUpgradeCost(upg.id);
            const affordable = totalInf >= cost;
            return `<div class="prestige-upgrade-card ${maxed?'owned':''}">
              <div class="pu-name">${upg.emoji} ${upg.name}</div>
              <div class="pu-desc">${upg.desc}</div>
              <div style="font-size:12px;color:var(--txt3);margin-bottom:6px">Level: ${level}/${upg.maxLevel}</div>
              <div class="pu-cost">${maxed ? '✅ Maxed' : `Cost: ${FMT.num(cost)} ✨`}</div>
              ${!maxed ? `<button class="btn ${affordable?'btn-gold':'btn-ghost'}" style="width:100%;margin-top:4px" ${affordable?'':'disabled'}
                onclick="PrestigeEngine.buyUpgrade('${upg.id}');PrestigeUI.render()">
                Purchase
              </button>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  },
};
