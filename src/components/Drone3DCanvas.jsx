import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const COMPANY_COORDINATES = '22.2507° N / 84.9018° E';

function latitudeLongitudeToVector3(latitude, longitude, radius) {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);

  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon)
  );
}

function SpaceParticles({ count = 180 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const seed = i * 37.17;
      points[i * 3] = Math.sin(seed) * 4.8;
      points[i * 3 + 1] = Math.cos(seed * 0.73) * 3.1;
      points[i * 3 + 2] = Math.sin(seed * 0.41) * 3.5 - 0.5;
    }

    return points;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.04;
    }
  });

  return (
    <points ref={pointsRef} positions={positions} frustumCulled={false}>
      <pointsMaterial
        color="#f2a93b"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

function TargetMarker({ progress }) {
  const markerRef = useRef();
  const pulseRef = useRef();
  const markerPosition = useMemo(
    () => latitudeLongitudeToVector3(22.25, 84.9, 1.65),
    []
  );

  useFrame((state, delta) => {
    const targetOpacity = THREE.MathUtils.smoothstep(progress, 0.55, 0.9);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.12;

    if (markerRef.current) {
      markerRef.current.scale.setScalar(0.7 + targetOpacity * 0.5);
      markerRef.current.position.lerp(markerPosition, 0.08);
      markerRef.current.visible = targetOpacity > 0.01;
    }

    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(pulse);
      pulseRef.current.material.opacity = targetOpacity * 0.45;
    }

    if (markerRef.current) {
      markerRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={markerRef} position={markerPosition}>
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#f2a93b" />
      </mesh>
      <mesh ref={pulseRef}>
        <ringGeometry args={[0.11, 0.13, 32]} />
        <meshBasicMaterial
          color="#f2a93b"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function EarthScene({ progress }) {
  const earthTexture = useLoader(THREE.TextureLoader, '/textures/earth_atmos_2048.jpg');
  const normalTexture = useLoader(THREE.TextureLoader, '/textures/earth_normal_2048.jpg');
  const specularTexture = useLoader(THREE.TextureLoader, '/textures/earth_specular_2048.jpg');
  const earthRef = useRef();
  const glowRef = useRef();
  const earthMaterialRef = useRef();
  const cloudMaterialRef = useRef();
  const smoothProgress = useRef(progress);
  const atmosphereColor = useMemo(() => new THREE.Color('#4a98ff'), []);
  const atmosphereGeometry = useMemo(() => new THREE.SphereGeometry(1.7, 64, 64), []);

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      progress,
      4.5,
      delta
    );
    const p = smoothProgress.current;
    const handoff = THREE.MathUtils.smoothstep(p, 0.28, 0.82);
    const globeOpacity = 1 - THREE.MathUtils.smoothstep(p, 0.42, 0.82);

    if (earthRef.current) {
      earthRef.current.rotation.y += delta * (0.08 + p * 0.1);
      earthRef.current.rotation.x = THREE.MathUtils.lerp(
        earthRef.current.rotation.x,
        -0.12 + handoff * 0.18,
        0.04
      );
      earthRef.current.position.z = -handoff * 0.65;
      earthRef.current.scale.setScalar(1 + handoff * 0.42);
    }

    if (earthMaterialRef.current) {
      earthMaterialRef.current.opacity = Math.max(globeOpacity, 0.02);
    }

    if (cloudMaterialRef.current) {
      cloudMaterialRef.current.opacity = Math.max(globeOpacity * 0.25, 0.02);
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + handoff * 0.46);
      glowRef.current.material.opacity = 0.12 * globeOpacity;
    }

    state.camera.position.lerp(
      new THREE.Vector3(0, 0.22 - handoff * 0.2, 5.1 - handoff * 0.95),
      0.045
    );
    state.camera.lookAt(0, 0, -handoff * 0.25);
  });

  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[-4, 2, 5]} intensity={2.3} color="#dceaff" />
      <directionalLight position={[4, -2, -4]} intensity={0.5} color="#f2a93b" />

      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1.6, 96, 96]} />
          <meshPhongMaterial
            ref={earthMaterialRef}
            map={earthTexture}
            normalMap={normalTexture}
            specularMap={specularTexture}
            specular={new THREE.Color('#405a75')}
            shininess={14}
            transparent
            opacity={1}
          />
        </mesh>
        <mesh scale={1.012}>
          <sphereGeometry args={[1.6, 96, 96]} />
          <meshBasicMaterial
            ref={cloudMaterialRef}
            color="#eaf5ff"
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <mesh ref={glowRef} geometry={atmosphereGeometry} scale={1.02}>
        <meshBasicMaterial
          color={atmosphereColor}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <TargetMarker progress={progress} />
      <SpaceParticles />
    </>
  );
}

