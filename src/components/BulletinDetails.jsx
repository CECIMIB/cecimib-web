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

const linkPreviews = {
  'https://es-us.finanzas.yahoo.com/noticias/premio-aster-guardians-global-nursing-081700931.html': {
    title: 'El premio Aster Guardians Global Nursing Award anuncia a los diez principales finalistas de 2026',
    description: 'DUBÁI, Emiratos Árabes Unidos, May 14, 2026--En ocasión del Día Internacional de la Enfermería, Aster DM Healthcare ha anunciado a los diez principales finalistas...',
    image: 'https://s.yimg.com/os/es/business-wire.com/710a81f197076ba1606b3b2af2211d2f',
    domain: 'es-us.finanzas.yahoo.com'
  },
  'https://www.asterguardians.com/top-10-finalists-2026/': {
    title: 'Top 10 Finalists 2026 - Aster Guardians',
    description: 'Announcing the Top 10 finalists for...',
    image: 'https://www.asterguardians.com/wp-content/uploads/2023/04/cropped-277102532_162188859498581_3888878120673797667_n-e1680690320153.jpg',
    domain: 'www.asterguardians.com'
  }
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
              if (linkUrl === `${bulletinKey}.${link}`) return null;
              
              const preview = linkPreviews[linkUrl];
              
              if (preview) {
                return (
                  <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="link-preview-card" key={`link-${index}`}>
                    <div className="link-preview-image" style={{ backgroundImage: `url(${preview.image})` }}></div>
                    <div className="link-preview-content">
                      <h4 className="link-preview-title">{preview.title}</h4>
                      <p className="link-preview-description">{preview.description}</p>
                      <span className="link-preview-domain">{preview.domain}</span>
                    </div>
                  </a>
                );
              }

              return (
                <p key={`link-${index}`} className="bulletin-link-container">
                  <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="bulletin-external-link">
                    {linkUrl}
                  </a>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetails;
