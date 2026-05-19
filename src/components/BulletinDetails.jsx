import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import fabriccioImg from '../assets/fabriccio-blog.jpeg';

const images = {
  'fabriccio_renacyt': fabriccioImg
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

  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5'];

  return (
    <div className="bulletin-details-page section">
      <div className="container">
        <button className="btn-back" onClick={() => navigate('/bulletins')}>
          <ArrowLeft size={20} /> {i18n.language === 'es' ? 'Volver a Boletines' : 'Back to Bulletins'}
        </button>

        <div className="bulletin-content-wrapper">
          <h1 className="bulletin-main-title">{title}</h1>
          
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetails;
