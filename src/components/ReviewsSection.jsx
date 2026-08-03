import React from 'react';
import { Star, Camera, Quote, Sparkles } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Aisha Patel",
    city: "Mumbai",
    rating: 5,
    date: "July 28, 2026",
    comment: "Ordered the Regal Rose & Lavender bouquet for my best friend's birthday. She was moved to tears! The packaging was so delicate and smelled like real roses.",
    product: "The Regal Rose & Lavender Bouquet"
  },
  {
    id: 2,
    name: "Rohan Kapoor",
    city: "Delhi",
    rating: 5,
    date: "July 24, 2026",
    comment: "I always hated buying fresh flowers that wilt after 3 days. This handmade crochet sunflower is permanently on my desk now. Worth every rupee!",
    product: "Sunshine Sunflower Bloom Pot"
  },
  {
    id: 3,
    name: "Tanvi Verma",
    city: "Bengaluru",
    rating: 5,
    date: "July 19, 2026",
    comment: "The amigurumi bear plushie is insanely soft! Craftsmanship is 10/10. Received it in 4 days with a handwritten thank-you card.",
    product: "Amigurumi Cream Bear Plushie"
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-[#FFFDF9] border-b border-[#EAE4DD]">
      <div className="container">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A9A85]/10 text-[#6A9A85] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Social Proof & Stories</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Loved By 1,200+ Gift Buyers</h2>
          <p className="text-xs sm:text-sm text-gray-600">Real feedback from customers across India who gifted Crovellaa creations.</p>
        </div>

        {/* Customer Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote size={28} className="text-[#C08E88]/20 absolute top-5 right-5" />

              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic font-body leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE4DD] mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#2C2C2C]">{rev.name}</h4>
                  <span className="text-[11px] text-gray-400">{rev.city} • Verified Buyer</span>
                </div>
                <Camera size={18} className="text-[#C08E88]" />
              </div>
            </div>
          ))}
        </div>

        {/* Unboxing Showcase Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#C08E88]/10 via-[#FFF8F6] to-[#6A9A85]/10 p-6 sm:p-8 rounded-3xl border border-[#EAE4DD] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/assets/gift_unboxing.png" alt="Unboxing" className="w-20 h-20 object-cover rounded-2xl border border-white shadow-md" />
            <div>
              <span className="text-[10px] font-bold uppercase text-[#C08E88] tracking-widest block">Tag Us On Instagram</span>
              <h3 className="font-heading text-lg font-bold text-[#2C2C2C]">Share Your #CrovellaaUnboxing</h3>
              <p className="text-xs text-gray-600">Tag @CrovellaaShop in your unboxing Reels to get featured & win 15% off your next gift!</p>
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary text-xs py-2.5 px-6 shrink-0"
          >
            Follow @CrovellaaShop
          </a>
        </div>

      </div>
    </section>
  );
}
