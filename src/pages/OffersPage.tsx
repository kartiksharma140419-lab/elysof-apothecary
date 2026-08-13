import { RakhiOffer } from "@/components/elysof/RakhiOffer";
import { ComboOffer } from "@/components/elysof/ComboOffer";
import { HeroSlider } from "@/components/elysof/HeroSlider";
import { SEO, breadcrumbSchema } from "@/components/SEO";

export default function OffersPage() {
  return (
    <>
      <SEO
        title="ElySof Offers — Rakhi 3-Soap Combo ₹199 & Full Combo ₹499"
        description="Grab the limited-time ElySof festive offers: any 3 Ayurvedic soaps for ₹199 and the complete 4-product ritual combo for ₹499. Free shipping on prepaid orders."
        path="/offers"
        image="/og/rakhi-offer.jpeg"
        jsonLd={breadcrumbSchema("Offers", "/offers")}
      />
      <h1 className="sr-only">ElySof Festive Offers</h1>
      <RakhiOffer />
      <div className="offer-section-legacy">
        <ComboOffer />
      </div>
      <div className="section-after-offer-legacy">
        <HeroSlider />
      </div>
    </>
  );
}
