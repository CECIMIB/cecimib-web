import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Certificates = () => {
  const { t } = useTranslation();
  const [documentId, setDocumentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!documentId.trim()) {
      setError('certificates.error_empty');
      setCertificate(null);
      return;
    }

    setLoading(true);
    setError('');
    setCertificate(null);

    const filename = `${documentId.trim()}.pdf`;

    try {
      const response = await fetch('https://zenodo.org/api/records/20575109');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      const foundFile = data.files?.find(f => f.key === filename || f.filename === filename);

      if (foundFile) {
        // Build URL
        const fileUrl = foundFile.links?.self || `https://zenodo.org/records/20575109/files/${filename}?download=1`;
        
        setCertificate({
          url: fileUrl,
          name: filename
        });
      } else {
        setError('certificates.error_not_found');
      }
    } catch (err) {
      console.error(err);
      setError('certificates.error_fetch');
    } finally {
      setLoading(false);
    }
  };

  const getLinkedInUrl = () => {
    if (!certificate) return '#';
    const baseUrl = 'https://www.linkedin.com/profile/add';
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: 'Fundamentals of R for Data Analysis',
      organizationName: 'Center for Scientific Consulting & Meta-Research in Biomedical Sciences',
      certUrl: certificate.url
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="certificates-section" id="certificados">
      <div className="certificates-header">
        <h2>{t('certificates.title')}</h2>
        <p>{t('certificates.subtitle')}</p>
      </div>

        <div className="search-card">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              placeholder={t('certificates.input_placeholder')}
              className="cert-input"
            />
            <button type="submit" disabled={loading} className="cert-button">
              {loading ? t('certificates.searching') : t('certificates.search_button')}
            </button>
          </form>

          {error && (
            <div className="cert-error">
              {t(error)}
            </div>
          )}

          {certificate && (
            <div className="cert-success-modern">
              <div className="cert-success-header">
                <h3>{t('certificates.success_title')}</h3>
                <p>{t('certificates.success_desc')}</p>
                <div className="cert-actions">
                  <a href={certificate.url} target="_blank" rel="noopener noreferrer" className="btn-download">
                    {t('certificates.download_button')}
                  </a>
                  <a href={getLinkedInUrl()} target="_blank" rel="noopener noreferrer" className="btn-linkedin">
                    {t('certificates.linkedin_button')}
                  </a>
                </div>
              </div>
              
              <div className="cert-instructions-card">
                <h4>{t('certificates.cvlac_instructions_title')}</h4>
                <p className="cert-inst-desc">{t('certificates.cvlac_instructions_desc')}</p>
                
                <ul className="cert-data-list">
                  <li><strong>{t('certificates.cvlac_name')}:</strong> {t('certificates.course_name')}</li>
                  <li><strong>{t('certificates.cvlac_institution')}:</strong> {t('certificates.course_institution')}</li>
                  <li><strong>{t('certificates.cvlac_intensity')}:</strong> {t('certificates.course_intensity')}</li>
                </ul>
                
                <div className="cert-contact">
                  <p>{t('certificates.contact_help')} <a href="mailto:david@cecimib.com">david@cecimib.com</a></p>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Certificates;
