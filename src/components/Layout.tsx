import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar, Navbar, Footer } from "@/components/elysof/Sections";
import { CartDrawer } from "@/components/elysof/CartDrawer";
import { PromoModal } from "@/components/elysof/PromoModal";

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
      <Toaster position="top-center" richColors />
    </div>
  );
}
