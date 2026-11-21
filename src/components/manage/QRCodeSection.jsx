import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Printer, Copy, Check, ExternalLink, Sparkles, Settings2 } from 'lucide-react';
import { PrintableTableCard } from './PrintableTableCard';

export const QRCodeSection = ({ shopSettings }) => {
  const [copied, setCopied] = useState(false);
  const [tableLabel, setTableLabel] = useState('Table 1');
  const [showTableModal, setShowTableModal] = useState(false);
  
  // Custom URL override (defaults to current origin + /menu)
  const defaultUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/menu` 
    : 'https://example.com/menu';

  const [customUrl, setCustomUrl] = useState(defaultUrl);
  const [isCustomizingUrl, setIsCustomizingUrl] = useState(false);

  const canvasRef = useRef(null);

  // Update default url if window is available
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

    // Create a high resolution export
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    const safeShopName = shopSettings.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    a.download = `${safeShopName}-menu-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Main QR Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
        <div className="max-w-xl">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Digital Menu QR Code
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Display this QR code at your shop counter, cash register, or dining tables. Customers simply scan it with their phone camera to view your live menu.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: QR Code Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="p-4 bg-stone-50 border-2 border-stone-200 rounded-3xl shadow-inner text-center">
              <div className="p-3 bg-white rounded-2xl shadow-xs inline-block">
                {/* Canvas used for high-res PNG download */}
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
                <span className="text-xs font-bold text-stone-800 block truncate max-w-[200px]">
                  {shopSettings.name}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  Active & Ready to Scan
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions & Options */}
          <div className="md:col-span-7 space-y-4">
            {/* Target URL Display */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                <span>Customer Menu URL:</span>
                <button
                  onClick={() => setIsCustomizingUrl(!isCustomizingUrl)}
                  className="text-stone-500 hover:text-stone-800 flex items-center gap-1 text-[11px]"
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
                    className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[10px] text-stone-400">
                    Enter your live deployed production domain if different from localhost.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={customUrl}
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-mono text-stone-700 select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shrink-0"
                    title="Copy Menu Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href="/menu"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shrink-0"
                    title="Preview Live Menu in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Download PNG */}
              <button
                onClick={handleDownloadPNG}
                className="w-full px-4 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download QR (PNG)</span>
              </button>

              {/* Print Standee / Table Card */}
              <button
                onClick={() => setShowTableModal(true)}
                className="w-full px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-md transition-opacity hover:opacity-95"
                style={{ backgroundColor: 'var(--color-brand-primary)' }}
              >
                <Printer className="w-4 h-4" />
                <span>Print Table Card</span>
              </button>
            </div>

            {/* Feature Callouts */}
            <div className="pt-2 text-xs text-stone-500 space-y-1.5 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>The QR code stays permanently valid even when you change prices or items.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Customers do not need to install any app or create an account.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standee Preview & Print Card Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Printable Table Stand Card</h3>
                <p className="text-xs text-stone-500">Ready to laminate or place in acrylic table stands</p>
              </div>
              <button
                onClick={() => setShowTableModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            {/* Custom table number input */}
            <div className="my-4">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Table or Counter Identifier:
              </label>
              <input
                type="text"
                value={tableLabel}
                onChange={(e) => setTableLabel(e.target.value)}
                placeholder="e.g. Table 1, Table 2, Counter Stall"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Preview of printable card */}
            <div className="my-4 max-h-96 overflow-y-auto p-2 bg-stone-100 rounded-2xl flex justify-center">
              <PrintableTableCard
                shopSettings={shopSettings}
                menuUrl={customUrl}
                tableLabel={tableLabel}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                onClick={() => setShowTableModal(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Close
              </button>
              <button
                onClick={handlePrintCard}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-md hover:opacity-95"
                style={{ backgroundColor: 'var(--color-brand-primary)' }}
              >
                <Printer className="w-4 h-4" />
                <span>Print Standee Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden container specifically for browser window.print() */}
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
