import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { newsData as news } from '../data/newsData';

const AllNews = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    const uniqueYears = [...new Set(news.map(b => b.id.split('-').pop()))].sort((a,b)=>b-a);

    const filteredNews = news.filter(news => {
        const year = news.id.split('-').pop();
        if (selectedYear !== 'All' && year !== selectedYear) return false;

        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const title = t(`news.items.${news.id}.title`, { defaultValue: '' }).toLowerCase();
        const author = t(`news.items.${news.id}.author`, { defaultValue: 'Andy A. Acosta-Monterrosa' }).toLowerCase();
        const p1 = t(`news.items.${news.id}.p1`, { defaultValue: '' }).toLowerCase();
        const keywords = t(`news.items.${news.id}.keywords`, { returnObjects: true, defaultValue: [] });
        const keywordsStr = Array.isArray(keywords) ? keywords.join(' ').toLowerCase() : '';

        return title.includes(q) || author.includes(q) || p1.includes(q) || keywordsStr.includes(q);
    });

    return (
        <section id="all-news" className="section news">
            <div className="container list-page-container">
                <div className="news-breadcrumbs list-breadcrumbs">
                    <span style={{cursor: 'pointer'}} onClick={() => navigate('/')}>{i18n.language === 'es' ? 'INICIO' : 'HOME'}</span> &gt;
                    <span style={{cursor: 'pointer'}} onClick={() => navigate('/publications')}> {i18n.language === 'es' ? 'PUBLICACIONES' : 'PUBLICATIONS'}</span> &gt;
                    <span> {t('news.title').toUpperCase()}</span>
                </div>

                <div className="section-header list-section-header">
                    <h2>{t('news.title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="news-search-wrapper list-search-wrapper">
                    <div className="year-filter-wrapper" style={{ minWidth: '100px' }}>
                        <select 
                            className="year-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            style={{
                                padding: '0.25rem 0',
                                border: 'none',
                                borderBottom: '2px solid #888',
                                fontSize: '1.1rem',
                                outline: 'none',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                color: 'var(--color-primary)',
                                width: '100%',
                                fontFamily: 'inherit'
                            }}
                        >
                            <option value="All">{i18n.language === 'es' ? 'Año: Todos' : 'Year: All'}</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: '1', display: 'flex' }}>
                        <input 
                            type="text" 
                            className="news-search-input" 
                            placeholder={i18n.language === 'es' ? "Ingresa palabras clave, título o autor..." : "Enter keywords, title, or author..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="news-search-button">
                            {i18n.language === 'es' ? "Buscar" : "Search"}
                        </button>
                    </div>
                </div>

                <div className="list-results-count">
                    {filteredNews.length.toLocaleString()} {i18n.language === 'es' ? 'resultados' : 'results'}
                </div>

                <div className="editorial-list">
                    {filteredNews.map((newsItem, idx, arr) => {
                        const newsYear = newsItem.id.split('-').pop();
                        const prevYear = idx > 0 ? arr[idx - 1].id.split('-').pop() : null;
                        const showYearDivider = idx === 0 || newsYear !== prevYear;

                        return (
                            <React.Fragment key={newsItem.id}>
                                {showYearDivider && (
                                    <div className="list-year-divider">
                                        {newsYear}
                                    </div>
                                )}
                                <div className="editorial-item" onClick={() => navigate(`/news/${newsItem.id}`)}>
                                    <div className="editorial-meta">
                                        <span className="editorial-type">{i18n.language === 'es' ? 'Noticia' : 'News'}</span>
                                        {t(`news.items.${newsItem.id}.date`) !== `news.items.${newsItem.id}.date` && (
                                            <span className="editorial-date pt-serif-regular">{t(`news.items.${newsItem.id}.date`)}</span>
                                        )}
                                    </div>
                                    
                                    <div className="editorial-content">
                                        <h3 className="editorial-title">{t(`news.items.${newsItem.id}.title`)}</h3>
                                        <p className="editorial-authors pt-serif-regular">{t(`news.items.${newsItem.id}.author`, { defaultValue: 'Andy A. Acosta-Monterrosa' })}</p>
                                        <p className="editorial-excerpt pt-serif-regular">{t(`news.items.${newsItem.id}.p1`)}</p>
                                    </div>
                                    
                                    <div className="editorial-thumbnail">
                                        <img src={newsItem.image} alt={t(`news.items.${newsItem.id}.title`)} />
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    
                    {filteredNews.length === 0 && (
                        <div className="news-no-results">
                            {i18n.language === 'es' ? "No se encontraron boletines con esos términos." : "No news found matching those terms."}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AllNews;
