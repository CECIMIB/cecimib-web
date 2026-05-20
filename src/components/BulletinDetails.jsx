import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import fabriccioImg from '../assets/fabriccio-blog.jpeg';
import johanaImg from '../assets/johana-blog.jpeg';

const images = {
  'fabriccio_renacyt': fabriccioImg,
  'johana_aster': johanaImg
};

const BulletinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bulletinKey = `bulletins.items.${id}`;
  const title = t(`${bulletinKey}.title`);

  if (title === bulletinKey) {
    return (
      <div className="bulletin-details-page not-found section">
        <div className="container">
          <h2>Bulletin not found</h2>
          <button className="btn-back" onClick={() => navigate('/bulletins')}>
            <ArrowLeft size={20} /> {i18n.language === 'es' ? 'Volver a Boletines' : 'Back to Bulletins'}
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'];
  const links = ['link1', 'link2', 'link3', 'link4', 'link5'];

  return (
    <div className="bulletin-details-page section">
      <div className="container">
        <button className="btn-back" onClick={() => navigate('/bulletins')}>
          <ArrowLeft size={20} /> {i18n.language === 'es' ? 'Volver a Boletines' : 'Back to Bulletins'}
        </button>

        <div className="bulletin-content-wrapper">
          <h1 className="bulletin-main-title">{title}</h1>
          
          {t(`${bulletinKey}.date`) !== `${bulletinKey}.date` && (
            <p className="bulletin-detail-date">{t(`${bulletinKey}.date`)}</p>
          )}

          {images[id] && (
            <div className="bulletin-image-container">
              <img src={images[id]} alt={title} className="bulletin-hero-image" />
            </div>
          )}

          <div className="bulletin-text-content">
            {paragraphs.map((p, index) => {
              const paragraphText = t(`${bulletinKey}.${p}`);
              return paragraphText !== `${bulletinKey}.${p}` ? (
                <p key={index}>{paragraphText}</p>
              ) : null;
            })}
            
            {links.map((link, index) => {
              const linkUrl = t(`${bulletinKey}.${link}`);
              return linkUrl !== `${bulletinKey}.${link}` ? (
                <p key={`link-${index}`} className="bulletin-link-container">
                  <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="bulletin-external-link">
                    {linkUrl}
                  </a>
                </p>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetails;
