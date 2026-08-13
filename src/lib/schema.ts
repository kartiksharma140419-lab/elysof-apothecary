import { products } from "@/lib/products";
import { SITE_URL } from "@/components/SEO";

const ogImages: Record<string, string> = {
  neem: "/og/neem.jpeg",
  glutasof: "/og/glutasof.jpeg",
  "honey-almond": "/og/honey-almond.jpeg",
  "sandalwood-kesar": "/og/combo-pack.jpeg",
};

export function productListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: `${SITE_URL}${ogImages[p.id] ?? "/logo.png"}`,
        brand: { "@type": "Brand", name: "ElySof" },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: String(p.price),
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/products`,
        },
      },
    })),
  };
}
