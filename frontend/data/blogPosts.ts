export interface BlogPost {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: 'Web Development',
    date: 'April 1, 2026',
    title: 'The Future of Web Development: Trends to Watch in 2026',
    description: 'Explore the cutting-edge technologies and frameworks that are shaping the future of web development, from AI-powered tools to advanced JavaScript frameworks.',
    image: '/blog-images/Blog 1.jpg',
    featured: true
  },
  {
    id: 2,
    category: 'App Development',
    date: 'March 20, 2026',
    title: 'Building Scalable Mobile Apps: Best Practices',
    description: 'Learn the essential strategies for creating mobile applications that can grow with your business and handle millions of users.',
    image: '/blog-images/Blog 2.jpg',
    featured: false
  },
  {
    id: 3,
    category: 'Digital Marketing',
    date: 'March 25, 2026',
    title: 'SEO Strategies That Actually Work in 2026',
    description: 'Discover the latest SEO techniques that are driving results for businesses in today\'s competitive digital landscape.',
    image: '/blog-images/Blog 3.jpg',
    featured: false
  },
  {
    id: 4,
    category: 'Web Development',
    date: 'February 28, 2026',
    title: 'The Psychology of Great UI/UX Design',
    description: 'Understanding user behavior and cognitive psychology to create interfaces that convert and delight users.',
    image: '/blog-images/Blog 4.jpg',
    featured: false
  },
  {
    id: 5,
    category: 'Technology',
    date: 'March 8, 2026',
    title: 'Cloud Computing: Transforming Business Operations',
    description: 'How cloud technology is revolutionizing the way businesses operate and scale their digital infrastructure.',
    image: '/blog-images/Blog 5.jpg',
    featured: false
  },
  {
    id: 6,
    category: 'Security',
    date: 'March 5, 2026',
    title: 'Cybersecurity Essentials for Modern Businesses',
    description: 'Protecting your digital assets with the latest security practices and threat prevention strategies.',
    image: '/blog-images/Blog 6.jpg',
    featured: false
  },
  {
    id: 7,
    category: 'Technology',
    date: 'March 22, 2026',
    title: 'AI-First Development – How AI is Becoming Core of Web Development in 2026',
    description: 'AI-first development has shifted from a nice-to-have to an absolute necessity. Developers now use AI agents for boilerplate code, architecture suggestions, real-time debugging, and generating entire features from natural language prompts.',
    image: '/blog-images/Blog 7.jpg',
    featured: false
  },
  {
    id: 8,
    category: 'Web Development',
    date: 'March 20, 2026',
    title: 'E-commerce Trends: What\'s Driving Online Sales in 2026',
    description: 'Discover the latest e-commerce trends that are transforming how businesses sell online, from AI-powered recommendations to immersive shopping experiences.',
    image: '/blog-images/Blog 8.jpg',
    featured: false
  },
  {
    id: 9,
    category: 'App Development',
    date: 'March 25, 2026',
    title: 'Mobile UX Design Principles for Better User Retention',
    description: 'Learn the essential UX design principles that keep users engaged and coming back to your mobile app day after day.',
    image: '/blog-images/Blog 9.jpg',
    featured: false
  },
  {
    id: 10,
    category: 'Digital Marketing',
    date: 'March 15, 2026',
    title: 'Content Marketing Strategies That Convert in 2026',
    description: 'Explore proven content marketing techniques that drive engagement, build authority, and convert visitors into loyal customers.',
    image: '/blog-images/Blog 10.jpg',
    featured: false
  },
  {
    id: 11,
    category: 'Security',
    date: 'February 28, 2026',
    title: 'Cloud Security Best Practices for Modern Businesses',
    description: 'Essential security measures every business should implement to protect their cloud infrastructure and sensitive data.',
    image: '/blog-images/Blog 11.jpg',
    featured: false
  },
  {
    id: 12,
    category: 'Technology',
    date: 'January 5, 2026',
    title: 'Beyond Cryptocurrency: Blockchain in Business Applications',
    description: 'How blockchain technology is revolutionizing supply chain management, digital identity, and secure business transactions.',
    image: '/blog-images/Blog 12.jpg',
    featured: false
  },
  {
    id: 13,
    category: 'Web Development',
    date: 'March 1, 2026',
    title: 'Progressive Web Apps: The Future of Mobile Web Experience',
    description: 'Why PWAs are becoming the preferred choice for businesses looking to deliver native app experiences through web browsers.',
    image: '/blog-images/Blog 13.jpg',
    featured: false
  },
  {
    id: 14,
    category: 'App Development',
    date: 'March 5, 2026',
    title: 'iOS 18 Development: What\'s New for App Developers',
    description: 'Explore the latest features and capabilities in iOS 18 that developers can leverage to create amazing iPhone and iPad apps.',
    image: '/blog-images/Blog 14.png',
    featured: false
  },
  {
    id: 15,
    category: 'Digital Marketing',
    date: 'January 10, 2026',
    title: 'Social Media Marketing: Building Brand Communities in 2026',
    description: 'Strategies for creating engaged communities around your brand on social media platforms that drive long-term loyalty.',
    image: '/blog-images/Blog 15.jpg',
    featured: false
  },
  {
    id: 16,
    category: 'Technology',
    date: 'March 1, 2026',
    title: 'Machine Learning for Business: Practical Applications',
    description: 'Real-world machine learning applications that businesses can implement today to improve operations and customer experience.',
    image: '/blog-images/Blog 16.jpg',
    featured: false
  },
  {
    id: 17,
    category: 'Security',
    date: 'February 28, 2026',
    title: 'Data Privacy Compliance: What Businesses Need to Know',
    description: 'Navigating GDPR, CCPA, and emerging data privacy regulations to protect your business and customer data.',
    image: '/blog-images/Blog 17.jpg',
    featured: false
  },
  {
    id: 18,
    category: 'Web Development',
    date: 'January 25, 2026',
    title: 'REST vs GraphQL: Choosing the Right API Architecture',
    description: 'A comprehensive comparison of REST and GraphQL to help you choose the best API approach for your next project.',
    image: '/blog-images/Blog 18.jpg',
    featured: false
  }
];

// Helper function to get recent blog posts
export const getRecentBlogPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

// Helper function to get featured blog post
export const getFeaturedBlogPost = (): BlogPost | undefined => {
  return blogPosts.find(post => post.featured);
};
