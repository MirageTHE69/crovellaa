import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, SlidersHorizontal, Camera, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const {
    cart,
    wishlist,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsCustomOrderOpen,
    products,
    setActiveProductModal
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const filteredSearchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAE4DD]/70 shadow-xs transition-all duration-300">
      
      {/* Sleek Top Announcement Banner */}
      <div className="bg-[#C08E88] text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles size={13} className="animate-pulse" />
        <span>FREE EXPRESS SHIPPING OVER ₹1,000 | 100% HANDMADE FOREVER BLOOMS</span>
      </div>

      {/* Main Spacious Navbar Container (Taller Height) */}
      <div className="container py-5 flex items-center justify-between">
        
        {/* Left: Taller Luxury Brand Logo */}
        <div
          onClick={() => { setSelectedCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-12 w-12 overflow-hidden rounded-2xl border border-[#EAE4DD] shadow-xs group-hover:shadow-md group-hover:scale-105 transition-all bg-[#FAF5EC] p-0.5 flex items-center justify-center shrink-0">
            <img
              src="/assets/logo.png"
              alt="Crovellaa Crochet Creation"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-2xl tracking-widest font-bold text-[#2C2C2C] uppercase leading-tight">
              Crovellaa
            </span>
            <span className="text-[10px] text-[#C08E88] font-bold tracking-widest uppercase">
              Crochet Creation
            </span>
          </div>
        </div>

        {/* Center: Minimalist Navigation Links (Spacious Gaps) */}
        <nav className="hidden lg:flex items-center gap-10 font-heading text-xs font-bold uppercase tracking-widest text-[#2C2C2C]">
          <button
            onClick={() => {
              setSelectedCategory('all');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#C08E88] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C08E88] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Shop Collection
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('custom-builder-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#C08E88] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C08E88] after:absolute after:bottom-0 after:left-0 after:transition-all flex items-center gap-1.5"
          >
            <span>Bouquet Builder</span>
            <span className="text-xs">💐</span>
          </button>

          <button
            onClick={() => setIsCustomOrderOpen(true)}
            className="hover:text-[#C08E88] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C08E88] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Bespoke Request
          </button>
        </nav>

        {/* Right: Actions & Admin Studio Trigger */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-[#2C2C2C] hover:text-[#C08E88] transition-colors rounded-full hover:bg-[#FAFAF8]"
              title="Search Products"
            >
              <Search size={19} />
            </button>

            {/* Instant Search Popup */}
            {searchOpen && (
              <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#EAE4DD] p-4 z-50 animate-fade">
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search crochet roses, plushies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-[#EAE4DD] text-xs focus:outline-none focus:border-[#C08E88]"
                    autoFocus
                  />
                  <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400">
                      <X size={12} />
                    </button>
                  )}
                </div>

                {searchQuery.trim() !== '' && (
                  <div className="max-h-60 overflow-y-auto space-y-1.5">
                    {filteredSearchResults.length > 0 ? (
                      filteredSearchResults.map(product => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setActiveProductModal(product);
                            setSearchOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-[#FAFAF8] rounded-xl cursor-pointer transition-colors"
                        >
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                          <div>
                            <p className="text-xs font-semibold text-[#2C2C2C] line-clamp-1">{product.name}</p>
                            <span className="text-xs font-bold text-[#C08E88]">₹{product.price}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 text-center py-3">No matching products found.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => {
              if (wishlist.length > 0) alert(`You have ${wishlist.length} saved item(s) in your Wishlist ❤️`);
              else alert("Your wishlist is empty!");
            }}
            className="p-2.5 text-[#2C2C2C] hover:text-[#C08E88] relative transition-colors rounded-full hover:bg-[#FAFAF8]"
            title="Wishlist"
          >
            <Heart size={19} className={wishlist.length > 0 ? "fill-[#C08E88] text-[#C08E88]" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#C08E88] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#2C2C2C] hover:bg-[#C08E88] text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-sm"
          >
            <ShoppingBag size={17} />
            <span className="font-heading text-xs font-bold tracking-wider hidden sm:inline">BAG</span>
            <span className="bg-white/25 text-white text-xs font-extrabold px-2 py-0.5 rounded-full ml-0.5">
              {cartCount}
            </span>
          </button>

          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/crovellaa_/"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-gray-400 hover:text-[#C08E88] transition-colors hidden sm:block"
            title="@crovellaa_ Instagram"
          >
            <Camera size={19} />
          </a>

          {/* Explicit Merchant Admin Studio Button */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6A9A85]/10 text-[#6A9A85] hover:bg-[#6A9A85] hover:text-white transition-all text-xs font-bold font-heading uppercase tracking-wider border border-[#6A9A85]/30 ml-1"
            title="Open Store Admin Dashboard"
          >
            <SlidersHorizontal size={14} />
            <span>Admin Portal</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#2C2C2C] p-2 hover:text-[#C08E88]"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE4DD] px-6 py-5 space-y-4 animate-fade">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setMobileMenuOpen(false);
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 font-heading text-sm uppercase tracking-wider font-bold text-[#2C2C2C]"
          >
            Shop All Creations
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById('custom-builder-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 font-heading text-sm uppercase tracking-wider font-bold text-[#C08E88]"
          >
            Bouquet Builder 💐
          </button>

          <button
            onClick={() => {
              setIsCustomOrderOpen(true);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 font-heading text-sm uppercase tracking-wider font-bold text-[#6A9A85]"
          >
            Bespoke Request
          </button>

          <hr className="border-[#EAE4DD]" />

          <button
            onClick={() => {
              onOpenAdmin();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 py-2 font-heading text-xs uppercase font-bold text-[#6A9A85]"
          >
            <SlidersHorizontal size={16} /> Open Merchant Admin Portal
          </button>

          <a
            href="https://www.instagram.com/crovellaa_/"
            target="_blank"
            rel="noreferrer"
            className="block w-full text-left py-2 font-heading text-xs uppercase tracking-wider text-gray-500"
          >
            Follow Instagram (@crovellaa_)
          </a>
        </div>
      )}
    </header>
  );
}
