import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Award } from 'lucide-react';

const ResearchGroup = () => {
    const { t } = useTranslation();

    // Hardcoded text for now as we didn't add specific long descriptions to JSON yet, 
    // or we can use generic placeholders. The user request has specific text.
    // "Centro de Meta-Investigación y Cienciometría en Ciencias Biomédicas"

    return (
        <section id="group" className="section research-group">
            <div className="container">
                <div className="section-header">
                    <h2>{t('research_group.title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="content-card">
                    <div className="info-block">
                        <Award size={48} className="icon-main" />
                        <h3>{t('research_group.cecimib_minciencias')}</h3>
                        <p className="category-badge">{t('research_group.category_badge')}</p>

                        <p className="description">
                            {t('research_group.description')}
                        </p>

                        <a
                            href="https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000024122"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            {t('research_group.view_gruplac')} <ExternalLink size={18} style={{ marginLeft: '0.5rem' }} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResearchGroup;
