import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ sport = 'football' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 22, 36);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color definitions per sport
    let primaryColor = 0x10b981; // Green for Football
    let secondaryColor = 0x059669;

    if (sport === 'cricket') {
      primaryColor = 0x22c55e; // Grass green for Cricket
      secondaryColor = 0xd97706; // Clay brown pitch
    } else if (sport === 'basketball') {
      primaryColor = 0xf97316; // Orange for Basketball
      secondaryColor = 0xea580c; // Hardwood
    } else if (sport === 'journaler') {
      primaryColor = 0x06b6d4; // Cyan galaxy
      secondaryColor = 0x3b82f6;
    }

    // Ambient and Stadium Floodlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const mainSpotLight = new THREE.SpotLight(primaryColor, 4, 120, Math.PI / 4, 0.5);
    mainSpotLight.position.set(0, 35, 20);
    scene.add(mainSpotLight);

    const stadiumLight2 = new THREE.SpotLight(0x3b82f6, 2.5, 120, Math.PI / 4, 0.5);
    stadiumLight2.position.set(-30, 30, -30);
    scene.add(stadiumLight2);

    const stadiumLight3 = new THREE.SpotLight(0xffffff, 2, 120, Math.PI / 4, 0.5);
    stadiumLight3.position.set(30, 30, -30);
    scene.add(stadiumLight3);

    // ----------------------------------------------------
    // DYNAMIC GROUND GENERATION BASED ON SPORT PASSION
    // ----------------------------------------------------

    const groundGroup = new THREE.Group();

    if (sport === 'football') {
      // ⚽ FOOTBALL PITCH GROUND
      const pitchGeo = new THREE.PlaneGeometry(60, 90);
      const pitchMat = new THREE.MeshStandardMaterial({
        color: 0x062817,
        roughness: 0.8,
        metalness: 0.1
      });
      const pitchMesh = new THREE.Mesh(pitchGeo, pitchMat);
      pitchMesh.rotation.x = -Math.PI / 2;
      groundGroup.add(pitchMesh);

      // Pitch White Lines & Grid Helper
      const grid = new THREE.GridHelper(90, 30, 0x22c55e, 0x14532d);
      grid.position.y = 0.05;
      groundGroup.add(grid);

      // Center Circle Line
      const circleGeo = new THREE.RingGeometry(8, 8.4, 32);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const circleMesh = new THREE.Mesh(circleGeo, lineMat);
      circleMesh.rotation.x = -Math.PI / 2;
      circleMesh.position.y = 0.08;
      groundGroup.add(circleMesh);
    } else if (sport === 'cricket') {
      // 🏏 CRICKET STADIUM & PITCH GROUND
      // Circular Green Outfield Ground
      const outfieldGeo = new THREE.CircleGeometry(42, 48);
      const outfieldMat = new THREE.MeshStandardMaterial({
        color: 0x0a331c,
        roughness: 0.7
      });
      const outfieldMesh = new THREE.Mesh(outfieldGeo, outfieldMat);
      outfieldMesh.rotation.x = -Math.PI / 2;
      groundGroup.add(outfieldMesh);

      // Rectangular Brown Clay Pitch Strip in Center
      const pitchStripGeo = new THREE.PlaneGeometry(10, 30);
      const pitchStripMat = new THREE.MeshStandardMaterial({
        color: 0xb45309, // Clay brown
        roughness: 0.9
      });
      const pitchStripMesh = new THREE.Mesh(pitchStripGeo, pitchStripMat);
      pitchStripMesh.rotation.x = -Math.PI / 2;
      pitchStripMesh.position.y = 0.06;
      groundGroup.add(pitchStripMesh);

      // 3D Cricket Wickets / Stumps (at both ends of pitch)
      const createStumps = (zPos) => {
        for (let i = -1; i <= 1; i++) {
          const stumpGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.5, 12);
          const stumpMat = new THREE.MeshStandardMaterial({ color: 0xfef08a }); // Wooden yellow
          const stump = new THREE.Mesh(stumpGeo, stumpMat);
          stump.position.set(i * 0.5, 1.25, zPos);
          groundGroup.add(stump);
        }
      };
      createStumps(13);
      createStumps(-13);
    } else if (sport === 'basketball') {
      // 🏀 BASKETBALL HARDWOOD COURT GROUND
      const courtGeo = new THREE.PlaneGeometry(55, 80);
      const courtMat = new THREE.MeshStandardMaterial({
        color: 0x431407, // Dark hardwood
        roughness: 0.3,
        metalness: 0.2
      });
      const courtMesh = new THREE.Mesh(courtGeo, courtMat);
      courtMesh.rotation.x = -Math.PI / 2;
      groundGroup.add(courtMesh);

      // Court Lines Grid
      const courtGrid = new THREE.GridHelper(80, 20, 0xf97316, 0x7c2d12);
      courtGrid.position.y = 0.05;
      groundGroup.add(courtGrid);

      // Key Paint Rectangles
      const keyGeo = new THREE.PlaneGeometry(14, 20);
      const keyMat = new THREE.MeshBasicMaterial({ color: 0xc2410c, side: THREE.DoubleSide });
      const keyMesh = new THREE.Mesh(keyGeo, keyMat);
      keyMesh.rotation.x = -Math.PI / 2;
      keyMesh.position.set(0, 0.07, -25);
      groundGroup.add(keyMesh);
    } else {
      // 📖 JOURNALER GALAXY HORIZON
      const grid = new THREE.GridHelper(100, 40, 0x06b6d4, 0x0f172a);
      grid.position.y = 0.05;
      groundGroup.add(grid);
    }

    scene.add(groundGroup);

    // ----------------------------------------------------
    // FLOATING 3D SPORT BALL / TROPHY OBJECT
    // ----------------------------------------------------

    let ballGeo = new THREE.IcosahedronGeometry(2.8, 2);
    let ballMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      emissive: primaryColor,
      emissiveIntensity: 0.5,
      roughness: 0.2
    });

    if (sport === 'cricket') {
      ballGeo = new THREE.SphereGeometry(2.5, 24, 24);
      ballMat = new THREE.MeshStandardMaterial({
        color: 0xd97706, // Leather red/gold
        roughness: 0.3,
        metalness: 0.3,
        emissive: 0x92400e,
        emissiveIntensity: 0.4
      });
    }

    const floatingBall = new THREE.Mesh(ballGeo, ballMat);
    floatingBall.position.set(0, 9, -15);
    scene.add(floatingBall);

    // ----------------------------------------------------
    // FLOATING STADIUM LIGHT PARTICLES
    // ----------------------------------------------------
    const particleCount = 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const tempColor = new THREE.Color(primaryColor);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 30 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      colors[i * 3] = tempColor.r + (Math.random() - 0.5) * 0.25;
      colors[i * 3 + 1] = tempColor.g + (Math.random() - 0.5) * 0.25;
      colors[i * 3 + 2] = tempColor.b + (Math.random() - 0.5) * 0.25;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate floating ball
      floatingBall.rotation.x = elapsedTime * 0.4;
      floatingBall.rotation.y = elapsedTime * 0.5;
      floatingBall.position.y = 9 + Math.sin(elapsedTime * 1.5) * 1.2;

      // Animate particles floating
      const posArr = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.012;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Subtle camera rotation
      camera.position.x = Math.sin(elapsedTime * 0.25) * 3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [sport]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
}
