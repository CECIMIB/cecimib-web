import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfUse = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container">
      <div className="container">
        <h1>{t('legal.terms.title')}</h1>
        <p><strong>{t('legal.terms.updated')}</strong> {new Date().toLocaleDateString('es-CO')}</p>

        <h2>{t('legal.terms.s1_title')}</h2>
        <p>{t('legal.terms.s1_text')}</p>

        <h2>{t('legal.terms.s2_title')}</h2>
        <div className="medical-disclaimer" style={{ backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '1rem', margin: '1.5rem 0', borderRadius: '4px' }}>
          <strong>{t('legal.terms.s2_alert_strong')}</strong> {t('legal.terms.s2_alert_p1_1')}<strong>{t('legal.terms.s2_alert_p1_2')}</strong><br/><br/>
          {t('legal.terms.s2_alert_p2')}
        </div>

        <h2>{t('legal.terms.s3_title')}</h2>
        <p>{t('legal.terms.s3_text')}</p>

        <h2>{t('legal.terms.s4_title')}</h2>
        <p>{t('legal.terms.s4_text')}</p>
      </div>
    </div>
  );
};

export default TermsOfUse;
