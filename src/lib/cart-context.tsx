import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Product) => {
    setItems((curr) => {
      const ex = curr.find((i) => i.product.id === p.id);
      if (ex) return curr.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...curr, { product: p, qty: 1 }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setItems((c) => c.filter((i) => i.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((c) =>
      qty <= 0 ? c.filter((i) => i.product.id !== id) : c.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    items.forEach((i) => {
      count += i.qty;
      subtotal += i.qty * i.product.price;
    });
    return { count, subtotal };
  }, [items]);

  return (
    <Ctx.Provider value={{ items, open, setOpen, add, remove, setQty, clear, count, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
