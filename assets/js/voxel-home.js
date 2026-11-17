// Voxel smart home with an AI agent — generated in code (no model file needed).
// Scene: a small room (kitchen, sofa, TV, plant), a resident wearing a wrist sensor,
// three UWB beacons that "ping" the resident (as in the sector-level location encoding work),
// and a hovering agent robot that watches the resident and talks to the devices.
//
// To swap in a hand-made model later (e.g. MagicaVoxel -> Blender -> .glb), replace
// buildScene() with a GLTFLoader call; the camera / controls / render loop can stay.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


function init(el) {
  const loading = el.querySelector(".voxel__loading");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    if (loading) loading.textContent = "";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-12, 12, 12, -12, 0.1, 200);
  const target = new THREE.Vector3(0, 3.2, 0);
  const homeAngle = Math.PI / 4;          // looking into the room's open corner
  const startAngle = homeAngle - 0.6;
  const radius = 30;
  camera.position.set(Math.sin(startAngle) * radius, 19, Math.cos(startAngle) * radius);
  camera.lookAt(target);

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight(0xfff6ea, 0x8a7f74, 1.25));
  const sun = new THREE.DirectionalLight(0xffffff, 1.9);
  sun.position.set(14, 24, 18);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 70 });
  sun.shadow.bias = -0.0015;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);

  const world = new THREE.Group();
  scene.add(world);
  const anim = buildScene(world, camera);

  // ---------- controls ----------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minPolarAngle = 0.75;
  controls.maxPolarAngle = 1.3;
  // keep the camera on the open side of the room (the two walls stay behind the scene)
  controls.minAzimuthAngle = 0.02;
  controls.maxAzimuthAngle = Math.PI / 2 - 0.02;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastInteraction = -10;
  let dragging = false;
  controls.addEventListener("start", () => { dragging = true; });
  controls.addEventListener("end", () => { dragging = false; lastInteraction = performance.now() / 1000; });
  const sph = new THREE.Spherical();
  const off = new THREE.Vector3();

  // ---------- sizing ----------
  function resize() {
    const w = el.clientWidth;
    const h = el.clientHeight || w;
    renderer.setSize(w, h, false);
    const half = 12.5;
    const aspect = w / h;
    camera.left = -half * aspect;
    camera.right = half * aspect;
    camera.top = half;
    camera.bottom = -half;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(el);

  // ---------- loop ----------
  const clock = new THREE.Clock();
  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(el);

  let introT = 0;
  world.scale.setScalar(0.001);

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    // intro: pop-in + quarter turn ease
    if (introT < 1) {
      introT = Math.min(1, introT + dt / 1.4);
      const e = 1 - Math.pow(1 - introT, 3);
      world.scale.setScalar(0.55 + 0.45 * e);
      const a = startAngle + e * 0.6;
      camera.position.set(Math.sin(a) * radius, 19, Math.cos(a) * radius);
    } else if (!reduceMotion && !dragging && performance.now() / 1000 - lastInteraction > 3) {
      // idle: sway slowly left and right around the home view
      off.copy(camera.position).sub(target);
      sph.setFromVector3(off);
      const goal = homeAngle + Math.sin((t - 1.4) * 0.22) * 0.55;
      sph.theta += (goal - sph.theta) * Math.min(1, dt * 1.5);
      off.setFromSpherical(sph);
      camera.position.copy(target).add(off);
    }

    anim(t, dt);
    controls.update(dt);
    renderer.render(scene, camera);
  }
  renderer.render(scene, camera);
  if (loading) loading.remove();
  frame();
}

// ===================================================================================
// Scene construction
// ===================================================================================

