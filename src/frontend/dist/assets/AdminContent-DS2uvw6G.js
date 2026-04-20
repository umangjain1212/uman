import { u as useActor, n as useQueryClient, r as reactExports, a as useQuery, j as jsxRuntimeExports, B as Button, g as ue, b as createActor } from "./index-BAxA7QJV.js";
import { A as AdminLayout } from "./AdminLayout-aSSbiICY.js";
import { A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-htbkN4Vz.js";
import { I as Input } from "./input-TjVb1Ywn.js";
import { L as Label } from "./label-DH7qK1mz.js";
import { S as Skeleton } from "./skeleton-C3yHk2pE.js";
import { u as useMutation } from "./useMutation-C3iVZwG2.js";
import { P as Plus } from "./plus-YiBHCMfF.js";
import { C as CircleAlert } from "./circle-alert-Bh9wKerw.js";
import { P as Pencil } from "./pencil-lYfwF8lR.js";
import { I as ImagePlus, U as Upload } from "./upload-DIJ_thO5.js";
import { L as LoaderCircle } from "./loader-circle-Bu73J9zj.js";
import { S as Save } from "./save-CrBLPEPV.js";
import "./chevron-right-C0Qp-EL3.js";
import "./shopping-bag-BTPJYgYg.js";
import "./index-CJTSFYNw.js";
function AdminContent() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState({});
  const [uploadState, setUploadState] = reactExports.useState({
    uploading: false,
    progress: null
  });
  const slideFileInputRef = reactExports.useRef(null);
  const {
    data: slides,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-hero-slides"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getHeroSlides();
    },
    enabled
  });
  const upsertMutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      console.log(
        "[AdminContent] upsertHeroSlide id:",
        input.id,
        "title:",
        input.title
      );
      const result = await actor.upsertHeroSlide(input);
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      setEditingId(null);
      setEditForm({});
      ue.success("Slide saved!");
    },
    onError: (err) => {
      console.error("[AdminContent] upsertHeroSlide error:", err);
      ue.error(
        `Failed to save slide: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.deleteHeroSlide(id);
      if (result.__kind__ === "ok") return;
      throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      ue.success("Slide removed");
    },
    onError: (err) => {
      console.error("[AdminContent] deleteHeroSlide error:", err);
      ue.error("Failed to delete slide");
    }
  });
  async function handleSlideImageUpload(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !actor) return;
    e.target.value = "";
    setUploadState({ uploading: true, progress: "Getting upload URL..." });
    try {
      const result = await actor.getImageUploadUrl(file.name, file.type);
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      const { uploadUrl, publicUrl } = result.ok;
      setUploadState({ uploading: true, progress: "Uploading image..." });
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      });
      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.statusText}`);
      }
      setEditForm((f) => ({ ...f, imageUrl: publicUrl }));
      ue.success("Image uploaded!");
    } catch (err) {
      console.error("[AdminContent] slide image upload error:", err);
      ue.error(
        `Image upload failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setUploadState({ uploading: false, progress: null });
    }
  }
  function startEdit(slide) {
    setEditingId(slide.id);
    setEditForm({
      id: slide.id,
      imageUrl: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      highlight: slide.highlight,
      displayOrder: slide.displayOrder,
      isVisible: slide.isVisible
    });
  }
  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
    setUploadState({ uploading: false, progress: null });
  }
  function saveEdit() {
    if (!editForm.id) return;
    upsertMutation.mutate({
      id: editForm.id,
      imageUrl: editForm.imageUrl ?? "",
      title: editForm.title ?? "",
      subtitle: editForm.subtitle ?? "",
      highlight: editForm.highlight ?? "",
      displayOrder: editForm.displayOrder ?? BigInt(1),
      isVisible: editForm.isVisible ?? true
    });
  }
  function addSlide() {
    const newId = crypto.randomUUID();
    setEditingId(newId);
    setEditForm({
      id: newId,
      imageUrl: "",
      title: "New Slide Title",
      subtitle: "New slide subtitle",
      highlight: "",
      displayOrder: BigInt(((slides == null ? void 0 : slides.length) ?? 0) + 1),
      isVisible: true
    });
  }
  function EditForm({ isNew = false }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "admin-form-label", children: [
          "Slide Image",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1 text-xs", children: "(upload file or enter URL)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editForm.imageUrl ?? "",
              onChange: (e) => setEditForm((f) => ({ ...f, imageUrl: e.target.value })),
              placeholder: "/assets/images/hero1.jpg",
              "data-ocid": "admin-slide-image-url-input",
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: slideFileInputRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleSlideImageUpload
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              title: "Upload image file",
              "data-ocid": "admin-slide-image-upload-button",
              disabled: uploadState.uploading || !actor,
              onClick: () => {
                var _a;
                return (_a = slideFileInputRef.current) == null ? void 0 : _a.click();
              },
              children: uploadState.uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" })
            }
          )
        ] }),
        uploadState.progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
          uploadState.progress
        ] }),
        editForm.imageUrl && !uploadState.uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 w-24 h-16 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: editForm.imageUrl,
            alt: "Preview",
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.target.style.display = "none";
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editForm.title ?? "",
              onChange: (e) => setEditForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Hero slide title",
              "data-ocid": "admin-slide-title-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "admin-form-label", children: [
            "Highlight Word",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1 text-xs", children: "(golden accent)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editForm.highlight ?? "",
              onChange: (e) => setEditForm((f) => ({ ...f, highlight: e.target.value })),
              placeholder: "e.g. Pressed",
              "data-ocid": "admin-slide-highlight-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Subtitle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: editForm.subtitle ?? "",
            onChange: (e) => setEditForm((f) => ({ ...f, subtitle: e.target.value })),
            placeholder: "Hero slide subtitle",
            "data-ocid": "admin-slide-subtitle-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Display Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: Number(editForm.displayOrder ?? 1),
              onChange: (e) => setEditForm((f) => ({
                ...f,
                displayOrder: BigInt(e.target.value)
              })),
              min: 1
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "admin-form-group flex items-end pb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: editForm.isVisible ?? true,
              onChange: (e) => setEditForm((f) => ({ ...f, isVisible: e.target.checked })),
              className: "w-4 h-4 rounded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Visible on homepage" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: saveEdit,
            disabled: upsertMutation.isPending || uploadState.uploading,
            className: "btn-primary gap-2",
            size: "sm",
            "data-ocid": "admin-slide-save-button",
            children: [
              upsertMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              upsertMutation.isPending ? "Saving..." : "Save Slide"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: cancelEdit,
            size: "sm",
            "data-ocid": "admin-slide-cancel-button",
            children: "Cancel"
          }
        )
      ] }),
      isNew && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "New slide — fill in the fields above and click Save." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Content Management", breadcrumb: ["Content"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Hero Slides" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage the hero slider images and text shown on the homepage." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: addSlide,
          className: "btn-primary gap-2",
          size: "sm",
          "data-ocid": "admin-content-add-slide-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Slide"
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load hero slides." })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-14 rounded-lg flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-64" })
          ] })
        ]
      },
      k
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      editingId && !(slides ?? []).find((s) => s.id === editingId) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-primary/30 rounded-xl overflow-hidden shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditForm, { isNew: true }) }),
      (slides ?? []).map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle",
          "data-ocid": `admin-hero-slide.item.${i + 1}`,
          children: editingId === slide.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(EditForm, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-14 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: slide.imageUrl,
                alt: slide.title,
                loading: "lazy",
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold truncate", children: [
                slide.title,
                slide.highlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-amber-600 font-normal text-xs", children: [
                  "[",
                  slide.highlight,
                  "]"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: slide.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Order: ",
                Number(slide.displayOrder),
                " ·",
                " ",
                slide.isVisible ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600", children: "Visible" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Hidden" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "admin-action-btn admin-action-edit",
                  onClick: () => startEdit(slide),
                  "data-ocid": `admin-slide-edit-button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "admin-action-btn admin-action-delete",
                    disabled: deleteMutation.isPending,
                    "data-ocid": `admin-slide-delete-button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin-delete-slide-dialog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Slide?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      "Delete slide ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: slide.title }),
                      "? This cannot be undone."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin-delete-slide-cancel-button", children: "Cancel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        onClick: () => deleteMutation.mutate(slide.id),
                        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        "data-ocid": "admin-delete-slide-confirm-button",
                        children: "Delete"
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] })
        },
        slide.id
      )),
      !isLoading && (slides ?? []).length === 0 && !editingId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 text-muted-foreground text-sm bg-card border border-border rounded-xl",
          "data-ocid": "admin-hero-slides-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8 mx-auto mb-3 opacity-40" }),
            "No slides yet. Add your first hero slide!"
          ]
        }
      )
    ] })
  ] }) });
}
export {
  AdminContent
};
