<script setup>
const brandCategories = [
  {
    name: 'Luxury Skincare',
    icon: '✨',
    brands: [
      { name: 'La Mer', items: 12, link: '/luxury-skincare/la-mer/' },
      { name: 'Sisley', items: 8, link: '/luxury-skincare/sisley/' },
      { name: 'Clé de Peau', items: 10, link: '/luxury-skincare/cle-de-peau/' },
    ]
  },
  {
    name: 'Tinted & Sun',
    icon: '☀️',
    brands: [
      { name: 'Supergoop', items: 6, link: '/tinted-sun-glow/supergoop/' },
      { name: 'Drunk Elephant', items: 5, link: '/tinted-sun-glow/drunk-elephant/' },
      { name: 'Tatcha', items: 7, link: '/tinted-sun-glow/tatcha/' },
    ]
  },
  {
    name: 'Makeup & Setting',
    icon: '💄',
    brands: [
      { name: 'Charlotte Tilbury', items: 9, link: '/makeup-setting/charlotte-tilbury/' },
      { name: 'Pat McGrath', items: 11, link: '/makeup-setting/pat-mcgrath/' },
      { name: 'Tom Ford', items: 8, link: '/makeup-setting/tom-ford/' },
    ]
  },
  {
    name: 'Niche Fragrances',
    icon: '🌸',
    brands: [
      { name: 'Le Labo', items: 7, link: '/niche-fragrances/le-labo/' },
      { name: 'Byredo', items: 6, link: '/niche-fragrances/byredo/' },
      { name: 'Maison Francis', items: 5, link: '/niche-fragrances/maison-francis/' },
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
            <a :href="brand.link" class="brand-link">
              <span class="brand-name">{{ brand.name }}</span>
              <span class="brand-count">({{ brand.items }})</span>
              <span class="brand-action">Read →</span>
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
  border-bottom: 2px solid var(--color-champagne);
}

.brand-nav-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-champagne);
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
  background: linear-gradient(135deg, #8B735508 0%, #A0896C08 100%);
}

.dark .brand-link {
  background: linear-gradient(135deg, #8B735520 0%, #A0896C20 100%);
}

.brand-link:hover {
  background: linear-gradient(135deg, #8B735518 0%, #A0896C18 100%);
}

.dark .brand-link:hover {
  background: linear-gradient(135deg, #8B735535 0%, #A0896C35 100%);
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
  color: var(--color-champagne);
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
  background: #8B735540;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .brand-nav-sidebar {
    position: static;
    max-height: none;
  }
}
</style>
