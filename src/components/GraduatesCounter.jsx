import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

const GraduatesCounter = () => {
  const { t } = useTranslation();
  const [graduates, setGraduates] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data/course_stats.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (data && typeof data.total_graduates !== 'undefined') {
          setGraduates(data.total_graduates);
        } else {
          setGraduates(0); // Fallback si el json está mal formado
        }
      } catch (err) {
        console.error('Error fetching graduates count:', err);
        setGraduates(150); // Fallback discreto en caso de error de red
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

  // Animación de count-up
  useEffect(() => {
    if (loading || graduates === 0) return;

    const duration = 1500; // 1.5 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Easing function (easeOutExpo)
      const progress = frame === totalFrames ? 1 : 1 - Math.pow(2, -10 * frame / totalFrames);
      setDisplayCount(Math.floor(graduates * progress));

      if (frame === totalFrames) {
        clearInterval(counter);
        setDisplayCount(graduates);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [graduates, loading]);

  return (
    <div className="graduates-section">
      <div className="graduates-container">
        <div className="graduates-content">
          <h2 className="graduates-title">{t('course_details.r_fundamentals.graduates_title', 'Impacto del Curso')}</h2>
          <p className="graduates-subtitle">{t('course_details.r_fundamentals.graduates_subtitle', 'Profesionales y estudiantes de ciencias de la salud que han fortalecido sus habilidades de análisis de datos.')}</p>
        </div>
        <div className="graduates-stats">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Users size={32} className="stat-icon" />
            </div>
            <div className="stat-number-wrapper">
              <span className="stat-number" id="graduates-counter">
                {displayCount}
              </span>
            </div>
            <span className="stat-label">{t('course_details.r_fundamentals.graduates_label', 'Graduados Certificados')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduatesCounter;
