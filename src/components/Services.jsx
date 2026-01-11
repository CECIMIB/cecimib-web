import React from 'react';
import { Database, Activity, Users, ClipboardList, Globe } from 'lucide-react';

const services = [
    {
        icon: <Database size={40} />,
        title: "Sistematización de Evidencia",
        description: "Sistematizamos la evidencia que necesitas para decisiones clínicas y políticas de salud."
    },
    {
        icon: <Activity size={40} />,
        title: "Evaluación de Tecnologías",
        description: "Evaluamos tecnologías sanitarias con rigor metodológico y visión costo-efectiva."
    },
    {
        icon: <Users size={40} />,
        title: "Fortalecimiento de Grupos",
        description: "Fortalecemos o creamos grupos de investigación, impulsando su sostenibilidad y productividad."
    },
    {
        icon: <ClipboardList size={40} />,
        title: "Diseño de Estudios",
        description: "Diseñamos estudios que generan conocimiento sobre intervenciones y desenlaces en salud."
    },
    {
        icon: <Globe size={40} />,
        title: "Posicionamiento Científico",
        description: "Ayudamos a que se posicione tu producción científica ante el discurso internacional de la ciencia, con artículos de alto impacto."
    }
];

const Services = () => {
    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="section-header">
                    <h2>¿Cómo sumamos valor?</h2>
                    <div className="underline"></div>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="icon-wrapper">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .services {
          background-color: var(--color-bg);
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
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
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
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
