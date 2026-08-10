# Project Architecture Document

## Overview

This document details Affiliate Authority Site project's overall architecture design，including directory structure、component relationships、data flow and module division。Understanding the project architecture helps quickly get started with development and maintenance。

## Overall Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare Pages                      │
│                   (Global CDN Distribution)                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  VitePress Static Site                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Homepage       │  │   Article page     │  │   Platform Page     │ │
│  │  (index.md)  │  │ (posts/*)    │  │ (platforms/) │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Custom Theme Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ LeftSidebar  │  │ CustomDoc    │  │RightSidebar  │ │
│  │ (Brand Directory)   │  │ Layout       │  │ (Trending Deals)   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │LeftMarquee   │  │ PostsIndex   │  │  custom.css  │ │
│  │(Scrolling Marquee)    │  │ (Article Index)   │  │  (Style System)  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   VitePress Core                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Markdown    │  │   Vue 3      │  │   Vite       │ │
│  │  Parser      │  │   Component System   │  │   Build Tool   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
kakobuy/
├── .vitepress/              # VitePress Configuration and Theme
│   ├── config.mjs           # Core configuration file
│   └── theme/               # Custom theme
│       ├── index.js         # Theme Entry
│       ├── custom.css       # Global styles
│       ├── CustomDocLayout.vue  # Three-column layout component
│       ├── LeftSidebar.vue  # Left Brand Directory
│       ├── RightSidebar.vue # Right Trending Deals
│       ├── LeftMarquee.vue  # Top Scrolling Marquee
│       └── PostsIndex.vue   # Article Index Page
│
├── posts/                   # Article content
│   ├── index.md             # Article Index Page
│   ├── kakobuy-review/      # Platform Review
│   │   └── index.md
│   ├── nike-dunk-low-panda-review/  # Product Review
│   │   ├── index.md
│   │   └── image.md
│   ├── spring-style/        # Seasonal Style
│   │   └── index.md
│   └── best-batch/          # Spreadsheet Tool
│       ├── index.md
│       └── media.md
│
├── platforms/               # Platform Comparison
│   └── index.md
│
├── public/                  # Static Assets
│   ├── favicon.png          # Website icon
│   ├── robots.txt           # Crawler rules
│   └── image/               # Image resources
│       ├── kakobuy-spreadsheet-product-analytics.webp
│       └── *.webp           # Product cover images
│
├── logo/                    # Platform Logo
│   ├── kakobuy-logo.webp
│   ├── superbuy-logo.webp
│   └── *.webp
│
├── index.md                 # Homepage
├── 404.html                 # 404 Page
└── package.json             # Project Configuration
```

## Core Component Relationships

### 1. Theme Entry (index.js)

**Responsibilities**:
- Extend default theme
- Register global components
- Inject global styles
- Handle routing events
- Dynamically inject DOM Element

**Key Functions**:

```javascript
export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // Interception Google Spreadsheet Links
    // Processing SPA navigation
  },
  Layout() {
    // Inject scrolling marquee (layout-top)
    // Inject Discord Floating Button (layout-bottom)
    // Dynamically inject article action buttons
  }
}
```

### 2. Three-column layout (CustomDocLayout.vue)

**Responsibilities**:
- Provide three-column grid layout
- Integrate left and right sidebars
- Responsive adaptation

**Layout Structure**:

```
┌─────────────────────────────────────────┐
│           Title Bar (h1)                │
├──────────┬──────────────────┬───────────┤
│          │                  │           │
│ Left     │   Main Content   │  Right    │
│ Sidebar  │   (<Content />)  │  Sidebar  │
│ (220px)  │   (flexible)     │  (240px)  │
│          │                  │           │
└──────────┴──────────────────┴───────────┘
```

**Responsive Breakpoints**:
- `> 768px`: Three-column layout
- `<= 768px`: Single-column layout（Sidebar moves below main content）

### 3. Left Brand Directory (LeftSidebar.vue)

**Responsibilities**:
- Display brand category directory
- Provide quick navigation
- Link to Spreadsheet

**Data Structure**:

```javascript
const brandCategories = [
  {
    name: 'Streetwear',
    icon: '🔥',
    brands: [
      { name: 'Nike', items: 128 },
      { name: 'Adidas', items: 96 },
    ]
  },
  // ...
]
```

**Features**:
- Sticky positioning（sticky）
- Scrollable（max-height + overflow-y）
- Custom scrollbar style

### 4. Right Trending Deals (RightSidebar.vue)

**Responsibilities**:
- Display trending product recommendations
- Provide CTA Links
- Enhance conversion rate

**Data Structure**:

```javascript
const trendingDeals = [
  {
    rank: 1,
    name: 'Nike Air Max',
    badge: 'Hot',
    badgeColor: '#ef4444',
    stat: '+32% clicks this week',
  },
  // ...
]
```

**Features**:
- Sticky positioning
- Badge markers（Hot, Trending, Restock）
- Hover animation effects

### 5. Top Scrolling Marquee (LeftMarquee.vue)

**Responsibilities**:
- Display global user activity
- Enhance social proof
- Boost trust

**Implementation**:
- CSS `@keyframes` Animation
- Infinite horizontal scrolling
- Pause on hover

**Performance Optimization**:
- `will-change: transform`
- GPU acceleration
- 60fps Smooth animation

### 6. Article Index Page (PostsIndex.vue)

**Responsibilities**:
- Display all article categories
- Provide filter navigation
- Two-column layout（Main content + Sidebar）

**Category Dimensions**:
- Season Selection（Season Selection）
- Batch Picks（Batch Picks）
- Kakobuy Review（Product Review）

**Features**:
- Extensible category system
- Colorful tag design
- Responsive grid layout

## Data Flow

### 1. Content Data Flow

```
Markdown File (posts/*/index.md)
    ↓
