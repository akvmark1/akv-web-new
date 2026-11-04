import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const COMPANY_COORDINATES = '22.255471° N / 84.903671° E';

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

// Initial angles to orient India (~79° E, 21° N) directly facing the camera
const INDIA_ROT_Y = -2.95;
const INDIA_ROT_X = 0.28;

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
      3.2,
      delta
    );
    const p = smoothProgress.current;
    const handoff = THREE.MathUtils.smoothstep(p, 0.16, 0.68);
    const globeOpacity = 1 - THREE.MathUtils.smoothstep(p, 0.22, 0.62);

    if (earthRef.current) {
      // Rotation starts from India and gently rotates eastward
      earthRef.current.rotation.y += delta * (0.05 + p * 0.08);
      earthRef.current.rotation.x = THREE.MathUtils.lerp(
        earthRef.current.rotation.x,
        INDIA_ROT_X - handoff * 0.15,
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
      0.035
    );
    state.camera.lookAt(0, 0, -handoff * 0.25);
  });

  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[-4, 2, 5]} intensity={2.3} color="#dceaff" />
      <directionalLight position={[4, -2, -4]} intensity={0.5} color="#f2a93b" />

      <group ref={earthRef} rotation={[INDIA_ROT_X, INDIA_ROT_Y, 0]}>
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

      <SpaceParticles />
    </>
  );
}

// ─── Map projection helpers ───────────────────────────────────────────────────

const MAP_BOUNDS = {
  minLongitude: 68,
  maxLongitude: 97.7,
  minLatitude: 6,
  maxLatitude: 37.5,
};
const MAP_GRATICULE_LATS = [
  { lat: 10, label: '10°N' },
  { lat: 15, label: '15°N' },
  { lat: 20, label: '20°N' },
  { lat: 25, label: '25°N' },
  { lat: 30, label: '30°N' },
  { lat: 35, label: '35°N' },
];

const MAP_GRATICULE_LONS = [
  { lon: 72, label: '72°E' },
  { lon: 76, label: '76°E' },
  { lon: 80, label: '80°E' },
  { lon: 84, label: '84°E' },
  { lon: 88, label: '88°E' },
  { lon: 92, label: '92°E' },
  { lon: 96, label: '96°E' },
];


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

/**
 * Per-state terrain colour palette — differentiates states for a realistic,
 * stratified look instead of a flat monochrome fill.
 */
function getStateStyle(name) {
  const n = (name || '').toLowerCase();
  if (/odisha|orissa/.test(n))
    return { fill: '#b87010', fillOpacity: 0.88, stroke: '#ffc94a', strokeWidth: 1.5, glow: true };
  if (/jharkhand/.test(n))
    return { fill: '#1e4a6a', fillOpacity: 0.95, stroke: '#2e6590', strokeWidth: 0.75 };
  if (/west bengal/.test(n))
    return { fill: '#1a4262', fillOpacity: 0.95, stroke: '#266082', strokeWidth: 0.75 };
  if (/chhattisgarh/.test(n))
    return { fill: '#1c4458', fillOpacity: 0.95, stroke: '#2a5e78', strokeWidth: 0.75 };
  if (/andhra/.test(n))
    return { fill: '#183a52', fillOpacity: 0.9, stroke: '#245070', strokeWidth: 0.65 };
  if (/telangana/.test(n))
    return { fill: '#173648', fillOpacity: 0.9, stroke: '#224e68', strokeWidth: 0.65 };
  if (/bihar/.test(n))
    return { fill: '#1a3858', fillOpacity: 0.88, stroke: '#254e75', strokeWidth: 0.65 };
  if (/maharashtra/.test(n))
    return { fill: '#152e45', fillOpacity: 0.85, stroke: '#1e4062', strokeWidth: 0.55 };
  if (/madhya/.test(n))
    return { fill: '#162e44', fillOpacity: 0.85, stroke: '#204060', strokeWidth: 0.55 };
  if (/gujarat/.test(n))
    return { fill: '#143040', fillOpacity: 0.82, stroke: '#1e4255', strokeWidth: 0.5 };
  if (/rajasthan/.test(n))
    return { fill: '#162c3e', fillOpacity: 0.8, stroke: '#1e3c52', strokeWidth: 0.5 };
  if (/karnataka/.test(n))
    return { fill: '#112840', fillOpacity: 0.82, stroke: '#1c3a55', strokeWidth: 0.5 };
  if (/tamil/.test(n))
    return { fill: '#0f2840', fillOpacity: 0.82, stroke: '#1a3c58', strokeWidth: 0.5 };
  if (/kerala/.test(n))
    return { fill: '#0e2840', fillOpacity: 0.82, stroke: '#183a58', strokeWidth: 0.5 };
  if (/uttar pradesh/.test(n))
    return { fill: '#152a40', fillOpacity: 0.82, stroke: '#1e3e58', strokeWidth: 0.5 };
  if (/punjab/.test(n))
    return { fill: '#142840', fillOpacity: 0.8, stroke: '#1c3c58', strokeWidth: 0.5 };
  if (/haryana/.test(n))
    return { fill: '#132640', fillOpacity: 0.8, stroke: '#1b3a58', strokeWidth: 0.5 };
  return { fill: '#0d1b2a', fillOpacity: 0.72, stroke: '#152030', strokeWidth: 0.4 };
}

