import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LifestyleHero,
  LifestyleMarquee,
  LifestyleThreeSenses,
  LifestylePurityComparison,
  LifestyleLookbook,
  LifestyleFinalBanner,
} from "@/components/elysof/LifestyleHome";
import { ShopOurBestsellers } from "@/components/elysof/ShopOurBestsellers";
import { SEO, organizationSchema } from "@/components/SEO";

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
        title="ElySof — Elevate Your Everyday Bath Ritual | Premium Ayurvedic Skincare"
        description="Premium bath, body, and personal care essentials, crafted to make everyday self-care feel luxurious. Handcrafted in small batches with pure Ayurvedic extracts."
        path="/"
        image="/og/combo-pack.jpeg"
        jsonLd={[organizationSchema]}
      />
      <LifestyleHero />
      <LifestyleMarquee />
      <ShopOurBestsellers />
      <LifestyleThreeSenses />
      <LifestylePurityComparison />
      <LifestyleLookbook />
      <LifestyleFinalBanner />
    </>
  );
}
