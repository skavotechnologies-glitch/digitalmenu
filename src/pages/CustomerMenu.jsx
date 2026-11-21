import React, { useState, useMemo } from 'react';
import { useMenu } from '../context/MenuContext';
import { ShopHeader } from '../components/menu/ShopHeader';
import { CategoryNav } from '../components/menu/CategoryNav';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { MenuSearchFilter } from '../components/menu/MenuSearchFilter';
import { Sparkles, Utensils, QrCode } from 'lucide-react';

export const CustomerMenu = () => {
  const { shopSettings, categories, items } = useMenu();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [popularOnlyFilter, setPopularOnlyFilter] = useState(false);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.categoryId !== activeCategory) {
        return false;
      }

      // Veg filter
      if (vegOnlyFilter && !item.isVeg) {
        return false;
      }

      // Popular filter
      if (popularOnlyFilter && !item.isPopular) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }

      return true;
    });
  }, [items, activeCategory, vegOnlyFilter, popularOnlyFilter, searchQuery]);

  // Group items by category for "all" view, or single category view
  const categorizedSections = useMemo(() => {
    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.id === activeCategory);
      return [
        {
          category: cat || { id: activeCategory, name: 'Menu Items' },
          items: filteredItems,
        },
      ];
    }

    return categories
      .map((cat) => {
        const catItems = filteredItems.filter((i) => i.categoryId === cat.id);
        return {
          category: cat,
          items: catItems,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [categories, filteredItems, activeCategory]);

  return (
    <div className="min-h-screen bg-stone-100/60 pb-16 font-sans">
      {/* 1. Shop Header */}
      <ShopHeader shopSettings={shopSettings} />

      {/* 2. Search & Quick Filters */}
      <MenuSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        vegOnlyFilter={vegOnlyFilter}
        onVegOnlyToggle={() => setVegOnlyFilter((v) => !v)}
        popularOnlyFilter={popularOnlyFilter}
        onPopularOnlyToggle={() => setPopularOnlyFilter((p) => !p)}
      />

      {/* 3. Category Horizontal Scroll Bar */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 4. Menu Items Section */}
      <main className="max-w-2xl mx-auto px-4 py-4 sm:px-6">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 mt-4 shadow-2xs">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800">No matching items found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
              Try searching for something else or clear active filters.
            </p>
            {(searchQuery || vegOnlyFilter || popularOnlyFilter || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVegOnlyFilter(false);
                  setPopularOnlyFilter(false);
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-95"
                style={{ backgroundColor: 'var(--color-brand-primary)' }}
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {categorizedSections.map(({ category, items }) => (
              <section key={category.id} className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                      <span>{category.name}</span>
                      <span className="text-xs font-bold text-stone-400 bg-stone-200/70 px-2 py-0.5 rounded-full">
                        {items.length}
                      </span>
                    </h2>
                    {category.description && (
                      <p className="text-xs text-stone-500 mt-0.5">{category.description}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      currency={shopSettings.currency || '₹'}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer Info for customers (clean, no admin links) */}
      <footer className="max-w-2xl mx-auto px-4 mt-8 text-center text-xs text-stone-600">
        <div className="flex items-center justify-center gap-1.5 mb-1.5 font-semibold text-stone-700">
          <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-primary)' }} />
          <span>Freshly Prepared Daily in Bengaluru</span>
        </div>
        <p className="text-stone-500">
          Prices are inclusive of all taxes. Contact stall counter for special custom requests.
        </p>
      </footer>
    </div>
  );
};
