import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle2, PhoneCall, MessageCircle, ArrowRight, ArrowLeft, FileText, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    createOrder
  } = useShop();

  const [step, setStep] = useState(1);

  // Address State
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: ""
  });

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setShippingInfo(prev => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      if (pin.startsWith('11')) setShippingInfo(prev => ({ ...prev, city: 'New Delhi', state: 'Delhi' }));
      else if (pin.startsWith('40')) setShippingInfo(prev => ({ ...prev, city: 'Mumbai', state: 'Maharashtra' }));
      else if (pin.startsWith('56')) setShippingInfo(prev => ({ ...prev, city: 'Bengaluru', state: 'Karnataka' }));
      else if (pin.startsWith('70')) setShippingInfo(prev => ({ ...prev, city: 'Kolkata', state: 'West Bengal' }));
      else if (pin.startsWith('30')) setShippingInfo(prev => ({ ...prev, city: 'Jaipur', state: 'Rajasthan' }));
    }
  };

  const handlePlaceOrderRequest = (e) => {
    if (e) e.preventDefault();
    const order = createOrder(shippingInfo, 'Call/WhatsApp Discussion');
    setCompletedOrder(order);
    setStep(3);

    // Trigger Celebration Confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // WhatsApp Message Generator
  const getWhatsAppMessage = () => {
    if (!completedOrder) return '';
    const itemsList = completedOrder.items.map(it => `• ${it.name} (x${it.qty})`).join('%0A');
    return `https://wa.me/919876543210?text=Hi%20Crovellaa!%20I%20just%20placed%20Order%20%23${completedOrder.id}%20on%20your%20website.%0A%0A*Name:*%20${encodeURIComponent(completedOrder.customer)}%0A*Total:*%20%E2%82%B9${completedOrder.total}%0A*Items:*%0A${itemsList}%0A%0APlease%20call/message%20me%20to%20confirm%20my%20order%20and%20payment%20details!`;
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#EAE4DD] p-6 sm:p-8 animate-fade relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAFAF8] flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Step Indicator Header */}
        <div className="mb-8 border-b border-[#EAE4DD] pb-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            
            {/* Step 1 Indicator */}
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C08E88]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-[#C08E88] text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-heading text-xs font-bold uppercase hidden sm:inline">Delivery Details</span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-[#C08E88]' : 'bg-gray-200'}`} />

            {/* Step 2 Indicator */}
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C08E88]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-[#C08E88] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-heading text-xs font-bold uppercase hidden sm:inline">Order Review</span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-[#6A9A85]' : 'bg-gray-200'}`} />

            {/* Step 3 Indicator */}
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#6A9A85]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-[#6A9A85] text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-heading text-xs font-bold uppercase hidden sm:inline">Order Placed</span>
            </div>

          </div>
        </div>

        {/* STEP 1: SHIPPING & CONTACT DETAILS */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#2C2C2C] mb-1">Delivery & Contact Information</h2>
              <p className="text-xs text-gray-500">
                Please provide your contact details so our Crovellaa team can call/WhatsApp you to confirm your order and payment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">First Name *</label>
                <input
                  type="text"
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                  className="input-field text-sm"
                  placeholder="e.g. Priya"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Last Name *</label>
                <input
                  type="text"
                  value={shippingInfo.lastName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                  className="input-field text-sm"
                  placeholder="e.g. Sharma"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp / Call Phone Number *</label>
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="input-field text-sm font-semibold"
                  placeholder="e.g. 9876543210"
                  required
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">We will call/WhatsApp this number to discuss payment & delivery.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="input-field text-sm"
                  placeholder="e.g. priya@example.com"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Shipping Address *</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="input-field text-sm"
                  placeholder="Flat/House No, Building Name, Street Name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Pincode *</label>
                <input
                  type="text"
                  value={shippingInfo.pincode}
                  onChange={handlePincodeChange}
                  className="input-field text-sm"
                  placeholder="e.g. 400001"
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">City *</label>
                <input
                  type="text"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="input-field text-sm"
                  placeholder="e.g. Mumbai"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">State *</label>
                <input
                  type="text"
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                  className="input-field text-sm"
                  placeholder="e.g. Maharashtra"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Custom Note / Color Requests (Optional)</label>
                <input
                  type="text"
                  value={shippingInfo.notes}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, notes: e.target.value })}
                  className="input-field text-sm"
                  placeholder="Any specific flower color request or handwritten gift card message..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#EAE4DD]">
              <button
                type="submit"
                className="btn btn-primary px-8 py-3.5 text-sm flex items-center gap-2 shadow-md"
              >
                <span>Continue to Order Review</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: ORDER REVIEW & DIRECT CALL PAYMENT EXPLANATION */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#2C2C2C] mb-1">Review & Confirm Order</h2>
              <p className="text-xs text-gray-500">Please review your items below before submitting your order request.</p>
            </div>

            {/* Direct Call & Payment Process Banner */}
            <div className="bg-[#FFFDF9] border border-[#D4A373]/50 p-5 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#B57A3C] font-bold text-sm">
                <PhoneCall size={18} className="animate-bounce" />
                <span>How Payment Works (No Gateway Required)</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We do not collect online payments directly on the website! Once you place your order request, our Crovellaa team will <strong>call or WhatsApp you directly at {shippingInfo.phone}</strong> within a few hours to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
                <li>Confirm your flower customization & colors</li>
                <li>Discuss convenient payment options (UPI, GPay, Bank Transfer, or Cash on Delivery)</li>
                <li>Share exact dispatch & tracking details</li>
              </ul>
            </div>

            {/* Order Items Summary */}
            <div className="bg-[#FAFAF8] p-4 rounded-2xl border border-[#EAE4DD] space-y-3">
              <h3 className="font-heading text-xs font-bold uppercase text-[#2C2C2C] border-b border-[#EAE4DD] pb-2">
                Order Items ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <p className="font-bold text-[#2C2C2C]">{item.product.name}</p>
                        {item.selectedVariant && <span className="text-[10px] text-gray-500 block">Color: {item.selectedVariant}</span>}
                      </div>
                    </div>
                    <span className="font-bold text-[#2C2C2C]">x{item.quantity} - ₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="pt-3 border-t border-[#EAE4DD] space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#6A9A85]">
                    <span>Discount Applied</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#6A9A85]">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-heading text-base font-bold text-[#2C2C2C] pt-2 border-t border-[#EAE4DD]">
                  <span>Estimated Total Amount</span>
                  <span className="text-[#C08E88]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Delivery Recipient Details */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-[#EAE4DD] text-xs space-y-1">
              <span className="font-bold text-gray-700 block uppercase tracking-wider text-[10px]">Deliver To:</span>
              <p className="font-semibold text-[#2C2C2C]">{shippingInfo.firstName} {shippingInfo.lastName} ({shippingInfo.phone})</p>
              <p className="text-gray-600">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EAE4DD]">
              <button
                onClick={() => setStep(1)}
                className="btn btn-secondary text-xs py-2.5 flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                onClick={handlePlaceOrderRequest}
                className="btn btn-primary px-8 py-3.5 text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                <PackageCheck size={18} />
                <span>Place Order Request (₹{cartTotal.toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & DIRECT CALL / WHATSAPP CONNECT */}
        {step === 3 && completedOrder && (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 bg-[#6A9A85]/15 text-[#6A9A85] rounded-full mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 size={48} />
            </div>

            <div>
              <span className="badge badge-sage text-xs mb-2">Order Request Placed</span>
              <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Thank You For Your Order!</h2>
              <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                Your order request has been logged successfully! Below are your order details.
              </p>
            </div>

            {/* Prominent Call & WhatsApp Notice */}
            <div className="bg-[#FAF7F5] p-5 rounded-3xl border-2 border-[#C08E88] max-w-lg mx-auto text-center space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#C08E88] text-white flex items-center justify-center mx-auto">
                <PhoneCall size={20} className="animate-pulse" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#2C2C2C]">
                We Will Call / WhatsApp You Shortly!
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Our Crovellaa team will connect with you at <strong>{completedOrder.phone}</strong> to confirm your flower customization, delivery timing, and discuss payment (UPI, GPay, Bank Transfer, or COD).
              </p>

              <a
                href={getWhatsAppMessage()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp to Confirm Now</span>
              </a>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#D4A373]/30 max-w-lg mx-auto text-left space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#EAE4DD] pb-3 text-xs font-bold uppercase text-[#2C2C2C]">
                <span>Order ID: <strong className="text-[#C08E88]">{completedOrder.id}</strong></span>
                <span>Date: {completedOrder.date}</span>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Items Ordered:</p>
                <div className="space-y-2">
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-[#2C2C2C]">
                      <div>
                        <span className="font-semibold">{it.name}</span>
                        {it.variant && <span className="text-[10px] text-gray-500 block">Color: {it.variant}</span>}
                        {it.customNote && <span className="text-[10px] text-[#B57A3C] block">💌 Note: "{it.customNote}"</span>}
                      </div>
                      <span className="font-bold">x{it.qty} - ₹{(it.price * it.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#EAE4DD] pt-3 flex justify-between text-sm font-heading font-bold text-[#2C2C2C]">
                <span>Total Amount (Payment on Call)</span>
                <span className="text-[#C08E88]">₹{completedOrder.total.toLocaleString('en-IN')}</span>
              </div>

              <div className="text-[11px] text-gray-500 border-t border-[#EAE4DD] pt-2">
                <strong>Delivery Address:</strong> {completedOrder.address}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="btn btn-secondary text-xs py-2.5 px-5 flex items-center gap-2"
              >
                <FileText size={15} /> Print Receipt
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="btn btn-primary text-xs py-2.5 px-8"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
