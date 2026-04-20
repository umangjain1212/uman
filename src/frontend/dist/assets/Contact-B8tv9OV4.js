import { c as createLucideIcon, r as reactExports, i as Mail, k as Phone, M as MapPin, j as jsxRuntimeExports, m as motion, B as Button, u as useActor, a as useQuery, b as createActor } from "./index-BAxA7QJV.js";
import { S as SEO } from "./SEO-CY4G53lg.js";
import { I as Input } from "./input-TjVb1Ywn.js";
import { L as Label } from "./label-DH7qK1mz.js";
import { T as Textarea } from "./textarea-Q-xWdx9G.js";
import { M as MessageCircle } from "./message-circle-D-2EphJM.js";
import { C as Clock } from "./clock-BAxMkuCu.js";
import { C as CircleCheck } from "./circle-check-C93iAGbs.js";
import { C as CircleAlert } from "./circle-alert-Bh9wKerw.js";
import { C as CircleHelp } from "./circle-help-C_i8PTfO.js";
import "./index-CJTSFYNw.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function useSiteSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.getSiteSettings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
const faqs = [
  {
    q: "What is cold-pressed oil?",
    a: "Cold-pressed oils are extracted mechanically at low temperatures, preserving nutrients, natural aroma, and flavor without any chemical solvents."
  },
  {
    q: "How should I store my oils?",
    a: "Store in a cool, dark place away from direct sunlight. Best kept below 25°C. Refrigeration is not required but can extend shelf life."
  },
  {
    q: "Do you offer bulk / wholesale orders?",
    a: "Yes! We offer special pricing for bulk orders. Drop us a message with your requirements and we'll get back to you within 24 hours."
  }
];
function Contact() {
  var _a, _b;
  const { data: settings } = useSiteSettings();
  const whatsappRaw = ((_a = settings == null ? void 0 : settings.whatsappNumber) == null ? void 0 : _a.trim()) || "+91 7500010488";
  const whatsappDigits = whatsappRaw.replace(/\D/g, "");
  const contactEmail = ((_b = settings == null ? void 0 : settings.contactEmail) == null ? void 0 : _b.trim()) || "info@farm72.in";
  const contactInfo = reactExports.useMemo(
    () => [
      {
        icon: Mail,
        label: "Email",
        value: contactEmail,
        href: `mailto:${contactEmail}`
      },
      {
        icon: Phone,
        label: "Phone",
        value: whatsappRaw,
        href: `tel:+${whatsappDigits}`
      },
      {
        icon: MapPin,
        label: "Address",
        value: "Farm72, India",
        href: null
      }
    ],
    [contactEmail, whatsappRaw, whatsappDigits]
  );
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitStatus, setSubmitStatus] = reactExports.useState("idle");
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  }
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const phone = whatsappDigits || "917500010488";
      const prefillText = `Name: ${form.name.trim()}
Email: ${form.email.trim()}
Message: ${form.message.trim()}`;
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(prefillText)}`;
      window.open(waUrl, "_blank");
      setSubmitStatus("success");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or reach us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Contact Farm72 | Cold Pressed Oils & Buransh Juice",
        description: "Reach Farm72 for orders, queries or feedback about our pure cold-pressed oils and Buransh Juice."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "green-gradient-bg leaf-pattern py-20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Contact Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle max-w-lg mx-auto", children: "We'd love to hear from you. Whether you have a question about our oils, need help with an order, or want to discuss bulk pricing — we're here." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-8 border border-green-200 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-primary mb-6", children: "Reach Us Directly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: contactInfo.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-medium uppercase tracking-wide mb-0.5", children: item.label }),
                  item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: item.href,
                      className: "text-primary font-medium hover:text-primary/80 transition-smooth",
                      children: item.value
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: item.value })
                ] })
              ] }, item.label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/${whatsappDigits}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "mt-6 flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium text-sm",
                  "data-ocid": "contact-whatsapp",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                    "Chat on WhatsApp"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl overflow-hidden shadow-card border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-muted/40 h-44 flex flex-col items-center justify-center gap-2 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden opacity-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    role: "img",
                    "aria-labelledby": "map-title",
                    viewBox: "0 0 400 180",
                    className: "w-full h-full",
                    fill: "none",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "map-title", children: "Map of India" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "400", height: "180", fill: "none" }),
                      [30, 60, 90, 120, 150].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: "0",
                          y1: y,
                          x2: "400",
                          y2: y,
                          stroke: "currentColor",
                          strokeWidth: "0.5",
                          className: "text-primary"
                        },
                        `h-${y}`
                      )),
                      [50, 100, 150, 200, 250, 300, 350].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: x,
                          y1: "0",
                          x2: x,
                          y2: "180",
                          stroke: "currentColor",
                          strokeWidth: "0.5",
                          className: "text-primary"
                        },
                        `v-${x}`
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M165 30 L215 28 L240 50 L250 80 L245 110 L230 130 L210 150 L195 165 L180 150 L160 125 L148 100 L145 75 L155 50 Z",
                          fill: "currentColor",
                          className: "text-accent",
                          opacity: "0.6"
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Farm72" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "India" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "Business Hours:",
                    " "
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Mon–Fri 9AM–6PM, Sat 9AM–3PM" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-8 shadow-card border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold mb-1", children: "Send a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "We typically reply within 24 business hours." }),
            submitStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                className: "flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30 mb-6",
                "data-ocid": "contact-success-banner",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Message sent!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "We'll get back to you soon." })
                  ] })
                ]
              }
            ),
            submitStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-6",
                "data-ocid": "contact-error-banner",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm", children: errorMessage })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "flex flex-col gap-5",
                noValidate: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-name",
                        className: "mb-1.5 block text-sm font-medium",
                        children: [
                          "Full Name ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-name",
                        placeholder: "Your name",
                        value: form.name,
                        onChange: (e) => handleChange("name", e.target.value),
                        className: errors.name ? "border-destructive focus-visible:ring-destructive/30" : "",
                        "data-ocid": "contact-name",
                        disabled: isSubmitting
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-xs mt-1.5 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                      errors.name
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-email",
                        className: "mb-1.5 block text-sm font-medium",
                        children: [
                          "Email Address ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: form.email,
                        onChange: (e) => handleChange("email", e.target.value),
                        className: errors.email ? "border-destructive focus-visible:ring-destructive/30" : "",
                        "data-ocid": "contact-email",
                        disabled: isSubmitting
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-xs mt-1.5 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                      errors.email
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Label,
                      {
                        htmlFor: "contact-message",
                        className: "mb-1.5 block text-sm font-medium",
                        children: [
                          "Message ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "contact-message",
                        placeholder: "How can we help you? (minimum 20 characters)",
                        value: form.message,
                        onChange: (e) => handleChange("message", e.target.value),
                        className: `min-h-[130px] resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive/30" : ""}`,
                        "data-ocid": "contact-message",
                        disabled: isSubmitting
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mt-1.5", children: [
                      errors.message ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-xs flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3 flex-shrink-0" }),
                        errors.message
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `text-xs ml-auto ${form.message.length < 20 && form.message.length > 0 ? "text-destructive" : "text-muted-foreground"}`,
                          children: [
                            form.message.length,
                            "/20 min"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "btn-primary w-full text-sm mt-1",
                      "data-ocid": "contact-submit",
                      disabled: isSubmitting,
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
                        "Sending…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                        "Send Message"
                      ] })
                    }
                  )
                ]
              }
            )
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-3 inline-flex", children: "FAQ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-2", children: "Common Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Quick answers to things our customers often ask." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: faqs.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "bg-card rounded-xl border border-border shadow-card overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setOpenFaq(openFaq === faq.q ? null : faq.q),
                className: "w-full flex items-center justify-between px-6 py-4 text-left transition-smooth hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                "aria-expanded": openFaq === faq.q,
                "data-ocid": `faq-toggle-${faq.q.slice(0, 10).replace(/\s+/g, "-").toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground text-sm flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                    faq.q
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-muted-foreground transition-transform duration-200 ${openFaq === faq.q ? "rotate-45" : ""}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          role: "img",
                          "aria-label": "Toggle",
                          width: "14",
                          height: "14",
                          viewBox: "0 0 14 14",
                          fill: "none",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M7 2v10M2 7h10",
                              stroke: "currentColor",
                              strokeWidth: "1.8",
                              strokeLinecap: "round"
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              }
            ),
            openFaq === faq.q && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.25 },
                className: "px-6 pb-5",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed pl-6", children: faq.a })
              }
            )
          ]
        },
        faq.q
      )) })
    ] }) })
  ] });
}
export {
  Contact
};
