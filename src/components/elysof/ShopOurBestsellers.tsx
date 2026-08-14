import { useState } from "react";
import { Star, CheckCircle2, ChevronDown, ShoppingBag, Sparkles, Check } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { combos, type ComboProduct } from "@/lib/combos";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { ComboDetailModal } from "./ComboDetailModal";
import { CheckoutModal } from "./CheckoutModal";

import sandalwoodImg from "@/assets/sandalwood-kesar-new.png";
import sandalwoodPack2 from "@/assets/sandalwood-kesar-pack-2.jpg";
import sandalwoodPack3 from "@/assets/sandalwood-kesar-pack-3.jpg";

import neemImg from "@/assets/neem.jpeg";
import neemPack2 from "@/assets/neem-soap-pack-2.jpg";
import neemPack3 from "@/assets/neem-soap-pack-3.jpg";

import honeyAlmondImg from "@/assets/honey-almond.jpeg";
import honeyAlmondPack2 from "@/assets/honey-almond-pack-2.jpg";
import honeyAlmondPack3 from "@/assets/honey-almond-pack-3.jpg";

import glutasofImg from "@/assets/glutasof.jpeg";
import comboPackFull from "@/assets/combo-pack.jpeg";

export type PackOption = {
  id: string;
  label: string;
  packCount: number;
  price: number;
  mrp: number;
  discountPercent: number;
  savings: number;
  image: string;
  isCombo: boolean;
  comboId?: string;
  productId: string;
};

export type BestsellerItem = {
  id: string;
  title: string;
  badge: string;
  badgeColor?: string;
  rating: number;
  reviewsCount: number;
  socialProof: string;
  teaser: string;
  defaultImage: string;
  productId: string;
  packs: PackOption[];
};

export const bestsellerList: BestsellerItem[] = [
  {
    id: "sandalwood-kesar",
    title: " SANDALWOOD & KESAR SOAP",
    badge: "Bestseller",
    badgeColor: "bg-[#F5C542]",
    rating: 4.8,
    reviewsCount: 4410,
    socialProof: "10L+ Sold Out!!",
    teaser: "Watch those tan lines vanish with pure Mysore Sandalwood & Kashmiri Saffron.",
    defaultImage: sandalwoodImg,
    productId: "sandalwood-kesar",
    packs: [
      {
        id: "pack-1",
        label: "Pack of 1 (60% off)",
        packCount: 1,
        price: 99,
        mrp: 250,
        discountPercent: 60,
        savings: 151,
        image: sandalwoodImg,
        isCombo: false,
        productId: "sandalwood-kesar",
      },
      {
        id: "pack-2",
        label: "Pack of 2 (70% off)",
        packCount: 2,
        price: 149,
        mrp: 500,
        discountPercent: 70,
        savings: 351,
        image: sandalwoodPack2,
        isCombo: true,
        comboId: "sandalwood-kesar-pack-2",
        productId: "sandalwood-kesar",
      },
      {
        id: "pack-3",
        label: "Pack of 3 (73% off)",
        packCount: 3,
        price: 199,
        mrp: 750,
        discountPercent: 73,
        savings: 551,
        image: sandalwoodPack3,
        isCombo: true,
        comboId: "sandalwood-kesar-pack-3",
        productId: "sandalwood-kesar",
      },
    ],
  },
  {
    id: "neem",
    title: "PURE NEEM ANTI-ACNE SOAP",
    badge: "Acne Defense",
    badgeColor: "bg-[#86efac]",
    rating: 4.8,
    reviewsCount: 3820,
    socialProof: "Dermatologist Tested!",
    teaser: "Target stubborn body acne & calm skin irritation with cold-pressed neem.",
    defaultImage: neemImg,
    productId: "neem",
    packs: [
      {
        id: "pack-1",
        label: "Pack of 1 (60% off)",
        packCount: 1,
        price: 89,
        mrp: 225,
        discountPercent: 60,
        savings: 136,
        image: neemImg,
        isCombo: false,
        productId: "neem",
      },
      {
        id: "pack-2",
        label: "Pack of 2 (71% off)",
        packCount: 2,
        price: 129,
        mrp: 450,
        discountPercent: 71,
        savings: 321,
        image: neemPack2,
        isCombo: true,
        comboId: "neem-pack-2",
        productId: "neem",
      },
      {
        id: "pack-3",
        label: "Pack of 3 (73% off)",
        packCount: 3,
        price: 179,
        mrp: 675,
        discountPercent: 73,
        savings: 496,
        image: neemPack3,
        isCombo: true,
        comboId: "neem-pack-3",
        productId: "neem",
      },
    ],
  },
  {
    id: "honey-almond",
    title: "HONEY & ALMOND 2-IN-1 SCRUB",
    badge: "New Launch",
    badgeColor: "bg-[#FED7AA]",
    rating: 4.9,
    reviewsCount: 2940,
    socialProof: "Mom-approved!",
    teaser: "Gentle crushed almond micro-exfoliation + raw mountain honey moisture lock.",
    defaultImage: honeyAlmondImg,
    productId: "honey-almond",
    packs: [
      {
        id: "pack-1",
        label: "Pack of 1 (56% off)",
        packCount: 1,
        price: 109,
        mrp: 250,
        discountPercent: 56,
        savings: 141,
        image: honeyAlmondImg,
        isCombo: false,
        productId: "honey-almond",
      },
      {
        id: "pack-2",
        label: "Pack of 2 (66% off)",
        packCount: 2,
        price: 169,
        mrp: 500,
        discountPercent: 66,
        savings: 331,
        image: honeyAlmondPack2,
        isCombo: true,
        comboId: "honey-almond-pack-2",
        productId: "honey-almond",
      },
      {
        id: "pack-3",
        label: "Pack of 3 (67% off)",
        packCount: 3,
        price: 249,
        mrp: 750,
        discountPercent: 67,
        savings: 501,
        image: honeyAlmondPack3,
        isCombo: true,
        comboId: "honey-almond-pack-3",
        productId: "honey-almond",
      },
    ],
  },
  {
    id: "glutasof",
    title: "GLUTASOF RADIANCE FACE WASH",
    badge: "Glow Formula",
    badgeColor: "bg-[#BAE6FD]",
    rating: 4.8,
    reviewsCount: 1850,
    socialProof: "Visible Glow in 14 Days!",
    teaser: "Enriched with Glutathione, Kojic Acid & Alpha Arbutin for clear, radiant skin.",
    defaultImage: glutasofImg,
    productId: "glutasof",
    packs: [
      {
        id: "pack-1",
        label: "Pack of 1 (39% off)",
        packCount: 1,
        price: 299,
        mrp: 490,
        discountPercent: 39,
        savings: 191,
        image: glutasofImg,
        isCombo: false,
        productId: "glutasof",
      },
      {
        id: "pack-2",
        label: "Pack of 2 (49% off)",
        packCount: 2,
        price: 499,
        mrp: 980,
        discountPercent: 49,
        savings: 481,
        image: glutasofImg,
        isCombo: false,
        productId: "glutasof",
      },
    ],
  },
  {
    id: "complete-ritual-box",
    title: "COMPLETE 4-PRODUCT RITUAL BOX",
    badge: "Mega Saver",
    badgeColor: "bg-[#FDE047]",
    rating: 5.0,
    reviewsCount: 1420,
    socialProof: "All 4 Signature Essentials!",
    teaser: "1x Glutasof 100ml + 1x Neem + 1x Sandalwood + 1x Honey Scrub in festive gift box.",
    defaultImage: comboPackFull,
    productId: "complete-ritual-box",
    packs: [
      {
        id: "pack-1",
        label: "Full 4-Item Box (59% off)",
        packCount: 4,
        price: 499,
        mrp: 1215,
        discountPercent: 59,
        savings: 716,
        image: comboPackFull,
        isCombo: true,
        comboId: "complete-ritual-box",
        productId: "complete-ritual-box",
      },
    ],
  },
];

