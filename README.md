# ☕ QR-Based Digital Menu for Bengaluru Tea Stalls & Cafes

A modern, mobile-first digital menu web application designed for small tea stalls, juice shops, cafes, and food stalls across Bengaluru (Indiranagar, Koramangala, Malleshwaram, HSR Layout, etc.).

---

## 🌟 Key Features

### 1. 📱 Public Customer Menu (`/menu`)
- **Scanned via QR Code:** Mobile-first, fast-loading design optimized for all phone screen sizes.
- **Shop Header:** Features shop logo, name, tagline, opening hours, and location address.
- **Category Navigation:** Smooth horizontal pill scroll (Tea & Coffee, Fresh Juice, Snacks).
- **Search & Quick Filters:** Search items instantly by name or description, plus one-tap filters for **"Pure Veg"** and **"Bestsellers Only"**.
- **Item Cards:** High-quality food & drink imagery, ₹ price, description, authentic Indian dietary badges (Veg green dot / Non-Veg brown triangle), **"Must Try"** bestseller badge, and **"Sold Out"** badge.
- **Customer Privacy & Clean UI:** Zero admin controls, edit buttons, or management clutter visible to customers.

### 2. 🛠️ Shop Owner Management Dashboard (`/manage`)
- **No Login Barrier:** Direct, friction-free access for non-technical shop owners on mobile or desktop.
- **Live Business Stats:** Total items, active items in stock, sold-out items, and categories count.
- **One-Tap Availability Toggle:** Instantly mark items as **"In Stock"** or **"Sold Out"** during peak morning and evening rushes.
- **Add / Edit / Delete Items:** Intuitive modal with validation, price formatting, category picker, and live image preview.
- **Quick Image Selection:** Choose from 12 Bengaluru cafe photo presets (cutting chai, filter coffee, fresh juices, hot samosas, puffs), paste a web URL, or upload from device.
- **Display Order:** Move items and categories up or down to showcase specials.
- **Category Management:** Add new categories, rename, reorder, or delete with confirmation safety.
- **Shop Settings & Theming:** Customize shop name, location, phone, timings, logo, and choose between 5 brand color themes (Warm Amber, Fresh Mint Emerald, Sunset Orange, Berry Rose, Royal Bistro).
- **Reset to Sample Data:** Restore the default Bengaluru tea & juice stall sample menu anytime with one click.

### 3. 🏷️ Dedicated QR Code & Printable Table Standee
- **Auto-Generated QR Code:** Points directly to `/menu` and remains permanently valid even when prices and items change.
- **Download PNG:** Export high-resolution QR code image for printing or digital flyers.
- **Print Table Card / Standee:** Ready-to-print acrylic table tent card layout featuring:
  - Shop Logo & Name
  - Table / Counter Identifier (e.g., Table 1, Table 2, Counter Stall)
  - Scannable QR Code
  - *"Scan to View Menu"* & *"View our latest menu and prices"*
  - Optimized for printing (`@media print` clean layout).

---

## 🗂️ Sample Menu Included

Pre-loaded with authentic Bengaluru favorites:

| Category | Item | Price | Details |
| :--- | :--- | :--- | :--- |
| **Tea & Coffee** | Tea | ₹12 | Classic Bengaluru cutting chai with milk & cardamom |
| | Ginger Tea | ₹15 | Freshly crushed organic ginger root brew ⭐ *Bestseller* |
| | Lemon Tea | ₹15 | Refreshing black tea with fresh lemon & mint |
| | Filter Coffee | ₹20 | Authentic frothy South Indian filter coffee ⭐ *Bestseller* |
| | Black Tea | ₹12 | Bold Nilgiri black tea without milk |
| **Fresh Juice** | Lemon Juice | ₹25 | Sweet & salt chilled nimbu pani |
| | Watermelon Juice | ₹40 | 100% cold-pressed natural watermelon ⭐ *Bestseller* |
| | Orange Juice | ₹50 | Fresh Nagpur oranges packed with Vitamin C |
| | Apple Juice | ₹60 | Crisp Himalayan apples cold-pressed |
| **Snacks** | Samosa | ₹15 | Crispy golden triangle with spiced potato masala ⭐ *Bestseller* |
| | Veg Puff | ₹20 | Flaky layered bakery puff with savory vegetable masala |
| | Egg Puff | ₹25 | Hard-boiled egg in roasted onion masala (Marked *Sold Out*) |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 2. Installation
```bash
# Clone or navigate to the directory
cd QR

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit the app in your browser:
- **Landing / Portal Selector:** `http://localhost:5173/`
- **Customer Menu:** `http://localhost:5173/menu`
- **Owner Dashboard:** `http://localhost:5173/manage`

### 3. Production Build
```bash
npm run build
```
The optimized static build is generated in the `dist/` directory.

---

## ☁️ Deployment on Vercel

This repository is pre-configured with `vercel.json` for seamless client-side single page routing (SPA):

1. Push this project to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will auto-detect **Vite**.
5. Click **"Deploy"**.
6. On the owner dashboard (`/manage` -> "QR Code & Standee"), enter your Vercel URL to generate table standees with your live domain!

---

## 🧩 Architecture & Future Backend Upgrades

The application uses an abstracted **Storage Service** pattern:
- **`src/services/storageService.js`**: Centralized storage abstraction. Currently persists to browser `localStorage`.
- **`src/context/MenuContext.jsx`**: Provides reactive state management across all pages, handles toast notifications, and computes live dashboard statistics.

### Upgrading from LocalStorage to Firebase / Supabase
Because all storage access is encapsulated inside `storageService.js`, swapping LocalStorage with Firebase Firestore or Supabase requires updating only the service layer—no UI rewrites needed.
