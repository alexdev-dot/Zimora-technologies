'use client';

import { useEffect } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      revealElements.forEach((element) => {
        revealObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <SiteNavigation />

      {/* PRIVACY POLICY HERO */}
      <section className="privacy-hero reveal">
        <div className="privacy-hero-background">
          <div className="privacy-hero-overlay"></div>
        </div>
        <div className="privacy-hero-container">
          <div className="privacy-hero-content">
            <div className="privacy-hero-subtitle">
              <span className="privacy-hero-line"></span>
              PRIVACY POLICY
            </div>
            <h1 className="privacy-hero-title">
              Your Privacy is<br />
              <span className="text-primary">Our Priority</span>
            </h1>
            <p className="privacy-hero-description">
              We are committed to protecting your personal information and ensuring transparency in how we collect, use, and store your data.
            </p>
          </div>
        </div>
      </section>

      {/* PRIVACY POLICY CONTENT */}
      <section className="privacy-content reveal">
        <div className="container">
          <div className="privacy-document">
            <div className="document-header">
              <h2>Privacy Policy</h2>
              <p className="last-updated">Last updated: January 2026</p>
            </div>

            <div className="document-section">
              <h3>1. Information We Collect</h3>
              <p>We collect information to provide better services to all our users. The types of information we collect include:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, company details</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                <li><strong>Cookies and Tracking Data:</strong> Data collected through cookies and similar technologies</li>
                <li><strong>Communication Data:</strong> Messages, feedback, and support requests</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>2. How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, and promotional offers</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, investigate, and prevent security incidents</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>3. Information Sharing</h3>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>4. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Secure servers for data storage</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>5. Cookies and Tracking Technologies</h3>
              <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>
            </div>

            <div className="document-section">
              <h3>6. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of the data we hold about you</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>7. Children's Privacy</h3>
              <p>Our website and services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.</p>
            </div>

            <div className="document-section">
              <h3>8. Changes to This Policy</h3>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.</p>
            </div>

            <div className="document-section">
              <h3>9. Contact Us</h3>
              <p>If you have any questions about this privacy policy, please contact us:</p>
              <ul>
                <li><strong>Email:</strong> info@zimoratech.co.ke</li>
                <li><strong>Phone:</strong> +254 117 411 547</li>
                <li><strong>Address:</strong> Nairobi, Kenya, Westlands Business District, 1234 Tech Hub Building</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <SiteFooter />
      <Chatbot />
    </>
  );
}
