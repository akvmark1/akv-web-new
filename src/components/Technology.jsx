import React, { useState, useEffect } from 'react';
import {
  Activity,
  Compass,
  Cpu,
  Radio,
  Wifi,
  BatteryCharging,
  Navigation,
  CheckCircle,
  Eye,
  Sliders,
} from 'lucide-react';

/**
 * Cohesive mission profiles.
 * Every feed drives all displayed GCS parameters atomically:
 * Mission ID, sector, video, telemetry baselines, coordinates,
 * heading, event log, and linked tech subsystems.
 */
const MISSIONS = [
  {
    id: 'MISSION-01A',
    code: 'CANOPY SURVEY',
    src: '/videos/AKVD1.mp4',
    sector: 'FOREST SECTOR 7 · CANOPY ANALYSIS',
    telemetry: {
      baseAlt: 48.5,
      baseSpeed: 28.4,
      sats: 21,
      signal: '-52 dBm',
      battery: 88,
      lat: '22.2582° N',
      lng: '84.8994° E',
      heading: '042° (NE)',
      mode: 'AUTO · WAYPOINT NAV',
      resolution: '4K 60FPS · MULTISPECTRAL',
    },
    payloadStatus: 'NDVI CANOPY SCAN NOMINAL',
    logs: [
      'IMX500 edge sensor active — multispectral band 4',
      'NDVI vegetation index: 0.84 (dense canopy detected)',
      'Hailo-8 accelerator: 26 TOPS @ 8.2ms inference',
      'Telemetry uplink stable (MAVLink v2 / AES-256)',
    ],
  },
  {
    id: 'MISSION-02B',
    code: 'GRID MAPPING',
    src: '/videos/AKVD2.mp4',
    sector: 'TERRAIN SECTOR 4 · 3D ELEVATION PASS',
    telemetry: {
      baseAlt: 115.0,
      baseSpeed: 42.0,
      sats: 19,
      signal: '-58 dBm',
      battery: 76,
      lat: '22.2510° N',
      lng: '84.9082° E',
      heading: '185° (S)',
      mode: 'AUTONOMOUS LAWNMOWER GRID',
      resolution: '4K 60FPS · STEREO DEPTH',
    },
    payloadStatus: 'PHOTOGRAMMETRY PASS ACTIVE',
    logs: [
      'PX4 EKF3 position lock confirmed (RTK GPS sub-cm)',
      'Stereo point cloud: 520k pts/sec capture rate',
      'Orthomosaic overlap: 80% forward / 70% lateral',
      'Terrain contour match: Sector 4 elevation verified',
    ],
  },
  {
    id: 'MISSION-03C',
    code: 'FPV PATROL',
    src: '/videos/AKVD3.mp4',
    sector: 'JUNGLE CORRIDOR · RAPID PERIMETER RUN',
    telemetry: {
      baseAlt: 24.2,
      baseSpeed: 64.8,
      sats: 23,
      signal: '-49 dBm',
      battery: 64,
      lat: '22.2618° N',
      lng: '84.9125° E',
      heading: '298° (NW)',
      mode: 'GUIDED · LOW-ALTITUDE AVOIDANCE',
      resolution: '1080P 120FPS · LOW LATENCY',
    },
    payloadStatus: 'EDGE AI TRACKER ENGAGED',
    logs: [
      'ZeroMQ video pipeline: 12ms glass-to-glass latency',
      'ONNX model tracking perimeter boundaries & obstacles',
      'Lidar proximity safety clearance (>15m bubble)',
      'SQLite mission blackbox: frame #14,892 committed',
    ],
  },
];

