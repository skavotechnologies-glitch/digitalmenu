import React from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { Smartphone, Store, QrCode, ArrowRight, Sparkles, CheckCircle2, Coffee, ShieldCheck } from 'lucide-react';

export const LandingPage = () => {
  const { shopSettings, stats } = useMenu();

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-2.5 px-4 text-center text-xs font-bold text-white shadow-md flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-200" />
        <span>QR-Based Digital Menu System for Bengaluru Tea Stalls & Cafes</span>
      </div>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-xs font-bold text-amber-400 mb-6 shadow-inner">
          <Coffee className="w-4 h-4" />
          <span>Local Cafe & Food Stall Ready</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl leading-tight">
          Modern Digital Menu for Small Tea & Juice Shops
        </h1>

        <p className="mt-4 text-sm sm:text-base text-stone-400 max-w-xl leading-relaxed">
          Designed specifically for fast-paced Bengaluru tea stalls, juice bars, and cafes. Choose which view you would like to test:
        </p>

        {/* Two Portals Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-left">
          {/* Card 1: Customer Menu */}
          <Link
            to="/menu"
            className="group relative p-6 sm:p-7 rounded-3xl bg-stone-800/90 border border-stone-700 hover:border-amber-500 hover:bg-stone-800 transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-102"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  Route: /menu
                </span>
                <span className="text-[10px] text-stone-400 font-semibold">Public</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-2 group-hover:text-amber-400 transition-colors">
                Customer Mobile Menu
              </h2>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                What customers see when they scan the QR code on tables. Clean, mobile-first, with zero admin controls.
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-bold text-amber-400 gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Open Customer Menu</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 2: Owner Management */}
          <Link
            to="/manage"
            className="group relative p-6 sm:p-7 rounded-3xl bg-stone-800/90 border border-stone-700 hover:border-orange-500 hover:bg-stone-800 transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-102"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-stone-950 transition-colors">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
                  Route: /manage
                </span>
                <span className="text-[10px] text-stone-400 font-semibold">Owner Only</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-2 group-hover:text-orange-400 transition-colors">
                Owner Dashboard
              </h2>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Update prices, mark items sold out, add items, configure branding, and print table QR standees.
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-bold text-orange-400 gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Open Owner Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Quick Specs Checklist */}
        <div className="mt-12 p-4 rounded-2xl bg-stone-800/40 border border-stone-800 max-w-xl w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div>
              <p className="font-extrabold text-white text-base">{stats.totalItems}</p>
              <span className="text-[11px] text-stone-500">Menu Items</span>
            </div>
            <div>
              <p className="font-extrabold text-white text-base">{stats.totalCategories}</p>
              <span className="text-[11px] text-stone-500">Categories</span>
            </div>
            <div>
              <p className="font-extrabold text-emerald-400 text-base">Instant</p>
              <span className="text-[11px] text-stone-500">LocalStorage Sync</span>
            </div>
            <div>
              <p className="font-extrabold text-amber-400 text-base">Printable</p>
              <span className="text-[11px] text-stone-500">Table Standee QR</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-stone-500 border-t border-stone-800/80">
        <p>Built for small food businesses in Bengaluru • Ready to deploy on Vercel</p>
      </footer>
    </div>
  );
};
