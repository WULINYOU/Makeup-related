<script setup>
const brands = [
  'nike', 'louis vuitton', 'ralph lauren', 'stone island', 'moncler',
  'amiri', 'burberry', 'dior', 'gucci', 'palm angels',
  'bape', 'corteiz', 'trapstar', 'ami', 'kenzo',
  'off white', 'stussy', 'canada goose', 'chrome hearts', 'denim tears',
  'gallery dept', 'hellstar', 'supreme', 'syna world', 'adidas',
  'air jordan', 'cp company', 'eric emanuel', 'essentials', 'evisu',
  'sp5der', 'the north face', 'under armour', 'ysl', '6pm',
  'broken planet', 'carhartt', 'celine'
]

const link = 'https://docs.google.com/spreadsheets/d/1Vs190yOAkrQ04LQb6l_Lnr_oTA0ny4CI3PJ_0B4_6zs/edit?gid=1903531254#gid=1903531254'

const handleClick = () => {
  window.open(link, '_blank')
}
</script>

<template>
  <div class="left-marquee-container" @click="handleClick" title="Click to view brand spreadsheet">
    <div class="left-marquee-title">Brands</div>
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
