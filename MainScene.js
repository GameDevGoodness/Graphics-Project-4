// Team 4
// Joshua Frazer
// Jordan Frazer

// A.I. Disclaimer: All work for this assignment was completed by myself and entirely without
// the use of artificial intelligence tools such as ChatGPT, MS Copilot, other LLMs, etc.


import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPot } from "./pot.js";
import { createChalice } from "./chalice.js";
import { createGrave } from "./grave.js";
import { createCandle } from "./candle.js";
import { createObjectScene } from "./gltfImporter.js";
import { createGrassScene } from "./gltfGrassImporter.js";

// ---------------------------------------------------------
// Basic scene setup
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
camera.position.set(0.5, 0.8, 9);

// Orbit controls for exploration
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, -1);
controls.update();


// set up environment

scene.fog = new THREE.FogExp2(0x222222, 0.03);

const dirLight = new THREE.DirectionalLight(0xd0d0FF, 1);
//const dirLight = new THREE.DirectionalLight(0xFFFFFF, 5);
dirLight.position.set(0, 10, 0);
dirLight.target.position.set(-5, 0, 0);
dirLight.castShadow = true;
scene.add(dirLight);
scene.add(dirLight.target);

const ambientLight = new THREE.AmbientLight(0x404040, 1.25);
scene.add(ambientLight);

createPot(scene, new THREE.Vector3(5, -0.6, -1), new THREE.Vector3(0.1, 0.1, 0.1));
let well = await createObjectScene(scene, "Gltfs/well.glb", new THREE.Vector3(3, -0.1, 0), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, 0, 0));
let monster = await createObjectScene(scene, "Gltfs/FlyingMonster.glb", new THREE.Vector3(0.5, 3.5, -5.5), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, -Math.PI / 2, 0));
let humanoid = await createObjectScene(scene, "Gltfs/Humanoid.glb", new THREE.Vector3(0.5, 1.05, 0.4), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, 0, 0));
let weapon = await createObjectScene(scene, "Gltfs/Weapon.glb", new THREE.Vector3(0.25, 1.2, 0.8), new THREE.Vector3(0.85, 0.7, 0.85), new THREE.Vector3(Math.PI, -Math.PI / 2, 0));
let stool = await createObjectScene(scene, "Gltfs/stool.glb", new THREE.Vector3(0.2, -0.5, 2.3), new THREE.Vector3(1.75, 1.75, 1.75), new THREE.Vector3(0, 0, 0));
let ground = await createObjectScene(scene, "Gltfs/Ground.glb", new THREE.Vector3(30, -1, -57), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, Math.PI / 2, 0));
let grass = await createGrassScene(scene, "Gltfs/Grass.glb", new THREE.Vector3(30, -2, -57), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, Math.PI / 2, 0));
let trees = await createObjectScene(scene, "Gltfs/Trees.glb", new THREE.Vector3(30, -1, -57), new THREE.Vector3(1, 1, 1), new THREE.Vector3(0, Math.PI / 2, 0));
let rock = await createObjectScene(scene, "Gltfs/Rock.glb", new THREE.Vector3(-1, 1.6, -35.3), new THREE.Vector3(0.6, 0.6, 0.6), new THREE.Vector3(0, Math.PI / 2, 0));

createChalice(scene, new THREE.Vector3(2.45, 0.9, -0.5), new THREE.Vector3(0.2, 0.2, 0.2));
createCandle(scene, new THREE.Vector3(2.35, 0.95, 0.6), new THREE.Vector3(0.12, 0.12, 0.12));

let gravePositions = [

  new THREE.Vector3(-1, 5.2, -40),
  new THREE.Vector3(-8, 6.7, -45),
  new THREE.Vector3(7, 9.2, -50),
  new THREE.Vector3(-6, 19.2, -60),
  new THREE.Vector3(1.25, 21, -65),
  new THREE.Vector3(-15, 6.2, -45),
  new THREE.Vector3(10, 8.2, -50),
  new THREE.Vector3(20, 7, -55),
];

for (let i = 0; i < gravePositions.length; i++) {
  createGrave(scene, gravePositions[i], new THREE.Vector3(0.6, 0.6, 0.6));
}


// const groundMat = new THREE.MeshStandardMaterial({
//   color: 0x33220b,
//   metalness: 0.05,
//   roughness: 0.7
// });
// const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
// const groundMesh = new THREE.Mesh(planeGeometry, groundMat);
// groundMesh.rotation.set(-Math.PI / 2.0, 0, 0);
// groundMesh.position.set(0, -1, 0);
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// const frontConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
// frontConceilMesh.position.set(0, -1, -200);
// scene.add(frontConceilMesh);

// const backConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
// backConceilMesh.rotation.set(0, Math.PI, 0);
// backConceilMesh.position.set(0, -1, 200);
// scene.add(backConceilMesh);

// const leftConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
// leftConceilMesh.rotation.set(0, Math.PI / 2, 0);
// leftConceilMesh.position.set(-200, -1, 0);
// scene.add(leftConceilMesh);

// const rightConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
// rightConceilMesh.rotation.set(0, -Math.PI / 2, 0);
// rightConceilMesh.position.set(200, -1, 0);
// scene.add(rightConceilMesh);

// const topConceilMesh = new THREE.Mesh(planeGeometry, groundMat);
// topConceilMesh.rotation.set(Math.PI / 2, 0, 0);
// topConceilMesh.position.set(0, 200, 0);
// scene.add(topConceilMesh);

// ---------------------------------------------------------
// Audio setup
// ---------------------------------------------------------

// create an AudioListener and add it to the camera
const audioListener = new THREE.AudioListener();
camera.add(audioListener);

// create a global audio source
const bugSound = new THREE.PositionalAudio(audioListener);
const ambientSound = new THREE.Audio(audioListener);

// sound loader
const audioLoader = new THREE.AudioLoader();

// load bug flapping sound
audioLoader.load("Bug Flapping.wav", function( buffer ) {
	bugSound.setBuffer(buffer);
	bugSound.setLoop(true);
	bugSound.setVolume(5);
  bugSound.setRefDistance(5);
  monster.scene.add(bugSound);
});

// load nightime ambience
audioLoader.load("Night Ambience.mp3", function( buffer ) {
	ambientSound.setBuffer(buffer);
	ambientSound.setLoop(true);
	ambientSound.setVolume(1);
  ambientSound.play();
});

// ---------------------------------------------------------
// Render loop & resize handling
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

    if (isAnimationPlaying)
      bugSound.stop();
    else
      bugSound.play();

    isAnimationPlaying = !isAnimationPlaying;
  }
  else if (event.key == 'B' || event.key == 'b') {
    const clips = monster.animations;
    clips.forEach( function ( clip ) {
      mixer.clipAction( clip ).stop();
    });

    bugSound.stop();
    ambientSound.stop();
    ambientSound.play();
    isAnimationPlaying = false;
    camera.position.set(0.5, 0.8, 9);
    controls.target.set(0, 1.5, -1);
    controls.update();

  }

});

const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
});