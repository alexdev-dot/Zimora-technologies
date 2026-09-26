'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SiteNavigation() {
  const [currentTime, setCurrentTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Our Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com/zimoratechnologies', icon: 'fa-facebook-f', label: 'Facebook' },
    { href: 'https://twitter.com/ZimoraTech', icon: 'fa-square-x-twitter', label: 'X' },
    { href: 'https://linkedin.com/company/zimoratechnologies', icon: 'fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://instagram.com/zimoratechnologies', icon: 'fa-instagram', label: 'Instagram' },
    { href: 'https://tiktok.com/@zimoratechnologies', icon: 'fa-tiktok', label: 'TikTok' },
    { href: 'https://youtube.com/@zimoratechnologies', icon: 'fa-youtube', label: 'YouTube' },
  ];

  return (
    <>
      {/* TOP HEADER */}
      <div className="top-header">
        <div className="container">
          <div className="top-header-left">
            <span className="header-email">info@zimoratech.co.ke</span>
            <span className="header-time">{currentTime}</span>
          </div>
          <div className="top-header-right">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <i className={`fa-brands ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="container">
          <div className="logo">
            <Link href="/">
              <img
                src="/images/Zimora.png"
                alt="Zimora Technologies"
                className="logo-img"
                width={200}
                height={60}
              />
            </Link>
          </div>
          <nav id="nav" className={isMenuOpen ? 'active' : ''}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="nav-quote-btn">
              Get a Quote
            </Link>
          </nav>
          <i
            className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} menu`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          ></i>
        </div>
      </header>
    </>
  );
}
