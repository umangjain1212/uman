import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, M as MapPin, h as Mail, P as Phone, L as Link, B as Button } from "./index-0GmdxHi9.js";
import { S as SEO } from "./SEO-D589WDNs.js";
import { L as Leaf } from "./leaf-I9NH2avV.js";
import { C as CircleCheck } from "./circle-check-DoBENiv4.js";
import { C as CircleX } from "./circle-x-DwTc_WnP.js";
import { S as Shield } from "./shield-kjZahr2y.js";
import { S as Sprout, D as Droplets } from "./sprout-CpTP3wyO.js";
import { T as Thermometer } from "./thermometer-L02AJMuF.js";
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
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
const purityPoints = [
  "Farm72 products are 100% pure and natural",
  "No chemicals used in any stage of processing",
  "No preservatives added — fresh from source to bottle",
  "Cold pressed using the traditional Kacchi Ghani method",
  "No external additives or artificial processing",
  "Healthy and traditional extraction methods, time-tested over generations"
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Our Story — Farm72 | Traditional Cold Pressed Oils",
        description: "Learn about Farm72 traditional Kacchi Ghani cold-pressing process and Himalayan Buransh Juice origin story."
      }
    ),
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
            className: "bg-card rounded-2xl p-8 shadow-card border border-green-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-7 h-7 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-primary", children: "Cold Pressed Oil" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: coldPressedPoints.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-sm leading-relaxed", children: point })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Purity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Our Commitment to Purity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-lg mx-auto", children: "We take pride in maintaining the highest standards of quality and natural goodness in every product we make." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          className: "bg-card rounded-2xl p-8 shadow-card border border-green-200",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-4", children: purityPoints.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-sm leading-relaxed", children: point })
            ] }, point)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3.5 h-3.5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-primary/90 leading-relaxed italic", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "not-italic font-semibold", children: "Natural Sediment Note:" }),
                " ",
                "As the oil is not filtered using any chemical or solvents, oil seed particles might settle down at the bottom — this is completely natural and safe for consumption."
              ] })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-4 inline-flex", children: "Buransh Juice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Buransh Juice — Nature's Himalayan Gift" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-xl mx-auto", children: "Straight from the Valley of Flowers — handpicked Himalayan Rhododendron blossoms, naturally processed into a pure, cooling juice." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -24 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: 0.1 },
            className: "bg-card rounded-2xl p-8 shadow-card border border-green-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-3", children: "From the Himalayan Highlands" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: [
                "Buransh Juice is made from the flowers of the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Himalayan Buransh tree (Rhododendron arboreum)" }),
                ", the state flower of Uttarakhand. These vibrant red blossoms grow in the Valley of Flowers and high Himalayan forests, where they are handpicked during their peak bloom season."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Each flower is carefully collected and naturally processed — preserving all the goodness that nature packed into these extraordinary Himalayan blooms." })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-4", children: "Why Buransh Juice?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
                {
                  icon: Thermometer,
                  text: "Keeps the body cool in summer — natural cooling properties"
                },
                {
                  icon: Droplets,
                  text: "Good for stomach health and aids digestion naturally"
                },
                {
                  icon: Shield,
                  text: "Rich in antioxidants with natural anti-inflammatory properties"
                },
                {
                  icon: Leaf,
                  text: "100% natural — no preservatives, no artificial colors or additives"
                }
              ].map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-sm leading-relaxed", children: text })
              ] }, text)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.3 },
          className: "mt-6 bg-card rounded-2xl p-6 shadow-card border border-green-200 flex items-start gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground mb-1", children: "Purely Natural, Purely Himalayan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Our Buransh Juice contains no chemicals, no solvents, and no artificial preservatives. It comes directly from the Himalayan region — wild, pure, and as nature intended. A traditional Himalayan health drink brought straight to your doorstep by Farm72." })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [
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
                    href: "tel:+917500010488",
                    className: "text-primary hover:underline text-sm",
                    "data-ocid": "about-phone-link",
                    children: "+91 7500010488"
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
          className: "bg-card rounded-2xl p-8 shadow-card border border-green-200 flex flex-col justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4", children: "Try Farm72" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-primary mb-3", children: "Try Our Products Today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-6", children: "Experience the difference of pure, cold-pressed oils. Switch to Farm72 and taste tradition in every drop." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-smooth w-full sm:w-auto",
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
