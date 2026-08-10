<script setup>
const brands = [
  'La Mer', 'Sisley', 'Clé de Peau', 'Charlotte Tilbury', 'Pat McGrath',
  'Tom Ford', 'Le Labo', 'Byredo', 'Maison Francis', 'Supergoop',
  'Drunk Elephant', 'Tatcha', 'Chantecaille', 'Augustinus Bader', 'Biologique Recherche',
  'Valmont', 'Guerlain', 'Dior', 'Chanel', 'YSL',
  'Armani', 'Hermes', 'Jo Malone', 'Diptyque', 'Acqua di Parma'
]

const handleClick = () => {
  window.location.href = '/luxury-skincare/'
}
</script>

<template>
  <div class="left-marquee-container" @click="handleClick" title="Click to explore luxury beauty brands">
    <div class="left-marquee-title">Luxury Brands</div>
    <div class="left-marquee-mask top"></div>
    <div class="left-marquee-mask bottom"></div>
    <div class="left-marquee-scroll">
      <div class="left-marquee-content">
        <div v-for="(brand, index) in brands" :key="`a-${index}`" class="left-marquee-item">
          {{ brand }}
        </div>
        <div v-for="(brand, index) in brands" :key="`b-${index}`" class="left-marquee-item">
          {{ brand }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-marquee-container {
  position: sticky;
  top: 5rem;
  width: 220px;
  height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.dark .left-marquee-container {
  background: #252540;
}

.left-marquee-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
}

.left-marquee-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-champagne);
  text-align: center;
  background: white;
  z-index: 2;
  border-bottom: 2px solid var(--color-champagne);
}

.dark .left-marquee-title {
  background: #252540;
}

.left-marquee-mask {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1;
  pointer-events: none;
}

.left-marquee-mask.top {
  top: 48px;
  background: linear-gradient(to bottom, white 0%, transparent 100%);
}

.dark .left-marquee-mask.top {
  background: linear-gradient(to bottom, #252540 0%, transparent 100%);
}

.left-marquee-mask.bottom {
  bottom: 0;
  background: linear-gradient(to top, white 0%, transparent 100%);
}

.dark .left-marquee-mask.bottom {
  background: linear-gradient(to top, #252540 0%, transparent 100%);
}

.left-marquee-scroll {
  height: 100%;
  overflow: hidden;
  padding-top: 48px;
}

.left-marquee-content {
  display: flex;
  flex-direction: column;
  animation: scroll-up 30s linear infinite;
}

.left-marquee-item {
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.dark .left-marquee-item {
  border-bottom-color: #3a3a4e;
}

.left-marquee-item:hover {
  background: #8B735510;
}

@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
