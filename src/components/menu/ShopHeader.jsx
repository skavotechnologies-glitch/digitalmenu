import React from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';

export const ShopHeader = ({ shopSettings }) => {
  return (
    <header className="relative bg-cream-light border-b border-cream-dark/60">
      {/* Delicate top gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

      <div className="max-w-4xl mx-auto px-4 pt-6 pb-5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            {/* Minimal Circular Logo */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-cream p-0.5 border border-gold/40 shadow-subtle ring-4 ring-cream">
                <img
                  src={shopSettings.logo}
                  alt={shopSettings.name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              </div>
            </div>

            {/* Typography */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-gold font-sans">
                  Café & Kitchen
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-700/60" />
                <span className="text-[10px] uppercase tracking-wider font-medium text-emerald-800">
                  Open Today
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest tracking-tight leading-tight mt-0.5">
                {shopSettings.name}
              </h1>
              {shopSettings.tagline && (
                <p className="text-xs sm:text-sm text-charcoal-muted italic font-serif mt-0.5">
                  {shopSettings.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Location & Contact Meta */}
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-y-1.5 gap-x-4 text-xs text-charcoal-muted pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-dark/50">
            {shopSettings.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sage shrink-0" />
                <span className="truncate max-w-xs">{shopSettings.location}</span>
              </div>
            )}
            {shopSettings.hours && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>{shopSettings.hours}</span>
              </div>
            )}
            {shopSettings.phone && (
              <a 
                href={`tel:${shopSettings.phone}`}
                className="inline-flex items-center gap-1.5 text-forest font-medium hover:text-gold transition-colors"
              >
                <Phone className="w-3 h-3 text-gold shrink-0" />
                <span>{shopSettings.phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Short Editorial Bio */}
        {shopSettings.description && (
          <p className="mt-4 text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans max-w-2xl border-l-2 border-gold/40 pl-3 italic">
            "{shopSettings.description}"
          </p>
        )}
      </div>
    </header>
  );
};
