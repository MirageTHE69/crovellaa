import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function CustomOrderModal() {
  const { isCustomOrderOpen, setIsCustomOrderOpen } = useShop();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "Floral Bouquet",
    colors: "Dusty Rose, Lavender & Cream White",
    targetDate: "",
    budget: "₹1,500 - ₹2,500",
    notes: ""
  });

  if (!isCustomOrderOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCustomOrderOpen(false)}>
      <div
        className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#EAE4DD] p-6 sm:p-8 animate-fade relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setIsCustomOrderOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAFAF8] flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#6A9A85]/15 text-[#6A9A85] flex items-center justify-center mx-auto mb-2">
                <Sparkles size={24} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#2C2C2C]">Request Custom Crochet Order</h2>
              <p className="text-xs text-gray-500 mt-1">
                Have a specific color scheme, custom character plushie, or bridal bouquet in mind? Tell us what you want!
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riya Sen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Creation Category</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field bg-white"
                  >
                    <option value="Floral Bouquet">Bridal / Floral Bouquet</option>
                    <option value="Custom Plushie">Custom Amigurumi Plushie</option>
                    <option value="Keychains Set">Event Favor Keychains</option>
                    <option value="Tote Bag / Wearable">Custom Crochet Tote Bag</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Target Delivery Date</label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Preferred Yarn Colors</label>
                <input
                  type="text"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Sage green stems with pastel pink & white roses"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Custom Details / Reference Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field"
                  placeholder="Describe your dream creation in detail (e.g. 7 rose stems, gift box with ribbon)..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <HeartHandshake size={18} /> Submit Bespoke Order Request
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#6A9A85]/15 text-[#6A9A85] flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>

            <div>
              <span className="badge badge-sage text-xs mb-2">Request Received</span>
              <h3 className="font-heading text-2xl font-bold text-[#2C2C2C]">We Got Your Bespoke Request!</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto mt-2">
                Our head artisan will reach out to you on WhatsApp (<strong>{formData.phone}</strong>) within 4 hours to confirm design mockups and exact yarn availability.
              </p>
            </div>

            <button
              onClick={() => {
                setIsCustomOrderOpen(false);
                setSubmitted(false);
              }}
              className="btn btn-primary text-xs py-2.5 px-8"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
