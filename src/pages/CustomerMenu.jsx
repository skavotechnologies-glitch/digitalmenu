import React, { useState, useMemo } from 'react';
import { useMenu } from '../context/MenuContext';
import { ShopHeader } from '../components/menu/ShopHeader';
import { CategoryNav } from '../components/menu/CategoryNav';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { MenuSearchFilter } from '../components/menu/MenuSearchFilter';
import { Utensils, MapPin, Clock, Phone, ExternalLink, Heart } from 'lucide-react';

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
    <div className="min-h-screen bg-cream text-charcoal flex flex-col justify-between selection:bg-forest selection:text-cream">
      <div>
        {/* 1. Restaurant Header */}
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

        {/* 3. Category Horizontal Sticky Bar */}
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 4. Menu Items Section */}
        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-cream-dark/60 mt-4 shadow-card max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cream-muted text-sage flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">No items found</h3>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                We couldn't find anything matching your search. Please adjust your keywords or clear active filters.
              </p>
              {(searchQuery || vegOnlyFilter || popularOnlyFilter || activeCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setVegOnlyFilter(false);
                    setPopularOnlyFilter(false);
                    setActiveCategory('all');
                  }}
                  className="mt-5 px-5 py-2.5 rounded-full text-xs font-semibold text-cream bg-forest hover:bg-forest-light transition-colors"
                >
                  View Full Menu
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {categorizedSections.map(({ category, items }) => (
                <section key={category.id} className="space-y-4">
                  {/* Category Title Header */}
                  <div className="border-b border-cream-dark pb-2">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest tracking-tight flex items-center gap-2.5">
                        <span>{category.name}</span>
                        <span className="text-xs font-sans font-medium text-charcoal-muted/70 bg-cream-muted px-2 py-0.5 rounded-full">
                          {items.length}
                        </span>
                      </h2>
                    </div>
                    {category.description && (
                      <p className="text-xs text-charcoal-muted mt-0.5 font-sans">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
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
      </div>

      {/* 5. Minimal Elegant Restaurant Footer */}
      <footer className="mt-16 bg-cream-light border-t border-cream-dark/60 py-10 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-forest">
              {shopSettings.name}
            </h3>
            {shopSettings.tagline && (
              <p className="text-xs text-charcoal-muted italic font-serif mt-0.5">
                {shopSettings.tagline}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-1.5 text-xs text-charcoal-muted font-sans">
            {shopSettings.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>{shopSettings.location}</span>
              </div>
            )}
            {shopSettings.hours && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>{shopSettings.hours}</span>
              </div>
            )}
            {shopSettings.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>{shopSettings.phone}</span>
              </div>
            )}
          </div>

          {/* Google Maps Link */}
          {shopSettings.location && (
            <div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(shopSettings.location)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:text-gold transition-colors underline underline-offset-4"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <div className="pt-4 border-t border-cream-dark/40 text-[11px] text-charcoal-muted/80 flex items-center justify-center gap-1">
            <span>Thank you for dining with us.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
