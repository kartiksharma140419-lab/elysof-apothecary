import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Gift, ShoppingBag, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, Truck, ShieldCheck, Tag, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import rakhiOfferImage from "@/assets/rakhi-offer.jpeg";

const RAKHI_IDS = ["neem", "sandalwood-kesar", "honey-almond"] as const;
const RAKHI_PRICE = 199;
const RAKHI_MRP = 250 + 250 + 225; // 725
const RAKHI_SAVE = RAKHI_MRP - RAKHI_PRICE; // 526
const STORAGE_KEY = "elysof_rakhi_popup_dismissed_session";

export function RakhiPopUp() {
  const { items, add, setQty, setOpen: setCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingBadge, setShowFloatingBadge] = useState(false);
  const [showManyMore, setShowManyMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem(STORAGE_KEY) === "true";

    if (!isDismissed) {
      // Gentle delayed entrance so page loads smoothly first
      const timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => window.clearTimeout(timer);
    } else {
      // If previously dismissed, show the floating badge so user can re-access
      setShowFloatingBadge(true);
    }
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setShowFloatingBadge(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  };

  const handleOpenAgain = () => {
    setIsOpen(true);
    setShowFloatingBadge(false);
  };

  // Add the 3 Rakhi soaps to cart for 199
  const handleContinueWithOffer = () => {
    RAKHI_IDS.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (!p) return;
      const existing = items.find((i) => i.product.id === id);
      if (existing) setQty(id, existing.qty + 1);
      else add(p);
    });

    toast.success(`🎉 Rakhi Special Unlocked! 3 Luxury Soaps for ₹${RAKHI_PRICE} only!`, {
      description: "Free express shipping automatically included at checkout.",
      duration: 4000,
    });

    handleClose();
    // Automatically open the cart drawer so user can checkout immediately
    setCartOpen(true);
  };

  const handleExploreOffers = () => {
    handleClose();
    navigate("/offers");
    setTimeout(() => {
      const el = document.getElementById("rakhi-offer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleExploreProducts = () => {
    handleClose();
    navigate("/products");
  };

  const handleNavigateTo = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
      {/* ---------------- FESTIVE POP-UP MODAL ---------------- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-[#0c0307]/80 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-[#F5C542] bg-gradient-to-br from-[#2D081E] via-[#4A0E2E] to-[#1F0414] text-white shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(245,197,66,0.25)] my-auto max-h-[94vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="rakhi-modal-title"
            >
              {/* Top Festive Header Urgency Ribbon */}
              <div className="relative flex items-center justify-between bg-gradient-to-r from-[#941128] via-[#B81835] to-[#941128] px-4 py-2 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#FFE898] border-b border-[#F5C542]/40 shadow-inner">
                <div className="flex items-center gap-2 mx-auto">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#F5C542] animate-ping" />
                  <Sparkles size={14} className="text-[#F5C542]" />
                  <span>🪔 Rakhi Festive Special · Limited Time Offer 🪔</span>
                  <Sparkles size={14} className="text-[#F5C542]" />
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  aria-label="Close festive offer"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/80 hover:bg-white hover:text-black transition focus:outline-none focus:ring-2 focus:ring-[#F5C542]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content Body - Scrollable on small screens */}
              <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                  {/* Left Column: Visual Image Banner & Soap Highlights */}
                  <div className="lg:col-span-6 flex flex-col gap-3">
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#F5C542] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group">
                      <img
                        src={rakhiOfferImage}
                        alt="ElySof Rakhi Special Offer - Buy 3 Premium Soaps for ₹199 only"
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 bg-[#941128]/90 backdrop-blur-sm border border-[#F5C542] px-2.5 py-1 rounded text-[11px] font-bold text-[#F5C542] uppercase tracking-wider flex items-center gap-1 shadow">
                        <Gift size={12} /> 3 Soaps in 1 Gift
                      </div>
                    </div>

                    {/* Quick 3-Soap Included Pills */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
                      <div className="bg-white/10 border border-white/15 rounded-lg p-1.5 backdrop-blur-sm">
                        <p className="font-bold text-[#A7F3D0]">Neem Soap</p>
                        <p className="text-white/60 text-[10px]">100g · Anti-Acne</p>
                      </div>
                      <div className="bg-white/10 border border-white/15 rounded-lg p-1.5 backdrop-blur-sm">
                        <p className="font-bold text-[#FDE68A]">Sandalwood & Kesar</p>
                        <p className="text-white/60 text-[10px]">100g · Royal Glow</p>
                      </div>
                      <div className="bg-white/10 border border-white/15 rounded-lg p-1.5 backdrop-blur-sm">
                        <p className="font-bold text-[#FED7AA]">Honey & Almond</p>
                        <p className="text-white/60 text-[10px]">125g · Gentle Scrub</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Offer Pitch, Price & 4 Action Options */}
                  <div className="lg:col-span-6 flex flex-col">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5C542] mb-1">
                      <Sparkles size={13} /> ElySof Festive Offer
                    </div>

                    <h2
                      id="rakhi-modal-title"
                      className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Buy All 3 Premium Soaps{" "}
                      <span className="text-[#F5C542] underline decoration-[#F5C542]/40">
                        @ ₹199 Only
                      </span>
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                      Celebrate the sacred bond with handcrafted Ayurvedic care. Neem, Mysore Sandalwood & Kashmiri Saffron, and Mountain Honey Scrub — complete luxury for your loved ones.
                    </p>

                    {/* Price highlight card */}
                    <div className="mt-3 flex items-center gap-3 bg-black/35 border border-[#F5C542]/40 rounded-xl p-3 sm:p-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-white/60">Festive Price</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-[#F5C542]">₹{RAKHI_PRICE}</span>
                          <span className="text-sm sm:text-base line-through text-white/40 font-mono">₹{RAKHI_MRP}</span>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end gap-1">
                        <span className="bg-[#941128] text-[#FFE898] border border-[#F5C542] text-[11px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                          Save ₹{RAKHI_SAVE} · 73% OFF
                        </span>
                        <span className="text-[11px] text-[#A7F3D0] flex items-center gap-1 font-medium">
                          <Truck size={12} /> Free Express Delivery
                        </span>
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/70">
                      <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#F5C542]" /> 100% Ayurvedic</span>
                      <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#F5C542]" /> No SLS / Parabens</span>
                      <span className="flex items-center gap-1"><Tag size={12} className="text-[#F5C542]" /> Cash on Delivery</span>
                    </div>

                    {/* ---------------- ACTION OPTIONS (User Specified) ---------------- */}
                    <div className="mt-5 flex flex-col gap-2.5">

                      {/* OPTION 1: Continue with this offer (Primary Glowing CTA) */}
                      <button
                        onClick={handleContinueWithOffer}
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#F5C542] via-[#FFF0A3] to-[#F5C542] p-[2px] shadow-[0_4px_20px_rgba(245,197,66,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <div className="flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#F5C542] via-[#FFDF6D] to-[#F5C542] px-5 py-3 text-center text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#2A060D]">
                          <ShoppingBag size={18} className="text-[#2A060D]" />
                          <span>Continue with this offer (@ ₹199)</span>
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>

                      {/* Secondary Actions Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* OPTION 2: Explore more offers */}
                        <button
                          onClick={handleExploreOffers}
                          className="flex items-center justify-center gap-2 rounded-xl border border-[#F5C542]/80 bg-white/10 px-3.5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5C542] hover:bg-[#F5C542] hover:text-[#2A060D] transition active:scale-95"
                        >
                          <Gift size={15} />
                          <span>Explore more offers</span>
                        </button>

                        {/* OPTION 3: Explore our products */}
                        <button
                          onClick={handleExploreProducts}
                          className="flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition active:scale-95"
                        >
                          <Sparkles size={15} className="text-white/80" />
                          <span>Explore our products</span>
                        </button>
                      </div>

                      {/* OPTION 4: Many More (Interactive Expandable Accordion) */}
                      <div className="mt-1 border border-white/15 rounded-xl bg-white/5 overflow-hidden transition-all">
                        <button
                          onClick={() => setShowManyMore((prev) => !prev)}
                          className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition"
                        >
                          <span className="flex items-center gap-1.5 text-[#FFE58F]">
                            <Sparkles size={13} />
                            <span>Many more festive deals & collections</span>
                          </span>
                          {showManyMore ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>

                        <AnimatePresence>
                          {showManyMore && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-3 pb-3 pt-1 border-t border-white/10 flex flex-col gap-1.5 text-xs"
                            >
                              <button
                                onClick={() => handleNavigateTo("/combos")}
                                className="flex items-center justify-between p-2 rounded-lg bg-black/25 hover:bg-white/10 text-left transition"
                              >
                                <span className="text-[#F5C542] font-medium">🎁 Complete 4-Product Ritual Box (Save 59%)</span>
                                <span className="text-[10px] text-white/60">₹499 →</span>
                              </button>
                              <button
                                onClick={() => handleNavigateTo("/combos")}
                                className="flex items-center justify-between p-2 rounded-lg bg-black/25 hover:bg-white/10 text-left transition"
                              >
                                <span className="text-white/90 font-medium">✨ Pack of 2 & 3 Value Steal Deals (Up to 73% OFF)</span>
                                <span className="text-[10px] text-white/60">From ₹129 →</span>
                              </button>
                              <button
                                onClick={() => handleNavigateTo("/results")}
                                className="flex items-center justify-between p-2 rounded-lg bg-black/25 hover:bg-white/10 text-left transition"
                              >
                                <span className="text-[#A7F3D0] font-medium">🌿 Real Customer Before & After Skin Results</span>
                                <span className="text-[10px] text-white/60">View →</span>
                              </button>
                              <button
                                onClick={() => handleNavigateTo("/reviews")}
                                className="flex items-center justify-between p-2 rounded-lg bg-black/25 hover:bg-white/10 text-left transition"
                              >
                                <span className="text-[#FED7AA] font-medium">⭐ Read 1000+ Verified 5-Star Reviews</span>
                                <span className="text-[10px] text-white/60">4.9/5.0 →</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>

                    {/* Bottom subtle dismiss button */}
                    <div className="mt-3 text-center">
                      <button
                        onClick={handleClose}
                        className="text-[11px] text-white/50 hover:text-white underline underline-offset-2 transition"
                      >
                        No thanks, continue browsing regular site
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------------- FLOATING FESTIVE BADGE LAUNCHER ---------------- */}
      {/* Appears when the popup is closed so visitors can reopen it anytime */}
      <AnimatePresence>
        {showFloatingBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-5 left-4 z-40"
          >
            <button
              onClick={handleOpenAgain}
              className="group flex items-center gap-2.5 rounded-full border-2 border-[#F5C542] bg-gradient-to-r from-[#3B0A12] via-[#5A0F2E] to-[#3B0A12] py-2 px-4 text-xs sm:text-sm font-bold text-[#F5C542] shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(245,197,66,0.3)] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,197,66,0.5)] active:scale-95"
              aria-label="Reopen Rakhi festive offer popup"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5C542] opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#F5C542]"></span>
              </span>
              <Gift size={16} className="text-[#FFE58F]" />
              <span className="text-white">Rakhi Offer:</span>
              <span className="text-[#F5C542] uppercase tracking-wider">3 Soaps @ ₹199</span>
              <Sparkles size={14} className="text-[#F5C542]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
