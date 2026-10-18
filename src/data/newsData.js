import fabriccioImg from '../assets/fabriccio-blog.jpeg';
import johanaImg from '../assets/johana-blog.jpeg';
import andyImg from '../assets/Andy-grado.jpeg';
import columna1Img from '../assets/columna1.png';
import columna2Img from '../assets/columna2.png';
import columna3Img from '../assets/columna3.png';
import columna4Img from '../assets/columna4.png';
import columna5Img from '../assets/columna5.png';
import columna6Img from '../assets/columna6.png';
import columna7Img from '../assets/columna7.png';
import columna8Img from '../assets/columna8.png';
import columna9_1Img from '../assets/columna9_1.jpeg';
import columna9_2Img from '../assets/columna9_2.jpeg';
import columna10Img from '../assets/columna10.png';

// Single source of truth for news articles (images and order).
// The text content (title, excerpt, date, etc) is driven by the translation files (es.json / en.json) 
// using the 'id' as the key.
export const newsData = [
    {
        id: '2-10-2026',
        image: columna10Img,
    },
    {
        id: '2-9-2026',
        image: columna9_1Img,
        secondaryImage: columna9_2Img,
    },
    {
        id: '2-8-2026',
        image: columna8Img,
    },
    {
        id: '2-7-2026',
        image: columna7Img,
    },
    {
        id: '2-6-2026',
        image: columna6Img,
    },
    {
        id: '2-5-2026',
        image: columna5Img,
    },
    {
        id: '2-4-2026',
        image: columna4Img,
    },
    {
        id: '1-6-2026',
        image: columna3Img,
    },
    {
        id: '1-5-2026',
        image: columna2Img,
    },
    {
        id: '1-4-2026',
        image: columna1Img,
    },
    {
        id: '1-3-2026',
        image: andyImg,
    },
    {
        id: '1-1-2026',
        image: fabriccioImg,
    },
    {
        id: '1-2-2026',
        image: johanaImg,
    }
];
