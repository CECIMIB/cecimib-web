import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Transformamos ideas en evidencia sólida</h1>
                    <p className="subtitle">
                        Consultoría científica y meta-investigación de alto nivel para mejorar la toma de decisiones basada en evidencia.
                    </p>
                    <div className="hero-cta">
                        <a href="#services" className="btn btn-primary">Descubre cómo sumamos valor</a>
                        <a href="#about" className="btn btn-outline" style={{ marginLeft: '1rem' }}>Conoce CECIMIB</a>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
          padding-top: 80px; /* Space for navbar */
        }

        /* Abstract background shape */
        .hero::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 60%;
          height: 120%;
          background: radial-gradient(circle, rgba(27, 90, 171, 0.05) 0%, rgba(255,255,255,0) 70%);
          z-index: 0;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-primary-dark);
          line-height: 1.1;
        }

        .hero .subtitle {
          font-size: 1.25rem;
          color: var(--color-text-light);
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
