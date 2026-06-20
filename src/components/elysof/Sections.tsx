import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Star, Leaf, Hand, ScaleIcon, HeartHandshake, ArrowRight, Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import { products, discount, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { CheckoutModal } from "./CheckoutModal";
import brandLogo from "@/assets/logo.png";
import beforeTired from "@/assets/before-tired.png";
import afterBright from "@/assets/after-bright.png";
import beforeAcne from "@/assets/before-acne.png";
import afterAcne from "@/assets/after-acne.png";
import beforeSoft from "@/assets/before-soft.png";
import afterSoft from "@/assets/after-soft.png";

/* ---------------- Announcement bar ---------------- */
const announcements = [
  "🌿 Free Shipping on Prepaid Orders above ₹299",
  "✨ 100% Natural Ingredients · No Parabens · No SLS",
  "🎁 Trusted by 1000+ Happy Customers Across India",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % announcements.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative z-50 bg-forest-deep text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center overflow-hidden px-4 text-center text-xs sm:text-sm">
        <motion.span
          key={i}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-medium tracking-wide"
        >
          {announcements[i]}
        </motion.span>
      </div>
    </div>
  );
}

/* ---------------- Bird logo (PNG) ---------------- */
function BirdLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <img
      src={brandLogo}
      alt="ElySof Logo"
      className={`${className} object-contain`}
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

