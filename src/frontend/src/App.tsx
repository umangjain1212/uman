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

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
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
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: Shop,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetail,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const refundPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/refund-policy",
  component: RefundPolicy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: Terms,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FAQ,
});

const buranshRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/buransh",
  component: BuranshJuice,
});

const routeTree = rootRoute.addChildren([
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
