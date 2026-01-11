import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine logo path based on language. 
  // Assumption: Assumes logo_es.svg and logo_en.svg exist if they are language specific, 
  // otherwise defaults to logo.svg if they don't (which might need a fallback check, but here we perform simple logic).
  // Actually, better to check if it exists or just rely on the user adding them.
  // For now, I will assume the standard logo `logo.svg` is for Spanish (or default) and let's try to see if I should switch names.
  // The user requested: "ten en cuenta que los logos tambien están en esos dos idiomas, por lo que tambien deberian cambiar"
  const logoPath = i18n.language === 'en'
    ? `${import.meta.env.BASE_URL}ingles_color.svg`
    : `${import.meta.env.BASE_URL}logo_color.svg`;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Key for forcing re-render if needed, though src change should handle it */}
          <img key={logoPath} src={logoPath} alt="CECIMIB Logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          <li><a href="#services">{t('navbar.services')}</a></li>
          <li><a href="#about">{t('navbar.about')}</a></li>
          <li><a href="#researchers">{t('navbar.researchers')}</a></li>
          <li><a href="#publications">{t('navbar.publications')}</a></li>
          <li><a href="#contact" className="btn btn-primary">{t('navbar.contact')}</a></li>
          <li><LanguageSwitcher /></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle-group">
          <div className="mobile-lang-switch">
            <LanguageSwitcher />
          </div>
          <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="nav-links-mobile">
              <li><a href="#services" onClick={() => setIsMenuOpen(false)}>{t('navbar.services')}</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>{t('navbar.about')}</a></li>
              <li><a href="#researchers" onClick={() => setIsMenuOpen(false)}>{t('navbar.researchers')}</a></li>
              <li><a href="#publications" onClick={() => setIsMenuOpen(false)}>{t('navbar.publications')}</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>{t('navbar.contact')}</a></li>
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

        .logo {
          cursor: pointer;
        }

        .logo img {
          height: 45px; /* Mobile default */
          width: auto;
          transition: height 0.3s ease;
        }
        
        @media (min-width: 769px) {
            .logo img {
                height: 60px; /* Intermediate size as requested */
            }
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

        /* Fix specifity issue for the primary button in navbar */
        .nav-links a.btn-primary {
          color: white;
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        .nav-links a.btn-primary:hover {
          color: white; /* Keep white on hover or define a slight variation if needed */
        }

        .mobile-toggle-group {
            display: none;
            align-items: center;
            gap: 1rem;
        }

        .mobile-toggle {
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
          .mobile-toggle-group {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
