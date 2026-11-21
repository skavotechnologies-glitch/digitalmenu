import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Coffee, Citrus, UtensilsCrossed, Utensils, Check, X } from 'lucide-react';

const AVAILABLE_ICONS = [
  { id: 'Coffee', label: 'Coffee / Tea', icon: Coffee },
  { id: 'Citrus', label: 'Juice / Fruits', icon: Citrus },
  { id: 'UtensilsCrossed', label: 'Snacks / Meals', icon: UtensilsCrossed },
  { id: 'Utensils', label: 'General Food', icon: Utensils },
];

export const CategoryManager = ({
  categories,
  items,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onMoveCategory,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Coffee',
  });

  const handleStartAdd = () => {
    setFormData({ name: '', description: '', icon: 'Coffee' });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleStartEdit = (cat) => {
    setFormData({
      name: cat.name,
      description: cat.description || '',
      icon: cat.icon || 'Coffee',
    });
    setEditingId(cat.id);
    setIsAdding(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (isAdding) {
      onAddCategory(formData);
      setIsAdding(false);
    } else if (editingId) {
      onUpdateCategory(editingId, formData);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-2xs">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            Category Management
          </h2>
          <p className="text-xs text-stone-500">
            Organize menu sections and the order they appear to customers
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 shadow-sm transition-opacity hover:opacity-95"
            style={{ backgroundColor: 'var(--color-brand-primary)' }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {isAdding ? 'New Category' : 'Edit Category'}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Desserts, Sandwiches, Cold Beverages"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Icon
              </label>
              <div className="flex gap-2">
                {AVAILABLE_ICONS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = formData.icon === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: item.id })}
                      className={`flex-1 py-2 rounded-xl border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                          : 'border-stone-300 bg-white text-stone-500 hover:bg-stone-50'
                      }`}
                      title={item.label}
                    >
                      <IconComp className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">
              Short Description (Optional)
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Served fresh with green chutney"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: 'var(--color-brand-primary)' }}
            >
              {isAdding ? 'Add Category' : 'Save Category'}
            </button>
          </div>
        </form>
      )}

      {/* List of Categories */}
      <div className="mt-4 space-y-2">
        {categories.map((cat, index) => {
          const itemCount = items.filter(i => i.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-white transition-all shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-stone-200/80 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-stone-900 text-sm truncate flex items-center gap-2">
                    <span>{cat.name}</span>
                    <span className="text-[11px] font-semibold text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                  </h4>
                  {cat.description && (
                    <p className="text-xs text-stone-500 truncate mt-0.5">{cat.description}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => onMoveCategory(cat.id, 'up')}
                    disabled={index === 0}
                    className="p-1.5 hover:bg-stone-100 text-stone-500 disabled:opacity-30 disabled:pointer-events-none"
                    title="Move Category Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onMoveCategory(cat.id, 'down')}
                    disabled={index === categories.length - 1}
                    className="p-1.5 hover:bg-stone-100 text-stone-500 disabled:opacity-30 disabled:pointer-events-none border-l border-stone-200"
                    title="Move Category Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleStartEdit(cat)}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  title="Rename or edit category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteCategory(cat)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
