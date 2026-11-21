import React from 'react';
import { DietaryBadge } from './DietaryBadge';
import { Sparkles, Plus, Check } from 'lucide-react';

export const MenuItemCard = ({
  item,
  currency = '₹',
  onSelectDish,
  onAddToTray,
  isAdded = false,
}) => {
  return (
    <article
      onClick={() => onSelectDish && onSelectDish(item)}
      className={`group relative flex items-stretch justify-between p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border menu-card-transition cursor-pointer shadow-card select-none ${
        item.isAvailable
          ? 'border-cream-dark/70 hover:border-gold/60 hover:shadow-card-hover'
          : 'border-cream-dark/40 bg-white/60 opacity-65'
      }`}
    >
      {/* Left Column: Dish details */}
      <div className="flex-1 flex flex-col justify-between pr-3 sm:pr-4 min-w-0">
        <div>
          {/* Header row: dietary badge & title */}
          <div className="flex items-start gap-1.5 mb-1">
            <div className="mt-1 shrink-0">
              <DietaryBadge isVeg={item.isVeg} size="sm" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif font-bold text-forest text-base sm:text-lg leading-snug group-hover:text-forest-light transition-colors">
                {item.name}
              </h3>
            </div>
          </div>

          {/* Appetizing editorial description */}
          {item.description && (
            <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed mt-1 font-sans font-normal">
              {item.description}
            </p>
          )}

          {/* Quick Flavor Chips on Card */}
          {item.flavorNotes && item.flavorNotes.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
              <span className="text-[10px] text-charcoal-muted/80 bg-cream-muted px-2 py-0.5 rounded-md truncate font-sans">
                {item.flavorNotes[0]}
              </span>
              {item.prepTime && (
                <span className="text-[10px] text-sage-dark bg-sage/10 px-2 py-0.5 rounded-md truncate font-sans">
                  ⏱️ {item.prepTime}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom row: Price & Quick Tray Action */}
        <div className="mt-3.5 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-forest tracking-tight font-serif">
              {currency}{item.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!item.isAvailable ? (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Sold Out
              </span>
            ) : (
              <>
                {item.isPopular && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-md flex items-center gap-1 border border-gold/30">
                    <Sparkles className="w-2.5 h-2.5 text-gold" />
                    <span>Bestseller</span>
                  </span>
                )}

                {/* Quick Add To Table Tray Button */}
                {onAddToTray && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToTray(item);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isAdded
                        ? 'bg-emerald-800 text-cream shadow-xs'
                        : 'bg-forest/10 hover:bg-forest text-forest hover:text-cream border border-forest/20'
                    }`}
                    title="Add to table selection"
                    aria-label="Add to table selection"
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Food Image */}
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-cream border border-cream-dark/60 shadow-xs">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            item.isAvailable ? 'group-hover:scale-108' : 'grayscale contrast-75'
          }`}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80';
          }}
        />

        {/* Sold out overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-[1px] flex items-center justify-center p-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-cream bg-black/70 px-2 py-0.5 rounded">
              Sold Out
            </span>
          </div>
        )}
      </div>
    </article>
  );
};
