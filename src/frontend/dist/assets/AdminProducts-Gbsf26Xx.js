import { b as useActor, k as useQueryClient, r as reactExports, a as useNavigate, i as useQuery, j as jsxRuntimeExports, B as Button, e as ue, f as createActor } from "./index-fnFDSW7U.js";
import { A as AdminLayout } from "./AdminLayout-BUzCzB5N.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BcXVHU_J.js";
import { B as Badge } from "./badge-DN_GbkeW.js";
import { I as Input } from "./input-ISzMOTxh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DGgNS3e-.js";
import { S as Skeleton } from "./skeleton-BMPnHN3y.js";
import { u as useMutation } from "./useMutation-BnYrbvH2.js";
import { C as CircleAlert } from "./circle-alert-Bxb0xZXu.js";
import { S as Search } from "./search-BpIQi8gz.js";
import { P as Plus } from "./plus-DJjxahc6.js";
import { E as Eye } from "./eye-BuRtP4f-.js";
import { P as Pencil } from "./pencil-C1qKXyap.js";
import { T as Trash2 } from "./trash-2-BmWHCYJy.js";
import "./useAdmin-BTAQKhcF.js";
import "./chevron-right-BQuVyHFo.js";
import "./shopping-bag-BH02fRxn.js";
import "./index-C_yweXmL.js";
import "./index-BM9mSLpQ.js";
import "./chevron-down-CgPj5DE4.js";
import "./check-CmdRDtEi.js";
function AdminProducts() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getAdminProducts();
    },
    enabled
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const ok = await actor.deleteProduct(id);
      if (!ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      ue.success("Product deleted successfully");
    },
    onError: () => ue.error("Failed to delete product")
  });
  const toggleMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.toggleProductVisibility(id);
      if (!result) throw new Error("Toggle failed");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      ue.success("Product visibility updated");
    },
    onError: () => ue.error("Failed to toggle visibility")
  });
  const items = products ?? [];
  const categories = reactExports.useMemo(
    () => ["all", ...Array.from(new Set(items.map((p) => p.category)))],
    [items]
  );
  const filtered = reactExports.useMemo(() => {
    return items.filter((p) => {
      const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [items, search, categoryFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Products", breadcrumb: ["Products"], children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load products from backend." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search products...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "admin-products-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-40",
            "data-ocid": "admin-products-category-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, className: "capitalize", children: c === "all" ? "All Categories" : c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "btn-primary w-full sm:w-auto",
          onClick: () => navigate({ to: "/admin/products/new" }),
          "data-ocid": "admin-products-add-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Product"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Variants" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Visible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          isLoading && ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24" }) })
          ] }, k)),
          !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 6,
              className: "admin-table-cell text-center py-12 text-muted-foreground",
              "data-ocid": "admin-products-empty-state",
              children: "No products found. Try adjusting your filters."
            }
          ) }),
          filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "admin-table-row",
              "data-ocid": `admin-product-row.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.imageUrl,
                      alt: product.name,
                      loading: "lazy",
                      className: "w-full h-full object-cover",
                      onError: (e) => {
                        e.target.src = "/assets/images/placeholder.svg";
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate max-w-[180px]", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: product.shortDescription })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: product.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-cell text-right text-sm font-semibold text-primary", children: [
                  "₹",
                  Number(product.price).toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-cell text-sm text-muted-foreground", children: [
                  product.variants.length,
                  " variant",
                  product.variants.length !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: product.isVisible ? "text-emerald-600" : "text-muted-foreground",
                    children: product.isVisible ? "Visible" : "Hidden"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleMutation.mutate(product.id),
                      disabled: toggleMutation.isPending,
                      className: "admin-action-btn admin-action-view",
                      title: "Toggle visibility",
                      "data-ocid": `admin-product-visibility.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "admin-action-btn admin-action-edit",
                      title: "Edit product",
                      onClick: () => navigate({
                        to: "/admin/products/$id/edit",
                        params: { id: product.id }
                      }),
                      "data-ocid": `admin-product-edit-button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "admin-action-btn admin-action-delete",
                        title: "Delete product",
                        "data-ocid": `admin-product-delete-button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin-delete-product-dialog", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Product?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          "Are you sure you want to delete",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: product.name }),
                          "? This action cannot be undone."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin-delete-product-cancel-button", children: "Cancel" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => deleteMutation.mutate(product.id),
                            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                            "data-ocid": "admin-delete-product-confirm-button",
                            children: "Delete"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }) })
              ]
            },
            product.id
          ))
        ] })
      ] }) }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 border-t border-border text-xs text-muted-foreground", children: [
        "Showing ",
        filtered.length,
        " of ",
        items.length,
        " products"
      ] })
    ] })
  ] });
}
export {
  AdminProducts
};
