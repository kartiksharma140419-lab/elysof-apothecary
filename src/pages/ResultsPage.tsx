import { Results } from "@/components/elysof/Sections";
import { SEO, breadcrumbSchema } from "@/components/SEO";

export default function ResultsPage() {
  return (
    <>
      <SEO
        title="Real Before & After Skin Results | ElySof Ayurvedic Care"
        description="See real before-and-after skin results from ElySof customers — clearer acne with Neem Soap, brighter tone with Glutasof Facewash and softer skin with Honey & Almond."
        path="/results"
        image="/og/honey-almond.jpeg"
        jsonLd={breadcrumbSchema("Results", "/results")}
      />
      <h1 className="sr-only">Real People. Real Skin.</h1>
      <Results />
    </>
  );
}
