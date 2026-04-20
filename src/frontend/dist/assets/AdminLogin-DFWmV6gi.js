import { l as useAdmin, e as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-C0X0mL0C.js";
import { L as Leaf } from "./leaf-B5a9PUHh.js";
import { S as ShieldCheck } from "./shield-check-B1ixE4mS.js";
import { L as LoaderCircle } from "./loader-circle-Dp9m8mtf.js";
import { C as CircleCheckBig } from "./circle-check-big-Ca8BBiSw.js";
function AdminLogin() {
  const { isAuthenticated, isLoading, loginWithII, adminStatus, adminError } = useAdmin();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  const isLoggingIn = adminStatus === "logging-in" || adminStatus === "verifying";
  const busy = isLoading || isLoggingIn;
  const statusMsg = adminStatus === "logging-in" ? "Waiting for Internet Identity..." : adminStatus === "verifying" ? "Verifying admin access..." : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-muted/30 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated p-8 space-y-8 animate-fade-in-scale", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-primary" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-serif text-3xl font-semibold tracking-widest text-primary select-none",
              style: { letterSpacing: "0.18em" },
              children: "Farm 72"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 tracking-widest uppercase", children: "Admin Panel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Owner Access Only" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in with your Internet Identity to access the admin dashboard." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start bg-primary/5 border border-primary/20 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed", children: [
            "Authentication is handled via",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Internet Identity" }),
            " — the secure, privacy-preserving login system for the Internet Computer. No password needed."
          ] })
        ] }),
        statusMsg && !adminError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm border bg-muted border-border text-muted-foreground",
            "data-ocid": "admin-login-loading-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 flex-shrink-0 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: statusMsg })
            ]
          }
        ),
        adminStatus === "success" && isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm border bg-primary/10 border-primary/20 text-primary",
            "data-ocid": "admin-login-success-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Access granted — redirecting…" })
            ]
          }
        ),
        adminError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-start gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-3 py-2.5 text-sm",
            "data-ocid": "admin-login-error-state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: adminError })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: loginWithII,
            disabled: busy,
            className: "w-full btn-primary h-11 text-base gap-2",
            "data-ocid": "admin-login-submit-button",
            children: [
              busy ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
              busy ? statusMsg ?? "Connecting…" : "Connect with Internet Identity"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-4 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "/",
        className: "hover:text-foreground transition-smooth underline underline-offset-2",
        children: "← Back to Farm72 website"
      }
    ) })
  ] }) });
}
export {
  AdminLogin
};
