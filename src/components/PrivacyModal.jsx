import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="privacy-modal-close" onClick={onClose}>&times;</button>
        <div className="privacy-modal-body">
          <h4>{t('privacy_policy.title')}</h4>
          <p>{t('privacy_policy.p1')}</p>
          
          <h5>{t('privacy_policy.purposes_title')}</h5>
          <ul>
            <li>{t('privacy_policy.purpose_1')}</li>
            <li>{t('privacy_policy.purpose_2')}</li>
            <li>{t('privacy_policy.purpose_3')}</li>
          </ul>

          <h5>{t('privacy_policy.rights_title')}</h5>
          <p>{t('privacy_policy.rights_text')}</p>

          <h5>{t('privacy_policy.channel_title')}</h5>
          <p>{t('privacy_policy.channel_text')}<a href="mailto:david@cecimib.com">david@cecimib.com</a>.</p>
        </div>
        <div className="privacy-modal-footer">
          <button className="btn-close-modal" onClick={onClose}>{t('privacy_policy.close_btn')}</button>
        </div>
      </div>
      <style>{`
        .privacy-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 1rem;
          backdrop-filter: blur(3px);
        }
        .privacy-modal-content {
          background-color: #ffffff;
          border-radius: 12px;
          width: 100%;
          max-width: 650px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          font-family: inherit;
          color: #333;
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .privacy-modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: transparent;
          border: none;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          color: #888;
          transition: color 0.2s;
        }
        .privacy-modal-close:hover {
          color: #222;
        }
        .privacy-modal-body {
          padding: 35px 30px 20px 30px;
          text-align: left;
        }
        .privacy-modal-body h4 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 1.2rem;
          color: var(--color-primary-dark, #0a367a);
          line-height: 1.4;
        }
        .privacy-modal-body h5 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
          color: var(--color-primary, #0d47a1);
        }
        .privacy-modal-body p, .privacy-modal-body ul {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          color: #444;
        }
        .privacy-modal-body ul {
          padding-left: 1.5rem;
        }
        .privacy-modal-body li {
          margin-bottom: 0.5rem;
        }
        .privacy-modal-body a {
          color: var(--color-primary, #0d47a1);
          text-decoration: underline;
          font-weight: 500;
        }
        .privacy-modal-footer {
          padding: 15px 30px;
          border-top: 1px solid #e0e0e0;
          text-align: right;
          background-color: #f8faff;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }
        .btn-close-modal {
          background-color: var(--color-primary, #0d47a1);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: background-color 0.2s, transform 0.1s;
        }
        .btn-close-modal:hover {
          background-color: var(--color-primary-dark, #0a367a);
          transform: translateY(-1px);
        }
        @media (max-width: 600px) {
          .privacy-modal-body {
            padding: 25px 20px 15px 20px;
          }
          .privacy-modal-footer {
            padding: 15px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyModal;
