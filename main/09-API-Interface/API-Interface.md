# API API Documentation

## Overview

This document describes Affiliate Authority Site 's external integration and API 接口。This project as a static site，mainly integrates through external links and third-party scripts。

## External Integration Overview

```
┌─────────────────────────────────────────────┐
│              Affiliate Authority Site        │
├──────────┬──────────┬──────────┬────────────┤
│ Google   │ Google   │ Discord  │ Affiliate  │
│ Sheets   │ Analytics│          │ Links      │
│ API      │ GA4      │ Widget   │            │
└──────────┴──────────┴──────────┴────────────┘
```

## 1. Google Sheets Integrate

### 1.1 Integration Method

Integrated via external links，All CTA buttons point to Google Spreadsheet。

### 1.2 Spreadsheet URL

```
https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254
```

### 1.3 Usage Locations

| Component | Purpose | Open Method |
|------|------|----------|
| Homepage Hero button | Primary CTA | `window.open()` New tab |
| Article Action Buttons (brand) | Article page CTA | `target="_blank"` |
| Left Brand Directory | Brand browsing | `target="_blank"` |
| Right Trending Deals | Deal browsing | `target="_blank"` |
| Brand滚动Column表 | Brand quick access | `window.open()` New tab |

### 1.4 Link Interception Implementation

Homepage Hero Button through JavaScript Interception：

```javascript
// theme/index.js → enhanceApp
const interceptHeroLink = () => {
  const heroActions = document.querySelectorAll('.VPHero .actions .VPButton')
  heroActions.forEach(btn => {
    if (btn.textContent.includes('Kakobuy Spreadsheet')) {
      btn.removeAttribute('href')
      btn.setAttribute('role', 'button')
      btn.onclick = () => {
        window.open(SPREADSHEET_URL, '_blank')
      }
    }
  })
}
```

### 1.5 Security attribute

All external links add the following attributes：

```html
<a href="..." target="_blank" rel="noopener noreferrer">
```

- `noopener`: Prevent new page from accessing original page via `window.opener` accessing original page
- `noreferrer`: Do not send Referer header

## 2. Google Analytics 4 (GA4)

### 2.1 Tracking ID

```
G-Y6V5YTKF9Q
```

### 2.2 Integration Method

By injecting in `<head>` inject in gtag.js script implementation。

### 2.3 Configuration Code

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

### 2.4 Custom Configuration

| Parameter | Value | Description |
|------|-----|------|
| `page_path` | Dynamically calculated | Homepage mapped to `/dev/home` |

### 2.5 Auto-Tracked Events

GA4 Automatically tracks the following events：

| event | Description |
|------|------|
| `page_view` | Page view |
| `first_visit` | First visit |
| `session_start` | Session start |

### 2.6 Custom Events（Extensible）

Can use `gtag()` function to send custom events：

```javascript
// Example：Tracking CTA click
gtag('event', 'cta_click', {
  event_category: 'engagement',
  event_label: 'spreadsheet_access',
  value: 1
});
```

### 2.7 GA4 API Reference

