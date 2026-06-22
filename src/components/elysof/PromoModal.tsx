import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products, type Product } from "@/lib/products";

const PROMO_PARAM = "rs1soap";
const PROMO_PRICE = 1;
const SHIPPING = 98;

// Eligible product IDs + direct-item URL aliases
const ELIGIBLE_IDS = ["neem", "sandalwood-kesar", "honey-almond"] as const;
const DIRECT_ITEM_MAP: Record<string, (typeof ELIGIBLE_IDS)[number]> = {
  neem: "neem",
  sandalwood: "sandalwood-kesar",
  honeyalmond: "honey-almond",
};

export function PromoModal() {
  const { addPromo, setOpen: setCartOpen } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("promo") !== PROMO_PARAM) return;
    if (sessionStorage.getItem("elysof_promo_used") === "true") return;

    const directKey = params.get("item");
    const directId = directKey ? DIRECT_ITEM_MAP[directKey.toLowerCase()] : undefined;
    if (directId) {
      const p = products.find((x) => x.id === directId);
      if (p) {
        addPromo(p, PROMO_PRICE);
        return;
      }
    }
    // Slight delay so the page paints before the takeover.
    const t = window.setTimeout(() => setOpen(true), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eligible = products.filter((p) =>
    (ELIGIBLE_IDS as readonly string[]).includes(p.id),
  );

  const handleSelect = (p: Product) => {
    addPromo(p, PROMO_PRICE);
    setOpen(false);
    // Cart drawer is auto-opened by addPromo; ensure it stays open.
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="relative flex h-full w-full max-w-3xl flex-col overflow-y-auto border-ink bg-parchment shadow-brut sm:h-auto sm:max-h-[92vh] sm:border-2"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close offer"
              className="absolute right-3 top-3 z-10 rounded-full border-2 border-ink bg-parchment p-1.5 hover:bg-ink hover:text-parchment"
            >
              <X size={16} />
            </button>

            <div className="px-6 pb-2 pt-8 sm:px-10 sm:pt-10">
              <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                <Sparkles size={12} /> Exclusive Offer Unlocked
              </span>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                Pick your ₹1 soap
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Choose one ElySof bar below — yours for just ₹1.
                <span className="font-semibold text-ink"> (+ ₹98 flat shipping)</span>
              </p>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-10 sm:py-8">
              {eligible.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className="group relative flex flex-col border-2 border-ink bg-paper p-4 text-left transition hover:-translate-y-1 hover:shadow-brut-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  <div className="mx-auto flex h-28 w-28 items-center justify-center bg-parchment">
                    <img src={p.image} alt={p.shortName} className="h-full w-full object-contain" />
                  </div>
                  <p className="mt-3 font-display text-lg leading-snug">{p.shortName}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-forest">₹1</span>
                    <span className="text-sm text-muted-foreground line-through">₹{p.price}</span>
                  </div>
                  <p className="mt-1 font-accent text-[11px] italic text-muted-foreground">
                    + ₹98 shipping · Total payable ₹99
                  </p>
                  <span className="mt-4 block border-2 border-ink bg-forest py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                    Select This →
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-ink px-6 py-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:px-10">
              One soap per session · No hidden fees · Cash-on-delivery available
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
