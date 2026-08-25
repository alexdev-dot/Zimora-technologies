'use client';

import { useEffect, useState } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

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

  const projects = [
    {
      id: 1,
      category: 'web',
      title: 'Groomers Barber Spa',
      description: 'Groomers is a modern barber shop website that allows customers to book appointments, view services and prices.',
      image: 'project-images/Groomers.png',
      status: 'completed',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: 'https://alexdev-dot.github.io/Groomers/'
    },
    {
      id: 2,
      category: 'real-estate',
      title: 'Horizon Real Estate',
      description: 'Horizon Real Estate is a comprehensive real estate platform that allows users to search for properties, view details and connect with agents.',
      image: 'project-images/Horizon Estate.png',
      status: 'in-development',
      tech: ['vite & typescript', 'chart.js', 'React', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 3,
      category: 'ecommerce',
      title: 'ShopEase Kenya Store',
      description: 'Simple and effective e-commerce store for selling products online with Mpesa integration for seamless payments.',
      image: 'project-images/ShopEaseKenya.png',
      status: 'completed',
      tech: ['HTML', 'Mpesa Integration', 'JavaScript', 'CSS3'],
      link: 'https://alexdev-dot.github.io/ShopEase-Kenya/'
    },
    {
      id: 4,
      category: 'web',
      title: 'Zetech Event Management system',
      description: 'Zetech events system is a centralized system where all events are shown for Zetech university students.',
      image: 'project-images/Zetech-event system.png',
      status: 'in-development',
      tech: ['React.js', 'Prisma', 'PostgreSQL', 'AWS'],
      link: '#'
    },
    {
      id: 5,
      category: 'web',
      title: 'Bite Flow Kenya',
      description: 'Bite Flow Kenya is a food delivery platform that connects customers with local restaurants and food vendors.',
      image: 'project-images/Bite Flow.png',
      status: 'in-development',
      tech: ['React.js', 'Node js', 'Mpesa integration', 'MySQl'],
      link: '#'
    },
    {
      id: 6,
      category: 'ecommerce',
      title: 'Omnishop',
      description: 'Omnishop is an e-commerce platform that allows users to buy and sell products online. It is integrated with Mpesa for seamless payments.',
      image: 'project-images/Omnishop.png',
      status: 'in-development',
      tech: ['MongoDB', 'Mpesa Integration', 'React', 'Typescript'],
      link: '#'
    },
    {
      id: 7,
      category: 'real-estate',
      title: 'Haven Homes',
      description: 'Haven Homes is a real estate platform that allows users to search for properties, view details and connect with agents.',
      image: 'project-images/Haven Homes.png',
      status: 'in-development',
      tech: ['vite & typescript', 'chart.js', 'React', 'PostgreSQL'],
      link: 'https://haven-homes-mu.vercel.app/'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <SiteNavigation />

      {/* PROJECTS HERO SECTION */}
      <section className="projects-hero reveal">
        <div className="projects-hero-background">
          <div className="projects-hero-overlay"></div>
        </div>
        <div className="projects-hero-container">
          <div className="projects-hero-content">
            <div className="projects-hero-subtitle">
              <span className="projects-hero-line"></span>
              OUR PORTFOLIO
            </div>
            <h1 className="projects-hero-title">
              Transforming Ideas Into<br />
              <span className="text-primary">Digital Reality</span>
            </h1>
            <p className="projects-hero-description">
              Explore our latest projects and see how we've helped businesses achieve their digital goals through innovative solutions and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECT FILTERS */}
      <section className="project-filters reveal">
        <div className="container">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Development
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'real-estate' ? 'active' : ''}`}
              onClick={() => setActiveFilter('real-estate')}
            >
              Real Estate
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ecommerce' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ecommerce')}
            >
              E-Commerce
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="projects-showcase reveal page-transition">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="project-card" 
                data-category={project.category}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a 
                        href={project.link} 
                        className="visit-site" 
                        target={project.link !== '#' ? '_blank' : undefined}
                        rel={project.link !== '#' ? 'noopener' : undefined}
                      >
                        <i className="fa-solid fa-external-link-alt"></i> Visit Site
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-category">
                    <span className={`category-badge ${project.category}`}>
                      {project.category === 'web' && 'Web Development'}
                      {project.category === 'real-estate' && 'Real Estate'}
                      {project.category === 'ecommerce' && 'E-Commerce'}
                    </span>
                    <span className={`status-badge ${project.status}`}>
                      {project.status === 'completed' && 'Completed'}
                      {project.status === 'in-development' && 'In Development'}
                    </span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="projects-cta reveal page-transition">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Project?</h2>
            <p className="cta-description">
              Let's collaborate to bring your ideas to life. Contact us today for a free consultation.
            </p>
            <div className="cta-buttons">
              <Link href="/contact">
                <button className="btn-primary">Get Started</button>
              </Link>
              <Link href="/services">
                <button className="btn-outline">View Services</button>
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
