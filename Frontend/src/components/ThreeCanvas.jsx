import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getActiveDomainDescriptor, getActiveTheme } from '../utils/journey';
import { disposeObject3D, isLowEndDevice } from '../three/scenes/common.js';

export default function ThreeCanvas({ journey, sport = 'football' }) {
  const mountRef = useRef(null);

  // Persistent Three.js instance refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const groundGroupRef = useRef(null);
  const propGroupRef = useRef(null);
  const ambientLightRef = useRef(null);
  const overheadLightRef = useRef(null);
  const cornerLightsRef = useRef([]);
  const particlesRef = useRef(null);
  const animFrameRef = useRef(null);
  const isIntersectingRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const clockRef = useRef(new THREE.Clock());

  const activeDescriptor = getActiveDomainDescriptor(journey || sport);
  const activeTheme = journey ? getActiveTheme(journey) : activeDescriptor.theme;
  const domainId = activeDescriptor.id;
  const primaryColor = activeTheme?.threeColors?.primary ?? 0x10b981;

  // ----------------------------------------------------
  // Helper to safely update persistent lights in place
  // ----------------------------------------------------
  const applyLightingConfig = (config) => {
    if (!config) return;

    if (ambientLightRef.current && config.ambient) {
      if (config.ambient.color !== undefined) ambientLightRef.current.color.setHex(config.ambient.color);
      if (config.ambient.intensity !== undefined) ambientLightRef.current.intensity = config.ambient.intensity;
    }

    if (overheadLightRef.current && config.overhead) {
      if (config.overhead.color !== undefined) overheadLightRef.current.color.setHex(config.overhead.color);
      if (config.overhead.intensity !== undefined) overheadLightRef.current.intensity = config.overhead.intensity;
      if (config.overhead.position) overheadLightRef.current.position.set(...config.overhead.position);
    }

    if (cornerLightsRef.current && config.corners) {
      config.corners.forEach((c, idx) => {
        const light = cornerLightsRef.current[idx];
        if (light) {
          if (c.position) light.position.set(...c.position);
          if (c.color !== undefined) light.color.setHex(c.color);
          if (c.intensity !== undefined) light.intensity = c.intensity;
        }
      });
    }
  };

  // ----------------------------------------------------
  // 1. ONE-TIME SETUP: Scene, Camera, WebGLRenderer, Loop
  // ----------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 24, 38);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Persistent WebGLRenderer (Created once)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Persistent Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.48);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const overheadLight = new THREE.SpotLight(primaryColor, 2.5, 120, Math.PI / 4, 0.5);
    overheadLight.position.set(0, 32, 0);
    scene.add(overheadLight);
    overheadLightRef.current = overheadLight;

    // 4 Corner Floodlights (Positions match 4 physical corner light towers)
    const defaultCornerPositions = [
      [-36, 28, -50],
      [36, 28, -50],
      [-36, 28, 50],
      [36, 28, 50]
    ];

    cornerLightsRef.current = defaultCornerPositions.map(([x, y, z]) => {
      const spot = new THREE.SpotLight(0xffffff, 2.5, 140, Math.PI / 3.8, 0.45);
      spot.position.set(x, y, z);
      spot.target.position.set(0, 0, 0);
      scene.add(spot);
      scene.add(spot.target);
      return spot;
    });

    // Persistent Containers for Ground and Ball/Prop
    const groundGroup = new THREE.Group();
    scene.add(groundGroup);
    groundGroupRef.current = groundGroup;

    const propGroup = new THREE.Group();
    scene.add(propGroup);
    propGroupRef.current = propGroup;

    // Floating Ambient Atmospheric Particle System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const tempColor = new THREE.Color(primaryColor);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 85;
      positions[i * 3 + 1] = Math.random() * 26 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 85;

      colors[i * 3] = tempColor.r + (Math.random() - 0.5) * 0.2;
      colors[i * 3 + 1] = tempColor.g + (Math.random() - 0.5) * 0.2;
      colors[i * 3 + 2] = tempColor.b + (Math.random() - 0.5) * 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation Loop
    let isRunning = false;

    const tick = () => {
      if (!isRunning) return;

      const elapsedTime = clockRef.current.getElapsedTime();

      // Animate floating prop group anchored to sport-accurate spot
      if (propGroupRef.current) {
        const basePos = propGroupRef.current.userData?.basePosition || new THREE.Vector3(0, 1.4, 0);
        propGroupRef.current.position.x = basePos.x;
        propGroupRef.current.position.z = basePos.z;
        propGroupRef.current.position.y = basePos.y + Math.sin(elapsedTime * 1.6) * 0.28;
        propGroupRef.current.rotation.y = elapsedTime * 0.6;
        propGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.8) * 0.08;
      }

      // Animate atmospheric particle drift
      if (particlesRef.current) {
        const posArr = particlesRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.01;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Gentle camera floating drift
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(elapsedTime * 0.22) * 2.2;
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

      // Clean up meshes, materials, textures, and renderer
      disposeObject3D(groundGroup);
      disposeObject3D(propGroup);
      disposeObject3D(particles);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Mounts once

  // ----------------------------------------------------
  // 2. DOMAIN SYNC EFFECT: In-place geometry & light swap
  // ----------------------------------------------------
  useEffect(() => {
    if (!sceneRef.current) return;

    const isLowEnd = isLowEndDevice();

    // 1. Update Lighting Rig in place
    if (typeof activeDescriptor.getLighting === 'function') {
      const lightConfig = activeDescriptor.getLighting(THREE, activeTheme);
      applyLightingConfig(lightConfig);
    } else if (overheadLightRef.current) {
      overheadLightRef.current.color.setHex(primaryColor);
    }

    // 2. Update Particle Colors
    if (particlesRef.current) {
      const colors = particlesRef.current.geometry.attributes.color.array;
      const count = colors.length / 3;
      const tempColor = new THREE.Color(primaryColor);
      for (let i = 0; i < count; i++) {
        colors[i * 3] = tempColor.r + (Math.random() - 0.5) * 0.2;
        colors[i * 3 + 1] = tempColor.g + (Math.random() - 0.5) * 0.2;
        colors[i * 3 + 2] = tempColor.b + (Math.random() - 0.5) * 0.2;
      }
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // 3. Swap Ground Geometry driven by active domain descriptor
    if (groundGroupRef.current) {
      disposeObject3D(groundGroupRef.current);
      if (typeof activeDescriptor.buildGround === 'function') {
        const newGround = activeDescriptor.buildGround(THREE, activeTheme, { isLowEnd });
        groundGroupRef.current.add(newGround);
      }
    }

    // 4. Swap Ball / Prop Geometry driven by active domain descriptor
    if (propGroupRef.current) {
      disposeObject3D(propGroupRef.current);
      if (typeof activeDescriptor.buildBall === 'function') {
        const newProp = activeDescriptor.buildBall(THREE, activeTheme, { isLowEnd });
        propGroupRef.current.add(newProp);

        // Anchor prop position to sport-accurate spot
        const basePos = newProp.userData?.basePosition || new THREE.Vector3(0, 1.4, 0);
        propGroupRef.current.userData.basePosition = basePos;
        propGroupRef.current.position.set(basePos.x, basePos.y, basePos.z);
      }
    }
  }, [domainId, primaryColor]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75 transition-opacity duration-1000"
    />
  );
}
