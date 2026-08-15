import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScoreHeroCharacter({ sport = 'football' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.8, 11);
    camera.lookAt(0, 2.5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color theme
    let jerseyColor = 0x10b981; // Emerald Green for Football
    let accentColor = 0x34d399;
    if (sport === 'cricket') {
      jerseyColor = 0x84cc16; // Lime Green/White for Cricket
      accentColor = 0xa3e635;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(jerseyColor, 3, 30, Math.PI / 4, 0.5);
    rimLight.position.set(-5, 8, -5);
    scene.add(rimLight);

    // ----------------------------------------------------
    // 3D SCORE! HERO CHARACTER MODEL ASSEMBLY
    // ----------------------------------------------------
    const characterGroup = new THREE.Group();

    // 1. Head & Hair
    const headGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xf3d5b5, roughness: 0.5 }); // Skin tone
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 4.2;
    characterGroup.add(head);

    // Stylized Score! Hero Hair
    const hairGeo = new THREE.ConeGeometry(0.8, 0.8, 16);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.8 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 4.7, 0);
    hair.rotation.x = -0.2;
    characterGroup.add(hair);

    // 2. Torso / Jersey (#10)
    const torsoGeo = new THREE.CylinderGeometry(0.85, 0.75, 2.2, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: jerseyColor,
      roughness: 0.3,
      metalness: 0.1
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 2.7;
    characterGroup.add(torso);

    // Jersey Number #10 Emblem
    const numGeo = new THREE.PlaneGeometry(0.6, 0.6);
    const numMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const numEmblem = new THREE.Mesh(numGeo, numMat);
    numEmblem.position.set(0, 2.8, 0.86);
    characterGroup.add(numEmblem);

    // 3. Shorts
    const shortsGeo = new THREE.CylinderGeometry(0.8, 0.85, 0.9, 16);
    const shortsMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const shorts = new THREE.Mesh(shortsGeo, shortsMat);
    shorts.position.y = 1.45;
    characterGroup.add(shorts);

    // 4. Legs & Athletic Cleats/Pads
    const createLeg = (xPos) => {
      const legGeo = new THREE.CylinderGeometry(0.3, 0.25, 1.4, 12);
      const legMat = new THREE.MeshStandardMaterial({ color: 0xf3d5b5 });
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(xPos, 0.6, 0);

      // Socks
      const sockGeo = new THREE.CylinderGeometry(0.31, 0.28, 0.8, 12);
      const sockMat = new THREE.MeshStandardMaterial({ color: accentColor });
      const sock = new THREE.Mesh(sockGeo, sockMat);
      sock.position.set(xPos, 0.4, 0);
      characterGroup.add(sock);

      // Cleats/Shoes
      const shoeGeo = new THREE.BoxGeometry(0.4, 0.3, 0.8);
      const shoeMat = new THREE.MeshStandardMaterial({ color: 0x020617 });
      const shoe = new THREE.Mesh(shoeGeo, shoeMat);
      shoe.position.set(xPos, 0.15, 0.15);
      characterGroup.add(shoe);

      return leg;
    };
    characterGroup.add(createLeg(-0.4));
    characterGroup.add(createLeg(0.4));

    // 5. Arms
    const armGeo = new THREE.CylinderGeometry(0.22, 0.2, 1.5, 12);
    const armMat = new THREE.MeshStandardMaterial({ color: 0xf3d5b5 });

    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-1.05, 2.7, 0);
    leftArm.rotation.z = 0.3;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(1.05, 2.7, 0);
    rightArm.rotation.z = -0.3;
    characterGroup.add(rightArm);

    // 6. Sport Specific Accessory (Soccer Ball or Cricket Bat)
    let accessory;
    if (sport === 'football') {
      const ballGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });
      accessory = new THREE.Mesh(ballGeo, ballMat);
      accessory.position.set(0.9, 0.35, 0.6);
    } else {
      // Cricket Bat
      const batGeo = new THREE.BoxGeometry(0.3, 1.8, 0.1);
      const batMat = new THREE.MeshStandardMaterial({ color: 0xca8a04 }); // Wood
      accessory = new THREE.Mesh(batGeo, batMat);
      accessory.position.set(1.1, 1.8, 0.3);
      accessory.rotation.z = -0.4;
    }
    characterGroup.add(accessory);

    // 7. Base Podium Ring
    const ringGeo = new THREE.RingGeometry(1.8, 2.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: jerseyColor, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    characterGroup.add(ring);

    scene.add(characterGroup);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Score! Hero character smoothly
      characterGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.4;
      characterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      if (accessory && sport === 'football') {
        accessory.rotation.y = elapsedTime * 1.2;
      }

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
    <div className="relative w-full h-[380px] rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl flex items-center justify-center my-6">
      <div ref={mountRef} className="w-full h-full" />

      {/* Score! Hero Character Badge Overlay */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 text-xs font-black text-white border border-slate-800 shadow-lg flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span>3D Score! Hero {sport === 'football' ? 'Footballer' : 'Cricketer'} #10</span>
      </div>

      <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-extrabold border border-slate-800 shadow-md">
        Dynamically Customized to Registered Athlete
      </div>
    </div>
  );
}
