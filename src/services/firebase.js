import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDVzQoAyk8z_qc-3a192rDhRERTKsj8U0I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "digitalmenu-cdc74.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "digitalmenu-cdc74",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "digitalmenu-cdc74.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "57419836393",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:57419836393:web:f88e985dd437a55137f978",
};

// Returns true if valid Firebase configuration is active
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('YOUR_') &&
  firebaseConfig.apiKey !== ''
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log('🔥 Connected to Google Cloud Firestore successfully for Nano Café!');
  } catch (err) {
    console.error('Failed to initialize Firebase SDK:', err);
  }
}

export { db };
