// Legal Pages JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize table of contents
    initializeTableOfContents();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize scroll progress indicator
    initializeScrollProgress();
    
    // Initialize copy link functionality
    initializeCopyLinks();
    
    // Initialize print functionality
    initializePrintFunctionality();
    
    // Update copyright year
    updateCopyrightYear();
});

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

// Table of Contents
function initializeTableOfContents() {
    const tocContainer = document.querySelector('.table-of-contents');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.document-section h3');
    if (headings.length === 0) return;

    let tocHTML = '<h3>Table of Contents</h3><ul>';
    
    headings.forEach((heading, index) => {
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
        heading.id = id;
        
        tocHTML += `
            <li>
                <a href="#${id}" data-section="${id}">
                    ${index + 1}. ${heading.textContent}
                </a>
            </li>
        `;
    });
    
    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;

    // Add click handlers for TOC links
    const tocLinks = tocContainer.querySelectorAll('a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 100; // Account for fixed header
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Update URL hash
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 100;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight current section on scroll
    const sections = document.querySelectorAll('.document-section');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    function highlightCurrentSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection(); // Initial call
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
}

// Copy Link Functionality
function initializeCopyLinks() {
    // Add copy buttons to section headings
    const headings = document.querySelectorAll('.document-section h3');
    
    headings.forEach(heading => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-link-btn';
        copyButton.innerHTML = '<i class="fa-solid fa-link"></i>';
        copyButton.title = 'Copy link to section';
        copyButton.setAttribute('aria-label', 'Copy link to section');
        
        heading.appendChild(copyButton);
        
        copyButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = window.location.origin + window.location.pathname + '#' + heading.id;
            
            navigator.clipboard.writeText(url).then(() => {
                // Show success message
                showToast('Link copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Link copied to clipboard!', 'success');
            });
        });
    });
}

// Print Functionality
function initializePrintFunctionality() {
    // Add print button
    const printButton = document.createElement('button');
    printButton.className = 'print-btn';
    printButton.innerHTML = '<i class="fa-solid fa-print"></i> Print Document';
    printButton.setAttribute('aria-label', 'Print document');
    
    // Insert after document header
    const documentHeader = document.querySelector('.document-header');
    if (documentHeader) {
        documentHeader.appendChild(printButton);
        
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS for new elements
const additionalCSS = `
/* Scroll Progress Bar */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(255, 77, 0, 0.1);
    z-index: 9999;
    pointer-events: none;
}

.scroll-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
    width: 0%;
    transition: width 0.3s ease;
}

/* Copy Link Button */
.copy-link-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    padding: 4px 8px;
    margin-left: 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-size: 0.8em;
}

.copy-link-btn:hover {
    background: rgba(255, 77, 0, 0.1);
    transform: scale(1.1);
}

/* Table of Contents Active State */
.table-of-contents a.active {
    color: var(--primary-color) !important;
    font-weight: 600;
    border-left: 3px solid var(--primary-color);
    padding-left: 7px !important;
}

/* Print Button */
.print-btn {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.print-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 77, 0, 0.3);
}

/* Toast Notifications */
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 350px;
    border-left: 4px solid var(--primary-color);
}

.toast.show {
    transform: translateX(0);
}

.toast-success {
    border-left-color: #22c55e;
}

.toast-error {
    border-left-color: #ef4444;
}

.toast-info {
    border-left-color: var(--primary-color);
}

/* Print Styles */
@media print {
    .scroll-progress,
    .copy-link-btn,
    .print-btn,
    .table-of-contents,
    .navbar,
    .top-header,
    .footer {
        display: none !important;
    }
    
    .privacy-document,
    .terms-document {
        box-shadow: none;
        border: none;
        padding: 20px;
    }
    
    .document-section {
        page-break-inside: avoid;
    }
    
    .document-section h3 {
        page-break-after: avoid;
    }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
