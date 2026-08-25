import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';
import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Zimora Technologies - Professional IT Solutions Kenya',
  description: 'Learn about Zimora Technologies - your trusted partner for professional IT solutions, web development, and digital transformation in Kenya since 2026.',
  keywords: 'about Zimora Technologies, IT company Kenya, web development company, digital transformation, tech company Kenya',
  openGraph: {
    title: 'About Us | Zimora Technologies',
    description: 'Learn about Zimora Technologies - your trusted partner for professional IT solutions in Kenya',
    url: 'https://zimoratech.co.ke/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
