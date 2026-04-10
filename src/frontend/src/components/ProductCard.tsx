import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "@tanstack/react-router";
import { Leaf, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart`, {
      description: `₹${product.price} × 1`,
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

        {product.tag && (
          <div className="absolute top-3 left-3">
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
      <div className="flex flex-col flex-1 p-5 gap-3">
        <button
          type="button"
          className="flex items-start justify-between gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          onClick={handleCardClick}
          aria-label={`View ${product.name}`}
        >
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {product.category} · {product.weight}
            </p>
            <h3 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-2">
              {product.name}
            </h3>
          </div>
          <p className="font-display text-lg font-bold text-primary whitespace-nowrap">
            ₹{product.price}
          </p>
        </button>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
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
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
