// A.I. Disclaimer: All work for this assignment was completed by myself and entirely without
// the use of artificial intelligence tools such as ChatGPT, MS Copilot, other LLMs, etc.

import * as THREE from "three";

export function createPot(scene, position, scale) {

    const texLoader = new THREE.TextureLoader();

    const potMat = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      metalness: 0.5,
      map: texLoader.load("Textures/pot_diffuse_map.jpg"),
      roughnessMap: texLoader.load("Textures/pot_rough_map.jpg")
    });
    potMat.map.colorSpace = THREE.SRGBColorSpace;

    const matLightBrown = new THREE.MeshStandardMaterial({
      color: 0x523c0f,
      metalness: 0.05,
      roughness: 0.9,
    });
    const doubleMatDarkBrown = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      color: 0x33220b,
      metalness: 0.01,
      roughness: 0.95,
    });

    // root transform of the pot
    const potRoot = new THREE.Group();
    potRoot.position.set(position.x, position.y, position.z);
    potRoot.scale.set(scale.x, scale.y, scale.z);
    scene.add(potRoot);

    // pot sides
    const points = [];
    const sideHeight = 0.8;
    const sideRadius = 4;
    const sideSegments = 75;
    for (let i = 0; i < 10; i++) {
        points.push( new THREE.Vector2( Math.sin( i * Math.PI * 0.2 ) * 1.5 + sideRadius, (i - 5) * sideHeight ) );
    }
    const potMesh = new THREE.Mesh(new THREE.LatheGeometry(points, sideSegments), potMat);
    potMesh.castShadow = true;
    potMesh.receiveShadow = true;
    potRoot.add(potMesh);

    // pot rim
    const rimMesh = new THREE.Mesh(new THREE.TorusGeometry(3, 0.2, 16, 100), potMat);
    rimMesh.position.set(0, 3.1, 0);
    rimMesh.rotation.set(Math.PI / 2.0, 0, 0);
    rimMesh.castShadow = true;
    rimMesh.receiveShadow = true;
    potRoot.add(rimMesh);

    // pot bottom
    const bottomRadius = 4;
    const bottomSegments = sideSegments * 2;
    const bottomMesh = new THREE.Mesh(new THREE.CircleGeometry(bottomRadius, bottomSegments), potMat);
    bottomMesh.position.set(0, -4, 0);
    bottomMesh.rotation.set(Math.PI / 2.0, 0, 0);
    bottomMesh.castShadow = true;
    potRoot.add(bottomMesh);

    // dirt
    const dirtRadius = 2.55;
    const dirtSegments = sideSegments * 2;
    const dirtMesh = new THREE.Mesh(new THREE.CircleGeometry(dirtRadius, dirtSegments), doubleMatDarkBrown);
    dirtMesh.position.set(0, 1.9, 0);
    dirtMesh.rotation.set(Math.PI / 2.0, 0, 0);
    dirtMesh.receiveShadow = true;
    potRoot.add(dirtMesh);

    // dirt clods
    const numClods = 25;
    for (let i = 0; i < numClods; i++) {

        const bounds = 1.8;

        let randX = truncateToPlace(Math.random() * bounds * 2 - bounds, 2);
        let randY = truncateToPlace(1.8 + Math.random() * 0.2, 3);
        let randZ = truncateToPlace(Math.random() * bounds * 2 - bounds, 2);

        let clodRadius = 0.1 + Math.random() * 0.2;
        
        if (randX + clodRadius > bounds) {
        clodRadius = bounds - randX;
        }
        else if (randX - clodRadius < -bounds) {
        clodRadius = randX + bounds;
        }

        if (randZ + clodRadius > bounds) {
        clodRadius = bounds - randZ;
        }
        else if (randZ - clodRadius < -bounds) {
        clodRadius = randZ + bounds;
        }

        let clodDetail = 2 + Math.random() * 4;
        clodDetail = Math.trunc(clodDetail);

        const clodMesh = new THREE.Mesh(new THREE.TetrahedronGeometry(clodRadius, clodDetail), matLightBrown);
        clodMesh.position.set(randX, randY, randZ);
        clodMesh.receiveShadow = true;
        potRoot.add(clodMesh);

    }

    return potRoot;
}

function truncateToPlace(number, place) {
  for (let i = 0; i < place; i++) {
    number *= 10;
  }
  Math.trunc(number);
  for (let i = 0; i < place; i++) {
    number /= 10;
  }
  return number;
}