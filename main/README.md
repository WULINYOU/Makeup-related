# Affiliate Authority Site - Reference Package

## Project Overview

This is an Affiliate Authority Site built with VitePress, dedicated to product reviews, comparisons, and content marketing for cross-border e-commerce shopping agents. The project uses a static site generator architecture, deployed on Cloudflare Pages, with complete SEO optimization, affiliate marketing conversion, and user experience design.

## Core Features

- **Tech Stack**: VitePress 1.2.3 + Vue 3 + Markdown
- **Deployment Platform**: Cloudflare Pages
- **Site Type**: Affiliate Authority Site
- **Target Market**: Cross-border e-commerce shopping agent users (global market)
- **Core Functions**: Product reviews, platform comparisons, Spreadsheet tool promotion, community building

## Resource Package Structure

```
main/
├── 01-Technology-Selection/    # Tech stack choices and rationale
├── 02-Project-Architecture/    # Overall architecture and directory structure
├── 03-Source-Code/             # Complete source code implementation
│   ├── vitepress-config/       # VitePress configuration files
│   ├── theme/                  # Custom theme components
│   ├── content/                # Content files (posts, platforms)
│   └── public/                 # Static assets (images, robots.txt)
├── 04-Design-Specification/    # UI/UX design specs and style system
├── 05-SEO-Implementation/      # SEO optimization strategy and details
├── 06-Key-Features/            # Core feature implementation details
├── 07-Deployment-Guide/        # Deployment process and operations guide
├── 08-Content-Model/           # Content structure and data model
└── 09-API-Interface/           # External integrations and API documentation
```

## Quick Start

### 1. Install Dependencies

```bash
cd 03-Source-Code
npm install
```

### 2. Local Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the local site.

### 3. Build Production Version

```bash
npm run build
```

Build output is located in the `dist/` directory.

### 4. Preview Build Result

```bash
npm run preview
```

## Core Documentation Index

| Document | Path | Description |
|----------|------|-------------|
| Technology Selection | `01-Technology-Selection/Technology-Selection.md` | Why VitePress, Vue 3, Cloudflare Pages |
| Project Architecture | `02-Project-Architecture/Project-Architecture.md` | Directory structure, component relationships, data flow |
| Design Specification | `04-Design-Specification/Design-Specification.md` | Color system, typography, component styles, responsive design |
| SEO Implementation Guide | `05-SEO-Implementation/SEO-Implementation-Guide.md` | Schema.org, Sitemap, Meta tags, GA4 |
| Key Features Implementation | `06-Key-Features/Key-Features-Implementation.md` | Marquee, article button injection, link interception |
| Deployment Guide | `07-Deployment-Guide/Deployment-Guide.md` | Cloudflare Pages deployment, custom domain, monitoring |
| Content Model | `08-Content-Model/Content-Model.md` | Article structure, Frontmatter spec, content organization |
| API Interface | `09-API-Interface/API-Interface.md` | Google Sheets, GA4, external link integration |

## Key Design Decisions

### Why VitePress?

1. **Extremely Fast Build Speed**: Based on Vite, hot reload takes effect instantly
2. **SEO Friendly**: Static HTML output, supports SSG
3. **Vue 3 Integration**: Can use Vue components to extend functionality
4. **Markdown First**: Content creation is simple and intuitive
5. **Flexible Theme Customization**: Supports fully custom themes

### Why Cloudflare Pages?

1. **Global CDN**: Auto-distributes to global edge nodes
2. **Sufficient Free Quota**: Suitable for small to medium projects
3. **Auto Deployment**: Git push auto-triggers build and deployment
4. **Custom Domain**: Free SSL certificate
5. **Excellent Performance**: Lighthouse score close to perfect

### Why Three-Column Layout?

1. **High Information Density**: Simultaneously displays brand directory, main content, and trending deals
2. **Great User Experience**: Quick navigation, related recommendations, call-to-action
3. **High Conversion Rate**: Multiple CTA touchpoints, guiding users to click Affiliate links
4. **Responsive Design**: Automatically switches to single-column layout on mobile

## Core Feature Highlights

### 1. Scrolling Marquee Banner

Fixed top scrolling bar displaying global user order information, enhancing trust and social proof.

### 2. Article Page Action Button Injection

Automatically injects two CTA buttons below each article title:
- Primary button: Access Spreadsheet tool
- Secondary button: View other platforms

### 3. JSON-LD Structured Data

Automatically generates Schema.org markup for each article:
- Article Schema (article metadata)
- FAQ Schema (frequently asked questions)
- Organization Schema (site information)

### 4. Three-Column Document Layout

- Left column: Brand directory (grouped by category)
- Middle column: Main content area
- Right column: Trending deals recommendations

### 5. SEO Optimization

