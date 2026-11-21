import React from 'react';
import { DietaryBadge } from './DietaryBadge';
import { Sparkles } from 'lucide-react';

export const MenuItemCard = ({ item, currency = '₹' }) => {
  return (
    <article
      className={`group relative flex items-stretch justify-between p-3.5 sm:p-4 rounded-2xl bg-white border menu-card-transition shadow-card ${
        item.isAvailable
          ? 'border-cream-dark/60 hover:border-gold/50 hover:shadow-card-hover'
          : 'border-cream-dark/40 bg-white/70 opacity-70'
      }`}
    >
      {/* Left Column: Details, Dietary Badge & Price */}
      <div className="flex-1 flex flex-col justify-between pr-3.5 sm:pr-4 min-w-0">
        <div>
          {/* Dietary indicator & Name */}
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
        </div>

        {/* Bottom: Price & Badges */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-baseline">
            <span className="text-base sm:text-lg font-bold text-forest tracking-tight font-serif">
              {currency}{item.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {!item.isAvailable ? (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Sold Out
              </span>
            ) : (
              item.isPopular && (
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-gold" />
                  <span>Bestseller</span>
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Food Image */}
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-cream border border-cream-dark/50">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            item.isAvailable ? 'group-hover:scale-105' : 'grayscale contrast-75'
          }`}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80';
          }}
        />

        {/* Subtle Sold Out overlay badge on image */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[1px] flex items-center justify-center p-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-cream bg-black/60 px-2 py-0.5 rounded">
              Sold Out
            </span>
          </div>
        )}
      </div>
    </article>
  );
};
