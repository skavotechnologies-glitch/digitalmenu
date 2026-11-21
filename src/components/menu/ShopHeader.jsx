import React, { useState } from 'react';
import { MapPin, Clock, Phone, Wifi, Copy, Check, Sparkles, Navigation } from 'lucide-react';

export const ShopHeader = ({ shopSettings }) => {
  const [showWifi, setShowWifi] = useState(false);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const handleCopyWifi = () => {
    if (shopSettings.wifiPassword) {
      navigator.clipboard.writeText(shopSettings.wifiPassword);
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2000);
    }
  };

  return (
    <header className="relative bg-cream-light border-b border-cream-dark/70 overflow-hidden">
      {/* Decorative ambient background lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-forest/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top subtle champagne gold accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

      <div className="max-w-4xl mx-auto px-4 pt-6 pb-5 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            {/* Minimal Circular Logo */}
            <div className="relative shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-0.5 border border-gold/40 shadow-card ring-4 ring-cream/80">
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
                  Artisanal Coffee & Kitchen
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-900 font-sans">
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

          {/* Action Chips: WiFi, Call, Directions */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            {shopSettings.wifiName && (
              <button
                onClick={() => setShowWifi(true)}
                className="px-3 py-1.5 rounded-full bg-white border border-cream-dark hover:border-gold/60 text-xs font-medium text-forest flex items-center gap-1.5 shadow-subtle transition-all"
              >
                <Wifi className="w-3.5 h-3.5 text-gold" />
                <span>Guest WiFi</span>
              </button>
            )}

            {shopSettings.location && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(shopSettings.location)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-white border border-cream-dark hover:border-gold/60 text-xs font-medium text-charcoal flex items-center gap-1.5 shadow-subtle transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-sage" />
                <span>Directions</span>
              </a>
            )}

            {shopSettings.phone && (
              <a
                href={`tel:${shopSettings.phone}`}
                className="px-3 py-1.5 rounded-full bg-white border border-cream-dark hover:border-gold/60 text-xs font-medium text-charcoal flex items-center gap-1.5 shadow-subtle transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Call Desk</span>
              </a>
            )}
          </div>
        </div>

        {/* Location & Opening Meta Row */}
        <div className="mt-4 pt-3.5 border-t border-cream-dark/60 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-charcoal-muted font-sans">
          {shopSettings.location && (
            <div className="flex items-center gap-1.5 truncate max-w-md">
              <MapPin className="w-3.5 h-3.5 text-sage shrink-0" />
              <span className="truncate">{shopSettings.location}</span>
            </div>
          )}
          {shopSettings.hours && (
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5 text-sage shrink-0" />
              <span>{shopSettings.hours}</span>
            </div>
          )}
        </div>
      </div>

      {/* WiFi Popover Modal */}
      {showWifi && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowWifi(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xs w-full p-6 shadow-2xl border border-cream-dark text-center font-sans animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-gold/15 text-forest mx-auto flex items-center justify-center mb-3">
              <Wifi className="w-6 h-6 text-gold-dark" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">Complimentary Guest WiFi</h3>
            <p className="text-xs text-charcoal-muted mt-1">Connect during your dining stay</p>

            <div className="my-4 p-3 bg-cream rounded-2xl border border-cream-dark text-left space-y-1.5">
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block">Network:</span>
                <span className="text-xs font-bold text-forest">{shopSettings.wifiName}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block">Password:</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-forest">{shopSettings.wifiPassword}</span>
                  <button
                    onClick={handleCopyWifi}
                    className="p-1 text-charcoal-muted hover:text-forest"
                    title="Copy password"
                  >
                    {copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowWifi(false)}
              className="w-full py-2.5 rounded-xl bg-forest text-cream font-medium text-xs hover:bg-forest-light"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
