import * as THREE from 'three';
import { createTieredStands, isLowEndDevice } from './common.js';

/**
 * Builds the complete, recognizable 3D Basketball Arena Ground.
 */
export function buildBasketballGround(THREE, theme, options = {}) {
  const group = new THREE.Group();
  const isLowEnd = options.isLowEnd ?? isLowEndDevice();

  const courtWidth = 44;
  const courtLength = 76;
  const halfW = courtWidth / 2;
  const halfL = courtLength / 2;

  // 1. POLISHED HARDWOOD COURT FLOOR (Varnished maple plank tone with high gloss)
  const courtGeo = new THREE.PlaneGeometry(courtWidth, courtLength);
  const courtMat = new THREE.MeshStandardMaterial({
    color: 0x9a3412, // Warm maple / parquet amber
    roughness: 0.22, // Polished hardwood sheen
    metalness: 0.15
  });
  const court = new THREE.Mesh(courtGeo, courtMat);
  court.rotation.x = -Math.PI / 2;
  group.add(court);

  // Dark out-of-bounds apron perimeter border
  const apronGeo = new THREE.PlaneGeometry(courtWidth + 12, courtLength + 14);
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x1c1917, // Matte dark obsidian / team perimeter
    roughness: 0.6
  });
  const apron = new THREE.Mesh(apronGeo, apronMat);
  apron.rotation.x = -Math.PI / 2;
  apron.position.y = -0.01;
  group.add(apron);

  // 2. ACCURATE COURT MARKINGS
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const paintMat = new THREE.MeshStandardMaterial({
    color: 0xc2410c, // Contrasting burnt orange / painted key
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const createLine = (w, l, x, z) => {
    const geo = new THREE.PlaneGeometry(w, l);
    const mesh = new THREE.Mesh(geo, lineMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.03, z);
    group.add(mesh);
  };

  const lineWidth = 0.22;

  // Outer boundary lines (sidelines and baselines)
  createLine(courtWidth, lineWidth, 0, -halfL);
  createLine(courtWidth, lineWidth, 0, halfL);
  createLine(lineWidth, courtLength, -halfW, 0);
  createLine(lineWidth, courtLength, halfW, 0);

  // Half-court line
  createLine(courtWidth, lineWidth, 0, 0);

  // Center Court Circle & Inner Jump Ball Circle
  const centerCircleGeo = new THREE.RingGeometry(5.8, 5.8 + lineWidth, isLowEnd ? 32 : 48);
  const centerCircle = new THREE.Mesh(centerCircleGeo, lineMat);
  centerCircle.rotation.x = -Math.PI / 2;
  centerCircle.position.y = 0.04;
  group.add(centerCircle);

  const innerJumpGeo = new THREE.RingGeometry(2.0, 2.0 + lineWidth, 32);
  const innerJump = new THREE.Mesh(innerJumpGeo, lineMat);
  innerJump.rotation.x = -Math.PI / 2;
  innerJump.position.y = 0.04;
  group.add(innerJump);

  // Key / Paint area, Free-throw Circle, & 3-Point Arcs (At Both Ends)
  const keyWidth = 14;
  const keyDepth = 18;
  const threePointRadius = 19;
  const straightCornerDist = 12; // straight 3-point corner line distance from center

  [-1, 1].forEach((dir) => {
    const baselineZ = dir * halfL;
    const ftLineZ = dir * (halfL - keyDepth);

    // Colored Key / Paint area rectangle
    const keyGeo = new THREE.PlaneGeometry(keyWidth, keyDepth);
    const keyMesh = new THREE.Mesh(keyGeo, paintMat);
    keyMesh.rotation.x = -Math.PI / 2;
    keyMesh.position.set(0, 0.02, dir * (halfL - keyDepth / 2));
    group.add(keyMesh);

    // Key Boundary Lines
    createLine(keyWidth, lineWidth, 0, ftLineZ); // Free throw line
    createLine(lineWidth, keyDepth, -keyWidth / 2, dir * (halfL - keyDepth / 2));
    createLine(lineWidth, keyDepth, keyWidth / 2, dir * (halfL - keyDepth / 2));

    // Free-Throw Circle (Top half solid, bottom half inside key dashed)
    const ftCircleGeo = new THREE.RingGeometry(5.8, 5.8 + lineWidth, 32);
    const ftCircle = new THREE.Mesh(ftCircleGeo, lineMat);
    ftCircle.rotation.x = -Math.PI / 2;
    ftCircle.position.set(0, 0.04, ftLineZ);
    group.add(ftCircle);

    // Three-Point Arc: Semicircle arc centered near the basket + straight corner sidelines
    const hoopZ = dir * (halfL - 4.5);
    const threeArcGeo = new THREE.RingGeometry(
      threePointRadius,
      threePointRadius + lineWidth,
      isLowEnd ? 24 : 40,
      1,
      dir === 1 ? Math.PI : 0,
      Math.PI
    );
    const threeArc = new THREE.Mesh(threeArcGeo, lineMat);
    threeArc.rotation.x = -Math.PI / 2;
    threeArc.position.set(0, 0.04, hoopZ);
    group.add(threeArc);

    // 3-Point corner straight lines leading to the baseline
    const cornerLineLength = Math.abs(baselineZ - hoopZ);
    createLine(lineWidth, cornerLineLength, -straightCornerDist, dir * (halfL - cornerLineLength / 2));
    createLine(lineWidth, cornerLineLength, straightCornerDist, dir * (halfL - cornerLineLength / 2));

    // Restricted Area Arc (Semi-circle under the basket)
    const restrictedGeo = new THREE.RingGeometry(3.5, 3.5 + lineWidth, 24, 1, dir === 1 ? Math.PI : 0, Math.PI);
    const restricted = new THREE.Mesh(restrictedGeo, lineMat);
    restricted.rotation.x = -Math.PI / 2;
    restricted.position.set(0, 0.04, hoopZ);
    group.add(restricted);
  });

  // 3. REGULATION BASKETBALL HOOPS & STANCHIONS (Both Ends)
  const createHoop = (zPos, dir) => {
    const hoopGroup = new THREE.Group();
    hoopGroup.position.set(0, 0, zPos);

    const rimHeight = 6.2;
    const hoopZOffset = dir * 4.5;

    // Stanchion base anchored behind baseline
    const baseGeo = new THREE.BoxGeometry(3.0, 1.2, 3.5);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0, 0.6, -dir * 2.5);
    hoopGroup.add(base);

    // Angled support arm extending forward over baseline
    const armGeo = new THREE.CylinderGeometry(0.2, 0.25, 7.8, 8);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.7, roughness: 0.3 });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.rotation.x = -dir * 0.45;
    arm.position.set(0, rimHeight / 2 + 0.5, hoopZOffset / 2 - dir * 1.5);
    hoopGroup.add(arm);

    // Glass Backboard (Regulation proportions: 1.8m x 1.05m -> 6.0 x 3.6 units)
    const boardGeo = new THREE.BoxGeometry(6.0, 3.6, 0.15);
    const boardMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.7
    });
    const backboard = new THREE.Mesh(boardGeo, boardMat);
    backboard.position.set(0, rimHeight + 1.2, hoopZOffset - dir * 0.3);
    hoopGroup.add(backboard);

    // Backboard White Inner Shooter's Target Box
    const targetGeo = new THREE.PlaneGeometry(2.0, 1.5);
    const targetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      side: THREE.DoubleSide
    });
    const target = new THREE.Mesh(targetGeo, targetMat);
    target.position.set(0, rimHeight + 0.8, hoopZOffset - dir * 0.22);
    hoopGroup.add(target);

    // Breakaway Bright Orange Rim (Torus geometry)
    const rimGeo = new THREE.TorusGeometry(1.1, 0.08, 12, 24);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Vibrant basketball orange
      roughness: 0.3,
      metalness: 0.6
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, rimHeight, hoopZOffset + dir * 0.9);
    hoopGroup.add(rim);

    // White Net (Conical mesh below rim)
    const netGeo = new THREE.CylinderGeometry(1.05, 0.55, 1.6, 12, 4, true);
    const netMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const net = new THREE.Mesh(netGeo, netMat);
    net.position.set(0, rimHeight - 0.8, hoopZOffset + dir * 0.9);
    hoopGroup.add(net);

    // Digital Shot Clock on top of backboard
    const shotClockGeo = new THREE.BoxGeometry(1.6, 0.9, 0.3);
    const shotClockMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      emissive: 0xef4444,
      emissiveIntensity: 0.7
    });
    const shotClock = new THREE.Mesh(shotClockGeo, shotClockMat);
    shotClock.position.set(0, rimHeight + 3.3, hoopZOffset - dir * 0.3);
    hoopGroup.add(shotClock);

    return hoopGroup;
  };

  group.add(createHoop(-halfL, 1));
  group.add(createHoop(halfL, -1));

  // 4. INDOOR ARENA STANDS & TEAM BENCHES
  group.add(createTieredStands(courtWidth + 8, courtLength + 10, isLowEnd ? 3 : 5, 0xea580c));

  // Team benches along sideline
  const benchMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  [-12, 12].forEach((bz) => {
    const benchGeo = new THREE.BoxGeometry(0.8, 0.5, 10);
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.position.set(halfW + 3, 0.25, bz);
    group.add(bench);
  });

  return group;
}

