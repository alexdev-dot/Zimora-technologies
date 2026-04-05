// Page initialization

window.addEventListener('load', () => {

  // Initialize page transitions

  document.querySelectorAll('.page-transition').forEach((element, index) => {

    setTimeout(() => {

      element.style.opacity = '1';

      element.style.transform = 'translateY(0)';

    }, index * 100);

  });

});





// Enhanced page transition

document.addEventListener('DOMContentLoaded', function() {

  // Handle navigation link clicks with enhanced transitions

  const navLinks = document.querySelectorAll('nav a[href], .footer a[href]');

  navLinks.forEach(link => {

    link.addEventListener('click', function(e) {

      const href = this.getAttribute('href');

      

      // Skip external links, anchors, and mailto links

      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {

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



// Mobile Menu

function toggleMenu(){

  const nav = document.getElementById("nav");

  const menu = document.querySelector(".menu");

  let overlay = document.querySelector(".menu-overlay");

  

  // Create overlay if it doesn't exist

  if (!overlay) {

    overlay = document.createElement("div");

    overlay.className = "menu-overlay";

    document.body.appendChild(overlay);

  }

  

  nav.classList.toggle("active");

  overlay.classList.toggle("active");

  

  // Animate menu icon

  if (nav.classList.contains("active")) {

    menu.classList.add("open");

  } else {

    menu.classList.remove("open");

  }

}



// Close menu when clicking outside

document.addEventListener("click", function(event) {

  const nav = document.getElementById("nav");

  const menu = document.querySelector(".menu");

  const overlay = document.querySelector(".menu-overlay");

  

  if (!nav.contains(event.target) && !menu.contains(event.target)) {

    nav.classList.remove("active");

    menu.classList.remove("open");

    if (overlay) {

      overlay.classList.remove("active");

    }

  }

});



// Scroll Reveal with Intersection Observer for better performance

const reveals = document.querySelectorAll(".reveal");



const observerOptions = {

  threshold: 0.1,

  rootMargin: "0px 0px -50px 0px"

};



const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("active");

      observer.unobserve(entry.target); // Stop observing once revealed

    }

  });

}, observerOptions);



reveals.forEach(reveal => {

  observer.observe(reveal);

});



// Smooth scroll behavior for navigation links

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



// Time display function

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



// Auto-update copyright year

function updateCopyrightYear() {

  const currentYear = new Date().getFullYear();

  const copyrightElements = document.querySelectorAll('p');

  

  copyrightElements.forEach(element => {

    const text = element.textContent;

    if (text.includes('Copyright') && text.includes('Zimora Technologies')) {

      // Replace any year with the current year

      const updatedText = text.replace(/Copyright\s*&copy;\s*\d{4}/i, `Copyright &copy; ${currentYear}`);

      element.textContent = updatedText;

    }

  });

}



// Update copyright on page load

document.addEventListener('DOMContentLoaded', updateCopyrightYear);



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

    navbar.style.boxShadow = 'none';

  }

  

  lastScrollTop = scrollTop;

});



// Testimonial Slider with smooth transitions

let index = 0;

const slides = document.querySelectorAll(".slide");



function showSlide() {

  slides.forEach((slide, i) => {

    slide.classList.remove("active");

    if (i === index) {

      setTimeout(() => {

        slide.classList.add("active");

      }, 50);

    }

  });

}



function nextSlide() {

  slides[index].classList.remove("active");

  index = (index + 1) % slides.length;

  setTimeout(() => {

    slides[index].classList.add("active");

  }, 50);

}



// Auto-advance slides

setInterval(nextSlide, 5000);



// Add keyboard navigation

document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowLeft") {

    slides[index].classList.remove("active");

    index = (index - 1 + slides.length) % slides.length;

    showSlide();

  } else if (e.key === "ArrowRight") {

    nextSlide();

  }

});



// Enhanced page transition

