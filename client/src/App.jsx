import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {!showSplash && !isAuthenticated && (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}

      {!showSplash && isAuthenticated && (
        <div className="main-app fade-in-app">
          {/* Temporary placeholder for the main app */}
          <nav className="glass-panel navbar">
            <div className="nav-brand">Safe<span className="brand-accent">Path</span></div>
            <button className="auth-submit-btn" style={{ padding: '0.5rem 1rem', width: 'auto', marginLeft: 'auto', fontSize: '0.9rem' }} onClick={handleLogout}>
              Log Out
            </button>
          </nav>
          
          <main className="dashboard-container">
            <div className="dashboard-placeholder">
              <h1>Map Interface Coming Soon</h1>
              <p>You have successfully logged in!</p>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
