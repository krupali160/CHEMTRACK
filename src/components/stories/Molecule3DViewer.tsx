import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Molecule3DViewerProps {
  chemicalName: string;
  formula: string | null;
}

export const Molecule3DViewer: React.FC<Molecule3DViewerProps> = ({ chemicalName, formula }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 320;
    const height = mountRef.current.clientHeight || 280;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.8);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Group for all molecule parts
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Atom & Bond Materials (CPK Colors)
    const atomMaterials: Record<string, THREE.MeshStandardMaterial> = {
      C: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2, metalness: 0.1 }), // Carbon (Slate)
      O: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.1, metalness: 0.2 }), // Oxygen (Red)
      H: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.1 }), // Hydrogen (White)
      N: new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.2, metalness: 0.2 }), // Nitrogen (Blue)
      Pb: new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.1, metalness: 0.6 }), // Lead (Metallic)
      Cl: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, metalness: 0.1 }), // Chlorine (Green)
      S: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, metalness: 0.1 }), // Sulfur (Yellow)
    };
    const bondMaterial = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.2 });

    const sphereGeom = new THREE.SphereGeometry(1, 32, 32);

    const createAtom = (type: string, radius: number, pos: [number, number, number]) => {
      const mat = atomMaterials[type] || atomMaterials['C'];
      const mesh = new THREE.Mesh(sphereGeom, mat);
      mesh.scale.set(radius, radius, radius);
      mesh.position.set(...pos);
      moleculeGroup.add(mesh);
      return mesh;
    };

    const createBond = (pos1: [number, number, number], pos2: [number, number, number], radius = 0.1) => {
      const v1 = new THREE.Vector3(...pos1);
      const v2 = new THREE.Vector3(...pos2);
      const distance = v1.distanceTo(v2);

      const cylinderGeom = new THREE.CylinderGeometry(radius, radius, distance, 16);
      const cylinder = new THREE.Mesh(cylinderGeom, bondMaterial);

      const midPoint = v1.clone().add(v2).multiplyScalar(0.5);
      cylinder.position.copy(midPoint);

      const direction = v2.clone().sub(v1).normalize();
      cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

      moleculeGroup.add(cylinder);
    };

    // Molecule Coordinates Template Selector
    const nameLower = chemicalName.toLowerCase();

    if (nameLower.includes('acetone')) {
      // Acetone: Central C=O with two CH3 groups
      createAtom('C', 0.55, [0, 0, 0]); // Central C
      createAtom('O', 0.55, [0, 1.4, 0]); // Carbonyl O
      createBond([0, 0.05, 0], [0, 1.4, 0], 0.07);
      createBond([0, -0.05, 0], [0, 1.4, 0], 0.07); // Double bond

      // Methyl 1 (Left)
      createAtom('C', 0.5, [-1.3, -0.8, 0]);
      createBond([0, 0, 0], [-1.3, -0.8, 0], 0.1);
      createAtom('H', 0.28, [-1.4, -1.8, 0]);
      createAtom('H', 0.28, [-2.2, -0.4, 0.7]);
      createAtom('H', 0.28, [-2.2, -0.4, -0.7]);
      createBond([-1.3, -0.8, 0], [-1.4, -1.8, 0], 0.06);
      createBond([-1.3, -0.8, 0], [-2.2, -0.4, 0.7], 0.06);
      createBond([-1.3, -0.8, 0], [-2.2, -0.4, -0.7], 0.06);

      // Methyl 2 (Right)
      createAtom('C', 0.5, [1.3, -0.8, 0]);
      createBond([0, 0, 0], [1.3, -0.8, 0], 0.1);
      createAtom('H', 0.28, [1.4, -1.8, 0]);
      createAtom('H', 0.28, [2.2, -0.4, 0.7]);
      createAtom('H', 0.28, [2.2, -0.4, -0.7]);
      createBond([1.3, -0.8, 0], [1.4, -1.8, 0], 0.06);
      createBond([1.3, -0.8, 0], [2.2, -0.4, 0.7], 0.06);
      createBond([1.3, -0.8, 0], [2.2, -0.4, -0.7], 0.06);
    } else if (nameLower.includes('nitric acid') || (formula && formula.includes('HNO'))) {
      // Nitric Acid: Planar HNO3
      createAtom('N', 0.5, [0, 0, 0]);
      createAtom('O', 0.55, [1.2, 0.8, 0]);
      createAtom('O', 0.55, [-1.2, 0.8, 0]);
      createAtom('O', 0.55, [0, -1.3, 0]);
      createAtom('H', 0.28, [0.8, -1.8, 0]);

      createBond([0, 0, 0], [1.2, 0.8, 0], 0.08);
      createBond([0, 0, 0], [-1.2, 0.8, 0], 0.08);
      createBond([0, 0, 0], [0, -1.3, 0], 0.08);
      createBond([0, -1.3, 0], [0.8, -1.8, 0], 0.06);
    } else if (nameLower.includes('lead') || (formula && formula.includes('Pb'))) {
      // Lead Nitrate: Central Lead surrounded by planar nitrate groups
      createAtom('Pb', 0.7, [0, 0, 0]);
      createAtom('N', 0.45, [-1.8, 0.8, 0]);
      createAtom('O', 0.45, [-2.6, 0.2, 0]);
      createAtom('O', 0.45, [-1.8, 1.8, 0]);
      createAtom('O', 0.45, [-1.0, 0.4, 0.8]);

      createAtom('N', 0.45, [1.8, -0.8, 0]);
      createAtom('O', 0.45, [2.6, -0.2, 0]);
      createAtom('O', 0.45, [1.8, -1.8, 0]);
      createAtom('O', 0.45, [1.0, -0.4, -0.8]);

      createBond([0, 0, 0], [-1.8, 0.8, 0], 0.08);
      createBond([0, 0, 0], [1.8, -0.8, 0], 0.08);
      createBond([-1.8, 0.8, 0], [-2.6, 0.2, 0], 0.06);
      createBond([-1.8, 0.8, 0], [-1.8, 1.8, 0], 0.06);
      createBond([-1.8, 0.8, 0], [-1.0, 0.4, 0.8], 0.06);
      createBond([1.8, -0.8, 0], [2.6, -0.2, 0], 0.06);
      createBond([1.8, -0.8, 0], [1.8, -1.8, 0], 0.06);
      createBond([1.8, -0.8, 0], [1.0, -0.4, -0.8], 0.06);
    } else {
      // Universal tetrahedral / organic archetype
      createAtom('C', 0.55, [0, 0, 0]);
      createAtom('O', 0.5, [0, 1.4, 0]);
      createAtom('C', 0.5, [-1.2, -0.7, 0]);
      createAtom('H', 0.28, [1.2, -0.7, 0.7]);
      createAtom('H', 0.28, [0, -0.7, -1.2]);

      createBond([0, 0, 0], [0, 1.4, 0], 0.08);
      createBond([0, 0, 0], [-1.2, -0.7, 0], 0.08);
      createBond([0, 0, 0], [1.2, -0.7, 0.7], 0.06);
      createBond([0, 0, 0], [0, -0.7, -1.2], 0.06);
    }

    // User Interactive Mouse / Touch Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      moleculeGroup.rotation.y += deltaX * 0.01;
      moleculeGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown);
    dom.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        moleculeGroup.rotation.y += 0.012;
        moleculeGroup.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      dom.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [chemicalName, formula]);

  return (
    <div className="relative w-full h-72 sm:h-80 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900/60 to-purple-950/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-inner">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
        <span className="text-[10px] uppercase font-mono tracking-widest text-purple-300/80 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
          3D Interactive Model • Drag to Rotate
        </span>
      </div>
    </div>
  );
};
