import { c as createLucideIcon, u as useParams, a as useNavigate, b as useCartStore, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, S as ShoppingCart, d as ue } from "./index-_0pz2Sn_.js";
import { g as getProductById, p as products, C as ChevronRight, B as Badge, P as ProductCard } from "./products-DdFxKeR5.js";
import { S as Separator } from "./separator-wwn0YEi-.js";
import { L as Leaf } from "./leaf-BTNEIXZ3.js";
import { m as motion } from "./proxy-D2zCQ6DC.js";
import { M as Minus, P as Plus } from "./plus-B29ZL3E1.js";
import "./index-C56IEFcU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const items = useCartStore((s) => s.items);
  const [qty, setQty] = reactExports.useState(1);
  const [added, setAdded] = reactExports.useState(false);
  const product = getProductById(id);
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[50vh] text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This product doesn't exist or may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary", "data-ocid": "product-not-found-back", children: "Back to Shop" }) })
    ] });
  }
  const inCart = items.find((i) => i.productId === product.id);
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const related = sameCategory.length >= 3 ? sameCategory.slice(0, 3) : [
    ...sameCategory,
    ...products.filter(
      (p) => p.id !== product.id && p.category !== product.category
    ).slice(0, 3 - sameCategory.length)
  ];
  function changeQty(delta) {
    setQty((prev) => Math.min(99, Math.max(1, prev + delta)));
  }
  function handleQtyInput(val) {
    const parsed = Number.parseInt(val, 10);
    if (!Number.isNaN(parsed)) setQty(Math.min(99, Math.max(1, parsed)));
  }
  function handleAddToCart() {
    const p = product;
    if (inCart) {
      updateQuantity(p.id, inCart.quantity + qty);
    } else {
      addItem({
        productId: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl
      });
      if (qty > 1) updateQuantity(p.id, qty);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2e3);
    ue.success(`${p.name} added to cart`, {
      description: `${qty} × ₹${p.price} = ₹${p.price * qty}`,
      action: {
        label: "View Cart",
        onClick: () => navigate({ to: "/cart" })
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        "aria-label": "Breadcrumb",
        className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "hover:text-primary transition-colors duration-200",
              "data-ocid": "breadcrumb-home",
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              className: "hover:text-primary transition-colors duration-200",
              "data-ocid": "breadcrumb-shop",
              children: "Shop"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[180px]", children: product.name })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[3fr_2fr] gap-10 lg:gap-16 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl overflow-hidden shadow-elevated bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            product.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic text-sm font-semibold px-3 py-1", children: product.tag }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45 },
          className: "flex flex-col gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-accent/15 text-accent border-0 font-medium",
                    "data-ocid": "product-category-badge",
                    children: product.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-primary/10 text-primary border-0 font-medium",
                    children: "Cold Pressed"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-2", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: product.weight })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-display text-4xl font-extrabold text-primary",
                  "data-ocid": "product-price",
                  children: [
                    "₹",
                    product.price
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through opacity-60", children: [
                "₹",
                Math.round(product.price * 1.25)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full", children: "20% off" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-[0.95rem]", children: product.longDescription }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base mb-3", children: "Key Benefits" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5", children: product.benefits.map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-2.5 text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-accent" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/85", children: benefit })
                  ]
                },
                benefit
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "qty-input",
                  className: "text-sm font-medium text-foreground/80",
                  children: "Quantity"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-xl overflow-hidden bg-card shadow-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Decrease quantity",
                      onClick: () => changeQty(-1),
                      disabled: qty <= 1,
                      className: "w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                      "data-ocid": "qty-decrease",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "qty-input",
                      type: "number",
                      min: 1,
                      max: 99,
                      value: qty,
                      onChange: (e) => handleQtyInput(e.target.value),
                      className: "w-12 h-10 text-center text-base font-semibold bg-transparent border-0 outline-none text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                      "data-ocid": "qty-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Increase quantity",
                      onClick: () => changeQty(1),
                      disabled: qty >= 99,
                      className: "w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                      "data-ocid": "qty-increase",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                inCart && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  inCart.quantity,
                  " already in cart"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleAddToCart,
                  className: `w-full text-base py-3 transition-all duration-300 ${added ? "btn-success" : "btn-primary"}`,
                  "data-ocid": "product-add-to-cart",
                  children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }),
                    "Added to Cart!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5" }),
                    inCart ? `Add ${qty} More` : `Add ${qty > 1 ? `${qty} to` : "to"} Cart`
                  ] })
                }
              ),
              inCart && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200",
                  "data-ocid": "product-view-cart",
                  children: [
                    "View Cart (",
                    inCart.quantity,
                    " items)"
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: [
              "100% Natural",
              "No Chemicals",
              "Lab Tested",
              "Kacchi Ghani"
            ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic text-xs", children: badge }, badge)) })
          ]
        }
      )
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border-t border-border pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "font-display text-2xl font-bold mb-8",
          children: "You may also like"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p })
        },
        p.id
      )) })
    ] })
  ] }) });
}
export {
  ProductDetail
};
