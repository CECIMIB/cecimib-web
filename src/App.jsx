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
import './App.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a targetId in state to scroll to
    if (location.state && location.state.targetId) {
      const element = document.getElementById(location.state.targetId);
      if (element) {
        // Short timeout to ensure render
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
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
          <Route path="/group" element={<ResearchGroup />} />
          <Route path="/bulletins" element={<Bulletins />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course-details" element={<CourseDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
