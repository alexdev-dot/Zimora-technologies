import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Zimora Technologies | Leading IT Solutions Company',
  description: 'Learn about Zimora Technologies - your trusted partner for customized IT solutions, web development, and digital transformation. Discover our mission, values, team, and company story.',
  keywords: 'about Zimora Technologies, IT company Kenya, web development company, custom software solutions, digital transformation, technology partner, IT services, Alex Kariuki',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'About Us - Zimora Technologies | Leading IT Solutions',
    description: 'Learn about Zimora Technologies - your trusted partner for customized IT solutions, web development, and digital transformation. Meet our team and discover our story.',
    type: 'website',
    url: 'https://zimoratech.co.ke/about',
    images: [
      {
        url: 'https://zimoratech.co.ke/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Zimora Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Zimora Technologies',
    description: 'Learn about Zimora Technologies - your trusted partner for customized IT solutions and digital transformation.',
    images: ['https://zimoratech.co.ke/images/about-twitter-card.jpg'],
  },
  verification: {
    google: 'bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zimora Technologies',
    'mobile-web-app-capable': 'yes',
    'language': 'English',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/about" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
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
              "streetAddress": "Westlands Business District, 1234 Tech Hub Building",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi County",
              "postalCode": "00100",
              "addressCountry": "KE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-1.2921",
              "longitude": "36.8219"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Kenya"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "$$",
            "paymentAccepted": ["Cash", "Credit Card", "M-Pesa"],
            "sameAs": [
              "https://facebook.com/zimoratechnologies",
              "https://twitter.com/ZimoraTech",
              "https://linkedin.com/company/zimoratechnologies",
              "https://instagram.com/zimoratechnologies"
            ],
            "services": [
              "Web Development",
              "Digital Marketing",
              "Cybersecurity",
              "Cloud Computing",
              "IT Consulting"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254117411547",
              "contactType": "customer service",
              "availableLanguage": ["English", "Swahili"]
            },
            "founder": {
              "@type": "Person",
              "name": "Alex Kariuki",
              "jobTitle": "CEO & Founder",
              "sameAs": "https://www.linkedin.com/in/alex-kariuki-751a30345/"
            }
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
                "name": "Who founded Zimora Technologies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zimora Technologies was founded by Alex Kariuki, who serves as the CEO & Founder of the company."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Zimora Technologies located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Zimora Technologies is based in Ruiru, Kiambu County, Kenya, serving clients across Kenya and beyond."
                }
              },
              {
                "@type": "Question",
                "name": "What services does Zimora Technologies offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer comprehensive IT services including web development, digital marketing, cybersecurity, cloud computing, and IT consulting."
                }
              },
              {
                "@type": "Question",
                "name": "What is Zimora Technologies' mission?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our mission is to help businesses thrive in the digital age through cutting-edge technology solutions and exceptional service."
                }
              },
              {
                "@type": "Question",
                "name": "How can I contact Zimora Technologies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can contact us via email at info@zimoratech.co.ke or call us at +254 117 411 547. You can also reach us through our contact page on our website."
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
                "name": "About Us",
                "item": "https://zimoratech.co.ke/about"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
