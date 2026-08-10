# Design Specification Document

## Overview

This document defines Affiliate Authority Site 's UI/UX design specification，including color system、Typography System、component styles、responsive strategy and interaction patterns。All custom styles are centralized in `theme/custom.css` in。

## Color System

### Brand color

```css
:root {
  --vp-c-brand-1: #667eea;   /* Primary brand color - Blue-purple gradient start */
  --vp-c-brand-2: #764ba2;   /* Secondary brand color - Blue-purple gradient end */
}
```

### Gradient Scheme

| Purpose | Gradient Value | Example |
|------|--------|------|
| Primary gradient（CTAbutton、Title background） | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` | Hero Area、Statistics number |
| Background gradient（Card hover） | `linear-gradient(135deg, #667eea15 0%, #764ba215 100%)` | Related articles area |
| Scrollbar gradient | `linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)` | Top Marquee |
| Semi-transparent background | `linear-gradient(135deg, #667eea08 0%, #764ba208 100%)` | Sidebar links |

### Semantic Colors

| Semantic | Color Value | Purpose |
|------|------|------|
| Hot/Urgent | `#ef4444` | Hot Badge |
| Trending/Warning | `#f59e0b` | Trending Badge |
| Restock/Success | `#10b981` | Restock Badge |
| Discord | `#5865F2` | Discord Floating Button |
| Discord Hover | `#4752C4` | Discord Button hover |

### Neutral Colors

**Light Mode**:
```css
:root {
  --vp-c-bg: #f5f5f5;       /* Page background */
  --vp-c-text-1: #333;      /* Primary text */
  --vp-c-text-2: #666;      /* Secondary text */
}
```

**Dark Mode**:
```css
.dark {
  --vp-c-bg: #1a1a2e;       /* Page background */
  --vp-c-text-1: #eee;      /* Primary text */
  --vp-c-text-2: #aaa;      /* Secondary text */
}
```

### Component-Specific Colors

| Component | Light Background | Dark Background | Border Color |
|------|----------|----------|--------|
| Stat Card | `#ffffff` | `#252540` | - |
| Article Card | `#ffffff` | `#252540` | - |
| Sidebar | `#ffffff` | `#252540` | - |
| Guide Card | `#ffffff` | `#1a1a2e` | `#e0e0e0` / `#3a3a4e` |
| Platform Card | `#ffffff` | `#252540` | - |

## Typography System

### Font

```css
:root {
  --vp-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

### Font Size Hierarchy

| Element | Desktop | Mobile(768px) | Extra Small(480px) | Font weight |
|------|--------|---------------|---------------|------|
| H1 (Page title) | 2.5rem | 1.75rem | 1.75rem | 800 |
| H1 (Hero name) | - | - | 1.4rem | - |
| H2 | 2rem | 1.75rem | - | 700 |
| H3 | 1.5rem | 1.3rem | - | 600 |
| H4 | 1.25rem | - | - | 600 |
| 正文 | 1rem | 1rem | 1rem | 400 |
| Secondary text | 0.95rem | 0.9rem | 0.85rem | 500 |
| smaller thantext | 0.9rem | 0.85rem | 0.8rem | 500 |
| Badge | 0.6-0.7rem | - | - | 600 |

### linesHigh

- 正文: `1.8`
- 标题: `1.3` (Hero), 默认 (其他)
- 段落Spacing: `margin-bottom: 1.5rem`

### wordsSpacing

- Hero 标题: `letter-spacing: -0.02em`
- Marquee text: `letter-spacing: 0.02em`
- Category label: `letter-spacing: 0.5px`

## Spacing System

### Base Spacing

| Level | Value | Purpose |
|------|-----|------|
| xs | 0.25rem | Compact element inner spacing |
| sm | 0.5rem | List item spacing |
| md | 0.75rem | Card inner spacing |
| lg | 1rem | Section spacing |
| xl | 1.5rem | Large section spacing |
| 2xl | 2rem | Page-level spacing |
| 3xl | 2.5rem | Category section spacing |

### Container Padding

| Component | Desktop | Mobile |
|------|--------|--------|
| Page container | `0 1.5rem` | `0 1rem` |
| Card | `2rem` | `1.5rem 1rem` |
| Hero Area | `8rem 0 2rem` | `0 1rem` |
| Marquee | `0.54rem 0` | `0.75rem 0` |

## Border Radius System

| Component | Radius Value |
|------|--------|
| button (CTA) | `20px` / `30px` |
| Card | `12px` / `16px` |
| Tag | `8px` |
| Badge | `4px` |
| Images | `12px` |
| Hero Bottom | `30px` (Desktop), `20px` (Mobile) |
| Related articles area | `0 8px 8px 0` |

## Shadow System

| Scenario | Shadow Value |
|------|--------|
| Card default | `0 4px 15px rgba(0,0,0,0.08)` or `0 2px 8px rgba(0,0,0,0.06)` |
| Card hover | `0 12px 30px rgba(102, 126, 234, 0.2)` |
| CTA Button hover | `0 6px 20px rgba(102, 126, 234, 0.4)` |
| Hero Images | `0 8px 30px rgba(102, 126, 234, 0.2)` |
| Discord button | `0 4px 12px rgba(88, 101, 242, 0.4)` |
| Tag hover | `0 4px 12px rgba(0, 0, 0, 0.1)` |

## Component Design Specification

### 1. CTA button

**Primary Button (brand)**:
- Background: Primary gradient `#667eea → #764ba2`
- Text: White
- Border: `2px solid #667eea`
- Border Radius: `20px`
- Minimum height: `44px` (Touch friendly)
- Hover: Move up 2px + Shadows

**Secondary Button (alt)**:
- Background: Transparent
- Text: `#667eea` (Light) / `#a5b4fc` (Dark)
- Border: `2px solid` Brand color
- Hover: Fill background + Invert text color

### 2. Stat Card

- 4 Column grid (Desktop), 2 Column (Tablet/Mobile)
- Number: Gradient text (`background-clip: text`)
- Font size: `2.5rem` (Desktop), `2rem` (Mobile), `1.75rem` (Extra small)
- Hover: Move up 5px + Brand color shadow

### 3. Platform Card

- 4 Column grid (Desktop), 3 Column (Tablet), 2 Column (Mobile)
- Logo Size: `80x80` (Desktop), `60x60` (Mobile), `50x50` (Extra small)
- Minimum height: `180px` (Desktop), `160px` (Mobile), `140px` (Extra small)
- Hover: Move up 6px + Brand color shadow

### 4. Marquee Scrolling Bar

- Fixed positioning: `top: 0`, `z-index: 100`
- Background: Brand color gradient
- Animation: `90s linear infinite`
- Text: White, `0.95rem`
- Separator: `✦`, Semi-transparent white
- Pause on hover
- Gradient masks on both ends (100px Wide)

### 5. Sidebar Components

**General Specification**:
- Sticky positioning: `top: 5rem`
- White background (Light) / `#252540` (Dark)
- Border Radius: `12px`
- Shadows: `0 2px 8px rgba(0,0,0,0.06)`
- Title bottom: `2px solid #667eea` Divider line

**Left Brand Directory**:
- Width: `220px`
- Maximum height: `calc(100vh - 7rem)`
- Scrollable, Custom scrollbar (4px Wide)

**Right Trending Deals**:
- Width: `240px`
- Rank number: `1.1rem`, 800 Font weight, Brand color
- Badge: Colored background, White text, `4px` Border Radius

### 6. Article Action Buttons

- Centered layout, `flex-wrap`
- Spacing: `1rem` (Desktop), `0.75rem` (Mobile)
- Spacing from title: `1.5rem 0 2rem`

### 7. Discord Floating Button

- Fixed positioning: `bottom: 1.5rem, right: 1.5rem`
- Background: `#5865F2`
- Border Radius: `30px`
- z-index: `999`
- Hover: Move up 2px + Dark background

### 8. Article Index Tags

- Border: `2px solid` (Each tag has independent color)
- Inner padding: `10px 20px`
- Minimum height: `44px`
- Hover: Move up 2px + Shadows

## Responsive Breakpoints

| Breakpoint | Width | Main Changes |
|------|------|----------|
| Desktop | `> 1024px` | Full three-column layout |
| Tablet | `768px - 1024px` | Statistics 2 Column, Platform 3 Column |
| Mobile | `480px - 768px` | Single-column layout, Hide Hero Images |
| Extra small | `< 480px` | Further reduce font size and spacing |

## Animation Specification

| Element | Animation | Duration | Easing |
|------|------|------|------|
| Card hover | translateY(-4px ~ -6px) | 0.3s | ease |
| Button hover | translateY(-2px ~ -3px) | 0.3s | ease |
| Shadow transition | box-shadow Transitions | 0.3s | ease |
| Color transition | color/background Transitions | 0.3s | ease |
| Marquee | translateX(-50%) | 90s | linear infinite |
| Hero Glow | translate Mobile | 15s | ease-in-out infinite |

## Dark Mode Adaptation

All components support dark mode，Via `.dark` class selector override：

| Element | Light | Dark |
|------|------|------|
| Page background | `#f5f5f5` | `#1a1a2e` |
| Card background | `#ffffff` | `#252540` / `#1a1a2e` |
| Primary text | `#333` | `#eee` / `#fff` |
| Secondary text | `#666` | `#aaa` |
| Border | `#e0e0e0` | `#3a3a4e` |
| Brand link | `#667eea` | `#a5b4fc` |
| Gradient opacity | `08` (8%) | `20`-`35` (12-21%) |

## Accessibility Design

1. **Touch target**: Minimum `44x44px`
2. **Color contrast**: Compliant with WCAG 2.1 AA Standard
3. **Focus indicator**: Keep browser default focus style
4. **Semantic**: Use `<header>`, `<nav>`, `<main>`, `<aside>` and other semantic tags
5. **ARIA Tag**: Add to key interactive elements `role` and `aria-label`

## Design Token Summary

```css
/* Directly reusable design tokens */
:root {
  /* Colors */
  --color-brand-primary: #667eea;
  --color-brand-secondary: #764ba2;
  --color-bg: #f5f5f5;
  --color-text-1: #333;
  --color-text-2: #666;
  --color-card-bg: #ffffff;
  --color-border: #e0e0e0;
  --color-discord: #5865F2;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 0.75rem;
  --space-lg: 1rem;
  --space-xl: 1.5rem;
  --space-2xl: 2rem;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 20px;

  /* Shadows */
  --shadow-card: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-card-hover: 0 12px 30px rgba(102, 126, 234, 0.2);
  --shadow-btn-hover: 0 6px 20px rgba(102, 126, 234, 0.4);

  /* Transitions */
  --transition-default: all 0.3s ease;

  /* Navigation Height */
  --vp-nav-height: 5rem;
}
```

---

**Document Version**: v1.0.0
**Last Updated**: 2026-08-09
