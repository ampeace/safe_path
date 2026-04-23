import React, { useEffect, useState } from 'react';
import { ShieldAlert, Map } from 'lucide-react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show splash for 2.5 seconds, then fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fade out animation to finish (e.g., 500ms) before completing
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="glow-sphere"></div>

      <div className="logo-container">
        <div className="icon-wrapper">
          <ShieldAlert size={45} className="icon shield" />
        </div>

        <h1 className="brand-title">
          Safe<span className="brand-accent">Path</span>
        </h1>

        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>

        <p className="subtitle">Secure Navigation Intelligence</p>
      </div>
    </div>
  );
};

export default SplashScreen;
