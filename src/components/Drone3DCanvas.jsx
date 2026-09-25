import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const COMPANY_COORDINATES = '22.255471° N / 84.903671° E';

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
    () => latitudeLongitudeToVector3(22.255471, 84.903671, 1.65),
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
    const handoff = THREE.MathUtils.smoothstep(p, 0.16, 0.68);
    const globeOpacity = 1 - THREE.MathUtils.smoothstep(p, 0.22, 0.62);

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

const MAP_BOUNDS = {
  minLongitude: 68,
  maxLongitude: 97.7,
  minLatitude: 6,
  maxLatitude: 37.5,
};

function projectMapPoint(longitude, latitude) {
  return {
    x: ((longitude - MAP_BOUNDS.minLongitude) / (MAP_BOUNDS.maxLongitude - MAP_BOUNDS.minLongitude)) * 220,
    y: ((MAP_BOUNDS.maxLatitude - latitude) / (MAP_BOUNDS.maxLatitude - MAP_BOUNDS.minLatitude)) * 280,
  };
}

function ringToPath(ring) {
  return ring
    .map(([longitude, latitude], index) => {
      const point = projectMapPoint(longitude, latitude);
      return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    })
    .join(' ');
}

function geometryToPath(geometry) {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates.map(ringToPath).join(' ');
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates
      .flatMap((polygon) => polygon.map(ringToPath))
      .join(' ');
  }

  return '';
}

export function IndiaMapOverlay({ progress, compact = false }) {
  const [mapData, setMapData] = useState(null);
  const mapId = useId().replace(/:/g, '');
  const mapOpacity = THREE.MathUtils.smoothstep(progress, 0.24, 0.66);
  const mapScale = 0.72 + mapOpacity * 0.28;
  const target = projectMapPoint(84.903671, 22.255471);
  const mapSize = compact
    ? 'w-[180px] h-[220px] sm:w-[195px] sm:h-[235px]'
    : 'w-[260px] h-[320px] md:w-[300px] md:h-[360px]';

  useEffect(() => {
    let cancelled = false;

    fetch('/maps/india-states-simplified.json')
      .then((response) => {
        if (!response.ok) throw new Error('India map could not be loaded');
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setMapData(data);
      })
      .catch(() => {
        if (!cancelled) setMapData({ features: [] });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
      style={{ opacity: mapOpacity }}
      aria-hidden="true"
    >
      <div
        className={`relative ${mapSize} transition-transform duration-700`}
        style={{ transform: `scale(${mapScale})` }}
      >
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 220 280"
          role="img"
          aria-label="India location tracking map"
        >
          <defs>
            <pattern id={`${mapId}-grid`} width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#f2a93b" strokeWidth="0.35" opacity="0.35" />
            </pattern>
            <filter id={`${mapId}-glow`}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x="0" y="0" width="220" height="280" fill={`url(#${mapId}-grid)`} opacity="0.45" />
          {mapData?.features.map((feature) => {
            const stateName = feature.properties?.NAME_1 ?? '';
            const isOdisha = /odisha|orissa/i.test(stateName);

            return (
              <path
                key={stateName}
                d={geometryToPath(feature.geometry)}
                fill={isOdisha ? '#f2a93b' : '#172231'}
                fillOpacity={isOdisha ? 0.9 : 0.68}
                stroke={isOdisha ? '#ffd27a' : '#6a7889'}
                strokeWidth={isOdisha ? 1.4 : 0.55}
                strokeLinejoin="round"
                filter={isOdisha ? `url(#${mapId}-glow)` : undefined}
              />
            );
          })}
          <circle cx={target.x} cy={target.y} r="5" fill="#f2a93b" filter={`url(#${mapId}-glow)`} />
          <circle cx={target.x} cy={target.y} r="11" fill="none" stroke="#f2a93b" strokeWidth="1" opacity="0.8">
            <animate attributeName="r" values="8;18;8" dur="2.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.05;0.8" dur="2.1s" repeatCount="indefinite" />
          </circle>
          <line
            x1={target.x}
            y1={target.y}
            x2={Math.min(target.x + 38, 208)}
            y2={target.y - 18}
            stroke="#f2a93b"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        </svg>
        {compact ? (
          <div className="absolute inset-x-0 bottom-1 text-center">
            <div className="font-mono text-[9px] tracking-[0.12em] text-amber/85">{COMPANY_COORDINATES}</div>
          </div>
        ) : (
          <div
            className="absolute translate-x-3 -translate-y-[calc(50%+18px)] whitespace-nowrap text-left"
            style={{
              left: `${Math.min((target.x / 220) * 100 + 14, 68)}%`,
              top: `${(target.y / 280) * 100}%`,
            }}
          >
            <div className="h-px w-14 bg-amber/70 mb-2" />
            <div className="font-mono text-[9px] tracking-[0.22em] text-amber uppercase">Odisha / target locked</div>
            <div className="font-mono text-[10px] text-white/75 mt-1">{COMPANY_COORDINATES}</div>
            <div className="text-[11px] text-white/50 mt-1">TIIR · NIT Rourkela</div>
          </div>
        )}
      </div>
    </div>
  );
}

function FallbackScene({ progress }) {
  const globeOpacity = 1 - THREE.MathUtils.smoothstep(progress, 0.18, 0.62);

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

export default function Drone3DCanvas({ progress = 0, className = '', showMap = true }) {
  const [webGLAvailable] = useState(() => {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    return Boolean(context);
  });

  const stage = showMap
    ? progress < 0.28
      ? 'global tracking'
      : progress < 0.66
        ? 'regional handoff'
        : 'target locked'
    : progress < 0.6
      ? 'global tracking'
      : 'orbital handoff';

  return (
    <div className={`w-full h-full min-h-[420px] md:min-h-[520px] relative pointer-events-none ${className}`}>
      {webGLAvailable ? <WebGLScene progress={progress} /> : <FallbackScene progress={progress} />}
      {showMap && <IndiaMapOverlay progress={progress} />}
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
          <div className="mt-1 text-amber/90">
            {showMap && progress > 0.58 ? COMPANY_COORDINATES : '34.1526° N / 118.2437° W'}
          </div>
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