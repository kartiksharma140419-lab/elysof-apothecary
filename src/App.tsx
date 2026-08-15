import { Routes, Route } from "react-router-dom";
import { CartProvider } from "@/lib/cart-context";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import CombosPage from "@/pages/CombosPage";
import ReviewsPage from "@/pages/ReviewsPage";
import ResultsPage from "@/pages/ResultsPage";
import OffersPage from "@/pages/OffersPage";
import StoryPage from "@/pages/StoryPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/combos" element={<CombosPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
