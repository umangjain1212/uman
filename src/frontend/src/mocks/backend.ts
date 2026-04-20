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

const mockCoupons = [
  {
    code: "FARM10",
    discountPercent: BigInt(10),
    isActive: true,
    usageCount: BigInt(0),
    expiryDate: undefined,
    maxUses: undefined,
  },
];

const mockSettings = {
  whatsappNumber: "+917500010488",
  contactEmail: "info@farm72.com",
  footerText: "© 2026 Farm72. All rights reserved.",
  announcementBannerText: "Free shipping on orders above ₹999!",
  whatsappOrderEnabled: true,
  maintenanceMode: false,
  stripeEnabled: true,
  showAnnouncementBanner: false,
};

const ok = <T,>(val: T): { __kind__: "ok"; ok: T } => ({ __kind__: "ok" as const, ok: val });
const err = (msg: string): { __kind__: "err"; err: string } => ({ __kind__: "err" as const, err: msg });

export const mockBackend: backendInterface = {
  // Object-storage internal methods (platform only — not called by app code)
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "mock", blob_hash: "mock" }),
  _immutableObjectStorageRefillCashier: async () => ({ success: true, topped_up_amount: BigInt(0) }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  checkIsAdmin: async () => ok(null),
  hasAdmin: async () => false,
  addCoupon: async (input) => ok({
    code: input.code,
    discountPercent: input.discountPercent,
    isActive: input.isActive,
    usageCount: BigInt(0),
    expiryDate: input.expiryDate,
    maxUses: input.maxUses,
  }),
  addFAQ: async (input) => ok({ ...input }),
  addHeroSlide: async (input) => ok({ ...input }),
  addProduct: async (input) => ok({ ...input }),
  applyCoupon: async (code) =>
    code === "FARM10"
      ? { __kind__: "Valid" as const, Valid: BigInt(10) }
      : { __kind__: "NotFound" as const, NotFound: null },
  assignCallerUserRole: async () => undefined,
  createCheckoutSession: async () => "cs_test_mock_session_id",
  createCoupon: async (input) => ok({
    code: input.code,
    discountPercent: input.discountPercent,
    isActive: input.isActive,
    usageCount: BigInt(0),
    expiryDate: input.expiryDate,
    maxUses: input.maxUses,
  }),
  deleteCoupon: async () => ok(true),
  deleteFAQ: async () => ok(true),
  deleteFaqItem: async () => ok(true),
  deleteHeroSlide: async () => ok(true),
  deleteProduct: async () => ok(true),
  getAnalyticsSummary: async () => ok({
    totalOrders: BigInt(0),
    pendingOrders: BigInt(0),
    totalRevenue: BigInt(0),
    deliveredOrders: BigInt(0),
  }),
  getAdminCoupons: async () => ok(mockCoupons),
  getAdminOrders: async () => ok([]),
  getAdminProducts: async () => ok(mockProducts),
  getAdminPrincipal: async () => ok(null),
  getCallerUserRole: async () => UserRole.guest,
  getCoupons: async () => ok(mockCoupons),
  getContactMessages: async () => ok([]),
  getDashboardStats: async () => ok({
    totalOrders: BigInt(0),
    pendingOrders: BigInt(0),
    totalRevenue: BigInt(0),
    deliveredOrders: BigInt(0),
  }),
  getFAQs: async () => [],
  getFaqItems: async () => [],
  getHeroSlides: async () => [],
  getImageUploadUrl: async (_fileName, _contentType) => ok({ uploadUrl: "https://mock-upload.example.com", publicUrl: "/assets/images/placeholder.svg" }),
  getOrder: async () => ok(null),
  getOrders: async () => ok([]),
  getProduct: async (id: string) => mockProducts.find((p) => p.id === id) ?? null,
  getProducts: async () => mockProducts,
  getRecentOrders: async (_limit: bigint) => ok([]),
  getSiteSettings: async () => mockSettings,
  getStripeSessionStatus: async () => ({
    __kind__: "failed" as const,
    failed: { error: "mock" },
  }),
  getTopProducts: async (_limit: bigint) => ok([]),
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  setAdminPrincipal: async () => ok("mock-principal"),
  setAdminPrincipalExplicit: async () => ok(null),
  setStripeConfiguration: async () => undefined,
  storeOrder: async (input) => ok({
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
  submitContact: async (name: string, email: string, message: string) => ok({
    name,
    email,
    message,
    timestamp: BigInt(Date.now()),
  }),
  toggleCoupon: async (code: string) => ok({
    code,
    discountPercent: BigInt(10),
    isActive: true,
    usageCount: BigInt(0),
    expiryDate: undefined,
    maxUses: undefined,
  }),
  toggleProductVisibility: async (id: string) => {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return err("Product not found");
    return ok({ ...product, isVisible: !product.isVisible });
  },
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: [],
  }),
  updateCoupon: async (_code, input) => ok({
    code: input.code,
    discountPercent: input.discountPercent,
    isActive: input.isActive,
    usageCount: BigInt(0),
    expiryDate: input.expiryDate,
    maxUses: input.maxUses,
  }),
  updateFAQ: async (_id: string, input) => ok({ ...input }),
  updateHeroSlide: async (_id: string, input) => ok({ ...input }),
  updateOrderStatus: async (id, status) => ok({
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
  updateProduct: async (_id: string, input) => ok({ ...input }),
  updateSiteSettings: async (settings) => ok(settings),
  updateSiteSettingsPartial: async (input) => ok({
    whatsappNumber: input.whatsappNumber ?? "+917500010488",
    contactEmail: input.contactEmail ?? "info@farm72.com",
    footerText: input.footerText ?? "© 2026 Farm72. All rights reserved.",
    announcementBannerText: input.announcementBannerText ?? "Free shipping on orders above ₹999!",
    whatsappOrderEnabled: input.whatsappOrderEnabled ?? true,
    maintenanceMode: input.maintenanceMode ?? false,
    stripeEnabled: input.stripeEnabled ?? true,
    showAnnouncementBanner: input.showAnnouncementBanner ?? false,
  }),
  upsertFaqItem: async (input) => ok({ ...input }),
  upsertHeroSlide: async (input) => ok({ ...input }),
  validateCoupon: async (code) =>
    code === "FARM10"
      ? { __kind__: "Valid" as const, Valid: BigInt(10) }
      : { __kind__: "NotFound" as const, NotFound: null },
};
