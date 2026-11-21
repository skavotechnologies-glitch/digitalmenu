import React from 'react';
import { Edit2, Trash2, ArrowUp, ArrowDown, Star, Ban, CheckCircle2 } from 'lucide-react';
import { DietaryBadge } from '../menu/DietaryBadge';

export const ItemList = ({
  items,
  categories,
  currency = '₹',
  onEditItem,
  onDeleteItem,
  onToggleAvailability,
  onTogglePopular,
  onMoveItem,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-cream-dark/60 shadow-subtle">
        <p className="text-sm font-serif font-bold text-forest">No items found matching your filter.</p>
        <p className="text-xs text-charcoal-muted mt-1 font-sans">Tap "Add Menu Item" above to add your first dish.</p>
      </div>
    );
  }

  const getCategoryName = (catId) => {
    return categories.find(c => c.id === catId)?.name || 'General';
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border transition-all duration-200 shadow-subtle ${
            item.isAvailable ? 'border-cream-dark/70 hover:border-gold/40' : 'border-amber-200/80 bg-amber-50/20'
          }`}
        >
          {/* Left: Thumbnail & Details */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-cream border border-cream-dark/60">
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover ${!item.isAvailable ? 'grayscale contrast-75' : ''}`}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80';
                }}
              />
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-200">Sold Out</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <DietaryBadge isVeg={item.isVeg} size="sm" />
                <h3 className="font-serif font-bold text-forest text-base leading-tight truncate">
                  {item.name}
                </h3>
                <span className="text-[10px] font-medium text-charcoal-muted bg-cream-muted px-2 py-0.5 rounded-full">
                  {getCategoryName(item.categoryId)}
                </span>
                {item.isPopular && (
                  <span className="text-[10px] font-semibold text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-gold text-gold" />
                    <span>Bestseller</span>
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs text-charcoal-muted line-clamp-1 mt-1 font-sans">
                  {item.description}
                </p>
              )}

              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-serif font-bold text-forest text-sm">
                  {currency}{item.price}
                </span>
                <span className="text-cream-dark">•</span>
                <span className={`text-[11px] font-medium ${item.isAvailable ? 'text-emerald-800' : 'text-amber-900'}`}>
                  {item.isAvailable ? 'Available' : 'Sold Out'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions & Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-dark/50 shrink-0">
            {/* Quick Available / Sold Out Toggle */}
            <button
              onClick={() => onToggleAvailability(item.id)}
              title={item.isAvailable ? 'Mark as Sold Out' : 'Mark as Available'}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[40px] ${
                item.isAvailable
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100/70'
                  : 'bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200/60'
              }`}
            >
              {item.isAvailable ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>In Stock</span>
                </>
              ) : (
                <>
                  <Ban className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sold Out</span>
                </>
              )}
            </button>

            {/* Bestseller Toggle */}
            <button
              onClick={() => onTogglePopular(item.id)}
              title={item.isPopular ? 'Remove Bestseller badge' : 'Mark as Bestseller'}
              className={`p-2.5 rounded-xl border transition-all min-h-[40px] min-w-[40px] flex items-center justify-center ${
                item.isPopular
                  ? 'bg-gold/15 border-gold/40 text-gold-dark'
                  : 'bg-white border-cream-dark text-charcoal-muted hover:text-charcoal hover:bg-cream-light'
              }`}
              aria-label="Toggle popular"
            >
              <Star className={`w-4 h-4 ${item.isPopular ? 'fill-gold text-gold' : ''}`} />
            </button>

            {/* Reorder Buttons */}
            <div className="flex items-center border border-cream-dark rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => onMoveItem(item.id, 'up')}
                disabled={index === 0}
                className="p-2 hover:bg-cream-muted text-charcoal-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Move Up"
                aria-label="Move item up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onMoveItem(item.id, 'down')}
                disabled={index === items.length - 1}
                className="p-2 hover:bg-cream-muted text-charcoal-muted disabled:opacity-30 disabled:pointer-events-none transition-colors border-l border-cream-dark"
                title="Move Down"
                aria-label="Move item down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => onEditItem(item)}
              className="p-2.5 rounded-xl bg-cream-muted hover:bg-cream-dark/60 text-forest transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Edit Item Details"
              aria-label="Edit item"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDeleteItem(item)}
              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Delete Item"
              aria-label="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
