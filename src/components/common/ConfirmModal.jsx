import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-cream-dark animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDestructive ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-gold/15 text-gold-dark border border-gold/30'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-xl hover:bg-cream-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-charcoal-muted mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-cream-dark text-charcoal font-medium text-xs sm:text-sm hover:bg-cream-light transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-white shadow-sm transition-colors ${
              isDestructive 
                ? 'bg-rose-700 hover:bg-rose-800' 
                : 'bg-forest hover:bg-forest-light'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
