import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { publicationsData } from '../data/publications';
import { ExternalLink, FileText, Calendar, BookOpen } from 'lucide-react';

const HomeArticles = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Get the 3 most recent articles
  const allArticles = publicationsData.flatMap(cat => cat.articles);
  const latestArticles = allArticles
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, 3);

  const categoryLabel = i18n.language === 'es' ? 'Artículo Científico' : 'Scientific Article';
  const sectionTitle = i18n.language === 'es' ? 'Últimos Artículos Científicos' : 'Latest Scientific Articles';

  return (
    <section className="home-articles-section">
      <div className="home-news-wrapper">
        <div className="section-header">
          <h2>{sectionTitle}</h2>
          <div className="underline"></div>
        </div>

        <div className="home-articles-grid">
          {/* Left Column (7/12) - Main Article */}
          <a 
            href={latestArticles[0].link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="article-card-styled main-article"
          >
            <div className="article-card-content">
              <div className="article-badge">
                <FileText size={14} />
                <span>{categoryLabel}</span>
              </div>
              <h3 className="main-title">{latestArticles[0].title}</h3>
              <p className="article-authors-styled pt-serif-regular">{latestArticles[0].authors}</p>
              
              <div className="article-meta-footer">
                <div className="meta-item">
                  <BookOpen size={16} />
                  <span className="journal-name">{latestArticles[0].journal}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{latestArticles[0].year}</span>
                </div>
              </div>
              
              <div className="view-external-btn">
                {i18n.language === 'es' ? 'Ver artículo' : 'View article'} <ExternalLink size={16} />
              </div>
            </div>
          </a>

          {/* Right Column (5/12) - Secondary Articles Stack */}
          <div className="secondary-articles-list">
            {[latestArticles[1], latestArticles[2]].map((article, idx) => (
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
          margin-bottom: 1.5rem;
          width: fit-content;
        }

        .small-badge {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          margin-bottom: 1rem;
        }

        .main-title {
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.3;
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
          margin-bottom: 2rem;
          flex-grow: 1;
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
