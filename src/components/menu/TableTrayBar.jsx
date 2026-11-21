import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { DietaryBadge } from './DietaryBadge';

export const TableTrayBar = ({
  trayItems = [],
  currency = '₹',
  onUpdateQuantity,
  onClearTray,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalCount = trayItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = trayItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-4 inset-x-0 z-40 px-4 max-w-md mx-auto pointer-events-none animate-in slide-in-from-bottom duration-300 font-sans">
        <div className="pointer-events-auto bg-forest text-cream rounded-2xl p-3.5 shadow-glass-hover border border-gold/40 backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold text-forest-dark font-bold text-[10px] flex items-center justify-center shadow-xs">
                {totalCount}
              </span>
            </div>
            <div>
              <p className="text-xs text-cream/70 font-medium">My Table Selection</p>
              <p className="font-serif text-base font-bold text-cream tracking-tight">
                {currency}{totalPrice} <span className="text-xs font-sans font-normal text-cream/70">({totalCount} items)</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-forest-dark font-semibold text-xs tracking-wide shadow-sm transition-all"
          >
            Review Slip
          </button>
        </div>
      </div>

      {/* Expanded Table Slip Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-cream-light rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-cream-dark/80 max-h-[85vh] flex flex-col font-sans animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-cream-dark">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gold font-sans">
                  Table Order Slip
                </span>
                <h3 className="font-serif text-xl font-bold text-forest">
                  Your Selections
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-xl hover:bg-cream-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Chosen Dishes */}
            <div className="overflow-y-auto py-3 space-y-2.5 max-h-72">
              {trayItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-white border border-cream-dark flex items-center justify-between gap-3 shadow-subtle"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <DietaryBadge isVeg={item.isVeg} size="sm" />
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-forest text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-charcoal-muted font-sans">
                        {currency}{item.price} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-cream-dark rounded-xl bg-cream-light overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-cream-muted text-charcoal transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-forest font-serif">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-cream-muted text-charcoal transition-colors border-l border-cream-dark"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-serif font-bold text-forest text-sm min-w-[50px] text-right">
                      {currency}{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Waiter Instructions */}
            <div className="pt-4 border-t border-cream-dark space-y-3 shrink-0">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-charcoal-muted uppercase tracking-wider font-semibold">
                  Estimated Total:
                </span>
                <span className="font-serif text-2xl font-bold text-forest">
                  {currency}{totalPrice}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-forest/5 border border-forest/15 text-xs text-charcoal-muted flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  Show this slip to your server or counter to place your table order directly!
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  onClick={onClearTray}
                  className="px-3.5 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-cream bg-forest hover:bg-forest-light shadow-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
