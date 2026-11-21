import React from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { Smartphone, Store, ArrowRight, Sparkles, Coffee } from 'lucide-react';

export const LandingPage = () => {
  const { shopSettings, stats } = useMenu();

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans flex flex-col justify-between selection:bg-forest selection:text-cream">
      {/* Editorial Top Accent */}
      <div className="w-full bg-forest py-2 px-4 text-center text-xs font-serif text-cream/90 flex items-center justify-center gap-2 border-b border-forest-light">
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span>Artisanal QR-Based Digital Menu System for Modern Restaurants & Cafés</span>
      </div>

      {/* Hero Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-20 flex-1 flex flex-col items-center justify-center text-center">
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-muted border border-cream-dark text-xs font-semibold text-forest mb-6">
          <Coffee className="w-3.5 h-3.5 text-gold" />
          <span className="font-serif tracking-wide">{shopSettings.name} • Hospitality Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest max-w-2xl leading-tight">
          Modern Digital Dining for Specialty Cafés & Bistros
        </h1>

        <p className="mt-4 text-sm sm:text-base text-charcoal-muted max-w-xl leading-relaxed font-sans">
          A mobile-first, restaurant-grade menu experience with high-resolution food photography, instant search, and real-time stock control.
        </p>

        {/* Portals Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-left">
          {/* Card 1: Customer Menu */}
          <Link
            to="/menu"
            className="group relative p-7 rounded-3xl bg-white border border-cream-dark hover:border-gold/60 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest/10 border border-forest/20 text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-cream transition-colors">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark bg-gold/15 px-2 py-0.5 rounded">
                  Route: /menu
                </span>
                <span className="text-[10px] text-charcoal-muted font-medium">Customer Facing</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-forest mt-2.5 group-hover:text-forest-light transition-colors">
                Public Guest Menu
              </h2>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                What guests see upon scanning table standees. Refined typography, dietary badges, and zero management controls.
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-semibold text-forest gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Explore Guest Menu</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </div>
          </Link>

          {/* Card 2: Owner Management */}
          <Link
            to="/manage"
            className="group relative p-7 rounded-3xl bg-white border border-cream-dark hover:border-forest/60 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sage/20 border border-sage/40 text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-cream transition-colors">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-forest bg-forest/10 px-2 py-0.5 rounded">
                  Route: /manage
                </span>
                <span className="text-[10px] text-charcoal-muted font-medium">Restaurateur</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-forest mt-2.5 group-hover:text-forest-light transition-colors">
                Manager Console
              </h2>
              <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                1-tap stock availability, instant price editing, food photography selection, and printable tabletop QR standees.
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-semibold text-forest gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Open Management Console</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </div>
          </Link>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-cream-muted border border-cream-dark/80 max-w-xl w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div>
              <p className="font-serif font-bold text-forest text-base">{stats.totalItems}</p>
              <span className="text-[11px] text-charcoal-muted">Menu Dishes</span>
            </div>
            <div>
              <p className="font-serif font-bold text-forest text-base">{stats.totalCategories}</p>
              <span className="text-[11px] text-charcoal-muted">Sections</span>
            </div>
            <div>
              <p className="font-serif font-bold text-emerald-800 text-base">Instant</p>
              <span className="text-[11px] text-charcoal-muted">Local Persistence</span>
            </div>
            <div>
              <p className="font-serif font-bold text-gold-dark text-base">Print Ready</p>
              <span className="text-[11px] text-charcoal-muted">Table Standees</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-charcoal-muted border-t border-cream-dark/60 font-sans">
        <p>Crafted for premium cafes, specialty bistros, and restaurants</p>
      </footer>
    </div>
  );
};
