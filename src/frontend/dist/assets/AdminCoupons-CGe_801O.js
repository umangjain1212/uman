import { b as useActor, k as useQueryClient, r as reactExports, i as useQuery, j as jsxRuntimeExports, B as Button, e as ue, f as createActor } from "./index-fnFDSW7U.js";
import { A as AdminLayout } from "./AdminLayout-BUzCzB5N.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BcXVHU_J.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BMFYD0kU.js";
import { I as Input } from "./input-ISzMOTxh.js";
import { L as Label } from "./label-PhTYpHsY.js";
import { S as Skeleton } from "./skeleton-BMPnHN3y.js";
import { S as Switch } from "./switch-Cm30TG5l.js";
import { u as useMutation } from "./useMutation-BnYrbvH2.js";
import { C as CircleAlert } from "./circle-alert-Bxb0xZXu.js";
import { P as Plus } from "./plus-DJjxahc6.js";
import { T as Trash2 } from "./trash-2-BmWHCYJy.js";
import "./useAdmin-BTAQKhcF.js";
import "./chevron-right-BQuVyHFo.js";
import "./shopping-bag-BH02fRxn.js";
import "./index-4b_Do-lY.js";
import "./index-BM9mSLpQ.js";
const EMPTY_FORM = { code: "", discount: 10, maxUses: 100, expiry: "" };
function AdminCoupons() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const {
    data: coupons,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getCoupons();
    },
    enabled
  });
  const addMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const expiryTimestamp = form.expiry ? BigInt(new Date(form.expiry).getTime()) * BigInt(1e6) : void 0;
      const input = {
        code: form.code.toUpperCase().trim(),
        discountPercent: BigInt(form.discount),
        isActive: true,
        maxUses: BigInt(form.maxUses),
        expiryDate: expiryTimestamp
      };
      return actor.createCoupon(input);
    },
    onSuccess: (coupon) => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      setForm(EMPTY_FORM);
      setDialogOpen(false);
      ue.success(`Coupon ${coupon.code} created!`);
    },
    onError: () => ue.error("Failed to create coupon")
  });
  const deleteMutation = useMutation({
    mutationFn: async (code) => {
      if (!actor) throw new Error("No actor");
      const ok = await actor.deleteCoupon(code);
      if (!ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      ue.success("Coupon deleted");
    },
    onError: () => ue.error("Failed to delete coupon")
  });
  const toggleMutation = useMutation({
    mutationFn: async (coupon) => {
      if (!actor) throw new Error("No actor");
      const input = {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        isActive: !coupon.isActive,
        maxUses: coupon.maxUses,
        expiryDate: coupon.expiryDate
      };
      const result = await actor.updateCoupon(coupon.code, input);
      if (!result) throw new Error("Toggle failed");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
    },
    onError: () => ue.error("Failed to toggle coupon")
  });
  function handleAdd() {
    if (!form.code) {
      ue.error("Coupon code is required");
      return;
    }
    addMutation.mutate();
  }
  function formatExpiry(coupon) {
    if (!coupon.expiryDate) return "No expiry";
    const ms = Number(coupon.expiryDate) / 1e6;
    return new Date(ms).toLocaleDateString("en-IN");
  }
  const allCoupons = coupons ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Coupons", breadcrumb: ["Coupons"], children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load coupons from backend." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage discount coupon codes for Farm72." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "btn-primary gap-2",
            "data-ocid": "admin-coupons-add-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Coupon"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin-add-coupon-dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "New Coupon Code" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "coupon-code", children: "Code *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "coupon-code",
                  placeholder: "e.g. FARM10",
                  value: form.code,
                  onChange: (e) => setForm((f) => ({ ...f, code: e.target.value })),
                  className: "uppercase",
                  "data-ocid": "admin-coupon-code-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "coupon-discount", children: "Discount (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "coupon-discount",
                    type: "number",
                    min: 1,
                    max: 100,
                    value: form.discount,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      discount: Number(e.target.value)
                    })),
                    "data-ocid": "admin-coupon-discount-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "coupon-maxuses", children: "Max Uses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "coupon-maxuses",
                    type: "number",
                    min: 1,
                    value: form.maxUses,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      maxUses: Number(e.target.value)
                    })),
                    "data-ocid": "admin-coupon-maxuses-input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "coupon-expiry", children: "Expiry Date (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "coupon-expiry",
                  type: "date",
                  value: form.expiry,
                  onChange: (e) => setForm((f) => ({ ...f, expiry: e.target.value })),
                  "data-ocid": "admin-coupon-expiry-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleAdd,
                  disabled: addMutation.isPending,
                  className: "btn-primary flex-1",
                  "data-ocid": "admin-coupon-submit-button",
                  children: [
                    addMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : null,
                    addMutation.isPending ? "Creating..." : "Create Coupon"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setDialogOpen(false),
                  "data-ocid": "admin-coupon-cancel-button",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-head", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Discount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Uses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-right font-semibold", children: "Max Uses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Expiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-cell text-left font-semibold", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading && ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "admin-table-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-8 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-10 rounded-full" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }) })
        ] }, k)),
        !isLoading && allCoupons.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            className: "admin-table-cell text-center py-12 text-muted-foreground",
            "data-ocid": "admin-coupons-empty-state",
            children: "No coupons yet. Create your first coupon!"
          }
        ) }),
        allCoupons.map((coupon, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "admin-table-row",
            "data-ocid": `admin-coupon.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold tracking-wider bg-primary/10 text-primary px-2 py-1 rounded", children: coupon.code }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "admin-table-cell text-right font-semibold text-emerald-600", children: [
                Number(coupon.discountPercent),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right text-muted-foreground text-sm", children: Number(coupon.usageCount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-right text-muted-foreground text-sm", children: coupon.maxUses ? Number(coupon.maxUses) : "∞" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell text-sm text-muted-foreground", children: formatExpiry(coupon) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: coupon.isActive,
                  onCheckedChange: () => toggleMutation.mutate(coupon),
                  disabled: toggleMutation.isPending,
                  "data-ocid": `admin-coupon-toggle.${i + 1}`
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "admin-action-btn admin-action-delete",
                    "data-ocid": `admin-coupon-delete-button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      "Delete"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin-delete-coupon-dialog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Coupon?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      "Delete coupon ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: coupon.code }),
                      "? This cannot be undone."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin-delete-coupon-cancel-button", children: "Cancel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        onClick: () => deleteMutation.mutate(coupon.code),
                        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        "data-ocid": "admin-delete-coupon-confirm-button",
                        children: "Delete"
                      }
                    )
                  ] })
                ] })
              ] }) })
            ]
          },
          coupon.code
        ))
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "Coupon codes are case-insensitive on the customer side. Customers enter the code at checkout to apply the discount." })
  ] });
}
export {
  AdminCoupons
};
