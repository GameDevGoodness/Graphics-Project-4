// A.I. Disclaimer: All work for this assignment was completed by myself and entirely without
// the use of artificial intelligence tools such as ChatGPT, MS Copilot, other LLMs, etc.

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from "three";

export async function createGrassScene(scene, path, position, scale, rotation) {
  
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
  loader.setDRACOLoader( dracoLoader );
  const gltf = await loader.loadAsync( path );
  gltf.scene.castShadow = true;
  gltf.scene.receiveShadow = true;
  gltf.scene.position.set(position.x, position.y, position.z);
  gltf.scene.scale.set(scale.x, scale.y, scale.z);
  gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
  scene.add( gltf.scene );

  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = true;

      child.material.side = THREE.DoubleSide;
      
      child.material.transparent = true;
      child.material.alphaTest = 0.9;
      
      child.material.needsUpdate = true;
    }
  });

  return gltf;
}