'use client';

import { useState, useEffect, useRef } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutContent() {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    support: 24,
  });
  const [animated, setAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Calculate years of experience from January 2026
  const calculateYearsOfExperience = () => {
    const startDate = new Date('2026-01-01');
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < startDate.getDate())) {
      years--;
    }
    
    return Math.max(0, years);
  };

  // Animate counter
  const animateCounter = (target: number, duration: number = 2000) => {
    const increment = target / (duration / 10);
    let count = 0;
    
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        clearInterval(timer);
        return target;
      }
      return Math.ceil(count);
    }, 10);
    
    return timer;
  };

  useEffect(() => {
    const years = calculateYearsOfExperience();
    setStats((prev) => ({ ...prev, years }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            
            // Animate stats
            const animateStats = async () => {
              const years = calculateYearsOfExperience();
              const targets = {
                clients: 50,
                projects: 10,
                years: years,
                support: 24,
              };

              for (const [key, target] of Object.entries(targets)) {
                let count = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                  count += increment;
                  if (count >= target) {
                    clearInterval(timer);
                    setStats((prev) => ({ ...prev, [key]: target }));
                  } else {
                    setStats((prev) => ({ ...prev, [key]: Math.ceil(count) }));
                  }
                }, 20);
              }
            };

            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <>
      <SiteNavigation />

      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero-background">
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <div className="about-hero-subtitle">
              <span className="about-hero-line"></span>
              ABOUT ZIMORA TECHNOLOGIES
            </div>
            <h1 className="about-hero-title">
              Transforming Ideas into<br />
              <span className="text-primary">Digital Reality</span>
            </h1>
            <p className="about-hero-description">
              We are a passionate team of innovators dedicated to helping businesses thrive in the digital age through cutting-edge technology solutions and exceptional service.
            </p>
            
            {/* STATS SECTION INSIDE HERO */}
            <div className="stats-section" ref={statsRef}>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{stats.clients}+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">{stats.projects}+</div>
                  <div className="stat-label">Delivered Projects</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">{stats.years}+</div>
                  <div className="stat-label">Years of Experience</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-number">{stats.support}</div>
                  <div className="stat-label">Support 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="about-main-content">
        <div className="container">
          <div className="about-content-grid">
            <div className="about-text">
              <h2 className="section-title">Our Story</h2>
              <div className="about-description">
                <p>Zimora Technologies was founded in January 2026 with a vision to bring innovative digital solutions to businesses in Kenya and beyond. Starting as a one-person initiative, our journey began with a passion for web development and creating seamless online experiences.</p>
                <p>In just a short time, we have developed multiple full-stack websites, laying the foundation for what will become a trusted technology company. At Zimora Technologies, we are committed to helping businesses grow through cutting-edge web solutions, creative designs, and reliable digital services.</p>
                <p>This is just the beginning of our story, and we are excited to continue expanding our impact in the tech world, one project at a time.</p>
              </div>
            </div>
            
            <div className="about-image-section">
              <div className="main-image">
                <Image src="/images/Company.jpg" alt="Our Journey" width={800} height={600} loading="lazy" />
              </div>
              <div className="image-grid">
                <div className="grid-image">
                  <Image src="https://img.freepik.com/free-photo/programmer-working-laptop-office_1150-17626.jpg?semt=ais_hybrid&w=400&q=80" alt="Development" width={400} height={300} loading="lazy" />
                </div>
                <div className="grid-image">
                  <Image src="https://img.freepik.com/free-photo/business-team-meeting_53876-123950.jpg?semt=ais_hybrid&w=400&q=80" alt="Team Meeting" width={400} height={300} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-header">
            <h2 className="section-title">Our Mission & Vision</h2>
            <p className="section-description">The core principles that guide our purpose and drive our commitment to excellence</p>
          </div>
          
          <div className="mission-vision">
            <div className="mission-box">
              <div className="icon-box">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and competitive advantage in the digital marketplace.</p>
            </div>
            
            <div className="vision-box">
              <div className="icon-box">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>To be the trusted partner for businesses seeking digital transformation, delivering innovative solutions that exceed expectations and create lasting value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <h2>Meet Our Leadership</h2>
            <p>The visionaries and experts driving our innovation and success</p>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-image">
                <Image src="/images/CEO.png" alt="Alex Kariuki - CEO" width={300} height={300} loading="lazy" />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">Alex Kariuki</h3>
                <p className="team-member-role">Chief Executive Officer & Founder</p>
                <p className="team-member-bio">Alex, founder and CEO of Zimora Technologies, is a passionate web developer creating innovative digital solutions. Since January 2026, he has led multiple full-stack projects, driving Zimora's mission to help businesses grow through technology. Known for his creativity and leadership, Alex aims to make Zimora a leading tech force.</p>
                <div className="team-member-social">
                  <a href="https://www.linkedin.com/in/alex-kariuki-751a30345/?skipRedirect=true" className="social-link" target="_blank" rel="noopener"><i className="fa-brands fa-linkedin"></i></a>
                  <a href="#" className="social-link"><i className="fa-brands fa-square-x-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-description">The principles that guide everything we do and define our commitment to excellence</p>
          <br />
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3>Innovation First</h3>
              <p>We relentlessly pursue breakthrough solutions, challenging conventional wisdom and pushing the boundaries of what's technologically possible.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <h3>Integrity Always</h3>
              <p>We operate with complete transparency and ethical excellence, building lasting relationships founded on trust and accountability.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Collaborative Spirit</h3>
              <p>We believe diverse perspectives and collective genius drive extraordinary innovation, fostering partnerships that amplify our impact.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <h3>Excellence Driven</h3>
              <p>We are obsessed with delivering exceptional quality in every endeavor, continuously raising our standards and exceeding expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Business?</h2>
            <p className="cta-description">Join hundreds of companies that have already transformed their operations with our innovative solutions. Let's build something amazing together.</p>
            <div className="cta-buttons">
              <Link href="/contact">
                <button className="btn-primary">Start Your Journey</button>
              </Link>
              <Link href="/services">
                <button className="btn-outline">Explore Solutions</button>
              </Link>
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
