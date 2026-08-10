<script setup>
import { useRouter } from 'vitepress'

const router = useRouter()

// Category definitions - extensible for future dimensions
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
      { name: '2025 Classic', icon: '📀', url: '/posts/best-batch-2025/', color: '#a855f7' },
      { name: '1:1 Quality', icon: '', url: '/posts/1-to-1-spreadsheet/', color: '#06b6d4' },
      { name: 'Budget', icon: '💰', url: '/posts/budget-spreadsheet/', color: '#10b981' },
      { name: 'Ultimate', icon: '👑', url: '/posts/ultimate-spreadsheet/', color: '#eab308' },
      { name: 'Hot Fashion', icon: '🔥', url: '/posts/top-hot-fashion/', color: '#ef4444' },
      { name: 'Hidden Gems', icon: '🔍', url: '/posts/kakobuy-finds/', color: '#8b5cf6' }
    ]
  },
  {
    label: 'Kakobuy Review',
    items: [
      { name: 'Jordan 4 Military Blue', icon: '', url: '/posts/nike-jordan-4-military-blue-review/', color: '#3b82f6' },
      { name: 'Dunk Low Panda', icon: '🐼', url: '/posts/nike-dunk-low-panda-review/', color: '#6b7280' },
      { name: 'Trapstar Irongate', icon: '🧥', url: '/posts/trapstar-irongate-hoodie-review/', color: '#1f2937' },
      { name: 'Essentials Hoodie', icon: '', url: '/posts/essentials-hoodie-review/', color: '#a3a3a3' },
      { name: 'Corteiz Cargos', icon: '👖', url: '/posts/corteiz-alcatraz-cargos-review/', color: '#166534' },
      { name: 'Stussy 8 Ball', icon: '🎱', url: '/posts/stussy-8-ball-tee-review/', color: '#111827' },
      { name: 'UV Jacket', icon: '☀️', url: '/posts/uv-sun-protection-jacket-review/', color: '#f97316' },
      { name: 'Arc\'teryx Beta', icon: '🏔️', url: '/posts/arcteryx-beta-jacket-review/', color: '#0369a1' },
      { name: 'Salomon XT-6', icon: '', url: '/posts/salomon-xt-6-review/', color: '#65a30d' },
      { name: 'Yeezy 350 Granite', icon: '👟', url: '/posts/yeezy-350-granite-review/', color: '#78716c' },
      { name: 'BAPE Shark', icon: '🦈', url: '/posts/bape-shark-hoodie-review/', color: '#15803d' },
      { name: 'Prada Re-Nylon', icon: '👜', url: '/posts/prada-re-nylon-bag-review/', color: '#1e1e1e' },
      { name: 'Nuptse 1996', icon: '', url: '/posts/north-face-1996-nuptse-review/', color: '#dc2626' }
    ]
  }
  // Future categories can be added here:
  // {
  //   label: 'Clothing Type',
  //   items: [
  //     { name: 'T-Shirts', url: '/posts/tshirts/', color: '#...' },
  //     { name: 'Jackets', url: '/posts/jackets/', color: '#...' },
  //   ]
  // }
]

const navigateTo = (url) => {
  router.go(url)
}
</script>

<template>
  <div class="posts-layout">
    <div class="posts-main">
      <h1>Browse Archives</h1>
      <p class="posts-intro">Explore our collection of Kakobuy spreadsheet archives organized by category.</p>

      <!-- Category Rows -->
      <div v-for="(category, catIndex) in CATEGORIES" :key="catIndex" class="category-row">
        <h2 class="category-label">{{ category.label }}</h2>
        <div class="category-items">
          <a
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            :href="item.url"
            class="category-tag"
            :style="{ borderColor: item.color }"
          >
            <span v-if="item.icon" class="tag-icon">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>

    <aside class="posts-sidebar">
      <h3>Quick Links</h3>
      <ul class="hot-articles-list">
        <li v-for="(cat, index) in CATEGORIES" :key="index">
          <a v-for="(item, i) in cat.items" :key="i" :href="item.url">{{ item.icon }} {{ item.name }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
/* Category Rows */
.category-row {
  margin-bottom: 32px;
}

.category-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  min-height: 44px;
  border: 2px solid;
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.category-tag:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tag-icon {
  font-size: 16px;
}

/* Layout */
.posts-layout {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 0 2rem;
}

@media (max-width: 960px) {
  .posts-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .posts-sidebar {
    position: static;
  }
}

.posts-main h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px;
  color: var(--vp-c-text-1);
}

.posts-intro {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 32px;
}

/* Sidebar */
.posts-sidebar {
  position: sticky;
  top: 80px;
  align-self: flex-start;
}

.posts-sidebar h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--vp-c-text-1);
}

.hot-articles-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hot-articles-list li {
  margin-bottom: 8px;
}

.hot-articles-list a {
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.hot-articles-list a:hover {
  color: var(--vp-c-brand-1);
}

/* Mobile */
@media (max-width: 768px) {
  .category-items {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }

  .category-items::-webkit-scrollbar {
    display: none;
  }

  .category-tag {
    flex-shrink: 0;
  }
}
</style>
