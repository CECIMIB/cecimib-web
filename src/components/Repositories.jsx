import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Database, ExternalLink } from 'lucide-react';
import '../App.css';

const Repositories = () => {
    const { t } = useTranslation();

    const handleCardClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="repositories" className="section repositories">
            <div className="container">
                <div className="section-header">
                    <h2>{t('repositories.title')}</h2>
                    <div className="underline"></div>
                    <p className="subtitle">{t('repositories.subtitle')}</p>
                </div>

                <div className="repositories-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="repository-card clickable"
                        onClick={() => handleCardClick('https://github.com/CECIMIB')}
                    >
                        <div className="repo-icon-wrapper github">
                            <Github size={48} />
                        </div>
                        <h3>GitHub</h3>
                        <p>{t('repositories.github_desc')}</p>
                        <span className="view-more">
                            {t('researchers_details.view_more')} <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="repository-card clickable"
                        onClick={() => handleCardClick('https://zenodo.org/communities/cecimib/')}
                    >
                        <div className="repo-icon-wrapper zenodo">
                            <img
                                src={`${import.meta.env.BASE_URL}zenodo_logo.png`}
                                alt="Zenodo"
                                style={{
                                    width: '80%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    filter: 'invert(27%) sepia(91%) saturate(1905%) hue-rotate(198deg) brightness(92%) contrast(89%)' /* Approximation of #1b5aab based on site primary color */
                                }}
                            />
                        </div>
                        <h3>Zenodo</h3>
                        <p>{t('repositories.zenodo_desc')}</p>
                        <span className="view-more">
                            {t('researchers_details.view_more')} <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                        </span>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .repositories {
                    background-color: white;
                    padding: 4rem 0;
                }

                .repositories-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 3rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .repository-card {
                    padding: 3rem;
                    border-radius: 1rem;
                    background-color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid rgba(0,0,0,0.05);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 350px; /* Fixed width to match publication cards */
                    cursor: pointer;
                }

                .repository-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                .repo-icon-wrapper {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    margin-bottom: 1.5rem;
                }

                .repo-icon-wrapper.github {
                    background-color: #24292e20;
                    color: #24292e;
                }

                .repo-icon-wrapper.zenodo {
                    background-color: transparent; /* Transparent as requested or maybe light blue? User said "colores azul de la pagina". Let's use the primary color variable for specific styling if needed or keep it clean. */
                    /* Given the image is black/white or solid, maybe we want the circle to be light blue like text? */
                    /* Re-reading request: "con los colores azul de la pagina" (with the blue colors of the page). */
                    /* The image attached is black. I should probably filter it to be blue OR make the background blue. */
                    /* Let's try making the icon itself blue using CSS filter since it's a PNG mask likely, or just use the primary color for text which is already inherited. */
                    /* If the image is black text, I can use a filter to turn it blue. */
                    /* Filter for typical blue #007bff approx: filter: invert(33%) sepia(87%) saturate(2462%) hue-rotate(202deg) brightness(96%) contrast(106%); */
                    /* Or simpler: pure blue. */
                }

                .repository-card h3 {
                    font-size: 1.75rem;
                    margin-bottom: 1rem;
                    color: var(--color-text);
                    font-weight: 700;
                }

                .repository-card p {
                    color: var(--color-text-light);
                    font-size: 0.95rem;
                    margin-bottom: 2rem;
                    line-height: 1.5;
                    flex-grow: 1;
                }

                /* Mobile Adjustments */
                @media (max-width: 768px) {
                    .repository-card {
                        width: 100%;
                        max-width: 350px;
                        padding: 2.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Repositories;
