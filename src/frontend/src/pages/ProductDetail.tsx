import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductById, products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Leaf,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const items = useCartStore((s) => s.items);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(id);

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

  const inCart = items.find((i) => i.productId === product.id);

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

  function handleAddToCart() {
    const p = product!;
    if (inCart) {
      updateQuantity(p.id, inCart.quantity + qty);
    } else {
      // addItem sets quantity to 1, then bump to chosen qty
      addItem({
        productId: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
      });
      if (qty > 1) updateQuantity(p.id, qty);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    toast.success(`${p.name} added to cart`, {
      description: `${qty} × ₹${p.price} = ₹${p.price * qty}`,
      action: {
        label: "View Cart",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  }

  return (
    <div className="py-8 min-h-screen">
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
          {/* Product Image — 60% width on desktop via grid proportion */}
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
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0 font-medium"
                >
                  Cold Pressed
                </Badge>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground">{product.weight}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p
                className="font-display text-4xl font-extrabold text-primary"
                data-ocid="product-price"
              >
                ₹{product.price}
              </p>
              <span className="text-sm text-muted-foreground line-through opacity-60">
                ₹{Math.round(product.price * 1.25)}
              </span>
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                20% off
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
              {[
                "100% Natural",
                "No Chemicals",
                "Lab Tested",
                "Kacchi Ghani",
              ].map((badge) => (
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
