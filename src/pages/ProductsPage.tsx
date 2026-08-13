import { Products } from "@/components/elysof/Sections";
import { SEO, breadcrumbSchema } from "@/components/SEO";
import { productListSchema } from "@/lib/schema";

export default function ProductsPage() {
  return (
    <>
      <SEO
        title="Shop All Ayurvedic Soaps & Face Wash | ElySof Products"
        description="Browse every ElySof product — Neem Soap, Glutasof Facewash, Honey & Almond Scrub Soap and Sandalwood & Kesar Soap. Handcrafted in India, paraben & SLS free."
        path="/products"
        image="/og/neem.jpeg"
        jsonLd={[productListSchema(), breadcrumbSchema("Products", "/products")]}
      />
      <h1 className="sr-only">Our Bestselling Products</h1>
      <Products />
    </>
  );
}
