// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', function() {
  // Fade in page content
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Handle navigation link clicks with smooth transitions
  const navLinks = document.querySelectorAll('nav a[href]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip external links and anchors
      if (href.startsWith('http') || href.startsWith('#')) {
        return;
      }
      
      e.preventDefault();
      
      // Fade out current page
      document.body.style.transition = 'opacity 0.3s ease-out';
      document.body.style.opacity = '0';
      
      // Navigate to new page after fade out
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // Handle button clicks with transitions
  const buttons = document.querySelectorAll('button[onclick]');
  buttons.forEach(button => {
    const onclick = button.getAttribute('onclick');
    if (onclick && onclick.includes('window.location.href')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Fade out current page
        document.body.style.transition = 'opacity 0.3s ease-out';
        document.body.style.opacity = '0';
        
        // Navigate after fade out
        setTimeout(() => {
          eval(onclick);
        }, 300);
      });
    }
  });
});

// Loading spinner
window.addEventListener('load', () => {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.add('fade-out');
    setTimeout(() => {
      spinner.style.display = 'none';
    }, 500);
  }
});

// Live time display
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Mobile menu toggle
function toggleMenu() {
  const nav = document.getElementById('nav');
  if (nav) {
    nav.classList.toggle('active');
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.getElementById('nav');
  const menu = document.querySelector('.menu');
  
  if (nav && menu && !nav.contains(e.target) && !menu.contains(e.target)) {
    nav.classList.remove('active');
  }
});

// Scroll reveal animation
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Add scroll event listener for reveal
window.addEventListener('scroll', reveal);

// Initial reveal check
reveal();

// Smooth scroll for navigation links
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

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

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

// Service buttons functionality
document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const serviceTitle = this.closest('.service-item').querySelector('h3').textContent;
    console.log(`Learn more about: ${serviceTitle}`);
    // You can add modal functionality or navigation here
  });
});

// Hero buttons functionality
document.querySelector('.hero-buttons .btn-primary')?.addEventListener('click', function() {
  console.log('GET STARTED clicked');
  // You can add navigation to contact or signup page
});

document.querySelector('.hero-buttons .btn-outline')?.addEventListener('click', function() {
  console.log('VIEW OUR PROJECTS clicked');
  // You can add navigation to portfolio page
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', createRipple);
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
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
  
  button {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.getElementById('nav');
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  }
});

// Performance optimization: Debounce scroll events
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

// Debounced scroll handlers
const debouncedReveal = debounce(reveal, 100);

// Update scroll event listeners with debounced functions
window.removeEventListener('scroll', reveal);
window.addEventListener('scroll', debouncedReveal);

// Add page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.querySelectorAll('.service-item').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  } else {
    // Resume animations when tab becomes visible
    document.querySelectorAll('.service-item').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
});

console.log('Services page loaded successfully!');
