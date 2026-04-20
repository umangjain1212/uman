import { u as useActor, l as useAdmin, a as useQuery, j as jsxRuntimeExports, b as createActor } from "./index-C0X0mL0C.js";
import { A as AdminLayout, P as Package } from "./AdminLayout-Chh3bcSj.js";
import { B as Badge } from "./badge-qW4KVvne.js";
import { S as Skeleton } from "./skeleton-D4oTxPVb.js";
import { C as CircleAlert } from "./circle-alert-Ddq78YJo.js";
import { S as ShoppingBag } from "./shopping-bag-Ci0SBqfP.js";
import { I as IndianRupee, T as TrendingUp } from "./trending-up-CDg2vSBJ.js";
import { T as Truck } from "./truck-hnYEsmMs.js";
import "./chevron-right-DHquKCDI.js";
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
      "data-ocid": `analytics-stat-${label.toLowerCase().replace(/\s/g, "-")}`,
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
function AdminAnalytics() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAdmin();
  const enabled = !!actor && !actorFetching && isAuthenticated;
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError
  } = useQuery({
    queryKey: ["admin-analytics-page"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getAnalyticsSummary();
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
    queryKey: ["admin-analytics-top-products"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getTopProducts(BigInt(10));
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled
  });
  const statsLoading = analyticsLoading || actorFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Analytics", breadcrumb: ["Analytics"], children: [
    analyticsError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Could not load analytics data." })
    ] }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Top Products by Revenue" })
      ] }),
      topError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Could not load top products." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Revenue" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          topLoading && ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-6 rounded" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12 ml-auto" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) })
          ] }, k)),
          !topLoading && (topProducts ?? []).length === 0 && !topError && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 4,
              className: "admin-table-cell text-center py-12 text-muted-foreground",
              "data-ocid": "analytics-top-products-empty-state",
              children: "No sales data yet."
            }
          ) }),
          (topProducts ?? []).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "admin-table-row",
              "data-ocid": `analytics-top-product.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-[10px] px-1.5", children: [
                  "#",
                  i + 1
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-sm font-medium", children: p.productName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right text-sm text-muted-foreground", children: Number(p.orderCount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-cell text-right text-sm font-semibold text-primary", children: [
                  "₹",
                  Number(p.revenue).toLocaleString("en-IN")
                ] })
              ]
            },
            p.productId
          ))
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminAnalytics
};
