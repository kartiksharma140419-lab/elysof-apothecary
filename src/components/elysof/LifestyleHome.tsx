import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Leaf,
  Sparkles,
  Droplets,
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  Heart,
  Wind,
  Flower2,
  Check,
  X,
  Compass,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowLeftRight,
  Sparkle,
  ShoppingBag,
  Instagram,
} from "lucide-react";

import brandLogo from "@/assets/logo.png";
import comboImg from "@/assets/combo-pack.jpeg";
import neemImg from "@/assets/neem.jpeg";
import glutasofImg from "@/assets/glutasof.jpeg";
import honeyAlmondImg from "@/assets/honey-almond.jpeg";
import sandalwoodImg from "@/assets/sandalwood-kesar-new.png";
import textureHoney from "@/assets/media__1781947933413.jpg";
import textureSandalwood from "@/assets/media__1781947909390.jpg";
import textureNeem from "@/assets/media__1781949607698.jpg";
import glutasofKeyBenefits from "@/assets/media__1781948612099.jpg";
import sandalwoodWhySpecial from "@/assets/media__1781947909404.jpg";

/* ---------------- 1. Hero Section ---------------- */
export function LifestyleHero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-parchment py-10 sm:py-16 lg:py-20">
      {/* Subtle background graphic decor */}
      <div
        className="pointer-events-none absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 -mb-20 h-72 w-72 rounded-full bg-forest/10 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center lg:col-span-7"
        >
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-forest">
              <Sparkles size={13} className="text-forest" /> The Everyday Bath Ritual
            </span>
            <span className="border border-line bg-parchment px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              100% Ayurvedic Care
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-ink">
            Elevate your everyday <span className="text-forest">bath ritual.</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
            Premium bath, body, and personal care essentials, crafted to make everyday self-care feel luxurious.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-forest px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <span>Explore bath essentials</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/offers"
              className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-parchment"
            >
              <span>Festive Offers</span>
              <span className="rounded bg-terracotta/30 px-1.5 py-0.5 text-[10px] font-bold text-forest-deep">
                ₹199
              </span>
            </Link>
          </div>

          {/* Sensory Touchpoints Pills */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t-2 border-line">
            {[
              { icon: Droplets, text: "Velvety Creamy Lather" },
              { icon: Wind, text: "Botanical Steam Aromas" },
              { icon: Leaf, text: "Cold-Pressed Plant Oils" },
              { icon: Heart, text: "Zero Post-Bath Dryness" },
            ].map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-1.5 border border-ink bg-parchment px-3 py-1.5 text-xs font-semibold text-ink"
              >
                <item.icon size={13} className="text-forest" />
                {item.text}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Sensory Artwork Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative lg:col-span-5"
        >
          <div className="relative border-2 border-ink bg-paper p-4 shadow-brut sm:p-5">
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b-2 border-line pb-3">
              <div className="flex items-center gap-2">
                <img src={brandLogo} alt="ElySof" className="h-6 w-6 object-contain" />
                <span className="font-display text-base font-bold">The Bath Sanctuary</span>
              </div>
              <span className="border border-ink bg-parchment px-2 py-0.5 font-accent text-[10px] font-bold italic text-forest">
                28-Day Cold Cure
              </span>
            </div>

            {/* Artwork Frame */}
            <div className="relative mt-4 aspect-[4/3] overflow-hidden border-2 border-ink bg-parchment">
              <img
                src={comboImg}
                alt="ElySof Ritual Products"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Floating aesthetic tags */}
              <div className="absolute left-3 top-3 border border-ink bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur">
                ✨ 100% Handcrafted
              </div>
              <div className="absolute bottom-3 right-3 border border-ink bg-forest px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                🌿 Pure Botanical Steam
              </div>
            </div>

            {/* Interactive mini feeling bar */}
            <div className="mt-4 grid grid-cols-3 divide-x border-2 border-ink bg-parchment text-center text-xs">
              <div className="py-2 px-1">
                <p className="font-accent text-[10px] italic text-muted-foreground">Touch</p>
                <p className="font-bold text-ink">Silk Foam</p>
              </div>
              <div className="py-2 px-1">
                <p className="font-accent text-[10px] italic text-muted-foreground">Aroma</p>
                <p className="font-bold text-ink">Sandal & Neem</p>
              </div>
              <div className="py-2 px-1">
                <p className="font-accent text-[10px] italic text-muted-foreground">Feeling</p>
                <p className="font-bold text-forest">Deep Calm</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- 2. Marquee Ticker ---------------- */
const marqueeItems = [
  "🛁 VELVETY BOTANICAL LATHER",
  "🌿 FRESH STEAM AROMATHERAPY",
  "🍯 MOUNTAIN HONEY & SWEET ALMOND",
  "🪷 PURE MYSORE SANDALWOOD",
  "🍃 COLD-PRESSED NEEM EXTRACT",
  "✨ DEEP GLOWING HYDRATION",
  "🕊️ 100% SULPHATE & PARABEN FREE",
  "🇮🇳 SMALL BATCH APOTHECARY",
];

export function LifestyleMarquee() {
  const list = [...marqueeItems, ...marqueeItems];
  return (
    <div className="border-b-2 border-ink bg-forest-deep py-3 text-primary-foreground">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap">
          {list.map((m, i) => (
            <span key={i} className="mx-6 font-accent text-xs tracking-widest font-bold uppercase sm:text-sm">
              {m} <span className="mx-3 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 3. Interactive "Choose Your Bath Mood" ---------------- */
const moods = [
  {
    id: "sandalwood",
    name: "Calm & Unwind",
    time: "Evening Sanctuary",
    icon: Moon,
    color: "bg-[#D4A847]/15",
    badge: "Royal Sanctuary",
    quote: "Breathe in warm Mysore Sandalwood and let the day's tension melt away.",
    notes: ["Pure Mysore Sandalwood Oil", "Kashmiri Saffron", "Natural Coconut Emollients"],
    feel: "Luminous, deeply relaxed, and velvet-smooth",
    image: sandalwoodImg,
    productName: "Sandalwood & Kesar Soap",
  },
  {
    id: "neem",
    name: "Purify & Reset",
    time: "Morning Clarity",
    icon: Leaf,
    color: "bg-[#2D6A4F]/15",
    badge: "Clarifying Care",
    quote: "A refreshing herbal surge that clarifies breakouts and wipes pollution clean.",
    notes: ["Active Neem Leaf Extract", "Pure Tea Tree Essence", "Cold-Pressed Castor Oil"],
    feel: "Tingly clean, balanced, and zero acne irritation",
    image: neemImg,
    productName: "Pure Neem Soap",
  },
  {
    id: "honey",
    name: "Silk & Hydrate",
    time: "Daily Polish",
    icon: Sparkles,
    color: "bg-[#FF99CB]/20",
    badge: "Gentle Polish",
    quote: "Micro-crushed almond kernel and raw honey gently buff for touchable silkiness.",
    notes: ["Raw Wild Mountain Honey", "Crushed Sweet Almond Kernel", "Vitamin E Antioxidants"],
    feel: "Exfoliated, plump, and deeply hydrated",
    image: honeyAlmondImg,
    productName: "Honey & Almond Scrub Soap",
  },
  {
    id: "glutasof",
    name: "Glow & Energize",
    time: "Awakening Wash",
    icon: Sun,
    color: "bg-[#3D5F82]/15",
    badge: "Radiance Elixir",
    quote: "A silky botanical wash that brings back luminous clarity and vitality.",
    notes: ["Glutathione Infusion", "Alpha Arbutin Glow", "Hydrating Aloe Dew"],
    feel: "Bright, refreshed, and lightweight dewiness",
    image: glutasofImg,
    productName: "Glutasof Face Wash",
  },
];

export function LifestyleBathMoodSelector() {
  const [activeMood, setActiveMood] = useState(moods[0]);

  return (
    <section className="border-b-2 border-ink bg-parchment py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-accent text-sm italic text-forest">— Interactive Sensory Experience</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl">
              How do you want your bath to feel today?
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 font-accent text-sm font-bold italic text-forest underline hover:text-forest-deep"
          >
            <span>Explore all bath essentials</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mood Selector Tabs */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {moods.map((m) => {
            const isSelected = activeMood.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMood(m)}
                className={`flex items-center gap-2.5 border-2 border-ink p-3.5 text-left transition cursor-pointer ${
                  isSelected
                    ? "bg-forest text-primary-foreground shadow-brut-sm"
                    : "bg-paper hover:bg-parchment text-ink"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center border border-current ${
                    isSelected ? "bg-forest-deep" : "bg-parchment"
                  }`}
                >
                  <m.icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold leading-none">{m.name}</p>
                  <p
                    className={`mt-1 font-accent text-[10px] italic truncate ${
                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Mood Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMood.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className={`mt-6 border-2 border-ink ${activeMood.color} bg-paper p-6 shadow-brut sm:p-8`}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Product Visual */}
              <div className="lg:col-span-4">
                <div className="relative mx-auto aspect-square max-w-[280px] overflow-hidden border-2 border-ink bg-parchment p-6 shadow-brut-sm">
                  <img
                    src={activeMood.image}
                    alt={activeMood.productName}
                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 border border-ink bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    {activeMood.badge}
                  </span>
                </div>
              </div>

              {/* Mood Story & Senses */}
              <div className="flex flex-col lg:col-span-8">
                <div className="flex items-center gap-2">
                  <span className="font-accent text-xs font-bold uppercase tracking-widest text-forest">
                    {activeMood.time}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-display text-sm font-bold text-ink">{activeMood.productName}</span>
                </div>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-ink">
                  "{activeMood.quote}"
                </h3>

                {/* Scent & Botanical Notes */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="border border-ink bg-parchment/80 p-3.5">
                    <p className="font-accent text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      🌿 Pure Botanical Infusion
                    </p>
                    <ul className="mt-2 space-y-1 text-xs font-semibold text-ink">
                      {activeMood.notes.map((note) => (
                        <li key={note} className="flex items-center gap-1.5">
                          <span className="text-forest">✦</span> {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-ink bg-parchment/80 p-3.5">
                    <p className="font-accent text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      ✨ Post-Bath Skin Feel
                    </p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-ink">
                      {activeMood.feel}
                    </p>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 border-2 border-ink bg-forest px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:bg-forest-deep"
                  >
                    <span>Experience this ritual</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/offers"
                    className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition hover:bg-parchment"
                  >
                    <span>Get with Combo (Save 60%)</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------- 4. The Senses of Bathing (Sliding Animated Carousel) ---------------- */
const SENSE_CARDS = [
  {
    id: "touch",
    num: "01",
    tag: "The Touch",
    subBadge: "Whipped Micro-Foam",
    title: "Velvety Dense Lather",
    desc: "Whipped micro-foam created from cold-pressed coconut & castor oils that cushions your skin, rinsing clean with zero sticky film.",
    pills: "✨ Soft · Cushioning · Gentle",
    image: textureHoney,
    alt: "Honey and almond scrub texture and benefits",
    productId: "honey-almond",
    btnLabel: "Honey & Almond Bar",
  },
  {
    id: "scent",
    num: "02",
    tag: "The Scent",
    subBadge: "Pure Aromatherapy",
    title: "Botanical Steam Aromas",
    desc: "Warm steam activates real sandalwood oil, raw saffron, and crushed herbs. No synthetic perfumes — purely grounding aromatherapy.",
    pills: "🌿 Calming · Earthy · Sacred",
    image: textureSandalwood,
    alt: "Sandalwood and kesar aromatic lather and benefits",
    productId: "sandalwood-kesar",
    btnLabel: "Sandalwood & Saffron Bar",
  },
  {
    id: "glow",
    num: "03",
    tag: "The Glow",
    subBadge: "Ayurvedic Formula",
    title: "Deep Skin Barrier Calm",
    desc: "Preserves 100% natural vegetable glycerin. Your skin feels dewy, hydrated, and calm the moment you step out of the shower.",
    pills: "💧 Hydrated · Breathable · Radiance",
    image: textureNeem,
    alt: "Neem herbal richness and benefits",
    productId: "neem",
    btnLabel: "Organic Neem Bar",
  },
  {
    id: "clarity",
    num: "04",
    tag: "The Clarity",
    subBadge: "Kojic & Glutathione",
    title: "Active Luminous Complexion",
    desc: "Target stubborn tan lines and blemishes with potent antioxidant glutathione, kojic acid, and gentle micro-exfoliating nutrients.",
    pills: "⚡ Clarifying · Even-Tone · Glow",
    image: glutasofKeyBenefits,
    alt: "GlutaSof kojic and glutathione key benefits",
    productId: "glutasof",
    btnLabel: "GlutaSof Glow Bar",
  },
  {
    id: "ritual",
    num: "05",
    tag: "The Ritual",
    subBadge: "Apothecary Crafted",
    title: "21-Day Slow Cured Purity",
    desc: "Each bar is handcrafted in small batches and cured for 3 weeks to preserve essential botanical fatty acids without artificial hardeners.",
    pills: "🌸 Slow-Cured · Zero SLS · Rich",
    image: sandalwoodWhySpecial,
    alt: "Why ElySof authentic curing makes the difference",
    productId: "sandalwood-kesar",
    btnLabel: "Explore All Bars",
  },
];

export function LifestyleThreeSenses() {
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Repeat items 3 times for a seamless infinite loop across all screen sizes
  const carouselItems = [...SENSE_CARDS, ...SENSE_CARDS, ...SENSE_CARDS];

  const handleManualScroll = (delta: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  const handleShopProduct = (productId: string, productName: string) => {
    const targetElement = document.getElementById(`product-${productId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      targetElement.classList.add(
        "ring-4",
        "ring-[#B2511E]",
        "ring-offset-4",
        "scale-[1.02]",
        "transition-all",
        "duration-500"
      );
      setTimeout(() => {
        targetElement.classList.remove("scale-[1.02]");
      }, 400);
      setTimeout(() => {
        targetElement.classList.remove("ring-4", "ring-[#B2511E]", "ring-offset-4");
      }, 2500);
      toast.success(`Selected ${productName}! Choose your pack option below.`);
    } else {
      navigate(`/#product-${productId}`);
      toast.info(`Opening ${productName}...`);
    }
  };

  return (
    <section className="relative border-b-2 border-ink bg-paper py-14 sm:py-20 overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-accent text-sm italic text-forest tracking-wide">— The Art of Pure Bathing —</span>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
            Designed For All Senses
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            How authentic Ayurvedic cold-process care transforms a hurried 15-minute shower.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-line/60 py-3 text-xs">
          {/* Status / Mode Indicator */}
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span className="hidden sm:inline">
              {isPaused ? "Animation Paused" : `Smooth Sliding (${direction === "right" ? "Left to Right" : "Right to Left"})`}
            </span>
            <span className="text-[11px] text-muted-foreground/80 sm:hidden">
              {isPaused ? "Paused" : "Live Carousel"}
            </span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Direction Toggle */}
            <button
              type="button"
              onClick={() => setDirection((prev) => (prev === "right" ? "left" : "right"))}
              className="flex items-center gap-1.5 border border-ink bg-parchment px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow-brut-sm transition hover:bg-parchment-deep active:translate-y-0.5"
              title="Change sliding direction"
            >
              <ArrowLeftRight size={12} />
              <span>{direction === "right" ? "➔ Left to Right" : "⬅ Right to Left"}</span>
            </button>

            {/* Pause / Resume Button */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="flex items-center gap-1.5 border border-ink bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow-brut-sm transition hover:bg-parchment active:translate-y-0.5"
              title={isPaused ? "Resume continuous sliding" : "Pause sliding animation"}
            >
              {isPaused ? <Play size={12} className="fill-current text-forest" /> : <Pause size={12} />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>

            {/* Manual Step Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleManualScroll(-320)}
                aria-label="Scroll left"
                className="flex h-7 w-7 items-center justify-center border border-ink bg-white shadow-brut-sm transition hover:bg-parchment active:scale-95"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll(320)}
                aria-label="Scroll right"
                className="flex h-7 w-7 items-center justify-center border border-ink bg-white shadow-brut-sm transition hover:bg-parchment active:scale-95"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Sliding Carousel Container */}
      <div className="relative mt-8 w-full overflow-hidden">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 sm:w-16 md:w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 sm:w-16 md:w-24 bg-gradient-to-l from-paper to-transparent" />

        {/* Scrollable Track Wrapper with smooth continuous sliding animation */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar py-2"
          style={{ scrollBehavior: "smooth" }}
        >
          <div
            className={`sense-track flex gap-5 sm:gap-6 pl-4 sm:pl-6 w-max ${
              direction === "right" ? "animate-sense-right" : "animate-sense-left"
            } ${isPaused ? "pause-animation" : ""}`}
          >
            {carouselItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => handleShopProduct(item.productId, item.title)}
                className="group flex flex-col w-[285px] sm:w-[330px] md:w-[370px] lg:w-[390px] shrink-0 border-2 border-ink bg-parchment shadow-brut-sm transition-all duration-300 hover:shadow-brut hover:-translate-y-1 cursor-pointer"
              >
                {/* Image Container with Neo-Brutalist Frame */}
                <div className="aspect-[4/3] overflow-hidden border-b-2 border-ink bg-white relative">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Sense Badge */}
                  <span className="absolute bottom-2.5 left-2.5 border-2 border-ink bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink shadow-brut-sm">
                    {item.num} · {item.tag}
                  </span>

                  {/* Top Right Feature Sub-badge */}
                  {item.subBadge && (
                    <span className="absolute top-2.5 right-2.5 border border-ink/70 bg-parchment/95 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ink backdrop-blur-xs">
                      {item.subBadge}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-parchment">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink leading-snug group-hover:text-forest transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between gap-2">
                    <p className="font-accent text-xs italic text-forest font-semibold">
                      {item.pills}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleShopProduct(item.productId, item.title);
                      }}
                      className="relative z-20 inline-flex items-center gap-1.5 border-2 border-ink bg-forest text-white hover:bg-forest-deep px-3 py-1.5 text-[11px] font-black uppercase tracking-wider shadow-brut-sm transition-all hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95 cursor-pointer"
                      title={`Shop ${item.title}`}
                    >
                      <span>Shop</span>
                      <ShoppingBag size={12} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful Hover/Touch Hint */}
      <div className="mt-4 text-center">
        <p className="font-accent text-xs italic text-muted-foreground">
          ✨ Click "Shop" or any card to jump directly to product pack options
        </p>
      </div>
    </section>
  );
}


/* ---------------- 5. Purity vs Commercial (Visual Card) ---------------- */
export function LifestylePurityComparison() {
  return (
    <section className="border-b-2 border-ink bg-parchment py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Statement Left */}
          <div className="lg:col-span-5">
            <span className="font-accent text-sm italic text-forest">— The Purity Standard</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl leading-tight">
              Why your skin knows the difference.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Most commercial body washes and bars rely on harsh sulfates (SLS) and synthetic fillers.
              ElySof is made the authentic apothecary way: slow-cured, oil-rich, and pure.
            </p>

            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border-2 border-ink bg-forest px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:bg-forest-deep"
              >
                <span>Explore bath essentials</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Graphic Comparison Right */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {/* The ElySof Way */}
            <div className="border-2 border-ink bg-paper p-5 shadow-brut-sm">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <p className="font-display text-lg font-bold text-forest">The ElySof Ritual Bar</p>
                <span className="rounded bg-forest/20 px-2 py-0.5 text-[10px] font-bold text-forest">
                  100% Pure
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs">
                {[
                  "Cold-pressed botanical oils (Coconut & Castor)",
                  "Slow 28-day cure for creamy, long-lasting lather",
                  "Rich in natural vegetable glycerin",
                  "Pure essential oils & genuine herbal extracts",
                  "pH balanced (5.5 - 6.5) for sensitive skin",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <Check size={15} className="shrink-0 text-forest mt-0.5" />
                    <span className="font-medium text-ink">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial Bars */}
            <div className="border-2 border-ink bg-parchment/60 p-5 opacity-85">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="font-display text-lg text-muted-foreground line-through">Commercial Soaps</p>
                <span className="rounded bg-destructive/15 px-2 py-0.5 text-[10px] font-bold text-destructive">
                  Mass Market
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                {[
                  "Synthetic detergent noodles (syndet)",
                  "Glycerin extracted to sell separately",
                  "Harsh foaming sulfates (SLS / SLES)",
                  "Synthetic artificial perfumes & phthalates",
                  "Leaves skin tight, dry, and itchy",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <X size={15} className="shrink-0 text-destructive mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. Brand Collage & Trust Lookbook ---------------- */
export function LifestyleLookbook() {
  return (
    <section className="border-b-2 border-ink bg-paper py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Editorial Quote Card */}
        <div className="border-2 border-ink bg-parchment p-6 sm:p-10 shadow-brut text-center">
          <p className="font-accent text-xs font-bold uppercase tracking-widest text-forest">
            🌿 Handcrafted In Small Batches · India
          </p>
          <h2 className="mx-auto mt-2 max-w-3xl font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug">
            "We started ElySof with a simple belief: self-care begins with the reverence of your daily bath."
          </h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            — The ElySof Apothecary Philosophy
          </p>
        </div>

        {/* Quick Links To Other Pages */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5 text-center">
          <Link
            to="/products"
            className="border-2 border-ink bg-parchment p-4 transition hover:bg-forest hover:text-primary-foreground group"
          >
            <p className="font-display text-base font-bold">The Products</p>
            <p className="font-accent text-[11px] italic text-muted-foreground group-hover:text-primary-foreground/80 mt-1">
              Solo Essentials →
            </p>
          </Link>

          <Link
            to="/combos"
            className="border-2 border-ink bg-paper p-4 transition hover:bg-forest hover:text-primary-foreground group shadow-brut-sm"
          >
            <p className="font-display text-base font-bold text-forest group-hover:text-primary-foreground">
              Value Combos 🔥
            </p>
            <p className="font-accent text-[11px] italic text-muted-foreground group-hover:text-primary-foreground/80 mt-1">
              Save up to 73% →
            </p>
          </Link>

          <Link
            to="/offers"
            className="border-2 border-ink bg-parchment p-4 transition hover:bg-forest hover:text-primary-foreground group"
          >
            <p className="font-display text-base font-bold">Festive Packs</p>
            <p className="font-accent text-[11px] italic text-muted-foreground group-hover:text-primary-foreground/80 mt-1">
              Any 3 for ₹199 →
            </p>
          </Link>

          <Link
            to="/reviews"
            className="border-2 border-ink bg-parchment p-4 transition hover:bg-forest hover:text-primary-foreground group"
          >
            <p className="font-display text-base font-bold">500+ Reviews</p>
            <p className="font-accent text-[11px] italic text-muted-foreground group-hover:text-primary-foreground/80 mt-1">
              ⭐ 4.8 / 5 Verified →
            </p>
          </Link>

          <Link
            to="/results"
            className="border-2 border-ink bg-parchment p-4 transition hover:bg-forest hover:text-primary-foreground group"
          >
            <p className="font-display text-base font-bold">Skin Results</p>
            <p className="font-accent text-[11px] italic text-muted-foreground group-hover:text-primary-foreground/80 mt-1">
              Before & After →
            </p>
          </Link>
        </div>

        {/* Instagram Community Banner */}
        <div className="mt-8 border-2 border-ink bg-parchment p-5 sm:p-6 shadow-brut-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ink bg-forest text-primary-foreground">
              <Instagram size={24} />
            </div>
            <div>
              <p className="font-display text-base sm:text-lg font-bold text-ink">Join Our Bath Sanctuary on Instagram</p>
              <p className="font-accent text-xs italic text-muted-foreground">
                Follow <span className="font-semibold text-forest">@elysofofficial</span> for skincare rituals, behind-the-scenes & festive giveaways.
              </p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/elysofofficial?igsh=cXBoNGJ1cjRycDVo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border-2 border-ink bg-forest px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:bg-forest-deep"
          >
            <Instagram size={14} />
            <span>Follow @elysofofficial</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. Final Invitation Banner ---------------- */
export function LifestyleFinalBanner() {
  return (
    <section className="bg-forest py-14 sm:py-20 text-primary-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <span className="font-accent text-sm italic text-parchment/80">
          Transform your everyday shower
        </span>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl">
          Your daily bath is waiting to feel luxurious.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-parchment/80">
          Pure cold-pressed botanical oils, authentic Ayurvedic aromas, and velvety hydration crafted for everyday self-care.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/products"
            className="border-2 border-ink bg-parchment px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink shadow-brut-sm transition hover:bg-white"
          >
            Explore bath essentials →
          </Link>
          <Link
            to="/offers"
            className="border-2 border-parchment px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-parchment transition hover:bg-parchment hover:text-ink"
          >
            View Festive Rituals (₹199)
          </Link>
        </div>
      </div>
    </section>
  );
}
