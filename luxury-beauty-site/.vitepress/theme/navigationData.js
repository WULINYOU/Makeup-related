// Navigation data for loop circuit pattern
// Structure: Homepage → Category → Articles (loop) → Homepage

export const navigationData = {
  'luxury-skincare': {
    category: 'Luxury Skincare',
    categoryPath: '/luxury-skincare/',
    articles: [
      {
        title: 'Augustinus Bader The Rich Cream',
        path: '/luxury-skincare/augustinus-bader-the-rich-cream-review',
        type: 'review'
      },
      {
        title: 'La Prairie Skin Caviar Liquid Lift',
        path: '/luxury-skincare/la-prairie-skin-caviar-liquid-lift-review',
        type: 'review'
      },
      {
        title: 'Youth To The People Superberry Dream Mask',
        path: '/luxury-skincare/youth-to-the-people-superberry-dream-mask-review',
        type: 'review'
      },
      {
        title: 'Tatcha Travel Essentials Set',
        path: '/luxury-skincare/tatcha-travel-essentials-set-review',
        type: 'review'
      },
      {
        title: 'La Mer Crème de la Mer',
        path: '/reviews/la-mer-creme-de-la-mer',
        type: 'review'
      },
      {
        title: 'Augustinus Bader vs La Prairie',
        path: '/luxury-skincare/augustinus-bader-vs-la-prairie-liquid-lift',
        type: 'comparison'
      },
      {
        title: 'Best Luxury Face Creams for Mature Skin',
        path: '/luxury-skincare/best-luxury-face-cream-mature-skin',
        type: 'listicle'
      }
    ]
  },
  'tinted-sun-glow': {
    category: 'Tinted & Sun Protection',
    categoryPath: '/tinted-sun-glow/',
    articles: [
      {
        title: 'Drunk Elephant D-Bronzi Sunshine Drops',
        path: '/tinted-sun-glow/drunk-elephant-d-bronzi-sunshine-drops-review',
        type: 'review'
      }
    ]
  },
  'makeup-setting': {
    category: 'Makeup & Setting',
    categoryPath: '/makeup-setting/',
    articles: [
      {
        title: 'Charlotte Tilbury Airbrush Setting Spray',
        path: '/makeup-setting/charlotte-tilbury-airbrush-setting-spray-review',
        type: 'review'
      },
      {
        title: 'Charlotte Tilbury Pillow Talk Collection',
        path: '/reviews/charlotte-tilbury-pillow-talk',
        type: 'review'
      }
    ]
  },
  'niche-fragrances': {
    category: 'Niche Fragrances',
    categoryPath: '/niche-fragrances/',
    articles: [
      {
        title: 'MUGLER Angel Eau de Parfum Gift Set',
        path: '/niche-fragrances/mugler-angel-eau-de-parfum-gift-set-review',
        type: 'review'
      },
      {
        title: 'Maison Margiela Replica On A Date',
        path: '/niche-fragrances/maison-margiela-replica-on-a-date-review',
        type: 'review'
      },
      {
        title: 'Le Labo Santal 33',
        path: '/reviews/le-labo-santal-33',
        type: 'review'
      }
    ]
  }
}

// Helper function to get navigation context for an article
export function getNavigationContext(currentPath) {
  // Find which category the current page belongs to
  for (const [categoryKey, categoryData] of Object.entries(navigationData)) {
    const articleIndex = categoryData.articles.findIndex(article => 
      article.path === currentPath || currentPath.startsWith(article.path)
    )
    
    if (articleIndex !== -1) {
      const articles = categoryData.articles
      const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null
      const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null
      
      return {
        category: categoryData.category,
        categoryPath: categoryData.categoryPath,
        currentArticle: articles[articleIndex],
        prevArticle,
        nextArticle,
        isFirst: articleIndex === 0,
        isLast: articleIndex === articles.length - 1,
        totalArticles: articles.length,
        currentIndex: articleIndex
      }
    }
  }
  
  return null
}
