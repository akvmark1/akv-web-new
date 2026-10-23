import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Product from './components/Product';
import Technology from './components/Technology';
import Applications from './components/Applications';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-white selection:bg-amber selection:text-navy flex flex-col font-sans">
      <Navigation />
      <main className="flex-grow">
        {/* 01. Hook & Value Prop */}
        <Hero />
        {/* 02. Flagship Hardware Platform */}
        <Product />
        {/* 03. Proprietary Software & GCS Autonomy */}
        <Technology />
        {/* 04. Commercial ROI & Industry Verticals */}
        <Applications />
        {/* 05. Sovereign Hub, Credibility & Leadership */}
        <About />
        {/* 06. Commercial Action & Demo Booking */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
