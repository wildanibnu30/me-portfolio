'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type ThreeSceneProps = {
  modelUrl: string;
  interactive?: boolean;
  autoRotate?: boolean;
  className?: string;
};

export default function ThreeScene({ modelUrl, interactive = true, autoRotate = false, className }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 2;

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
      controls.dampingFactor = 0.1;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = false;
      controls.screenSpacePanning = false;
      controls.minDistance = 1;
      controls.maxDistance = 10;
      controls.minPolarAngle = Math.PI / 6;
      controls.maxPolarAngle = Math.PI / 2.5;
      controls.rotateSpeed = 0.5;
      controls.zoomSpeed = 0.8;
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
        const scale = 1.5 / maxDim;
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
      if (model && autoRotate) {
        model.rotation.y += 0.005;
      }
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
    };
  }, [modelUrl, interactive, autoRotate]);

  return <div ref={mountRef} className={className || "absolute inset-0 -z-10"} />;
}
