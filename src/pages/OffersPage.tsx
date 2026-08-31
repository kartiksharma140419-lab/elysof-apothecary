import { ComboOffer } from "@/components/elysof/ComboOffer";
import { HeroSlider } from "@/components/elysof/HeroSlider";
import { SEO, breadcrumbSchema } from "@/components/SEO";

export default function OffersPage() {
  return (
    <>
      <SEO
        title="ElySof Offers — Complete 4-Product Ritual Combo at ₹499"
        description="Grab the limited-time ElySof offer: the complete 4-product Ayurvedic ritual combo for just ₹499. Free shipping on prepaid orders."
        path="/offers"
        image="/og/combo-pack.jpeg"
        jsonLd={breadcrumbSchema("Offers", "/offers")}
      />
      <h1 className="sr-only">ElySof Festive Offers</h1>
      <ComboOffer />
      <HeroSlider />
    </>
  );
}
