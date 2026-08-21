import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <SiteNavigation />

      {/* HERO */}
      <section className="index-hero">
        <div className="index-hero-background">
          <div className="index-hero-overlay"></div>
        </div>
        <div className="index-hero-container">
          <div className="index-hero-content">
            <div className="index-hero-subtitle">
              <span className="index-hero-line"></span>
              WELCOME TO ZIMORA
            </div>
            <h1 className="index-hero-title">
              Elevate Your Business with<br />
              <span className="text-primary">Smart Digital Solutions</span>
            </h1>
            <p className="index-hero-description">
              Zimora Technologies helps startups and growing businesses build powerful websites, scalable applications and digital systems that drives real results.
            </p>
            <div className="index-hero-buttons">
              <Link href="/services">
                <button className="btn-primary">GET STARTED</button>
              </Link>
              <Link href="/contact">
                <button className="btn-outline">REQUEST A QUOTE</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="about-container">
          <img 
            src="https://img.freepik.com/free-photo/businesspeople-having-good-time-meeting_1098-1786.jpg?semt=ais_hybrid&w=740&q=80" 
            alt="Team meeting" 
            loading="lazy" 
          />
          <div>
            <h4>ABOUT ZIMORA</h4>
            <h2>Customized Solutions to Meet Client Needs</h2>
            <p>We help startups & enterprises scale through technology.</p>
            <ul>
              <li>✔ Cloud Solutions</li>
              <li>✔ Secure Systems</li>
              <li>✔ Business Growth</li>
            </ul>
            <Link href="/about">
              <button className="btn-primary">Explore More</button>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services page-transition">
        <h2>Exclusive IT Services</h2>
        <div className="service-grid">
          <div className="service-card hover-lift">
            <i className="fa-solid fa-code"></i>
            <h3>Web Development</h3>
            <p>High-performance modern websites.</p>
          </div>
          <div className="service-card hover-lift">
            <i className="fa-solid fa-bullhorn"></i>
            <h3>Digital Marketing</h3>
            <p>SEO, branding & online growth.</p>
          </div>
          <div className="service-card hover-lift">
            <i className="fa-solid fa-rocket"></i>
            <h3>Web Applications</h3>
            <p>Custom web apps & solutions.</p>
          </div>
        </div>
        <div className="services-button-container">
          <Link href="/services">
            <button className="btn-primary">View our services</button>
          </Link>
        </div>
      </section>

      {/* TRUSTED COMPANIES */}
      <section className="trusted-companies">
        <div className="trusted-header">
          <h2>Trusted by Leading Companies</h2>
          <p>We partner with industry leaders to deliver exceptional digital solutions</p>
        </div>
        <div className="carousel-container">
          <div className="carousel-track">
            <div className="logo-slide">
              <img src="https://upload.wikimedia.org/wikipedia/en/archive/8/8a/20210807000406%21Equity_Bank_Logo.png" alt="Equity-bank" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://www.safaricom.co.ke/images/SAF-MAIN-LOGO.png" alt="Safaricom" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="/images/Zimora.png" alt="Zimora" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="/assets/images/zetech logo.jpg" alt="Zetech-university" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQssS1GCHRoUD2F0-h4VhRQoPI0uyzwVitAgA&s" alt="Airtel" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://upload.wikimedia.org/wikipedia/en/d/de/KCB_Bank_Kenya_Limited_logo.png" alt="KCB-bank" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://zegetech.com/assets/images/logos/logo-sab.jpg" alt="Sab-Foundation" className="company-logo" loading="lazy" />
            </div>
            {/* Duplicate logos for seamless loop */}
            <div className="logo-slide">
              <img src="https://upload.wikimedia.org/wikipedia/en/archive/8/8a/20210807000406%21Equity_Bank_Logo.png" alt="Equity-bank" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://www.safaricom.co.ke/images/SAF-MAIN-LOGO.png" alt="Safaricom" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="/images/Zimora.png" alt="Zimora" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="/assets/images/zetech logo.jpg" alt="Zetech-university" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQssS1GCHRoUD2F0-h4VhRQoPI0uyzwVitAgA&s" alt="Airtel" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://upload.wikimedia.org/wikipedia/en/d/de/KCB_Bank_Kenya_Limited_logo.png" alt="KCB-bank" className="company-logo" loading="lazy" />
            </div>
            <div className="logo-slide">
              <img src="https://zegetech.com/assets/images/logos/logo-sab.jpg" alt="Sab-Foundation" className="company-logo" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ZIMORA TECHNOLOGIES */}
      <section className="why-choose">
        <h2>Why Choose Zimora Technologies</h2>
        <p className="section-description">
          We deliver exceptional digital solutions that drive business growth and success through innovation, expertise, and commitment to excellence.
        </p>
        <br />
        
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <h3>Client-Focused Development Approach</h3>
              <p>We prioritize your unique business needs and goals, ensuring every solution is tailored to deliver maximum value and achieve your specific objectives.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3>Modern and Scalable Technologies</h3>
              <p>We leverage cutting-edge technologies and best practices to build solutions that grow with your business and adapt to future challenges.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="fa-solid fa-paint-brush"></i>
              </div>
              <h3>Clean and User-Friendly Designs</h3>
              <p>Our designs combine aesthetic appeal with intuitive functionality, creating engaging experiences that delight users and drive conversions.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>Transparent Communication</h3>
              <p>We maintain open and honest communication throughout your project, keeping you informed and involved at every stage of development.</p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-choose-icon">
                <i className="fa-solid fa-tools"></i>
              </div>
              <h3>Reliable Support and Maintenance</h3>
              <p>Our commitment doesn't end at launch. We provide ongoing support and maintenance to ensure your digital solutions continue to perform optimally.</p>
            </div>
          </div>
        </div>
        
        <div className="why-choose-cta">
          <Link href="/contact">
            <button className="btn-primary">Start Your Project</button>
          </Link>
          <Link href="/about">
            <button className="btn-outline">Learn More About Us</button>
          </Link>
        </div>
      </section>

      {/* RECENT BLOGS */}
      <section className="recent-blogs">
        <div className="container">
          <div className="section-header">
            <h2>Latest Insights & Articles</h2>
            <p className="section-description">
              Stay updated with the latest technology trends, expert insights, and innovative solutions from our team
            </p>
          </div>
          
          <div className="blogs-grid" id="recentBlogsGrid">
            {/* Blog posts will be dynamically loaded here */}
            <div className="loading-spinner">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <p>Loading latest articles...</p>
            </div>
          </div>
          
          <div className="blogs-cta">
            <Link href="/blogs">
              <button className="btn-primary">View All Articles</button>
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <SiteFooter />
      <Chatbot />
    </>
  );
}
