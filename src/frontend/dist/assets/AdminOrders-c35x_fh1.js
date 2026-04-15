import { r as reactExports, j as jsxRuntimeExports, P as Phone, h as Mail, M as MapPin, B as Button, b as useActor, k as useQueryClient, i as useQuery, e as ue, f as createActor } from "./index-DvcGPvs0.js";
import { P as Package, A as AdminLayout } from "./AdminLayout-CLC48HuP.js";
import { I as Input } from "./input-CFqo8dWv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DX4syQYx.js";
import { S as Skeleton } from "./skeleton-B786xQBg.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Ch8d7wNi.js";
import { U as User } from "./user-CYFqj9OR.js";
import { S as Save } from "./save-A2gbwnKV.js";
import { u as useMutation } from "./useMutation-B5rEmast.js";
import { C as CircleAlert } from "./circle-alert-f1Gdj5RB.js";
import { S as Search } from "./search-C1hd-gfR.js";
import { E as Eye } from "./eye-BHfo80pK.js";
import "./useAdmin-DcxYaAQa.js";
import "./chevron-right-DJgkfB1W.js";
import "./shopping-bag-BAeIrY_A.js";
import "./index-DCX6BepH.js";
import "./index-BNZPM4Cw.js";
import "./chevron-down-BczhWcd7.js";
import "./check-hTOymVum.js";
const STATUS_STYLES$1 = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20"
};
const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled"
];
function AdminOrderDetail({ order, onClose, onStatusChange }) {
  const [newStatus, setNewStatus] = reactExports.useState(order.status);
  function handleSaveStatus() {
    onStatusChange(newStatus);
    onClose();
  }
  const createdDate = order.createdAt ? new Date(Number(order.createdAt) / 1e6).toLocaleDateString("en-IN") : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "admin-order-detail-dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
          "Order ",
          order.id
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-lg p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              " Customer Information"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.customerName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  " Phone"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                  " Email"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                  " Address"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.address })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-0.5", children: createdDate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mt-0.5", children: order.paymentMethod })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_STYLES$1[order.status] ?? "bg-muted"}`,
                  children: order.status
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Ordered Items" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-xs font-semibold text-muted-foreground", children: "Product" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left text-xs font-semibold text-muted-foreground", children: "Variant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-center text-xs font-semibold text-muted-foreground", children: "Qty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right text-xs font-semibold text-muted-foreground", children: "Price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right text-xs font-semibold text-muted-foreground", children: "Subtotal" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border last:border-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: item.productName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: item.variantLabel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: Number(item.quantity) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
                      "₹",
                      Number(item.unitPrice).toLocaleString("en-IN")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold", children: [
                      "₹",
                      (Number(item.unitPrice) * Number(item.quantity)).toLocaleString("en-IN")
                    ] })
                  ]
                },
                `${item.productId}-${item.variantId}-${i}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    colSpan: 4,
                    className: "px-4 py-3 text-right font-bold text-sm",
                    children: "Total"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-bold text-primary", children: [
                  "₹",
                  Number(order.totalAmount).toLocaleString("en-IN")
                ] })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Update Order Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newStatus, onValueChange: setNewStatus, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "flex-1",
                    "data-ocid": "admin-order-detail-status-select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ORDER_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s }, s)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleSaveStatus,
                  disabled: newStatus === order.status,
                  className: "btn-primary gap-2",
                  "data-ocid": "admin-order-detail-save-status-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                    "Save"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-2 pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onClose,
              "data-ocid": "admin-order-detail-close-button",
              children: "Close"
            }
          ) })
        ] })
      ]
    }
  ) });
}
const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20"
};
const STATUSES = [
  "all",
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled"
];
function AdminOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const {
    data: orders,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getOrders();
    },
    enabled
  });
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.updateOrderStatus(id, status);
      if (!result) throw new Error("Update failed");
      return result;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ["admin-orders"],
        (prev) => (prev == null ? void 0 : prev.map((o) => o.id === updated.id ? updated : o)) ?? []
      );
      if ((selectedOrder == null ? void 0 : selectedOrder.id) === updated.id) {
        setSelectedOrder(updated);
      }
      ue.success(`Order ${updated.id} status updated`);
    },
    onError: () => ue.error("Failed to update order status")
  });
  const allOrders = orders ?? [];
  const filtered = reactExports.useMemo(() => {
    return allOrders.filter((o) => {
      const matchSearch = search === "" || o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [allOrders, search, statusFilter]);
  function handleStatusChange(orderId, newStatus) {
    updateStatusMutation.mutate({
      id: orderId,
      status: newStatus
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Orders", breadcrumb: ["Orders"], children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load orders from backend." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by order ID or customer...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "admin-orders-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-44",
            "data-ocid": "admin-orders-status-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s === "all" ? "All Statuses" : s }, s)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          isLoading && ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28 rounded" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }) })
          ] }, k)),
          !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 6,
              className: "admin-table-cell text-center py-12 text-muted-foreground",
              "data-ocid": "admin-orders-empty-state",
              children: "No orders found."
            }
          ) }),
          filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "admin-table-row",
              "data-ocid": `admin-order.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell font-mono text-xs font-semibold text-foreground", children: order.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-sm", children: order.customerName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-cell text-right text-sm font-semibold text-primary", children: [
                  "₹",
                  Number(order.totalAmount).toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-xs", children: order.paymentMethod }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: order.status,
                    onValueChange: (v) => handleStatusChange(order.id, v),
                    disabled: updateStatusMutation.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: `h-7 text-xs border font-medium capitalize w-32 ${STATUS_STYLES[order.status] ?? "bg-muted"}`,
                          "data-ocid": `admin-order-status-select.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
                        "Pending",
                        "Confirmed",
                        "Shipped",
                        "Delivered",
                        "Cancelled"
                      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectItem,
                        {
                          value: s,
                          className: "capitalize text-xs",
                          children: s
                        },
                        s
                      )) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "admin-action-btn admin-action-view",
                    onClick: () => setSelectedOrder(order),
                    "data-ocid": `admin-order-view-button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                      "View"
                    ]
                  }
                ) })
              ]
            },
            order.id
          ))
        ] })
      ] }) }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 border-t border-border text-xs text-muted-foreground", children: [
        "Showing ",
        filtered.length,
        " of ",
        allOrders.length,
        " orders"
      ] })
    ] }),
    selectedOrder && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminOrderDetail,
      {
        order: selectedOrder,
        onClose: () => setSelectedOrder(null),
        onStatusChange: (newStatus) => handleStatusChange(selectedOrder.id, newStatus)
      }
    )
  ] });
}
export {
  AdminOrders
};
