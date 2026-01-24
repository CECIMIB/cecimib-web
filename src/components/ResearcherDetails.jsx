import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Linkedin, FileText, BookOpen, Globe } from 'lucide-react';


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

    if (!researcher) {
        return <div className="container section">Researcher not found</div>;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

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
                                        <Linkedin size={24} />
                                    </a>
                                )}
                                {researcher.links.orcid && (
                                    <a href={researcher.links.orcid} target="_blank" rel="noopener noreferrer" title="ORCID">
                                        <FileText size={24} />
                                    </a>
                                )}
                                {researcher.links.scholar && (
                                    <a href={researcher.links.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar">
                                        <BookOpen size={24} />
                                    </a>
                                )}
                                {researcher.links.researchgate && (
                                    <a href={researcher.links.researchgate} target="_blank" rel="noopener noreferrer" title="ResearchGate">
                                        <Globe size={24} />
                                    </a>
                                )}
                            </div>
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
            `}</style>
        </section>
    );
};

export default ResearcherDetails;
