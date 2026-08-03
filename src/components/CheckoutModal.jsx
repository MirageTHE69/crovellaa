import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Banknote, ArrowRight, ArrowLeft, Lock, FileText } from 'lucide-react';
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
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    address: "Flat 301, Bloom Court, Park Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  });

  // Payment Method State: 'razorpay' | 'upi_qr' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setShippingInfo(prev => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      // Mock Pin Code Auto-Fill
      if (pin.startsWith('11')) setShippingInfo(prev => ({ ...prev, city: 'New Delhi', state: 'Delhi' }));
      else if (pin.startsWith('40')) setShippingInfo(prev => ({ ...prev, city: 'Mumbai', state: 'Maharashtra' }));
      else if (pin.startsWith('56')) setShippingInfo(prev => ({ ...prev, city: 'Bengaluru', state: 'Karnataka' }));
      else if (pin.startsWith('70')) setShippingInfo(prev => ({ ...prev, city: 'Kolkata', state: 'West Bengal' }));
    }
  };

  const handlePlaceOrder = () => {
    const order = createOrder(shippingInfo, paymentMethod);
    setCompletedOrder(order);
    setStep(3);

    // Trigger Celebration Confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const finalTotalAmount = cartTotal + (paymentMethod === 'cod' ? 20 : 0);

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
              <span className="font-heading text-xs font-bold uppercase hidden sm:inline">Address</span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-[#C08E88]' : 'bg-gray-200'}`} />

            {/* Step 2 Indicator */}
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C08E88]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-[#C08E88] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-heading text-xs font-bold uppercase hidden sm:inline">Payment</span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-[#C08E88]' : 'bg-gray-200'}`} />

            {/* Step 3 Indicator */}
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#6A9A85]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-[#6A9A85] text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-heading text-xs font-bold uppercase hidden sm:inline">Confirmation</span>
            </div>

          </div>
        </div>

        {/* STEP 1: SHIPPING & ADDRESS */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#2C2C2C] mb-1">Shipping & Contact Details</h2>
              <p className="text-xs text-gray-500">Please enter your delivery destination to calculate exact transit times.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">First Name *</label>
                <input
                  type="text"
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                  className="input-field text-sm"
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
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="input-field text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Phone (For Order Updates) *</label>
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="input-field text-sm"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Street Address / House No / Apartment *</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="input-field text-sm"
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
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#EAE4DD]">
              <button
                onClick={() => setStep(2)}
                className="btn btn-primary px-8 py-3 text-sm flex items-center gap-2 shadow-md"
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#2C2C2C] mb-1">Choose Payment Option</h2>
              <p className="text-xs text-gray-500">100% Encrypted & PCI-DSS Compliant Gateway Integration.</p>
            </div>

            {/* Payment Options Radio List */}
            <div className="space-y-3">
              
              {/* Option 1: Razorpay / UPI / Cards */}
              <div
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-[#C08E88] bg-[#C08E88]/5 shadow-sm' : 'border-[#EAE4DD] bg-white'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C08E88]/15 flex items-center justify-center text-[#C08E88]">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <span className="font-heading text-sm font-bold text-[#2C2C2C] block">
                        Razorpay Gateway (UPI, GPay, Paytm, Cards, NetBanking)
                      </span>
                      <span className="text-xs text-[#6A9A85] font-semibold">
                        Instant 0% transaction fee & Fastest dispatch
                      </span>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'razorpay'} readOnly className="accent-[#C08E88]" />
                </div>
              </div>

              {/* Option 2: Direct UPI QR Code Scan */}
              <div
                onClick={() => setPaymentMethod('upi_qr')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'upi_qr' ? 'border-[#C08E88] bg-[#C08E88]/5 shadow-sm' : 'border-[#EAE4DD] bg-white'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6A9A85]/15 flex items-center justify-center text-[#6A9A85]">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <span className="font-heading text-sm font-bold text-[#2C2C2C] block">
                        Direct UPI QR Code Scan
                      </span>
                      <span className="text-xs text-gray-500">
                        Scan with PhonePe, Paytm, or BHIM UPI app
                      </span>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'upi_qr'} readOnly className="accent-[#C08E88]" />
                </div>
              </div>

              {/* Option 3: Cash on Delivery (COD) */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#C08E88] bg-[#C08E88]/5 shadow-sm' : 'border-[#EAE4DD] bg-white'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4A373]/15 flex items-center justify-center text-[#D4A373]">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <span className="font-heading text-sm font-bold text-[#2C2C2C] block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-xs text-amber-700 font-semibold">
                        Requires extra ₹20 courier handling fee
                      </span>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-[#C08E88]" />
                </div>
              </div>

            </div>

            {/* Order Total Summary Breakdown */}
            <div className="bg-[#FAFAF8] p-4 rounded-2xl border border-[#EAE4DD] space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#6A9A85]">
                  <span>Discount Applied</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Rate</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="flex justify-between text-amber-700">
                  <span>COD Courier Handling Fee</span>
                  <span>+₹20</span>
                </div>
              )}
              <div className="flex justify-between font-heading text-base font-bold text-[#2C2C2C] pt-2 border-t border-[#EAE4DD]">
                <span>Grand Total Payable</span>
                <span className="text-[#C08E88]">₹{finalTotalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EAE4DD]">
              <button
                onClick={() => setStep(1)}
                className="btn btn-secondary text-xs py-2.5 flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary px-8 py-3.5 text-sm flex items-center gap-2 shadow-lg"
              >
                <Lock size={16} /> Place Order (₹{finalTotalAmount.toLocaleString('en-IN')})
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & CELEBRATION */}
        {step === 3 && completedOrder && (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 bg-[#6A9A85]/15 text-[#6A9A85] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 size={48} />
            </div>

            <div>
              <span className="badge badge-sage text-xs mb-2">Order Confirmed</span>
              <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Thank You For Your Order!</h2>
              <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                We are hand-crafting your order right now. An email receipt has been sent to <strong>{completedOrder.email}</strong>.
              </p>
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
                      <span className="font-bold">x{it.qty} - ₹{it.price * it.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#EAE4DD] pt-3 flex justify-between text-sm font-heading font-bold text-[#2C2C2C]">
                <span>Total Paid ({completedOrder.paymentMethod})</span>
                <span className="text-[#C08E88]">₹{completedOrder.total.toLocaleString('en-IN')}</span>
              </div>

              <div className="text-[11px] text-gray-500 border-t border-[#EAE4DD] pt-2">
                <strong>Delivery Address:</strong> {completedOrder.address}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn btn-secondary text-xs py-2.5 px-5 flex items-center gap-2"
              >
                <FileText size={15} /> Print Invoice Receipt
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
