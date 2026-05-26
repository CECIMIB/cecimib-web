import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import fabriccioImg from '../assets/fabriccio-blog.jpeg';
import johanaImg from '../assets/johana-blog.jpeg';
import facebookIcon from '../assets/Facebook_icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';
import whatsappIcon from '../assets/whatsapp-icon.svg';
import { publicationsData } from '../data/publications';

const images = {
  '1-1-2026': fabriccioImg,
  '1-2-2026': johanaImg
};

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const allNews = ['1-2-2026', '1-1-2026'];
  const recentNews = allNews.filter(b => b !== id).slice(0, 3);
  
  // Flatten all articles, then sort them by year descending to get the absolute latest
  const allArticles = publicationsData.flatMap(cat => cat.articles);
  const latestArticles = allArticles
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newsKey = `news.items.${id}`;
  const title = t(`${newsKey}.title`);

  if (title === newsKey) {
    return (
      <div className="news-details-page not-found section">
        <div className="container">
          <h2>News not found</h2>
          <button className="btn-back" onClick={() => navigate('/news')}>
            <ArrowLeft size={20} /> {i18n.language === 'es' ? 'Volver a Boletines' : 'Back to News'}
          </button>
        </div>
      </div>
    );
  }

  const date = t(`${newsKey}.date`);
  const author = t(`${newsKey}.author`);
  const subtitle = t(`${newsKey}.subtitle`);
  const doi = t(`${newsKey}.doi`);
  const volume = t(`${newsKey}.volume`);
  const number = t(`${newsKey}.number`);
  const keywords = t(`${newsKey}.keywords`, { returnObjects: true });
  
  const paragraphs = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'];
  const currentUrl = window.location.href;

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <div className="news-editorial-wrapper">
      
      {/* Header Section */}
      <div className="news-editorial-header">
        <div className="container news-header-container">
          <div className="news-header-content">
            <div className="news-breadcrumbs">
              <span style={{cursor: 'pointer'}} onClick={() => navigate('/')}>{i18n.language === 'es' ? 'INICIO' : 'HOME'}</span> &gt;
              <span style={{cursor: 'pointer'}} onClick={() => navigate('/publications')}> {i18n.language === 'es' ? 'PUBLICACIONES' : 'PUBLICATIONS'}</span> &gt;
              <span> {title.substring(0, 40)}...</span>
            </div>
            
            <div className="news-category">
              <span>{i18n.language === 'es' ? 'NOTICIA' : 'NEWS'}</span>
            </div>

            <h1 className="news-editorial-title">{title}</h1>
            
            {subtitle !== `${newsKey}.subtitle` && (
              <h2 className="news-editorial-subtitle pt-serif-regular">{subtitle}</h2>
            )}

            <div className="news-editorial-meta">
              <span>{date !== `${newsKey}.date` ? date : ''}</span>
              {author !== `${newsKey}.author` && (
                <>
                  <span>•</span>
                  <span>{i18n.language === 'es' ? 'POR' : 'BY'} <span className="news-editorial-author">{author}</span></span>
                </>
              )}
            </div>
          </div>
          
          {/* Floating Image Column inside Header */}
          <div className="news-header-image-col">
            <div className="news-floating-image-wrapper">
              {images[id] ? (
                <img src={images[id]} alt={title} className="news-floating-image" />
              ) : (
                <div className="news-floating-image placeholder-img"></div>
              )}
              <div className="news-image-caption">
                {t(`${newsKey}.caption`, { defaultValue: "Imagen del artículo. Archivos CECIMIB." })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="news-editorial-body">
        
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
        <div className="news-editorial-content pt-serif-regular">
          {paragraphs.map((p, index) => {
            const paragraphText = t(`${newsKey}.${p}`);
            return paragraphText !== `${newsKey}.${p}` ? (
              <p key={index}>{paragraphText}</p>
            ) : null;
          })}

          {/* Tracking Footer */}
          <div className="news-tracking-info">
            {doi !== `${newsKey}.doi` && (
              <div className="news-tracking-item">
                <strong>doi:</strong> {doi}
              </div>
            )}
            
            {volume !== `${newsKey}.volume` && number !== `${newsKey}.number` && (
              <div className="news-tracking-item">
                <strong>Referencia:</strong> {author !== `${newsKey}.author` ? author : 'CECIMIB'}. {title}. Noticia CECIMIB. {new Date().getFullYear()}; {volume}({number}). {doi !== `${newsKey}.doi` ? `doi: ${doi}` : ''}
              </div>
            )}

            {Array.isArray(keywords) && keywords.length > 0 && (
              <div className="news-tags">
                <div className="news-tags-label">RELEVANT TAGS:</div>
                <div className="news-tags-list">
                  {keywords.map((kw, i) => (
                    <span key={i} className="news-tag">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar Widgets */}
        <div className="news-widgets-sidebar">
          
          {recentNews.length > 0 && (
            <div className="widget-section">
              <div className="widget-section-title">{i18n.language === 'es' ? 'Últimas Noticias' : 'Latest News'}</div>
              <div className="widget-list">
                {recentNews.map(bId => (
                  <div className="widget-item" key={bId} onClick={() => navigate(`/news/${bId}`)}>
                    <div className="widget-img-wrapper">
                      <img src={images[bId]} className="widget-img" alt="" />
                    </div>
                    <div className="widget-item-info">
                      <div className="widget-date">{t(`news.items.${bId}.date`)}</div>
                      <div className="widget-item-title">{t(`news.items.${bId}.title`)}</div>
                      <div className="widget-author">{t(`news.items.${bId}.author`, { defaultValue: 'Andy A. Acosta-Monterrosa' })}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                <span 
                  onClick={() => navigate('/all-news')} 
                  style={{ 
                    cursor: 'pointer', 
                    color: 'var(--color-primary)', 
                    fontWeight: 'bold', 
                    fontSize: '0.85rem', 
                    letterSpacing: '0.5px' 
                  }}
                >
                  {i18n.language === 'es' ? 'VER MÁS >' : 'VIEW MORE >'}
                </span>
              </div>
            </div>
          )}

          {latestArticles.length > 0 && (
            <div className="widget-section">
              <div className="widget-section-title">{i18n.language === 'es' ? 'Últimos Artículos' : 'Latest Articles'}</div>
              <div className="widget-list">
                {latestArticles.map((article, idx) => (
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="widget-item" key={idx}>
                    <div className="widget-item-info">
                      <div className="widget-date">{article.year}</div>
                      <div className="widget-item-title">{article.title}</div>
                      <div className="widget-author">
                        {article.authors} <br/>
                        <span style={{fontStyle: 'italic', color: '#888', marginTop: '2px', display: 'inline-block'}}>{article.journal}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                <span 
                  onClick={() => navigate('/articles')} 
                  style={{ 
                    cursor: 'pointer', 
                    color: 'var(--color-primary)', 
                    fontWeight: 'bold', 
                    fontSize: '0.85rem', 
                    letterSpacing: '0.5px' 
                  }}
                >
                  {i18n.language === 'es' ? 'VER MÁS >' : 'VIEW MORE >'}
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default NewsDetails;
