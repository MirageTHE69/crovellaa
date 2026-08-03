import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Heart, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function Hero() {
  const { setSelectedCategory, setIsCustomOrderOpen } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAFAF8] to-[#FFF8F6] pt-16 pb-24 border-b border-[#EAE4DD]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C08E88]/10 text-[#C08E88] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Premium Artisan Crochet Gifts</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C2C2C] leading-tight">
              Crochet Flowers That <span className="text-[#C08E88] italic">Last Forever</span>
            </h1>

            <p className="text-base sm:text-lg text-[#666666] max-w-xl mx-auto lg:mx-0 font-body leading-relaxed">
              Ditch wilting bouquets for timeless, lovingly hand-stitched crochet blooms, adorable amigurumi plushies, and aesthetic accessories. Handmade with love for your special someone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary w-full sm:w-auto px-8 py-3.5 shadow-lg"
              >
                Shop Forever Bouquets
              </button>

              <button
                onClick={() => setIsCustomOrderOpen(true)}
                className="btn btn-secondary w-full sm:w-auto px-6 py-3.5"
              >
                Request Custom Order
              </button>
            </div>

            {/* Value Proposition Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#EAE4DD]/60">
              <div className="flex items-center gap-2.5 text-xs text-[#2C2C2C]">
                <div className="w-8 h-8 rounded-full bg-[#6A9A85]/15 flex items-center justify-center text-[#6A9A85]">
                  <Heart size={16} />
                </div>
                <div>
                  <span className="font-bold block font-heading">100% Handmade</span>
                  <span className="text-[#666666]">Soft Cotton Yarn</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#2C2C2C]">
                <div className="w-8 h-8 rounded-full bg-[#C08E88]/15 flex items-center justify-center text-[#C08E88]">
                  <Truck size={16} />
                </div>
                <div>
                  <span className="font-bold block font-heading">Pan-India Express</span>
                  <span className="text-[#666666]">Safe Transit Box</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#2C2C2C] col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-[#D4A373]/15 flex items-center justify-center text-[#D4A373]">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="font-bold block font-heading">Never Fade</span>
                  <span className="text-[#666666]">Cherished Memory</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background decorative blob */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C08E88]/20 to-[#6A9A85]/20 rounded-3xl transform rotate-2 blur-md"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/assets/hero_bouquet.png"
                  alt="Crochet Rose & Lavender Bouquet"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#6A9A85] tracking-widest block">Featured Product</span>
                    <span className="font-heading text-sm font-bold text-[#2C2C2C]">Regal Rose & Lavender Bouquet</span>
                  </div>
                  <span className="font-heading text-base font-bold text-[#C08E88]">₹1,499</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