VitePress Parse Frontmatter
    ↓
Generate page metadata (pageData)
    ↓
transformPageData Processing
    ↓
Inject JSON-LD Schema
    ↓
Render as HTML
```

### 2. Theme Data Flow

```
config.mjs (themeConfig)
    ↓
DefaultTheme Receive configuration
    ↓
Custom Layout Component
    ↓
Slot injection (layout-top, layout-bottom)
    ↓
Render global components
```

### 3. User Interaction Data Flow

```
User clicks CTA button
    ↓
onclick Event handler
    ↓
window.open() Open new tab
    ↓
Navigate to Google Spreadsheet
    ↓
GA4 Track event（Optional）
```

## Module Division

### 1. Configuration Module

**File**: `config.mjs`

**Responsibilities**:
- Site basic information（title, description, lang）
- Navigation configuration（nav）
- SEO Configuration（head, sitemap）
- Primary题Configuration（themeConfig）
- Build Configuration（build）
- Page data transformation（transformPageData）

### 2. Theme Module

**File**: `theme/index.js`, `theme/custom.css`

**Responsibilities**:
- Extend default theme
- Register global components
- Define style system
- Handle global events

### 3. Component Module

**File**: `theme/*.vue`

**Responsibilities**:
- Implement UI Component
- Handle component logic
- Manage component state
- Responsive adaptation

### 4. Content Module

**File**: `posts/*/index.md`, `platforms/index.md`

**Responsibilities**:
- Provide page content
- Define Frontmatter metadata
- to organize content structure
- Internal links

### 5. Resource Module

**File**: `public/*`, `logo/*`

**Responsibilities**:
- Provide static assets
- Image optimization
- Icon management
- Crawler rules

## Key Design Patterns

### 1. Component Composition Pattern

Use Vue 3 's Composition API Organize component logic：

```vue
<script setup>
import { useData } from 'vitepress'
import LeftSidebar from './LeftSidebar.vue'
import RightSidebar from './RightSidebar.vue'

const { frontmatter } = useData()
</script>
```

### 2. Slot Injection Pattern

Utilize VitePress 's layout slots to inject global components：

```javascript
Layout() {
  return h(DefaultTheme.Layout, null, {
    'layout-top': () => h('div', { class: 'marquee-container' }, [...]),
    'layout-bottom': () => h('div', { class: 'layout-bottom-wrapper' }, [...])
  })
}
```

### 3. Responsive Design Pattern

Use CSS Grid and media queries to implement responsive layout：

```css
.custom-doc-body {
  display: grid;
  grid-template-columns: 220px 1fr 240px;
}

@media (max-width: 768px) {
  .custom-doc-body {
    grid-template-columns: 1fr;
  }
}
```

### 4. Data-Driven Pattern

Drive component rendering through data arrays：

```javascript
const CATEGORIES = [
  { label: 'Season Selection', items: [...] },
  { label: 'Batch Picks', items: [...] }
]
```

```vue
<div v-for="category in CATEGORIES" :key="category.label">
  <h2>{{ category.label }}</h2>
  <div v-for="item in category.items" :key="item.name">
    {{ item.name }}
  </div>
</div>
```

## Performance Optimization策略

### 1. Code splitting

VitePress Automatically performs route-level code splitting，Each page only loads necessary resources。

### 2. Image optimization

- Use WebP Format
- Responsive images（srcset）
- Lazy loading（VitePress Built-in）

### 3. CSS Optimization

- CSS Variable reuse
- Minimize repaint and reflow
- Use transform instead of top/left

### 4. JavaScript Optimization

- Event delegation
- Debounce and throttle
- Async load third-party scripts

## Extension Points

### 1. Add New Component

In `theme/` directory create new `.vue` File，then in `index.js` register。

### 2. Add New Page

Create in root or subdirectory `index.md` File，VitePress auto-generate route。

### 3. Add New Layout

In `theme/` directory create new layout component，then in Frontmatter specify：

```yaml
---
layout: custom-layout
---
```

### 4. Add New Styles

In `custom.css` add global styles，or use in components `<style scoped>`。

## Architecture Advantages

1. **Clear layering**: Configuration layer、Theme layer、Component layer、Content layer、Resource layer separation
2. **High cohesion low coupling**: Each component has single responsibility，Clear dependency relationships
3. **Easy to extend**: Modular design，New features do not affect existing code
4. **Excellent performance**: Static output、Code splitting、Image optimization
5. **SEO friendly**: Semantic HTML、Structured data、Meta Tag

## Architecture Challenges

1. **Hardcoded Data**: Some data is hardcoded in components，Modifications require rebuild
2. **State Management**: Lacks global state management，Inter-component communication depends on DOM
3. **Test Coverage**: Lacks automated testing，Higher refactoring risk

## Future Evolution Direction

1. **Introduce Headless CMS**: Migrate content management from Git to CMS
2. **Add search functionality**: Integrate Algolia DocSearch
3. **Introduce state management**: Use Pinia to manage global state
4. **Add automated testing**: Use Vitest and Playwright
5. **PWA Support**: Add Service Worker，Support offline access

## Summary

This project adopts a clear、concise、efficient architecture design。VitePress As the core framework，provides powerful static site generation capabilities；Vue 3 As the component system，provides flexible UI development experience；Cloudflare Pages As the deployment platform，provides global CDN distribution capabilities。

This architecture is especially suitable for content websites、blogs、documentation sites and Affiliate marketing sites。If your project needs are similar，you can reference this architecture design。

---

**Document Version**: v1.0.0  
**Last Updated**: 2026-08-09  
**Maintainer**: Kakobuy Team