const PALETTE = {
  floorA: "#c9a27b", floorB: "#bf9771", floorEdge: "#7d6450",
  wallBack: "#f1ebe1", wallLeft: "#e4dccf", baseboard: "#cfc3b3", frame: "#fbfaf7",
  cabinet: "#f7f3ec", counterTop: "#8e6c55", steel: "#b7c1ca", stove: "#2c2c30", burner: "#ff6b3d",
  fridge: "#dbe3e9", fridgeLine: "#c2ccd3",
  sofa: "#d8a03f", sofaLight: "#e6b35a", rug: "#ece0c2", rugBorder: "#c8704f",
  table: "#9b6a48", speaker: "#383c47", speakerLight: "#53e0ea",
  tvStand: "#6a503d", tv: "#24262d", tvScreen: "#4b8fe6",
  pot: "#b5653b", leaf: "#5d9e4a", leafDark: "#4a873b",
  lampPole: "#3d3d42", lampShade: "#ffe2a3",
  skin: "#f1c6a3", hair: "#2c2422", shirt: "#e8675a", pants: "#36425c", shoe: "#26262a", band: "#6b8cff",
  robot: "#f4f6f8", robotShade: "#dfe4ea", visor: "#1d2230", eye: "#4ee6ff", robotGrey: "#9aa3ad",
};

const BEACONS = [
  { color: "#b48cf2", pos: [2.5, 5.0, 0.95] },   // area 1: sink
  { color: "#7aa7f2", pos: [0.95, 5.4, 10.5] },  // area 2: sofa
  { color: "#79d68d", pos: [5.5, 5.0, 0.95] },   // area 3: stove
];

function seeded(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

class VoxelSet {
  constructor() { this.map = new Map(); }
  set(x, y, z, c) { this.map.set(`${x},${y},${z}`, [x, y, z, c]); }
  del(x, y, z) { this.map.delete(`${x},${y},${z}`); }
  fill(x0, y0, z0, x1, y1, z1, c) {
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) this.set(x, y, z, c);
  }
  carve(x0, y0, z0, x1, y1, z1) {
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) this.del(x, y, z);
  }
  toMesh(size, rand) {
    const items = [...this.map.values()];
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0.0 });
    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    const m = new THREE.Matrix4();
    const col = new THREE.Color();
    items.forEach(([x, y, z, c], i) => {
      m.makeTranslation(x * size, y * size, z * size);
      mesh.setMatrixAt(i, m);
      col.set(c).offsetHSL(0, 0, (rand() - 0.5) * 0.035);
      mesh.setColorAt(i, col);
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }
}

