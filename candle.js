/*
A.I. Disclaimer: All work for this assignment was completed by myself and entirely without
the use of artificial intelligence tools such as ChatGPT, MS Copilot, other LLMs, etc.
*/

import * as THREE from "three";

export function createCandle(scene, position, scale) {
  // Create the root for the candle object
  const candleGroup = new THREE.Group();
  scene.add(candleGroup);
  
  // bronze material for the candle base
  const baseMat = new THREE.MeshStandardMaterial({
    color : 0xCE8946, side: THREE.DoubleSide,
    metalness: 0.6,
    roughness: 0.2
  });
  
  // the disk making up the bottom of the candle
  const bottomGeometry = new THREE.CircleGeometry(1, 32);
  const bottom = new THREE.Mesh(bottomGeometry, baseMat);
  bottom.castShadow = true;
  bottom.rotation.x = Math.PI / 2;
  bottom.position.y = -0.3;
  candleGroup.add(bottom);
  
  // the points for the concave bowl of the candle
  let basePoints = [];
  // generate the disks for the bowl and add to the points array
  for (let i = 0; i < 12; i ++)
	  basePoints.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 3 + 5, ( i - 5 ) * 0.3 ) );
  
  // generate the mesh, scale it down, and add to the candle group
  const baseGeometry = new THREE.LatheGeometry(basePoints, 32);
  const base = new THREE.Mesh(baseGeometry, baseMat);
  base.scale.setScalar(0.2);
  candleGroup.add(base);

  // the bronze candle handle, made of a torus knot
  const handleGeometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16, 3, 3);
  const handle = new THREE.Mesh(handleGeometry, baseMat);
  handle.receiveShadow = true;
  handle.castShadow = true;

  // scale down the handle, rotate the knot, and offset the positon to the side
  handle.scale.setScalar(0.2);
  handle.rotation.set(Math.PI / 6, Math.PI / 2, Math.PI / 6);
  handle.position.set(0, 0.4, -1.5);
  candleGroup.add(handle);

  // the grey metal holder of the wax candle stick in the center of the bowl
  const baseStickHolderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.35, 24);
  const baseStickHolderMat = new THREE.MeshStandardMaterial({
    color : 0xa0a8b0,
    metalness: 0.6,
    roughness: 0.2
  });
  const baseStickHolder = new THREE.Mesh(baseStickHolderGeometry, baseStickHolderMat);
  baseStickHolder.receiveShadow = true;
  baseStickHolder.castShadow = true;
  baseStickHolder.position.y = -0.12;
  candleGroup.add(baseStickHolder);

  // the wax candle stick, positioned to rest above the bowl
  const stickGeometry = new THREE.CylinderGeometry(0.2, 0.2 , 2, 24);
  const stickMat = new THREE.MeshStandardMaterial({
    color : 0xF3E3C2,
    metalness: 0.4,
    roughness: 0.8
  });
  const stick = new THREE.Mesh(stickGeometry, stickMat);
  stick.receiveShadow = true;
  stick.castShadow = true;
  stick.position.y = 0.71;
  candleGroup.add(stick);

  // the wick of the candle, positioned to be just overlapping the wax stick
  const wickGeometry = new THREE.CylinderGeometry(0.02, 0.02 , 0.25, 12);
  const wickMat = new THREE.MeshStandardMaterial({
    color : 0x060606,
    metalness: 0.0,
    roughness: 0.8
  });
  const wick = new THREE.Mesh(wickGeometry, wickMat);
  wick.position.y = 1.75;
  candleGroup.add(wick);

  candleGroup.position.set(position.x, position.y, position.z);
  candleGroup.scale.set(scale.x, scale.y, scale.z);

  return candleGroup;
}