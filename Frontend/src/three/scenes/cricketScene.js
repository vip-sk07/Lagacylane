import * as THREE from 'three';
import { createFloodlightTower, isLowEndDevice } from './common.js';

/**
 * Builds the complete, recognizable 3D Cricket Ground / Oval Stadium.
 */
export function buildCricketGround(THREE, theme, options = {}) {
  const group = new THREE.Group();
  const isLowEnd = options.isLowEnd ?? isLowEndDevice();

  const ovalRadiusX = 38;
  const ovalRadiusZ = 46;

  // 1. CIRCULAR / OVAL OUTFIELD WITH MOWING LAWN RINGS
  const outfieldSegments = isLowEnd ? 40 : 64;
  const outfieldGeo = new THREE.CircleGeometry(ovalRadiusZ, outfieldSegments);
  // Scale x to make realistic cricket oval
  outfieldGeo.scale(ovalRadiusX / ovalRadiusZ, 1, 1);

  const outfieldMat = new THREE.MeshStandardMaterial({
    color: 0x0a331c,
    roughness: 0.75,
    metalness: 0.05
  });
  const outfieldMesh = new THREE.Mesh(outfieldGeo, outfieldMat);
  outfieldMesh.rotation.x = -Math.PI / 2;
  group.add(outfieldMesh);

  // Concentric mowing stripe rings
  const ringCount = 5;
  for (let r = 1; r <= ringCount; r++) {
    const ringRadius = (ovalRadiusZ / (ringCount + 1)) * r;
    const ringGeo = new THREE.RingGeometry(ringRadius - 0.5, ringRadius + 0.5, outfieldSegments);
    ringGeo.scale(ovalRadiusX / ovalRadiusZ, 1, 1);
    const ringMat = new THREE.MeshStandardMaterial({
      color: r % 2 === 0 ? 0x0d3f23 : 0x082c18,
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.01;
    group.add(ringMesh);
  }

  // 2. INNER 30-YARD FIELDING RESTRICTION CIRCLE
  const circle30Geo = new THREE.RingGeometry(22, 22.3, outfieldSegments);
  circle30Geo.scale(ovalRadiusX / ovalRadiusZ, 1, 1);
  const circle30Mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55
  });
  const circle30Mesh = new THREE.Mesh(circle30Geo, circle30Mat);
  circle30Mesh.rotation.x = -Math.PI / 2;
  circle30Mesh.position.y = 0.03;
  group.add(circle30Mesh);

  // 3. CONTINUOUS WHITE BOUNDARY ROPE (Thick tube tracing the outfield perimeter)
  // Create an ellipse curve for the boundary
  const curvePoints = [];
  const numCurvePts = isLowEnd ? 48 : 72;
  for (let i = 0; i <= numCurvePts; i++) {
    const angle = (i / numCurvePts) * Math.PI * 2;
    const px = Math.cos(angle) * (ovalRadiusX - 1.2);
    const pz = Math.sin(angle) * (ovalRadiusZ - 1.2);
    curvePoints.push(new THREE.Vector3(px, 0.25, pz));
  }
  const boundaryCurve = new THREE.CatmullRomCurve3(curvePoints, true);
  const ropeGeo = new THREE.TubeGeometry(boundaryCurve, numCurvePts, 0.25, 8, true);
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc, // White boundary rope
    roughness: 0.4
  });
  const boundaryRope = new THREE.Mesh(ropeGeo, ropeMat);
  group.add(boundaryRope);

  // 4. TRIANGULAR ADVERTISING WEDGES / FOAM TOBOGGANS ALONG BOUNDARY
  const wedgeCount = isLowEnd ? 12 : 20;
  const wedgeMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.3,
    roughness: 0.4
  });

  for (let w = 0; w < wedgeCount; w++) {
    const angle = (w / wedgeCount) * Math.PI * 2;
    const wx = Math.cos(angle) * (ovalRadiusX - 1.2);
    const wz = Math.sin(angle) * (ovalRadiusZ - 1.2);

    const wedgeGeo = new THREE.CylinderGeometry(0.35, 0.45, 2.2, 3);
    const wedge = new THREE.Mesh(wedgeGeo, wedgeMat);
    wedge.position.set(wx, 0.35, wz);
    wedge.rotation.y = -angle;
    wedge.rotation.z = Math.PI / 2;
    group.add(wedge);
  }

  // 5. CLAY PITCH STRIP IN CENTER
  const pitchWidth = 8.0;
  const pitchLength = 26.0;
  const pitchStripGeo = new THREE.PlaneGeometry(pitchWidth, pitchLength);
  const pitchStripMat = new THREE.MeshStandardMaterial({
    color: 0xca8a04, // Rich clay / turf khaki
    roughness: 0.9,
    metalness: 0.05
  });
  const pitchStrip = new THREE.Mesh(pitchStripGeo, pitchStripMat);
  pitchStrip.rotation.x = -Math.PI / 2;
  pitchStrip.position.y = 0.03;
  group.add(pitchStrip);

  // 6. ACCURATE WHITE CREASE MARKINGS (Popping crease, bowling crease, return crease)
  const creaseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

  const createCrease = (w, l, x, z) => {
    const geo = new THREE.PlaneGeometry(w, l);
    const mesh = new THREE.Mesh(geo, creaseMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.04, z);
    group.add(mesh);
  };

  [-1, 1].forEach((dir) => {
    const stumpsZ = dir * 11.5;
    const poppingZ = dir * 9.5; // 4 feet in front of bowling crease

    // Bowling Crease (through stumps)
    createCrease(pitchWidth * 0.75, 0.18, 0, stumpsZ);

    // Popping Crease (batsman's safe line, wider)
    createCrease(pitchWidth * 0.9, 0.22, 0, poppingZ);

    // Return Creases (at edges connecting popping to bowling)
    createCrease(0.18, Math.abs(stumpsZ - poppingZ) + 0.8, -pitchWidth * 0.38, (stumpsZ + poppingZ) / 2);
    createCrease(0.18, Math.abs(stumpsZ - poppingZ) + 0.8, pitchWidth * 0.38, (stumpsZ + poppingZ) / 2);
  });

  // 7. 3D WICKETS (3 STUMPS + 2 BAILS) AT BOTH ENDS
  const stumpMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a, // Ash wood
    roughness: 0.35,
    metalness: 0.1
  });

  const createWickets = (zPos) => {
    const wicketGroup = new THREE.Group();
    wicketGroup.position.set(0, 0, zPos);

    const stumpHeight = 2.4;
    const stumpRadius = 0.08;
    const stumpSpacing = 0.28;

    // 3 Stumps: Off, Middle, Leg
    for (let i = -1; i <= 1; i++) {
      const stumpGeo = new THREE.CylinderGeometry(stumpRadius, stumpRadius, stumpHeight, 10);
      const stump = new THREE.Mesh(stumpGeo, stumpMat);
      stump.position.set(i * stumpSpacing, stumpHeight / 2, 0);
      wicketGroup.add(stump);
    }

    // 2 Horizontal Bails resting across top
    const bailLength = stumpSpacing * 1.05;
    const bailGeo = new THREE.CylinderGeometry(0.04, 0.04, bailLength, 8);
    bailGeo.rotateZ(Math.PI / 2);

    const leftBail = new THREE.Mesh(bailGeo, stumpMat);
    leftBail.position.set(-stumpSpacing / 2, stumpHeight + 0.06, 0);
    wicketGroup.add(leftBail);

    const rightBail = new THREE.Mesh(bailGeo, stumpMat);
    rightBail.position.set(stumpSpacing / 2, stumpHeight + 0.06, 0);
    wicketGroup.add(rightBail);

    return wicketGroup;
  };

  group.add(createWickets(-11.5));
  group.add(createWickets(11.5));

  // 8. SIGHT SCREENS AT BOTH ENDS OUTSIDE BOUNDARY
  const createSightScreen = (zPos, rotY) => {
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0, zPos);
    screenGroup.rotation.y = rotY;

    // White slatted screen panel
    const screenGeo = new THREE.BoxGeometry(12, 5.5, 0.3);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.y = 3.5;
    screenGroup.add(screenMesh);

    // Support frame / wheels
    const legGeo = new THREE.CylinderGeometry(0.15, 0.15, 3.5, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    [-5, 5].forEach((lx) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, 1.75, 0);
      screenGroup.add(leg);
    });

    return screenGroup;
  };

  group.add(createSightScreen(-ovalRadiusZ - 4, 0));
  group.add(createSightScreen(ovalRadiusZ + 4, Math.PI));

  // 9. STADIUM FLOODLIGHT TOWERS (Outside Oval Boundary)
  const towerDistance = ovalRadiusX + 5;
  group.add(createFloodlightTower(-towerDistance, -30, 28, 0, 0));
  group.add(createFloodlightTower(towerDistance, -30, 28, 0, 0));
  group.add(createFloodlightTower(-towerDistance, 30, 28, 0, 0));
  group.add(createFloodlightTower(towerDistance, 30, 28, 0, 0));

  return group;
}

