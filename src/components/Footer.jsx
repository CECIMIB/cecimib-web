import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const footerLogoPath = i18n.language === 'en'
    ? `${import.meta.env.BASE_URL}ingles_blanco.svg`
    : `${import.meta.env.BASE_URL}logo_blanco.svg`;

  const handleNav = (id) => {
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

  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <img src={footerLogoPath} alt="CECIMIB" className="footer-logo" />
          <p>{t('footer.brand_text')}</p>
        </div>

        <div className="footer-links-wrapper">
          <div className="links-col">
            <h4 className="links-header">{t('footer.links')}</h4>
            <ul>
              <li><button onClick={() => handleNav('services')}>{t('navbar.services')}</button></li>
              <li><button onClick={() => handleNav('about')}>{t('navbar.about')}</button></li>
              <li><button onClick={() => handleNav('researchers')}>{t('navbar.researchers')}</button></li>
            </ul>
          </div>
          <div className="links-col">
            <ul className="right-col-list">
              <li><button onClick={() => handleNav('publications')} className="first-link">{t('navbar.publications')}</button></li>
              <li><button onClick={() => handleNav('group')}>{t('footer.research_group')}</button></li>
              <li><button onClick={() => handleNav('courses')}>{t('footer.courses')}</button></li>
              <li><button onClick={() => handleNav('bulletins')}>{t('navbar.bulletins')}</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-contact">
          <h4 className="links-header">{t('footer.contact')}</h4>
          <p>{t('footer.contact_text')}</p>
          <a href="mailto:gerencia.cecimib@gmail.com" className="contact-link">gerencia.cecimib@gmail.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CECIMIB SAS. {t('footer.rights')}</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #111827;
          color: white;
          padding: 2.5rem 0 0 0;
        }

        .footer-container {
          display: grid;
          /* Shifted middle column right by increasing first column space */
          grid-template-columns: 2fr 2.5fr 1fr; 
          gap: 2rem;
          padding-bottom: 2rem;
          align-items: start;
        }

        .footer-brand p {
          color: #9ca3af;
          margin-top: 0.75rem;
          max-width: 320px; 
          font-size: 0.9rem;
          line-height: 1.5;
          white-space: pre-line; /* Respect line breaks from translation */
        }
        
        .footer-logo {
          height: 35px;
        }

        .footer-links-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .links-col:first-child {
           padding-left: 2rem; /* Shift left column (Enlaces) to the right */
        }

        .links-header {
          font-size: 1.1rem;
          margin-bottom: 0.5rem; /* Reduced to 0.5rem to match link spacing */
          color: white;
          font-weight: 700;
          height: 1.5rem; 
          line-height: 1.5rem;
          display: flex; 
          align-items: center;
        }

        .right-col-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .right-col-list li:first-child {
           margin-bottom: 0.5rem; /* Reduced to 0.5rem to match others in the column */
        }

        .right-col-list li:first-child button {
           font-weight: 500; 
           height: 1.5rem; 
           line-height: 1.5rem;
           display: flex; /* Ensure alignment behavior matches others */
           align-items: center;
           padding: 0; /* Reset any padding */
           color: #9ca3af; 
        }
        
        .right-col-list li:first-child button:hover {
            color: white;
        }

        .footer ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer ul li {
          margin-bottom: 0.5rem;
          height: 1.5rem; 
          display: flex;
          align-items: center;
        }

        .footer ul li button {
          background: none;
          border: none;
          padding: 0;
          color: #9ca3af;
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: color 0.2s ease;
          line-height: 1.4;
        }

        .footer ul li button:hover {
          color: white;
        }

        .footer-contact p {
          color: #9ca3af;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .contact-link {
          color: var(--color-primary-light);
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
        }
        
        .contact-link:hover {
          text-decoration: underline;
        }

        .footer-bottom {
          background-color: #0f172a;
          padding: 1rem 0;
          text-align: center;
          color: #6b7280;
          font-size: 0.8rem;
        }
        
        .footer-bottom p {
            margin: 0;
        }

        @media (max-width: 900px) {
           .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
        @media (max-width: 900px) {
           .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
          .footer-links-wrapper {
             /* Keep 2 columns on mobile to save vertical space */
             grid-template-columns: 1fr 1fr; 
             gap: 1rem;
             text-align: left; /* Align left for cleaner 2-column look, or center if preferred. Let's try centering the block but text-align left usually looks better for lists. User's screenshot was centered. Let's keep it somewhat centered but 2 columns. */
             /* Actually, if we do 2 columns, centering text looks odd. Let's try left align for links in mobile 2-col, or keep centered if they fit well. */
             /* Let's try to replicate the desktop 2-col structure but stacked below logo. */
             text-align: left;
             max-width: 400px;
             margin: 0 auto; /* Center the grid container */
          }
          
          .links-col {
             align-items: flex-start; /* Left align items in columns */
          }

          .links-header {
              justify-content: flex-start; /* Left align headers */
              height: auto; 
              font-size: 1rem; /* Smaller header */
          }
          
          .right-col-list li:first-child button, .footer ul li {
              justify-content: flex-start; /* Left align links */
              height: auto; 
          }
          
          .right-col-list li:first-child {
             margin-bottom: 0.5rem;
          }

          .footer-brand {
             text-align: left;
             display: flex;
             flex-direction: column;
             align-items: flex-start;
          }

          .footer-brand p {
             margin: 0.75rem 0;
             font-size: 0.85rem; /* Smaller text */
          }
           
          /* Adjust alignment for the "Contact" section which is now separate */
          .footer-contact {
              text-align: center;
          }
          .footer-contact h4 {
              justify-content: center;
          }
          
          .footer ul li button {
             width: auto; /* Auto width */
             text-align: left;
             padding: 0.15rem 0; /* Compact padding */
             font-size: 0.85rem; /* Smaller links */
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
