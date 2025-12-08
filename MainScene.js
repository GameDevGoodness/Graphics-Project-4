// Team 4
// Joshua Frazer
// Jordan Frazer

// A.I. Disclaimer: All work for this assignment was completed by myself and entirely without
// the use of artificial intelligence tools such as ChatGPT, MS Copilot, other LLMs, etc.


import * as THREE from "three";
//import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPot } from "./pot.js";
import { createChalice } from "./chalice.js";
import { createGrave } from "./grave.js";
import { createCandle } from "./candle.js";
import { createObjectScene } from "./gltfImporter.js";

// ---------------------------------------------------------
// 1) Basic scene setup
// ---------------------------------------------------------
const scene = new THREE.Scene();

// WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// Keep pixel ratio reasonable for performance
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // can change to 2
document.body.appendChild(renderer.domElement);  // add the canvas created automatically in memory

renderer.outputEncoding = THREE.srRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0.5, 0.8, 8);

// Orbit controls for exploration
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, -1);
controls.update();


// set up environment

scene.fog = new THREE.FogExp2(0x222222, 0.02);

const dirLight = new THREE.DirectionalLight(0xd0d0FF, 1);
dirLight.position.set(0, 10, 0);
dirLight.target.position.set(-5, 0, 0);
dirLight.castShadow = true;
scene.add(dirLight);
scene.add(dirLight.target);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

// const spotLight = new THREE.SpotLight(0xffffff, 50);
// spotLight.position.set(-2, 8, -1);
// spotLight.target.position.set(-2, 0, -0.5);
// spotLight.penumbra = 0.5;
// spotLight.distance = 30;
// spotLight.angle = Math.PI / 10;
// spotLight.castShadow = true;
// scene.add(spotLight);

createPot(scene, new THREE.Vector3(5, -0.6, -1), new THREE.Vector3(0.1, 0.1, 0.1));
//let well = await createObjectScene(scene, "Gltfs/well.glb", new THREE.Vector3(3, -0.1, 0), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, 0, 0));
let monster = await createObjectScene(scene, "Gltfs/FlyingMonster.glb", new THREE.Vector3(0.5, 3.5, -5.5), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, -Math.PI / 2, 0));
//let humanoid = await createObjectScene(scene, "Gltfs/Humanoid.glb", new THREE.Vector3(0.5, 1.05, 0.4), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, 0, 0));
//let weapon = await createObjectScene(scene, "Gltfs/Weapon.glb", new THREE.Vector3(0.25, 1.2, 0.8), new THREE.Vector3(0.85, 0.7, 0.85), new THREE.Vector3(Math.PI, -Math.PI / 2, 0));
//let stool = await createObjectScene(scene, "Gltfs/stool.glb", new THREE.Vector3(0.2, -0.5, 2.3), new THREE.Vector3(1.75, 1.75, 1.75), new THREE.Vector3(0, 0, 0));
createChalice(scene, new THREE.Vector3(2.45, 0.9, -0.5), new THREE.Vector3(0.2, 0.2, 0.2));
createCandle(scene, new THREE.Vector3(2.35, 0.95, 0.6), new THREE.Vector3(0.12, 0.12, 0.12));

let gravePositions = [

  new THREE.Vector3(-1, 0.2, -40),
  new THREE.Vector3(-8, 0.2, -45),
  new THREE.Vector3(7, 0.2, -50),
  new THREE.Vector3(-6, 0.2, -60),
  new THREE.Vector3(1.25, 0.2, -80),
  new THREE.Vector3(-15, 0.2, -45),
  new THREE.Vector3(10, 0.2, -50),
  new THREE.Vector3(20, 0.2, -55),
];

for (let i = 0; i < gravePositions.length; i++) {
  createGrave(scene, gravePositions[i], new THREE.Vector3(0.6, 0.6, 0.6));
}


const groundMat = new THREE.MeshStandardMaterial({
  color: 0x33220b,
  metalness: 0.05,
  roughness: 0.7
});
const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const groundMesh = new THREE.Mesh(planeGeometry, groundMat);
groundMesh.rotation.set(-Math.PI / 2.0, 0, 0);
groundMesh.position.set(0, -1, 0);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const frontConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
frontConceilMesh.position.set(0, -1, -200);
scene.add(frontConceilMesh);

const backConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
backConceilMesh.rotation.set(0, Math.PI, 0);
backConceilMesh.position.set(0, -1, 200);
scene.add(backConceilMesh);

const leftConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
leftConceilMesh.rotation.set(0, Math.PI / 2, 0);
leftConceilMesh.position.set(-200, -1, 0);
scene.add(leftConceilMesh);

const rightConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
rightConceilMesh.rotation.set(0, -Math.PI / 2, 0);
rightConceilMesh.position.set(200, -1, 0);
scene.add(rightConceilMesh);

const topConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
topConceilMesh.rotation.set(Math.PI / 2, 0, 0);
topConceilMesh.position.set(0, 200, 0);
scene.add(topConceilMesh);


// ---------------------------------------------------------
// 7) Render loop & resize handling
// ---------------------------------------------------------
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener("resize", onResize);

let mixer = new THREE.AnimationMixer(monster.scene);
let isAnimationPlaying = false;

window.addEventListener('keydown', function (event) {

  if (event.key == 'A' || event.key == 'a') {
    const clips = monster.animations;
    clips.forEach( function ( clip ) {

      if (isAnimationPlaying) {
        mixer.clipAction( clip ).stop();
      }
      else {
        mixer.clipAction( clip ).play();
      }
    });

    isAnimationPlaying = !isAnimationPlaying;
  }

});

const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
});