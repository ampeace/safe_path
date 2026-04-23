import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';
import Home from './pages/Home';
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
        <Home onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
