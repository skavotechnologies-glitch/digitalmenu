import React from 'react';
import { Coffee, Citrus, UtensilsCrossed, Utensils } from 'lucide-react';

const ICON_MAP = {
  Coffee: Coffee,
  Citrus: Citrus,
  UtensilsCrossed: UtensilsCrossed,
  Utensils: Utensils,
};

export const CategoryNav = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <nav 
      aria-label="Menu sections"
      className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-cream-dark/70 py-2.5 px-4 shadow-subtle"
    >
      <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {/* All Items Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
            activeCategory === 'all'
              ? 'bg-forest text-cream shadow-sm font-semibold'
              : 'bg-white text-charcoal border border-cream-dark/80 hover:bg-cream-light hover:border-gold/40'
          }`}
        >
          <span>All Items</span>
        </button>

        {/* Category Pills */}
        {categories.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || Utensils;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-forest text-cream shadow-sm font-semibold'
                  : 'bg-white text-charcoal border border-cream-dark/80 hover:bg-cream-light hover:border-gold/40'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-sage'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
