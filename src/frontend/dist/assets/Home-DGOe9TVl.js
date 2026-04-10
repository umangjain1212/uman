import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button, r as reactExports } from "./index-_0pz2Sn_.js";
import { p as products, P as ProductCard, C as ChevronRight } from "./products-DdFxKeR5.js";
import { m as motion } from "./proxy-D2zCQ6DC.js";
import { A as ArrowRight } from "./arrow-right-DyuUojNU.js";
import { L as Leaf } from "./leaf-BTNEIXZ3.js";
import { S as Sprout } from "./sprout-BdblCXWm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
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
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$1);
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
      d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",
      key: "1ir223"
    }
  ],
  ["path", { d: "m5 22 14-4", key: "1brv4h" }],
  ["path", { d: "m5 18 14 4", key: "lgyyje" }]
];
const FlameKindling = createLucideIcon("flame-kindling", __iconNode);
const heroSlides = [
  {
    imageUrl: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=1600&q=85",
    alt: "Coconut oil in a glass jar on wooden surface"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&q=85",
    alt: "Sesame seeds in a wooden bowl"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=1600&q=85",
    alt: "Mustard field in full bloom"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1600&q=85",
    alt: "Healthy organic food and oils on a table"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=1600&q=85",
    alt: "Organic farm with fresh produce"
  }
];
const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No preservatives, no additives — just pure cold-pressed oil straight from the seed to your kitchen."
  },
  {
    icon: Droplets,
    title: "Chemical-Free",
    description: "Zero hexane, zero bleaching agents. Every drop is clean and unadulterated as nature intended."
  },
  {
    icon: FlameKindling,
    title: "Traditional Method",
    description: "The age-old Kacchi Ghani process presses at low temperature, locking in nutrients and natural aroma."
  }
];
function HeroCarousel() {
  const [current, setCurrent] = reactExports.useState(0);
  const [isAnimating, setIsAnimating] = reactExports.useState(false);
  const [paused, setPaused] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const goTo = reactExports.useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + heroSlides.length) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating]
  );
  reactExports.useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative h-[88vh] min-h-[580px] max-h-[820px] overflow-hidden",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      children: [
        heroSlides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`,
            style: {
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            },
            role: "img",
            "aria-label": slide.alt
          },
          slide.imageUrl
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hero-overlay z-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-30 h-full flex flex-col items-center justify-center text-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7 },
            className: "max-w-3xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground text-sm font-medium mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4 text-accent" }),
                "Farm72 · Pure Cold Pressed Oils"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4", children: [
                "Pure Cold Pressed Oils",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "for Healthy Living" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/85 text-lg mb-8 max-w-xl mx-auto leading-relaxed", children: "100% Natural  |  Chemical-Free  |  Kacchi Ghani Process" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "btn-primary text-base px-8 py-3 shadow-elevated",
                    "data-ocid": "hero-shop-now",
                    children: [
                      "Shop Now",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "bg-primary-foreground/10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 text-base px-8 py-3",
                    children: "Our Story"
                  }
                ) })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40", children: heroSlides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goTo(i),
            "aria-label": `Go to slide ${i + 1}`,
            className: `h-1.5 rounded-full transition-smooth ${i === current ? "bg-primary-foreground w-8" : "bg-primary-foreground/40 w-3 hover:bg-primary-foreground/60"}`
          },
          slide.imageUrl
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goTo(current - 1),
            "aria-label": "Previous slide",
            className: "absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/25 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goTo(current + 1),
            "aria-label": "Next slide",
            className: "absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/25 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
          }
        )
      ]
    }
  );
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-background", id: "products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-3 inline-flex", children: "Our Products" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Pure Cold Pressed Oils" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-lg mx-auto", children: "Straight from nature to your kitchen — each oil pressed fresh to lock in maximum nutrition and natural flavour." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08, duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
        },
        product.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-secondary", "data-ocid": "home-view-all", children: [
        "View All Products",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-muted/40 leaf-pattern", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic mb-3 inline-flex", children: "Why Farm72?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title", children: [
              "Good Oils Make ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Good Living" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-lg mx-auto", children: "We believe in food that nourishes — not just fills. Our cold-pressed process preserves every nutrient nature packed in." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: benefits.map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12, duration: 0.45 },
          className: "bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-smooth text-center group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(benefit.icon, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: benefit.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: benefit.description })
          ]
        },
        benefit.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -24 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-bold text-foreground mb-4", children: [
                "Your Oil. Your Health.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Make the Right Choice." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: "Most commercial oils are refined with high heat and chemicals, destroying natural nutrients. Our Kacchi Ghani process presses at low temperatures to retain every nutrient, enzyme, and antioxidant." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                { label: "Extraction Temp", cold: "< 40°C", hot: "> 200°C" },
                { label: "Nutrient Retention", cold: "100%", hot: "< 40%" },
                {
                  label: "Chemicals Used",
                  cold: "None",
                  hot: "Hexane + others"
                },
                {
                  label: "Natural Colour",
                  cold: "Preserved",
                  hot: "Bleached"
                }
              ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-background rounded-xl p-4 shadow-subtle border border-border",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: row.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: row.cold }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "vs" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground line-through", children: row.hot })
                    ] })
                  ]
                },
                row.label
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&q=80",
                  alt: "Organic farm with fresh produce",
                  className: "rounded-2xl shadow-elevated object-cover w-full h-80 md:h-96"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-card-hover border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: "72+" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Years of tradition" })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-primary", "data-ocid": "cta-strip", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "container mx-auto px-4 sm:px-6 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4", children: "Experience the Purity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto", children: "Order today and taste the difference of genuine cold-pressed oils — fresh, natural, and full of life." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base px-8 py-3 shadow-elevated transition-smooth",
              "data-ocid": "cta-shop-now",
              children: [
                "Shop Now",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ]
      }
    ) })
  ] });
}
export {
  Home
};
