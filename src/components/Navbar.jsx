import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoPath = i18n.language === 'en'
    ? `${import.meta.env.BASE_URL}ingles_color.svg`
    : `${import.meta.env.BASE_URL}logo_color.svg`;

  const handleNav = (id) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (!id) {
        navigate('/');
      } else {
        navigate('/', { state: { targetId: id } });
      }
    }
  };

  const NavItem = ({ id, label, isBtn = false }) => (
    <li>
      <a
        href={`#${id}`}
        className={isBtn ? "btn btn-primary" : ""}
        onClick={(e) => {
          e.preventDefault();
          handleNav(id);
        }}
      >
        {label}
      </a>
    </li>
  );

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo" onClick={() => handleNav(null)}>
          <img key={logoPath} src={logoPath} alt="CECIMIB Logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          <NavItem id="services" label={t('navbar.services')} />
          <NavItem id="about" label={t('navbar.about')} />
          <NavItem id="researchers" label={t('navbar.researchers')} />
          <NavItem id="publications" label={t('navbar.publications')} />

          {/* New Pages converted to Scroll Sections */}
          <NavItem id="group" label={t('navbar.group')} />
          <NavItem id="courses" label={t('navbar.courses')} />
          <NavItem id="bulletins" label={t('navbar.bulletins')} />

          <NavItem id="contact" label={t('navbar.contact')} isBtn={true} />
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
              <li><a href="#services" onClick={(e) => { e.preventDefault(); handleNav('services'); }}>{t('navbar.services')}</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>{t('navbar.about')}</a></li>
              <li><a href="#researchers" onClick={(e) => { e.preventDefault(); handleNav('researchers'); }}>{t('navbar.researchers')}</a></li>
              <li><a href="#publications" onClick={(e) => { e.preventDefault(); handleNav('publications'); }}>{t('navbar.publications')}</a></li>

              <li><a href="#group" onClick={(e) => { e.preventDefault(); handleNav('group'); }}>{t('navbar.group')}</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleNav('courses'); }}>{t('navbar.courses')}</a></li>
              <li><a href="#bulletins" onClick={(e) => { e.preventDefault(); handleNav('bulletins'); }}>{t('navbar.bulletins')}</a></li>

              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>{t('navbar.contact')}</a></li>
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
          padding: 1rem 0;
          background-color: transparent;
        }

        .navbar.scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow);
          padding: 0.8rem 0;
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
          height: 40px; 
          width: auto;
          transition: height 0.3s ease;
        }
        
        @media (min-width: 769px) {
            .logo img {
                height: 55px; 
            }
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          list-style: none;
          align-items: center;
        }

        .nav-links a {
          font-weight: 500;
          color: var(--color-text);
          font-size: 0.9rem;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .nav-links a.btn-primary {
          color: white;
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        .nav-links a.btn-primary:hover {
          color: white; 
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
          max-height: 80vh;
          overflow-y: auto;
        }

        .nav-links-mobile {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        
        .nav-links-mobile a {
            color: var(--color-text);
            text-decoration: none;
            font-weight: 500;
        }

        @media (max-width: 1024px) {
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
