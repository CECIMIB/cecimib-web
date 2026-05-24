import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import fabriccioImg from '../assets/fabriccio-blog.jpeg';
import johanaImg from '../assets/johana-blog.jpeg';

const Bulletins = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const bulletins = [
        {
            id: '1-1-2026',
            image: fabriccioImg,
        },
        {
            id: '1-2-2026',
            image: johanaImg,
        }
    ];

    const filteredBulletins = bulletins.filter(bulletin => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const title = t(`bulletins.items.${bulletin.id}.title`, { defaultValue: '' }).toLowerCase();
        const author = t(`bulletins.items.${bulletin.id}.author`, { defaultValue: 'Andy A. Acosta-Monterrosa' }).toLowerCase();
        const p1 = t(`bulletins.items.${bulletin.id}.p1`, { defaultValue: '' }).toLowerCase();
        const keywords = t(`bulletins.items.${bulletin.id}.keywords`, { returnObjects: true, defaultValue: [] });
        const keywordsStr = Array.isArray(keywords) ? keywords.join(' ').toLowerCase() : '';

        return title.includes(q) || author.includes(q) || p1.includes(q) || keywordsStr.includes(q);
    });

    return (
        <section id="bulletins" className="section bulletins">
            <div className="container">
                <div className="bulletins-search-wrapper">
                    <input 
                        type="text" 
                        className="bulletins-search-input" 
                        placeholder={i18n.language === 'es' ? "Ingresa palabras clave, título o autor..." : "Enter keywords, title, or author..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bulletins-search-button">
                        {i18n.language === 'es' ? "Buscar" : "Search"}
                    </button>
                </div>

                <div className="section-header">
                    <h2 className="pt-serif-bold">{t('bulletins.title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="editorial-list">
                    {filteredBulletins.map((bulletin) => (
                        <div key={bulletin.id} className="editorial-item" onClick={() => navigate(`/bulletin/${bulletin.id}`)}>
                            <div className="editorial-meta">
                                <span className="editorial-type">{i18n.language === 'es' ? 'Boletín' : 'Bulletin'}</span>
                                {t(`bulletins.items.${bulletin.id}.date`) !== `bulletins.items.${bulletin.id}.date` && (
                                    <span className="editorial-date pt-serif-regular">{t(`bulletins.items.${bulletin.id}.date`)}</span>
                                )}
                            </div>
                            
                            <div className="editorial-content">
                                <h3 className="editorial-title pt-serif-bold">{t(`bulletins.items.${bulletin.id}.title`)}</h3>
                                <p className="editorial-authors pt-serif-regular">{t(`bulletins.items.${bulletin.id}.author`, { defaultValue: 'Andy A. Acosta-Monterrosa' })}</p>
                                <p className="editorial-excerpt pt-serif-regular">{t(`bulletins.items.${bulletin.id}.p1`)}</p>
                            </div>
                            
                            <div className="editorial-thumbnail">
                                <img src={bulletin.image} alt={t(`bulletins.items.${bulletin.id}.title`)} />
                            </div>
                        </div>
                    ))}
                    
                    {filteredBulletins.length === 0 && (
                        <div className="bulletins-no-results">
                            {i18n.language === 'es' ? "No se encontraron boletines con esos términos." : "No bulletins found matching those terms."}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Bulletins;
