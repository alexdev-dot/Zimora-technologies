// ========================================
// COMPANY PAGE JAVASCRIPT
// ========================================

// Company Page Controller
class CompanyPageController {
  constructor() {
    this.init();
  }

  init() {
    this.initializeAnimations();
    this.initializeCounters();
    this.initializeScrollEffects();
    this.initializeInteractions();
  }

  // Animation on scroll
  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for stats
          if (entry.target.classList.contains('hero-stat')) {
            this.animateStatNumber(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.team-member, .value-card').forEach(element => {
      observer.observe(element);
    });
  }

  // Animate statistics numbers
  animateCounters() {
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    
    statNumbers.forEach((stat, index) => {
      const target = parseInt(stat.textContent);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + '+';
      }, 16);
    });
  }

  // Animate individual stat number
  animateStatNumber(statItem) {
    const numberElement = statItem.querySelector('.hero-stat-number');
    const target = parseInt(numberElement.textContent);
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      numberElement.textContent = Math.floor(current) + '+';
    }, 16);
  }

  // Scroll effects
  initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const heroSection = document.querySelector('.company-hero');
      
      if (heroSection) {
        // Parallax effect on hero background
        if (currentScrollY < window.innerHeight) {
          const translateY = currentScrollY * 0.5;
          heroSection.querySelector('.company-hero::before').style.transform = 
            `translateY(${translateY}px)`;
        }
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Interactive elements
  initializeInteractions() {
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
      member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-15px) scale(1.02)';
      });
      
      member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0) scale(1)';
      });

      // Social link interactions
      const socialLinks = member.querySelectorAll('.social-link');
      socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleSocialLinkClick(link);
        });
      });
    });

    // Value card interactions
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
      card.addEventListener('click', () => {
        this.handleValueCardClick(card);
      });
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleCTAClick(button);
      });
    });
  }

  // Handle social link clicks
  handleSocialLinkClick(link) {
    const platform = link.querySelector('i').className.split('-')[1];
    const memberName = link.closest('.team-member-info').querySelector('.team-member-name').textContent;
    
    // Track analytics (placeholder)
    console.log(`Social link clicked: ${platform} - ${memberName}`);
    
    // Add visual feedback
    link.style.transform = 'scale(0.9)';
    setTimeout(() => {
      link.style.transform = '';
    }, 150);
  }

  // Handle value card clicks
  handleValueCardClick(card) {
    const title = card.querySelector('.value-title').textContent;
    
    // Create modal or expand card (placeholder)
    console.log(`Value card clicked: ${title}`);
    
    // Add pulse animation
    card.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
      card.style.animation = '';
    }, 600);
  }

  // Handle CTA button clicks
  handleCTAClick(button) {
    const buttonText = button.textContent.trim();
    const destination = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    
    // Track conversion
    console.log(`CTA clicked: ${buttonText} -> ${destination}`);
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    
    // Simulate loading then navigate
    setTimeout(() => {
      if (destination) {
        window.location.href = destination;
      }
    }, 500);
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Add CSS for animations
const companyStyles = `
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .loading {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .team-member {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .value-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .cta-btn {
    position: relative;
    overflow: hidden;
  }
  
  .hero-stat {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = companyStyles;
  document.head.appendChild(styleSheet);
  
  // Initialize company page
  new CompanyPageController();
  
  // Mobile menu toggle
  const menuIcon = document.querySelector('.menu');
  const nav = document.querySelector('nav');
  
  if (menuIcon && nav) {
    menuIcon.addEventListener('click', function() {
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add loading spinner removal
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    setTimeout(() => {
      loadingSpinner.style.opacity = '0';
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
      }, 500);
    }, 1000);
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.querySelectorAll('.animate-in').forEach(element => {
      element.style.animationPlayState = 'paused';
    });
  } else {
    // Resume animations when page is visible
    document.querySelectorAll('.animate-in').forEach(element => {
      element.style.animationPlayState = 'running';
    });
  }
});

// Export for potential use in other scripts
window.CompanyPageController = CompanyPageController;
