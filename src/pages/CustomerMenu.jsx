import React, { useState, useMemo } from 'react';
import { useMenu } from '../context/MenuContext';
import { ShopHeader } from '../components/menu/ShopHeader';
import { CategoryNav } from '../components/menu/CategoryNav';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { MenuSearchFilter } from '../components/menu/MenuSearchFilter';
import { DishDetailModal } from '../components/menu/DishDetailModal';
import { TableTrayBar } from '../components/menu/TableTrayBar';
import { Utensils, MapPin, Clock, Phone, ExternalLink, Sparkles } from 'lucide-react';

export const CustomerMenu = () => {
  const { shopSettings, categories, items } = useMenu();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [popularOnlyFilter, setPopularOnlyFilter] = useState(false);

  // Dish Detail Modal
  const [spotlightDish, setSpotlightDish] = useState(null);

  // Table Tray / Order Slip state
  const [trayItems, setTrayItems] = useState([]);

  const handleAddToTray = (dish) => {
    setTrayItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) => (i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const handleUpdateTrayQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      setTrayItems((prev) => prev.filter((i) => i.id !== dishId));
    } else {
      setTrayItems((prev) =>
        prev.map((i) => (i.id === dishId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== 'all' && item.categoryId !== activeCategory) {
        return false;
      }
      if (vegOnlyFilter && !item.isVeg) {
        return false;
      }
      if (popularOnlyFilter && !item.isPopular) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [items, activeCategory, vegOnlyFilter, popularOnlyFilter, searchQuery]);

  // Group items by category
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
    <div className="min-h-screen bg-cream text-charcoal flex flex-col justify-between selection:bg-forest selection:text-cream ambient-bg relative pb-20">
      {/* Decorative ambient glowing orbs */}
      <div className="fixed top-20 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* 1. Restaurant Hero Header */}
        <ShopHeader shopSettings={shopSettings} />

        {/* 2. Instant Search & Quick Chips */}
        <MenuSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vegOnlyFilter={vegOnlyFilter}
          onVegOnlyToggle={() => setVegOnlyFilter((v) => !v)}
          popularOnlyFilter={popularOnlyFilter}
          onPopularOnlyToggle={() => setPopularOnlyFilter((p) => !p)}
        />

        {/* 3. Horizontal Sticky Category Bar */}
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 4. Menu Items Section */}
        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
          {filteredItems.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 text-center border border-cream-dark mt-4 shadow-card max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cream text-sage flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">No dishes found</h3>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed font-sans">
                Try searching with different keywords or clear your active filters.
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
                  Show All Dishes
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {categorizedSections.map(({ category, items }) => (
                <section key={category.id} className="space-y-4">
                  {/* Category Title Header */}
                  <div className="border-b border-cream-dark/80 pb-2">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest tracking-tight flex items-center gap-2.5">
                        <span>{category.name}</span>
                        <span className="text-xs font-sans font-medium text-charcoal-muted bg-white px-2.5 py-0.5 rounded-full border border-cream-dark">
                          {items.length}
                        </span>
                      </h2>
                    </div>
                    {category.description && (
                      <p className="text-xs text-charcoal-muted mt-1 font-sans">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Responsive Grid: 1 col on mobile, 2 cols on tablet/desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                    {items.map((item) => {
                      const isAdded = trayItems.some((i) => i.id === item.id);
                      return (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          currency={shopSettings.currency || '₹'}
                          onSelectDish={setSpotlightDish}
                          onAddToTray={handleAddToTray}
                          isAdded={isAdded}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 5. Minimal Restaurant Footer */}
      <footer className="mt-16 bg-cream-light/90 border-t border-cream-dark/80 py-12 px-4 text-center relative z-10">
        <div className="max-w-xl mx-auto space-y-4 font-sans">
          <div>
            <h3 className="font-serif text-2xl font-bold text-forest">
              {shopSettings.name}
            </h3>
            {shopSettings.tagline && (
              <p className="text-xs text-charcoal-muted italic font-serif mt-0.5">
                {shopSettings.tagline}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-1.5 text-xs text-charcoal-muted">
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

          {shopSettings.location && (
            <div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(shopSettings.location)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-gold transition-colors underline underline-offset-4"
              >
                <span>Find Us on Google Maps</span>
                <ExternalLink className="w-3 h-3 text-gold" />
              </a>
            </div>
          )}

          <div className="pt-4 border-t border-cream-dark/60 text-[11px] text-charcoal-muted flex items-center justify-center gap-1 font-serif italic">
            <span>Thank you for dining with us.</span>
          </div>
        </div>
      </footer>

      {/* 6. Interactive Dish Spotlight Modal */}
      <DishDetailModal
        dish={spotlightDish}
        currency={shopSettings.currency || '₹'}
        isOpen={!!spotlightDish}
        onClose={() => setSpotlightDish(null)}
        onAddToTray={handleAddToTray}
        isAdded={trayItems.some((i) => i.id === spotlightDish?.id)}
      />

      {/* 7. Floating Guest Table Selection Tray */}
      <TableTrayBar
        trayItems={trayItems}
        currency={shopSettings.currency || '₹'}
        onUpdateQuantity={handleUpdateTrayQuantity}
        onClearTray={handleClearTray}
      />
    </div>
  );
};
