import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Zimora Technologies',
  description: 'Read the complete Terms of Service for Zimora Technologies. Understand our policies, terms of use, and legal agreements for our IT solutions and services.',
  keywords: 'terms of service, legal terms, terms of use, Zimora Technologies, IT solutions terms, web development terms, service agreement',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service - Zimora Technologies',
    description: 'Read the complete Terms of Service for Zimora Technologies. Understand our policies, terms of use, and legal agreements for our IT solutions and services.',
    type: 'website',
    url: 'https://zimoratech.co.ke/terms-of-service',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - Zimora Technologies',
    description: 'Read the complete Terms of Service for Zimora Technologies. Understand our policies and legal agreements.',
  },
  verification: {
    google: 'bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM',
  },
  other: {
    'theme-color': '#ff4d00',
    'msapplication-TileColor': '#ff4d00',
    'application-name': 'Zimora Technologies',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zimora Technologies',
    'mobile-web-app-capable': 'yes',
    'language': 'English',
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/terms-of-service" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Terms of Service for Zimora Technologies IT solutions and services",
            "url": "https://zimoratech.co.ke/terms-of-service",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Zimora Technologies",
              "url": "https://zimoratech.co.ke/"
            },
            "inLanguage": "en-US"
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Zimora Technologies",
            "url": "https://zimoratech.co.ke/",
            "logo": "https://zimoratech.co.ke/images/Zimora.png",
            "description": "Professional IT solutions, web development, digital marketing, and cybersecurity services in Kenya",
            "email": "info@zimoratech.co.ke",
            "telephone": "+254117411547",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ruiru, Kiambu County",
              "addressLocality": "Ruiru",
              "addressRegion": "Kiambu County",
              "addressCountry": "KE"
            },
            "sameAs": [
              "https://facebook.com/zimoratechnologies",
              "https://twitter.com/ZimoraTech",
              "https://linkedin.com/company/zimoratechnologies",
              "https://instagram.com/zimoratechnologies"
            ]
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://zimoratech.co.ke/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Terms of Service",
                "item": "https://zimoratech.co.ke/terms-of-service"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
