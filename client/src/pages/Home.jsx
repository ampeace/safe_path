import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, MapPin, AlertTriangle, Navigation2, Sun, Moon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './Home.css';

// Fix for default leaflet icons not showing in React Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to dynamically update map center
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
};

const Home = ({ onLogout, isDarkMode, toggleTheme }) => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  // Default center (e.g., New York, or any generic city)
  const defaultCenter = [40.7128, -74.0060];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setStartPoint("My Location");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const center = userLocation || defaultCenter;

  const handleRouteSearch = (e) => {
    e.preventDefault();
    // Simulate route search logic
    console.log("Searching route from", startPoint, "to", endPoint);
  };

  return (
    <div className="home-container fade-in-app">
      <nav className="glass-panel navbar">
        <div className="nav-brand">Safe<span className="brand-accent">Path</span></div>
        <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          <button className="auth-submit-btn nav-btn" onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-primary)' }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="auth-submit-btn nav-btn" onClick={onLogout} style={{ marginLeft: 0 }}>
            Log Out
          </button>
        </div>
      </nav>

      <div className="dashboard-layout">
        <aside className="sidebar glass-panel">
          <div className="sidebar-header">
            <h2>Plan Your Route</h2>
            <p>Find the safest path avoiding danger zones.</p>
          </div>

          <form className="route-form" onSubmit={handleRouteSearch}>
            <div className="input-group">
              <MapPin size={20} className="input-icon text-brand" />
              <input 
                type="text" 
                placeholder="Current Location" 
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
              />
            </div>
            
            <div className="route-connector">
              <div className="dotted-line"></div>
            </div>

            <div className="input-group">
              <Navigation2 size={20} className="input-icon text-danger" />
              <input 
                type="text" 
                placeholder="Destination" 
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn search-btn">
              <Search size={18} /> Find Safe Route
            </button>
          </form>

          <div className="alerts-section">
            <h3>Recent Active Alerts</h3>
            <div className="alert-card danger">
              <AlertTriangle size={18} />
              <div>
                <strong>Accident Reported</strong>
                <span>I-95 Northbound, 2 miles ahead</span>
              </div>
            </div>
            <div className="alert-card warning">
              <AlertTriangle size={18} />
              <div>
                <strong>Heavy Traffic</strong>
                <span>Downtown Avenue, Construction</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="map-view">
          <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="leaflet-map">
            <MapUpdater center={userLocation} />
            {/* Dynamic map tiles based on theme */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              url={isDarkMode 
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}
            />
            <Marker position={center}>
              <Popup>
                {userLocation ? "You are here" : "Default Location"}
              </Popup>
            </Marker>
          </MapContainer>
        </main>
      </div>
    </div>
  );
};

export default Home;
