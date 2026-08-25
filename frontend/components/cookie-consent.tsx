'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setConsentGiven(true);
    
    // Here you would typically initialize analytics/tracking
    console.log('Cookies accepted - Analytics enabled');
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setConsentGiven(true);
    
    // Here you would typically disable analytics/tracking
    console.log('Cookies rejected - Analytics disabled');
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner || consentGiven) {
    return null;
  }

  return (
    <div className="cookie-consent-banner">
      <button onClick={handleClose} className="cookie-close-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#ffffff"/>
        </svg>
      </button>
      <div className="cookie-consent-content">
        <div className="cookie-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM15.07 10.25L14.17 11.17C13.45 11.9 13 12.5 13 14H11V13.5C11 12.68 11.35 11.92 11.93 11.33L13.17 10.07C13.55 9.7 13.8 9.17 13.8 8.6C13.8 7.35 12.65 6.3 11.3 6.3C10.05 6.3 8.9 7.35 8.9 8.6H6.9C6.9 6.25 8.85 4.3 11.3 4.3C13.65 4.3 15.6 6.25 15.6 8.6C15.6 9.3 15.35 9.95 14.95 10.45L15.07 10.25Z" fill="#ff4d00"/>
          </svg>
        </div>
        <div className="cookie-consent-text">
          <p>
            We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <Link href="/privacy-policy" className="cookie-consent-link">
            Learn more
          </Link>
        </div>
        <div className="cookie-consent-buttons">
          <button onClick={handleReject} className="cookie-btn cookie-btn-reject">
            Decline
          </button>
          <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
            Accept
          </button>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent-banner {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(10px);
          color: #ffffff;
          padding: 16px 50px 16px 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          z-index: 9999;
          border: 1px solid rgba(255, 77, 0, 0.3);
          border-radius: 12px;
          max-width: 900px;
          width: 90%;
        }

        .cookie-close-btn {
          position: absolute;
          top: 8px;
          right: 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          transition: all 0.2s ease;
          border-radius: 4px;
          z-index: 10;
        }

        .cookie-close-btn:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        .cookie-consent-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cookie-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 77, 0, 0.1);
          border-radius: 6px;
        }

        .cookie-consent-text {
          flex: 1;
          min-width: 150px;
        }

        .cookie-consent-text p {
          margin: 0 0 4px 0;
          font-size: 15px;
          line-height: 1.4;
          color: #e0e0e0;
        }

        .cookie-consent-link {
          color: #ff4d00;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .cookie-consent-link:hover {
          color: #ff6b33;
          text-decoration: underline;
        }

        .cookie-consent-buttons {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .cookie-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .cookie-btn-reject {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cookie-btn-reject:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .cookie-btn-accept {
          background: #ff4d00;
          color: #ffffff;
          border: 1px solid #ff4d00;
        }

        .cookie-btn-accept:hover {
          background: #ff6b33;
          border-color: #ff6b33;
        }

        @media (max-width: 768px) {
          .cookie-consent-banner {
            bottom: 10px;
            width: 95%;
            max-width: 400px;
            padding: 14px 16px;
          }

          .cookie-consent-content {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .cookie-icon {
            display: none;
          }

          .cookie-consent-text {
            min-width: 100%;
            text-align: center;
          }

          .cookie-consent-buttons {
            width: 100%;
          }

          .cookie-btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
