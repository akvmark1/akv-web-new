import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import Drone3DCanvas from './Drone3DCanvas';

export default function Hero() {
  const heroRef = useRef(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    const updateSceneProgress = () => {
      if (!heroRef.current) return;

      const { top, height } = heroRef.current.getBoundingClientRect();
      const progress = (window.innerHeight * 0.14 - top) / Math.max(height * 0.78, 1);
      setSceneProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateSceneProgress, { passive: true });
    window.addEventListener('resize', updateSceneProgress);

    return () => {
      window.removeEventListener('scroll', updateSceneProgress);
      window.removeEventListener('resize', updateSceneProgress);
    };
  }, []);

  const stats = [
    { value: '40 KG', label: 'Payload capacity', sub: 'Modular sensor/cargo bay' },
    { value: '30+ MIN', label: 'Flight time', sub: 'Hybrid power endurance' },
    { value: '30 KM', label: 'Operating range', sub: 'Extended BVLOS control' },
    { value: '105 KG', label: 'Max takeoff weight', sub: 'Heavy-lift industrial frame' },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between bg-navy overflow-hidden"
    >
      {/* Background ambient aerospace glow & radar grids */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-2/80 via-navy to-navy pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-accentgreen/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="absolute inset-0 z-[1] opacity-75" aria-hidden="true">
        <Drone3DCanvas progress={sceneProgress} className="md:translate-x-[18%]" />
      </div>

      <div className="max-w-[1240px] w-full mx-auto px-6 md:px-10 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start pt-6">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.08] mb-6">
              Where intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-glow to-white">
                meets the sky.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/70 max-w-xl font-normal leading-relaxed mb-8">
              AI-powered drone systems built for a safer, smarter tomorrow &mdash; from disaster
              response and tactical situational awareness to critical industrial inspection.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 bg-amber text-navy font-semibold text-sm rounded-sm hover:bg-amber-glow transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-amber/20 text-center"
              >
                Book a call
              </a>
              <a
                href="#product"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium text-sm rounded-sm transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Explore SEERIA</span>
                <ArrowRight className="w-4 h-4 text-amber group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Incubation Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-xs text-white/60 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accentgreen" />
                <span>FTBI &middot; NIT Rourkela</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber" />
                <span>DPIIT Startup Program</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber/70" />
                <span>MeitY Genesis EIR 2.0</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hero Bottom Stats Strip */}
      <div className="max-w-[1240px] w-full mx-auto px-6 md:px-10 relative z-10 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel rounded-sm border border-white/10">
          {stats.map((s, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index !== stats.length - 1 ? 'md:border-r md:border-white/10' : ''
              } px-2 md:px-4`}
            >
              <span className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight flex items-baseline gap-1">
                {s.value}
              </span>
              <span className="text-xs md:text-sm font-semibold text-amber mt-0.5">
                {s.label}
              </span>
              <span className="text-[11px] text-white/50 font-mono mt-0.5">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
