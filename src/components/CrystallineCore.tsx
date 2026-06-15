import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

function IcosahedronScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const stars = useMemo(() => {
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < 500; i++) {
      points.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 30,
      });
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, p.y, p.z))
    );
    const material = new THREE.PointsMaterial({
      color: '#A5F3FC',
      size: 0.02,
      transparent: true,
      opacity: 0.8,
    });
    return new THREE.Points(geometry, material);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.3,
      delta * 2
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current.y * 0.3,
      delta * 2
    );
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.scale.setScalar(
      1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02
    );
  });

  const outerGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 2), []);
  const outerMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#0A0E27',
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  const innerGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 1), []);
  const innerMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#A5F3FC',
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <primitive object={stars} />
      <group ref={groupRef} position={[0, 0, 0]}>
        <mesh
          geometry={outerGeometry}
          material={outerMaterial}
          position={[-0.1, 0, 0]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <mesh geometry={innerGeometry} material={innerMaterial} position={[0.1, 0, 0]} />
      </group>
    </>
  );
}

export default function CrystallineCore() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <IcosahedronScene />
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
