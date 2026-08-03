import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FLOWER_STEMS, WRAPPING_STYLES, RIBBON_COLORS } from '../data/flowerStems';
import { Sparkles, Plus, Minus, ShoppingBag, Check, HeartHandshake, MessageSquareHeart, Layers } from 'lucide-react';

export default function CustomBouquetBuilder() {
  const { addToCart } = useShop();

  // Stem Quantities: { 'stem-tulip-Small': 2, 'stem-rose-Large': 3, ... }
  const [selectedStems, setSelectedStems] = useState({
    'stem-rose-Large': 2,
    'stem-lavender-Small': 2,
    'stem-sunflower-2p-Big': 1
  });

  const [selectedWrap, setSelectedWrap] = useState(WRAPPING_STYLES[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_COLORS[0]);
  const [customNote, setCustomNote] = useState("");
  const [addedMessage, setAddedMessage] = useState(false);

  // Increment Stem Quantity
  const handleStemChange = (stemId, sizeName, delta) => {
    const key = `${stemId}-${sizeName}`;
    setSelectedStems(prev => {
      const current = prev[key] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return { ...prev, [key]: next };
    });
  };

  // Calculate Stem Total Price
  let stemsTotalPrice = 0;
  let totalStemCount = 0;
  const stemDetailsList = [];

  Object.entries(selectedStems).forEach(([key, count]) => {
    if (count <= 0) return;
    const [stemId, sizeName] = key.split(/-( Small| Big| Large| Standard Bloom| Each Daisy Head)/).filter(Boolean);
    const stemObj = FLOWER_STEMS.find(s => s.id === stemId);
    if (!stemObj) return;

    // Find price
    const option = stemObj.options.find(o => o.size.trim() === sizeName.trim()) || stemObj.options[0];
    const cost = option.price * count;
    stemsTotalPrice += cost;
    totalStemCount += count;
    stemDetailsList.push({
      name: stemObj.name,
      size: option.size,
      count,
      unitPrice: option.price,
      cost
    });
  });

  const totalBouquetPrice = stemsTotalPrice + (totalStemCount > 0 ? selectedWrap.fee : 0);

  const handleAddBouquetToCart = () => {
    if (totalStemCount === 0) {
      alert("Please add at least 1 flower stem to build your custom bouquet!");
      return;
    }

    const customBouquetProduct = {
      id: `custom-bouquet-${Date.now()}`,
      name: `Custom Handmade Bouquet (${totalStemCount} Stems)`,
      category: "Floral Bouquets",
      price: totalBouquetPrice,
      image: "/assets/hero_bouquet.png",
      description: `Custom bouquet featuring: ${stemDetailsList.map(s => `${s.count}x ${s.name} (${s.size})`).join(', ')}. Wrapped in ${selectedWrap.name} with ${selectedRibbon.name}.`,
      stock: 99
    };

    const variantSummary = `${selectedWrap.name} + ${selectedRibbon.name}`;
    addToCart(customBouquetProduct, { color: variantSummary }, customNote, 1);

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 4000);
  };

  return (
    <section id="custom-builder-section" className="py-24 bg-[#FFFDF9] border-b border-[#EAE4DD]">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C08E88]/10 text-[#C08E88] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Interactive Bouquet Studio</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#2C2C2C]">
            Build Your Own <span className="text-[#C08E88] italic">Custom Flower Bouquet</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Choose your favorite handmade stems with transparent pricing. We will hand-assemble and tie them in luxury craft wrapping!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Stem Selection Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-sm">
              <h3 className="font-heading text-lg font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                <span>1. Select Flower Stems & Quantities</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FLOWER_STEMS.map((flower) => (
                  <div
                    key={flower.id}
                    className="p-4 rounded-2xl border border-[#EAE4DD] bg-[#FAFAF8] space-y-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{flower.icon}</span>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-[#2C2C2C]">{flower.name}</h4>
                        <span className="text-[10px] uppercase font-bold text-[#6A9A85] tracking-wider">{flower.category}</span>
                      </div>
                    </div>

                    {/* Price Variants List */}
                    <div className="space-y-2 pt-1">
                      {flower.options.map((opt, i) => {
                        const key = `${flower.id}-${opt.size}`;
                        const currentQty = selectedStems[key] || 0;

                        return (
                          <div key={i} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-[#EAE4DD] text-xs">
                            <div>
                              <span className="font-semibold text-gray-800">{opt.size}</span>
                              <span className="text-[#C08E88] font-bold ml-2">₹{opt.price}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleStemChange(flower.id, opt.size, -1)}
                                className="w-6 h-6 rounded-full bg-[#FAFAF8] border border-[#EAE4DD] flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold"
                              >
                                -
                              </button>
                              <span className="font-bold w-4 text-center">{currentQty}</span>
                              <button
                                onClick={() => handleStemChange(flower.id, opt.size, 1)}
                                className="w-6 h-6 rounded-full bg-[#C08E88] text-white flex items-center justify-center hover:bg-[#AA7771] font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wrapping & Ribbon Customization */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-sm space-y-5">
              <h3 className="font-heading text-lg font-bold text-[#2C2C2C] flex items-center gap-2">
                <Layers size={18} className="text-[#6A9A85]" />
                <span>2. Select Gift Packaging & Ribbon</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Wrapping selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                    Wrapping Paper Style (+₹50-70):
                  </label>
                  <div className="space-y-2">
                    {WRAPPING_STYLES.map(wrap => (
                      <div
                        key={wrap.id}
                        onClick={() => setSelectedWrap(wrap)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${selectedWrap.id === wrap.id ? 'border-[#C08E88] bg-[#C08E88]/10 text-[#C08E88]' : 'border-[#EAE4DD] text-gray-700 bg-white'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: wrap.color }}></span>
                          {wrap.name}
                        </span>
                        <span className="font-bold">+₹{wrap.fee}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ribbon Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                    Satin Ribbon Color:
                  </label>
                  <div className="space-y-2">
                    {RIBBON_COLORS.map(ribbon => (
                      <div
                        key={ribbon.id}
                        onClick={() => setSelectedRibbon(ribbon)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${selectedRibbon.id === ribbon.id ? 'border-[#C08E88] bg-[#C08E88]/10 text-[#C08E88]' : 'border-[#EAE4DD] text-gray-700 bg-white'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: ribbon.hex }}></span>
                          {ribbon.name}
                        </span>
                        {selectedRibbon.id === ribbon.id && <Check size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personalization Note */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase text-[#B57A3C] tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquareHeart size={14} /> Gift Message for Handwritten Tag (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 'To my dearest mom, happy anniversary! - From Rahul'"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="input-field text-xs py-2"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Live Bouquet Receipt Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-lg sticky top-24 space-y-6">
              
              <div>
                <span className="badge badge-rose text-xs mb-1">Live Order Preview</span>
                <h3 className="font-heading text-xl font-bold text-[#2C2C2C]">Your Custom Bouquet Summary</h3>
              </div>

              {/* Stem Breakdowns */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {stemDetailsList.length > 0 ? (
                  stemDetailsList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#EAE4DD]/60">
                      <div>
                        <span className="font-semibold text-gray-900">{item.count}x {item.name}</span>
                        <span className="text-[10px] text-[#6A9A85] block font-bold">Size: {item.size}</span>
                      </div>
                      <span className="font-bold text-[#C08E88]">₹{item.cost}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic py-6 text-center">
                    No stems selected yet. Tap '+' on any flower to start assembling your bouquet!
                  </p>
                )}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-2 text-xs border-t border-[#EAE4DD] pt-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Stems Total ({totalStemCount} stems)</span>
                  <span className="font-semibold text-gray-900">₹{stemsTotalPrice}</span>
                </div>

                {totalStemCount > 0 && (
                  <div className="flex justify-between">
                    <span>{selectedWrap.name}</span>
                    <span className="font-semibold text-gray-900">+₹{selectedWrap.fee}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Ribbon ({selectedRibbon.name})</span>
                  <span className="font-semibold text-[#6A9A85]">Included</span>
                </div>

                <div className="flex justify-between font-heading text-xl font-bold text-[#2C2C2C] pt-3 border-t border-[#EAE4DD]">
                  <span>Total Price</span>
                  <span className="text-[#C08E88]">₹{totalBouquetPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddBouquetToCart}
                disabled={totalStemCount === 0}
                className="w-full btn btn-primary py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} /> Add Custom Bouquet to Cart (₹{totalBouquetPrice})
              </button>

              {addedMessage && (
                <div className="p-3 bg-[#6A9A85]/15 border border-[#6A9A85] text-[#6A9A85] text-xs font-bold rounded-2xl text-center animate-fade">
                  🎉 Custom Bouquet added to your cart successfully!
                </div>
              )}

              <p className="text-[10px] text-gray-400 text-center">
                ✨ Handcrafted to order. Guaranteed 100% durable cotton yarn flowers.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
