# Content Model Document

## Overview

This document defines Affiliate Authority Site 's content structure and data model。All content uses Markdown file management，Via Frontmatter define metadata。

## Content Types

### 1. Homepage (Home)

**File**: `index.md`

**Frontmatter**:

```yaml
---
layout: home
title: "Kakobuy Spreadsheet Archive - Your Ultimate Resource"
description: "150-160characters'sSEODescription"
keywords: "kakobuy spreadsheet, cross-border ecommerce, ..."
hero:
  name: "Kakobuy Spreadsheet Archive"
  text: "Your Ultimate Resource for Cross-Border E-commerce"
  tagline: "Discover expert archives, tips, and resources"
  image:
    src: /image/kakobuy-spreadsheet-product-analytics.webp
    alt: "Description性alttext"
  actions:
    - theme: brand
      text: "Open Kakobuy Spreadsheet"
      link: "https://docs.google.com/spreadsheets/d/..."
    - theme: alt
      text: "Other Platforms"
      link: /platforms/
    - theme: alt
      text: "Browse Archives"
      link: /posts/
features:
  - icon:
      src: data:image/svg+xml,...
    title: "Spreadsheet Archives"
    details: "Comprehensive archives on using Kakobuy spreadsheets"
    link: /posts/gutefrage-kakobuy-spreadsheet/
  # ... More features
---
```

**Body Content**: Markdown formatted supplementary content（statistics、advantages, etc.）。

### 2. Article page (Doc)

**File**: `posts/{slug}/index.md`

**Frontmatter**:

```yaml
---
layout: doc
title: "Article title（60characters within，Include keywords）"
description: "SEODescription（150-160characters，Include keywords andCTA）"
keywords: "关键词1, 关键词2, 关键词3, ..."
date: 2026-08-09
author: "Kakobuy Team"
tags: [review, fashion, streetwear]
hasFAQ: false
---
```

**Body Structure**:

```markdown
## Introduction
- Overview article content
- Include target keywords

## Main Content
### Subtopic 1
### Subtopic 2
### Subtopic 3

## Summary/Purchase Recommendation

## Related Articles
- [Related Articles1](/posts/related-1/)
- [Related Articles2](/posts/related-2/)
```

### 3. Platform Page (Platforms)

**File**: `platforms/index.md`

**Frontmatter**:

```yaml
---
layout: doc
title: "Other Platforms - Compare Shopping Agents"
description: "Compare different shopping platforms..."
keywords: "kakobuy vs superbuy, shopping agent comparison, ..."
---
```

**Body Content**: Platform comparison cards（HTML Format）。

### 4. Article Index Page

**File**: `posts/index.md`

**Frontmatter**:

```yaml
---
layout: page
---
```

**Render**: By `PostsIndex.vue` component rendering，No body content needed。

### 5. Media Resource Page

**File**: `posts/{slug}/media.md` or `posts/{slug}/image.md`

**Purpose**: Store media resource references，Not user-facing，In sitemap excluded from。

### 6. 404 Page

**File**: `404.html`

**Purpose**: Custom 404 Error page。

## Frontmatter Field Specification

### General Fields

| Field | Type | Required | Description |
|------|------|------|------|
| `layout` | string | 是 | Page layout: `home`, `doc`, `page` |
| `title` | string | 是 | Page title（60characters within） |
| `description` | string | 是 | SEO Description（150-160characters） |
| `keywords` | string | 否 | Comma-separated keywords |

### Article-Specific Fields

| Field | Type | Required | Description |
|------|------|------|------|
| `date` | date | 是 | Publish date (YYYY-MM-DD) |
| `author` | string | 否 | Author name |
| `tags` | array | 否 | Tag array |
| `hasFAQ` | boolean | 否 | Whether to generate FAQ Schema |

### Homepage-Specific Fields

| Field | Type | Required | Description |
|------|------|------|------|
| `hero` | object | 否 | Hero Area configuration |
| `features` | array | 否 | Feature card array |

## Content Directory Structure

```
kakobuy/
├── index.md                     # Homepage
├── 404.html                     # 404 Page
│
├── posts/                       # Article Directory
│   ├── index.md                 # Article Index
│   │
│   ├── kakobuy-review/          # Platform Review
│   │   └── index.md
│   │
│   ├── {product}-review/        # Product Review
│   │   ├── index.md             # Article body
│   │   └── image.md             # Media resources
│   │
│   ├── {season}-style/          # Seasonal Style
│   │   └── index.md
│   │
│   └── {tool}-spreadsheet/      # Spreadsheet Tool
│       ├── index.md
│       └── media.md
│
├── platforms/                   # Platform Comparison
│   └── index.md
│
├── public/                      # Static Assets
│   ├── favicon.png
│   ├── robots.txt
│   └── image/
│       ├── kakobuy-spreadsheet-product-analytics.webp
│       └── {slug}.webp          # Article cover images
│
└── logo/                        # Platform Logo
    ├── kakobuy-logo.webp
    ├── superbuy-logo.webp
    └── ...
```

