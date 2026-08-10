# Deployment Guide

## Overview

This document describes Affiliate Authority Site 's deployment process、environment configuration and operations monitoring。The project uses Cloudflare Pages for static site deployment，Via Git push auto-triggers build and deployment。

## Deployment Architecture

```
Local Development → Git Push → GitHub → Cloudflare Pages → Global CDN
                                              ↓
                                         User Access
```

## 1. Environment Preparation

### 1.1 Local Development Environment

**Required**:
- Node.js >= 18
- npm >= 9
- Git

**Installation Steps**:

```bash
# Clone repository
git clone https://github.com/yourusername/kakobuy-7zh.pages.git
cd kakobuy-7zh.pages/kakobuy

# Install dependencies
npm install

# Start development server
npm run dev
```

### 1.2 Project Configuration

**package.json**:

```json
{
  "name": "kakobuy-blog",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.2.3"
  }
}
```

## 2. Cloudflare Pages Deployment

### 2.1 Initial Setup

1. Login [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create**
3. Select **Pages** → **Connect to Git**
4. Select GitHub Repository `kakobuy-7zh.pages`
5. Configure build settings

### 2.2 Build Configuration

| Configuration Item | Value |
|--------|-----|
| Framework preset | `VitePress` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/kakobuy` |
| Node.js version | `18` |

### 2.3 environment variable

```
NODE_VERSION=18
```

### 2.4 Custom Domain

1. Go to project → **Custom domains** → **Set up a domain**
2. Enter domain（如 `kakobuy-7zh.pages.dev`）
3. Cloudflare Auto-create DNS records
4. Wait for SSL certificate issuance（Usually a few minutes）

### 2.5 Branch Deployment Strategy

| Branch | Deployment Target | Purpose |
|------|----------|------|
| `main` | Production | Official release |
| `dev` | Preview | Development testing |
| `feature/*` | Preview | Feature development |

## 3. Deployment Process

### 3.1 Standard Release Process

```bash
# 1. Local development and testing
npm run dev

# 2. Build verification
npm run build
npm run preview

# 3. Submit code
git add .
git commit -m "feat: add new article about xxx"

# 4. Push to repository
git push origin main
```

After push Cloudflare Pages Auto-triggers build and deployment，Usually 1-2 minutes to complete。

### 3.2 Build Output

```
dist/
├── index.html
├── assets/
│   ├── *.js      # Bundled JavaScript
│   ├── *.css     # Bundled CSS
│   └── *.webp    # Optimized images
├── posts/
│   └── */index.html
├── platforms/
│   └── index.html
├── sitemap.xml
├── robots.txt
└── favicon.png
```

### 3.3 Deployment Verification

Check after deployment：

1. **Page accessibility**: Visit `https://kakobuy-7zh.pages.dev`
2. **Sitemap**: Check `https://kakobuy-7zh.pages.dev/sitemap.xml`
3. **New page**: Confirm new article page is accessible
4. **GA4**: In Google Analytics confirm data reception
5. **Mobile**: Check responsive layout

## 4. Local Build and Preview

### 4.1 Development Mode

```bash
npm run dev
```

- Hot reload：Auto-refresh after file modification
- Default port：`http://localhost:5173`

### 4.2 Production Build

```bash
npm run build
```

- Output directory：`dist/`
- Asset directory：`dist/assets/`
- Auto optimization：Code compression、Image optimization

### 4.3 Local Preview

```bash
npm run preview
```

- Preview build result
- Default port：`http://localhost:4173`

## 5. Monitoring & Analytics

### 5.1 Google Analytics 4

**Tracking ID**: `G-Y6V5YTKF9Q`

**Key Metrics**:
| Metric | Description | View Location |
|------|------|----------|
| Users | Unique visitors | Reports → Engagement |
| Page views | Total PV | Reports → Engagement |
| Bounce rate | Single-page visit ratio | Reports → Engagement |
| Average time on page | User engagement | Reports → Engagement |
| Traffic source | Organic search/Direct/Referral | Reports → Acquisition |

### 5.2 Google Search Console

**Key Operations**:
1. Submit Sitemap: `https://kakobuy-7zh.pages.dev/sitemap.xml`
2. Request indexing: Manually request after new article publish
3. Check errors: Coverage → Excluded/Errors
4. View performance: Performance → Search results

### 5.3 Cloudflare Analytics

**View Location**: Cloudflare Dashboard → Analytics & Logs

**Key Metrics**:
| Metric | Description |
|------|------|
| Requests | Total requests |
| Bandwidth | Traffic consumption |
| Cache hit rate | CDN Efficiency |
| Threat score | Security status |
| Page load time | Performance metrics |

## 6. Troubleshooting

### 6.1 Build Failure

**Common Causes**:
1. Node.js Version incompatible → Check `NODE_VERSION` environment variable
2. Dependency installation failed → Check `package.json` Format
3. Markdown Syntax error → Check Frontmatter Format
4. Dead links → Set `ignoreDeadLinks: true`（Already configured）

**Troubleshooting Steps**:
```bash
# Local build test
npm run build

# View detailed error logs
# Cloudflare Dashboard → Pages → Deployments → View build logs
```

### 6.2 Page 404

**Troubleshooting Steps**:
1. Check URL is correct（cleanUrls mode）
2. Confirm `index.md` file exists
3. Check sitemap.xml in URL
4. Clear Cloudflare Cache

### 6.3 Style Issues

**Troubleshooting Steps**:
1. Check `custom.css` has syntax errors
2. Confirm Vue Component `<style scoped>` used correctly
3. Clear browser cache
4. Check dark mode style overrides

### 6.4 SEO Issues

**Troubleshooting Steps**:
1. Use Google Rich Results Test to check structured data
2. Use Lighthouse Check SEO score
3. Check robots.txt and sitemap.xml
4. In Search Console check index status

## 7. Cache Management

### 7.1 Cloudflare Cache

**Clear cache**:
1. Cloudflare Dashboard → Caching → Configuration
2. Select **Purge Everything** or specify URL

**Cache Rules**:
- Static Assets（JS/CSS/Images）: Auto-cache
- HTML Page: Not cached by default（Edge TTL）
- API Request: Not cached

### 7.2 Browser Cache

VitePress Auto-handled during build：
- With hash resource filenames → Long-term cache
- HTML File → Not cached（Always get latest version）

## 8. Security Configuration

### 8.1 HTTPS

Cloudflare Pages Auto-provide SSL certificate，No extra configuration needed。

### 8.2 Security Headers

Cloudflare Default adds the following security headers：
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security: max-age=31536000`

### 8.3 DDoS protection

Cloudflare Auto-provide DDoS protection，No extra configuration needed。

## 9. Performance Optimization Checklist

### Before Deployment

- [ ] Run `npm run build` Confirm build success
- [ ] Run `npm run preview` Check pages
- [ ] Use Lighthouse Check performance score
- [ ] Compress all images（WebP Format）
- [ ] Check all links are valid

### After Deployment

- [ ] Verify page accessibility
- [ ] Check GA4 data reception
- [ ] In Search Console Submit new Sitemap
- [ ] Check mobile display
- [ ] Test CTA button links

## 10. Version Rollback

To rollback to a previous deployment version：

1. Cloudflare Dashboard → Pages → Deployments
2. Find target deployment version
3. click **Rollback** button
4. Confirm rollback

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
