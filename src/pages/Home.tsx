import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero, Marquee, Products, WhyElysof, Divider } from "@/components/elysof/Sections";
import { SEO, organizationSchema } from "@/components/SEO";
import { productListSchema } from "@/lib/schema";

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
  }, [hash]);

  return (
    <>
      <SEO
        title="ElySof — Premium Ayurvedic Skincare | Neem, Honey, Sandalwood Soaps"
        description="Handcrafted Ayurvedic skincare from India. Shop ElySof Neem Soap, Glutasof Facewash, Honey & Almond Scrub, Sandalwood & Kesar Soap. Free shipping above ₹299."
        path="/"
        image="/og/combo-pack.jpeg"
        jsonLd={[organizationSchema, productListSchema()]}
      />
      <Hero />
      <Marquee />
      <Products />
      <Divider />
      <WhyElysof />
    </>
  );
}
