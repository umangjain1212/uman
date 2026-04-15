import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AnalyticsSummary {
    totalOrders: bigint;
    pendingOrders: bigint;
    totalRevenue: bigint;
    deliveredOrders: bigint;
}
export interface OrderItem {
    variantLabel: string;
    productId: string;
    productName: string;
    variantId: string;
    quantity: bigint;
    unitPrice: bigint;
}
export interface OrderInput {
    customerName: string;
    paymentMethod: PaymentMethod;
    email: string;
    totalAmount: bigint;
    address: string;
    phone: string;
    items: Array<OrderItem>;
}
export interface TopProduct {
    revenue: bigint;
    productId: string;
    productName: string;
    orderCount: bigint;
}
export interface HeroSlideInput {
    id: string;
    title: string;
    displayOrder: bigint;
    imageUrl: string;
    isVisible: boolean;
    subtitle: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type CouponValidation = {
    __kind__: "Exhausted";
    Exhausted: null;
} | {
    __kind__: "Inactive";
    Inactive: null;
} | {
    __kind__: "NotFound";
    NotFound: null;
} | {
    __kind__: "Valid";
    Valid: bigint;
} | {
    __kind__: "Expired";
    Expired: null;
};
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ProductInput {
    id: string;
    displayOrder: bigint;
    name: string;
    description: string;
    variants: Array<ProductVariant>;
    imageUrl: string;
    shortDescription: string;
    isVisible: boolean;
    category: string;
    benefits: Array<string>;
    price: bigint;
    longDescription: string;
}
export interface Coupon {
    expiryDate?: Timestamp;
    code: string;
    usageCount: bigint;
    discountPercent: bigint;
    isActive: boolean;
    maxUses?: bigint;
}
export interface FaqItemInput {
    id: string;
    question: string;
    displayOrder: bigint;
    answer: string;
    isVisible: boolean;
}
export interface HeroSlide {
    id: string;
    title: string;
    displayOrder: bigint;
    imageUrl: string;
    isVisible: boolean;
    subtitle: string;
}
export interface ProductVariant {
    variantLabel: string;
    stock: bigint;
    variantId: string;
    price: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Order {
    id: string;
    customerName: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    createdAt: Timestamp;
    email: string;
    totalAmount: bigint;
    address: string;
    phone: string;
    items: Array<OrderItem>;
}
export interface FaqItem {
    id: string;
    question: string;
    displayOrder: bigint;
    answer: string;
    isVisible: boolean;
}
export interface SiteSettings {
    announcementBannerText: string;
    whatsappOrderEnabled: boolean;
    maintenanceMode: boolean;
    whatsappNumber: string;
    stripeEnabled: boolean;
    contactEmail: string;
    footerText: string;
    showAnnouncementBanner: boolean;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CouponInput {
    expiryDate?: Timestamp;
    code: string;
    discountPercent: bigint;
    isActive: boolean;
    maxUses?: bigint;
}
export interface SiteSettingsInput {
    announcementBannerText?: string;
    whatsappOrderEnabled?: boolean;
    maintenanceMode?: boolean;
    whatsappNumber?: string;
    stripeEnabled?: boolean;
    contactEmail?: string;
    footerText?: string;
    showAnnouncementBanner?: boolean;
}
export interface Product {
    id: string;
    displayOrder: bigint;
    name: string;
    description: string;
    variants: Array<ProductVariant>;
    imageUrl: string;
    shortDescription: string;
    isVisible: boolean;
    category: string;
    benefits: Array<string>;
    price: bigint;
    longDescription: string;
}
export enum OrderStatus {
    Delivered = "Delivered",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum PaymentMethod {
    WhatsApp = "WhatsApp",
    Stripe = "Stripe"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCoupon(input: CouponInput): Promise<Coupon>;
    addFAQ(input: FaqItemInput): Promise<FaqItem>;
    addHeroSlide(input: HeroSlideInput): Promise<HeroSlide>;
    addProduct(input: ProductInput): Promise<Product>;
    adminLogin(username: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogout(token: string): Promise<void>;
    applyCoupon(code: string): Promise<CouponValidation>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeAdminPassword(token: string, currentPassword: string, newPassword: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCoupon(input: CouponInput): Promise<Coupon>;
    deleteCoupon(code: string): Promise<boolean>;
    deleteFAQ(id: string): Promise<boolean>;
    deleteFaqItem(id: string): Promise<boolean>;
    deleteHeroSlide(id: string): Promise<boolean>;
    deleteProduct(id: string): Promise<boolean>;
    getAdminCoupons(): Promise<Array<Coupon>>;
    getAdminOrders(): Promise<Array<Order>>;
    getAdminProducts(): Promise<Array<Product>>;
    getAnalyticsSummary(): Promise<AnalyticsSummary>;
    getCallerUserRole(): Promise<UserRole>;
    getCoupons(): Promise<Array<Coupon>>;
    getDashboardStats(): Promise<AnalyticsSummary>;
    getFAQs(): Promise<Array<FaqItem>>;
    getFaqItems(): Promise<Array<FaqItem>>;
    getHeroSlides(): Promise<Array<HeroSlide>>;
    getOrder(id: string): Promise<Order | null>;
    getOrders(): Promise<Array<Order>>;
    getProduct(id: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getRecentOrders(limit: bigint): Promise<Array<Order>>;
    getSiteSettings(): Promise<SiteSettings>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTopProducts(limit: bigint): Promise<Array<TopProduct>>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    storeOrder(input: OrderInput): Promise<Order>;
    submitContact(msg: ContactMessage): Promise<boolean>;
    toggleCoupon(code: string): Promise<Coupon | null>;
    toggleProductVisibility(id: string): Promise<Product | null>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCoupon(code: string, input: CouponInput): Promise<Coupon | null>;
    updateFAQ(id: string, input: FaqItemInput): Promise<FaqItem | null>;
    updateHeroSlide(id: string, input: HeroSlideInput): Promise<HeroSlide | null>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: string, input: ProductInput): Promise<Product | null>;
    updateSiteSettings(input: SiteSettings): Promise<SiteSettings>;
    updateSiteSettingsPartial(input: SiteSettingsInput): Promise<SiteSettings>;
    upsertFaqItem(input: FaqItemInput): Promise<FaqItem>;
    upsertHeroSlide(input: HeroSlideInput): Promise<HeroSlide>;
    validateAdminSession(token: string): Promise<boolean>;
    validateCoupon(code: string): Promise<CouponValidation>;
}
