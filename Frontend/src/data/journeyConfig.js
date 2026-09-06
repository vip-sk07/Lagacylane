export const JOURNEY_TYPES = Object.freeze({
  LIFE: 'life',
  SPORTS: 'sports'
});

export const SPORT_DOMAINS = [
  {
    id: 'football',
    label: 'Football',
    icon: '⚽',
    threeSceneKey: 'football',
    theme: {
      primary: '#10b981',
      secondary: '#059669',
      accentClass: 'from-emerald-500 to-green-600',
      threeColors: {
        primary: 0x10b981,
        secondary: 0x059669
      },
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'from-slate-950 via-emerald-950/30 to-slate-950',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      nodeUnlocked: 'bg-emerald-500 text-slate-950 shadow-emerald-500/50',
      line: 'stroke-emerald-500',
      icon: 'Trophy'
    },
    buildGround: (THREE, theme) => {
      const group = new THREE.Group();

      // Pitch Grass Plane
      const pitchGeo = new THREE.PlaneGeometry(60, 90);
      const pitchMat = new THREE.MeshStandardMaterial({
        color: 0x062817,
        roughness: 0.8,
        metalness: 0.1
      });
      const pitchMesh = new THREE.Mesh(pitchGeo, pitchMat);
      pitchMesh.rotation.x = -Math.PI / 2;
      group.add(pitchMesh);

      // Pitch Lines Grid
      const grid = new THREE.GridHelper(90, 30, 0x22c55e, 0x14532d);
      grid.position.y = 0.05;
      group.add(grid);

      // Center Circle Line
      const circleGeo = new THREE.RingGeometry(8, 8.4, 32);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const circleMesh = new THREE.Mesh(circleGeo, lineMat);
      circleMesh.rotation.x = -Math.PI / 2;
      circleMesh.position.y = 0.08;
      group.add(circleMesh);

      // Center Spot
      const spotGeo = new THREE.CircleGeometry(0.5, 16);
      const spotMesh = new THREE.Mesh(spotGeo, lineMat);
      spotMesh.rotation.x = -Math.PI / 2;
      spotMesh.position.y = 0.09;
      group.add(spotMesh);

      return group;
    },
    buildBall: (THREE, theme) => {
      const primary = theme?.threeColors?.primary ?? 0x10b981;
      const ballGeo = new THREE.IcosahedronGeometry(2.8, 2);
      const ballMat = new THREE.MeshStandardMaterial({
        color: primary,
        wireframe: true,
        emissive: primary,
        emissiveIntensity: 0.5,
        roughness: 0.2
      });
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      ballMesh.position.set(0, 9, -15);
      return ballMesh;
    },
    buildAccessory: (THREE) => {
      const ballGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });
      const accessory = new THREE.Mesh(ballGeo, ballMat);
      accessory.position.set(0.9, 0.35, 0.6);
      return accessory;
    }
  },
  {
    id: 'cricket',
    label: 'Cricket',
    icon: '🏏',
    threeSceneKey: 'cricket',
    theme: {
      primary: '#22c55e',
      secondary: '#d97706',
      accentClass: 'from-green-500 to-lime-600',
      threeColors: {
        primary: 0x22c55e,
        secondary: 0xd97706
      },
      glow: 'rgba(132, 204, 22, 0.4)',
      bg: 'from-slate-950 via-lime-950/30 to-slate-950',
      badge: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
      nodeUnlocked: 'bg-lime-500 text-slate-950 shadow-lime-500/50',
      line: 'stroke-lime-500',
      icon: 'Award'
    },
    buildGround: (THREE) => {
      const group = new THREE.Group();

      // Circular Green Outfield Ground
      const outfieldGeo = new THREE.CircleGeometry(42, 48);
      const outfieldMat = new THREE.MeshStandardMaterial({
        color: 0x0a331c,
        roughness: 0.7
      });
      const outfieldMesh = new THREE.Mesh(outfieldGeo, outfieldMat);
      outfieldMesh.rotation.x = -Math.PI / 2;
      group.add(outfieldMesh);

      // Inner 30-Yard Fielding Circle Marking
      const innerCircleGeo = new THREE.RingGeometry(24, 24.3, 48);
      const circleLineMat = new THREE.MeshBasicMaterial({
        color: 0x22c55e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const innerCircleMesh = new THREE.Mesh(innerCircleGeo, circleLineMat);
      innerCircleMesh.rotation.x = -Math.PI / 2;
      innerCircleMesh.position.y = 0.05;
      group.add(innerCircleMesh);

      // Rectangular Brown Clay Pitch Strip in Center
      const pitchStripGeo = new THREE.PlaneGeometry(10, 30);
      const pitchStripMat = new THREE.MeshStandardMaterial({
        color: 0xb45309, // Clay brown
        roughness: 0.9
      });
      const pitchStripMesh = new THREE.Mesh(pitchStripGeo, pitchStripMat);
      pitchStripMesh.rotation.x = -Math.PI / 2;
      pitchStripMesh.position.y = 0.06;
      group.add(pitchStripMesh);

      // 3D Cricket Wickets / Stumps (at both ends of pitch)
      const createStumps = (zPos) => {
        for (let i = -1; i <= 1; i++) {
          const stumpGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.5, 12);
          const stumpMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4 });
          const stump = new THREE.Mesh(stumpGeo, stumpMat);
          stump.position.set(i * 0.5, 1.25, zPos);
          group.add(stump);
        }
        // Horizontal Bails on top
        const bailGeo = new THREE.BoxGeometry(1.2, 0.08, 0.08);
        const bailMat = new THREE.MeshStandardMaterial({ color: 0xfef08a });
        const bail = new THREE.Mesh(bailGeo, bailMat);
        bail.position.set(0, 2.54, zPos);
        group.add(bail);
      };
      createStumps(13);
      createStumps(-13);

      return group;
    },
    buildBall: (THREE) => {
      const group = new THREE.Group();

      const ballGeo = new THREE.SphereGeometry(2.5, 24, 24);
      const ballMat = new THREE.MeshStandardMaterial({
        color: 0xd97706, // Leather red/gold
        roughness: 0.3,
        metalness: 0.3,
        emissive: 0x92400e,
        emissiveIntensity: 0.4
      });
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      group.add(ballMesh);

      // Raised white cricket ball seam
      const seamGeo = new THREE.TorusGeometry(2.52, 0.06, 8, 32);
      const seamMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const seamMesh = new THREE.Mesh(seamGeo, seamMat);
      group.add(seamMesh);

      group.position.set(0, 9, -15);
      return group;
    },
    buildAccessory: (THREE) => {
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
  },
  {
    id: 'basketball',
    label: 'Basketball',
    icon: '🏀',
    threeSceneKey: 'basketball',
    theme: {
      primary: '#f97316',
      secondary: '#ea580c',
      accentClass: 'from-amber-500 to-orange-600',
      threeColors: {
        primary: 0xf97316,
        secondary: 0xea580c
      },
      glow: 'rgba(249, 115, 22, 0.4)',
      bg: 'from-slate-950 via-amber-950/30 to-slate-950',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      nodeUnlocked: 'bg-amber-500 text-slate-950 shadow-amber-500/50',
      line: 'stroke-amber-500',
      icon: 'Zap'
    },
    buildGround: (THREE) => {
      const group = new THREE.Group();

      // Hardwood Court Floor
      const courtGeo = new THREE.PlaneGeometry(55, 80);
      const courtMat = new THREE.MeshStandardMaterial({
        color: 0x431407, // Dark hardwood
        roughness: 0.3,
        metalness: 0.2
      });
      const courtMesh = new THREE.Mesh(courtGeo, courtMat);
      courtMesh.rotation.x = -Math.PI / 2;
      group.add(courtMesh);

      // Court Lines Grid
      const courtGrid = new THREE.GridHelper(80, 20, 0xf97316, 0x7c2d12);
      courtGrid.position.y = 0.05;
      group.add(courtGrid);

      // Key Paint Rectangles (Far & Near sides)
      const createKey = (zPos) => {
        const keyGeo = new THREE.PlaneGeometry(14, 20);
        const keyMat = new THREE.MeshBasicMaterial({ color: 0xc2410c, side: THREE.DoubleSide });
        const keyMesh = new THREE.Mesh(keyGeo, keyMat);
        keyMesh.rotation.x = -Math.PI / 2;
        keyMesh.position.set(0, 0.07, zPos);
        group.add(keyMesh);
      };
      createKey(-25);
      createKey(25);

      // Center Court Circle
      const centerGeo = new THREE.RingGeometry(6, 6.3, 32);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      centerMesh.rotation.x = -Math.PI / 2;
      centerMesh.position.y = 0.08;
      group.add(centerMesh);

      return group;
    },
    buildBall: (THREE) => {
      const group = new THREE.Group();

      const ballGeo = new THREE.SphereGeometry(2.6, 24, 24);
      const ballMat = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        roughness: 0.4,
        metalness: 0.1,
        emissive: 0xc2410c,
        emissiveIntensity: 0.3
      });
      const ballMesh = new THREE.Mesh(ballGeo, ballMat);
      group.add(ballMesh);

      // Ribs/Black Lines on Basketball
      const ribMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });
      const rib1Geo = new THREE.TorusGeometry(2.62, 0.04, 8, 32);
      const rib1 = new THREE.Mesh(rib1Geo, ribMat);
      group.add(rib1);

      const rib2Geo = new THREE.TorusGeometry(2.62, 0.04, 8, 32);
      const rib2 = new THREE.Mesh(rib2Geo, ribMat);
      rib2.rotation.x = Math.PI / 2;
      group.add(rib2);

      group.position.set(0, 9, -15);
      return group;
    },
    buildAccessory: (THREE) => {
      const ballGeo = new THREE.SphereGeometry(0.65, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        roughness: 0.4,
        emissive: 0xc2410c,
        emissiveIntensity: 0.2
      });
      const accessory = new THREE.Mesh(ballGeo, ballMat);
      accessory.position.set(0.9, 0.35, 0.6);
      return accessory;
    }
  },
  {
    id: 'athletics',
    label: 'Athletics',
    icon: '🏃',
    threeSceneKey: 'athletics',
    theme: {
      primary: '#ec4899',
      secondary: '#be185d',
      accentClass: 'from-pink-500 to-rose-600',
      threeColors: {
        primary: 0xec4899,
        secondary: 0xbe185d
      },
      glow: 'rgba(236, 72, 153, 0.4)',
      bg: 'from-slate-950 via-rose-950/30 to-slate-950',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      nodeUnlocked: 'bg-pink-500 text-slate-950 shadow-pink-500/50',
      line: 'stroke-pink-500',
      icon: 'Flame'
    },
    buildGround: (THREE) => {
      const group = new THREE.Group();

      // Athletics Track Maroon Base
      const trackGeo = new THREE.PlaneGeometry(60, 90);
      const trackMat = new THREE.MeshStandardMaterial({
        color: 0x500724, // Deep Track Maroon
        roughness: 0.7,
        metalness: 0.1
      });
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      trackMesh.rotation.x = -Math.PI / 2;
      group.add(trackMesh);

      // Track Lane Grid Lines (Pink/Rose)
      const trackGrid = new THREE.GridHelper(90, 10, 0xec4899, 0x831843);
      trackGrid.position.y = 0.05;
      group.add(trackGrid);

      // Multi-lane Running Lanes (Curved Oval/Ring lane dividers)
      const laneRadii = [16, 20, 24, 28];
      const laneLineMat = new THREE.MeshBasicMaterial({
        color: 0xfce7f3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });

      laneRadii.forEach((r) => {
        const ringGeo = new THREE.RingGeometry(r, r + 0.18, 48);
        const ring = new THREE.Mesh(ringGeo, laneLineMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.07;
        group.add(ring);
      });

      // Finish Line Strip (White across lanes)
      const finishGeo = new THREE.PlaneGeometry(28, 1.2);
      const finishMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      });
      const finishLine = new THREE.Mesh(finishGeo, finishMat);
      finishLine.rotation.x = -Math.PI / 2;
      finishLine.position.set(0, 0.08, 12);
      group.add(finishLine);

      // Track Starting Blocks / Hurdles props
      for (let x = -8; x <= 8; x += 4) {
        const blockGeo = new THREE.BoxGeometry(0.8, 0.3, 0.8);
        const blockMat = new THREE.MeshStandardMaterial({ color: 0xbe185d, roughness: 0.4 });
        const block = new THREE.Mesh(blockGeo, blockMat);
        block.position.set(x, 0.15, -28);
        group.add(block);
      }

      return group;
    },
    buildBall: (THREE) => {
      const group = new THREE.Group();

      // Championship Golden Relay Baton / Flame Torch Prop
      const batonGeo = new THREE.CylinderGeometry(0.5, 0.5, 5.0, 16);
      const batonMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Gold
        metalness: 0.85,
        roughness: 0.15,
        emissive: 0xd97706,
        emissiveIntensity: 0.5
      });
      const baton = new THREE.Mesh(batonGeo, batonMat);
      baton.rotation.z = Math.PI / 4;
      group.add(baton);

      // Swirling Energetic Rose Aura Ring
      const auraGeo = new THREE.TorusGeometry(2.4, 0.1, 16, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.8
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.rotation.x = Math.PI / 3;
      group.add(aura);

      group.position.set(0, 9, -15);
      return group;
    },
    buildAccessory: (THREE) => {
      // Golden Track Relay Baton in hand
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
  }
];

