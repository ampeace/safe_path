import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck } from 'lucide-react';
import './Auth.css';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
        onLoginSuccess();
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="auth-container fade-in-app">
      <div className="auth-glow"></div>
      
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <ShieldCheck size={40} className="auth-logo-icon" />
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Enter your credentials to access your secure path.' : 'Sign up to navigate safely.'}</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          {!isLogin && (
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </div>
          )}
          
          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>

          {isLogin && <a href="#" className="forgot-password">Forgot password?</a>}
          
          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
