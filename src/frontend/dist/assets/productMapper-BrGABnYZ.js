import { e as useNavigate, f as useCartStore, r as reactExports, j as jsxRuntimeExports, B as Button, S as ShoppingCart, g as ue } from "./index-BAxA7QJV.js";
import { B as Badge } from "./badge-7s8mIdJR.js";
import { L as Leaf } from "./leaf-DNhUpRZX.js";
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
function mapBackendProduct(p) {
  const price = Number(p.price) / 100;
  const originalPrice = Math.round(price / 0.75);
  const variants = p.variants.length > 0 ? p.variants.map((v) => {
    const vPrice = Number(v.price) / 100;
    const vOriginal = Math.round(vPrice / 0.75);
    return {
      size: v.variantLabel,
      price: vPrice,
      originalPrice: vOriginal
    };
  }) : void 0;
  const weight = variants ? variants.map((v) => v.size).join(" / ") : `${price > 0 ? price : "—"}`;
  return {
    id: p.id,
    name: p.name,
    price,
    originalPrice,
    imageUrl: p.imageUrl,
    description: p.description,
    longDescription: p.longDescription,
    shortDescription: p.shortDescription,
    category: p.category,
    benefits: p.benefits,
    weight,
    variants
  };
}
export {
  ProductCard as P,
  mapBackendProduct as m
};
