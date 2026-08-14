import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar, Navbar, Footer } from "@/components/elysof/Sections";
import { CartDrawer } from "@/components/elysof/CartDrawer";
import { PromoModal } from "@/components/elysof/PromoModal";
import { RakhiPopUp } from "@/components/elysof/RakhiPopUp";
import { ElyChat } from "@/components/elysof/ElyChat";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-parchment text-ink">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <PromoModal />
      <RakhiPopUp />
      <Toaster position="top-center" richColors />
    </div>
  );
}
