import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Researchers from './components/Researchers';
import Publications from './components/Publications';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Researchers />
      <Publications />
      <Footer />
    </div>
  );
}

export default App;
