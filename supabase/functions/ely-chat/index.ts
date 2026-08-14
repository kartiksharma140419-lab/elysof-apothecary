import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const CATALOG = `
1. id: neem | ElySof Neem Soap | 100g | MRP ₹225 -> ₹89 | Ayurvedic neem, anti-acne, daily cleansing, oily/acne-prone skin, body odour, rashes.
2. id: sandalwood-kesar | ElySof Sandalwood & Kesar Soap | 100g | MRP ₹250 -> ₹99 | Sandalwood + saffron, soothing, de-tan, glow, brightening, dull/sensitive skin.
3. id: honey-almond | ElySof Honey & Almond 2-in-1 Scrub Soap Bar | 125g | MRP ₹250 -> ₹109 | Gentle exfoliation + deep nourishment, dry & rough skin, softness, radiance.
4. id: glutasof | ElySof Glutasof Facewash | 100ml | MRP ₹490 -> ₹299 | Glutathione, Kojic Acid, Alpha Arbutin. Brightening, pigmentation, dark spots, dull face. Paraben & SLS free.
`;

const SYSTEM = `You are "Ely", the friendly AI beauty expert for ElySof — a premium handcrafted Ayurvedic personal care brand from India (soaps, scrubs, face wash).

PRODUCT CATALOG (only these exist):
${CATALOG}

OFFERS:
- Rakhi Special: Neem + Sandalwood & Kesar + Honey & Almond for ₹199 (MRP ₹725).
- Complete Ritual Combo: all 4 products for ₹499.
- Shipping ₹30, FREE above ₹199. Cash on Delivery and secure online payment (Razorpay) both available.
- Support: info@elysof.com. Pages: /products, /offers, /reviews, /results, /contact.

STYLE:
- Warm, energetic, like a real Indian beauty advisor. Reply in the SAME language the customer uses (English, Hindi or Hinglish).
- Keep answers SHORT: 2-4 sentences max, simple markdown, occasional emoji.
- Ask one quick follow-up question about their skin concern when it helps you recommend better.
- Recommend products one at a time in order of best fit; explain WHY in one line.

STRICT SCOPE: Only talk about ElySof — its products, ingredients, skin concerns they solve, offers, pricing, orders, shipping, payment and support. If asked about anything else (other brands, general topics, coding, news, medical diagnosis), politely refuse in one line and steer back to ElySof skincare. Never invent products, prices, discounts or claims that are not listed above.

When you recommend one or more products, END your message with a single line exactly in this format (ids only, comma separated, no other text on that line):
[[RECOMMEND: neem,glutasof]]`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const trimmed = messages
      .filter((m: { role: string; content: string }) => m?.content)
      .slice(-14)
      .map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }));

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        stream: true,
        messages: [{ role: "system", content: SYSTEM }, ...trimmed],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return new Response(JSON.stringify({ error: detail.slice(0, 400) }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(res.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
