// A.I. Disclaimer: All work for this assignment was completed by myself and entirely without
// the use of artificial intelligence tools such as ChatGPT, MS Copilot, other LLMs, etc.

import * as THREE from "three";

export function createGrave(scene, position, scale) {

  const graveMat = new THREE.MeshStandardMaterial({
      color: 0x523c0f,
      metalness: 0.05,
      roughness: 0.7
  });

  const extrudeSettings = {
    steps: 2,
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.2,
    bevelSegments: 5
  };

  let shape = new THREE.Shape();
  shape.moveTo(0, -2);
  shape.lineTo(-0.5, -2);
  shape.lineTo(-0.5, 0);
  shape.lineTo(-1.5, 0);
  shape.lineTo(-1.5, 1);
  shape.lineTo(-0.5, 1);
  shape.lineTo(-0.5, 2);
  shape.lineTo(0.5, 2);
  shape.lineTo(0.5, 1);
  shape.lineTo(1.5, 1);
  shape.lineTo(1.5, 0);
  shape.lineTo(0.5, 0);
  shape.lineTo(0.5, -2);

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const mesh = new THREE.Mesh(geometry, graveMat);
  mesh.position.set(position.x, position.y, position.z);
  mesh.scale.set(scale.x, scale.y, scale.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}