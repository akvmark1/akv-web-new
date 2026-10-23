import React from 'react';

export default function Footer() {

  return (
    <footer className="bg-navy border-t border-white/10 pt-16 pb-12 text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <a href="#hero" className="font-display font-bold text-xl tracking-wider flex items-center gap-1.5">
                <span>AKASH</span>
                <span className="text-amber">VAHINI</span>
              </a>
              <p className="mt-4 text-xs text-white/60 leading-relaxed max-w-sm">
                AI-powered drone systems for a safer and smarter tomorrow &mdash; engineered for high-stakes missions from disaster response to national infrastructure monitoring.
              </p>
            </div>
            <div className="mt-6 text-[11px] font-mono text-white/40">
              INCUBATED AT FTBI &middot; NIT ROURKELA
            </div>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono text-amber uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-2 text-xs text-white/70">
              <div>
                <a href="mailto:hello@akashvahini.in" className="hover:text-amber transition-colors">
                  hello@akashvahini.in
                </a>
              </div>
              <div>
                <a href="tel:+917992626539" className="hover:text-amber transition-colors">
                  +91 79926 26539
                </a>
              </div>
              <div>
                <span className="text-white/40">www.akashvahini.in</span>
              </div>
            </div>
          </div>

          {/* Location Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono text-amber uppercase tracking-wider mb-4">Location</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              TIIR Building, NIT Rourkela,<br />
              Odisha 769008, India
            </p>
            <div className="mt-4 text-[11px] font-mono text-accentgreen">
              &#x25CF; R&amp;D &amp; Flight Testing Lab
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono text-amber uppercase tracking-wider mb-4">Navigate</h4>
            <div className="flex flex-col space-y-2 text-xs text-white/70">
              <a href="#product" className="hover:text-amber transition-colors">SEERIA Drone</a>
              <a href="#technology" className="hover:text-amber transition-colors">Technology & GCS</a>
              <a href="#applications" className="hover:text-amber transition-colors">Applications</a>
              <a href="#about" className="hover:text-amber transition-colors">Company & Leadership</a>
              <a href="#contact" className="hover:text-amber transition-colors">Book a Call</a>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-mono gap-4">
          <div>
            &copy; 2026 AkashVahini Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-amber">Made for the sky.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
