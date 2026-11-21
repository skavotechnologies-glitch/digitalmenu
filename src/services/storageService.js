import {
  INITIAL_SHOP_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_ITEMS
} from '../constants/initialData';
import { db, isFirebaseConfigured } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const KEYS = {
  SHOP_SETTINGS: 'qr_menu_shop_settings_v4',
  CATEGORIES: 'qr_menu_categories_v4',
  ITEMS: 'qr_menu_items_v4',
};

const FIRESTORE_DOC_PATH = 'restaurants';
const FIRESTORE_DOC_ID = 'nano-cafe';

/**
 * Hybrid Storage Service:
 * 1. If Firebase is configured (.env): syncs live with Google Firestore in real time.
 * 2. If Firebase is not yet configured: seamlessly operates on LocalStorage.
 */
export const storageService = {
  isCloudSyncEnabled: () => isFirebaseConfigured,

  // Listen to live cloud updates across all phones
  subscribeToCloudMenu: (onUpdate) => {
    if (!isFirebaseConfigured || !db) return () => {};

    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH, FIRESTORE_DOC_ID);
      const unsubscribe = onSnapshot(
        docRef,
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data) {
              if (data.shopSettings) storageService.saveShopSettingsLocal(data.shopSettings);
              if (data.categories) storageService.saveCategoriesLocal(data.categories);
              if (data.items) storageService.saveItemsLocal(data.items);
              onUpdate({
                shopSettings: data.shopSettings || INITIAL_SHOP_SETTINGS,
                categories: data.categories || INITIAL_CATEGORIES,
                items: data.items || INITIAL_ITEMS,
              });
            }
          } else {
            // First time setup in Firestore: seed initial data
            await setDoc(docRef, {
              shopSettings: storageService.getShopSettingsLocal(),
              categories: storageService.getCategoriesLocal(),
              items: storageService.getItemsLocal(),
              updatedAt: new Date().toISOString(),
            });
          }
        },
        (error) => {
          console.warn('Firestore subscription fallback to LocalStorage:', error);
        }
      );
      return unsubscribe;
    } catch (e) {
      console.warn('Could not start Firestore listener:', e);
      return () => {};
    }
  },

  // Push full state to Firestore if enabled
  syncToCloud: async (settings, categories, items) => {
    if (!isFirebaseConfigured || !db) return;
    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH, FIRESTORE_DOC_ID);
      await setDoc(
        docRef,
        {
          shopSettings: settings || storageService.getShopSettingsLocal(),
          categories: categories || storageService.getCategoriesLocal(),
          items: items || storageService.getItemsLocal(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.error('Failed to sync to Firestore:', e);
    }
  },

  getShopSettingsLocal: () => {
    try {
      const data = localStorage.getItem(KEYS.SHOP_SETTINGS);
      return data ? JSON.parse(data) : INITIAL_SHOP_SETTINGS;
    } catch (e) {
      return INITIAL_SHOP_SETTINGS;
    }
  },

  saveShopSettingsLocal: (settings) => {
    try {
      localStorage.setItem(KEYS.SHOP_SETTINGS, JSON.stringify(settings));
      return true;
    } catch (e) {
      return false;
    }
  },

  getCategoriesLocal: () => {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  },

  saveCategoriesLocal: (categories) => {
    try {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
      return true;
    } catch (e) {
      return false;
    }
  },

  getItemsLocal: () => {
    try {
      const data = localStorage.getItem(KEYS.ITEMS);
      return data ? JSON.parse(data) : INITIAL_ITEMS;
    } catch (e) {
      return INITIAL_ITEMS;
    }
  },

  saveItemsLocal: (items) => {
    try {
      localStorage.setItem(KEYS.ITEMS, JSON.stringify(items));
      return true;
    } catch (e) {
      return false;
    }
  },

  getShopSettings: () => storageService.getShopSettingsLocal(),
  saveShopSettings: (settings, currentCategories, currentItems) => {
    storageService.saveShopSettingsLocal(settings);
    storageService.syncToCloud(settings, currentCategories, currentItems);
  },

  getCategories: () => storageService.getCategoriesLocal(),
  saveCategories: (categories, currentSettings, currentItems) => {
    storageService.saveCategoriesLocal(categories);
    storageService.syncToCloud(currentSettings, categories, currentItems);
  },

  getItems: () => storageService.getItemsLocal(),
  saveItems: (items, currentSettings, currentCategories) => {
    storageService.saveItemsLocal(items);
    storageService.syncToCloud(currentSettings, currentCategories, items);
  },

  resetAll: () => {
    try {
      localStorage.removeItem(KEYS.SHOP_SETTINGS);
      localStorage.removeItem(KEYS.CATEGORIES);
      localStorage.removeItem(KEYS.ITEMS);
      const defaults = {
        shopSettings: INITIAL_SHOP_SETTINGS,
        categories: INITIAL_CATEGORIES,
        items: INITIAL_ITEMS,
      };
      storageService.syncToCloud(defaults.shopSettings, defaults.categories, defaults.items);
      return defaults;
    } catch (e) {
      return null;
    }
  },

  checkAndPerformDailyReset: () => {
    try {
      const settings = storageService.getShopSettingsLocal();
      const isAutoReset = settings.autoResetDaily !== false;
      if (!isAutoReset) {
        return { didReset: false, count: 0 };
      }

      const today = new Date().toISOString().split('T')[0];
      const lastReset = settings.lastResetDate;

      if (lastReset === today) {
        return { didReset: false, count: 0 };
      }

      const items = storageService.getItemsLocal();
      let resetCount = 0;
      const updatedItems = items.map(item => {
        if (!item.isAvailable) {
          resetCount++;
          return { ...item, isAvailable: true };
        }
        return item;
      });

      if (resetCount > 0) {
        storageService.saveItemsLocal(updatedItems);
      }

      const updatedSettings = { ...settings, lastResetDate: today };
      storageService.saveShopSettingsLocal(updatedSettings);
      storageService.syncToCloud(updatedSettings, null, updatedItems);

      return {
        didReset: true,
        count: resetCount,
        items: updatedItems,
        settings: updatedSettings,
      };
    } catch (e) {
      return { didReset: false, count: 0 };
    }
  }
};
