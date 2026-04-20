import { d as useParams, e as useNavigate, u as useActor, f as useCartStore, r as reactExports, a as useQuery, j as jsxRuntimeExports, L as Link, B as Button, m as motion, X, S as ShoppingCart, g as ue, b as createActor } from "./index-C0X0mL0C.js";
import { P as ProductCard, m as mapBackendProduct } from "./productMapper-B6UY0di6.js";
import { S as SEO } from "./SEO-B8ufLgZH.js";
import { B as Badge } from "./badge-qW4KVvne.js";
import { I as Input } from "./input-BfFViMeu.js";
import { S as Separator } from "./separator-9b2e2q8P.js";
import { S as Skeleton } from "./skeleton-D4oTxPVb.js";
import { L as Leaf } from "./leaf-B5a9PUHh.js";
import { C as ChevronRight } from "./chevron-right-DHquKCDI.js";
import { C as Check } from "./check-CHwJWSJy.js";
import { T as Tag, M as Minus } from "./tag-BRWzWq2K.js";
import { P as Plus } from "./plus-Bx4qz3sh.js";
import "./index-B5tZNyNw.js";
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[3fr_2fr] gap-10 lg:gap-16 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-28 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-28 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" })
      ] })
    ] })
  ] }) });
}
function ProductDetail() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const items = useCartStore((s) => s.items);
  const [qty, setQty] = reactExports.useState(1);
  const [added, setAdded] = reactExports.useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = reactExports.useState(0);
  const [couponInput, setCouponInput] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const [couponError, setCouponError] = reactExports.useState("");
  const [couponDiscount, setCouponDiscount] = reactExports.useState(0);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      const raw = await actor.getProduct(id);
      if (!raw) return null;
      return mapBackendProduct(raw);
    },
    enabled: !!actor && !actorFetching && !!id,
    staleTime: 6e4
  });
  const { data: allProducts = [] } = useQuery({
    queryKey: ["products-shop"],
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
  reactExports.useEffect(() => {
    if (product == null ? void 0 : product.variants) {
      setSelectedVariantIdx(product.variants.length - 1);
    }
  }, [product]);
  if (isLoading || actorFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[50vh] text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This product doesn't exist or may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary", "data-ocid": "product-not-found-back", children: "Back to Shop" }) })
    ] });
  }
  const activeVariant = product.variants ? product.variants[selectedVariantIdx] : null;
  const basePrice = activeVariant ? activeVariant.price : product.price;
  const baseOriginalPrice = activeVariant ? activeVariant.originalPrice : product.originalPrice;
  const discountAmount = Math.round(basePrice * couponDiscount / 100);
  const finalPrice = basePrice - discountAmount;
  const variantId = activeVariant ? activeVariant.size.replace(/\s+/g, "") : void 0;
  const cartItemId = variantId ? `${product.id}-${variantId}` : product.id;
  const inCart = items.find((i) => i.productId === cartItemId);
  const sameCategory = allProducts.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const related = sameCategory.length >= 3 ? sameCategory.slice(0, 3) : [
    ...sameCategory,
    ...allProducts.filter(
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
  async function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    if (!actor) {
      setCouponError("Please try again.");
      return;
    }
    try {
      const result = await actor.validateCoupon(code);
      if (result.__kind__ === "Valid") {
        const pct = Number(result.Valid);
        setAppliedCoupon(code);
        setCouponDiscount(pct);
        setCouponError("");
        ue.success(`Coupon applied! ${pct}% discount`, {
          description: `Save ₹${Math.round(basePrice * pct / 100)} on this product`,
          duration: 3e3
        });
      } else if (result.__kind__ === "Expired") {
        setCouponError("Coupon has expired");
        setAppliedCoupon(null);
        setCouponDiscount(0);
      } else if (result.__kind__ === "Exhausted") {
        setCouponError("Coupon usage limit reached");
        setAppliedCoupon(null);
        setCouponDiscount(0);
      } else if (result.__kind__ === "Inactive") {
        setCouponError("Coupon is not active");
        setAppliedCoupon(null);
        setCouponDiscount(0);
      } else {
        setCouponError("Invalid coupon code");
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    } catch {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    }
  }
  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    setCouponError("");
  }
  function handleAddToCart() {
    const p = product;
    const itemName = activeVariant ? `${p.name} – ${activeVariant.size}` : p.name;
    if (inCart) {
      updateQuantity(cartItemId, inCart.quantity + qty);
    } else {
      addItem({
        productId: cartItemId,
        name: itemName,
        price: finalPrice,
        imageUrl: p.imageUrl,
        variantId,
        variantLabel: activeVariant == null ? void 0 : activeVariant.size
      });
      if (qty > 1) updateQuantity(cartItemId, qty);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2e3);
    ue.success(`${itemName} added to cart`, {
      description: `${qty} × ₹${finalPrice} = ₹${finalPrice * qty}${couponDiscount > 0 ? ` (${couponDiscount}% off applied)` : ""}`,
      action: {
        label: "View Cart",
        onClick: () => navigate({ to: "/cart" })
      }
    });
  }
  function handleVariantChange(idx) {
    setSelectedVariantIdx(idx);
    if (appliedCoupon) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponInput("");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: `${product.name} — Farm72 | Pure Cold Pressed Oils`,
        description: product.shortDescription ?? product.description,
        type: "product",
        product: {
          name: product.name,
          price: finalPrice,
          image: product.imageUrl
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
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
                  className: "w-full h-full object-cover",
                  loading: "lazy"
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
                  product.category === "Oils" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "bg-primary/10 text-primary border-0 font-medium",
                      children: "Cold Pressed"
                    }
                  ),
                  product.category === "Beverages" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "bg-primary/10 text-primary border-0 font-medium",
                      children: "Himalayan Natural"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-2", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: product.weight })
              ] }),
              product.variants && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground/80", children: "Choose Size:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: product.variants.map((variant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleVariantChange(idx),
                    className: `flex flex-col items-start px-4 py-3 rounded-xl border-2 text-left transition-colors duration-200 min-w-[110px] ${selectedVariantIdx === idx ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`,
                    "data-ocid": `size-variant-${variant.size.replace(/\s+/g, "")}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: variant.size }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg text-primary", children: [
                        "₹",
                        variant.price
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                        "₹",
                        variant.originalPrice
                      ] })
                    ]
                  },
                  variant.size
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-display text-4xl font-extrabold text-primary",
                    "data-ocid": "product-price",
                    children: [
                      "₹",
                      finalPrice
                    ]
                  }
                ),
                couponDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-muted-foreground line-through opacity-60", children: [
                  "₹",
                  basePrice
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through opacity-60", children: [
                  "₹",
                  baseOriginalPrice
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full", children: couponDiscount > 0 ? `${Math.round((baseOriginalPrice - finalPrice) / baseOriginalPrice * 100)}% off` : "25% off" })
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "coupon-input",
                    className: "text-sm font-medium text-foreground/80 flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
                      "Have a coupon code?"
                    ]
                  }
                ),
                appliedCoupon ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-4 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-accent flex-1", children: [
                    appliedCoupon,
                    " — ",
                    couponDiscount,
                    "% off applied!"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleRemoveCoupon,
                      className: "text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Remove coupon",
                      "data-ocid": "coupon-remove",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "coupon-input",
                      placeholder: "Enter coupon code",
                      value: couponInput,
                      onChange: (e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        if (couponError) setCouponError("");
                      },
                      onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon(),
                      className: `flex-1 ${couponError ? "border-destructive" : ""}`,
                      "data-ocid": "coupon-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: handleApplyCoupon,
                      className: "border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors",
                      "data-ocid": "coupon-apply",
                      children: "Apply"
                    }
                  )
                ] }),
                couponError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-destructive text-xs",
                    "data-ocid": "coupon-error",
                    children: couponError
                  }
                )
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: (product.category === "Oils" ? ["100% Natural", "No Chemicals", "Lab Tested", "Kacchi Ghani"] : [
                "100% Natural",
                "No Chemicals",
                "Himalayan Origin",
                "Preservative Free"
              ]).map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-organic text-xs", children: badge }, badge)) })
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
    ] })
  ] });
}
export {
  ProductDetail
};
