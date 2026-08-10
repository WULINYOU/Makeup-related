# Technology Selection Guide

## Overview

This document details Affiliate Authority Site project's technology stack choices and rationale。Each technology choice is based on project requirements、performance requirements、SEO Optimization、development efficiencyand operational cost considerations。

## Core Technology Stack

### 1. VitePress 1.2.3

**Selection Rationale**:

1. **Extremely Fast Build Speed**
   - Based on Vite Build Tool，Development environment hot reload takes effect instantly
   - Production build speed is SSG faster than traditional 10-100 times
   - Suitable for frequently updated content websites

2. **SEO friendly**
   - Static HTML output（SSG），Search engines can directly crawl
   - supports custom Meta Tag、Schema.org Structured data
   - Auto-generate Sitemap
   - Support cleanUrls（No .html suffix）

3. **Vue 3 Integrate**
   - CanUse Vue use components to extend functionality
   - Support Composition API
   - Flexible theme customization，Fully customizable layout
   - Strong component reusability

4. **Markdown First**
   - Content creation is simple and intuitive，Non-technical users can get started
   - Support Frontmatter metadata
   - Supports custom containers、code highlighting、tables, etc.
   - Can embed Vue Component

5. **Primary题System**
   - Default theme is fully featured
   - Supports fully custom themes
   - Flexible layout slots（layout-top, layout-bottom etc.）
   - Can override default components

**Alternative Comparison**:

| Solution | Pros | Cons | Conclusion |
|------|------|------|------|
| WordPress | Rich ecosystem、Many plugins | Poor performance、Security risks、High maintenance cost | Not suitable for static content sites |
| Next.js | Powerful features、SSR/SSG Support | Steep learning curve、Slow build | Over-engineered |
| Hugo | Fast build speed | Complex template syntax、Poor extensibility | Not suitable for complex interactions |
| Jekyll | GitHub Pages Native support | Slow build speed、Plugin dependency Ruby | Insufficient performance |
| **VitePress** | **Fast speed、SEO Good、Vue Integrate** | **Relatively young ecosystem** | **Best Choice** |

### 2. Vue 3

**Selection Rationale**:

1. **Progressive Framework**
   - Can import on demand，Small size
   - Gentle learning curve
   - With VitePress deep integration

2. **Composition API**
   - Strong logic reusability
   - Clearer code organization
   - TypeScript Good support

3. **Reactive System**
   - Automatic dependency tracking
   - Automatic performance optimization
   - Good development experience

4. **Component Development**
   - High component reusability
   - Low maintenance cost
   - Team collaboration friendly

**In VitePress inApplication**:

- Custom theme components（LeftSidebar, RightSidebar, PostsIndex）
- Layout Component（CustomDocLayout）
- Interactive components（LeftMarquee）
- Style customization（custom.css）

### 3. Cloudflare Pages

**Selection Rationale**:

1. **Global CDN**
   - Auto-distribute to global 300+ edge nodes
   - Fast access speed，Low latency
   - Suitable for global user access

2. **Sufficient free quota**
   - Monthly 500 builds
   - Unlimited bandwidth
   - Supports custom domains
   - Free SSL certificate

3. **Auto Deployment**
   - Git Push auto-triggers build
   - Supports branch deployment（Preview）
   - Fast deployment speed（Usually 1-2 minutes）

4. **Excellent performance**
   - Lighthouse Score close to perfect
   - Auto-optimize images
   - Support HTTP/2 and HTTP/3

5. **Security protection**
   - DDoS protection
   - WAF（Web Application Firewall）
   - Bot Management

**Alternative Comparison**:

| Solution | Pros | Cons | Conclusion |
|------|------|------|------|
| Vercel | Simple deployment、Good preview environment | Slow domestic access、Limited free quota | Not suitable for global market |
| Netlify | Rich features、Form processing | Long build time、Slow domestic access | Insufficient performance |
| GitHub Pages | Free、Simple | Slow build、Limited features、Slow domestic access | Insufficient features |
| AWS S3 + CloudFront | Flexible、Extensible | Complex configuration、High cost | Over-engineered |
| **Cloudflare Pages** | **Global CDN、Large free quota、Fast speed** | **Relatively simple features** | **Best Choice** |

### 4. Markdown

