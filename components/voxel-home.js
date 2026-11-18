import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { buildScene } from '../lib/voxel-scene'
import { VoxelContainer, VoxelSpinner } from './voxel-loader'

const HOME_ANGLE = Math.PI / 4 // looking into the room's open corner
const INTRO_SECONDS = 2.4 // intro spin: very fast at first, easing out to a stop
const INTRO_TURNS = 3
const RADIUS = 30
const CAM_Y = 19
const easeOutCirc = x => Math.sqrt(1 - Math.pow(x - 1, 2))

const VoxelHome = () => {
  const ref = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (e) {
      setLoading(false)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.cursor = 'grab'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-12, 12, 12, -12, 0.1, 200)
    const target = new THREE.Vector3(0, 3.2, 0)
    camera.position.set(Math.sin(HOME_ANGLE) * RADIUS, CAM_Y, Math.cos(HOME_ANGLE) * RADIUS)
    camera.lookAt(target)

    // lights
    scene.add(new THREE.HemisphereLight(0xfff6ea, 0x8a7f74, 1.25))
    const sun = new THREE.DirectionalLight(0xffffff, 1.9)
    sun.position.set(14, 24, 18)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 70 })
    sun.shadow.bias = -0.0015
    sun.shadow.normalBias = 0.03
    scene.add(sun)

    const world = new THREE.Group()
    scene.add(world)
    const animate = buildScene(world, camera)

    // controls: drag to rotate, wheel / pinch to zoom out (load size is the largest)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.copy(target)
    controls.enableZoom = true
    controls.zoomSpeed = 0.9
    controls.minZoom = 0
    controls.maxZoom = 1
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.minPolarAngle = 0.75
    controls.maxPolarAngle = 1.3
    const limitAzimuth = () => {
      // keep the camera on the open side of the room (the two walls stay behind the scene)
      controls.minAzimuthAngle = 0.02
      controls.maxAzimuthAngle = Math.PI / 2 - 0.02
    }
    let dragging = false
    let lastInteraction = -10
    const onStart = () => {
      dragging = true
      renderer.domElement.style.cursor = 'grabbing'
    }
    const onEnd = () => {
      dragging = false
      lastInteraction = performance.now() / 1000
      renderer.domElement.style.cursor = 'grab'
    }
    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)

    // intro progress is driven by frame time actually shown on screen (not wall-clock time),
    // so a slow first render or shader compile can't swallow the spin before it is visible
    let introT = 0
    let introElapsed = 0
    let swayT = 0
    controls.minAzimuthAngle = -Infinity
    controls.maxAzimuthAngle = Infinity

    // sizing
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight || w
      renderer.setSize(w, h, false)
      const half = 12.5
      const aspect = w / h
      camera.left = -half * aspect
      camera.right = half * aspect
      camera.top = half
      camera.bottom = -half
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(el)

    const clock = new THREE.Clock()
    const sph = new THREE.Spherical()
    const off = new THREE.Vector3()
    let raf

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime

      if (introT < 1) {
        // pop in while spinning several turns, fast at first and slowing down to the home view
        introElapsed += dt
        introT = Math.min(1, introElapsed / INTRO_SECONDS)
        const e = easeOutCirc(introT)
        world.scale.setScalar(0.55 + 0.45 * Math.min(1, introT * 2.5))
        const a = HOME_ANGLE - (1 - e) * INTRO_TURNS * Math.PI * 2
        camera.position.set(Math.sin(a) * RADIUS, CAM_Y, Math.cos(a) * RADIUS)
        if (introT >= 1) limitAzimuth()
      } else if (!dragging && performance.now() / 1000 - lastInteraction > 3) {
        // idle: sway slowly left and right around the home view
        swayT += dt
        off.copy(camera.position).sub(target)
        sph.setFromVector3(off)
        const goal = HOME_ANGLE + Math.sin(swayT * 0.22) * 0.55
        sph.theta += (goal - sph.theta) * Math.min(1, dt * 1.5)
        off.setFromSpherical(sph)
        camera.position.copy(target).add(off)
      }

      animate(t, dt)
      controls.update(dt)
      renderer.render(scene, camera)
    }
    // first render compiles shaders and shadow maps; start timing only after it, at the home pose
    world.scale.setScalar(0.55)
    const a0 = HOME_ANGLE - INTRO_TURNS * Math.PI * 2
    camera.position.set(Math.sin(a0) * RADIUS, CAM_Y, Math.cos(a0) * RADIUS)
    renderer.render(scene, camera)
    setLoading(false)
    clock.getDelta()
    raf = requestAnimationFrame(frame)

    // shrink the scene as the page scrolls down (100% at the top, 55% once scrolled past it)
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const progress = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight * 0.9)))
        el.style.transform = `scale(${1 - 0.45 * progress})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      io.disconnect()
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('end', onEnd)
      controls.dispose()
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <VoxelContainer ref={ref}>
      {loading && <VoxelSpinner />}
    </VoxelContainer>
  )
}

export default VoxelHome
