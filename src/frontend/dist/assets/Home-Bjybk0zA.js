import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, B as Button, u as useActor, r as reactExports, a as useQuery, b as createActor } from "./index-BAxA7QJV.js";
import { P as ProductCard, m as mapBackendProduct } from "./productMapper-BrGABnYZ.js";
import { S as SEO } from "./SEO-CY4G53lg.js";
import { S as Skeleton } from "./skeleton-C3yHk2pE.js";
import { A as ArrowRight } from "./arrow-right-D1jnDhbe.js";
import { L as Leaf } from "./leaf-DNhUpRZX.js";
import { D as Droplets, S as Sprout } from "./sprout-BK6HSCJ6.js";
import { C as ChevronRight } from "./chevron-right-C0Qp-EL3.js";
import "./badge-7s8mIdJR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
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
const FALLBACK_SLIDES = [
  {
    imageUrl: "/assets/images/hero1.png",
    alt: "Farm72 cold pressed oil bottles",
    title: "Pure Cold Pressed Oils",
    subtitle: "Healthy Living Starts Here",
    highlight: "Pressed"
  },
  {
    imageUrl: "/assets/images/hero2.png",
    alt: "Mustard field at sunrise with Farm72 bottle",
    title: "Wood Pressed Tradition",
    subtitle: "Slow. Natural. Powerful",
    highlight: "Tradition"
  },
  {
    imageUrl: "/assets/images/hero3.png",
    alt: "Farm72 product lineup",
    title: "From Pure Seeds",
    subtitle: "Nothing Added. Nothing Removed",
    highlight: "Pure"
  },
  {
    imageUrl: "/assets/images/hero4.jpg",
    alt: "Himalayan Buransh Juice",
    title: "Himalayan Buransh Juice",
    subtitle: "Pure. Refreshing. Naturally Powerful",
    highlight: "Buransh"
  },
  {
    imageUrl: "/assets/images/hero5.jpg",
    alt: "Fresh coconuts with palm leaves",
    title: "Crafted for Purity",
    subtitle: "Premium Quality Oils",
    highlight: "Purity"
  },
  {
    imageUrl: "/assets/images/hero7.jpg",
    alt: "Farm72 Naturals — Straight from Nature to Your Kitchen",
    title: "Farm72 Naturals",
    subtitle: "Straight from Nature to Your Kitchen",
    highlight: "Naturals"
  }
];
function mapBackendSlide(s) {
  const highlight = s.highlight && s.highlight.trim().length > 0 ? s.highlight.trim() : (() => {
    const words = s.title.split(/\s+/);
    return words.find((w) => w.length >= 4 && /^[A-Z]/.test(w)) ?? words[0] ?? "";
  })();
  return {
    imageUrl: s.imageUrl,
    alt: s.title,
    title: s.title,
    subtitle: s.subtitle,
    highlight
  };
}
function HeroCarousel() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [slides, setSlides] = reactExports.useState(null);
  const [current, setCurrent] = reactExports.useState(0);
  const [isAnimating, setIsAnimating] = reactExports.useState(false);
  const [paused, setPaused] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const fetchedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (actorFetching || !actor || fetchedRef.current) return;
    fetchedRef.current = true;
    actor.getHeroSlides().then((backendSlides) => {
      const visible = backendSlides.filter((s) => s.isVisible).sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder));
      setSlides(
        visible.length > 0 ? visible.map(mapBackendSlide) : FALLBACK_SLIDES
      );
    }).catch(() => {
      setSlides(FALLBACK_SLIDES);
    });
  }, [actor, actorFetching]);
  const activeSlides = slides ?? [];
  const slidesReady = slides !== null;
  const goTo = reactExports.useCallback(
    (index) => {
      if (isAnimating || activeSlides.length === 0) return;
      setIsAnimating(true);
      setCurrent((index + activeSlides.length) % activeSlides.length);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating, activeSlides.length]
  );
  reactExports.useEffect(() => {
    if (paused || activeSlides.length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, activeSlides.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative h-[88vh] min-h-[580px] max-h-[820px] overflow-hidden",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      children: [
        !slidesReady && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/10 animate-pulse z-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-8 md:px-16 lg:px-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm md:max-w-md lg:max-w-lg space-y-4 bg-black/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 md:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 rounded-full bg-white/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-3/4 rounded-lg bg-white/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 rounded-full bg-amber-400/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-2/3 rounded-lg bg-white/15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-28 rounded-full bg-white/25" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-28 rounded-full bg-white/10" })
          ] })
        ] }) }) }),
        activeSlides.map((slide, slideIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 transition-opacity duration-700 ${slideIdx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`,
            style: {
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            },
            role: "img",
            "aria-label": slide.alt,
            children: slideIdx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: slide.imageUrl,
                alt: "",
                "aria-hidden": "true",
                fetchPriority: "high",
                loading: "eager",
                className: "absolute w-0 h-0 opacity-0 pointer-events-none"
              }
            )
          },
          `slide-bg-${slide.imageUrl}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hero-overlay z-20" }),
        activeSlides.length > 0 && activeSlides[Math.min(current, activeSlides.length - 1)] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-30 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-8 md:px-16 lg:px-24", children: (() => {
          const slide = activeSlides[Math.min(current, activeSlides.length - 1)];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -32 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
              className: "max-w-sm md:max-w-md lg:max-w-lg bg-black/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 md:p-10 shadow-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-amber-400/80 text-xs uppercase tracking-widest font-medium mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-3.5 h-3.5" }),
                  "Farm72 · Pure & Natural"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight", children: slide.highlight ? (() => {
                  const parts = slide.title.split(slide.highlight);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    parts[0],
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#D4A847" }, children: slide.highlight }),
                    parts[1]
                  ] });
                })() : slide.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-px bg-amber-400 mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-xs sm:text-sm uppercase tracking-widest font-medium", children: slide.subtitle ?? "" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "bg-white text-green-900 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-amber-400 hover:text-white transition-all duration-200",
                      "data-ocid": "hero-shop-now",
                      children: "SHOP NOW →"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "border border-white/60 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/20 transition-all duration-200",
                      children: "OUR STORY"
                    }
                  ) })
                ] })
              ]
            },
            current
          );
        })() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40", children: activeSlides.map((slide, dotIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goTo(dotIdx),
            "aria-label": `Go to slide ${dotIdx + 1}`,
            className: `h-1.5 rounded-full transition-smooth ${dotIdx === current ? "bg-primary-foreground w-8" : "bg-primary-foreground/40 w-3 hover:bg-primary-foreground/60"}`
          },
          `dot-${slide.imageUrl}`
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
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl overflow-hidden shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28 rounded-lg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-lg" })
    ] })
  ] });
}
function FeaturedProducts() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { data: backendProducts, isLoading } = useQuery({
    queryKey: ["products-home"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getProducts();
      return raw.filter((p) => p.isVisible).sort(
        (a, b) => Number(a.displayOrder) - Number(b.displayOrder)
      ).map(mapBackendProduct);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 6e4
  });
  const products = backendProducts ?? [];
  const showSkeletons = isLoading || actorFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5", children: showSkeletons ? Array.from({ length: 6 }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, i)
  )) : products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.08, duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
    },
    product.id
  )) });
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Farm72 — Pure Cold Pressed Oils & Buransh Juice",
        description: "Shop 100% pure Kacchi Ghani cold-pressed oils and Himalayan Buransh Juice online. Natural, chemical-free, traditional extraction."
      }
    ),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Pure Cold Pressed Oils & Buransh Juice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-subtitle mt-2 max-w-lg mx-auto", children: "Straight from nature to your kitchen — each oil pressed fresh to lock in maximum nutrition and natural flavour." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedProducts, {}),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-white mb-4", children: "Experience the Purity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-lg mb-8 max-w-md mx-auto", children: "Order today and taste the difference of genuine cold-pressed oils — fresh, natural, and full of life." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-white text-primary hover:bg-white/90 font-bold text-base px-8 py-3 shadow-elevated transition-smooth",
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
