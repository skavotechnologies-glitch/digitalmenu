import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { DietaryBadge } from '../menu/DietaryBadge';

const IMAGE_PRESETS = [
  { label: 'Masala Tea', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  { label: 'Ginger Chai', url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80' },
  { label: 'Lemon Mint Tea', url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
  { label: 'Filter Coffee', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Nilgiri Black', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80' },
  { label: 'Nimbu Shikanji', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Watermelon Elixir', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Valencia Orange', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80' },
  { label: 'Kinnaur Apple', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80' },
  { label: 'Crispy Samosa', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80' },
  { label: 'Butter Veg Puff', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80' },
  { label: 'Roasted Egg Puff', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
];

export const ItemModal = ({
  isOpen,
  item = null,
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
  const [imageTab, setImageTab] = useState('preset');

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
      errs.name = 'Dish name is required';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      errs.price = 'Enter a valid price in ₹';
    }
    if (!formData.categoryId) {
      errs.categoryId = 'Please select a menu section';
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
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image should be under 2MB' }));
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal/60 backdrop-blur-xs overflow-y-auto">
      {/* Container: Fullscreen sheet on mobile, rounded modal on tablet/desktop */}
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-cream-dark animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[92vh] sm:max-h-[90vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cream-dark">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest">
              {item ? 'Edit Menu Dish' : 'Add New Dish'}
            </h2>
            <p className="text-xs text-charcoal-muted mt-0.5 font-sans">
              Update pricing, photos, and descriptions for the customer menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-muted hover:text-charcoal rounded-xl hover:bg-cream-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="item-form" onSubmit={handleSubmit} className="overflow-y-auto py-4 space-y-4 pr-1 font-sans">
          {/* Dish Name */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Dish Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Masala Tea, Artisanal Filter Coffee"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-cream-dark focus:border-forest focus:ring-forest/15'
              } focus:outline-none focus:ring-2`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Section / Category <span className="text-rose-600">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-dark text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Price ({currency}) <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center font-bold text-forest">
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
                    errors.price ? 'border-rose-400 focus:ring-rose-200' : 'border-cream-dark focus:border-forest focus:ring-forest/15'
                  } focus:outline-none focus:ring-2`}
                />
              </div>
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Appetizing Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Freshly brewed with whole estate spices, organic ginger, and milk."
              className="w-full px-3.5 py-2 rounded-xl border border-cream-dark text-sm font-medium focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
            />
          </div>

          {/* Vegetarian Selector */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Dietary Preference
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isVeg: true })}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] ${
                  formData.isVeg
                    ? 'border-emerald-700 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-600/20'
                    : 'border-cream-dark bg-white text-charcoal-muted hover:bg-cream-light'
                }`}
              >
                <DietaryBadge isVeg={true} size="sm" />
                <span>Vegetarian</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, isVeg: false })}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] ${
                  !formData.isVeg
                    ? 'border-amber-900 bg-amber-50/70 text-amber-950 ring-2 ring-amber-900/20'
                    : 'border-cream-dark bg-white text-charcoal-muted hover:bg-cream-light'
                }`}
              >
                <DietaryBadge isVeg={false} size="sm" />
                <span>Non-Veg / Egg</span>
              </button>
            </div>
          </div>

          {/* Food Photography */}
          <div className="border border-cream-dark rounded-2xl p-3.5 bg-cream/50">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                Food Photography
              </label>
              <div className="flex rounded-lg bg-cream-muted p-0.5 text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() => setImageTab('preset')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    imageTab === 'preset' ? 'bg-white shadow-xs text-forest font-semibold' : 'text-charcoal-muted'
                  }`}
                >
                  Presets
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    imageTab === 'url' ? 'bg-white shadow-xs text-forest font-semibold' : 'text-charcoal-muted'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('upload')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    imageTab === 'upload' ? 'bg-white shadow-xs text-forest font-semibold' : 'text-charcoal-muted'
                  }`}
                >
                  Upload
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="flex items-center gap-3 mb-3 p-2 bg-white rounded-xl border border-cream-dark">
              <div className="w-16 h-16 rounded-lg bg-cream overflow-hidden shrink-0 border border-cream-dark">
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
                  <div className="w-full h-full flex items-center justify-center text-charcoal-muted">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="text-xs text-charcoal-muted font-sans">
                <p className="font-semibold text-forest">Live Card Preview</p>
                <p className="text-[11px] text-charcoal-muted mt-0.5">High-resolution food photography</p>
              </div>
            </div>

            {/* Presets Grid */}
            {imageTab === 'preset' && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto no-scrollbar p-1">
                {IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-lg overflow-hidden h-14 border transition-all ${
                      formData.image === preset.url
                        ? 'ring-2 ring-forest border-forest'
                        : 'border-cream-dark hover:border-gold'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white px-1 py-0.5 truncate text-center">
                      {preset.label}
                    </span>
                    {formData.image === preset.url && (
                      <span className="absolute top-1 right-1 bg-forest text-white rounded-full p-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {imageTab === 'url' && (
              <div>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-cream-dark text-xs font-mono focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            )}

            {imageTab === 'upload' && (
              <div>
                <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-cream-dark rounded-xl cursor-pointer hover:bg-white transition-colors">
                  <Upload className="w-5 h-5 text-sage mb-1" />
                  <span className="text-xs font-medium text-forest">Choose image from device</span>
                  <span className="text-[10px] text-charcoal-muted">JPEG, PNG, WebP up to 2MB</span>
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
            <div className="flex items-center justify-between p-3 rounded-2xl bg-cream/60 border border-cream-dark">
              <div>
                <span className="block text-xs font-semibold text-charcoal">Available in stock</span>
                <span className="text-[11px] text-charcoal-muted">Uncheck to mark Sold Out</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-5 h-5 accent-forest rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-cream/60 border border-cream-dark">
              <div>
                <span className="block text-xs font-semibold text-charcoal flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Bestseller Dish</span>
                </span>
                <span className="text-[11px] text-charcoal-muted">Highlight with gold badge</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-5 h-5 accent-gold rounded cursor-pointer"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
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
            form="item-form"
            className="px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-cream bg-forest hover:bg-forest-light shadow-sm transition-colors"
          >
            {item ? 'Save Changes' : 'Add Dish'}
          </button>
        </div>
      </div>
    </div>
  );
};
