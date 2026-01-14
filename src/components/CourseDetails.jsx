import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle back navigation to scroll to the specific section
    const handleBack = (e) => {
        e.preventDefault();
        // Navigate to home and pass the targetId state
        navigate('/', { state: { targetId: 'courses' } });
    };

    return (
        <section className="section course-details">
            <div className="container">
                <a href="/" onClick={handleBack} className="back-link">
                    <ArrowLeft size={18} /> {t('course_details.back_button')}
                </a>

                <div className="details-card">
                    <div className="header-row">
                        <h1>{t('course_details.r_fundamentals.title')}</h1>
                        <a
                            href={`${import.meta.env.BASE_URL}CourseProposal.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <Download size={18} style={{ marginRight: '0.5rem' }} />
                            {t('course_details.r_fundamentals.download_pdf')}
                        </a>
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <h3>{t('course_details.r_fundamentals.language_label')}</h3>
                            <p>{t('course_details.r_fundamentals.language_value')}</p>
                        </div>
                        <div className="info-item">
                            <h3>{t('course_details.r_fundamentals.duration_label')}</h3>
                            <p>{t('course_details.r_fundamentals.duration_value')}</p>
                        </div>
                        <div className="info-item">
                            <h3>{t('course_details.r_fundamentals.delivery_label')}</h3>
                            <p>{t('course_details.r_fundamentals.delivery_value')}</p>
                        </div>
                    </div>

                    <div className="section-block">
                        <h3>{t('course_details.r_fundamentals.objective_title')}</h3>
                        <p>
                            {t('course_details.r_fundamentals.objective_text')}
                        </p>
                    </div>

                    <div className="section-block">
                        <h3>{t('course_details.r_fundamentals.certification_title')}</h3>
                        <p>{t('course_details.r_fundamentals.certification_text')}</p>
                    </div>

                    <div className="section-block">
                        <h3>{t('course_details.r_fundamentals.methodology_title')}</h3>
                        <p>
                            {t('course_details.r_fundamentals.methodology_text')}
                        </p>
                    </div>

                    <div className="section-block">
                        <h3>{t('course_details.r_fundamentals.plan_title')}</h3>
                        <div className="table-responsive">
                            <table className="course-table">
                                <thead>
                                    <tr>
                                        <th>{t('course_details.r_fundamentals.table_week')}</th>
                                        <th>{t('course_details.r_fundamentals.table_session')}</th>
                                        <th>{t('course_details.r_fundamentals.table_topics')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowSpan="2">1</td>
                                        <td>1</td>
                                        <td dangerouslySetInnerHTML={{ __html: t('course_details.r_fundamentals.w1_s1_topics') }} />
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>{t('course_details.r_fundamentals.w1_s2_topics')}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">2</td>
                                        <td>3</td>
                                        <td dangerouslySetInnerHTML={{ __html: t('course_details.r_fundamentals.w2_s3_topics') }} />
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>{t('course_details.r_fundamentals.w2_s4_topics')}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">3</td>
                                        <td>5</td>
                                        <td>{t('course_details.r_fundamentals.w3_s5_topics')}</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>{t('course_details.r_fundamentals.w3_s6_topics')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="resources-link">
                        <p>{t('course_details.r_fundamentals.resources_text')} <a href="https://github.com/Davidtdep/Fundamentals_of_R_for_Data_Analysis" target="_blank" rel="noreferrer">{t('course_details.r_fundamentals.github_repo')}</a></p>
                    </div>

                </div>
            </div>

            <style>{`
                .course-details {
                    padding-top: 8rem;
                    padding-bottom: 5rem;
                    background-color: var(--color-bg);
                    min-height: 100vh;
                }
                
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    color: var(--color-text);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                
                .back-link:hover {
                    color: var(--color-primary);
                }

                .details-card {
                    background: white;
                    border-radius: 1rem;
                    box-shadow: var(--shadow);
                    padding: 3rem;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 2rem;
                }

                .header-row h1 {
                    font-size: 2rem;
                    color: var(--color-primary-dark);
                    margin: 0;
                    max-width: 600px;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                    background-color: #f8faff;
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                }

                .info-item h3 {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    color: var(--color-text-light);
                    margin-bottom: 0.5rem;
                    letter-spacing: 0.5px;
                }

                .info-item p {
                    font-weight: 600;
                    color: var(--color-text);
                    font-size: 1.1rem;
                }

                .section-block {
                    margin-bottom: 2.5rem;
                }

                .section-block h3 {
                    font-size: 1.3rem;
                    color: var(--color-primary);
                    margin-bottom: 1rem;
                }

                .section-block p {
                    line-height: 1.7;
                    color: var(--color-text);
                }

                .course-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;
                }

                .course-table th, .course-table td {
                    border: 1px solid #e0e0e0;
                    padding: 1rem;
                    text-align: left;
                    vertical-align: top;
                }

                .course-table th {
                    background-color: #f1f5f9;
                    font-weight: 700;
                    color: var(--color-primary-dark);
                }
                
                .course-table td {
                    color: var(--color-text);
                }

                .resources-link {
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid #eee;
                    font-weight: 500;
                }
                
                .resources-link a {
                    color: var(--color-primary);
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .header-row {
                        flex-direction: column;
                    }
                    
                    .details-card {
                        padding: 1.5rem;
                    }
                    
                    .table-responsive {
                        overflow-x: auto;
                    }
                }
            `}</style>
        </section>
    );
};

export default CourseDetails;
