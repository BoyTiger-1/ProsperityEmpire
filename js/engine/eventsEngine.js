/* ── EVENTS ENGINE ── */
const EventsEngine = {
  eventHistory: [],

  init() {
    GS.activeEvents = [];
  },

  // Possibly trigger a new random event
  maybeSpawnEvent() {
    if (GS.activeEvents.length >= 3) return;
    if (Math.random() > 0.12) return; // 12% chance per check (~1 event per 5-7 min)

    const phase = GS.phase;
    const eligible = GLOBAL_EVENTS.filter(e => {
      if (GS.activeEvents.find(ae => ae.id === e.id)) return false;
      const mp = e.trigger?.minPhase;
      if (!mp) return true;
      const phases = ['early','mid','late','advanced'];
      return phases.indexOf(phase) >= phases.indexOf(mp);
    });

    if (!eligible.length) return;
    const evt = eligible[Math.floor(Math.random() * eligible.length)];
    this.spawn(evt);
  },

  spawn(evt) {
    const active = {
      id: evt.id,
      def: evt,
      startTime: Date.now(),
      endTime: Date.now() + evt.duration * 1000,
      resolved: false,
    };
    GS.activeEvents.push(active);
    if (evt.apply && !evt.isChoice) {
      try { evt.apply(GS); } catch(e) {}
    }
    const typeClass = { positive:'success', negative:'error', neutral:'info' }[evt.type] || 'info';
    Notifications.show(`${evt.emoji} ${evt.name}`, evt.desc, typeClass, 6000);
    NewsEngine.add('event', `${evt.emoji} ${evt.name}`, evt.desc);
    if (window.CityScene) CityScene.triggerEventEffect(evt.type, evt.id);
    if (window.WorldUI) WorldUI.render();
  },

  // Process choice event
  resolveChoice(evtId, choice) {
    const active = GS.activeEvents.find(e => e.id === evtId);
    if (!active || active.resolved) return;
    const evt = active.def;
    active.resolved = true;
    if (choice === 0) {
      // Accept
      if (evt.acceptCost) {
        if (!Production.canAfford({ capital: evt.acceptCost })) {
          Notifications.show('💸 Not enough Capital', 'Cannot accept.', 'error');
          return;
        }
        Production.deductCost({ capital: evt.acceptCost });
      }
      if (evt.acceptReward) { try { evt.acceptReward(GS); } catch(e) {} }
      if (evt.isGamble) {
        const cost = evt.gamblingCost || 0;
        if (!Production.canAfford({ capital: cost })) {
          Notifications.show('💸 Not enough Capital', 'Cannot gamble.', 'error');
          return;
        }
        Production.deductCost({ capital: cost });
        if (Math.random() < 0.5) {
          if (evt.winReward) { try { evt.winReward(GS); } catch(e) {} }
          Notifications.show('🎰 Lucky!', 'The gamble paid off!', 'gold');
        } else {
          Notifications.show('🎰 Unlucky!', 'You lost the investment.', 'error');
        }
      }
      if (evt.apply) { try { evt.apply(GS); } catch(e) {} }
    }
    // Schedule removal
    this.removeEvent(evtId);
  },

  // Tick — expire events
  tick() {
    const now = Date.now();
    const toRemove = GS.activeEvents.filter(e => !e.def.isChoice && now >= e.endTime);
    for (const ae of toRemove) {
      this.removeEvent(ae.id);
    }
  },

  removeEvent(evtId) {
    const idx = GS.activeEvents.findIndex(e => e.id === evtId);
    if (idx < 0) return;
    const ae = GS.activeEvents[idx];
    if (ae.def.revert) { try { ae.def.revert(GS); } catch(e) {} }
    this.eventHistory.unshift({ name: ae.def.name, emoji: ae.def.emoji, type: ae.def.type, time: Date.now() });
    if (this.eventHistory.length > 20) this.eventHistory.pop();
    GS.activeEvents.splice(idx, 1);
    if (window.WorldUI) WorldUI.render();
  },
};
