import React from 'react';
import { Camera, Heart, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

const INSTA_POSTS = [
  {
    id: 1,
    image: "/assets/hero_bouquet.png",
    likes: "342",
    comments: "28",
    type: "Reel",
    caption: "Crocheting dusty rose petals stem by stem 🌹 Watch until the end to see the final bouquet reveal! #Crovellaa #HandmadeCrochet #ForeverFlowers",
    url: "https://www.instagram.com/crovellaa_/"
  },
  {
    id: 2,
    image: "/assets/sunflower_pot.png",
    likes: "512",
    comments: "45",
    type: "Post",
    caption: "Desktop sunshine that never needs watering 🌻 Mini crochet sunflowers now restocked! Link in bio to order yours ✨ #crochetdens #crochetsunflower",
    url: "https://www.instagram.com/crovellaa_/"
  },
  {
    id: 3,
    image: "/assets/plushie_bear.png",
    likes: "689",
    comments: "52",
    type: "Reel",
    caption: "Meet Barnaby the Cream Bear! 🧸 Stuffed with love and safety eyes. Perfect anniversary surprise! #amigurumi #crochetbear #handmadegifts",
    url: "https://www.instagram.com/crovellaa_/"
  },
  {
    id: 4,
    image: "/assets/tote_bag.png",
    likes: "298",
    comments: "19",
    type: "Post",
    caption: "Aesthetic granny square floral tote bag 👜 Handmade using 100% thick cotton thread. #crochettote #bohostyle #artisangifts",
    url: "https://www.instagram.com/crovellaa_/"
  },
  {
    id: 5,
    image: "/assets/keychain_tulip.png",
    likes: "421",
    comments: "33",
    type: "Post",
    caption: "Pastel tulip trio keychains for bestie gifts 🌷 Which color is your favorite? Pink, Lavender, or Mint? #crochettulip #keychainlove",
    url: "https://www.instagram.com/crovellaa_/"
  },
  {
    id: 6,
    image: "/assets/gift_unboxing.png",
    likes: "892",
    comments: "74",
    type: "Reel",
    caption: "Unboxing order #ORD-9281 for Ananya! Kraft gift box + dusty rose tissue paper + handwritten love note 💌 #unboxingasmr #crovellaa",
    url: "https://www.instagram.com/crovellaa_/"
  }
];

export default function InstagramFeed() {
  const instaUrl = "https://www.instagram.com/crovellaa_/";

  return (
    <section className="py-24 bg-[#FAFAF8] border-b border-[#EAE4DD]">
      <div className="container">
        
        {/* Profile Branding Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE4DD] shadow-sm mb-14 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src="/assets/hero_bouquet.png"
                    alt="@crovellaa_"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#6A9A85] text-white p-1 rounded-full border-2 border-white">
                <CheckCircle2 size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                  @crovellaa_
                </h3>
                <span className="badge badge-rose text-[10px]">Official Page</span>
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
            className="btn btn-primary px-6 py-3 text-xs flex items-center gap-2 shrink-0 shadow-md"
          >
            <Camera size={16} /> Follow On Instagram (@crovellaa_)
          </a>

        </div>

        {/* Posts Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <h2 className="font-heading text-2xl font-bold text-[#2C2C2C] flex items-center justify-center gap-2">
            <span>Live Instagram Gallery & Reels</span>
            <Sparkles size={18} className="text-[#C08E88]" />
          </h2>
          <p className="text-xs text-gray-500">
            Click on any post to view videos & unboxing clips directly on @crovellaa_
          </p>
        </div>

        {/* Posts 6-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-[#EAE4DD] shadow-xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Type Badge */}
              <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {post.type}
              </span>

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white text-xs">
                <div className="flex items-center justify-center gap-3 my-auto font-bold text-sm">
                  <span className="flex items-center gap-1">
                    <Heart size={15} className="fill-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={15} className="fill-white" /> {post.comments}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-200 border-t border-white/20 pt-1.5">
                  <span className="line-clamp-1">{post.caption}</span>
                  <ExternalLink size={12} className="shrink-0 ml-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={instaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold font-heading text-[#C08E88] hover:underline uppercase tracking-wider"
          >
            <span>View All 180+ Posts On Instagram @crovellaa_</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
