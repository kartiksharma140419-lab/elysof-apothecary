import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import comboPackImage from "@/assets/combo-pack.jpeg.asset.json";

const COMBO_PRICE = 499;
const COMBO_MRP = 1215;
const SAVINGS = COMBO_MRP - COMBO_PRICE;
const PERCENT_OFF = Math.round((SAVINGS / COMBO_MRP) * 100);

const ORDER = ["glutasof", "neem", "sandalwood-kesar", "honey-almond"];

const BENEFITS: Record<string, { name: string; desc: string }> = {
  glutasof: { name: "Glutasof Facewash", desc: "Brightening & Rejuvenating" },
  neem: { name: "Neem Soap", desc: "Purifies & Protects Skin" },
  "sandalwood-kesar": { name: "Sandalwood & Kesar Soap", desc: "Soothing & Luxurious Care" },
  "honey-almond": { name: "Honey & Almond Scrub Soap", desc: "Nourishes & Exfoliates" },
};

const ROTATIONS = ["rotate(-6deg) translateY(8px)", "rotate(-2deg)", "rotate(2deg)", "rotate(6deg) translateY(8px)"];

function RotatingBadge() {
  const text = "★ BEST VALUE ★ COMBO DEAL ";
  const chars = text.split("");
  const radius = 32;
  return (
    <div className="pointer-events-none absolute -left-5 -top-5 z-10 h-20 w-20">
      <div
        className="relative h-full w-full rounded-full border border-[#FFFC81] bg-[#0A0A0A]"
        style={{ animation: "combo-spin 20s linear infinite" }}
      >
        {chars.map((c, i) => {
          const angle = (i / chars.length) * 360;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 origin-[0_0] text-[8px] font-bold text-[#FFFC81]"
              style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)` }}
            >
              {c}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function ComboOffer() {
  const { items, setQty, add } = useCart();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 800;
    const delay = 600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.max(0, now - start - delay);
      const p = Math.min(1, t / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayPrice(Math.round(eased * COMBO_PRICE));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const addCombo = () => {
    ORDER.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (!p) return;
      const existing = items.find((i) => i.product.id === id);
      if (existing) setQty(id, existing.qty + 1);
      else add(p);
    });
    toast.success(`Combo added! You saved ₹${SAVINGS}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] text-white"
      aria-label="ElySof Combo Pack offer"
    >
      <style>{`
        @keyframes combo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes combo-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(1.4); } }
        @keyframes combo-slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes combo-fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes combo-panelIn { from { opacity: 0; transform: translateX(40px) scale(.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes combo-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .combo-in .c-urgency { animation: combo-slideDown .5s ease-out both; }
        .combo-in .c-headline { animation: combo-fadeUp .6s ease-out .15s both; }
        .combo-in .c-product-0 { animation: combo-fadeUp .6s ease-out .30s both; }
        .combo-in .c-product-1 { animation: combo-fadeUp .6s ease-out .40s both; }
        .combo-in .c-product-2 { animation: combo-fadeUp .6s ease-out .50s both; }
        .combo-in .c-product-3 { animation: combo-fadeUp .6s ease-out .60s both; }
        .combo-in .c-panel { animation: combo-panelIn .6s ease-out .40s both; }
        .combo-in .c-trust { animation: combo-fadeUp .6s ease-out .90s both; }
        .combo-cta {
          background-image: linear-gradient(110deg, #FFFC81 40%, #fffde8 50%, #FFFC81 60%);
          background-size: 200% 100%;
          animation: combo-shimmer 4s ease-in-out infinite;
        }
        .combo-cta:hover { background: #0A0A0A; animation: none; }
        .combo-strike { position: relative; }
        .combo-strike::after {
          content: ''; position: absolute; left: -4%; right: -4%; top: 52%;
          height: 2px; background: #FF3B30; transform: rotate(-3deg);
        }
      `}</style>

      <div className={inView ? "combo-in" : ""}>
        {/* Urgency strip */}
        <div className="c-urgency flex h-10 items-center justify-center gap-3 bg-[#FF3B30] px-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFFC81]" style={{ animation: "combo-pulse 1.5s ease-in-out infinite" }} />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.1em] text-white sm:text-[13px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Limited Time Offer · Combo Pack Ends Soon
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFFC81]" style={{ animation: "combo-pulse 1.5s ease-in-out infinite" }} />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
            {/* LEFT */}
            <div className="c-headline min-w-0">
              <div
                className="mb-4 text-[12px] tracking-[0.2em] text-[#FFFC81]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                ✦ THE COMPLETE RITUAL ✦
              </div>
              <h2
                className="font-black leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 48px)" }}
              >
                <span className="block text-white">Everything Your Skin</span>
                <span className="block text-[#FFFC81]">Needs. One Combo.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/55" style={{ fontFamily: "Inter, sans-serif" }}>
                Get all 4 ElySof bestsellers — Glutasof Facewash, Neem Soap, Sandalwood & Kesar Soap, and Honey & Almond Scrub Soap — in a single combo built for complete daily care.
              </p>

              {/* Product stack */}
              <div className="relative mt-10 flex h-[260px] items-end justify-center sm:h-[280px]">
                {ORDER.map((id, idx) => {
                  const p = products.find((x) => x.id === id)!;
                  return (
                    <div
                      key={id}
                      className={`c-product-${idx} relative`}
                      style={{
                        width: "clamp(90px, 14vw, 140px)",
                        marginLeft: idx === 0 ? 0 : "-24px",
                        zIndex: idx + 1,
                        transform: ROTATIONS[idx],
                        filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
                        transition: "transform 300ms ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-12px) rotate(0deg) scale(1.08)";
                        (e.currentTarget as HTMLDivElement).style.zIndex = "20";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = ROTATIONS[idx];
                        (e.currentTarget as HTMLDivElement).style.zIndex = String(idx + 1);
                      }}
                    >
                      <img src={p.image} alt={p.name} className="h-auto w-full object-contain" />
                    </div>
                  );
                })}
              </div>

              {/* Benefit tags */}
              <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ORDER.map((id) => {
                  const b = BENEFITS[id];
                  return (
                    <div
                      key={id}
                      className="flex flex-col gap-0.5 border border-[#222] bg-[#111] px-4 py-2.5 sm:border-l sm:border-r sm:border-b sm:border-t"
                      style={{ borderLeftWidth: 4, borderLeftColor: "#FFFC81" }}
                    >
                      <span
                        className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#FFFC81]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {b.name}
                      </span>
                      <span className="text-[12px] text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                        {b.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — Price panel */}
            <div
              className="c-panel relative border-2 border-[#FFFC81] bg-[#111] p-8 sm:p-10"
              style={{ overflow: "visible" }}
            >
              <RotatingBadge />
              <div
                className="pointer-events-none absolute right-0 top-0 h-0 w-0"
                style={{ borderStyle: "solid", borderWidth: "0 36px 36px 0", borderColor: "transparent #FFFC81 transparent transparent" }}
              />

              {/* MRP */}
              <div className="flex items-center gap-3">
                <span className="bg-[#222] px-2 py-0.5 text-[11px] font-semibold uppercase text-white">MRP</span>
                <span
                  className="combo-strike text-[28px] text-white/40 sm:text-[32px]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  ₹{COMBO_MRP.toLocaleString("en-IN")}/-
                </span>
              </div>

              {/* Combo price */}
              <div className="mt-5">
                <div
                  className="text-[13px] uppercase tracking-[0.15em] text-[#FFFC81]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Combo Price
                </div>
                <div
                  className="leading-none text-[#FFFC81]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(56px, 9vw, 84px)" }}
                >
                  ₹{displayPrice}/-
                </div>
                <div
                  className="mt-1 text-[14px] uppercase tracking-[0.1em] text-white/60"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Only
                </div>
              </div>

              {/* Savings */}
              <div
                className="mt-5 bg-[#FF3B30] px-4 py-2.5 text-center text-[14px] font-bold uppercase tracking-[0.05em] text-white sm:text-[15px]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                You Save ₹{SAVINGS} ({PERCENT_OFF}% Off)
              </div>

              {/* Checklist */}
              <ul className="mt-6 space-y-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {ORDER.map((id) => {
                  const p = products.find((x) => x.id === id)!;
                  return (
                    <li key={id} className="flex items-center justify-between gap-3 text-[14px] text-white">
                      <span className="flex items-center gap-2">
                        <span className="text-[#FFFC81]">✓</span>
                        {BENEFITS[id].name}
                      </span>
                      <span className="text-white/55">Worth ₹{p.mrp}</span>
                    </li>
                  );
                })}
                <li className="my-3 border-t border-dashed border-white/20" />
                <li className="flex items-center justify-between text-[14px]">
                  <span className="text-white/70">Total Value: ₹{COMBO_MRP.toLocaleString("en-IN")}</span>
                  <span className="font-bold text-[#FFFC81]">You Pay: ₹{COMBO_PRICE}</span>
                </li>
              </ul>

              {/* CTA */}
              <button
                onClick={addCombo}
                className="combo-cta mt-7 w-full border-2 border-[#FFFC81] px-6 py-4 text-[16px] font-extrabold uppercase tracking-[0.05em] text-[#0A0A0A] transition-all hover:-translate-y-0.5 hover:text-[#FFFC81] sm:text-[18px]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Add Combo to Cart →
              </button>

              <p
                className="mt-3 text-center text-[12px] text-white/45"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                🚚 Free Shipping · 🔒 Secure Razorpay Checkout · ↩️ 7-Day Return
              </p>
            </div>
          </div>

          {/* Trust strip */}
          <div className="c-trust mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[#222] pt-6">
            {[
              { icon: "✓", label: "100% Original" },
              { icon: "🌿", label: "Natural Ingredients" },
              { icon: "💧", label: "Dermatologically Tested" },
              { icon: "⚖️", label: "pH Balanced" },
              { icon: "👤", label: "Suitable For All Skin Types" },
            ].map((t, i, arr) => (
              <div key={t.label} className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.03em] text-white/70 sm:text-[12px]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="text-[#FFFC81]">{t.icon}</span>
                  {t.label}
                </div>
                {i < arr.length - 1 && <span className="hidden h-4 w-px bg-[#333] sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
