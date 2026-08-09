import { useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { CheckoutModal } from "./CheckoutModal";
import rakhiAsset from "@/assets/rakhi-offer.jpeg.asset.json";

const RAKHI_IDS = ["neem", "sandalwood-kesar", "honey-almond"];
const RAKHI_PRICE = 199;
const RAKHI_MRP = 250 + 250 + 225;
const RAKHI_SAVE = RAKHI_MRP - RAKHI_PRICE;

export function RakhiOffer() {
  const { items, add, setQty, setOpen: setCartOpen } = useCart();
  const [checkout, setCheckout] = useState(false);

  const addSet = () => {
    RAKHI_IDS.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (!p) return;
      const existing = items.find((i) => i.product.id === id);
      if (existing) setQty(id, existing.qty + 1);
      else add(p);
    });
  };

  const onAddToCart = () => {
    addSet();
    toast.success(`Rakhi Special added! 3 soaps for ₹${RAKHI_PRICE}`);
  };

  const onBuyNow = () => {
    addSet();
    setCartOpen(false);
    setCheckout(true);
  };

  return (
    <section
      id="rakhi-offer"
      className="relative w-full overflow-hidden bg-[#3B0A12] text-white"
      aria-label="Rakhi Special Offer"
    >
      <style>{`
        @keyframes rakhi-shine { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        @keyframes rakhi-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes rakhi-pulse { 0%,100% { opacity:1; transform: scale(1) } 50% { opacity:.45; transform: scale(1.35) } }
        .rakhi-cta {
          background-image: linear-gradient(110deg,#F5C542 40%,#fff6d6 50%,#F5C542 60%);
          background-size: 200% 100%;
          animation: rakhi-shine 4s ease-in-out infinite;
        }
        .rakhi-frame { animation: rakhi-float 6s ease-in-out infinite; }
      `}</style>

      {/* Festival urgency strip */}
      <div className="flex h-10 items-center justify-center gap-3 bg-[#A3122B] px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]" style={{ animation: "rakhi-pulse 1.5s ease-in-out infinite" }} />
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] sm:text-[13px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Rakhi Special · Limited Time Festival Offer
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#F5C542]" style={{ animation: "rakhi-pulse 1.5s ease-in-out infinite" }} />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="text-center">
          <div className="text-[12px] tracking-[0.25em] text-[#F5C542]" style={{ fontFamily: "'Space Mono', monospace" }}>
            ✦ BEST RAKHI OFFER ✦
          </div>
          <h2
            className="mt-3 font-black leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px,5vw,46px)" }}
          >
            <span className="block">Buy 3 Premium Soaps</span>
            <span className="block text-[#F5C542]">@ ₹199 Only</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
            Neem Soap · Sandalwood &amp; Kesar Soap · Honey &amp; Almond Scrub Soap Bar — one perfect gift, because every
            bond deserves care.
          </p>
        </div>

        {/* Offer poster */}
        <div className="rakhi-frame mt-8 border-4 border-[#F5C542]" style={{ boxShadow: "0 20px 50px rgba(0,0,0,.5)" }}>
          <img
            src={rakhiAsset.url}
            alt="ElySof Rakhi Special Offer — Buy 3 premium soaps (Neem, Sandalwood & Kesar, Honey & Almond Scrub) for ₹199 only"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* Products included */}
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {RAKHI_IDS.map((id) => {
            const p = products.find((x) => x.id === id)!;
            return (
              <div
                key={id}
                className="flex items-center justify-between gap-3 border border-white/10 bg-white/5 px-4 py-3"
                style={{ borderLeftWidth: 4, borderLeftColor: "#F5C542" }}
              >
                <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#F5C542]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {p.shortName}
                </span>
                <span className="text-[12px] text-white/60">₹{p.mrp}</span>
              </div>
            );
          })}
        </div>

        {/* Price + CTAs */}
        <div className="mt-8 flex flex-col items-center gap-5 border-2 border-[#F5C542] bg-[#2A060D] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-center gap-4">
            <span className="text-[24px] text-white/45 line-through" style={{ fontFamily: "'Space Mono', monospace" }}>
              ₹{RAKHI_MRP}
            </span>
            <span
              className="leading-none text-[#F5C542]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(46px,8vw,72px)" }}
            >
              ₹{RAKHI_PRICE}
            </span>
            <span className="bg-[#A3122B] px-3 py-1 text-[13px] font-bold uppercase tracking-[0.05em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Save ₹{RAKHI_SAVE}
            </span>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              onClick={onAddToCart}
              className="w-full border-2 border-[#F5C542] px-6 py-4 text-[15px] font-extrabold uppercase tracking-[0.05em] text-[#F5C542] transition-all hover:-translate-y-0.5 hover:bg-[#F5C542] hover:text-[#2A060D] sm:text-[17px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Add Offer to Cart
            </button>
            <button
              onClick={onBuyNow}
              className="rakhi-cta w-full border-2 border-[#F5C542] px-6 py-4 text-[15px] font-extrabold uppercase tracking-[0.05em] text-[#2A060D] transition-all hover:-translate-y-0.5 sm:text-[17px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Buy Now @ ₹199 →
            </button>
          </div>

          <p className="text-center text-[12px] text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
            🎁 Perfect for Gifting · 🚚 Free Shipping · 🔒 Secure Checkout · 💵 Cash on Delivery Available
          </p>
        </div>
      </div>

      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </section>
  );
}
