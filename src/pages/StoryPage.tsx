import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Leaf,
  Sparkles,
  Heart,
  ShieldCheck,
  Droplets,
  Star,
  ArrowRight,
  Sun,
  Sprout,
} from "lucide-react";
import { SEO, breadcrumbSchema, organizationSchema } from "@/components/SEO";
import { products } from "@/lib/products";
import brandLogo from "@/assets/logo.png";
import comboImg from "@/assets/combo-pack.jpeg";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const trustBadges = [
  { icon: Leaf, label: "100% Ayurvedic" },
  { icon: ShieldCheck, label: "Dermatologically Tested" },
  { icon: Droplets, label: "pH Balanced" },
  { icon: Sparkles, label: "No Parabens · No SLS" },
  { icon: Heart, label: "Handcrafted in India" },
  { icon: Star, label: "Trusted by 1000+ Customers" },
];

const pillars = [
  {
    icon: Sparkles,
    title: "Luxury",
    desc: "Products that make your daily routine feel premium.",
  },
  {
    icon: Heart,
    title: "Softness",
    desc: "Because beautifully cared-for skin should feel soft and comfortable.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    desc: "Thoughtful products designed with care and attention to detail.",
  },
  {
    icon: Sun,
    title: "Experience",
    desc: "Turning a simple bath into a moment of self-care.",
  },
];

