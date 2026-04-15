import { Layout } from "@/components/Layout";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// ── Public pages ─────────────────────────────────────────────────────────────
const Home = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.Home })),
);
const Shop = lazy(() =>
  import("@/pages/Shop").then((m) => ({ default: m.Shop })),
);
const ProductDetail = lazy(() =>
  import("@/pages/ProductDetail").then((m) => ({ default: m.ProductDetail })),
);
const Cart = lazy(() =>
  import("@/pages/Cart").then((m) => ({ default: m.Cart })),
);
const Checkout = lazy(() =>
  import("@/pages/Checkout").then((m) => ({ default: m.Checkout })),
);
const About = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.About })),
);
const Contact = lazy(() =>
  import("@/pages/Contact").then((m) => ({ default: m.Contact })),
);
const RefundPolicy = lazy(() =>
  import("@/pages/RefundPolicy").then((m) => ({ default: m.RefundPolicy })),
);
const Terms = lazy(() =>
  import("@/pages/Terms").then((m) => ({ default: m.Terms })),
);
const FAQ = lazy(() => import("@/pages/FAQ").then((m) => ({ default: m.FAQ })));
const BuranshJuice = lazy(() =>
  import("@/pages/BuranshJuice").then((m) => ({ default: m.BuranshJuice })),
);

// ── Admin pages ───────────────────────────────────────────────────────────────
const AdminLogin = lazy(() =>
  import("@/pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })),
);
const AdminDashboard = lazy(() =>
  import("@/pages/admin/AdminDashboard").then((m) => ({
    default: m.AdminDashboard,
  })),
);
const AdminProducts = lazy(() =>
  import("@/pages/admin/AdminProducts").then((m) => ({
    default: m.AdminProducts,
  })),
);
const AdminProductForm = lazy(() =>
  import("@/pages/admin/AdminProductForm").then((m) => ({
    default: m.AdminProductForm,
  })),
);
const AdminOrders = lazy(() =>
  import("@/pages/admin/AdminOrders").then((m) => ({ default: m.AdminOrders })),
);
const AdminCoupons = lazy(() =>
  import("@/pages/admin/AdminCoupons").then((m) => ({
    default: m.AdminCoupons,
  })),
);
const AdminContent = lazy(() =>
  import("@/pages/admin/AdminContent").then((m) => ({
    default: m.AdminContent,
  })),
);
const AdminSettings = lazy(() =>
  import("@/pages/admin/AdminSettings").then((m) => ({
    default: m.AdminSettings,
  })),
);

// ── Loaders ───────────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AdminLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── Route tree ────────────────────────────────────────────────────────────────
// Public root — wrapped in Layout (Navbar + Footer)
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Suspense fallback={<AdminLoader />}>
        <Outlet />
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border border-border shadow-card font-body",
            title: "text-foreground font-semibold",
            description: "text-muted-foreground",
          },
        }}
      />
    </>
  ),
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public-layout",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: Home,
});
const shopRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/shop",
  component: Shop,
});
const productRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/product/$id",
  component: ProductDetail,
});
const cartRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/cart",
  component: Cart,
});
const checkoutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/checkout",
  component: Checkout,
});
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: About,
});
const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: Contact,
});
const refundPolicyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/refund-policy",
  component: RefundPolicy,
});
const termsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/terms",
  component: Terms,
});
const faqRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/faq",
  component: FAQ,
});
const buranshRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/buransh",
  component: BuranshJuice,
});

// Admin routes (no Layout wrapper)
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboard,
});
const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: AdminProducts,
});
const adminProductNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/new",
  component: AdminProductForm,
});
const adminProductEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/$id/edit",
  component: AdminProductForm,
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: AdminOrders,
});
const adminCouponsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/coupons",
  component: AdminCoupons,
});
const adminContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/content",
  component: AdminContent,
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  component: AdminSettings,
});

// Redirect /admin → /admin/dashboard
const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    shopRoute,
    productRoute,
    cartRoute,
    checkoutRoute,
    aboutRoute,
    contactRoute,
    refundPolicyRoute,
    termsRoute,
    faqRoute,
    buranshRoute,
  ]),
  adminLoginRoute,
  adminIndexRoute,
  adminDashboardRoute,
  adminProductsRoute,
  adminProductNewRoute,
  adminProductEditRoute,
  adminOrdersRoute,
  adminCouponsRoute,
  adminContentRoute,
  adminSettingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
