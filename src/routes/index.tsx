import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart-context";
import {
  AnnouncementBar,
  Navbar,
  Hero,
  Marquee,
  Products,
  WhyElysof,
  Results,
  Reviews,
  Contact,
  Footer,
  Divider,
} from "@/components/elysof/Sections";
import { CartDrawer } from "@/components/elysof/CartDrawer";
import { HeroSlider } from "@/components/elysof/HeroSlider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ElySof — Premium Ayurvedic Skincare | Neem, Honey, Sandalwood Soaps" },
      {
        name: "description",
        content:
          "Handcrafted Ayurvedic skincare from India. Shop ElySof Neem Soap, Glutasof Facewash, Honey & Almond Scrub, Sandalwood & Kesar Soap. Free shipping above ₹299.",
      },
      { property: "og:title", content: "ElySof — Premium Ayurvedic Skincare" },
      { property: "og:description", content: "Premium handcrafted Ayurvedic soaps & facewash. Trusted by 1000+ across India." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-parchment text-ink">
        <AnnouncementBar />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Products />
          <Divider />
          <WhyElysof />
          <Results />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
        <Toaster position="top-center" richColors />
      </div>
    </CartProvider>
  );
}