/** Key neighbour-state labels shown on the About-section panel */
const NEIGHBOR_LABELS = [
  { name: 'JHARKHAND',    lon: 85.3, lat: 23.7 },
  { name: 'W. BENGAL',    lon: 88.0, lat: 23.0 },
  { name: 'CHHATTISGARH', lon: 81.4, lat: 21.8 },
  { name: 'ANDHRA P.',    lon: 79.3, lat: 15.6 },
];

// ─── IndiaMapOverlay — used inside Hero Drone3DCanvas ────────────────────────

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
      .then((r) => (r.ok ? r.json() : { features: [] }))
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
            <radialGradient id={`${mapId}-terrain`} cx="55%" cy="48%" r="65%">
              <stop offset="0%" stopColor="#1a3828" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#0d1b2a" stopOpacity="0" />
              <stop offset="100%" stopColor="#071220" stopOpacity="0.22" />
            </radialGradient>
            <pattern id={`${mapId}-grid`} width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#f2a93b" strokeWidth="0.3" opacity="0.3" />
            </pattern>
            <filter id={`${mapId}-glow`}>
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${mapId}-pinGlow`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="220" height="280" fill={`url(#${mapId}-terrain)`} />
          <rect x="0" y="0" width="220" height="280" fill={`url(#${mapId}-grid)`} opacity="0.42" />

          {mapData?.features.map((feature) => {
            const name = feature.properties?.NAME_1 ?? '';
            const style = getStateStyle(name);
            return (
              <path
                key={name}
                d={geometryToPath(feature.geometry)}
                fill={style.fill}
                fillOpacity={style.fillOpacity}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                strokeLinejoin="round"
                filter={style.glow ? `url(#${mapId}-glow)` : undefined}
              />
            );
          })}

          {/* Crosshair arms */}
          <line x1={target.x - 11} y1={target.y} x2={target.x - 6} y2={target.y} stroke="#f2a93b" strokeWidth="0.8" opacity="0.85" />
          <line x1={target.x + 6}  y1={target.y} x2={target.x + 11} y2={target.y} stroke="#f2a93b" strokeWidth="0.8" opacity="0.85" />
          <line x1={target.x} y1={target.y - 11} x2={target.x} y2={target.y - 6}  stroke="#f2a93b" strokeWidth="0.8" opacity="0.85" />
          <line x1={target.x} y1={target.y + 6}  x2={target.x} y2={target.y + 11} stroke="#f2a93b" strokeWidth="0.8" opacity="0.85" />

          {/* Pin dot */}
          <circle cx={target.x} cy={target.y} r="4.5" fill="#f2a93b" filter={`url(#${mapId}-pinGlow)`} />
          <circle cx={target.x} cy={target.y} r="2"   fill="#fff" />

          {/* Pulse rings */}
          {/* Full-span Target HQ Latitude & Longitude Crosshair Demarcation */}
              <g className="target-coord-demarcation">
                {/* Target Parallel (22.26° N) */}
                <line
                  x1="0"
                  y1={target.y}
                  x2="220"
                  y2={target.y}
                  stroke="#f2a93b"
                  strokeWidth="0.6"
                  strokeDasharray="3.5 2.5"
                  opacity="0.75"
                />
                {/* Latitude badge at right margin */}
                <rect x="182" y={target.y - 4.5} width="36" height="9" rx="1.5" fill="#06101a" stroke="#f2a93b" strokeWidth="0.6" opacity="0.95" />
                <text x="200" y={target.y + 1.8} textAnchor="middle" fill="#f2a93b" fontSize="4.2" fontFamily="monospace" fontWeight="bold">
                  22.26°N
                </text>

                {/* Target Meridian (84.90° E) */}
                <line
                  x1={target.x}
                  y1="0"
                  x2={target.x}
                  y2="280"
                  stroke="#f2a93b"
                  strokeWidth="0.6"
                  strokeDasharray="3.5 2.5"
                  opacity="0.75"
                />
                {/* Longitude badge at bottom margin */}
                <rect x={target.x - 18} y="246" width="36" height="9" rx="1.5" fill="#06101a" stroke="#f2a93b" strokeWidth="0.6" opacity="0.95" />
                <text x={target.x} y={252.4} textAnchor="middle" fill="#f2a93b" fontSize="4.2" fontFamily="monospace" fontWeight="bold">
                  84.90°E
                </text>
              </g>

              <circle cx={target.x} cy={target.y} r="6" fill="none" stroke="#f2a93b" strokeWidth="0.8">
            <animate attributeName="r" values="6;22;6" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={target.x} cy={target.y} r="6" fill="none" stroke="#f2a93b" strokeWidth="0.6">
            <animate attributeName="r" values="5;14;5" dur="2.2s" begin="0.55s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" begin="0.55s" repeatCount="indefinite" />
          </circle>

          {/* Leader dashed line */}
          <line
            x1={target.x}
            y1={target.y - 4}
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

// ─── IndiaMapPanel — About section, full animated version ────────────────────

/**
 * Self-contained India map panel with scroll-triggered staggered animation.
 * Uses IntersectionObserver internally — no external progress prop needed.
 *
 * Animation timeline:
 *   t=0ms    phase 1 — container fades in + map outline visible
 *   t=350ms  phase 2 — all state fills populate (terrain palette)
 *   t=700ms  phase 3 — Odisha lights amber with radial glow
 *   t=1050ms phase 4 — pin drops, crosshair draws, pulse rings start
 *   t=1260ms          coordinate typewriter begins
 *   t=1600ms phase 5 — HQ info card + status dot slide in
 *   t=1950ms phase 6 — HUD corner brackets fade in
 */
export function IndiaMapPanel() {
  const [mapData, setMapData] = useState(null);
  const [phase, setPhase] = useState(0);
  const [coordText, setCoordText] = useState('');
  const panelRef = useRef(null);
  const hasAnimated = useRef(false);
  const mapId = useId().replace(/:/g, '');

  const target = projectMapPoint(84.903671, 22.255471);
  const FULL_COORD = '22.255471° N  /  84.903671° E';

  // Load GeoJSON
  useEffect(() => {
    let cancelled = false;
    fetch('/maps/india-states-simplified.json')
      .then((r) => (r.ok ? r.json() : { features: [] }))
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

  // Staggered entry animation on scroll intersection
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        setPhase(1);
        const t2 = setTimeout(() => setPhase(2), 350);
        const t3 = setTimeout(() => setPhase(3), 700);
        const t4 = setTimeout(() => setPhase(4), 1050);
        const t5 = setTimeout(() => {
          let i = 0;
          const tw = setInterval(() => {
            i += 1;
            setCoordText(FULL_COORD.slice(0, i));
            if (i >= FULL_COORD.length) clearInterval(tw);
          }, 38);
        }, 1260);
        const t6 = setTimeout(() => setPhase(5), 1600);
        const t7 = setTimeout(() => setPhase(6), 1950);

        return () => [t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
      },
      { threshold: 0.22 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative w-full h-full overflow-hidden"
      style={{ minHeight: 340 }}
      role="img"
      aria-label="AkashVahini HQ location — NIT Rourkela, Odisha, India"
    >
      {/* HUD corner brackets */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-700"
        style={{ opacity: phase >= 6 ? 1 : 0 }}
      >
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber/70" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber/70" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber/70" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber/70" />
      </div>

      {/* Live status dot */}
      <div
        className="absolute top-3 left-3 z-20 flex items-center gap-1.5 transition-opacity duration-500"
        style={{ opacity: phase >= 5 ? 1 : 0 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-[8px] text-white/45 tracking-widest uppercase">Live · Operations</span>
      </div>

      {/* HQ info card integrated inside SVG below */}

      {/* SVG map */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'scale(1)' : 'scale(0.94)',
        }}
      >
        <svg
          viewBox="0 0 220 280"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          role="presentation"
        >
          <defs>
            {/* Terrain-style radial gradient — mimics satellite elevation shading */}
            <radialGradient id={`${mapId}-terrain`} cx="55%" cy="46%" r="68%">
              <stop offset="0%"   stopColor="#1c3d28" stopOpacity="0.24" />
              <stop offset="40%"  stopColor="#0d1b2a" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#060f1a" stopOpacity="0.32" />
            </radialGradient>
            {/* Odisha warm radial aura */}
            <radialGradient id={`${mapId}-odishaAura`} cx="50%" cy="50%" r="58%">
              <stop offset="0%"   stopColor="#f2a93b" stopOpacity="0.32" />
              <stop offset="55%"  stopColor="#f2a93b" stopOpacity="0.1"  />
              <stop offset="100%" stopColor="#f2a93b" stopOpacity="0"    />
            </radialGradient>
            {/* Tactical grid overlay */}
            <pattern id={`${mapId}-grid`} width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#f2a93b" strokeWidth="0.22" opacity="0.22" />
            </pattern>
            {/* State glow (Odisha only) */}
            <filter id={`${mapId}-stateGlow`} x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Pin glow */}
            <filter id={`${mapId}-pinGlow`} x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Scan-line clip boundary */}
            <clipPath id={`${mapId}-clip`}>
              <rect x="0" y="0" width="220" height="280" />
            </clipPath>
          </defs>

          {/* Backgrounds */}
          <rect x="0" y="0" width="220" height="280" fill="#06101a" />
          <rect x="0" y="0" width="220" height="280" fill={`url(#${mapId}-terrain)`} />
          {/* Tactical perimeter border frame */}
          <rect x="0.5" y="0.5" width="219" height="279" fill="none" stroke="#4a98ff" strokeWidth="0.5" opacity="0.35" />

          {/* Faint micro grid */}
          <rect x="0" y="0" width="220" height="280" fill={`url(#${mapId}-grid)`} opacity="0.08" />

          {/* Clear Geographic Graticule (Latitudes & Longitudes) */}
          <g className="geographic-graticule">
            {/* Latitude Parallels */}
            {MAP_GRATICULE_LATS.map(({ lat }) => {
              const y = projectMapPoint(80, lat).y;
              return (
                <g key={`lat-${lat}`}>
                  <line
                    x1="0"
                    y1={y}
                    x2="220"
                    y2={y}
                    stroke="#38bdf8"
                    strokeWidth="0.25"
                    strokeDasharray="2 3"
                    opacity="0.2"
                  />
                  {/* Left and Right edge ticks */}
                  <line x1="0" y1={y} x2="4" y2={y} stroke="#38bdf8" strokeWidth="0.65" opacity="0.6" />
                  <line x1="216" y1={y} x2="220" y2={y} stroke="#38bdf8" strokeWidth="0.65" opacity="0.6" />
                </g>
              );
            })}

            {/* Longitude Meridians */}
            {MAP_GRATICULE_LONS.map(({ lon }) => {
              const x = projectMapPoint(lon, 20).x;
              return (
                <g key={`lon-${lon}`}>
                  <line
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="280"
                    stroke="#38bdf8"
                    strokeWidth="0.25"
                    strokeDasharray="2 3"
                    opacity="0.2"
                  />
                  {/* Top and Bottom edge ticks */}
                  <line x1={x} y1="0" x2={x} y2="4" stroke="#38bdf8" strokeWidth="0.65" opacity="0.6" />
                  <line x1={x} y1="276" x2={x} y2="280" stroke="#38bdf8" strokeWidth="0.65" opacity="0.6" />
                </g>
              );
            })}
          </g>

          {/* Animated scan line */}
          {phase >= 2 && (
            <line
              x1="0" x2="220" y1="0" y2="0"
              stroke="#f2a93b"
              strokeWidth="0.5"
              opacity="0.35"
              clipPath={`url(#${mapId}-clip)`}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 285; 0 0"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </line>
          )}

          {/* State paths — terrain-palette fills */}
          {mapData?.features.map((feature) => {
            const name = feature.properties?.NAME_1 ?? '';
            const style = getStateStyle(name);
            const isOdisha = /odisha|orissa/i.test(name);
            const visible = isOdisha ? phase >= 3 : phase >= 2;
            return (
              <path
                key={name}
                d={geometryToPath(feature.geometry)}
                fill={visible ? style.fill : '#0a1825'}
                fillOpacity={visible ? style.fillOpacity : 0.4}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                strokeLinejoin="round"
                filter={style.glow && visible ? `url(#${mapId}-stateGlow)` : undefined}
                style={{ transition: 'fill 0.65s ease, fill-opacity 0.65s ease' }}
              />
            );
          })}

          {/* Odisha ambient radial glow overlay */}
          {phase >= 3 && (
            <ellipse
              cx={target.x}
              cy={target.y + 8}
              rx="44"
              ry="32"
              fill={`url(#${mapId}-odishaAura)`}
            />
          )}

          {/* Neighbour state labels */}
          {phase >= 2 &&
            NEIGHBOR_LABELS.map((label) => {
              const pt = projectMapPoint(label.lon, label.lat);
              return (
                <text
                  key={label.name}
                  x={pt.x}
                  y={pt.y}
                  textAnchor="middle"
                  fill="rgba(190,215,238,0.28)"
                  fontSize="4.8"
                  fontFamily="monospace"
                  letterSpacing="0.5"
                  style={{ userSelect: 'none' }}
                >
                  {label.name}
                </text>
              );
            })}

          {/* Odisha state label */}
          {phase >= 3 && (
            <text
              x={target.x - 2}
              y={target.y + 22}
              textAnchor="middle"
              fill="#f2a93b"
              fillOpacity="0.65"
              fontSize="5.5"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="0.9"
            >
              ODISHA
            </text>
          )}

          {/* Pin + crosshair + pulse rings */}
          {phase >= 4 && (
            <g>
              {/* Outer pulse ring */}
              <circle cx={target.x} cy={target.y} r="6" fill="none" stroke="#f2a93b" strokeWidth="0.8">
                <animate attributeName="r" values="5;28;5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.85;0;0.85" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Mid pulse ring (delayed) */}
              <circle cx={target.x} cy={target.y} r="5" fill="none" stroke="#f2a93b" strokeWidth="0.6">
                <animate attributeName="r" values="4;18;4" dur="3s" begin="0.75s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin="0.75s" repeatCount="indefinite" />
              </circle>

              {/* Rotating tactical reticle ring */}
              <circle
                cx={target.x}
                cy={target.y}
                r="10"
                fill="none"
                stroke="#f2a93b"
                strokeWidth="0.5"
                strokeDasharray="4 3"
                opacity="0.7"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${target.x} ${target.y}`}
                  to={`360 ${target.x} ${target.y}`}
                  dur="14s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Animated Crosshair arms with breathing pulse */}
              <g>
                <line x1={target.x - 14} y1={target.y} x2={target.x - 6} y2={target.y} stroke="#f2a93b" strokeWidth="0.9">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1={target.x + 6}  y1={target.y} x2={target.x + 14} y2={target.y} stroke="#f2a93b" strokeWidth="0.9">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1={target.x} y1={target.y - 14} x2={target.x} y2={target.y - 6}  stroke="#f2a93b" strokeWidth="0.9">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1={target.x} y1={target.y + 6}  x2={target.x} y2={target.y + 14} stroke="#f2a93b" strokeWidth="0.9">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Pin dot — glow + core */}
              <circle cx={target.x} cy={target.y} r="5.5" fill="#f2a93b" filter={`url(#${mapId}-pinGlow)`}>
                <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={target.x} cy={target.y} r="2.8" fill="#fff" />
              <circle cx={target.x} cy={target.y} r="1.1" fill="#f2a93b" />

              {/* Integrated Tactical Leader Line & HQ Callout Card with sequenced animations */}
              {phase >= 4 && (
                <g className="hq-callout-annotation">
                  {/* Animated Diagonal Leader Line from Pin to Shelf */}
                  <line
                    x1={target.x + 2}
                    y1={target.y - 6}
                    x2={133}
                    y2={49}
                    stroke="#f2a93b"
                    strokeWidth="0.9"
                    strokeDasharray="90"
                    strokeDashoffset="90"
                    opacity="0.9"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="90"
                      to="0"
                      dur="0.6s"
                      fill="freeze"
                    />
                  </line>
                  {/* Origin connector dot at pin */}
                  <circle cx={target.x + 2} cy={target.y - 6} r="1.4" fill="#f2a93b">
                    <animate attributeName="opacity" from="0" to="1" dur="0.2s" fill="freeze" />
                  </circle>

                  {/* Animated Horizontal Shelf Line (draws right after diagonal line reaches elbow) */}
                  <line
                    x1={133}
                    y1={49}
                    x2={133}
                    y2={49}
                    stroke="#f2a93b"
                    strokeWidth="1"
                    opacity="0.95"
                  >
                    <animate
                      attributeName="x2"
                      from="133"
                      to="217"
                      dur="0.4s"
                      begin="0.55s"
                      fill="freeze"
                    />
                  </line>
                  {/* Elbow connector dot */}
                  <circle cx={133} cy={49} r="1.8" fill="#f2a93b" opacity="0">
                    <animate attributeName="opacity" from="0" to="1" dur="0.2s" begin="0.55s" fill="freeze" />
                  </circle>
                  {/* Terminal tick on shelf */}
                  <line x1={217} y1={45} x2={217} y2={49} stroke="#f2a93b" strokeWidth="1" opacity="0">
                    <animate attributeName="opacity" from="0" to="0.95" dur="0.2s" begin="0.95s" fill="freeze" />
                  </line>

                  {/* Enlarged Tactical Callout Box (Fades in right as the shelf completes) */}
                  <g opacity="0">
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      dur="0.35s"
                      begin="0.8s"
                      fill="freeze"
                    />

                    {/* Background panel */}
                    <rect
                      x="133"
                      y="10"
                      width="84"
                      height="39"
                      rx="2.5"
                      fill="#06101a"
                      fillOpacity="0.94"
                      stroke="#f2a93b"
                      strokeWidth="0.75"
                      strokeOpacity="0.85"
                    />

                    {/* Corner accent brackets on callout box */}
                    <path d="M 133 16 L 133 10 L 139 10" fill="none" stroke="#f2a93b" strokeWidth="1" opacity="0.95" />
                    <path d="M 211 10 L 217 10 L 217 16" fill="none" stroke="#f2a93b" strokeWidth="1" opacity="0.95" />

                    {/* Live status pulsing green dot */}
                    <circle cx="139" cy="18" r="1.3" fill="#22c55e">
                      <animate attributeName="opacity" values="0.35;1;0.35" dur="1.2s" repeatCount="indefinite" />
                    </circle>

                    {/* Card Content — enlarged and crisp */}
                    <text
                      x="143"
                      y="19.2"
                      fill="#f2a93b"
                      fontSize="4.2"
                      fontFamily="monospace"
                      fontWeight="bold"
                      letterSpacing="0.8"
                    >
                      TARGET ACQUIRED
                    </text>

                    <text
                      x="138"
                      y="27.8"
                      fill="#ffffff"
                      fontSize="6.2"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      AkashVahini HQ
                    </text>

                    <text
                      x="138"
                      y="35.5"
                      fill="rgba(255,255,255,0.85)"
                      fontSize="4.4"
                      fontFamily="monospace"
                    >
                      NIT Rourkela Campus
                    </text>

                    <text
                      x="138"
                      y="42.8"
                      fill="#7dd3fc"
                      fontSize="4.1"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      Odisha · 22.26°N 84.90°E
                    </text>
                  </g>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Coordinate readout — typewriter effect */}
      <div
        className="absolute bottom-3 left-0 right-0 flex justify-center z-20"
        style={{ opacity: phase >= 4 ? 1 : 0, transition: 'opacity 0.35s ease' }}
      >
        <div className="font-mono text-[8.5px] tracking-[0.14em] text-amber bg-[#060f1a]/80 px-3 py-1.5 backdrop-blur-sm border border-amber/20 rounded-sm">
          {coordText}
          {coordText.length < FULL_COORD.length && phase >= 4 && (
            <span className="inline-block w-[6px] animate-pulse">_</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Fallback scene (no WebGL) ───────────────────────────────────────────────

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
          backgroundPosition: `${72 + progress * 34}% center`,
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

class WebGLSceneBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <FallbackScene progress={this.props.progress} />;
    }

    return this.props.children;
  }
}

export default function Drone3DCanvas({ progress = 0, className = '', showMap = false }) {
  const [webGLAvailable] = useState(() => {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    return Boolean(context);
  });

  return (
    <div className={`w-full h-full min-h-[420px] md:min-h-[520px] relative pointer-events-none ${className}`}>
      {webGLAvailable ? (
        <WebGLSceneBoundary progress={progress}>
          <WebGLScene progress={progress} />
        </WebGLSceneBoundary>
      ) : (
        <FallbackScene progress={progress} />
      )}
      {showMap && <IndiaMapOverlay progress={progress} />}
    </div>
  );
}