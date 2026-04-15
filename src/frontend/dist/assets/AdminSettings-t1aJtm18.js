import { c as createLucideIcon, b as useActor, k as useQueryClient, r as reactExports, i as useQuery, j as jsxRuntimeExports, B as Button, e as ue, f as createActor } from "./index-fnFDSW7U.js";
import { A as AdminLayout, S as Settings } from "./AdminLayout-BUzCzB5N.js";
import { I as Input } from "./input-ISzMOTxh.js";
import { L as Label } from "./label-PhTYpHsY.js";
import { S as Separator } from "./separator-CDXNwOC2.js";
import { S as Skeleton } from "./skeleton-BMPnHN3y.js";
import { S as Switch } from "./switch-Cm30TG5l.js";
import { u as useAdmin } from "./useAdmin-BTAQKhcF.js";
import { u as useMutation } from "./useMutation-BnYrbvH2.js";
import { C as CircleAlert } from "./circle-alert-Bxb0xZXu.js";
import { S as Shield } from "./shield-DSpIXsP6.js";
import { S as Save } from "./save-C5j-cKoS.js";
import { L as Lock, E as EyeOff } from "./lock-cx2nNpkd.js";
import { E as Eye } from "./eye-BuRtP4f-.js";
import "./chevron-right-BQuVyHFo.js";
import "./shopping-bag-BH02fRxn.js";
import "./index-4b_Do-lY.js";
import "./index-BM9mSLpQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
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
  const { changePassword } = useAdmin();
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showCurrentPw, setShowCurrentPw] = reactExports.useState(false);
  const [showNewPw, setShowNewPw] = reactExports.useState(false);
  const [pwError, setPwError] = reactExports.useState(null);
  const [pwSuccess, setPwSuccess] = reactExports.useState(false);
  const [changingPw, setChangingPw] = reactExports.useState(false);
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
      return actor.updateSiteSettingsPartial(input);
    },
    onSuccess: (updated) => {
      setSettings(updated);
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      ue.success("Settings saved successfully!");
    },
    onError: () => {
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
  async function handlePasswordChange(e) {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwError("All password fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New password and confirm password do not match.");
      return;
    }
    setChangingPw(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      ue.success("Password changed successfully!");
    } catch (err) {
      setPwError(
        err instanceof Error ? err.message : "Failed to change password"
      );
    } finally {
      setChangingPw(false);
    }
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-primary/20 rounded-xl p-6 space-y-5 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base flex items-center gap-2 text-primary border-b border-primary/20 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" }),
        "Security & Password"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handlePasswordChange,
          className: "space-y-4",
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "current-password", children: "Current Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "current-password",
                      type: showCurrentPw ? "text" : "password",
                      autoComplete: "current-password",
                      value: currentPassword,
                      onChange: (e) => {
                        setCurrentPassword(e.target.value);
                        setPwError(null);
                      },
                      className: "pl-9 pr-10",
                      placeholder: "Current password",
                      "data-ocid": "admin-settings-current-password-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowCurrentPw((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Toggle current password visibility",
                      tabIndex: -1,
                      children: showCurrentPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "new-password", children: "New Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "new-password",
                      type: showNewPw ? "text" : "password",
                      autoComplete: "new-password",
                      value: newPassword,
                      onChange: (e) => {
                        setNewPassword(e.target.value);
                        setPwError(null);
                      },
                      className: "pl-9 pr-10",
                      placeholder: "Min. 8 characters",
                      "data-ocid": "admin-settings-new-password-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowNewPw((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Toggle new password visibility",
                      tabIndex: -1,
                      children: showNewPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "confirm-password", children: "Confirm New Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "confirm-password",
                      type: "password",
                      autoComplete: "new-password",
                      value: confirmPassword,
                      onChange: (e) => {
                        setConfirmPassword(e.target.value);
                        setPwError(null);
                      },
                      className: "pl-9",
                      placeholder: "Repeat new password",
                      "data-ocid": "admin-settings-confirm-password-input"
                    }
                  )
                ] })
              ] })
            ] }),
            pwError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-3 py-2.5 text-sm",
                "data-ocid": "admin-settings-pw-error-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: pwError })
                ]
              }
            ),
            pwSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-lg px-3 py-2.5 text-sm",
                "data-ocid": "admin-settings-pw-success-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Password changed successfully!" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                variant: "outline",
                className: "gap-2 border-primary/30 text-primary hover:bg-primary/5",
                disabled: changingPw,
                "data-ocid": "admin-settings-change-password-button",
                children: [
                  changingPw ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary/40 border-t-primary rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" }),
                  changingPw ? "Changing..." : "Change Password"
                ]
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  AdminSettings
};
