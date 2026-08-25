import { useEffect, useState } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Zimora Technologies - Get in Touch Today',
  description: 'Contact Zimora Technologies for professional IT solutions, web development, and digital services in Kenya. Reach us via phone, email, or visit our office in Ruiru, Kiambu County.',
  keywords: 'contact Zimora Technologies, IT company contact Kenya, web development contact, digital services Kenya, tech support',
  openGraph: {
    title: 'Contact Us | Zimora Technologies',
    description: 'Get in touch with Zimora Technologies for your IT solution needs',
    url: 'https://zimoratech.co.ke/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    priceRange: '',
    message: '',
    newsletter: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle reveal animations
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      priceRange: '',
      message: '',
      newsletter: false
    });
  };

  return (
    <>
      <SiteNavigation />

      {/* CONTACT HERO */}
      <section className="contact-hero reveal">
        <div className="contact-hero-background">
          <div className="contact-hero-overlay"></div>
        </div>
        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <div className="contact-hero-subtitle">
              <span className="hero-line"></span>
              GET IN TOUCH
            </div>
            <h1 className="contact-hero-title">
              Let's Start a<br />
              <span className="text-primary">Conversation</span>
            </h1>
            <p className="contact-hero-description">
              Ready to transform your business with innovative digital solutions? 
              We're here to help you achieve your goals and drive growth.
            </p>
            <div className="contact-hero-info">
              <div className="contact-info-item">
                <i className="fa-solid fa-envelope"></i>
                <span>info@zimoratech.co.ke</span>
              </div>
              <div className="contact-info-item">
                <i className="fa-solid fa-phone"></i>
                <span>+254 (117) 411-547</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section reveal">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <p className="contact-form-description">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              
              {formSubmitted && (
                <div style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company Name (Optional)</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    placeholder="Enter your company name (optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select 
                    id="service" 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="web-applications">Web Applications</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="custom-solutions">Custom Solutions</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="priceRange">Estimated Budget Range</label>
                  <select 
                    id="priceRange" 
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-15k">Under KES 15,000</option>
                    <option value="15k-25k">KES 15,000 - 25,000</option>
                    <option value="25k-40k">KES 25,000 - 40,000</option>
                    <option value="40k-60k">KES 40,000 - 60,000</option>
                    <option value="60k-100k">KES 60,000 - 100,000</option>
                    <option value="100k-150k">KES 100,000 - 150,000</option>
                    <option value="150k-250k">KES 150,000 - 250,000</option>
                    <option value="over-250k">Over KES 250,000</option>
                    <option value="discuss-later">Prefer to discuss budget later</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    I'd like to receive updates about Zimora's services
                  </label>
                </div>
                
                <button type="submit" className="btn-primary contact-submit-btn">
                  <span>Send Message</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="contact-info-wrapper">
              <h2>Contact Information</h2>
              <p className="contact-info-description">
                Reach out to us through any of the following channels.
              </p>
              
              <div className="contact-info-grid">
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="contact-info-details">
                    <h3>Location</h3>
                    <p>Ruiru, Kiambu County, Kenya</p>
                  </div>
                </div>
                
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="contact-info-details">
                    <h3>Phone Numbers</h3>
                    <p>+254 117 411 547</p>
                  </div>
                </div>
                
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="contact-info-details">
                    <h3>Email Addresses</h3>
                    <p>info@zimoratech.co.ke</p>
                  </div>
                </div>
                
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="contact-info-details">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="contact-social">
                <h3>Follow Us</h3>
                <div className="contact-social-links">
                  <a href="https://facebook.com/zimoratechnologies" className="social-link" target="_blank" rel="noopener">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com/ZimoraTech" className="social-link" target="_blank" rel="noopener">
                    <i className="fa-brands fa-square-x-twitter"></i>
                  </a>
                  <a href="https://linkedin.com/company/zimoratechnologies" className="social-link" target="_blank" rel="noopener">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="https://instagram.com/zimoratechnologies" className="social-link" target="_blank" rel="noopener">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="https://youtube.com/@zimoratechnologies" className="social-link" target="_blank" rel="noopener">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>
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
