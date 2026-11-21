import React from 'react';

/**
 * Standard Indian food FSSAI style green circle (Veg) / brown triangle (Non-Veg) indicator.
 */
export const DietaryBadge = ({ isVeg, size = 'sm' }) => {
  const isSmall = size === 'sm';
  
  if (isVeg) {
    return (
      <span
        title="Pure Vegetarian"
        className={`inline-flex items-center justify-center border-2 border-emerald-600 bg-white rounded-sm shrink-0 ${
          isSmall ? 'w-4 h-4 p-0.5' : 'w-5 h-5 p-0.5'
        }`}
      >
        <span className="w-full h-full rounded-full bg-emerald-600"></span>
      </span>
    );
  }

  return (
    <span
      title="Non-Vegetarian / Contains Egg"
      className={`inline-flex items-center justify-center border-2 border-amber-900 bg-white rounded-sm shrink-0 ${
        isSmall ? 'w-4 h-4 p-0.5' : 'w-5 h-5 p-0.5'
      }`}
    >
      <span 
        className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[7px] border-b-amber-900"
      ></span>
    </span>
  );
};
