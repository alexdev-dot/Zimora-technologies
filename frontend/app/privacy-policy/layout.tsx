import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Zimora Technologies',
  description: 'Read Zimora Technologies\' Privacy Policy to understand how we collect, use, and protect your personal information when you use our IT solutions and services.',
  keywords: 'privacy policy, data protection, personal information, GDPR compliance, Zimora Technologies, IT privacy, web development privacy',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy - Zimora Technologies',
    description: 'Read Zimora Technologies\' Privacy Policy to understand how we collect, use, and protect your personal information when you use our IT solutions and services.',
    type: 'website',
    url: 'https://zimoratech.co.ke/privacy-policy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Zimora Technologies',
    description: 'Read Zimora Technologies\' Privacy Policy to understand how we protect your personal information.',
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

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/privacy-policy" />
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
            "name": "Privacy Policy",
            "description": "Privacy Policy for Zimora Technologies IT solutions and services",
            "url": "https://zimoratech.co.ke/privacy-policy",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Zimora Technologies",
              "url": "https://zimoratech.co.ke/"
            },
            "inLanguage": "en-US",
            "dateModified": "2026-04-01",
            "reviewedBy": {
              "@type": "Organization",
              "name": "Zimora Technologies",
              "url": "https://zimoratech.co.ke/"
            }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cookie Policy",
            "description": "Cookie Policy and Consent Management for Zimora Technologies",
            "url": "https://zimoratech.co.ke/privacy-policy#cookies",
            "mainEntity": {
              "@type": "Article",
              "headline": "Cookie Policy and Consent Management",
              "description": "Comprehensive information about cookies used by Zimora Technologies and how users can manage their preferences",
              "author": {
                "@type": "Organization",
                "name": "Zimora Technologies",
                "url": "https://zimoratech.co.ke/"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Zimora Technologies",
                "url": "https://zimoratech.co.ke/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://zimoratech.co.ke/images/Zimora.png"
                }
              },
              "datePublished": "2026-04-01",
              "dateModified": "2026-04-01",
              "articleSection": "Privacy Policy",
              "keywords": ["cookies", "privacy", "GDPR", "consent management", "data protection"],
              "about": [
                {
                  "@type": "Thing",
                  "name": "Cookie Consent Management"
                },
                {
                  "@type": "Thing", 
                  "name": "Privacy Compliance"
                },
                {
                  "@type": "Thing",
                  "name": "Data Protection"
                }
              ]
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
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "privacy",
              "areaServed": "Worldwide",
              "availableLanguage": ["English"],
              "email": "privacy@zimoratech.co.ke"
            },
            "privacyPolicy": "https://zimoratech.co.ke/privacy-policy",
            "sameAs": [
              "https://twitter.com/ZimoraTech",
              "https://linkedin.com/company/zimora-technologies"
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
                "name": "Privacy Policy",
                "item": "https://zimoratech.co.ke/privacy-policy"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
