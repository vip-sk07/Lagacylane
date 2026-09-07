import * as THREE from 'three';
import { createFloodlightTower, createTieredStands, isLowEndDevice } from './common.js';

/**
 * Builds the complete, recognizable 3D Athletics Track & Field Ground.
 */
export function buildAthleticsGround(THREE, theme, options = {}) {
  const group = new THREE.Group();
  const isLowEnd = options.isLowEnd ?? isLowEndDevice();

  const straightLength = 46;
  const bendRadius = 22;
  const laneWidth = 1.35;
  const numLanes = 6;
  const totalTrackWidth = laneWidth * numLanes;

  // 1. INFIELD GRASS OVAL
  const infieldGeo = new THREE.PlaneGeometry(bendRadius * 2, straightLength);
  const infieldMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b, // Rich infield turf
    roughness: 0.8
  });
  const infield = new THREE.Mesh(infieldGeo, infieldMat);
  infield.rotation.x = -Math.PI / 2;
  group.add(infield);

  // Infield semicircles at both ends
  const infieldSemiGeo = new THREE.CircleGeometry(bendRadius, isLowEnd ? 24 : 40, 0, Math.PI);
  const infieldNorth = new THREE.Mesh(infieldSemiGeo, infieldMat);
  infieldNorth.rotation.x = -Math.PI / 2;
  infieldNorth.rotation.z = Math.PI / 2;
  infieldNorth.position.set(0, 0, -straightLength / 2);
  group.add(infieldNorth);

  const infieldSouth = new THREE.Mesh(infieldSemiGeo, infieldMat);
  infieldSouth.rotation.x = -Math.PI / 2;
  infieldSouth.rotation.z = -Math.PI / 2;
  infieldSouth.position.set(0, 0, straightLength / 2);
  group.add(infieldSouth);

  // 2. SYNTHETIC RUNNING TRACK (Deep Terracotta / Red Tartan surface)
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x881337, // Rich track red / maroon
    roughness: 0.65,
    metalness: 0.1
  });

  // Track Straights (West and East)
  const straightGeo = new THREE.PlaneGeometry(totalTrackWidth, straightLength);
  const straightWest = new THREE.Mesh(straightGeo, trackMat);
  straightWest.rotation.x = -Math.PI / 2;
  straightWest.position.set(-bendRadius - totalTrackWidth / 2, 0.01, 0);
  group.add(straightWest);

  const straightEast = new THREE.Mesh(straightGeo, trackMat);
  straightEast.rotation.x = -Math.PI / 2;
  straightEast.position.set(bendRadius + totalTrackWidth / 2, 0.01, 0);
  group.add(straightEast);

  // Track Curved Bends (North and South)
  const bendGeo = new THREE.RingGeometry(bendRadius, bendRadius + totalTrackWidth, isLowEnd ? 32 : 48, 1, 0, Math.PI);
  const bendNorth = new THREE.Mesh(bendGeo, trackMat);
  bendNorth.rotation.x = -Math.PI / 2;
  bendNorth.rotation.z = Math.PI / 2;
  bendNorth.position.set(0, 0.01, -straightLength / 2);
  group.add(bendNorth);

  const bendSouth = new THREE.Mesh(bendGeo, trackMat);
  bendSouth.rotation.x = -Math.PI / 2;
  bendSouth.rotation.z = -Math.PI / 2;
  bendSouth.position.set(0, 0.01, straightLength / 2);
  group.add(bendSouth);

  // 3. WHITE LANE DIVIDER LINES
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const lineWidth = 0.15;

  for (let l = 0; l <= numLanes; l++) {
    const r = bendRadius + l * laneWidth;

    // Straight line dividers
    const sLineGeo = new THREE.PlaneGeometry(lineWidth, straightLength);
    const sWest = new THREE.Mesh(sLineGeo, lineMat);
    sWest.rotation.x = -Math.PI / 2;
    sWest.position.set(-r, 0.03, 0);
    group.add(sWest);

    const sEast = new THREE.Mesh(sLineGeo, lineMat);
    sEast.rotation.x = -Math.PI / 2;
    sEast.position.set(r, 0.03, 0);
    group.add(sEast);

    // Bend curve dividers
    const bLineGeo = new THREE.RingGeometry(r - lineWidth / 2, r + lineWidth / 2, isLowEnd ? 32 : 48, 1, 0, Math.PI);
    const bNorth = new THREE.Mesh(bLineGeo, lineMat);
    bNorth.rotation.x = -Math.PI / 2;
    bNorth.rotation.z = Math.PI / 2;
    bNorth.position.set(0, 0.03, -straightLength / 2);
    group.add(bNorth);

    const bSouth = new THREE.Mesh(bLineGeo, lineMat);
    bSouth.rotation.x = -Math.PI / 2;
    bSouth.rotation.z = -Math.PI / 2;
    bSouth.position.set(0, 0.03, straightLength / 2);
    group.add(bSouth);
  }

  // 4. FINISH LINE & TIMING GANTRY (Across straight finish zone)
  const finishZ = straightLength / 4;
  const finishGeo = new THREE.PlaneGeometry(totalTrackWidth, 0.8);
  const finishMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const finishLine = new THREE.Mesh(finishGeo, finishMat);
  finishLine.rotation.x = -Math.PI / 2;
  finishLine.position.set(-bendRadius - totalTrackWidth / 2, 0.04, finishZ);
  group.add(finishLine);

  // Digital timing clock gantry over finish line
  const gantryMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
  const postGeo = new THREE.CylinderGeometry(0.2, 0.2, 5.5, 8);
  const p1 = new THREE.Mesh(postGeo, gantryMat);
  p1.position.set(-bendRadius - totalTrackWidth - 1.2, 2.75, finishZ);
  group.add(p1);

  const p2 = new THREE.Mesh(postGeo, gantryMat);
  p2.position.set(-bendRadius + 1.2, 2.75, finishZ);
  group.add(p2);

  const overheadBeam = new THREE.Mesh(new THREE.BoxGeometry(totalTrackWidth + 3, 0.4, 0.4), gantryMat);
  overheadBeam.position.set(-bendRadius - totalTrackWidth / 2, 5.2, finishZ);
  group.add(overheadBeam);

  const timerDisplay = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 1.2, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x020617, emissive: 0xf59e0b, emissiveIntensity: 0.8 })
  );
  timerDisplay.position.set(-bendRadius - totalTrackWidth / 2, 4.4, finishZ);
  group.add(timerDisplay);

  // 5. STARTING BLOCKS (On Lanes 1-4)
  const blockMat = new THREE.MeshStandardMaterial({ color: 0xbe185d, roughness: 0.4 });
  for (let l = 0; l < 4; l++) {
    const laneCenterX = -bendRadius - (l + 0.5) * laneWidth;
    const blockGeo = new THREE.BoxGeometry(0.7, 0.2, 0.9);
    const block = new THREE.Mesh(blockGeo, blockMat);
    block.position.set(laneCenterX, 0.1, -straightLength / 2 + 2);
    group.add(block);
  }

  // 6. HURDLES ALONG OPPOSITE STRAIGHTAWAY
  const hurdleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  const barMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  for (let h = 0; h < 5; h++) {
    const hz = -straightLength / 3 + h * 8;
    const hx = bendRadius + laneWidth * 1.5;

    const hurdle = new THREE.Group();
    hurdle.position.set(hx, 0, hz);

    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6), hurdleMat);
    leg.position.set(-0.6, 0.7, 0);
    hurdle.add(leg);

    const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6), hurdleMat);
    leg2.position.set(0.6, 0.7, 0);
    hurdle.add(leg2);

    const topBar = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.06), barMat);
    topBar.position.set(0, 1.4, 0);
    hurdle.add(topBar);

    group.add(hurdle);
  }

  // 7. TRACK STANDS & FLOODLIGHT TOWERS
  group.add(createTieredStands(bendRadius * 2 + totalTrackWidth * 2 + 8, straightLength + 16, isLowEnd ? 2 : 4, 0xec4899));

  const twX = bendRadius + totalTrackWidth + 6;
  const twZ = straightLength / 2 + 8;
  group.add(createFloodlightTower(-twX, -twZ, 28, 0, 0));
  group.add(createFloodlightTower(twX, -twZ, 28, 0, 0));
  group.add(createFloodlightTower(-twX, twZ, 28, 0, 0));
  group.add(createFloodlightTower(twX, twZ, 28, 0, 0));

  return group;
}

