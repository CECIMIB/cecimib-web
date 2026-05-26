import React, { useMemo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  const svgRef = useRef(null);
  // Generate multiple scattered networks to fade between
  const networks = useMemo(() => {
    return [0, 1, 2].map(() => {
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

        items.push({ x, y, r: Math.random() * 2.5 + 1.5, depth: Math.random() * 1.5 + 0.5 });
      }

      const lines = [];
      for (let i = 0; i < items.length; i++) {
        // Connect to nearest neighbors
        const neighbors = items
          .map((n, idx) => ({ ...n, idx, dist: Math.hypot(n.x - items[i].x, n.y - items[i].y) }))
          .filter(n => n.idx !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        neighbors.forEach(n => {
          if (n.dist < 200) {
            lines.push({
              sourceIdx: i,
              targetIdx: n.idx,
              x1: items[i].x,
              y1: items[i].y,
              x2: n.x,
              y2: n.y,
              opacity: 1 - n.dist / 200
            });
          }
        });
      }
      return { nodes: items, connections: lines };
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % networks.length);
    }, 5000); // Change network every 5 seconds
    return () => clearInterval(interval);
  }, [networks.length]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    let animationFrameId;
    
    const renderLoop = () => {
      // Ease towards target
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      
      if (svgRef.current) {
        const circles = svgRef.current.querySelectorAll('circle');
        const lineElements = svgRef.current.querySelectorAll('line');
        const maxOffset = 30; // Max pixels to move
        
        let circleIdx = 0;
        let lineIdx = 0;

        networks.forEach((net) => {
          net.nodes.forEach((node) => {
            if (circles[circleIdx]) {
              const offsetX = currentX * maxOffset * node.depth;
              const offsetY = currentY * maxOffset * node.depth;
              circles[circleIdx].setAttribute('cx', node.x + offsetX);
              circles[circleIdx].setAttribute('cy', node.y + offsetY);
            }
            circleIdx++;
          });
          
          net.connections.forEach((line) => {
            if (lineElements[lineIdx]) {
              const n1 = net.nodes[line.sourceIdx];
              const n2 = net.nodes[line.targetIdx];
              const offsetX1 = currentX * maxOffset * n1.depth;
              const offsetY1 = currentY * maxOffset * n1.depth;
              const offsetX2 = currentX * maxOffset * n2.depth;
              const offsetY2 = currentY * maxOffset * n2.depth;
              
              lineElements[lineIdx].setAttribute('x1', line.x1 + offsetX1);
              lineElements[lineIdx].setAttribute('y1', line.y1 + offsetY1);
              lineElements[lineIdx].setAttribute('x2', line.x2 + offsetX2);
              lineElements[lineIdx].setAttribute('y2', line.y2 + offsetY2);
            }
            lineIdx++;
          });
        });
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [networks]);

  return (
    <div className="network-container">
      <svg ref={svgRef} viewBox="0 0 800 800" className="network-svg">
        <defs>
          <linearGradient id="fade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1b5aab" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1b5aab" stopOpacity="0" />
          </linearGradient>
        </defs>

        {networks.map((net, netIdx) => (
          <g 
            key={`network-${netIdx}`}
            style={{ 
              opacity: activeIndex === netIdx ? 1 : 0,
              transition: 'opacity 3s ease-in-out'
            }}
          >
            {/* Network Lines */}
            {net.connections.map((line, i) => (
              <line
                key={`line-${netIdx}-${i}`}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke="#1b5aab"
                strokeWidth="0.8"
                strokeOpacity={line.opacity * 0.25}
              />
            ))}

            {/* Nodes */}
            {net.nodes.map((node, i) => (
              <circle
                key={`node-${netIdx}-${i}`}
                cx={node.x} cy={node.y}
                r={node.r}
                fill="#1b5aab"
                fillOpacity="0.5"
              />
            ))}
          </g>
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
                @media (max-width: 768px) {
                    .network-container {
                        width: 150%;
                        left: -25%;
                    }
                }
            `}</style>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate(`/${id}`);
  };

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
            <button onClick={() => scrollToSection('services')} className="btn btn-primary btn-lg">{t('hero.cta_primary')}</button>
            <button onClick={() => scrollToSection('about')} className="btn btn-outline btn-lg hero-secondary-btn">{t('hero.cta_secondary')}</button>
          </div>
        </motion.div>
      </div >

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

        .hero-cta {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero .btn {
            min-width: 260px;
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
             flex-direction: column;
             gap: 1rem;
             width: 100%;
          }
          
          .hero-secondary-btn {
             margin-left: 0;
          }

          .hero .btn {
            width: 100%;
            max-width: 280px; /* Consitent max-width for both */
            display: flex; /* Centering text if needed, though usually btn has it */
            justify-content: center;
          }
        }
      `}</style>
    </section >
  );
};

export default Hero;