function buildScene(world, camera) {
  const rand = seeded(421);
  const P = PALETTE;
  const v = new VoxelSet();
  const room = new THREE.Group();
  room.position.set(-7.5, 0, -7.5);
  world.add(room);

  // floor (planks) with a thick edge
  for (let x = 0; x <= 15; x++) for (let z = 0; z <= 15; z++) {
    v.set(x, 0, z, (x % 2 ? P.floorA : P.floorB));
    v.set(x, -1, z, P.floorEdge);
  }
  // rug under the coffee table
  for (let x = 4; x <= 9; x++) for (let z = 8; z <= 13; z++) {
    const border = x === 4 || x === 9 || z === 8 || z === 13;
    v.set(x, 0, z, border ? P.rugBorder : P.rug);
  }

  // walls
  v.fill(0, 1, 0, 15, 9, 0, P.wallBack);
  v.fill(0, 1, 0, 0, 9, 15, P.wallLeft);
  v.fill(1, 1, 0, 15, 1, 0, P.baseboard);
  v.fill(0, 1, 1, 0, 1, 15, P.baseboard);
  // window on the back wall
  v.fill(8, 3, 0, 12, 7, 0, P.frame);
  v.carve(9, 4, 0, 11, 6, 0);
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({ color: "#a9d4f2", transparent: true, opacity: 0.45, roughness: 0.1 })
  );
  glass.position.set(10, 5, 0);
  room.add(glass);

  // kitchen counter (sink + stove) with upper cabinets
  v.fill(1, 1, 1, 7, 2, 2, P.cabinet);
  v.fill(1, 3, 1, 7, 3, 2, P.counterTop);
  v.fill(2, 3, 1, 3, 3, 2, P.steel);          // sink
  v.set(2, 4, 1, P.steel);                      // faucet
  v.fill(5, 3, 1, 6, 3, 2, P.stove);            // stove
  v.set(5, 3, 2, P.burner); v.set(6, 3, 1, P.burner);
  v.fill(1, 6, 1, 7, 7, 1, P.cabinet);
  v.fill(5, 6, 1, 6, 6, 2, P.steel);            // hood
  // fridge
  v.fill(13, 1, 1, 14, 7, 2, P.fridge);
  v.fill(13, 5, 2, 14, 5, 2, P.fridgeLine);

  // sofa on the left wall
  v.fill(1, 1, 8, 2, 2, 13, P.sofa);
  v.fill(2, 2, 9, 2, 2, 12, P.sofaLight);
  v.fill(1, 3, 8, 1, 4, 13, P.sofa);
  v.fill(2, 3, 8, 2, 3, 8, P.sofa);
  v.fill(2, 3, 13, 2, 3, 13, P.sofa);

  // coffee table + smart speaker
  [[5, 9], [7, 9], [5, 11], [7, 11]].forEach(([x, z]) => v.set(x, 1, z, P.table));
  v.fill(5, 2, 9, 7, 2, 11, P.table);
  v.set(6, 3, 10, P.speaker);
  v.set(6, 4, 10, P.speakerLight);

  // low media console with a smart display, on the right
  v.fill(13, 1, 8, 14, 1, 12, P.tvStand);
  v.fill(14, 2, 9, 14, 3, 11, P.tv);
  v.fill(14, 2, 10, 14, 3, 10, P.tvScreen);

  // plant in the front-right corner
  v.fill(13, 1, 13, 14, 1, 14, P.pot);
  v.fill(13, 2, 13, 14, 3, 14, P.leaf);
  v.set(12, 3, 14, P.leafDark); v.set(14, 4, 13, P.leafDark); v.set(13, 4, 14, P.leaf);

  // ceiling-less pendant light over the counter (wall-mounted)
  v.fill(3, 8, 1, 4, 8, 2, P.lampShade);

  // resident (wrist wearable in blue) standing at the counter
  v.fill(4, 1, 5, 4, 1, 5, P.shoe); v.fill(5, 1, 5, 5, 1, 5, P.shoe);
  v.fill(4, 2, 5, 4, 3, 5, P.pants); v.fill(5, 2, 5, 5, 3, 5, P.pants);
  v.fill(4, 4, 5, 5, 6, 5, P.shirt);
  v.fill(3, 5, 5, 3, 6, 5, P.shirt); v.fill(6, 5, 5, 6, 6, 5, P.shirt);
  v.set(3, 4, 5, P.skin); v.set(6, 4, 5, P.band);
  v.fill(4, 7, 5, 5, 8, 5, P.skin);
  v.fill(4, 9, 5, 5, 9, 5, P.hair); v.fill(4, 8, 4, 5, 8, 4, P.hair);
  const residentHead = new THREE.Vector3(4.5, 7.6, 5);

  room.add(v.toMesh(1, rand));

  // ---------- UWB beacons with expanding signal shells ----------
  const pulses = [];
  BEACONS.forEach((b, i) => {
    const color = new THREE.Color(b.color);
    const node = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9 })
    );
    node.position.set(...b.pos);
    room.add(node);
    for (let k = 0; k < 2; k++) {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 14),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.0, depthWrite: false })
      );
      shell.position.copy(node.position);
      room.add(shell);
      pulses.push({ mesh: shell, offset: i * 0.33 + k * 0.5 });
    }
  });

  // beacon -> resident ranging lines (dashed, flowing)
  const lines = [];
  function dashed(from, to, color, opacity) {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.35, gapSize: 0.25, transparent: true, opacity });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    room.add(line);
    lines.push(mat);
    return line;
  }
  BEACONS.forEach((b) => dashed(new THREE.Vector3(...b.pos), residentHead, b.color, 0.75));

  // ---------- agent robot (finer 0.5 voxels) ----------
  const r = new VoxelSet();
  r.fill(-3, 0, -2, 3, 5, 2, P.robot);
  r.fill(-3, 0, -2, 3, 0, 2, P.robotShade);
  r.fill(-3, 1, -2, 3, 1, 2, "#0b5aa8");             // accent band
  for (const x of [-3, 3]) for (const z of [-2, 2]) r.carve(x, 0, z, x, 5, z); // round vertical edges
  r.carve(-3, 5, -2, 3, 5, -2); r.carve(-3, 5, 2, 3, 5, 2);
  r.carve(-3, 5, -2, -3, 5, 2); r.carve(3, 5, -2, 3, 5, 2);
  r.fill(-2, 2, 3, 2, 4, 3, P.visor);                // face screen sticks out a little
  r.fill(-1, 3, 3, -1, 4, 3, P.eye); r.fill(1, 3, 3, 1, 4, 3, P.eye);
  r.set(-4, 2, 0, P.robotGrey); r.set(4, 2, 0, P.robotGrey);
  r.set(-4, 3, 0, P.robotGrey); r.set(4, 3, 0, P.robotGrey);
  r.fill(0, 6, 0, 0, 6, 0, P.robotGrey);
  const agent = new THREE.Group();
  const body = r.toMesh(0.5, rand);
  body.position.y = -1.1;
  agent.add(body);
  const glow = new THREE.Color(P.eye);
  const tip = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.42, 0.42),
    new THREE.MeshStandardMaterial({ color: glow, emissive: glow, emissiveIntensity: 1.2 })
  );
  tip.position.set(0, -1.1 + 3.6, 0);
  agent.add(tip);
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.25, 0.09, 8, 36),
    new THREE.MeshBasicMaterial({ color: glow, transparent: true, opacity: 0.8 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -1.6;
  agent.add(halo);
  const agentHome = new THREE.Vector3(9.5, 6.2, 7.5);
  agent.position.copy(agentHome);
  room.add(agent);

  // agent <-> resident / devices links
  const agentLink = dashed(agentHome.clone(), residentHead, P.eye, 0.9);
  const devices = [new THREE.Vector3(6, 4.4, 10), new THREE.Vector3(13.6, 3, 10), new THREE.Vector3(3.5, 7.6, 2)];
  const deviceLinks = devices.map((d) => dashed(agentHome.clone(), d, P.eye, 0.0));

  // thought bubble: three little cubes that blink in sequence
  const dots = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 0.4 })
    );
    m.position.set(1.8 + i * 0.45, 2.0 + i * 0.4, 0);
    agent.add(m);
    return m;
  });

  const look = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  // ---------- per-frame animation ----------
  return function animate(t) {
    // beacon pings
    pulses.forEach((p) => {
      const ph = ((t * 0.55 + p.offset) % 1);
      p.mesh.scale.setScalar(0.4 + ph * 2.6);
      p.mesh.material.opacity = 0.28 * (1 - ph);
    });
    lines.forEach((m) => { m.dashOffset = -t * 0.9; });

    // agent hovers, drifts a little and keeps looking at the resident
    agent.position.set(
      agentHome.x + Math.sin(t * 0.5) * 0.6,
      agentHome.y + Math.sin(t * 1.6) * 0.25,
      agentHome.z + Math.cos(t * 0.4) * 0.5
    );
    look.set(residentHead.x, agent.position.y, residentHead.z);
    tmp.subVectors(look, agent.position);
    const toResident = Math.atan2(tmp.x, tmp.z);
    const toViewer = Math.atan2(camera.position.x, camera.position.z);
    let diff = toResident - toViewer;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    const glance = Math.max(0, Math.sin(t * 0.45)) ** 3;   // mostly faces you, sometimes turns to the resident
    agent.rotation.y = toViewer + diff * glance + Math.sin(t * 0.9) * 0.08;
    halo.scale.setScalar(1 + Math.sin(t * 3) * 0.06);
    tip.material.emissiveIntensity = 0.8 + Math.sin(t * 4) * 0.4;

    agentLink.geometry.setFromPoints([agent.position, residentHead]);
    agentLink.computeLineDistances();

    // agent "acts" on one device at a time (proactive control)
    const active = Math.floor(t / 2.5) % devices.length;
    deviceLinks.forEach((l, i) => {
      l.geometry.setFromPoints([agent.position, devices[i]]);
      l.computeLineDistances();
      const target = i === active ? 0.85 : 0.0;
      l.material.opacity += (target - l.material.opacity) * 0.08;
    });

    dots.forEach((d, i) => {
      const on = Math.floor(t * 3) % 3 === i;
      d.material.emissiveIntensity = on ? 1.0 : 0.15;
      d.position.y = 2.0 + i * 0.4 + (on ? 0.12 : 0);
    });
  };
}

const container = document.getElementById("voxel");
if (container) init(container);
