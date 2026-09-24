import React from 'react';
import {
  Cpu,
  Layers,
  Radio,
  Weight,
  Terminal,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function Product() {
  const features = [
    {
      icon: Cpu,
      title: 'Intelligent AI payload',
      desc: 'Onboard neural AI processing at 26 TOPS for real-time edge detection, spatial tracking, and instant target classification.',
    },
    {
      icon: Layers,
      title: 'Multi-sensor suite',
      desc: 'Synchronized optical zoom camera, thermal infrared imaging, and LiDAR payload integrations for full spectrum coverage.',
    },
    {
      icon: Radio,
      title: 'Long range & endurance',
      desc: 'Hybrid power architecture engineered for 30+ minutes of continuous hovering and transit across a 30 km operational radius.',
    },
    {
      icon: Weight,
      title: 'Heavy lift capability',
      desc: 'Robust high-torque propulsion delivering up to 40 kg effective payload capacity for emergency supply drops or sensors.',
    },
    {
      icon: Terminal,
      title: 'Custom GCS software',
      desc: 'Mission command console with real-time waypoint orchestration, 3D spatial telemetry, geo-fencing, and live video stream.',
    },
    {
      icon: Shield,
      title: 'Reliable & rugged',
      desc: 'Aviation-grade carbon composite airframe rated for extreme meteorological conditions, high winds, and moisture resistance.',
    },
  ];

  const specs = [
    { label: 'Payload Capacity', val: '40 kg' },
    { label: 'Max Takeoff Weight', val: '105 kg' },
    { label: 'Flight Range (BVLOS)', val: '30 km' },
    { label: 'Standard Flight Time', val: '30+ minutes' },
    { label: 'AI Compute Power', val: '26 TOPS (Hailo-8)' },
    { label: 'Autopilot System', val: 'PX4 Industrial Redundant' },
    { label: 'Camera Sensor', val: 'Sony IMX500 AI + Thermal' },
    { label: 'Telemetry Datalink', val: 'Encrypted MAVLink / ZeroMQ' },
  ];

  return (
    <section id="product" className="py-24 bg-navy-2 relative border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-amber rounded-full" />
            <span>Our Product &mdash; SEERIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            A heavy-lift hybrid drone, built around perception.
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            SEERIA carries a heavy sensor and compute payload while staying stable, efficient, and
            controllable in demanding field conditions &mdash; from wildfire perimeters to offshore
            transmission corridors.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="glass-panel p-8 rounded-sm border border-white/10 hover:border-amber/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-amber mb-6 group-hover:bg-amber group-hover:text-navy transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-white/30 group-hover:text-amber/80 transition-colors">
                  <span>SPEC &middot; SEERIA v2.4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner / Image & Technical Specs */}
        <div className="glass-panel rounded-sm border border-white/10 p-8 md:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Drone Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-navy">
                <img
                  src="/images/img_1.jpg"
                  alt="SEERIA Drone Flight Test"
                  className="w-full h-[320px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-700 opacity-90"
                  onError={(e) => {
                    // Fallback to high tech abstract graphics if image is missing
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 bg-navy/80 backdrop-blur-md px-3 py-2 border border-white/10 rounded">
                  <span>FRAME: CARBON HYBRID MULTI-ROTOR</span>
                  <span className="text-amber">AI VISION READY</span>
                </div>
              </div>
            </div>

            {/* Technical Specification Matrix */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-amber tracking-wider uppercase mb-2">
                  Technical Specifications
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Engineered for missions that demand precision.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {specs.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/5 border border-white/5 rounded flex flex-col"
                    >
                      <span className="text-xs font-mono text-white/40">{item.label}</span>
                      <span className="text-sm font-semibold text-white mt-0.5">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href="#technology"
                  className="px-6 py-3 bg-amber text-navy font-semibold text-sm rounded-sm hover:bg-amber-glow transition-all flex items-center gap-2"
                >
                  <span>See Ground Control Station</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium text-sm rounded-sm border border-white/20 transition-all"
                >
                  Request Technical Whitepaper
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
