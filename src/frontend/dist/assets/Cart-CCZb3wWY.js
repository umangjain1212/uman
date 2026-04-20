import { u as useActor, f as useCartStore, r as reactExports, j as jsxRuntimeExports, S as ShoppingCart, L as Link, B as Button, A as AnimatePresence, m as motion, X, b as createActor } from "./index-BAxA7QJV.js";
import { I as Input } from "./input-TjVb1Ywn.js";
import { S as Separator } from "./separator-DktPGJZ6.js";
import { A as ArrowRight } from "./arrow-right-D1jnDhbe.js";
import { A as ArrowLeft } from "./arrow-left-BrkS4mxr.js";
import { M as Minus, T as Tag } from "./tag-Dh9NWnTj.js";
import { P as Plus } from "./plus-YiBHCMfF.js";
import { T as Truck } from "./truck-CMKyDxIj.js";
import { C as CircleCheck } from "./circle-check-C93iAGbs.js";
import { M as MessageCircle } from "./message-circle-D-2EphJM.js";
import "./index-CJTSFYNw.js";
function buildWhatsAppMessage(items, total, couponCode) {
  const itemLines = items.map((i) => {
    const variantPart = i.variantLabel ? ` (${i.variantLabel})` : "";
    return `• ${i.name}${variantPart} × ${i.quantity} = ₹${i.price * i.quantity}`;
  });
  const couponLine = couponCode ? [`Coupon applied: ${couponCode}`] : [];
  const message = [
    "Hello Farm72! I'd like to place an order:",
    "",
    ...itemLines,
    "",
    ...couponLine,
    `*Total: ₹${total}*`,
    "",
    "Please confirm my order. Thank you!"
  ].join("\n");
  return `https://wa.me/917500010488?text=${encodeURIComponent(message)}`;
}
function Cart() {
  const { actor } = useActor(createActor);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const [couponInput, setCouponInput] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const [couponError, setCouponError] = reactExports.useState("");
  const [discountRate, setDiscountRate] = reactExports.useState(0);
  const discountAmount = Math.round(totalPrice * discountRate);
  const finalTotal = totalPrice - discountAmount;
  async function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!actor) {
      setCouponError("Please try again.");
      return;
    }
    try {
      const result = await actor.validateCoupon(code);
      if (result.__kind__ === "Valid") {
        const pct = Number(result.Valid);
        setAppliedCoupon(code);
        setDiscountRate(pct / 100);
        setCouponError("");
        setCouponInput("");
      } else if (result.__kind__ === "Expired") {
        setCouponError("Coupon has expired");
      } else if (result.__kind__ === "Exhausted") {
        setCouponError("Coupon usage limit reached");
      } else if (result.__kind__ === "Inactive") {
        setCouponError("Coupon is not active");
      } else {
        setCouponError("Invalid coupon code");
      }
    } catch {
      setCouponError("Invalid coupon code");
    }
  }
  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setDiscountRate(0);
    setCouponError("");
    setCouponInput("");
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] py-20 text-center",
        "data-ocid": "cart-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-2xl bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-12 h-12 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-xs", children: "Add some pure cold-pressed oils to get started on your healthy journey." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-primary", "data-ocid": "cart-shop-link", children: [
            "Start Shopping",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "section-title", children: [
        "Your Cart",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground font-body text-xl font-normal", children: [
          "(",
          items.length,
          " ",
          items.length === 1 ? "item" : "items",
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/shop",
          className: "flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-smooth",
          "data-ocid": "cart-continue-shopping",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Continue Shopping"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20, scale: 0.97 },
          transition: { duration: 0.25 },
          className: "bg-card rounded-xl p-4 flex gap-4 shadow-card",
          "data-ocid": `cart-item-${item.productId}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.imageUrl,
                alt: item.name,
                className: "w-20 h-20 rounded-lg object-cover flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: item.name }),
                  item.variantLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.variantLabel })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(item.productId, item.variantId),
                    className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0",
                    "aria-label": `Remove ${item.name} from cart`,
                    "data-ocid": `cart-remove-${item.productId}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-bold text-lg mt-0.5", children: [
                "₹",
                item.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(
                        item.productId,
                        item.quantity - 1,
                        item.variantId
                      ),
                      className: "px-3 py-1.5 hover:bg-muted transition-smooth text-foreground",
                      "aria-label": "Decrease quantity",
                      "data-ocid": `cart-qty-dec-${item.productId}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: 1,
                      max: 99,
                      value: item.quantity,
                      onChange: (e) => {
                        const val = Number.parseInt(e.target.value, 10);
                        if (!Number.isNaN(val) && val > 0) {
                          updateQuantity(
                            item.productId,
                            val,
                            item.variantId
                          );
                        }
                      },
                      className: "w-12 py-1.5 text-sm font-semibold text-center bg-transparent focus:outline-none text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                      "aria-label": `Quantity for ${item.name}`,
                      "data-ocid": `cart-qty-input-${item.productId}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(
                        item.productId,
                        item.quantity + 1,
                        item.variantId
                      ),
                      className: "px-3 py-1.5 hover:bg-muted transition-smooth text-foreground",
                      "aria-label": "Increase quantity",
                      "data-ocid": `cart-qty-inc-${item.productId}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                  "= ₹",
                  item.price * item.quantity
                ] })
              ] })
            ] })
          ]
        },
        item.productId
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl p-6 shadow-card sticky top-24",
          "data-ocid": "cart-order-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 text-sm mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate mr-2", children: [
                    item.name,
                    " × ",
                    item.quantity
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground whitespace-nowrap", children: [
                    "₹",
                    item.price * item.quantity
                  ] })
                ]
              },
              item.productId
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                "₹",
                totalPrice
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
                "Delivery"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: "FREE" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-accent flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-medium", children: "Free delivery on all orders" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", "data-ocid": "cart-coupon-section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground mb-2 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 text-primary" }),
                "Coupon Code"
              ] }),
              appliedCoupon ? (
                /* Applied coupon badge */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    className: "flex items-center justify-between bg-primary/10 border border-primary/30 rounded-lg px-3 py-2",
                    "data-ocid": "cart-coupon-applied",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-primary", children: appliedCoupon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary/80", children: [
                            "Coupon applied! ",
                            Math.round(discountRate * 100),
                            "% discount added"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleRemoveCoupon,
                          "aria-label": "Remove coupon",
                          className: "p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-smooth",
                          "data-ocid": "cart-coupon-remove",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  }
                )
              ) : (
                /* Coupon input */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: couponInput,
                      onChange: (e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError("");
                      },
                      onKeyDown: (e) => {
                        if (e.key === "Enter") handleApplyCoupon();
                      },
                      placeholder: "Enter coupon code",
                      className: "text-sm h-9 uppercase placeholder:normal-case",
                      "data-ocid": "cart-coupon-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: handleApplyCoupon,
                      disabled: !couponInput.trim(),
                      className: "h-9 px-3 text-xs font-semibold border-primary/40 text-primary hover:bg-primary/10 flex-shrink-0",
                      "data-ocid": "cart-coupon-apply",
                      children: "Apply"
                    }
                  )
                ] })
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: couponError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  className: "text-xs text-destructive mt-1.5",
                  "data-ocid": "cart-coupon-error",
                  children: couponError
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: appliedCoupon && discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                    "Discount (",
                    appliedCoupon,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
                    "-₹",
                    discountAmount
                  ] })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-xl mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                "₹",
                finalTotal
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "btn-primary w-full text-base",
                  "data-ocid": "cart-checkout",
                  children: [
                    "Proceed to Checkout",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: buildWhatsAppMessage(
                    items,
                    finalTotal,
                    appliedCoupon ?? void 0
                  ),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]",
                      "data-ocid": "cart-whatsapp",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                        "Order via WhatsApp"
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  className: "w-full text-muted-foreground hover:text-foreground",
                  "data-ocid": "cart-back-to-shop",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    "Continue Shopping"
                  ]
                }
              ) })
            ] })
          ]
        }
      ) })
    ] })
  ] }) });
}
export {
  Cart
};
