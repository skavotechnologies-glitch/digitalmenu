import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export const MenuSearchFilter = ({
  searchQuery,
  onSearchChange,
  vegOnlyFilter,
  onVegOnlyToggle,
  popularOnlyFilter,
  onPopularOnlyToggle,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-4 pb-2 sm:px-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
          <Search className="w-4 h-4 text-sage" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your favorite items..."
          className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-cream-dark/90 text-sm text-charcoal placeholder:text-charcoal-muted/70 focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest transition-all shadow-subtle"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-muted hover:text-charcoal"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-2 mt-2.5 overflow-x-auto no-scrollbar">
        <button
          onClick={onVegOnlyToggle}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            vegOnlyFilter
              ? 'bg-emerald-900 text-cream shadow-xs'
              : 'bg-white/80 text-charcoal-muted border border-cream-dark hover:bg-white hover:text-charcoal'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 ring-1 ring-white" />
          <span>Vegetarian Only</span>
        </button>

        <button
          onClick={onPopularOnlyToggle}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            popularOnlyFilter
              ? 'bg-gold text-forest-dark shadow-xs font-semibold'
              : 'bg-white/80 text-charcoal-muted border border-cream-dark hover:bg-white hover:text-charcoal'
          }`}
        >
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Bestsellers</span>
        </button>
      </div>
    </div>
  );
};
