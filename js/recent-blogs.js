// Recent Blogs Functionality for Home Page
document.addEventListener('DOMContentLoaded', function() {
    fetchRecentBlogs();
});

// Blog data structure extracted from blog.html
const blogPosts = [
    {
        id: 1,
        title: "The Future of Web Development: Trends to Watch in 2026",
        excerpt: "Explore the cutting-edge technologies and frameworks that are shaping the future of web development, from AI-powered tools to advanced JavaScript frameworks.",
        category: "Web Development",
        date: "April 1, 2026",
        image: "assets/blog-images/Blog 1.jpg",
        featured: true
    },
    {
        id: 2,
        title: "Building Scalable Mobile Apps: Best Practices",
        excerpt: "Learn the essential strategies for creating mobile applications that can grow with your business and handle millions of users.",
        category: "App Development",
        date: "March 20, 2026",
        image: "assets/blog-images/Blog 2.jpg",
        featured: false
    },
    {
        id: 3,
        title: "SEO Strategies That Actually Work in 2026",
        excerpt: "Discover the latest SEO techniques that are driving results for businesses in today's competitive digital landscape.",
        category: "Digital Marketing",
        date: "March 25, 2026",
        image: "assets/blog-images/Blog 3.jpg",
        featured: false
    },
    {
        id: 4,
        title: "The Psychology of Great UI/UX Design",
        excerpt: "Understanding user behavior and cognitive psychology to create interfaces that convert and delight users.",
        category: "Web Development",
        date: "February 28, 2026",
        image: "assets/blog-images/Blog 4.jpg",
        featured: false
    },
    {
        id: 5,
        title: "Cloud Computing: Transforming Business Operations",
        excerpt: "How cloud technology is revolutionizing the way businesses operate and scale their digital infrastructure.",
        category: "Technology",
        date: "March 8, 2026",
        image: "assets/blog-images/Blog 5.jpg",
        featured: false
    },
    {
        id: 6,
        title: "Cybersecurity Essentials for Modern Businesses",
        excerpt: "Protecting your digital assets with the latest security practices and threat prevention strategies.",
        category: "Security",
        date: "March 5, 2026",
        image: "assets/blog-images/Blog 6.jpg",
        featured: false
    },
    {
        id: 7,
        title: "AI-First Development – How AI is Becoming Core of Web Development in 2026",
        excerpt: "AI-first development has shifted from a nice-to-have to an absolute necessity. Developers now use AI agents for boilerplate code, architecture suggestions, real-time debugging, and generating entire features from natural language prompts.",
        category: "Technology",
        date: "March 22, 2026",
        image: "assets/blog-images/Blog 7.jpg",
        featured: false
    },
    {
        id: 8,
        title: "E-commerce Trends: What's Driving Online Sales in 2026",
        excerpt: "Discover the latest e-commerce trends that are transforming how businesses sell online, from AI-powered recommendations to immersive shopping experiences.",
        category: "Web Development",
        date: "March 20, 2026",
        image: "assets/blog-images/Blog 8.jpg",
        featured: false
    },
    {
        id: 9,
        title: "Mobile UX Design Principles for Better User Retention",
        excerpt: "Learn the essential UX design principles that keep users engaged and coming back to your mobile app day after day.",
        category: "App Development",
        date: "March 25, 2026",
        image: "assets/blog-images/Blog 9.jpg",
        featured: false
    },
    {
        id: 10,
        title: "Content Marketing Strategies That Convert in 2026",
        excerpt: "Explore proven content marketing techniques that drive engagement, build authority, and convert visitors into loyal customers.",
        category: "Digital Marketing",
        date: "March 15, 2026",
        image: "assets/blog-images/Blog 10.jpg",
        featured: false
    },
    {
        id: 11,
        title: "Cloud Security Best Practices for Modern Businesses",
        excerpt: "Essential security measures every business should implement to protect their cloud infrastructure and sensitive data.",
        category: "Security",
        date: "February 28, 2026",
        image: "assets/blog-images/Blog 11.jpg",
        featured: false
    },
    {
        id: 12,
        title: "Beyond Cryptocurrency: Blockchain in Business Applications",
        excerpt: "How blockchain technology is revolutionizing supply chain management, digital identity, and secure business transactions.",
        category: "Technology",
        date: "January 5, 2026",
        image: "assets/blog-images/Blog 12.jpg",
        featured: false
    },
    {
        id: 13,
        title: "Progressive Web Apps: The Future of Mobile Web Experience",
        excerpt: "Why PWAs are becoming the preferred choice for businesses looking to deliver native app experiences through web browsers.",
        category: "Web Development",
        date: "March 1, 2026",
        image: "assets/blog-images/Blog 13.jpg",
        featured: false
    },
    {
        id: 14,
        title: "iOS 18 Development: What's New for App Developers",
        excerpt: "Explore the latest features and capabilities in iOS 18 that developers can leverage to create amazing iPhone and iPad apps.",
        category: "App Development",
        date: "March 5, 2026",
        image: "assets/blog-images/Blog 14.jpg",
        featured: false
    },
    {
        id: 15,
        title: "Social Media Marketing: Building Brand Communities in 2026",
        excerpt: "Strategies for creating engaged communities around your brand on social media platforms that drive long-term loyalty.",
        category: "Digital Marketing",
        date: "January 10, 2026",
        image: "assets/blog-images/Blog 15.jpg",
        featured: false
    },
    {
        id: 16,
        title: "Machine Learning for Business: Practical Applications",
        excerpt: "Real-world machine learning applications that businesses can implement today to improve operations and customer experience.",
        category: "Technology",
        date: "March 1, 2026",
        image: "assets/blog-images/Blog 16.jpg",
        featured: false
    },
    {
        id: 17,
        title: "Data Privacy Compliance: What Businesses Need to Know",
        excerpt: "Navigating GDPR, CCPA, and emerging data privacy regulations to protect your business and customer data.",
        category: "Security",
        date: "February 28, 2026",
        image: "assets/blog-images/Blog 17.jpg",
        featured: false
    },
    {
        id: 18,
        title: "REST vs GraphQL: Choosing the Right API Architecture",
        excerpt: "A comprehensive comparison of REST and GraphQL to help you choose the best API approach for your next project.",
        category: "Web Development",
        date: "January 25, 2026",
        image: "assets/blog-images/Blog 18.jpg",
        featured: false
    }
];

