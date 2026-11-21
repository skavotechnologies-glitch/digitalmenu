import React from 'react';
import { Utensils, CheckCircle2, Ban, Layers } from 'lucide-react';

export const DashboardStats = ({ stats }) => {
  const cards = [
    {
      label: 'Total Dishes',
      value: stats.totalItems,
      icon: Utensils,
      color: 'text-forest',
      bg: 'bg-forest/5',
      border: 'border-cream-dark',
    },
    {
      label: 'In Stock',
      value: stats.activeItems,
      icon: CheckCircle2,
      color: 'text-emerald-800',
      bg: 'bg-emerald-50/60',
      border: 'border-emerald-200/70',
    },
    {
      label: 'Sold Out',
      value: stats.soldOutItems,
      icon: Ban,
      color: 'text-amber-900',
      bg: 'bg-amber-50/60',
      border: 'border-amber-200/70',
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: Layers,
      color: 'text-gold-dark',
      bg: 'bg-gold/10',
      border: 'border-gold/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl bg-white border ${card.border} shadow-subtle flex items-center gap-3.5 transition-all`}
          >
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-charcoal-muted uppercase tracking-wider truncate">
                {card.label}
              </p>
              <p className={`text-xl sm:text-2xl font-serif font-bold ${card.color} tracking-tight`}>
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
