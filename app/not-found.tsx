import Link from 'next/link';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';

export default function NotFound() {
  return (
    <>
      <title>404 - Page Not Found | Zimora Technologies</title>
      <meta name="description" content="Oops! The page you're looking for doesn't exist. Zimora Technologies helps you find your way back to amazing IT solutions and digital services." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Zimora Technologies" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="language" content="English" />
      <meta property="og:title" content="404 - Page Not Found | Zimora Technologies" />
      <meta property="og:description" content="Oops! The page you're looking for doesn't exist. Find your way back to Zimora Technologies' amazing IT solutions." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://zimoratech.co.ke/404" />
      <meta property="og:image" content="https://zimoratech.co.ke/images/404-og-image.jpg" />
      <meta property="og:site_name" content="Zimora Technologies" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="404 - Page Not Found | Zimora Technologies" />
      <meta name="twitter:description" content="Oops! The page you're looking for doesn't exist. Find your way back to Zimora Technologies." />
      <meta name="twitter:image" content="https://zimoratech.co.ke/images/404-twitter-card.jpg" />
      <meta name="twitter:site" content="@ZimoraTech" />
      <meta name="theme-color" content="#ff4d00" />
      <meta name="msapplication-TileColor" content="#ff4d00" />
      <meta name="application-name" content="Zimora Technologies 404 Page" />
      <meta name="google-site-verification" content="bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      
      <SiteNavigation />
      
      {/* 404 HERO SECTION */}
      <section className="error-404">
        <div className="error-404-background">
          <div className="error-404-overlay"></div>
        </div>
        
        <div className="error-404-container">
          <div className="error-404-content">
            {/* Animated 404 Number */}
            <div className="error-number">
              <span className="error-digit" data-digit="4">4</span>
              <span className="error-digit" data-digit="0">0</span>
              <span className="error-digit" data-digit="4">4</span>
            </div>
            
            {/* Error Message */}
            <h1 className="error-title">Oops! Page Not Found</h1>
            <p className="error-description">
              The page you're looking for seems to have vanished into the digital void. 
              But don't worry, we'll help you find your way back to amazing tech solutions!
            </p>
            
            {/* Action Buttons */}
            <div className="error-actions">
              <Link href="/" className="btn-primary">
                <i className="fa-solid fa-home"></i>
                Go back to Homepage
              </Link>
            </div>
            
            {/* Helpful Links */}
            <div className="error-links">
              <h3>Looking for something specific?</h3>
              <div className="links-grid">
                <Link href="/services" className="link-card">
                  <i className="fa-solid fa-code"></i>
                  <span>Our Services</span>
                </Link>
                <Link href="/projects" className="link-card">
                  <i className="fa-solid fa-briefcase"></i>
                  <span>Our Projects</span>
                </Link>
                <Link href="/blog" className="link-card">
                  <i className="fa-solid fa-newspaper"></i>
                  <span>Latest Blog</span>
                </Link>
                <Link href="/contact" className="link-card">
                  <i className="fa-solid fa-envelope"></i>
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Chatbot />
      <WhatsAppButton />
    </>
  );
}
