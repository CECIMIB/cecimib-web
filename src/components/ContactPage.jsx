import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const { t, i18n } = useTranslation();

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
        <div className="container">
          <div className="contact-cards">
            
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <Mail size={32} />
              </div>
              <h3>Email</h3>
              <p>{i18n.language === 'es' ? 'Escríbenos para colaboraciones o consultas.' : 'Write to us for collaborations or inquiries.'}</p>
              <a href="mailto:ivan@cecimib.com" className="contact-link">ivan@cecimib.com</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <MapPin size={32} />
              </div>
              <h3>{i18n.language === 'es' ? 'Sede Principal' : 'Headquarters'}</h3>
              <p>{i18n.language === 'es' ? 'Centro de Investigación' : 'Research Center'}</p>
              <span className="contact-info-text">Colombia</span>
            </div>

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
        }

        .contact-content {
          padding: 5rem 0;
        }

        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-card {
          background: white;
          border-radius: 1rem;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .contact-icon-wrapper {
          background-color: #e0f2fe;
          color: var(--color-primary);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .contact-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .contact-card p {
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .contact-link, .contact-info-text {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
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
          .contact-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
