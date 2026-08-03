export const PRODUCTS = [
  {
    id: "cro-001",
    sku: "FLOWER-ROSE-001",
    name: "The Regal Rose & Lavender Bouquet",
    category: "Floral Bouquets",
    price: 1499,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 42,
    image: "/assets/hero_bouquet.png",
    images: ["/assets/hero_bouquet.png", "/assets/rose_bouquet.png", "/assets/gift_unboxing.png"],
    badge: "Bestseller",
    badgeColor: "rose",
    description: "A breathtaking handcrafted bouquet featuring 5 dusty rose crochet roses, fresh lavender stems, and delicate baby's breath. Comes tied in premium craft wrapping paper with a dusty rose ribbon. Guaranteed to stay fresh forever!",
    stock: 8,
    isCustomizable: true,
    variants: [
      { color: "Dusty Rose & Lavender", hex: "#C08E88" },
      { color: "Blush Pink & White", hex: "#F3C5C5" },
      { color: "Classic Passion Red", hex: "#A83232" }
    ],
    details: [
      "100% Premium Cotton Milk Yarn",
      "Stems reinforced with flexible floral wire",
      "Includes gift box & personalized handwritten note",
      "Dimensions: ~35cm height x 22cm width"
    ]
  },
  {
    id: "cro-002",
    sku: "FLOWER-SUNFLOWER-002",
    name: "Sunshine Sunflower Bloom Pot",
    category: "Home Decor",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 29,
    image: "/assets/sunflower_pot.png",
    images: ["/assets/sunflower_pot.png", "/assets/gift_unboxing.png"],
    badge: "Trending",
    badgeColor: "gold",
    description: "Bring eternal warmth to your desk or bedside table! Features a cheerful handmade crochet sunflower potted in a glazed white ceramic pot. Perfect for student study desks or office gifts.",
    stock: 12,
    isCustomizable: true,
    variants: [
      { color: "Golden Yellow", hex: "#E9B44C" },
      { color: "Soft Pastels", hex: "#F4D35E" }
    ],
    details: [
      "Hand-stitched yellow petals with textured brown center",
      "Includes mini ceramic pot with faux moss base",
      "Zero watering required - dust gently with soft brush",
      "Dimensions: ~18cm height"
    ]
  },
  {
    id: "cro-003",
    sku: "PLUSH-BEAR-003",
    name: "Amigurumi Cream Bear Plushie",
    category: "Plushies",
    price: 999,
    originalPrice: 1299,
    rating: 5.0,
    reviewsCount: 35,
    image: "/assets/plushie_bear.png",
    images: ["/assets/plushie_bear.png", "/assets/gift_unboxing.png"],
    badge: "Must Have",
    badgeColor: "sage",
    description: "Extremely soft and cuddly amigurumi plushie bear. Handcrafted with plush cotton yarn and safety eyes. Features a adorable dusty rose bow tie. An unforgettable birthday or anniversary gift!",
    stock: 5,
    isCustomizable: true,
    variants: [
      { color: "Cream & Rose Bow", hex: "#F4EBE1" },
      { color: "Honey Brown", hex: "#C68B59" }
    ],
    details: [
      "Hypoallergenic polyfill stuffing",
      "Child-safe embroidered nose & safety eyes",
      "Soft washable cotton yarn",
      "Height: ~22cm sitting"
    ]
  },
  {
    id: "cro-004",
    sku: "BAG-TOTE-004",
    name: "Pastel Blossom Granny Square Tote",
    category: "Bags",
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 18,
    image: "/assets/tote_bag.png",
    images: ["/assets/tote_bag.png"],
    badge: "Artisan Edition",
    badgeColor: "rose",
    description: "A trendy aesthetic shoulder tote bag meticulously crocheted with pastel floral granny squares. Comes with a soft inner cotton lining and sturdy reinforced straps. Fits iPad, notebooks, and daily essentials.",
    stock: 4,
    isCustomizable: false,
    variants: [
      { color: "Pastel Meadow", hex: "#D8E2DC" },
      { color: "Boho Earth Tones", hex: "#D4A373" }
    ],
    details: [
      "Handwoven 100% thick cotton thread",
      "Inner magnetic snap closure & slip pocket",
      "Machine washable on gentle cold cycle",
      "Dimensions: 34cm x 38cm (stretchy)"
    ]
  },
  {
    id: "cro-005",
    sku: "KEY-TULIP-005",
    name: "Trio Pastel Tulip Keychains Set",
    category: "Keychains",
    price: 499,
    originalPrice: 650,
    rating: 4.7,
    reviewsCount: 54,
    image: "/assets/keychain_tulip.png",
    images: ["/assets/keychain_tulip.png"],
    badge: "Value Pack",
    badgeColor: "sage",
    description: "Set of 3 charming mini tulip flower keychains in soft pastel pink, mint, and lilac. Comes with sturdy gold-tone metal keyrings. Ideal for backpacks, car keys, or gifting to best friends!",
    stock: 15,
    isCustomizable: true,
    variants: [
      { color: "Pastel Trio (Pink, Mint, Lilac)", hex: "#E8AEB7" }
    ],
    details: [
      "Includes 3 separate keychains",
      "Anti-tarnish gold brass ring & clasp",
      "Durable stitching for everyday key use",
      "Size: 8cm flower drop length"
    ]
  },
  {
    id: "cro-006",
    sku: "BUNDLE-GIFT-006",
    name: "Love & Blooms Deluxe Unboxing Set",
    category: "Gift Sets",
    price: 2499,
    originalPrice: 3199,
    rating: 5.0,
    reviewsCount: 61,
    image: "/assets/gift_unboxing.png",
    images: ["/assets/gift_unboxing.png", "/assets/hero_bouquet.png", "/assets/keychain_tulip.png"],
    badge: "Gift Special",
    badgeColor: "gold",
    description: "The ultimate handcrafted gift box! Contains 1 Regal Crochet Rose Bouquet, 1 Cream Bear Plushie, 1 Pastel Tulip Keychain, and a customized calligraphy gift card inside a premium unboxing gift box.",
    stock: 6,
    isCustomizable: true,
    variants: [
      { color: "Deluxe Rose Gift Set", hex: "#C08E88" }
    ],
    details: [
      "Curated 4-in-1 combo with instant 20% bundle savings",
      "Includes luxury gift packaging & wax seal card",
      "Custom name tag printing available at checkout",
      "Ships with protective bubble packaging"
    ]
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Creations" },
  { id: "Floral Bouquets", label: "Floral Bouquets 🌸" },
  { id: "Keychains", label: "Keychains 🔑" },
  { id: "Bags", label: "Bags & Totes 👜" },
  { id: "Plushies", label: "Plushies 🧸" },
  { id: "Home Decor", label: "Home Decor 🪴" },
  { id: "Gift Sets", label: "Gift Bundles 🎁" }
];