export const LIFE_DOMAIN = {
  id: 'life',
  label: 'Life Journal',
  icon: '📖',
  threeSceneKey: 'life',
  theme: {
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accentClass: 'from-cyan-500 to-blue-600',
    threeColors: {
      primary: 0x06b6d4,
      secondary: 0x3b82f6
    },
    glow: 'rgba(6, 182, 212, 0.4)',
    bg: 'from-slate-950 via-cyan-950/30 to-slate-950',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    nodeUnlocked: 'bg-cyan-500 text-slate-950 shadow-cyan-500/50',
    line: 'stroke-cyan-500',
    icon: 'BookOpen'
  },
  // Distinct Intentional Constellation / Timeline Scene
  buildGround: (THREE) => {
    const group = new THREE.Group();

    // Deep Cosmic Nebula Void Base
    const cosmosGeo = new THREE.PlaneGeometry(100, 100);
    const cosmosMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.95,
      metalness: 0.05
    });
    const cosmosMesh = new THREE.Mesh(cosmosGeo, cosmosMat);
    cosmosMesh.rotation.x = -Math.PI / 2;
    group.add(cosmosMesh);

    // Glowing Concentric Celestial Orbital Timeline Rings
    const orbitSpecs = [
      { radius: 10, color: 0x06b6d4, opacity: 0.7 },
      { radius: 20, color: 0x38bdf8, opacity: 0.6 },
      { radius: 30, color: 0x6366f1, opacity: 0.5 },
      { radius: 42, color: 0x8b5cf6, opacity: 0.4 }
    ];

    orbitSpecs.forEach(({ radius, color, opacity }) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.3, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.06;
      group.add(ring);
    });

    // Constellation Celestial Grid
    const constellationGrid = new THREE.GridHelper(100, 24, 0x06b6d4, 0x1e1b4b);
    constellationGrid.position.y = 0.04;
    group.add(constellationGrid);

    // Radiant Temporal Milestone Beacons positioned along orbits
    const beaconGeo = new THREE.OctahedronGeometry(0.6, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    const milestoneAngles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];
    milestoneAngles.forEach((angle, idx) => {
      const radius = idx % 2 === 0 ? 20 : 30;
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(
        Math.cos(angle) * radius,
        0.8,
        Math.sin(angle) * radius
      );
      group.add(beacon);

      // Light beam pillar connecting beacon to ground
      const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.6
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(
        Math.cos(angle) * radius,
        0.4,
        Math.sin(angle) * radius
      );
      group.add(pillar);
    });

    return group;
  },
  buildBall: (THREE) => {
    const group = new THREE.Group();

    // Floating Chronos / Memory Core Crystal
    const coreGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Dual Geometric Gyro Crystals
    const crystalGeo = new THREE.OctahedronGeometry(2.7, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    group.add(crystalMesh);

    // Celestial Gyro Ring
    const gyroGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 48);
    const gyroMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.8
    });
    const gyro = new THREE.Mesh(gyroGeo, gyroMat);
    gyro.rotation.x = Math.PI / 4;
    gyro.rotation.y = Math.PI / 6;
    group.add(gyro);

    group.position.set(0, 9, -15);
    return group;
  },
  buildAccessory: (THREE) => {
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
};

export const DEFAULT_JOURNEY = Object.freeze({
  type: JOURNEY_TYPES.SPORTS,
  domain: 'football'
});
