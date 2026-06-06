import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './CollaboratorsMap.css';

// Countries with their coordinates for the map
const countryNodes = {
  colombia: { id: "colombia", name: "Colombia", coordinates: [-74.2973, 4.5709] },
  spain: { id: "spain", name: "España", coordinates: [-3.7492, 40.4637] },
  nicaragua: { id: "nicaragua", name: "Nicaragua", coordinates: [-85.2072, 12.8654] },
  peru: { id: "peru", name: "Perú", coordinates: [-75.0152, -9.19] },
  ecuador: { id: "ecuador", name: "Ecuador", coordinates: [-78.1834, -1.8312] },
  sierra_leone: { id: "sierra_leone", name: "Sierra Leona", coordinates: [-11.7799, 8.4606] },
  venezuela: { id: "venezuela", name: "Venezuela", coordinates: [-66.5897, 6.4238] },
  usa: { id: "usa", name: "Estados Unidos", coordinates: [-95.7129, 37.0902] }
};

// Collaborators data grouped by country
const collaboratorsByCountry = {
  colombia: [
    { name: "David A. Hernandez-Paez", role: "Médico en formación e Investigador Asociado", institution: "Centro de Consultoría Científica y Meta-Investigación en Ciencias Biomédicas (CECIMIB)", orcid: "https://orcid.org/0000-0002-6742-3185" },
    { name: "Johana Galvan Barrios", role: "Colaboradora", institution: "Universidad de la Costa", orcid: "https://orcid.org/0000-0003-2445-3680" },
    { name: "Kevin Fernando Montoya-Quintero", role: "Colaborador", institution: "Universidad de Manizales", orcid: "https://orcid.org/0000-0002-6212-7141" },
    { name: "Juan David Reyes Duque", role: "Colaborador", institution: "Universidad de Manizales", orcid: "https://orcid.org/0000-0002-2363-6058" },
    { name: "Johan Vergara Rios", role: "Colaborador", institution: "Universidad Nacional de Colombia", orcid: "https://orcid.org/0009-0003-3429-7463" },
    { name: "Jhony Diaz Vallejo", role: "Colaborador", institution: "Universidad de Caldas", orcid: "https://orcid.org/0000-0002-0784-6688" },
    { name: "Luz Miryam Lozada Martinez", role: "Colaboradora", institution: "Corporación para Investigaciones Biológicas", orcid: "https://orcid.org/0009-0002-0195-4108" },
    { name: "Martha Elena Montoya-Vega", role: "Colaboradora", institution: "Universidad de Córdoba", orcid: "https://orcid.org/0000-0002-0525-649X" }
  ],
  spain: [
    { name: "Yelson Alejandro Picón Jaimes", role: "Colaborador Internacional", institution: "Centre d’Atenció Primària La Pau-Institut Català de la Salut", orcid: "https://orcid.org/0000-0002-7498-5346" }
  ],
  nicaragua: [
    { name: "Alexis Rafael Narvaez-Rojas", role: "Colaborador Internacional", institution: "Hospital Militar Escuela \"Alejandro Davila Bolaños\"", orcid: "https://orcid.org/0000-0001-6987-5030" },
    { name: "Patricia Delgado", role: "Colaboradora Internacional", institution: "Universidad Nacional Autónoma de Nicaragua", orcid: "https://orcid.org/0000-0002-7779-9995" }
  ],
  peru: [
    { name: "Fabriccio J. Visconti-Lopez", role: "Colaborador Internacional", institution: "Universidad Científica del Sur", orcid: "https://orcid.org/0000-0002-8056-2112" }
  ],
  ecuador: [
    { name: "Wendy Cuji-Galarza", role: "Colaboradora Internacional", institution: "Universidad de Cuenca", orcid: "https://orcid.org/0000-0002-7167-3232" }
  ],
  sierra_leone: [
    { name: "Sulaiman Kalokoh", role: "Colaborador Internacional", institution: "Limkokwing University of Creative Technology", orcid: "https://orcid.org/0009-0004-4862-3474" },
    { name: "Foday Tejan Mansaray", role: "Colaborador Internacional", institution: "Connaught Hospital", orcid: "https://orcid.org/0009-0002-1988-5462" }
  ],
  venezuela: [
    { name: "Foday Tejan Mansaray", role: "Colaborador Internacional", institution: "Universidad Centroccidental Lisandro Alvarado", orcid: "https://orcid.org/0009-0002-1988-5462" }
  ],
  usa: [
    { name: "Alexis Rafael Narvaez-Rojas", role: "Colaborador Internacional", institution: "Hospital Militar Escuela \"Alejandro Davila Bolaños\"", orcid: "https://orcid.org/0000-0001-6987-5030" }
  ]
};

// Map nodes and arcs for 3D Globe
const arcsData = Object.keys(countryNodes)
  .filter(id => id !== 'colombia')
  .map(id => ({
    startLat: countryNodes.colombia.coordinates[1],
    startLng: countryNodes.colombia.coordinates[0],
    endLat: countryNodes[id].coordinates[1],
    endLng: countryNodes[id].coordinates[0],
    color: '#005bb5'
  }));

// Generar una imagen plana de 1x1 para pintar el mar (océano)
const getOceanImage = () => {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FAFAFA'; 
    ctx.fillRect(0, 0, 2, 2);
    return canvas.toDataURL();
  }
  return '';
};

