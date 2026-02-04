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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Validate form
    if (!validateContactForm(data)) {
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      showContactMessage('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
      
      // Reset form
      this.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Log form data (for demonstration)
      console.log('Contact form submitted:', data);
    }, 2000);
  });
}

// Form validation
function validateContactForm(data) {
  const errors = [];
  
  // Required fields
  if (!data.firstName || data.firstName.trim() === '') {
    errors.push('First name is required');
  }
  
  if (!data.lastName || data.lastName.trim() === '') {
    errors.push('Last name is required');
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.push('Email address is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.message || data.message.trim() === '') {
    errors.push('Message is required');
  }
  
  // Show errors if any
  if (errors.length > 0) {
    showContactMessage('error', errors.join('<br>'));
    return false;
  }
  
  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show contact form message
function showContactMessage(type, message) {
  // Remove existing messages
  const existingMessage = document.querySelector('.contact-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `contact-message ${type}`;
  messageDiv.innerHTML = `
    <div class="message-content">
      <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
      <button class="message-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
  `;
  
  // Add styles
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    max-width: 400px;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  // Add to page
  document.body.appendChild(messageDiv);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentElement) {
      messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => messageDiv.remove(), 300);
    }
  }, 5000);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  if (question) {
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  }
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

// CSS for ripple effect and messages
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
  
  .contact-message {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  
  .contact-message.success .message-content {
    border-left: 4px solid #10b981;
    color: #059669;
  }
  
  .contact-message.error .message-content {
    border-left: 4px solid #ef4444;
    color: #dc2626;
  }
  
  .message-content {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .message-content i {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .message-content span {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .message-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  .message-close:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
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
    
    // Close any open messages
    const messages = document.querySelectorAll('.contact-message');
    messages.forEach(message => message.remove());
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
    document.querySelectorAll('.contact-info-card').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  } else {
    // Resume animations when tab becomes visible
    document.querySelectorAll('.contact-info-card').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
});

// Form input animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (this.value === '') {
      this.parentElement.classList.remove('focused');
    }
  });
  
  // Add floating label effect
  if (input.value !== '') {
    input.parentElement.classList.add('focused');
  }
});

console.log('Contact page loaded successfully!');
