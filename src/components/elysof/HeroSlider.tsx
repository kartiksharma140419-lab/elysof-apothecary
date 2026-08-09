import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

type SlideDef = {
  productId: string;
  eyebrow: string;
  line1: string;
  line2: string;
  pill: string;
  bullets: string[];
  cta: string;
  stamp: string;
  colorA: string;
  colorB: string;
};

const SLIDES: SlideDef[] = [
  {
    productId: "neem",
    eyebrow: "🌿 AYURVEDIC FORMULA",
    line1: "Clear Skin.",
    line2: "Neem Does That.",
    pill: "Powered With Pure Neem Extract",
    bullets: ["Anti-Acne & Anti-Bacterial", "Ayurvedic Inspired Formula"],
    cta: "Shop Neem Soap",
    stamp: "100% NATURAL ✦ AYURVEDIC ✦ ",
    colorA: "#1A2E1A",
    colorB: "#223322",
  },
  {
    productId: "glutasof",
    eyebrow: "✨ SKIN BRIGHTENING",
    line1: "Glow Like",
    line2: "You Mean It.",
    pill: "Glutathione · Kojic Acid · Alpha Arbutin",
    bullets: ["Brightens & Rejuvenates", "For Uneven Skin Tone"],
    cta: "Shop Facewash",
    stamp: "DERMATOLOGICALLY TESTED ✦ pH BALANCED ✦ ",
    colorA: "#0D1B2A",
    colorB: "#122234",
  },
  {
    productId: "honey-almond",
    eyebrow: "🍯 NOURISHING DUAL CARE",
    line1: "Scrub. Glow.",
    line2: "Repeat.",
    pill: "Honey & Almond · 2-in-1 Formula",
    bullets: ["Exfoliates Gently", "Nourishes Deeply"],
    cta: "Shop Now",
    stamp: "HANDCRAFTED WITH CARE ✦ 125g ✦ ",
    colorA: "#1E1208",
    colorB: "#2A1A0A",
  },
  {
    productId: "sandalwood-kesar",
    eyebrow: "🪷 PREMIUM LUXURY SOAP",
    line1: "Soothing.",
    line2: "Divine. Elegant.",
    pill: "Sandalwood · Saffron (Kesar)",
    bullets: ["Calms & Soothes Skin", "Luxurious Fragrance"],
    cta: "Shop Now",
    stamp: "A PREMIUM LUXURY SOAP ✦ 100g ✦ ",
    colorA: "#1A0F0A",
    colorB: "#251508",
  },
];

const MARQUEE_ITEMS = [
  "🌿 The Essence of Soft Elegance",
  "Pure Neem. Pure Care.",
  "Handcrafted with Love",
  "No Parabens. No SLS. No Compromise.",
  "Ayurvedic Skincare for Modern India",
  "Trusted by 1000+ Happy Customers",
];

function sunburst(a: string, b: string) {
  const stops: string[] = [];
  for (let deg = 0; deg <= 360; deg += 15) {
    stops.push(`${deg % 30 === 0 ? a : b} ${deg}deg`);
  }
  return `conic-gradient(from 0deg at 60% 50%, ${stops.join(", ")})`;
}

function RotatingStamp({ text }: { text: string }) {
  const chars = (text + text).split("");
  const radius = 58;
  return (
    <div className="pointer-events-none absolute -right-2 -top-2 h-32 w-32 sm:right-4 sm:top-4 sm:h-36 sm:w-36">
      <div
        className="relative h-full w-full rounded-full border border-[#FFFC81]/70"
        style={{ animation: "elysof-spin 20s linear infinite" }}
      >
        {chars.map((c, i) => {
          const angle = (i / chars.length) * 360;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 origin-[0_0] text-[10px] font-bold tracking-[0.15em] text-[#FFFC81]"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`,
              }}
            >
              {c}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const { add } = useCart();

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
    touchX.current = null;
  };

  const handleCta = (productId: string) => {
    const p = products.find((x) => x.id === productId);
    if (p) add(p);
  };

  return (
    <section className="relative w-full bg-[#0A0A0A]" aria-label="Featured products">
      <style>{`
        @keyframes elysof-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes elysof-slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes elysof-floatIn { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes elysof-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .elysof-slide.is-active .e-eyebrow { animation: elysof-slideUp .4s ease-out .05s both; }
        .elysof-slide.is-active .e-headline { animation: elysof-slideUp .4s ease-out .15s both; }
        .elysof-slide.is-active .e-bullets { animation: elysof-slideUp .4s ease-out .25s both; }
        .elysof-slide.is-active .e-cta { animation: elysof-slideUp .4s ease-out .35s both; }
        .elysof-slide.is-active .e-image { animation: elysof-floatIn .5s ease-out .1s both; }
        .elysof-marquee-track { animation: elysof-marquee 28s linear infinite; }
        .elysof-marquee:hover .elysof-marquee-track { animation-play-state: paused; }
      `}</style>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: `translateX(calc(-${current} * (100% - 100px)))`,
          }}
        >
          {SLIDES.map((s, idx) => {
            const product = products.find((p) => p.id === s.productId)!;
            const isActive = idx === current;
            return (
              <div
                key={s.productId}
                className={`elysof-slide ${isActive ? "is-active" : ""} relative flex-shrink-0`}
                style={{
                  width: "calc(100% - 100px)",
                  marginRight: "24px",
                  minHeight: "min(85vh, 720px)",
                  background: sunburst(s.colorA, s.colorB),
                }}
              >
                <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-10 md:py-16">
                  <div className="text-white">
                    <div
                      className="e-eyebrow mb-5 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFFC81] sm:text-xs"
                      style={{ fontFamily: "'Space Mono', ui-monospace, monospace" }}
                    >
                      {s.eyebrow}
                    </div>
                    <h2
                      className="e-headline font-black leading-[0.95] tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: "clamp(38px, 6vw, 72px)",
                      }}
                    >
                      <span className="block text-white">{s.line1}</span>
                      <span className="block text-[#FFFC81]">{s.line2}</span>
                    </h2>
                    <div className="e-bullets mt-6 space-y-4">
                      <div className="inline-block bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
                        {s.pill}
                      </div>
                      <ul className="space-y-2 pt-2 text-base font-bold text-white sm:text-lg">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-3">
                            <span className="text-[#FFFC81]">✦</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleCta(s.productId)}
                      className="e-cta group mt-7 inline-flex items-center gap-2 bg-[#FFFC81] px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#FFFC81] sm:text-base"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {s.cta}{" "}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>

                  <div className="relative flex h-full items-center justify-center">
                    <RotatingStamp text={s.stamp} />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="e-image relative z-0 max-h-[280px] w-auto object-contain sm:max-h-[380px] md:max-h-[440px]"
                      style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.45))" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className="h-2 transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                background: i === current ? "#FFFC81" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="elysof-marquee w-full overflow-hidden border-t border-[#FFFC81] bg-[#0A0A0A]">
        <div
          className="elysof-marquee-track flex whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span
                    className="px-8 text-[13px] font-medium uppercase tracking-[0.08em] text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: "44px" }}
                  >
                    {item}
                  </span>
                  <span className="text-[10px] text-[#FFFC81]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
