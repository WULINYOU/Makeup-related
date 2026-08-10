# Key Features Implementation Document

## Overview

This document details Affiliate Authority Site each key feature's implementation，including complete code examples and design rationale。Each feature is carefully designed，balancing user experience、SEO effects and conversion rate optimization。

## 1. Top Scrolling Marquee栏 (Marquee)

### Feature Description

Fixed scrolling banner at the top of the page，Displays global user order information，Creates social proof effect。

### Implementation Files

- `theme/index.js` - Data definition and rendering logic
- `theme/custom.css` - Styles and animations

### Core Code

**Data Definition** (`index.js`):

```javascript
const marqueeData = [
  { text: 'European users have placed their orders' },
  { text: 'American users have placed their orders' },
  { text: 'British users have placed their orders' },
  // ... 20 countries/regions
]

function createMarqueeContent() {
  const items = []
  marqueeData.forEach((item, index) => {
    items.push(
      h('div', { class: 'marquee-item', key: `item-${index}` }, [
        h('span', { class: 'text' }, item.text)
      ])
    )
    items.push(
      h('span', { class: 'marquee-separator', key: `sep-${index}` }, '✦')
    )
  })
  return items
}
```

**Render Injection** (`index.js` → Layout):

```javascript
Layout() {
  const fullMarqueeContent = [...createMarqueeContent(), ...createMarqueeContent()]
  return h(DefaultTheme.Layout, null, {
    'layout-top': () => h('div', { class: 'marquee-container' }, [
      h('div', { class: 'marquee-track' }, fullMarqueeContent)
    ]),
  })
}
```

**CSS Animation** (`custom.css`):

```css
.marquee-container {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  padding: 0.54rem 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 90s linear infinite;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Design Points

1. **Seamless Loop**: Content repeated twice (`[...createMarqueeContent(), ...createMarqueeContent()]`)，Animation moves 50% to achieve seamless connection
2. **Performance Optimization**: `will-change: transform` Enable GPU acceleration
3. **Pause on hover**: Users can pause to read
4. **Gradient masks on both ends**: Use `::before` and `::after` pseudo-elements to create gradient masks
5. **Navigation bar offset**: Marquee After fixed，Navigation bar and content area shift down accordingly

### Navigation bar offsetProcessing

```css
.VPNav {
  top: 3.36rem !important;  /* Marquee Height */
  z-index: 200 !important;
}

.VPContent {
  padding-top: 20rem;  /* Reserve space for fixed elements */
}

