/**
 * Maps a backend Product (prices in paisa as bigint) to the local Product shape
 * expected by ProductCard and ProductDetail.
 *
 * Backend ProductVariant has:
 *   variantId, variantLabel, price (bigint paisa), stock (bigint)
 *   — no originalPrice per variant.
 *
 * We derive originalPrice as: round(price / 0.75)  →  ~33% markup = 25% off.
 * This keeps the discount badge accurate even when an admin changes prices.
 */
import type { Product as BackendProduct } from "@/backend.d";
import type { Product, ProductVariant } from "@/data/products";

export function mapBackendProduct(p: BackendProduct): Product {
  // Backend stores prices as Nat (integer rupees). Convert bigint → number.
  const price = Math.round(Number(p.price));
  const originalPrice = Math.round(price / 0.75);

  const variants: ProductVariant[] | undefined =
    p.variants.length > 0
      ? p.variants.map((v) => {
          const vPrice = Math.round(Number(v.price));
          const vOriginal = Math.round(vPrice / 0.75);
          return {
            size: v.variantLabel,
            price: vPrice,
            originalPrice: vOriginal,
          };
        })
      : undefined;

  // Derive a weight string from variants if available
  const weight = variants
    ? variants.map((v) => v.size).join(" / ")
    : `${price > 0 ? price : "—"}`;

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
    variants,
  };
}
