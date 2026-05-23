/* ── CITY SCENE — zone-based 3D city ── */
const CityScene = (() => {
  let renderer, scene, camera, clock;
  let cityGroup, pulseLight;
  let buildingMeshes = [];
  let animating = false;
  let clickPulse = 0;
  let rotAngle = 0;
  let rotTarget = null;
  let lastBuildSig = '';

  const CAM_DEFAULT = { x:0, y:42, z:58 };
  let camTarget  = null;
  let lookTarget = { x:0, y:4, z:0 };
  const lookCur  = new THREE.Vector3(0, 4, 0);
  let rotPaused  = false;
  let selectedGroup = null;
  let raycaster, mouse;

  // ── Zone definitions ──────────────────────────────────────────
  const BUILDING_ZONE = {
    hut:'residential', cottage:'residential', inn:'residential', hospital:'residential',
    farm:'agricultural', lumberMill:'agricultural', quarry:'agricultural', fishery:'agricultural',
    workshop:'industrial', coalMine:'industrial', textileMill:'industrial',
    factory:'industrial', steelMill:'industrial', powerPlant:'industrial', oilRefinery:'industrial',
    market:'commercial', tradingPost:'commercial', warehouse:'commercial', harbor:'commercial', airport:'commercial',
    school:'knowledge', library:'knowledge', university:'knowledge',
    researchInstitute:'knowledge', techPark:'knowledge', mediaEmpire:'knowledge',
    bank:'financial', mint:'financial', insurance:'financial',
    stockExchange:'financial', investmentFirm:'financial', centralBank:'financial',
    globalTradeHub:'financial', cryptoFarm:'financial',
    solarFarm:'advanced', spacePort:'advanced',
  };

  // Local-space zone centers (before cityGroup.rotation.y)
  const ZONE_CENTERS = {
    residential:  { x: 13,  z: 12  },
    agricultural: { x: -14, z: 10  },
    industrial:   { x: -15, z: -12 },
    commercial:   { x: 14,  z: -12 },
    financial:    { x: 15,  z: 5   },
    knowledge:    { x: 0,   z: -18 },
    advanced:     { x: -6,  z: -27 },
  };

  // rotation.y to bring each zone to face camera (maximize world-z)
  // world_z = -lx*sin(θ) + lz*cos(θ); maximised at θ = atan2(-lx, lz)
  const ZONE_ROT = {
    residential:  Math.atan2(-13, 12),   // ≈ -0.83
    agricultural: Math.atan2(14, 10),    // ≈  0.95
    industrial:   Math.atan2(15, -12),   // ≈  2.24
    commercial:   Math.atan2(-14, -12),  // ≈ -2.28 → wrap to 3.99
    financial:    Math.atan2(-15, 5),    // ≈ -1.25
    knowledge:    Math.PI,               // ≈  3.14
    advanced:     Math.atan2(6, -27),    // ≈  2.92
  };

  // Tab → zone
  const TAB_ZONE = {
    empire: null, buildings: 'industrial', research: 'knowledge',
    markets: 'financial', academy: 'knowledge', policies: 'residential',
    codex: 'knowledge', world: 'commercial', prestige: 'financial',
    achievements: 'residential',
  };

  // Fallback BLD data for generic buildings
  const BLD = {
    hut:              { w:1.0, h:1.0, d:1.0, color:0x8B6914, roof:0x5D3E10 },
    cottage:          { w:1.2, h:1.6, d:1.2, color:0xCD853F, roof:0x8B4513 },
    inn:              { w:1.6, h:2.0, d:1.6, color:0xAA7733, roof:0x885522 },
    hospital:         { w:2.0, h:3.5, d:2.4, color:0xFFFFFF, roof:0xDDEEFF },
    farm:             { w:2.4, h:0.3, d:2.4, color:0x5D9E2A, roof:0x3D6E1A },
    lumberMill:       { w:1.6, h:1.8, d:1.2, color:0x8B6914, roof:0x5D3E10 },
    quarry:           { w:2.0, h:0.5, d:2.0, color:0x888888, roof:0x666666 },
    fishery:          { w:1.8, h:1.2, d:1.8, color:0x4488AA, roof:0x226688 },
    workshop:         { w:1.4, h:2.5, d:1.4, color:0x7A8899, roof:0x4A5568 },
    coalMine:         { w:1.2, h:1.2, d:1.2, color:0x555555, roof:0x333333 },
    textileMill:      { w:2.0, h:2.0, d:1.4, color:0xAA6688, roof:0x884466 },
    factory:          { w:2.2, h:3.5, d:2.0, color:0x4A4A4A, roof:0x2A2A2A },
    steelMill:        { w:2.8, h:4.0, d:2.0, color:0x555555, roof:0x333333 },
    powerPlant:       { w:2.2, h:4.0, d:2.2, color:0xAAAAAA, roof:0x888888 },
    oilRefinery:      { w:2.4, h:2.0, d:2.0, color:0xC0C0C0, roof:0x888888 },
    market:           { w:2.0, h:2.2, d:2.0, color:0xFFB800, roof:0xCC9200 },
    tradingPost:      { w:1.4, h:2.8, d:1.4, color:0xDA70D6, roof:0xA040A6 },
    warehouse:        { w:2.8, h:1.8, d:2.0, color:0x556677, roof:0x3A4455 },
    harbor:           { w:2.8, h:0.3, d:1.8, color:0x8B6914, roof:0x665500 },
    airport:          { w:3.2, h:1.2, d:1.0, color:0xCCCCCC, roof:0xAAAAAA },
    school:           { w:1.6, h:3.0, d:1.6, color:0x5A85ED, roof:0x3A65BD },
    library:          { w:2.4, h:2.5, d:1.6, color:0xDDB88C, roof:0xCC9966 },
    university:       { w:3.0, h:3.5, d:2.4, color:0x4169E1, roof:0x2145A0 },
    researchInstitute:{ w:2.0, h:4.0, d:2.0, color:0x223344, roof:0x112233 },
    techPark:         { w:1.2, h:2.0, d:1.0, color:0x88DDFF, roof:0x66BBDD },
    mediaEmpire:      { w:2.0, h:5.0, d:1.8, color:0xAA4488, roof:0x882266 },
    bank:             { w:2.2, h:4.5, d:1.8, color:0xC8D8E8, roof:0x7888A8 },
    mint:             { w:1.6, h:3.5, d:1.4, color:0xCCCCAA, roof:0xAA9988 },
    insurance:        { w:1.8, h:4.0, d:1.6, color:0x668899, roof:0x446677 },
    stockExchange:    { w:2.0, h:7.0, d:1.8, color:0x88CCFF, roof:0x5599CC },
    investmentFirm:   { w:1.8, h:6.0, d:1.6, color:0x334455, roof:0x223344 },
    centralBank:      { w:2.8, h:8.0, d:2.4, color:0xEEEECC, roof:0xCCCC99 },
    globalTradeHub:   { w:2.5, h:5.0, d:2.5, color:0x44AACC, roof:0x226688 },
    cryptoFarm:       { w:1.8, h:2.5, d:1.6, color:0x336633, roof:0x224422 },
    solarFarm:        { w:3.5, h:0.1, d:2.8, color:0x223366, roof:0x112244 },
    spacePort:        { w:2.0, h:6.0, d:2.0, color:0x00CED1, roof:0x009BA0 },
  };

  // ── Zone grid: spiral around zone center ───────────────────────
  function _zoneGrid(count, zoneId) {
    const cen = ZONE_CENTERS[zoneId] || { x:0, z:0 };
    const step = 4.2;
    const D = [[1,0],[0,1],[-1,0],[0,-1]];
    let gx = 0, gz = 0, dir = 0, seg = 1, segCnt = 0, turns = 0;
    const out = [];
    for (let i = 0; out.length < count && i < 500; i++) {
      const wx = cen.x + gx * step, wz = cen.z + gz * step;
      if (Math.sqrt(wx*wx + wz*wz) > 4.5) out.push([wx, wz]);
      gx += D[dir][0]; gz += D[dir][1]; segCnt++;
      if (segCnt === seg) { segCnt = 0; dir = (dir+1)%4; turns++; if (turns%2===0) seg++; }
    }
    return out;
  }

  // ── Building geometry helpers ──────────────────────────────────
  function mat(color, emissive, ei) {
    const m = new THREE.MeshLambertMaterial({ color });
    if (emissive !== undefined) { m.emissive.set(emissive); m.emissiveIntensity = ei || 0.3; }
    return m;
  }
  function box(w, h, d, col, ey, g) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(col));
    m.position.y = ey; m.castShadow = true; g.add(m); return m;
  }
  function cyl(rt, rb, h, seg, col, px, py, pz, g) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(col));
    m.position.set(px, py, pz); m.castShadow = true; g.add(m); return m;
  }
  function cone(r, h, seg, col, px, py, pz, ry, g) {
    // 8-arg form: cone(r,h,seg,col,px,py,ry,g) — no pz; detect by g being undefined
    if (typeof g === 'undefined') { g = ry; ry = pz; pz = 0; }
    const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat(col));
    m.position.set(px || 0, py, pz || 0); if (ry) m.rotation.y = ry; m.castShadow = true; g.add(m); return m;
  }

  // ── Building-specific geometry ─────────────────────────────────

  function _buildHut(g) {
    box(1.0, 0.9, 1.0, 0x8B6914, 0.45, g);
    cone(0.72, 0.7, 4, 0x5D3E10, 0, 1.25, Math.PI/4, g);
  }
  function _buildCottage(g) {
    box(1.3, 1.5, 1.3, 0xCD853F, 0.75, g);
    cone(1.05, 0.9, 4, 0x8B4513, 0, 2.15, Math.PI/4, g);
    // door
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.55, 0.05), mat(0x553300));
    d.position.set(0, 0.275, 0.66); g.add(d);
    // flower boxes
    const fb = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.14), mat(0x664422));
    fb.position.set(0, 0.7, 0.67); g.add(fb);
  }
  function _buildInn(g) {
    box(1.7, 2.0, 1.5, 0xAA7733, 1.0, g);
    box(1.9, 0.2, 1.7, 0x885522, 2.1, g);
    cone(1.35, 1.0, 4, 0x885522, 0, 2.6, Math.PI/4, g);
    // sign
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.05), mat(0x442200));
    s.position.set(0, 1.5, 0.78); g.add(s);
  }
  function _buildFarm(g) {
    box(2.8, 0.18, 2.8, 0x5D9E2A, 0.09, g);
    const bh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.9), mat(0xCC3300));
    bh.position.set(-0.6, 0.7, -0.8); bh.castShadow = true; g.add(bh);
    cone(0.9, 0.7, 4, 0x882200, -0.6, 1.75, -0.8, Math.PI/4, g);
    // silo
    cyl(0.34, 0.34, 2.0, 10, 0xC0A060, 0.8, 1.0, -0.7, g);
    cone(0.37, 0.4, 10, 0x997744, 0.8, 2.2, -0.7, 0, g);
  }
  function _buildLumberMill(g) {
    box(1.6, 1.8, 1.2, 0x8B6914, 0.9, g);
    cone(1.1, 0.8, 4, 0x5D3E10, 0, 2.2, Math.PI/4, g);
    const lm = mat(0x6B4020);
    for (let i = 0; i < 3; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 1.4, 8), lm);
      log.rotation.z = Math.PI/2; log.position.set(0.8, 0.17+i*0.35, -0.3+i*0.1); g.add(log);
    }
    cyl(0.11, 0.14, 0.9, 6, 0x555555, -0.4, 2.3, 0, g);
  }
  function _buildQuarry(g) {
    cyl(1.4, 1.6, 0.3, 8, 0x666666, 0, 0.15, 0, g);
    [[0.4,0,-0.3],[-0.5,0,0.3],[0,0,0.6],[-0.3,0,-0.5]].forEach(([rx,,rz],i) => {
      const rock = new THREE.Mesh(new THREE.BoxGeometry(0.5+i*0.1, 0.4+i*0.1, 0.5+i*0.1), mat(0x888888));
      rock.position.set(rx, 0.4+i*0.1, rz); rock.rotation.y = i*0.7; rock.castShadow = true; g.add(rock);
    });
    cyl(0.06, 0.08, 2.5, 6, 0x777777, 0.8, 1.25, 0, g);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.1), mat(0x777777));
    arm.position.set(0.2, 2.5, 0); g.add(arm);
  }
  function _buildFishery(g) {
    box(1.8, 0.25, 1.8, 0x8B6914, 0.125, g);
    const water = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.15, 1.4), mat(0x1155AA));
    water.position.set(0, 0.08, 1.3); g.add(water);
    box(1.0, 1.4, 0.9, 0x5577AA, 0.7, g);
    cyl(0.06, 0.06, 2.5, 6, 0x666666, 0.7, 1.25, 1.5, g);
    // net
    const nm = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.0), mat(0x886644));
    nm.position.set(1.1, 1.2, 1.3); nm.rotation.y = Math.PI/2; g.add(nm);
  }
  function _buildWorkshop(g) {
    box(1.6, 2.2, 1.4, 0x7A8899, 1.1, g);
    cone(1.2, 0.8, 4, 0x4A5568, 0, 2.6, Math.PI/4, g);
    cyl(0.14, 0.17, 1.2, 8, 0x444444, 0.4, 2.8, 0, g);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.7, 0.05), mat(0x553300));
    door.position.set(0, 0.35, 0.71); g.add(door);
  }
  function _buildCoalMine(g) {
    const sm = mat(0x666666);
    const lB = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.5, 0.14), sm);
    lB.position.set(-0.8, 1.75, 0); lB.rotation.z = 0.2; g.add(lB);
    const rB = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.5, 0.14), sm);
    rB.position.set(0.8, 1.75, 0); rB.rotation.z = -0.2; g.add(rB);
    const cross = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.14), sm);
    cross.position.set(0, 3.0, 0); g.add(cross);
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.07, 8, 16), mat(0x888888));
    wheel.position.set(0, 3.5, 0); wheel.rotation.x = Math.PI/2; g.add(wheel);
    box(1.2, 1.2, 1.2, 0x8B6914, 0.6, g);
  }
  function _buildTextileMill(g) {
    box(2.0, 1.8, 1.4, 0xAA6688, 0.9, g);
    cyl(0.15, 0.18, 2.5, 8, 0x444444, 0.6, 2.65, 0, g);
    // looms hint
    for (let i = 0; i < 3; i++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.5, 0.04), mat(0xBBAAFF));
      w.position.set(-0.6+i*0.6, 1.1, 0.71); g.add(w);
    }
  }
  function _buildFactory(g) {
    box(2.2, 3.5, 2.0, 0x4A4A4A, 1.75, g);
    const sm = mat(0x333333);
    [[-0.7, 0.3], [0.3, 0.3], [0.8, -0.2]].forEach(([sx, sz]) => {
      cyl(0.17, 0.21, 3.8, 8, 0x333333, sx, 5.4, sz, g);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.05, 6, 12), mat(0x888888));
      ring.position.set(sx, 7.35, sz); ring.rotation.x = Math.PI/2; g.add(ring);
    });
    const wm = mat(0xFFDD88); wm.emissive.set(0xAA8800); wm.emissiveIntensity = 0.35;
    for (let i = 0; i < 4; i++) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.05), wm);
      win.position.set(-0.9+i*0.6, 2.2, 1.01); g.add(win);
    }
  }
  function _buildPowerPlant(g) {
    const cm = mat(0xAAAAAA);
    [[-1.0, 0], [1.0, 0]].forEach(([tx, tz]) => {
      cyl(0.65, 0.88, 2.2, 12, 0xBBBBBB, tx, 1.1, tz, g);
      cyl(0.48, 0.65, 2.2, 12, 0xBBBBBB, tx, 3.3, tz, g);
      cyl(0.5, 0.5, 0.15, 12, 0xCCCCCC, tx, 4.45, tz, g);
    });
    box(1.2, 2.5, 1.0, 0x777777, 1.25, g);
  }
  function _buildSteelMill(g) {
    box(2.8, 4.0, 2.0, 0x555555, 2.0, g);
    [-0.9, 0.6].forEach(fx => cyl(0.44, 0.5, 5.0, 10, 0x8B4513, fx, 2.5, -0.8, g));
    [-0.5, 0.5, 1.1].forEach(cx => cyl(0.14, 0.19, 4.5, 8, 0x333333, cx, 6.25, 0.5, g));
  }
  function _buildOilRefinery(g) {
    [[-0.8, -0.5], [0.8, -0.5], [0.0, 0.7]].forEach(([tx, tz]) => {
      cyl(0.64, 0.64, 2.0, 12, 0xBBBBBB, tx, 1.0, tz, g);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.64, 10, 6, 0, Math.PI*2, 0, Math.PI/2), mat(0xBBBBBB));
      dome.position.set(tx, 2.0, tz); g.add(dome);
    });
    cyl(0.07, 0.1, 5.2, 6, 0x888888, 0.3, 2.6, -0.9, g);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.4, 6), mat(0xFF6600, 0xFF3300, 0.9));
    flame.position.set(0.3, 5.4, -0.9); g.add(flame);
  }
  function _buildMarket(g) {
    box(2.2, 0.18, 2.2, 0xBBBBBB, 0.09, g);
    [[-0.65, -0.55], [0.65, -0.55], [-0.65, 0.55], [0.65, 0.55]].forEach(([sx, sz]) => {
      box(0.7, 1.2, 0.6, 0xFFB800, 0.8+0.09, g);
      const stall = g.children[g.children.length-1]; stall.position.set(sx, 0.7, sz);
      box(0.9, 0.05, 0.7, 0xFF8800, 1.6, g);
      const awn = g.children[g.children.length-1]; awn.position.set(sx, 1.55, sz);
    });
    cyl(0.12, 0.12, 1.8, 8, 0xAAAAAA, 0, 0.9, 0, g);
  }
  function _buildTradingPost(g) {
    box(1.4, 2.8, 1.4, 0xDA70D6, 1.4, g);
    [[-0.5,-0.5],[0.5,-0.5],[-0.5,0.5],[0.5,0.5]].forEach(([mx,mz]) => {
      box(0.25, 0.4, 0.25, 0xBB50B6, 3.0, g);
      const mer = g.children[g.children.length-1]; mer.position.set(mx, 3.0, mz);
    });
    cyl(0.04, 0.04, 1.5, 6, 0x888888, 0, 3.75, 0, g);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), mat(0xFF4400));
    flag.position.set(0.25, 4.35, 0); flag.material.side = THREE.DoubleSide; g.add(flag);
  }
  function _buildWarehouse(g) {
    box(2.8, 1.8, 2.0, 0x556677, 0.9, g);
    const arch = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, 2.8, 12, 1, false, 0, Math.PI), mat(0x3A4455));
    arch.position.y = 1.8; arch.rotation.z = Math.PI/2; g.add(arch);
    box(0.7, 0.9, 0.1, 0x334455, 0.45, g);
    const bay = g.children[g.children.length-1]; bay.position.set(0, 0.45, 1.01);
  }
  function _buildHarbor(g) {
    box(2.8, 0.28, 1.8, 0x8B6914, 0.14, g);
    const water = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 1.2), mat(0x1155AA));
    water.material.transparent = true; water.material.opacity = 0.75;
    water.position.set(0, 0.07, 1.4); g.add(water);
    const tw = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.5, 0.24), mat(0x886600));
    tw.position.set(-1.0, 1.75, -0.4); g.add(tw);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.14, 0.14), mat(0x886600));
    arm.position.set(0, 3.5, -0.4); g.add(arm);
    box(1.4, 1.8, 1.2, 0x555577, 0.9, g);
    const wh = g.children[g.children.length-1]; wh.position.set(0.7, 0.9, -0.6);
  }
  function _buildAirport(g) {
    box(3.2, 1.2, 1.0, 0xCCCCCC, 0.6, g);
    cyl(0.22, 0.28, 3.5, 8, 0xAAAAAA, 1.2, 1.75, 0, g);
    const cab = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.28, 0.5, 8), mat(0x88CCFF, 0x2244AA, 0.3));
    cab.position.set(1.2, 3.75, 0); g.add(cab);
    box(0.4, 0.02, 3.0, 0x333333, 0.01, g);
    const rw = g.children[g.children.length-1]; rw.position.set(-0.8, 0.01, 0.8);
  }
  function _buildBank(g) {
    box(2.2, 4.5, 1.8, 0xD8E8F0, 2.25, g);
    box(2.6, 0.2, 2.2, 0xCCDDEE, 0.1, g);
    [-0.8, 0, 0.8].forEach(cx => cyl(0.14, 0.17, 3.8, 10, 0xF0F8FF, cx, 2.1, 1.0, g));
    cone(1.25, 0.8, 3, 0xBBCCDD, 0, 5.5, 0.9, Math.PI/6, g);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 8, 0, Math.PI*2, 0, Math.PI/2), mat(0xFFD700, 0xAA8800, 0.3));
    dome.position.set(0, 4.7, 0); g.add(dome);
  }
  function _buildMint(g) {
    box(1.6, 3.5, 1.4, 0xCCCCAA, 1.75, g);
    [-0.5, 0.5].forEach(cx => cyl(0.12, 0.15, 2.8, 8, 0xEEEECC, cx, 1.6, 0.75, g));
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 16), mat(0xFFD700, 0xAA8800, 0.4));
    coin.position.set(0, 3.8, 0); g.add(coin);
  }
  function _buildInsurance(g) {
    box(1.8, 4.0, 1.6, 0x668899, 2.0, g);
    box(1.9, 0.2, 1.7, 0x446677, 4.1, g);
    cyl(0.07, 0.09, 1.0, 6, 0x888888, 0, 4.7, 0, g);
    const shield = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.05), mat(0xFFFFFF));
    shield.position.set(0, 2.8, 0.81); g.add(shield);
  }
  function _buildStockExchange(g) {
    const gm = mat(0x88CCFF, 0x1133AA, 0.2);
    box(2.0, 7.0, 1.8, 0x88CCFF, 3.5, g);
    const b = g.children[g.children.length-1]; b.material = gm;
    box(1.4, 1.5, 1.2, 0x88CCFF, 7.75, g);
    const t = g.children[g.children.length-1]; t.material = gm;
    cyl(0.04, 0.06, 2.0, 6, 0xCCCCCC, 0, 9.5, 0, g);
  }
  function _buildInvestmentFirm(g) {
    box(1.8, 6.0, 1.6, 0x334455, 3.0, g);
    box(1.2, 2.0, 1.0, 0x334455, 7.0, g);
    const gold = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.14, 1.62), mat(0xFFD700));
    gold.position.y = 6.05; g.add(gold);
  }
  function _buildCentralBank(g) {
    box(2.8, 8.0, 2.4, 0xEEEECC, 4.0, g);
    [-1.0, -0.33, 0.33, 1.0].forEach(cx => cyl(0.19, 0.24, 6.0, 12, 0xFFFFEE, cx, 3.2, 1.3, g));
    cone(1.6, 1.2, 3, 0xDDDDBB, 0, 9.6, 1.2, Math.PI/6, g);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.78, 12, 8, 0, Math.PI*2, 0, Math.PI/2), mat(0xFFD700, 0xCCAA00, 0.5));
    dome.position.set(0, 8.4, 0); g.add(dome);
  }
  function _buildGlobalTradeHub(g) {
    box(1.8, 3.0, 1.8, 0x44AACC, 1.5, g);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.0, 14, 10), mat(0x2288BB, 0x1166AA, 0.2));
    sphere.position.set(0, 4.0, 0); g.add(sphere);
    cyl(0.06, 0.06, 2.2, 6, 0x888888, 0, 2.1, 0, g);
  }
  function _buildLibrary(g) {
    box(2.4, 2.5, 1.6, 0xDDB88C, 1.25, g);
    [-0.8, 0, 0.8].forEach(cx => cyl(0.11, 0.14, 2.0, 8, 0xEECCA0, cx, 1.1, 0.85, g));
    cone(1.35, 0.6, 3, 0xCC9966, 0, 2.8, 0.8, Math.PI/6, g);
    const wm = mat(0x4444AA, 0x2222AA, 0.3);
    for (let i = 0; i < 3; i++) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.5, 0.05), wm);
      win.position.set(-0.6+i*0.6, 1.5, 0.82); g.add(win);
    }
  }
  function _buildSchool(g) {
    box(1.6, 3.0, 1.6, 0x5A85ED, 1.5, g);
    box(1.8, 0.18, 1.8, 0x3A65BD, 3.09, g);
    cyl(0.16, 0.18, 0.6, 8, 0xFFD700, 0, 3.48, 0, g);
    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), mat(0xFFCC00));
    bell.position.set(0, 3.85, 0); g.add(bell);
  }
  function _buildUniversity(g) {
    box(3.0, 3.5, 2.4, 0x4169E1, 1.75, g);
    [-1.3, 1.3].forEach(wx => { const wing = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.2, 1.6), mat(0x3355BB)); wing.position.set(wx, 1.1, 0); g.add(wing); });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.88, 12, 8, 0, Math.PI*2, 0, Math.PI/2), mat(0x4169E1, 0x112288, 0.3));
    dome.position.y = 3.5; g.add(dome);
    cyl(0.18, 0.28, 0.5, 8, 0xFFD700, 0, 4.35, 0, g);
    [-1.0, -0.33, 0.33, 1.0].forEach(cx => cyl(0.11, 0.14, 2.8, 8, 0xFFFFFF, cx, 1.6, 1.3, g));
  }
  function _buildResearchInstitute(g) {
    box(2.0, 4.0, 2.0, 0x223344, 2.0, g);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.68, 12, 8, 0, Math.PI*2, 0, Math.PI/2), mat(0x88CCFF, 0x2244AA, 0.3));
    dome.position.y = 4.0; g.add(dome);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 8, 0, Math.PI*2, 0, Math.PI/2), mat(0xCCCCCC));
    dish.position.set(0.8, 4.8, 0); dish.rotation.z = -Math.PI/4; g.add(dish);
    cyl(0.04, 0.06, 3.0, 6, 0x888888, 0, 6.0, 0, g);
  }
  function _buildTechPark(g) {
    const gm = mat(0x88DDFF, 0x1155AA, 0.15);
    [[0,2.0,0],[-1.1,1.2,0.3],[1.1,1.5,-0.2]].forEach(([bx,bh,bz]) => {
      const bld = new THREE.Mesh(new THREE.BoxGeometry(1.2, bh, 1.0), gm);
      bld.position.set(bx, bh/2, bz); bld.castShadow = true; g.add(bld);
    });
    const wk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 0.3), mat(0x446688));
    wk.position.set(0, 1.0, 0.2); g.add(wk);
  }
  function _buildHospital(g) {
    box(2.0, 3.5, 1.4, 0xFFFFFF, 1.75, g);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.5, 2.4), mat(0xFFFFFF));
    wing.position.y = 1.25; g.add(wing);
    const rm = mat(0xFF2222);
    const ch = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.14), rm); ch.position.set(0, 2.8, 0.72); g.add(ch);
    const cv = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.7, 0.14), rm); cv.position.set(0, 2.8, 0.73); g.add(cv);
  }
  function _buildMediaEmpire(g) {
    box(2.0, 5.0, 1.8, 0xAA4488, 2.5, g);
    cyl(0.06, 0.06, 5.0, 6, 0x888888, 0.4, 7.5, 0, g);
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8, 0, Math.PI*2, 0, Math.PI/2), mat(0xCCCCCC));
    dish.position.set(-0.6, 6.0, 0.3); dish.rotation.z = 0.4; g.add(dish);
  }
  function _buildCryptoFarm(g) {
    box(1.8, 2.5, 1.6, 0x223322, 1.25, g);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
      const srv = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.05), mat(0x336633, 0x00FF00, 0.25));
      srv.position.set(-0.3+c*0.7, 0.5+r*0.65, 0.81); g.add(srv);
    }
    cyl(0.14, 0.14, 1.8, 6, 0x888888, -0.6, 2.4, -0.7, g);
  }
  function _buildSolarFarm(g) {
    const pm = mat(0x223366, 0x112244, 0.3);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.6), pm);
      p.position.set(-1.2+c*0.85, 0.8, -0.8+r*0.85); p.rotation.x = -0.4; g.add(p);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5), mat(0x888888));
      post.position.set(-1.2+c*0.85, 0.4, -0.8+r*0.85); g.add(post);
    }
    box(0.5, 0.6, 0.4, 0x666666, 0.3, g);
    const inv = g.children[g.children.length-1]; inv.position.set(-1.5, 0.3, 0.8);
  }
  function _buildSpacePort(g) {
    cyl(1.9, 2.1, 0.4, 8, 0x888888, 0, 0.2, 0, g);
    [-1.0, 1.0].forEach(sx => {
      const str = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6.0, 0.2), mat(0x666666));
      str.position.set(sx, 3.0, 0); g.add(str);
    });
    cyl(0.38, 0.48, 5.0, 12, 0xEEEEEE, 0, 3.5, 0, g);
    cone(0.38, 1.5, 12, 0x00CED1, 0, 6.75, 0, 0, g);
    [0, Math.PI/2, Math.PI, 3*Math.PI/2].forEach(a => {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 0.8), mat(0xDDDDDD));
      fin.position.set(Math.cos(a)*0.54, 1.4, Math.sin(a)*0.54); fin.rotation.y = a; g.add(fin);
    });
    const ex = new THREE.Mesh(new THREE.ConeGeometry(0.33, 0.8, 10), mat(0xFF6600, 0xFF3300, 0.9));
    ex.rotation.x = Math.PI; ex.position.set(0, 0.8, 0); g.add(ex);
  }

  // ── Generic fallback ─────────────────────────────────────────────
  function _buildGeneric(g, def) {
    const { w, h, d, color, roof } = def;
    box(w, h, d, color, h/2, g);
    if (h >= 5) {
      box(w*1.1, 0.2, d*1.1, roof, h+0.1, g);
      cyl(0.04, 0.06, h*0.22, 6, 0x666666, 0, h+h*0.11+0.2, 0, g);
    } else if (h >= 2) {
      cone(Math.max(w,d)*0.76, h*0.4, 4, roof, 0, h+h*0.2, 0, Math.PI/4, g);
    } else {
      box(w*1.08, 0.16, d*1.08, roof, h+0.08, g);
    }
  }

  // ── Main building factory ────────────────────────────────────────
  const BUILD_FNS = {
    hut:_buildHut, cottage:_buildCottage, inn:_buildInn, hospital:_buildHospital,
    farm:_buildFarm, lumberMill:_buildLumberMill, quarry:_buildQuarry, fishery:_buildFishery,
    workshop:_buildWorkshop, coalMine:_buildCoalMine, textileMill:_buildTextileMill,
    factory:_buildFactory, steelMill:_buildSteelMill, powerPlant:_buildPowerPlant, oilRefinery:_buildOilRefinery,
    market:_buildMarket, tradingPost:_buildTradingPost, warehouse:_buildWarehouse, harbor:_buildHarbor, airport:_buildAirport,
    school:_buildSchool, library:_buildLibrary, university:_buildUniversity,
    researchInstitute:_buildResearchInstitute, techPark:_buildTechPark, mediaEmpire:_buildMediaEmpire,
    bank:_buildBank, mint:_buildMint, insurance:_buildInsurance,
    stockExchange:_buildStockExchange, investmentFirm:_buildInvestmentFirm,
    centralBank:_buildCentralBank, globalTradeHub:_buildGlobalTradeHub,
    cryptoFarm:_buildCryptoFarm, solarFarm:_buildSolarFarm, spacePort:_buildSpacePort,
  };

  function _makeBuilding(id, x, z, idx) {
    const g = new THREE.Group();
    const s = (idx+1)*1234567;
    g.position.set(x+((s%100)/100-0.5)*0.5, 0, z+(((s*7)%100)/100-0.5)*0.5);
    g.rotation.y = ((s%80)/80-0.5)*0.8;
    const fn = BUILD_FNS[id];
    if (fn) fn(g);
    else _buildGeneric(g, BLD[id] || { w:1.2, h:1.5, d:1.2, color:0x888888, roof:0x555555 });
    g.userData.pOff = (idx*0.618)%(Math.PI*2);
    return g;
  }

  // ── Rebuild city with zone placement ────────────────────────────
  function rebuildCity() {
    for (const m of buildingMeshes) cityGroup.remove(m);
    buildingMeshes = [];

    const byZone = {};
    if (typeof GS !== 'undefined') {
      for (const id of Object.keys(BLD)) {
        const cnt = GS.buildings[id] || 0;
        if (!cnt) continue;
        const zone = BUILDING_ZONE[id] || 'residential';
        if (!byZone[zone]) byZone[zone] = [];
        for (let i = 0; i < Math.min(cnt, 12); i++) byZone[zone].push(id);
      }
    }
    if (!Object.keys(byZone).length) byZone.residential = ['hut'];

    let idx = 0;
    for (const [zone, ids] of Object.entries(byZone)) {
      const positions = _zoneGrid(ids.length, zone);
      ids.forEach((id, i) => {
        const [px, pz] = positions[i] || [ZONE_CENTERS[zone].x, ZONE_CENTERS[zone].z];
        const g = _makeBuilding(id, px, pz, idx++);
        g.userData.buildingId = id;
        cityGroup.add(g);
        buildingMeshes.push(g);
      });
    }
    lastBuildSig = _getBuildSig();
  }

  function _getBuildSig() {
    if (typeof GS === 'undefined') return '';
    return Object.entries(GS.buildings).map(([k,v])=>k+v).join('|');
  }

  // ── Zone zoom (called from tabs) ────────────────────────────────
  function zoomToZone(zone) {
    if (!zone) {
      rotPaused = false;
      rotTarget = null;
      camTarget = null;
      lookTarget = { x:0, y:4, z:0 };
      return;
    }
    rotPaused = true;
    rotTarget = ZONE_ROT[zone] || 0;
    const zc = ZONE_CENTERS[zone] || { x:0, z:0 };
    const θ = rotTarget;
    const wx = zc.x * Math.cos(θ) + zc.z * Math.sin(θ);
    const wz = -zc.x * Math.sin(θ) + zc.z * Math.cos(θ);
    camTarget  = { x: wx * 0.1, y: 28, z: Math.max(wz * 0.35, 0) + 42 };
    lookTarget = { x: wx * 0.45, y: 5, z: wz * 0.62 };
  }

  // ── Selection ────────────────────────────────────────────────────
  function _selectBuilding(group, e) {
    if (selectedGroup && selectedGroup !== group) _unhighlight(selectedGroup);
    selectedGroup = group;
    rotPaused = true;
    const wp = new THREE.Vector3();
    group.getWorldPosition(wp);
    const frac = Math.max(0.25, 1 - wp.length()/40);
    camTarget  = { x: wp.x*frac, y: 14, z: wp.z*frac+18 };
    lookTarget = { x: wp.x*0.5, y: 3, z: wp.z*0.5 };
    _highlight(group);
    clickPulse = 1.0;
    if (typeof EmpireUI !== 'undefined') EmpireUI.showBuildingPanel(group.userData.buildingId, e);
  }

  function _clearSelection() {
    if (selectedGroup) { _unhighlight(selectedGroup); selectedGroup = null; }
    rotPaused  = false;
    rotTarget  = null;
    camTarget  = null;
    lookTarget = { x:0, y:4, z:0 };
    if (typeof EmpireUI !== 'undefined') EmpireUI.hideBuildingPanel();
  }

  function _highlight(group) {
    group.userData._targetScale = 1.2;
    group.traverse(c => {
      if (c.isMesh && c.geometry.type !== 'PlaneGeometry' && c.material?.emissive) {
        c.material.emissive.set(0x443300); c.material.emissiveIntensity = 0.55;
      }
    });
  }
  function _unhighlight(group) {
    group.userData._targetScale = 1.0;
    group.traverse(c => {
      if (c.isMesh && c.material?.emissive) {
        c.material.emissive.set(0x000000); c.material.emissiveIntensity = 0;
      }
    });
  }

  // ── Ground ───────────────────────────────────────────────────────
  function _buildGround() {
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshLambertMaterial({ color:0x2d6030 }));
    grass.rotation.x = -Math.PI/2; grass.receiveShadow = true; cityGroup.add(grass);

    const paved = new THREE.Mesh(new THREE.PlaneGeometry(52, 52), new THREE.MeshLambertMaterial({ color:0x444444 }));
    paved.rotation.x = -Math.PI/2; paved.position.set(0, 0.008, 0); cityGroup.add(paved);

    const roadMat = new THREE.MeshLambertMaterial({ color:0x333333 });
    [[80,1.4,0,0],[1.4,80,0,0],[80,1.0,0,12],[80,1.0,0,-12],[1.0,80,12,0],[1.0,80,-12,0]].forEach(([w,d,x,z]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), roadMat);
      m.rotation.x = -Math.PI/2; m.position.set(x, 0.012, z); cityGroup.add(m);
    });

    const markMat = new THREE.MeshLambertMaterial({ color:0xFFFF88 });
    for (let i = -10; i <= 10; i++) {
      [[i*1.9,0,0.08,0.7],[0,i*1.9,0.7,0.08]].forEach(([x,z,w,d]) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), markMat);
        m.rotation.x = -Math.PI/2; m.position.set(x, 0.02, z); cityGroup.add(m);
      });
    }

    const plaza = new THREE.Mesh(new THREE.PlaneGeometry(4,4), new THREE.MeshLambertMaterial({ color:0x888888 }));
    plaza.rotation.x = -Math.PI/2; plaza.position.set(0, 0.02, 0); cityGroup.add(plaza);

    const fontBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.3,0.35,16), new THREE.MeshLambertMaterial({ color:0x777777 }));
    fontBase.position.set(0,0.175,0); fontBase.castShadow = true; cityGroup.add(fontBase);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.9,0.9,0.18,16), new THREE.MeshLambertMaterial({ color:0x3399CC, emissive:new THREE.Color(0x1133AA), emissiveIntensity:0.4 }));
    water.position.set(0,0.44,0); cityGroup.add(water);

    const trunkMat = new THREE.MeshLambertMaterial({ color:0x4A2C0A });
    const leafColors = [0x228B22,0x2E8B57,0x3CB371,0x006400];
    [[-7,-7],[7,-7],[-7,7],[7,7],[-12,0],[12,0],[0,-12],[0,12],
     [-5,-10],[5,-10],[-10,-5],[10,5],[-10,5],[5,10],[-5,10],[10,-5],
     [-15,4],[-15,-4],[15,4],[15,-4],[4,-15],[4,15],[-4,-15],[-4,15],
     [-18,0],[18,0],[0,-18],[0,18]].forEach(([tx,tz],i) => {
      const h = 0.8+(i%4)*0.3;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.18,h+0.4,6), trunkMat);
      t.position.set(tx,(h+0.4)/2,tz); t.castShadow = true; cityGroup.add(t);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.58+(i%3)*0.14,6,5), new THREE.MeshLambertMaterial({ color:leafColors[i%4] }));
      l.position.set(tx,h+0.52,tz); l.castShadow = true; cityGroup.add(l);
    });

    const lampPost = new THREE.MeshLambertMaterial({ color:0x888888 });
    const lampHead = new THREE.MeshLambertMaterial({ color:0xFFEE88, emissive:new THREE.Color(0xFFCC44), emissiveIntensity:0.8 });
    [[-3,3],[3,3],[-3,-3],[3,-3],[8,8],[-8,8],[8,-8],[-8,-8]].forEach(([x,z]) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,3.5,6), lampPost);
      pole.position.set(x,1.75,z); cityGroup.add(pole);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18,8,6), lampHead);
      head.position.set(x,3.6,z); cityGroup.add(head);
    });
  }

  // ── Animate ───────────────────────────────────────────────────────
  function _animate() {
    if (!animating) return;
    requestAnimationFrame(_animate);
    const dt = Math.min(clock.getDelta(), 0.1);

    // Rotation
    if (!rotPaused) {
      rotAngle += dt * 0.08;
      cityGroup.rotation.y = rotAngle;
    } else if (rotTarget !== null) {
      let diff = rotTarget - rotAngle;
      while (diff >  Math.PI) diff -= Math.PI*2;
      while (diff < -Math.PI) diff += Math.PI*2;
      rotAngle += diff * Math.min(1, dt * 2.5);
      cityGroup.rotation.y = rotAngle;
    }

    // Click pulse
    if (clickPulse > 0) {
      clickPulse = Math.max(0, clickPulse - dt*2.5);
      pulseLight.intensity = clickPulse * 4;
      for (const m of buildingMeshes) {
        m.position.y = Math.max(0, Math.sin(m.userData.pOff+(1-clickPulse)*Math.PI*3)) * clickPulse * 2;
      }
    } else {
      if (pulseLight.intensity > 0) pulseLight.intensity = Math.max(0, pulseLight.intensity - dt*4);
      for (const m of buildingMeshes) if (m.position.y !== 0) m.position.y = 0;
    }

    // Scale lerp
    for (const m of buildingMeshes) {
      const tgt = m.userData._targetScale || 1.0;
      const cur = m.scale.x;
      m.scale.setScalar(cur + (tgt-cur)*Math.min(1, dt*6));
    }

    // Camera lerp
    const cp = camTarget || CAM_DEFAULT;
    camera.position.x += (cp.x - camera.position.x) * Math.min(1, dt*3);
    camera.position.y += (cp.y - camera.position.y) * Math.min(1, dt*3);
    camera.position.z += (cp.z - camera.position.z) * Math.min(1, dt*3);
    lookCur.x += (lookTarget.x - lookCur.x) * Math.min(1, dt*3);
    lookCur.y += (lookTarget.y - lookCur.y) * Math.min(1, dt*3);
    lookCur.z += (lookTarget.z - lookCur.z) * Math.min(1, dt*3);
    camera.lookAt(lookCur);

    const sig = _getBuildSig();
    if (sig !== lastBuildSig) rebuildCity();

    renderer.render(scene, camera);
  }

  return {
    init(containerId) {
      const container = document.getElementById(containerId);
      if (!container || typeof THREE === 'undefined') return;

      raycaster = new THREE.Raycaster();
      mouse     = new THREE.Vector2();
      const W = window.innerWidth, H = window.innerHeight;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB);
      scene.fog = new THREE.FogExp2(0xA8D8F0, 0.010);

      camera = new THREE.PerspectiveCamera(42, W/H, 0.1, 300);
      camera.position.set(CAM_DEFAULT.x, CAM_DEFAULT.y, CAM_DEFAULT.z);
      camera.lookAt(0, 4, 0);

      renderer = new THREE.WebGLRenderer({ antialias:true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;display:block;';

      cityGroup = new THREE.Group();
      scene.add(cityGroup);

      scene.add(new THREE.HemisphereLight(0xC8E8FF, 0x448844, 0.6));
      const sun = new THREE.DirectionalLight(0xFFFCE8, 1.3);
      sun.position.set(15,30,20); sun.castShadow = true;
      sun.shadow.mapSize.set(2048,2048);
      sun.shadow.camera.left = sun.shadow.camera.bottom = -35;
      sun.shadow.camera.right = sun.shadow.camera.top = 35;
      sun.shadow.camera.far = 100; sun.shadow.bias = -0.002;
      scene.add(sun);

      pulseLight = new THREE.PointLight(0xFFAA33, 0, 40);
      pulseLight.position.set(0,8,0);
      scene.add(pulseLight);

      clock = new THREE.Clock();
      _buildGround();
      rebuildCity();

      renderer.domElement.addEventListener('click', e => {
        if (typeof Tabs !== 'undefined' && Tabs.current !== 'empire') return;
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const checkMeshes = [];
        buildingMeshes.forEach(g => g.traverse(c => { if (c.isMesh) checkMeshes.push(c); }));
        const hits = raycaster.intersectObjects(checkMeshes, false);
        if (hits.length > 0) {
          let obj = hits[0].object;
          while (obj && obj !== scene) {
            if (obj.userData?.buildingId) { _selectBuilding(obj, e); return; }
            obj = obj.parent;
          }
        }
        if (typeof EmpireUI !== 'undefined') EmpireUI._handleClick(e);
        clickPulse = 1.0;
        _clearSelection();
      });

      window.addEventListener('resize', () => {
        const w = window.innerWidth, h = window.innerHeight;
        camera.aspect = w/h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });

      animating = true;
      _animate();
    },

    zoomToZone,
    triggerPulse() { clickPulse = 1.0; },
    clearSelection: _clearSelection,
    rebuildCity,
    destroy() { animating = false; if (renderer) renderer.dispose(); },
  };
})();
