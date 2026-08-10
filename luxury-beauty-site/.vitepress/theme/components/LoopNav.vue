<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { getNavigationContext } from '../navigationData.js'

const route = useRoute()

const navContext = computed(() => {
  const path = route.path
  return getNavigationContext(path)
})
</script>

<template>
  <nav v-if="navContext" class="loop-navigation" aria-label="Article navigation">
    <!-- Previous Article -->
    <div class="nav-item nav-prev" v-if="navContext.prevArticle">
      <span class="nav-label">← Previous</span>
      <a :href="navContext.prevArticle.path" class="nav-link">
        <span class="nav-title">{{ navContext.prevArticle.title }}</span>
      </a>
    </div>
    
    <!-- Back to Category -->
    <div class="nav-item nav-category">
      <span class="nav-label">Category</span>
      <a :href="navContext.categoryPath" class="nav-link">
        <span class="nav-title">{{ navContext.category }}</span>
      </a>
    </div>
    
    <!-- Next Article -->
    <div class="nav-item nav-next" v-if="navContext.nextArticle">
      <span class="nav-label">Next →</span>
      <a :href="navContext.nextArticle.path" class="nav-link">
        <span class="nav-title">{{ navContext.nextArticle.title }}</span>
      </a>
    </div>
    
    <!-- Back to Home (shown at the end of loop) -->
    <div class="nav-item nav-home" v-if="navContext.isLast">
      <span class="nav-label">Complete</span>
      <a href="/" class="nav-link">
        <span class="nav-title">Back to Home</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.loop-navigation {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 2px solid #e8e8e8;
  flex-wrap: wrap;
}

.dark .loop-navigation {
  border-top-color: #3a3a4e;
}

.nav-item {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #FAFAF8 0%, #F5F3EF 100%);
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  transition: all 0.2s;
}

.dark .nav-item {
  background: linear-gradient(135deg, #252540 0%, #2a2a45 100%);
  border-color: #3a3a4e;
}

.nav-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
  border-color: #8B7355;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #8B7355;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dark .nav-label {
  color: #C4A882;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #2D2D2D;
  line-height: 1.4;
}

.dark .nav-title {
  color: #F5F5F0;
}

.nav-prev {
  text-align: left;
}

.nav-category {
  text-align: center;
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.08) 0%, rgba(160, 137, 108, 0.08) 100%);
}

.dark .nav-category {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.15) 0%, rgba(160, 137, 108, 0.15) 100%);
}

.nav-next {
  text-align: right;
}

.nav-home {
  text-align: center;
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.12) 0%, rgba(160, 137, 108, 0.12) 100%);
  border-color: #8B7355;
}

.dark .nav-home {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.2) 0%, rgba(160, 137, 108, 0.2) 100%);
}

@media (max-width: 768px) {
  .loop-navigation {
    flex-direction: column;
  }
  
  .nav-item {
    min-width: 100%;
  }
  
  .nav-prev,
  .nav-next,
  .nav-category,
  .nav-home {
    text-align: left;
  }
}
</style>
