import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../data/newsData';
import './HomeNews.css';

const HomeNews = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Take the 3 most recent news for the homepage
  const newsItems = newsData.slice(0, 3);

  const categoryLabel = i18n.language === 'es' ? 'Noticia' : 'News';
  const sectionTitle = i18n.language === 'es' ? 'Actualidad CECIMIB' : 'CECIMIB News';

  // For the ticker, we duplicate the list to make a seamless infinite scroll
  const tickerItems = [...newsItems, ...newsItems];

  return (
    <section className="home-news-section">
      {/* 2. Asymmetrical Bento Grid */}
      <div className="home-news-wrapper">
        <div className="section-header">
          <h2>{sectionTitle}</h2>
          <div className="underline"></div>
        </div>

        <div className="home-news-grid">
          {/* Left Column (7/12) - Main News */}
          <div 
            className="editorial-card main-news" 
            onClick={() => navigate(`/news/${newsItems[0].id}`)}
          >
            <div className="editorial-img-container">
              <img src={newsItems[0].image} alt={t(`news.items.${newsItems[0].id}.title`)} />
            </div>
            <span className="news-category">{categoryLabel}</span>
            <h3>{t(`news.items.${newsItems[0].id}.title`)}</h3>
            <p>{t(`news.items.${newsItems[0].id}.p1`)}</p>
            <span className="news-date">{t(`news.items.${newsItems[0].id}.date`)}</span>
          </div>

          {/* Right Column (5/12) - Secondary News Stack */}
          <div className="secondary-news-list">
            {[newsItems[1], newsItems[2]].map((news) => (
              <div 
                key={news.id} 
                className="editorial-card secondary-news-item"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <div className="editorial-img-container">
                  <img src={news.image} alt={t(`news.items.${news.id}.title`)} />
                </div>
                <div className="secondary-news-content">
                  <span className="news-category">{categoryLabel}</span>
                  <h3>{t(`news.items.${news.id}.title`)}</h3>
                  <span className="news-date">{t(`news.items.${news.id}.date`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. News Ticker (Moved Below) */}
      <div className="news-ticker-container" style={{ marginTop: '3rem' }}>
        <div className="news-ticker-content">
          {tickerItems.map((news, idx) => (
            <span key={idx} className="ticker-item">
              <span 
                className="ticker-link" 
                onClick={() => navigate(`/news/${news.id}`)}
              >
                {t(`news.items.${news.id}.title`)}
              </span>
              <span className="ticker-separator">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
