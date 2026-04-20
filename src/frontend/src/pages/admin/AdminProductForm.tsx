import { createActor } from "@/backend";
import type { ProductInput } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/hooks/useAdmin";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ImagePlus, Loader2, Plus, Save, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["Oils", "Beverages"];

interface VariantForm {
  _key: string;
  variantId: string;
  variantLabel: string;
  price: number;
  stock: number;
}

interface FormState {
  name: string;
  shortDescription: string;
  longDescription: string;
  description: string;
  category: string;
  imageUrl: string;
  benefits: string;
  isVisible: boolean;
  displayOrder: number;
  variants: VariantForm[];
}

const newVariant = (): VariantForm => ({
  _key: crypto.randomUUID(),
  variantId: crypto.randomUUID(),
  variantLabel: "",
  price: 0,
  stock: 100,
});

const EMPTY_FORM: FormState = {
  name: "",
  shortDescription: "",
  longDescription: "",
  description: "",
  category: "Oils",
  imageUrl: "",
  benefits: "",
  isVisible: true,
  displayOrder: 0,
  variants: [newVariant()],
};

export function AdminProductForm() {
  const params = useParams({ strict: false }) as { id?: string };
  const productId = params.id === "new" ? undefined : params.id;
  const isEdit = !!productId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated } = useAdmin();
  const enabled = !!actor && !actorFetching && isAuthenticated;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing product for edit — use admin API so hidden products can be loaded
  const { data: existingProduct, isLoading: loadingProduct } = useQuery({
    queryKey: ["admin-product", productId],
    queryFn: async () => {
      if (!actor || !productId) return null;
      const result = await actor.getAdminProducts();
      if (result.__kind__ === "ok") {
        return result.ok.find((p) => p.id === productId) ?? null;
      }
      throw new Error(result.err);
    },
    enabled: enabled && isEdit,
  });

  useEffect(() => {
    if (existingProduct) {
      setForm({
        name: existingProduct.name,
        shortDescription: existingProduct.shortDescription,
        longDescription: existingProduct.longDescription,
        description: existingProduct.description,
        category: existingProduct.category,
        imageUrl: existingProduct.imageUrl,
        benefits: existingProduct.benefits.join(", "),
        isVisible: existingProduct.isVisible,
        displayOrder: Number(existingProduct.displayOrder),
        variants: existingProduct.variants.map((v) => ({
          _key: crypto.randomUUID(),
          variantId: v.variantId,
          variantLabel: v.variantLabel,
          price: Number(v.price),
          stock: Number(v.stock),
        })),
      });
    }
  }, [existingProduct]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      console.log(
        "[AdminProductForm] saveMutation start — isEdit:",
        isEdit,
        "productId:",
        productId,
      );
      const input: ProductInput = {
        id: productId ?? crypto.randomUUID(),
        name: form.name,
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
        description: form.description || form.shortDescription,
        category: form.category,
        imageUrl: form.imageUrl,
        benefits: form.benefits
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
        isVisible: form.isVisible,
        displayOrder: BigInt(form.displayOrder),
        price: BigInt(form.variants[0]?.price ?? 0),
        variants: form.variants.map((v) => ({
          variantId: v.variantId,
          variantLabel: v.variantLabel,
          price: BigInt(v.price),
          stock: BigInt(v.stock),
        })),
      };
      if (isEdit && productId) {
        const result = await actor.updateProduct(productId, input);
        if (result.__kind__ === "ok") {
          console.log("[AdminProductForm] updateProduct success:", result.ok);
          return result.ok;
        }
        throw new Error(result.err);
      }
      const result = await actor.addProduct(input);
      if (result.__kind__ === "ok") {
        console.log("[AdminProductForm] addProduct success:", result.ok);
        return result.ok;
      }
      throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(isEdit ? "Product updated!" : "Product created!");
      navigate({ to: "/admin/products" });
    },
    onError: (err) => {
      console.error("[AdminProductForm] save error:", err);
      toast.error(
        `Failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    },
  });

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setVariant(
    index: number,
    key: keyof VariantForm,
    value: string | number,
  ) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, [key]: value } : v,
      ),
    }));
  }

  function addVariant() {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant()],
    }));
  }

  function removeVariant(index: number) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !actor) return;
    // Reset input so same file can be re-selected
    e.target.value = "";

    setImageUploading(true);
    setImageUploadProgress("Getting upload URL...");
    try {
      const result = await actor.getImageUploadUrl(file.name, file.type);
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      const { uploadUrl, publicUrl } = result.ok;

      setImageUploadProgress("Uploading image...");
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.statusText}`);
      }

      setField("imageUrl", publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("[AdminProductForm] image upload error:", err);
      toast.error(
        `Image upload failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setImageUploading(false);
      setImageUploadProgress(null);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category) {
      toast.error("Name and category are required");
      return;
    }
    if (form.variants.length === 0 || !form.variants[0].variantLabel) {
      toast.error("At least one variant with a label is required");
      return;
    }
    saveMutation.mutate();
  }

  const breadcrumb = isEdit
    ? ["Products", "Edit Product"]
    : ["Products", "Add Product"];
  const title = isEdit ? "Edit Product" : "Add Product";

  if (isEdit && loadingProduct) {
    return (
      <AdminLayout title={title} breadcrumb={breadcrumb}>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={title} breadcrumb={breadcrumb}>
      <form onSubmit={handleSave} className="max-w-3xl space-y-8">
        {/* Basic Info */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-subtle">
          <h2 className="font-display font-semibold text-base border-b border-border pb-3">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="admin-form-group">
              <Label className="admin-form-label" htmlFor="name">
                Product Name *
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. Coconut Oil"
                required
                data-ocid="admin-product-name-input"
              />
            </div>
            <div className="admin-form-group">
              <Label className="admin-form-label" htmlFor="category">
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => setField("category", v)}
              >
                <SelectTrigger data-ocid="admin-product-category-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="admin-form-group">
            <Label className="admin-form-label" htmlFor="shortDesc">
              Short Description
            </Label>
            <Input
              id="shortDesc"
              value={form.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)}
              placeholder="1–2 line description shown on product cards"
              data-ocid="admin-product-short-desc-input"
            />
          </div>

          <div className="admin-form-group">
            <Label className="admin-form-label" htmlFor="longDesc">
              Long Description
            </Label>
            <Textarea
              id="longDesc"
              value={form.longDescription}
              onChange={(e) => setField("longDescription", e.target.value)}
              rows={4}
              placeholder="Full product description shown on detail page..."
              data-ocid="admin-product-long-desc-textarea"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="admin-form-group">
              <Label className="admin-form-label" htmlFor="benefits">
                Benefits{" "}
                <span className="text-muted-foreground font-normal">
                  (comma separated)
                </span>
              </Label>
              <Input
                id="benefits"
                value={form.benefits}
                onChange={(e) => setField("benefits", e.target.value)}
                placeholder="Cold Pressed, Chemical Free, 100% Natural"
                data-ocid="admin-product-benefits-input"
              />
            </div>
            <div className="admin-form-group">
              <Label className="admin-form-label" htmlFor="displayOrder">
                Display Order
              </Label>
              <Input
                id="displayOrder"
                type="number"
                value={form.displayOrder}
                onChange={(e) =>
                  setField("displayOrder", Number(e.target.value))
                }
                min={0}
                data-ocid="admin-product-display-order-input"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="isVisible"
              checked={form.isVisible}
              onCheckedChange={(v) => setField("isVisible", v)}
              data-ocid="admin-product-visibility-switch"
            />
            <Label htmlFor="isVisible" className="text-sm cursor-pointer">
              {form.isVisible ? "Visible on site" : "Hidden from site"}
            </Label>
          </div>
        </section>

        {/* Image */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-subtle">
          <h2 className="font-display font-semibold text-base border-b border-border pb-3">
            Product Image
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Thumbnail Preview */}
            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
              {imageUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                  <p className="text-xs text-muted-foreground text-center px-1 leading-tight">
                    {imageUploadProgress}
                  </p>
                </div>
              ) : form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">No image</p>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* Upload button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 w-full sm:w-auto"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading || !actor}
                data-ocid="admin-product-image-upload-button"
              >
                {imageUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {imageUploading
                  ? (imageUploadProgress ?? "Uploading...")
                  : "Upload Image"}
              </Button>

              {/* URL fallback input */}
              <div className="admin-form-group">
                <Label className="admin-form-label text-xs text-muted-foreground">
                  Or enter image URL directly
                </Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) => setField("imageUrl", e.target.value)}
                  placeholder="/assets/images/product.png"
                  data-ocid="admin-product-image-url-input"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Recommended: 800×800 px, JPG or PNG. Upload replaces the URL
                field automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-display font-semibold text-base">
              Variants (Size / Price)
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addVariant}
              className="gap-1.5"
              data-ocid="admin-product-add-variant-button"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Variant
            </Button>
          </div>
          <div className="space-y-3">
            {form.variants.map((variant, i) => (
              <div
                key={variant._key}
                className="flex gap-3 items-start"
                data-ocid={`admin-variant-row.item.${i + 1}`}
              >
                <div className="grid grid-cols-3 gap-3 flex-1">
                  <Input
                    placeholder="Label (e.g. 500 ml)"
                    value={variant.variantLabel}
                    onChange={(e) =>
                      setVariant(i, "variantLabel", e.target.value)
                    }
                    data-ocid={`admin-variant-size.${i + 1}`}
                  />
                  <Input
                    type="number"
                    placeholder="Price (₹)"
                    value={variant.price || ""}
                    onChange={(e) =>
                      setVariant(i, "price", Number(e.target.value))
                    }
                    min={0}
                    data-ocid={`admin-variant-price.${i + 1}`}
                  />
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock || ""}
                    onChange={(e) =>
                      setVariant(i, "stock", Number(e.target.value))
                    }
                    min={0}
                    data-ocid={`admin-variant-stock.${i + 1}`}
                  />
                </div>
                {form.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="p-2 rounded-md text-destructive hover:bg-destructive/10 transition-smooth mt-0.5"
                    aria-label="Remove variant"
                    data-ocid={`admin-variant-delete.${i + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Add one row per size/variant. First variant sets the default product
            price.
          </p>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="submit"
            className="btn-primary gap-2"
            disabled={saveMutation.isPending || imageUploading}
            data-ocid="admin-product-save-button"
          >
            {saveMutation.isPending ? (
              <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveMutation.isPending
              ? "Saving..."
              : isEdit
                ? "Update Product"
                : "Create Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin/products" })}
            data-ocid="admin-product-cancel-button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