export default function StoryPage() {
  return (
    <>
      <SEO
        title="Our Story — Where Luxury Meets Everyday Care | ElySof"
        description="Discover the ElySof story: a premium Ayurvedic bath & body brand born from a passion for luxury, softness, and mindful self-care."
        path="/story"
        image="/og/combo-pack.jpeg"
        jsonLd={[organizationSchema, breadcrumbSchema("Our Story", "/story")]}
      />

      <main className="min-h-screen bg-parchment">
        {/* Hero */}
        <section className="relative overflow-hidden border-b-2 border-ink bg-parchment">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute bottom-0 left-10 -mb-20 h-72 w-72 rounded-full bg-forest/10 blur-3xl" aria-hidden />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col justify-center lg:col-span-7"
            >
              <motion.span variants={reveal} className="inline-flex w-fit items-center gap-2 border-2 border-ink bg-paper px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-forest">
                <Sprout size={13} /> ElySof Brand Story
              </motion.span>
              <motion.h1 variants={reveal} className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-ink">
                Where Luxury Meets <span className="text-forest">Everyday Care</span>
              </motion.h1>
              <motion.p variants={reveal} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                At ElySof, we believe a bath is more than a daily routine — it is a moment to pause, refresh, and reconnect with yourself.
              </motion.p>
              <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border-2 border-ink bg-forest px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  Explore Products
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-parchment"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center lg:col-span-5"
            >
              <div className="relative w-full border-2 border-ink bg-paper p-5 shadow-brut">
                <div className="flex items-center justify-between border-b-2 border-line pb-3">
                  <div className="flex items-center gap-2">
                    <img src={brandLogo} alt="ElySof" className="h-7 w-7 object-contain" />
                    <span className="font-display text-lg font-bold">ElySof</span>
                  </div>
                  <span className="border border-ink bg-parchment px-2 py-0.5 font-accent text-[10px] font-bold italic text-forest">
                    Made in India
                  </span>
                </div>
                <div className="relative mt-4 aspect-[4/3] overflow-hidden border-2 border-ink bg-parchment">
                  <img
                    src={comboImg}
                    alt="ElySof handcrafted bath essentials collection"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 border border-ink bg-forest px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                    🌿 Pure Botanical Steam
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 divide-x border-2 border-ink bg-parchment text-center text-xs">
                  {[
                    ["Touch", "Silk Foam"],
                    ["Aroma", "Sandal & Neem"],
                    ["Feel", "Deep Calm"],
                  ].map(([label, value]) => (
                    <div key={label} className="py-2 px-1">
                      <p className="font-accent text-[10px] italic text-muted-foreground">{label}</p>
                      <p className="font-bold text-ink">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b-2 border-ink bg-forest-deep py-6 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            >
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={reveal}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="grid h-10 w-10 place-items-center border-2 border-primary-foreground/30 bg-primary-foreground/10">
                    <badge.icon size={18} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story body */}
        <section className="border-b-2 border-ink bg-parchment py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="lg:col-span-7"
              >
                <motion.p variants={reveal} className="font-accent text-sm italic text-forest">— The Birth of ElySof</motion.p>
                <motion.h2 variants={reveal} className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
                  Born from a passion for <span className="text-terracotta">luxury</span>, softness, and mindful self-care.
                </motion.h2>

                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <p>
                    Born from a passion for luxury, softness, and mindful self-care, ElySof brings together the richness of traditional beauty ingredients with the elegance of modern bathing. Every product is created with one simple purpose: to make everyday bathing feel special.
                  </p>
                  <p>
                    From our luxurious Sandalwood & Kesar Soap to our refreshing Neem Soap, nourishing Honey & Almond Soap, and skincare-focused Glutasof Face Wash, each product is thoughtfully crafted to turn ordinary care into a luxurious experience.
                  </p>
                  <p className="text-ink font-semibold">But ElySof is more than soaps.</p>
                  <p>
                    We are building a complete luxury bath and body experience — from indulgent soaps and skincare to bath towels, robes, loofahs, hair care, and other bath essentials. Our vision is to bring everything you need for a beautiful, relaxing bath ritual under one roof.
                  </p>
                </div>

                <motion.div variants={reveal} className="mt-10 border-l-4 border-forest bg-paper p-6 shadow-brut-sm">
                  <blockquote className="font-accent text-lg italic text-ink sm:text-xl">
                    "We believe luxury should feel good, look beautiful, and become a part of everyday life."
                  </blockquote>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="lg:col-span-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      variants={reveal}
                      className={`relative border-2 border-ink bg-paper p-3 shadow-brut-sm ${i === 0 ? "col-span-2" : ""}`}
                    >
                      <div className={`overflow-hidden border-2 border-ink bg-parchment ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 font-display text-sm font-bold text-ink">{product.shortName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{product.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="font-accent text-sm italic text-forest">— Our Promise</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
                The four pillars behind every ElySof product
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We believe luxury should feel good, look beautiful, and become a part of everyday life. That is why we focus on:
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={reveal}
                  className="border-2 border-ink bg-parchment p-6 shadow-brut-sm transition hover:-translate-y-1"
                >
                  <span className="grid h-11 w-11 place-items-center border-2 border-ink bg-forest text-primary-foreground">
                    <pillar.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-xl">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vision */}
        <section className="relative overflow-hidden border-b-2 border-ink bg-forest-deep py-20 text-primary-foreground sm:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
            <div className="absolute -left-20 top-10 h-64 w-64 rounded-full border border-primary-foreground" />
            <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full border border-primary-foreground" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.span variants={reveal} className="font-accent text-sm italic text-primary-foreground/80">— Our Vision</motion.span>
              <motion.h2 variants={reveal} className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
                To become a trusted luxury bath and body brand
              </motion.h2>
              <motion.p variants={reveal} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">
                To become a trusted luxury bath and body brand that inspires people to slow down, care for themselves, and enjoy the little moments of everyday luxury. Because you don't need a special occasion to treat yourself. Every bath deserves a little luxury.
              </motion.p>
              <motion.div variants={reveal} className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border-2 border-primary-foreground bg-primary-foreground px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  Shop the Collection
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-2 border-2 border-primary-foreground px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-foreground hover:text-ink"
                >
                  View Offers
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Closing signature */}
        <section className="bg-parchment py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2">
              <img src={brandLogo} alt="ElySof" className="h-8 w-8 object-contain" style={{ mixBlendMode: "multiply" }} />
              <span className="font-display text-3xl font-bold">ElySof</span>
            </div>
            <p className="mt-3 font-display text-xl text-forest">Luxury for your skin. Softness for your everyday.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Handcrafted with care in India · Small batches · Clean ingredients · Trusted by thousands
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
