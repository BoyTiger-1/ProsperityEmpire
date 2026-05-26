/* ── CITY SCENE — zone-based 3D city ── */
const CityScene = (() => {
  let renderer, scene, camera, clock;
  let cityGroup, pulseLight;
  let buildingMeshes = [];
  let pedestrianGroups = [];
  let landmarkGroups = [];
  let effectGroups = [];
  let envAnim = null;
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

  // Road waypoints for pedestrian pathfinding (local cityGroup space)
  const ROAD_WPS = [
    {x:0,z:0},{x:14,z:0},{x:-14,z:0},{x:0,z:14},{x:0,z:-14},
    {x:27,z:0},{x:-27,z:0},{x:0,z:27},{x:0,z:-27},
    {x:13,z:13},{x:-13,z:13},{x:13,z:-13},{x:-13,z:-13},
    {x:14,z:13},{x:-14,z:13},{x:14,z:-13},{x:-14,z:-13},
    {x:13,z:14},{x:-13,z:14},{x:13,z:-14},{x:-13,z:-14},
  ];

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
      // i > 0: skip zone centre — reserved for landmark building
      if (i > 0 && Math.sqrt(wx*wx + wz*wz) > 4.5) out.push([wx, wz]);
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

  // ── Era-based atmospheric tinting ────────────────────────────────
  function _applyEraStyle(g) {
    const phase = (typeof GS !== 'undefined') ? GS.phase : 'early';
    // Subtle emissive tint per era — only affects meshes with no existing glow
    const ERA = {
      early:    { col:0x1A0800, int:0.10 }, // warm amber-sepia (fire-lit, ancient)
      mid:      { col:0x060200, int:0.04 }, // very slight warm (industrial age)
      late:     { col:0x000A18, int:0.06 }, // cool steel-blue (modern glass)
      advanced: { col:0x00141A, int:0.09 }, // cyan-chrome (financial empire)
    };
    const tint = ERA[phase];
    if (!tint) return;
    g.traverse(c => {
      if (!c.isMesh || !c.material || !c.material.emissive) return;
      if ((c.material.emissiveIntensity || 0) > 0.15) return; // preserve existing glows
      c.material.emissive.setHex(tint.col);
      c.material.emissiveIntensity = tint.int;
    });
  }

  // ── Primitive era building (used for all buildings in early phase) ──
  const PRIM_WALLS = [0xAA9977, 0x9B8B6F, 0xBBAA88, 0x8B7355, 0xC4A880, 0x957A5A, 0xB09878];
  const PRIM_ROOFS = [0x6B4C1A, 0x7A5520, 0x5A3E10, 0x8B6320, 0x4A3308, 0x6D5015];

  function _buildPrimitive(g, id) {
    const bld = BLD[id] || { w:1.2, h:1.5, d:1.2 };
    const w = Math.max(0.9, bld.w * 0.85);
    const h = Math.max(0.8, bld.h * 0.65);
    const d = Math.max(0.9, bld.d * 0.85);
    const seed = id.split('').reduce((s, c, i) => s + c.charCodeAt(0) * (i+1), 0);
    const wallMat = new THREE.MeshLambertMaterial({ color: PRIM_WALLS[seed % PRIM_WALLS.length] });
    const roofMat = new THREE.MeshLambertMaterial({ color: PRIM_ROOFS[seed % PRIM_ROOFS.length] });
    const doorMat = new THREE.MeshLambertMaterial({ color: 0x2D1E06 });

    // Stone/mud body
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h * 0.72, d), wallMat);
    body.position.y = h * 0.36; body.castShadow = true; g.add(body);

    // Thatched pyramid roof
    const roofR = Math.max(w, d) * 0.70;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(roofR, h * 0.46, 4), roofMat);
    roof.position.y = h * 0.72 + h * 0.23; roof.rotation.y = Math.PI/4; roof.castShadow = true; g.add(roof);

    // Rough wooden door
    const door = new THREE.Mesh(new THREE.BoxGeometry(w * 0.22, h * 0.38, 0.06), doorMat);
    door.position.set(0, h * 0.19, d * 0.46); g.add(door);

    // Tall buildings get a stone tower on top
    if (h >= 2.5) {
      const tw = new THREE.Mesh(new THREE.BoxGeometry(w*0.5, h*0.38, d*0.5), wallMat);
      tw.position.y = h * 0.72 + h * 0.19; tw.castShadow = true; g.add(tw);
      const tr = new THREE.Mesh(new THREE.ConeGeometry(w*0.38, h*0.28, 4), roofMat);
      tr.position.y = h * 0.72 + h * 0.38 + h * 0.14; tr.rotation.y = Math.PI/4; g.add(tr);
    }
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
    const phase = (typeof GS !== 'undefined') ? GS.phase : 'early';
    if (phase === 'early') {
      _buildPrimitive(g, id);
    } else {
      const fn = BUILD_FNS[id];
      if (fn) fn(g);
      else _buildGeneric(g, BLD[id] || { w:1.2, h:1.5, d:1.2, color:0x888888, roof:0x555555 });
    }
    _applyEraStyle(g);
    g.userData.pOff = (idx*0.618)%(Math.PI*2);
    return g;
  }

  // ── Rebuild city with zone placement ────────────────────────────
  function rebuildCity() {
    // Clear any stale selection before removing old groups
    if (selectedGroup) {
      selectedGroup = null;
      if (typeof EmpireUI !== 'undefined') EmpireUI.hideBuildingPanel();
    }
    _buildLandmarks();
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
    return GS.phase + '|' + Object.entries(GS.buildings).map(([k,v])=>k+v).join('|');
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
    // Pull back enough to see the full landmark building, nice 3/4 overhead angle
    camTarget  = { x: wx * 0.3, y: 24, z: wz * 0.22 + 40 };
    lookTarget = { x: wx * 0.6, y: 4,  z: wz * 0.6 };
  }

  // ── Selection ────────────────────────────────────────────────────
  function _selectBuilding(group, e) {
    if (selectedGroup && selectedGroup !== group) _unhighlight(selectedGroup);
    selectedGroup = group;
    rotPaused = true;
    rotTarget = null; // stop any in-progress zone zoom
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

  // ── Pedestrian system ─────────────────────────────────────────────
  const PED_SKIN  = [0xFFDBAA,0xD4956E,0x8D5524,0xF1C27D,0xC68642];
  const PED_CLOTH = [0x2244AA,0xAA2222,0x228844,0xCC8800,0x884488,0x555577,0x336655,0x993322];
  // Shared geometries — reused across all pedestrians
  const _PED_BODY_GEO = new THREE.CylinderGeometry(0.10, 0.13, 0.58, 6);
  const _PED_HEAD_GEO = new THREE.SphereGeometry(0.13, 6, 4);

  function _spawnPedestrian() {
    const g = new THREE.Group();
    const wp = ROAD_WPS[Math.floor(Math.random() * ROAD_WPS.length)];
    g.position.set(wp.x + (Math.random()-0.5)*2, 0.08, wp.z + (Math.random()-0.5)*2);
    const body = new THREE.Mesh(
      _PED_BODY_GEO,
      new THREE.MeshLambertMaterial({ color: PED_CLOTH[Math.floor(Math.random() * PED_CLOTH.length)] })
    );
    body.position.y = 0.32; body.castShadow = true; g.add(body);
    const head = new THREE.Mesh(
      _PED_HEAD_GEO,
      new THREE.MeshLambertMaterial({ color: PED_SKIN[Math.floor(Math.random() * PED_SKIN.length)] })
    );
    head.position.y = 0.74; head.castShadow = true; g.add(head);
    cityGroup.add(g);
    pedestrianGroups.push({
      g,
      targetIdx: Math.floor(Math.random() * ROAD_WPS.length),
      speed: 1.2 + Math.random() * 1.8,
      bobPhase: Math.random() * Math.PI * 2,
    });
  }

  function _buildPedestrians() {
    // Seed with current population at init
    const initCount = (typeof GS !== 'undefined') ? Math.round(GS.population) : 0;
    for (let i = 0; i < initCount; i++) _spawnPedestrian();
  }

  function _animatePedestrians(dt) {
    const popTarget = (typeof GS !== 'undefined') ? Math.round(GS.population) : 0;

    // Spawn up to 10 per frame so large population jumps don't hitch
    const toAdd = Math.min(10, popTarget - pedestrianGroups.length);
    for (let i = 0; i < toAdd; i++) _spawnPedestrian();

    // Remove excess (population decline / event deaths)
    while (pedestrianGroups.length > popTarget) {
      const ped = pedestrianGroups.pop();
      cityGroup.remove(ped.g);
      ped.g.children.forEach(c => { if (c.material) c.material.dispose(); });
    }

    // Animate every pedestrian
    const t = Date.now() * 0.001;
    pedestrianGroups.forEach(ped => {
      const wp = ROAD_WPS[ped.targetIdx];
      const dx = wp.x - ped.g.position.x;
      const dz = wp.z - ped.g.position.z;
      const dist = Math.sqrt(dx*dx + dz*dz);
      if (dist < 0.4) {
        const candidates = [
          (ped.targetIdx + 1) % ROAD_WPS.length,
          (ped.targetIdx + 2) % ROAD_WPS.length,
          Math.floor(Math.random() * ROAD_WPS.length),
        ];
        ped.targetIdx = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        const step = ped.speed * dt;
        ped.g.position.x += (dx / dist) * step;
        ped.g.position.z += (dz / dist) * step;
        ped.g.rotation.y = Math.atan2(dx, dz);
        ped.g.position.y = 0.08 + Math.abs(Math.sin(t * ped.speed * 4 + ped.bobPhase)) * 0.04;
      }
    });
  }

  // ── Ground & city environment ─────────────────────────────────────
  function _buildGround() {
    // Base grass
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), new THREE.MeshLambertMaterial({ color:0x2d6030 }));
    grass.rotation.x = -Math.PI/2; grass.receiveShadow = true; cityGroup.add(grass);

    // Paved city centre — y=0.04 (well above grass at 0)
    const paved = new THREE.Mesh(new THREE.PlaneGeometry(56, 56), new THREE.MeshLambertMaterial({ color:0x444444 }));
    paved.rotation.x = -Math.PI/2; paved.position.set(0, 0.04, 0); cityGroup.add(paved);

    // Roads — y=0.08
    const roadMat = new THREE.MeshLambertMaterial({ color:0x2E2E2E });
    [[88,2.2,0,0],[2.2,88,0,0],[88,1.6,0,13],[88,1.6,0,-13],[1.6,88,13,0],[1.6,88,-13,0]].forEach(([w,d,x,z]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), roadMat);
      m.rotation.x = -Math.PI/2; m.position.set(x, 0.08, z); cityGroup.add(m);
    });

    // Sidewalks — y=0.10
    const sidewalkMat = new THREE.MeshLambertMaterial({ color:0x666655 });
    [[88,0.8,0,1.8],[88,0.8,0,-1.8],[0.8,88,1.8,0],[-0.8,88,-1.8,0]].forEach(([w,d,x,z]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), sidewalkMat);
      m.rotation.x = -Math.PI/2; m.position.set(x, 0.10, z); cityGroup.add(m);
    });

    // Central monument plaza — y=0.12
    const plazaMat = new THREE.MeshLambertMaterial({ color:0x999988 });
    const plaza = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), plazaMat);
    plaza.rotation.x = -Math.PI/2; plaza.position.set(0, 0.12, 0); cityGroup.add(plaza);

    // Obelisk monument (replaces simple fountain)
    const granMat = new THREE.MeshLambertMaterial({ color:0xBBBBCC });
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.55, 16), granMat);
    pedestal.position.set(0, 0.275, 0); pedestal.castShadow = true; cityGroup.add(pedestal);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.8, 0.28, 16), new THREE.MeshLambertMaterial({ color:0xCCCCDD }));
    ring.position.set(0, 0.69, 0); cityGroup.add(ring);
    const pool = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.14, 16), new THREE.MeshLambertMaterial({ color:0x2277BB, transparent:true, opacity:0.85 }));
    pool.position.set(0, 0.9, 0); cityGroup.add(pool);
    const obBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 1.1), granMat);
    obBase.position.set(0, 1.25, 0); obBase.castShadow = true; cityGroup.add(obBase);
    const obShaft = new THREE.Mesh(new THREE.BoxGeometry(0.6, 8.5, 0.6), new THREE.MeshLambertMaterial({ color:0xCCCCDD }));
    obShaft.position.set(0, 5.85, 0); obShaft.castShadow = true; cityGroup.add(obShaft);
    const obTip = new THREE.Mesh(new THREE.ConeGeometry(0.46, 1.4, 4), new THREE.MeshLambertMaterial({ color:0xFFD700, emissive:new THREE.Color(0xAA8800), emissiveIntensity:0.6 }));
    obTip.position.set(0, 10.8, 0); obTip.rotation.y = Math.PI/4; obTip.castShadow = true; cityGroup.add(obTip);
    // Colonnade of 8 pillars around monument
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 4.2, 8), new THREE.MeshLambertMaterial({ color:0xDDDDCC }));
      pillar.position.set(Math.cos(a) * 3.0, 2.1, Math.sin(a) * 3.0); pillar.castShadow = true; cityGroup.add(pillar);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.18, 0.22, 8), new THREE.MeshLambertMaterial({ color:0xEEEEDD }));
      cap.position.set(Math.cos(a) * 3.0, 4.42, Math.sin(a) * 3.0); cityGroup.add(cap);
    }

    // Zone flag markers
    const flagColors = { residential:0xFF5522, agricultural:0x33BB33, industrial:0x3366CC,
      commercial:0xFFCC00, financial:0xFFAA00, knowledge:0x7733EE, advanced:0x11BBDD };
    Object.entries(ZONE_CENTERS).forEach(([zone, {x, z}]) => {
      const col = flagColors[zone] || 0xFFFFFF;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 5.0, 6), new THREE.MeshLambertMaterial({ color:0x888888 }));
      pole.position.set(x, 2.5, z); cityGroup.add(pole);
      const flag = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.05), new THREE.MeshLambertMaterial({ color:col, emissive:new THREE.Color(col), emissiveIntensity:0.25, side:THREE.DoubleSide }));
      flag.position.set(x + 0.8, 5.35, z); cityGroup.add(flag);
    });

    // Trees (existing + more outer ring)
    const trunkMat = new THREE.MeshLambertMaterial({ color:0x4A2C0A });
    const leafColors = [0x228B22,0x2E8B57,0x3CB371,0x006400,0x1A6B1A];
    [[-7,-7],[7,-7],[-7,7],[7,7],[-12,0],[12,0],[0,-12],[0,12],
     [-5,-10],[5,-10],[-10,-5],[10,5],[-10,5],[5,10],[-5,10],[10,-5],
     [-15,4],[-15,-4],[15,4],[15,-4],[4,-15],[4,15],[-4,-15],[-4,15],
     [-18,0],[18,0],[0,-18],[0,18],
     [-22,8],[-22,-8],[22,8],[22,-8],[8,22],[-8,22],[8,-22],[-8,-22],
     [-25,0],[25,0],[0,-25],[0,25],[-20,15],[20,15],[-20,-15],[20,-15],
     [-28,5],[28,5],[-28,-5],[28,-5],[5,-28],[5,28],[-5,-28],[-5,28]
    ].forEach(([tx,tz],i) => {
      const h = 1.0+(i%5)*0.35;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.19,h+0.5,6), trunkMat);
      t.position.set(tx,(h+0.5)/2,tz); t.castShadow = true; cityGroup.add(t);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.65+(i%4)*0.15,6,5), new THREE.MeshLambertMaterial({ color:leafColors[i%5] }));
      l.position.set(tx,h+0.62,tz); l.castShadow = true; cityGroup.add(l);
    });

    // Park benches near plaza
    const benchWood = new THREE.MeshLambertMaterial({ color:0x8B6340 });
    const benchMetal = new THREE.MeshLambertMaterial({ color:0x555555 });
    [[5.5,0,5.5,0],[-5.5,0,5.5,Math.PI],[5.5,0,-5.5,Math.PI/2],[-5.5,0,-5.5,-Math.PI/2]].forEach(([bx,by,bz,ry]) => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6,0.1,0.45), benchWood);
      seat.position.set(bx,0.48,bz); seat.rotation.y = ry; cityGroup.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(1.6,0.55,0.08), benchWood);
      back.position.set(bx,0.78,bz + Math.cos(ry)*0.22); back.rotation.y = ry; cityGroup.add(back);
      [-0.6,0.6].forEach(lx => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.45,0.4), benchMetal);
        leg.position.set(bx + Math.cos(ry+Math.PI/2)*lx, 0.225, bz + Math.sin(ry+Math.PI/2)*lx);
        leg.rotation.y = ry; cityGroup.add(leg);
      });
    });

    // Flower patches around plaza
    const flowerCols = [0xFF4444,0xFF9900,0xFFFF00,0xFF66AA,0xFF8866];
    [[8,5],[-8,5],[8,-5],[-8,-5],[5,8],[-5,8],[5,-8],[-5,-8],
     [9,0],[-9,0],[0,9],[0,-9]].forEach(([fx,fz],i) => {
      const fm = new THREE.MeshLambertMaterial({ color:flowerCols[i%5], emissive:new THREE.Color(flowerCols[i%5]), emissiveIntensity:0.12 });
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.45,6,4), fm);
      fl.position.set(fx,0.32,fz); cityGroup.add(fl);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.3,5), new THREE.MeshLambertMaterial({ color:0x228B22 }));
      stem.position.set(fx,0.15,fz); cityGroup.add(stem);
    });

    // Park grass patches — y=0.04, outside paved area (±28) so no z-fight with paved
    const parkGrass = new THREE.MeshLambertMaterial({ color:0x3A8040 });
    [[32,32,10,10],[-32,32,10,10],[32,-32,10,10],[-32,-32,10,10]].forEach(([px,pz,pw,pd]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(pw,pd), parkGrass);
      m.rotation.x = -Math.PI/2; m.position.set(px,0.04,pz); cityGroup.add(m);
    });

    // Lamp posts (more coverage)
    const lampPostMat = new THREE.MeshLambertMaterial({ color:0x777777 });
    const lampHeadMat = new THREE.MeshLambertMaterial({ color:0xFFEE88, emissive:new THREE.Color(0xFFCC44), emissiveIntensity:0.9 });
    [[-3,3],[3,3],[-3,-3],[3,-3],[8,8],[-8,8],[8,-8],[-8,-8],
     [16,4],[-16,4],[16,-4],[-16,-4],[4,16],[-4,16],[4,-16],[-4,-16]].forEach(([x,z]) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.09,4.0,6), lampPostMat);
      pole.position.set(x,2.0,z); cityGroup.add(pole);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.06,0.06), lampPostMat);
      arm.position.set(x+0.4,4.0,z); cityGroup.add(arm);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6), lampHeadMat);
      head.position.set(x+0.8,4.0,z); cityGroup.add(head);
    });

    // City boundary wall (low decorative perimeter)
    const wallMat = new THREE.MeshLambertMaterial({ color:0x7A7A6A });
    [[0,0.25,27,54,0.5,0.5],[0,0.25,-27,54,0.5,0.5],[27,0.25,0,0.5,0.5,54],[-27,0.25,0,0.5,0.5,54]].forEach(([wx,wy,wz,ww,wh,wd]) => {
      const w = new THREE.Mesh(new THREE.BoxGeometry(ww,wh,wd), wallMat);
      w.position.set(wx,wy,wz); cityGroup.add(w);
    });
    // Gateposts at road intersections with wall
    [[27,0],[-27,0],[0,27],[0,-27]].forEach(([gx,gz]) => {
      const gp = new THREE.Mesh(new THREE.BoxGeometry(0.8,1.8,0.8), new THREE.MeshLambertMaterial({ color:0x999988 }));
      gp.position.set(gx,0.9,gz); gp.castShadow = true; cityGroup.add(gp);
    });
  }

  // ── Environment: mountains + clouds (fixed in world space) ────────
  function _buildEnvironment() {
    // Distant mountains
    const mPalette = [0x4A5568,0x556075,0x3D4A5A].map(c => new THREE.MeshLambertMaterial({ color:c }));
    const snowMat  = new THREE.MeshLambertMaterial({ color:0xEEF2F8, transparent:true, opacity:0.92 });
    [
      [155,-95],[-145,-115],[105,-148],[-85,-155],
      [172,28],[-160,22],[55,-168],[-55,-178],[180,-50],[-175,-55],
    ].forEach(([mx,mz],i) => {
      const h = 52 + (i%4)*20;
      const r = 28 + (i%3)*14;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(r, h, 7), mPalette[i%3]);
      peak.position.set(mx, h/2 - 4, mz);
      scene.add(peak);
      const snow = new THREE.Mesh(new THREE.ConeGeometry(r*0.4, h*0.25, 7), snowMat);
      snow.position.set(mx, h - h*0.1, mz);
      scene.add(snow);
    });

    // Clouds (static, world-space so they don't spin with city)
    const cloudMat = new THREE.MeshLambertMaterial({ color:0xFFFFFF, transparent:true, opacity:0.82 });
    [
      [42,65,-28],[-52,70,-32],[28,60,58],[-38,68,42],
      [68,64,18],[-22,74,-55],[5,58,72],[-72,62,5],[50,75,50],[-50,66,-50],
    ].forEach(([cx,cy,cz]) => {
      [[0,0,0,3.8],[3.2,-0.4,0.6,2.9],[-2.9,-0.3,0.9,2.5],[1.6,0.9,-1.3,2.2],[-1.1,0.7,1.9,2.0]].forEach(([ox,oy,oz,r]) => {
        const s = new THREE.Mesh(new THREE.SphereGeometry(r,7,5), cloudMat);
        s.position.set(cx+ox, cy+oy, cz+oz);
        scene.add(s);
      });
    });
  }

  // ── Landmark buildings — one iconic structure per zone ───────────
  function _buildLandmarks() {
    for (const g of landmarkGroups) cityGroup.remove(g);
    landmarkGroups = [];
    const phase = (typeof GS !== 'undefined') ? GS.phase : 'early';
    if (phase === 'early') { _buildLandmarksPrimitive(); return; }
    // ── Financial zone [15,5]: Treasury Tower ──────────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.financial.x, 0, ZONE_CENTERS.financial.z);
      const ivoryStoneMat  = new THREE.MeshLambertMaterial({ color:0xF2EFE0 });
      const goldMat        = new THREE.MeshLambertMaterial({ color:0xFFD700, emissive:new THREE.Color(0xAA8800), emissiveIntensity:0.55 });
      // Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(3.6, 8.5, 3.6), ivoryStoneMat);
      base.position.y = 4.25; base.castShadow = true; g.add(base);
      // 4 corner columns
      [[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]].forEach(([cx,cz]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 9.5, 8), ivoryStoneMat);
        col.position.set(cx, 4.75, cz); col.castShadow = true; g.add(col);
      });
      // Gold dome
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.8, 12, 8, 0, Math.PI*2, 0, Math.PI/2), goldMat);
      dome.position.y = 8.5; g.add(dome);
      // Needle spire
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, 5.5, 6), goldMat);
      spire.position.y = 12.2; spire.castShadow = true; g.add(spire);
      cityGroup.add(g); landmarkGroups.push(g);
    }
    // ── Knowledge zone [0,-18]: Grand Academy ──────────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.knowledge.x, 0, ZONE_CENTERS.knowledge.z);
      const stoneMat = new THREE.MeshLambertMaterial({ color:0xD8D0C0 });
      const blueMat  = new THREE.MeshLambertMaterial({ color:0x4466CC, emissive:new THREE.Color(0x223388), emissiveIntensity:0.4 });
      // Stepped base
      const step1 = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.6, 5.0), stoneMat);
      step1.position.y = 0.3; step1.castShadow = true; g.add(step1);
      const step2 = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.5, 4.0), stoneMat);
      step2.position.y = 0.85; step2.castShadow = true; g.add(step2);
      // Main hall
      const hall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 6.5, 3.2), stoneMat);
      hall.position.y = 4.6; hall.castShadow = true; g.add(hall);
      // 4 columns (front facade)
      [-1.1,-0.37,0.37,1.1].forEach(cx => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 7.2, 8), stoneMat);
        col.position.set(cx, 3.6, 1.8); col.castShadow = true; g.add(col);
      });
      // Blue dome
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.65, 12, 8, 0, Math.PI*2, 0, Math.PI/2), blueMat);
      dome.position.y = 7.9; g.add(dome);
      // Finial
      const fin = new THREE.Mesh(new THREE.ConeGeometry(0.22, 2.2, 6), new THREE.MeshLambertMaterial({ color:0xFFD700 }));
      fin.position.y = 10.6; fin.castShadow = true; g.add(fin);
      cityGroup.add(g); landmarkGroups.push(g);
    }
    // ── Industrial zone [-15,-12]: Grand Foundry ───────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.industrial.x, 0, ZONE_CENTERS.industrial.z);
      const ironMat    = new THREE.MeshLambertMaterial({ color:0x3A3A4A });
      const brickMat   = new THREE.MeshLambertMaterial({ color:0x7A5535 });
      const glowMat    = new THREE.MeshLambertMaterial({ color:0xFF6600, emissive:new THREE.Color(0xFF4400), emissiveIntensity:0.9 });
      // Wide main building
      const body = new THREE.Mesh(new THREE.BoxGeometry(5.0, 5.5, 3.5), brickMat);
      body.position.y = 2.75; body.castShadow = true; g.add(body);
      // Iron roof band
      const roof = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.4, 3.7), ironMat);
      roof.position.y = 5.7; g.add(roof);
      // 3 chimneys with torus rings and glowing tops
      [-1.4, 0, 1.4].forEach((cx, i) => {
        const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 7.0 + i*0.8, 8), ironMat);
        chimney.position.set(cx, 9.25 + i*0.4, 0); chimney.castShadow = true; g.add(chimney);
        // Torus rings
        [3.0, 5.5].forEach(ry => {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.07, 6, 12), ironMat);
          ring.position.set(cx, ry, 0); ring.rotation.x = Math.PI/2; g.add(ring);
        });
        // Glowing cone top
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.55, 8), glowMat);
        tip.position.set(cx, 13.15 + i*0.8, 0); g.add(tip);
      });
      cityGroup.add(g); landmarkGroups.push(g);
    }
    // ── Commercial zone [14,-12]: Grand Exchange ───────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.commercial.x, 0, ZONE_CENTERS.commercial.z);
      const sandMat  = new THREE.MeshLambertMaterial({ color:0xD4A85A });
      const darkMat  = new THREE.MeshLambertMaterial({ color:0x333322 });
      const clockMat = new THREE.MeshLambertMaterial({ color:0xEEEEDD, emissive:new THREE.Color(0x888866), emissiveIntensity:0.3 });
      // Main arcade building
      const body = new THREE.Mesh(new THREE.BoxGeometry(4.5, 5.0, 3.0), sandMat);
      body.position.y = 2.5; body.castShadow = true; g.add(body);
      // 4 facade arch columns
      [-1.35,-0.45,0.45,1.35].forEach(cx => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 5.4, 7), sandMat);
        col.position.set(cx, 2.7, 1.6); col.castShadow = true; g.add(col);
        // Arch cap
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.18, 0.25, 7), sandMat);
        cap.position.set(cx, 5.5, 1.6); g.add(cap);
      });
      // Pediment frieze
      const ped = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.5, 0.2), sandMat);
      ped.position.set(0, 5.8, 1.6); g.add(ped);
      // Clock tower
      const tower = new THREE.Mesh(new THREE.BoxGeometry(1.2, 6.5, 1.2), sandMat);
      tower.position.set(0, 8.75, 0); tower.castShadow = true; g.add(tower);
      const clockFace = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.12, 16), clockMat);
      clockFace.rotation.z = Math.PI/2; clockFace.position.set(0.72, 11.0, 0); g.add(clockFace);
      // Spire
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.3, 3.0, 8), darkMat);
      spire.position.set(0, 13.75, 0); spire.castShadow = true; g.add(spire);
      cityGroup.add(g); landmarkGroups.push(g);
    }
    // ── Residential zone [13,12]: Town Hall ────────────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.residential.x, 0, ZONE_CENTERS.residential.z);
      const brickMat  = new THREE.MeshLambertMaterial({ color:0xCC5533 });
      const whiteMat  = new THREE.MeshLambertMaterial({ color:0xEEEEDD });
      const goldMat   = new THREE.MeshLambertMaterial({ color:0xFFD700, emissive:new THREE.Color(0xAA8800), emissiveIntensity:0.5 });
      // Main body
      const body = new THREE.Mesh(new THREE.BoxGeometry(4.0, 5.0, 3.2), brickMat);
      body.position.y = 2.5; body.castShadow = true; g.add(body);
      // 4 white portico columns
      [-1.1,-0.37,0.37,1.1].forEach(cx => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 5.5, 8), whiteMat);
        col.position.set(cx, 2.75, 1.7); col.castShadow = true; g.add(col);
      });
      // Pediment
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 2.3, 1.2, 4), whiteMat);
      ped.position.set(0, 6.1, 1.0); ped.rotation.y = Math.PI/4; g.add(ped);
      // Central bell tower
      const tower = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.0, 1.4), brickMat);
      tower.position.set(0, 7.5, 0); tower.castShadow = true; g.add(tower);
      const belfry = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.75, 1.2, 8), whiteMat);
      belfry.position.set(0, 10.6, 0); g.add(belfry);
      // Golden bell
      const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.5, 0.55, 8), goldMat);
      bell.position.set(0, 10.9, 0); g.add(bell);
      // Spire cap
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.8, 8), whiteMat);
      spire.position.set(0, 12.6, 0); spire.castShadow = true; g.add(spire);
      cityGroup.add(g); landmarkGroups.push(g);
    }
    // ── Agricultural zone [-14,10]: Great Windmill ─────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.agricultural.x, 0, ZONE_CENTERS.agricultural.z);
      const stoneMat = new THREE.MeshLambertMaterial({ color:0xBBAA88 });
      const woodMat  = new THREE.MeshLambertMaterial({ color:0x7B5330 });
      const sailMat  = new THREE.MeshLambertMaterial({ color:0xF5F0E0, side:THREE.DoubleSide });
      // Stone tower (tapered cylinder)
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 8.5, 10), stoneMat);
      tower.position.y = 4.25; tower.castShadow = true; g.add(tower);
      // Conical cap
      const cap = new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.0, 10), woodMat);
      cap.position.y = 9.5; cap.castShadow = true; g.add(cap);
      // Hub
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.8, 8), woodMat);
      hub.rotation.z = Math.PI/2; hub.position.set(0, 7.5, 1.05); g.add(hub);
      // 4 arms + sail planes
      [[0,1],[1,0],[0,-1],[-1,0]].forEach(([ax,az], i) => {
        const angle = i * Math.PI/2;
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.0, 0.12), woodMat);
        arm.position.set(ax*2.0, 7.5 + az*2.0, 1.05);
        arm.rotation.z = angle; arm.castShadow = true; g.add(arm);
        const sail = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 3.5), sailMat);
        sail.position.set(ax*2.0, 7.5 + az*2.0, 1.05);
        sail.rotation.z = angle; g.add(sail);
      });
      cityGroup.add(g); landmarkGroups.push(g);
    }
    // ── Advanced zone [-6,-27]: Observatory ────────────────────────
    {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS.advanced.x, 0, ZONE_CENTERS.advanced.z);
      const darkMat  = new THREE.MeshLambertMaterial({ color:0x222233 });
      const steelMat = new THREE.MeshLambertMaterial({ color:0x8899BB });
      const glassMat = new THREE.MeshLambertMaterial({ color:0x44AAFF, transparent:true, opacity:0.55, emissive:new THREE.Color(0x1155AA), emissiveIntensity:0.5 });
      // Narrow tower
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.0, 11.0, 10), darkMat);
      tower.position.y = 5.5; tower.castShadow = true; g.add(tower);
      // 3 structural fins
      [0, 120, 240].forEach(deg => {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 7.0, 0.12), steelMat);
        fin.position.set(0, 5.5, 0);
        fin.rotation.y = deg * Math.PI/180; fin.castShadow = true; g.add(fin);
      });
      // Observatory ring
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.22, 8, 20), steelMat);
      ring.position.y = 11.2; ring.rotation.x = Math.PI/2; g.add(ring);
      // Glass dome (half-sphere)
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 8, 0, Math.PI*2, 0, Math.PI/2), glassMat);
      dome.position.y = 11.2; g.add(dome);
      // Antenna
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 5.5, 6), steelMat);
      ant.position.y = 14.75; ant.castShadow = true; g.add(ant);
      // Satellite dish
      const dish = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 6, 0, Math.PI*2, 0, Math.PI/2), steelMat);
      dish.position.set(0.9, 13.0, 0); dish.rotation.z = -Math.PI/3; g.add(dish);
      cityGroup.add(g); landmarkGroups.push(g);
    }
  }

  // ── Primitive era landmarks (early phase) ─────────────────────────
  function _buildLandmarksPrimitive() {
    const stoneMat = new THREE.MeshLambertMaterial({ color:0xAA9977 });
    const dkStone  = new THREE.MeshLambertMaterial({ color:0x7A6B55 });
    const woodMat  = new THREE.MeshLambertMaterial({ color:0x7B5330 });
    const fireMat  = new THREE.MeshLambertMaterial({ color:0xFF6600, emissive:new THREE.Color(0xFF4400), emissiveIntensity:1.0 });
    const sailMat  = new THREE.MeshLambertMaterial({ color:0xF5F0E0, side:THREE.DoubleSide });

    const _addLandmark = (zone, buildFn) => {
      const g = new THREE.Group();
      g.position.set(ZONE_CENTERS[zone].x, 0, ZONE_CENTERS[zone].z);
      buildFn(g);
      cityGroup.add(g); landmarkGroups.push(g);
    };

    // Financial: Stone Treasury with rough columns
    _addLandmark('financial', g => {
      const base1 = new THREE.Mesh(new THREE.BoxGeometry(6.0,0.7,5.2), stoneMat);
      base1.position.y = 0.35; base1.castShadow = true; g.add(base1);
      const base2 = new THREE.Mesh(new THREE.BoxGeometry(4.8,0.55,4.0), stoneMat);
      base2.position.y = 0.88; g.add(base2);
      const hall = new THREE.Mesh(new THREE.BoxGeometry(4.0,5.0,3.0), stoneMat);
      hall.position.y = 3.93; hall.castShadow = true; g.add(hall);
      [[-1.5,1.6],[1.5,1.6],[-1.5,-1.6],[1.5,-1.6]].forEach(([cx,cz]) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.36,6.0,6), dkStone);
        col.position.set(cx,3.43,cz); col.castShadow = true; g.add(col);
      });
      const roof = new THREE.Mesh(new THREE.BoxGeometry(4.8,0.55,3.8), dkStone);
      roof.position.y = 6.7; g.add(roof);
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.3,3.5,5), stoneMat);
      spire.position.y = 9.4; spire.castShadow = true; g.add(spire);
    });

    // Knowledge: Stone Library Temple
    _addLandmark('knowledge', g => {
      const base = new THREE.Mesh(new THREE.BoxGeometry(6.5,0.7,6.0), stoneMat);
      base.position.y = 0.35; base.castShadow = true; g.add(base);
      const hall = new THREE.Mesh(new THREE.BoxGeometry(5.0,5.5,4.5), stoneMat);
      hall.position.y = 3.75; hall.castShadow = true; g.add(hall);
      const roofPeak = new THREE.Mesh(new THREE.CylinderGeometry(0.2,3.5,2.8,4), dkStone);
      roofPeak.position.y = 7.4; roofPeak.rotation.y = Math.PI/4; g.add(roofPeak);
      [-1.5,-0.5,0.5,1.5].forEach(cx => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.3,6.2,7), dkStone);
        col.position.set(cx,3.1,2.4); col.castShadow = true; g.add(col);
      });
    });

    // Industrial: Stone Forge with fire
    _addLandmark('industrial', g => {
      const body = new THREE.Mesh(new THREE.BoxGeometry(5.5,3.5,4.0), stoneMat);
      body.position.y = 1.75; body.castShadow = true; g.add(body);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(5.8,0.45,4.3), dkStone);
      roof.position.y = 3.73; g.add(roof);
      [-1.4,0,1.4].forEach((cx,i) => {
        const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.48,4.5+i*0.5,8), stoneMat);
        ch.position.set(cx,6.0+i*0.25,0); ch.castShadow = true; g.add(ch);
        const fire = new THREE.Mesh(new THREE.ConeGeometry(0.32,0.9,8), fireMat);
        fire.position.set(cx,8.45+i*0.5,0); g.add(fire);
      });
    });

    // Commercial: Ancient Bazaar with awning
    _addLandmark('commercial', g => {
      const plat = new THREE.Mesh(new THREE.BoxGeometry(5.5,0.5,4.5), stoneMat);
      plat.position.y = 0.25; g.add(plat);
      [[-1.8,-1.6],[1.8,-1.6],[-1.8,1.6],[1.8,1.6]].forEach(([px,pz]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.2,5.2,6), woodMat);
        post.position.set(px,3.1,pz); g.add(post);
      });
      const awning = new THREE.Mesh(new THREE.BoxGeometry(4.2,0.14,3.4), new THREE.MeshLambertMaterial({color:0xCDAA77,side:THREE.DoubleSide}));
      awning.position.set(0,5.7,0); g.add(awning);
      const well = new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.6,1.2,10), stoneMat);
      well.position.set(0,1.1,0); g.add(well);
      const tower = new THREE.Mesh(new THREE.BoxGeometry(1.5,7.5,1.5), dkStone);
      tower.position.set(0,4.25,-1.8); tower.castShadow = true; g.add(tower);
      const capC = new THREE.Mesh(new THREE.ConeGeometry(1.0,1.8,4), dkStone);
      capC.position.set(0,8.65,-1.8); capC.rotation.y = Math.PI/4; g.add(capC);
    });

    // Residential: Stone Great Hall with battlements
    _addLandmark('residential', g => {
      const body = new THREE.Mesh(new THREE.BoxGeometry(5.5,4.5,4.0), stoneMat);
      body.position.y = 2.25; body.castShadow = true; g.add(body);
      const roofH = new THREE.Mesh(new THREE.CylinderGeometry(0.2,3.5,2.2,4), dkStone);
      roofH.position.y = 5.6; roofH.rotation.y = Math.PI/4; g.add(roofH);
      const btower = new THREE.Mesh(new THREE.BoxGeometry(1.6,7.0,1.6), stoneMat);
      btower.position.set(0,4.5,0); btower.castShadow = true; g.add(btower);
      for (let i=0;i<4;i++){
        const a=i*Math.PI/2;
        const m=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.7,0.42),dkStone);
        m.position.set(Math.cos(a)*0.82,8.6,Math.sin(a)*0.82); g.add(m);
      }
      const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.48,0.55,8), new THREE.MeshLambertMaterial({color:0xB8860B}));
      bell.position.set(0,8.15,0); g.add(bell);
    });

    // Agricultural: Traditional Windmill
    _addLandmark('agricultural', g => {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.9,1.4,8.5,10), stoneMat);
      tower.position.y = 4.25; tower.castShadow = true; g.add(tower);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(1.0,2.0,10), woodMat);
      cap.position.y = 9.5; cap.castShadow = true; g.add(cap);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,0.8,8), woodMat);
      hub.rotation.z = Math.PI/2; hub.position.set(0,7.5,1.05); g.add(hub);
      [[0,1],[1,0],[0,-1],[-1,0]].forEach(([ax,az],i) => {
        const angle = i*Math.PI/2;
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12,4.0,0.12), woodMat);
        arm.position.set(ax*2.0,7.5+az*2.0,1.05);
        arm.rotation.z = angle; arm.castShadow = true; g.add(arm);
        const sail = new THREE.Mesh(new THREE.PlaneGeometry(0.9,3.5), sailMat);
        sail.position.set(ax*2.0,7.5+az*2.0,1.05);
        sail.rotation.z = angle; g.add(sail);
      });
    });

    // Advanced: Stone Watchtower with torch
    _addLandmark('advanced', g => {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.4,10.0,10), stoneMat);
      tower.position.y = 5.0; tower.castShadow = true; g.add(tower);
      for (let i=0;i<8;i++){
        const a=(i/8)*Math.PI*2;
        const m=new THREE.Mesh(new THREE.BoxGeometry(0.55,1.0,0.55), stoneMat);
        m.position.set(Math.cos(a)*1.2,10.7,Math.sin(a)*1.2); g.add(m);
      }
      const top = new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.1,0.4,10), dkStone);
      top.position.y = 10.2; g.add(top);
      const torchPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,2.0,6), woodMat);
      torchPole.position.set(0,12.0,0); g.add(torchPole);
      const torchFire = new THREE.Mesh(new THREE.ConeGeometry(0.28,0.8,8), fireMat);
      torchFire.position.set(0,13.4,0); g.add(torchFire);
    });
  }

  // ── Per-event effect configs (color, particle pattern, env change) ──
  const EVENT_FX = {
    goldRush:           { col:0xFFD700, lCol:0xFFAA00, pat:'burst', sz:1.1, grav:-9 },
    harvestFestival:    { col:0x88FF44, lCol:0x66CC22, pat:'burst', sz:0.9, grav:-9 },
    tradeBoom:          { col:0xFFCC22, lCol:0xFFAA00, pat:'ring',  sz:1.0, grav:-5 },
    inventorVisit:      { col:0x44FFFF, lCol:0x22CCFF, pat:'burst', sz:1.0, grav:-9 },
    investorConference: { col:0xFFEE00, lCol:0xFFCC00, pat:'burst', sz:1.2, grav:-9 },
    techBreakthrough:   { col:0x44EEFF, lCol:0x22AAFF, pat:'burst', sz:1.1, grav:-9 },
    migrationWave:      { col:0xFF9944, lCol:0xFF7722, pat:'ring',  sz:1.0, grav:-4 },
    bullMarket:         { col:0x44FF44, lCol:0x22DD22, pat:'burst', sz:1.0, grav:-9 },
    babyBoom:           { col:0xFFAACC, lCol:0xFF88AA, pat:'ring',  sz:0.8, grav:-4 },
    refugeeFlux:        { col:0xFF9944, lCol:0xFF7722, pat:'ring',  sz:0.9, grav:-4 },
    techInnovation:     { col:0x44FFDD, lCol:0x22CCAA, pat:'burst', sz:1.0, grav:-9 },
    touristBoom:        { col:0xFFDD44, lCol:0xFFBB22, pat:'ring',  sz:1.0, grav:-4 },
    stockRally:         { col:0x44FF88, lCol:0x22DD66, pat:'burst', sz:1.1, grav:-9 },
    energySurplus:      { col:0xFFFF44, lCol:0xFFDD22, pat:'burst', sz:1.2, grav:-9 },
    goodWeather:        { col:0x88FFAA, lCol:0x66DD88, pat:'ring',  sz:0.9, grav:-4 },
    immigrationWave:    { col:0xFFAA44, lCol:0xFF8822, pat:'ring',  sz:0.9, grav:-4 },
    drought:      { col:0xFF8800, lCol:0xFF6600, pat:'fall',  sz:0.8, grav:-2,  dur:6.0, fogCol:0xD4A040, skyCol:0xC07020 },
    flood:        { col:0x2277FF, lCol:0x0055DD, pat:'rise',  sz:1.0, grav:-6,  dur:5.0, fogCol:0x4466AA, skyCol:0x223366 },
    pandemic:     { col:0x44BB44, lCol:0x228822, pat:'mist',  sz:0.6, grav:-0.5,dur:7.0, fogCol:0x334433, skyCol:0x223322 },
    greatPlague:  { col:0x335533, lCol:0x112211, pat:'mist',  sz:0.5, grav:-0.3,dur:8.0, fogCol:0x1A2210, skyCol:0x0D1108 },
    famine:       { col:0x886633, lCol:0x664422, pat:'fall',  sz:0.7, grav:-1.5,dur:5.0, fogCol:0x8B7355, skyCol:0x5C4A2A },
    recession:    { col:0xFF2222, lCol:0xDD0000, pat:'fall',  sz:0.8, grav:-2.5,dur:6.0, fogCol:0x441122, skyCol:0x220811 },
    bankRun:      { col:0xFF4400, lCol:0xDD2200, pat:'fall',  sz:0.9, grav:-2,  dur:5.0, fogCol:0x442211, skyCol:0x221100 },
    workerStrike: { col:0xFF6600, lCol:0xFF4400, pat:'ring',  sz:1.1, grav:-4 },
    powerOutage:  { col:0x777777, lCol:0x333333, pat:'flash', sz:2.0, grav:-5,  dur:3.0, fogCol:0x111111, skyCol:0x080808 },
    cyberAttack:  { col:0x00FF44, lCol:0x00AA22, pat:'mist',  sz:0.7, grav:-0.5,dur:6.0, fogCol:0x001A00, skyCol:0x002200 },
    warDraft:     { col:0xFF3300, lCol:0xFF1100, pat:'burst', sz:1.3, grav:-9,  dur:4.0, fogCol:0x5A2A00, skyCol:0x3A1800 },
    emigrationCrisis:{ col:0xAA4422, lCol:0x882200, pat:'fall', sz:0.8, grav:-2 },
    supplyShock:  { col:0xFF6633, lCol:0xFF4411, pat:'fall',  sz:0.8, grav:-2 },
  };

  // ── Event particle effects ─────────────────────────────────────────
  function triggerEventEffect(type, eventId) {
    if (!scene) return;
    const dflt = type === 'positive'
      ? { col:0xFFD700, lCol:0xFFAA00, pat:'burst', sz:1.0, grav:-9 }
      : type === 'negative'
      ? { col:0xFF2200, lCol:0xFF0000, pat:'fall',  sz:0.8, grav:-2 }
      : { col:0x66BBFF, lCol:0x4499FF, pat:'ring',  sz:1.0, grav:-4 };
    const fx = EVENT_FX[eventId] || dflt;

    const COUNT = fx.pat === 'flash' ? 12 : 60;
    const positions = new Float32Array(COUNT * 3);
    const velocities = [];
    for (let i = 0; i < COUNT; i++) {
      let x, y, z, vx, vy, vz;
      switch (fx.pat) {
        case 'fall':
          x=(Math.random()-0.5)*40; y=18+Math.random()*14; z=(Math.random()-0.5)*40;
          vx=(Math.random()-0.5)*2; vy=-Math.random()*4-1; vz=(Math.random()-0.5)*2; break;
        case 'ring': { const a=(i/COUNT)*Math.PI*2+(Math.random()-0.5)*0.5, r=2+Math.random()*4;
          x=Math.cos(a)*r; y=0.8+Math.random()*0.5; z=Math.sin(a)*r;
          vx=Math.cos(a)*(4+Math.random()*5); vy=Math.random()*2+0.5; vz=Math.sin(a)*(4+Math.random()*5); break; }
        case 'mist':
          x=(Math.random()-0.5)*16; y=Math.random()*3; z=(Math.random()-0.5)*16;
          vx=(Math.random()-0.5)*1.5; vy=Math.random()*0.5; vz=(Math.random()-0.5)*1.5; break;
        case 'rise':
          x=(Math.random()-0.5)*8; y=0; z=(Math.random()-0.5)*8;
          vx=(Math.random()-0.5)*4; vy=Math.random()*8+3; vz=(Math.random()-0.5)*4; break;
        case 'flash':
          x=(Math.random()-0.5)*24; y=Math.random()*18; z=(Math.random()-0.5)*24;
          vx=(Math.random()-0.5)*3; vy=(Math.random()-0.5)*3; vz=(Math.random()-0.5)*3; break;
        default:
          x=(Math.random()-0.5)*4; y=2; z=(Math.random()-0.5)*4;
          vx=(Math.random()-0.5)*5; vy=Math.random()*12+4; vz=(Math.random()-0.5)*5;
      }
      positions[i*3]=x; positions[i*3+1]=y; positions[i*3+2]=z;
      velocities.push({ x:vx, y:vy, z:vz });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color:fx.col, size:(fx.sz||1)*0.9, transparent:true, opacity:1.0 });
    const particles = new THREE.Points(geo, pMat);
    scene.add(particles);

    const initInt = fx.pat === 'flash' ? 22 : 8;
    const light = new THREE.PointLight(fx.lCol, initInt, 80);
    light.position.set(0, 10, 0);
    scene.add(light);
    effectGroups.push({ particles, light, velocities, grav:fx.grav??-9, initInt, age:0, maxAge:fx.dur||3.5 });

    // Atmospheric environmental change
    if (fx.fogCol && scene.fog && scene.background) {
      envAnim = {
        fogOrig: scene.fog.color.getHex(), skyOrig: scene.background.getHex(),
        fogTarget: fx.fogCol, skyTarget: fx.skyCol || fx.fogCol,
        inDur:0.6, holdDur:(fx.dur||3.5)*0.6, outDur:2.5,
        phase:'in', timer:0,
      };
    }
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

    // Pedestrians
    _animatePedestrians(dt);

    // Event particle effects
    effectGroups = effectGroups.filter(eff => {
      eff.age += dt;
      if (eff.age >= eff.maxAge) {
        scene.remove(eff.particles); scene.remove(eff.light);
        eff.particles.geometry.dispose(); return false;
      }
      const t = eff.age / eff.maxAge;
      const pos = eff.particles.geometry.attributes.position.array;
      for (let i = 0; i < eff.velocities.length; i++) {
        pos[i*3]   += eff.velocities[i].x * dt;
        pos[i*3+1] += eff.velocities[i].y * dt;
        pos[i*3+2] += eff.velocities[i].z * dt;
        eff.velocities[i].y += eff.grav * dt;
      }
      eff.particles.geometry.attributes.position.needsUpdate = true;
      eff.particles.material.opacity = Math.max(0, 1 - t * 1.2);
      eff.light.intensity = (eff.initInt || 8) * Math.max(0, 1 - t * 1.2);
      return true;
    });

    // Environmental atmospheric animation (fog + sky color)
    if (envAnim) {
      envAnim.timer += dt;
      const ea = envAnim;
      if (ea.phase === 'in') {
        const t = Math.min(1, ea.timer / ea.inDur);
        scene.fog.color.lerpColors(new THREE.Color(ea.fogOrig), new THREE.Color(ea.fogTarget), t);
        scene.background.lerpColors(new THREE.Color(ea.skyOrig), new THREE.Color(ea.skyTarget), t);
        if (t >= 1) { ea.phase = 'hold'; ea.timer = 0; }
      } else if (ea.phase === 'hold') {
        if (ea.timer >= ea.holdDur) { ea.phase = 'out'; ea.timer = 0; }
      } else {
        const t = Math.min(1, ea.timer / ea.outDur);
        scene.fog.color.lerpColors(new THREE.Color(ea.fogTarget), new THREE.Color(ea.fogOrig), t);
        scene.background.lerpColors(new THREE.Color(ea.skyTarget), new THREE.Color(ea.skyOrig), t);
        if (t >= 1) envAnim = null;
      }
    }

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
      _buildLandmarks();
      _buildPedestrians();
      _buildEnvironment();
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
    triggerEventEffect,
    destroy() { animating = false; if (renderer) renderer.dispose(); },
  };
})();
