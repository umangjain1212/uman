import { c as createLucideIcon, j as jsxRuntimeExports, e as Slot, f as cn, g as cva, a as useNavigate, b as useCartStore, r as reactExports, B as Button, S as ShoppingCart, d as ue } from "./index-C6yaLQPH.js";
import { L as Leaf } from "./leaf-D4U0Ib3k.js";
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
  const [selectedVariantIdx, setSelectedVariantIdx] = reactExports.useState(
    product.variants ? product.variants.length - 1 : 0
  );
  const activeVariant = product.variants ? product.variants[selectedVariantIdx] : null;
  const displayPrice = activeVariant ? activeVariant.price : product.price;
  const displayOriginalPrice = activeVariant ? activeVariant.originalPrice : product.originalPrice;
  const discountPct = Math.round(
    (displayOriginalPrice - displayPrice) / displayOriginalPrice * 100
  );
  function handleAddToCart(e) {
    e.stopPropagation();
    const itemName = activeVariant ? `${product.name} – ${activeVariant.size}` : product.name;
    const itemId = activeVariant ? `${product.id}-${activeVariant.size.replace(/\s+/g, "")}` : product.id;
    addItem({
      productId: itemId,
      name: itemName,
      price: displayPrice,
      imageUrl: product.imageUrl
    });
    ue.success(`${itemName} added to cart`, {
      description: `₹${displayPrice} × 1`,
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white", children: [
                discountPct,
                "% OFF"
              ] }) }),
              product.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic text-xs font-semibold", children: product.tag }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-accent" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-start justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              onClick: handleCardClick,
              "aria-label": `View ${product.name}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: [
                    product.category,
                    " · ",
                    product.weight
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-snug line-clamp-2", children: product.name })
                ] }),
                !product.variants && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end flex-shrink-0 ml-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-through leading-none", children: [
                    "₹",
                    product.originalPrice
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg font-bold text-primary leading-tight", children: [
                    "₹",
                    product.price
                  ] })
                ] })
              ]
            }
          ),
          product.variants && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Select Size:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: product.variants.map((variant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedVariantIdx(idx);
                },
                className: `flex flex-col items-start px-3 py-2 rounded-lg border text-left transition-colors duration-200 min-w-[90px] ${selectedVariantIdx === idx ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-foreground"}`,
                "data-ocid": `variant-${product.id}-${variant.size.replace(/\s+/g, "")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold leading-tight", children: variant.size }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-sm font-bold leading-tight ${selectedVariantIdx === idx ? "text-primary" : "text-foreground"}`,
                      children: [
                        "₹",
                        variant.price
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground line-through leading-none", children: [
                    "₹",
                    variant.originalPrice
                  ] })
                ]
              },
              variant.size
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2", children: product.shortDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-1", children: product.benefits.slice(0, 2).map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                product.variants ? `Add ${product.variants[selectedVariantIdx].size} – ₹${displayPrice}` : "Add to Cart"
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
    name: "Coconut Oil",
    price: 1499,
    originalPrice: 1999,
    imageUrl: "/assets/images/coconut-oil.png",
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description: "Premium cold-pressed coconut oil extracted using traditional Kacchi Ghani method. 100% pure, natural, and chemical-free.",
    longDescription: "Our Cold Pressed Coconut Oil is extracted using the traditional Kacchi Ghani process without heat, preserving all the natural nutrients, antioxidants, and medium-chain fatty acids. Perfect for cooking, skincare, and haircare.",
    category: "Oils",
    benefits: [
      "Cold Pressed",
      "Chemical Free",
      "100% Natural",
      "No Preservatives"
    ],
    weight: "500 ml / 1 Litre",
    tag: "Bestseller",
    variants: [
      { size: "500 ml", price: 749, originalPrice: 999 },
      { size: "1 litre", price: 1499, originalPrice: 1999 }
    ]
  },
  {
    id: "sesame-oil-1l",
    name: "Sesame / Til Oil",
    price: 899,
    originalPrice: 1199,
    imageUrl: "/assets/images/sesame-oil-1l.png",
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description: "Pure cold-pressed sesame oil (Til oil) extracted using traditional Kacchi Ghani method. Rich in nutrients.",
    longDescription: "Our Sesame Oil is cold-pressed from premium white sesame seeds at temperatures below 40°C. It retains its natural earthy aroma, vitamin E, and powerful antioxidants — ideal for cooking, massages, and Ayurvedic therapies.",
    category: "Oils",
    benefits: [
      "Cold Pressed",
      "Chemical Free",
      "100% Natural",
      "No Preservatives"
    ],
    weight: "500 ml / 1 Litre",
    tag: "Popular",
    variants: [
      { size: "Half Liter (500 ml)", price: 549, originalPrice: 732 },
      { size: "1 Litre", price: 899, originalPrice: 1199 }
    ]
  },
  {
    id: "black-mustard-oil-1l",
    name: "Black Mustard Oil (1 Liter)",
    price: 499,
    originalPrice: 665,
    imageUrl: "/assets/images/black-mustard-oil-1l.png",
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description: "Pure cold-pressed black mustard oil with strong aroma. Traditional Kacchi Ghani extraction method.",
    longDescription: "Pressed from premium black mustard seeds using the Kacchi Ghani method, this oil has a bold, pungent aroma that is characteristic of authentic Indian cuisine. Rich in glucosinolates and omega-3 fatty acids.",
    category: "Oils",
    benefits: ["Cold Pressed", "Chemical Free", "100% Natural", "Strong Aroma"],
    weight: "1 Liter",
    variants: [{ size: "1 Liter", price: 499, originalPrice: 665 }]
  },
  {
    id: "yellow-mustard-oil-1l",
    name: "Yellow Mustard Oil (1 Liter)",
    price: 599,
    originalPrice: 799,
    imageUrl: "/assets/images/yellow-mustard-oil-1l.png",
    shortDescription: "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.",
    description: "Pure cold-pressed yellow mustard oil with mild flavor. Traditional Kacchi Ghani extraction method.",
    longDescription: "Our Yellow Mustard Oil has a milder, sweeter profile compared to black mustard, making it perfect for everyday cooking. Cold-pressed to retain its natural MUFA content and characteristic yellow color.",
    category: "Oils",
    benefits: ["Cold Pressed", "Chemical Free", "100% Natural", "Mild Flavor"],
    weight: "1 Liter",
    variants: [{ size: "1 Liter", price: 599, originalPrice: 799 }]
  },
  {
    id: "burance-juice-500ml",
    name: "Buransh Juice (500 ml)",
    price: 249,
    originalPrice: 332,
    imageUrl: "/assets/images/burance-juice.png",
    shortDescription: "Freshly extracted natural Himalayan Buransh juice, preservative-free and chemical-free.",
    description: "Freshly extracted natural Buransh (Rhododendron) juice with no preservatives or additives. Pure and healthy.",
    longDescription: "Our Buransh Juice is made from handpicked Himalayan Buransh (Rhododendron) flowers from the Valley of Flowers region. Naturally extracted with no preservatives, no artificial colors, and no additives — a refreshing drink that keeps the body cool in summer and supports digestive health.",
    category: "Beverages",
    benefits: [
      "No Preservatives",
      "No Artificial Colors",
      "Naturally Extracted",
      "Fresh Himalayan Flowers"
    ],
    weight: "250 ml / 500 ml",
    tag: "Fresh",
    variants: [
      { size: "250 ml", price: 139, originalPrice: 185 },
      { size: "500 ml", price: 249, originalPrice: 332 }
    ]
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
