import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomBouquetBuilder from './components/CustomBouquetBuilder';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import CustomOrderModal from './components/CustomOrderModal';
import AdminPage from './components/AdminPage';
import InstagramFeed from './components/InstagramFeed';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import { CATEGORIES } from './data/products';
import { Lock, ShieldCheck } from 'lucide-react';

function Catalog() {
  const { products, selectedCategory, setSelectedCategory } = useShop();

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="catalog-section" className="py-24">
      <div className="container">
        
        {/* Catalog Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#EAE4DD] pb-6">
          <div>
            <span className="text-xs font-bold uppercase text-[#6A9A85] tracking-widest block mb-1">
              Handcrafted Collection
            </span>
            <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">
              {selectedCategory === 'all' ? 'All Ready-to-Ship Creations' : selectedCategory}
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-heading text-xs font-bold uppercase tracking-wider transition-all border ${selectedCategory === cat.id ? 'bg-[#C08E88] text-white border-[#C08E88] shadow-sm' : 'bg-white text-gray-700 border-[#EAE4DD] hover:border-[#C08E88]'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE4DD] space-y-3">
            <p className="text-base text-gray-600 font-semibold">No items match the selected category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="btn btn-secondary text-xs py-2 px-4"
            >
              Reset Category Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function MainApp() {
  const [view, setView] = useState('store'); // 'store' | 'admin'

  // Hash route listener (#admin -> opens Admin Login Page)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname.includes('/admin')) {
        setView('admin');
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (view === 'admin') {
    return (
      <AdminPage
        onReturnToStore={() => {
          window.location.hash = '';
          setView('store');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#2C2C2C]">
      <Navbar onOpenAdmin={() => { window.location.hash = '#admin'; setView('admin'); }} />
      <main className="flex-1">
        <Hero />
        <CustomBouquetBuilder />
        <Catalog />
        <InstagramFeed />
        <ReviewsSection />
      </main>
      
      {/* Footer with Merchant Direct Login Portal Link */}
      <Footer />
      
      {/* Bottom Merchant Portal Strip */}
      <div className="bg-[#1A1A1A] text-gray-400 py-2.5 px-4 text-center text-xs border-t border-gray-800 flex items-center justify-center gap-2">
        <span>Crovellaa Artisan Studio Portal • </span>
        <button
          onClick={() => { window.location.hash = '#admin'; setView('admin'); }}
          className="text-[#6A9A85] hover:text-[#C08E88] font-bold underline flex items-center gap-1"
        >
          <Lock size={12} /> Merchant Admin Login (#admin)
        </button>
      </div>

      {/* Storefront Modals */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <CustomOrderModal />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
