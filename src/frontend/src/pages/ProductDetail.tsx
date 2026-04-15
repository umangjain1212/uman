import { createActor } from "@/backend";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getProductById, products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Leaf,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ProductDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const items = useCartStore((s) => s.items);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Variant selector — default to last (largest) variant
  const product = getProductById(id);
  const defaultVariantIdx = product?.variants ? product.variants.length - 1 : 0;
  const [selectedVariantIdx, setSelectedVariantIdx] =
    useState(defaultVariantIdx);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Leaf className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This product doesn't exist or may have been removed.
        </p>
        <Link to="/shop">
          <Button className="btn-primary" data-ocid="product-not-found-back">
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const activeVariant = product.variants
    ? product.variants[selectedVariantIdx]
    : null;
  const basePrice = activeVariant ? activeVariant.price : product.price;
  const baseOriginalPrice = activeVariant
    ? activeVariant.originalPrice
    : product.originalPrice;

  const discountAmount = Math.round((basePrice * couponDiscount) / 100);
  const finalPrice = basePrice - discountAmount;

  const cartItemId = activeVariant
    ? `${product.id}-${activeVariant.size.replace(/\s+/g, "")}`
    : product.id;
  const inCart = items.find((i) => i.productId === cartItemId);

  // Related: same category first, fallback to random excluding current
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const related =
    sameCategory.length >= 3
      ? sameCategory.slice(0, 3)
      : [
          ...sameCategory,
          ...products
            .filter(
              (p) => p.id !== product.id && p.category !== product.category,
            )
            .slice(0, 3 - sameCategory.length),
        ];

  function changeQty(delta: number) {
    setQty((prev) => Math.min(99, Math.max(1, prev + delta)));
  }

  function handleQtyInput(val: string) {
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
        toast.success(`Coupon applied! ${pct}% discount`, {
          description: `Save ₹${Math.round((basePrice * pct) / 100)} on this product`,
          duration: 3000,
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
    if (!product) return;
    const itemName = activeVariant
      ? `${product.name} – ${activeVariant.size}`
      : product.name;

    if (inCart) {
      updateQuantity(cartItemId, inCart.quantity + qty);
    } else {
      addItem({
        productId: cartItemId,
        name: itemName,
        price: finalPrice,
        imageUrl: product.imageUrl,
      });
      if (qty > 1) updateQuantity(cartItemId, qty);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    toast.success(`${itemName} added to cart`, {
      description: `${qty} × ₹${finalPrice} = ₹${finalPrice * qty}${couponDiscount > 0 ? ` (${couponDiscount}% off applied)` : ""}`,
      action: {
        label: "View Cart",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  }

  // Reset coupon when variant changes
  function handleVariantChange(idx: number) {
    setSelectedVariantIdx(idx);
    if (appliedCoupon) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponInput("");
    }
  }

  return (
    <div className="py-8 min-h-screen">
      {/* SEO */}
      <SEO
        title={`${product.name} — Farm72 | Pure Cold Pressed Oils`}
        description={product.shortDescription ?? product.description}
        type="product"
        product={{
          name: product.name,
          price: finalPrice,
          image: product.imageUrl,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 flex-wrap"
        >
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-200"
            data-ocid="breadcrumb-home"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link
            to="/shop"
            className="hover:text-primary transition-colors duration-200"
            data-ocid="breadcrumb-shop"
          >
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[180px]">
            {product.name}
          </span>
        </nav>

        {/* Main Layout */}
        <div className="grid md:grid-cols-[3fr_2fr] gap-10 lg:gap-16 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {product.tag && (
              <div className="absolute top-4 left-4">
                <span className="badge-organic text-sm font-semibold px-3 py-1">
                  {product.tag}
                </span>
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-5"
          >
            {/* Category badge + name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="bg-accent/15 text-accent border-0 font-medium"
                  data-ocid="product-category-badge"
                >
                  {product.category}
                </Badge>
                {product.category === "Oils" && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0 font-medium"
                  >
                    Cold Pressed
                  </Badge>
                )}
                {product.category === "Beverages" && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0 font-medium"
                  >
                    Himalayan Natural
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground">{product.weight}</p>
            </div>

            {/* Variant selector */}
            {product.variants && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-foreground/80">
                  Choose Size:
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={variant.size}
                      type="button"
                      onClick={() => handleVariantChange(idx)}
                      className={`flex flex-col items-start px-4 py-3 rounded-xl border-2 text-left transition-colors duration-200 min-w-[110px] ${
                        selectedVariantIdx === idx
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      data-ocid={`size-variant-${variant.size.replace(/\s+/g, "")}`}
                    >
                      <span className="font-semibold text-sm text-foreground">
                        {variant.size}
                      </span>
                      <span className="font-bold text-lg text-primary">
                        ₹{variant.price}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{variant.originalPrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p
                className="font-display text-4xl font-extrabold text-primary"
                data-ocid="product-price"
              >
                ₹{finalPrice}
              </p>
              {couponDiscount > 0 && (
                <span className="font-display text-xl text-muted-foreground line-through opacity-60">
                  ₹{basePrice}
                </span>
              )}
              <span className="text-xs text-muted-foreground line-through opacity-60">
                ₹{baseOriginalPrice}
              </span>
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                {couponDiscount > 0
                  ? `${Math.round(((baseOriginalPrice - finalPrice) / baseOriginalPrice) * 100)}% off`
                  : "25% off"}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
              {product.longDescription}
            </p>

            <Separator />

            {/* Benefits checklist */}
            <div>
              <h3 className="font-display font-semibold text-base mb-3">
                Key Benefits
              </h3>
              <ul className="flex flex-col gap-2.5">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </span>
                    <span className="text-foreground/85">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Coupon Code */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="coupon-input"
                className="text-sm font-medium text-foreground/80 flex items-center gap-1.5"
              >
                <Tag className="w-4 h-4 text-primary" />
                Have a coupon code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-4 py-2.5">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-semibold text-accent flex-1">
                    {appliedCoupon} — {couponDiscount}% off applied!
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Remove coupon"
                    data-ocid="coupon-remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    id="coupon-input"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      if (couponError) setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className={`flex-1 ${couponError ? "border-destructive" : ""}`}
                    data-ocid="coupon-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-ocid="coupon-apply"
                  >
                    Apply
                  </Button>
                </div>
              )}
              {couponError && (
                <p
                  className="text-destructive text-xs"
                  data-ocid="coupon-error"
                >
                  {couponError}
                </p>
              )}
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="qty-input"
                className="text-sm font-medium text-foreground/80"
              >
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card shadow-sm">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => changeQty(-1)}
                    disabled={qty <= 1}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    data-ocid="qty-decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    id="qty-input"
                    type="number"
                    min={1}
                    max={99}
                    value={qty}
                    onChange={(e) => handleQtyInput(e.target.value)}
                    className="w-12 h-10 text-center text-base font-semibold bg-transparent border-0 outline-none text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    data-ocid="qty-input"
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => changeQty(1)}
                    disabled={qty >= 99}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    data-ocid="qty-increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {inCart && (
                  <span className="text-sm text-muted-foreground">
                    {inCart.quantity} already in cart
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col gap-2.5 pt-1">
              <Button
                onClick={handleAddToCart}
                className={`w-full text-base py-3 transition-all duration-300 ${added ? "btn-success" : "btn-primary"}`}
                data-ocid="product-add-to-cart"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {inCart
                      ? `Add ${qty} More`
                      : `Add ${qty > 1 ? `${qty} to` : "to"} Cart`}
                  </>
                )}
              </Button>

              {inCart && (
                <Link to="/cart">
                  <Button
                    variant="outline"
                    className="w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    data-ocid="product-view-cart"
                  >
                    View Cart ({inCart.quantity} items)
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(product.category === "Oils"
                ? ["100% Natural", "No Chemicals", "Lab Tested", "Kacchi Ghani"]
                : [
                    "100% Natural",
                    "No Chemicals",
                    "Himalayan Origin",
                    "Preservative Free",
                  ]
              ).map((badge) => (
                <span key={badge} className="badge-organic text-xs">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="border-t border-border pt-12">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl font-bold mb-8"
            >
              You may also like
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
