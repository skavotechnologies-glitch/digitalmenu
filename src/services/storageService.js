import {
  INITIAL_SHOP_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_ITEMS
} from '../constants/initialData';

const KEYS = {
  SHOP_SETTINGS: 'qr_menu_shop_settings_v1',
  CATEGORIES: 'qr_menu_categories_v1',
  ITEMS: 'qr_menu_items_v1',
};

/**
 * Storage Service abstraction.
 * Currently uses browser LocalStorage.
 * Can be swapped with Firebase Firestore / Supabase / REST API without altering UI components.
 */
export const storageService = {
  getShopSettings: () => {
    try {
      const data = localStorage.getItem(KEYS.SHOP_SETTINGS);
      return data ? JSON.parse(data) : INITIAL_SHOP_SETTINGS;
    } catch (e) {
      console.error('Failed to load shop settings from LocalStorage', e);
      return INITIAL_SHOP_SETTINGS;
    }
  },

  saveShopSettings: (settings) => {
    try {
      localStorage.setItem(KEYS.SHOP_SETTINGS, JSON.stringify(settings));
      return true;
    } catch (e) {
      console.error('Failed to save shop settings to LocalStorage', e);
      return false;
    }
  },

  getCategories: () => {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    } catch (e) {
      console.error('Failed to load categories from LocalStorage', e);
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories: (categories) => {
    try {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
      return true;
    } catch (e) {
      console.error('Failed to save categories to LocalStorage', e);
      return false;
    }
  },

  getItems: () => {
    try {
      const data = localStorage.getItem(KEYS.ITEMS);
      return data ? JSON.parse(data) : INITIAL_ITEMS;
    } catch (e) {
      console.error('Failed to load items from LocalStorage', e);
      return INITIAL_ITEMS;
    }
  },

  saveItems: (items) => {
    try {
      localStorage.setItem(KEYS.ITEMS, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Failed to save items to LocalStorage', e);
      return false;
    }
  },

  resetAll: () => {
    try {
      localStorage.removeItem(KEYS.SHOP_SETTINGS);
      localStorage.removeItem(KEYS.CATEGORIES);
      localStorage.removeItem(KEYS.ITEMS);
      return {
        shopSettings: INITIAL_SHOP_SETTINGS,
        categories: INITIAL_CATEGORIES,
        items: INITIAL_ITEMS,
      };
    } catch (e) {
      console.error('Failed to reset LocalStorage', e);
      return null;
    }
  }
};
