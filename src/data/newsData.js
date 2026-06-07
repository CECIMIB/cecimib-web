import fabriccioImg from '../assets/fabriccio-blog.jpeg';
import johanaImg from '../assets/johana-blog.jpeg';
import andyImg from '../assets/Andy-grado.jpeg';

// Single source of truth for news articles (images and order).
// The text content (title, excerpt, date, etc) is driven by the translation files (es.json / en.json) 
// using the 'id' as the key.
export const newsData = [
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
