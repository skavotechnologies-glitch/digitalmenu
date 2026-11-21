import React from 'react';
import { Search, X, Sparkles, Filter } from 'lucide-react';

export const MenuSearchFilter = ({
  searchQuery,
  onSearchChange,
  vegOnlyFilter,
  onVegOnlyToggle,
  popularOnlyFilter,
  onPopularOnlyToggle,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-3 sm:px-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tea, filter coffee, juice, puff, samosa..."
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-stone-200/90 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
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
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            vegOnlyFilter
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
          <span>Pure Veg</span>
        </button>

        <button
          onClick={onPopularOnlyToggle}
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            popularOnlyFilter
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Bestsellers Only</span>
        </button>
      </div>
    </div>
  );
};
