/* ── CLOUD SAVE ENGINE ── Supabase-backed save sync */
const CloudSave = {
  _client: null,
  _user: null,
  _ready: false,

  init() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return; // not configured
    try {
      this._client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      this._ready = true;
      // Restore session from localStorage if it exists
      this._client.auth.getSession().then(({ data }) => {
        this._user = data?.session?.user || null;
        if (this._user) AuthUI.onSignedIn(this._user);
      });
      // Listen for auth state changes
      this._client.auth.onAuthStateChange((event, session) => {
        this._user = session?.user || null;
        if (event === 'SIGNED_IN')  AuthUI.onSignedIn(this._user);
        if (event === 'SIGNED_OUT') AuthUI.onSignedOut();
      });
    } catch (e) {
      console.warn('CloudSave init failed:', e);
    }
  },

  get isReady()    { return this._ready; },
  get isSignedIn() { return !!this._user; },
  get userEmail()  { return this._user?.email || null; },

  async signUp(email, password) {
    if (!this._ready) return { error: { message: 'Cloud saves not configured.' } };
    const { data, error } = await this._client.auth.signUp({ email, password });
    return { data, error };
  },

  async signIn(email, password) {
    if (!this._ready) return { error: { message: 'Cloud saves not configured.' } };
    const { data, error } = await this._client.auth.signInWithPassword({ email, password });
    return { data, error };
  },

  async signOut() {
    if (!this._ready || !this._user) return;
    await this._client.auth.signOut();
  },

  async pushSave(saveData) {
    if (!this._ready || !this._user) return false;
    try {
      const { error } = await this._client.from('saves').upsert({
        user_id:     this._user.id,
        save_data:   saveData,
        empire_name: saveData.empireName || 'Empire',
        updated_at:  new Date().toISOString(),
      }, { onConflict: 'user_id' });
      if (error) { console.warn('Cloud push failed:', error.message); return false; }
      return true;
    } catch (e) {
      console.warn('Cloud push error:', e);
      return false;
    }
  },

  async pullSave() {
    if (!this._ready || !this._user) return null;
    try {
      const { data, error } = await this._client
        .from('saves')
        .select('save_data, updated_at')
        .eq('user_id', this._user.id)
        .single();
      if (error || !data) return null;
      return data.save_data;
    } catch (e) {
      console.warn('Cloud pull error:', e);
      return null;
    }
  },

  /* Compare cloud vs local save and load the newest, with user confirmation
     if there is a meaningful difference (>60 seconds). */
  async syncOnLogin() {
    const cloudData = await this.pullSave();
    if (!cloudData) return; // no cloud save yet

    const localRaw = localStorage.getItem(SaveEngine.KEY);
    const localData = localRaw ? JSON.parse(localRaw) : null;

    const cloudTs = cloudData.savedAt || 0;
    const localTs = localData?.savedAt || 0;
    const diffSec = Math.abs(cloudTs - localTs) / 1000;

    if (diffSec < 60) return; // close enough — keep local

    const cloudDate = new Date(cloudTs).toLocaleString();
    const localDate = localTs ? new Date(localTs).toLocaleString() : 'none';
    const cloudNewer = cloudTs > localTs;

    Modals.show(
      '☁️ Cloud Save Found',
      `<p>A cloud save was found. Which save would you like to use?</p>
       <div style="display:grid;gap:8px;margin-top:12px">
         <div style="background:#1a1a1a;padding:8px;border-radius:6px">
           <b>☁️ Cloud</b> — ${cloudDate}
           <br><small>${cloudData.empireName || '—'}</small>
         </div>
         <div style="background:#1a1a1a;padding:8px;border-radius:6px">
           <b>💾 Local</b> — ${localDate}
           <br><small>${localData?.empireName || '—'}</small>
         </div>
       </div>`,
      [
        {
          label: cloudNewer ? '☁️ Use Cloud (Newer)' : '☁️ Use Cloud',
          cls: cloudNewer ? 'btn-gold' : 'btn-ghost',
          action: () => {
            localStorage.setItem(SaveEngine.KEY, JSON.stringify(cloudData));
            location.reload();
          },
        },
        {
          label: !cloudNewer ? '💾 Keep Local (Newer)' : '💾 Keep Local',
          cls: !cloudNewer ? 'btn-gold' : 'btn-ghost',
          action: () => {},
        },
      ]
    );
  },
};
