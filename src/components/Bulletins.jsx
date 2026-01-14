import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const Bulletins = () => {
    const { t } = useTranslation();

    return (
        <section id="bulletins" className="section bulletins">
            <div className="container">
                <div className="section-header">
                    <h2>{t('bulletins.title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="empty-state">
                    <div className="icon-circle">
                        <FileText size={48} />
                    </div>
                    <h3>{t('bulletins.coming_soon')}</h3>
                    <p>
                        {t('bulletins.description')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Bulletins;
