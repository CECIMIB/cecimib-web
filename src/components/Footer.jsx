import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import PrivacyModal from './PrivacyModal';
import { Mail } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const footerLogoPath = i18n.language === 'en'
    ? `${import.meta.env.BASE_URL}ingles_blanco.svg`
    : `${import.meta.env.BASE_URL}logo_blanco.svg`;

  const handleNav = (id) => {
    if (!id) {
      navigate('/');
    } else {
      navigate(`/${id}`);
    }
  };

  return (
    <>
    <footer id="contact" className="footer">
      <div className="container footer-container">
        
        {/* Brand Col */}
        <div className="footer-brand">
          <img src={footerLogoPath} alt="CECIMIB" className="footer-logo" />
          <p className="brand-text">{t('footer.brand_text')}</p>
        </div>

        {/* The Center Col */}
        <div className="links-col">
          <h4 className="links-header">{t('footer.center')}</h4>
          <ul>
            <li><button onClick={() => handleNav('about')}>{t('navbar.about')}</button></li>
            <li><button onClick={() => handleNav('researchers')}>{t('navbar.researchers')}</button></li>
            <li><button onClick={() => handleNav('group')}>{t('footer.research_group')}</button></li>
          </ul>
        </div>

        {/* Resources Col */}
        <div className="links-col">
          <h4 className="links-header">{t('footer.resources')}</h4>
          <ul>
            <li><button onClick={() => handleNav('services')}>{t('navbar.services')}</button></li>
            <li><button onClick={() => handleNav('publications')}>{t('navbar.publications')}</button></li>
            <li><button onClick={() => handleNav('repositories')}>{t('navbar.repositories')}</button></li>
            <li><button onClick={() => handleNav('courses')}>{t('footer.courses')}</button></li>
          </ul>
        </div>

        {/* Legal Col */}
        <div className="links-col">
          <h4 className="links-header">{t('footer.legal_title')}</h4>
          <ul>
            <li><button onClick={() => handleNav('terminos')}>{t('footer.terms')}</button></li>
            <li><button onClick={() => handleNav('licencias')}>{t('footer.open_science')}</button></li>
            <li><button onClick={() => setIsPrivacyModalOpen(true)}>{t('footer.privacy_policy')}</button></li>
          </ul>
        </div>

        {/* Contact Col */}
        <div className="footer-contact">
          <h4 className="links-header">{t('footer.contact')}</h4>
          <p className="contact-desc">{t('footer.contact_text')}</p>
          <div className="contact-list">
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <div className="contact-item-info">
                <span className="contact-label">{t('footer.contact_direction')}</span>
                <a href="mailto:ivan@cecimib.com">ivan@cecimib.com</a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container bottom-bar">
          <p>&copy; {new Date().getFullYear()} CECIMIB SAS. {t('footer.rights')}</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #111827;
          color: white;
          padding: 4rem 0 0 0;
          font-family: inherit;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; 
          gap: 3rem;
          padding-bottom: 4rem;
          align-items: start;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          height: 38px;
          object-fit: contain;
          object-position: left;
        }

        .brand-text {
          color: #9ca3af; /* Muted gray */
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          max-width: 250px;
          white-space: pre-line;
        }

        .links-col {
          display: flex;
          flex-direction: column;
        }

        .links-header {
          font-size: 0.75rem; /* text-xs */
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          margin: 0 0 1.25rem 0;
          font-weight: 600;
        }

        .footer ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer ul li {
          display: flex;
          align-items: center;
        }

        .footer ul li button {
          background: none;
          border: none;
          padding: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: color 0.2s ease;
          line-height: 1.4;
        }

        .footer ul li button:hover {
          color: #ffffff;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-desc {
          color: #6b7280;
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .contact-icon {
          color: #9ca3af;
          margin-top: 0.2rem;
        }

        .contact-item-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6b7280;
        }

        .contact-item-info a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-item-info a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          border-top: 1px solid #1f2937; /* gray-800 */
          background-color: #0f172a;
        }

        .bottom-bar {
          padding: 1.5rem 0;
          text-align: center;
        }
        
        .bottom-bar p {
          margin: 0;
          color: #6b7280;
          font-size: 0.8rem;
        }

        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 3rem;
          }
          .footer-contact {
            grid-column: span 3;
            max-width: 400px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-brand {
            grid-column: span 2;
          }
          .footer-contact {
            grid-column: span 2;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
          .footer-brand, .footer-contact {
            grid-column: span 1;
          }
          .bottom-bar {
            text-align: left;
          }
        }
      `}</style>
    </footer>
    <PrivacyModal 
      isOpen={isPrivacyModalOpen} 
      onClose={() => setIsPrivacyModalOpen(false)} 
    />
    </>
  );
};

export default Footer;