const CollaboratorsMap = () => {
  const { t } = useTranslation();
  const wrapperRef = useRef();
  const globeRef = useRef();

  const markersData = Object.values(countryNodes).map(node => ({
    lat: node.coordinates[1],
    lng: node.coordinates[0],
    id: node.id,
    name: t(`countries.${node.id}`)
  }));

  const [isVisible, setIsVisible] = useState(false);
  const [countries, setCountries] = useState({ features: [] });
  const [activeCountry, setActiveCountry] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  
  // Intersection Observer para Lazy Loading (Optimización de rendimiento)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Solo necesitamos detectarlo una vez
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 } // Cargar un poco antes de que entre a pantalla
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Resize handling
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('globe-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: window.innerWidth < 768 ? 500 : 800
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Fetch Polygons Data only when visible
  useEffect(() => {
    if (isVisible) {
      fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(setCountries)
        .catch(err => console.error("Error cargando mapa:", err));
    }
  }, [isVisible]);

  // Configure 3D Globe styling and rotation
  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotation config
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = false;

      // Set initial POV closer to Colombia but zoomed out enough to not clip the atmosphere
      globeRef.current.pointOfView({ lat: 10, lng: -60, altitude: 2.5 }, 1000);

      // Force flat solid color on the globe by manipulating lights
      const applyLighting = () => {
        try {
          const scene = globeRef.current.scene();
          scene.children.forEach(child => {
            // Eliminar luces direccionales para matar sombras y degradados
            if (child.type === 'DirectionalLight' || child.type === 'PointLight') {
              child.intensity = 0; 
            } 
            // Subir la luz ambiental para iluminar la textura y hacerla casi blanca
            else if (child.type === 'AmbientLight') {
              child.color.set('#ffffff');
              child.intensity = 2.5;
            }
          });
        } catch (e) {}
      };

      // Limitar la resolución interna de renderizado para máxima fluidez en pantallas retina/móviles
      try {
        const renderer = globeRef.current.renderer();
        if (renderer) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }
      } catch (e) {}

      applyLighting();
      setTimeout(applyLighting, 100);
      setTimeout(applyLighting, 1000);
    }
  }, [globeRef.current, countries]);

  const handleCountryClick = (countryId) => {
    setActiveCountry(countryId);
    if (globeRef.current) {
      // Stop rotation when looking at cards
      globeRef.current.controls().autoRotate = false;
      
      // Center camera to country
      const node = countryNodes[countryId];
      if (node) {
        globeRef.current.pointOfView({ lat: node.coordinates[1], lng: node.coordinates[0], altitude: 1.5 }, 800);
      }
    }
  };

  const closeCards = () => {
    setActiveCountry(null);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
    }
  };

  const scrollContainer = (dir) => {
    const container = document.getElementById('cards-scroll-container');
    if (container) {
      container.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="network-map-wrapper" ref={wrapperRef} style={{ minHeight: dimensions.height }}>
      <div id="globe-container" className="network-map-container">
        {isVisible && typeof window !== 'undefined' && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            showGlobe={true}
            globeImageUrl={getOceanImage()}
            showAtmosphere={true}
            atmosphereColor="#cccccc"
            atmosphereAltitude={0.15}
            
            // Polygon styling for countries (continents)
            polygonsData={countries.features}
            polygonAltitude={0.01}
            polygonCapColor={() => '#9ca3af'} // Gris un poco más oscuro
            polygonSideColor={() => 'rgba(156, 163, 175, 0.2)'}
            polygonStrokeColor={() => '#6b7280'}

            // Networking arcs
            arcsData={arcsData}
            arcColor={'color'}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcAltitudeAutoScale={0.3}

            // Interactive Markers (HTML)
            htmlElementsData={markersData}
            htmlElement={d => {
              const el = document.createElement('div');
              el.innerHTML = `
                <div class="network-node-3d">
                  <div class="node-circle-3d"></div>
                  <div class="node-pulse-3d"></div>
                  <div class="node-label-3d">${d.name}</div>
                </div>
              `;
              el.style.cursor = 'pointer';
              el.onclick = () => handleCountryClick(d.id);
              return el;
            }}
          />
        )}
      </div>

      {/* Overlay Horizontal Cards */}
      {activeCountry && (
        <div className="country-cards-overlay">
          <div className="country-cards-header">
            <h4>{t('map_investigators_in')} {t(`countries.${activeCountry}`)}</h4>
            <button className="close-cards-btn" onClick={closeCards}>
              <X size={20} />
            </button>
          </div>
          
          <div className="cards-slider-wrapper">
            {collaboratorsByCountry[activeCountry].length > 1 && (
              <button className="slider-btn left" onClick={() => scrollContainer('left')}>
                <ChevronLeft size={20} />
              </button>
            )}
            
            <div className="cards-scroll-container" id="cards-scroll-container">
              {collaboratorsByCountry[activeCountry].map((collab, index) => {
                // Determine the role translation key based on the hardcoded Spanish role text
                let roleKey = 'colaborador';
                if (collab.role === 'Colaboradora') roleKey = 'colaboradora';
                if (collab.role === 'Colaborador Internacional') roleKey = 'colaborador_int';
                if (collab.role === 'Colaboradora Internacional') roleKey = 'colaboradora_int';
                if (collab.role === 'Médico en formación e Investigador Asociado') roleKey = 'medico_formacion';
                
                return (
                  <div className="map-researcher-card" key={index}>
                    <h5 className="r-card-name">{collab.name}</h5>
                    <p className="r-card-role">{t(`roles.${roleKey}`)}</p>
                    <div className="r-card-divider"></div>
                    <p className="r-card-institution">{collab.institution}</p>
                    <a href={collab.orcid} target="_blank" rel="noopener noreferrer" className="r-card-orcid">
                      {t('map_orcid_profile')}
                    </a>
                  </div>
                );
              })}
            </div>

            {collaboratorsByCountry[activeCountry].length > 1 && (
              <button className="slider-btn right" onClick={() => scrollContainer('right')}>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsMap;
