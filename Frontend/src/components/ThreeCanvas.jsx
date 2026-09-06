import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getActiveDomainDescriptor, getActiveTheme } from '../utils/journey';

export default function ThreeCanvas({ journey, sport = 'football' }) {
  const mountRef = useRef(null);

  // Persistent Three.js instance refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const groundGroupRef = useRef(null);
  const propGroupRef = useRef(null);
  const mainSpotLightRef = useRef(null);
  const particlesRef = useRef(null);
  const animFrameRef = useRef(null);
  const isIntersectingRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const clockRef = useRef(new THREE.Clock());

  const activeDescriptor = getActiveDomainDescriptor(journey || sport);
  const activeTheme = journey ? getActiveTheme(journey) : activeDescriptor.theme;
  const domainId = activeDescriptor.id;
  const primaryColor = activeTheme?.threeColors?.primary ?? 0x10b981;

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
  // 1. ONE-TIME SETUP: Scene, Camera, Renderer, Loop (Mount Once)
  // ----------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 22, 36);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Persistent WebGLRenderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (persistent lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const mainSpotLight = new THREE.SpotLight(primaryColor, 4, 120, Math.PI / 4, 0.5);
    mainSpotLight.position.set(0, 35, 20);
    scene.add(mainSpotLight);
    mainSpotLightRef.current = mainSpotLight;

    const stadiumLight2 = new THREE.SpotLight(0x3b82f6, 2.5, 120, Math.PI / 4, 0.5);
    stadiumLight2.position.set(-30, 30, -30);
    scene.add(stadiumLight2);

    const stadiumLight3 = new THREE.SpotLight(0xffffff, 2, 120, Math.PI / 4, 0.5);
    stadiumLight3.position.set(30, 30, -30);
    scene.add(stadiumLight3);

    // Persistent Containers for Ground and Floating Prop
    const groundGroup = new THREE.Group();
    scene.add(groundGroup);
    groundGroupRef.current = groundGroup;

    const propGroup = new THREE.Group();
    scene.add(propGroup);
    propGroupRef.current = propGroup;

    // Floating Particles System
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
    particlesRef.current = particles;

    // Animation Loop with Visibility Safeguard
    let isRunning = false;

    const tick = () => {
      if (!isRunning) return;

      const elapsedTime = clockRef.current.getElapsedTime();

      // Animate floating prop group smoothly
      if (propGroupRef.current) {
        propGroupRef.current.rotation.x = elapsedTime * 0.4;
        propGroupRef.current.rotation.y = elapsedTime * 0.5;
        propGroupRef.current.position.y = 9 + Math.sin(elapsedTime * 1.5) * 1.2;
      }

      // Animate particle drift
      if (particlesRef.current) {
        const posArr = particlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.012;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Subtle camera floating movement
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(elapsedTime * 0.25) * 3;
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

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Page Visibility API to pause rendering when tab is inactive
    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
      if (!document.hidden && isIntersectingRef.current) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize Handler
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

      // Clean up meshes, materials, and renderer
      disposeObject(groundGroup);
      disposeObject(propGroup);
      disposeObject(particles);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Mounts once

  // ----------------------------------------------------
  // 2. DOMAIN SYNC EFFECT: Config-driven geometry swapping via refs
  // ----------------------------------------------------
  useEffect(() => {
    if (!sceneRef.current) return;

    // 1. Update Spotlight Color without scene re-creation
    if (mainSpotLightRef.current) {
      mainSpotLightRef.current.color.setHex(primaryColor);
    }

    // 2. Update Particle Colors
    if (particlesRef.current) {
      const colors = particlesRef.current.geometry.attributes.color.array;
      const count = colors.length / 3;
      const tempColor = new THREE.Color(primaryColor);
      for (let i = 0; i < count; i++) {
        colors[i * 3] = tempColor.r + (Math.random() - 0.5) * 0.25;
        colors[i * 3 + 1] = tempColor.g + (Math.random() - 0.5) * 0.25;
        colors[i * 3 + 2] = tempColor.b + (Math.random() - 0.5) * 0.25;
      }
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // 3. Swap Ground Geometry driven by domain descriptor
    if (groundGroupRef.current) {
      disposeObject(groundGroupRef.current);
      if (typeof activeDescriptor.buildGround === 'function') {
        const newGround = activeDescriptor.buildGround(THREE, activeTheme);
        groundGroupRef.current.add(newGround);
      } else {
        // Safe fallback generic grid
        const fallbackGrid = new THREE.GridHelper(90, 30, primaryColor, 0x14532d);
        fallbackGrid.position.y = 0.05;
        groundGroupRef.current.add(fallbackGrid);
      }
    }

    // 4. Swap Floating Ball / Prop Geometry driven by domain descriptor
    if (propGroupRef.current) {
      disposeObject(propGroupRef.current);
      if (typeof activeDescriptor.buildBall === 'function') {
        const newProp = activeDescriptor.buildBall(THREE, activeTheme);
        propGroupRef.current.add(newProp);
      } else {
        // Safe fallback wireframe icosahedron
        const fallbackBall = new THREE.Mesh(
          new THREE.IcosahedronGeometry(2.8, 2),
          new THREE.MeshStandardMaterial({
            color: primaryColor,
            wireframe: true,
            emissive: primaryColor,
            emissiveIntensity: 0.5
          })
        );
        fallbackBall.position.set(0, 9, -15);
        propGroupRef.current.add(fallbackBall);
      }
    }
  }, [domainId, primaryColor]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
}
