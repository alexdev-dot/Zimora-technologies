'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process - replace with actual authentication logic
    setTimeout(() => {
      if (email === 'admin@zimoratech.co.ke' && password === 'admin123') {
        // Successful login - redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          {/* Logo Section */}
          <div className="login-header">
            <Link href="/">
              <img
                src="/images/Zimora.png"
                alt="Zimora Technologies"
                className="login-logo"
                width={200}
                height={60}
              />
            </Link>
            <h1 className="login-title">Admin Portal</h1>
            <p className="login-subtitle">Sign in to access the admin dashboard</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error">
                <i className="fa-solid fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-envelope input-icon"></i>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zimoratech.co.ke"
                  required
                  autoComplete="email"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock input-icon"></i>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="login-footer">
            <Link href="/" className="back-to-home">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Website
            </Link>
          </div>
        </div>

        {/* Decorative Side */}
        <div className="login-decorative">
          <div className="decorative-content">
            <div className="decorative-icon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h2>Secure Admin Access</h2>
            <p>
              Manage your website content, monitor analytics, and control user access from a centralized dashboard.
            </p>
            <div className="security-features">
              <div className="feature-item">
                <i className="fa-solid fa-lock"></i>
                <span>Encrypted Connection</span>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-user-shield"></i>
                <span>Role-Based Access</span>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-clock"></i>
                <span>Session Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
