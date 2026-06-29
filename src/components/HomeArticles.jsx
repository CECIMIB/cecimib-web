import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { publicationsData } from '../data/publications';
import { ExternalLink, FileText, Calendar, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

const HomeArticles = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get the 9 most recent articles
  const allArticles = publicationsData.flatMap(cat => cat.articles);
  const latestArticles = allArticles
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, 9);

  // Group into pages of 3
  const pages = [];
  for (let i = 0; i < latestArticles.length; i += 3) {
      if (latestArticles.slice(i, i + 3).length === 3) { // Ensure full pages for clean UI
          pages.push(latestArticles.slice(i, i + 3));
      }
  }

  useEffect(() => {
    const timer = setInterval(() => {
        handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [pages.length]);

  const handleNext = () => {
      setIsAnimating(true);
      setTimeout(() => {
          setCurrentPage(prev => (prev + 1) % pages.length);
          setIsAnimating(false);
      }, 300);
  };

  const handleDotClick = (index) => {
      if (index === currentPage) return;
      setIsAnimating(true);
      setTimeout(() => {
          setCurrentPage(index);
          setIsAnimating(false);
      }, 300);
  };

  const categoryLabel = i18n.language === 'es' ? 'Artículo Científico' : 'Scientific Article';
  const sectionTitle = i18n.language === 'es' ? 'Últimos Artículos Científicos' : 'Latest Scientific Articles';

  const currentArticles = pages[currentPage];

  if (!currentArticles) return null;

  return (
    <section className="home-articles-section">
      <div className="home-news-wrapper">
        <div className="section-header">
          <h2>{sectionTitle}</h2>
          <div className="underline"></div>
        </div>

        <div className={`home-articles-grid ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          {/* Left Column (7/12) - Main Article */}
          <a 
            href={currentArticles[0].link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="article-card-styled main-article"
          >
            <BookOpen size={240} className="watermark-icon" />
            <div className="article-card-content">
              <div className="article-badge-container">
                <div className="article-badge">
                  <FileText size={14} />
                  <span>{categoryLabel}</span>
                </div>
                {currentArticles[0].type && (
                  <div className="article-badge type-badge">
                    <span>{currentArticles[0].type}</span>
                  </div>
                )}
              </div>
              
              <div className="main-title-container">
                <h3 className="main-title">{currentArticles[0].title}</h3>
                <p className="article-authors-styled pt-serif-regular">{currentArticles[0].authors}</p>
              </div>
              
              <div className="article-meta-footer">
                <div className="meta-item">
                  <BookOpen size={16} />
                  <span className="journal-name">{currentArticles[0].journal}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{currentArticles[0].year}</span>
                </div>
              </div>
              
              <div className="view-external-btn">
                {i18n.language === 'es' ? 'Ver artículo' : 'View article'} <ExternalLink size={16} />
              </div>
            </div>
          </a>

          {/* Right Column (5/12) - Secondary Articles Stack */}
          <div className="secondary-articles-list">
            {[currentArticles[1], currentArticles[2]].map((article, idx) => (
              <a 
                key={idx}
                href={article.link}
                target="_blank" 
                rel="noopener noreferrer" 
                className="article-card-styled secondary-article"
              >
                <div className="article-badge small-badge">
                  <span>{categoryLabel}</span>
                </div>
                <h3 className="secondary-title">{article.title}</h3>
                <p className="article-authors-styled small-authors pt-serif-regular">{article.authors}</p>
                
                <div className="article-meta-footer small-meta">
                  <div className="meta-item">
                    <BookOpen size={14} />
                    <span className="journal-name">{article.journal}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{article.year}</span>
                  </div>
                </div>

                <div className="small-view-link">
                  {i18n.language === 'es' ? 'Ver artículo' : 'View article'} <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="carousel-indicators">
            {pages.map((_, idx) => (
                <button
                    key={idx}
                    className={`indicator-dot ${idx === currentPage ? 'active' : ''}`}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>
        
        <div className="view-all-container">
          <button className="btn btn-outline" onClick={() => navigate('/articles')}>
             {i18n.language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
          </button>
        </div>
      </div>

      <style>{`
        .home-articles-section {
          padding: 5rem 0;
          background-color: #f8fafc; /* Very light cool gray */
        }

        .home-articles-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .article-card-styled {
          background: white;
          border-radius: 1.5rem;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .article-card-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .watermark-icon {
          position: absolute;
          bottom: -40px;
          right: -40px;
          color: var(--color-primary);
          opacity: 0.03;
          z-index: -1;
          transform: rotate(-15deg);
          pointer-events: none;
        }

        .main-title-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 1rem;
          padding-bottom: 2rem;
        }

        .article-card-styled::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, var(--color-primary), #3b82f6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .article-card-styled:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }

        .article-card-styled:hover::before {
          opacity: 1;
        }

        .secondary-article {
          padding: 2rem;
        }

        .secondary-articles-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        .article-badge-container {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .article-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #e0f2fe;
          color: var(--color-primary);
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          width: fit-content;
        }

        .type-badge {
          background-color: #f1f5f9;
          color: #475569;
        }

        .small-badge {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          margin-bottom: 1rem;
        }

        .main-title {
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 1.5rem;
          color: var(--color-text);
          transition: color 0.3s ease;
        }

        .secondary-title {
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 1rem;
          color: var(--color-text);
          transition: color 0.3s ease;
        }

        .article-card-styled:hover .main-title,
        .article-card-styled:hover .secondary-title {
          color: var(--color-primary);
        }

        .article-authors-styled {
          color: #475569;
          font-size: 1.15rem;
          line-height: 1.6;
          margin-bottom: 0;
        }

        .small-authors {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .article-meta-footer {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
          margin-bottom: 1.5rem;
        }

        .small-meta {
          padding-top: 1rem;
          margin-bottom: 0;
          gap: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .small-meta .meta-item {
          font-size: 0.85rem;
        }

        .journal-name {
          font-style: italic;
        }

        .view-external-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--color-primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          transition: background-color 0.2s ease;
          width: fit-content;
        }

        .article-card-styled:hover .view-external-btn {
          background-color: var(--color-primary-dark);
        }

        .small-view-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.95rem;
          margin-top: 1rem;
          transition: color 0.2s ease;
        }

        .article-card-styled:hover .small-view-link {
          color: #1e40af; /* A slightly darker shade */
          text-decoration: underline;
        }

        .fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .fade-out {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .carousel-indicators {
            display: flex;
            justify-content: center;
            gap: 0.75rem;
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        .indicator-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #cbd5e1;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .indicator-dot:hover {
            background-color: #94a3b8;
        }

        .indicator-dot.active {
            background-color: var(--color-primary);
            transform: scale(1.3);
        }

        .view-all-container {
          text-align: center;
          margin-top: 2rem;
        }

        @media (max-width: 992px) {
          .home-articles-grid {
            grid-template-columns: 1fr;
          }
          
          .main-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .article-card-styled {
            padding: 2rem;
          }
          
          .article-meta-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeArticles;