## Article Type Classification

### 1. Platform Review (Platform Review)

**Path Pattern**: `posts/kakobuy-review/`

**Content Structure**:
- Platform overview
- Feature highlights
- Fee structure
- Usage tutorial
- Pros and cons analysis
- Comparison with other platforms

### 2. Product Review (Product Review)

**Path Pattern**: `posts/{product}-review/`

**Content Structure**:
- Product overview
- Design and materials
- Sizing and fit
- Styling advice
- Value analysis
- Purchase channel recommendations

### 3. Seasonal Style (Season Style)

**Path Pattern**: `posts/{season}-style/`

**Content Structure**:
- Seasonal trend overview
- Essential items recommendation
- Styling tips
- Brand recommendations
- Purchase links

### 4. Spreadsheet Tool (Spreadsheet Tool)

**Path Pattern**: `posts/{tool}-spreadsheet/`

**Content Structure**:
- Tool overview
- Feature introduction
- Usage method
- Download/Access link
- FAQ

## Image Resource Specification

### Cover Image

**Path**: `public/image/{slug}.webp`

**Specification**:
- Format: WebP
- Size: Recommended 1200x630px (16:9) or 1200x1200px (1:1)
- File size: < 200KB
- Alt text: Descriptive text，Include keywords

### Platform Logo

**Path**: `logo/{platform}-logo.webp`

**Specification**:
- Format: WebP
- Size: 80x80px
- Background: Transparent or white
- File size: < 20KB

### Media Resource Images

**Path**: `public/image/media-resources-{name}.png`

**Specification**:
- Format: PNG (Preserve quality)
- Purpose: Article embedded images
- File size: < 500KB

## Content Creation Specification

### Title Specification

1. Include target keywords
2. 60 characters within
3. Use Title Case
4. Including numbers or action verbs is better

**Example**:
- "Nike Dunk Low Panda Review: Complete 2026 Buying Guide"
- "Best Kakobuy Spreadsheet for Product Research (Free Download)"

### Description Specification

1. 150-160 characters
2. Include primary keywords
3. Include call to action (CTA)
4. Summarize article core value

**Example**:
- "Complete review of Nike Dunk Low Panda including sizing, quality comparison, and best places to buy. Updated for 2026 with exclusive pricing data."

### Keyword Specification

1. 5-10 keywords
2. Comma-separated
3. Include primary and long-tail keywords
4. Highly relevant to article content

### Body Specification

1. Minimum 1000 words
2. Use H2/H3 to organize structure
3. Each paragraph no more than 5 lines
4. Include internal links（At least 3 ）
5. Include external links（Authoritative sources）
6. Images use alt text

## Component Data Model

### Brand Directory (LeftSidebar.vue)

```javascript
{
  name: string,        // Category name
  icon: string,        // Emoji Icon
  brands: [
    {
      name: string,    // Brand name
      items: number,   // Product count
    }
  ]
}
```

### Trending Deals (RightSidebar.vue)

```javascript
{
  rank: number,        // Rank
  name: string,        // Product name
  badge: string,       // Badge text (Hot/Trending/Restock)
  badgeColor: string,  // Badge color
  stat: string,        // Statistics text
  statIcon: string,    // Statistics icon (Emoji)
}
```

### 文章分类 (PostsIndex.vue)

```javascript
{
  label: string,       // Category label
  items: [
    {
      name: string,    // Item name
      icon: string,    // Emoji Icon
      url: string,     // Links URL
      color: string,   // Tag color
    }
  ]
}
```

### Marquee Data (index.js)

```javascript
{
  text: string,        // Scrolling text
}
```

### Brand list (LeftMarquee.vue)

```javascript
string[]               // Brand name array
```

## URL Route Mapping

| File Path | URL Route |
|----------|----------|
| `index.md` | `/` |
| `posts/index.md` | `/posts/` |
| `posts/kakobuy-review/index.md` | `/posts/kakobuy-review/` |
| `posts/nike-dunk-low-panda-review/index.md` | `/posts/nike-dunk-low-panda-review/` |
| `platforms/index.md` | `/platforms/` |

**Rule**: `cleanUrls: true`，Directory's `index.md` mapped to directory path。

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
