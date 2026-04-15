import { createActor } from "@/backend";
import type { Product } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function AdminProducts() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getAdminProducts();
    },
    enabled,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const ok = await actor.deleteProduct(id);
      if (!ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted successfully");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.toggleProductVisibility(id);
      if (!result) throw new Error("Toggle failed");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product visibility updated");
    },
    onError: () => toast.error("Failed to toggle visibility"),
  });

  const items = products ?? [];

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((p) => p.category)))],
    [items],
  );

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [items, search, categoryFilter]);

  return (
    <AdminLayout title="Products" breadcrumb={["Products"]}>
      {error && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to load products from backend.</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="admin-products-search-input"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger
            className="w-full sm:w-40"
            data-ocid="admin-products-category-filter"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c} className="capitalize">
                {c === "all" ? "All Categories" : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="btn-primary w-full sm:w-auto"
          onClick={() => navigate({ to: "/admin/products/new" })}
          data-ocid="admin-products-add-button"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr className="admin-table-head">
                <th className="admin-table-cell text-left font-semibold">
                  Product
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Category
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Price
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Variants
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Visible
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["sk1", "sk2", "sk3"].map((k) => (
                  <tr key={k} className="admin-table-row">
                    <td className="admin-table-cell">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-7 w-24" />
                    </td>
                  </tr>
                ))}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="admin-table-cell text-center py-12 text-muted-foreground"
                    data-ocid="admin-products-empty-state"
                  >
                    No products found. Try adjusting your filters.
                  </td>
                </tr>
              )}
              {filtered.map((product, i) => (
                <tr
                  key={product.id}
                  className="admin-table-row"
                  data-ocid={`admin-product-row.item.${i + 1}`}
                >
                  <td className="admin-table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/images/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate max-w-[180px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="admin-table-cell">
                    <Badge variant="outline" className="text-xs capitalize">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="admin-table-cell text-right text-sm font-semibold text-primary">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>
                  <td className="admin-table-cell text-sm text-muted-foreground">
                    {product.variants.length} variant
                    {product.variants.length !== 1 ? "s" : ""}
                  </td>
                  <td className="admin-table-cell text-sm">
                    <span
                      className={
                        product.isVisible
                          ? "text-emerald-600"
                          : "text-muted-foreground"
                      }
                    >
                      {product.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="admin-table-cell">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleMutation.mutate(product.id)}
                        disabled={toggleMutation.isPending}
                        className="admin-action-btn admin-action-view"
                        title="Toggle visibility"
                        data-ocid={`admin-product-visibility.${i + 1}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="admin-action-btn admin-action-edit"
                        title="Edit product"
                        onClick={() =>
                          navigate({
                            to: "/admin/products/$id/edit",
                            params: { id: product.id },
                          })
                        }
                        data-ocid={`admin-product-edit-button.${i + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="admin-action-btn admin-action-delete"
                            title="Delete product"
                            data-ocid={`admin-product-delete-button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-ocid="admin-delete-product-dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete{" "}
                              <strong>{product.name}</strong>? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="admin-delete-product-cancel-button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(product.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              data-ocid="admin-delete-product-confirm-button"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && (
          <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground">
            Showing {filtered.length} of {items.length} products
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