document.addEventListener('DOMContentLoaded', function() {

  // Fade in page content

  setTimeout(() => {

    document.body.style.opacity = '1';

  }, 100);



  // Handle navigation link clicks with enhanced transitions

  const navLinks = document.querySelectorAll('nav a[href], .footer a[href]');

  navLinks.forEach(link => {

    link.addEventListener('click', function(e) {

      const href = this.getAttribute('href');

      

      // Skip external links, anchors, and mailto links

      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {

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

  

  // Newsletter Subscription Functionality

  const newsletterForm = document.getElementById('newsletterForm');

  const newsletterEmail = document.getElementById('newsletterEmail');

  const newsletterMessage = document.getElementById('newsletterMessage');

  

  if (newsletterForm) {

    newsletterForm.addEventListener('submit', function(e) {

      e.preventDefault();

      

      const email = newsletterEmail.value.trim();

      

      // Email validation

      if (!isValidEmail(email)) {

        showNewsletterMessage('Please enter a valid email address', 'error');

        return;

      }

      

      // Simulate newsletter subscription (in production, this would send to a backend)

      subscribeToNewsletter(email);

    });

  }

  

  // Real-time email validation

  if (newsletterEmail) {

    newsletterEmail.addEventListener('input', function() {

      const email = this.value.trim();

      if (email && !isValidEmail(email)) {

        this.style.borderColor = '#ef4444';

      } else {

        this.style.borderColor = '';

      }

    });

  }

  

  // Newsletter form enhancement - add focus effects

  const newsletterInput = document.getElementById('newsletterEmail');

  const newsletterBtn = document.querySelector('.newsletter-btn');

  

  if (newsletterInput && newsletterBtn) {

    // Add hover effect to button when input is focused

    newsletterInput.addEventListener('focus', function() {

      newsletterBtn.style.transform = 'scale(1.05)';

    });

    

    newsletterInput.addEventListener('blur', function() {

      newsletterBtn.style.transform = '';

    });

    

    // Add keyboard support

    newsletterInput.addEventListener('keypress', function(e) {

      if (e.key === 'Enter') {

        e.preventDefault();

        document.getElementById('newsletterForm').dispatchEvent(new Event('submit'));

      }

    });

  }

});



function isValidEmail(email) {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);

}



function showNewsletterMessage(message, type) {

  const newsletterMessage = document.getElementById('newsletterMessage');

  if (!newsletterMessage) return;

  

  newsletterMessage.textContent = message;

  newsletterMessage.className = `newsletter-message ${type} show`;

  

  // Auto-hide message after 5 seconds

  setTimeout(() => {

    newsletterMessage.classList.remove('show');

  }, 5000);

}



function subscribeToNewsletter(email) {

  const newsletterBtn = document.querySelector('.newsletter-btn');

  const originalContent = newsletterBtn.innerHTML;

  

  // Show loading state

  newsletterBtn.innerHTML = 'Subscribing...';

  newsletterBtn.disabled = true;

  

  // Simulate API call (in production, this would be a real API call)

  setTimeout(() => {

    // Store subscription in localStorage for demo purposes

    const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');

    

    // Check if email is already subscribed

    if (subscriptions.includes(email)) {

      showNewsletterMessage('This email is already subscribed to our newsletter!', 'error');

    } else {

      // Add new subscription

      subscriptions.push(email);

      localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));

      

      // Show success message

      showNewsletterMessage('Thank you for subscribing! Check your email for confirmation.', 'success');

      

      // Clear form

      document.getElementById('newsletterEmail').value = '';

      

      // Track subscription event (for analytics)

      if (typeof gtag !== 'undefined') {

        gtag('event', 'newsletter_subscription', {

          'event_category': 'engagement',

          'event_label': 'footer_newsletter'

        });

      }

    }

    

    // Restore button

    newsletterBtn.innerHTML = originalContent;

    newsletterBtn.disabled = false;

  }, 1500); // Simulate network delay

}

