import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import fabriccioImg from '../assets/fabriccio-blog.jpeg';
import johanaImg from '../assets/johana-blog.jpeg';
import facebookIcon from '../assets/Facebook_icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';
import whatsappIcon from '../assets/whatsapp-icon.svg';

const images = {
  '1-1-2026': fabriccioImg,
  '1-2-2026': johanaImg
};

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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

  const date = t(`${bulletinKey}.date`);
  const author = t(`${bulletinKey}.author`);
  const subtitle = t(`${bulletinKey}.subtitle`);
  const doi = t(`${bulletinKey}.doi`);
  const volume = t(`${bulletinKey}.volume`);
  const number = t(`${bulletinKey}.number`);
  const keywords = t(`${bulletinKey}.keywords`, { returnObjects: true });
  
  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'];
  const currentUrl = window.location.href;

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <div className="bulletin-editorial-wrapper">
      
      {/* Header Section */}
      <div className="bulletin-editorial-header">
        <div className="container bulletin-header-container">
          <div className="bulletin-header-content">
            <div className="bulletin-breadcrumbs">
              <span style={{cursor: 'pointer'}} onClick={() => navigate('/')}>{i18n.language === 'es' ? 'INICIO' : 'HOME'}</span> &gt;
              <span style={{cursor: 'pointer'}} onClick={() => navigate('/bulletins')}> {i18n.language === 'es' ? 'BOLETINES' : 'BULLETINS'}</span> &gt;
              <span> {title.substring(0, 40)}...</span>
            </div>
            
            <div className="bulletin-category">
              <span>{i18n.language === 'es' ? 'BOLETÍN' : 'BULLETIN'}</span>
            </div>

            <h1 className="bulletin-editorial-title pt-serif-bold">{title}</h1>
            
            {subtitle !== `${bulletinKey}.subtitle` && (
              <h2 className="bulletin-editorial-subtitle pt-serif-regular">{subtitle}</h2>
            )}

            <div className="bulletin-editorial-meta">
              <span>{date !== `${bulletinKey}.date` ? date : ''}</span>
              {author !== `${bulletinKey}.author` && (
                <>
                  <span>•</span>
                  <span>{i18n.language === 'es' ? 'POR' : 'BY'} <span className="bulletin-editorial-author">{author}</span></span>
                </>
              )}
            </div>
          </div>
          
          {/* Floating Image Column inside Header */}
          <div className="bulletin-header-image-col">
            <div className="bulletin-floating-image-wrapper">
              {images[id] ? (
                <img src={images[id]} alt={title} className="bulletin-floating-image" />
              ) : (
                <div className="bulletin-floating-image placeholder-img"></div>
              )}
              <div className="bulletin-image-caption">
                {t(`${bulletinKey}.caption`, { defaultValue: "Imagen del artículo. Archivos CECIMIB." })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="bulletin-editorial-body">
        
        {/* Social Share Sidebar */}
        <div className="social-share-sidebar">
          <span className="social-share-label">SHARE:</span>
          
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-btn">
            <img src={facebookIcon} alt="Facebook" style={{width: 20, height: 20}} />
          </a>
          
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="social-btn">
            <XIcon />
          </a>
          
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer" className="social-btn">
            <img src={linkedinIcon} alt="LinkedIn" style={{width: 20, height: 20}} />
          </a>

          <a href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-btn">
            <img src={whatsappIcon} alt="WhatsApp" style={{width: 20, height: 20}} />
          </a>
        </div>

        {/* Content */}
        <div className="bulletin-editorial-content pt-serif-regular">
          {paragraphs.map((p, index) => {
            const paragraphText = t(`${bulletinKey}.${p}`);
            return paragraphText !== `${bulletinKey}.${p}` ? (
              <p key={index}>{paragraphText}</p>
            ) : null;
          })}

          {/* Tracking Footer */}
          <div className="bulletin-tracking-info">
            {doi !== `${bulletinKey}.doi` && (
              <div className="bulletin-tracking-item">
                <strong>doi:</strong> {doi}
              </div>
            )}
            
            {volume !== `${bulletinKey}.volume` && number !== `${bulletinKey}.number` && (
              <div className="bulletin-tracking-item">
                <strong>Referencia:</strong> {author !== `${bulletinKey}.author` ? author : 'CECIMIB'}. {title}. Boletín CECIMIB. {new Date().getFullYear()}; {volume}({number}). {doi !== `${bulletinKey}.doi` ? `doi: ${doi}` : ''}
              </div>
            )}

            {Array.isArray(keywords) && keywords.length > 0 && (
              <div className="bulletin-tags">
                <div className="bulletin-tags-label">RELEVANT TAGS:</div>
                <div className="bulletin-tags-list">
                  {keywords.map((kw, i) => (
                    <span key={i} className="bulletin-tag">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default BulletinDetails;
