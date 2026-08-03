import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: "ORD-9281",
      date: "2026-08-01",
      customer: "Ananya Roy",
      email: "ananya@example.com",
      items: [
        { name: "The Regal Rose & Lavender Bouquet", qty: 1, price: 1499 }
      ],
      total: 1499,
      paymentMethod: "Razorpay UPI",
      status: "Shipped",
      address: "B-402, Sunshine Heights, Bandra West, Mumbai 400050"
    }
  ]);

  // UI state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Applied coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Cart operations
  const addToCart = (product, selectedVariant = null, customNote = "", quantity = 1) => {
    setCart(prevCart => {
      const variantName = selectedVariant ? selectedVariant.color : (product.variants ? product.variants[0].color : '');
      const cartKey = `${product.id}-${variantName}-${customNote}`;
      
      const existingIndex = prevCart.findIndex(item => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartKey,
            product,
            selectedVariant: variantName,
            customNote,
            quantity,
            price: product.price
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.cartKey === cartKey ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const removeFromCart = (cartKey) => {
    setCart(prevCart => prevCart.filter(item => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 50;

  // Coupon evaluation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.value;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CROCHET10') {
      setAppliedCoupon({ code: 'CROCHET10', label: '10% OFF Special', type: 'percent', value: 10 });
      return { success: true, message: 'Coupon CROCHET10 applied! 10% Off' };
    } else if (cleanCode === 'GIFTLOVE') {
      setAppliedCoupon({ code: 'GIFTLOVE', label: '₹150 Flat Discount', type: 'flat', value: 150 });
      return { success: true, message: 'Coupon GIFTLOVE applied! ₹150 Off' };
    } else if (cleanCode === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', label: '₹50 Off First Order', type: 'flat', value: 50 });
      return { success: true, message: 'Coupon WELCOME50 applied! ₹50 Off' };
    } else {
      return { success: false, message: 'Invalid promo code. Try CROCHET10 or GIFTLOVE' };
    }
  };

  // Create Order
  const createOrder = (shippingInfo, paymentMethod) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customer: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      email: shippingInfo.email,
      phone: shippingInfo.phone,
      items: cart.map(item => ({
        name: item.product.name,
        variant: item.selectedVariant,
        customNote: item.customNote,
        qty: item.quantity,
        price: item.price
      })),
      subtotal: cartSubtotal,
      shippingFee,
      discountAmount,
      total: cartTotal + (paymentMethod === 'cod' ? 20 : 0),
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (₹20 Fee)' : paymentMethod.toUpperCase(),
      status: "Processing",
      address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Admin Stock operations
  const updateProductStock = (productId, newStock) => {
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p)
    );
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeProductModal,
        setActiveProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCustomOrderOpen,
        setIsCustomOrderOpen,
        isAdminOpen,
        setIsAdminOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        cartSubtotal,
        freeShippingThreshold,
        shippingFee,
        discountAmount,
        cartTotal,
        appliedCoupon,
        applyCouponCode,
        createOrder,
        updateProductStock,
        updateOrderStatus
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
