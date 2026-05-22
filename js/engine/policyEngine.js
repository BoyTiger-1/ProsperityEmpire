/* ── POLICY ENGINE ── Applies/reverts active policy effects */
const PolicyEngine = {
  // Re-apply all active policy effects (called after prestige reset)
  reapplyAll() {
    for (const [policyId] of Object.entries(GS.policies)) {
      const p = POLICIES_DATA.find(pd => pd.id === policyId);
      if (p && p.apply) {
        try { p.apply(GS); } catch(e) { console.warn('Policy effect error:', policyId, e); }
      }
    }
  },

  // Clear all policy effects (called before prestige reset)
  revokeAll() {
    for (const [policyId] of Object.entries(GS.policies)) {
      const p = POLICIES_DATA.find(pd => pd.id === policyId);
      if (p && p.revert) {
        try { p.revert(GS); } catch(e) {}
      }
    }
    GS.policies = {};
  },

  // Called when building/tech unlock changes policy availability
  checkUnlocks() {
    // Nothing to do — PoliciesUI.render() handles lock display dynamically
  },
};
