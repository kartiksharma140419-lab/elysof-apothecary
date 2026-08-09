import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { loadRazorpay, RAZORPAY_KEY_ID } from "@/lib/razorpay";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  addressLine1: z.string().trim().min(3, "Address is required").max(200),
  addressLine2: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().min(2, "City is required").max(80),
  state: z.string().trim().min(2, "State is required").max(80),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

type AddressForm = z.infer<typeof addressSchema>;

const empty: AddressForm = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

type PayMethod = "online" | "cod";

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, subtotal, shipping, clear, setOpen: setCartOpen } = useCart();
  const [form, setForm] = useState<AddressForm>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<PayMethod>("online");
  const [confirmation, setConfirmation] = useState<{
    id: string;
    name: string;
    cod: boolean;
  } | null>(null);

  const update = (k: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const notify = async (payload: Record<string, unknown>) => {
    try {
      await supabase.functions.invoke("send-order-email", { body: payload });
    } catch (err) {
      // Never block the customer on a mail failure.
      console.error("order email failed", err);
    }
  };

  const closeAll = () => {
    setConfirmation(null);
    setForm(empty);
    setErrors({});
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = addressSchema.safeParse(form);
    if (!parsed.success) {
      const fe: Partial<Record<keyof AddressForm, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof AddressForm;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    const orderItems = items.map((i) => ({
      id: i.product.id,
      name: i.product.shortName,
      quantity: i.qty,
      price: i.product.price,
    }));

    // ---------- CASH ON DELIVERY ----------
    if (method === "cod") {
      const codId = `COD-${Date.now().toString(36).toUpperCase()}`;
      await notify({
        paymentMethod: "cod",
        orderId: codId,
        customer: form,
        items: orderItems,
        subtotal,
        shipping,
        totalAmount: total,
      });
      setConfirmation({ id: codId, name: form.fullName, cod: true });
      setCartOpen(false);
      clear();
      setSubmitting(false);
      return;
    }

    const ok = await loadRazorpay();
    if (!ok) {
      toast.error("Could not load Razorpay. Check your connection.");
      setSubmitting(false);
      return;
    }

    // 1. Create the order SERVER-SIDE
    let order: { orderId: string; amount: number; currency: string };
    try {
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: total, currency: "INR", receipt: `elysof_${Date.now()}` },
      });
      if (error || !data?.orderId) throw new Error(data?.error || error?.message || "Order failed");
      order = data;
    } catch (err) {
      console.error(err);
      toast.error("Could not initiate payment. Please try again.");
      setSubmitting(false);
      return;
    }

    const itemsSummary = items
      .map((i) => `${i.product.shortName} x${i.qty}`)
      .join(", ")
      .slice(0, 480);

    const fullAddress = [form.addressLine1, form.addressLine2, form.city, form.state, form.pincode]
      .filter(Boolean)
      .join(", ");

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "ElySof",
      description: "Premium Ayurvedic Skincare",
      notes: {
        customer_name: form.fullName,
        customer_phone: form.phone,
        customer_email: form.email,
        delivery_address: fullAddress,
        pincode: form.pincode,
        items_ordered: itemsSummary,
      },
      prefill: { name: form.fullName, email: form.email, contact: form.phone },
      theme: { color: "#3D5F82" },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const { data, error } = await supabase.functions.invoke("verify-razorpay-payment", {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                items: items.map((i) => ({
                  id: i.product.id,
                  name: i.product.shortName,
                  quantity: i.qty,
                  price: i.product.price,
                })),
                customer: form,
                totalAmount: total,
              },
            },
          });
          if (error || !data?.verified) {
            toast.error(
              "Payment verification failed. If money was deducted it will be refunded. Contact support with payment ID: " +
                response.razorpay_payment_id,
            );
            setSubmitting(false);
            return;
          }
          await notify({
            paymentMethod: "online",
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            customer: form,
            items: orderItems,
            subtotal,
            shipping,
            totalAmount: total,
          });
          setConfirmation({ id: response.razorpay_payment_id, name: form.fullName, cod: false });

          setCartOpen(false);
          clear();
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          toast.error(
            "We couldn't confirm your payment status. Please contact support before retrying.",
          );
          setSubmitting(false);
        }
      },
      modal: {
        ondismiss: () => {
          toast.message("Payment cancelled.");
          setSubmitting(false);
        },
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        toast.error(`Payment failed: ${resp?.error?.description || "Please try again."}`);
        setSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Could not open Razorpay checkout.");
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
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto border-2 border-ink bg-parchment shadow-brut"
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
                <p className="mt-2 text-sm text-muted-foreground">
                  {confirmation.cod
                    ? "Your Cash on Delivery order is placed. Pay the courier when it arrives."
                    : "Payment successful — your order is confirmed and verified."}
                </p>
                <div className="mt-6 border-2 border-dashed border-ink bg-paper px-4 py-3 text-left">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {confirmation.cod ? "Order Reference" : "Payment ID"}
                  </p>
                  <p className="break-all font-mono text-sm">{confirmation.id}</p>
                </div>
                <p className="mt-6 font-accent text-sm italic text-muted-foreground">
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
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-forest">
                  Step 2 of 2
                </p>
                <h3 className="mt-1 font-display text-3xl">Delivery details</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll use this to ship your order and share updates. Payment opens after this
                  step.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Field
                    label="Full Name"
                    className="col-span-2"
                    value={form.fullName}
                    onChange={update("fullName")}
                    error={errors.fullName}
                  />
                  <Field
                    label="Phone (10-digit)"
                    type="tel"
                    maxLength={10}
                    value={form.phone}
                    onChange={update("phone")}
                    error={errors.phone}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    error={errors.email}
                  />
                  <Field
                    label="Address Line 1"
                    className="col-span-2"
                    value={form.addressLine1}
                    onChange={update("addressLine1")}
                    error={errors.addressLine1}
                  />
                  <Field
                    label="Address Line 2 (optional)"
                    className="col-span-2"
                    value={form.addressLine2 ?? ""}
                    onChange={update("addressLine2")}
                    required={false}
                  />
                  <Field
                    label="City"
                    value={form.city}
                    onChange={update("city")}
                    error={errors.city}
                  />
                  <Field
                    label="State"
                    value={form.state}
                    onChange={update("state")}
                    error={errors.state}
                  />
                  <Field
                    label="Pincode"
                    className="col-span-2"
                    maxLength={6}
                    value={form.pincode}
                    onChange={update("pincode")}
                    error={errors.pincode}
                  />
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Payment method
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <PayOption
                    active={method === "online"}
                    onClick={() => setMethod("online")}
                    title="Pay Online"
                    sub="UPI · Cards · Netbanking"
                  />
                  <PayOption
                    active={method === "cod"}
                    onClick={() => setMethod("cod")}
                    title="Cash on Delivery"
                    sub="Pay the courier on arrival"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-ink pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {method === "cod" ? "Pay on delivery" : "Total payable"}
                    </p>
                    <p className="font-display text-2xl">₹{total}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || items.length === 0}
                    className="border-2 border-ink bg-forest px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
                  >
                    {submitting
                      ? method === "cod"
                        ? "Placing…"
                        : "Opening…"
                      : method === "cod"
                        ? "Place COD Order →"
                        : "Continue to Pay →"}
                  </button>
                </div>

                <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                  🔒 Server-verified payments · UPI · Cards · Netbanking · COD
                </p>
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
  error,
  required = true,
  ...rest
}: {
  label: string;
  className?: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        {...rest}
        required={required}
        className={`border-2 bg-paper px-3 py-2 text-sm outline-none focus:bg-parchment ${
          error ? "border-destructive" : "border-ink"
        }`}
      />
      {error && <span className="text-[10px] font-medium text-destructive">{error}</span>}
    </label>
  );
}

function PayOption({
  active,
  onClick,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-2 border-ink px-3 py-3 text-left transition ${
        active ? "bg-forest text-primary-foreground shadow-brut-sm" : "bg-paper hover:bg-parchment"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
        <span
          className={`inline-block h-3 w-3 shrink-0 rounded-full border-2 ${
            active ? "border-current bg-current" : "border-ink"
          }`}
        />
        {title}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-wider opacity-70">{sub}</span>
    </button>
  );
}
