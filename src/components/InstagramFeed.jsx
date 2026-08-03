import React, { useState } from 'react';
import { Camera, ExternalLink, Sparkles, CheckCircle2, Film, Image as ImageIcon } from 'lucide-react';

const INSTA_ITEMS = [
  {
    id: 1,
    code: "DbaMqyxIwKJ",
    type: "Reel",
    title: "Crochet Dusty Rose Petals Reveal",
    embedUrl: "https://www.instagram.com/reel/DbaMqyxIwKJ/embed",
    url: "https://www.instagram.com/crovellaa_/reel/DbaMqyxIwKJ/",
    image: "/assets/hero_bouquet.png",
    likes: "342",
    caption: "Crocheting dusty rose petals stem by stem 🌹 Watch the final bouquet reveal!"
  },
  {
    id: 2,
    code: "DbS7s-kCJpL",
    type: "Post",
    title: "Mini Crochet Sunflower Pot",
    embedUrl: "https://www.instagram.com/p/DbS7s-kCJpL/embed",
    url: "https://www.instagram.com/crovellaa_/p/DbS7s-kCJpL/",
    image: "/assets/sunflower_pot.png",
    likes: "512",
    caption: "Desktop sunshine that never needs watering 🌻 Mini crochet sunflowers restocked!"
  },
  {
    id: 3,
    code: "DbNTfsSiC0T",
    type: "Post",
    title: "Barnaby Cream Crochet Bear",
    embedUrl: "https://www.instagram.com/p/DbNTfsSiC0T/embed",
    url: "https://www.instagram.com/crovellaa_/p/DbNTfsSiC0T/",
    image: "/assets/plushie_bear.png",
    likes: "689",
    caption: "Meet Barnaby the Cream Bear! 🧸 Stuffed with love and safety eyes."
  },
  {
    id: 4,
    code: "DapIx59ovrR",
    type: "Reel",
    title: "Granny Square Floral Tote Bag",
    embedUrl: "https://www.instagram.com/reel/DapIx59ovrR/embed",
    url: "https://www.instagram.com/crovellaa_/reel/DapIx59ovrR/",
    image: "/assets/tote_bag.png",
    likes: "298",
    caption: "Aesthetic granny square floral tote bag 👜 Handmade using 100% cotton thread."
  },
  {
    id: 5,
    code: "DaNDJQiId8E",
    type: "Reel",
    title: "Pastel Tulip Trio Keychains",
    embedUrl: "https://www.instagram.com/reel/DaNDJQiId8E/embed",
    url: "https://www.instagram.com/crovellaa_/reel/DaNDJQiId8E/",
    image: "/assets/keychain_tulip.png",
    likes: "421",
    caption: "Pastel tulip trio keychains for bestie gifts 🌷 Which color is your favorite?"
  },
  {
    id: 6,
    code: "DaIZGAHILto",
    type: "Post",
    title: "Gift Unboxing Order #ORD-9281",
    embedUrl: "https://www.instagram.com/p/DaIZGAHILto/embed",
    url: "https://www.instagram.com/crovellaa_/p/DaIZGAHILto/",
    image: "/assets/gift_unboxing.png",
    likes: "892",
    caption: "Unboxing order #ORD-9281! Kraft gift box + dusty rose tissue paper + handwritten note 💌"
  }
];

export default function InstagramFeed() {
  const [filter, setFilter] = useState('All');

  const instaUrl = "https://www.instagram.com/crovellaa_/";

  const filteredItems = filter === 'All' 
    ? INSTA_ITEMS 
    : INSTA_ITEMS.filter(item => item.type === filter);

  return (
    <section className="py-20 bg-[#FAFAF8] border-b border-[#EAE4DD]">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Profile Branding Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE4DD] shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-md">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src="/assets/hero_bouquet.png"
                    alt="@crovellaa_"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#6A9A85] text-white p-1 rounded-full border-2 border-white shadow-xs">
                <CheckCircle2 size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                  @crovellaa_
                </h3>
                <span className="badge badge-rose text-[10px]">Official Instagram</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Handmade Crochet Gifts & Forever Flowers 🌸 Jaipur & Mumbai, India
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-[#666666] mt-2">
                <span><strong>184</strong> Posts</span>
                <span><strong>2.4k</strong> Followers</span>
                <span><strong>100%</strong> Handmade</span>
              </div>
            </div>
          </div>

          <a
            href={instaUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary px-6 py-3 text-xs flex items-center gap-2 shrink-0 shadow-md hover:scale-105 transition-transform"
          >
            <Camera size={16} /> Follow On Instagram (@crovellaa_)
          </a>

        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2C2C2C] flex items-center gap-2">
              <span>Live Instagram Posts & Reels</span>
              <Sparkles size={20} className="text-[#C08E88]" />
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Embedded straight from @crovellaa_ — watch reels & view official posts directly on site
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#EAE4DD] shadow-xs">
            {['All', 'Reel', 'Post'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filter === type
                    ? 'bg-[#C08E88] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#2C2C2C]'
                }`}
              >
                {type === 'Reel' && <Film size={13} />}
                {type === 'Post' && <ImageIcon size={13} />}
                {type === 'All' ? 'All (6)' : type === 'Reel' ? 'Reels (3)' : 'Posts (3)'}
              </button>
            ))}
          </div>
        </div>

        {/* Live Instagram Embeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#EAE4DD] shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Card Header with Type Badge & Direct Link */}
              <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-[#FAF7F5]">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 text-white ${
                    item.type === 'Reel' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-[#C08E88]'
                  }`}>
                    {item.type === 'Reel' ? <Film size={11} /> : <ImageIcon size={11} />}
                    {item.type}
                  </span>
                  <span className="text-xs font-semibold text-gray-700 truncate max-w-[170px]">
                    {item.title}
                  </span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#C08E88] hover:text-[#a06e68] flex items-center gap-1 font-medium hover:underline"
                  title="Open on Instagram"
                >
                  <span>Open</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Instagram Live iFrame Embed */}
              <div className="relative w-full bg-gray-50 flex-1 min-h-[480px]">
                <iframe
                  src={item.embedUrl}
                  className="w-full h-full min-h-[480px] border-0 rounded-b-2xl"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  title={`Instagram ${item.type} - ${item.title}`}
                />
              </div>

              {/* Direct Action Footer */}
              <div className="p-3 bg-white border-t border-gray-100 text-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-4 rounded-xl bg-gray-50 hover:bg-[#FAF7F5] border border-[#EAE4DD] text-xs font-semibold text-[#2C2C2C] inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Camera size={14} className="text-rose-500" />
                  <span>View & Comment on Instagram</span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12">
          <a
            href={instaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold font-heading text-[#C08E88] hover:underline uppercase tracking-wider bg-white py-3 px-6 rounded-full border border-[#EAE4DD] shadow-xs hover:shadow-sm"
          >
            <span>View All 180+ Posts & Reels On @crovellaa_</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}

