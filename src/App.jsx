import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Researchers from './components/Researchers';
import Publications from './components/Publications';
import Footer from './components/Footer';
import ResearchGroup from './components/ResearchGroup';
import Bulletins from './components/Bulletins';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import ResearcherDetails from './components/ResearcherDetails';
import './App.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling or path scrolling
    const path = location.pathname.substring(1); // remove leading slash
    const targetId = path || (location.state && location.state.targetId);

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Short timeout to ensure render
        setTimeout(() => {
          // Adjust scroll position to account for fixed navbar
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Services />
      <About />
      <Researchers />
      <Publications />
      <ResearchGroup />
      <Courses />
      <Bulletins />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/researchers" element={<Home />} />
          <Route path="/publications" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/group" element={<Home />} />
          <Route path="/courses" element={<Home />} />
          <Route path="/bulletins" element={<Home />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/researcher/:id" element={<ResearcherDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
