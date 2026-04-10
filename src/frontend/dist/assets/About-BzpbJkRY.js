import { c as createLucideIcon, j as jsxRuntimeExports, M as MapPin, i as Mail, P as Phone, L as Link, B as Button } from "./index-_0pz2Sn_.js";
import { m as motion } from "./proxy-D2zCQ6DC.js";
import { L as Leaf } from "./leaf-BTNEIXZ3.js";
import { C as CircleCheck } from "./circle-check-BRzsICSW.js";
import { S as Sprout } from "./sprout-BdblCXWm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const benefits = [
  {
    icon: Heart,
    title: "Better Health",
    description: "Rich in natural antioxidants, vitamins, and omega fatty acids that support heart health, immunity, and overall well-being."
  },
  {
    icon: Leaf,
    title: "Natural Taste",
    description: "Unaltered flavor and aroma retained from seed to bottle — oil that tastes exactly as nature intended."
  },
  {
    icon: Shield,
    title: "No Chemicals",
    description: "Zero hexane, zero solvents, zero additives. Pure mechanical pressing — nothing added, nothing removed."
  },
  {
    icon: Sprout,
    title: "Traditional Method",
    description: "Our slow Kacchi Ghani process follows generations-old techniques, respecting both the seed and the consumer."
  }
];
const coldPressedPoints = [
  "Extracted at low temperature (< 40°C)",
  "Retains all nutrients and vitamins",
  "Chemical-free, solvent-free",
  "Natural color and aroma preserved",
  "Higher nutritional value per spoon"
];
const expellerPoints = [
  "High heat extraction (60–200°C+)",
  "Significant nutrient loss",
  "Chemical solvents often used",
  "Artificial deodorization required",
  "Bleaching agents applied"
];
const processSteps = [
  {
    step: "01",
    title: "Sourcing",
    description: "Premium seeds and nuts hand-picked from trusted Indian farms. We partner directly with farmers who follow sustainable practices."
  },
  {
    step: "02",
    title: "Cleaning",
    description: "Every batch is hand-sorted and thoroughly cleaned to remove impurities before pressing begins."
  },
  {
    step: "03",
    title: "Cold-Pressing",
    description: "Slow, traditional Kacchi Ghani method presses oils below 40°C — preserving all nutrients, enzymes, and natural flavors."
  },
  {
    step: "04",
    title: "Bottling",
    description: "Filtered and bottled in hygienic conditions with no preservatives, no artificial additives — sealed fresh for you."
  }
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[60vh] min-h-[380px] flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=1600&q=80",
          alt: "Farm72 — organic farming fields",
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hero-overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          className: "relative z-10 text-center px-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/30 backdrop-blur-sm mb-4", children: "Our Story" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-3", children: "About Farm72" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg sm:text-xl max-w-xl mx-auto", children: "Rooted in Tradition, Committed to Purity" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-4xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Who We Are" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "Pure Oils. Ancient Wisdom. Modern Kitchens." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "section-subtitle leading-relaxed mb-4", children: [
              "Farm72 was born out of a simple belief — that the oils we cook with should be as pure as the food we prepare. We provide 100% cold-pressed oils using the traditional",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground font-semibold", children: "Kacchi Ghani" }),
              " ",
              "method, sourcing the finest seeds directly from Indian farms."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle leading-relaxed", children: "Based in India, our mission is to bring chemical-free, nutrient-rich oils back to modern households — oils that retain their natural goodness from seed to table. No shortcuts. No compromises." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.15 },
          className: "flex justify-center gap-12 mt-12",
          children: [
            { value: "72+", label: "Years of Tradition" },
            { value: "5", label: "Pure Products" },
            { value: "100%", label: "Chemical Free" }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-bold text-primary", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: stat.label })
          ] }, stat.label))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Comparison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Cold Pressed vs Expeller / Refined Oil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-xl mx-auto", children: "Not all oils are equal. Here's why cold-pressed wins every time." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -24 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: 0.1 },
            className: "bg-primary rounded-2xl p-8 shadow-elevated",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-7 h-7 text-primary-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-primary-foreground", children: "Cold Pressed Oil" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: coldPressedPoints.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary-foreground/90 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/90 text-sm leading-relaxed", children: point })
              ] }, point)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: 0.2 },
            className: "bg-card rounded-2xl p-8 shadow-card border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-7 h-7 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: "Expeller / Refined Oil" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: expellerPoints.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive/70 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm leading-relaxed", children: point })
              ] }, point)) })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Benefits" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Why Choose Farm72?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-lg mx-auto", children: "Every bottle of Farm72 oil is a promise — pure, natural, and deeply nourishing." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: benefits.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-card-hover hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.description })
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Our Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-lg mx-auto", children: "Four careful steps — from farm to your kitchen table." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto", children: processSteps.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          className: "relative bg-card rounded-xl p-6 shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl font-black text-primary/10 absolute top-4 right-5 select-none leading-none", children: item.step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-sm", children: Number.parseInt(item.step) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.description })
          ]
        },
        item.step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "bg-card rounded-2xl p-8 shadow-card border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Find Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-5", children: "Get in Touch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Farm72, India" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "mailto:info@farm72.in",
                    className: "text-primary hover:underline text-sm",
                    "data-ocid": "about-email-link",
                    children: "info@farm72.in"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "tel:+919876543210",
                    className: "text-primary hover:underline text-sm",
                    "data-ocid": "about-phone-link",
                    children: "+91-9876543210"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "bg-primary rounded-2xl p-8 shadow-elevated flex flex-col justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/25 mb-4", children: "Try Farm72" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-primary-foreground mb-3", children: "Try Our Products Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm leading-relaxed mb-6", children: "Experience the difference of pure, cold-pressed oils. Switch to Farm72 and taste tradition in every drop." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold transition-smooth w-full sm:w-auto",
                "data-ocid": "about-shop-cta",
                children: "Shop Now"
              }
            ) })
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  About
};
