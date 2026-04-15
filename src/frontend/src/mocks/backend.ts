import type { backendInterface } from "../backend";
import { OrderStatus, PaymentMethod, UserRole } from "../backend";

const mockProducts = [
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
    displayOrder: BigInt(0),
    variants: [],
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    isVisible: true,
    longDescription: "",
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
    displayOrder: BigInt(1),
    variants: [],
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    isVisible: true,
    longDescription: "",
  },
  {
    id: "black-mustard-oil",
    name: "Black Mustard Oil",
    description:
      "Traditional cold-pressed black mustard oil from premium quality seeds. A staple in Indian cooking with powerful therapeutic benefits.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    category: "oil",
    benefits: ["Antibacterial properties", "Supports respiratory health", "Promotes hair growth"],
    price: BigInt(29000),
    displayOrder: BigInt(2),
    variants: [],
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    isVisible: true,
    longDescription: "",
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
    displayOrder: BigInt(3),
    variants: [],
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    isVisible: true,
    longDescription: "",
  },
  {
    id: "buransh-juice",
    name: "Buransh Juice",
    description:
      "Freshly pressed pure Himalayan Buransh (Rhododendron) juice with no additives or preservatives. Cools, heals, and nourishes naturally.",
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop",
    category: "juice",
    benefits: ["Cools body in summer", "Supports heart health", "Rich in antioxidants"],
    price: BigInt(24900),
    displayOrder: BigInt(4),
    variants: [],
    shortDescription: "Freshly extracted natural juice, preservative-free and chemical-free.",
    isVisible: true,
    longDescription: "",
  },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  addCoupon: async (input) => ({
    code: input.code,
    discountPercent: input.discountPercent,
    isActive: input.isActive,
    usageCount: BigInt(0),
    expiryDate: input.expiryDate,
    maxUses: input.maxUses,
  }),
  addFAQ: async (input) => ({ ...input }),
  addHeroSlide: async (input) => ({ ...input }),
  addProduct: async (input) => ({ ...input }),
  applyCoupon: async (code) =>
    code === "FARM10"
      ? { __kind__: "Valid" as const, Valid: BigInt(10) }
      : { __kind__: "NotFound" as const, NotFound: null },
  assignCallerUserRole: async () => undefined,
  createCheckoutSession: async () => "cs_test_mock_session_id",
  createCoupon: async (input) => ({
    code: input.code,
    discountPercent: input.discountPercent,
    isActive: input.isActive,
    usageCount: BigInt(0),
    expiryDate: input.expiryDate,
    maxUses: input.maxUses,
  }),
  deleteCoupon: async () => true,
  deleteFAQ: async () => true,
  deleteFaqItem: async () => true,
  deleteHeroSlide: async () => true,
  deleteProduct: async () => true,
  getAnalyticsSummary: async () => ({
    totalOrders: BigInt(0),
    pendingOrders: BigInt(0),
    totalRevenue: BigInt(0),
    deliveredOrders: BigInt(0),
  }),
  getAdminCoupons: async () => [
    {
      code: "FARM10",
      discountPercent: BigInt(10),
      isActive: true,
      usageCount: BigInt(0),
      expiryDate: undefined,
      maxUses: undefined,
    },
  ],
  getAdminOrders: async () => [],
  getAdminProducts: async () => mockProducts,
  getCallerUserRole: async () => UserRole.guest,
  getCoupons: async () => [
    {
      code: "FARM10",
      discountPercent: BigInt(10),
      isActive: true,
      usageCount: BigInt(0),
      expiryDate: undefined,
      maxUses: undefined,
    },
  ],
  getDashboardStats: async () => ({
    totalOrders: BigInt(0),
    pendingOrders: BigInt(0),
    totalRevenue: BigInt(0),
    deliveredOrders: BigInt(0),
  }),
  getFAQs: async () => [],
  getFaqItems: async () => [],
  getHeroSlides: async () => [],
  getOrder: async () => null,
  getOrders: async () => [],
  getProduct: async (id: string) => mockProducts.find((p) => p.id === id) ?? null,
  getProducts: async () => mockProducts,
  getRecentOrders: async (_limit: bigint) => [],
  getSiteSettings: async () => ({
    whatsappNumber: "+917500010488",
    contactEmail: "info@farm72.com",
    footerText: "© 2026 Farm72. All rights reserved.",
    announcementBannerText: "Free shipping on orders above ₹999!",
    whatsappOrderEnabled: true,
    maintenanceMode: false,
    stripeEnabled: true,
    showAnnouncementBanner: false,
  }),
  getStripeSessionStatus: async () => ({
    __kind__: "failed" as const,
    failed: { error: "mock" },
  }),
  getTopProducts: async (_limit: bigint) => [],
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  setStripeConfiguration: async () => undefined,
  storeOrder: async (input) => ({
    id: "mock-order-1",
    customerName: input.customerName,
    status: OrderStatus.Pending,
    paymentMethod: input.paymentMethod ?? PaymentMethod.WhatsApp,
    createdAt: BigInt(Date.now()),
    email: input.email,
    totalAmount: input.totalAmount,
    address: input.address,
    phone: input.phone,
    items: input.items,
  }),
  submitContact: async () => true,
  toggleCoupon: async (code: string) => {
    const coupon = {
      code,
      discountPercent: BigInt(10),
      isActive: true,
      usageCount: BigInt(0),
      expiryDate: undefined,
      maxUses: undefined,
    };
    return coupon;
  },
  toggleProductVisibility: async (id: string) => {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return null;
    return { ...product, isVisible: !product.isVisible };
  },
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: [],
  }),
  updateCoupon: async (_code, input) => ({
    code: input.code,
    discountPercent: input.discountPercent,
    isActive: input.isActive,
    usageCount: BigInt(0),
    expiryDate: input.expiryDate,
    maxUses: input.maxUses,
  }),
  updateFAQ: async (_id: string, input) => ({ ...input }),
  updateHeroSlide: async (_id: string, input) => ({ ...input }),
  updateOrderStatus: async (id: string, status) => ({
    id,
    customerName: "Mock Customer",
    status,
    paymentMethod: PaymentMethod.WhatsApp,
    createdAt: BigInt(Date.now()),
    email: "mock@example.com",
    totalAmount: BigInt(0),
    address: "Mock Address",
    phone: "+91 0000000000",
    items: [],
  }),
  updateProduct: async (_id: string, input) => ({ ...input }),
  updateSiteSettings: async (settings) => settings,
  updateSiteSettingsPartial: async (input) => ({
    whatsappNumber: input.whatsappNumber ?? "+917500010488",
    contactEmail: input.contactEmail ?? "info@farm72.com",
    footerText: input.footerText ?? "© 2026 Farm72. All rights reserved.",
    announcementBannerText: input.announcementBannerText ?? "Free shipping on orders above ₹999!",
    whatsappOrderEnabled: input.whatsappOrderEnabled ?? true,
    maintenanceMode: input.maintenanceMode ?? false,
    stripeEnabled: input.stripeEnabled ?? true,
    showAnnouncementBanner: input.showAnnouncementBanner ?? false,
  }),
  adminLogin: async (username, password) =>
    username === "admin" && password === "Farm72@Admin"
      ? { __kind__: "ok" as const, ok: "mock-session-token" }
      : { __kind__: "err" as const, err: "Invalid username or password" },
  adminLogout: async () => undefined,
  changeAdminPassword: async (_token, currentPassword, _newPassword) =>
    currentPassword === "Farm72@Admin"
      ? { __kind__: "ok" as const, ok: null }
      : { __kind__: "err" as const, err: "Current password is incorrect" },
  validateAdminSession: async (token) => token === "mock-session-token",
  upsertFaqItem: async (input) => ({ ...input }),
  upsertHeroSlide: async (input) => ({ ...input }),
  validateCoupon: async (code) =>
    code === "FARM10"
      ? { __kind__: "Valid" as const, Valid: BigInt(10) }
      : { __kind__: "NotFound" as const, NotFound: null },
};
