import { useState, useEffect, useRef } from "react";
import { X, Star, Check, ShieldCheck, Sparkles, ShoppingBag, Zap, ArrowRight, Truck } from "lucide-react";
import type { ComboProduct } from "@/lib/combos";

interface ComboDetailModalProps {
  combo: ComboProduct | null;
  onClose: () => void;
  onAddToCart: (combo: ComboProduct) => void;
  onBuyNow: (combo: ComboProduct) => void;
}

export function ComboDetailModal({
  combo,
  onClose,
  onAddToCart,
  onBuyNow,
}: ComboDetailModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [combo]);

  if (!combo) return null;

  const images = combo.galleryImages && combo.galleryImages.length > 0 ? combo.galleryImages : [combo.image];

  return (
    <div
      className="product-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="product-modal-content relative my-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto border-2 border-ink bg-parchment p-6 sm:p-8 shadow-brut"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center border-2 border-ink bg-paper text-ink transition hover:bg-ink hover:text-parchment cursor-pointer shadow-brut-sm"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden border-2 border-ink bg-white flex items-center justify-center p-6 shadow-brut-sm">
              <img
                src={images[activeImgIndex]}
                alt={combo.name}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute left-3 top-3 border-2 border-ink bg-forest px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                {combo.badge}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`h-16 w-16 shrink-0 border-2 bg-white p-1 transition cursor-pointer ${
                      idx === activeImgIndex ? "border-forest shadow-sm" : "border-line opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Steal Deal Benefit Callout */}
            <div className="mt-4 border-2 border-dashed border-forest bg-paper p-4">
              <div className="flex items-center gap-2 text-forest font-bold text-xs uppercase tracking-wider">
                <Sparkles size={16} /> Why This Combo Is A Steal Deal
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {combo.whyStealDeal}
              </p>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-1 text-gold">
              {[...Array(combo.rating)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
              <span className="ml-2 text-xs font-bold text-ink">5.0 · Verified Value Pack</span>
            </div>

            <h2 className="mt-2 font-display text-2xl sm:text-3xl leading-tight text-ink">
              {combo.name}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {combo.description}
            </p>

            {/* Pricing Breakdown Box */}
            <div className="mt-5 border-2 border-ink bg-paper p-4 shadow-brut-sm">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl sm:text-4xl text-ink">₹{combo.price}</span>
                <span className="text-base text-muted-foreground line-through">₹{combo.mrp}</span>
                <span className="rounded bg-[#B2511E] px-2 py-0.5 text-xs font-bold uppercase text-white">
                  Save ₹{combo.savingsAmount}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-xs">
                <span className="font-semibold text-forest">
                  ⚡ Effective Price: ₹{combo.perBarPrice.toFixed(0)} / bar
                </span>
                <span className="font-medium text-muted-foreground">
                  {combo.packCount} Bars Included
                </span>
              </div>
              {combo.price >= 199 && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-forest">
                  <Truck size={13} /> Eligible for FREE Shipping on Prepaid Orders!
                </div>
              )}
            </div>

            {/* Key Benefits */}
            <div className="mt-5">
              <p className="font-accent text-xs uppercase tracking-widest text-forest font-bold">
                Combo Highlights & Benefits
              </p>
              <ul className="mt-2.5 space-y-2">
                {combo.benefitsList.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-ink">
                    <Check size={16} className="shrink-0 text-forest mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop / Modal Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-line">
              <button
                onClick={() => onAddToCart(combo)}
                className="w-full sm:w-1/2 border-2 border-ink bg-forest py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-brut-sm transition hover:bg-forest-deep cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={() => onBuyNow(combo)}
                className="w-full sm:w-1/2 border-2 border-terracotta py-3 text-xs font-bold uppercase tracking-wider text-terracotta transition hover:bg-terracotta hover:text-forest-deep cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