**Selection Rationale**:

1. **ContentSimple creation**
   - Intuitive syntax，Low learning cost
   - Non-technical users can get started
   - Supports rich text editors

2. **Version Control Friendly**
   - Plain text format
   - Git Clear diff comparison
   - Easy collaboration

3. **Strong Convertibility**
   - Can convert to HTML、PDF、Word etc.
   - Supports custom extensions
   - Can embed code blocks、tables、images, etc.

4. **SEO friendly**
   - SemanticStructure
   - Easy to extract metadata
   - Support Frontmatter

**Frontmatter Extension**:

```yaml
---
layout: doc
title: Article title
description: SEO Description
keywords: 关键词1, 关键词2
date: 2026-08-09
author: Kakobuy Team
tags: [tag1, tag2]
hasFAQ: true
---
```

## Auxiliary Tools and Services

### 1. Google Analytics 4

**Selection Rationale**:

- Free traffic analytics tool
- Powerful features，Supports custom events
- With Google Search Console Integrate
- Supports conversion tracking

**Integration Method**:

In `config.mjs` 's `head` inject in GA4 script：

```javascript
head: [
  ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-Y6V5YTKF9Q' }],
  ['script', {}, `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Y6V5YTKF9Q', {
      page_path: window.location.pathname === '/' ? '/dev/home' : window.location.pathname
    });
  `],
]
```

### 2. Google Sheets

**Selection Rationale**:

- Free、easy-to-use data management tool
- Supports real-time collaboration
- Can embed in website
- Promoted as core product

**Integration Method**:

Integrated via external links，All CTA buttons point to Google Spreadsheet。

### 3. Discord

**Selection Rationale**:

- Free community building tool
- Supports text、voice、video communication
- High user activity
- Suitable for building loyal user base

**Integration Method**:

Bottom floating button，Link to Discord community。

### 4. WebP Image Format

**Selection Rationale**:

- Size is JPEG smaller than 30%
- Better quality
- Supports transparency
- Widely supported by modern browsers

**Compatibility Handling**:

VitePress Auto-handles image optimization，No extra configuration needed。

## Tech Stack Summary

| Layer | Technical | Version | Purpose |
|------|------|------|------|
| 框架 | VitePress | 1.2.3 | Static Site Generator |
| UI | Vue 3 | 3.x | Component Development |
| Content | Markdown | - | Content Format |
| Deployment | Cloudflare Pages | - | Global CDN |
| 分析 | Google Analytics 4 | - | Traffic Analytics |
| Tool | Google Sheets | - | Data Management |
| community | Discord | - | Userscommunity |
| Images | WebP | - | Image Format |

## TechnicalSelection Principles

1. **Performance First**: Choose fast build speed、and fast loading technologies
2. **SEO friendly**: Prioritize static output、supports custom Meta technologies
3. **development efficiency**: Choose gentle learning curve、well-documented technologies
4. **运维成本**: Prioritize sufficient free quota、high automation technologies
5. **Extensibility**: Choose easily extensible、supports custom technologies
6. **User Experience**: Choose fast access speed、smooth interaction technologies

## Future Technology Evolution

### Possible Technology Upgrades

1. **TypeScript**: Enhance code type safety
2. **PWA**: Support offline access
3. **Headless CMS**: Use Strapi or Contentful to manage content
4. **Search function**: Integrate Algolia DocSearch
5. **Comment system**: Integrate Giscus or Disqus

### Technical Debt

1. **Hardcoded Data**: Some data（such as brand directory、Trending Deals）hardcoded in components，should migrate to config files
2. **Style Duplication**: Some styles are duplicated across components，should extract to global styles
3. **Test Coverage**: Lacks automated testing，should add unit and end-to-end tests

## Summary

This project's technology selection follows"Simple、faster than traditional速、SEO friendly"principles，choosing a mature、stable、efficient tech stack。VitePress + Vue 3 + Cloudflare Pages combination，satisfies both performance and SEO requirements，while ensuring development efficiency and operational convenience。

This tech stack is especially suitable for content websites、blogs、documentation sites and Affiliate marketing sites。If your project needs are similar，you can reference this technology selection plan。

---

**Document Version**: v1.0.0  
**Last Updated**: 2026-08-09  
**Maintainer**: Kakobuy Team
