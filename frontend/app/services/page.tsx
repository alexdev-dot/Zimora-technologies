'use client';

import { useEffect } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';

export default function ServicesPage() {
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

  return (
    <>
      <SiteNavigation />

      {/* HERO */}
      <section className="hero reveal">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-subtitle">
              <span className="hero-line"></span>
              OUR SERVICES
            </div>
            <h1 className="hero-title">
              Innovative Digital<br />
              <span className="text-primary">Solutions for Your Business</span>
            </h1>
            <p className="hero-description">
              We provide cutting-edge technology solutions that drive growth, enhance performance, and deliver exceptional user experiences.
            </p>
            <div className="hero-buttons">
              <Link href="/contact">
                <button className="btn-primary">GET IN Touch</button>
              </Link>
              <Link href="/projects">
                <button className="btn-outline">VIEW OUR PROJECTS</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="our-services reveal page-transition">
        <div className="container">
          <div className="services-header">
            <h2>Our Services</h2>
          </div>
          <div className="services-description">
            <p>
              At Zimora Technologies, we provide reliable and innovative digital solutions designed to help businesses grow, scale and succeed in the digital world. Our services are built around performance, security and user experience ensuring long term value for our clients. Whether you are a startup, small business or established organization we tailor every solution to meet your specific goals and budget.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="services-grid-section reveal page-transition">
        <div className="container">
          <div className="services-grid">
            {/* Service 1: Web Development */}
            <div className="service-item">
              <div className="service-icon">
                <i className="fa-solid fa-code"></i>
              </div>
              <div className="service-content">
                <h3>Web Development</h3>
                <p>What we offer</p>
                <ul>
                  <li>Business and corporate websites</li>
                  <li>Company portfolio websites</li>
                  <li>Real estates platforms</li>
                  <li>Custom web systems</li>
                  <li>Responsive and mobile-friendly design</li>
                  <li>Website optimization and performance improvements</li>
                </ul>
              </div>
            </div>

            {/* Service 2: Web Application Development */}
            <div className="service-item">
              <div className="service-icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <div className="service-content">
                <h3>Web Application Development</h3>
                <p>What we offer</p>
                <ul>
                  <li>Custom web applications</li>
                  <li>Admin and management panels</li>
                  <li>API development and integrations</li>
                  <li>Custom software solutions</li>
                  <li>System maintenance and upgrades</li>
                </ul>
              </div>
            </div>

            {/* Service 3: Digital Marketing */}
            <div className="service-item">
              <div className="service-icon">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <div className="service-content">
                <h3>Digital Marketing</h3>
                <p>What we offer</p>
                <ul>
                  <li>Search engine optimization (SEO)</li>
                  <li>Social media marketing strategies</li>
                  <li>Brand positioning and online presence</li>
                  <li>Content marketing and planning</li>
                  <li>Website traffic growth strategies</li>
                  <li>Performance analysis and reporting</li>
                </ul>
              </div>
            </div>

            {/* Service 4: Hosting & Domain Setup */}
            <div className="service-item">
              <div className="service-icon">
                <i className="fa-solid fa-cloud"></i>
              </div>
              <div className="service-content">
                <h3>Hosting & Domain Setup</h3>
                <p>What we offer</p>
                <ul>
                  <li>Domain registration support</li>
                  <li>Website hosting setup</li>
                  <li>SSL installation</li>
                  <li>Email hosting (business emails)</li>
                  <li>Server configuration & deployment</li>
                </ul>
              </div>
            </div>

            {/* Service 5: Maintenance & Support */}
            <div className="service-item">
              <div className="service-icon">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <div className="service-content">
                <h3>Maintenance & Support</h3>
                <p>What we offer</p>
                <ul>
                  <li>Regular website updates</li>
                  <li>Bug fixing and improvements</li>
                  <li>Performance monitoring</li>
                  <li>Content updates</li>
                  <li>24/7 technical support</li>
                </ul>
              </div>
            </div>

            {/* Service 6: E-commerce solutions */}
            <div className="service-item">
              <div className="service-icon">
                <i className="fa-solid fa-shopping-bag"></i>
              </div>
              <div className="service-content">
                <h3>E-commerce solutions</h3>
                <p>What we offer</p>
                <ul>
                  <li>Custom e-commerce development</li>
                  <li>Payment gateway integration</li>
                  <li>Product catalog management</li>
                  <li>Shopping cart & checkout optimization</li>
                  <li>Security and compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE MOVE ON A PROJECT */}
      <section className="project-process-section reveal page-transition">
        <div className="container">
          <div className="process-header">
            <h2>How We Move on a Project</h2>
            <p>Our systematic approach ensures successful project delivery from concept to completion</p>
          </div>
          <div className="process-timeline">
            <div className="process-item">
              <div className="process-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <div className="process-content">
                <h3>Discovery & Planning</h3>
                <p>We start by understanding your business goals, requirements, and target audience. This phase involves detailed discussions, research, and creating a comprehensive project roadmap.</p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-icon">
                <i className="fa-solid fa-pencil-ruler"></i>
              </div>
              <div className="process-content">
                <h3>Design & Prototyping</h3>
                <p>Our design team creates wireframes, mockups, and interactive prototypes. We focus on user experience, modern design principles, and aligning with your brand identity.</p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-icon">
                <i className="fa-solid fa-code"></i>
              </div>
              <div className="process-content">
                <h3>Development & Implementation</h3>
                <p>Our developers bring the designs to life using cutting-edge technologies. We follow agile methodologies, ensuring regular updates and iterative progress.</p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-icon">
                <i className="fa-solid fa-bug"></i>
              </div>
              <div className="process-content">
                <h3>Testing & Quality Assurance</h3>
                <p>Rigorous testing ensures your project is bug-free, secure, and performs optimally across all devices and platforms. We conduct both automated and manual testing.</p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <div className="process-content">
                <h3>Deployment & Launch</h3>
                <p>We handle the complete deployment process, ensuring a smooth launch. This includes server setup, domain configuration, and going live with your project.</p>
              </div>
            </div>
            <div className="process-item">
              <div className="process-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="process-content">
                <h3>Support & Maintenance</h3>
                <p>Our relationship doesn't end at launch. We provide ongoing support, maintenance, and updates to ensure your project continues to perform optimally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="technologies-section reveal page-transition">
        <div className="container">
          <div className="technologies-header">
            <h2>Technologies We Work With</h2>
            <p>We leverage cutting-edge technologies to build robust and scalable solutions</p>
          </div>
          <div className="technologies-grid">
            <div className="tech-item">
              <i className="fa-brands fa-react"></i>
              <span>React</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-node-js"></i>
              <span>Node.js</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-python"></i>
              <span>Python</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-js"></i>
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-html5"></i>
              <span>HTML5</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-css3-alt"></i>
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-wordpress"></i>
              <span>WordPress</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-php"></i>
              <span>PHP</span>
            </div>
            <div className="tech-item">
              <i className="fa-solid fa-database"></i>
              <span>MySQL</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-git-alt"></i>
              <span>Git</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-docker"></i>
              <span>Docker</span>
            </div>
            <div className="tech-item">
              <i className="fa-brands fa-aws"></i>
              <span>AWS</span>
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
