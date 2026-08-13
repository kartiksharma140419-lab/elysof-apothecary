import { Reviews } from "@/components/elysof/Sections";
import { SEO, breadcrumbSchema } from "@/components/SEO";

export default function ReviewsPage() {
  return (
    <>
      <SEO
        title="ElySof Customer Reviews | Ayurvedic Skincare Testimonials"
        description="Read what customers across India say about ElySof Neem Soap, Glutasof Facewash and our handcrafted Ayurvedic soaps — real feedback on acne, glow and soft skin."
        path="/reviews"
        image="/og/glutasof.jpeg"
        jsonLd={breadcrumbSchema("Reviews", "/reviews")}
      />
      <h1 className="sr-only">What Our Customers Say</h1>
      <Reviews />
    </>
  );
}
