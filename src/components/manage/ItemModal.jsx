import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { DietaryBadge } from '../menu/DietaryBadge';

// Curated Bangalore cafe & stall image presets for quick one-click selection
const IMAGE_PRESETS = [
  { label: 'Tea / Chai', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { label: 'Ginger Tea', url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80' },
  { label: 'Lemon Tea', url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
  { label: 'Filter Coffee', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Black Tea', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { label: 'Lemon Juice', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Watermelon', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Orange Juice', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80' },
  { label: 'Apple Juice', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80' },
  { label: 'Samosa', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' },
  { label: 'Veg Puff', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80' },
  { label: 'Egg Puff', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
];

export const ItemModal = ({
  isOpen,
  item = null, // null = Add, item object = Edit
  categories = [],
  currency = '₹',
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: categories[0]?.id || '',
    price: '',
    description: '',
    isVeg: true,
    isPopular: false,
    isAvailable: true,
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [imageTab, setImageTab] = useState('preset'); // 'preset' | 'url' | 'upload'

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        categoryId: item.categoryId || categories[0]?.id || '',
        price: item.price !== undefined ? item.price : '',
        description: item.description || '',
        isVeg: item.isVeg !== undefined ? item.isVeg : true,
        isPopular: !!item.isPopular,
        isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
        image: item.image || '',
      });
    } else {
      setFormData({
        name: '',
        categoryId: categories[0]?.id || '',
        price: '',
        description: '',
        isVeg: true,
        isPopular: false,
        isAvailable: true,
        image: IMAGE_PRESETS[0].url,
      });
    }
    setErrors({});
  }, [item, categories, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Item name is required';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      errs.price = 'Enter a valid price';
    }
    if (!formData.categoryId) {
      errs.categoryId = 'Please select a category';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (keep < 1.5MB for localStorage friendliness)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be under 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setErrors(prev => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full my-8 p-5 sm:p-7 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {item ? 'Edit Menu Item' : 'Add New Item'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Fill in item details to update the live menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="item-form" onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4 pr-1">
          {/* Item Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Item Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Masala Chai, Filter Coffee, Lemon Juice"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-300 focus:border-amber-500 focus:ring-amber-200'
              } focus:outline-none focus:ring-3`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium bg-white focus:outline-none focus:ring-3 focus:ring-amber-200 focus:border-amber-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Price ({currency}) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center font-bold text-stone-400">
                  {currency}
                </span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="20"
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                    errors.price ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-300 focus:border-amber-500 focus:ring-amber-200'
                  } focus:outline-none focus:ring-3`}
                />
              </div>
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Short Description (Ingredients / Taste)
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Made with organic ginger and fresh cow milk. Served hot."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:ring-3 focus:ring-amber-200 focus:border-amber-500"
            />
          </div>

          {/* Veg / Non-Veg Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Dietary Preference
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isVeg: true })}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  formData.isVeg
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <DietaryBadge isVeg={true} size="sm" />
                <span>Pure Vegetarian</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, isVeg: false })}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  !formData.isVeg
                    ? 'border-amber-800 bg-amber-50 text-amber-900 ring-2 ring-amber-700/30'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <DietaryBadge isVeg={false} size="sm" />
                <span>Non-Veg / Contains Egg</span>
              </button>
            </div>
          </div>

          {/* Image Selection with Live Preview */}
          <div className="border border-stone-200 rounded-2xl p-3.5 bg-stone-50/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Item Photo
              </label>
              <div className="flex rounded-lg bg-stone-200/80 p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setImageTab('preset')}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    imageTab === 'preset' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'
                  }`}
                >
                  Presets
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    imageTab === 'url' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'
                  }`}
                >
                  Web URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    imageTab === 'upload' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'
                  }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {/* Live Image Preview */}
            <div className="flex items-center gap-3 mb-3 p-2 bg-white rounded-xl border border-stone-200">
              <div className="w-16 h-16 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="text-xs text-stone-500">
                <p className="font-semibold text-stone-800">Live Card Preview</p>
                <p className="text-[11px] text-stone-400 mt-0.5">This picture will appear on customer mobile screens.</p>
              </div>
            </div>

            {/* Presets Tab */}
            {imageTab === 'preset' && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto no-scrollbar p-1">
                {IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-lg overflow-hidden h-14 border transition-all ${
                      formData.image === preset.url
                        ? 'ring-2 ring-amber-500 border-amber-500'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white px-1 py-0.5 truncate text-center font-medium">
                      {preset.label}
                    </span>
                    {formData.image === preset.url && (
                      <span className="absolute top-1 right-1 bg-amber-500 text-white rounded-full p-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Web URL Tab */}
            {imageTab === 'url' && (
              <div>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Upload Tab */}
            {imageTab === 'upload' && (
              <div>
                <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:bg-stone-100/60 transition-colors">
                  <Upload className="w-5 h-5 text-stone-400 mb-1" />
                  <span className="text-xs font-bold text-stone-700">Choose image from device</span>
                  <span className="text-[10px] text-stone-400">PNG, JPG, WebP up to 2MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {errors.image && <p className="text-xs text-rose-500 mt-1">{errors.image}</p>}
              </div>
            )}
          </div>

          {/* Quick Toggles: Available & Popular */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Availability */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <div>
                <span className="block text-xs font-bold text-stone-800">Available in stock</span>
                <span className="text-[11px] text-stone-500">Uncheck to mark Sold Out</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>

            {/* Popular Item */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <div>
                <span className="block text-xs font-bold text-stone-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Must Try Badge</span>
                </span>
                <span className="text-[11px] text-stone-500">Highlight as bestseller</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="item-form"
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-opacity hover:opacity-95"
            style={{ backgroundColor: 'var(--color-brand-primary)' }}
          >
            {item ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
};
