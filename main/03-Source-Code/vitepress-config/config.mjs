import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Kakobuy Spreadsheet Archive',
  description: 'Your ultimate archive for Kakobuy spreadsheets for cross-border e-commerce',
  base: '/',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  
  head: [
    ['meta', { name: 'theme-color', content: '#667eea' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    
    // Google Analytics 4
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-Y6V5YTKF9Q' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y6V5YTKF9Q', {
        page_path: window.location.pathname === '/' ? '/dev/home' : window.location.pathname
      });
    `],
  ],
  
  themeConfig: {
    logo: {
      src: '/favicon.png',
      width: 24,
      height: 24,
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Other Platforms', link: '/platforms/' },
      { text: 'Browse Archives', link: '/posts/' },
      { text: 'Spreadsheet', link: 'https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254', target: '_blank' },
    ],
    // Sidebar disabled - handled by CustomDocLayout
    sidebar: [],
    footer: {
      message: 'Kakobuy Spreadsheet Archive - Your trusted resource for cross-border e-commerce | <a href="/sitemap.xml" rel="nofollow">Sitemap</a>',
      copyright: 'Copyright © 2026 Kakobuy Spreadsheet Archive',
    },
    docFooter: {
      prev: false,
      next: false,
    },
    outline: false,
  },
  
  sitemap: {
    hostname: 'https://kakobuy-7zh.pages.dev',
    transformItems(items) {
      return items.filter(item => {
        const path = item.url.replace('https://kakobuy-7zh.pages.dev', '')
        // Exclude internal files
        if (path === '/README' || path === '/article-matrix-template' || path === '/scripts/article-template') return false
        // Exclude media.md pages
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
    const hostname = 'https://kakobuy-7zh.pages.dev'
    const { frontmatter, filePath } = pageData
    const url = `${hostname}${pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '/')}`
    const ld = []

    // Article schema for all doc pages
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

    // FAQ schema for articles that have FAQ frontmatter flag
    if (frontmatter.hasFAQ) {
      const faqs = {
        '/posts/gutefrage-kakobuy-spreadsheet/': [
          { q: 'Is the Kakobuy spreadsheet free to use?', a: 'Yes! The spreadsheet is completely free to use. Kakobuy provides it as a resource to help e-commerce sellers succeed on their platform.' },
          { q: 'Do I need special software to use the Kakobuy spreadsheet?', a: 'No. The spreadsheet works with Google Sheets (free, recommended), Microsoft Excel, LibreOffice Calc, and any compatible spreadsheet application.' },
          { q: 'Can I customize the Kakobuy spreadsheet for my niche?', a: 'Absolutely! Customization is encouraged. Add or remove columns, create new tabs, and adapt formulas to match your specific business model.' },
          { q: 'Is the Kakobuy spreadsheet suitable for beginners?', a: 'Yes, definitely. The spreadsheet is designed to be user-friendly for beginners while powerful enough for experienced sellers.' },
          { q: 'How often should I update the Kakobuy spreadsheet?', a: 'Update daily during active product research, weekly for ongoing order tracking, and monthly for performance review and planning.' },
        ],
        '/posts/quora-kakobuy-spreadsheet/': [
          { q: 'Is the Kakobuy spreadsheet better than paid tools?', a: 'It depends on your needs. The spreadsheet is better for beginners, small budgets, and customization lovers. Many Quora users start with the spreadsheet and upgrade to paid tools only when their business justifies the cost.' },
          { q: 'How do I handle multiple currencies in the Kakobuy spreadsheet?', a: 'Add columns for original currency price, exchange rate used, converted price (USD/EUR/GBP), and exchange rate fluctuation buffer (5-10%).' },
          { q: 'Can multiple team members use the Kakobuy spreadsheet simultaneously?', a: 'Yes! Host it on Google Sheets for real-time collaboration. Set view-only permissions for junior staff, edit access for purchasing managers, and admin access for business owners.' },
          { q: 'How often do successful sellers update their Kakobuy spreadsheet?', a: 'Daily for active sourcing and supplier communication, weekly for order tracking, monthly for performance analysis and planning, and quarterly for major strategy reviews.' },
        ],
        '/posts/reddit-kakobuy-spreadsheet/': [
          { q: 'Is the Kakobuy spreadsheet actually free or is there a catch?', a: 'Actually free. No catch. Kakobuy makes money when you use their platform to place orders, not from the spreadsheet. It\'s a loss leader to attract customers.' },
          { q: 'Can I use the Kakobuy spreadsheet for suppliers outside Kakobuy?', a: 'Absolutely! The spreadsheet is platform-agnostic. Columns work the same whether your supplier is on Kakobuy, Alibaba, or a direct factory.' },
          { q: 'How do I handle sample tracking in the Kakobuy spreadsheet?', a: 'Create a tracking table with columns for supplier, sample cost, sent date, expected delivery, received status, quality score, and notes.' },
          { q: 'Is the Kakobuy spreadsheet mobile-friendly?', a: 'Yes! The Google Sheets mobile app works well for viewing all data, editing cells, and adding comments. Use mobile for quick updates and desktop for major work.' },
        ],
      }
      const items = faqs[pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '/')]
      if (items) {
        ld.push({
          '@type': 'FAQPage',
          mainEntity: items.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: a,
            },
          })),
        })
      }
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