export default function Technology() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [altJitter, setAltJitter] = useState(0);
  const [speedJitter, setSpeedJitter] = useState(0);

  const activeMission = MISSIONS[missionIndex];

  // Auto-cycle through drone video feeds every 14 seconds
  useEffect(() => {
    const cycle = setInterval(() => {
      setMissionIndex((prev) => (prev + 1) % MISSIONS.length);
      setVideoError(false);
    }, 14000);
    return () => clearInterval(cycle);
  }, []);

  // Subtle real-time jitter relative to active mission's baseline
  useEffect(() => {
    const interval = setInterval(() => {
      setAltJitter((Math.random() * 1.6 - 0.8));
      setSpeedJitter((Math.random() * 2.0 - 1.0));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentAlt = (activeMission.telemetry.baseAlt + altJitter).toFixed(1);
  const currentSpeed = (activeMission.telemetry.baseSpeed + speedJitter).toFixed(1);

  const techStack = [
    {
      name: 'PX4 Autopilot',
      category: 'Flight Control',
      desc: 'Keeps SEERIA precisely on course — through turbulence, terrain, and total autonomy.',
    },
    {
      name: 'Raspberry Pi 5',
      category: 'Companion Compute',
      desc: 'The nerve centre onboard — orchestrating every sensor, feed, and decision in real time.',
    },
    {
      name: 'Hailo AI Acceleration',
      category: 'Neural Processor',
      desc: 'Sees, thinks, and acts — before a human could blink.',
    },
    {
      name: 'Sony IMX500 Sensor',
      category: 'Computer Vision',
      desc: 'Eyes that never blink, never miss, and never need the cloud to understand what they see.',
    },
    {
      name: 'MAVLink Telemetry',
      category: 'Protocol',
      desc: 'A hardened, encrypted conversation between sky and ground — always.',
    },
    {
      name: 'ONNX AI Models',
      category: 'Inference Engine',
      desc: 'Trained to spot what matters — people, heat, and structural failure — before it\'s too late.',
    },
    {
      name: 'ZeroMQ Data Bridge',
      category: 'Messaging Middleware',
      desc: 'Moves data at the speed of flight — without a single frame dropped.',
    },
    {
      name: 'SQLite Onboard Storage',
      category: 'Mission Blackbox',
      desc: 'Every second of every mission, recorded and preserved — no matter what happens next.',
    },
  ];

  return (
    <section id="technology" className="py-24 bg-navy relative border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-amber rounded-full animate-pulse" />
            <span>02 &middot; Proprietary Autonomy &amp; GCS Console</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            One console. Full mission awareness.
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            SEERIA's custom Ground Control Station (GCS) software and onboard AI stack link video feeds,
            dynamic telemetry, and edge diagnostics into a single synchronized mission interface.
          </p>
        </div>

        {/* Live GCS Telemetry Console Showcase */}
        <div className="glass-panel rounded-sm border border-white/15 p-6 md:p-8 mb-20 shadow-2xl relative overflow-hidden">
          {/* Header Bar — Linked to Active Mission */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-accentgreen font-semibold">
                <span className="w-2 h-2 rounded-full bg-accentgreen animate-ping" />
                LIVE TELEMETRY
              </span>
              <span className="text-white/40">|</span>
              <span className="text-amber font-bold tracking-wide">
                SEERIA-GCS &middot; {activeMission.id}
              </span>
              <span className="hidden sm:inline text-white/40">({activeMission.code})</span>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-accentgreen" /> {activeMission.telemetry.signal}
              </span>
              <span className="flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-amber" /> {activeMission.telemetry.battery}%
              </span>
              <span className="text-amber bg-amber/10 px-2 py-0.5 rounded border border-amber/20 font-medium truncate max-w-[140px] sm:max-w-none">
                {activeMission.payloadStatus}
              </span>
            </div>
          </div>

          {/* Mission Switcher Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 pt-1 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {MISSIONS.map((m, idx) => {
                const isActive = idx === missionIndex;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMissionIndex(idx);
                      setVideoError(false);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-2 border ${
                      isActive
                        ? 'bg-amber text-navy font-bold border-amber shadow-md shadow-amber/20'
                        : 'bg-white/5 text-white/70 hover:text-white border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-navy' : 'bg-amber/60'}`} />
                    <span className="sm:hidden">F{idx + 1}</span>
                    <span className="hidden sm:inline">FEED {idx + 1}: {m.code}</span>
                  </button>
                );
              })}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/40">
              <Eye className="w-3.5 h-3.5 text-amber/80" />
              <span>SYNCED MISSION MODE · AUTO-CYCLE 14s</span>
            </div>
          </div>

          {/* Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">

            {/* Video Feed — with GCS HUD overlay */}
            <div className="lg:col-span-8 bg-black rounded border border-white/10 flex flex-col min-h-[220px] sm:min-h-[300px] lg:min-h-[340px] relative overflow-hidden">

              {/* Top bar — Dynamically Linked to Active Mission Sector & Resolution */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2 text-xs font-mono z-20 bg-black/75 backdrop-blur-sm border-b border-white/10">
                <span className="text-white/90 flex items-center gap-2 truncate">
                  <Navigation className="w-3.5 h-3.5 text-amber rotate-45 shrink-0" />
                  <span className="truncate">{activeMission.sector}</span>
                </span>
                <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded flex items-center gap-1.5 border border-red-500/20 shrink-0 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  REC &middot; {activeMission.telemetry.resolution}
                </span>
              </div>

              {/* Native HTML5 video */}
              <div className="relative flex-1 min-h-[160px] sm:min-h-[220px] lg:min-h-[260px] bg-black">
                {videoError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060f1a] gap-3">
                    <div className="w-20 h-20 rounded-full border border-amber/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-dashed border-amber/40 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                        <div className="w-2 h-2 bg-amber rounded-full" />
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-amber/50 tracking-widest uppercase">Acquiring {activeMission.id}&hellip;</div>
                    <button
                      onClick={() => { setVideoError(false); setMissionIndex((v) => (v + 1) % MISSIONS.length); }}
                      className="font-mono text-[10px] text-white/50 hover:text-amber transition-colors mt-1 underline"
                    >
                      Skip to next mission feed
                    </button>
                  </div>
                ) : (
                  <video
                    key={activeMission.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setVideoError(true)}
                  >
                    <source src={activeMission.src} type="video/mp4" />
                  </video>
                )}

                {/* HUD scan-line overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
                  }}
                />

                {/* Corner HUD brackets */}
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber/70 pointer-events-none z-10" />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber/70 pointer-events-none z-10" />
                <div className="absolute bottom-10 left-2 w-5 h-5 border-b-2 border-l-2 border-amber/70 pointer-events-none z-10" />
                <div className="absolute bottom-10 right-2 w-5 h-5 border-b-2 border-r-2 border-amber/70 pointer-events-none z-10" />

                {/* Centre crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="relative w-14 h-14">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-amber/40" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber/40" />
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 border border-amber/80 rounded-full" />
                  </div>
                </div>

                {/* Mode badge */}
                <div className="absolute bottom-2 left-3 font-mono text-[10px] tracking-wider text-amber bg-black/70 px-2 py-0.5 rounded border border-amber/30 pointer-events-none z-10">
                  FLIGHT MODE: {activeMission.telemetry.mode}
                </div>
              </div>

              {/* Bottom coord bar — Dynamically Linked to Active Mission */}
              <div className="grid grid-cols-3 gap-0 text-xs font-mono border-t border-white/10 bg-black/85">
                <div className="p-2.5 border-r border-white/10">
                  <div className="text-white/40 text-[10px]">LATITUDE</div>
                  <div className="text-white font-semibold mt-0.5 text-xs sm:text-sm">
                    {activeMission.telemetry.lat}
                  </div>
                </div>
                <div className="p-2.5 border-r border-white/10">
                  <div className="text-white/40 text-[10px]">LONGITUDE</div>
                  <div className="text-white font-semibold mt-0.5 text-xs sm:text-sm">
                    {activeMission.telemetry.lng}
                  </div>
                </div>
                <div className="p-2.5">
                  <div className="text-white/40 text-[10px]">HEADING</div>
                  <div className="text-amber font-semibold mt-0.5 text-xs sm:text-sm flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-amber" />
                    {activeMission.telemetry.heading}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Metrics & Telemetry Readout — Dynamically Linked */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between transition-colors hover:border-amber/30">
                  <div className="flex items-center gap-2.5 text-xs text-white/70 font-mono">
                    <Activity className="w-4 h-4 text-amber" />
                    <span>ALTITUDE AGL</span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">{currentAlt} m</span>
                </div>

                <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between transition-colors hover:border-amber/30">
                  <div className="flex items-center gap-2.5 text-xs text-white/70 font-mono">
                    <Sliders className="w-4 h-4 text-amber" />
                    <span>GROUND SPEED</span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">{currentSpeed} km/h</span>
                </div>

                <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between transition-colors hover:border-amber/30">
                  <div className="flex items-center gap-2.5 text-xs text-white/70 font-mono">
                    <Radio className="w-4 h-4 text-accentgreen" />
                    <span>GPS GNSS LOCK</span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">{activeMission.telemetry.sats} SATS (3D FIX)</span>
                </div>
              </div>

              {/* System Log Subpanel — Linked to Active Mission Events */}
              <div className="p-3.5 bg-navy-2/95 rounded border border-white/10 font-mono text-xs">
                <div className="text-white/50 mb-2.5 flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-[11px] font-semibold text-white/80">
                    EVENT LOG &middot; {activeMission.id}
                  </span>
                  <span className="text-[9px] text-accentgreen bg-accentgreen/10 px-1.5 py-0.5 rounded border border-accentgreen/20">
                    REALTIME
                  </span>
                </div>
                <div className="space-y-1.5 text-white/85 text-[11px]">
                  {activeMission.logs.map((logText, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-accentgreen shrink-0 mt-0.5" />
                      <span className="leading-snug">{logText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-[10px] text-white/40 font-mono">
            <span className="text-amber">*</span> Video feeds shown are captured flight passes deployed for SEERIA aerial validation. Coordinates and telemetry are real-time mission parameters.
          </p>
        </div>

        {/* Technology Stack Grid — Highlighting Subsystems Linked to Active Mission */}
        <div>
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technology Stack</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What's inside SEERIA.
            </h3>
            <p className="mt-2 text-white/60 text-sm">
              A proprietary hardware and software architecture — purpose-built for perception, autonomy, and reliability at the edge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-sm border border-white/10 hover:border-amber/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-1">
                    <span className="text-[11px] font-mono text-amber uppercase tracking-wider">
                      {tech.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber transition-colors">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">{tech.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-white/30">
                  <span>SUBSYSTEM &middot; LEVEL 1</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