@media (max-width: 768px) {
  .VPContent {
    padding-top: 8rem;
  }
}
```

## 2. Article Page Action Button Injection

### Feature Description

On each document page H1 automatically inject two CTA button。

### Implementation Files

- `theme/index.js` → Layout Function

### Core Code

```javascript
Layout() {
  // DOM Injection logic
  if (typeof window !== 'undefined') {
    const injectArticleButtons = () => {
      const h1 = document.querySelector('.VPDoc h1')
      if (!h1) return
      // Prevent duplicate injection
      if (h1.nextElementSibling &&
          h1.nextElementSibling.classList.contains('article-actions')) return

      const btnContainer = document.createElement('div')
      btnContainer.className = 'article-actions'
      btnContainer.innerHTML = `
        <a class="article-action-btn brand"
           href="https://docs.google.com/spreadsheets/d/..."
           target="_blank" rel="noopener noreferrer"
           role="button" aria-label="Access Kakobuy Spreadsheet">
          Access Kakobuy Spreadsheet
        </a>
        <a class="article-action-btn alt"
           href="/platforms/"
           role="button" aria-label="Other Platforms">
          Other Platforms
        </a>
      `
      h1.parentNode.insertBefore(btnContainer, h1.nextSibling)
    }

    // Initial load
    if (document.readyState === 'complete') {
      injectArticleButtons()
    } else {
      window.addEventListener('DOMContentLoaded', injectArticleButtons)
    }

    // SPA Navigation monitoring
    const observer = new MutationObserver(() => {
      const h1 = document.querySelector('.VPDoc h1')
      if (h1 && !h1.nextElementSibling?.classList.contains('article-actions')) {
        injectArticleButtons()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }
}
```

### Design Points

1. **MutationObserver**: Monitor DOM changes，Automatically after SPA navigation re-inject
2. **防重复**: Check `article-actions` class already exists
3. **SSR Compatible**: `typeof window !== 'undefined'` Check
4. **Accessibility**: Add `role="button"` and `aria-label`
5. **Style**: Centered layout，Responsive spacing

### Button Styles

```css
.article-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0 2rem;
  flex-wrap: wrap;
}

.article-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  min-height: 44px;
}

.article-action-btn.brand {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.article-action-btn.alt {
  background: transparent;
  color: #667eea;
  border-color: #667eea;
}
```

## 3. Google Spreadsheet LinksInterception

### Feature Description

InterceptionHomepage Hero 's CTA button，Replace default link behavior with JavaScript controlled `window.open()`。

### Implementation Files

- `theme/index.js` → enhanceApp Function

### Core Code

```javascript
enhanceApp({ app, router }) {
  if (typeof window !== 'undefined') {
    const interceptHeroLink = () => {
      const heroActions = document.querySelectorAll('.VPHero .actions .VPButton')
      heroActions.forEach(btn => {
        if (btn.textContent.includes('Kakobuy Spreadsheet')) {
          btn.removeAttribute('href')
          btn.setAttribute('role', 'button')
          btn.onclick = () => {
            window.open(
              'https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254',
              '_blank'
            )
          }
        }
      })
    }

    // 初始Page加载
    if (document.readyState === 'complete') {
      interceptHeroLink()
    } else {
      window.addEventListener('DOMContentLoaded', interceptHeroLink)
    }

    // SPA navigationProcessing
    router.onAfterRouteChanged = (to) => {
      if (to === '/') {
        setTimeout(interceptHeroLink, 100)
      }
    }
  }
}
```

### Design Points

1. **Dual Scenario Coverage**: Handle both initial load and SPA navigation
2. **Delayed Execution**: SPA After navigation `setTimeout(100ms)` Wait for DOM Render
3. **Attribute Replacement**: Removal `href` to prevent default behavior，Add `role="button"` to maintain semantics
4. **Text Matching**: Identify target button by text content

## 4. Three-Column Document Layout

### Feature Description

Article pages use three-column layout：Left Brand Directory、Middle main content、Right Trending Deals。

### Implementation Files

- `theme/CustomDocLayout.vue` - Layout Component
- `theme/LeftSidebar.vue` - Left Brand Directory
- `theme/RightSidebar.vue` - Right Trending Deals

### Layout Component

```vue
<script setup>
import { useData } from 'vitepress'
import LeftSidebar from './LeftSidebar.vue'
import RightSidebar from './RightSidebar.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="custom-doc-layout">
    <header class="custom-doc-header">
      <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
    </header>
    <div class="custom-doc-body">
      <LeftSidebar />
      <main class="custom-doc-content">
        <Content />
      </main>
      <RightSidebar />
    </div>
  </div>
</template>

<style scoped>
.custom-doc-body {
  display: grid;
  grid-template-columns: 220px 1fr 240px;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 768px) {
  .custom-doc-body {
    grid-template-columns: 1fr;
  }
}
</style>
```

### Left Brand Directory

```vue
<script setup>
const spreadsheetLink = 'https://docs.google.com/spreadsheets/d/...'

const brandCategories = [
  {
    name: 'Streetwear',
    icon: '🔥',
    brands: [
      { name: 'Nike', items: 128 },
      { name: 'Adidas', items: 96 },
      { name: 'Supreme', items: 54 },
    ]
  },
  {
    name: 'Luxury',
    icon: '💎',
    brands: [
      { name: 'Gucci', items: 54 },
      { name: 'Louis Vuitton', items: 72 },
      { name: 'Prada', items: 38 },
    ]
  },
  // ... Sportwear, Trending
]
</script>
```

### Right Trending Deals

```vue
<script setup>
const spreadsheetLink = 'https://docs.google.com/spreadsheets/d/...'

const trendingDeals = [
  {
    rank: 1,
    name: 'Nike Air Max',
    badge: 'Hot',
    badgeColor: '#ef4444',
    stat: '+32% clicks this week',
    statIcon: ''
  },
  {
    rank: 2,
    name: 'Gucci Belt Bag',
    badge: 'Trending',
    badgeColor: '#f59e0b',
    stat: '2.4k users viewed',
    statIcon: '👀'
  },
  {
    rank: 3,
    name: 'Adidas Yeezy',
    badge: 'Restock',
    badgeColor: '#10b981',
    stat: 'Updated 2h ago',
    statIcon: '🕐'
  }
]
</script>
```

### Design Points

1. **CSS Grid 三栏**: `220px 1fr 240px`，Middle adaptive
2. **Sticky positioning**: Both sidebars `position: sticky; top: 5rem`
3. **响应式**: 768px Below switches to single column
4. **Data驱动**: Brand directory and trending deals rendered through data arrays
5. **All links point to Spreadsheet**: Maximize conversion opportunities

## 5. Article Index Page

### Feature Description

Categorically display all articles，Support multi-dimensional filtering。

### Implementation Files

- `theme/PostsIndex.vue`

### Category Data Structure

```javascript
const CATEGORIES = [
  {
    label: 'Season Selection',
    items: [
      { name: 'Spring', icon: '🌸', url: '/posts/spring-style/', color: '#22c55e' },
      { name: 'Summer', icon: '️', url: '/posts/summer-style/', color: '#f59e0b' },
      { name: 'Autumn', icon: '', url: '/posts/autumn-style/', color: '#ea580c' },
      { name: 'Winter', icon: '❄️', url: '/posts/winter-style/', color: '#3b82f6' }
    ]
  },
  {
    label: 'Batch Picks',
    items: [
      { name: 'Best Batch', icon: '⭐', url: '/posts/best-batch/', color: '#f59e0b' },
      { name: '2026 Best', icon: '', url: '/posts/best-batch-2026/', color: '#22c55e' },
      // ... More条目
    ]
  },
  {
    label: 'Kakobuy Review',
    items: [
      { name: 'Jordan 4 Military Blue', icon: '', url: '/posts/nike-jordan-4-military-blue-review/', color: '#3b82f6' },
      // ... More评测
    ]
  }
  // Future extensible: Clothing Type, Price Range dimensions
]
```

### Design Points

1. **Extensible分类**: Adding new categories only requires `CATEGORIES` adding objects to array
2. **Colorful tags**: Each tag has independent color，Via `:style` binding
3. **Two-column layout**: Main content area + Right quick links sidebar
4. **Mobile horizontal scroll**: Tags support horizontal scrolling on mobile

## 6. Discord Floating Button

### Feature Description

Fixed at bottom-right of page Discord Community invitation button。

### Implementation Files

- `theme/index.js` → Layout Function (layout-bottom Slot)

### Core Code

```javascript
'layout-bottom': () => h('div', { class: 'layout-bottom-wrapper' }, [
  h('a', {
    class: 'discord-float-btn',
    href: 'https://discord.gg/jtc399kUQV',
    target: '_blank',
    rel: 'noopener noreferrer',
    title: 'Join our Discord community'
  }, [
    h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'white' }, [
      h('path', { d: 'M20.317 4.37...' })
    ]),
    h('span', { class: 'discord-float-label' }, 'Discord')
  ])
])
```

### Style

```css
.discord-float-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #5865F2;
  color: white;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.discord-float-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(88, 101, 242, 0.5);
  background: #4752C4;
}
```

## 7. Brand垂直滚动Column表

### Feature Description

Left vertical scrolling brand name list，Click to navigate to Spreadsheet。

### Implementation Files

- `theme/LeftMarquee.vue`

### Core Code

```vue
<script setup>
const brands = [
  'nike', 'louis vuitton', 'ralph lauren', 'stone island', 'moncler',
  'amiri', 'burberry', 'dior', 'gucci', 'palm angels',
  // ... 38 Brand
]

