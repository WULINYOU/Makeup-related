import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import ArticleFooter from './components/ArticleFooter.vue'
import './custom.css'

const marqueeData = [
  { text: 'Skincare enthusiasts are reading our reviews' },
  { text: 'Beauty professionals trust our ingredient analysis' },
  { text: 'Luxury beauty lovers discover new favorites' },
  { text: 'Dermatologists recommend our expert guides' },
  { text: 'Fragrance collectors explore niche perfumes' },
  { text: 'Makeup artists rely on our honest reviews' },
  { text: 'Beauty editors reference our comparisons' },
  { text: 'Skincare addicts find their perfect routine' },
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

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      // GA4 custom event tracking for Amazon affiliate link clicks
      const trackAmazonClick = (link) => {
        if (typeof gtag !== 'undefined') {
          const pagePath = window.location.pathname
          const linkText = link.textContent.trim().substring(0, 50)
          const linkPosition = link.closest('.article-actions') ? 'header_cta'
            : link.closest('.floating-action-buttons') ? 'floating_buy'
            : link.closest('.trust-badges') ? 'trust_badge'
            : link.closest('.article-footer') ? 'footer'
            : 'inline_content'

          gtag('event', 'amazon_affiliate_click', {
            event_category: 'affiliate',
            event_label: linkText,
            page_path: pagePath,
            link_position: linkPosition,
            link_url: link.href,
          })
        }
      }

      const interceptCTALinks = () => {
        const ctaButtons = document.querySelectorAll('.cta-button, .check-price-btn')
        ctaButtons.forEach(btn => {
          if (btn.textContent.includes('Check Price on Amazon')) {
            btn.setAttribute('rel', 'sponsored noopener noreferrer')
            btn.setAttribute('target', '_blank')
          }
        })

        // Attach GA4 click tracking to all Amazon affiliate links
        const amazonLinks = document.querySelectorAll('a[href*="amzn.to"], a[href*="amazon.com"]')
        amazonLinks.forEach(link => {
          if (!link.dataset.gaTracked) {
            link.addEventListener('click', () => trackAmazonClick(link))
            link.dataset.gaTracked = 'true'
          }
        })
      }

      if (document.readyState === 'complete') {
        interceptCTALinks()
      } else {
        window.addEventListener('DOMContentLoaded', interceptCTALinks)
      }

      router.onAfterRouteChanged = () => {
        setTimeout(interceptCTALinks, 100)
      }
    }
  },
  Layout() {
    const { page } = useData()
    const fullMarqueeContent = [...createMarqueeContent(), ...createMarqueeContent()]

    if (typeof window !== 'undefined') {
      const skipButtonExactPaths = ['/about/', '/privacy-policy/', '/terms-of-service/', '/affiliate-disclosure/']
      const skipButtonCategoryPaths = ['/luxury-skincare/', '/tinted-sun-glow/', '/makeup-setting/', '/niche-fragrances/']

      // Map article paths to their primary Amazon product URL
      const articleAmazonUrls = {
        '/luxury-skincare/augustinus-bader-the-rich-cream-review': 'https://amzn.to/3UneheT',
        '/luxury-skincare/la-prairie-skin-caviar-liquid-lift-review': 'https://amzn.to/4glGo6Q',
        '/luxury-skincare/youth-to-the-people-superberry-dream-mask-review': 'https://amzn.to/3U6Upwx',
        '/luxury-skincare/tatcha-travel-essentials-set-review': 'https://amzn.to/4fMm7XV',
        '/luxury-skincare/augustinus-bader-vs-la-prairie-liquid-lift': 'https://amzn.to/3UneheT',
        '/luxury-skincare/best-luxury-face-cream-mature-skin': 'https://amzn.to/3UneheT',
        '/tinted-sun-glow/drunk-elephant-d-bronzi-sunshine-drops-review': 'https://amzn.to/3TLQHbF',
        '/makeup-setting/charlotte-tilbury-airbrush-setting-spray-review': 'https://amzn.to/4z4irbs',
        '/niche-fragrances/mugler-angel-eau-de-parfum-gift-set-review': 'https://amzn.to/4hoeHLO',
        '/niche-fragrances/maison-margiela-replica-on-a-date-review': 'https://amzn.to/3TMeyb8',
      }

      const injectArticleButtons = () => {
        const currentPath = window.location.pathname
        if (skipButtonExactPaths.some(p => currentPath === p)) return
        if (skipButtonCategoryPaths.some(p => currentPath === p)) return

        const h1 = document.querySelector('.VPDoc h1')
        if (!h1) return
        if (h1.nextElementSibling && h1.nextElementSibling.classList.contains('article-actions')) return

        // Find matching Amazon URL for this article
        let amazonUrl = null
        for (const [path, url] of Object.entries(articleAmazonUrls)) {
          if (currentPath.startsWith(path)) {
            amazonUrl = url
            break
          }
        }

        if (amazonUrl) {
          const btnContainer = document.createElement('div')
          btnContainer.className = 'article-actions'
          const btn = document.createElement('a')
          btn.className = 'article-action-btn brand'
          btn.href = amazonUrl
          btn.target = '_blank'
          btn.rel = 'sponsored noopener noreferrer'
          btn.setAttribute('role', 'button')
          btn.setAttribute('aria-label', 'Check Price on Amazon')
          btn.textContent = 'Check Price on Amazon'
          btn.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'amazon_affiliate_click', {
                event_category: 'affiliate',
                event_label: 'Quick Summary CTA',
                page_path: currentPath,
                link_position: 'header_cta',
                link_url: amazonUrl,
              })
            }
          })
          btnContainer.appendChild(btn)
          h1.parentNode.insertBefore(btnContainer, h1.nextSibling)
        }
      }

      if (document.readyState === 'complete') {
        injectArticleButtons()
      } else {
        window.addEventListener('DOMContentLoaded', injectArticleButtons)
      }

      const observer = new MutationObserver(() => {
        const h1 = document.querySelector('.VPDoc h1')
        if (h1 && !h1.nextElementSibling?.classList.contains('article-actions')) {
          injectArticleButtons()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })

      // Floating action buttons (TOP + BUY)
      const skipFloatingPaths = ['/about/', '/privacy-policy/', '/terms-of-service/', '/affiliate-disclosure/', '/luxury-skincare/', '/tinted-sun-glow/', '/makeup-setting/', '/niche-fragrances/', '/']

      const injectFloatingButtons = () => {
        const currentPath = window.location.pathname
        if (skipFloatingPaths.some(p => currentPath === p)) return
        if (document.getElementById('floating-action-buttons')) return

        // Find matching Amazon URL
        let amazonUrl = null
        for (const [path, url] of Object.entries(articleAmazonUrls)) {
          if (currentPath.startsWith(path)) {
            amazonUrl = url
            break
          }
        }

        // Count product links on page (amzn.to links)
        const productLinks = document.querySelectorAll('a[href*="amzn.to"]')

        // Only show BUY button if there's exactly one product link
        const showBuyButton = productLinks.length === 1

        const container = document.createElement('div')
        container.id = 'floating-action-buttons'
        container.className = 'floating-action-buttons'

        // TOP button
        const topBtn = document.createElement('button')
        topBtn.className = 'floating-btn floating-btn-top'
        topBtn.textContent = 'TOP'
        topBtn.setAttribute('aria-label', 'Scroll to top')
        topBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })

        container.appendChild(topBtn)

        // BUY button (only if single product link)
        if (showBuyButton && amazonUrl) {
          const buyBtn = document.createElement('a')
          buyBtn.className = 'floating-btn floating-btn-buy'
          buyBtn.textContent = 'BUY'
          buyBtn.href = amazonUrl
          buyBtn.target = '_blank'
          buyBtn.rel = 'sponsored noopener noreferrer'
          buyBtn.setAttribute('aria-label', 'Buy on Amazon')
          buyBtn.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'amazon_affiliate_click', {
                event_category: 'affiliate',
                event_label: 'BUY floating button',
                page_path: currentPath,
                link_position: 'floating_buy',
                link_url: amazonUrl,
              })
            }
          })
          container.appendChild(buyBtn)
        }

        document.body.appendChild(container)
      }

      if (document.readyState === 'complete') {
        injectFloatingButtons()
      } else {
        window.addEventListener('DOMContentLoaded', injectFloatingButtons)
      }

      const floatingObserver = new MutationObserver(() => {
        if (!document.getElementById('floating-action-buttons')) {
          injectFloatingButtons()
        }
      })
      floatingObserver.observe(document.body, { childList: true, subtree: true })
    }

    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h('div', { class: 'marquee-container' }, [
        h('div', { class: 'marquee-track' }, fullMarqueeContent)
      ]),
      'doc-after': () => h(ArticleFooter),
    })
  },
}
