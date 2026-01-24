import React from 'react';
import { Database, Activity, Users, ClipboardList, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 'systematization',
      icon: <Database size={40} />
    },
    {
      id: 'assessment',
      icon: <Activity size={40} />
    },
    {
      id: 'strengthening',
      icon: <Users size={40} />
    },
    {
      id: 'design',
      icon: <ClipboardList size={40} />
    },
    {
      id: 'positioning',
      icon: <Globe size={40} />
    }
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-header">
          <h2>{t('services.header')}</h2>
          <div className="underline"></div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-wrapper">
                {service.icon}
              </div>
              <h3>{t(`services.items.${service.id}.title`)}</h3>
              <p>{t(`services.items.${service.id}.description`)}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services {
          background-color: var(--color-bg);
          padding: 2rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.2rem;
          color: var(--color-primary-dark);
          margin-bottom: 1rem;
        }

        .underline {
          width: 80px;
          height: 4px;
          background-color: var(--color-primary);
          margin: 0 auto;
          border-radius: 2px;
        }

        .services-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }
        
        .service-card {
            flex: 0 1 350px; /* Grow 0, Shrink 1, Basis 350px */
            min-width: 300px;
            max-width: 400px;
        }

        .service-card {
          padding: 2.5rem;
          border-radius: 1rem;
          background-color: white;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: rgba(27, 90, 171, 0.1);
          color: var(--color-primary);
          margin-bottom: 1.5rem;
        }

        .service-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .service-card p {
          color: var(--color-text-light);
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
};

export default Services;
