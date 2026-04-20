import { c as createLucideIcon, e as useNavigate, h as useSearch, f as useCartStore, u as useActor, a as useQuery, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, L as Link, g as ue, P as PaymentMethod, b as createActor } from "./index-C0X0mL0C.js";
import { I as Input } from "./input-BfFViMeu.js";
import { L as Label } from "./label-1pJrw_ov.js";
import { S as Separator } from "./separator-9b2e2q8P.js";
import { C as CircleCheckBig } from "./circle-check-big-Ca8BBiSw.js";
import { S as ShoppingBag } from "./shopping-bag-Ci0SBqfP.js";
import { M as MessageCircle } from "./message-circle-De-Lnjyr.js";
import "./index-B5tZNyNw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const FALLBACK_WHATSAPP = "917500010488";
function buildWhatsAppUrl(form, items, total, whatsappNumber) {
  const rawNumber = whatsappNumber ?? FALLBACK_WHATSAPP;
  const cleanNumber = rawNumber.replace(/^\+/, "").replace(/\s/g, "");
  const safeNumber = cleanNumber || FALLBACK_WHATSAPP;
  const itemLines = items.map((i) => {
    const variantPart = i.variantLabel ? ` (${i.variantLabel})` : "";
    return `• ${i.name}${variantPart} × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString("en-IN")}`;
  });
  const message = [
    "🌿 *Farm72 New Order*",
    "",
    `*Name:* ${form.name}`,
    `*Phone:* ${form.phone}`,
    `*Email:* ${form.email}`,
    `*Address:* ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
    "",
    "*Order Items:*",
    ...itemLines,
    "",
    `*Total: ₹${total.toLocaleString("en-IN")}*`,
    "",
    "Please confirm and process my order. Thank you! 🙏"
  ].join("\n");
  return `https://wa.me/${safeNumber}?text=${encodeURIComponent(message)}`;
}
function Checkout() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const isSuccess = (search == null ? void 0 : search.success) === "true";
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const { actor, isFetching } = useActor(createActor);
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteSettings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [isPayingCard, setIsPayingCard] = reactExports.useState(false);
  const deliveryFee = totalPrice >= 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryFee;
  reactExports.useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone))
      newErrors.phone = "Valid phone number required (e.g. +91 XXXXX XXXXX)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email address required";
    if (!form.address.trim()) newErrors.address = "Street address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Valid 6-digit pincode required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  }
  async function handlePayWithCard() {
    if (!validate()) return;
    if (items.length === 0) {
      ue.error("Your cart is empty");
      return;
    }
    if (!actor || isFetching) {
      ue.error("Connecting to backend, please try again in a moment.");
      return;
    }
    setIsPayingCard(true);
    try {
      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;
      const orderInput = {
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        address: fullAddress,
        totalAmount: BigInt(Math.round(grandTotal)),
        paymentMethod: PaymentMethod.Stripe,
        items: items.map((item) => ({
          productId: item.productId.split("-")[0] ?? item.productId,
          variantId: item.variantId ?? "",
          productName: item.name,
          variantLabel: item.variantLabel ?? "",
          quantity: BigInt(item.quantity),
          unitPrice: BigInt(Math.round(item.price))
        }))
      };
      try {
        await actor.storeOrder(orderInput);
      } catch (orderErr) {
        console.error("storeOrder error:", orderErr);
      }
      const shoppingItems = items.map((item) => ({
        productName: item.name,
        currency: "INR",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100)),
        productDescription: `Farm72 ${item.name} — pure cold-pressed oil`
      }));
      const successUrl = `${window.location.origin}/checkout?success=true`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const sessionUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl
      );
      window.location.href = sessionUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      ue.error(
        "Payment setup failed. Please try again or use WhatsApp order."
      );
    } finally {
      setIsPayingCard(false);
    }
  }
  async function handleWhatsApp() {
    if (!validate()) return;
    if (items.length === 0) {
      ue.error("Your cart is empty");
      return;
    }
    if (!actor || isFetching) {
      ue.error("Connecting to backend, please try again in a moment.");
      return;
    }
    try {
      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;
      const orderInput = {
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        address: fullAddress,
        totalAmount: BigInt(Math.round(grandTotal)),
        paymentMethod: PaymentMethod.WhatsApp,
        items: items.map((item) => ({
          productId: item.productId.split("-")[0] ?? item.productId,
          variantId: item.variantId ?? "",
          productName: item.name,
          variantLabel: item.variantLabel ?? "",
          quantity: BigInt(item.quantity),
          unitPrice: BigInt(Math.round(item.price))
        }))
      };
      const result = await actor.storeOrder(orderInput);
      if (result.__kind__ === "err") {
        console.error("storeOrder error:", result.err);
      }
    } catch (err) {
      console.error("storeOrder exception:", err);
    }
    window.open(
      buildWhatsAppUrl(form, items, totalPrice, siteSettings == null ? void 0 : siteSettings.whatsappNumber),
      "_blank"
    );
  }
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] py-20 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0.7, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", stiffness: 200, damping: 18 },
          className: "w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-accent" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold mb-3 text-foreground", children: "Order Placed Successfully!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2 max-w-sm mx-auto", children: "Thank you for choosing Farm72! Your payment was received." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm mx-auto text-sm", children: "We'll process your order and dispatch it shortly. Check your email for confirmation." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => navigate({ to: "/shop" }),
                className: "btn-primary",
                "data-ocid": "checkout-continue-shopping",
                children: "Continue Shopping"
              }
            )
          ]
        }
      )
    ] });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] py-20 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Nothing to checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Add products to your cart first." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary", "data-ocid": "checkout-browse", children: "Browse Products" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h1,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "section-title mb-8",
        children: "Checkout"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "lg:col-span-3 flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-6 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold mb-5", children: "Delivery Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "mb-1.5 block", children: "Full Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      placeholder: "Enter your full name",
                      value: form.name,
                      onChange: (e) => handleChange("name", e.target.value),
                      className: errors.name ? "border-destructive" : "",
                      "data-ocid": "checkout-name"
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "mb-1.5 block", children: "Phone Number *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      placeholder: "+91 XXXXX XXXXX",
                      value: form.phone,
                      onChange: (e) => handleChange("phone", e.target.value),
                      className: errors.phone ? "border-destructive" : "",
                      "data-ocid": "checkout-phone"
                    }
                  ),
                  errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.phone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "mb-1.5 block", children: "Email Address *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      placeholder: "you@example.com",
                      value: form.email,
                      onChange: (e) => handleChange("email", e.target.value),
                      className: errors.email ? "border-destructive" : "",
                      "data-ocid": "checkout-email"
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", className: "mb-1.5 block", children: "Street Address *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "address",
                      placeholder: "House/Flat no., Street, Area",
                      value: form.address,
                      onChange: (e) => handleChange("address", e.target.value),
                      className: errors.address ? "border-destructive" : "",
                      "data-ocid": "checkout-address"
                    }
                  ),
                  errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.address })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", className: "mb-1.5 block", children: "City *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "city",
                      placeholder: "City",
                      value: form.city,
                      onChange: (e) => handleChange("city", e.target.value),
                      className: errors.city ? "border-destructive" : "",
                      "data-ocid": "checkout-city"
                    }
                  ),
                  errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.city })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", className: "mb-1.5 block", children: "State *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "state",
                      placeholder: "State",
                      value: form.state,
                      onChange: (e) => handleChange("state", e.target.value),
                      className: errors.state ? "border-destructive" : "",
                      "data-ocid": "checkout-state"
                    }
                  ),
                  errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.state })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pincode", className: "mb-1.5 block", children: "Postal Code *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pincode",
                      placeholder: "6-digit pincode",
                      value: form.pincode,
                      onChange: (e) => handleChange("pincode", e.target.value),
                      className: errors.pincode ? "border-destructive" : "",
                      "data-ocid": "checkout-pincode"
                    }
                  ),
                  errors.pincode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: errors.pincode })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden bg-card rounded-xl p-6 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PaymentButtons,
              {
                onPayWithCard: handlePayWithCard,
                onWhatsApp: handleWhatsApp,
                isLoading: isPayingCard
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "lg:col-span-2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-6 shadow-card sticky top-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.imageUrl,
                  alt: item.name,
                  className: "w-12 h-12 rounded-lg object-cover flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: item.name }),
                item.variantLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.variantLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "× ",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary whitespace-nowrap", children: [
                "₹",
                (item.price * item.quantity).toLocaleString("en-IN")
              ] })
            ] }, item.productId)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                totalPrice.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
              deliveryFee === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "FREE" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "₹",
                deliveryFee
              ] })
            ] }),
            deliveryFee === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent bg-accent/10 rounded-lg px-3 py-2 mb-4", children: "🎉 You qualify for free shipping on orders above ₹500!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-xl mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                "₹",
                grandTotal.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PaymentButtons,
              {
                onPayWithCard: handlePayWithCard,
                onWhatsApp: handleWhatsApp,
                isLoading: isPayingCard
              }
            ) })
          ] })
        }
      )
    ] })
  ] }) });
}
function PaymentButtons({
  onPayWithCard,
  onWhatsApp,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: onPayWithCard,
        disabled: isLoading,
        className: "btn-primary w-full text-base py-3 gap-2",
        "data-ocid": "checkout-pay-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
          isLoading ? "Redirecting to Payment…" : "Pay with Card"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 my-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onWhatsApp,
        className: "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-medium text-sm transition-smooth",
        "data-ocid": "checkout-whatsapp",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
          "Order via WhatsApp"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-1", children: "🔒 Secure payment powered by Stripe" })
  ] });
}
export {
  Checkout
};
