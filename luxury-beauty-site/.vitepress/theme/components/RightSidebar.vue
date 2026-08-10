<script setup>
const trendingDeals = [
  {
    rank: 1,
    name: 'La Mer Crème de la Mer',
    badge: 'Hot',
    badgeColor: '#ef4444',
    stat: '+45% clicks this week',
    statIcon: '🔥'
  },
  {
    rank: 2,
    name: 'Charlotte Tilbury Pillow Talk',
    badge: 'Trending',
    badgeColor: '#f59e0b',
    stat: '3.2k users viewed',
    statIcon: '👀'
  },
  {
    rank: 3,
    name: 'Le Labo Santal 33',
    badge: 'Editor Pick',
    badgeColor: '#10b981',
    stat: 'Updated 2h ago',
    statIcon: '✨'
  }
]
</script>

<template>
  <aside class="trending-sidebar">
    <div class="trending-header">
      <h3 class="trending-title">🔥 Trending Reviews</h3>
      <p class="trending-subtitle">Most popular this week</p>
    </div>

    <div class="trending-list">
      <a
        v-for="deal in trendingDeals"
        :key="deal.rank"
        :href="`/reviews/${deal.rank}/`"
        class="trending-item"
      >
        <div class="trending-rank">#{{ deal.rank }}</div>
        <div class="trending-info">
          <div class="trending-name-row">
            <span class="trending-name">{{ deal.name }}</span>
            <span class="trending-badge" :style="{ backgroundColor: deal.badgeColor }">{{ deal.badge }}</span>
          </div>
          <div class="trending-stat">
            <span class="trending-stat-icon">{{ deal.statIcon }}</span>
            <span class="trending-stat-text">{{ deal.stat }}</span>
          </div>
        </div>
        <span class="trending-action">Read →</span>
      </a>
    </div>
  </aside>
</template>

<style scoped>
.trending-sidebar {
  position: sticky;
  top: 5rem;
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.dark .trending-sidebar {
  background: #252540;
}

.trending-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-champagne);
}

.trending-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-champagne);
  margin: 0 0 0.25rem;
}

.trending-subtitle {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.trending-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.trending-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  background: linear-gradient(135deg, #8B735508 0%, #A0896C08 100%);
  border: 1px solid #e8e8e8;
}

.dark .trending-item {
  background: linear-gradient(135deg, #8B735520 0%, #A0896C20 100%);
  border-color: #3a3a4e;
}

.trending-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
}

.trending-rank {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-champagne);
  min-width: 28px;
  text-align: center;
}

.trending-info {
  flex: 1;
  min-width: 0;
}

.trending-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.trending-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.trending-badge {
  font-size: 0.6rem;
  font-weight: 600;
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
}

.trending-stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.trending-stat-icon {
  font-size: 0.7rem;
}

.trending-stat-text {
  font-size: 0.65rem;
  color: var(--vp-c-text-2);
}

.trending-action {
  font-size: 0.65rem;
  color: var(--color-champagne);
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .trending-sidebar {
    position: static;
  }
}
</style>
