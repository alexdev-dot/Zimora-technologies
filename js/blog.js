// Blog Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Pagination variables
    const postsPerPage = 12;
    let currentPage = 1;
    let filteredPosts = Array.from(blogPosts);
    
    // Sort blogs by date (newest first)
    sortBlogsByDate();
    
    // Handle navigation from home page to specific blog post
    handleTargetBlogScroll();
    
    // Add IDs to blog posts for navigation
    addBlogPostIds();
    
    // Calculate and update category counts
    function updateCategoryCounts() {
        const categories = {};
        
        // Count posts in each category
        blogPosts.forEach(post => {
            const categoryElement = post.querySelector('.category');
            const postCategory = categoryElement ? categoryElement.textContent.trim() : '';
            
            if (postCategory) {
                categories[postCategory] = (categories[postCategory] || 0) + 1;
            }
        });
        
        // Update filter buttons with counts
        categoryFilters.forEach(filter => {
            const categoryName = filter.textContent.trim();
            
            if (categoryName === 'All Posts') {
                // Show total count for "All Posts"
                const totalCount = blogPosts.length;
                filter.innerHTML = `${categoryName} <span class="category-count">(${totalCount})</span>`;
            } else {
                // Show count for specific category
                const count = categories[categoryName] || 0;
                filter.innerHTML = `${categoryName} <span class="category-count">(${count})</span>`;
            }
        });
    }
    
    // Add IDs to blog posts for navigation
    function addBlogPostIds() {
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach((post, index) => {
            // Add ID based on index + 1 (matching the blog data)
            post.id = `blog-${index + 1}`;
        });
    }
    
    // Sort blogs by date (newest first)
    function sortBlogsByDate() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        const posts = Array.from(blogGrid.querySelectorAll('.blog-post'));
        
        // Sort posts by date
        posts.sort((a, b) => {
            const dateA = parseBlogDate(a.querySelector('.date'));
            const dateB = parseBlogDate(b.querySelector('.date'));
            return dateB - dateA; // Newest first
        });
        
        // Re-append sorted posts to the grid
        posts.forEach(post => {
            blogGrid.appendChild(post);
        });
        
        // Update filtered posts array
        filteredPosts = posts;
    }
    
    // Parse blog date string to Date object
    function parseBlogDate(dateElement) {
        if (!dateElement) return new Date(0); // Return oldest date if no date found
        
        const dateText = dateElement.textContent.trim();
        
        // Handle different date formats
        const formats = [
            /(\w+)\s+(\d+),\s+(\d+)/, // "April 1, 2026"
            /(\d{4})-(\d{2})-(\d{2})/, // "2026-04-01"
            /(\d{2})\/(\d{2})\/(\d{4})/  // "04/01/2026"
        ];
        
        for (const format of formats) {
            const match = dateText.match(format);
            if (match) {
                if (format === formats[0]) {
                    // "April 1, 2026" format
                    const [, month, day, year] = match;
                    return new Date(`${month} ${day}, ${year}`);
                } else if (format === formats[1]) {
                    // "2026-04-01" format
                    const [, year, month, day] = match;
                    return new Date(`${year}-${month}-${day}`);
                } else if (format === formats[2]) {
                    // "04/01/2026" format
                    const [, month, day, year] = match;
                    return new Date(`${year}-${month}-${day}`);
                }
            }
        }
        
        // Fallback: try to parse as is
        return new Date(dateText);
    }
    
    // Function to handle new blog addition (for future use)
    function addNewBlogPost(blogPostElement) {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        // Add the new blog at the beginning
        blogGrid.insertBefore(blogPostElement, blogGrid.firstChild);
        
        // Re-sort to maintain proper order
        sortBlogsByDate();
        
        // Reset to first page to show the new blog
        currentPage = 1;
        displayPage(1);
        
        // Update category counts
        updateCategoryCounts();
        
        // Show notification for new blog
        showNewBlogNotification();
    }
    
    // Show notification for new blog
    function showNewBlogNotification() {
        const notification = document.createElement('div');
        notification.className = 'new-blog-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease-out;
                max-width: 300px;
            ">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <i class="fa-solid fa-sparkles" style="font-size: 20px;"></i>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">New Blog Published!</div>
                        <div style="font-size: 14px; opacity: 0.9;">Check out the latest article</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
        
        // Add animation styles
        if (!document.querySelector('#new-blog-styles')) {
            const style = document.createElement('style');
            style.id = 'new-blog-styles';
            style.textContent = `
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
        }
    }
    
    // Handle scrolling to specific blog post from home page
    function handleTargetBlogScroll() {
        const targetBlog = sessionStorage.getItem('targetBlog');
        
        if (targetBlog) {
            // Clear the stored target
            sessionStorage.removeItem('targetBlog');
            
            // Wait for page to fully load, then scroll to target
            setTimeout(() => {
                const targetElement = document.getElementById(targetBlog);
                
                if (targetElement) {
                    // Scroll to the blog post
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Highlight the blog post
                    highlightBlogPost(targetElement);
                }
            }, 500);
        }
    }
    
    // Highlight the target blog post
    function highlightBlogPost(element) {
        // Add highlight class
        element.classList.add('blog-post-highlighted');
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            element.classList.remove('blog-post-highlighted');
        }, 3000);
    }
    
    // Initialize filter functionality
    function initializeBlogFilter() {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                categoryFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get selected category (remove count from text)
                const selectedCategory = this.textContent.replace(/\s*\(\d+\)/, '').trim();
                
                // Filter blog posts
                filterBlogPosts(selectedCategory);
            });
        });
    }
    
    // Filter blog posts based on category
    function filterBlogPosts(category) {
        // Reset to first page when filtering
        currentPage = 1;
        
        // Get all posts from the DOM (already sorted by date)
        const allPosts = Array.from(document.querySelectorAll('.blog-post'));
        
        // Update filtered posts array
        if (category === 'All Posts') {
            filteredPosts = allPosts;
        } else {
            filteredPosts = allPosts.filter(post => {
                const categoryElement = post.querySelector('.category');
                const postCategory = categoryElement ? categoryElement.textContent.trim() : '';
                return postCategory === category;
            });
        }
        
        // Display first page of filtered results
        displayPage(1);
        
        // Show message if no posts found
        showNoPostsMessage(filteredPosts.length);
    }
    
    // Show no posts message
    function showNoPostsMessage(visibleCount) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.no-posts-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add message if no posts found
        if (visibleCount === 0) {
            const blogGrid = document.querySelector('.blog-grid');
            const message = document.createElement('div');
            message.className = 'no-posts-message';
            message.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; grid-column: 1 / -1;">
                    <i class="fa-solid fa-search" style="font-size: 3rem; color: #6b7280; margin-bottom: 20px; display: block;"></i>
                    <h3 style="color: #1a202c; margin-bottom: 10px;">No posts found</h3>
                    <p style="color: #6b7280;">Try selecting a different category or check back later for new content.</p>
                </div>
            `;
            blogGrid.appendChild(message);
        }
    }
    
    // Pagination functionality
    function initializePagination() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayPage(currentPage);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    displayPage(currentPage);
                }
            });
        }
    }
    
    // Display specific page of posts
    function displayPage(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        // Hide all posts first
        blogPosts.forEach(post => {
            post.style.display = 'none';
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
        });
        
        // Show posts for current page with animation
        postsToShow.forEach((post, index) => {
            setTimeout(() => {
                post.style.display = '';
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
                post.style.transition = 'all 0.3s ease';
            }, index * 100);
        });
        
        // Update pagination controls
        updatePaginationControls();
        
        // Scroll to top of blog grid
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageInfo = document.getElementById('page-info');
        const pageNumbers = document.getElementById('page-numbers');
        
        // Update previous/next buttons
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
        
        // Update page info
        if (pageInfo) {
            const startPost = (currentPage - 1) * postsPerPage + 1;
            const endPost = Math.min(currentPage * postsPerPage, filteredPosts.length);
            pageInfo.textContent = `Showing ${startPost}-${endPost} of ${filteredPosts.length} articles`;
        }
        
        // Update page numbers
        if (pageNumbers) {
            pageNumbers.innerHTML = '';
            
            // Show page numbers (max 5 pages at a time)
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            
            // Adjust if we're near the end
            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }
            
            // Add first page and ellipsis if needed
            if (startPage > 1) {
                addPageNumber(1);
                if (startPage > 2) {
                    const ellipsis = document.createElement('span');
                    ellipsis.className = 'page-ellipsis';
                    ellipsis.textContent = '...';
                    pageNumbers.appendChild(ellipsis);
                }
            }
            
            // Add page numbers
            for (let i = startPage; i <= endPage; i++) {
                addPageNumber(i);
            }
            
            // Add last page and ellipsis if needed
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const ellipsis = document.createElement('span');
                    ellipsis.className = 'page-ellipsis';
                    ellipsis.textContent = '...';
                    pageNumbers.appendChild(ellipsis);
                }
                addPageNumber(totalPages);
            }
        }
    }
    
    // Add page number button
    function addPageNumber(pageNum) {
        const pageNumbers = document.getElementById('page-numbers');
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number';
        pageBtn.textContent = pageNum;
        
        if (pageNum === currentPage) {
            pageBtn.classList.add('active');
        }
        
        pageBtn.addEventListener('click', () => {
            currentPage = pageNum;
            displayPage(currentPage);
        });
        
        pageNumbers.appendChild(pageBtn);
    }
    
    // Initialize everything
    sortBlogsByDate(); // Sort first to ensure proper order
    updateCategoryCounts();
    initializeBlogFilter();
    initializePagination();
    
    // Display first page on load
    displayPage(1);
    
    // Add CSS for animations, highlight effect, and pagination
    const style = document.createElement('style');
    style.textContent = `
        .blog-post {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.3s ease;
        }
        
        .blog-post[style*="display: none"] {
            opacity: 0;
            transform: translateY(20px);
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
        
        .no-posts-message {
            animation: fadeInUp 0.5s ease-out;
        }
        
        .blog-post-highlighted {
            background: linear-gradient(135deg, #fff5f5 0%, #fff0f0 100%) !important;
            border: 2px solid var(--primary-color, #ff4d00) !important;
            box-shadow: 0 10px 30px rgba(255, 77, 0, 0.2) !important;
            animation: pulseHighlight 2s ease-in-out;
        }
        
        @keyframes pulseHighlight {
            0% {
                box-shadow: 0 10px 30px rgba(255, 77, 0, 0.2);
            }
            50% {
                box-shadow: 0 15px 40px rgba(255, 77, 0, 0.4);
            }
            100% {
                box-shadow: 0 10px 30px rgba(255, 77, 0, 0.2);
            }
        }
        
        /* Pagination Styles */
        .pagination-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .pagination-info {
            color: #64748b;
            font-size: 14px;
            font-weight: 500;
        }
        
        .pagination-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .pagination-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            color: #374151;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .pagination-btn:hover:not(:disabled) {
            background: var(--primary-color, #ff4d00);
            color: white;
            border-color: var(--primary-color, #ff4d00);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 77, 0, 0.2);
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .page-numbers {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .page-number {
            width: 36px;
            height: 36px;
            border: 1px solid #e2e8f0;
            background: white;
            border-radius: 8px;
            color: #374151;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .page-number:hover {
            background: var(--primary-color, #ff4d00);
            color: white;
            border-color: var(--primary-color, #ff4d00);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 77, 0, 0.2);
        }
        
        .page-number.active {
            background: var(--primary-color, #ff4d00);
            color: white;
            border-color: var(--primary-color, #ff4d00);
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(255, 77, 0, 0.3);
        }
        
        .page-ellipsis {
            color: #64748b;
            font-size: 14px;
            padding: 0 4px;
            user-select: none;
        }
        
        @media (max-width: 768px) {
            .pagination-container {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }
            
            .pagination-controls {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .pagination-info {
                order: 2;
            }
            
            .pagination-controls {
                order: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Make the addNewBlogPost function globally accessible for easier use
    window.addNewBlogPost = addNewBlogPost;
    
    // Example of how to add a new blog (for documentation purposes):
    /*
    // To add a new blog post, create the HTML element and call:
    const newBlogHTML = `
        <article class="blog-post">
            <div class="post-image">
                <img src="assets/blog-images/new-blog.jpg" alt="New Blog Title" loading="lazy" width="800" height="400">
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="category">Technology</span>
                    <span class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h2>New Blog Title</h2>
                <p>Your blog excerpt here...</p>
                <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </article>
    `;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newBlogHTML;
    const newBlogElement = tempDiv.firstElementChild;
    
    addNewBlogPost(newBlogElement);
    */
});
