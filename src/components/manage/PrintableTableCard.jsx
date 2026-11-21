import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, Utensils, Smartphone } from 'lucide-react';

export const PrintableTableCard = ({
  shopSettings,
  menuUrl,
  tableLabel = 'Table # / Counter',
}) => {
  return (
    <div 
      id="printable-table-card"
      className="max-w-sm mx-auto bg-white border-4 rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden"
      style={{ borderColor: 'var(--color-brand-primary)' }}
    >
      {/* Decorative top accent */}
      <div 
        className="absolute top-0 inset-x-0 h-4"
        style={{ backgroundColor: 'var(--color-brand-primary)' }}
      />

      {/* Shop Logo & Name */}
      <div className="pt-2 pb-4">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden shadow-md border-2 border-stone-100">
          <img
            src={shopSettings.logo}
            alt={shopSettings.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-tight">
          {shopSettings.name}
        </h1>
        {shopSettings.location && (
          <p className="text-xs text-stone-500 mt-1 font-medium line-clamp-1">
            {shopSettings.location}
          </p>
        )}
      </div>

      {/* Table Label Tag if provided */}
      {tableLabel && (
        <div className="my-2">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-950 shadow-2xs"
            style={{ backgroundColor: 'var(--color-brand-badge)' }}
          >
            {tableLabel}
          </span>
        </div>
      )}

      {/* QR Code Container */}
      <div className="my-4 p-4 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 inline-block shadow-inner">
        <div className="p-3 bg-white rounded-xl shadow-xs">
          <QRCodeSVG
            value={menuUrl}
            size={180}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: shopSettings.logo,
              x: undefined,
              y: undefined,
              height: 36,
              width: 36,
              excavate: true,
            }}
          />
        </div>
      </div>

      {/* Prompt Instructions */}
      <div className="space-y-1 mt-2">
        <div className="inline-flex items-center gap-1.5 font-black text-stone-900 text-base">
          <Smartphone className="w-4 h-4 text-stone-700" />
          <span>Scan to View Menu</span>
        </div>
        <p className="text-xs font-semibold text-stone-600">
          View our latest menu and prices
        </p>
        <p className="text-[10px] text-stone-400 pt-1">
          No app download required • Instant mobile menu
        </p>
      </div>

      {/* Bottom Footer Accent */}
      <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-center gap-1 text-[11px] font-bold text-stone-500">
        <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-brand-primary)' }} />
        <span>Fresh Food & Fast Service</span>
      </div>
    </div>
  );
};
