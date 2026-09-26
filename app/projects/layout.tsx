import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects - Zimora Technologies | Portfolio',
  description: 'Explore our portfolio of successful IT projects at Zimora Technologies. View our web development, mobile app, and digital transformation projects delivered to clients across Kenya and beyond.',
  keywords: 'Zimora Technologies projects, web development portfolio, mobile app projects, digital transformation case studies, IT projects Kenya, software development portfolio, client success stories',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Our Projects - Zimora Technologies | Portfolio',
    description: 'Explore our portfolio of successful IT projects at Zimora Technologies. View our web development, mobile app, and digital transformation projects delivered to clients.',
    type: 'website',
    url: 'https://zimoratech.co.ke/projects',
    images: [
      {
        url: 'https://zimoratech.co.ke/images/projects-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zimora Technologies Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects - Zimora Technologies | Portfolio',
    description: 'Explore our portfolio of successful IT projects at Zimora Technologies.',
    images: ['https://zimoratech.co.ke/images/projects-twitter-card.jpg'],
  },
  verification: {
    google: 'bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM',
  },
  other: {
    'theme-color': '#ff4d00',
    'msapplication-TileColor': '#ff4d00',
    'application-name': 'Zimora Technologies Projects',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zimora Technologies',
    'mobile-web-app-capable': 'yes',
    'language': 'English',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/projects" />
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
            "name": "Zimora Technologies Projects",
            "description": "Explore our portfolio of successful IT projects at Zimora Technologies. View our web development, mobile app, and digital transformation projects delivered to clients across Kenya and beyond.",
            "url": "https://zimoratech.co.ke/projects",
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
                "name": "Projects",
                "item": "https://zimoratech.co.ke/projects"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
