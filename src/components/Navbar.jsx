import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Desktop dropdown state
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDesktopDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 200);
  };

  // Mobile dropdown state
  const [mobileDropdowns, setMobileDropdowns] = useState({});

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
    setDesktopDropdown(null);
    setMobileDropdowns({}); // Close all mobile dropdowns
    if (!id) {
      navigate('/');
    } else {
      navigate(`/${id}`);
    }
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

  const TopLevelItem = ({ id, label, isBtn = false }) => (
    <NavItem id={id} label={label} isBtn={isBtn} />
  );

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo" onClick={() => handleNav(null)}>
          <img key={logoPath} src={logoPath} alt="CECIMIB Logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">

          {/* Services - Standalone */}
          <TopLevelItem id="services" label={t('navbar.services')} />

          {/* Institutional Dropdown */}
          <li
            className="desktop-dropdown-container"
            onMouseEnter={() => handleMouseEnter('institutional')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="dropdown-toggle">
              {t('navbar.institutional')} <ChevronDown size={16} />
            </button>
            {desktopDropdown === 'institutional' && (
              <div className="dropdown-menu"
                onMouseEnter={() => handleMouseEnter('institutional')}
                onMouseLeave={handleMouseLeave}>
                <a onClick={() => handleNav('about')}>{t('navbar.about')}</a>
                <a onClick={() => handleNav('researchers')}>{t('navbar.researchers')}</a>
                <a onClick={() => handleNav('group')}>{t('navbar.group')}</a>
              </div>
            )}
          </li>

          {/* Research Dropdown */}
          <li
            className="desktop-dropdown-container"
            onMouseEnter={() => handleMouseEnter('research')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="dropdown-toggle">
              {t('navbar.research')} <ChevronDown size={16} />
            </button>
            {desktopDropdown === 'research' && (
              <div className="dropdown-menu"
                onMouseEnter={() => handleMouseEnter('research')}
                onMouseLeave={handleMouseLeave}>
                <a onClick={() => handleNav('publications')}>{t('navbar.publications')}</a>
                <a onClick={() => handleNav('repositories')}>{t('navbar.repositories')}</a>
                <a onClick={() => handleNav('bulletins')}>{t('navbar.bulletins')}</a>
              </div>
            )}
          </li>

          {/* Courses - Standalone */}
          <TopLevelItem id="courses" label={t('navbar.courses')} />

          {/* Contact - Standalone */}
          <TopLevelItem id="contact" label={t('navbar.contact')} isBtn={true} />

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

              {/* Mobile Institutional Dropdown */}
              <li className="mobile-dropdown-item">
                <div className="mobile-dropdown-header" onClick={() => toggleMobileDropdown('institutional')}>
                  <span>{t('navbar.institutional')}</span>
                  <ChevronDown size={16} className={mobileDropdowns['institutional'] ? 'rotate-180' : ''} />
                </div>
                {mobileDropdowns['institutional'] && (
                  <ul className="mobile-submenu">
                    <li><a onClick={() => handleNav('about')}>{t('navbar.about')}</a></li>
                    <li><a onClick={() => handleNav('researchers')}>{t('navbar.researchers')}</a></li>
                    <li><a onClick={() => handleNav('group')}>{t('navbar.group')}</a></li>
                  </ul>
                )}
              </li>

              {/* Mobile Research Dropdown */}
              <li className="mobile-dropdown-item">
                <div className="mobile-dropdown-header" onClick={() => toggleMobileDropdown('research')}>
                  <span>{t('navbar.research')}</span>
                  <ChevronDown size={16} className={mobileDropdowns['research'] ? 'rotate-180' : ''} />
                </div>
                {mobileDropdowns['research'] && (
                  <ul className="mobile-submenu">
                    <li><a onClick={() => handleNav('publications')}>{t('navbar.publications')}</a></li>
                    <li><a onClick={() => handleNav('repositories')}>{t('navbar.repositories')}</a></li>
                    <li><a onClick={() => handleNav('bulletins')}>{t('navbar.bulletins')}</a></li>
                  </ul>
                )}
              </li>

              <li><a href="#courses" onClick={(e) => { e.preventDefault(); handleNav('courses'); }}>{t('navbar.courses')}</a></li>

              <li className="mobile-contact-btn">
                <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>{t('navbar.contact')}</a>
              </li>
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
          gap: 1.5rem; /* Increased spacing between top-level items */
          list-style: none;
          align-items: center;
        }

        .nav-links a, .dropdown-toggle {
          font-weight: 500;
          color: var(--color-text);
          font-size: 0.95rem;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: inherit;
        }

        .nav-links a.btn-primary {
          color: white;
          padding: 0.5rem 1.2rem;
        }
        
        .nav-links a:hover, .dropdown-toggle:hover {
          color: var(--color-primary);
        }

        .nav-links a.btn-primary:hover {
          color: white; 
        }

        /* Dropdown Styles */
        .desktop-dropdown-container {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
        }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%); /* Centered dropdown */
            background-color: white;
            min-width: 200px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border-radius: 0.5rem;
            padding: 0.5rem 0;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0,0,0,0.05);
            /* Add a small invisible bridge so mouse doesn't leave when moving to dropdown */
            padding-top: 0.5rem; 
            margin-top: 0.5rem; /* Space from navbar */
        }
        
        /* Dropdown triangle/arrow if desired, optional */
        .dropdown-menu::before {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid white;
        }

        /* Invisible bridge to prevent dropdown from closing when moving mouse */
        .dropdown-menu::after {
            content: '';
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            height: 20px;
            background: transparent;
        }

        .dropdown-menu a {
            padding: 0.75rem 1.5rem;
            width: 100%;
            display: block;
            text-align: left;
            color: var(--color-text);
            transition: background 0.2s, color 0.2s;
        }

        .dropdown-menu a:hover {
            background-color: rgba(0,0,0,0.02);
            color: var(--color-primary);
        }

        /* Mobile Styles */
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
          padding: 1rem 0;
          box-shadow: var(--shadow);
          max-height: 85vh;
          overflow-y: auto;
          border-top: 1px solid #eee;
        }

        .nav-links-mobile {
          list-style: none;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .nav-links-mobile > li > a {
            display: block;
            padding: 1rem 2rem;
            color: var(--color-text);
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px solid #f5f5f5;
        }
        
        .mobile-contact-btn {
            padding: 1.5rem 2rem;
            text-align: center;
        }
        
        .mobile-contact-btn a.btn {
            display: inline-block;
            width: 100%;
        }

        /* Mobile Dropdowns */
        .mobile-dropdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            font-weight: 600;
            color: var(--color-text);
            background-color: #fcfcfc;
            border-bottom: 1px solid #f5f5f5;
            cursor: pointer;
        }

        .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.2s;
        }

        .mobile-submenu {
            list-style: none;
            background-color: white;
            padding: 0;
        }

        .mobile-submenu li a {
            display: block;
            padding: 0.8rem 3rem; /* Indented */
            color: #555;
            font-size: 0.95rem;
            text-decoration: none;
            border-bottom: 1px solid #f9f9f9;
        }

        .mobile-submenu li a:hover {
            color: var(--color-primary);
            background-color: #fdfdfd;
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

