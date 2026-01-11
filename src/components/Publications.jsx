import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { publicationsData } from '../data/publications';
import { Activity, Search, Dna, ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import '../App.css';

// Map icon names to components
const IconMap = {
    "Activity": Activity,
    "Search": Search,
    "Dna": Dna
};

const Publications = () => {
    const { t } = useTranslation();
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

    const handleCategoryClick = (index) => {
        setSelectedCategoryIndex(index);
    };

    const handleBackClick = () => {
        setSelectedCategoryIndex(null);
    };

    return (
        <section id="publications" className="section publications">
            <div className="container">
                {/* Header matches Services exactly */}
                <div className="section-header">
                    {selectedCategoryIndex === null ? (
                        <>
                            <h2>{t('publications.title')}</h2>
                            <div className="underline"></div>
                            <p className="subtitle">{t('publications.subtitle')}</p>
                        </>
                    ) : (
                        <div className="detail-header">
                            <h2>{t(`publications.${publicationsData[selectedCategoryIndex].categoryKey}`)}</h2>
                            <div className="underline"></div>
                            <p className="subtitle">{t(`publications.${publicationsData[selectedCategoryIndex].descriptionKey}`)}</p>
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {selectedCategoryIndex === null ? (
                        // MAIN VIEW: Grid identical to Services
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="publications-grid"
                        >
                            {publicationsData.map((category, index) => {
                                const IconComponent = IconMap[category.icon] || FileText;
                                return (
                                    <div
                                        key={index}
                                        className="publication-card clickable"
                                        onClick={() => handleCategoryClick(index)}
                                    >
                                        <div className="icon-wrapper">
                                            <IconComponent size={40} />
                                        </div>
                                        <h3>{t(`publications.${category.categoryKey}`)}</h3>
                                        <p>{t(`publications.${category.descriptionKey}`)}</p>
                                        <span className="view-more">
                                            {t('publications.view_publications')} <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        // DETAIL VIEW: Spacious Horizontal Cards
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                            className="articles-container"
                        >
                            <button
                                onClick={handleBackClick}
                                className="back-button"
                            >
                                <ArrowLeft size={20} />
                                {t('publications.back_to_categories')}
                            </button>

                            <div className="articles-list">
                                {publicationsData[selectedCategoryIndex].articles.map((article, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="article-card"
                                    >
                                        {/* Clean Title */}
                                        <h4 className="article-title">
                                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                                {article.title}
                                            </a>
                                        </h4>

                                        {/* Authors - Grey as requested */}
                                        <div className="article-authors">
                                            {article.authors}
                                        </div>

                                        {/* Footer: Journal & Action */}
                                        <div className="article-footer">
                                            <span className="journal-info">
                                                {article.journal} &bull; {article.year}
                                            </span>
                                            <a
                                                href={article.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-link"
                                            >
                                                {t('publications.view_article')}
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
        .publications {
          background-color: var(--color-bg); /* Match Services bg */
          padding: 5rem 0;
          min-height: 80vh;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          color: var(--color-primary-dark);
          margin-bottom: 1rem;
        }
        
        .subtitle {
            margin-top: 1rem;
            color: var(--color-text-light);
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            font-size: 1.1rem;
        }

        .underline {
          width: 80px;
          height: 4px;
          background-color: var(--color-primary);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* GRID STYLES - MIRRORING SERVICES.JSX */
        .publications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .publication-card {
          padding: 2.5rem;
          border-radius: 1rem;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          cursor: pointer;
        }

        .publication-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: rgba(27, 90, 171, 0.1);
          color: var(--color-primary);
          margin-bottom: 1.5rem;
        }

        .publication-card h3 {
          font-size: 1.35rem;
          margin-bottom: 1rem;
          color: var(--color-text);
          font-weight: 700;
        }

        .publication-card p {
          color: var(--color-text-light);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .view-more {
            margin-top: auto;
            color: var(--color-primary);
            font-weight: 600;
            display: flex;
            align-items: center;
            font-size: 0.9rem;
        }

        /* ARTICLE DETAIL STYLES */
        .articles-container {
            max-width: 900px;
            margin: 0 auto;
        }
        
        .back-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: none;
            border: none;
            color: var(--color-text-light);
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 2rem;
            padding: 0;
            font-size: 1rem;
            transition: color 0.2s;
        }
        
        .back-button:hover {
            color: var(--color-primary);
        }

        .articles-list {
            display: flex;
            flex-direction: column;
            gap: 2rem; /* Wide spacing as requested */
        }
        
        .article-card {
            background-color: white;
            padding: 2.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0,0,0,0.03);
            transition: box-shadow 0.3s;
        }
        
        .article-card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
        }
        
        .article-title {
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 1.3;
            margin-bottom: 0.75rem;
            color: var(--color-text);
        }
        
        .article-title a {
            color: inherit;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .article-title a:hover {
            color: var(--color-primary);
        }
        
        .article-authors {
            color: #555; /* Grey/Dark Grey */
            font-size: 1rem;
            margin-bottom: 1.5rem;
            line-height: 1.5;
            font-weight: 450;
        }
        
        .article-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 1rem;
            border-top: 1px solid #f0f0f0;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .journal-info {
            font-size: 0.9rem;
            color: #888;
            font-style: italic;
        }
        
        .view-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
            background-color: var(--color-primary);
            padding: 0.5rem 1.2rem;
            border-radius: 9999px;
            font-size: 0.85rem;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s;
        }
        
        .view-link:hover {
            background-color: var(--color-primary-dark);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
            .section-header h2 {
                font-size: 2rem;
            }
            
            .publication-card {
                padding: 2rem;
            }
            
            .article-card {
                padding: 1.5rem;
            }
            
            .article-title {
                font-size: 1.2rem;
            }
        }
      `}</style>
        </section>
    );
};

export default Publications;
