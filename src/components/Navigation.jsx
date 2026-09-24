import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'product', 'technology', 'applications', 'contact'];
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
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Product', href: '#product', id: 'product' },
    { name: 'Technology', href: '#technology', id: 'technology' },
    { name: 'Applications', href: '#applications', id: 'applications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-navy/60 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="font-display font-bold text-lg md:text-xl text-white tracking-wider flex items-center group"
        ><span>AKASH</span><span className="text-amber group-hover:text-amber-glow transition-colors">VAHINI</span></a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[13.5px] font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 relative py-1 ${
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

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="text-xs font-semibold px-5 py-2.5 bg-white text-navy rounded-sm hover:bg-amber hover:text-navy transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-amber/20"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white p-2 focus:outline-none"
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
  );
}
