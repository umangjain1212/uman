import { Layout } from "@/components/Layout";
import { useAdmin } from "@/hooks/useAdmin";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";
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
const AdminAnalytics = lazy(() =>
  import("@/pages/admin/AdminAnalytics").then((m) => ({
    default: m.AdminAnalytics,
  })),
);

// ── Auth guard ────────────────────────────────────────────────────────────────
// Wraps all /admin/* routes except /admin/login.
// Rules:
//   1. While isLoading=true  → show spinner, render NOTHING else
//   2. When !isLoading && !isAuthenticated → redirect to /admin/login
//   3. Only render children when isAuthenticated=true AND isLoading=false
function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdmin();
  const navigate = useNavigate();

  // Redirect synchronously (in effect) the moment auth state is resolved
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Always show spinner until auth is fully resolved
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Auth resolved but not authenticated — show nothing while redirect fires
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Authenticated — render protected content
  return <>{children}</>;
}

// Admin root redirect — spinner while auth is checked,
// then routes to /admin/dashboard (authenticated) or /admin/login (not).
function AdminIndexRedirect() {
  const { isAuthenticated, isLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard", replace: true });
    } else {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

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

// Admin login — no auth guard
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});

// Protected admin routes — each wrapped in AdminAuthGuard
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <AdminAuthGuard>
      <AdminDashboard />
    </AdminAuthGuard>
  ),
});
const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <AdminAuthGuard>
      <AdminProducts />
    </AdminAuthGuard>
  ),
});
const adminProductNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/new",
  component: () => (
    <AdminAuthGuard>
      <AdminProductForm />
    </AdminAuthGuard>
  ),
});
const adminProductEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/$id/edit",
  component: () => (
    <AdminAuthGuard>
      <AdminProductForm />
    </AdminAuthGuard>
  ),
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <AdminAuthGuard>
      <AdminOrders />
    </AdminAuthGuard>
  ),
});
const adminCouponsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/coupons",
  component: () => (
    <AdminAuthGuard>
      <AdminCoupons />
    </AdminAuthGuard>
  ),
});
const adminContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/content",
  component: () => (
    <AdminAuthGuard>
      <AdminContent />
    </AdminAuthGuard>
  ),
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  component: () => (
    <AdminAuthGuard>
      <AdminSettings />
    </AdminAuthGuard>
  ),
});
const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/analytics",
  component: () => (
    <AdminAuthGuard>
      <AdminAnalytics />
    </AdminAuthGuard>
  ),
});

// /admin → redirect based on auth state
const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminIndexRedirect,
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
  adminAnalyticsRoute,
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
