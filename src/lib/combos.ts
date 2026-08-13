import honeyAlmondPack2 from "@/assets/honey-almond-pack-2.jpg";
import honeyAlmondPack3 from "@/assets/honey-almond-pack-3.jpg";
import neemPack2 from "@/assets/neem-soap-pack-2.jpg";
import neemPack3 from "@/assets/neem-soap-pack-3.jpg";
import sandalwoodPack2 from "@/assets/sandalwood-kesar-pack-2.jpg";
import sandalwoodPack3 from "@/assets/sandalwood-kesar-pack-3.jpg";
import comboPackFull from "@/assets/combo-pack.jpeg";

import honeyAlmondBenefits from "@/assets/media__1781947909283.jpg";
import honeyAlmondWhatMakesItWork from "@/assets/media__1781947933413.jpg";
import sandalwoodOgExperts from "@/assets/media__1781947909390.jpg";
import sandalwoodWhySpecial from "@/assets/media__1781947909404.jpg";
import neemBenefits from "@/assets/media__1781949651942.jpg";
import neemWhyChoose from "@/assets/media__1781949607698.jpg";

import type { Product } from "./products";

export interface ComboProduct extends Product {
  packCount: number;
  perBarPrice: number;
  savingsAmount: number;
  badge: string;
  benefitsList: string[];
  galleryImages: string[];
  whyStealDeal: string;
}

