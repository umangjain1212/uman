import { c as createLucideIcon, r as reactExports, u as useActor, a as useQuery, j as jsxRuntimeExports, L as Link, m as motion, X, B as Button, b as createActor } from "./index-C0X0mL0C.js";
import { P as ProductCard, m as mapBackendProduct } from "./productMapper-B6UY0di6.js";
import { S as SEO } from "./SEO-B8ufLgZH.js";
import { I as Input } from "./input-BfFViMeu.js";
import { S as Skeleton } from "./skeleton-D4oTxPVb.js";
import { C as ChevronRight } from "./chevron-right-DHquKCDI.js";
import { S as Search } from "./search-CtWC09XC.js";
import "./badge-qW4KVvne.js";
import "./leaf-B5a9PUHh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode);
const CATEGORIES = ["All", "Oils", "Juice"];
const CATEGORY_MAP = {
  All: null,
  Oils: "Oils",
  Juice: "Beverages"
};
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];
function ProductGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: SKELETON_KEYS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl overflow-hidden shadow-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28 rounded-lg" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-lg" })
        ] })
      ]
    },
    id
  )) });
}
function Shop() {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products-shop"],
    queryFn: async () => {
      if (!actor) return [];
      console.log("[Shop] fetching products...");
      const raw = await actor.getProducts();
      console.log("[Shop] loaded", raw.length, "products from backend");
      return raw.filter((p) => p.isVisible).sort(
        (a, b) => Number(a.displayOrder) - Number(b.displayOrder)
      ).map(mapBackendProduct);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 6e4
  });
  const showSkeletons = isLoading || actorFetching;
  const filtered = allProducts.filter((p) => {
    const mappedCategory = CATEGORY_MAP[category];
    const matchesCategory = mappedCategory === null || p.category === mappedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Shop — Farm72 | Cold Pressed Oils & Buransh Juice",
        description: "Browse Farm72 pure cold-pressed oils: Coconut, Sesame, Mustard, and Himalayan Buransh Juice. 25% off, natural and chemical-free."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-4",
          "aria-label": "Breadcrumb",
          "data-ocid": "shop-breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "flex items-center gap-1 hover:text-primary transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Home" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Shop" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-2 leading-tight", children: "Our Products" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle max-w-lg", children: "Pure cold-pressed oils and fresh natural drinks — no chemicals, no heat damage, just nature's best." })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border-b border-border sticky top-16 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search products...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 bg-card border-border h-9 text-sm",
            "data-ocid": "shop-search"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
        CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: category === cat ? "default" : "outline",
            size: "sm",
            onClick: () => setCategory(cat),
            className: category === cat ? "bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs font-semibold" : "h-8 text-xs font-medium border-border hover:border-primary hover:text-primary",
            "data-ocid": `filter-${cat.toLowerCase()}`,
            children: cat
          },
          cat
        ))
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 py-10", children: [
      !showSkeletons && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
        " ",
        filtered.length === 1 ? "product" : "products",
        category !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          " ",
          "in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: category })
        ] })
      ] }),
      showSkeletons ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}) : filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.08, duration: 0.38 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
        },
        product.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 },
          className: "flex flex-col items-center justify-center py-24 text-center",
          "data-ocid": "shop-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-2 text-foreground", children: "No products found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs", children: "Try adjusting your search term or selecting a different category." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setSearch("");
                  setCategory("All");
                },
                className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                "data-ocid": "shop-reset-filters",
                children: "Clear filters"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  Shop
};
