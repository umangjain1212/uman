import { createActor } from "@/backend";
import type { HeroSlide, HeroSlideInput } from "@/backend.d";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Image Upload Helper ───────────────────────────────────────────────────────
interface ImageUploadState {
  uploading: boolean;
  progress: string | null;
}

// ── Hero Slides Section ───────────────────────────────────────────────────────
export function AdminContent() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<HeroSlideInput>>({});
  const [uploadState, setUploadState] = useState<ImageUploadState>({
    uploading: false,
    progress: null,
  });
  const slideFileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: slides,
    isLoading,
    error,
  } = useQuery<HeroSlide[]>({
    queryKey: ["admin-hero-slides"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getHeroSlides();
    },
    enabled,
  });

  const upsertMutation = useMutation({
    mutationFn: async (input: HeroSlideInput) => {
      if (!actor) throw new Error("No actor");
      console.log(
        "[AdminContent] upsertHeroSlide id:",
        input.id,
        "title:",
        input.title,
      );
      const result = await actor.upsertHeroSlide(input);
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      // Also invalidate public hero slides so homepage updates
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      setEditingId(null);
      setEditForm({});
      toast.success("Slide saved!");
    },
    onError: (err) => {
      console.error("[AdminContent] upsertHeroSlide error:", err);
      toast.error(
        `Failed to save slide: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.deleteHeroSlide(id);
      if (result.__kind__ === "ok") return;
      throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["hero-slides"] });
      toast.success("Slide removed");
    },
    onError: (err) => {
      console.error("[AdminContent] deleteHeroSlide error:", err);
      toast.error("Failed to delete slide");
    },
  });

  async function handleSlideImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file || !actor) return;
    // Reset input so same file can be re-selected
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
        headers: { "Content-Type": file.type },
      });
      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.statusText}`);
      }

      setEditForm((f) => ({ ...f, imageUrl: publicUrl }));
      toast.success("Image uploaded!");
    } catch (err) {
      console.error("[AdminContent] slide image upload error:", err);
      toast.error(
        `Image upload failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setUploadState({ uploading: false, progress: null });
    }
  }

  function startEdit(slide: HeroSlide) {
    setEditingId(slide.id);
    setEditForm({
      id: slide.id,
      imageUrl: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      highlight: slide.highlight,
      displayOrder: slide.displayOrder,
      isVisible: slide.isVisible,
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
      isVisible: editForm.isVisible ?? true,
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
      displayOrder: BigInt((slides?.length ?? 0) + 1),
      isVisible: true,
    });
  }

  function EditForm({ isNew = false }: { isNew?: boolean }) {
    return (
      <div className="p-5 space-y-4">
        {/* Image URL + Upload */}
        <div className="admin-form-group">
          <Label className="admin-form-label">
            Slide Image
            <span className="text-muted-foreground font-normal ml-1 text-xs">
              (upload file or enter URL)
            </span>
          </Label>
          <div className="flex gap-2">
            <Input
              value={editForm.imageUrl ?? ""}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="/assets/images/hero1.jpg"
              data-ocid="admin-slide-image-url-input"
              className="flex-1"
            />
            <input
              ref={slideFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSlideImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              title="Upload image file"
              data-ocid="admin-slide-image-upload-button"
              disabled={uploadState.uploading || !actor}
              onClick={() => slideFileInputRef.current?.click()}
            >
              {uploadState.uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </Button>
          </div>
          {uploadState.progress && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              {uploadState.progress}
            </p>
          )}
          {/* Thumbnail preview */}
          {editForm.imageUrl && !uploadState.uploading && (
            <div className="mt-2 w-24 h-16 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
              <img
                src={editForm.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="admin-form-group">
            <Label className="admin-form-label">Title *</Label>
            <Input
              value={editForm.title ?? ""}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Hero slide title"
              data-ocid="admin-slide-title-input"
            />
          </div>
          <div className="admin-form-group">
            <Label className="admin-form-label">
              Highlight Word
              <span className="text-muted-foreground font-normal ml-1 text-xs">
                (golden accent)
              </span>
            </Label>
            <Input
              value={editForm.highlight ?? ""}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, highlight: e.target.value }))
              }
              placeholder="e.g. Pressed"
              data-ocid="admin-slide-highlight-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <Label className="admin-form-label">Subtitle</Label>
          <Input
            value={editForm.subtitle ?? ""}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, subtitle: e.target.value }))
            }
            placeholder="Hero slide subtitle"
            data-ocid="admin-slide-subtitle-input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="admin-form-group">
            <Label className="admin-form-label">Display Order</Label>
            <Input
              type="number"
              value={Number(editForm.displayOrder ?? 1)}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  displayOrder: BigInt(e.target.value),
                }))
              }
              min={1}
            />
          </div>
          <div className="admin-form-group flex items-end pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={editForm.isVisible ?? true}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, isVisible: e.target.checked }))
                }
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Visible on homepage</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            onClick={saveEdit}
            disabled={upsertMutation.isPending || uploadState.uploading}
            className="btn-primary gap-2"
            size="sm"
            data-ocid="admin-slide-save-button"
          >
            {upsertMutation.isPending ? (
              <span className="w-3.5 h-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {upsertMutation.isPending ? "Saving..." : "Save Slide"}
          </Button>
          <Button
            variant="outline"
            onClick={cancelEdit}
            size="sm"
            data-ocid="admin-slide-cancel-button"
          >
            Cancel
          </Button>
        </div>
        {isNew && (
          <p className="text-xs text-muted-foreground">
            New slide — fill in the fields above and click Save.
          </p>
        )}
      </div>
    );
  }

  return (
    <AdminLayout title="Content Management" breadcrumb={["Content"]}>
      {/* Hero Slides */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-display font-semibold text-base text-foreground">
              Hero Slides
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage the hero slider images and text shown on the homepage.
            </p>
          </div>
          <Button
            onClick={addSlide}
            className="btn-primary gap-2"
            size="sm"
            data-ocid="admin-content-add-slide-button"
          >
            <Plus className="w-4 h-4" /> Add Slide
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Failed to load hero slides.</span>
          </div>
        )}

        {isLoading && (
          <div className="space-y-3">
            {["s1", "s2"].map((k) => (
              <div
                key={k}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
              >
                <Skeleton className="w-20 h-14 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {/* New slide editing form (not yet saved) */}
          {editingId && !(slides ?? []).find((s) => s.id === editingId) && (
            <div className="bg-card border border-primary/30 rounded-xl overflow-hidden shadow-subtle">
              <EditForm isNew />
            </div>
          )}

          {(slides ?? []).map((slide, i) => (
            <div
              key={slide.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
              data-ocid={`admin-hero-slide.item.${i + 1}`}
            >
              {editingId === slide.id ? (
                <EditForm />
              ) : (
                <div className="flex items-center gap-4 p-4">
                  <div className="w-20 h-14 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {slide.title}
                      {slide.highlight && (
                        <span className="ml-1.5 text-amber-600 font-normal text-xs">
                          [{slide.highlight}]
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {slide.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Order: {Number(slide.displayOrder)} ·{" "}
                      {slide.isVisible ? (
                        <span className="text-emerald-600">Visible</span>
                      ) : (
                        <span className="text-muted-foreground">Hidden</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      className="admin-action-btn admin-action-edit"
                      onClick={() => startEdit(slide)}
                      data-ocid={`admin-slide-edit-button.${i + 1}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="admin-action-btn admin-action-delete"
                          disabled={deleteMutation.isPending}
                          data-ocid={`admin-slide-delete-button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent data-ocid="admin-delete-slide-dialog">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Slide?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Delete slide <strong>{slide.title}</strong>? This
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-ocid="admin-delete-slide-cancel-button">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(slide.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            data-ocid="admin-delete-slide-confirm-button"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </div>
          ))}

          {!isLoading && (slides ?? []).length === 0 && !editingId && (
            <div
              className="text-center py-12 text-muted-foreground text-sm bg-card border border-border rounded-xl"
              data-ocid="admin-hero-slides-empty-state"
            >
              <ImagePlus className="w-8 h-8 mx-auto mb-3 opacity-40" />
              No slides yet. Add your first hero slide!
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
