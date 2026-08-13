import { Contact } from "@/components/elysof/Sections";
import { SEO, breadcrumbSchema } from "@/components/SEO";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact ElySof | Ayurvedic Skincare Support & Bulk Orders"
        description="Get in touch with the ElySof team for orders, bulk enquiries or collaborations. Call +91 83697 29653 or email info@elysof.com, Mon–Sat, 10AM–6PM IST."
        path="/contact"
        image="/og/combo-pack.jpeg"
        jsonLd={breadcrumbSchema("Contact", "/contact")}
      />
      <h1 className="sr-only">We'd Love to Hear From You</h1>
      <Contact />
    </>
  );
}
