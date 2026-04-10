export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  longDescription: string;
  category: string;
  benefits: string[];
  weight: string;
  tag?: string;
}

export const products: Product[] = [
  {
    id: "coconut-oil",
    name: "Cold Pressed Coconut Oil",
    price: 450,
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
    description:
      "Virgin cold-pressed from fresh coconuts. Rich in lauric acid for skin, hair & immunity.",
    longDescription:
      "Our Cold Pressed Coconut Oil is extracted using the traditional Kacchi Ghani process without heat, preserving all the natural nutrients, antioxidants, and medium-chain fatty acids. Perfect for cooking, skincare, and haircare.",
    category: "Oils",
    benefits: [
      "Rich in lauric acid — boosts immunity",
      "Excellent for cooking at medium heat",
      "Deep moisturizer for skin & hair",
      "Supports healthy cholesterol levels",
    ],
    weight: "500 ml",
    tag: "Bestseller",
  },
  {
    id: "sesame-oil",
    name: "Cold Pressed Sesame Oil",
    price: 380,
    imageUrl:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80",
    description:
      "Traditional til oil pressed at low temperature. Packed with Vitamin E & antioxidants.",
    longDescription:
      "Our Sesame Oil is cold-pressed from premium white sesame seeds at temperatures below 40°C. It retains its natural earthy aroma, vitamin E, and powerful antioxidants — ideal for cooking, massages, and Ayurvedic therapies.",
    category: "Oils",
    benefits: [
      "High in Vitamin E & B-complex",
      "Natural anti-inflammatory properties",
      "Traditional Ayurvedic massage oil",
      "Enhances flavor in cooking",
    ],
    weight: "500 ml",
    tag: "Popular",
  },
  {
    id: "black-mustard-oil",
    name: "Black Mustard Oil",
    price: 290,
    imageUrl:
      "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&q=80",
    description:
      "Pungent cold-pressed black mustard oil. Authentic Kacchi Ghani flavor for traditional cooking.",
    longDescription:
      "Pressed from premium black mustard seeds using the Kacchi Ghani method, this oil has a bold, pungent aroma that is characteristic of authentic Indian cuisine. Rich in glucosinolates and omega-3 fatty acids.",
    category: "Oils",
    benefits: [
      "Natural antibacterial & antifungal",
      "Rich in omega-3 & omega-6",
      "Stimulates digestion & appetite",
      "Traditional Indian cooking essential",
    ],
    weight: "500 ml",
  },
  {
    id: "yellow-mustard-oil",
    name: "Yellow Mustard Oil",
    price: 270,
    imageUrl:
      "https://images.unsplash.com/photo-1559181567-c3190b0ada43?w=800&q=80",
    description:
      "Mild & golden cold-pressed yellow mustard oil. Perfect for everyday Indian cooking.",
    longDescription:
      "Our Yellow Mustard Oil has a milder, sweeter profile compared to black mustard, making it perfect for everyday cooking. Cold-pressed to retain its natural MUFA content and characteristic yellow color.",
    category: "Oils",
    benefits: [
      "High in monounsaturated fatty acids",
      "Milder taste, versatile in cooking",
      "Natural preservative properties",
      "Good source of vitamin A & E",
    ],
    weight: "500 ml",
  },
  {
    id: "sugarcane-juice",
    name: "Fresh Sugarcane Juice",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
    description:
      "100% natural sugarcane juice. No added sugar, no preservatives — pure refreshment.",
    longDescription:
      "Freshly pressed sugarcane juice, packed with natural minerals and enzymes. Contains calcium, potassium, magnesium, and iron that support liver health, immunity, and instant energy.",
    category: "Beverages",
    benefits: [
      "Instant natural energy boost",
      "Rich in iron & electrolytes",
      "Supports liver & kidney health",
      "Natural digestive aid",
    ],
    weight: "250 ml",
    tag: "Fresh",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
