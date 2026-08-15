import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeYouthToOldSelf() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const youthLight = new THREE.PointLight(0xa855f7, 3, 50); // Purple glow for Youth
    youthLight.position.set(-6, 3, 4);
    scene.add(youthLight);

    const oldLight = new THREE.PointLight(0x10b981, 3, 50); // Emerald glow for Future/Older Self
    oldLight.position.set(6, 3, 4);
    scene.add(oldLight);

    // ----------------------------------------------------
    // 3D AVATAR 1: YOUNGER SELF (Left - Age 16 Youth)
    // ----------------------------------------------------
    const youthGeo = new THREE.IcosahedronGeometry(2, 2);
    const youthMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const youthAvatar = new THREE.Mesh(youthGeo, youthMat);
    youthAvatar.position.set(-6, 0, 0);
    scene.add(youthAvatar);

    // Inner glowing core for Youth
    const youthCoreGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const youthCoreMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe });
    const youthCore = new THREE.Mesh(youthCoreGeo, youthCoreMat);
    youthAvatar.add(youthCore);

    // ----------------------------------------------------
    // 3D AVATAR 2: OLDER / FUTURE SELF (Right - Mature Self)
    // ----------------------------------------------------
    const oldGeo = new THREE.IcosahedronGeometry(2.5, 3);
    const oldMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const oldAvatar = new THREE.Mesh(oldGeo, oldMat);
    oldAvatar.position.set(6, 0, 0);
    scene.add(oldAvatar);

    // Inner glowing core for Older Self
    const oldCoreGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const oldCoreMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
    const oldCore = new THREE.Mesh(oldCoreGeo, oldCoreMat);
    oldAvatar.add(oldCore);

    // ----------------------------------------------------
    // 3D TEMPORAL BRIDGE CONNECTING YOUTH TO OLD SELF
    // ----------------------------------------------------
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-6, 0, 0),
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(6, 0, 0)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.15, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8
    });
    const bridgeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(bridgeMesh);

    // ----------------------------------------------------
    // MEMORY DIALOGUE PARTICLES STREAMING BETWEEN THE TWO
    // ----------------------------------------------------
    const particleCount = 60;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const pGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xc084fc : 0x34d399
      });
      const particle = new THREE.Mesh(pGeo, pMat);
      particle.userData = { progress: Math.random() };
      scene.add(particle);
      particles.push(particle);
    }

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Avatars
      youthAvatar.rotation.x = elapsedTime * 0.4;
      youthAvatar.rotation.y = elapsedTime * 0.6;
      youthAvatar.position.y = Math.sin(elapsedTime * 1.5) * 0.4;

      oldAvatar.rotation.x = -elapsedTime * 0.3;
      oldAvatar.rotation.y = elapsedTime * 0.5;
      oldAvatar.position.y = Math.cos(elapsedTime * 1.5) * 0.4;

      // Animate Dialogue Memory Particles along the curve
      particles.forEach((p) => {
        p.userData.progress += 0.008;
        if (p.userData.progress > 1) p.userData.progress = 0;
        const point = curve.getPoint(p.userData.progress);
        p.position.copy(point);
      });

      // Camera Floating Tilt
      camera.position.x = Math.sin(elapsedTime * 0.3) * 1.2;

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
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl flex items-center justify-center my-8">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Dialogue Overlay Cards */}
      <div className="absolute top-6 left-6 max-w-[200px] sm:max-w-[240px] p-3 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs backdrop-blur-md shadow-xl animate-float">
        <span className="font-black text-purple-400 block text-[10px] uppercase">Younger Self (Youth Era)</span>
        <p className="mt-0.5 text-[11px] font-semibold">"Did we make the academy starting XI?"</p>
      </div>

      <div className="absolute bottom-6 right-6 max-w-[200px] sm:max-w-[240px] p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs backdrop-blur-md shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
        <span className="font-black text-emerald-400 block text-[10px] uppercase">Older Self (Championship Era)</span>
        <p className="mt-0.5 text-[11px] font-semibold">"We won the championship with a last-minute goal!"</p>
      </div>

      {/* Center Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-extrabold border border-slate-800 shadow-md">
        3D Temporal Conversation Bridge
      </div>
    </div>
  );
}
