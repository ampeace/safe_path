import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';
import Home from './pages/Home';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
        <Home onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
    </>
  );
}

export default App;
