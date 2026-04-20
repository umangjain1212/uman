import { u as useActor, n as useQueryClient, r as reactExports, a as useQuery, j as jsxRuntimeExports, B as Button, g as ue, b as createActor } from "./index-BAxA7QJV.js";
import { A as AdminLayout, S as Settings } from "./AdminLayout-aSSbiICY.js";
import { I as Input } from "./input-TjVb1Ywn.js";
import { L as Label } from "./label-DH7qK1mz.js";
import { S as Separator } from "./separator-DktPGJZ6.js";
import { S as Skeleton } from "./skeleton-C3yHk2pE.js";
import { S as Switch } from "./switch-B5Fbf9pH.js";
import { u as useMutation } from "./useMutation-C3iVZwG2.js";
import { C as CircleAlert } from "./circle-alert-Bh9wKerw.js";
import { S as Shield } from "./shield-nCWHLX3a.js";
import { S as Save } from "./save-CrBLPEPV.js";
import { S as ShieldCheck } from "./shield-check-BTo8Zsh4.js";
import "./chevron-right-C0Qp-EL3.js";
import "./shopping-bag-BTPJYgYg.js";
import "./index-CJTSFYNw.js";
import "./index-BX422gDG.js";
const DEFAULT_SETTINGS = {
  whatsappNumber: "+91 7500010488",
  contactEmail: "info@farm72.in",
  footerText: "© 2026 Farm72. All rights reserved.",
  stripeEnabled: true,
  whatsappOrderEnabled: true,
  showAnnouncementBanner: false,
  announcementBannerText: "Free shipping on orders above ₹999!",
  maintenanceMode: false
};
function AdminSettings() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const {
    data: loadedSettings,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getSiteSettings();
    },
    enabled
  });
  reactExports.useEffect(() => {
    if (loadedSettings) {
      setSettings(loadedSettings);
    }
  }, [loadedSettings]);
  const saveMutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      console.log("[AdminSettings] updateSiteSettingsPartial:", input);
      const result = await actor.updateSiteSettingsPartial(input);
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    onSuccess: (updated) => {
      setSettings(updated);
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      ue.success("Settings saved successfully!");
    },
    onError: (err) => {
      console.error("[AdminSettings] save error:", err);
      ue.error("Failed to save settings");
    }
  });
  function setField(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }
  function handleSave(e) {
    e.preventDefault();
    saveMutation.mutate(settings);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Settings", breadcrumb: ["Settings"], children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Could not load settings from backend. Showing defaults." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "max-w-2xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 space-y-5 shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base flex items-center gap-2 border-b border-border pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
          "General Settings"
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "footerText", children: "Footer Copyright Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "footerText",
                  value: settings.footerText,
                  onChange: (e) => setField("footerText", e.target.value),
                  "data-ocid": "admin-settings-footer-text-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "contactEmail", children: "Support Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "contactEmail",
                  type: "email",
                  value: settings.contactEmail,
                  onChange: (e) => setField("contactEmail", e.target.value),
                  "data-ocid": "admin-settings-support-email-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                className: "admin-form-label",
                htmlFor: "announcementBannerText",
                children: "Announcement Banner Text"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "announcementBannerText",
                value: settings.announcementBannerText,
                onChange: (e) => setField("announcementBannerText", e.target.value),
                placeholder: "e.g. Free shipping on orders above ₹999!",
                "data-ocid": "admin-settings-announcement-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 px-4 bg-muted/40 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Show Announcement Banner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Display a banner across the top of the site" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: settings.showAnnouncementBanner,
                onCheckedChange: (v) => setField("showAnnouncementBanner", v),
                "data-ocid": "admin-settings-banner-switch"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 space-y-5 shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base border-b border-border pb-3", children: "Contact & Payments" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "whatsapp", children: "WhatsApp Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "whatsapp",
              value: settings.whatsappNumber,
              onChange: (e) => setField("whatsappNumber", e.target.value),
              placeholder: "+91 7500010488",
              "data-ocid": "admin-settings-whatsapp-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Used for WhatsApp popup and order messages. Include country code." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 px-4 bg-muted/40 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Stripe Checkout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Accept card payments via Stripe" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: settings.stripeEnabled,
                onCheckedChange: (v) => setField("stripeEnabled", v),
                "data-ocid": "admin-settings-stripe-switch"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 px-4 bg-muted/40 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "WhatsApp Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Allow customers to place orders via WhatsApp" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: settings.whatsappOrderEnabled,
                onCheckedChange: (v) => setField("whatsappOrderEnabled", v),
                "data-ocid": "admin-settings-whatsapp-orders-switch"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-destructive/30 rounded-xl p-6 space-y-4 shadow-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base flex items-center gap-2 text-destructive border-b border-destructive/20 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Maintenance Mode"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 px-4 bg-destructive/5 rounded-lg border border-destructive/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Enable Maintenance Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Hides the site from visitors. Only admins can access it." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: settings.maintenanceMode,
              onCheckedChange: (v) => setField("maintenanceMode", v),
              "data-ocid": "admin-settings-maintenance-switch"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          className: "btn-primary gap-2",
          disabled: saveMutation.isPending,
          "data-ocid": "admin-settings-save-button",
          children: [
            saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            saveMutation.isPending ? "Saving..." : "Save Settings"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-primary/20 rounded-xl p-6 space-y-4 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base flex items-center gap-2 text-primary border-b border-primary/20 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
        "Security & Authentication"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start bg-primary/5 border border-primary/20 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Secured by Internet Identity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "This admin panel uses",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Internet Identity" }),
            " ",
            "for authentication — ICP's secure, privacy-preserving login system. No passwords are stored anywhere. Your identity is cryptographically verified on every session."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "To manage your Internet Identity (devices, recovery, etc.), visit",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://identity.internetcomputer.org",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary underline underline-offset-2 hover:text-primary/80 transition-colors",
                children: "identity.internetcomputer.org"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminSettings
};
