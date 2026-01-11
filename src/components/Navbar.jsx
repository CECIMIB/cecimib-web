import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo">
          <img src={`${import.meta.env.BASE_URL}assets/logo.svg`} alt="CECIMIB Logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#about">Nosotros</a></li>
          <li><a href="#researchers">Equipo</a></li>
          <li><a href="#contact" className="btn btn-primary">Contáctanos</a></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="nav-links-mobile">
              <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Servicios</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Nosotros</a></li>
              <li><a href="#researchers" onClick={() => setIsMenuOpen(false)}>Equipo</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contáctanos</a></li>
            </ul>
          </div>
        )}
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1.5rem 0;
          background-color: transparent;
        }

        .navbar.scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow);
          padding: 1rem 0;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo img {
          height: 40px; /* Adjust based on logo aspect ratio */
          width: auto;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          align-items: center;
        }

        .nav-links a {
          font-weight: 500;
          color: var(--color-text);
          font-size: 0.95rem;
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        .mobile-toggle {
          display: none;
          cursor: pointer;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: white;
          padding: 1rem;
          box-shadow: var(--shadow);
        }

        .nav-links-mobile {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
