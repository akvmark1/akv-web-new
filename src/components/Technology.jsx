import React, { useState, useEffect } from 'react';
import {
  Activity,
  Compass,
  Cpu,
  Database,
  Radio,
  Wifi,
  BatteryCharging,
  Navigation,
  CheckCircle,
  Eye,
  Sliders,
  Terminal,
} from 'lucide-react';

export default function Technology() {
  const [altitude, setAltitude] = useState(142);
  const [speed, setSpeed] = useState(38);
  const [battery, setBattery] = useState(82);

  // Subtle real-time live telemetry simulation for GCS feel
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setSpeed((prev) => Math.max(30, Math.min(48, +(prev + (Math.random() * 1.5 - 0.75)).toFixed(1))));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    {
      name: 'PX4 Autopilot',
      category: 'Flight Control',
      desc: 'Industry standard open-source flight stack providing redundant inertial sensing and waypoint navigation.',
    },
    {
      name: 'Raspberry Pi 5',
      category: 'Companion Compute',
      desc: 'High-speed quad-core onboard companion processor coordinating communications, vision, and system bus.',
    },
    {
      name: 'Hailo AI Acceleration',
      category: 'Neural Processor',
      desc: '26 TOPS dedicated deep-learning accelerator running neural models with sub-10ms inference latency.',
    },
    {
      name: 'Sony IMX500 Sensor',
      category: 'Computer Vision',
      desc: 'Intelligent vision sensor with on-chip AI processing for immediate edge object tracking and classification.',
    },
    {
      name: 'MAVLink Telemetry',
      category: 'Protocol',
      desc: 'Bi-directional encrypted message protocol transferring packetized telemetry between UAV and ground base.',
    },
    {
      name: 'ONNX AI Models',
      category: 'Inference Engine',
      desc: 'Optimized neural weights for real-time person detection, thermal hotspot spotting, and structural defect mapping.',
    },
    {
      name: 'ZeroMQ Data Bridge',
      category: 'Messaging Middleware',
      desc: 'Ultra low-latency socket architecture distributing high-throughput camera frames and sensor streams.',
    },
    {
      name: 'SQLite Onboard Storage',
      category: 'Mission Blackbox',
      desc: 'Local structured database logging complete telemetry, mission markers, and flight history.',
    },
  ];

  return (
    <section id="technology" className="py-24 bg-navy relative border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-amber rounded-full" />
            <span>Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            One console. Full mission awareness.
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            SEERIA's custom Ground Control Station (GCS) software and onboard AI stack give operators
            live telemetry, mapping, and AI-driven insights in a single unified view.
          </p>
        </div>

        {/* Live GCS Telemetry Console Showcase */}
        <div className="glass-panel rounded-sm border border-white/15 p-6 md:p-8 mb-20 shadow-2xl relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-accentgreen font-semibold">
                <span className="w-2 h-2 rounded-full bg-accentgreen animate-ping" />
                LIVE TELEMETRY
              </span>
              <span className="text-white/40">|</span>
              <span className="text-white/80">SEERIA-GCS &middot; MISSION-04A</span>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-accentgreen" /> -54 dBm
              </span>
              <span className="flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-amber" /> {battery}%
              </span>
              <span className="text-amber bg-amber/10 px-2 py-0.5 rounded border border-amber/20">
                AI PAYLOAD NOMINAL
              </span>
            </div>
          </div>

          {/* Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Map & Visual Feed Display */}
            <div className="lg:col-span-8 bg-black/60 rounded border border-white/10 p-5 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono z-10">
                <span className="text-white/80 flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-amber rotate-45" />
                  MISSION MAP &middot; SECTOR 7 (ORBITAL GRID)
                </span>
                <span className="text-accentgreen bg-accentgreen/10 px-2 py-0.5 rounded">
                  RECORDING 4K 60FPS
                </span>
              </div>

              {/* Grid visual overlay simulating tactical radar HUD */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-64 h-64 border border-dashed border-amber/30 rounded-full flex items-center justify-center">
                  <div className="w-40 h-40 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-amber rounded-full animate-ping" />
                  </div>
                </div>
                <div className="absolute w-full h-[1px] bg-white/10" />
                <div className="absolute h-full w-[1px] bg-white/10" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 text-xs font-mono z-10">
                <div className="p-2 bg-navy/80 backdrop-blur rounded border border-white/5">
                  <div className="text-white/40">LATITUDE</div>
                  <div className="text-white font-semibold mt-0.5">22.2604&deg; N</div>
                </div>
                <div className="p-2 bg-navy/80 backdrop-blur rounded border border-white/5">
                  <div className="text-white/40">LONGITUDE</div>
                  <div className="text-white font-semibold mt-0.5">84.8536&deg; E</div>
                </div>
                <div className="p-2 bg-navy/80 backdrop-blur rounded border border-white/5">
                  <div className="text-white/40">HEADING</div>
                  <div className="text-white font-semibold mt-0.5">048&deg; (NE)</div>
                </div>
              </div>
            </div>

            {/* Live Metrics & Telemetry Readout */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="p-3.5 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-white/70 font-mono">
                    <Activity className="w-4 h-4 text-amber" />
                    <span>ALTITUDE</span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">{altitude} m</span>
                </div>

                <div className="p-3.5 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-white/70 font-mono">
                    <Sliders className="w-4 h-4 text-amber" />
                    <span>GROUND SPEED</span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">{speed} km/h</span>
                </div>

                <div className="p-3.5 bg-white/5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-white/70 font-mono">
                    <Radio className="w-4 h-4 text-accentgreen" />
                    <span>GPS LOCK</span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">18 SATS</span>
                </div>
              </div>

              {/* System Log Subpanel */}
              <div className="p-4 bg-navy-2/90 rounded border border-white/10 font-mono text-xs">
                <div className="text-white/40 mb-2 flex items-center justify-between">
                  <span>SYSTEM EVENT LOG</span>
                  <span className="text-[10px] text-accentgreen">ACTIVE</span>
                </div>
                <div className="space-y-1.5 text-white/80">
                  <div className="flex items-center gap-2 text-accentgreen">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>AI payload &mdash; nominal</span>
                  </div>
                  <div className="flex items-center gap-2 text-accentgreen">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Link &mdash; stable (AES-256)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Geofence &mdash; active (30 km)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div>
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technology Stack</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What's inside SEERIA.
            </h3>
            <p className="mt-2 text-white/60 text-sm">
              A carefully chosen hardware and software stack built for real-time perception and reliable flight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-sm border border-white/10 hover:border-amber/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-amber uppercase tracking-wider mb-1">
                    {tech.category}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber transition-colors">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">{tech.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[10px] font-mono text-white/30">
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