export function ShopOurBestsellers() {
  const { add } = useCart();
  // State to track selected pack for each product item
  const [selectedPackMap, setSelectedPackMap] = useState<Record<string, string>>({
    "sandalwood-kesar": "pack-1",
    "neem": "pack-1",
    "honey-almond": "pack-1",
    "glutasof": "pack-1",
    "complete-ritual-box": "pack-1",
  });

  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [selectedComboForModal, setSelectedComboForModal] = useState<ComboProduct | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handlePackChange = (itemId: string, packId: string) => {
    setSelectedPackMap((prev) => ({ ...prev, [itemId]: packId }));
  };

  const handleAddToCart = (item: BestsellerItem) => {
    const selectedPackId = selectedPackMap[item.id] || item.packs[0].id;
    const selectedPack = item.packs.find((p) => p.id === selectedPackId) || item.packs[0];

    if (selectedPack.isCombo && selectedPack.comboId) {
      // Find combo from combos library
      const combo = combos.find((c) => c.id === selectedPack.comboId);
      if (combo) {
        add(combo);
        toast.success(`🎉 ${combo.shortName} added to cart!`);
      } else {
        const prod = products.find((p) => p.id === selectedPack.productId);
        if (prod) add(prod);
      }
    } else {
      // Regular single product
      const prod = products.find((p) => p.id === selectedPack.productId);
      if (prod) {
        add(prod);
        toast.success(`🌿 ${prod.shortName} (${selectedPack.label}) added to cart!`);
      }
    }

    // Brief feedback state on button
    setAddedMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="bestsellers" className="bg-white py-10 sm:py-14 border-b-2 border-ink scroll-mt-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        {/* Title Header matching Screenshot 2 */}
        <div className="text-center mb-6 sm:mb-10">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900"
            style={{ fontFamily: "'Space Grotesk', 'Playfair Display', sans-serif" }}
          >
            Shop Our Bestsellers
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 font-medium max-w-md mx-auto">
            100% Handcrafted Ayurvedic soaps & botanical skin essentials. Pick your pack and save up to 73%!
          </p>
        </div>

        {/* 2-Column Responsive Grid matching Screenshot 2 */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {bestsellerList.map((item) => {
            const currentPackId = selectedPackMap[item.id] || item.packs[0].id;
            const currentPack = item.packs.find((p) => p.id === currentPackId) || item.packs[0];
            const isAdded = addedMap[item.id];

            return (
              <div
                key={item.id}
                id={`product-${item.id}`}
                className="flex flex-col border border-neutral-300 sm:border-2 sm:border-neutral-900 bg-white overflow-hidden shadow-sm transition hover:shadow-md scroll-mt-24"
              >
                {/* 1. Image Container with Badge */}
                <div className="relative aspect-square w-full bg-[#fbf6ee] border-b border-neutral-200 p-2 sm:p-4 flex items-center justify-center group overflow-hidden">
                  <img
                    src={currentPack.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top-Left Badge (Screenshot style) */}
                  <span
                    className={`absolute left-1.5 top-1.5 sm:left-2 sm:top-2 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wide border border-black/20 text-neutral-950 shadow-sm ${item.badgeColor || "bg-[#F5C542]"
                      }`}
                  >
                    {item.badge}
                  </span>

                  {/* Savings Tag top-right on multi-packs */}
                  {currentPack.savings > 0 && (
                    <span className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 bg-[#941128] text-[#FFE898] px-1.5 py-0.5 text-[8px] sm:text-[10px] font-black uppercase tracking-wider rounded-sm shadow">
                      Save ₹{currentPack.savings}
                    </span>
                  )}
                </div>

                {/* 2. Product Content Area */}
                <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3
                      className="font-black text-xs sm:text-sm uppercase tracking-tight text-neutral-950 line-clamp-2 leading-snug"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      title={item.title}
                    >
                      {item.title}
                    </h3>

                    {/* Ratings & Verified Reviews */}
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] sm:text-xs">
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        <Star size={12} fill="currentColor" strokeWidth={0} />
                        {item.rating}
                      </span>
                      <span className="text-neutral-400">·</span>
                      <span className="flex items-center gap-0.5 text-blue-600 font-semibold">
                        <CheckCircle2 size={11} className="fill-blue-600 text-white" />
                        <span className="text-neutral-700 text-[10px] sm:text-[11px]">
                          {item.reviewsCount.toLocaleString()} Reviews
                        </span>
                      </span>
                    </div>

                    {/* Social Proof Line in Terracotta/Orange */}
                    <p className="text-[11px] font-bold text-[#B2511E] tracking-tight mt-0.5">
                      {item.socialProof}
                    </p>

                    {/* Teaser Benefit */}
                    <p className="mt-1 text-[10px] sm:text-[11px] text-neutral-600 line-clamp-2 leading-tight">
                      {item.teaser}
                    </p>

                    {/* 3. Pack Selector Dropdown (Ghar-Soaps Style) */}
                    <div className="mt-2.5 relative">
                      <select
                        value={currentPackId}
                        onChange={(e) => handlePackChange(item.id, e.target.value)}
                        className="w-full appearance-none border border-neutral-400 bg-neutral-50 px-2.5 py-1.5 text-[10px] sm:text-xs font-bold text-neutral-900 focus:border-black focus:outline-none cursor-pointer rounded-none pr-7 shadow-inner"
                      >
                        {item.packs.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-700"
                      />
                    </div>
                  </div>

                  {/* 4. Pricing & Add to Cart */}
                  <div className="mt-3">
                    {/* Price Row */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[11px] sm:text-xs text-neutral-400 line-through font-mono">
                        ₹{currentPack.mrp}
                      </span>
                      <span className="text-sm sm:text-base font-black text-neutral-950">
                        ₹{currentPack.price}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black text-green-700">
                        ({currentPack.discountPercent}% off)
                      </span>
                    </div>

                    {/* 5. Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`mt-2 w-full py-2 sm:py-2.5 px-3 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${isAdded
                        ? "bg-green-700 text-white"
                        : "bg-black text-white hover:bg-neutral-800 active:scale-[0.98]"
                        }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={13} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore More Combos & Solo Products Button Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="text-xs text-neutral-600 font-medium">
            Looking for something specific?
          </span>
          <a
            href="/combos"
            className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
          >
            <Sparkles size={13} /> View All Multi-Pack Value Combos →
          </a>
        </div>

      </div>

      {/* Explore Detail Modal */}
      <ComboDetailModal
        combo={selectedComboForModal}
        onClose={() => setSelectedComboForModal(null)}
        onAddToCart={(c) => {
          add(c);
          toast.success(`${c.shortName} added to cart!`);
        }}
        onBuyNow={(c) => {
          add(c);
          setSelectedComboForModal(null);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </section>
  );
}
