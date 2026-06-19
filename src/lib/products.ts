import honeyAlmond from "@/assets/honey-almond.jpeg";
import glutasof from "@/assets/glutasof.jpeg";
import neem from "@/assets/neem.jpeg";
import sandalwood from "@/assets/sandalwood-kesar-new.png";

export type Product = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  mrp: number;
  price: number;
  image: string;
  tags: string[];
  rating: number;
};

export const products: Product[] = [
  {
    id: "honey-almond",
    name: "ElySof Honey & Almond 2-in-1 Scrub Soap Bar",
    shortName: "Honey & Almond Scrub Soap",
    description: "Exfoliates gently, nourishes deeply. The ultimate 2-in-1 soap for soft, radiant skin.",
    mrp: 250,
    price: 109,
    image: honeyAlmond,
    tags: ["Exfoliating", "Moisturizing", "125g"],
    rating: 5,
  },
  {
    id: "glutasof",
    name: "ElySof Glutasof Facewash",
    shortName: "Glutasof Facewash",
    description: "Enriched with Glutathione, Kojic Acid & Alpha Arbutin for skin brightening and rejuvenation.",
    mrp: 490,
    price: 299,
    image: glutasof,
    tags: ["Brightening", "Paraben Free", "SLS Free", "100ml"],
    rating: 5,
  },
  {
    id: "neem",
    name: "ElySof Neem Soap",
    shortName: "Neem Soap",
    description: "Ayurvedic Neem goodness that gently cleanses, protects, and refreshes your skin every day.",
    mrp: 225,
    price: 89,
    image: neem,
    tags: ["Anti-Acne", "Ayurvedic", "100g"],
    rating: 5,
  },
  {
    id: "sandalwood-kesar",
    name: "ElySof Sandalwood & Kesar Soap",
    shortName: "Sandalwood & Kesar Soap",
    description: "Soothing, divine, and elegant. Sandalwood + Saffron for luminous, calm skin.",
    mrp: 250,
    price: 99,
    image: sandalwood,
    tags: ["Soothing", "Luxury", "100g"],
    rating: 5,
  },
];

export const discount = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
