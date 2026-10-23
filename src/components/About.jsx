import React, { useRef } from 'react';
import { Target, Award, Users, ChevronRight } from 'lucide-react';
import { IndiaMapPanel } from './Drone3DCanvas';

export default function About() {
  const aboutRef = useRef(null);

  const team = [
    {
      name: 'Akshay Kumar Gardia',
      role: 'CEO & Founder',
      bio: 'Visionary leader driving autonomous aerospace innovation and strategic mission deployments.',
      initials: 'AG',
      tag: 'Strategic Leadership & Vision',
    },
    {
      name: 'Purna Chandra Patra',
      role: 'Director & CTO',
      bio: 'Deep-tech pioneer specializing in aerial robotics, embedded AI edge pipelines, and systems integration.',
      initials: 'PP',
      tag: 'Robotics & AI Architecture',
    },
    {
      name: 'Om Prakash Samal',
      role: 'Director & CFO',
      bio: 'Financial strategist ensuring capital efficiency, regulatory scaling, and operational sustainability.',
      initials: 'OS',
      tag: 'Finance & Growth Strategy',
    },
  ];

  const pillars = [
    {
      title: 'Indigenous Innovation',
      desc: 'Engineered and fabricated in India with global tactical and commercial standards in mind.',
    },
    {
      title: 'Perception-First Architecture',
      desc: 'Drones constructed around real-time 26 TOPS neural edge processors rather than passive sensors.',
    },
    {
      title: 'Mission Critical Reliability',
      desc: 'Fail-safe telemetry, redundant GPS and sensor suites to guarantee zero mission-drop tolerance.',
    },
  ];

  return (
    <section id="about" ref={aboutRef} className="py-24 bg-navy relative border-t border-white/10 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-7 max-w-2xl lg:pt-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 bg-amber rounded-full" />
              <span>04 &middot; Institutional Backing &amp; Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Deep-tech, built for missions that can't afford to fail.
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
              AkashVahini Private Limited is an innovation-driven deep-tech startup building
              intelligent, autonomous drone platforms for critical real-world applications.
            </p>
          </div>

          <div className="lg:col-span-5 w-full max-w-[480px] justify-self-end">
            <div className="h-[340px] sm:h-[380px] lg:h-[440px] relative bg-[#06101a]/80 overflow-hidden border border-white/5 rounded-sm shadow-[inset_0_0_40px_rgba(242,169,59,0.04)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_48%,rgba(242,169,59,0.07),transparent_65%)]" />
              <IndiaMapPanel />
            </div>
          </div>
        </div>

        {/* Mission & Recognitions Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Mission Box */}
          <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-sm border border-white/10">
            <div className="flex items-center gap-3 text-amber font-mono text-xs uppercase tracking-wider mb-4">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Reliable, AI-powered aerial intelligence.
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Our mission is to deliver reliable, AI-powered aerial solutions that enhance safety,
              efficiency, and decision-making across industries &mdash; from disaster response and
              wildfire perimeter control to industrial transmission and powerline inspection.
            </p>
            <p className="text-white/70 leading-relaxed">
              We're building indigenous drone technology with global potential, backed by a
              passionate team with deep technical expertise in robotics, AI, and systems engineering.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-xs text-amber font-semibold mb-1">0{idx + 1}</span>
                  <h4 className="text-sm font-semibold text-white mb-1">{p.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recognitions Card */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 md:p-10 rounded-sm border border-white/10">
            <div>
              <div className="flex items-center gap-3 text-amber font-mono text-xs uppercase tracking-wider mb-4">
                <Award className="w-4 h-4" />
                <span>Recognitions &amp; Support</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                Backed by leading incubation &amp; national programs.
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-sm border border-white/5 hover:border-amber/30 transition-colors">
                  <div className="text-xs font-mono text-amber">INCUBATED AT</div>
                  <div className="text-base font-semibold text-white mt-0.5">
                    FTBI &middot; NIT Rourkela
                  </div>
                  <div className="text-xs text-white/50 mt-1">Foundation for Technology &amp; Business Incubation</div>
                </div>

                <div className="p-4 bg-white/5 rounded-sm border border-white/5 hover:border-amber/30 transition-colors">
                  <div className="text-xs font-mono text-amber">RECOGNITION</div>
                  <div className="text-base font-semibold text-white mt-0.5">
                    DPIIT Recognized Startup
                  </div>
                  <div className="text-xs text-white/50 mt-1">Ministry of Commerce and Industry, Govt. of India</div>
                </div>

                <div className="p-4 bg-white/5 rounded-sm border border-white/5 hover:border-amber/30 transition-colors">
                  <div className="text-xs font-mono text-amber">GRANT &amp; SUPPORT</div>
                  <div className="text-base font-semibold text-white mt-0.5">
                    MeitY Genesis EIR 2.0
                  </div>
                  <div className="text-xs text-white/50 mt-1">Ministry of Electronics and Information Technology</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>LOCATION: NIT ROURKELA, ODISHA</span>
              <span className="text-accentgreen">&#x25CF; ACTIVE OPERATIONS</span>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Our Team</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                The people behind the platform.
              </h3>
            </div>
            <p className="text-xs font-mono text-white/50 mt-2 sm:mt-0">
              EXPERTISE IN ROBOTICS, EMBEDDED AI &amp; AEROSPACE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-sm border border-white/10 hover:border-amber/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Avatar / Initials */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-navy-2 via-white/10 to-amber/20 border border-white/10 flex items-center justify-center font-display font-bold text-lg text-amber mb-5 group-hover:scale-105 transition-transform">
                    {member.initials}
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-amber transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-xs font-mono text-amber/90 font-medium mb-3">
                    {member.role}
                  </div>
                  <div className="text-xs font-mono text-white/40 mb-4 bg-white/5 py-1 px-2 rounded inline-block">
                    {member.tag}
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-6">{member.bio}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span className="font-mono text-[11px]">AkashVahini Core</span>
                  <a
                    href="#contact"
                    className="text-amber hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Connect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
