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
  Sparkles,
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
  } = useMenu();

  // Navigation tab in Owner dashboard
  const [activeTab, setActiveTab] = useState('items'); // 'items' | 'categories' | 'qr'
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Deletion confirmations
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    type: null, // 'item' | 'category' | 'reset'
    target: null,
  });

  // Filter items in management view
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

  // Handle Item Modal Open
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

  // Confirm delete triggers
  const promptDeleteItem = (item) => {
    setConfirmDelete({
      isOpen: true,
      type: 'item',
      target: item,
      title: 'Delete Menu Item?',
      message: `Are you sure you want to remove "${item.name}" from your menu? This action cannot be undone.`,
    });
  };

  const promptDeleteCategory = (category) => {
    const affectedCount = items.filter(i => i.categoryId === category.id).length;
    setConfirmDelete({
      isOpen: true,
      type: 'category',
      target: category,
      title: `Delete Category "${category.name}"?`,
      message: affectedCount > 0
        ? `Warning: There are ${affectedCount} items in this category. Deleting this category will also remove all items inside it.`
        : `Are you sure you want to delete this empty category?`,
    });
  };

  const promptResetDefaults = () => {
    setConfirmDelete({
      isOpen: true,
      type: 'reset',
      target: null,
      title: 'Reset to Sample Menu Data?',
      message: 'This will restore the original Bengaluru tea & juice stall sample menu items, prices, and categories. Any custom changes will be overwritten.',
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
    <div className="min-h-screen bg-stone-100/70 pb-20 font-sans">
      {/* Owner Top Bar */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-xs shrink-0"
              style={{ backgroundColor: 'var(--color-brand-primary)' }}
            >
              <Store className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold truncate leading-tight">
                {shopSettings.name}
              </h1>
              <span className="text-[10px] text-stone-400 font-medium">
                Shop Owner Dashboard
              </span>
            </div>
          </div>

          {/* Top Quick Links */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View live customer menu */}
            <a
              href="/menu"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Open public customer view in new tab"
            >
              <span>View Customer Menu</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>

            {/* Shop Settings */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              title="Shop Branding & Contact Settings"
            >
              <Store className="w-4 h-4" />
            </button>

            {/* Reset sample data */}
            <button
              onClick={promptResetDefaults}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              title="Reset to sample data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-6 sm:px-6">
        {/* 1. Dashboard Statistics */}
        <DashboardStats stats={stats} />

        {/* 2. Primary Tabs */}
        <div className="flex items-center justify-between border-b border-stone-200/90 pb-3 mb-6 gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('items')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'items'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Menu Items ({items.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'categories'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'qr'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>QR Code & Standee</span>
            </button>
          </div>

          {activeTab === 'items' && (
            <button
              onClick={handleOpenAddItem}
              className="px-4 py-2 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 shadow-md transition-opacity hover:opacity-95 shrink-0"
              style={{ backgroundColor: 'var(--color-brand-primary)' }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Menu Item</span>
            </button>
          )}
        </div>

        {/* 3. Tab Views */}
        {activeTab === 'items' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick search items by name or description..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-stone-500">Filter:</span>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-semibold bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Menu Items List */}
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

      {/* Floating Add Item Button on mobile for fast access */}
      {activeTab === 'items' && (
        <div className="fixed bottom-6 right-6 sm:hidden z-40">
          <button
            onClick={handleOpenAddItem}
            className="w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-transform active:scale-95"
            style={{ backgroundColor: 'var(--color-brand-primary)' }}
            aria-label="Add item"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>
      )}

      {/* Item Modal (Add / Edit) */}
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

      {/* Shop Settings Modal */}
      <ShopSettingsModal
        isOpen={isSettingsModalOpen}
        shopSettings={shopSettings}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={updateShopSettings}
      />

      {/* Confirmation Dialog */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title={confirmDelete.title}
        message={confirmDelete.message}
        onConfirm={handleExecuteDelete}
        onCancel={() => setConfirmDelete({ isOpen: false, type: null, target: null })}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