/**
 * Builds the Athletics prop: Championship Golden Relay Baton,
 * positioned at the finish line.
 */
export function buildAthleticsBall(THREE, theme) {
  const group = new THREE.Group();

  // Championship Golden Relay Baton
  const batonGeo = new THREE.CylinderGeometry(0.4, 0.4, 4.6, 16);
  const batonMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Polished gold
    metalness: 0.9,
    roughness: 0.15,
    emissive: 0xd97706,
    emissiveIntensity: 0.5
  });
  const baton = new THREE.Mesh(batonGeo, batonMat);
  baton.rotation.z = Math.PI / 4;
  group.add(baton);

  // Swirling Energetic Rose Aura Ring
  const auraGeo = new THREE.TorusGeometry(2.2, 0.08, 16, 32);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    transparent: true,
    opacity: 0.8
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  aura.rotation.x = Math.PI / 3;
  group.add(aura);

  // Position at Track Finish Zone
  group.userData.basePosition = new THREE.Vector3(-18, 1.6, 8);

  return group;
}

/**
 * Lighting configuration for outdoor Athletics track stadium.
 */
export function getAthleticsLighting(THREE, theme) {
  return {
    ambient: { color: 0xffffff, intensity: 0.45 },
    overhead: { color: 0xec4899, intensity: 2.2, position: [0, 32, 0] },
    corners: [
      { position: [-38, 28, -32], color: 0xffffff, intensity: 2.5 },
      { position: [38, 28, -32], color: 0xffffff, intensity: 2.5 },
      { position: [-38, 28, 32], color: 0xec4899, intensity: 2.8 },
      { position: [38, 28, 32], color: 0xffffff, intensity: 2.5 }
    ]
  };
}

/**
 * Accessory for Score! Hero character in Athletics mode.
 */
export function buildAthleticsAccessory(THREE) {
  const batonGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 12);
  const batonMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0xd97706,
    emissiveIntensity: 0.4
  });
  const accessory = new THREE.Mesh(batonGeo, batonMat);
  accessory.position.set(1.0, 1.6, 0.4);
  accessory.rotation.z = -0.6;
  return accessory;
}
