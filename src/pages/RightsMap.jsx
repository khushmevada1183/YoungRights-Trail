import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const RightsMap = () => {
    const [worldData, setWorldData] = useState([]);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        fetch('/data/world-data.json')
            .then(res => res.json())
            .then(data => {
                setWorldData(data.continents);
                setMapLoaded(true);
            })
            .catch(err => console.error("Failed to load world data:", err));
    }, []);

    const handleMarkerClick = (data, zoom) => {
        setSelectedInfo(data);
        setPosition({ coordinates: data.coordinates, zoom: zoom });
    };

    const handleReset = () => {
        setSelectedInfo(null);
        setPosition({ coordinates: [0, 0], zoom: 1 });
    };

    const handleMoveEnd = (position) => {
        setPosition(position);
    };

    return (
        <div className="rights-map-container">
            <div className="map-header">
                <h1>Global Rights Map</h1>
                <p>Explore the state of children's rights across different continents and countries.</p>
                <div className="map-controls">
                    <button 
                        onClick={handleReset} 
                        className="map-control-button"
                        disabled={!selectedInfo}
                    >
                        View World
                    </button>
                    <div className="map-legend">
                        <div className="legend-item">
                            <span className="legend-marker continent-marker"></span>
                            <span>Continent</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-marker country-marker"></span>
                            <span>Country</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="map-area">
                <div className={`map-viewport ${mapLoaded ? 'loaded' : 'loading'}`}>
                    {!mapLoaded && <div className="map-loading">Loading map data...</div>}
                    <ComposableMap projectionConfig={{ scale: 147 }}>
                        <ZoomableGroup 
                            center={position.coordinates} 
                            zoom={position.zoom}
                            onMoveEnd={handleMoveEnd}
                            minZoom={1}
                            maxZoom={8}
                        >
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map(geo => (
                                        <Geography 
                                            key={geo.rsmKey} 
                                            geography={geo}
                                            style={{
                                                default: { fill: "#374151", stroke: "#111827", strokeWidth: 0.5, outline: 'none' },
                                                hover: { fill: "#4B5563", stroke: "#111827", strokeWidth: 0.5, outline: 'none' },
                                                pressed: { fill: "#6B7280", stroke: "#111827", strokeWidth: 0.5, outline: 'none' },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                            {worldData.map(continent => (
                                <React.Fragment key={continent.name}>
                                    <Marker coordinates={continent.coordinates}>
                                        <g 
                                            className="map-marker continent-marker" 
                                            onClick={() => handleMarkerClick(continent, continent.zoom)}
                                            onMouseEnter={(e) => { e.currentTarget.style.cursor = 'pointer'; }}
                                        >
                                            <circle r={10} />
                                            <text textAnchor="middle" y={-15} className="marker-label">{continent.name}</text>
                                        </g>
                                    </Marker>
                                    {continent.countries && continent.countries.map(country => (
                                        <Marker key={country.name} coordinates={country.coordinates}>
                                            <g 
                                                className="map-marker country-marker" 
                                                onClick={() => handleMarkerClick(country, 6)}
                                                onMouseEnter={(e) => { e.currentTarget.style.cursor = 'pointer'; }}
                                            >
                                                <circle r={5} />
                                                <text textAnchor="middle" y={-8} className="marker-label country-label">{country.name}</text>
                                            </g>
                                        </Marker>
                                    ))}
                                </React.Fragment>
                            ))}
                        </ZoomableGroup>
                    </ComposableMap>
                    <div className="map-zoom-controls">
                        <button 
                            className="zoom-button" 
                            onClick={() => setPosition(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 8) }))}
                        >
                            +
                        </button>
                        <button 
                            className="zoom-button" 
                            onClick={() => setPosition(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 1) }))}
                        >
                            -
                        </button>
                    </div>
                </div>
                <div className="map-info-panel">
                    {selectedInfo ? (
                        <div className="info-content">
                            <div className="info-header">
                                <h2>{selectedInfo.name}</h2>
                                {selectedInfo.type === 'country' && (
                                    <span className="info-badge">{selectedInfo.region}</span>
                                )}
                            </div>
                            
                            {selectedInfo.stats && (
                                <div className="info-section">
                                    <h3>Key Statistics:</h3>
                                    <p>{selectedInfo.stats}</p>
                                </div>
                            )}
                            
                            {selectedInfo.info && (
                                <div className="info-section highlight-section">
                                    <h3>Country Fact:</h3>
                                    <p>{selectedInfo.info}</p>
                                </div>
                            )}
                            
                            {selectedInfo.challenges && (
                                <div className="info-section">
                                    <h3>Challenges:</h3>
                                    <p>{selectedInfo.challenges}</p>
                                </div>
                            )}
                            
                            {selectedInfo.charter && (
                                <div className="info-section">
                                    <h3>Regional Charter:</h3>
                                    <p>{selectedInfo.charter}</p>
                                </div>
                            )}
                            
                            <button onClick={handleReset} className="button button-secondary">
                                Return to World View
                            </button>
                        </div>
                    ) : (
                        <div className="info-placeholder">
                            <div className="placeholder-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <h3>Select a location on the map</h3>
                            <p>Click on a continent (large circles) or a specific country (small circles) to explore regional facts and challenges related to children's rights.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RightsMap;
