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
      aria-label="Menu categories"
      className="sticky top-0 z-20 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 py-2.5 px-4 shadow-2xs"
    >
      <div className="max-w-2xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
            activeCategory === 'all'
              ? 'text-white shadow-sm scale-102'
              : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-100 hover:text-stone-900'
          }`}
          style={
            activeCategory === 'all'
              ? { backgroundColor: 'var(--color-brand-primary)' }
              : undefined
          }
        >
          <span>All Items</span>
        </button>

        {categories.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || Utensils;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'text-white shadow-sm scale-102'
                  : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-100 hover:text-stone-900'
              }`}
              style={
                isActive
                  ? { backgroundColor: 'var(--color-brand-primary)' }
                  : undefined
              }
            >
              <IconComp className="w-3.5 h-3.5 opacity-90" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
