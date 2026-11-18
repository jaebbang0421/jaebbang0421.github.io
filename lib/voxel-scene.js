// Live effects on top of the smart-home model (public/smart-home.glb):
// three UWB beacons that ping the user, dashed ranging lines, and the agent robot that
// hovers, glances at the user and acts on one device at a time.
// Positions are in the model's room coordinates (16 x 16 room, floor top at y = 0.5).
import * as THREE from 'three'

const EYE = '#4ee6ff'

const BEACONS = [
  { color: '#b48cf2', pos: [2.5, 5.0, 0.95] }, // area 1: sink
  { color: '#7aa7f2', pos: [0.95, 5.4, 10.5] }, // area 2: sofa
  { color: '#79d68d', pos: [5.5, 5.0, 0.95] } // area 3: stove
]

const USER_HEAD = new THREE.Vector3(4.5, 6.5, 5.0)
const AGENT_HOME = new THREE.Vector3(9.5, 6.2, 7.5)
const DEVICES = [
  new THREE.Vector3(5.9, 3.5, 10.1), // smart speaker
  new THREE.Vector3(13.7, 3.25, 10.25), // smart display
  new THREE.Vector3(1.25, 6.4, 14.5) // floor lamp
]

// room: the Group the model was loaded into; model: the loaded glTF scene
export function addSceneEffects(room, model, camera) {
  const agent = model.getObjectByName('agent') || new THREE.Group()
  agent.position.copy(AGENT_HOME)

  // ---------- UWB beacons with expanding signal shells ----------
  const pulses = []
  BEACONS.forEach((b, i) => {
    const color = new THREE.Color(b.color)
    const node = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9 })
    )
    node.position.set(...b.pos)
    room.add(node)
    for (let k = 0; k < 2; k++) {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 14),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false })
      )
      shell.position.copy(node.position)
      room.add(shell)
      pulses.push({ mesh: shell, offset: i * 0.33 + k * 0.5 })
    }
  })

  // dashed, flowing lines
  const lines = []
  const dashed = (from, to, color, opacity) => {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to])
    const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.35, gapSize: 0.25, transparent: true, opacity })
    const line = new THREE.Line(geo, mat)
    line.computeLineDistances()
    room.add(line)
    lines.push(mat)
    return line
  }
  BEACONS.forEach(b => dashed(new THREE.Vector3(...b.pos), USER_HEAD, b.color, 0.75))

  // ---------- agent extras: glowing antenna tip, halo, thinking dots ----------
  const glow = new THREE.Color(EYE)
  const tip = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.4, 0.4),
    new THREE.MeshStandardMaterial({ color: glow, emissive: glow, emissiveIntensity: 1.2 })
  )
  tip.position.set(0, 1.7, 0)
  agent.add(tip)
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.3, 0.08, 8, 40),
    new THREE.MeshBasicMaterial({ color: glow, transparent: true, opacity: 0.8 })
  )
  halo.rotation.x = Math.PI / 2
  halo.position.y = -1.85
  agent.add(halo)
  const dots = [0, 1, 2].map(i => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.28, 0.28),
      new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.4 })
    )
    m.position.set(1.9 + i * 0.4, 1.3 + i * 0.35, 0)
    agent.add(m)
    return m
  })

  const agentLink = dashed(AGENT_HOME.clone(), USER_HEAD, EYE, 0.9)
  const deviceLinks = DEVICES.map(d => dashed(AGENT_HOME.clone(), d, EYE, 0))

  const look = new THREE.Vector3()
  const tmp = new THREE.Vector3()

  // ---------- per-frame animation ----------
  return function animate(t) {
    pulses.forEach(p => {
      const ph = (t * 0.55 + p.offset) % 1
      p.mesh.scale.setScalar(0.4 + ph * 2.6)
      p.mesh.material.opacity = 0.28 * (1 - ph)
    })
    lines.forEach(m => {
      m.dashOffset = -t * 0.9
    })

    // hover and drift, mostly facing the viewer, sometimes turning to the user
    agent.position.set(
      AGENT_HOME.x + Math.sin(t * 0.5) * 0.6,
      AGENT_HOME.y + Math.sin(t * 1.6) * 0.25,
      AGENT_HOME.z + Math.cos(t * 0.4) * 0.5
    )
    look.set(USER_HEAD.x, agent.position.y, USER_HEAD.z)
    tmp.subVectors(look, agent.position)
    const toUser = Math.atan2(tmp.x, tmp.z)
    const toViewer = Math.atan2(camera.position.x, camera.position.z)
    let diff = toUser - toViewer
    diff = Math.atan2(Math.sin(diff), Math.cos(diff))
    const glance = Math.max(0, Math.sin(t * 0.45)) ** 3
    agent.rotation.y = toViewer + diff * glance + Math.sin(t * 0.9) * 0.08
    halo.scale.setScalar(1 + Math.sin(t * 3) * 0.06)
    tip.material.emissiveIntensity = 0.8 + Math.sin(t * 4) * 0.4

    agentLink.geometry.setFromPoints([agent.position, USER_HEAD])
    agentLink.computeLineDistances()

    // acts on one device at a time (proactive control)
    const active = Math.floor(t / 2.5) % DEVICES.length
    deviceLinks.forEach((l, i) => {
      l.geometry.setFromPoints([agent.position, DEVICES[i]])
      l.computeLineDistances()
      const target = i === active ? 0.85 : 0
      l.material.opacity += (target - l.material.opacity) * 0.08
    })

    dots.forEach((d, i) => {
      const on = Math.floor(t * 3) % 3 === i
      d.material.emissiveIntensity = on ? 1 : 0.15
      d.position.y = 1.3 + i * 0.35 + (on ? 0.12 : 0)
    })
  }
}
