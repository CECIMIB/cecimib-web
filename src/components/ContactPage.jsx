import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container contact-hero-content">
          <div className="hero-badge">{t('navbar.contact')}</div>
          <h1>{t('footer.contact_text')}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="container contact-main-container">
          <div className="contact-profile">
            <img 
              src={`${import.meta.env.BASE_URL}researchers/ivan-lozada-martinez.png`} 
              alt="Iván David Lozada Martínez" 
              className="contact-profile-img"
            />
            <h2>Iván David Lozada Martínez</h2>
            <p className="contact-role">{t('researchers.ivan.role')}</p>
            <a href="mailto:ivan@cecimib.com" className="contact-email">ivan@cecimib.com</a>
          </div>
        </div>
      </section>

      <style>{`
        .contact-page {
          padding-top: 80px; /* Navbar offset */
          background-color: var(--color-bg-alt);
          min-height: calc(100vh - 80px);
        }

        .contact-hero {
          background-color: #111827;
          color: white;
          padding: 6rem 0 4rem;
          text-align: center;
        }

        .contact-hero-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-hero .hero-badge {
          background: rgba(255, 255, 255, 0.1);
          color: #e0f2fe;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .contact-hero h1 {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #f8fafc;
        }

        .contact-content {
          padding: 5rem 0;
        }

        .contact-main-container {
          display: flex;
          justify-content: center;
        }

        .contact-profile {
          text-align: center;
          max-width: 600px;
        }

        .contact-profile-img {
          display: block;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.5rem auto;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border: 4px solid white;
        }

        .contact-profile h2 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .contact-role {
          font-size: 1.25rem;
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
        }

        .contact-email {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-email:hover {
          color: var(--color-primary-dark);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .contact-hero {
            padding: 4rem 0 3rem;
          }
          .contact-hero h1 {
            font-size: 2rem;
          }
          .contact-profile h2 {
            font-size: 1.75rem;
          }
          .contact-email {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
