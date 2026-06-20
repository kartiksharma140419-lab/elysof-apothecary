import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { loadRazorpay, RAZORPAY_KEY_ID } from "@/lib/razorpay";
import { toast } from "sonner";

type Customer = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  pincode: string;
};

const empty: Customer = { name: "", phone: "", email: "", street: "", city: "", pincode: "" };

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, clear, setOpen: setCartOpen } = useCart();
  const [form, setForm] = useState<Customer>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; name: string } | null>(null);

  const shipping = subtotal >= 299 ? 0 : 49;
  const total = subtotal + shipping;

  const update = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const closeAll = () => {
    setConfirmation(null);
    setForm(empty);
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(form).every((v) => v.trim().length > 0)) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    const ok = await loadRazorpay();
    if (!ok) {
      toast.error("Could not load Razorpay. Check your connection.");
      setSubmitting(false);
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "ElySof",
      description: "Premium Ayurvedic Skincare",
      handler: (response: { razorpay_payment_id: string }) => {
        setConfirmation({ id: response.razorpay_payment_id, name: form.name });
        setCartOpen(false);
        clear();
        setSubmitting(false);
      },
      modal: {
        ondismiss: () => setSubmitting(false),
      },
      prefill: { name: form.name, email: form.email, contact: form.phone },
      notes: { address: `${form.street}, ${form.city} - ${form.pincode}` },
      theme: { color: "#3D5F82" },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setSubmitting(false);
      });
      rzp.open();
    } catch {
      toast.error(
        "Razorpay needs a valid Key ID. Replace RAZORPAY_KEY_ID in src/lib/razorpay.ts.",
      );
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAll}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg border-2 border-ink bg-parchment shadow-brut"
          >
            <button
              onClick={closeAll}
              className="absolute right-3 top-3 rounded-full border-2 border-ink p-1.5 hover:bg-ink hover:text-parchment"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {confirmation ? (
              <div className="px-8 py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest text-primary-foreground"
                >
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl">Thank you, {confirmation.name}!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Your order is confirmed.</p>
                <div className="mt-6 border-2 border-dashed border-ink bg-paper px-4 py-3 text-left">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Payment ID</p>
                  <p className="font-mono text-sm break-all">{confirmation.id}</p>
                </div>
                <p className="mt-6 font-accent italic text-sm text-muted-foreground">
                  Our team will contact you within 24 hours for delivery updates. 🌿
                </p>
                <button
                  onClick={closeAll}
                  className="mt-6 w-full border-2 border-ink bg-forest py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  Continue Shopping →
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="px-6 py-6 sm:px-8 sm:py-8">
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-forest">Step 2 of 2</p>
                <h3 className="mt-1 font-display text-3xl">Delivery details</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We need a few details before opening Razorpay.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Field label="Full Name" className="col-span-2" value={form.name} onChange={update("name")} />
                  <Field label="Phone" type="tel" value={form.phone} onChange={update("phone")} />
                  <Field label="Email" type="email" value={form.email} onChange={update("email")} />
                  <Field label="Street Address" className="col-span-2" value={form.street} onChange={update("street")} />
                  <Field label="City" value={form.city} onChange={update("city")} />
                  <Field label="Pincode" value={form.pincode} onChange={update("pincode")} />
                </div>

                <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-ink pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total payable</p>
                    <p className="font-display text-2xl">₹{total}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || items.length === 0}
                    className="border-2 border-ink bg-forest px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
                  >
                    {submitting ? "Opening…" : "Pay with Razorpay →"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...rest}
        required
        className="border-2 border-ink bg-paper px-3 py-2 text-sm outline-none focus:bg-parchment"
      />
    </label>
  );
}
