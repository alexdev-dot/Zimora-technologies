import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Zimora Technologies - Get in Touch',
  description: 'Contact Zimora Technologies for professional IT solutions, web development, and digital transformation services. Get in touch with our expert team for your technology needs.',
  keywords: 'contact Zimora Technologies, IT services Kenya, web development contact, software development inquiry, digital transformation consultation, technology support',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Contact Zimora Technologies - Get in Touch',
    description: 'Contact Zimora Technologies for professional IT solutions, web development, and digital transformation services. Get in touch with our expert team.',
    type: 'website',
    url: 'https://zimoratech.co.ke/contact',
    images: [
      {
        url: 'https://zimoratech.co.ke/images/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Zimora Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Zimora Technologies - Get in Touch',
    description: 'Contact Zimora Technologies for professional IT solutions and web development services.',
    images: ['https://zimoratech.co.ke/images/contact-twitter-card.jpg'],
  },
  verification: {
    google: 'bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM',
  },
  other: {
    'theme-color': '#ff4d00',
    'msapplication-TileColor': '#ff4d00',
    'application-name': 'Contact Zimora Technologies',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zimora Technologies',
    'mobile-web-app-capable': 'yes',
    'language': 'English',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/contact" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
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
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-1.2264",
              "longitude": "37.0146"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Kenya"
            },
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, M-Pesa",
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
            }
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
            "@type": "WebPage",
            "name": "Contact Zimora Technologies",
            "description": "Contact Zimora Technologies for professional IT solutions, web development, and digital transformation services",
            "url": "https://zimoratech.co.ke/contact",
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
                "name": "How can I contact Zimora Technologies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can contact us via email at info@zimoratech.co.ke or call us at +254 117 411 547. Our office is located in Ruiru, Kiambu County, Kenya."
                }
              },
              {
                "@type": "Question",
                "name": "What are your business hours?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are open Monday to Friday from 9:00 AM to 6:00 PM (EAT). We are closed on weekends and public holidays."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept cash, credit cards, and M-Pesa for payments. Payment terms can be discussed based on project requirements."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer free consultations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we offer initial consultations to discuss your project requirements and provide recommendations. Contact us to schedule a consultation."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can you respond to inquiries?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We typically respond to inquiries within 24 hours during business days. For urgent matters, please call us directly at +254 117 411 547."
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
                "name": "Contact",
                "item": "https://zimoratech.co.ke/contact"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