export const combos: ComboProduct[] = [
  {
    id: "honey-almond-pack-2",
    name: "ElySof Honey & Almond Scrub Soap Bar — Pack of 2",
    shortName: "Honey & Almond — Pack of 2",
    description: "Double the nourishment. 2-in-1 gentle crushed almond exfoliation and raw mountain honey moisture lock for velvety soft skin.",
    mrp: 500,
    price: 169,
    image: honeyAlmondPack2,
    tags: ["Pack of 2", "2x 125g", "Save ₹331", "Exfoliating"],
    rating: 5,
    packCount: 2,
    perBarPrice: 84.5,
    savingsAmount: 331,
    badge: "SAVE 66%",
    benefitsList: [
      "2x 125g Bars — 60 days of silky, exfoliated body care",
      "Real crushed almond shells for non-abrasive micro-buffing",
      "Raw mountain honey leaves skin hydrated, never tight",
      "Saves ₹331 compared to individual MRP",
    ],
    galleryImages: [honeyAlmondPack2, honeyAlmondBenefits, honeyAlmondWhatMakesItWork],
    whyStealDeal: "You get 2 full-sized 125g luxury scrub bars for just ₹169 (only ₹84.50 per bar), saving over 66% with long-lasting moisture.",
  },
  {
    id: "honey-almond-pack-3",
    name: "ElySof Honey & Almond Scrub Soap Bar — Pack of 3",
    shortName: "Honey & Almond — Pack of 3",
    description: "Our ultimate body polish value pack. 3 full-sized exfoliating bars to keep your skin glowing, supple, and radiant all season long.",
    mrp: 750,
    price: 249,
    image: honeyAlmondPack3,
    tags: ["Pack of 3", "3x 125g", "Save ₹501", "Best Value"],
    rating: 5,
    packCount: 3,
    perBarPrice: 83,
    savingsAmount: 501,
    badge: "BEST VALUE · 67% OFF",
    benefitsList: [
      "3x 125g Bars — 90+ days of complete body smoothing",
      "Unlocks FREE Prepaid Shipping automatically",
      "Buffs away dead skin cells & uneven dry patches",
      "Massive ₹501 savings over solo purchase value",
    ],
    galleryImages: [honeyAlmondPack3, honeyAlmondWhatMakesItWork, honeyAlmondBenefits],
    whyStealDeal: "3 massive 125g bars at just ₹83 each! Gives you 3 continuous months of luxury exfoliating baths with zero shipping fee on prepaid.",
  },
  {
    id: "sandalwood-kesar-pack-2",
    name: "ElySof Sandalwood & Kesar Soap — Pack of 2",
    shortName: "Sandalwood & Kesar — Pack of 2",
    description: "Royal Ayurvedic aromatherapy for two months. Pure Mysore Sandalwood and Kashmiri saffron to calm, soothe, and illuminate your skin.",
    mrp: 500,
    price: 149,
    image: sandalwoodPack2,
    tags: ["Pack of 2", "2x 100g", "Save ₹351", "Aromatherapy"],
    rating: 5,
    packCount: 2,
    perBarPrice: 74.5,
    savingsAmount: 351,
    badge: "SAVE 70%",
    benefitsList: [
      "2x 100g Royal Bars — 60 days of soothing luxury baths",
      "Pure Mysore Sandalwood oil calms mind & nervous system",
      "Kashmiri saffron brightens dull skin tone naturally",
      "Saves ₹351 off regular value",
    ],
    galleryImages: [sandalwoodPack2, sandalwoodWhySpecial, sandalwoodOgExperts],
    whyStealDeal: "Authentic therapeutic Sandalwood & Kesar at just ₹74.50 per bar. Experience true spa-grade calm at an unbeatable price.",
  },
  {
    id: "sandalwood-kesar-pack-3",
    name: "ElySof Sandalwood & Kesar Soap — Pack of 3",
    shortName: "Sandalwood & Kesar — Pack of 3",
    description: "Our most opulent sanctuary pack. 3 luxury bars of divine Sandalwood & Kesar for unmatched skin radiance and lasting calming fragrance.",
    mrp: 750,
    price: 199,
    image: sandalwoodPack3,
    tags: ["Pack of 3", "3x 100g", "Save ₹551", "Steal Deal"],
    rating: 5,
    packCount: 3,
    perBarPrice: 66.3,
    savingsAmount: 551,
    badge: "MEGA STEAL · 73% OFF",
    benefitsList: [
      "3x 100g Bars — full 90-day royal bathing ritual",
      "Unlocks FREE Prepaid Shipping threshold (₹199)",
      "High natural glycerin content prevents skin tightness",
      "Saves a staggering ₹551 on MRP",
    ],
    galleryImages: [sandalwoodPack3, sandalwoodOgExperts, sandalwoodWhySpecial],
    whyStealDeal: "Under ₹67 per bar for authentic Sandalwood & Kesar! Plus qualify for FREE shipping — the best luxury deal in Ayurvedic bath care.",
  },
  {
    id: "neem-pack-2",
    name: "ElySof Pure Neem Soap — Pack of 2",
    shortName: "Pure Neem Soap — Pack of 2",
    description: "Double antibacterial defense. Organic cold-pressed neem to target body acne, calm skin irritation, and purify pores daily.",
    mrp: 450,
    price: 129,
    image: neemPack2,
    tags: ["Pack of 2", "2x 100g", "Save ₹321", "Anti-Acne"],
    rating: 5,
    packCount: 2,
    perBarPrice: 64.5,
    savingsAmount: 321,
    badge: "SAVE 71%",
    benefitsList: [
      "2x 100g Bars — 60 days of clear, blemish-free skin",
      "Potent Ayurvedic neem eliminates acne-causing bacteria",
      "Cold-processed base that protects your natural moisture",
      "Saves ₹321 over single purchases",
    ],
    galleryImages: [neemPack2, neemBenefits, neemWhyChoose],
    whyStealDeal: "Clear acne and protect your skin for just ₹64.50 per bar. Essential daily defense for oily, breakout-prone skin.",
  },
  {
    id: "neem-pack-3",
    name: "ElySof Pure Neem Soap — Pack of 3",
    shortName: "Pure Neem Soap — Pack of 3",
    description: "3-Month clear skin treatment pack. 3 handcrafted cold-process neem bars for uninterrupted purification and long-lasting breakout control.",
    mrp: 675,
    price: 179,
    image: neemPack3,
    tags: ["Pack of 3", "3x 100g", "Save ₹496", "Acne Shield"],
    rating: 5,
    packCount: 3,
    perBarPrice: 59.6,
    savingsAmount: 496,
    badge: "TOP SELLER · 73% OFF",
    benefitsList: [
      "3x 100g Bars — 90 days of complete acne protection",
      "Only ₹59.60 per bar — lowest price ever offered",
      "100% SLS, paraben, and harsh chemical free",
      "Save ₹496 compared to solo retail price",
    ],
    galleryImages: [neemPack3, neemWhyChoose, neemBenefits],
    whyStealDeal: "Just ₹59.60 per bar! 3 months of pure organic neem protection for less than the cost of a single commercial drugstore face cleanser.",
  },
  {
    id: "complete-ritual-box",
    name: "ElySof Complete 4-Product Ritual Box",
    shortName: "Complete 4-Product Ritual Box",
    description: "Experience the entire ElySof apothecary collection: Glutasof Brightening Face Wash + Neem Soap + Honey & Almond Scrub + Sandalwood & Kesar Soap.",
    mrp: 1215,
    price: 499,
    image: comboPackFull,
    tags: ["Full Collection", "All 4 Essentials", "Free Shipping", "Gift Ready"],
    rating: 5,
    packCount: 4,
    perBarPrice: 124.75,
    savingsAmount: 716,
    badge: "ULTIMATE COMBO · 59% OFF",
    benefitsList: [
      "Includes all 4 signature ElySof formulations",
      "1x Glutasof 100ml + 1x Honey Scrub + 1x Sandalwood + 1x Neem",
      "Includes FREE Shipping & festive gift box presentation",
      "Massive ₹716 savings over solo individual items",
    ],
    galleryImages: [comboPackFull, honeyAlmondBenefits, sandalwoodOgExperts, neemBenefits],
    whyStealDeal: "The complete luxury bath and facial regimen at 59% OFF with Free Express Delivery anywhere in India!",
  },
];
