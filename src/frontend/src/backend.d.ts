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
    highlight: string;
    subtitle: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
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
    highlight: string;
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
    addCoupon(input: CouponInput): Promise<{
        __kind__: "ok";
        ok: Coupon;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addFAQ(input: FaqItemInput): Promise<{
        __kind__: "ok";
        ok: FaqItem;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addHeroSlide(input: HeroSlideInput): Promise<{
        __kind__: "ok";
        ok: HeroSlide;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addProduct(input: ProductInput): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
    applyCoupon(code: string): Promise<CouponValidation>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkIsAdmin(): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCoupon(input: CouponInput): Promise<{
        __kind__: "ok";
        ok: Coupon;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteCoupon(code: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteFAQ(id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteFaqItem(id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteHeroSlide(id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProduct(id: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAdminCoupons(): Promise<{
        __kind__: "ok";
        ok: Array<Coupon>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAdminOrders(): Promise<{
        __kind__: "ok";
        ok: Array<Order>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAdminPrincipal(): Promise<{
        __kind__: "ok";
        ok: string | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAdminProducts(): Promise<{
        __kind__: "ok";
        ok: Array<Product>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAnalyticsSummary(): Promise<{
        __kind__: "ok";
        ok: AnalyticsSummary;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<{
        __kind__: "ok";
        ok: Array<ContactMessage>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCoupons(): Promise<{
        __kind__: "ok";
        ok: Array<Coupon>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDashboardStats(): Promise<{
        __kind__: "ok";
        ok: AnalyticsSummary;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getFAQs(): Promise<Array<FaqItem>>;
    getFaqItems(): Promise<Array<FaqItem>>;
    getHeroSlides(): Promise<Array<HeroSlide>>;
    getImageUploadUrl(fileName: string, _contentType: string): Promise<{
        __kind__: "ok";
        ok: {
            publicUrl: string;
            uploadUrl: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOrder(id: string): Promise<{
        __kind__: "ok";
        ok: Order | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOrders(): Promise<{
        __kind__: "ok";
        ok: Array<Order>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getProduct(id: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getRecentOrders(limit: bigint): Promise<{
        __kind__: "ok";
        ok: Array<Order>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getSiteSettings(): Promise<SiteSettings>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTopProducts(limit: bigint): Promise<{
        __kind__: "ok";
        ok: Array<TopProduct>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    hasAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    setAdminPrincipal(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAdminPrincipalExplicit(newAdmin: Principal): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    storeOrder(input: OrderInput): Promise<{
        __kind__: "ok";
        ok: Order;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitContact(name: string, email: string, message: string): Promise<{
        __kind__: "ok";
        ok: ContactMessage;
    } | {
        __kind__: "err";
        err: string;
    }>;
    toggleCoupon(code: string): Promise<{
        __kind__: "ok";
        ok: Coupon;
    } | {
        __kind__: "err";
        err: string;
    }>;
    toggleProductVisibility(id: string): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCoupon(code: string, input: CouponInput): Promise<{
        __kind__: "ok";
        ok: Coupon;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateFAQ(id: string, input: FaqItemInput): Promise<{
        __kind__: "ok";
        ok: FaqItem;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateHeroSlide(id: string, input: HeroSlideInput): Promise<{
        __kind__: "ok";
        ok: HeroSlide;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<{
        __kind__: "ok";
        ok: Order;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProduct(id: string, input: ProductInput): Promise<{
        __kind__: "ok";
        ok: Product;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateSiteSettings(input: SiteSettings): Promise<{
        __kind__: "ok";
        ok: SiteSettings;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateSiteSettingsPartial(input: SiteSettingsInput): Promise<{
        __kind__: "ok";
        ok: SiteSettings;
    } | {
        __kind__: "err";
        err: string;
    }>;
    upsertFaqItem(input: FaqItemInput): Promise<{
        __kind__: "ok";
        ok: FaqItem;
    } | {
        __kind__: "err";
        err: string;
    }>;
    upsertHeroSlide(input: HeroSlideInput): Promise<{
        __kind__: "ok";
        ok: HeroSlide;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateCoupon(code: string): Promise<CouponValidation>;
}
