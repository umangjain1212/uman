import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { type CartItem, useCartStore } from "@/store/cartStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  CheckCircle,
  CreditCard,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type ShoppingItem, createActor } from "../backend";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type FormErrors = Partial<FormData>;

function buildWhatsAppUrl(
  form: FormData,
  items: CartItem[],
  total: number,
): string {
  const itemLines = items.map(
    (i) =>
      `• ${i.name} × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString("en-IN")}`,
  );
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
    "Please confirm and process my order. Thank you! 🙏",
  ].join("\n");
  return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
}

export function Checkout() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const isSuccess = search?.success === "true";

  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const { actor, isFetching } = useActor(createActor);

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPayingCard, setIsPayingCard] = useState(false);

  // Handle success redirect: show success, clear cart
  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  function validate(): boolean {
    const newErrors: FormErrors = {};
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

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handlePayWithCard() {
    if (!validate()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!actor || isFetching) {
      toast.error("Connecting to backend, please try again in a moment.");
      return;
    }
    setIsPayingCard(true);
    try {
      const shoppingItems: ShoppingItem[] = items.map((item) => ({
        productName: item.name,
        currency: "INR",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100)),
        productDescription: `Farm72 ${item.name} — pure cold-pressed oil`,
      }));
      const successUrl = `${window.location.origin}/checkout?success=true`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const sessionUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );
      window.location.href = sessionUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(
        "Payment setup failed. Please try again or use WhatsApp order.",
      );
    } finally {
      setIsPayingCard(false);
    }
  }

  function handleWhatsApp() {
    if (!validate()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    window.open(buildWhatsAppUrl(form, items, totalPrice), "_blank");
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center px-4">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-accent" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-3xl font-bold mb-3 text-foreground">
            Order Placed Successfully!
          </h2>
          <p className="text-muted-foreground mb-2 max-w-sm mx-auto">
            Thank you for choosing Farm72! Your payment was received.
          </p>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm">
            We'll process your order and dispatch it shortly. Check your email
            for confirmation.
          </p>
          <Button
            onClick={() => navigate({ to: "/shop" })}
            className="btn-primary"
            data-ocid="checkout-continue-shopping"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Nothing to checkout
        </h2>
        <p className="text-muted-foreground mb-6">
          Add products to your cart first.
        </p>
        <Link to="/shop">
          <Button className="btn-primary" data-ocid="checkout-browse">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const deliveryFee = totalPrice >= 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="py-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: Customer Details Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold mb-5">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <Label htmlFor="name" className="mb-1.5 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                    data-ocid="checkout-name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                    data-ocid="checkout-phone"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="mb-1.5 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    data-ocid="checkout-email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <Label htmlFor="address" className="mb-1.5 block">
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="House/Flat no., Street, Area"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                    data-ocid="checkout-address"
                  />
                  {errors.address && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="mb-1.5 block">
                    City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                    data-ocid="checkout-city"
                  />
                  {errors.city && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <Label htmlFor="state" className="mb-1.5 block">
                    State *
                  </Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className={errors.state ? "border-destructive" : ""}
                    data-ocid="checkout-state"
                  />
                  {errors.state && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className="sm:col-span-2">
                  <Label htmlFor="pincode" className="mb-1.5 block">
                    Postal Code *
                  </Label>
                  <Input
                    id="pincode"
                    placeholder="6-digit pincode"
                    value={form.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    className={errors.pincode ? "border-destructive" : ""}
                    data-ocid="checkout-pincode"
                  />
                  {errors.pincode && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment options (mobile: below form, desktop: in right panel) */}
            <div className="lg:hidden bg-card rounded-xl p-6 shadow-card">
              <PaymentButtons
                onPayWithCard={handlePayWithCard}
                onWhatsApp={handleWhatsApp}
                isLoading={isPayingCard}
              />
            </div>
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-4">
                Order Summary
              </h2>

              {/* Item list */}
              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary whitespace-nowrap">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-muted-foreground">Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-accent font-medium">FREE</span>
                ) : (
                  <span className="text-muted-foreground">₹{deliveryFee}</span>
                )}
              </div>
              {deliveryFee === 0 && (
                <p className="text-xs text-accent bg-accent/10 rounded-lg px-3 py-2 mb-4">
                  🎉 You qualify for free shipping on orders above ₹500!
                </p>
              )}

              <Separator className="mb-4" />

              <div className="flex justify-between font-display font-bold text-xl mb-6">
                <span>Total</span>
                <span className="text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Payment buttons — desktop only */}
              <div className="hidden lg:block">
                <PaymentButtons
                  onPayWithCard={handlePayWithCard}
                  onWhatsApp={handleWhatsApp}
                  isLoading={isPayingCard}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface PaymentButtonsProps {
  onPayWithCard: () => void;
  onWhatsApp: () => void;
  isLoading: boolean;
}

function PaymentButtons({
  onPayWithCard,
  onWhatsApp,
  isLoading,
}: PaymentButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={onPayWithCard}
        disabled={isLoading}
        className="btn-primary w-full text-base py-3 gap-2"
        data-ocid="checkout-pay-card"
      >
        <CreditCard className="w-4 h-4" />
        {isLoading ? "Redirecting to Payment…" : "Pay with Card"}
      </Button>

      <div className="flex items-center gap-2 my-1">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <button
        type="button"
        onClick={onWhatsApp}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-medium text-sm transition-smooth"
        data-ocid="checkout-whatsapp"
      >
        <MessageCircle className="w-4 h-4" />
        Order via WhatsApp
      </button>

      <p className="text-center text-xs text-muted-foreground mt-1">
        🔒 Secure payment powered by Stripe
      </p>
    </div>
  );
}
