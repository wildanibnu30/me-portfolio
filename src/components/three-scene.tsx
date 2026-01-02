'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCcw } from 'lucide-react';

type ThreeSceneProps = {
  modelUrl: string;
  interactive?: boolean;
  autoRotate?: boolean;
  className?: string;
};

export default function ThreeScene({ modelUrl, interactive = true, autoRotate = false, className }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Function to reset view
  const handleResetView = () => {
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.reset();
      // Ensure specific initial position if reset() doesn't feel right, but reset() usually returns to last saved state or initial.
      // Since we create fresh controls on mount, we might need to manually set position if we want a strict "home" position.
      cameraRef.current.position.set(0, 0, 2);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Cleanup existing content to prevent duplicates if strict mode triggers twice
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    let controls: OrbitControls | null = null;
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05; // Smoother inertia
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = true;
      controls.panSpeed = 0.5;
      controls.screenSpacePanning = true; // Better panning experience

      // Constraints
      controls.minDistance = 1.2; // Don't get too close (inside model)
      controls.maxDistance = 10;   // Allow seeing from further away
      controls.minPolarAngle = 0; // Allow looking from top
      controls.maxPolarAngle = Math.PI; // Allow looking from bottom (full 360)

      controls.rotateSpeed = 0.5;
      controls.zoomSpeed = 0.7;

      // Auto-rotation (handled by controls now)
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 2.0; // Gentle rotation

      controlsRef.current = controls;
    }

    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.6 / maxDim; // Slightly larger initial fit
        model.scale.set(scale, scale, scale);

        box.setFromObject(model);
        box.getCenter(center);
        model.position.sub(center);

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      // No manual rotation needed, controls handle it
      if (controls) {
        controls.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (currentMount) {
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      if (controls) {
        controls.dispose();
      }
      if (model) {
        scene.remove(model);
      }
      controlsRef.current = null;
      cameraRef.current = null;
    };
  }, [modelUrl, interactive, autoRotate]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className={className || "absolute inset-0 -z-10"} />

      {interactive && (
        <button
          onClick={handleResetView}
          className="absolute bottom-4 right-4 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-sm hover:bg-background hover:shadow-md transition-all z-10 group"
          title="Reset View"
          type="button"
        >
          <RotateCcw className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
          <span className="sr-only">Reset View</span>
        </button>
      )}
    </div>
  );
}
