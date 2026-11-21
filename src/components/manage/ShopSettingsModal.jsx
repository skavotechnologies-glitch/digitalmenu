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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full my-8 p-5 sm:p-7 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Shop Settings</h2>
              <p className="text-xs text-stone-500">Edit branding, contact, and colors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="settings-form" onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4 pr-1">
          {/* Shop Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Shop / Stall Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Namma Chai & Juice Corner"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Tagline / Subheading
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Authentic Filter Coffee & Fresh Juices"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              About the Shop
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short bio shown on the customer menu header"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Location & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Location / Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Indiranagar, Bengaluru"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98450 12345"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Opening Hours
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="6:30 AM – 10:30 PM (All Days)"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Logo Image URL
            </label>
            <input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Daily Auto-Reset Sold Out Items */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-3">
            <div>
              <span className="block text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>🌅 Daily Auto-Reset Sold-Out Items</span>
              </span>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                Automatically reset all sold-out products back to Available every new morning at midnight when fresh morning stock arrives.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={formData.autoResetDaily !== false}
                onChange={(e) => setFormData({ ...formData, autoResetDaily: e.target.checked })}
                className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Theme Color Presets */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-stone-500" />
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
                        ? 'border-stone-900 ring-2 ring-stone-900/10 bg-stone-50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner shrink-0"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {preset.name}
                      </p>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {preset.primary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="settings-form"
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md hover:opacity-95"
            style={{ backgroundColor: 'var(--color-brand-primary)' }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
