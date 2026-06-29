import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Search, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import orcidLogo from '../assets/orcid_logo.svg';
import researchGateLogo from '../assets/research-gate-logo.svg';
import linkedinLogo from '../assets/linkedin-icon.svg';
import scholarLogo from '../assets/Google_Scholar_logo.svg';
import orcidData from '../data/orcid_publications.json';


// To avoid circular dependencies or complex refactors, I'll define the static data mapping here or reuse if possible.
// Ideally, researchers data should be in a separate data file, but for now I will recreate the lookup map 
// based on the IDs used in Researchers.jsx.
const researchersMap = {
    'ivan': {
        photo: `${import.meta.env.BASE_URL}researchers/ivan-lozada-martinez.png`,
        links: {
            linkedin: "https://www.linkedin.com/in/ivan-david-lozada-martinez/?originalSubdomain=co",
            orcid: "https://orcid.org/0000-0002-1960-7334",
            scholar: "https://scholar.google.es/citations?user=fA3e4-8AAAAJ&hl=es&oi=ao",
            researchgate: "https://www.researchgate.net/profile/Ivan-David-Lozada-Martinez"
        }
    },
    'david': {
        photo: `${import.meta.env.BASE_URL}researchers/david-hernandez-paez.jpeg`,
        links: {
            linkedin: "https://www.linkedin.com/in/david-a-hernandez-paez-463a24273/",
            orcid: "https://orcid.org/0000-0002-6742-3185",
            scholar: "https://scholar.google.es/citations?user=KviJPbAAAAAJ&hl=es",
            researchgate: "https://www.researchgate.net/profile/David-Hernandez-Paez"
        }
    },
    'andy': {
        photo: `${import.meta.env.BASE_URL}researchers/andy-acosta-monterrosa.jpeg`,
        links: {
            linkedin: "https://www.linkedin.com/in/andy-a-acosta-monterrosa-08a7b2353/",
            orcid: "https://orcid.org/0000-0002-6860-1043",
            scholar: "https://scholar.google.es/citations?user=jccSioEAAAAJ&hl=es",
            researchgate: "https://www.researchgate.net/profile/Andy-A-Acosta-Monterrosa"
        }
    }
};

const ResearcherDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const researcher = researchersMap[id];
    const [metrics, setMetrics] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    if (!researcher) {
        return <div className="container section">Researcher not found</div>;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch(`${import.meta.env.BASE_URL}data/metrics.json`)
            .then(res => res.json())
            .then(data => {
                if (data[id]) {
                    setMetrics(data[id]);
                }
            })
            .catch(err => console.error('Error fetching metrics:', err));
    }, [id]);

    const researcherWorks = orcidData[id]?.works || [];
    const filteredWorks = researcherWorks.filter(work => {
        const matchesFilter = activeFilter ? work.type === activeFilter : true;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || 
            (work.title && work.title.toLowerCase().includes(searchLower)) || 
            (work.journal && work.journal.toLowerCase().includes(searchLower)) ||
            (work.date && work.date.toLowerCase().includes(searchLower));
        return matchesFilter && matchesSearch;
    });

    // Reset to page 1 when filters or items per page change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, searchQuery, itemsPerPage]);

    const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
    const paginatedWorks = filteredWorks.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const getPageNumbers = (current, total) => {
        if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
        const pages = [1];
        if (current > 3) pages.push('...');
        
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) pages.push(i);
        
        if (current < total - 2) pages.push('...');
        pages.push(total);
        return pages;
    };

    return (
        <section className="section researcher-details">
            <div className="container">
                <Link to="/researchers" className="back-button">
                    <ArrowLeft size={20} />
                    {t('researchers_details.back_to_team')}
                </Link>

                <div className="details-content">
                    {/* Sidebar / Profile Card */}
                    <div className="profile-sidebar">
                        <div className="image-wrapper-large">
                            <img src={researcher.photo} alt={id} />
                        </div>

                        <div className="profile-info">
                            {/* Name comes from common keys usually, but let's assume we use the one from researchers list or duplicates. 
                                 Actually, let's use the translation keys we just added. 
                                 Wait, I didn't add names to 'researchers_details', I added titles and bios. 
                                 I can fetch the name from 'researchers.[id].name' ? No, researchers.[id] has role and bio only in original.
                                 The names were hardcoded in Researchers.jsx array. 
                                 I should probably add names to the translation or hardcode them here matching the IDs.
                             */}
                            <h1 className="profile-name">
                                {id === 'ivan' && "Ivan David Lozada-Martinez"}
                                {id === 'david' && "David A. Hernandez-Paez"}
                                {id === 'andy' && "Andy A. Acosta-Monterrosa"}
                            </h1>

                            <p className="profile-role">
                                {t(`researchers_details.${id}.title`)}
                            </p>

                            <div className="social-links-large">
                                {researcher.links.linkedin && (
                                    <a href={researcher.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                        <img src={linkedinLogo} alt="LinkedIn" width={24} height={24} />
                                    </a>
                                )}
                                {researcher.links.orcid && (
                                    <a href={researcher.links.orcid} target="_blank" rel="noopener noreferrer" title="ORCiD">
                                        <img src={orcidLogo} alt="ORCiD" width={24} height={24} />
                                    </a>
                                )}
                                {researcher.links.scholar && (
                                    <a href={researcher.links.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar">
                                        <img src={scholarLogo} alt="Google Scholar" width={24} height={24} />
                                    </a>
                                )}
                                {researcher.links.researchgate && (
                                    <a href={researcher.links.researchgate} target="_blank" rel="noopener noreferrer" title="ResearchGate">
                                        <img src={researchGateLogo} alt="ResearchGate" width={24} height={24} />
                                    </a>
                                )}
                            </div>

                            {metrics && (
                                <div className="metrics-card">
                                    <h3 className="metrics-title">{t('researchers_details.metrics_title')}</h3>
                                    <div className="metrics-grid">
                                        <div className="metric-item">
                                            <span className="metric-value">{metrics.works_count}</span>
                                            <span className="metric-label">{t('researchers_details.works')}</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="metric-value">{metrics.h_index}</span>
                                            <span className="metric-label">{t('researchers_details.h_index')}</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="metric-value">{metrics.cited_by_count}</span>
                                            <span className="metric-label">{t('researchers_details.citations')}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {metrics && (
                                <div className="metrics-legend">
                                    {t('researchers_details.metrics_legend')}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content / Bio */}
                    <div className="bio-content">
                        <h2>{t('researchers_details.information')}</h2>
                        <div className="bio-text">
                            {t(`researchers_details.${id}.detailed_bio`).split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {orcidData[id] && orcidData[id].works && orcidData[id].works.length > 0 && (
                            <div className="orcid-publications">
                                <h3 className="orcid-section-title">{t('researchers_details.publications_presentations')}</h3>
                                
                                <div className="orcid-controls">
                                    <div className="search-bar">
                                        <Search size={16} className="search-icon" />
                                        <input 
                                            type="text" 
                                            placeholder={t('researchers_details.search_placeholder', 'Search publications...')} 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="orcid-badges">
                                        {Object.entries(orcidData[id].counts).map(([type, count]) => {
                                            if (count === 0) return null;
                                            const typeKey = type.replace('-', '_');
                                            const label = t(`researchers_details.${typeKey}`, { defaultValue: type.replace('-', ' ') });
                                            const isActive = activeFilter === type;
                                            return (
                                                <button 
                                                    key={type} 
                                                    className={`orcid-badge ${isActive ? 'active' : ''}`}
                                                    onClick={() => setActiveFilter(isActive ? null : type)}
                                                >
                                                    <strong>{count}</strong> {label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <ul className="orcid-works-list">
                                    {paginatedWorks.map((work, index) => (
                                        <li key={work.putCode || index} className="orcid-work-item">
                                            <div className="work-title">
                                                {work.url ? (
                                                    <a href={work.url} target="_blank" rel="noopener noreferrer">
                                                        {work.title} <ExternalLink size={12} className="inline-icon" />
                                                    </a>
                                                ) : (
                                                    work.title
                                                )}
                                            </div>
                                            <div className="work-meta">
                                                <span className="work-date">{work.date}</span>
                                                {work.journal && <span className="work-journal">{work.journal}</span>}
                                                <span className="work-type">{t(`researchers_details.${work.type.replace('-', '_')}`, { defaultValue: work.type.replace('-', ' ') })}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {totalPages > 1 && (
                                    <div className="pagination-container">
                                        <div className="items-per-page">
                                            <label>{t('researchers_details.items_per_page', 'Items per page:')}</label>
                                            <select 
                                                value={itemsPerPage} 
                                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                            >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                                <option value={1000}>All</option>
                                            </select>
                                        </div>

                                        <div className="pagination-controls">
                                            <button 
                                                className="pagination-icon-btn"
                                                onClick={() => setCurrentPage(1)}
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronsLeft size={18} />
                                            </button>
                                            <button 
                                                className="pagination-icon-btn"
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            
                                            <div className="pagination-numbers">
                                                {getPageNumbers(currentPage, totalPages).map((num, i) => (
                                                    num === '...' ? (
                                                        <span key={`ellipsis-${i}`} className="pagination-ellipsis">...</span>
                                                    ) : (
                                                        <button
                                                            key={num}
                                                            className={`pagination-number ${currentPage === num ? 'active' : ''}`}
                                                            onClick={() => setCurrentPage(num)}
                                                        >
                                                            {num}
                                                        </button>
                                                    )
                                                ))}
                                            </div>

                                            <button 
                                                className="pagination-icon-btn"
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                            <button 
                                                className="pagination-icon-btn"
                                                onClick={() => setCurrentPage(totalPages)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <ChevronsRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .researcher-details {
                    padding-top: 8rem; /* Space for fixed navbar */
                    min-height: 80vh;
                    background-color: var(--color-bg);
                }

                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                    margin-bottom: 2rem;
                    transition: color 0.2s;
                }

                .back-button:hover {
                    color: var(--color-primary);
                }

                .details-content {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 4rem;
                    align-items: start;
                }

                .profile-sidebar {
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: var(--shadow);
                    text-align: center;
                    position: sticky;
                    top: 100px;
                }

                .image-wrapper-large {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto 1.5rem;
                    border: 4px solid #f3f4f6;
                }

                .image-wrapper-large img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .profile-name {
                    font-size: 1.5rem;
                    color: var(--color-primary-dark);
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }

                .profile-role {
                    color: var(--color-primary);
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .social-links-large {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                .social-links-large a {
                    color: var(--color-text-light);
                    transition: all 0.2s;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: #f8fafc;
                }

                .social-links-large a:hover {
                    color: var(--color-primary);
                    background-color: #e0f2fe;
                    transform: translateY(-2px);
                }

                .metrics-card {
                    margin-top: 2rem;
                    padding: 1.5rem;
                    background: #f8fafc;
                    border-radius: 0.75rem;
                    border: 1px solid #e2e8f0;
                }

                .metrics-title {
                    font-size: 1rem;
                    color: var(--color-primary-dark);
                    margin-bottom: 1rem;
                    font-weight: 600;
                    text-align: center;
                }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    text-align: center;
                }

                .metric-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .metric-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .metrics-legend {
                    font-size: 0.75rem;
                    color: var(--color-text-light);
                    margin-top: 1rem;
                    line-height: 1.4;
                    padding: 0 1rem;
                    text-align: center;
                    font-style: italic;
                }

                .bio-content {
                    background: white;
                    padding: 2rem; /* Reduced from 3rem to align with sidebar */
                    border-radius: 1rem;
                    box-shadow: var(--shadow-sm);
                }

                .bio-content h2 {
                    font-size: 2rem;
                    color: var(--color-primary-dark);
                    margin-bottom: 1.5rem;
                }

                .bio-text p {
                    margin-bottom: 1.5rem;
                    line-height: 1.8;
                    color: var(--color-text);
                    font-size: 1.05rem;
                    text-align: justify;
                }

                @media (max-width: 768px) {
                    .details-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .profile-sidebar {
                        position: static;
                    }
                }

                .orcid-publications {
                    margin-top: 3rem;
                    border-top: 1px solid #e2e8f0;
                    padding-top: 2rem;
                }

                .orcid-section-title {
                    font-size: 1.5rem;
                    color: var(--color-primary-dark);
                    margin-bottom: 1.5rem;
                }

                .orcid-controls {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .search-bar {
                    position: relative;
                    flex: 1 1 250px;
                    max-width: 100%;
                }

                .search-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--color-text-light);
                    opacity: 0.7;
                }

                .search-bar input {
                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 2.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 9999px;
                    background-color: #f8fafc;
                    color: var(--color-text);
                    font-size: 0.875rem;
                    outline: none;
                    transition: all 0.2s;
                }

                .search-bar input:focus {
                    background-color: #ffffff;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
                }

                .orcid-badges {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .orcid-badge {
                    background-color: #f1f5f9;
                    color: var(--color-text);
                    padding: 0.5rem 1rem;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    border: 1px solid #e2e8f0;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                }

                .orcid-badge:hover {
                    background-color: #e2e8f0;
                }

                .orcid-badge.active {
                    background-color: var(--color-primary);
                    color: white;
                    border-color: var(--color-primary);
                }

                .orcid-badge strong {
                    color: var(--color-primary);
                    transition: color 0.2s;
                }

                .orcid-badge.active strong {
                    color: white;
                }

                .orcid-works-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .orcid-work-item {
                    padding: 1.25rem 0;
                    border-bottom: 1px solid #f1f5f9;
                }

                .orcid-work-item:last-child {
                    border-bottom: none;
                }

                .work-title {
                    font-weight: 600;
                    color: var(--color-text);
                    margin-bottom: 0.5rem;
                    line-height: 1.5;
                }

                .work-link {
                    color: var(--color-text);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .work-link:hover {
                    color: var(--color-primary);
                }

                .work-link-icon {
                    opacity: 0.5;
                    transition: opacity 0.2s;
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 0.35rem;
                    position: relative;
                    top: -2px;
                    width: 14px;
                    height: 14px;
                }

                .work-link:hover .work-link-icon {
                    opacity: 1;
                }

                .work-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: var(--color-text-light);
                    align-items: center;
                }

                .work-journal {
                    font-style: italic;
                }

                .work-type {
                    background: #e0f2fe;
                    color: var(--color-primary);
                    padding: 0.125rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                }

                .pagination-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #f1f5f9;
                }

                .items-per-page {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--color-text-light);
                }

                .items-per-page select {
                    padding: 0.25rem 0.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    background-color: white;
                    color: var(--color-text);
                    outline: none;
                    font-size: 0.875rem;
                    cursor: pointer;
                }

                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                }

                .pagination-numbers {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .pagination-icon-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    background: none;
                    border: none;
                    color: var(--color-primary);
                    cursor: pointer;
                    transition: all 0.2s;
                    border-radius: 4px;
                }

                .pagination-icon-btn:hover:not(:disabled) {
                    background-color: #f1f5f9;
                }

                .pagination-icon-btn:disabled {
                    color: #cbd5e1;
                    cursor: not-allowed;
                }

                .pagination-number {
                    min-width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    color: var(--color-text);
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: all 0.2s;
                }

                .pagination-number:hover:not(.active) {
                    background-color: #f1f5f9;
                }

                .pagination-number.active {
                    color: var(--color-primary);
                    border-bottom: 2px solid var(--color-primary);
                    border-radius: 0;
                }

                .pagination-ellipsis {
                    color: var(--color-text-light);
                    padding: 0 0.5rem;
                }
            `}</style>
        </section>
    );
};

export default ResearcherDetails;
