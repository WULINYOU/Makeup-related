<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const skipPaths = ['/', '/about/', '/privacy-policy/', '/terms-of-service/', '/affiliate-disclosure/']

const shouldShow = computed(() => {
  const path = '/' + page.value.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
  return !skipPaths.includes(path)
})

const categoryMap = {
  'luxury-skincare': {
    categoryPath: '/luxury-skincare/',
    intro: 'Explore more expert-tested luxury skincare reviews, ingredient analyses, and dermatologist-backed recommendations to find the perfect products for your skin concerns.',
    homeAnchor: 'Browse All Luxury Beauty Reviews & Guides',
    categoryAnchor: 'Discover More Luxury Skincare Reviews, Comparisons & Expert Picks'
  },
  'tinted-sun-glow': {
    categoryPath: '/tinted-sun-glow/',
    intro: 'Find your perfect glow with our science-backed reviews of luxury bronzing drops, tinted serums, and sun protection products tested across all skin tones.',
    homeAnchor: 'Explore All Luxury Beauty Reviews & Guides',
    categoryAnchor: 'See More Tinted & Sun Protection Reviews & Glow Product Comparisons'
  },
  'makeup-setting': {
    categoryPath: '/makeup-setting/',
    intro: 'Discover long-lasting luxury makeup products with our real-wear testing results, from setting sprays to complete makeup collections evaluated across skin types.',
    homeAnchor: 'Browse All Luxury Beauty Reviews & Guides',
    categoryAnchor: 'Explore More Makeup & Setting Reviews & Longevity Tests'
  },
  'niche-fragrances': {
    categoryPath: '/niche-fragrances/',
    intro: 'Navigate the world of luxury fragrances with our timed wear tests, scent composition analyses, and seasonal guides to find your signature scent.',
    homeAnchor: 'Discover All Luxury Beauty Reviews & Guides',
    categoryAnchor: 'Explore More Niche Fragrance Reviews & Scent Comparisons'
  }
}

// Map display category names to categoryMap keys
const categoryAliasMap = {
  'Niche Fragrances': 'niche-fragrances',
  'Luxury Skincare': 'luxury-skincare',
  'Makeup & Setting': 'makeup-setting',
  'Tinted & Sun Protection': 'tinted-sun-glow',
  'Tinted & Sun-Glow': 'tinted-sun-glow',
}

const footerData = computed(() => {
  if (!shouldShow.value) return null

  const cat = frontmatter.value?.category

  // Direct key match
  if (cat && categoryMap[cat]) {
    return categoryMap[cat]
  }

  // Alias match (e.g. "Niche Fragrances" -> "niche-fragrances")
  if (cat && categoryAliasMap[cat] && categoryMap[categoryAliasMap[cat]]) {
    return categoryMap[categoryAliasMap[cat]]
  }

  // Fallback: try to detect category from path
  const path = page.value.relativePath
  for (const [key, data] of Object.entries(categoryMap)) {
    if (path.startsWith(key)) {
      return data
    }
  }

  // Default fallback for any other page (e.g. reviews/ pages)
  return {
    categoryPath: '/luxury-skincare/',
    intro: 'Explore more expert-tested luxury beauty reviews, ingredient analyses, and honest comparisons to find the perfect products for your needs.',
    homeAnchor: 'Browse All Luxury Beauty Reviews & Guides',
    categoryAnchor: 'Discover More Luxury Beauty Reviews & Expert Picks'
  }
})
</script>

<template>
  <footer v-if="footerData" class="article-footer">
    <div class="article-footer-inner">
      <p class="article-footer-text">{{ footerData.intro }}</p>
      <nav class="article-footer-links">
        <a href="/" class="footer-link footer-link-home">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          {{ footerData.homeAnchor }}
        </a>
        <a :href="footerData.categoryPath" class="footer-link footer-link-category">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          {{ footerData.categoryAnchor }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.article-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #E8E4DE;
}

.dark .article-footer {
  border-top-color: #3A3A3A;
}

.article-footer-inner {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.04) 0%, rgba(160, 137, 108, 0.04) 100%);
  border: 1px solid #E8E4DE;
  border-radius: 2px;
  padding: 2rem;
}

.dark .article-footer-inner {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(160, 137, 108, 0.1) 100%);
  border-color: #3A3A3A;
}

.article-footer-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 1.5rem;
  font-style: italic;
}

.article-footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
}

.footer-link svg {
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.footer-link:hover svg {
  opacity: 1;
}

.footer-link-home {
  color: var(--color-gold);
}

.footer-link-home:hover {
  color: var(--color-gold-light);
  gap: 0.75rem;
}

.footer-link-category {
  color: var(--color-charcoal);
}

.dark .footer-link-category {
  color: #F5F5F0;
}

.footer-link-category:hover {
  color: var(--color-gold);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .article-footer-inner {
    padding: 1.5rem;
  }

  .article-footer-text {
    font-size: 0.9rem;
  }

  .footer-link {
    font-size: 0.8rem;
  }
}
</style>
