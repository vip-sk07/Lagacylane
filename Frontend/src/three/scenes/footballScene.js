import * as THREE from 'three';
import { createFloodlightTower, createTieredStands, createPerimeterAdBoards } from './common.js';

/**
 * Builds the complete, recognizable 3D Football Stadium Ground.
 */
export function buildFootballGround(THREE, theme, options = {}) {
  const group = new THREE.Group();
  const isLowEnd = options.isLowEnd ?? false;

  const pitchWidth = 60;
  const pitchLength = 90;
  const halfW = pitchWidth / 2;
  const halfL = pitchLength / 2;

  // 1. MOWED LAWN PITCH BASE (Alternating light/dark green bands)
  const numStripes = 12;
  const stripeLength = pitchLength / numStripes;

  const darkGrassMat = new THREE.MeshStandardMaterial({
    color: 0x0f4524,
    roughness: 0.85,
    metalness: 0.05
  });
  const lightGrassMat = new THREE.MeshStandardMaterial({
    color: 0x155e32,
    roughness: 0.85,
    metalness: 0.05
  });

  const pitchGroup = new THREE.Group();
  for (let i = 0; i < numStripes; i++) {
    const stripeGeo = new THREE.PlaneGeometry(pitchWidth, stripeLength);
    const stripeMesh = new THREE.Mesh(stripeGeo, i % 2 === 0 ? darkGrassMat : lightGrassMat);
    stripeMesh.rotation.x = -Math.PI / 2;
    stripeMesh.position.set(0, 0, -halfL + (i + 0.5) * stripeLength);
    pitchGroup.add(stripeMesh);
  }
  group.add(pitchGroup);

  // Outer green apron/run-off border
  const apronGeo = new THREE.PlaneGeometry(pitchWidth + 14, pitchLength + 16);
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x0a2f18,
    roughness: 0.9
  });
  const apron = new THREE.Mesh(apronGeo, apronMat);
  apron.rotation.x = -Math.PI / 2;
  apron.position.y = -0.01;
  group.add(apron);

  // 2. REGULATION WHITE PITCH MARKINGS
  const lineMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });

  const createLine = (w, l, x, z) => {
    const geo = new THREE.PlaneGeometry(w, l);
    const mesh = new THREE.Mesh(geo, lineMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.03, z);
    group.add(mesh);
  };

  const lineWidth = 0.28;

  // Outer touchlines & baselines
  createLine(pitchWidth, lineWidth, 0, -halfL);
  createLine(pitchWidth, lineWidth, 0, halfL);
  createLine(lineWidth, pitchLength, -halfW, 0);
  createLine(lineWidth, pitchLength, halfW, 0);

  // Halfway line
  createLine(pitchWidth, lineWidth, 0, 0);

  // Center Circle
  const centerCircleGeo = new THREE.RingGeometry(8.5, 8.5 + lineWidth, isLowEnd ? 32 : 48);
  const centerCircle = new THREE.Mesh(centerCircleGeo, lineMat);
  centerCircle.rotation.x = -Math.PI / 2;
  centerCircle.position.y = 0.04;
  group.add(centerCircle);

  // Center Kickoff Spot
  const centerSpotGeo = new THREE.CircleGeometry(0.5, 16);
  const centerSpot = new THREE.Mesh(centerSpotGeo, lineMat);
  centerSpot.rotation.x = -Math.PI / 2;
  centerSpot.position.y = 0.05;
  group.add(centerSpot);

  // Penalty Boxes (18-Yard Box) at both ends
  const boxWidth = 36;
  const boxDepth = 15;
  const goalAreaWidth = 16;
  const goalAreaDepth = 5.5;

  [-1, 1].forEach((dir) => {
    const zBase = dir * halfL;
    const zBoxFront = dir * (halfL - boxDepth);

    // 18-yd boundary lines
    createLine(boxWidth, lineWidth, 0, zBoxFront);
    createLine(lineWidth, boxDepth, -boxWidth / 2, dir * (halfL - boxDepth / 2));
    createLine(lineWidth, boxDepth, boxWidth / 2, dir * (halfL - boxDepth / 2));

    // 6-yd goal area lines
    const zGoalAreaFront = dir * (halfL - goalAreaDepth);
    createLine(goalAreaWidth, lineWidth, 0, zGoalAreaFront);
    createLine(lineWidth, goalAreaDepth, -goalAreaWidth / 2, dir * (halfL - goalAreaDepth / 2));
    createLine(lineWidth, goalAreaDepth, goalAreaWidth / 2, dir * (halfL - goalAreaDepth / 2));

    // Penalty Spot (11m / ~10 units from goal line)
    const penSpotGeo = new THREE.CircleGeometry(0.4, 16);
    const penSpot = new THREE.Mesh(penSpotGeo, lineMat);
    penSpot.rotation.x = -Math.PI / 2;
    penSpot.position.set(0, 0.05, dir * (halfL - 10));
    group.add(penSpot);

    // Penalty Arc (D-box outside penalty area)
    const arcGeo = new THREE.RingGeometry(8.5, 8.5 + lineWidth, isLowEnd ? 20 : 32, 1, dir === 1 ? Math.PI : 0, Math.PI);
    const arcMesh = new THREE.Mesh(arcGeo, lineMat);
    arcMesh.rotation.x = -Math.PI / 2;
    arcMesh.position.set(0, 0.04, dir * (halfL - 10));
    group.add(arcMesh);
  });

  // Corner Arcs (Quarter circles at 4 corners)
  const cornerCoords = [
    { x: -halfW, z: -halfL, thetaStart: 0 },
    { x: halfW, z: -halfL, thetaStart: Math.PI / 2 },
    { x: halfW, z: halfL, thetaStart: Math.PI },
    { x: -halfW, z: halfL, thetaStart: (3 * Math.PI) / 2 }
  ];
  cornerCoords.forEach(({ x, z, thetaStart }) => {
    const cornerGeo = new THREE.RingGeometry(1.6, 1.6 + lineWidth, 16, 1, thetaStart, Math.PI / 2);
    const cornerMesh = new THREE.Mesh(cornerGeo, lineMat);
    cornerMesh.rotation.x = -Math.PI / 2;
    cornerMesh.position.set(x, 0.04, z);
    group.add(cornerMesh);
  });

  // 3. GOALPOSTS & NETS (Both Ends)
  const postMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.4
  });
  const netMat = new THREE.MeshBasicMaterial({
    color: 0xe2e8f0,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });

  const createGoal = (zPos, direction) => {
    const goalGroup = new THREE.Group();
    goalGroup.position.set(0, 0, zPos);

    const goalWidth = 8.0;
    const goalHeight = 2.8;
    const goalDepth = 2.6;
    const postRadius = 0.12;

    // Left & Right upright posts
    const postGeo = new THREE.CylinderGeometry(postRadius, postRadius, goalHeight, 12);
    const leftPost = new THREE.Mesh(postGeo, postMat);
    leftPost.position.set(-goalWidth / 2, goalHeight / 2, 0);
    goalGroup.add(leftPost);

    const rightPost = new THREE.Mesh(postGeo, postMat);
    rightPost.position.set(goalWidth / 2, goalHeight / 2, 0);
    goalGroup.add(rightPost);

    // Horizontal Crossbar
    const crossbarGeo = new THREE.CylinderGeometry(postRadius, postRadius, goalWidth + postRadius * 2, 12);
    const crossbar = new THREE.Mesh(crossbarGeo, postMat);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(0, goalHeight, 0);
    goalGroup.add(crossbar);

    // Rear net support stanchions
    const stanchionGeo = new THREE.CylinderGeometry(postRadius * 0.7, postRadius * 0.7, Math.sqrt(goalHeight * goalHeight + goalDepth * goalDepth), 8);
    const leftStanchion = new THREE.Mesh(stanchionGeo, postMat);
    leftStanchion.rotation.x = direction * 0.65;
    leftStanchion.position.set(-goalWidth / 2, goalHeight / 2, direction * (goalDepth / 2));
    goalGroup.add(leftStanchion);

    const rightStanchion = new THREE.Mesh(stanchionGeo, postMat);
    rightStanchion.rotation.x = direction * 0.65;
    rightStanchion.position.set(goalWidth / 2, goalHeight / 2, direction * (goalDepth / 2));
    goalGroup.add(rightStanchion);

    // Sloped Back Net Mesh
    const backNetGeo = new THREE.PlaneGeometry(goalWidth, Math.sqrt(goalHeight * goalHeight + goalDepth * goalDepth), 8, 8);
    const backNet = new THREE.Mesh(backNetGeo, netMat);
    backNet.rotation.x = direction * 0.65;
    backNet.position.set(0, goalHeight / 2, direction * (goalDepth / 2));
    goalGroup.add(backNet);

    // Side Net Panels
    const sideNetShape = new THREE.Shape();
    sideNetShape.moveTo(0, 0);
    sideNetShape.lineTo(0, goalHeight);
    sideNetShape.lineTo(direction * goalDepth, 0);
    sideNetShape.closePath();
    const sideNetGeo = new THREE.ShapeGeometry(sideNetShape);

    const leftSideNet = new THREE.Mesh(sideNetGeo, netMat);
    leftSideNet.position.set(-goalWidth / 2, 0, 0);
    leftSideNet.rotation.y = Math.PI / 2;
    goalGroup.add(leftSideNet);

    const rightSideNet = new THREE.Mesh(sideNetGeo, netMat);
    rightSideNet.position.set(goalWidth / 2, 0, 0);
    rightSideNet.rotation.y = Math.PI / 2;
    goalGroup.add(rightSideNet);

    return goalGroup;
  };

  group.add(createGoal(-halfL, -1));
  group.add(createGoal(halfL, 1));

  // 4. STADIUM CONTEXT: PERIMETER AD BOARDS & TIERED GRANDSTANDS
  group.add(createPerimeterAdBoards(pitchWidth + 8, pitchLength + 8, 1.0));
  group.add(createTieredStands(pitchWidth + 12, pitchLength + 12, isLowEnd ? 3 : 5, 0x10b981));

  // 5. 4 CORNER FLOODLIGHT TOWERS (Matching Scene Spotlights)
  const towerX = halfW + 6;
  const towerZ = halfL + 6;
  group.add(createFloodlightTower(-towerX, -towerZ, 28, 0, 0));
  group.add(createFloodlightTower(towerX, -towerZ, 28, 0, 0));
  group.add(createFloodlightTower(-towerX, towerZ, 28, 0, 0));
  group.add(createFloodlightTower(towerX, towerZ, 28, 0, 0));

  return group;
}

