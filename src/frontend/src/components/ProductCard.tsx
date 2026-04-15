import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "@tanstack/react-router";
import { Leaf, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  // For variant products, default to last (largest) variant
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(
    product.variants ? product.variants.length - 1 : 0,
  );

  const activeVariant = product.variants
    ? product.variants[selectedVariantIdx]
    : null;
  const displayPrice = activeVariant ? activeVariant.price : product.price;
  const displayOriginalPrice = activeVariant
    ? activeVariant.originalPrice
    : product.originalPrice;

  const discountPct = Math.round(
    ((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100,
  );

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    const itemName = activeVariant
      ? `${product.name} – ${activeVariant.size}`
      : product.name;
    const itemId = activeVariant
      ? `${product.id}-${activeVariant.size.replace(/\s+/g, "")}`
      : product.id;
    addItem({
      productId: itemId,
      name: itemName,
      price: displayPrice,
      imageUrl: product.imageUrl,
    });
    toast.success(`${itemName} added to cart`, {
      description: `₹${displayPrice} × 1`,
      duration: 2500,
    });
  }

  function handleCardClick() {
    navigate({ to: "/product/$id", params: { id: product.id } });
  }

  return (
    <div
      className="product-card group flex flex-col bg-card"
      data-ocid={`product-card-${product.id}`}
    >
      {/* Clickable image + header area */}
      <button
        type="button"
        className="relative overflow-hidden aspect-[4/3] w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={handleCardClick}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

        {/* Discount badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
            {discountPct}% OFF
          </span>
        </div>

        {product.tag && (
          <div className="absolute top-3 right-10">
            <span className="badge-organic text-xs font-semibold">
              {product.tag}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-subtle">
          <Leaf className="w-4 h-4 text-accent" />
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <button
          type="button"
          className="flex items-start justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          onClick={handleCardClick}
          aria-label={`View ${product.name}`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {product.category} · {product.weight}
            </p>
            <h3 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-2">
              {product.name}
            </h3>
          </div>
          {/* Price block — only shown for non-variant products */}
          {!product.variants && (
            <div className="flex flex-col items-end flex-shrink-0 ml-2">
              <p className="text-xs text-muted-foreground line-through leading-none">
                ₹{product.originalPrice}
              </p>
              <p className="font-display text-lg font-bold text-primary leading-tight">
                ₹{product.price}
              </p>
            </div>
          )}
        </button>

        {/* Variant size selector with prices */}
        {product.variants && (
          <div className="flex flex-col gap-2 mt-1">
            <p className="text-xs text-muted-foreground font-medium">
              Select Size:
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((variant, idx) => (
                <button
                  key={variant.size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariantIdx(idx);
                  }}
                  className={`flex flex-col items-start px-3 py-2 rounded-lg border text-left transition-colors duration-200 min-w-[90px] ${
                    selectedVariantIdx === idx
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                  data-ocid={`variant-${product.id}-${variant.size.replace(/\s+/g, "")}`}
                >
                  <span className="text-xs font-semibold leading-tight">
                    {variant.size}
                  </span>
                  <span
                    className={`text-sm font-bold leading-tight ${selectedVariantIdx === idx ? "text-primary" : "text-foreground"}`}
                  >
                    ₹{variant.price}
                  </span>
                  <span className="text-[10px] text-muted-foreground line-through leading-none">
                    ₹{variant.originalPrice}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Short description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {product.benefits.slice(0, 2).map((benefit) => (
            <Badge
              key={benefit}
              variant="secondary"
              className="text-xs px-2 py-0.5 bg-accent/10 text-accent border-0 font-normal"
            >
              {benefit.split("—")[0].trim()}
            </Badge>
          ))}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full mt-1 btn-primary font-semibold"
          data-ocid={`add-to-cart-${product.id}`}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.variants
            ? `Add ${product.variants[selectedVariantIdx].size} – ₹${displayPrice}`
            : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
