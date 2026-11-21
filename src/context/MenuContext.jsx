import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storageService } from '../services/storageService';
import { THEME_PRESETS } from '../constants/initialData';

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [shopSettings, setShopSettings] = useState(() => storageService.getShopSettings());
  const [categories, setCategories] = useState(() => storageService.getCategories());
  const [items, setItems] = useState(() => storageService.getItems());
  const [toasts, setToasts] = useState([]);

  // Compute active theme
  const activeTheme = useMemo(() => {
    const found = THEME_PRESETS.find(t => t.id === shopSettings.themeId);
    return found || THEME_PRESETS[0];
  }, [shopSettings.themeId]);

  // Apply theme CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-brand-primary', activeTheme.primary);
    root.style.setProperty('--color-brand-hover', activeTheme.primaryHover);
    root.style.setProperty('--color-brand-light', activeTheme.primaryLight);
    root.style.setProperty('--color-brand-badge', activeTheme.primaryBadge);
    root.style.setProperty('--color-brand-text', activeTheme.primaryText);
  }, [activeTheme]);

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- SHOP SETTINGS ---
  const updateShopSettings = (newSettings) => {
    const updated = { ...shopSettings, ...newSettings };
    setShopSettings(updated);
    storageService.saveShopSettings(updated);
    showToast('Shop details updated successfully!');
  };

  // --- CATEGORIES ---
  const addCategory = (categoryData) => {
    const newCategory = {
      id: 'cat-' + Date.now(),
      name: categoryData.name.trim(),
      description: categoryData.description?.trim() || '',
      icon: categoryData.icon || 'Utensils',
      order: categories.length + 1,
    };
    const updated = [...categories, newCategory];
    setCategories(updated);
    storageService.saveCategories(updated);
    showToast(`Category "${newCategory.name}" added!`);
    return newCategory;
  };

  const updateCategory = (id, categoryData) => {
    const updated = categories.map(cat => 
      cat.id === id ? { ...cat, ...categoryData } : cat
    );
    setCategories(updated);
    storageService.saveCategories(updated);
    showToast('Category updated!');
  };

  const deleteCategory = (id) => {
    const target = categories.find(c => c.id === id);
    const updatedCategories = categories.filter(cat => cat.id !== id);
    // Also delete or reassign items belonging to this category
    const updatedItems = items.filter(item => item.categoryId !== id);
    
    setCategories(updatedCategories);
    setItems(updatedItems);
    storageService.saveCategories(updatedCategories);
    storageService.saveItems(updatedItems);
    showToast(`Deleted category "${target?.name || ''}"`);
  };

  const reorderCategories = (newCategories) => {
    const reordered = newCategories.map((c, index) => ({ ...c, order: index + 1 }));
    setCategories(reordered);
    storageService.saveCategories(reordered);
    showToast('Categories reordered');
  };

  const moveCategory = (id, direction) => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const copy = [...categories];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    const reordered = copy.map((c, i) => ({ ...c, order: i + 1 }));
    setCategories(reordered);
    storageService.saveCategories(reordered);
  };

  // --- ITEMS ---
  const addItem = (itemData) => {
    const newItem = {
      id: 'item-' + Date.now(),
      name: itemData.name.trim(),
      description: itemData.description?.trim() || '',
      price: parseFloat(itemData.price) || 0,
      categoryId: itemData.categoryId,
      isVeg: itemData.isVeg !== undefined ? itemData.isVeg : true,
      isPopular: !!itemData.isPopular,
      isAvailable: itemData.isAvailable !== undefined ? itemData.isAvailable : true,
      image: itemData.image || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
      order: items.length + 1,
    };
    const updated = [newItem, ...items];
    setItems(updated);
    storageService.saveItems(updated);
    showToast(`Added "${newItem.name}" to menu!`);
    return newItem;
  };

  const updateItem = (id, itemData) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...itemData,
          price: itemData.price !== undefined ? parseFloat(itemData.price) : item.price,
        };
      }
      return item;
    });
    setItems(updated);
    storageService.saveItems(updated);
    showToast('Menu item updated!');
  };

  const deleteItem = (id) => {
    const target = items.find(i => i.id === id);
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    storageService.saveItems(updated);
    showToast(`Removed "${target?.name || 'Item'}" from menu`);
  };

  const toggleItemAvailability = (id) => {
    let newStatus = false;
    const updated = items.map(item => {
      if (item.id === id) {
        newStatus = !item.isAvailable;
        return { ...item, isAvailable: newStatus };
      }
      return item;
    });
    setItems(updated);
    storageService.saveItems(updated);
    showToast(newStatus ? 'Item marked as Available' : 'Item marked as Sold Out');
  };

  const toggleItemPopular = (id) => {
    let newStatus = false;
    const updated = items.map(item => {
      if (item.id === id) {
        newStatus = !item.isPopular;
        return { ...item, isPopular: newStatus };
      }
      return item;
    });
    setItems(updated);
    storageService.saveItems(updated);
    showToast(newStatus ? 'Marked as Popular item ⭐' : 'Removed from Popular items');
  };

  const moveItem = (id, direction) => {
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const copy = [...items];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    const reordered = copy.map((item, i) => ({ ...item, order: i + 1 }));
    setItems(reordered);
    storageService.saveItems(reordered);
  };

  // Reset demo data
  const resetToSampleData = () => {
    const resetData = storageService.resetAll();
    if (resetData) {
      setShopSettings(resetData.shopSettings);
      setCategories(resetData.categories);
      setItems(resetData.items);
      showToast('Sample menu restored to default!');
    }
  };

  // Computed dashboard statistics
  const stats = useMemo(() => {
    return {
      totalItems: items.length,
      activeItems: items.filter(i => i.isAvailable).length,
      soldOutItems: items.filter(i => !i.isAvailable).length,
      totalCategories: categories.length,
    };
  }, [items, categories]);

  return (
    <MenuContext.Provider
      value={{
        shopSettings,
        categories,
        items,
        activeTheme,
        toasts,
        stats,
        showToast,
        removeToast,
        updateShopSettings,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,
        moveCategory,
        addItem,
        updateItem,
        deleteItem,
        toggleItemAvailability,
        toggleItemPopular,
        moveItem,
        resetToSampleData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
