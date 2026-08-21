'use client';

import { useEffect } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';

export default function TermsOfServicePage() {
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

      {/* TERMS OF SERVICE HERO */}
      <section className="terms-hero reveal">
        <div className="terms-hero-background">
          <div className="terms-hero-overlay"></div>
        </div>
        <div className="terms-hero-container">
          <div className="terms-hero-content">
            <div className="terms-hero-subtitle">
              <span className="terms-hero-line"></span>
              TERMS OF SERVICE
            </div>
            <h1 className="terms-hero-title">
              Our Terms and<br />
              <span className="text-primary">Conditions</span>
            </h1>
            <p className="terms-hero-description">
              Please read these terms of service carefully before using our website and services.
            </p>
          </div>
        </div>
      </section>

      {/* TERMS OF SERVICE CONTENT */}
      <section className="terms-content reveal">
        <div className="container">
          <div className="terms-document">
            <div className="document-header">
              <h2>Terms of Service</h2>
              <p className="last-updated">Last updated: January 2026</p>
            </div>

            <div className="document-section">
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using Zimora Technologies' website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </div>

            <div className="document-section">
              <h3>2. Description of Service</h3>
              <p>Zimora Technologies provides web development, mobile app development, digital marketing, and custom IT solutions. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.</p>
            </div>

            <div className="document-section">
              <h3>3. User Responsibilities</h3>
              <p>As a user of our services, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain the confidentiality of your account credentials</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>4. Payment Terms</h3>
              <p>For paid services, the following terms apply:</p>
              <ul>
                <li><strong>Pricing:</strong> All prices are quoted in USD and are exclusive of taxes</li>
                <li><strong>Payment Schedule:</strong> Payment terms are specified in individual project agreements</li>
                <li><strong>Late Payments:</strong> Late payments may incur interest charges</li>
                <li><strong>Refunds:</strong> Refunds are handled according to our refund policy</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>5. Intellectual Property Rights</h3>
              <p>All content, trademarks, service marks, logos, and other intellectual property displayed on our website are the property of Zimora Technologies or their respective owners. You may not use, copy, reproduce, or distribute any of our intellectual property without prior written consent.</p>
            </div>

            <div className="document-section">
              <h3>6. Client Deliverables</h3>
              <p>Upon full payment, clients receive:</p>
              <ul>
                <li>Source code for custom-developed solutions</li>
                <li>Documentation and user manuals</li>
                <li>Transfer of ownership for custom-created assets</li>
                <li>Limited warranty period for bug fixes and support</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>7. Confidentiality</h3>
              <p>Both parties agree to maintain confidentiality of all proprietary information shared during the course of business. This includes but is not limited to business strategies, technical information, and client data.</p>
            </div>

            <div className="document-section">
              <h3>8. Limitation of Liability</h3>
              <p>Zimora Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.</p>
            </div>

            <div className="document-section">
              <h3>9. Service Level Agreement</h3>
              <p>We strive to maintain high service standards:</p>
              <ul>
                <li><strong>Uptime:</strong> We aim for 99.9% uptime for hosted solutions</li>
                <li><strong>Response Time:</strong> Support requests are typically responded to within 24 hours</li>
                <li><strong>Bug Fixes:</strong> Critical bugs are addressed within 48 hours</li>
                <li><strong>Maintenance:</strong> Scheduled maintenance is announced 48 hours in advance</li>
              </ul>
            </div>

            <div className="document-section">
              <h3>10. Termination</h3>
              <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.</p>
            </div>

            <div className="document-section">
              <h3>11. Governing Law</h3>
              <p>These Terms shall be interpreted and governed by the laws of Kenya, without regard to its conflict of law provisions. Any disputes arising from these terms will be resolved in the courts of Nairobi, Kenya.</p>
            </div>

            <div className="document-section">
              <h3>12. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of any changes.</p>
            </div>

            <div className="document-section">
              <h3>13. Contact Information</h3>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
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
