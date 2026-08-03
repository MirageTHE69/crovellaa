import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setActiveProductModal } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4DD] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
      {/* Product Image & Badges Container */}
      <div className="relative overflow-hidden aspect-square bg-[#FAFAF8] cursor-pointer" onClick={() => setActiveProductModal(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`badge ${product.badgeColor === 'rose' ? 'badge-rose' : product.badgeColor === 'gold' ? 'badge-gold' : 'badge-sage'}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#2C2C2C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-[#C08E88] hover:bg-white transition-all shadow-sm z-10"
          aria-label="Save to Wishlist"
        >
          <Heart size={16} className={isWishlisted ? "fill-[#C08E88] text-[#C08E88]" : ""} />
        </button>

        {/* Quick View Floating Overlay Button */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="w-full py-2 bg-white/90 backdrop-blur-md rounded-xl text-[#2C2C2C] font-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-white"
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold uppercase text-[#6A9A85] tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <Star size={12} className="fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setActiveProductModal(product)}
            className="font-heading text-base font-bold text-[#2C2C2C] hover:text-[#C08E88] cursor-pointer transition-colors line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-heading text-lg font-bold text-[#C08E88]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Low Stock Warning */}
          {product.stock <= 5 && (
            <p className="text-[10px] font-bold text-amber-600 mb-2">
              ⚠️ Only {product.stock} left in stock!
            </p>
          )}

          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-[#FAFAF8] hover:bg-[#C08E88] text-[#2C2C2C] hover:text-white border border-[#EAE4DD] hover:border-[#C08E88] rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
