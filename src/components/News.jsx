import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { publicationsData } from '../data/publications';
import { newsData } from '../data/newsData';

const News = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const recentNews = newsData.slice(0, 3);

    const allArticles = publicationsData.flatMap(cat => cat.articles);
    const latestArticles = allArticles
        .sort((a, b) => parseInt(b.year) - parseInt(a.year))
        .slice(0, 3);

    return (
        <section id="news" className="section news">
            <div className="container">
                <div className="section-header" style={{ cursor: 'pointer', marginTop: '2rem' }} onClick={() => navigate('/all-news')}>
                    <h2 className="hub-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t('news.title')} &gt;
                    </h2>
                    <div className="underline"></div>
                </div>

                <div className="editorial-list">
                    {recentNews.map((news) => (
                        <div key={news.id} className="editorial-item" onClick={() => navigate(`/news/${news.id}`)}>
                            <div className="editorial-meta">
                                <span className="editorial-type">{i18n.language === 'es' ? 'Noticia' : 'News'}</span>
                                {t(`news.items.${news.id}.date`) !== `news.items.${news.id}.date` && (
                                    <span className="editorial-date pt-serif-regular">{t(`news.items.${news.id}.date`)}</span>
                                )}
                            </div>
                            
                            <div className="editorial-content">
                                <h3 className="editorial-title">{t(`news.items.${news.id}.title`)}</h3>
                                <p className="editorial-authors pt-serif-regular">{t(`news.items.${news.id}.author`, { defaultValue: 'Andy A. Acosta-Monterrosa' })}</p>
                                <p className="editorial-excerpt pt-serif-regular">{t(`news.items.${news.id}.p1`)}</p>
                            </div>
                            
                            <div className="editorial-thumbnail">
                                <img src={news.image} alt={t(`news.items.${news.id}.title`)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-header" style={{ marginTop: '5rem', cursor: 'pointer' }} onClick={() => navigate('/articles')}>
                    <h2 className="hub-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t('news.latest_research_articles')} &gt;
                    </h2>
                    <div className="underline"></div>
                </div>

                <div className="editorial-list">
                    {latestArticles.map((article, idx) => (
                        <a href={article.link} target="_blank" rel="noopener noreferrer" key={idx} className="editorial-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="editorial-meta">
                                <span className="editorial-type" style={{ color: article.type && article.type.includes('Open') ? '#d9534f' : 'inherit' }}>
                                    {i18n.language === 'es' ? 'Artículo' : 'Article'}
                                </span>
                                <span className="editorial-date pt-serif-regular">{article.year}</span>
                            </div>
                            
                            <div className="editorial-content">
                                <h3 className="editorial-title" style={{textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.3s ease'}}>{article.title}</h3>
                                <p className="editorial-authors pt-serif-regular">{article.authors}</p>
                                <p className="editorial-excerpt pt-serif-regular" style={{ fontStyle: 'italic', color: '#666', marginTop: '0.2rem' }}>{article.journal}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