/**
 * Builds the Football ball prop with classic 32-panel / pentagon pattern,
 * positioned hovering at the kickoff spot.
 */
export function buildFootballBall(THREE, theme) {
  const group = new THREE.Group();

  // Create iconic black and white patterned soccer ball geometry
  const ballRadius = 1.8;
  const ballGeo = new THREE.IcosahedronGeometry(ballRadius, 2);

  let texture = null;
  if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 256);

      // Draw black pentagon / hexagon tiles
      ctx.fillStyle = '#111827';
      const drawPoly = (cx, cy, r, sides) => {
        ctx.beginPath();
        for (let s = 0; s < sides; s++) {
          const a = (s * 2 * Math.PI) / sides;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      };

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 8; col++) {
          if ((row + col) % 2 === 0) {
            drawPoly(col * 64 + 32, row * 64 + 32, 22, 5);
          }
        }
      }

      texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  }

  const ballMat = new THREE.MeshStandardMaterial({
    color: texture ? 0xffffff : 0xf8fafc,
    map: texture,
    roughness: 0.35,
    metalness: 0.1
  });
  const ballMesh = new THREE.Mesh(ballGeo, ballMat);
  group.add(ballMesh);

  // Subtle emerald domain energy ring
  const auraGeo = new THREE.TorusGeometry(ballRadius + 0.3, 0.04, 8, 32);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.65
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  aura.rotation.x = Math.PI / 2;
  group.add(aura);

  // Crucial: Set sport-correct base starting position at Kickoff Spot!
  group.userData.basePosition = new THREE.Vector3(0, 1.4, 0);

  return group;
}

/**
 * Lighting configuration for outdoor Football stadium.
 */
export function getFootballLighting(THREE, theme) {
  return {
    ambient: { color: 0xffffff, intensity: 0.45 },
    overhead: { color: 0x10b981, intensity: 2.2, position: [0, 32, 0] },
    corners: [
      { position: [-36, 28, -51], color: 0xffffff, intensity: 2.5 },
      { position: [36, 28, -51], color: 0xffffff, intensity: 2.5 },
      { position: [-36, 28, 51], color: 0x10b981, intensity: 2.8 },
      { position: [36, 28, 51], color: 0xffffff, intensity: 2.5 }
    ]
  };
}

/**
 * Accessory for Score! Hero character in Football mode.
 */
export function buildFootballAccessory(THREE) {
  const ballGeo = new THREE.IcosahedronGeometry(0.7, 2);
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
    emissive: 0x10b981,
    emissiveIntensity: 0.4
  });
  const accessory = new THREE.Mesh(ballGeo, ballMat);
  accessory.position.set(0.9, 0.35, 0.6);
  return accessory;
}
