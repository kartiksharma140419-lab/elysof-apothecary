import { useCart, lineTotal } from "@/lib/cart-context";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { CheckoutModal } from "./CheckoutModal";

const FREE_SHIP = 199;

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal, comboDiscount, shipping, total, hasPromo } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-parchment"
            >
              <header className="flex items-center justify-between border-b-2 border-ink px-6 py-4">
                <div>
                  <p className="font-accent text-xs uppercase tracking-[0.2em] text-forest">Your Basket</p>
                  <h3 className="font-display text-2xl">{items.length} item{items.length === 1 ? "" : "s"}</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border-2 border-ink p-2 transition hover:bg-ink hover:text-parchment"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </header>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <p className="font-display text-3xl">Your basket is empty.</p>
                  <p className="mt-2 font-accent italic text-muted-foreground">Pick up something nourishing →</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 border-2 border-ink bg-forest px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    Browse products
                  </button>
                </div>
              ) : (
                <>
                  <div className="border-b border-line bg-paper/60 px-6 py-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">
                        {remaining > 0 ? `Add ₹${remaining} more for FREE shipping` : "🎉 Free shipping unlocked!"}
                      </span>
                      <span className="font-accent italic">₹{FREE_SHIP}</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden border border-ink bg-paper">
                      <div className="h-full bg-forest transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <ul className="flex-1 divide-y divide-line overflow-y-auto">
                    {items.map((i) => (
                      <li key={i.product.id} className="flex gap-4 px-6 py-4">
                        <div className="h-20 w-20 shrink-0 border-2 border-ink bg-paper p-1">
                          <img src={i.product.image} alt={i.product.shortName} className="h-full w-full object-contain" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate font-display text-base leading-snug">{i.product.shortName}</p>
                            <span className="shrink-0 text-sm font-semibold">₹{lineTotal(i)}</span>
                          </div>
                          {i.isPromoOrigin ? (
                            <p className="text-[11px] text-forest">
                              <span className="font-bold">★ ₹1 promo</span> on 1st unit
                              {i.qty > 1 ? ` · ${i.qty - 1} × ₹${i.product.price}` : ""}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">₹{i.product.price}</p>
                          )}
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border-2 border-ink">
                              <button
                                onClick={() => setQty(i.product.id, i.qty - 1)}
                                className="px-2 py-1 hover:bg-ink hover:text-parchment"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-[2rem] px-2 text-center text-sm font-semibold">{i.qty}</span>
                              <button
                                onClick={() => setQty(i.product.id, i.qty + 1)}
                                className="px-2 py-1 hover:bg-ink hover:text-parchment"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => remove(i.product.id)}
                              className="text-muted-foreground hover:text-destructive"
                              aria-label="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <footer className="border-t-2 border-ink bg-paper px-6 py-4">
                    {hasPromo && (
                      <div className="mb-2 flex items-center justify-between text-xs text-forest">
                        <span className="font-semibold uppercase tracking-wider">★ ₹1 Promo Active</span>
                        <span className="font-bold">Flat ₹98 shipping</span>
                      </div>
                    )}
                    {comboDiscount > 0 && (
                      <div className="mb-2 flex items-center justify-between text-xs text-forest">
                        <span className="font-semibold uppercase tracking-wider">★ Combo Discount Applied</span>
                        <span className="font-bold">-₹{comboDiscount}</span>
                      </div>
                    )}
                    <div className="space-y-1.5 border-b border-dashed border-ink pb-3 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-accent uppercase tracking-wider text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">₹{subtotal}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-accent uppercase tracking-wider text-muted-foreground">
                          Shipping &amp; Handling
                        </span>
                        <span className="font-semibold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                      </div>
                    </div>
                    <div className="mb-4 flex items-end justify-between">
                      <span className="font-accent text-sm font-bold uppercase tracking-wider">Total Payable</span>
                      <span className="font-display text-3xl">₹{total}</span>
                    </div>
                    <button
                      onClick={() => setCheckoutOpen(true)}
                      className="w-full border-2 border-ink bg-forest py-4 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                      Checkout with Razorpay →
                    </button>
                    <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                      Secure payment · UPI · Cards · Netbanking
                    </p>
                  </footer>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
