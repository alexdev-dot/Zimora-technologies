// Projects Page JavaScript

// Initialize projects page
document.addEventListener('DOMContentLoaded', function() {
  initializeFilters();
  initializeAnimations();
});

// Filter functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects with improved logic
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filter === 'all') {
          card.classList.remove('hidden');
          // Re-animate card
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = '';
          }, 10);
        } else if (cardCategory === filter) {
          card.classList.remove('hidden');
          // Re-animate card
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = '';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Animation initialization
function initializeAnimations() {
  // Reveal animations on scroll
  const reveals = document.querySelectorAll('.project-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  reveals.forEach(reveal => {
    reveal.style.opacity = '0';
    reveal.style.transform = 'translateY(30px)';
    reveal.style.transition = 'all 0.6s ease-out';
    observer.observe(reveal);
  });
}

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

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
