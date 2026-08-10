# SEO Implementation Guide

## Overview

This document details Affiliate Authority Site 's SEO optimization strategy and specific implementation。This project targets Google indexing and ranking as core goals，while also ensuring affiliate approval and EEAT Credibility Building。

## SEO Architecture Overview

```
┌─────────────────────────────────────────────┐
│                 SEO Optimization层                   │
├──────────┬──────────┬──────────┬────────────┤
│ TechnicalSEO  │ ContentSEO  │ Structured data│ Analytics Tracking   │
├──────────┼──────────┼──────────┼────────────┤
│ Sitemap  │ MetaTag │ JSON-LD  │ GA4        │
│ robots   │ SemanticHTML │ Article  │ Search     │
│ cleanURL │ Frontmat │ FAQPage  │ Console    │
│ 速度Optimization │ 内链策略 │ Org      │            │
└──────────┴──────────┴──────────┴────────────┘
```

## 1. Technical SEO

### 1.1 Sitemap Configuration

**File**: `config.mjs` → `sitemap` Configuration

```javascript
sitemap: {
  hostname: 'https://kakobuy-7zh.pages.dev',
  transformItems(items) {
    return items.filter(item => {
      const path = item.url.replace('https://kakobuy-7zh.pages.dev', '')
      // 排除内部File
      if (path === '/README' || path === '/article-matrix-template') return false
      // 排除 media.md Page（非面向Users）
      if (path.includes('/media')) return false
      return true
    })
  },
},
```

**Key Design**:
- Use `transformItems` to filter pages that should not be indexed
- media.md page is only used as a resource reference，should not be indexed by search engines
- Auto-generate `sitemap.xml` and declare in `robots.txt` declare in

### 1.2 robots.txt

**File**: `public/robots.txt`

```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://kakobuy-7zh.pages.dev/sitemap.xml

# Crawl-delay (optional, polite crawling)
Crawl-delay: 1

# Allow all important pages
Allow: /posts/
Allow: /sitemap.xml

# No disallowed paths - everything is public
```

**Design Points**:
- Allow all crawlers to crawl
- Explicitly declare Sitemap Location
- Set Crawl-delay to avoid server overload
- All paths are public，No hidden content

### 1.3 URL Structure

```javascript
cleanUrls: true,  // No .html suffix
```

**URL mode**:
| Page Type | URL mode | Example |
|----------|----------|------|
| Homepage | `/` | `https://kakobuy-7zh.pages.dev/` |
| 文章 | `/posts/{slug}/` | `/posts/nike-dunk-low-panda-review/` |
| Platform | `/platforms/` | `/platforms/` |
| Index | `/posts/` | `/posts/` |

### 1.4 Meta Tag

**Global Meta** (config.mjs → head):

```javascript
head: [
  ['meta', { name: 'theme-color', content: '#667eea' }],
  ['meta', { name: 'robots', content: 'index,follow' }],
  ['meta', { name: 'googlebot', content: 'index,follow' }],
  ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
]
```

**Page-level Meta** (Frontmatter):

```yaml
---
title: Page title（60characters within）
description: SEODescription（150-160characters）
keywords: 关键词1, 关键词2, 关键词3
---
```

### 1.5 Performance Optimization（Core Web Vitals）

| Metric | Optimization Measures |
|------|----------|
| LCP | WebP Images、CDN Distribution、Preload critical resources |
| FID | Minimize JavaScript、Async load third-party scripts |
| CLS | Fixed-size images、Reserve ad space |
| INP | GPU Accelerated animations、Debounce/throttle event handling |

## 2. Structured data (JSON-LD)

### 2.1 Article Schema

For all `layout: doc` article pages, auto-generate Article markup：

```javascript
// config.mjs → transformPageData
if (frontmatter.layout === 'doc' && frontmatter.title) {
  ld.push({
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description || '',
    author: {
      '@type': 'Organization',
      name: 'Kakobuy Spreadsheet Archive',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kakobuy Spreadsheet Archive',
      url: hostname,
    },
    datePublished: frontmatter.date || '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  })
}
```

**Output Example**:
```json
{
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "Article",
    "headline": "Nike Dunk Low Panda Review",
    "description": "Comprehensive review of...",
    "author": { "@type": "Organization", "name": "Kakobuy Spreadsheet Archive" },
    "publisher": { "@type": "Organization", "name": "Kakobuy Spreadsheet Archive", "url": "https://kakobuy-7zh.pages.dev" },
    "datePublished": "2026-08-09",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://kakobuy-7zh.pages.dev/posts/nike-dunk-low-panda-review/" }
  }]
}
```

### 2.2 FAQ Schema

For articles with `hasFAQ: true` generate FAQ markup：

```javascript
if (frontmatter.hasFAQ) {
  const faqs = {
    '/posts/gutefrage-kakobuy-spreadsheet/': [
      { q: 'Is the Kakobuy spreadsheet free to use?', a: 'Yes! ...' },
      { q: 'Do I need special software?', a: 'No. ...' },
    ],
    // ... More FAQ Mapping
  }
  const items = faqs[urlPath]
  if (items) {
    ld.push({
      '@type': 'FAQPage',
      mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  }
}
```

**SEO value**: FAQ Schema Can display rich text snippets in search results，Improve click-through rate。