function IndiaMapOverlay({ progress }) {
  const mapOpacity = Math.min(1, Math.max(0, (progress - 0.42) * 2.1));
  const mapScale = 0.72 + mapOpacity * 0.28;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
      style={{ opacity: mapOpacity }}
      aria-hidden="true"
    >
      <div
        className="relative w-[260px] h-[320px] md:w-[300px] md:h-[360px] transition-transform duration-700"
        style={{ transform: `scale(${mapScale})` }}
      >
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 220 280"
          role="img"
          aria-label="India location tracking map"
        >
          <defs>
            <pattern id="india-grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#f2a93b" strokeWidth="0.35" opacity="0.45" />
            </pattern>
            <filter id="india-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M94 10 111 17 128 21 142 35 157 42 153 55 170 65 164 80 176 91 165 106 161 124 151 137 146 153 136 166 130 184 119 210 108 238 98 227 91 207 82 191 73 176 62 161 53 149 42 143 35 128 23 116 27 101 17 88 24 73 37 62 49 50 63 42 76 29 87 23Z"
            fill="url(#india-grid)"
            stroke="#f2a93b"
            strokeWidth="1.5"
            filter="url(#india-glow)"
          />
          <path
            d="M94 10 111 17 128 21 142 35 157 42 153 55 170 65 164 80 176 91 165 106 161 124 151 137 146 153 136 166 130 184 119 210 108 238 98 227 91 207 82 191 73 176 62 161 53 149 42 143 35 128 23 116 27 101 17 88 24 73 37 62 49 50 63 42 76 29 87 23Z"
            fill="none"
            stroke="#f2a93b"
            strokeWidth="0.8"
            strokeDasharray="3 5"
            opacity="0.7"
          />
          <circle cx="110" cy="165" r="5" fill="#f2a93b" filter="url(#india-glow)" />
          <circle cx="110" cy="165" r="11" fill="none" stroke="#f2a93b" strokeWidth="1" opacity="0.8">
            <animate attributeName="r" values="8;18;8" dur="2.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.05;0.8" dur="2.1s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute left-[52%] top-[59%] translate-x-3 -translate-y-1/2 whitespace-nowrap text-left">
          <div className="h-px w-14 bg-amber/70 mb-2" />
          <div className="font-mono text-[9px] tracking-[0.22em] text-amber uppercase">Target locked</div>
          <div className="font-mono text-[10px] text-white/75 mt-1">{COMPANY_COORDINATES}</div>
          <div className="text-[11px] text-white/50 mt-1">TIIR · NIT Rourkela</div>
        </div>
      </div>
    </div>
  );
}

function FallbackScene({ progress }) {
  const globeOpacity = 1 - Math.min(1, Math.max(0, (progress - 0.28) * 1.65));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 w-[270px] h-[270px] md:w-[340px] md:h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/30 shadow-[0_0_70px_rgba(52,142,255,0.24)] transition-all duration-700"
        style={{
          opacity: globeOpacity,
          transform: `translate(-50%, -50%) scale(${1 + progress * 0.4})`,
          backgroundImage: "url('/textures/earth_atmos_2048.jpg')",
          backgroundSize: 'auto 100%',
          backgroundPosition: `${progress * 34}% center`,
          animation: 'globe-spin 24s linear infinite',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.33),transparent_18%),linear-gradient(120deg,transparent_50%,rgba(4,13,29,0.6))]" />
      </div>
      <div
        className="absolute inset-1/2 w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/15 transition-opacity duration-700"
        style={{ opacity: globeOpacity * 0.75 }}
      />
    </div>
  );
}

function WebGLScene({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 5.1], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <EarthScene progress={progress} />
    </Canvas>
  );
}

export default function Drone3DCanvas({ progress = 0 }) {
  const [webGLAvailable] = useState(() => {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(context);
  });

  const stage = progress < 0.42 ? 'global tracking' : progress < 0.82 ? 'regional handoff' : 'target locked';

  return (
    <div className="w-full h-full min-h-[420px] md:min-h-[520px] relative pointer-events-none">
      {webGLAvailable ? <WebGLScene progress={progress} /> : <FallbackScene progress={progress} />}
      <IndiaMapOverlay progress={progress} />
      <div className="absolute inset-x-4 top-5 flex items-start justify-between font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase">
        <div>
          <div className="text-amber/80">Orbital intelligence // 001</div>
          <div className="mt-1 text-white/30">Live visual telemetry</div>
        </div>
        <div className="text-right">
          <div className="text-accentgreen">● Link stable</div>
          <div className="mt-1 text-white/30">{stage}</div>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between font-mono text-[9px] tracking-wider text-white/45 uppercase">
        <div>
          <div className="text-white/30">Coordinates</div>
          <div className="mt-1 text-amber/90">{progress > 0.72 ? COMPANY_COORDINATES : '34.1526° N / 118.2437° W'}</div>
        </div>
        <div className="text-right">
          <div className="mb-2 text-white/30">Scroll to trace</div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((tick) => (
              <span
                key={tick}
                className={`h-1 w-5 transition-colors duration-500 ${
                  progress >= tick / 4 ? 'bg-amber' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 pointer-events-none" />
    </div>
  );
}