import React from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';

export const ShopHeader = ({ shopSettings }) => {
  return (
    <header className="relative bg-white border-b border-stone-200/80 shadow-xs">
      {/* Decorative top accent banner */}
      <div 
        className="h-2.5 w-full"
        style={{ backgroundColor: 'var(--color-brand-primary)' }}
      />

      <div className="max-w-2xl mx-auto px-4 pt-5 pb-5 sm:px-6">
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Shop Logo / Avatar */}
          <div className="relative shrink-0">
            <img
              src={shopSettings.logo}
              alt={shopSettings.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-white ring-1 ring-stone-200"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80';
              }}
            />
            <span 
              className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-md text-white shadow-xs"
              style={{ backgroundColor: 'var(--color-brand-primary)' }}
            >
              Open
            </span>
          </div>

          {/* Shop Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-tight truncate">
                {shopSettings.name}
              </h1>
            </div>

            {shopSettings.tagline && (
              <p className="text-xs sm:text-sm font-medium text-stone-600 line-clamp-1 mt-0.5">
                {shopSettings.tagline}
              </p>
            )}

            {/* Quick meta details */}
            <div className="mt-2.5 flex flex-col gap-1 text-xs text-stone-500">
              {shopSettings.location && (
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{shopSettings.location}</span>
                </div>
              )}
              {shopSettings.hours && (
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{shopSettings.hours}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Short Shop Bio */}
        {shopSettings.description && (
          <p className="mt-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/80 p-2.5 rounded-xl border border-stone-100">
            {shopSettings.description}
          </p>
        )}
      </div>
    </header>
  );
};
