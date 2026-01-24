import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Download, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
    const { t } = useTranslation();

    return (
        <section id="courses" className="section courses">
            <div className="container">
                <div className="section-header">
                    <h2>{t('courses.title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="course-card">
                    <div className="course-icon">
                        <BookOpen size={40} />
                    </div>
                    <div className="course-content">
                        <h3>{t('courses.r_fundamentals.title')}</h3>
                        <p className="course-description">
                            {t('courses.r_fundamentals.description')}
                        </p>

                        <div className="course-actions">
                            <Link
                                to="/course-details"
                                className="btn btn-primary"
                            >
                                <BookOpen size={18} style={{ marginRight: '0.5rem' }} />
                                {t('courses.r_fundamentals.more_details')}
                            </Link>
                            <a
                                href="https://github.com/Davidtdep/Fundamentals_of_R_for_Data_Analysis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                            >
                                <Github size={18} style={{ marginRight: '0.5rem' }} />
                                {t('courses.r_fundamentals.view_repo')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .courses {
                    padding: 2rem 0;
                    background-color: var(--color-bg);
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .section-header h2 {
                    font-size: 2.2rem;
                    color: var(--color-primary-dark);
                    margin-bottom: 1rem;
                }

                .underline {
                    width: 80px;
                    height: 4px;
                    background-color: var(--color-primary);
                    margin: 0 auto;
                    border-radius: 2px;
                }

                .course-card {
                    background: white;
                    border-radius: 1rem;
                    box-shadow: var(--shadow);
                    padding: 2.5rem;
                    display: flex;
                    gap: 2rem;
                    align-items: flex-start;
                    max-width: 900px;
                    margin: 0 auto;
                    border: 1px solid rgba(0,0,0,0.05);
                    transition: transform 0.3s;
                }

                .course-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                }

                .course-icon {
                    flex-shrink: 0;
                    width: 60px;
                    height: 60px;
                    background-color: #e0f2fe; /* Light blue */
                    color: var(--color-primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .course-content {
                    flex-grow: 1;
                }

                .course-content h3 {
                    font-size: 1.35rem;
                    color: var(--color-text);
                    margin-bottom: 1rem;
                }

                .course-description {
                    color: var(--color-text-light);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                .course-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                @media (max-width: 768px) {
                    .course-card {
                        flex-direction: column;
                        text-align: center;
                        align-items: center;
                    }
                    
                    .course-actions {
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default Courses;