// Navigation function for horizontal scrolling
function scrollBlogs(direction) {
    const blogsGrid = document.getElementById('recentBlogsGrid');
    if (!blogsGrid) return;
    
    const scrollAmount = 450; // Width of blog card (420px) + gap (30px)
    if (direction === 'prev') {
        blogsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        blogsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

function fetchRecentBlogs() {
    const blogsGrid = document.getElementById('recentBlogsGrid');
    
    if (!blogsGrid) return;

    // Simulate loading delay for better UX
    setTimeout(() => {
        // Get the 3 most recent blogs (featured first, then by date)
        const recentBlogs = getRecentBlogs(3);
        displayBlogs(recentBlogs, blogsGrid);
        
        // Show/hide navigation buttons based on content
        updateNavigationButtons();
    }, 800);
}

function updateNavigationButtons() {
    const blogsGrid = document.getElementById('recentBlogsGrid');
    const prevBtn = document.querySelector('.blog-nav-prev');
    const nextBtn = document.querySelector('.blog-nav-next');
    
    if (!blogsGrid || !prevBtn || !nextBtn) return;
    
    // Check if scrolling is needed
    const needsScroll = blogsGrid.scrollWidth > blogsGrid.clientWidth;
    
    if (!needsScroll) {
        // Hide navigation buttons if no scrolling is needed
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        // Show navigation buttons
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

function getRecentBlogs(count) {
    // Sort blogs: featured posts first, then by date (most recent)
    const sortedBlogs = [...blogPosts].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Parse dates for comparison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
    
    return sortedBlogs.slice(0, count);
}

function displayBlogs(blogs, container) {
    container.innerHTML = '';
    
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        container.appendChild(blogCard);
    });
}

function createBlogCard(blog) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    article.innerHTML = `
        <div class="blog-image-container">
            <img src="${blog.image}" alt="${blog.title}" class="blog-image" loading="lazy">
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-category">${blog.category}</span>
                <span class="blog-date">
                    <i class="fa-regular fa-calendar"></i>
                    ${formatDate(blog.date)}
                </span>
            </div>
            <h3 class="blog-title">${blog.title}</h3>
            <p class="blog-excerpt">${blog.excerpt}</p>
            <a href="blog.html#blog-${blog.id}" class="blog-read-more">
                Read More 
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return article;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Add smooth scroll behavior for blog links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('blog-read-more')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        // If it's a link to a specific blog on the blog page
        if (href && href.includes('blog.html#')) {
            // Store the target blog ID in sessionStorage
            const blogId = href.split('#')[1];
            sessionStorage.setItem('targetBlog', blogId);
            
            // Navigate to blog page
            window.location.href = 'blog.html';
        }
    }
});

// Reveal animation for recent blogs section
function revealBlogs() {
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

// Listen for scroll events
window.addEventListener('scroll', revealBlogs);

// Handle window resize for navigation buttons
window.addEventListener('resize', function() {
    updateNavigationButtons();
});

// Initial check for elements in view
revealBlogs();
