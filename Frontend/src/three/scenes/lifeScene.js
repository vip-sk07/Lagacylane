import * as THREE from 'three';
import { isLowEndDevice } from './common.js';

/**
 * Builds the distinctive, intentional Life Journey Scene (Ethereal Path & Celestial Timeline).
 * Lightweight, serene, and evocative of memory, introspection, and time.
 */
export function buildLifeGround(THREE, theme, options = {}) {
  const group = new THREE.Group();
  const isLowEnd = options.isLowEnd ?? isLowEndDevice();

  // 1. COSMIC VOID NEBULA BASE
  const voidGeo = new THREE.PlaneGeometry(120, 120);
  const voidMat = new THREE.MeshStandardMaterial({
    color: 0x030712, // Deep obsidian space
    roughness: 0.9,
    metalness: 0.1
  });
  const voidMesh = new THREE.Mesh(voidGeo, voidMat);
  voidMesh.rotation.x = -Math.PI / 2;
  group.add(voidMesh);

  // 2. WINDING ETHEREAL PATH OF LIFE ("Legacy Lane" ribbon leading to horizon)
  const pathPoints = [];
  const pathSteps = isLowEnd ? 24 : 40;
  for (let i = -pathSteps; i <= pathSteps; i++) {
    const t = i / pathSteps;
    const z = t * 50;
    const x = Math.sin(t * Math.PI * 1.8) * 12;
    pathPoints.push(new THREE.Vector3(x, 0.08, z));
  }
  const pathCurve = new THREE.CatmullRomCurve3(pathPoints);
  const pathGeo = new THREE.TubeGeometry(pathCurve, pathSteps, 2.2, 8, false);
  const pathMat = new THREE.MeshStandardMaterial({
    color: 0x0891b2, // Cyan lane
    emissive: 0x06b6d4,
    emissiveIntensity: 0.5,
    roughness: 0.3,
    transparent: true,
    opacity: 0.85
  });
  const pathMesh = new THREE.Mesh(pathGeo, pathMat);
  group.add(pathMesh);

  // 3. GLOWING CONCENTRIC CELESTIAL ORBITAL TIMELINE RINGS
  const orbitSpecs = [
    { radius: 12, color: 0x06b6d4, opacity: 0.75 },
    { radius: 24, color: 0x38bdf8, opacity: 0.6 },
    { radius: 36, color: 0x6366f1, opacity: 0.45 },
    { radius: 48, color: 0xa855f7, opacity: 0.35 }
  ];

  orbitSpecs.forEach(({ radius, color, opacity }) => {
    const ringGeo = new THREE.RingGeometry(radius - 0.2, radius + 0.2, isLowEnd ? 36 : 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.04;
    group.add(ring);
  });

  // 4. TEMPORAL MILESTONE BEACONS & LIGHT PILLARS ALONG THE PATH
  const beaconGeo = new THREE.OctahedronGeometry(0.7, 0);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.85,
    roughness: 0.2
  });

  const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.0, 8);
  const pillarMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65
  });

  const milestoneAngles = [
    0,
    Math.PI / 3,
    (2 * Math.PI) / 3,
    Math.PI,
    (4 * Math.PI) / 3,
    (5 * Math.PI) / 3
  ];

  milestoneAngles.forEach((angle, idx) => {
    const radius = idx % 2 === 0 ? 24 : 36;
    const bx = Math.cos(angle) * radius;
    const bz = Math.sin(angle) * radius;

    // Glowing Octahedron Beacon
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(bx, 2.0, bz);
    group.add(beacon);

    // Ethereal vertical light pillar connecting ground to beacon
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(bx, 2.0, bz);
    group.add(pillar);
  });

  // 5. DISTANT HORIZON RADIANCE ARCH
  const archGeo = new THREE.TorusGeometry(32, 0.3, 8, isLowEnd ? 24 : 40, Math.PI);
  const archMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.5
  });
  const arch = new THREE.Mesh(archGeo, archMat);
  arch.position.set(0, 0, -52);
  group.add(arch);

  return group;
}

/**
 * Builds the Life Journey prop: Floating Chronos / Memory Core Crystal Cluster,
 * positioned at the center of the timeline nexus.
 */
export function buildLifeBall(THREE, theme) {
  const group = new THREE.Group();

  // Floating Inner Chronos Core
  const coreGeo = new THREE.SphereGeometry(1.3, 20, 20);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.95,
    roughness: 0.1
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);

  // Outer Geometric Gyro Crystal
  const crystalGeo = new THREE.OctahedronGeometry(2.8, 0);
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    wireframe: true,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.6,
    roughness: 0.2
  });
  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  group.add(crystalMesh);

  // Celestial Orbiting Gyro Ring
  const gyroGeo = new THREE.TorusGeometry(3.6, 0.08, 16, 48);
  const gyroMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.8
  });
  const gyro = new THREE.Mesh(gyroGeo, gyroMat);
  gyro.rotation.x = Math.PI / 4;
  gyro.rotation.y = Math.PI / 6;
  group.add(gyro);

  // Position at central nexus
  group.userData.basePosition = new THREE.Vector3(0, 3.2, 0);

  return group;
}

/**
 * Lighting configuration for contemplative Life Journey.
 */
export function getLifeLighting(THREE, theme) {
  return {
    ambient: { color: 0x0e7490, intensity: 0.6 },
    overhead: { color: 0x38bdf8, intensity: 2.8, position: [0, 28, 0] },
    corners: [
      { position: [-25, 20, -25], color: 0x6366f1, intensity: 1.8 },
      { position: [25, 20, -25], color: 0x06b6d4, intensity: 2.2 },
      { position: [-25, 20, 25], color: 0x38bdf8, intensity: 2.0 },
      { position: [25, 20, 25], color: 0xa855f7, intensity: 1.8 }
    ]
  };
}

/**
 * Accessory for Score! Hero character in Life Journey mode.
 */
export function buildLifeAccessory(THREE) {
  const group = new THREE.Group();

  // Holographic Chronicle / Life Journal Book
  const bookGeo = new THREE.BoxGeometry(0.8, 1.1, 0.18);
  const bookMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.5,
    roughness: 0.3
  });
  const book = new THREE.Mesh(bookGeo, bookMat);
  group.add(book);

  // Glowing spine accent
  const spineGeo = new THREE.BoxGeometry(0.1, 1.12, 0.2);
  const spineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const spine = new THREE.Mesh(spineGeo, spineMat);
  spine.position.x = -0.4;
  group.add(spine);

  group.position.set(1.0, 1.7, 0.4);
  group.rotation.y = -0.4;
  group.rotation.z = 0.2;
  return group;
}
