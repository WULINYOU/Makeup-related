<script setup>
import { useData } from 'vitepress'
import LeftSidebar from './LeftSidebar.vue'
import RightSidebar from './RightSidebar.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="custom-doc-layout">
    <!-- Title bar -->
    <header class="custom-doc-header">
      <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
    </header>

    <!-- Three-column body -->
    <div class="custom-doc-body">
      <!-- Left sidebar: Brand directory -->
      <LeftSidebar />

      <!-- Main content -->
      <main class="custom-doc-content">
        <Content />
      </main>

      <!-- Right sidebar: Trending deals -->
      <RightSidebar />
    </div>
  </div>
</template>

<style scoped>
.custom-doc-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.custom-doc-header {
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;
}

.dark .custom-doc-header {
  border-bottom-color: #3a3a4e;
}

.custom-doc-header h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0;
}

/* Body: three columns */
.custom-doc-body {
  display: grid;
  grid-template-columns: 220px 1fr 240px;
  gap: 2rem;
  align-items: start;
}

/* Main content */
.custom-doc-content {
  min-width: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .custom-doc-body {
    grid-template-columns: 1fr;
  }
}
</style>
