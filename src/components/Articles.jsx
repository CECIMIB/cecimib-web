import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publicationsData } from '../data/publications';

const Articles = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');
    
    // Read initial selected line from URL parameters
    const [selectedLine, setSelectedLine] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('line') || 'All';
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(20);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedYear, selectedLine, resultsPerPage]);

    // Flatten all articles and preserve their source categoryKey
    const allArticles = publicationsData
        .flatMap(cat => cat.articles.map(article => ({ ...article, categoryKey: cat.categoryKey })))
        .sort((a, b) => parseInt(b.year) - parseInt(a.year));
        
    const uniqueYears = [...new Set(allArticles.map(a => a.year))].sort((a,b)=>b-a);

    const filteredArticles = allArticles.filter(article => {
        if (selectedYear !== 'All' && article.year !== selectedYear) return false;
        if (selectedLine !== 'All' && article.categoryKey !== selectedLine) return false;
        if (!searchQuery) return true;
        
        const q = searchQuery.toLowerCase();
        const titleMatch = article.title?.toLowerCase().includes(q);
        const authorMatch = article.authors?.toLowerCase().includes(q);
        const journalMatch = article.journal?.toLowerCase().includes(q);
        
        return titleMatch || authorMatch || journalMatch;
    });

    const totalPages = Math.ceil(filteredArticles.length / resultsPerPage);
    const paginatedArticles = filteredArticles.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

    return (
        <section className="section news">
            <div className="container list-page-container">
                <div className="news-breadcrumbs list-breadcrumbs">
                    <span style={{cursor: 'pointer'}} onClick={() => navigate('/')}>{i18n.language === 'es' ? 'INICIO' : 'HOME'}</span> &gt;
                    <span style={{cursor: 'pointer'}} onClick={() => navigate('/publications')}> {i18n.language === 'es' ? 'PUBLICACIONES' : 'PUBLICATIONS'}</span> &gt;
                    <span> {t('news.all_articles_title').toUpperCase()}</span>
                </div>

                <div className="section-header list-section-header">
                    <h2>{t('news.all_articles_title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="articles-layout-wrapper">
                    {/* SIDEBAR */}
                    <aside className="articles-sidebar">
                        <h3>{i18n.language === 'es' ? 'Líneas de investigación' : 'Research Lines'}</h3>
                        <ul className="filter-list">
                            <li 
                                className={selectedLine === 'All' ? 'active' : ''} 
                                onClick={() => setSelectedLine('All')}
                            >
                                <span className="filter-name">{i18n.language === 'es' ? 'Todas' : 'All'}</span>
                                <span className="filter-count">
                                    ({allArticles.filter(a => selectedYear === 'All' || a.year === selectedYear).length})
                                </span>
                            </li>
                            {publicationsData.map(cat => {
                                const count = allArticles.filter(a => 
                                    a.categoryKey === cat.categoryKey && 
                                    (selectedYear === 'All' || a.year === selectedYear)
                                ).length;
                                return (
                                    <li 
                                        key={cat.categoryKey}
                                        className={selectedLine === cat.categoryKey ? 'active' : ''}
                                        onClick={() => setSelectedLine(cat.categoryKey)}
                                    >
                                        <span className="filter-name">{t(`publications.${cat.categoryKey}`)}</span>
                                        <span className="filter-count">({count})</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="articles-main-content">
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
                            </div>
                        </div>

                        <div className="list-results-count">
                            {filteredArticles.length.toLocaleString()} {i18n.language === 'es' ? 'resultados' : 'results'}
                        </div>

                        <div className="editorial-list">
                            {paginatedArticles.map((article, idx, arr) => {
                                const showYearDivider = idx === 0 || article.year !== arr[idx - 1].year;
                                return (
                                    <React.Fragment key={idx}>
                                        {showYearDivider && (
                                            <div className="list-year-divider">
                                                {article.year}
                                            </div>
                                        )}
                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="editorial-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="editorial-meta" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.1rem', minWidth: '25px' }}>
                                                    {(currentPage - 1) * resultsPerPage + idx + 1}
                                                </span>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span className="editorial-type" style={{ color: article.type && article.type.includes('Open Access') ? '#d9534f' : 'inherit' }}>
                                                        {article.type && article.type.includes('Open Access') ? t('news.open_access') : (i18n.language === 'es' ? 'Artículo' : 'Article')}
                                                    </span>
                                                    <span className="editorial-date pt-serif-regular">{article.year}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="editorial-content">
                                                <h3 className="editorial-title" style={{textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.3s ease'}}
                                                    onMouseEnter={(e) => e.currentTarget.style.textDecorationColor = 'currentColor'}
                                                    onMouseLeave={(e) => e.currentTarget.style.textDecorationColor = 'transparent'}
                                                >
                                                    {article.title}
                                                </h3>
                                                <p className="editorial-authors pt-serif-regular">{article.authors}</p>
                                                <p className="editorial-excerpt pt-serif-regular" style={{ fontStyle: 'italic', color: '#666', marginTop: '0.2rem' }}>{article.journal}</p>
                                            </div>
                                        </a>
                                    </React.Fragment>
                                );
                            })}
                            
                            {filteredArticles.length === 0 && (
                                <div className="news-no-results">
                                    {i18n.language === 'es' ? "No se encontraron artículos con esos términos." : "No articles found matching those terms."}
                                </div>
                            )}

                            {filteredArticles.length > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid #eaeaea', fontSize: '0.9rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                                        <span>{i18n.language === 'es' ? 'Mostrar:' : 'Display:'}</span>
                                        <select 
                                            value={resultsPerPage} 
                                            onChange={e => setResultsPerPage(Number(e.target.value))} 
                                            style={{ padding: '0.2rem', border: '1px solid #ccc', borderRadius: '2px', outline: 'none', color: 'var(--color-primary)' }}
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                        <span>{i18n.language === 'es' ? 'resultados por página' : 'results per page'}</span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {currentPage > 1 && (
                                            <span onClick={() => setCurrentPage(1)} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>&lt;&lt;</span>
                                        )}
                                        {currentPage > 1 && (
                                            <span onClick={() => setCurrentPage(currentPage - 1)} style={{ cursor: 'pointer', color: 'var(--color-primary)', marginRight: '0.5rem' }}>&lt;</span>
                                        )}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                            if (totalPages > 7 && (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 2)) {
                                                if (page === 2 || page === totalPages - 1) return <span key={page} style={{color: '#666'}}>...</span>;
                                                return null;
                                            }
                                            return (
                                                <span 
                                                    key={page} 
                                                    onClick={() => setCurrentPage(page)}
                                                    style={{ 
                                                        cursor: 'pointer', 
                                                        padding: '0.2rem 0.5rem', 
                                                        fontWeight: currentPage === page ? 'bold' : 'normal',
                                                        borderBottom: currentPage === page ? '2px solid var(--color-primary)' : 'none',
                                                        color: currentPage === page ? 'var(--color-primary)' : '#666'
                                                    }}
                                                >
                                                    {page}
                                                </span>
                                            );
                                        })}
                                        {currentPage < totalPages && (
                                            <span onClick={() => setCurrentPage(currentPage + 1)} style={{ cursor: 'pointer', color: 'var(--color-primary)', marginLeft: '0.5rem' }}>&gt;</span>
                                        )}
                                        {currentPage < totalPages && (
                                            <span onClick={() => setCurrentPage(totalPages)} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>&gt;&gt;</span>
                                        )}
                                    </div>

                                    <div style={{ cursor: 'pointer', color: 'var(--color-primary)' }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                        ^ {i18n.language === 'es' ? 'Arriba' : 'Top of page'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Articles;
