// 404 Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 404 page interactions
    init404Page();
});

function init404Page() {
    // Add interactive animations to 404 digits
    animate404Digits();
    
    // Add parallax effect on mouse move
    initParallaxEffect();
    
    // Add keyboard navigation
    initKeyboardNavigation();
    
    // Add Easter egg: Konami code for secret message
    initKonamiCode();
    
    // Add search functionality for missing pages
    initSearchFunctionality();
    
    // Add time-based greeting
    updateTimeBasedGreeting();
    
    // Add particle effects
    initParticleEffects();
}

// Animate 404 digits with random effects
function animate404Digits() {
    const digits = document.querySelectorAll('.error-digit');
    
    digits.forEach((digit, index) => {
        // Add hover effect
        digit.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.color = '#ff4d00';
        });
        
        digit.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = '';
        });
        
        // Add click effect
        digit.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'digitPulse 2s ease-in-out infinite';
                this.style.animationDelay = `${index * 0.2}s`;
            }, 10);
            
            // Create ripple effect
            createRipple(this);
        });
    });
}

// Create ripple effect on click
function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 77, 0, 0.3);
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect on mouse move
function initParallaxEffect() {
    const errorSection = document.querySelector('.error-404');
    const digits = document.querySelectorAll('.error-digit');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        digits.forEach((digit, index) => {
            const depth = (index + 1) * 10;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            digit.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Press 'H' to go home
        if (e.key === 'h' || e.key === 'H') {
            window.location.href = 'index.html';
        }
        
        // Press 'S' to focus search
        if (e.key === 's' || e.key === 'S') {
            const searchInput = document.querySelector('#searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Press Escape to go back
        if (e.key === 'Escape') {
            history.back();
        }
    });
}

// Konami code easter egg
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Easter egg activation
function activateEasterEgg() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff4d00, #ff6b35);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
        animation: easterEggPulse 2s ease-in-out;
        box-shadow: 0 10px 30px rgba(255, 77, 0, 0.5);
    `;
    message.textContent = '🎉 You found the secret! You\'re a true tech wizard!';
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

// Add easter egg animation
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes easterEggPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(easterEggStyle);

// Search functionality for missing pages
function initSearchFunctionality() {
    // Add search box to error links section
    const errorLinks = document.querySelector('.error-links');
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        margin-bottom: 2rem;
        animation: linksSlideIn 1s ease-out 1.1s both;
    `;
    
    searchContainer.innerHTML = `
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search for what you're looking for..." 
                   style="padding: 12px 20px; border: 1px solid rgba(255,255,255,0.2); 
                          background: rgba(255,255,255,0.05); border-radius: 25px; 
                          color: white; font-size: 16px; width: 300px; max-width: 100%;
                          backdrop-filter: blur(10px); outline: none;">
            <button id="searchBtn" style="margin-left: 10px; padding: 12px 20px; 
                    background: var(--primary-gradient); border: none; 
                    border-radius: 25px; color: white; cursor: pointer; font-weight: 600;">
                Search
            </button>
        </div>
        <div id="searchResults" style="margin-top: 1rem; color: var(--text-muted);"></div>
    `;
    
    errorLinks.insertBefore(searchContainer, errorLinks.firstChild);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    const pageSuggestions = {
        'web': 'services.html',
        'development': 'services.html',
        'app': 'services.html',
        'mobile': 'services.html',
        'marketing': 'services.html',
        'digital': 'services.html',
        'project': 'projects.html',
        'portfolio': 'projects.html',
        'work': 'projects.html',
        'blog': 'blog.html',
        'news': 'blog.html',
        'article': 'blog.html',
        'contact': 'contact.html',
        'about': 'about.html',
        'team': 'about.html',
        'home': 'index.html',
        'main': 'index.html'
    };
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }
        
        let found = false;
        let suggestions = [];
        
        for (const [keyword, page] of Object.entries(pageSuggestions)) {
            if (query.includes(keyword)) {
                suggestions.push(page);
                found = true;
            }
        }
        
        if (found) {
            const uniquePages = [...new Set(suggestions)];
            searchResults.innerHTML = `
                <p>Did you mean:</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                    ${uniquePages.map(page => {
                        const pageName = page.replace('.html', '').charAt(0).toUpperCase() + page.replace('.html', '').slice(1);
                        return `<a href="${page}" style="padding: 8px 16px; background: rgba(255,255,255,0.1); 
                                    border-radius: 20px; color: white; text-decoration: none; 
                                    border: 1px solid rgba(255,255,255,0.2);">${pageName}</a>`;
                    }).join('')}
                </div>
            `;
        } else {
            searchResults.innerHTML = `
                <p>No results found for "${query}". Try searching for: web, development, project, blog, contact, about, or home.</p>
            `;
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// Time-based greeting
function updateTimeBasedGreeting() {
    const errorDescription = document.querySelector('.error-description');
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good morning! ';
    } else if (hour < 17) {
        greeting = 'Good afternoon! ';
    } else {
        greeting = 'Good evening! ';
    }
    
    const originalText = errorDescription.textContent;
    errorDescription.textContent = greeting + originalText;
}

// Particle effects
function initParticleEffects() {
    const errorSection = document.querySelector('.error-404-background');
    
    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 77, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        errorSection.appendChild(particle);
        
        // Animate particle
        let opacity = 1;
        let y = startY;
        const speed = 1 + Math.random() * 2;
        const wobble = Math.random() * 2 - 1;
        
        const animateParticle = () => {
            y -= speed;
            opacity -= 0.005;
            const x = startX + Math.sin(y * 0.01) * wobble * 50;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0 && y > -10) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animateParticle);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
}

// Add page load analytics
function track404Page() {
    // Log 404 page visit (you can integrate with analytics here)
    console.log('404 Page Accessed:', {
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    });
}

// Track page load
track404Page();

// Add smooth scroll behavior for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading animation removal
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});