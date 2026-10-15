# SEO Improvements for Social Media Indexing

## Changes Made

### 1. Centralized Social Media Links
- Created `lib/social-links.ts` - Single source of truth for all social media URLs
- All components now import from this centralized file
- Ensures consistency across the entire website

### 2. Updated JSON-LD Structured Data
- Updated Organization and LocalBusiness schemas with correct social media structure
- Facebook is listed as company page under "sameAs"
- Personal profiles (LinkedIn, Instagram, TikTok) are linked under "founder" schema
- This helps Google understand the relationship between the business and founder
- Changed all social URLs to use `www.` prefix for better SEO

### 3. Added rel="me" Links
- Added `<link rel="me">` tags in the HTML head for all social media profiles
- This is a Google-supported method for verifying social media ownership
- Helps Google confirm that these profiles belong to your business

### 4. Updated Component URLs
- Updated all social media URLs in site-footer.tsx and site-navigation.tsx
- Changed from `facebook.com` to `www.facebook.com`
- Changed from `linkedin.com` to `www.linkedin.com`
- Changed from `instagram.com` to `www.instagram.com`
- Changed from `tiktok.com` to `www.tiktok.com`

### 5. Updated Sitemap
- Refreshed lastmod dates to current date (2026-10-15)
- Ensures Google knows the content is recent

### 6. Removed Twitter/X and YouTube
- Removed Twitter/X and YouTube from all social media links
- Removed from JSON-LD structured data
- Removed from rel="me" links
- Removed from Twitter metadata (site handle)

## Current Social Media Profile URLs

- Facebook: https://www.facebook.com/zimoratechnologies (Company Page)
- LinkedIn: https://www.linkedin.com/in/alex-kariuki-751a30345 (Personal Profile)
- Instagram: https://www.instagram.com/alexdevs.dot (Personal Profile)
- TikTok: https://www.tiktok.com/@alexdevs.dot (Personal Profile)

## Additional Steps to Improve Google Indexing

### 1. Verify with Google Search Console
- Add your website to Google Search Console (https://search.google.com/search-console)
- Submit your sitemap: https://zimoratech.co.ke/sitemap.xml
- Use the URL Inspection tool to check indexing status

### 2. Link Back from Social Media
- Add your website URL to all social media profile bios/sections
- Ensure consistency in brand name across all platforms
- Use consistent handle: @zimoratechnologies

### 3. Claim Your Knowledge Graph
- Google uses the JSON-LD data to build your Knowledge Graph
- The structured data now includes all social media profiles
- Google may take time to update the Knowledge Panel

### 4. Monitor Rich Results
- Use Google's Rich Results Test: https://search.google.com/test/rich-results
- Test your homepage to ensure structured data is valid
- Check for any errors in the structured data

### 5. Enable Social Media Meta Tags
- Consider adding Open Graph tags for each social platform
- Add Facebook-specific Open Graph tags
- Add Instagram-specific meta tags

### 6. Regular Content Updates
- Post regularly on social media and link back to your website
- This creates a strong backlink profile
- Google follows these links to discover and index your content

### 7. Social Media Verification
- Verify your social media profiles with your website:
  - Facebook (Company Page): Add meta tag or upload verification file
  - LinkedIn (Personal Profile): Add website to profile
  - Instagram (Personal Profile): Add website to profile
  - TikTok (Personal Profile): Add website to profile

## Why These Changes Help

1. **Structured Data**: Google uses JSON-LD to understand entity relationships
2. **Founder Schema**: Properly links personal profiles to the business through the founder schema
3. **Company vs Personal**: Separates company social media (Facebook) from founder's personal profiles
4. **rel="me" Links**: Explicit verification method for social media ownership
5. **Consistent URLs**: Using www. prefix is SEO best practice
6. **Centralized Data**: Prevents inconsistencies and makes updates easier
7. **Sitemap Updates**: Tells Google your content is fresh

## Expected Timeline

- **Immediate**: Changes are live on your website
- **1-2 weeks**: Google will recrawl and reindex your pages
- **2-4 weeks**: Google may update your Knowledge Panel with social media links
- **1-3 months**: Full integration of social media signals in search results

## Testing Checklist

- [ ] Test structured data with Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Verify all social media links work correctly
- [ ] Add website URL to all social media profiles
- [ ] Monitor Google Search Console for any errors
- [ ] Check if Knowledge Panel appears with social links
