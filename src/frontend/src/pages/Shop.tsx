import { createActor } from "@/backend";
import type { Product as BackendProduct } from "@/backend.d";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/data/products";
import { mapBackendProduct } from "@/lib/productMapper";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Filter, Home, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type Category = "All" | "Oils" | "Juice";

const CATEGORIES: Category[] = ["All", "Oils", "Juice"];

const CATEGORY_MAP: Record<Category, string | null> = {
  All: null,
  Oils: "Oils",
  Juice: "Beverages",
};

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"] as const;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SKELETON_KEYS.map((id) => (
        <div
          key={id}
          className="bg-card rounded-2xl overflow-hidden shadow-card"
        >
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const { actor, isFetching: actorFetching } = useActor(createActor);

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products-shop"],
    queryFn: async () => {
      if (!actor) return [];
      console.log("[Shop] fetching products...");
      const raw = await actor.getProducts();
      console.log("[Shop] loaded", raw.length, "products from backend");
      return raw
        .filter((p: BackendProduct) => p.isVisible)
        .sort(
          (a: BackendProduct, b: BackendProduct) =>
            Number(a.displayOrder) - Number(b.displayOrder),
        )
        .map(mapBackendProduct);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 60_000,
  });

  const showSkeletons = isLoading || actorFetching;

  const filtered = allProducts.filter((p) => {
    const mappedCategory = CATEGORY_MAP[category];
    const matchesCategory =
      mappedCategory === null || p.category === mappedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Shop — Farm72 | Cold Pressed Oils &amp; Buransh Juice"
        description="Browse Farm72 pure cold-pressed oils: Coconut, Sesame, Mustard, and Himalayan Buransh Juice. 25% off, natural and chemical-free."
      />
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4"
            aria-label="Breadcrumb"
            data-ocid="shop-breadcrumb"
          >
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-primary transition-smooth"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-foreground font-medium">Shop</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-4xl font-bold text-foreground mb-2 leading-tight">
              Our Products
            </h1>
            <p className="section-subtitle max-w-lg">
              Pure cold-pressed oils and fresh natural drinks — no chemicals, no
              heat damage, just nature's best.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-background border-b border-border sticky top-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border h-9 text-sm"
                data-ocid="shop-search"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className={
                    category === cat
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs font-semibold"
                      : "h-8 text-xs font-medium border-border hover:border-primary hover:text-primary"
                  }
                  data-ocid={`filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        {/* Results count — only shown when not loading */}
        {!showSkeletons && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {category !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-foreground">
                  {category}
                </span>
              </span>
            )}
          </p>
        )}

        {showSkeletons ? (
          <ProductGridSkeleton />
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.38 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="shop-empty-state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 shadow-subtle">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Try adjusting your search term or selecting a different category.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              data-ocid="shop-reset-filters"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