/**
 * Builds the Cricket Ball prop: small red leather sphere with raised white stitched seam,
 * positioned at the bowler's end.
 */
export function buildCricketBall(THREE, theme) {
  const group = new THREE.Group();

  // Cricket ball is noticeably smaller than soccer ball (scale ~0.9 vs 1.8)
  const ballRadius = 0.95;
  const ballGeo = new THREE.SphereGeometry(ballRadius, 24, 24);
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b, // Cherry Red leather
    roughness: 0.35,
    metalness: 0.25,
    emissive: 0x7f1d1d,
    emissiveIntensity: 0.4
  });
  const ballMesh = new THREE.Mesh(ballGeo, ballMat);
  group.add(ballMesh);

  // Pronounced stitched white seam around the equator
  const seamGeo = new THREE.TorusGeometry(ballRadius + 0.02, 0.045, 8, 36);
  const seamMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const seamMesh = new THREE.Mesh(seamGeo, seamMat);
  group.add(seamMesh);

  // Subtle golden energetic aura
  const auraGeo = new THREE.TorusGeometry(ballRadius + 0.35, 0.03, 8, 32);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    transparent: true,
    opacity: 0.7
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  aura.rotation.x = Math.PI / 4;
  group.add(aura);

  // Starting position at Bowler's End!
  group.userData.basePosition = new THREE.Vector3(0, 1.0, 11.5);

  return group;
}

/**
 * Lighting configuration for outdoor Cricket ground.
 */
export function getCricketLighting(THREE, theme) {
  return {
    ambient: { color: 0xffffff, intensity: 0.5 },
    overhead: { color: 0x22c55e, intensity: 2.0, position: [0, 32, 0] },
    corners: [
      { position: [-42, 28, -30], color: 0xffffff, intensity: 2.6 },
      { position: [42, 28, -30], color: 0xffffff, intensity: 2.6 },
      { position: [-42, 28, 30], color: 0x22c55e, intensity: 2.8 },
      { position: [42, 28, 30], color: 0xffffff, intensity: 2.6 }
    ]
  };
}

/**
 * Accessory for Score! Hero character in Cricket mode.
 */
export function buildCricketAccessory(THREE) {
  const group = new THREE.Group();

  // Cricket Bat Blade
  const batGeo = new THREE.BoxGeometry(0.3, 1.8, 0.1);
  const batMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.5 });
  const batBlade = new THREE.Mesh(batGeo, batMat);
  group.add(batBlade);

  // Bat Handle
  const handleGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 12);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.y = 1.15;
  group.add(handle);

  group.position.set(1.1, 1.8, 0.3);
  group.rotation.z = -0.4;
  return group;
}
