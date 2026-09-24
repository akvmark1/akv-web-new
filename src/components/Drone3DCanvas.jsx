import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Quadcopter / Drone geometry with sensors and rotating rotors
function DroneModel() {
  const droneRef = useRef();
  const rotor1Ref = useRef();
  const rotor2Ref = useRef();
  const rotor3Ref = useRef();
  const rotor4Ref = useRef();
  const radarRingRef = useRef();

  useFrame((state, delta) => {
    // Gentle hovering tilt according to pointer
    if (droneRef.current) {
      droneRef.current.rotation.y += delta * 0.25;
      droneRef.current.rotation.x = THREE.MathUtils.lerp(
        droneRef.current.rotation.x,
        state.pointer.y * 0.2,
        0.05
      );
      droneRef.current.rotation.z = THREE.MathUtils.lerp(
        droneRef.current.rotation.z,
        -state.pointer.x * 0.2,
        0.05
      );
    }

    // High speed rotor spin
    const spinSpeed = 25;
    if (rotor1Ref.current) rotor1Ref.current.rotation.y += delta * spinSpeed;
    if (rotor2Ref.current) rotor2Ref.current.rotation.y -= delta * spinSpeed;
    if (rotor3Ref.current) rotor3Ref.current.rotation.y += delta * spinSpeed;
    if (rotor4Ref.current) rotor4Ref.current.rotation.y -= delta * spinSpeed;

    // Expanding radar ring
    if (radarRingRef.current) {
      radarRingRef.current.rotation.z += delta * 0.5;
    }
  });

  const armDistance = 1.6;

  return (
    <group ref={droneRef} position={[0, 0, 0]}>
      {/* Central Aerodynamic Carbon Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.22, 1.2]} />
        <meshStandardMaterial color="#0e131b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Top Avionics & GPS Pod */}
      <mesh position={[0, 0.16, -0.1]}>
        <cylinderGeometry args={[0.22, 0.26, 0.12, 16]} />
        <meshStandardMaterial color="#f2a93b" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Front Perception AI Gimbal / Camera Suite */}
      <mesh position={[0, -0.15, 0.65]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#05070a" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Camera Lens Amber Ring */}
      <mesh position={[0, -0.15, 0.8]}>
        <ringGeometry args={[0.07, 0.11, 24]} />
        <meshBasicMaterial color="#f2a93b" side={THREE.DoubleSide} />
      </mesh>

      {/* 4 Carbon Arms (X-Configuration) */}
      {/* Front-Right Arm */}
      <mesh position={[armDistance * 0.5, 0, armDistance * 0.5]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, armDistance * 1.4, 8]} />
        <meshStandardMaterial color="#1a202c" metalness={0.9} />
      </mesh>
      {/* Front-Left Arm */}
      <mesh position={[-armDistance * 0.5, 0, armDistance * 0.5]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, armDistance * 1.4, 8]} />
        <meshStandardMaterial color="#1a202c" metalness={0.9} />
      </mesh>
      {/* Rear-Right Arm */}
      <mesh position={[armDistance * 0.5, 0, -armDistance * 0.5]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, armDistance * 1.4, 8]} />
        <meshStandardMaterial color="#1a202c" metalness={0.9} />
      </mesh>
      {/* Rear-Left Arm */}
      <mesh position={[-armDistance * 0.5, 0, -armDistance * 0.5]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, armDistance * 1.4, 8]} />
        <meshStandardMaterial color="#1a202c" metalness={0.9} />
      </mesh>

      {/* 4 Motor Housings & Rotor Blades */}
      {/* Motor 1: Front Right */}
      <group position={[armDistance, 0.08, armDistance]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} />
        </mesh>
        <group ref={rotor1Ref} position={[0, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.015, 0.07]} />
            <meshStandardMaterial color="#f2a93b" opacity={0.8} transparent />
          </mesh>
        </group>
      </group>

      {/* Motor 2: Front Left */}
      <group position={[-armDistance, 0.08, armDistance]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} />
        </mesh>
        <group ref={rotor2Ref} position={[0, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.015, 0.07]} />
            <meshStandardMaterial color="#f2a93b" opacity={0.8} transparent />
          </mesh>
        </group>
      </group>

      {/* Motor 3: Rear Right */}
      <group position={[armDistance, 0.08, -armDistance]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} />
        </mesh>
        <group ref={rotor3Ref} position={[0, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.015, 0.07]} />
            <meshStandardMaterial color="#f2a93b" opacity={0.8} transparent />
          </mesh>
        </group>
      </group>

      {/* Motor 4: Rear Left */}
      <group position={[-armDistance, 0.08, -armDistance]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.7} />
        </mesh>
        <group ref={rotor4Ref} position={[0, 0.1, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.015, 0.07]} />
            <meshStandardMaterial color="#f2a93b" opacity={0.8} transparent />
          </mesh>
        </group>
      </group>

      {/* Futuristic Radar Sensor Ring */}
      <group ref={radarRingRef} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.015, 16, 64]} />
          <meshBasicMaterial color="#f2a93b" opacity={0.4} transparent />
        </mesh>
      </group>
    </group>
  );
}

// Particle field representing telemetry point cloud & sensor data
function ParticleCloud({ count = 350 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f2a93b"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function Drone3DCanvas() {
  return (
    <div className="w-full h-full min-h-[420px] md:min-h-[520px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={0.8} color="#f2a93b" />
        <pointLight position={[0, -1, 2]} intensity={1.2} color="#3f9463" />

        <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <DroneModel />
        </Float>

        <ParticleCloud />
      </Canvas>
      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-amber/60 tracking-wider bg-navy/80 px-2 py-1 rounded border border-white/5 pointer-events-none">
        INTERACTIVE 3D PLATFORM &middot; ROTATE WITH POINTER
      </div>
    </div>
  );
}
