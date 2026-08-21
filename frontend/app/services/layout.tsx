import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Zimora Technologies',
  description: 'Discover comprehensive IT services at Zimora Technologies including web development, digital marketing, cybersecurity, cloud computing, and software solutions for businesses in Kenya.',
  keywords: 'IT services Kenya, web development services, digital marketing, cybersecurity services, cloud computing, software development, Zimora Technologies',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Services | Zimora Technologies',
    description: 'Discover comprehensive IT services at Zimora Technologies including web development, digital marketing, cybersecurity, and cloud computing solutions.',
    type: 'website',
    url: 'https://zimoratech.co.ke/services',
    images: [
      {
        url: 'https://zimoratech.co.ke/images/services-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zimora Technologies Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Zimora Technologies',
    description: 'Discover comprehensive IT services at Zimora Technologies including web development and cybersecurity solutions.',
    images: ['https://zimoratech.co.ke/images/services-twitter-card.jpg'],
  },
  verification: {
    google: 'bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM',
  },
  other: {
    'theme-color': '#ff4d00',
    'msapplication-TileColor': '#ff4d00',
    'application-name': 'Zimora Technologies Services',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zimora Technologies',
    'mobile-web-app-capable': 'yes',
    'language': 'English',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/services" />
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
            "name": "Zimora Technologies Services",
            "description": "Discover comprehensive IT services at Zimora Technologies including web development, digital marketing, cybersecurity, and cloud computing solutions",
            "url": "https://zimoratech.co.ke/services",
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
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What IT services does Zimora Technologies offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zimora Technologies offers comprehensive IT services including web development, digital marketing, cybersecurity, cloud computing, and custom software solutions for businesses in Kenya."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide services to startups and small businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we work with startups, small businesses, and established organizations. We tailor every solution to meet your specific goals and budget."
                }
              },
              {
                "@type": "Question",
                "name": "What technologies do you work with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We work with modern technologies including React, Angular, Vue.js, Node.js, Python, JavaScript, HTML5, CSS3, WordPress, PHP, MySQL, Git, Docker, AWS, and Google Cloud."
                }
              },
              {
                "@type": "Question",
                "name": "How long does a typical web development project take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Project timelines vary depending on complexity. A basic business website typically takes 2-4 weeks, while complex web applications may take 8-16 weeks. We provide detailed timelines during consultation."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer ongoing support and maintenance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide ongoing support, maintenance, and upgrades for all our projects to ensure they remain secure, up-to-date, and performing optimally."
                }
              }
            ]
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
                "name": "Services",
                "item": "https://zimoratech.co.ke/services"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
