import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import fabriccioImg from '../assets/fabriccio-blog.jpeg';

const Bulletins = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const bulletins = [
        {
            id: 'fabriccio_renacyt',
            image: fabriccioImg,
        }
    ];

    return (
        <section id="bulletins" className="section bulletins">
            <div className="container">
                <div className="section-header">
                    <h2>{t('bulletins.title')}</h2>
                    <div className="underline"></div>
                </div>

                <div className="bulletins-grid">
                    {bulletins.map((bulletin) => (
                        <div key={bulletin.id} className="bulletin-card" onClick={() => navigate(`/bulletin/${bulletin.id}`)}>
                            <div className="bulletin-image">
                                <img src={bulletin.image} alt={t(`bulletins.items.${bulletin.id}.title`)} />
                            </div>
                            <div className="bulletin-content">
                                <h3>{t(`bulletins.items.${bulletin.id}.title`)}</h3>
                                <p className="bulletin-excerpt">{t(`bulletins.items.${bulletin.id}.p1`)}</p>
                                <button className="btn-read-more" onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/bulletin/${bulletin.id}`);
                                }}>
                                    {t('bulletins.read_more')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Bulletins;