### 2.3 Injection Method

All JSON-LD Via `transformPageData` hook injected into page `<head>` in：

```javascript
return {
  head: [
    ...(pageData.frontmatter.head || []),
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': ld,
    })],
  ],
}
```

**Design Points**:
- Use `@graph` array to merge multiple Schema into one script block
- Reduce DOM number of script tags in
- Keep page frontmatter existing head Tag

## 3. Content SEO

### 3.1 Frontmatter Specification

```yaml
---
layout: doc
title: "Complete'sProduct Review标题（Include keywords）"
description: "150-160characters'sSEODescription，Include primary keywordsandlines动召唤"
keywords: "kakobuy, product review, best products, buying guide"
date: 2026-08-09
author: Kakobuy Team
tags: [review, fashion, streetwear]
hasFAQ: false
---
```

**Specification Details**:
- `title`: 60 characters within，Include target keywords
- `description`: 150-160 characters，Include keywords and CTA
- `keywords`: 5-10 related keywords
- `date`: Publish date，Used for Schema and sorting
- `hasFAQ`: Whether to generate FAQ Schema

### 3.2 Content Structure

```markdown
## Introduction（Include keywords）

### Product overview
### Detailed Review
### Pros and cons analysis
### Purchase Recommendation
### FAQ（If hasFAQ: true）

## Related Articles
- [Related Articles1](/posts/related-1/)
- [Related Articles2](/posts/related-2/)
```

### 3.3 Internal Linking Strategy

**Link Pattern**:
| Type | Location | Target |
|------|------|------|
| Navigation links | Top navigation | Homepage、Platform Page、Article Index |
| Article links | Article end | Related Articles |
| Sidebar links | Left/Right sidebar | Spreadsheet Tool |
| Category links | Index page | Category articles |
| CTA Links | Below article title | Spreadsheet + Platform Page |

**Internal Linking Principles**:
1. Each article at least 3 internal links
2. Use descriptive anchor text
3. Link to related content，Avoid irrelevant links
4. Use relative paths（`/posts/xxx/`）

### 3.4 EEAT Credibility Building

| Dimension | Implementation |
|------|----------|
| Experience | Detailed product reviews、Real user experience |
| Expertise | Professional industry analysis、Data-supported conclusions |
| Authoritativeness | Organization Schema、Consistent brand information |
| Trustworthiness | Objective pros and cons analysis、Transparent Affiliate Disclosure |

## 4. Affiliate Marketing SEO

### 4.1 Affiliate Link Optimization

```html
<!-- Standard Affiliate Links -->
<a href="https://..." target="_blank" rel="noopener noreferrer sponsored">
  Purchase links
</a>
```

**Key Attributes**:
- `rel="sponsored"`: Inform search engines this is a sponsored/Affiliate Links
- `rel="noopener noreferrer"`: Security attribute
- `target="_blank"`: Open in new tab

### 4.2 Google Indexing Optimization

1. **Sitemap Submit**: Via Google Search Console Submit sitemap.xml
2. **IndexRequest**: After new article publish via Search Console Request indexing
3. **Internal links**: Pass link equity through homepage and index pages
4. **Structured data**: Article + FAQ Schema Improve indexing quality

### 4.3 Tag Hiding Strategy

To keep pages clean，while preserving SEO value，tags use visual hiding method：

```css
article .tags,
article .tag-list {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  opacity: 0 !important;
}
```

**Design Intent**:
- Tag content preserved in HTML in，search engines can crawl
- Visually invisible，Does not affect user experience
- Than `display: none` safer（some search engines may ignore `display: none` content）

## 5. Analytics Tracking

### 5.1 Google Analytics 4

```javascript
// config.mjs → head
['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-Y6V5YTKF9Q' }],
['script', {}, `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Y6V5YTKF9Q', {
    page_path: window.location.pathname === '/' ? '/dev/home' : window.location.pathname
  });
`],
```

**Tracking Configuration**:
- Homepage path mapped to `/dev/home`（Distinguish homepage from other pages）
- Auto-track page views
- Support custom event tracking

### 5.2 Key Tracking Metrics

| Metric | Description | Target |
|------|------|------|
| Page views | Total traffic | Continuous growth |
| Bounce rate | Single-page visit ratio | < 70% |
| Average time on page | User engagement | > 2 minutes |
| CTA Click-through rate | Conversion effect | > 5% |
| Organic search traffic | SEO Effect | Proportion > 50% |

## 6. SEO Checklist

### Pre-Publish Checklist

- [ ] title Include target keywords，60 characters within
- [ ] description 150-160 characters，Include keywords and CTA
- [ ] keywords 5-10 related keywords
- [ ] At least 1 cover image（With alt text）
- [ ] At least 3 internal links
- [ ] Use H2/H3 to organize content structure
- [ ] Article word count > 1000
- [ ] Frontmatter Complete
- [ ] If has FAQ，Set `hasFAQ: true`
- [ ] In PostsIndex.vue add category entry
- [ ] After build check sitemap.xml includes new page

### Monthly SEO Maintenance

- [ ] Check Google Search Console errors
- [ ] View GA4 Traffic trends
- [ ] Update expired content
- [ ] Check dead links
- [ ] Submit new Sitemap

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
