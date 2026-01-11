import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Expanded Background words data
const scientificTerms = [
  { text: "Evidence", x: "10%", y: "15%", delay: 0 },
  { text: "Meta-research", x: "75%", y: "10%", delay: 1 },
  { text: "Scientometrics", x: "5%", y: "60%", delay: 2 },
  { text: "Data Analytics", x: "85%", y: "75%", delay: 0.5 },
  { text: "Health", x: "20%", y: "85%", delay: 1.5 },
  { text: "Clinical Review", x: "65%", y: "25%", delay: 2.5 },
  { text: "Biostatistics", x: "80%", y: "50%", delay: 0.8 },
  { text: "Innovation", x: "15%", y: "40%", delay: 1.2 },
  { text: "Impact", x: "40%", y: "90%", delay: 3 },
  { text: "Reproducibility", x: "60%", y: "80%", delay: 1.8 },
  { text: "Epidemiology", x: "30%", y: "10%", delay: 2.2 },
  { text: "Genomics", x: "90%", y: "30%", delay: 0.3 },
  { text: "Systematic Review", x: "50%", y: "5%", delay: 1.7 },
  { text: "Open Science", x: "10%", y: "30%", delay: 2.8 },
  { text: "Precision Medicine", x: "70%", y: "60%", delay: 0.7 },
  { text: "Big Data", x: "25%", y: "70%", delay: 1.3 },
  { text: "Bioinformatics", x: "90%", y: "20%", delay: 2.1 },
  { text: "Public Health", x: "45%", y: "95%", delay: 3.2 },
  { text: "Guidelines", x: "5%", y: "90%", delay: 1.9 },
  { text: "Ethics", x: "95%", y: "50%", delay: 2.6 }
];

// Static Extensive Network (Non-circular, No curved vectors)
const ExtensiveNetwork = () => {
  // Generate scattered nodes for a wide, non-circular network on the left
  const nodes = useMemo(() => {
    const items = [];
    const count = 60; // Increased count for density

    for (let i = 0; i < count; i++) {
      let x, y;
      // Bias towards the left side
      if (Math.random() > 0.3) {
        x = Math.random() * 450;
      } else {
        x = Math.random() * 800; // Occasional spread
      }
      y = Math.random() * 800;

      // Avoid the very center where text is 
      if (x > 300 && x < 600 && y > 300 && y < 500) {
        x = x / 2;
      }

      items.push({ x, y, r: Math.random() * 2.5 + 1.5 });
    }
    return items;
  }, []);

  // Generate specific connections
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect to nearest neighbors
      const neighbors = nodes
        .map((n, idx) => ({ ...n, idx, dist: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
        .filter(n => n.idx !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      neighbors.forEach(n => {
        if (n.dist < 200) {
          lines.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: n.x,
            y2: n.y,
            opacity: 1 - n.dist / 200
          });
        }
      });
    }
    return lines;
  }, [nodes]);

  return (
    <div className="network-container">
      <svg viewBox="0 0 800 800" className="network-svg">
        <defs>
          <linearGradient id="fade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1b5aab" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1b5aab" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Network Lines */}
        {connections.map((line, i) => (
          <line
            key={`line-${i}`}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke="#1b5aab"
            strokeWidth="0.8"
            strokeOpacity={line.opacity * 0.25}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.x} cy={node.y}
            r={node.r}
            fill="#1b5aab"
            fillOpacity="0.5"
          />
        ))}
      </svg>
      <style>{`
                .network-container {
                    position: absolute;
                    left: 0; 
                    top: 0;
                    width: 65%; /* Slightly wider */
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                    opacity: 1;
                }
                .network-svg {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <ExtensiveNetwork />

      {/* Background Words */}
      {scientificTerms.map((term, index) => (
        <motion.div
          key={index}
          className="scientific-term"
          style={{ left: term.x, top: term.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: term.delay,
            ease: "easeInOut"
          }}
        >
          {term.text}
        </motion.div>
      ))}

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{t('hero.title')}</h1>
          <p className="subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-cta">
            <a href="#services" className="btn btn-primary">{t('hero.cta_primary')}</a>
            <a href="#about" className="btn btn-outline hero-secondary-btn">{t('hero.cta_secondary')}</a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }
        
        .scientific-term {
            position: absolute;
            font-size: clamp(1.2rem, 3vw, 2.5rem); /* Slightly adjusted sizing */
            font-weight: 700;
            color: var(--color-primary-dark);
            user-select: none;
            pointer-events: none;
            white-space: nowrap;
            z-index: 1;
            font-family: var(--font-heading);
        }

        .hero::before {
             display: none;
        }

        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .hero-content {
          max-width: 900px;
          padding: 0 1rem;
        }

        .hero h1 {
          font-size: 4rem;
          margin-bottom: 2rem;
          color: var(--color-primary-dark);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .hero .subtitle {
          font-size: 1.4rem;
          color: var(--color-text-light);
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-secondary-btn {
          margin-left: 1rem;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .hero .subtitle {
            font-size: 1.1rem;
          }

          .hero-cta {
             display: flex;
             flex-direction: column;
             gap: 1rem;
             align-items: center;
             width: 100%;
          }
          
          .hero-secondary-btn {
             margin-left: 0;
          }

          .hero .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
