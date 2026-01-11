import React from 'react';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-content">
                        <div className="card mission-card">
                            <h3>Misión</h3>
                            <p>
                                El Centro de Consultoría Científica y Meta-Investigación en Ciencias Biomédicas (CECIMIB), es un centro independiente de generación, uso y transferencia de conocimiento basado en la investigación y análisis crítico de la investigación biomédica. Nuestro fin principal es proveer de datos, tendencias, patrones, y diagnósticos sobre la calidad de los métodos, principios y prospectiva de la actividad científica.
                            </p>
                        </div>

                        <div className="card vision-card">
                            <h3>Visión</h3>
                            <p>
                                Con base en la originalidad, pertinencia, relevancia y calidad de nuestra metodología, apuntamos a convertirnos en un centro de investigación sostenible, acreditado y de referencia a nivel nacional e internacional, desarrollando líneas de investigación independientes que resuelvan necesidades científicas específicas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .about {
          background-color: var(--color-bg-alt);
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
