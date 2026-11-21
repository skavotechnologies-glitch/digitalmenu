import React, { useState } from 'react';
import { X, Store, Palette, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { THEME_PRESETS } from '../../constants/initialData';

export const ShopSettingsModal = ({
  isOpen,
  shopSettings,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({ ...shopSettings });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full my-8 p-5 sm:p-7 shadow-2xl border border-cream-dark animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col font-sans"
        role="dialog"
      >
        <div className="flex items-center justify-between pb-4 border-b border-cream-dark shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-forest">Restaurant Settings</h2>
              <p className="text-xs text-charcoal-muted">Branding, address, timings, and daily stock reset</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-muted hover:text-charcoal rounded-xl hover:bg-cream-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="settings-form" onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4 pr-1">
          {/* Restaurant Name */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Restaurant / Café Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. NAACHI Café"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-dark text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Freshly brewed. Locally loved."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Editorial Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short bio shown on the customer menu header"
              className="w-full px-3.5 py-2 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
            />
          </div>

          {/* Location & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Location / Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-sage absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Indiranagar, Bengaluru"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-sage absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98450 12345"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Opening Hours
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-sage absolute left-3 top-3" />
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="7:30 AM – 11:00 PM (Daily)"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
              />
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Logo Image URL
            </label>
            <input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-dark text-xs font-mono focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
            />
          </div>

          {/* Daily Auto-Reset Sold Out Items */}
          <div className="p-4 rounded-2xl bg-cream/70 border border-cream-dark flex items-start justify-between gap-3">
            <div>
              <span className="block text-xs font-bold text-forest flex items-center gap-1.5">
                <span>🌅 Daily Auto-Reset Sold-Out Dishes</span>
              </span>
              <p className="text-[11px] text-charcoal-muted mt-0.5 leading-relaxed">
                Automatically reset all sold-out products back to Available every morning at midnight when fresh kitchen prep begins.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={formData.autoResetDaily !== false}
                onChange={(e) => setFormData({ ...formData, autoResetDaily: e.target.checked })}
                className="w-5 h-5 accent-forest rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Theme Color Presets */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-sage" />
              <span>Brand Color Palette</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {THEME_PRESETS.map((preset) => {
                const isSelected = formData.themeId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, themeId: preset.id })}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-forest ring-2 ring-forest/15 bg-cream/40 shadow-xs'
                        : 'border-cream-dark hover:border-gold bg-white'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner shrink-0"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-forest truncate">
                        {preset.name}
                      </p>
                      <span className="text-[10px] text-charcoal-muted font-mono">
                        {preset.primary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        <div className="pt-4 border-t border-cream-dark flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-cream-dark text-charcoal font-medium text-xs sm:text-sm hover:bg-cream-light"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="settings-form"
            className="px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-cream bg-forest hover:bg-forest-light shadow-sm"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
