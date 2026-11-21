import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, Smartphone } from 'lucide-react';

export const PrintableTableCard = ({
  shopSettings,
  menuUrl,
  tableLabel = 'Table # / Counter',
}) => {
  return (
    <div 
      id="printable-table-card"
      className="max-w-sm mx-auto bg-[#FAF7F2] border-2 border-[#183D2B]/30 rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden"
    >
      {/* Top Forest Green & Gold Accent */}
      <div className="absolute top-0 inset-x-0 h-3 bg-[#183D2B]" />
      <div className="absolute top-3 inset-x-0 h-[2px] bg-[#C59A5B]" />

      {/* Restaurant Header */}
      <div className="pt-3 pb-3">
        <div className="w-16 h-16 mx-auto mb-2.5 rounded-full overflow-hidden p-0.5 border border-[#C59A5B] bg-white shadow-sm">
          <img
            src={shopSettings.logo}
            alt={shopSettings.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="text-[10px] tracking-widest uppercase font-semibold text-[#C59A5B]">
          Café & Kitchen
        </p>
        <h1 className="text-2xl font-serif font-bold text-[#183D2B] tracking-tight leading-tight mt-0.5">
          {shopSettings.name}
        </h1>
        {shopSettings.tagline && (
          <p className="text-xs text-[#77736D] italic font-serif mt-0.5 line-clamp-1">
            {shopSettings.tagline}
          </p>
        )}
      </div>

      {/* Table / Counter Identifier */}
      {tableLabel && (
        <div className="my-1.5">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest text-[#183D2B] bg-[#183D2B]/10 border border-[#183D2B]/20">
            {tableLabel}
          </span>
        </div>
      )}

      {/* QR Code Container */}
      <div className="my-4 p-4 bg-white rounded-2xl border border-[#FAF7F2] shadow-sm inline-block ring-1 ring-black/5">
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

      {/* Scannable Call to Action */}
      <div className="space-y-1 mt-1 font-sans">
        <div className="inline-flex items-center gap-1.5 font-bold text-[#183D2B] text-sm sm:text-base">
          <Smartphone className="w-4 h-4 text-[#C59A5B]" />
          <span>Scan to View Menu</span>
        </div>
        <p className="text-xs text-[#77736D]">
          View our latest seasonal menu and prices
        </p>
        <p className="text-[10px] text-[#A8A49E] pt-0.5">
          No app download required • Instant mobile menu
        </p>
      </div>

      {/* Elegant Footer Accent */}
      <div className="mt-5 pt-3 border-t border-[#183D2B]/10 flex items-center justify-center gap-1.5 text-[11px] text-[#77736D] font-serif italic">
        <span>Freshly prepared. Locally loved.</span>
      </div>
    </div>
  );
};
