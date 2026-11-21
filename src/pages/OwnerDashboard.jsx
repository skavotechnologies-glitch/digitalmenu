import React, { useState, useMemo } from 'react';
import { useMenu } from '../context/MenuContext';
import { DashboardStats } from '../components/manage/DashboardStats';
import { ItemList } from '../components/manage/ItemList';
import { ItemModal } from '../components/manage/ItemModal';
import { CategoryManager } from '../components/manage/CategoryManager';
import { ShopSettingsModal } from '../components/manage/ShopSettingsModal';
import { QRCodeSection } from '../components/manage/QRCodeSection';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { ToastContainer } from '../components/common/Toast';
import {
  Plus,
  Store,
  QrCode,
  Layers,
  Utensils,
  Search,
  ExternalLink,
  RotateCcw,
  Sun,
} from 'lucide-react';

export const OwnerDashboard = () => {
  const {
    shopSettings,
    categories,
    items,
    stats,
    toasts,
    removeToast,
    updateShopSettings,
    addCategory,
    updateCategory,
    deleteCategory,
    moveCategory,
    addItem,
    updateItem,
    deleteItem,
    toggleItemAvailability,
    toggleItemPopular,
    moveItem,
    resetToSampleData,
    restoreAllSoldOut,
  } = useMenu();

  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'categories' | 'qr'
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    type: null,
    target: null,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategoryFilter !== 'all' && item.categoryId !== selectedCategoryFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [items, selectedCategoryFilter, searchQuery]);

  const handleOpenAddItem = () => {
    setEditingItem(null);
    setIsItemModalOpen(true);
  };

  const handleOpenEditItem = (item) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = (formData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      addItem(formData);
    }
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const promptDeleteItem = (item) => {
    setConfirmDelete({
      isOpen: true,
      type: 'item',
      target: item,
      title: 'Remove Dish from Menu?',
      message: `Are you sure you want to remove "${item.name}"? This will immediately remove it from the customer view.`,
    });
  };

  const promptDeleteCategory = (category) => {
    const affectedCount = items.filter(i => i.categoryId === category.id).length;
    setConfirmDelete({
      isOpen: true,
      type: 'category',
      target: category,
      title: `Delete Section "${category.name}"?`,
      message: affectedCount > 0
        ? `Warning: There are ${affectedCount} items in this section. Deleting it will also remove all its items.`
        : `Are you sure you want to delete this section?`,
    });
  };

  const promptResetDefaults = () => {
    setConfirmDelete({
      isOpen: true,
      type: 'reset',
      target: null,
      title: 'Restore Nano Café Menu Sample?',
      message: 'This will reset all categories, dishes, prices, and branding back to the default restaurant sample data.',
    });
  };

  const handleExecuteDelete = () => {
    if (confirmDelete.type === 'item' && confirmDelete.target) {
      deleteItem(confirmDelete.target.id);
    } else if (confirmDelete.type === 'category' && confirmDelete.target) {
      deleteCategory(confirmDelete.target.id);
    } else if (confirmDelete.type === 'reset') {
      resetToSampleData();
    }
    setConfirmDelete({ isOpen: false, type: null, target: null });
  };

  return (
    <div className="min-h-screen bg-cream/60 pb-20 font-sans text-charcoal">
      {/* Top Header */}
      <header className="bg-forest text-cream sticky top-0 z-30 shadow-subtle border-b border-forest-light">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden p-0.5 bg-white/10 border border-gold/40 shrink-0">
              <img
                src={shopSettings.logo}
                alt={shopSettings.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-sm sm:text-base font-bold truncate leading-tight">
                {shopSettings.name}
              </h1>
              <span className="text-[10px] text-sage font-medium tracking-wide">
                Menu Management Tool
              </span>
            </div>
          </div>

          {/* Top Quick Links */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/menu"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium flex items-center gap-1.5 transition-colors border border-cream/20"
              title="Open public customer menu"
            >
              <span>Preview Menu</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>

            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors border border-cream/20"
              title="Restaurant Settings"
            >
              <Store className="w-4 h-4" />
            </button>

            <button
              onClick={promptResetDefaults}
              className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-sage hover:text-cream transition-colors border border-cream/20"
              title="Restore sample menu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 pt-6 sm:px-6">
        {/* 1. Summary Cards */}
        <DashboardStats stats={stats} />

        {/* 2. Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-cream-dark pb-3 mb-6 gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('items')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === 'items'
                  ? 'bg-forest text-cream shadow-xs font-semibold'
                  : 'bg-white text-charcoal-muted hover:bg-cream hover:text-charcoal border border-cream-dark'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Menu Dishes ({items.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === 'categories'
                  ? 'bg-forest text-cream shadow-xs font-semibold'
                  : 'bg-white text-charcoal-muted hover:bg-cream hover:text-charcoal border border-cream-dark'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Sections ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === 'qr'
                  ? 'bg-forest text-cream shadow-xs font-semibold'
                  : 'bg-white text-charcoal-muted hover:bg-cream hover:text-charcoal border border-cream-dark'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Tabletop QR</span>
            </button>
          </div>

          {activeTab === 'items' && (
            <button
              onClick={handleOpenAddItem}
              className="px-4 py-2 rounded-full font-medium text-xs sm:text-sm text-cream bg-forest hover:bg-forest-light flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish</span>
            </button>
          )}
        </div>

        {/* 3. Tab Views */}
        {activeTab === 'items' && (
          <div className="space-y-4">
            {/* Sold-out alert banner with 1-click restore */}
            {stats.soldOutItems > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-subtle">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse shrink-0" />
                  <p className="text-xs font-medium text-amber-950">
                    <span className="font-bold">{stats.soldOutItems} dish(es)</span> marked Sold Out.
                    {shopSettings.autoResetDaily !== false && (
                      <span className="text-charcoal-muted block sm:inline sm:ml-1">
                        (Auto-resets to Available tomorrow at midnight)
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={restoreAllSoldOut}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-cream border border-amber-300 text-amber-950 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
                >
                  <Sun className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Restore All Stock Now</span>
                </button>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-cream-dark shadow-subtle">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-sage absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick search dishes..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-cream-dark text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-charcoal-muted">Filter:</span>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-cream-dark text-xs sm:text-sm font-medium bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/15"
                >
                  <option value="all">All Sections</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dishes List */}
            <ItemList
              items={filteredItems}
              categories={categories}
              currency={shopSettings.currency || '₹'}
              onEditItem={handleOpenEditItem}
              onDeleteItem={promptDeleteItem}
              onToggleAvailability={toggleItemAvailability}
              onTogglePopular={toggleItemPopular}
              onMoveItem={moveItem}
            />
          </div>
        )}

        {activeTab === 'categories' && (
          <CategoryManager
            categories={categories}
            items={items}
            onAddCategory={addCategory}
            onUpdateCategory={updateCategory}
            onDeleteCategory={promptDeleteCategory}
            onMoveCategory={moveCategory}
          />
        )}

        {activeTab === 'qr' && (
          <QRCodeSection shopSettings={shopSettings} />
        )}
      </main>

      {/* Floating Add Dish button on mobile */}
      {activeTab === 'items' && (
        <div className="fixed bottom-6 right-6 sm:hidden z-40">
          <button
            onClick={handleOpenAddItem}
            className="w-14 h-14 rounded-full text-cream bg-forest shadow-xl flex items-center justify-center transition-transform active:scale-95"
            aria-label="Add dish"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>
      )}

      {/* Modals */}
      <ItemModal
        isOpen={isItemModalOpen}
        item={editingItem}
        categories={categories}
        currency={shopSettings.currency || '₹'}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
      />

      <ShopSettingsModal
        isOpen={isSettingsModalOpen}
        shopSettings={shopSettings}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={updateShopSettings}
      />

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title={confirmDelete.title}
        message={confirmDelete.message}
        onConfirm={handleExecuteDelete}
        onCancel={() => setConfirmDelete({ isOpen: false, type: null, target: null })}
      />

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