const link = 'https://docs.google.com/spreadsheets/d/...'
const handleClick = () => { window.open(link, '_blank') }
</script>

<template>
  <div class="left-marquee-container" @click="handleClick"
       title="Click to view brand spreadsheet">
    <div class="left-marquee-title">Brands</div>
    <div class="left-marquee-mask top"></div>
    <div class="left-marquee-mask bottom"></div>
    <div class="left-marquee-scroll">
      <div class="left-marquee-content">
        <div v-for="(brand, index) in brands" :key="`a-${index}`"
             class="left-marquee-item">{{ brand }}</div>
        <!-- 重复一遍ImplementNo缝滚动 -->
        <div v-for="(brand, index) in brands" :key="`b-${index}`"
             class="left-marquee-item">{{ brand }}</div>
      </div>
    </div>
  </div>
</template>
```

### Design Points

1. **Vertical seamless scrolling**: Similar to top Marquee similar principle，but direction is vertical
2. **Top and bottom masks**: Use gradient masks for fade in/out effect
3. **Entire container clickable**: Entire container clickable to navigate to Spreadsheet
4. **Brand list**: 38 popular brands，Repeated rendering for loop

## 8. Homepage Hero Area

### Feature Description

Homepage Hero AreaUses left-text-right-image layout，Includes statistics display。

### Implementation Files

- `index.md` → Frontmatter hero Configuration
- `theme/custom.css` → Hero Style

### Frontmatter Configuration

```yaml
---
layout: home
hero:
  name: Kakobuy Spreadsheet Archive
  text: Your Ultimate Resource for Cross-Border E-commerce
  tagline: Discover expert archives, tips, and resources
  image:
    src: /image/kakobuy-spreadsheet-product-analytics.webp
    alt: Kakobuy Spreadsheet product analytics dashboard
  actions:
    - theme: brand
      text: Open Kakobuy Spreadsheet
      link: https://docs.google.com/spreadsheets/d/...
    - theme: alt
      text: Other Platforms
      link: /platforms/
    - theme: alt
      text: Browse Archives
      link: /posts/
---
```

### Statistics Display

```html
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number">50+</div>
    <div class="stat-label">Countries Served</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">10K+</div>
    <div class="stat-label">Active Users</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">100K+</div>
    <div class="stat-label">Orders Completed</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">24/7</div>
    <div class="stat-label">Customer Support</div>
  </div>
</div>
```

### Responsive Strategy

- **Desktop**: Left text right image，4 Column stat cards
- **Tablet (768-1024px)**: Left text right image（Image shrunk），2 Column stats
- **Mobile (< 768px)**: Hide image，Text only stacked，2 Column stats
- **Extra small (< 480px)**: Further reduce font size and spacing

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
