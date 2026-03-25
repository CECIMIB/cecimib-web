import React, { useState, useRef } from 'react';
import { Linkedin, BookOpen, FileText, Globe, ArrowRight, ChevronDown, MapPin, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const collaborators = [
  { id: 'fabriccio', flag: '🇵🇪' },
  { id: 'foday', flag: '🇸🇱' },
  { id: 'johana', flag: '🇨🇴' },
  { id: 'kevin', flag: '🇨🇴' },
];

const Researchers = () => {
  const { t } = useTranslation();
  const [showCollaborators, setShowCollaborators] = useState(false);
  const collabRef = useRef(null);

  const researchers = [
    {
      id: 'ivan',
      name: "Ivan David Lozada-Martinez",
      photo: `${import.meta.env.BASE_URL}researchers/ivan-lozada-martinez.png`,
      links: {
        linkedin: "https://www.linkedin.com/in/ivan-david-lozada-martinez/?originalSubdomain=co",
        orcid: "https://orcid.org/0000-0002-1960-7334",
        scholar: "https://scholar.google.es/citations?user=fA3e4-8AAAAJ&hl=es&oi=ao",
        researchgate: "https://www.researchgate.net/profile/Ivan-David-Lozada-Martinez"
      }
    },
    {
      id: 'david',
      name: "David A. Hernandez-Paez",
      photo: `${import.meta.env.BASE_URL}researchers/david-hernandez-paez.jpeg`,
      links: {
        linkedin: "https://www.linkedin.com/in/david-a-hernandez-paez-463a24273/",
        orcid: "https://orcid.org/0000-0002-6742-3185",
        scholar: "https://scholar.google.es/citations?user=KviJPbAAAAAJ&hl=es",
        researchgate: "https://www.researchgate.net/profile/David-Hernandez-Paez"
      }
    },
    {
      id: 'andy',
      name: "Andy A. Acosta-Monterrosa",
      photo: `${import.meta.env.BASE_URL}researchers/andy-acosta-monterrosa.jpeg`,
      links: {
        linkedin: "https://www.linkedin.com/in/andy-a-acosta-monterrosa-08a7b2353/",
        orcid: "https://orcid.org/0000-0002-6860-1043",
        scholar: "https://scholar.google.es/citations?user=jccSioEAAAAJ&hl=es",
        researchgate: "https://www.researchgate.net/profile/Andy-A-Acosta-Monterrosa"
      }
    }
  ];

  const toggleCollaborators = () => {
    setShowCollaborators(prev => !prev);
  };

  return (
    <section id="researchers" className="section researchers">
      <div className="container">
        <div className="section-header">
          <h2>{t('researchers.title')}</h2>
          <div className="underline"></div>
        </div>

        <div className="researchers-grid">
          {researchers.map((researcher, index) => (
            <div key={index} className="researcher-card">
              <div className="image-wrapper">
                <img src={researcher.photo} alt={researcher.name} />
              </div>
              <div className="researcher-info">
                <h3>{researcher.name}</h3>
                <span className="role">{t(`researchers.${researcher.id}.role`)}</span>
                <p>{t(`researchers.${researcher.id}.bio`)}</p>

                <Link to={`/researcher/${researcher.id}`} className="view-more-link">
                  {t('researchers_details.view_more')} <ArrowRight size={16} />
                </Link>

                <div className="social-links">
                  {researcher.links.linkedin && (
                    <a href={researcher.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {researcher.links.orcid && (
                    <a href={researcher.links.orcid} target="_blank" rel="noopener noreferrer" title="ORCID">
                      <FileText size={20} />
                    </a>
                  )}
                  {researcher.links.scholar && (
                    <a href={researcher.links.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar">
                      <BookOpen size={20} />
                    </a>
                  )}
                  {researcher.links.researchgate && (
                    <a href={researcher.links.researchgate} target="_blank" rel="noopener noreferrer" title="ResearchGate">
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible Collaborators Toggle */}
        <div className="collaborators-cta">
          <button
            onClick={toggleCollaborators}
            className={`btn btn-outline collaborators-toggle-btn ${showCollaborators ? 'active' : ''}`}
          >
            {t('researchers.view_collaborators')}
            <ChevronDown size={18} className={`toggle-chevron ${showCollaborators ? 'rotated' : ''}`} />
          </button>
        </div>

        {/* Collapsible Collaborators Panel */}
        <div
          ref={collabRef}
          className={`collaborators-panel ${showCollaborators ? 'expanded' : ''}`}
          style={{
            maxHeight: showCollaborators ? (collabRef.current ? collabRef.current.scrollHeight + 'px' : '600px') : '0px',
          }}
        >
          <div className="collaborators-panel-inner" id="collaborators">
            <h3 className="collab-section-title">{t('collaborators.title')}</h3>
            <p className="collab-section-subtitle">{t('collaborators.subtitle')}</p>

            <div className="collaborators-grid">
              {collaborators.map((collab) => (
                <div key={collab.id} className="collaborator-card">
                  <div className="collab-avatar">
                    <span className="collab-initials">
                      {t(`collaborators.${collab.id}.name`).split(' ').map(w => w[0]).filter((_, i, arr) => i === 0 || i === arr.length - 1).join('')}
                    </span>
                  </div>
                  <div className="collab-info">
                    <h4 className="collab-name">{t(`collaborators.${collab.id}.name`)}</h4>
                    <div className="collab-affiliation">
                      <Building2 size={15} />
                      <span>{t(`collaborators.${collab.id}.affiliation`)}</span>
                    </div>
                    <div className="collab-country">
                      <MapPin size={15} />
                      <span>{t(`collaborators.${collab.id}.country`)}</span>
                      <span className="country-flag">{collab.flag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .researchers {
          background-color: var(--color-white);
          padding: 2rem 0;
        }

        .researchers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .researcher-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }

        .researcher-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .image-wrapper {
          width: 100%;
          height: 300px;
          overflow: hidden;
          background-color: #f3f4f6;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .researcher-card:hover .image-wrapper img {
          transform: scale(1.05);
        }

        .researcher-info {
          padding: 1.5rem;
          text-align: center;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .researcher-info h3 {
          font-size: 1.25rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.25rem;
        }

        .role {
          display: block;
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .researcher-info p {
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          flex-grow: 1;
        }

        .view-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          align-self: center;
          transition: gap 0.2s;
        }

        .view-more-link:hover {
          gap: 0.8rem;
          text-decoration: underline;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: auto;
        }

        .social-links a {
          color: var(--color-text-light);
          transition: color 0.2s, transform 0.2s;
        }

        .social-links a:hover {
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        /* Collaborators Toggle Button */
        .collaborators-cta {
          text-align: center;
          margin-top: 2.5rem;
        }

        .collaborators-toggle-btn {
          font-size: 0.95rem;
          padding: 0.75rem 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .collaborators-toggle-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .toggle-chevron {
          transition: transform 0.3s ease;
        }

        .toggle-chevron.rotated {
          transform: rotate(180deg);
        }

        /* Collapsible Panel */
        .collaborators-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .collaborators-panel.expanded {
          /* max-height set via inline style */
        }

        .collaborators-panel-inner {
          padding-top: 2.5rem;
          text-align: center;
        }

        .collab-section-title {
          font-size: 1.5rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .collab-section-subtitle {
          color: var(--color-text-light);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        /* Collaborators Grid & Cards */
        .collaborators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .collaborator-card {
          background: var(--color-bg-alt);
          border-radius: 1rem;
          padding: 1.75rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .collaborator-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }

        .collab-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(27, 90, 171, 0.12) 0%, rgba(27, 90, 171, 0.06) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(27, 90, 171, 0.15);
        }

        .collab-initials {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.5px;
        }

        .collab-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 0;
        }

        .collab-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          line-height: 1.3;
        }

        .collab-affiliation {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          color: var(--color-text-light);
          font-size: 0.88rem;
          line-height: 1.4;
        }

        .collab-affiliation svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .collab-country {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-text-light);
          font-size: 0.85rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .collab-country svg {
          flex-shrink: 0;
        }

        .country-flag {
          font-size: 0.95rem;
          margin-left: 0.1rem;
        }

        @media (max-width: 768px) {
          .collaborators-grid {
            grid-template-columns: 1fr;
          }

          .collaborator-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Researchers;
