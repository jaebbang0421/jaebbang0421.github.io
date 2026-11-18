import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Loads a .glb file from public/ and adds it to the given parent object.
export function loadGLTFModel(parent, glbPath, options = { receiveShadow: true, castShadow: true }) {
  const { receiveShadow, castShadow } = options
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = 'smart-home'
        obj.traverse(child => {
          if (child.isMesh) {
            const transparent = child.material && child.material.transparent
            child.castShadow = castShadow && !transparent
            child.receiveShadow = receiveShadow
          }
        })
        parent.add(obj)
        resolve(obj)
      },
      undefined,
      error => reject(error)
    )
  })
}
