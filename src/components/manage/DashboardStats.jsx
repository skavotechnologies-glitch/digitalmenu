import React from 'react';
import { Utensils, CheckCircle2, Ban, Layers } from 'lucide-react';

export const DashboardStats = ({ stats }) => {
  const cards = [
    {
      label: 'Total Items',
      value: stats.totalItems,
      icon: Utensils,
      color: 'text-stone-700',
      bg: 'bg-stone-100',
      border: 'border-stone-200',
    },
    {
      label: 'Active Available',
      value: stats.activeItems,
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      label: 'Sold Out Items',
      value: stats.soldOutItems,
      icon: Ban,
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: Layers,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 sm:p-4 rounded-2xl bg-white border ${card.border} shadow-2xs flex items-center gap-3`}
          >
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-stone-500 truncate">
                {card.label}
              </p>
              <p className={`text-xl sm:text-2xl font-extrabold ${card.color} tracking-tight`}>
                {card.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
