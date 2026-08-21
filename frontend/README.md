# Zimora Technologies Website

A professional, modern website for Zimora Technologies - a leading IT solutions company based in Kenya, specializing in web development, mobile app development, digital marketing, and comprehensive technology solutions.

## ?? Website Overview

**Live URL:** https://zimoratech.co.ke/  
**Development Year:** 2026  
**Company Location:** Ruiru, Kiambu County, Kenya  
**Contact:** +254 117 411 547 | info@zimoratech.co.ke  

## ?? Table of Contents

- [Features](#-features)
- [Pages Structure](#-pages-structure)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [SEO Implementation](#-seo-implementation)
- [Performance Optimizations](#-performance-optimizations)
- [Installation & Setup](#installation--setup)
- [Configuration](#-configuration)
- [Browser Support](#-browser-support)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ? Features

### Core Functionality
- **Responsive Design:** Fully responsive across desktop, tablet, and mobile devices
- **Modern UI/UX:** Clean, professional design with smooth animations and transitions
- **Fast Loading:** Optimized for performance with lazy loading and code splitting
- **SEO Optimized:** Comprehensive SEO implementation with structured data
- **Accessibility:** WCAG 2.1 compliant with proper semantic HTML

### Business Features
- **Service Showcase:** Detailed presentation of IT services and solutions
- **Project Portfolio:** Interactive gallery showcasing completed projects
- **Blog Section:** Dynamic blog for sharing industry insights and updates
- **Contact Forms:** Functional contact forms with validation
- **Social Media Integration:** Links to social media platforms
- **Multi-language Ready:** Structure supports future multi-language implementation

## ?? Pages Structure

`
/
+-- /                      # Homepage - Hero section, services overview, testimonials
+-- /about                 # About Us - Company story, mission, vision, team
+-- /services              # Services - Detailed service descriptions and offerings
+-- /projects              # Portfolio - Case studies and project showcase
+-- /blog                  # Blog - Articles and industry insights
+-- /contact               # Contact - Contact form and company information
+-- /privacy-policy        # Privacy Policy - Data protection and privacy terms
+-- /terms-of-service      # Terms of Service - Legal terms and conditions
+-- /404                   # Custom 404 error page
`

### Page Descriptions

#### Homepage (/)
- Hero section with call-to-action
- Featured services overview
- Client testimonials
- Recent projects preview
- Contact information
- Newsletter signup section

#### About Page (/about)
- Company history and story
- Mission and vision statements
- Core values
- Team members
- Company statistics
- Certifications and partnerships

#### Services Page (/services)
- Web Development
- Mobile App Development
- Digital Marketing
- Cybersecurity Solutions
- Cloud Computing
- IT Consulting
- Software Development
- Technical Support

#### Projects Page (/projects)
- Project gallery with filters
- Case study details
- Client testimonials
- Technology stack used
- Project outcomes

#### Blog Page (/blog)
- Article listings
- Category filters
- Search functionality
- Related articles
- Author information

#### Contact Page (/contact)
- Contact form with validation
- Office location with map
- Contact information
- Social media links
- Working hours

## ?? Technologies Used

### Frontend Framework
- **Next.js 16.3.2:** React framework with App Router for server-side rendering and static generation
- **React 18:** UI library for building interactive components
- **TypeScript:** Type-safe JavaScript for better development experience

### Styling
- **CSS3:** Modern styling with Flexbox and Grid
- **Custom Font System:** Zimora Sans and Zimora Tech brand fonts
- **Font Awesome 6.6.0:** Icon library
- **Responsive Design:** Mobile-first approach

### Performance & Optimization
- **Static Site Generation (SSG):** Pre-rendered pages for optimal performance
- **Lazy Loading:** Images and content loaded on demand
- **Code Splitting:** Automatic code splitting by Next.js
- **Image Optimization:** Next.js Image component for automatic optimization

### SEO Tools
- **Schema.org:** Structured data markup
- **Open Graph:** Social media optimization
- **Twitter Cards:** Twitter sharing optimization
- **Google Search Console:** Verification and monitoring

## ?? Project Structure

`
frontend/
+-- app/
¦   +-- layout.tsx              # Root layout with metadata and global styles
¦   +-- page.tsx                # Homepage component
¦   +-- globals.css             # Global styles and custom fonts
¦   +-- not-found.tsx           # Custom 404 error page
¦   +-- about/
¦   ¦   +-- layout.tsx          # About page layout with metadata
¦   ¦   +-- page.tsx            # About page content
¦   +-- services/
¦   ¦   +-- layout.tsx          # Services page layout with metadata
¦   ¦   +-- page.tsx            # Services page content
¦   +-- projects/
¦   ¦   +-- layout.tsx          # Projects page layout with metadata
¦   ¦   +-- page.tsx            # Projects page content
¦   +-- blog/
¦   ¦   +-- layout.tsx          # Blog page layout with metadata
¦   ¦   +-- page.tsx            # Blog page content
¦   +-- contact/
¦   ¦   +-- layout.tsx          # Contact page layout with metadata
¦   ¦   +-- page.tsx            # Contact page content
¦   +-- privacy-policy/
¦   ¦   +-- layout.tsx          # Privacy policy layout with metadata
¦   ¦   +-- page.tsx            # Privacy policy content
¦   +-- terms-of-service/
¦   ¦   +-- layout.tsx          # Terms of service layout with metadata
¦   ¦   +-- page.tsx            # Terms of service content
¦   +-- sitemap.ts              # Dynamic sitemap generation
¦   +-- favicon/                # Favicon files for various platforms
+-- components/
¦   +-- site-navigation.tsx     # Navigation component with mobile menu
¦   +-- site-footer.tsx         # Footer component with newsletter
¦   +-- chatbot.tsx             # AI chatbot component
¦   +-- whatsapp-button.tsx     # WhatsApp floating button
+-- public/
¦   +-- images/                 # Static images (logo, CEO, company)
¦   +-- blog-images/            # Blog post images
¦   +-- project-images/         # Project showcase images
¦   +-- fonts/                  # Custom font files
+-- package.json                # Dependencies and scripts
+-- tsconfig.json               # TypeScript configuration
+-- next.config.ts              # Next.js configuration
+-- README.md                   # This file
`

## ?? Key Components

### Navigation (site-navigation.tsx)
- Sticky header with smooth scroll
- Mobile hamburger menu with toggle functionality
- Active page highlighting
- Social media links in top header
- Live clock display
- Responsive design

### Footer (site-footer.tsx)
- Company information and logo
- Quick links navigation
- Services links
- Newsletter subscription form
- Social media icons
- Copyright information

### Chatbot (chatbot.tsx)
- AI-powered assistant
- Voice mode support
- Text-to-speech functionality
- Knowledge base integration
- Responsive design

### WhatsApp Button (whatsapp-button.tsx)
- Floating WhatsApp chat button
- Pre-filled message
- Direct contact integration

## ?? SEO Implementation

### Meta Tags
- Title tags optimized for each page using Next.js Metadata API
- Meta descriptions with keywords
- Keywords meta tags
- Author and language tags
- Robots directives (index/follow for main pages, noindex/nofollow for 404)

### Open Graph Tags
- OG title, description, and URL
- OG images for social sharing
- OG site name and locale
- Image dimensions specified

### Twitter Cards
- Summary cards with large images
- Twitter-specific meta tags
- Site handle integration (@ZimoraTech)

### Structured Data (Schema.org)
- LocalBusiness schema with complete address and contact info
- Organization schema with social media links
- WebPage schema for various pages
- Blog schema for blog page
- Article schema for blog posts
- BreadcrumbList schema for navigation
- FAQPage schema for About page
- Cookie Policy schema for Privacy Policy

### Technical SEO
- Canonical URLs for each page
- Dynamic XML sitemap generation
- Google Search Console verification (bhpFKnuQK3tUPORrm8uBc0r1OHRW7y8NU5nJI6-ZyeM)
- Proper heading hierarchy (H1-H6)
- Alt text for images
- Semantic HTML structure
- Favicon with multiple sizes (16x16, 32x32, 180x180)

## ? Performance Optimizations

### Loading Performance
- Static Site Generation (SSG) for all pages
- Lazy loading for images
- Asynchronous JavaScript loading
- Font preloading with font-display: swap
- Resource hints (preconnect, dns-prefetch)

### Caching Strategy
- Next.js automatic caching
- Static asset optimization
- Image optimization through Next.js Image component

### Code Optimization
- TypeScript for type safety
- Component-based architecture
- Automatic code splitting
- Tree shaking for unused code elimination

### Network Optimization
- HTTP/2 support through Next.js
- Automatic compression
- Optimized bundle sizes

## ?? Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Local Development

1. **Navigate to the frontend directory**
   `ash
   cd frontend
   `

2. **Install dependencies**
   `ash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   `

3. **Run the development server**
   `ash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   `

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

`ash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
`

### Start Production Server

`ash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
`

## ?? Configuration

### Environment Variables
No environment variables required for this static site.

### Customization

#### Update Contact Information
Edit contact details in components/site-footer.tsx and components/site-navigation.tsx.

#### Update Colors
Modify CSS variables in pp/globals.css:
`css
:root {
  --primary-color: #ff4d00;
  --secondary-color: #1a1a2e;
  --text-color: #333;
  /* ... */
}
`

#### Update Logo
Replace public/images/Zimora.png with your company logo.

#### Update Google Analytics
Add your Google Analytics tracking ID in pp/layout.tsx metadata.

#### Update Metadata
Edit metadata in each page's layout.tsx file to update titles, descriptions, and SEO tags.

## ?? Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ? Full |
| Firefox | 88+ | ? Full |
| Safari | 14+ | ? Full |
| Edge | 90+ | ? Full |
| Opera | 76+ | ? Full |
| IE 11 | - | ? Not supported |

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+
- Firefox Mobile 88+

## ?? Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** 
pm run build
   - **Output Directory:** .next
3. Deploy automatically on push

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build Command:** 
pm run build
   - **Publish Directory:** .next
3. Deploy automatically on push

### Traditional Hosting
1. Build the project: 
pm run build
2. Upload the .next folder and package.json to your hosting provider
3. Install dependencies on server: 
pm install --production
4. Start the server: 
pm start
5. Configure domain settings

### Domain Configuration
- Update domain in all layout files (meta tags, canonical URLs, schema data)
- Update sitemap generation with new domain
- Submit new sitemap to Google Search Console
- Update any hardcoded URLs in components

## ?? Security Considerations

- HTTPS enabled for production
- Content Security Policy (CSP) headers recommended
- XSS protection through React's built-in sanitization
- CSRF protection for forms
- Regular security audits recommended
- Environment variables for sensitive data

## ?? Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow React best practices
- Write clean, commented code
- Ensure mobile responsiveness
- Test across browsers
- Follow Next.js conventions

## ?? Maintenance

### Regular Updates
- Update copyright year annually
- Review and update content quarterly
- Check for broken links monthly
- Update security patches as needed
- Monitor performance metrics
- Update dependencies regularly

### Content Updates
- Blog posts: Weekly/Bi-weekly
- Projects: As completed
- Testimonials: As received
- Team information: As changes occur

## ?? Support

For support and inquiries:
- **Email:** info@zimoratech.co.ke
- **Phone:** +254 117 411 547
- **Website:** https://zimoratech.co.ke

## ?? License

This project is proprietary software owned by Zimora Technologies. All rights reserved.

---

**Last Updated:** August 2026  
**Version:** 2.0.0 (Next.js Migration)  
**Maintained by:** Zimora Technologies Team
