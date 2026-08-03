import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Camera, Mail, Phone, MapPin, Send, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, setIsCustomOrderOpen } = useShop();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#2C2C2C] text-white pt-14 pb-8 font-body">
      <div className="container">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-700">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#FAF5EC] p-0.5 border border-gray-700 shadow-sm shrink-0">
                <img
                  src="/assets/logo.png"
                  alt="Crovellaa Crochet Creation"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold tracking-wider text-white">Crovellaa</span>
                <span className="text-[10px] text-[#C08E88] font-bold tracking-widest uppercase">Crochet Creation</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Crovellaa is an independent artisan studio dedicated to creating high-quality, handcrafted crochet flower bouquets, plushies, and gifts. Every stitch is made with love to bring lasting joy.
            </p>

            <div className="space-y-1.5 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C08E88]" />
                <span>Handcrafted Studio, Jaipur & Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#C08E88]" />
                <span>hello@crovellaa.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#C08E88]" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C08E88]">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => setSelectedCategory('all')} className="hover:text-[#C08E88] transition-colors">
                  All Forever Flowers
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('Floral Bouquets')} className="hover:text-[#C08E88] transition-colors">
                  Crochet Rose Bouquets
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('Plushies')} className="hover:text-[#C08E88] transition-colors">
                  Amigurumi Cuddly Plushies
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedCategory('Keychains')} className="hover:text-[#C08E88] transition-colors">
                  Pastel Flower Keychains
                </button>
              </li>
              <li>
                <button onClick={() => setIsCustomOrderOpen(true)} className="hover:text-[#6A9A85] font-semibold transition-colors">
                  Bespoke Custom Orders ✨
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C08E88]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#faq" className="hover:text-[#C08E88]">FAQ & Care Guide</a></li>
              <li><a href="#shipping" className="hover:text-[#C08E88]">Shipping & Transit Rates</a></li>
              <li><a href="#returns" className="hover:text-[#C08E88]">7-Day Return Policy</a></li>
              <li><a href="#privacy" className="hover:text-[#C08E88]">Privacy & GDPR Notice</a></li>
              <li><a href="#terms" className="hover:text-[#C08E88]">Terms of Service</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C08E88]">
              Join The Yarn Club
            </h4>
            <p className="text-xs text-gray-300">
              Get 10% off your first gift order + exclusive previews of new seasonal collections!
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-l-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#C08E88]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C08E88] hover:bg-[#AA7771] text-white px-3 py-2 rounded-r-xl text-xs font-bold transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-2.5 bg-gray-800 rounded-xl border border-[#6A9A85] text-xs text-[#6A9A85] font-semibold">
                🎉 Thanks for joining! Use code <strong>WELCOME10</strong> for 10% off!
              </div>
            )}

            <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
              <Lock size={12} className="text-[#6A9A85]" />
              <span>We respect your privacy. No spam ever.</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Crovellaa. All rights reserved. Crafted with ❤️ for India.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold text-gray-300">UPI</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold text-gray-300">Razorpay</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold text-gray-300">Paytm</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold text-gray-300">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
