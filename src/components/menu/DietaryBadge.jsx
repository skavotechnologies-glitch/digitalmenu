import React from 'react';

/**
 * Premium Indian restaurant dietary indicator.
 * Refined square border with circle (Veg) or triangle (Non-Veg / Egg).
 */
export const DietaryBadge = ({ isVeg, size = 'sm', className = '' }) => {
  const isSmall = size === 'sm';
  
  if (isVeg) {
    return (
      <span
        title="Vegetarian"
        className={`inline-flex items-center justify-center border border-emerald-700/80 bg-emerald-50/40 rounded-[3px] shrink-0 ${
          isSmall ? 'w-3.5 h-3.5 p-[2px]' : 'w-4 h-4 p-[2.5px]'
        } ${className}`}
        aria-label="Vegetarian"
      >
        <span className="w-full h-full rounded-full bg-emerald-700"></span>
      </span>
    );
  }

  return (
    <span
      title="Non-Vegetarian / Contains Egg"
      className={`inline-flex items-center justify-center border border-amber-900/80 bg-amber-50/40 rounded-[3px] shrink-0 ${
        isSmall ? 'w-3.5 h-3.5 p-[2px]' : 'w-4 h-4 p-[2.5px]'
      } ${className}`}
      aria-label="Non-Vegetarian"
    >
      <span 
        className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-amber-900"
      ></span>
    </span>
  );
};
