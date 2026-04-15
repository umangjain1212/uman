import { createActor } from "@/backend";
import type { HeroSlide, HeroSlideInput } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ImagePlus,
  Pencil,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ── Hero Slides Tab ───────────────────────────────────────────────────────────
function HeroSlidesTab() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<HeroSlideInput>>({});

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
      return actor.upsertHeroSlide(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      setEditingId(null);
      setEditForm({});
      toast.success("Slide saved!");
    },
    onError: () => toast.error("Failed to save slide"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteHeroSlide(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      toast.success("Slide removed");
    },
    onError: () => toast.error("Failed to delete slide"),
  });

  function startEdit(slide: HeroSlide) {
    setEditingId(slide.id);
    setEditForm({
      id: slide.id,
      imageUrl: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      displayOrder: slide.displayOrder,
      isVisible: slide.isVisible,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  function saveEdit() {
    if (!editForm.id) return;
    upsertMutation.mutate({
      id: editForm.id,
      imageUrl: editForm.imageUrl ?? "",
      title: editForm.title ?? "",
      subtitle: editForm.subtitle ?? "",
      displayOrder: editForm.displayOrder ?? BigInt(1),
      isVisible: editForm.isVisible ?? true,
    });
  }

  function addSlide() {
    const newId = crypto.randomUUID();
    const newSlide: HeroSlide = {
      id: newId,
      imageUrl: "",
      title: "New Slide Title",
      subtitle: "New slide subtitle",
      displayOrder: BigInt((slides?.length ?? 0) + 1),
      isVisible: true,
    };
    setEditingId(newId);
    setEditForm({
      id: newId,
      imageUrl: "",
      title: "New Slide Title",
      subtitle: "New slide subtitle",
      displayOrder: newSlide.displayOrder,
      isVisible: true,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Manage the hero slider images and text shown on the homepage.
        </p>
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
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="admin-form-group">
                  <Label className="admin-form-label">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={editForm.imageUrl ?? ""}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, imageUrl: e.target.value }))
                      }
                      placeholder="/assets/images/hero1.jpg"
                      data-ocid="admin-slide-image-url-input"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      data-ocid="admin-slide-image-upload-button"
                    >
                      <ImagePlus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
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
              </div>
              <div className="admin-form-group">
                <Label className="admin-form-label">Title</Label>
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
              <div className="flex gap-2">
                <Button
                  onClick={saveEdit}
                  disabled={upsertMutation.isPending}
                  className="btn-primary gap-2"
                  size="sm"
                  data-ocid="admin-slide-save-button"
                >
                  <Save className="w-3.5 h-3.5" /> Save
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
            </div>
          </div>
        )}

        {(slides ?? []).map((slide, i) => (
          <div
            key={slide.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
            data-ocid={`admin-hero-slide.item.${i + 1}`}
          >
            {editingId === slide.id ? (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="admin-form-group">
                    <Label className="admin-form-label">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={editForm.imageUrl ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            imageUrl: e.target.value,
                          }))
                        }
                        placeholder="/assets/images/hero1.jpg"
                        data-ocid="admin-slide-image-url-input"
                      />
                    </div>
                  </div>
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
                </div>
                <div className="admin-form-group">
                  <Label className="admin-form-label">Title</Label>
                  <Input
                    value={editForm.title ?? ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, title: e.target.value }))
                    }
                    data-ocid="admin-slide-title-input"
                  />
                </div>
                <div className="admin-form-group">
                  <Label className="admin-form-label">Subtitle</Label>
                  <Input
                    value={editForm.subtitle ?? ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, subtitle: e.target.value }))
                    }
                    data-ocid="admin-slide-subtitle-input"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={saveEdit}
                    disabled={upsertMutation.isPending}
                    className="btn-primary gap-2"
                    size="sm"
                    data-ocid="admin-slide-save-button"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
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
              </div>
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
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {slide.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Order: {Number(slide.displayOrder)}
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
                  <button
                    type="button"
                    className="admin-action-btn admin-action-delete"
                    onClick={() => deleteMutation.mutate(slide.id)}
                    disabled={deleteMutation.isPending}
                    data-ocid={`admin-slide-delete-button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Content Page ────────────────────────────────────────────────────────
export function AdminContent() {
  return (
    <AdminLayout title="Content Management" breadcrumb={["Content"]}>
      <Tabs defaultValue="hero" data-ocid="admin-content-tabs">
        <TabsList className="mb-6">
          <TabsTrigger value="hero" data-ocid="admin-content-hero-tab">
            Hero Slides
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hero">
          <HeroSlidesTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