| API | Purpose | Documentation |
|-----|------|------|
| gtag.js | Frontend event tracking | [Google Documentation](https://developers.google.com/analytics/devguides/collection/ga4) |
| Data API | Backend data query | [Google Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1) |

## 3. Discord Integrate

### 3.1 Invitation Link

```
https://discord.gg/jtc399kUQV
```

### 3.2 Integration Method

Integrated via floating button at bottom-right of page。

### 3.3 Implementation Code

```javascript
// theme/index.js → Layout → layout-bottom Slot
h('a', {
  class: 'discord-float-btn',
  href: 'https://discord.gg/jtc399kUQV',
  target: '_blank',
  rel: 'noopener noreferrer',
  title: 'Join our Discord community'
}, [
  h('svg', { /* Discord Logo SVG */ }),
  h('span', { class: 'discord-float-label' }, 'Discord')
])
```

### 3.4 Discord Widget（Optional Extension）

If you need to embed in page Discord online member count，can use Discord Widget：

```html
<iframe src="https://discord.com/widget?id=SERVER_ID&theme=dark"
        width="350" height="500"
        allowtransparency="true" frameborder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
</iframe>
```

## 4. Affiliate Link Specification

### 4.1 Link Attributes

All Affiliate links must include the following attributes：

```html
<a href="https://affiliate-link.com/..."
   target="_blank"
   rel="noopener noreferrer sponsored">
  Purchase links
</a>
```

| attributes | Value | Description |
|------|-----|------|
| `target` | `_blank` | Open in new tab |
| `rel` | `noopener` | Security attribute |
| `rel` | `noreferrer` | Do not send Referer |
| `rel` | `sponsored` | Inform search engines this is a sponsored link |

### 4.2 Link Management

**Current Affiliate Links**:

| Platform | Link Pattern | Description |
|------|----------|------|
| Kakobuy | Google Sheets | Spreadsheet Tool推广 |
| 其他Platform | Each platform Affiliate Links | Via `/platforms/` page management |

### 4.3 Link Tracking

Affiliate Clicks can be tracked via GA4 custom event tracking：

```javascript
// Example：Tracking Affiliate link click
document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'affiliate_click', {
      event_category: 'conversion',
      event_label: link.href,
      value: 1
    });
  });
});
```

## 5. Search Engine Integration

### 5.1 Google Search Console

**Operations**:
- Submit Sitemap: `https://kakobuy-7zh.pages.dev/sitemap.xml`
- Request indexing: Via URL Inspection Tool
- Monitor performance: Performance → Search results

**API**（Optional Extension）:
| API | Purpose |
|-----|------|
| Indexing API | Request URL Index/Removal |
| Search Analytics API | Get search performance data |

### 5.2 Sitemap Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kakobuy-7zh.pages.dev/</loc>
    <lastmod>2026-08-09</lastmod>
  </url>
  <url>
    <loc>https://kakobuy-7zh.pages.dev/posts/kakobuy-review/</loc>
    <lastmod>2026-08-09</lastmod>
  </url>
  <!-- ... -->
</urlset>
```

### 5.3 robots.txt

```
User-agent: *
Allow: /
Sitemap: https://kakobuy-7zh.pages.dev/sitemap.xml
Crawl-delay: 1
```

## 6. Structured data API

### 6.1 JSON-LD Output Format

All structured data via `<script type="application/ld+json">` tag output。

### 6.2 Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article title",
  "description": "Article description",
  "author": {
    "@type": "Organization",
    "name": "Kakobuy Spreadsheet Archive"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Kakobuy Spreadsheet Archive",
    "url": "https://kakobuy-7zh.pages.dev"
  },
  "datePublished": "2026-08-09",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://kakobuy-7zh.pages.dev/posts/article-slug/"
  }
}
```

### 6.3 FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

### 6.4 Validation Tools

| Tool | URL | Purpose |
|------|-----|------|
| Rich Results Test | https://search.google.com/test/rich-results | Validate structured data |
| Schema Validator | https://validator.schema.org/ | Validate Schema Format |

## 7. Cloudflare Pages API（Optional Extension）

### 7.1 Deployment API

```bash
# Via API trigger deployment
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json"
```

### 7.2 Cache Purge API

```bash
# Clear cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything": true}'
```

## 8. Third-Party Scripts

### 8.1 Integrated Third-Party Scripts

| script | Source | Load Method | Purpose |
|------|------|----------|------|
| gtag.js | Google | `async` | GA4 Tracking |

### 8.2 Extensible Third-Party Scripts

| script | Purpose | Integration Method |
|------|------|----------|
| Algolia DocSearch | Search function | `<script>` Tag |
| Giscus | Comment system | `<script>` Tag |
| Hotjar | User behavior analysis | `<script>` Tag |

### 8.3 Script Loading Best Practices

1. Use `async` or `defer` attributes
2. Do not block page rendering
3. In `config.mjs` → `head` centrally manage
4. Regularly review third-party script performance impact

## 9. Data Flow Diagram

```
User visits page
    ↓
VitePress Render HTML
    ↓
Inject JSON-LD (Structured data)
    ↓
Inject GA4 script
    ↓
Browser loads page
    ↓
GA4 Send page_view event
    ↓
User clicks CTA
    ↓
window.open() → Google Sheets
    ↓
(Optional) GA4 Send cta_click event
    ↓
User in Sheets operates
    ↓
(Optional) User joins Discord community
```

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
