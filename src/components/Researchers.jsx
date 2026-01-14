import React from 'react';
import { Linkedin, BookOpen, FileText, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Researchers = () => {
  const { t } = useTranslation();

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
      `}</style>
    </section>
  );
};

export default Researchers;
