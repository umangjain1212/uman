import { d as useParams, e as useNavigate, n as useQueryClient, u as useActor, r as reactExports, a as useQuery, j as jsxRuntimeExports, B as Button, X, g as ue, b as createActor } from "./index-BAxA7QJV.js";
import { A as AdminLayout } from "./AdminLayout-aSSbiICY.js";
import { I as Input } from "./input-TjVb1Ywn.js";
import { L as Label } from "./label-DH7qK1mz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-NCkMoy-c.js";
import { S as Switch } from "./switch-B5Fbf9pH.js";
import { T as Textarea } from "./textarea-Q-xWdx9G.js";
import { u as useMutation } from "./useMutation-C3iVZwG2.js";
import { L as LoaderCircle } from "./loader-circle-Bu73J9zj.js";
import { I as ImagePlus, U as Upload } from "./upload-DIJ_thO5.js";
import { P as Plus } from "./plus-YiBHCMfF.js";
import { S as Save } from "./save-CrBLPEPV.js";
import "./chevron-right-C0Qp-EL3.js";
import "./shopping-bag-BTPJYgYg.js";
import "./index-CJTSFYNw.js";
import "./index-BX422gDG.js";
import "./chevron-down-D72wLvhU.js";
import "./check-DQ0c2e5V.js";
const CATEGORIES = ["Oils", "Beverages"];
const newVariant = () => ({
  _key: crypto.randomUUID(),
  variantId: crypto.randomUUID(),
  variantLabel: "",
  price: 0,
  stock: 100
});
const EMPTY_FORM = {
  name: "",
  shortDescription: "",
  longDescription: "",
  description: "",
  category: "Oils",
  imageUrl: "",
  benefits: "",
  isVisible: true,
  displayOrder: 0,
  variants: [newVariant()]
};
function AdminProductForm() {
  const params = useParams({ strict: false });
  const productId = params.id === "new" ? void 0 : params.id;
  const isEdit = !!productId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [imageUploading, setImageUploading] = reactExports.useState(false);
  const [imageUploadProgress, setImageUploadProgress] = reactExports.useState(
    null
  );
  const fileInputRef = reactExports.useRef(null);
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
    enabled: enabled && isEdit
  });
  reactExports.useEffect(() => {
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
          stock: Number(v.stock)
        }))
      });
    }
  }, [existingProduct]);
  const saveMutation = useMutation({
    mutationFn: async () => {
      var _a;
      if (!actor) throw new Error("No actor");
      console.log(
        "[AdminProductForm] saveMutation start — isEdit:",
        isEdit,
        "productId:",
        productId
      );
      const input = {
        id: productId ?? crypto.randomUUID(),
        name: form.name,
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
        description: form.description || form.shortDescription,
        category: form.category,
        imageUrl: form.imageUrl,
        benefits: form.benefits.split(",").map((b) => b.trim()).filter(Boolean),
        isVisible: form.isVisible,
        displayOrder: BigInt(form.displayOrder),
        price: BigInt(((_a = form.variants[0]) == null ? void 0 : _a.price) ?? 0),
        variants: form.variants.map((v) => ({
          variantId: v.variantId,
          variantLabel: v.variantLabel,
          price: BigInt(v.price),
          stock: BigInt(v.stock)
        }))
      };
      if (isEdit && productId) {
        const result2 = await actor.updateProduct(productId, input);
        if (result2.__kind__ === "ok") {
          console.log("[AdminProductForm] updateProduct success:", result2.ok);
          return result2.ok;
        }
        throw new Error(result2.err);
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
      ue.success(isEdit ? "Product updated!" : "Product created!");
      navigate({ to: "/admin/products" });
    },
    onError: (err) => {
      console.error("[AdminProductForm] save error:", err);
      ue.error(
        `Failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  });
  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function setVariant(index, key, value) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map(
        (v, i) => i === index ? { ...v, [key]: value } : v
      )
    }));
  }
  function addVariant() {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant()]
    }));
  }
  function removeVariant(index) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  }
  async function handleImageUpload(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !actor) return;
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
        headers: { "Content-Type": file.type }
      });
      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.statusText}`);
      }
      setField("imageUrl", publicUrl);
      ue.success("Image uploaded successfully!");
    } catch (err) {
      console.error("[AdminProductForm] image upload error:", err);
      ue.error(
        `Image upload failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setImageUploading(false);
      setImageUploadProgress(null);
    }
  }
  async function handleSave(e) {
    e.preventDefault();
    if (!form.name || !form.category) {
      ue.error("Name and category are required");
      return;
    }
    if (form.variants.length === 0 || !form.variants[0].variantLabel) {
      ue.error("At least one variant with a label is required");
      return;
    }
    saveMutation.mutate();
  }
  const breadcrumb = isEdit ? ["Products", "Edit Product"] : ["Products", "Add Product"];
  const title = isEdit ? "Edit Product" : "Add Product";
  if (isEdit && loadingProduct) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title, breadcrumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title, breadcrumb, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "max-w-3xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 space-y-5 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base border-b border-border pb-3", children: "Basic Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "name", children: "Product Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: form.name,
              onChange: (e) => setField("name", e.target.value),
              placeholder: "e.g. Coconut Oil",
              required: true,
              "data-ocid": "admin-product-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "category", children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: (v) => setField("category", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin-product-category-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "shortDesc", children: "Short Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "shortDesc",
            value: form.shortDescription,
            onChange: (e) => setField("shortDescription", e.target.value),
            placeholder: "1–2 line description shown on product cards",
            "data-ocid": "admin-product-short-desc-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "longDesc", children: "Long Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "longDesc",
            value: form.longDescription,
            onChange: (e) => setField("longDescription", e.target.value),
            rows: 4,
            placeholder: "Full product description shown on detail page...",
            "data-ocid": "admin-product-long-desc-textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "admin-form-label", htmlFor: "benefits", children: [
            "Benefits",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(comma separated)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "benefits",
              value: form.benefits,
              onChange: (e) => setField("benefits", e.target.value),
              placeholder: "Cold Pressed, Chemical Free, 100% Natural",
              "data-ocid": "admin-product-benefits-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", htmlFor: "displayOrder", children: "Display Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "displayOrder",
              type: "number",
              value: form.displayOrder,
              onChange: (e) => setField("displayOrder", Number(e.target.value)),
              min: 0,
              "data-ocid": "admin-product-display-order-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "isVisible",
            checked: form.isVisible,
            onCheckedChange: (v) => setField("isVisible", v),
            "data-ocid": "admin-product-visibility-switch"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isVisible", className: "text-sm cursor-pointer", children: form.isVisible ? "Visible on site" : "Hidden from site" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 space-y-4 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base border-b border-border pb-3", children: "Product Image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex items-center justify-center flex-shrink-0", children: imageUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-muted-foreground animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center px-1 leading-tight", children: imageUploadProgress })
        ] }) : form.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: form.imageUrl,
            alt: "Product preview",
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.target.src = "/assets/images/placeholder.svg";
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No image" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleImageUpload
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-2 w-full sm:w-auto",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              disabled: imageUploading || !actor,
              "data-ocid": "admin-product-image-upload-button",
              children: [
                imageUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                imageUploading ? imageUploadProgress ?? "Uploading..." : "Upload Image"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label text-xs text-muted-foreground", children: "Or enter image URL directly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.imageUrl,
                onChange: (e) => setField("imageUrl", e.target.value),
                placeholder: "/assets/images/product.png",
                "data-ocid": "admin-product-image-url-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Recommended: 800×800 px, JPG or PNG. Upload replaces the URL field automatically." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 space-y-4 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Variants (Size / Price)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: addVariant,
            className: "gap-1.5",
            "data-ocid": "admin-product-add-variant-button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Variant"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: form.variants.map((variant, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-3 items-start",
          "data-ocid": `admin-variant-row.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Label (e.g. 500 ml)",
                  value: variant.variantLabel,
                  onChange: (e) => setVariant(i, "variantLabel", e.target.value),
                  "data-ocid": `admin-variant-size.${i + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Price (₹)",
                  value: variant.price || "",
                  onChange: (e) => setVariant(i, "price", Number(e.target.value)),
                  min: 0,
                  "data-ocid": `admin-variant-price.${i + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: "Stock",
                  value: variant.stock || "",
                  onChange: (e) => setVariant(i, "stock", Number(e.target.value)),
                  min: 0,
                  "data-ocid": `admin-variant-stock.${i + 1}`
                }
              )
            ] }),
            form.variants.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => removeVariant(i),
                className: "p-2 rounded-md text-destructive hover:bg-destructive/10 transition-smooth mt-0.5",
                "aria-label": "Remove variant",
                "data-ocid": `admin-variant-delete.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        },
        variant._key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Add one row per size/variant. First variant sets the default product price." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          className: "btn-primary gap-2",
          disabled: saveMutation.isPending || imageUploading,
          "data-ocid": "admin-product-save-button",
          children: [
            saveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            saveMutation.isPending ? "Saving..." : isEdit ? "Update Product" : "Create Product"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => navigate({ to: "/admin/products" }),
          "data-ocid": "admin-product-cancel-button",
          children: "Cancel"
        }
      )
    ] })
  ] }) });
}
export {
  AdminProductForm
};