/**
 * Builds the Basketball Ball prop: orange leather surface with black recessed seam channels,
 * positioned at center court.
 */
export function buildBasketballBall(THREE, theme) {
  const group = new THREE.Group();

  const ballRadius = 1.7;
  const ballGeo = new THREE.SphereGeometry(ballRadius, 32, 32);

  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xf97316, // Rich basketball orange
    roughness: 0.45,
    metalness: 0.05,
    emissive: 0xc2410c,
    emissiveIntensity: 0.25
  });
  const ballMesh = new THREE.Mesh(ballGeo, ballMat);
  group.add(ballMesh);

  // Black Rib Seams (Cross ribs and curving side channels)
  const ribMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });

  // Equator Rib
  const rib1Geo = new THREE.TorusGeometry(ballRadius + 0.015, 0.035, 8, 36);
  const rib1 = new THREE.Mesh(rib1Geo, ribMat);
  group.add(rib1);

  // Polar Rib (perpendicular)
  const rib2Geo = new THREE.TorusGeometry(ballRadius + 0.015, 0.035, 8, 36);
  const rib2 = new THREE.Mesh(rib2Geo, ribMat);
  rib2.rotation.x = Math.PI / 2;
  group.add(rib2);

  // Curved Side Rib Arcs
  const sideRibGeo = new THREE.TorusGeometry(ballRadius * 0.75, 0.03, 8, 28, Math.PI);
  const sideRibL = new THREE.Mesh(sideRibGeo, ribMat);
  sideRibL.position.set(-ballRadius * 0.65, 0, 0);
  sideRibL.rotation.y = Math.PI / 2;
  group.add(sideRibL);

  const sideRibR = new THREE.Mesh(sideRibGeo, ribMat);
  sideRibR.position.set(ballRadius * 0.65, 0, 0);
  sideRibR.rotation.y = -Math.PI / 2;
  group.add(sideRibR);

  // Glowing energetic warm aura
  const auraGeo = new THREE.TorusGeometry(ballRadius + 0.35, 0.04, 8, 32);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0xf97316,
    transparent: true,
    opacity: 0.65
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  aura.rotation.x = Math.PI / 3;
  group.add(aura);

  // Starting position at Center Court Jump Circle!
  group.userData.basePosition = new THREE.Vector3(0, 1.2, 0);

  return group;
}

/**
 * Lighting configuration for indoor Basketball arena (warm overhead glow).
 */
export function getBasketballLighting(THREE, theme) {
  return {
    ambient: { color: 0xffedd5, intensity: 0.6 }, // Warmer indoor arena ambient
    overhead: { color: 0xfffaed, intensity: 3.2, position: [0, 26, 0] }, // Warm overhead arena fixture
    corners: [
      { position: [-25, 22, -35], color: 0xfed7aa, intensity: 1.8 },
      { position: [25, 22, -35], color: 0xfed7aa, intensity: 1.8 },
      { position: [-25, 22, 35], color: 0xf97316, intensity: 2.2 },
      { position: [25, 22, 35], color: 0xfed7aa, intensity: 1.8 }
    ]
  };
}

/**
 * Accessory for Score! Hero character in Basketball mode.
 */
export function buildBasketballAccessory(THREE) {
  const ballGeo = new THREE.SphereGeometry(0.65, 16, 16);
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    roughness: 0.4,
    emissive: 0xc2410c,
    emissiveIntensity: 0.25
  });
  const accessory = new THREE.Mesh(ballGeo, ballMat);
  accessory.position.set(0.9, 0.35, 0.6);
  return accessory;
}
