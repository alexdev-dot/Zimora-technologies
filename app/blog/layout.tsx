import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Zimora Technologies | Latest IT Insights & Technology Trends',
  description: 'Stay updated with the latest technology trends, web development tips, digital marketing strategies, and IT insights from Zimora Technologies experts.',
  keywords: 'technology blog, web development blog, IT insights, digital marketing tips, cybersecurity trends, mobile app development, cloud computing, AI development',
  authors: [{ name: 'Zimora Technologies' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'Blog - Zimora Technologies | Latest IT Insights & Technology Trends',
    description: 'Stay updated with the latest technology trends, web development tips, digital marketing strategies, and IT insights from Zimora Technologies experts.',
    type: 'website',
    url: 'https://zimoratech.co.ke/blog',
    images: [
      {
        url: 'https://zimoratech.co.ke/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zimora Technologies Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Zimora Technologies | Latest IT Insights & Technology Trends',
    description: 'Stay updated with the latest technology trends, web development tips, digital marketing strategies, and IT insights from Zimora Technologies experts.',
    images: ['https://zimoratech.co.ke/images/blog-og-image.jpg'],
  },
  verification: {
    google: 'VbbLjJGQjifudI_TTcfK0hjyzirWCfR3pyVvGX9BeAE',
  },
  other: {
    'theme-color': '#ff4d00',
    'msapplication-TileColor': '#ff4d00',
    'application-name': 'Zimora Technologies Blog',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Zimora Technologies',
    'mobile-web-app-capable': 'yes',
    'language': 'English',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="canonical" href="https://zimoratech.co.ke/blog" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Zimora Technologies Blog",
            "description": "Latest technology insights, web development tips, digital marketing strategies, and IT trends",
            "url": "https://zimoratech.co.ke/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Zimora Technologies",
              "url": "https://zimoratech.co.ke/"
            },
            "inLanguage": "en-US",
            "about": [
              "Web Development",
              "Mobile App Development",
              "Digital Marketing",
              "Cybersecurity",
              "Technology",
              "Cloud Computing"
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
                "name": "Blog",
                "item": "https://zimoratech.co.ke/blog"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
