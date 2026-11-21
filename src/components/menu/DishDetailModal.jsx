import React from 'react';
import { X, Clock, Flame, Sparkles, Plus, Check, Thermometer } from 'lucide-react';
import { DietaryBadge } from './DietaryBadge';

export const DishDetailModal = ({
  dish,
  currency = '₹',
  isOpen,
  onClose,
  onAddToTray,
  isAdded = false,
}) => {
  if (!isOpen || !dish) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-cream-light rounded-t-3xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cream-dark/60 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[90vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Large Food Photography with Badges */}
        <div className="relative w-full h-56 sm:h-64 bg-cream overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-charcoal/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-charcoal transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Hero */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {dish.isPopular && (
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-gold-dark bg-cream/95 backdrop-blur-md shadow-sm border border-gold/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Chef Bestseller</span>
              </span>
            )}
            {!dish.isAvailable && (
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-rose-800 bg-rose-50/95 backdrop-blur-md shadow-sm border border-rose-200 uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <DietaryBadge isVeg={dish.isVeg} size="md" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-sage-dark font-sans">
                {dish.isVeg ? 'Pure Vegetarian' : 'Contains Farm Egg'}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-tight">
              {dish.name}
            </h2>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-forest">
                {currency}{dish.price}
              </span>
              <span className="text-xs text-charcoal-muted">Inclusive of all taxes</span>
            </div>
          </div>

          {/* Appetizing Story & Description */}
          <p className="text-sm text-charcoal-muted leading-relaxed font-sans">
            {dish.description}
          </p>

          {/* Culinary Attributes Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            {dish.prepTime && (
              <div className="p-2.5 rounded-xl bg-white border border-cream-dark/70 text-center">
                <Clock className="w-4 h-4 mx-auto text-sage mb-1" />
                <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block">Prep Time</span>
                <span className="text-xs font-semibold text-forest">{dish.prepTime}</span>
              </div>
            )}
            {dish.temperature && (
              <div className="p-2.5 rounded-xl bg-white border border-cream-dark/70 text-center">
                <Thermometer className="w-4 h-4 mx-auto text-gold mb-1" />
                <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block">Served</span>
                <span className="text-xs font-semibold text-forest">{dish.temperature}</span>
              </div>
            )}
            {dish.calories && (
              <div className="p-2.5 rounded-xl bg-white border border-cream-dark/70 text-center">
                <Flame className="w-4 h-4 mx-auto text-amber-700 mb-1" />
                <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block">Energy</span>
                <span className="text-xs font-semibold text-forest">{dish.calories}</span>
              </div>
            )}
          </div>

          {/* Flavor Notes / Ingredients Tags */}
          {dish.flavorNotes && dish.flavorNotes.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-muted block mb-2">
                Flavor Notes & Key Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.flavorNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-xs font-medium text-forest bg-forest/5 border border-forest/15"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Add to Table Selection */}
        <div className="p-4 sm:p-5 border-t border-cream-dark bg-white flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] text-charcoal-muted block">Selected Price</span>
            <span className="font-serif text-xl font-bold text-forest">
              {currency}{dish.price}
            </span>
          </div>

          <button
            onClick={() => {
              onAddToTray(dish);
              onClose();
            }}
            disabled={!dish.isAvailable}
            className={`px-6 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all ${
              !dish.isAvailable
                ? 'bg-cream-dark text-charcoal-muted cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-800 text-cream hover:bg-emerald-900'
                : 'bg-forest text-cream hover:bg-forest-light'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-gold" />
                <span>Added to Selection</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to My Selection</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
