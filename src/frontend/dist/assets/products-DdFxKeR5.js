import { c as createLucideIcon, j as jsxRuntimeExports, e as Slot, f as cn, g as cva, a as useNavigate, b as useCartStore, B as Button, S as ShoppingCart, d as ue } from "./index-_0pz2Sn_.js";
import { L as Leaf } from "./leaf-BTNEIXZ3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function ProductCard({ product }) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  function handleAddToCart(e) {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
    ue.success(`${product.name} added to cart`, {
      description: `₹${product.price} × 1`,
      duration: 2500
    });
  }
  function handleCardClick() {
    navigate({ to: "/product/$id", params: { id: product.id } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "product-card group flex flex-col bg-card",
      "data-ocid": `product-card-${product.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "relative overflow-hidden aspect-[4/3] w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            onClick: handleCardClick,
            "aria-label": `View details for ${product.name}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" }),
              product.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic text-xs font-semibold", children: product.tag }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-accent" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-start justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              onClick: handleCardClick,
              "aria-label": `View ${product.name}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: [
                    product.category,
                    " · ",
                    product.weight
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-snug line-clamp-2", children: product.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg font-bold text-primary whitespace-nowrap", children: [
                  "₹",
                  product.price
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: product.benefits.slice(0, 2).map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs px-2 py-0.5 bg-accent/10 text-accent border-0 font-normal",
              children: benefit.split("—")[0].trim()
            },
            benefit
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddToCart,
              className: "w-full mt-1 btn-primary font-semibold",
              "data-ocid": `add-to-cart-${product.id}`,
              "aria-label": `Add ${product.name} to cart`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                "Add to Cart"
              ]
            }
          )
        ] })
      ]
    }
  );
}
const products = [
  {
    id: "coconut-oil",
    name: "Cold Pressed Coconut Oil",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
    description: "Virgin cold-pressed from fresh coconuts. Rich in lauric acid for skin, hair & immunity.",
    longDescription: "Our Cold Pressed Coconut Oil is extracted using the traditional Kacchi Ghani process without heat, preserving all the natural nutrients, antioxidants, and medium-chain fatty acids. Perfect for cooking, skincare, and haircare.",
    category: "Oils",
    benefits: [
      "Rich in lauric acid — boosts immunity",
      "Excellent for cooking at medium heat",
      "Deep moisturizer for skin & hair",
      "Supports healthy cholesterol levels"
    ],
    weight: "500 ml",
    tag: "Bestseller"
  },
  {
    id: "sesame-oil",
    name: "Cold Pressed Sesame Oil",
    price: 380,
    imageUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80",
    description: "Traditional til oil pressed at low temperature. Packed with Vitamin E & antioxidants.",
    longDescription: "Our Sesame Oil is cold-pressed from premium white sesame seeds at temperatures below 40°C. It retains its natural earthy aroma, vitamin E, and powerful antioxidants — ideal for cooking, massages, and Ayurvedic therapies.",
    category: "Oils",
    benefits: [
      "High in Vitamin E & B-complex",
      "Natural anti-inflammatory properties",
      "Traditional Ayurvedic massage oil",
      "Enhances flavor in cooking"
    ],
    weight: "500 ml",
    tag: "Popular"
  },
  {
    id: "black-mustard-oil",
    name: "Black Mustard Oil",
    price: 290,
    imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&q=80",
    description: "Pungent cold-pressed black mustard oil. Authentic Kacchi Ghani flavor for traditional cooking.",
    longDescription: "Pressed from premium black mustard seeds using the Kacchi Ghani method, this oil has a bold, pungent aroma that is characteristic of authentic Indian cuisine. Rich in glucosinolates and omega-3 fatty acids.",
    category: "Oils",
    benefits: [
      "Natural antibacterial & antifungal",
      "Rich in omega-3 & omega-6",
      "Stimulates digestion & appetite",
      "Traditional Indian cooking essential"
    ],
    weight: "500 ml"
  },
  {
    id: "yellow-mustard-oil",
    name: "Yellow Mustard Oil",
    price: 270,
    imageUrl: "https://images.unsplash.com/photo-1559181567-c3190b0ada43?w=800&q=80",
    description: "Mild & golden cold-pressed yellow mustard oil. Perfect for everyday Indian cooking.",
    longDescription: "Our Yellow Mustard Oil has a milder, sweeter profile compared to black mustard, making it perfect for everyday cooking. Cold-pressed to retain its natural MUFA content and characteristic yellow color.",
    category: "Oils",
    benefits: [
      "High in monounsaturated fatty acids",
      "Milder taste, versatile in cooking",
      "Natural preservative properties",
      "Good source of vitamin A & E"
    ],
    weight: "500 ml"
  },
  {
    id: "sugarcane-juice",
    name: "Fresh Sugarcane Juice",
    price: 60,
    imageUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
    description: "100% natural sugarcane juice. No added sugar, no preservatives — pure refreshment.",
    longDescription: "Freshly pressed sugarcane juice, packed with natural minerals and enzymes. Contains calcium, potassium, magnesium, and iron that support liver health, immunity, and instant energy.",
    category: "Beverages",
    benefits: [
      "Instant natural energy boost",
      "Rich in iron & electrolytes",
      "Supports liver & kidney health",
      "Natural digestive aid"
    ],
    weight: "250 ml",
    tag: "Fresh"
  }
];
function getProductById(id) {
  return products.find((p) => p.id === id);
}
export {
  Badge as B,
  ChevronRight as C,
  ProductCard as P,
  getProductById as g,
  products as p
};
