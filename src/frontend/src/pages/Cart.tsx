import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type CartItem, useCartStore } from "@/store/cartStore";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const itemLines = items.map(
    (i) => `• ${i.name} × ${i.quantity} = ₹${i.price * i.quantity}`,
  );
  const message = [
    "Hello Farm72! I'd like to place an order:",
    "",
    ...itemLines,
    "",
    `*Total: ₹${total}*`,
    "",
    "Please confirm my order. Thank you!",
  ].join("\n");
  return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
}

export function Cart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center"
        data-ocid="cart-empty-state"
      >
        <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center mb-6">
          <ShoppingCart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xs">
          Add some pure cold-pressed oils to get started on your healthy
          journey.
        </p>
        <Link to="/shop">
          <Button className="btn-primary" data-ocid="cart-shop-link">
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="section-title">
            Your Cart
            <span className="ml-2 text-muted-foreground font-body text-xl font-normal">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
            data-ocid="cart-continue-shopping"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="bg-card rounded-xl p-4 flex gap-4 shadow-card"
                  data-ocid={`cart-item-${item.productId}`}
                >
                  {/* Product image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {item.name}
                      </h3>
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth flex-shrink-0"
                        aria-label={`Remove ${item.name} from cart`}
                        data-ocid={`cart-remove-${item.productId}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-primary font-bold text-lg mt-0.5">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {/* Quantity controls with editable input */}
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="px-3 py-1.5 hover:bg-muted transition-smooth text-foreground"
                          aria-label="Decrease quantity"
                          data-ocid={`cart-qty-dec-${item.productId}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value, 10);
                            if (!Number.isNaN(val) && val > 0) {
                              updateQuantity(item.productId, val);
                            }
                          }}
                          className="w-12 py-1.5 text-sm font-semibold text-center bg-transparent focus:outline-none text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label={`Quantity for ${item.name}`}
                          data-ocid={`cart-qty-input-${item.productId}`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-3 py-1.5 hover:bg-muted transition-smooth text-foreground"
                          aria-label="Increase quantity"
                          data-ocid={`cart-qty-inc-${item.productId}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="text-sm font-semibold text-foreground">
                        = ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="bg-card rounded-xl p-6 shadow-card sticky top-24"
              data-ocid="cart-order-summary"
            >
              <h2 className="font-display text-lg font-bold mb-4">
                Order Summary
              </h2>

              {/* Per-item breakdown */}
              <div className="flex flex-col gap-2 text-sm mb-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-muted-foreground"
                  >
                    <span className="truncate mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-foreground whitespace-nowrap">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Subtotal */}
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Delivery */}
              <div className="flex justify-between text-sm mb-4">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Delivery
                </span>
                <span className="font-semibold text-accent">FREE</span>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 flex items-center gap-2 mb-4">
                <Truck className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-xs text-accent font-medium">
                  Free delivery on all orders
                </p>
              </div>

              <Separator className="mb-4" />

              {/* Total */}
              <div className="flex justify-between font-display font-bold text-xl mb-6">
                <span>Total</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <Link to="/checkout">
                  <Button
                    className="btn-primary w-full text-base"
                    data-ocid="cart-checkout"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={buildWhatsAppMessage(items, totalPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                    data-ocid="cart-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order via WhatsApp
                  </Button>
                </a>

                <Link to="/shop">
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground"
                    data-ocid="cart-back-to-shop"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
