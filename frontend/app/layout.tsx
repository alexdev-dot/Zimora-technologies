import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zimora Technologies | Professional IT Solutions & Web Development Services',
  description: 'Zimora Technologies offers professional IT solutions, web development, digital marketing, and cybersecurity services. Transform your business with our expert technology solutions.',
  keywords: 'IT solutions, web development, digital marketing, cybersecurity, cloud computing, software development, Zimora Technologies',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Zimora Technologies | Professional IT Solutions & Web Development Services',
    description: 'Zimora Technologies offers professional IT solutions, web development, digital marketing, and cybersecurity services. Transform your business with our expert technology solutions.',
    type: 'website',
    url: 'https://zimoratech.co.ke/',
    siteName: 'Zimora Technologies',
    locale: 'en_US',
    images: [
      {
        url: 'https://zimoratech.co.ke/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zimora Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zimora Technologies | Professional IT Solutions & Web Development Services',
    description: 'Zimora Technologies offers professional IT solutions, web development, digital marketing, and cybersecurity services. Transform your business with our expert technology solutions.',
    images: ['https://zimoratech.co.ke/images/twitter-card.jpg'],
    site: '@ZimoraTech',
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
    'revisit-after': '7 days',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://zimoratech.co.ke/" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
        
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
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://zimoratech.co.ke/"
                }
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
