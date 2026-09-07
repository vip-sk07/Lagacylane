import * as THREE from 'three';

/**
 * Detects if the client device is lower-powered (<= 4 hardware threads).
 */
export function isLowEndDevice() {
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency <= 4;
  }
  return false;
}

/**
 * Recursively disposes all geometries, materials, and attached textures
 * of an Object3D hierarchy to eliminate WebGL memory leaks.
 */
export function disposeObject3D(obj) {
  if (!obj) return;

  if (obj.geometry) {
    obj.geometry.dispose();
  }

  if (obj.material) {
    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    materials.forEach((mat) => {
      if (mat) {
        if (mat.map) mat.map.dispose();
        if (mat.lightMap) mat.lightMap.dispose();
        if (mat.bumpMap) mat.bumpMap.dispose();
        if (mat.normalMap) mat.normalMap.dispose();
        if (mat.specularMap) mat.specularMap.dispose();
        if (mat.roughnessMap) mat.roughnessMap.dispose();
        if (mat.metalnessMap) mat.metalnessMap.dispose();
        if (mat.alphaMap) mat.alphaMap.dispose();
        mat.dispose();
      }
    });
  }

  while (obj.children && obj.children.length > 0) {
    const child = obj.children[0];
    obj.remove(child);
    disposeObject3D(child);
  }
}

/**
 * Creates an authentic 4-corner floodlight pylon tower with an angled light head.
 * @param {number} x
 * @param {number} z
 * @param {number} height
 * @param {number} [targetX=0]
 * @param {number} [targetZ=0]
 * @returns {THREE.Group}
 */
export function createFloodlightTower(x, z, height = 28, targetX = 0, targetZ = 0) {
  const tower = new THREE.Group();
  tower.position.set(x, 0, z);

  // Main vertical steel mast / truss
  const mastGeo = new THREE.CylinderGeometry(0.35, 0.65, height, 8);
  const mastMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Steel slate
    metalness: 0.6,
    roughness: 0.4
  });
  const mast = new THREE.Mesh(mastGeo, mastMat);
  mast.position.y = height / 2;
  tower.add(mast);

  // Horizontal cross-arms for floodlight bank
  const armGeo = new THREE.BoxGeometry(4.2, 0.25, 0.4);
  const armMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5 });
  const arm = new THREE.Mesh(armGeo, armMat);
  arm.position.y = height - 0.2;
  tower.add(arm);

  // Angled floodlight bank / head housing
  const headGeo = new THREE.BoxGeometry(4.4, 1.6, 0.8);
  const headMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0, height + 0.6, 0);

  // Aim head toward the field center
  const angleToCenter = Math.atan2(targetX - x, targetZ - z);
  head.rotation.y = angleToCenter;
  head.rotation.x = 0.25; // Tilt down toward ground
  tower.add(head);

  // Emissive glowing lens panel
  const lensGeo = new THREE.PlaneGeometry(4.1, 1.3);
  const lensMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.position.set(0, height + 0.6, 0.42);
  lens.rotation.y = angleToCenter;
  lens.rotation.x = 0.25;
  tower.add(lens);

  return tower;
}

/**
 * Creates low-poly tiered grandstand seating surrounding a rectangle.
 * @param {number} innerWidth
 * @param {number} innerLength
 * @param {number} tiers
 * @param {number} seatColor
 * @returns {THREE.Group}
 */
export function createTieredStands(innerWidth, innerLength, tiers = 4, seatColor = 0x1e3a8a) {
  const stands = new THREE.Group();

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark concrete
    roughness: 0.8,
    metalness: 0.1
  });

  const seatMat = new THREE.MeshStandardMaterial({
    color: seatColor,
    roughness: 0.6
  });

  const crowdColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0xffffff];

  const halfW = innerWidth / 2;
  const halfL = innerLength / 2;

  // Build 4 sides (North, South, East, West)
  const sides = [
    { dir: 'N', x: 0, z: -halfL - 6, length: innerWidth + 16, rot: 0 },
    { dir: 'S', x: 0, z: halfL + 6, length: innerWidth + 16, rot: Math.PI },
    { dir: 'W', x: -halfW - 6, z: 0, length: innerLength + 16, rot: Math.PI / 2 },
    { dir: 'E', x: halfW + 6, z: 0, length: innerLength + 16, rot: -Math.PI / 2 }
  ];

  sides.forEach(({ x, z, length, rot }) => {
    const sideGroup = new THREE.Group();
    sideGroup.position.set(x, 0, z);
    sideGroup.rotation.y = rot;

    for (let t = 0; t < tiers; t++) {
      const tierHeight = (t + 1) * 1.0;
      const tierDepth = 2.0;
      const tierZ = t * 1.8;

      // Concrete tier step
      const stepGeo = new THREE.BoxGeometry(length, tierHeight, tierDepth);
      const step = new THREE.Mesh(stepGeo, concreteMat);
      step.position.set(0, tierHeight / 2, tierZ);
      sideGroup.add(step);

      // Colored seating row on top of step
      const seatGeo = new THREE.BoxGeometry(length - 0.4, 0.25, tierDepth * 0.7);
      const seats = new THREE.Mesh(seatGeo, seatMat);
      seats.position.set(0, tierHeight + 0.12, tierZ);
      sideGroup.add(seats);

      // Low-poly crowd suggestion (clusters of small colorful blocks)
      const numCrowdBlocks = Math.floor(length / 4.5);
      for (let c = 0; c < numCrowdBlocks; c++) {
        if (Math.random() > 0.3) {
          const crowdGeo = new THREE.BoxGeometry(1.2, 0.5, 0.5);
          const randColor = crowdColors[c % crowdColors.length];
          const crowdMat = new THREE.MeshBasicMaterial({ color: randColor });
          const crowdMesh = new THREE.Mesh(crowdGeo, crowdMat);
          const cx = -length / 2 + 2 + c * 4.2 + (Math.random() - 0.5);
          crowdMesh.position.set(cx, tierHeight + 0.45, tierZ);
          sideGroup.add(crowdMesh);
        }
      }
    }

    stands.add(sideGroup);
  });

  return stands;
}

/**
 * Creates perimeter LED advertising boards with animated-looking sport graphics.
 * @param {number} width
 * @param {number} length
 * @param {number} [height=1.0]
 * @returns {THREE.Group}
 */
export function createPerimeterAdBoards(width, length, height = 0.9) {
  const group = new THREE.Group();

  const boardMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x0284c7,
    emissiveIntensity: 0.35,
    roughness: 0.4
  });

  const halfW = width / 2;
  const halfL = length / 2;

  // North & South
  const nsGeo = new THREE.BoxGeometry(width, height, 0.3);
  const north = new THREE.Mesh(nsGeo, boardMat);
  north.position.set(0, height / 2, -halfL);
  group.add(north);

  const south = new THREE.Mesh(nsGeo, boardMat);
  south.position.set(0, height / 2, halfL);
  group.add(south);

  // East & West
  const ewGeo = new THREE.BoxGeometry(0.3, height, length);
  const west = new THREE.Mesh(ewGeo, boardMat);
  west.position.set(-halfW, height / 2, 0);
  group.add(west);

  const east = new THREE.Mesh(ewGeo, boardMat);
  east.position.set(halfW, height / 2, 0);
  group.add(east);

  return group;
}
