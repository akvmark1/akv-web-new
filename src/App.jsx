import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Product from './components/Product';
import Technology from './components/Technology';
import Applications from './components/Applications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-white selection:bg-amber selection:text-navy flex flex-col font-sans">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <About />
        <Product />
        <Technology />
        <Applications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
