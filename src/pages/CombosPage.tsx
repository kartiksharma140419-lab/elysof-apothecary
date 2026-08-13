import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShoppingBag,
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
  TrendingDown,
  Truck,
  ShieldCheck,
  Percent,
} from "lucide-react";

import { combos, type ComboProduct } from "@/lib/combos";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { ComboDetailModal } from "@/components/elysof/ComboDetailModal";
import { CheckoutModal } from "@/components/elysof/CheckoutModal";

import comboPackHero from "@/assets/combo-pack.jpeg";
import rakhiOfferImg from "@/assets/rakhi-offer.jpeg";

export default function CombosPage() {
  const { add, setOpen: setCartOpen } = useCart();
  const [selectedCombo, setSelectedCombo] = useState<ComboProduct | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleAddToCart = (c: ComboProduct) => {
    add(c);
    toast.success(`${c.shortName} added to cart! 🌿`);
  };

  const handleBuyNow = (c: ComboProduct) => {
    add(c);
    setCartOpen(false);
    setSelectedCombo(null);
    setCheckoutOpen(true);
  };

  return (
    <>
      <SEO
        title="Curated Value Combos & Steal Deals | ElySof Ayurvedic Soaps"
        description="Shop ElySof multi-pack combos — Neem, Honey & Almond, Sandalwood & Kesar Packs of 2 and 3 from ₹129. Save up to 73% with Free Shipping on prepaid orders above ₹199."
        path="/combos"
        image="/og/combo-pack.jpeg"
        jsonLd={breadcrumbSchema("Combos", "/combos")}
      />

      <div className="bg-parchment text-ink pb-20">
        {/* 1. Header Banner & Benefit Reflection */}
        <section className="border-b-2 border-ink bg-paper py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-forest px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-brut-sm">
                <Percent size={14} /> Mega Value Bundles · Up to 73% OFF
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.05]">
                Curated Value Combos <br />
                <span className="text-forest">& Steal Deals.</span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed">
                Why buy solo when you can save up to ₹551? Stock up on your daily Ayurvedic bath essentials
                with our high-value Packs of 2 & 3.
              </p>
            </div>

            {/* Benefit Reflection Card — The "Steal Deal" Contrast */}
            <div className="mt-10 border-2 border-ink bg-parchment p-6 sm:p-8 shadow-brut">
              <div className="flex flex-col items-center justify-between gap-4 border-b-2 border-ink pb-5 sm:flex-row">
                <div className="flex items-center gap-2 text-forest font-bold text-sm uppercase tracking-wider">
                  <Sparkles size={18} /> The ElySof Combo Benefit Advantage
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-terracotta/30 px-3 py-1 border border-ink text-forest-deep">
                  🚚 FREE Delivery on Prepaid Orders ≥ ₹199
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="border-2 border-ink bg-paper p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-forest">
                      <TrendingDown size={16} /> Maximum Cost Savings
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Prices drop as low as <strong className="text-ink">₹59.60 per bar</strong> (down from ₹225 solo MRP). Pay a fraction of the cost per luxury wash.
                    </p>
                  </div>
                  <p className="mt-3 text-[11px] font-bold text-forest">Save ₹321 – ₹551 Per Pack</p>
                </div>

                <div className="border-2 border-ink bg-paper p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-forest">
                      <ShieldCheck size={16} /> Uninterrupted 60–90 Day Supply
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Never run out of your bath ritual. A single combo pack keeps your skin nourished and clear for 2 to 3 continuous months.
                    </p>
                  </div>
                  <p className="mt-3 text-[11px] font-bold text-forest">2x & 3x Value Packs</p>
                </div>

                <div className="border-2 border-ink bg-paper p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-forest">
                      <Truck size={16} /> Zero Extra Shipping Hassle
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      All Pack of 3 combos unlock free shipping on prepaid orders, saving you extra on delivery fees.
                    </p>
                  </div>
                  <p className="mt-3 text-[11px] font-bold text-forest">Prepaid Free Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Combos Product Listing Grid */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b-2 border-ink pb-4">
              <div>
                <span className="font-accent text-sm italic text-forest">— Choose Your Bundle</span>
                <h2 className="mt-1 font-display text-3xl sm:text-4xl">All Available Combos & Multi-Packs</h2>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                6 Multi-Packs · 100% Handcrafted
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {combos.map((combo) => (
                <motion.article
                  key={combo.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="flex flex-col border-2 border-ink bg-paper shadow-brut-sm transition-shadow hover:shadow-brut"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden border-b-2 border-ink bg-parchment p-6 flex items-center justify-center">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 border-2 border-ink bg-[#B2511E] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                      {combo.badge}
                    </span>
                    <span className="absolute right-3 top-3 border border-ink bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-ink">
                      {combo.packCount} Pack
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(combo.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                      <span className="ml-1.5 text-[11px] font-bold text-ink">5.0 (Steal Deal)</span>
                    </div>

                    <h3 className="mt-2 font-display text-xl leading-tight text-ink">
                      {combo.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                      {combo.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {combo.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-line bg-parchment px-2 py-0.5 font-accent text-[10px] italic text-ink"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Price & Savings Highlight */}
                    <div className="mt-4 border-t-2 border-dashed border-ink pt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl sm:text-3xl text-ink">₹{combo.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{combo.mrp}</span>
                        <span className="ml-auto text-[11px] font-bold text-forest">
                          ₹{combo.perBarPrice.toFixed(0)} / bar
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] font-bold text-forest">
                        ⚡ You save ₹{combo.savingsAmount} on this combo!
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(combo)}
                          className="w-1/2 border-2 border-ink bg-forest py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:bg-forest-deep cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleBuyNow(combo)}
                          className="w-1/2 border-2 border-terracotta py-2.5 text-xs font-bold uppercase tracking-wider text-terracotta transition hover:bg-terracotta hover:text-forest-deep cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                      <button
                        onClick={() => setSelectedCombo(combo)}
                        className="w-full border border-ink bg-parchment py-2 text-[11px] font-bold uppercase tracking-wider text-forest transition hover:bg-ink hover:text-parchment cursor-pointer"
                      >
                        Explore More & Benefits →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Festive Limited Time Variety Offer Banner */}
        <section className="border-y-2 border-ink bg-forest py-12 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink bg-parchment shadow-brut-sm">
                  <img
                    src={rakhiOfferImg}
                    alt="Festive 3 Soap Variety Offer"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 border border-ink bg-[#B2511E] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Special Festive Pack
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <span className="font-accent text-xs uppercase tracking-widest text-parchment/70 font-bold">
                  🎁 Want to Mix & Match?
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-parchment">
                  Get Any 3 Custom Soaps For Just ₹199!
                </h3>
                <p className="mt-3 text-sm text-parchment/80 max-w-xl leading-relaxed">
                  Want one Neem, one Sandalwood, and one Honey Almond? Our custom 3-soap builder lets you
                  mix any 3 bars for ₹199 with Free Prepaid Delivery.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    to="/offers"
                    className="border-2 border-ink bg-parchment px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-brut-sm transition hover:bg-white"
                  >
                    Build Your Custom 3-Soap Pack →
                  </Link>
                  <Link
                    to="/products"
                    className="border-2 border-parchment bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-wider text-parchment transition hover:bg-parchment hover:text-ink"
                  >
                    View Solo Soaps
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Explore More Detail Modal */}
      <ComboDetailModal
        combo={selectedCombo}
        onClose={() => setSelectedCombo(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Checkout Modal */}
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
