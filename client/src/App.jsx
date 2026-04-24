import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {!showSplash && !isAuthenticated && (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}

      {!showSplash && isAuthenticated && currentPage === 'home' && (
        <Home 
          onNavigateToProfile={() => setCurrentPage('profile')} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />
      )}

      {!showSplash && isAuthenticated && currentPage === 'profile' && (
        <Profile 
          onNavigateToHome={() => setCurrentPage('home')}
          onLogout={handleLogout}
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />
      )}
    </>
  );
}

export default App;
