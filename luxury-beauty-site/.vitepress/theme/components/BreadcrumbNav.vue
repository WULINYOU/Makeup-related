<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { getNavigationContext } from '../navigationData.js'

const route = useRoute()

const breadcrumbs = computed(() => {
  const path = route.path
  const context = getNavigationContext(path)
  
  // Home page
  if (path === '/' || path === '/index.html') {
    return [{ label: 'Home', path: '/', active: true }]
  }
  
  // Category index pages
  if (path.match(/^\/[^\/]+\/$/)) {
    const categorySlug = path.split('/')[1]
    const categoryNames = {
      'luxury-skincare': 'Luxury Skincare',
      'tinted-sun-glow': 'Tinted & Sun Protection',
      'makeup-setting': 'Makeup & Setting',
      'niche-fragrances': 'Niche Fragrances'
    }
    return [
      { label: 'Home', path: '/' },
      { label: categoryNames[categorySlug] || categorySlug, path, active: true }
    ]
  }
  
  // Article pages
  if (context) {
    return [
      { label: 'Home', path: '/' },
      { label: context.category, path: context.categoryPath },
      { label: context.currentArticle.title, path: context.currentArticle.path, active: true }
    ]
  }
  
  // Fallback
  return [{ label: 'Home', path: '/', active: true }]
})
</script>

<template>
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <a 
          v-if="!crumb.active" 
          :href="crumb.path" 
          class="breadcrumb-link"
        >
          {{ crumb.label }}
        </a>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ crumb.label }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-nav {
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e8e8e8;
}

.dark .breadcrumb-nav {
  border-bottom-color: #3a3a4e;
}

.breadcrumb-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: #8B7355;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #A0896C;
  text-decoration: underline;
}

.dark .breadcrumb-link {
  color: #C4A882;
}

.dark .breadcrumb-link:hover {
  color: #D4B892;
}

.breadcrumb-current {
  color: #6B6B6B;
  font-weight: 500;
}

.dark .breadcrumb-current {
  color: #B0B0A8;
}

.breadcrumb-separator {
  color: #A0A0A0;
  font-size: 0.75rem;
}

.dark .breadcrumb-separator {
  color: #6B6B6B;
}

@media (max-width: 768px) {
  .breadcrumb-list {
    font-size: 0.8rem;
  }
}
</style>
