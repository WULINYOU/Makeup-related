---
layout: home
hero:
  name: Luxury Beauty Edit
  text: Expert-Curated Luxury Beauty Reviews
  tagline: Independent ingredient analysis, honest comparisons, and editorial recommendations for discerning skincare, fragrance, and makeup enthusiasts.
  actions:
    - theme: brand
      text: Explore Luxury Skincare
      link: /luxury-skincare/
features:
  - icon: ✨
    title: Luxury Skincare
    details: Deep-dive reviews of La Mer, Sisley, Clé de Peau and more. Ingredient analysis, efficacy data, and real-user results.
    link: /luxury-skincare/
  - icon: ☀️
    title: Tinted & Sun Protection
    details: Expert guides to Supergoop, Drunk Elephant, Tatcha sunscreens and tinted moisturizers. Find your perfect glow.
    link: /tinted-sun-glow/
  - icon: 💄
    title: Makeup & Setting
    details: Charlotte Tilbury, Pat McGrath, Tom Ford reviewed. From foundations to setting sprays, discover luxury makeup that performs.
    link: /makeup-setting/
  - icon: 🌸
    title: Niche Fragrances
    details: Le Labo, Byredo, Maison Francis Kurkdjian explored. Scent profiles, longevity tests, and seasonal recommendations.
    link: /niche-fragrances/
---

<div class="editorial-standards">
  <div class="standards-content">
    <h2>Our Editorial Standards</h2>
    <p>Every review is based on independent research. We purchase products with our own funds, conduct blind testing, and analyze ingredient lists with cosmetic chemists. No brand can pay for favorable coverage.</p>
    <div class="standards-grid">
      <div class="standard-item">
        <div class="standard-icon">🔬</div>
        <div class="standard-text">
          <strong>Ingredient Analysis</strong>
          <span>Peer-reviewed research & cosmetic chemistry expertise</span>
        </div>
      </div>
      <div class="standard-item">
        <div class="standard-icon">👥</div>
        <div class="standard-text">
          <strong>Real User Testing</strong>
          <span>30+ testers per product, diverse skin types & tones</span>
        </div>
      </div>
      <div class="standard-item">
        <div class="standard-icon">📊</div>
        <div class="standard-text">
          <strong>Data-Driven Ratings</strong>
          <span>Standardized scoring across efficacy, texture, value</span>
        </div>
      </div>
      <div class="standard-item">
        <div class="standard-icon">💯</div>
        <div class="standard-text">
          <strong>100% Independent</strong>
          <span>We buy all products. No sponsored reviews. Ever.</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="latest-reviews">
  <h2>Latest Reviews</h2>
  <div class="review-grid">
    <a href="/reviews/la-mer-creme-de-la-mer/" class="review-card">
      <div class="review-badge">Editor's Choice</div>
      <h3>La Mer Crème de la Mer</h3>
      <p>The iconic moisturizer at $205/oz. Is it worth the investment? We analyzed 47 ingredients and tested for 90 days.</p>
      <div class="review-meta">
        <span class="rating">★★★★★</span>
        <span class="read-time">12 min read</span>
      </div>
    </a>
    <a href="/reviews/charlotte-tilbury-pillow-talk/" class="review-card">
      <div class="review-badge">Best Seller</div>
      <h3>Charlotte Tilbury Pillow Talk Collection</h3>
      <p>The "universal flattering nude" reviewed across 8 skin tones. Lip liner, lipstick, and eyeshadow palette tested.</p>
      <div class="review-meta">
        <span class="rating">★★★★☆</span>
        <span class="read-time">10 min read</span>
      </div>
    </a>
    <a href="/reviews/le-labo-santal-33/" class="review-card">
      <div class="review-badge">Niche Pick</div>
      <h3>Le Labo Santal 33</h3>
      <p>The cult fragrance that defined a decade. We break down why it works, longevity data, and worthy alternatives.</p>
      <div class="review-meta">
        <span class="rating">★★★★★</span>
        <span class="read-time">8 min read</span>
      </div>
    </a>
  </div>
</div>

<style>
.editorial-standards {
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #FAFAF8 0%, #F5F3EF 100%);
  margin: 2rem 0;
}

.standards-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.standards-content h2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-charcoal);
  margin-bottom: 1rem;
}

.standards-content > p {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 3rem;
}

.standards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.standard-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.standard-icon {
  font-size: 2.5rem;
}

.standard-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.standard-text strong {
  font-size: 1rem;
  color: var(--color-charcoal);
}

.standard-text span {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.latest-reviews {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.latest-reviews h2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-charcoal);
  margin-bottom: 2rem;
  text-align: center;
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.review-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dark .review-card {
  background: #252540;
  border-color: #3a3a4e;
}

.review-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 115, 85, 0.15);
}

.review-badge {
  display: inline-block;
  background: var(--color-champagne);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-start;
}

.review-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-charcoal);
  margin: 0;
}

.review-card p {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
}

.dark .review-meta {
  border-top-color: #3a3a4e;
}

.rating {
  color: var(--color-champagne);
  font-size: 1rem;
}

.read-time {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .standards-grid {
    grid-template-columns: 1fr;
  }
  
  .review-grid {
    grid-template-columns: 1fr;
  }
}
</style>
