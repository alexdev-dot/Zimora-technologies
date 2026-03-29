// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initializeTimeDisplay();
  initializeMobileMenu();
  initializeScrollReveal();
  initializeCounters();
});

// Time display function
function initializeTimeDisplay() {
  function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
      const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      };
      timeElement.textContent = now.toLocaleDateString('en-US', options);
    }
  }

  // Update time immediately and then every minute
  updateTime();
  setInterval(updateTime, 60000);
}

// Mobile menu functionality
function initializeMobileMenu() {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('nav');

  if (menu && nav) {
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      menu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menu.contains(e.target)) {
        nav.classList.remove('active');
        menu.classList.remove('open');
      }
    });

    // Close menu when clicking on a link
    nav.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('active');
        menu.classList.remove('open');
      }
    });
  }
}

// Scroll reveal animation
function initializeScrollReveal() {
  const revealElements = document.querySelectorAll('.about-text, .about-image-section, .value-card, .stat-item');
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealOnScroll.observe(element);
  });
}

// Animated counters for stats
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // Animation speed

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;
    
    const updateCount = () => {
      const count = +counter.innerText;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target + (counter.parentElement.querySelector('.stat-label').textContent.includes('%') ? '%' : '+');
      }
    };
    
    updateCount();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}


// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button, .nav-quote-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  button, .nav-quote-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
