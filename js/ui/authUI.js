/* ── AUTH UI ── Cloud account sign-in / sign-up modal + header badge */
const AuthUI = {
  _modal: null,

  init() {
    this._injectHeaderBadge();
    this._injectModal();
  },

  _injectHeaderBadge() {
    const hdrRight = document.querySelector('.hdr-right');
    if (!hdrRight) return;
    const badge = document.createElement('div');
    badge.id = 'cloud-badge';
    badge.innerHTML = `
      <button class="btn-hdr" id="btn-cloud-account" title="Cloud Save Account">
        ☁️ ACCOUNT
      </button>
      <span id="cloud-user-label"></span>
    `;
    hdrRight.insertBefore(badge, hdrRight.firstChild);
    document.getElementById('btn-cloud-account')
      .addEventListener('click', () => this.show());
  },

  _injectModal() {
    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.className = 'hidden';
    overlay.innerHTML = `
      <div id="auth-box">
        <button id="auth-close" class="auth-close-btn">✕</button>
        <div class="auth-header">
          <div class="auth-icon">☁️</div>
          <h2 class="auth-title">Cloud Saves</h2>
          <p class="auth-sub">Sign in to back up your empire across devices.</p>
        </div>
        <div id="auth-tabs">
          <button class="auth-tab active" data-auth-tab="signin">Sign In</button>
          <button class="auth-tab" data-auth-tab="signup">Create Account</button>
        </div>
        <div id="auth-error" class="auth-error hidden"></div>
        <div id="auth-success" class="auth-success hidden"></div>
        <form id="auth-form">
          <label class="auth-label">Email
            <input type="email" id="auth-email" class="auth-input" placeholder="you@example.com" required>
          </label>
          <label class="auth-label">Password
            <input type="password" id="auth-password" class="auth-input" placeholder="••••••••" required minlength="6">
          </label>
          <button type="submit" class="btn-gold auth-submit" id="auth-submit">Sign In</button>
        </form>
        <div id="auth-signed-in" class="hidden">
          <div class="auth-user-info">
            <div class="auth-user-icon">👤</div>
            <div id="auth-user-email" class="auth-user-email"></div>
          </div>
          <div class="auth-actions">
            <button class="btn-gold" id="btn-push-save">⬆️ Push Save to Cloud</button>
            <button class="btn-ghost"  id="btn-pull-save">⬇️ Pull Save from Cloud</button>
          </div>
          <div id="auth-sync-status" class="auth-sync-status"></div>
          <button class="auth-signout-btn" id="btn-sign-out">Sign Out</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    this._modal = overlay;

    overlay.addEventListener('click', e => {
      if (e.target === overlay) this.hide();
    });
    document.getElementById('auth-close').addEventListener('click', () => this.hide());

    // Tab switching
    overlay.querySelectorAll('.auth-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isSignIn = btn.dataset.authTab === 'signin';
        document.getElementById('auth-submit').textContent = isSignIn ? 'Sign In' : 'Create Account';
        this._clearMessages();
      });
    });

    // Form submit
    document.getElementById('auth-form').addEventListener('submit', async e => {
      e.preventDefault();
      const email    = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const isSignIn = overlay.querySelector('.auth-tab.active').dataset.authTab === 'signin';

      this._setSubmitting(true);
      this._clearMessages();

      const result = isSignIn
        ? await CloudSave.signIn(email, password)
        : await CloudSave.signUp(email, password);

      this._setSubmitting(false);
      if (result.error) {
        this._showError(result.error.message);
      } else if (!isSignIn) {
        this._showSuccess('Account created! Check your email to confirm, then sign in.');
      }
    });

    // Push save
    document.getElementById('btn-push-save').addEventListener('click', async () => {
      const status = document.getElementById('auth-sync-status');
      status.textContent = 'Pushing…';
      const ok = await CloudSave.pushSave(JSON.parse(localStorage.getItem(SaveEngine.KEY) || '{}'));
      status.textContent = ok ? '✅ Save pushed to cloud.' : '❌ Push failed — check console.';
    });

    // Pull save
    document.getElementById('btn-pull-save').addEventListener('click', async () => {
      const status = document.getElementById('auth-sync-status');
      status.textContent = 'Pulling…';
      await CloudSave.syncOnLogin();
      status.textContent = '';
    });

    // Sign out
    document.getElementById('btn-sign-out').addEventListener('click', async () => {
      await CloudSave.signOut();
    });
  },

  show() {
    if (!CloudSave.isReady) {
      Modals.show(
        '☁️ Cloud Saves',
        '<p>Cloud saves require a Supabase project. Add your <code>SUPABASE_URL</code> and <code>SUPABASE_ANON_KEY</code> to <code>js/config.js</code> to enable this feature.</p>',
        [{ label:'OK', cls:'btn-gold', action:()=>{} }]
      );
      return;
    }
    this._modal.classList.remove('hidden');
    this._updateView();
  },

  hide() {
    this._modal.classList.add('hidden');
  },

  _updateView() {
    const isSignedIn = CloudSave.isSignedIn;
    document.getElementById('auth-form').classList.toggle('hidden', isSignedIn);
    document.getElementById('auth-tabs').classList.toggle('hidden', isSignedIn);
    document.getElementById('auth-signed-in').classList.toggle('hidden', !isSignedIn);
    if (isSignedIn) {
      document.getElementById('auth-user-email').textContent = CloudSave.userEmail;
      document.getElementById('auth-sync-status').textContent = '';
    }
    this._clearMessages();
  },

  onSignedIn(user) {
    const label = document.getElementById('cloud-user-label');
    if (label) label.textContent = user.email;
    this._updateView();
    CloudSave.syncOnLogin();
    Notifications.show(`☁️ Signed in as ${user.email}`, 'achievement');
  },

  onSignedOut() {
    const label = document.getElementById('cloud-user-label');
    if (label) label.textContent = '';
    this._updateView();
    Notifications.show('☁️ Signed out of cloud saves.', 'info');
  },

  _clearMessages() {
    document.getElementById('auth-error').classList.add('hidden');
    document.getElementById('auth-success').classList.add('hidden');
  },

  _showError(msg) {
    const el = document.getElementById('auth-error');
    el.textContent = msg;
    el.classList.remove('hidden');
  },

  _showSuccess(msg) {
    const el = document.getElementById('auth-success');
    el.textContent = msg;
    el.classList.remove('hidden');
  },

  _setSubmitting(isSubmitting) {
    const btn = document.getElementById('auth-submit');
    btn.disabled = isSubmitting;
    btn.textContent = isSubmitting ? 'Please wait…' : (
      document.querySelector('.auth-tab.active').dataset.authTab === 'signin'
        ? 'Sign In' : 'Create Account'
    );
  },
};
