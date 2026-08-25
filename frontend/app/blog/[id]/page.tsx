import { blogPosts } from '@/data/blogPosts';
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === parseInt(params.id));
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Zimora Technologies',
    };
  }

  return {
    title: `${post.title} | Zimora Technologies Blog`,
    description: post.description,
    keywords: `${post.category}, ${post.title}, tech blog Kenya, web development, digital marketing`,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://zimoratech.co.ke/blog/${params.id}`,
      type: 'article',
      images: [
        {
          url: `https://zimoratech.co.ke${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`https://zimoratech.co.ke${post.image}`],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    return (
      <>
        <SiteNavigation />
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>Blog Post Not Found</h1>
          <p>Sorry, the blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <button className="btn-primary">Back to Blog</button>
          </Link>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteNavigation />

      {/* Blog Post Hero */}
      <section className="blog-post-hero">
        <div className="blog-post-hero-background">
          <div className="blog-post-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="blog-post-hero-content">
            <div className="blog-post-meta">
              <span className="blog-post-category">{post.category}</span>
              <span className="blog-post-date">{post.date}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-description">{post.description}</p>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="blog-post-content">
        <div className="container">
          <div className="blog-post-body">
            <div className="blog-post-image">
              <img src={post.image} alt={post.title} />
            </div>
            
            <div className="blog-post-text">
              <p>
                This is a comprehensive article about {post.title.toLowerCase()}. 
                In this post, we explore the key aspects and insights related to this topic in the context of modern technology and business practices.
              </p>
              
              <h2>Key Takeaways</h2>
              <ul>
                <li>Understanding the current landscape and trends</li>
                <li>Practical applications for businesses and developers</li>
                <li>Future outlook and recommendations</li>
              </ul>

              <h2>Detailed Analysis</h2>
              <p>
                The technology landscape is constantly evolving, and staying ahead of the curve is essential for businesses looking to maintain competitive advantage. 
                This article delves deep into the subject matter, providing actionable insights and expert perspectives.
              </p>

              <h2>Implementation Strategies</h2>
              <p>
                When implementing these concepts in your organization, consider the following approaches:
              </p>
              <ul>
                <li>Start with a clear assessment of your current capabilities</li>
                <li>Develop a phased implementation plan</li>
                <li>Invest in training and skill development</li>
                <li>Monitor and measure results continuously</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                {post.title} represents an important area of focus for modern businesses. 
                By understanding and implementing these strategies, organizations can position themselves for success in the digital age.
              </p>
            </div>

            <div className="blog-post-navigation">
              <Link href="/blog" className="back-to-blog">
                <i className="fa-solid fa-arrow-left"></i> Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <SiteFooter />
      <Chatbot />
    </>
  );
}
