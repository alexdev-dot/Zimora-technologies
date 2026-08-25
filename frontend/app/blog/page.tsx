import BlogContent from './BlogContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Zimora Technologies - Tech Insights & Digital Trends',
  description: 'Stay updated with the latest technology insights, web development trends, digital marketing strategies, and innovation news from Zimora Technologies experts.',
  keywords: 'tech blog Kenya, web development trends, digital marketing insights, technology news, software development tips',
  openGraph: {
    title: 'Blog | Zimora Technologies',
    description: 'Latest technology insights and digital trends from our expert team',
    url: 'https://zimoratech.co.ke/blog',
    type: 'website',
  },
};

export default function BlogsPage() {
  return <BlogContent />;
}
