import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, MessageSquareHeart } from 'lucide-react';

export default function ProductModal() {
  const { activeProductModal, setActiveProductModal, addToCart, wishlist, toggleWishlist, setIsCheckoutOpen } = useShop();

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedVariant, setSelectedVariant] = useState(product.variants ? product.variants[0] : null);
  const [customNote, setCustomNote] = useState("");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const isWishlisted = wishlist.includes(product.id);

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, customNote, qty);
    setActiveProductModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveProductModal(null)}>
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#EAE4DD] p-6 sm:p-8 animate-fade relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAFAF8] flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Product Gallery Images Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-[#FAFAF8] border border-[#EAE4DD] aspect-square relative">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 badge badge-rose text-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails list */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-[#C08E88] scale-105' : 'border-[#EAE4DD] opacity-70'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Actions Column */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase text-[#6A9A85] tracking-wider">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center gap-1 text-sm text-amber-500 font-bold">
                  <Star size={16} className="fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2C2C2C] mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-heading text-2xl font-bold text-[#C08E88]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-[#6A9A85] bg-[#6A9A85]/10 px-2 py-0.5 rounded-full">
                  Inclusive of all taxes
                </span>
              </div>

              <p className="text-sm text-gray-600 font-body leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && (
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                    Select Color Palette: <span className="text-[#C08E88]">{selectedVariant?.color}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${selectedVariant?.color === v.color ? 'border-[#C08E88] bg-[#C08E88]/10 text-[#C08E88]' : 'border-[#EAE4DD] text-gray-700'}`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: v.hex }}></span>
                        <span>{v.color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Personalization Note Input */}
              {product.isCustomizable && (
                <div className="mb-5 p-3.5 bg-[#FFFDF9] rounded-2xl border border-[#D4A373]/30">
                  <label className="block text-xs font-bold uppercase text-[#B57A3C] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MessageSquareHeart size={14} /> Personalization Note / Gift Message (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 'Happy Birthday Ananya! - From Rahul' or custom color request"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="input-field text-xs py-2"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    We will print this note on a handwritten floral mini card inside your gift box!
                  </span>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-xs font-bold uppercase text-gray-700 tracking-wider">Quantity:</label>
                <div className="flex items-center border border-[#EAE4DD] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 bg-[#FAFAF8] text-gray-600 hover:bg-gray-200 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 bg-[#FAFAF8] text-gray-600 hover:bg-gray-200 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500 font-medium">({product.stock} available in stock)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(product, selectedVariant, customNote, qty);
                    setActiveProductModal(null);
                  }}
                  className="btn btn-primary flex-1 py-3 text-sm"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-2xl border ${isWishlisted ? 'border-[#C08E88] text-[#C08E88] bg-[#C08E88]/10' : 'border-[#EAE4DD] text-gray-600'} hover:border-[#C08E88]`}
                >
                  <Heart size={20} className={isWishlisted ? "fill-[#C08E88]" : ""} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#6A9A85] hover:bg-[#588572] text-white rounded-2xl font-heading text-sm font-bold uppercase tracking-wider shadow-md transition-colors"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EAE4DD] text-[11px] text-gray-500 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-[#6A9A85]" />
                <span>100% Quality Check</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck size={16} className="text-[#C08E88]" />
                <span>Pan-India Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw size={16} className="text-[#D4A373]" />
                <span>7-Day Return Policy</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Info Section (Details, Care, Shipping) */}
        <div className="mt-8 pt-6 border-t border-[#EAE4DD]">
          <div className="flex gap-6 border-b border-[#EAE4DD] pb-2 text-sm font-heading font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 transition-colors ${activeTab === 'details' ? 'text-[#C08E88] border-b-2 border-[#C08E88]' : 'text-gray-400'}`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-2 transition-colors ${activeTab === 'care' ? 'text-[#C08E88] border-b-2 border-[#C08E88]' : 'text-gray-400'}`}
            >
              Care Instructions
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-2 transition-colors ${activeTab === 'shipping' ? 'text-[#C08E88] border-b-2 border-[#C08E88]' : 'text-gray-400'}`}
            >
              Shipping & Box Packaging
            </button>
          </div>

          <div className="py-4 text-xs sm:text-sm text-gray-600 space-y-2">
            {activeTab === 'details' && (
              <ul className="list-disc pl-5 space-y-1">
                {product.details?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {activeTab === 'care' && (
              <ul className="list-disc pl-5 space-y-1">
                <li>Dust gently with a soft hair dryer (cool mode) or clean makeup brush.</li>
                <li>Do not submerge fully in water; spot clean yarn stains with mild soap.</li>
                <li>Keep away from prolonged direct harsh sunlight to preserve yarn vibrant colors.</li>
              </ul>
            )}

            {activeTab === 'shipping' && (
              <p>
                Each Crovellaa order is packed inside a sturdy kraft box with eco-friendly dusty rose tissue wrapping paper, bubble protection, and a handwritten care card. Metro deliveries take 3-5 business days; rest of India takes 4-7 days.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
