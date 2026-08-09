import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHmac } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ verified: false, error: "Missing payment details" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keySecret) {
      return new Response(JSON.stringify({ verified: false, error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = createHmac("sha256", keySecret).update(body).digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature mismatch — possible fraudulent payment attempt", {
        razorpay_order_id,
        razorpay_payment_id,
      });
      return new Response(
        JSON.stringify({ verified: false, error: "Payment verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log("✅ Verified Razorpay payment", {
      razorpay_payment_id,
      razorpay_order_id,
      customer: orderDetails?.customer?.fullName,
      total: orderDetails?.totalAmount,
    });

    return new Response(JSON.stringify({ verified: true, paymentId: razorpay_payment_id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("verify-razorpay-payment error:", err);
    return new Response(JSON.stringify({ verified: false, error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
