import { u as useActor, a as useQuery, j as jsxRuntimeExports, L as Link, b as createActor } from "./index-BAxA7QJV.js";
import { A as AdminLayout, P as Package } from "./AdminLayout-aSSbiICY.js";
import { B as Badge } from "./badge-7s8mIdJR.js";
import { S as Skeleton } from "./skeleton-C3yHk2pE.js";
import { S as ShoppingBag } from "./shopping-bag-BTPJYgYg.js";
import { I as IndianRupee, T as TrendingUp } from "./trending-up-kD3wguyp.js";
import { T as Truck } from "./truck-CMKyDxIj.js";
import { A as ArrowRight } from "./arrow-right-D1jnDhbe.js";
import { C as CircleAlert } from "./circle-alert-Bh9wKerw.js";
import "./chevron-right-C0Qp-EL3.js";
const STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20"
};
function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  color,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "admin-stat-card",
      "data-ocid": `admin-stat-${label.toLowerCase().replace(/\s/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "admin-stat-label", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg flex items-center justify-center ${color ?? "bg-primary/10"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" })
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 mt-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "admin-stat-value", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
      ]
    }
  );
}
function ErrorBanner({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
  ] });
}
function AdminDashboard() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError
  } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getAnalyticsSummary();
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled
  });
  const {
    data: recentOrders,
    isLoading: ordersLoading,
    error: ordersError
  } = useQuery({
    queryKey: ["admin-recent-orders"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getRecentOrders(BigInt(10));
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled
  });
  const {
    data: topProducts,
    isLoading: topLoading,
    error: topError
  } = useQuery({
    queryKey: ["admin-top-products"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getTopProducts(BigInt(5));
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled
  });
  const statsLoading = analyticsLoading || actorFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Dashboard", breadcrumb: ["Dashboard"], children: [
    analyticsError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: "Could not load analytics. Showing partial data." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Orders",
          value: analytics ? String(analytics.totalOrders) : "—",
          icon: ShoppingBag,
          sub: "All time",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Revenue",
          value: analytics ? `₹${Number(analytics.totalRevenue).toLocaleString("en-IN")}` : "—",
          icon: IndianRupee,
          sub: "All time",
          color: "bg-emerald-50",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending Orders",
          value: analytics ? String(analytics.pendingOrders) : "—",
          icon: Package,
          sub: "Need attention",
          color: "bg-amber-50",
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Delivered Orders",
          value: analytics ? String(analytics.deliveredOrders) : "—",
          icon: Truck,
          sub: "Completed",
          color: "bg-blue-50",
          loading: statsLoading
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Recent Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin/orders",
              className: "text-xs text-primary hover:underline flex items-center gap-1",
              "data-ocid": "admin-dashboard-all-orders-link",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        ordersError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: "Could not load recent orders." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }) })
            ] }, k)) }) : (recentOrders ?? []).map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "admin-table-row",
                "data-ocid": `admin-order-row.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell font-mono text-xs text-muted-foreground", children: order.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-sm font-medium", children: order.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-cell text-right text-sm font-semibold text-primary", children: [
                    "₹",
                    Number(order.totalAmount).toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[order.status] ?? "bg-muted text-muted-foreground border-border"}`,
                      children: order.status
                    }
                  ) })
                ]
              },
              order.id
            )),
            !ordersLoading && (recentOrders ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 4,
                className: "admin-table-cell text-center py-8 text-muted-foreground text-sm",
                "data-ocid": "admin-dashboard-orders-empty-state",
                children: "No orders yet."
              }
            ) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Top Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        topError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: "Could not load top products." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          topLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ["t1", "t2", "t3", "t4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-6 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
            ] })
          ] }, k)) }) : (topProducts ?? []).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 px-6 py-4",
              "data-ocid": `admin-top-product.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: p.productName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    Number(p.orderCount),
                    " orders · ₹",
                    Number(p.revenue).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-[10px] px-2", children: [
                  "#",
                  i + 1
                ] })
              ]
            },
            p.productId
          )),
          !topLoading && (topProducts ?? []).length === 0 && !topError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-6 py-8 text-center text-sm text-muted-foreground",
              "data-ocid": "admin-top-products-empty-state",
              children: "No sales data yet."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-3 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/admin/products",
            className: "text-xs text-primary hover:underline flex items-center gap-1",
            "data-ocid": "admin-dashboard-all-products-link",
            children: [
              "Manage products ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard
};
