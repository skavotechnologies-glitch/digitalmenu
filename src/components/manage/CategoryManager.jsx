import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Coffee, Citrus, UtensilsCrossed, Utensils, X } from 'lucide-react';

const AVAILABLE_ICONS = [
  { id: 'Coffee', label: 'Coffee / Tea', icon: Coffee },
  { id: 'Citrus', label: 'Juices & Elixirs', icon: Citrus },
  { id: 'UtensilsCrossed', label: 'Savouries / Bakery', icon: UtensilsCrossed },
  { id: 'Utensils', label: 'Culinary Dishes', icon: Utensils },
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
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-cream-dark shadow-subtle">
      <div className="flex items-center justify-between pb-4 border-b border-cream-dark">
        <div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-forest">
            Menu Sections & Categories
          </h2>
          <p className="text-xs text-charcoal-muted font-sans mt-0.5">
            Organize courses and the order they appear on the customer menu
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={handleStartAdd}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-cream bg-forest hover:bg-forest-light flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="mt-4 p-4 rounded-2xl bg-cream/60 border border-cream-dark space-y-3 font-sans">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest">
              {isAdding ? 'New Menu Section' : 'Edit Section'}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="text-charcoal-muted hover:text-charcoal p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-charcoal mb-1">
                Section Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Signature Coffees, Artisanal Brunch"
                className="w-full px-3 py-2 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-charcoal mb-1">
                Section Icon
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
                          ? 'border-forest bg-forest text-cream shadow-xs'
                          : 'border-cream-dark bg-white text-charcoal-muted hover:bg-cream-light'
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
            <label className="block text-[11px] font-semibold text-charcoal mb-1">
              Short Description (Optional)
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Made fresh to order with organic spices"
              className="w-full px-3 py-2 rounded-xl border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3.5 py-1.5 rounded-xl border border-cream-dark text-xs font-medium text-charcoal hover:bg-cream-light"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-cream bg-forest hover:bg-forest-light shadow-xs"
            >
              {isAdding ? 'Add Section' : 'Save Changes'}
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
              className="flex items-center justify-between p-3.5 rounded-2xl border border-cream-dark/60 bg-cream/30 hover:bg-cream-light transition-all shadow-subtle"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-cream-muted text-forest font-serif font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-forest text-sm truncate flex items-center gap-2">
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-sans font-medium text-charcoal-muted bg-white px-2 py-0.5 rounded-full border border-cream-dark">
                      {itemCount} {itemCount === 1 ? 'dish' : 'dishes'}
                    </span>
                  </h4>
                  {cat.description && (
                    <p className="text-xs text-charcoal-muted font-sans truncate mt-0.5">{cat.description}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center border border-cream-dark rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => onMoveCategory(cat.id, 'up')}
                    disabled={index === 0}
                    className="p-1.5 hover:bg-cream-muted text-charcoal-muted disabled:opacity-30 disabled:pointer-events-none"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onMoveCategory(cat.id, 'down')}
                    disabled={index === categories.length - 1}
                    className="p-1.5 hover:bg-cream-muted text-charcoal-muted disabled:opacity-30 disabled:pointer-events-none border-l border-cream-dark"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleStartEdit(cat)}
                  className="p-2 rounded-xl bg-cream-muted hover:bg-cream-dark/60 text-forest transition-colors"
                  title="Rename section"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteCategory(cat)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                  title="Delete section"
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
