import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    shippingFee,
    discountAmount,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponFeedback(res);
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-right border-l border-[#EAE4DD]">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-[#EAE4DD] bg-[#FAFAF8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#C08E88]" />
              <h2 className="font-heading text-lg font-bold uppercase text-[#2C2C2C] tracking-wider">
                Your Shopping Cart ({cart.reduce((c, i) => c + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FFFDF9] px-5 py-3 border-b border-[#EAE4DD]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1 text-[#2C2C2C]">
                <Truck size={14} className="text-[#6A9A85]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#6A9A85] font-bold">🎉 You unlocked FREE Shipping!</span>
                ) : (
                  <span>Add <strong className="text-[#C08E88]">₹{amountNeededForFreeShipping}</strong> more for FREE shipping</span>
                )}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C08E88] to-[#6A9A85] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items Scrollable List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-[#EAE4DD] mx-auto flex items-center justify-center text-gray-400">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-[#2C2C2C]">Your cart is empty</p>
                  <p className="text-xs text-gray-500 mt-1">Looks like you haven't added any crochet magic yet.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn btn-primary text-xs py-2.5 px-6"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#EAE4DD] bg-[#FAFAF8]/50 hover:bg-[#FAFAF8] transition-colors relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-[#EAE4DD]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-heading text-xs font-bold text-[#2C2C2C] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          className="text-gray-400 hover:text-red-500 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <span className="text-[10px] font-semibold text-[#6A9A85] block">
                          Color: {item.selectedVariant}
                        </span>
                      )}

                      {item.customNote && (
                        <p className="text-[10px] text-[#B57A3C] bg-[#FFFDF9] px-2 py-0.5 rounded border border-[#D4A373]/30 mt-1 line-clamp-1">
                          💌 "{item.customNote}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#EAE4DD] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.cartKey, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartKey, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-heading text-sm font-bold text-[#C08E88]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & Checkout Launcher */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EAE4DD] bg-[#FFFDF9] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. CROCHET10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="input-field py-1.5 pl-8 text-xs uppercase"
                    />
                    <Tag size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#2C2C2C] text-white text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-black"
                  >
                    Apply
                  </button>
                </div>

                {couponFeedback && (
                  <p className={`text-[10px] font-bold ${couponFeedback.success ? 'text-[#6A9A85]' : 'text-red-500'}`}>
                    {couponFeedback.message}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#6A9A85] bg-[#6A9A85]/10 px-2.5 py-1 rounded-md">
                    <span className="flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={12} /> {appliedCoupon.label} ({appliedCoupon.code})
                    </span>
                    <span className="font-bold">-₹{discountAmount}</span>
                  </div>
                )}
              </form>

              {/* Pricing Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#6A9A85]">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shippingFee === 0 ? <strong className="text-[#6A9A85]">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#2C2C2C] pt-2 border-t border-[#EAE4DD]">
                  <span>Total Savings & Amount</span>
                  <span className="font-heading text-lg text-[#C08E88]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full btn btn-primary py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
