import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Printer, Copy, Check, ExternalLink, Sparkles, Settings2 } from 'lucide-react';
import { PrintableTableCard } from './PrintableTableCard';

export const QRCodeSection = ({ shopSettings }) => {
  const [copied, setCopied] = useState(false);
  const [tableLabel, setTableLabel] = useState('Table 1');
  const [showTableModal, setShowTableModal] = useState(false);
  
  const defaultUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/menu` 
    : 'https://example.com/menu';

  const [customUrl, setCustomUrl] = useState(defaultUrl);
  const [isCustomizingUrl, setIsCustomizingUrl] = useState(false);

  useEffect(() => {
    if (window.location.origin && (!customUrl || customUrl.includes('localhost'))) {
      setCustomUrl(`${window.location.origin}/menu`);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPNG = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    const safeShopName = shopSettings.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    a.download = `${safeShopName}-qr-menu.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Main QR Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-dark shadow-subtle">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-widest uppercase font-semibold text-gold">
            Tabletop & Counter Branding
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest mt-0.5">
            Digital Menu QR Code
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
            Position this QR code on dining tables, counter stands, or acrylic tent cards. Customers scan it with their phone camera to explore your live seasonal menu.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: QR Code Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="p-5 bg-cream rounded-3xl border border-cream-dark text-center shadow-inner">
              <div className="p-3.5 bg-white rounded-2xl shadow-subtle inline-block ring-1 ring-black/5">
                <QRCodeCanvas
                  id="qr-code-canvas"
                  value={customUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: shopSettings.logo,
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>

              <div className="mt-3">
                <span className="font-serif text-sm font-bold text-forest block truncate max-w-[200px]">
                  {shopSettings.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-1 border border-emerald-200">
                  Ready to Scan
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions & Options */}
          <div className="md:col-span-7 space-y-4">
            {/* Target URL Display */}
            <div className="p-4 rounded-2xl bg-cream/70 border border-cream-dark space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-forest">
                <span>Customer Menu URL:</span>
                <button
                  onClick={() => setIsCustomizingUrl(!isCustomizingUrl)}
                  className="text-charcoal-muted hover:text-forest flex items-center gap-1 text-[11px]"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>{isCustomizingUrl ? 'Done' : 'Change domain'}</span>
                </button>
              </div>

              {isCustomizingUrl ? (
                <div className="space-y-1">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://your-domain.vercel.app/menu"
                    className="w-full px-3 py-2 rounded-xl border border-cream-dark text-xs font-mono focus:ring-2 focus:ring-forest"
                  />
                  <p className="text-[10px] text-charcoal-muted">
                    Enter your live production Vercel or custom domain.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={customUrl}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-cream-dark text-xs font-mono text-charcoal select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-xl border border-cream-dark bg-white hover:bg-cream text-charcoal transition-colors shrink-0"
                    title="Copy Menu Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href="/menu"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-cream-dark bg-white hover:bg-cream text-charcoal transition-colors shrink-0"
                    title="Preview Live Menu in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadPNG}
                className="w-full px-4 py-3 rounded-2xl bg-charcoal hover:bg-charcoal-light text-cream font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-gold" />
                <span>Download QR (PNG)</span>
              </button>

              <button
                onClick={() => setShowTableModal(true)}
                className="w-full px-4 py-3 rounded-2xl font-medium text-xs sm:text-sm text-cream bg-forest hover:bg-forest-light flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Table Card</span>
              </button>
            </div>

            {/* Feature Callouts */}
            <div className="pt-2 text-xs text-charcoal-muted space-y-1.5 border-t border-cream-dark/60 font-sans">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>The QR code stays permanently valid when items or prices are updated.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>No app download or customer login required.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standee Preview & Print Card Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-cream-dark animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-cream-dark">
              <div>
                <h3 className="font-serif text-lg font-bold text-forest">Printable Tabletop Standee</h3>
                <p className="text-xs text-charcoal-muted">Ready for acrylic T-stands or wooden counter blocks</p>
              </div>
              <button
                onClick={() => setShowTableModal(false)}
                className="text-charcoal-muted hover:text-charcoal p-1.5 rounded-xl hover:bg-cream-muted"
              >
                ✕
              </button>
            </div>

            <div className="my-4">
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Table Identifier:
              </label>
              <input
                type="text"
                value={tableLabel}
                onChange={(e) => setTableLabel(e.target.value)}
                placeholder="e.g. Table 1, Table 2, Counter Bar"
                className="w-full px-3 py-2 rounded-xl border border-cream-dark text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>

            {/* Standee Preview */}
            <div className="my-4 max-h-96 overflow-y-auto p-4 bg-cream rounded-2xl flex justify-center border border-cream-dark">
              <PrintableTableCard
                shopSettings={shopSettings}
                menuUrl={customUrl}
                tableLabel={tableLabel}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-dark">
              <button
                onClick={() => setShowTableModal(false)}
                className="px-4 py-2.5 rounded-xl border border-cream-dark text-xs font-medium text-charcoal hover:bg-cream-light"
              >
                Close
              </button>
              <button
                onClick={handlePrintCard}
                className="px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-cream bg-forest hover:bg-forest-light flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Standee</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden print root */}
      <div id="print-root" className="print-only">
        <PrintableTableCard
          shopSettings={shopSettings}
          menuUrl={customUrl}
          tableLabel={tableLabel}
        />
      </div>
    </div>
  );
};
