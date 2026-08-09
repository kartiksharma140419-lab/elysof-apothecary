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
import { ComboOffer } from "@/components/elysof/ComboOffer";
import { PromoModal } from "@/components/elysof/PromoModal";
import { RakhiOffer } from "@/components/elysof/RakhiOffer";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-parchment text-ink">
        <AnnouncementBar />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <RakhiOffer />
          <Products />

          <div className="offer-section-legacy">
            <ComboOffer />
          </div>
          <div className="section-after-offer-legacy">
            <HeroSlider />
          </div>
          <Divider />
          <WhyElysof />
          <Results />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
        <PromoModal />
        <Toaster position="top-center" richColors />
      </div>
      <Analytics />
    </CartProvider>
  );
}
