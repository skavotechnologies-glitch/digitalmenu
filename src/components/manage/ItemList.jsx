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
      <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 shadow-2xs">
        <p className="text-sm font-bold text-stone-700">No menu items match your search or filter.</p>
        <p className="text-xs text-stone-400 mt-1">Click "Add Menu Item" to create one.</p>
      </div>
    );
  }

  // Helper to get category name
  const getCategoryName = (catId) => {
    return categories.find(c => c.id === catId)?.name || 'General';
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border transition-all duration-200 shadow-2xs ${
            item.isAvailable ? 'border-stone-200/90 hover:border-stone-300' : 'border-rose-200 bg-rose-50/30'
          }`}
        >
          {/* Left: Thumbnail & Details */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="relative shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80">
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
                  <span className="text-[9px] font-black uppercase text-rose-300">Sold Out</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <DietaryBadge isVeg={item.isVeg} size="sm" />
                <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-tight truncate">
                  {item.name}
                </h3>
                <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                  {getCategoryName(item.categoryId)}
                </span>
                {item.isPopular && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-800" />
                    Must Try
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                  {item.description}
                </p>
              )}

              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-stone-900">
                  {currency}{item.price}
                </span>
                <span className="text-stone-300">•</span>
                <span className={`text-[11px] font-bold ${item.isAvailable ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {item.isAvailable ? 'Available' : 'Sold Out'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Actions & Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 shrink-0">
            {/* Quick Available / Sold Out Toggle Button */}
            <button
              onClick={() => onToggleAvailability(item.id)}
              title={item.isAvailable ? 'Mark as Sold Out' : 'Mark as Available'}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                item.isAvailable
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200'
              }`}
            >
              {item.isAvailable ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>In Stock</span>
                </>
              ) : (
                <>
                  <Ban className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sold Out</span>
                </>
              )}
            </button>

            {/* Quick Popular Star Toggle */}
            <button
              onClick={() => onTogglePopular(item.id)}
              title={item.isPopular ? 'Remove Bestseller badge' : 'Mark as Bestseller'}
              className={`p-2 rounded-xl border transition-all ${
                item.isPopular
                  ? 'bg-amber-100 border-amber-300 text-amber-700'
                  : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-100'
              }`}
              aria-label="Toggle popular"
            >
              <Star className={`w-4 h-4 ${item.isPopular ? 'fill-amber-500 text-amber-600' : ''}`} />
            </button>

            {/* Reorder Buttons */}
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
              <button
                onClick={() => onMoveItem(item.id, 'up')}
                disabled={index === 0}
                className="p-1.5 hover:bg-stone-200 text-stone-500 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Move Up"
                aria-label="Move item up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onMoveItem(item.id, 'down')}
                disabled={index === items.length - 1}
                className="p-1.5 hover:bg-stone-200 text-stone-500 disabled:opacity-30 disabled:pointer-events-none transition-colors border-l border-stone-200"
                title="Move Down"
                aria-label="Move item down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => onEditItem(item)}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title="Edit Item Details"
              aria-label="Edit item"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDeleteItem(item)}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
              title="Delete Item"
              aria-label="Delete item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
