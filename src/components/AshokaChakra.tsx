import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Bounds } from '@react-three/drei';
import * as THREE from 'three';

const ChakraModel = () => {
  const { scene } = useGLTF('/AshokaChakra.gltf');
  const spinRef = useRef<THREE.Group>(null);

  // Model ko deep Navy Blue color aur shine dene ke liye
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#000050', // Premium Dark Blue
          roughness: 0.3,
          metalness: 0.5
        });
      }
    });
  }, [scene]);

  // CIRCULAR CLOCKWISE MOTION FIX
  useFrame((_, delta) => {
    if (spinRef.current) {
      // Z-axis par negative value dene se ye ekdum ghadi (clock) ki tarah clockwise ghoomega
      spinRef.current.rotation.z -= delta * 0.8; 
    }
  });

  return (
    // Yahan se saari rotation hata di hai taaki ye tumhari image ki tarah ekdum STRAIGHT face kare
    <group ref={spinRef}>
      <primitive object={scene} />
    </group>
  );
};

const AshokaChakra = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 200], fov: 50 }}>
        
        {/* Lights */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={70} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.1}>
            <ChakraModel />
          </Bounds>
        </Suspense>
        
      </Canvas>
    </div>
  );
};

export default AshokaChakra;