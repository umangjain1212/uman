import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, m as motion, h as Mail, P as Phone, B as Button } from "./index-fnFDSW7U.js";
import { S as SEO } from "./SEO-rbXZuldQ.js";
import { A as ArrowLeft } from "./arrow-left-4pOX5sND.js";
import { C as Clock } from "./clock-B3HIU-C6.js";
import { C as CircleCheck } from "./circle-check-Dy9HaFYL.js";
import { C as CircleX } from "./circle-x-DhZkigob.js";
import { M as MessageCircle } from "./message-circle-CfG-bXV6.js";
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const acceptedReasons = [
  "Product is physically damaged or broken on delivery",
  "Product is defective (seal broken, contaminated, or unusable)",
  "Wrong product was delivered (different from what was ordered)"
];
const rejectedReasons = [
  "Customer is not satisfied with the taste, smell, or appearance",
  "Price issue or cheaper alternative found elsewhere",
  "Personal preference or change of mind",
  "Product was opened and used partially",
  "Return request made after 7 days of delivery"
];
const returnSteps = [
  {
    step: "01",
    title: "Contact Us Within 7 Days",
    description: "Reach out via WhatsApp or email within 7 days of delivery. Share your order details and describe the issue clearly."
  },
  {
    step: "02",
    title: "Submit Proof",
    description: "Share clear photos or a video of the damaged or defective product. This helps us process your request faster."
  },
  {
    step: "03",
    title: "Verification",
    description: "Our team will review the evidence within 1–2 business days and confirm if the return is eligible."
  },
  {
    step: "04",
    title: "Resolution",
    description: "On approval, we'll arrange a replacement or refund. Refunds are processed within 5–7 business days."
  }
];
function RefundPolicy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Refund & Return Policy — Farm72",
        description: "Farm72 refund and return policy. Returns accepted within 7 days for damaged or defective products only. Learn how to initiate a return request."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-12 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6",
          "data-ocid": "refund-policy.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Home"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-3 inline-flex", children: "Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Refund & Return Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl leading-relaxed", children: "At Farm72, we are committed to delivering the highest quality cold-pressed oils. Please read our refund and return policy carefully before placing an order." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Last updated: April 2026" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-4xl space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "bg-card rounded-2xl p-8 shadow-card border border-green-200",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Return Window — 7 Days Only" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
              "All return and refund requests must be raised within",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "7 calendar days" }),
              " from the date of delivery. Any request submitted after this period will not be entertained, regardless of the reason. We strongly recommend inspecting your order on arrival and reporting any issue promptly."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "bg-card rounded-2xl p-7 shadow-card border border-green-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Valid Return Reasons" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: acceptedReasons.map((reason) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground leading-relaxed", children: reason })
              ] }, reason)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "bg-card rounded-2xl p-7 shadow-card border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-6 h-6 text-destructive/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Non-Returnable Situations" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: rejectedReasons.map((reason) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground leading-relaxed", children: reason })
              ] }, reason)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-800 text-sm mb-1", children: "Important Notice" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-700 text-sm leading-relaxed", children: "Farm72 products are food-grade consumables. Once the product seal is broken or the product has been used, it cannot be returned under any circumstances, even if the return is within the 7-day window and the original reason was valid." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "How to Initiate a Return" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: returnSteps.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative bg-card rounded-xl p-5 shadow-card border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-black text-primary/10 absolute top-3 right-4 select-none leading-none", children: item.step }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-sm", children: Number.parseInt(item.step) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-2", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: item.description })
                ]
              },
              item.step
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "bg-card rounded-2xl p-8 shadow-card border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: "Refund Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [
              { label: "Return Request Review", time: "1–2 business days" },
              { label: "Pickup/Collection", time: "3–5 business days" },
              {
                label: "Refund Credit",
                time: "5–7 business days after pickup"
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/40 rounded-xl p-4 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary", children: item.time }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.label })
                ]
              },
              item.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-5 leading-relaxed", children: "Refunds are processed to the original payment method. For WhatsApp/cash orders, we will contact you to arrange the refund directly." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "bg-primary rounded-2xl p-8 text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-2", children: "Need to Return Something?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mb-6 leading-relaxed", children: "Contact us immediately with your order details and photos of the issue. Our team will guide you through the process." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "https://wa.me/917500010488",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] rounded-xl text-white text-sm font-semibold hover:bg-[#20bc5b] transition-colors",
                  "data-ocid": "refund-policy.whatsapp_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                    "WhatsApp: +91 7500010488"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:info@farm72.in",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/15 rounded-xl text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/25 transition-colors",
                  "data-ocid": "refund-policy.email_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                    "info@farm72.in"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "tel:+917500010488",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/15 rounded-xl text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/25 transition-colors",
                  "data-ocid": "refund-policy.phone_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                    "+91 7500010488"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-primary",
            "data-ocid": "refund-policy.shop_button",
            children: "Continue Shopping"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "text-sm text-primary hover:underline", children: "View Terms & Conditions →" })
      ] })
    ] }) })
  ] });
}
export {
  RefundPolicy
};