- Auto-generated Sitemap
- Per-page independent Meta tags
- Google Analytics 4 integration
- robots.txt configuration
- Semantic HTML structure

## Content Organization Strategy

### Article Types

1. **Platform Review**: `posts/kakobuy-review/`
2. **Product Review**: `posts/nike-dunk-low-panda-review/`
3. **Seasonal Style**: `posts/spring-style/`, `posts/summer-style/`
4. **Spreadsheet Tool**: `posts/best-batch/`, `posts/budget-spreadsheet/`
5. **Platform Comparison**: `platforms/index.md`

### Frontmatter Specification

```yaml
---
layout: doc
title: Article Title
description: SEO description (150-160 characters)
keywords: keyword1, keyword2, keyword3
date: 2026-08-09
author: Kakobuy Team
tags: [tag1, tag2]
hasFAQ: true  # Whether to generate FAQ Schema
---
```

## Conversion Rate Optimization

### CTA Layout

1. **Homepage Hero Area**: Primary CTA button (Open Spreadsheet)
2. **Article Page Below Title**: Dual buttons (Spreadsheet + Other Platforms)
3. **Left Sidebar**: Brand directory links to Spreadsheet
4. **Right Sidebar**: Trending deals links to Spreadsheet
5. **Bottom Floating Button**: Discord community invitation

### Social Proof

- Scrolling marquee shows global user activity
- Statistics display (50+ countries, 10K+ users, 100K+ orders)
- Brand logo display

## Performance Optimization

### Image Optimization

- Use WebP format (30% smaller)
- Responsive images (srcset)
- Lazy loading (VitePress built-in)
- Image compression (TinyPNG)

### Code Optimization

- CSS variable reuse
- On-demand component loading
- Route-level code splitting
- Minimize JavaScript

### Caching Strategy

- Cloudflare auto-caches static assets
- Browser cache control
- CDN edge caching

## Extension Guide

### Add New Article

1. Create a new folder under `posts/`
2. Create `index.md` file (with frontmatter)
3. Add cover image to `public/image/`
4. Add category entry in `PostsIndex.vue`

### Add New Platform

1. Add platform logo under `logo/` (WebP format)
2. Edit `platforms/index.md` to add platform card

### Modify Brand Directory

Edit the `brandCategories` array in `LeftSidebar.vue`.

### Add FAQ Schema

1. Add `hasFAQ: true` in article frontmatter
2. Add FAQ data in the `faqs` object in `config.mjs`

## Monitoring & Analytics

### Google Analytics 4

- Tracking ID: `G-Y6V5YTKF9Q`
- Page view events
- User behavior analysis
- Conversion funnel tracking

### Google Search Console

- Submit Sitemap
- Monitor index status
- View search performance
- Fix crawl errors

### Cloudflare Analytics

- Traffic statistics
- Performance metrics
- Security protection
- Cache hit rate

## Best Practices

### SEO Best Practices

1. Each article includes unique title and description
2. Use semantic HTML (header, nav, main, article)
3. All images include descriptive alt text
4. Internal links use relative paths
5. External links add rel="noopener noreferrer"

### Content Creation Best Practices

1. Title includes target keywords
2. Description控制在 150-160 characters
3. Use H2/H3 to organize content structure
4. Each article at least 1000 words
5. Include internal and external links

### Performance Best Practices

1. Images use WebP format
2. Compress all static assets
3. Use CDN to distribute content
4. Minimize third-party scripts
5. Enable browser caching

## FAQ

**Q: How to change the website primary color?**

Edit the CSS variables in `03-Source-Code/theme/custom.css`:
```css
:root {
  --vp-c-brand-1: #667eea;  /* Primary color */
  --vp-c-brand-2: #764ba2;  /* Gradient accent color */
}
```

**Q: How to add new navigation menu items?**

Edit the `nav` array in `03-Source-Code/vitepress-config/config.mjs`.

**Q: How to disable indexing for an article?**

Add to the article's frontmatter:
```yaml
head:
  - [meta, { name: 'robots', content: 'noindex,nofollow' }]
```

**Q: How to update Google Analytics tracking ID?**

Edit the GA4 configuration in `03-Source-Code/vitepress-config/config.mjs`.

## Tech Stack Summary

| Technology | Version | Purpose |
|------------|---------|---------|
| VitePress | 1.2.3 | Static Site Generator |
| Vue 3 | 3.x | Component Framework |
| Markdown | - | Content Format |
| Cloudflare Pages | - | Deployment Platform |
| Google Analytics 4 | - | Traffic Analytics |
| Google Sheets | - | Data Management |
| Discord | - | Community Building |

## Contact & Support

- Discord Community: https://discord.gg/jtc399kUQV
- Project Repository: GitHub
- Live Site: https://kakobuy-7zh.pages.dev

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
**Maintainer**: Kakobuy Team
