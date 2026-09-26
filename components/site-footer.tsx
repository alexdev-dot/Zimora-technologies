'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Our Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    { href: '/services', label: 'Web Development' },
    { href: '/services', label: 'Digital Marketing' },
    { href: '/services', label: 'Custom Solutions' },
    { href: '/services', label: 'Consulting' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com/zimoratechnologies', icon: 'fa-facebook-f', label: 'Facebook' },
    { href: 'https://twitter.com/ZimoraTech', icon: 'fa-square-x-twitter', label: 'X' },
    { href: 'https://linkedin.com/company/zimoratechnologies', icon: 'fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://instagram.com/zimoratechnologies', icon: 'fa-instagram', label: 'Instagram' },
    { href: 'https://youtube.com/@zimoratechnologies', icon: 'fa-youtube', label: 'YouTube' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <Link href="/">
                <img
                  src="/images/Zimora.png"
                  alt="Zimora Technologies"
                  className="footer-logo-img"
                  width={200}
                  height={60}
                />
              </Link>
            </div>
            <p>
              We provide innovative digital solutions that help businesses grow and succeed in the modern digital landscape. From web development to digital marketing, we've got you covered.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href}>{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-section">
            <h3>Stay Updated</h3>
            <p>
              Subscribe to our newsletter for the latest tech insights, tips, and company updates delivered to your inbox.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email for newsletter"
                  suppressHydrationWarning
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
              {message && <div className="newsletter-message">{message}</div>}
            </form>
            <div className="newsletter-benefits">
              <div className="benefit-item">
                <i className="fa-solid fa-check-circle"></i>
                <span>Weekly tech insights</span>
              </div>
              <div className="benefit-item">
                <i className="fa-solid fa-check-circle"></i>
                <span>Exclusive offers</span>
              </div>
              <div className="benefit-item">
                <i className="fa-solid fa-check-circle"></i>
                <span>No spam, unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright &copy; 2026 Zimora Technologies. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
