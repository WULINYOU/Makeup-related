<script setup>
const spreadsheetLink = 'https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254'

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
  {
    name: 'Sportswear',
    icon: '',
    brands: [
      { name: 'The North Face', items: 45 },
      { name: 'Under Armour', items: 32 },
      { name: 'Canada Goose', items: 28 },
    ]
  },
  {
    name: 'Trending',
    icon: '📈',
    brands: [
      { name: 'Stone Island', items: 41 },
      { name: 'Amiri', items: 36 },
      { name: 'Essentials', items: 67 },
    ]
  }
]
</script>

<template>
  <aside class="brand-nav-sidebar">
    <div class="brand-nav-header">
      <h3 class="brand-nav-title">Brand Directory</h3>
      <p class="brand-nav-subtitle">Browse by category</p>
    </div>

    <div class="brand-nav-list">
      <div v-for="category in brandCategories" :key="category.name" class="brand-category">
        <div class="brand-category-header">
          <span class="brand-category-icon">{{ category.icon }}</span>
          <span class="brand-category-name">{{ category.name }}</span>
        </div>
        <ul class="brand-list">
          <li v-for="brand in category.brands" :key="brand.name" class="brand-item">
            <a :href="spreadsheetLink" target="_blank" rel="noopener noreferrer" class="brand-link">
              <span class="brand-name">{{ brand.name }}</span>
              <span class="brand-count">({{ brand.items }})</span>
              <span class="brand-action">View Sheet →</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.brand-nav-sidebar {
  position: sticky;
  top: 5rem;
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
}

.dark .brand-nav-sidebar {
  background: #252540;
}

.brand-nav-header {
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #667eea;
}

.brand-nav-title {
  font-size: 1rem;
  font-weight: 700;
  color: #667eea;
  margin: 0 0 0.25rem;
}

.brand-nav-subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.brand-nav-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.brand-category-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-category-icon {
  font-size: 0.9rem;
}

.brand-category-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.brand-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.brand-item {
  padding: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
  background: linear-gradient(135deg, #667eea08 0%, #764ba208 100%);
}

.dark .brand-link {
  background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
}

.brand-link:hover {
  background: linear-gradient(135deg, #667eea18 0%, #764ba218 100%);
}

.dark .brand-link:hover {
  background: linear-gradient(135deg, #667eea35 0%, #764ba235 100%);
}

.brand-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.brand-count {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.brand-action {
  font-size: 0.65rem;
  color: #667eea;
  font-weight: 500;
  margin-left: auto;
  white-space: nowrap;
}

.brand-nav-sidebar::-webkit-scrollbar {
  width: 4px;
}

.brand-nav-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.brand-nav-sidebar::-webkit-scrollbar-thumb {
  background: #667eea40;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .brand-nav-sidebar {
    position: static;
    max-height: none;
  }
}
</style>
