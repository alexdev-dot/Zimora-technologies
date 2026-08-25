import SiteNavigation from '@/components/site-navigation';
import SiteFooter from '@/components/site-footer';
import Chatbot from '@/components/chatbot';
import WhatsAppButton from '@/components/whatsapp-button';
import Link from 'next/link';
import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Our Services | Zimora Technologies - Web Development & IT Solutions',
  description: 'Discover Zimora Technologies comprehensive IT services including web development, digital marketing, cybersecurity, cloud computing, and custom software solutions in Kenya.',
  keywords: 'web development services, digital marketing Kenya, cybersecurity services, cloud computing, IT consulting, software development Kenya',
  openGraph: {
    title: 'Our Services | Zimora Technologies',
    description: 'Comprehensive IT services including web development, digital marketing, and cybersecurity',
    url: 'https://zimoratech.co.ke/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
