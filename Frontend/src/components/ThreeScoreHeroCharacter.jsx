import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getActiveDomainDescriptor, getActiveTheme } from '../utils/journey';

export default function ThreeScoreHeroCharacter({ journey, sport = 'football' }) {
  const mountRef = useRef(null);

  // Persistent refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const characterGroupRef = useRef(null);
  const accessoryGroupRef = useRef(null);
  const torsoMatRef = useRef(null);
  const sockMatRef = useRef(null);
  const ringMatRef = useRef(null);
  const rimLightRef = useRef(null);
  const animFrameRef = useRef(null);
  const isIntersectingRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const clockRef = useRef(new THREE.Clock());
  const shouldRotateAccessoryRef = useRef(true);

  const activeDescriptor = getActiveDomainDescriptor(journey || sport);
  const activeTheme = journey ? getActiveTheme(journey) : activeDescriptor.theme;
  const domainId = activeDescriptor.id;
  const jerseyColor = activeTheme?.threeColors?.primary ?? 0x10b981;
  const accentColor = activeTheme?.threeColors?.secondary ?? 0x34d399;

  // Helper to dispose geometries and materials recursively
  const disposeObject = (obj) => {
    if (!obj) return;
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
    if (obj.children) {
      while (obj.children.length > 0) {
        const child = obj.children[0];
        obj.remove(child);
        disposeObject(child);
      }
    }
  };

  // ----------------------------------------------------
  // 1. ONE-TIME SETUP: Rig, Camera, Renderer, Animation Loop
  // ----------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.8, 11);
    camera.lookAt(0, 2.5, 0);
    cameraRef.current = camera;

    // Persistent WebGLRenderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const rimLight = new THREE.SpotLight(jerseyColor, 3, 30, Math.PI / 4, 0.5);
    rimLight.position.set(-5, 8, -5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // ----------------------------------------------------
    // ASSEMBLE PERSISTENT SCORE! HERO CHARACTER MODEL RIG
    // ----------------------------------------------------
    const characterGroup = new THREE.Group();
    characterGroupRef.current = characterGroup;

    // 1. Head & Hair
    const headGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xf3d5b5, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 4.2;
    characterGroup.add(head);

    const hairGeo = new THREE.ConeGeometry(0.8, 0.8, 16);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.8 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 4.7, 0);
    hair.rotation.x = -0.2;
    characterGroup.add(hair);

    // 2. Torso / Jersey (with mutable material ref)
    const torsoGeo = new THREE.CylinderGeometry(0.85, 0.75, 2.2, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: jerseyColor,
      roughness: 0.3,
      metalness: 0.1
    });
    torsoMatRef.current = torsoMat;
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 2.7;
    characterGroup.add(torso);

    // Number #10 Emblem
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

    // 4. Legs, Socks & Cleats
    const sockMat = new THREE.MeshStandardMaterial({ color: accentColor });
    sockMatRef.current = sockMat;

    const createLeg = (xPos) => {
      const legGeo = new THREE.CylinderGeometry(0.3, 0.25, 1.4, 12);
      const legMat = new THREE.MeshStandardMaterial({ color: 0xf3d5b5 });
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(xPos, 0.6, 0);

      // Sock
      const sockGeo = new THREE.CylinderGeometry(0.31, 0.28, 0.8, 12);
      const sock = new THREE.Mesh(sockGeo, sockMat);
      sock.position.set(xPos, 0.4, 0);
      characterGroup.add(sock);

      // Shoe / Cleat
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

    // 6. Base Podium Ring (with mutable material ref)
    const ringGeo = new THREE.RingGeometry(1.8, 2.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: jerseyColor, side: THREE.DoubleSide });
    ringMatRef.current = ringMat;
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    characterGroup.add(ring);

    // 7. Persistent Accessory Container Group (Swapped via refs)
    const accessoryGroup = new THREE.Group();
    characterGroup.add(accessoryGroup);
    accessoryGroupRef.current = accessoryGroup;

    scene.add(characterGroup);

    // Animation Loop with Visibility Safeguards
    let isRunning = false;

    const tick = () => {
      if (!isRunning) return;

      const elapsedTime = clockRef.current.getElapsedTime();

      // Rotate Score! Hero character smoothly
      if (characterGroupRef.current) {
        characterGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * 0.4;
        characterGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      // Rotate accessory if applicable (e.g. soccer ball or basketball)
      if (accessoryGroupRef.current && shouldRotateAccessoryRef.current) {
        accessoryGroupRef.current.rotation.y = elapsedTime * 1.2;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!isRunning && isIntersectingRef.current && isDocumentVisibleRef.current) {
        isRunning = true;
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      }
    };

    startLoop();

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Page Visibility API
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
      if (!document.hidden && isIntersectingRef.current) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize listener
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);

      disposeObject(characterGroup);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Mounts once

  // ----------------------------------------------------
  // 2. DOMAIN SYNC EFFECT: In-place material & accessory swapping
  // ----------------------------------------------------
  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Update Jersey Color
    if (torsoMatRef.current) {
      torsoMatRef.current.color.setHex(jerseyColor);
    }

    // 2. Update Socks Accent Color
    if (sockMatRef.current) {
      sockMatRef.current.color.setHex(accentColor);
    }

    // 3. Update Base Podium Ring Color
    if (ringMatRef.current) {
      ringMatRef.current.color.setHex(jerseyColor);
    }

    // 4. Update Rim Spotlight Color
    if (rimLightRef.current) {
      rimLightRef.current.color.setHex(jerseyColor);
    }

    // 5. Swap Character Accessory via Domain Descriptor
    if (accessoryGroupRef.current) {
      disposeObject(accessoryGroupRef.current);

      if (typeof activeDescriptor.buildAccessory === 'function') {
        const newAccessory = activeDescriptor.buildAccessory(THREE, activeTheme);
        accessoryGroupRef.current.add(newAccessory);
      }

      shouldRotateAccessoryRef.current = domainId === 'football' || domainId === 'basketball';
    }
  }, [domainId, jerseyColor, accentColor]);

  const roleLabel =
    domainId === 'football'
      ? 'Footballer'
      : domainId === 'cricket'
      ? 'Cricketer'
      : domainId === 'basketball'
      ? 'Hooper'
      : domainId === 'athletics'
      ? 'Runner / Athlete'
      : 'Chronicler';

  return (
    <div className="relative w-full h-[380px] rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl flex items-center justify-center my-6">
      <div ref={mountRef} className="w-full h-full" />

      {/* Score! Hero Character Badge Overlay */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 text-xs font-black text-white border border-slate-800 shadow-lg flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span>3D Score! Hero {roleLabel} #10</span>
      </div>

      <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-extrabold border border-slate-800 shadow-md">
        Dynamically Customized to Active Domain
      </div>
    </div>
  );
}
