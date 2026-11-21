import React from 'react';
import { DietaryBadge } from './DietaryBadge';
import { Star, Ban } from 'lucide-react';

export const MenuItemCard = ({ item, currency = '₹' }) => {
  return (
    <article
      className={`relative flex gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white border transition-all duration-200 shadow-2xs ${
        item.isAvailable
          ? 'border-stone-200/90 hover:border-stone-300 hover:shadow-xs'
          : 'border-stone-200 bg-stone-50/70 opacity-75'
      }`}
    >
      {/* Item Image with Badges */}
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            item.isAvailable ? 'group-hover:scale-105' : 'grayscale contrast-75'
          }`}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80';
          }}
        />

        {/* Sold Out Overlay Badge */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-1">
            <Ban className="w-5 h-5 text-rose-400 mb-0.5" />
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-200">
              Sold Out
            </span>
          </div>
        )}

        {/* Popular Badge */}
        {item.isPopular && item.isAvailable && (
          <div 
            className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1 shadow-sm"
            style={{ backgroundColor: 'var(--color-brand-badge)' }}
          >
            <Star className="w-2.5 h-2.5 fill-amber-950 text-amber-950" />
            <span>Must Try</span>
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <DietaryBadge isVeg={item.isVeg} size="sm" />
              <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug truncate">
                {item.name}
              </h3>
            </div>
          </div>

          {item.description && (
            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Price and Availability tag */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-baseline gap-0.5">
            <span 
              className="text-base sm:text-lg font-black tracking-tight"
              style={{ color: item.isAvailable ? 'var(--color-brand-primary)' : '#78716c' }}
            >
              {currency}{item.price}
            </span>
          </div>

          {!item.isAvailable ? (
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Unavailable today
            </span>
          ) : (
            item.isPopular && (
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Bestseller
              </span>
            )
          )}
        </div>
      </div>
    </article>
  );
};
