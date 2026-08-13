import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found — ElySof Ayurvedic Skincare"
        description="The page you are looking for does not exist. Explore ElySof handcrafted Ayurvedic soaps, face wash and festive combo offers on our shop instead."
        path="/404"
      />
      <section className="border-b-2 border-ink py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="font-accent text-sm italic text-forest">— 404</span>
          <h1 className="mt-1 font-display text-5xl sm:text-6xl">This page wandered off.</h1>
          <p className="mt-4 text-muted-foreground">
            The page you're looking for doesn't exist. Let's get you back to the good stuff.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="border-2 border-ink bg-forest px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Back Home
            </Link>
            <Link
              to="/products"
              className="border-2 border-terracotta px-6 py-3 text-sm font-bold uppercase tracking-wider text-terracotta transition hover:bg-terracotta hover:text-forest-deep"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
