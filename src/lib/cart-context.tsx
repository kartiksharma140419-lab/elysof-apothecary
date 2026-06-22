import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = {
  product: Product;
  qty: number;
  /** Set when this line was added via the ?promo=rs1soap flow.
   *  The first unit is charged at `promoPrice`; every subsequent unit is
   *  charged at the product's normal price. Never more than 1 promo unit. */
  isPromoOrigin?: boolean;
  promoPrice?: number;
};

type CartCtx = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product) => void;
  addPromo: (p: Product, promoPrice: number) => boolean;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  hasPromo: boolean;
  comboDiscount: number;
};

const Ctx = createContext<CartCtx | null>(null);

const PROMO_SHIPPING = 98;
const FREE_SHIP_THRESHOLD = 199;
const NORMAL_SHIPPING = 30;
const PROMO_SESSION_KEY = "elysof_promo_used";

export function lineTotal(i: CartItem): number {
  if (i.isPromoOrigin && typeof i.promoPrice === "number") {
    const promoQty = Math.min(i.qty, 1);
    const normalQty = i.qty - promoQty;
    return promoQty * i.promoPrice + normalQty * i.product.price;
  }
  return i.qty * i.product.price;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Product) => {
    setItems((curr) => {
      const ex = curr.find((i) => i.product.id === p.id);
      if (ex) {
        // Adding the same product again never re-applies the promo — qty bumps,
        // promo unit (if any) stays at 1.
        return curr.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...curr, { product: p, qty: 1 }];
    });
    setOpen(true);
  };

  /** Adds a product at promo price. Returns false if the session already
   *  consumed its promo (cannot be farmed via remove/re-add). */
  const addPromo = (p: Product, promoPrice: number): boolean => {
    if (typeof window !== "undefined" && sessionStorage.getItem(PROMO_SESSION_KEY) === "true") {
      // Promo already used this session — fall back to a normal add.
      add(p);
      return false;
    }
    setItems((curr) => {
      const ex = curr.find((i) => i.product.id === p.id);
      if (ex) {
        // Already in cart at normal price — just bump qty, no promo applied.
        return curr.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...curr, { product: p, qty: 1, isPromoOrigin: true, promoPrice }];
    });
    if (typeof window !== "undefined") sessionStorage.setItem(PROMO_SESSION_KEY, "true");
    setOpen(true);
    return true;
  };

  const remove = (id: string) => setItems((c) => c.filter((i) => i.product.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems((c) =>
      qty <= 0 ? c.filter((i) => i.product.id !== id) : c.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );

  const clear = () => setItems([]);

  const { count, subtotal, comboDiscount, hasPromo } = useMemo(() => {
    let count = 0;
    let rawSubtotal = 0;
    let hasPromo = false;
    let honeyAlmondQty = 0;
    let glutasofQty = 0;
    let neemQty = 0;
    let sandalwoodQty = 0;

    items.forEach((i) => {
      count += i.qty;
      rawSubtotal += lineTotal(i);
      if (i.isPromoOrigin) hasPromo = true;
      if (i.product.id === "honey-almond") honeyAlmondQty = i.qty;
      else if (i.product.id === "glutasof") glutasofQty = i.qty;
      else if (i.product.id === "neem") neemQty = i.qty;
      else if (i.product.id === "sandalwood-kesar") sandalwoodQty = i.qty;
    });

    // Combo discount is suppressed for promo carts so the two offers don't stack.
    const comboCount = hasPromo
      ? 0
      : Math.min(honeyAlmondQty, glutasofQty, neemQty, sandalwoodQty);
    const comboDiscount = comboCount * 97;
    const subtotal = rawSubtotal - comboDiscount;

    return { count, subtotal, comboDiscount, hasPromo };
  }, [items]);

  const shipping = hasPromo
    ? PROMO_SHIPPING
    : subtotal >= FREE_SHIP_THRESHOLD
      ? 0
      : items.length > 0
        ? NORMAL_SHIPPING
        : 0;

  const total = subtotal + shipping;

  return (
    <Ctx.Provider
      value={{
        items,
        open,
        setOpen,
        add,
        addPromo,
        remove,
        setQty,
        clear,
        count,
        subtotal,
        shipping,
        total,
        hasPromo,
        comboDiscount,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
