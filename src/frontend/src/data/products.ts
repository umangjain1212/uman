export interface ProductVariant {
  size: string;
  price: number;
  originalPrice: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  description: string;
  longDescription: string;
  shortDescription: string;
  category: string;
  benefits: string[];
  weight: string;
  tag?: string;
  variants?: ProductVariant[];
}

export const products: Product[] = [
  {
    id: "coconut-oil",
    name: "Coconut Oil",
    price: 1499,
    originalPrice: 1999,
    imageUrl: "/assets/images/coconut-oil.png",
    shortDescription:
      "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description:
      "Premium cold-pressed coconut oil extracted using traditional Kacchi Ghani method. 100% pure, natural, and chemical-free.",
    longDescription:
      "Our Cold Pressed Coconut Oil is extracted using the traditional Kacchi Ghani process without heat, preserving all the natural nutrients, antioxidants, and medium-chain fatty acids. Perfect for cooking, skincare, and haircare.",
    category: "Oils",
    benefits: [
      "Cold Pressed",
      "Chemical Free",
      "100% Natural",
      "No Preservatives",
    ],
    weight: "500 ml / 1 Litre",
    tag: "Bestseller",
    variants: [
      { size: "500 ml", price: 749, originalPrice: 999 },
      { size: "1 litre", price: 1499, originalPrice: 1999 },
    ],
  },
  {
    id: "sesame-oil-1l",
    name: "Sesame / Til Oil",
    price: 899,
    originalPrice: 1199,
    imageUrl: "/assets/images/sesame-oil-1l.png",
    shortDescription:
      "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description:
      "Pure cold-pressed sesame oil (Til oil) extracted using traditional Kacchi Ghani method. Rich in nutrients.",
    longDescription:
      "Our Sesame Oil is cold-pressed from premium white sesame seeds at temperatures below 40°C. It retains its natural earthy aroma, vitamin E, and powerful antioxidants — ideal for cooking, massages, and Ayurvedic therapies.",
    category: "Oils",
    benefits: [
      "Cold Pressed",
      "Chemical Free",
      "100% Natural",
      "No Preservatives",
    ],
    weight: "500 ml / 1 Litre",
    tag: "Popular",
    variants: [
      { size: "Half Liter (500 ml)", price: 549, originalPrice: 732 },
      { size: "1 Litre", price: 899, originalPrice: 1199 },
    ],
  },
  {
    id: "black-mustard-oil-1l",
    name: "Black Mustard Oil (1 Liter)",
    price: 499,
    originalPrice: 665,
    imageUrl: "/assets/images/black-mustard-oil-1l.png",
    shortDescription:
      "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description:
      "Pure cold-pressed black mustard oil with strong aroma. Traditional Kacchi Ghani extraction method.",
    longDescription:
      "Pressed from premium black mustard seeds using the Kacchi Ghani method, this oil has a bold, pungent aroma that is characteristic of authentic Indian cuisine. Rich in glucosinolates and omega-3 fatty acids.",
    category: "Oils",
    benefits: ["Cold Pressed", "Chemical Free", "100% Natural", "Strong Aroma"],
    weight: "1 Liter",
    variants: [{ size: "1 Liter", price: 499, originalPrice: 665 }],
  },
  {
    id: "yellow-mustard-oil-1l",
    name: "Yellow Mustard Oil (1 Liter)",
    price: 599,
    originalPrice: 799,
    imageUrl: "/assets/images/yellow-mustard-oil-1l.png",
    shortDescription:
      "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description:
      "Pure cold-pressed yellow mustard oil with mild flavor. Traditional Kacchi Ghani extraction method.",
    longDescription:
      "Our Yellow Mustard Oil has a milder, sweeter profile compared to black mustard, making it perfect for everyday cooking. Cold-pressed to retain its natural MUFA content and characteristic yellow color.",
    category: "Oils",
    benefits: ["Cold Pressed", "Chemical Free", "100% Natural", "Mild Flavor"],
    weight: "1 Liter",
    variants: [{ size: "1 Liter", price: 599, originalPrice: 799 }],
  },
  {
    id: "burance-juice-500ml",
    name: "Buransh Juice (500 ml)",
    price: 249,
    originalPrice: 332,
    imageUrl: "/assets/images/burance-juice.png",
    shortDescription:
      "Freshly extracted natural Himalayan Buransh juice, preservative-free and chemical-free.",
    description:
      "Freshly extracted natural Buransh (Rhododendron) juice with no preservatives or additives. Pure and healthy.",
    longDescription:
      "Our Buransh Juice is made from handpicked Himalayan Buransh (Rhododendron) flowers from the Valley of Flowers region. Naturally extracted with no preservatives, no artificial colors, and no additives — a refreshing drink that keeps the body cool in summer and supports digestive health.",
    category: "Beverages",
    benefits: [
      "No Preservatives",
      "No Artificial Colors",
      "Naturally Extracted",
      "Fresh Himalayan Flowers",
    ],
    weight: "250 ml / 500 ml",
    tag: "Fresh",
    variants: [
      { size: "250 ml", price: 139, originalPrice: 185 },
      { size: "500 ml", price: 249, originalPrice: 332 },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
