import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'product', 'technology', 'applications', 'about', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product', id: 'product' },
    { name: 'Technology', href: '#technology', id: 'technology' },
    { name: 'Applications', href: '#applications', id: 'applications' },
    { name: 'Company', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-navy/60 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="font-display font-bold text-base md:text-lg lg:text-xl text-white tracking-wider flex items-center group flex-shrink-0"
          >
            <span>AKASH</span>
            <span className="text-amber group-hover:text-amber-glow transition-colors">VAHINI</span>
          </a>

          {/* Desktop Navigation Links — visible lg and up */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 text-[13px] xl:text-[13.5px] font-medium tracking-wide flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 relative py-1 whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-amber font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Compact nav for md screens (768–1023px) */}
          <div className="hidden md:flex lg:hidden items-center gap-3 text-[11.5px] font-medium tracking-wide flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 relative py-1 whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-amber font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Action Button — visible md and up */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <a
              href="#contact"
              className="text-[11px] lg:text-xs font-semibold px-3.5 lg:px-5 py-2 lg:py-2.5 bg-white text-navy rounded-sm hover:bg-amber hover:text-navy transition-all duration-200 flex items-center gap-1 lg:gap-1.5 shadow-md hover:shadow-amber/20 whitespace-nowrap"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle — visible below md */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2 focus:outline-none flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-2/95 border-b border-white/10 px-6 py-6 backdrop-blur-lg flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-white/5 flex items-center justify-between ${
                  activeSection === link.id ? 'text-amber' : 'text-white/80'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-white/30">#{link.id}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 text-center text-sm font-semibold py-3 bg-amber text-navy rounded-sm hover:bg-amber-glow"
            >
              Book a call &rarr;
            </a>
          </div>
        )}
      </nav>

      {/* Back to top / Home button */}
      <div className="fixed right-5 bottom-5 z-[60] group flex flex-col items-center gap-1.5">
        {/* Tooltip */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-[10px] tracking-widest text-amber/80 uppercase pointer-events-none">
          Home
        </span>
        <a
          href="#hero"
          aria-label="Back to home"
          title="Back to home"
          className="w-11 h-11 rounded-full flex items-center justify-center border border-amber/30 bg-white/5 backdrop-blur-md shadow-lg shadow-black/30 text-amber transition-all duration-300 hover:bg-amber/20 hover:border-amber/70 hover:shadow-amber/20 hover:shadow-xl hover:-translate-y-0.5 hover:scale-110 active:scale-95"
        >
          <ArrowUpRight className="h-4 w-4 -rotate-45" />
        </a>
      </div>
    </>
  );
}
