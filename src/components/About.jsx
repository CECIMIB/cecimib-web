import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <div className="card mission-card">
              <h3>{t('about.mission.title')}</h3>
              <p>
                {t('about.mission.text')}
              </p>
            </div>

            <div className="card vision-card">
              <h3>{t('about.vision.title')}</h3>
              <p>
                {t('about.vision.text')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          background-color: var(--color-bg-alt);
          padding: 2rem 0;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        
        .card {
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background-color: var(--color-primary);
        }

        .card h3 {
          font-size: 2rem;
          color: var(--color-primary-dark);
          margin-bottom: 1.5rem;
        }

        .card p {
          color: var(--color-text);
          line-height: 1.8;
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