/* ---------------- Navbar ---------------- */
export function Navbar() {
  const { count, setOpen: setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const navItems = [
    { label: "Home", id: "home" },
    { label: "Products", id: "products" },
    { label: "Our Story", id: "story" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];
  return (
    <header
      className={`sticky top-0 z-40 border-b-2 border-ink transition-all ${
        scrolled ? "bg-parchment/90 backdrop-blur" : "bg-parchment"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <BirdLogo className="h-8 w-8 shrink-0" />
          <div className="min-w-0">
            <p className="truncate font-display text-2xl leading-none">ElySof</p>
            <p className="font-accent text-[10px] italic text-muted-foreground">The Essence of Soft Elegance</p>
          </div>
        </a>
        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="relative text-sm font-medium uppercase tracking-wider text-ink transition hover:text-forest"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setCartOpen(true)}
          className="relative ml-auto lg:ml-0 flex h-10 items-center gap-2 border-2 border-ink bg-paper px-3 text-sm font-semibold transition hover:bg-ink hover:text-parchment"
          aria-label={`Cart (${count} items)`}
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Cart</span>
          <span className="grid h-5 min-w-[1.25rem] place-items-center bg-terracotta px-1 text-[11px] font-bold text-forest-deep">
            {count}
          </span>
        </button>
        <button
          onClick={() => setMenu((m) => !m)}
          className="grid h-10 w-10 place-items-center border-2 border-ink bg-paper lg:hidden"
          aria-label="Menu"
        >
          {menu ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menu && (
        <nav className="border-t-2 border-ink bg-parchment lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenu(false)}
                className="border-b border-line py-3 text-sm font-medium uppercase tracking-wider"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
const heroStories = [
  {
    tag: "Acne · cleared",
    before: ["bg-[oklch(0.78_0.05_50)]", "Breakouts"],
    after: ["bg-[oklch(0.88_0.04_70)]", "Clear & glowing"],
    quote: "Neem Soap cleared my breakouts in 3 weeks.",
    who: "Priya, Mumbai",
    beforeImg: beforeAcne,
    afterImg: afterAcne,
  },
  {
    tag: "Dullness · gone",
    before: ["bg-[oklch(0.72_0.01_70)]", "Tired & dull"],
    after: ["bg-[oklch(0.86_0.07_75)]", "Bright & radiant"],
    quote: "Glutasof Face Wash gave me my glow back.",
    who: "Ritika, Delhi",
    beforeImg: beforeTired,
    afterImg: afterBright,
  },
  {
    tag: "Dryness · hydrated",
    before: ["bg-[oklch(0.78_0.03_55)]", "Cracked & rough"],
    after: ["bg-[oklch(0.88_0.05_65)]", "Soft & smooth"],
    quote: "Honey & Almond Soap — my skin drinks it up.",
    who: "Anjali, Pune",
    beforeImg: beforeSoft,
    afterImg: afterSoft,
  },
];

function StoryCard() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % heroStories.length), 4500);
    return () => clearInterval(t);
  }, []);
  const s = heroStories[idx];
  return (
    <div className="relative w-full">
      <div className="absolute -inset-2 border-2 border-ink bg-terracotta/10" aria-hidden />
      <div className="relative border-2 border-ink bg-paper p-5 shadow-brut">
        <div className="flex items-center justify-between">
          <span className="border-2 border-ink bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {s.tag}
          </span>
          <div className="flex gap-1">
            {heroStories.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 w-6 border border-ink ${i === idx ? "bg-ink" : "bg-paper"}`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-4 grid grid-cols-2 gap-3"
        >
          <SkinPanel cls={s.before[0]} label="Before" sub={s.before[1]} acne={idx === 0} img={(s as any).beforeImg} />
          <SkinPanel cls={s.after[0]} label="After" sub={s.after[1]} glow={idx === 0} img={(s as any).afterImg} />
        </motion.div>

        <motion.blockquote
          key={`q-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-5 border-t-2 border-dashed border-ink pt-4"
        >
          <p className="font-accent text-base italic leading-snug">"{s.quote}"</p>
          <footer className="mt-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider">— {s.who}</span>
            <span className="text-gold">★★★★★</span>
          </footer>
        </motion.blockquote>
      </div>
    </div>
  );
}

function SkinPanel({
  cls,
  label,
  sub,
  acne,
  glow,
  img,
}: {
  cls?: string;
  label: string;
  sub: string;
  acne?: boolean;
  glow?: boolean;
  img?: string;
}) {
  return (
    <div className="relative overflow-hidden border-2 border-ink">
      <div className={`relative h-40 w-full ${cls || ""}`}>
        {img ? (
          <img src={img} alt={sub} className="h-full w-full object-cover" />
        ) : (
          acne && (
            <div className="absolute inset-0">
              {[..."abcdefgh"].map((k, i) => (
                <span
                  key={k}
                  className="absolute h-2 w-2 rounded-full bg-[oklch(0.55_0.15_25)]/70"
                  style={{ top: `${15 + ((i * 37) % 70)}%`, left: `${10 + ((i * 53) % 75)}%` }}
                />
              ))}
            </div>
          )
        )}
        {glow && !img && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-terracotta/30" />
        )}
        <div className="absolute bottom-0 left-0 m-2 border border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider z-10">
          {label}
        </div>
      </div>
      <p className="border-t border-ink bg-white px-2 py-1 text-center text-[11px] font-medium">{sub}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b-2 border-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 border-2 border-ink bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
            <Leaf size={12} /> Ayurvedic · Natural · Handcrafted
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
            Your Skin Deserves
            <br />
            <span className="text-forest">Ancient Wisdom,</span>
            <br />
            <em className="font-accent not-italic text-terracotta">Modern Care.</em>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            ElySof brings you premium handcrafted skincare powered by nature's finest — Neem, Honey,
            Almond, Sandalwood & Saffron.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#products"
              className="border-2 border-ink bg-forest px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Shop Now
            </a>
            <a
              href="#products"
              className="flex items-center gap-2 border-2 border-terracotta px-6 py-3 text-sm font-bold uppercase tracking-wider text-terracotta transition hover:bg-terracotta hover:text-primary-foreground"
            >
              Explore Products ↓
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
            {[
              ["🌿", "Natural"],
              ["⚖️", "pH Balanced"],
              ["💚", "No Parabens"],
              ["✋", "Handcrafted"],
            ].map(([e, t]) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden>{e}</span>
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center"
        >
          <StoryCard />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
const marqueeItems = [
  "🌿 Pure Neem Extract",
  "🍯 Honey & Almond Enriched",
  "🌸 Glutathione + Alpha Arbutin",
  "🪷 Sandalwood & Kesar",
  "✅ Dermatologically Tested",
  "💚 pH Balanced",
  "🕊️ Paraben Free",
  "🧪 SLS Free",
];

export function Marquee() {
  const list = [...marqueeItems, ...marqueeItems];
  return (
    <div className="border-b-2 border-ink bg-forest-deep py-3 text-primary-foreground">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap">
          {list.map((m, i) => (
            <span key={i} className="mx-6 font-accent text-sm tracking-wide">
              {m} <span className="mx-3 opacity-50">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Products ---------------- */
function ProductCard({ p, onBuy }: { p: Product; onBuy: (p: Product) => void }) {
  const { add } = useCart();
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group flex flex-col border-2 border-ink bg-paper shadow-brut-sm transition-shadow hover:shadow-brut"
    >
      <div className="relative aspect-square overflow-hidden border-b-2 border-ink bg-parchment">
        <img
          src={p.image}
          alt={p.shortName}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 border-2 border-ink bg-[#B2511E] px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
          {discount(p)}% OFF
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-gold">
          {[...Array(p.rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <h3 className="mt-2 font-display text-xl leading-tight">{p.shortName}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="border border-line bg-parchment px-2 py-0.5 font-accent text-[11px] italic">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-end gap-2">
          <span className="font-display text-2xl">₹{p.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{p.mrp}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              add(p);
              toast.success(`${p.shortName} added to cart`);
            }}
            className="border-2 border-ink bg-forest py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-forest-deep"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onBuy(p)}
            className="border-2 border-terracotta py-2.5 text-xs font-bold uppercase tracking-wider text-terracotta transition hover:bg-terracotta hover:text-forest-deep"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Products() {
  const { add, setOpen: setCartOpen } = useCart();
  const [checkout, setCheckout] = useState(false);

  const buyNow = (p: Product) => {
    add(p);
    setCartOpen(false);
    setCheckout(true);
  };

  return (
    <section id="products" className="border-b-2 border-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-accent text-sm italic text-forest">— Shop the range</span>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">Our Bestselling Products</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Handcrafted with care. Made for every skin type.
            </p>
          </div>
          <div className="border-2 border-ink bg-paper px-4 py-2 text-sm font-semibold">
            ⭐ 4.8/5 · 500+ reviews
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} onBuy={buyNow} />
          ))}
        </div>
      </div>
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </section>
  );
}

/* ---------------- Why ElySof (no cards, animated brutalism) ---------------- */
const pillars = [
  { icon: Leaf, title: "100% Natural", sub: "No harmful chemicals, ever" },
  { icon: ScaleIcon, title: "pH Balanced", sub: "Safe for everyday use" },
  { icon: Hand, title: "Handcrafted", sub: "Made in small batches with care" },
  { icon: HeartHandshake, title: "For Every Skin", sub: "Sensitive · oily · dry — all welcome" },
];

export function WhyElysof() {
  return (
    <section id="story" className="relative overflow-hidden border-b-2 border-ink bg-parchment py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl">
          <span className="font-accent text-sm italic text-forest">— Why ElySof</span>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl">
            Skincare straight from nature's kitchen.
          </h2>
        </div>

        <div className="mt-12 divide-y-2 divide-ink border-y-2 border-ink">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 transition-colors hover:bg-forest hover:text-primary-foreground sm:py-9"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-current text-forest group-hover:text-primary-foreground sm:h-16 sm:w-16">
                <p.icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary-foreground/70">
                  0{i + 1}
                </p>
                <h3 className="font-display text-2xl sm:text-4xl">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                  {p.sub}
                </p>
              </div>
              <ArrowRight
                size={28}
                className="hidden transition-transform group-hover:translate-x-1 sm:block"
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-10 mx-auto max-w-2xl text-center font-accent text-lg italic text-muted-foreground">
          "We believe your skin deserves ingredients straight from nature's kitchen."
        </p>
      </div>
    </section>
  );
}

/* ---------------- Results / Before-After ---------------- */
const results = [
  { who: "Priya · Mumbai", quote: "My acne is finally calm.", product: "Neem Soap", before: "oklch(0.78 0.05 50)", after: "#FF99CB", beforeImg: beforeAcne, afterImg: afterAcne },
  { who: "Ritika · Delhi", quote: "Brightness in 14 days.", product: "Glutasof Facewash", before: "oklch(0.72 0.01 70)", after: "#FF99CB", beforeImg: beforeTired, afterImg: afterBright },
  { who: "Anjali · Pune", quote: "Soft like never before.", product: "Honey & Almond Soap", before: "oklch(0.78 0.03 55)", after: "#FF99CB", beforeImg: beforeSoft, afterImg: afterSoft },
];

export function Results() {
  return (
    <section className="border-b-2 border-ink py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-2">
          <span className="font-accent text-sm italic text-forest">— Real results</span>
          <h2 className="font-display text-4xl sm:text-5xl">Real People. Real Skin.</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {results.map((r, i) => (
            <motion.figure
              key={r.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-2 border-ink bg-paper shadow-brut-sm"
            >
              <div className="relative grid grid-cols-2">
                {r.beforeImg ? (
                  <div className="relative h-44">
                    <img src={r.beforeImg} alt="Before" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 left-2 border border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider z-10">
                      Before
                    </span>
                  </div>
                ) : (
                  <div className="relative h-44" style={{ background: r.before }}>
                    <div className="absolute inset-0">
                      {[...Array(6)].map((_, k) => (
                        <span
                          key={k}
                          className="absolute h-1.5 w-1.5 rounded-full bg-[oklch(0.5_0.15_25)]/60"
                          style={{ top: `${20 + ((k * 41) % 60)}%`, left: `${15 + ((k * 53) % 70)}%` }}
                        />
                      ))}
                    </div>
                    <span className="absolute bottom-2 left-2 border border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Before
                    </span>
                  </div>
                )}
                {r.afterImg ? (
                  <div className="relative h-44">
                    <img src={r.afterImg} alt="After" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 left-2 border border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider z-10">
                      After
                    </span>
                  </div>
                ) : (
                  <div className="relative h-44" style={{ background: r.after }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-terracotta/30" />
                    <span className="absolute bottom-2 left-2 border border-ink bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      After
                    </span>
                  </div>
                )}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-white px-2 py-1 text-xs font-bold">
                  →
                </div>
              </div>
              <figcaption className="border-t-2 border-ink p-5">
                <p className="font-accent text-lg italic">"{r.quote}"</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider">{r.who}</span>
                  <span className="border border-line bg-parchment px-2 py-0.5 font-accent italic">
                    {r.product}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
const reviews = [
  { name: "Neha Sharma", city: "Delhi", text: "The Neem Soap is absolutely amazing! My acne has reduced significantly in just 2-3 weeks. Skin feels so clean and fresh. Will definitely reorder!", product: "Neem Soap" },
  { name: "Rohan Mehta", city: "Mumbai", text: "Glutasof Face Wash is a game changer. My skin tone has visibly improved. It's gentle yet effective. Highly recommend for anyone with uneven skin tone.", product: "Glutasof Facewash" },
  { name: "Priya Verma", city: "Pune", text: "The Honey & Almond Scrub Soap is my new favourite. Skin feels silky smooth after every wash. The exfoliation is gentle — not harsh at all. Love it!", product: "Honey & Almond Scrub Soap" },
  { name: "Ananya Singh", city: "Bangalore", text: "Sandalwood & Kesar Soap smells divine! It's like a spa at home. My skin feels calm and radiant. This is 100% worth every rupee.", product: "Sandalwood & Kesar Soap" },
  { name: "Kavya Nair", city: "Chennai", text: "I was skeptical at first but WOW. The Neem Soap cleared my stubborn breakouts. Natural ingredients, no irritation. ElySof is now my go-to skincare brand!", product: "Neem Soap" },
  { name: "Arjun Kapoor", city: "Hyderabad", text: "Ordered for my wife and she loves the Honey & Almond Soap. Packaging is beautiful and the quality is premium. Great value for money!", product: "Honey & Almond Scrub Soap" },
  { name: "Meera Pillai", city: "Kochi", text: "Glutasof Facewash has improved my skin brightness noticeably. No more dullness. Lightweight, non-sticky, and the pump bottle is so convenient.", product: "Glutasof Facewash" },
  { name: "Siddharth Rao", city: "Ahmedabad", text: "The Sandalwood & Kesar Soap is incredibly soothing. Perfect for sensitive skin. The fragrance stays for hours. Premium luxury at an affordable price!", product: "Sandalwood & Kesar Soap" },
];

const avatarColors = ["bg-forest", "bg-terracotta", "bg-forest", "bg-terracotta"];

export function Reviews() {
  const [page, setPage] = useState(0);
  const perPage = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 1;
  // simpler: track index, auto-advance
  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, []);
  const visible = [0, 1, 2].map((o) => reviews[(page + o) % reviews.length]);

  return (
    <section id="reviews" className="border-b-2 border-ink bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="font-accent text-sm italic text-forest">— Loved across India</span>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">What Our Customers Say</h2>
          </div>
          <div className="border-2 border-ink bg-parchment px-4 py-3">
            <p className="text-2xl font-display">⭐ 4.8 / 5</p>
            <p className="text-xs text-muted-foreground">500+ verified reviews</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {visible.map((r, i) => (
            <motion.article
              key={`${page}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`border-2 border-ink bg-parchment p-6 ${i === 1 ? "lg:translate-y-3" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-11 w-11 place-items-center rounded-full border-2 border-ink ${avatarColors[i % avatarColors.length]} ${avatarColors[i % avatarColors.length] === 'bg-terracotta' ? 'text-forest-deep' : 'text-primary-foreground'} font-bold`}>
                  {r.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.city} · ✅ Verified</p>
                </div>
                <span className="ml-auto text-gold text-sm">★★★★★</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">"{r.text}"</p>
              <p className="mt-4 border-t border-dashed border-ink pt-3 font-accent text-xs italic text-forest">
                {r.product}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 w-6 border border-ink ${i === page ? "bg-ink" : "bg-paper"}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:info@elysof.com?subject=${encodeURIComponent(
      subject || "Query from ElySof Website"
    )}&body=${mailtoBody}`;

    setSubmitting(true);
    window.location.href = mailtoUrl;

    setTimeout(() => {
      toast.success("Thank you! Opening your email client to send the message. 🌿");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 500);
  };
  return (
    <section id="contact" className="border-b-2 border-ink py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="font-accent text-sm italic text-forest">— Get in touch</span>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl">We'd Love to Hear From You</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            For bulk orders, collaborations, or any questions — reach out anytime.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center border-2 border-ink bg-forest text-primary-foreground"><Phone size={16} /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone</p>
                <a href="tel:+918369729653" className="text-base font-semibold hover:text-forest">+91 83697 29653</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center border-2 border-ink bg-forest text-primary-foreground"><Mail size={16} /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</p>
                <a href="mailto:info@elysof.com" className="text-base font-semibold hover:text-forest">info@elysof.com</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center border-2 border-ink bg-ink text-parchment"><MessageCircle size={16} /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Support hours</p>
                <p className="text-base font-semibold">Mon–Sat · 10AM – 6PM IST</p>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className="border-2 border-ink bg-paper p-6 shadow-brut sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <CField label="Your Name" name="name" required />
            <CField label="Phone Number" name="phone" type="tel" required />
            <CField label="Email Address" name="email" type="email" required className="sm:col-span-2" />
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Subject</span>
              <select
                name="subject"
                required
                className="border-2 border-ink bg-parchment px-3 py-2.5 text-sm outline-none"
                defaultValue=""
              >
                <option value="" disabled>Select…</option>
                <option>General Query</option>
                <option>Order Issue</option>
                <option>Bulk Order</option>
                <option>Feedback</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea
                name="message"
                rows={4}
                required
                className="border-2 border-ink bg-parchment px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full border-2 border-ink bg-forest py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send Message →"}
          </button>
        </form>
      </div>
    </section>
  );
}

function CField({
  label,
  className = "",
  ...rest
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...rest} className="border-2 border-ink bg-parchment px-3 py-2.5 text-sm outline-none" />
    </label>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="bg-ink text-parchment">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <BirdLogo />
              <p className="font-display text-2xl">ElySof</p>
            </div>
            <p className="mt-1 font-accent text-xs italic text-parchment/70">The Essence of Soft Elegance</p>
            <p className="mt-4 text-sm text-parchment/80">
              Handcrafted Ayurvedic skincare for soft, radiant, healthy skin.
            </p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-2 border-2 border-parchment px-3 py-1.5 text-xs font-semibold uppercase tracking-wider hover:bg-parchment hover:text-ink"
            >
              <Instagram size={14} /> @elysof
            </a>
          </div>

          <FCol title="Quick Links" items={[["Home", "#home"], ["Products", "#products"], ["Our Story", "#story"], ["Reviews", "#reviews"], ["Contact", "#contact"]]} />
          <FCol title="Our Products" items={products.map((p) => [p.shortName, "#products"])} />
          <div>
            <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-parchment/60">Customer Care</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="tel:+918369729653" className="hover:text-gold">+91 83697 29653</a></li>
              <li><a href="mailto:info@elysof.com" className="hover:text-gold">info@elysof.com</a></li>
              <li><a href="#" className="hover:text-gold">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-gold">Return Policy</a></li>
              <li><a href="#" className="hover:text-gold">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-parchment/20 pt-5 text-center text-xs text-parchment/60">
          © 2025 ElySof. All rights reserved. · Made with 🌿 in India
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <p className="font-accent text-[11px] uppercase tracking-[0.25em] text-parchment/60">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="hover:text-gold">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Botanical divider ---------------- */
export function Divider() {
  return (
    <div aria-hidden className="mx-auto max-w-5xl px-6 py-6">
      <div className="botanical-divider" />
    </div>
  );
}
