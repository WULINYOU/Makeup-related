import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import './custom.css'

const marqueeData = [
  { text: 'European users have placed their orders' },
  { text: 'American users have placed their orders' },
  { text: 'British users have placed their orders' },
  { text: 'Japanese users have placed their orders' },
  { text: 'Korean users have placed their orders' },
  { text: 'Australian users have placed their orders' },
  { text: 'Canadian users have placed their orders' },
  { text: 'Singaporean users have placed their orders' },
  { text: 'Malaysian users have placed their orders' },
  { text: 'Thai users have placed their orders' },
  { text: 'German users have placed their orders' },
  { text: 'French users have placed their orders' },
  { text: 'Brazilian users have placed their orders' },
  { text: 'Indian users have placed their orders' },
  { text: 'United Arab Emirates users have placed their orders' },
  { text: 'Nigerian users have placed their orders' },
  { text: 'Russian users have placed their orders' },
  { text: 'Indonesian users have placed their orders' },
  { text: 'Filipino users have placed their orders' },
  { text: 'Vietnamese users have placed their orders' },
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
    // Intercept Google Spreadsheet link on initial load
    if (typeof window !== 'undefined') {
      const interceptHeroLink = () => {
        const heroActions = document.querySelectorAll('.VPHero .actions .VPButton')
        heroActions.forEach(btn => {
          if (btn.textContent.includes('Kakobuy Spreadsheet')) {
            btn.removeAttribute('href')
            btn.setAttribute('role', 'button')
            btn.onclick = () => {
              window.open('https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254', '_blank')
            }
          }
        })
      }
      // Handle initial page load
      if (document.readyState === 'complete') {
        interceptHeroLink()
      } else {
        window.addEventListener('DOMContentLoaded', interceptHeroLink)
      }
      // Handle SPA navigation
      router.onAfterRouteChanged = (to) => {
        if (to === '/') {
          setTimeout(interceptHeroLink, 100)
        }
      }
    }
  },
  Layout() {
    const { page } = useData()

    const fullMarqueeContent = [...createMarqueeContent(), ...createMarqueeContent()]

    // Inject article action buttons after h1 on doc pages
    if (typeof window !== 'undefined') {
      const injectArticleButtons = () => {
        const h1 = document.querySelector('.VPDoc h1')
        if (!h1) return
        if (h1.nextElementSibling && h1.nextElementSibling.classList.contains('article-actions')) return

        const btnContainer = document.createElement('div')
        btnContainer.className = 'article-actions'
        btnContainer.innerHTML = `
          <a class="article-action-btn brand" href="https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254" target="_blank" rel="noopener noreferrer" role="button" aria-label="Access Kakobuy Spreadsheet">Access Kakobuy Spreadsheet</a>
          <a class="article-action-btn alt" href="/platforms/" role="button" aria-label="Other Platforms">Other Platforms</a>
        `
        h1.parentNode.insertBefore(btnContainer, h1.nextSibling)
      }

      if (document.readyState === 'complete') {
        injectArticleButtons()
      } else {
        window.addEventListener('DOMContentLoaded', injectArticleButtons)
      }

      // Handle SPA navigation
      const observer = new MutationObserver(() => {
        const h1 = document.querySelector('.VPDoc h1')
        if (h1 && !h1.nextElementSibling?.classList.contains('article-actions')) {
          injectArticleButtons()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h('div', { class: 'marquee-container' }, [
        h('div', { class: 'marquee-track' }, fullMarqueeContent)
      ]),
      'layout-bottom': () => h('div', { class: 'layout-bottom-wrapper' }, [
        h('a', {
          class: 'discord-float-btn',
          href: 'https://discord.gg/jtc399kUQV',
          target: '_blank',
          rel: 'noopener noreferrer',
          title: 'Join our Discord community'
        }, [
          h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'white' }, [
            h('path', { d: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z' })
          ]),
          h('span', { class: 'discord-float-label' }, 'Discord')
        ])
      ])
    })
  },
}
