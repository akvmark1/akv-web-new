import React from 'react';
import {
  LifeBuoy,
  Flame,
  Zap,
  SunMedium,
  HardHat,
  Users2,
  ArrowRight,
} from 'lucide-react';

export default function Applications() {
  const apps = [
    {
      icon: LifeBuoy,
      title: 'Search & rescue',
      desc: 'Locate missing persons, coordinate search patterns, and deliver essential supplies in disaster zones, even in zero-visibility conditions.',
      tag: 'Disaster Management',
    },
    {
      icon: Flame,
      title: 'Fire detection & monitoring',
      desc: 'Early thermal wildfire detection, perimeter propagation modeling, and real-time situational awareness across inaccessible forested terrain.',
      tag: 'Emergency Response',
    },
    {
      icon: Zap,
      title: 'Powerline inspection',
      desc: 'Autonomous high-voltage transmission line and tower inspection, thermal hotspot identification, and automated corona discharge detection.',
      tag: 'Energy Infrastructure',
    },
    {
      icon: SunMedium,
      title: 'Solar panel inspection',
      desc: 'High-speed radiometric thermography scanning to detect micro-cracks, defective cell strings, and bypass diode failures at solar utility scale.',
      tag: 'Renewable Utilities',
    },
    {
      icon: HardHat,
      title: 'Construction monitoring',
      desc: 'Periodic high-density volumetric surveys, earthwork progress verification, BIM integration, and site safety analytics over time.',
      tag: 'Civil Engineering',
    },
    {
      icon: Users2,
      title: 'Crowd monitoring & security',
      desc: 'Real-time density estimation, perimeter intrusion tripwires, and wide-area surveillance for large civic gatherings and critical sites.',
      tag: 'Public Safety',
    },
  ];

  const whyPillars = [
    {
      num: '01',
      title: 'Indigenous innovation with global potential',
      desc: 'Designed, engineered, and assembled at NIT Rourkela with sovereignty of hardware and software stacks.',
    },
    {
      num: '02',
      title: 'AI-powered decision making at the edge',
      desc: 'Zero reliance on cloud processing; neural vision networks execute immediately on 26 TOPS onboard hardware.',
    },
    {
      num: '03',
      title: 'Custom-built GCS for mission-specific insights',
      desc: 'Tailor-made ground consoles providing operators with instantaneous intelligence instead of raw data dumps.',
    },
    {
      num: '04',
      title: 'Strong focus on reliability, safety, and scalability',
      desc: 'Multiple redundant avionics, fail-to-land protocols, and military-grade encryption safeguards.',
    },
    {
      num: '05',
      title: 'Passionate team with deep technical expertise',
      desc: 'Direct pair-programming and deployment support from veteran robotics and AI researchers.',
    },
  ];

  return (
    <section id="applications" className="py-24 bg-navy-2 relative border-t border-white/10">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accentgreen/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 bg-amber rounded-full" />
            <span>03 &middot; Commercial Verticals &amp; Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Built for the missions that matter most.
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            From disaster zones to complex industrial corridors, SEERIA adapts seamlessly to
            critical, high-stakes environments.
          </p>
        </div>

        {/* 6 Applications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {apps.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 md:p-8 rounded-sm border border-white/10 hover:border-amber/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-navy transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-white/40 tracking-wider uppercase">
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{app.desc}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber font-medium">
                  <span>Explore application</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Why AkashVahini Feature Strip */}
        <div className="glass-panel rounded-sm border border-white/10 p-8 md:p-12">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-2">
              <span>Why AkashVahini</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Engineered in India, for missions worldwide.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPillars.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/5 rounded-sm border border-white/5 hover:border-amber/30 transition-all flex flex-col"
              >
                <div className="font-mono text-xl font-bold text-amber mb-3">{item.num}</div>
                <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
            <div className="p-6 bg-gradient-to-br from-amber/20 to-navy-2 rounded-sm border border-amber/30 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-amber font-semibold uppercase">
                  PARTNER WITH US
                </span>
                <h4 className="text-lg font-bold text-white mt-2 mb-2">
                  Have a specific mission requirement?
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  We custom-tailor payload gimbals and GCS intelligence pipelines for specialized industrial operations.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber hover:text-white transition-colors"
              >
                <span>Talk with an engineer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
