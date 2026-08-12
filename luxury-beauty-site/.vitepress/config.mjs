import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Luxury Beauty Edit',
  description: 'Expert-curated luxury beauty reviews, ingredient analysis, and honest comparisons. Find the best high-end skincare, fragrances, and makeup for your skin type.',
  base: '/',
  lang: 'en-US',
  lastUpdated: false,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#8B7355' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Luxury Beauty Edit Editorial Team' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Luxury Beauty Edit' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-LLNSSMMLEB' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-LLNSSMMLEB');
    `],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Luxury Beauty Edit',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Luxury Skincare', link: '/luxury-skincare/' },
      { text: 'Tinted & Sun-Glow', link: '/tinted-sun-glow/' },
      { text: 'Makeup & Setting', link: '/makeup-setting/' },
      { text: 'Niche Fragrances', link: '/niche-fragrances/' },
      { text: 'About', link: '/about/' },
    ],
    sidebar: {},
    footer: {
      message: '<strong>Affiliate Disclosure:</strong> As an Amazon Associate we earn from qualifying purchases. All reviews are based on independent editorial research. <a href="/privacy-policy/">Privacy Policy</a> | <a href="/terms/">Terms of Service</a> | <a href="/affiliate-disclosure/">Affiliate Disclosure</a> | <a href="https://makeup-related.pages.dev/sitemap.xml" target="_blank" rel="noopener">Sitemap</a>',
      copyright: 'Copyright © 2026 Luxury Beauty Edit. All rights reserved.',
    },
    docFooter: {
      prev: false,
      next: false,
    },
    outline: false,
  },

  sitemap: {
    hostname: 'https://makeup-related.pages.dev',
    transformItems(items) {
      return items.filter(item => {
        const path = item.url.replace('https://makeup-related.pages.dev', '')
        if (path.includes('/media')) return false
        return true
      })
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  transformPageData(pageData) {
    const hostname = 'https://makeup-related.pages.dev'
    const { frontmatter } = pageData
    const url = `${hostname}${pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '/')}`
    const ld = []

    // Organization schema
    ld.push({
      '@type': 'Organization',
      name: 'Luxury Beauty Edit',
      url: hostname,
      logo: `${hostname}/favicon.svg`,
      description: 'Expert-curated luxury beauty reviews and ingredient analysis.',
    })

    // Article schema for all doc pages
    if (frontmatter.layout === 'doc' && frontmatter.title) {
      ld.push({
        '@type': 'Article',
        headline: frontmatter.title,
        description: frontmatter.description || '',
        author: {
          '@type': 'Organization',
          name: 'Luxury Beauty Edit Editorial Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Luxury Beauty Edit',
          url: hostname,
          logo: {
            '@type': 'ImageObject',
            url: `${hostname}/favicon.svg`,
          },
        },
        datePublished: frontmatter.date || '',
        dateModified: frontmatter.updated || frontmatter.date || '',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      })
    }

    // Product schema for review articles
    if (frontmatter.productData) {
      const pd = frontmatter.productData
      ld.push({
        '@type': 'Product',
        name: pd.name,
        description: frontmatter.description || '',
        brand: {
          '@type': 'Brand',
          name: pd.brand,
        },
        offers: {
          '@type': 'Offer',
          url: pd.affiliateLink || url,
          priceCurrency: 'USD',
          price: pd.price,
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: pd.rating ? {
          '@type': 'AggregateRating',
          ratingValue: pd.rating,
          reviewCount: pd.reviewCount || 50,
        } : undefined,
      })
    }

    // BreadcrumbList schema
    if (frontmatter.layout === 'doc') {
      const pathParts = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '').split('/').filter(Boolean)
      const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: hostname }]
      pathParts.forEach((part, i) => {
        const name = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        items.push({
          '@type': 'ListItem',
          position: i + 2,
          name,
          item: `${hostname}/${pathParts.slice(0, i + 1).join('/')}/`,
        })
      })
      ld.push({
        '@type': 'BreadcrumbList',
        itemListElement: items,
      })
    }

    // FAQ schema
    if (frontmatter.hasFAQ && frontmatter.faqData) {
      ld.push({
        '@type': 'FAQPage',
        mainEntity: frontmatter.faqData.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      })
    }

    if (ld.length) {
      return {
        head: [
          ...(pageData.frontmatter.head || []),
          ['script', { type: 'application/ld+json' }, JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': ld,
          })],
        ],
      }
    }
    return {}
  },
})
