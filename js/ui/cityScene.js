/* ── CITY SCENE — Full-screen Three.js city backdrop ── */
const CityScene = (() => {
  let renderer, scene, camera, clock;
  let cityGroup;
  let pulseLight;
  let buildingMeshes = [];
  let animating = false;
  let clickPulse = 0;
  let rotAngle = 0;
  let lastBuildSig = '';

  const BLD = {
    hut:         { w:1.0, h:1.0, d:1.0, color:0x8B6914, roof:0x5D3E10 },
    cottage:     { w:1.2, h:1.6, d:1.2, color:0xCD853F, roof:0x8B4513 },
    farm:        { w:2.4, h:0.25,d:2.4, color:0x5D9E2A, roof:0x3D6E1A },
    workshop:    { w:1.4, h:2.5, d:1.4, color:0x7A8899, roof:0x4A5568 },
    market:      { w:2.0, h:2.2, d:2.0, color:0xFFB800, roof:0xCC9200 },
    school:      { w:1.6, h:3.0, d:1.6, color:0x5A85ED, roof:0x3A65BD },
    tradingPost: { w:1.4, h:2.8, d:1.4, color:0xDA70D6, roof:0xA040A6 },
    factory:     { w:2.0, h:4.5, d:2.0, color:0x3A3A3A, roof:0x111111 },
    bank:        { w:1.8, h:6.5, d:1.8, color:0xC8D8E8, roof:0x7888A8 },
    university:  { w:2.8, h:4.2, d:2.8, color:0x4169E1, roof:0x2145A0 },
    centralBank: { w:2.4, h:10.0,d:2.4, color:0xFFD700, roof:0xCCA800 },
    spacePort:   { w:3.2, h:14.0,d:3.2, color:0x00CED1, roof:0x009BA0 },
  };

  function _spiralGrid(count) {
    const positions = [];
    const step = 3.8;
    const dirs = [[1,0],[0,1],[-1,0],[0,-1]];
    let x = 0, z = 0, dir = 0, segLen = 1, segCount = 0, turns = 0;
    for (let i = 0; i < 500 && positions.length < count; i++) {
      const px = x * step, pz = z * step;
      if (!(Math.abs(pz) < 1.4) && !(Math.abs(px) < 1.4) && !(Math.abs(px) < 2 && Math.abs(pz) < 2))
        positions.push([px, pz]);
      x += dirs[dir][0]; z += dirs[dir][1]; segCount++;
      if (segCount === segLen) { segCount = 0; dir = (dir+1)%4; turns++; if (turns%2===0) segLen++; }
    }
    return positions;
  }

  function _buildGround() {
    // Vast grass plain
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({ color: 0x2d6030 }));
    grass.rotation.x = -Math.PI/2; grass.receiveShadow = true;
    cityGroup.add(grass);

    // Inner paved district
    const paved = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshLambertMaterial({ color: 0x444444 }));
    paved.rotation.x = -Math.PI/2; paved.position.set(0, 0.008, 0);
    cityGroup.add(paved);

    // Roads
    const roadMat = new THREE.MeshLambertMaterial({ color: 0x333333 });
    [
      [80, 1.4, 0, 0, 0],
      [1.4, 80, 0, 0, 0],
      [80, 1.0, 0, 0, 12],
      [80, 1.0, 0, 0,-12],
      [1.0, 80, 0, 12, 0],
      [1.0, 80, 0,-12, 0],
    ].forEach(([w,d,_,x,z]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), roadMat);
      m.rotation.x = -Math.PI/2; m.position.set(x,0.012,z);
      cityGroup.add(m);
    });

    // Road markings
    const markMat = new THREE.MeshLambertMaterial({ color: 0xFFFF88 });
    for (let i = -10; i <= 10; i++) {
      [[i*1.9,0,0.08,0.7],[0,i*1.9,0.7,0.08]].forEach(([x,z,w,d]) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), markMat);
        m.rotation.x = -Math.PI/2; m.position.set(x,0.02,z); cityGroup.add(m);
      });
    }

    // Central plaza with fountain
    const plaza = new THREE.Mesh(new THREE.PlaneGeometry(4,4), new THREE.MeshLambertMaterial({ color: 0x888888 }));
    plaza.rotation.x = -Math.PI/2; plaza.position.set(0, 0.02, 0);
    cityGroup.add(plaza);

    const fontBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.3,0.35,16),
      new THREE.MeshLambertMaterial({ color: 0x777777 }));
    fontBase.position.set(0,0.175,0); fontBase.castShadow=true; cityGroup.add(fontBase);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.9,0.9,0.18,16),
      new THREE.MeshLambertMaterial({ color:0x3399CC, emissive:0x1133AA, emissiveIntensity:0.4 }));
    water.position.set(0,0.44,0); cityGroup.add(water);

    // Trees
    const trunkMat = new THREE.MeshLambertMaterial({ color:0x4A2C0A });
    const leafColors = [0x228B22, 0x2E8B57, 0x3CB371, 0x006400];
    const treePos = [
      [-7,-7],[7,-7],[-7,7],[7,7],[-12,0],[12,0],[0,-12],[0,12],
      [-5,-10],[5,-10],[-10,-5],[10,5],[-10,5],[5,10],[-5,10],[10,-5],
      [-15,4],[-15,-4],[15,4],[15,-4],[4,-15],[4,15],[-4,-15],[-4,15],
      [-18,0],[18,0],[0,-18],[0,18],[-13,-9],[13,9],[-9,-13],[9,13],
    ];
    treePos.forEach(([tx,tz],i) => {
      const h = 0.8 + (i%4)*0.3;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.18,h+0.4,6),trunkMat);
      t.position.set(tx,(h+0.4)/2,tz); t.castShadow=true; cityGroup.add(t);
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.6+(i%3)*0.15,6,5),
        new THREE.MeshLambertMaterial({color:leafColors[i%4]}));
      l.position.set(tx,h+0.55,tz); l.castShadow=true; cityGroup.add(l);
    });

    // Street lamps
    const lampPost = new THREE.MeshLambertMaterial({ color:0x888888 });
    const lampHead = new THREE.MeshLambertMaterial({ color:0xFFEE88, emissive:0xFFCC44, emissiveIntensity:0.8 });
    [[-3,3],[3,3],[-3,-3],[3,-3],[8,8],[-8,8],[8,-8],[-8,-8]].forEach(([x,z]) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,3.5,6), lampPost);
      pole.position.set(x,1.75,z); cityGroup.add(pole);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18,8,6), lampHead);
      head.position.set(x,3.6,z); cityGroup.add(head);
    });
  }

  function _makeBuilding(def, x, z, idx) {
    const g = new THREE.Group();
    const { w, h, d, color, roof } = def;
    const s = (idx+1)*1234567;
    g.position.set(x+((s%100)/100-0.5)*0.6, 0, z+(((s*7)%100)/100-0.5)*0.6);
    g.rotation.y = ((s%80)/80-0.5)*0.9;

    const body = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),
      new THREE.MeshLambertMaterial({color}));
    body.position.y = h/2; body.castShadow=true; body.receiveShadow=true; g.add(body);

    if (h >= 5) {
      // Skyscraper: ledge + windows
      const ledge = new THREE.Mesh(new THREE.BoxGeometry(w*1.12,0.25,d*1.12),
        new THREE.MeshLambertMaterial({color:roof}));
      ledge.position.y = h+0.125; ledge.castShadow=true; g.add(ledge);
      const winMat = new THREE.MeshLambertMaterial({color:0xADD8FF,emissive:0x2244AA,emissiveIntensity:0.5});
      const floors = Math.floor(h/1.6);
      for (let fl=0; fl<floors; fl++) {
        [[0,d/2+0.01,0],[0,-d/2-0.01,Math.PI]].forEach(([wx,wz,ry])=>{
          const win = new THREE.Mesh(new THREE.PlaneGeometry(w*0.32,0.55),winMat);
          win.position.set(wx,0.9+fl*1.6,wz); win.rotation.y=ry; g.add(win);
          // Side windows
          const swin = new THREE.Mesh(new THREE.PlaneGeometry(d*0.25,0.5),winMat);
          swin.position.set(ry===0?w/2+0.01:-w/2-0.01, 0.9+fl*1.6, 0);
          swin.rotation.y = ry===0?Math.PI/2:-Math.PI/2; g.add(swin);
        });
      }
      // Antenna
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.06,h*0.25,6),
        new THREE.MeshLambertMaterial({color:0x666666}));
      ant.position.y = h+h*0.125+0.25; g.add(ant);
    } else if (h >= 2) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w,d)*0.78,h*0.4,4),
        new THREE.MeshLambertMaterial({color:roof}));
      cone.position.y = h+h*0.2; cone.rotation.y=Math.PI/4; cone.castShadow=true; g.add(cone);
      // Chimney
      if (h > 3) {
        const chim = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.15,0.8,6),
          new THREE.MeshLambertMaterial({color:0x555555}));
        chim.position.set(w*0.25,h+0.4,0); g.add(chim);
      }
    } else {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w*1.08,0.18,d*1.08),
        new THREE.MeshLambertMaterial({color:roof}));
      slab.position.y = h+0.09; g.add(slab);
    }

    g.userData = { pOff:(idx*0.618)%(Math.PI*2) };
    return g;
  }

  function rebuildCity() {
    for (const m of buildingMeshes) cityGroup.remove(m);
    buildingMeshes = [];
    const toPlace = [];
    if (typeof GS !== 'undefined') {
      for (const [id,def] of Object.entries(BLD)) {
        const cnt = GS.buildings[id]||0;
        if (!cnt) continue;
        for (let i=0; i<Math.min(cnt,7); i++) toPlace.push({def,idx:toPlace.length});
      }
    }
    if (!toPlace.length) toPlace.push({def:BLD.hut,idx:0});
    const positions = _spiralGrid(toPlace.length);
    toPlace.forEach(({def,idx},i) => {
      const [px,pz] = positions[i]||[(i%8)*4-16,Math.floor(i/8)*4];
      const g = _makeBuilding(def,px,pz,idx);
      cityGroup.add(g); buildingMeshes.push(g);
    });
    lastBuildSig = _getBuildSig();
  }

  function _getBuildSig() {
    if (typeof GS === 'undefined') return '';
    return Object.entries(GS.buildings).map(([k,v])=>k+v).join('|');
  }

  function _animate() {
    if (!animating) return;
    requestAnimationFrame(_animate);
    const dt = clock.getDelta();

    rotAngle += dt * 0.08;
    cityGroup.rotation.y = rotAngle;

    if (clickPulse > 0) {
      clickPulse = Math.max(0, clickPulse - dt * 2.5);
      pulseLight.intensity = clickPulse * 4;
      for (const m of buildingMeshes) {
        const b = Math.max(0, Math.sin(m.userData.pOff+(1-clickPulse)*Math.PI*3))*clickPulse;
        m.position.y = b * 2;
      }
    } else {
      if (pulseLight.intensity > 0) pulseLight.intensity = Math.max(0, pulseLight.intensity-dt*4);
      for (const m of buildingMeshes) if (m.position.y!==0) m.position.y=0;
    }

    const sig = _getBuildSig();
    if (sig !== lastBuildSig) rebuildCity();

    renderer.render(scene, camera);
  }

  return {
    init(containerId) {
      const container = document.getElementById(containerId);
      if (!container || typeof THREE === 'undefined') return;

      const W = window.innerWidth, H = window.innerHeight;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB);
      scene.fog = new THREE.FogExp2(0xA8D8F0, 0.012);

      camera = new THREE.PerspectiveCamera(42, W/H, 0.1, 300);
      camera.position.set(0, 42, 58);
      camera.lookAt(0, 4, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
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
      sun.position.set(15, 30, 20); sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.camera.left = sun.shadow.camera.bottom = -30;
      sun.shadow.camera.right = sun.shadow.camera.top = 30;
      sun.shadow.camera.far = 90; sun.shadow.bias = -0.002;
      scene.add(sun);

      pulseLight = new THREE.PointLight(0xFFAA33, 0, 40);
      pulseLight.position.set(0, 8, 0);
      scene.add(pulseLight);

      clock = new THREE.Clock();
      _buildGround();
      rebuildCity();

      // Click on city (empire tab) → generate labour
      renderer.domElement.addEventListener('click', (e) => {
        if (typeof Tabs !== 'undefined' && Tabs.current !== 'empire') return;
        if (typeof EmpireUI !== 'undefined') EmpireUI._handleClick(e);
        clickPulse = 1.0;
      });

      window.addEventListener('resize', () => {
        const w = window.innerWidth, h = window.innerHeight;
        camera.aspect = w/h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });

      animating = true;
      _animate();
    },

    triggerPulse() { clickPulse = 1.0; },
    rebuildCity,
    destroy() { animating = false; if (renderer) renderer.dispose(); },
  };
})();
