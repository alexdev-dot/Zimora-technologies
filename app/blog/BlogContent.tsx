'use client';

import { useEffect, useState } from 'react';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  const categories = ['All Posts', 'Web Development', 'App Development', 'Digital Marketing', 'Technology', 'Security'];

  const filteredPosts = activeCategory === 'All Posts' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Pagination logic
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <>
      <SiteNavigation />

      {/* HERO SECTION */}
      <section className="about-hero reveal">
        <div className="about-hero-background">
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <div className="about-hero-subtitle">
              <span className="about-hero-line"></span>
              OUR BLOG
            </div>
            <h1 className="about-hero-title">
              Insights & <span className="highlight">Innovation</span>
            </h1>
            <p className="about-hero-description">
              Explore the latest trends, expert insights, and innovative solutions in web development, mobile apps, and digital marketing from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content reveal page-transition">
        <div className="blog-container">
          <div className="blog-header">
            <h1 className="blog-title">Latest Articles</h1>
            <p className="blog-subtitle">Stay updated with the latest insights, trends, and innovations from our expert team</p>
          </div>

          <div className="blog-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {/* Featured Post */}
            {featuredPost && activeCategory === 'All Posts' && (
              <article className="blog-post featured">
                <div className="post-image">
                  <Image src={featuredPost.image} alt={featuredPost.title} width="800" height="400" loading="lazy" />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="category">{featuredPost.category}</span>
                    <span className="date">{featuredPost.date}</span>
                  </div>
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.description}</p>
                  <Link href={`/blog/${featuredPost.id}`} className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </article>
            )}

            {/* Regular Posts */}
            {currentPosts.map((post) => (
              <article key={post.id} className="blog-post">
                <div className="post-image">
                  <Image src={post.image} alt={post.title} width="600" height="400" loading="lazy" />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="category">{post.category}</span>
                    <span className="date">{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link href={`/blog/${post.id}`} className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-container">
            <div className="pagination-info">
              <span id="page-info">Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, regularPosts.length)} of {regularPosts.length} articles</span>
            </div>
            <div className="pagination-controls">
              <button 
                id="prev-btn" 
                className="pagination-btn" 
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                <i className="fa-solid fa-chevron-left"></i> Previous
              </button>
              <div id="page-numbers" className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <span 
                    key={pageNumber} 
                    className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </span>
                ))}
              </div>
              <button 
                id="next-btn" 
                className="pagination-btn" 
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </button>
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
