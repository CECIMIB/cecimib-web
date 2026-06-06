import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const OpenScience = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container">
      <div className="container">
        <h1>{t('legal.open_science.title')}</h1>
        
        <h2>{t('legal.open_science.s1_title')}</h2>
        <p>{t('legal.open_science.s1_text_1')}<em>{t('legal.open_science.s1_text_2')}</em>{t('legal.open_science.s1_text_3')}</p>

        <h2>{t('legal.open_science.s2_title')}</h2>
        <p>{t('legal.open_science.s2_text_1')}<strong>{t('legal.open_science.s2_text_2')}</strong>{t('legal.open_science.s2_text_3')}</p>
        
        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '0.9rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
          <strong>MIT License</strong><br/><br/>
          Copyright (c) {new Date().getFullYear()} Centro de Consultoría Científica y Meta-Investigación en Ciencias Biomédicas (CECIMIB)<br/><br/>
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br/><br/>
          The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br/><br/>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </div>

        <p>{t('legal.open_science.permissions_title')}</p>
        <ul>
          <li><strong>{t('legal.open_science.perm_1_strong')}</strong> {t('legal.open_science.perm_1_text')}</li>
          <li><strong>{t('legal.open_science.perm_2_strong')}</strong> {t('legal.open_science.perm_2_text')}</li>
          <li><strong>{t('legal.open_science.perm_3_strong')}</strong> {t('legal.open_science.perm_3_text')}</li>
        </ul>
        <p><strong>{t('legal.open_science.condition_strong')}</strong> {t('legal.open_science.condition_text')}</p>
      </div>
    </div>
  );
};

export default OpenScience;
