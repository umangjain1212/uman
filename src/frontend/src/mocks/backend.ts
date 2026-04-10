import type { backendInterface } from "../backend";
import { UserRole } from "../backend";

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  assignCallerUserRole: async () => undefined,
  createCheckoutSession: async () => "cs_test_mock_session_id",
  getCallerUserRole: async () => UserRole.guest,
  getProduct: async (id: string) => {
    const products = [
      {
        id: "coconut-oil",
        name: "Coconut Oil",
        description:
          "Pure cold-pressed coconut oil extracted using traditional Kacchi Ghani process. Rich in medium-chain fatty acids for optimal health.",
        imageUrl:
          "https://images.unsplash.com/photo-1621019736-dd5bfbdf1ca2?w=600&auto=format&fit=crop",
        category: "oil",
        benefits: ["Heart health", "Natural moisturizer", "Antimicrobial properties"],
        price: BigInt(45000),
      },
      {
        id: "sesame-oil",
        name: "Sesame Oil",
        description:
          "Cold-pressed sesame oil with a rich, nutty flavour. A powerhouse of antioxidants and anti-inflammatory compounds.",
        imageUrl:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop",
        category: "oil",
        benefits: ["Rich in antioxidants", "Anti-inflammatory", "Supports bone health"],
        price: BigInt(38000),
      },
      {
        id: "black-mustard-oil",
        name: "Black Mustard Oil",
        description:
          "Traditional cold-pressed black mustard oil from premium quality seeds. A staple in Indian cooking with powerful therapeutic benefits.",
        imageUrl:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
        category: "oil",
        benefits: [
          "Antibacterial properties",
          "Supports respiratory health",
          "Promotes hair growth",
        ],
        price: BigInt(29000),
      },
      {
        id: "yellow-mustard-oil",
        name: "Yellow Mustard Oil",
        description:
          "Bright and pungent yellow mustard oil cold-pressed to retain all natural goodness. Perfect for cooking and therapeutic use.",
        imageUrl:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop",
        category: "oil",
        benefits: ["Aids digestive health", "Nourishes skin", "Improves circulation"],
        price: BigInt(27000),
      },
      {
        id: "sugarcane-juice",
        name: "Sugarcane Juice",
        description:
          "Freshly pressed pure sugarcane juice with no additives or preservatives. Nature's energy drink packed with essential nutrients.",
        imageUrl:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop",
        category: "juice",
        benefits: ["Instant energy boost", "Boosts immunity", "Supports liver health"],
        price: BigInt(6000),
      },
    ];
    return products.find((p) => p.id === id) ?? null;
  },
  getProducts: async () => [
    {
      id: "coconut-oil",
      name: "Coconut Oil",
      description:
        "Pure cold-pressed coconut oil extracted using traditional Kacchi Ghani process. Rich in medium-chain fatty acids for optimal health.",
      imageUrl:
        "https://images.unsplash.com/photo-1621019736-dd5bfbdf1ca2?w=600&auto=format&fit=crop",
      category: "oil",
      benefits: ["Heart health", "Natural moisturizer", "Antimicrobial properties"],
      price: BigInt(45000),
    },
    {
      id: "sesame-oil",
      name: "Sesame Oil",
      description:
        "Cold-pressed sesame oil with a rich, nutty flavour. A powerhouse of antioxidants and anti-inflammatory compounds.",
      imageUrl:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop",
      category: "oil",
      benefits: ["Rich in antioxidants", "Anti-inflammatory", "Supports bone health"],
      price: BigInt(38000),
    },
    {
      id: "black-mustard-oil",
      name: "Black Mustard Oil",
      description:
        "Traditional cold-pressed black mustard oil from premium quality seeds. A staple in Indian cooking with powerful therapeutic benefits.",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
      category: "oil",
      benefits: [
        "Antibacterial properties",
        "Supports respiratory health",
        "Promotes hair growth",
      ],
      price: BigInt(29000),
    },
    {
      id: "yellow-mustard-oil",
      name: "Yellow Mustard Oil",
      description:
        "Bright and pungent yellow mustard oil cold-pressed to retain all natural goodness. Perfect for cooking and therapeutic use.",
      imageUrl:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop",
      category: "oil",
      benefits: ["Aids digestive health", "Nourishes skin", "Improves circulation"],
      price: BigInt(27000),
    },
    {
      id: "sugarcane-juice",
      name: "Sugarcane Juice",
      description:
        "Freshly pressed pure sugarcane juice with no additives or preservatives. Nature's energy drink packed with essential nutrients.",
      imageUrl:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop",
      category: "juice",
      benefits: ["Instant energy boost", "Boosts immunity", "Supports liver health"],
      price: BigInt(6000),
    },
  ],
  getStripeSessionStatus: async () => ({
    __kind__: "failed" as const,
    failed: { error: "mock" },
  }),
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  setStripeConfiguration: async () => undefined,
  submitContact: async () => true,
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: [],
  }),
};
