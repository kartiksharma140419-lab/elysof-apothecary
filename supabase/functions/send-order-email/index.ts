import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Override with the ORDER_INBOX secret to point orders at a mailbox that can
// actually receive mail (elysof.com needs MX records for info@elysof.com to work).
const ORDER_INBOX = Deno.env.get("ORDER_INBOX") || "info@elysof.com";
const FROM = "ElySof Orders <orders@elysof.com>";

type Item = { name: string; quantity: number; price: number };

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paymentMethod, paymentId, orderId, customer, items, totalAmount, shipping, subtotal } =
      await req.json();

    if (!customer?.email || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ sent: false, error: "Invalid order payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ sent: false, error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isCod = paymentMethod === "cod";
    const esc = (s: unknown) =>
      String(s ?? "").replace(
        /[<>&"]/g,
        (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!,
      );

    const rows = (items as Item[])
      .map(
        (i) =>
          `<tr><td style="padding:8px;border-bottom:1px solid #eee">${esc(i.name)}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${esc(i.quantity)}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${esc(i.price)}</td></tr>`,
      )
      .join("");

    const address = [
      customer.addressLine1,
      customer.addressLine2,
      customer.city,
      customer.state,
      customer.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#0A0A0A">
        <h2 style="margin:0 0 4px">New ${isCod ? "COD" : "Prepaid"} Order — ElySof</h2>
        <p style="margin:0 0 16px;color:#666">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        <div style="border:2px solid #0A0A0A;padding:14px;margin-bottom:16px">
          <p style="margin:0"><strong>Payment:</strong> ${isCod ? "Cash on Delivery (collect on delivery)" : "Paid online via Razorpay"}</p>
          ${paymentId ? `<p style="margin:6px 0 0"><strong>Payment ID:</strong> ${esc(paymentId)}</p>` : ""}
          ${orderId ? `<p style="margin:6px 0 0"><strong>Order ID:</strong> ${esc(orderId)}</p>` : ""}
        </div>
        <h3 style="margin:0 0 6px">Customer</h3>
        <p style="margin:0 0 16px;line-height:1.6">
          ${esc(customer.fullName)}<br/>
          ${esc(customer.phone)} · ${esc(customer.email)}<br/>
          ${esc(address)}
        </p>
        <h3 style="margin:0 0 6px">Items</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><th style="text-align:left;padding:8px;border-bottom:2px solid #0A0A0A">Product</th><th style="padding:8px;border-bottom:2px solid #0A0A0A">Qty</th><th style="text-align:right;padding:8px;border-bottom:2px solid #0A0A0A">Price</th></tr>
          ${rows}
        </table>
        <p style="margin:16px 0 0;text-align:right;line-height:1.8">
          ${subtotal != null ? `Subtotal: ₹${esc(subtotal)}<br/>` : ""}
          ${shipping != null ? `Shipping: ₹${esc(shipping)}<br/>` : ""}
          <strong style="font-size:18px">Total: ₹${esc(totalAmount)}</strong>
        </p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [ORDER_INBOX],
        reply_to: customer.email,
        subject: `${isCod ? "🟠 COD" : "🟢 PAID"} Order — ${customer.fullName} — ₹${totalAmount}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend failed", res.status, data);
      return new Response(JSON.stringify({ sent: false, error: data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sent: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-order-email error:", err);
    return new Response(JSON.stringify({ sent: false, error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
