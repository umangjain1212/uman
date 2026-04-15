import { createActor } from "@/backend";
import type { Coupon, CouponInput } from "@/backend.d";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM = { code: "", discount: 10, maxUses: 100, expiry: "" };

export function AdminCoupons() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const {
    data: coupons,
    isLoading,
    error,
  } = useQuery<Coupon[]>({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getCoupons();
    },
    enabled,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const expiryTimestamp = form.expiry
        ? BigInt(new Date(form.expiry).getTime()) * BigInt(1_000_000)
        : undefined;
      const input: CouponInput = {
        code: form.code.toUpperCase().trim(),
        discountPercent: BigInt(form.discount),
        isActive: true,
        maxUses: BigInt(form.maxUses),
        expiryDate: expiryTimestamp,
      };
      return actor.createCoupon(input);
    },
    onSuccess: (coupon) => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      setForm(EMPTY_FORM);
      setDialogOpen(false);
      toast.success(`Coupon ${coupon.code} created!`);
    },
    onError: () => toast.error("Failed to create coupon"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("No actor");
      const ok = await actor.deleteCoupon(code);
      if (!ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      toast.success("Coupon deleted");
    },
    onError: () => toast.error("Failed to delete coupon"),
  });

  const toggleMutation = useMutation({
    mutationFn: async (coupon: Coupon) => {
      if (!actor) throw new Error("No actor");
      const input: CouponInput = {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        isActive: !coupon.isActive,
        maxUses: coupon.maxUses,
        expiryDate: coupon.expiryDate,
      };
      const result = await actor.updateCoupon(coupon.code, input);
      if (!result) throw new Error("Toggle failed");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
    },
    onError: () => toast.error("Failed to toggle coupon"),
  });

  function handleAdd() {
    if (!form.code) {
      toast.error("Coupon code is required");
      return;
    }
    addMutation.mutate();
  }

  function formatExpiry(coupon: Coupon): string {
    if (!coupon.expiryDate) return "No expiry";
    const ms = Number(coupon.expiryDate) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN");
  }

  const allCoupons = coupons ?? [];

  return (
    <AdminLayout title="Coupons" breadcrumb={["Coupons"]}>
      {error && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to load coupons from backend.</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Manage discount coupon codes for Farm72.
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="btn-primary gap-2"
              data-ocid="admin-coupons-add-button"
            >
              <Plus className="w-4 h-4" />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin-add-coupon-dialog">
            <DialogHeader>
              <DialogTitle className="font-display">
                New Coupon Code
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="admin-form-group">
                <Label className="admin-form-label" htmlFor="coupon-code">
                  Code *
                </Label>
                <Input
                  id="coupon-code"
                  placeholder="e.g. FARM10"
                  value={form.code}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, code: e.target.value }))
                  }
                  className="uppercase"
                  data-ocid="admin-coupon-code-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="admin-form-group">
                  <Label className="admin-form-label" htmlFor="coupon-discount">
                    Discount (%)
                  </Label>
                  <Input
                    id="coupon-discount"
                    type="number"
                    min={1}
                    max={100}
                    value={form.discount}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        discount: Number(e.target.value),
                      }))
                    }
                    data-ocid="admin-coupon-discount-input"
                  />
                </div>
                <div className="admin-form-group">
                  <Label className="admin-form-label" htmlFor="coupon-maxuses">
                    Max Uses
                  </Label>
                  <Input
                    id="coupon-maxuses"
                    type="number"
                    min={1}
                    value={form.maxUses}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        maxUses: Number(e.target.value),
                      }))
                    }
                    data-ocid="admin-coupon-maxuses-input"
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <Label className="admin-form-label" htmlFor="coupon-expiry">
                  Expiry Date (optional)
                </Label>
                <Input
                  id="coupon-expiry"
                  type="date"
                  value={form.expiry}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expiry: e.target.value }))
                  }
                  data-ocid="admin-coupon-expiry-input"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleAdd}
                  disabled={addMutation.isPending}
                  className="btn-primary flex-1"
                  data-ocid="admin-coupon-submit-button"
                >
                  {addMutation.isPending ? (
                    <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  ) : null}
                  {addMutation.isPending ? "Creating..." : "Create Coupon"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  data-ocid="admin-coupon-cancel-button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr className="admin-table-head">
                <th className="admin-table-cell text-left font-semibold">
                  Code
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Discount
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Uses
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Max Uses
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Expiry
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Active
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
                      <Skeleton className="h-6 w-20 rounded" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-10 ml-auto" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-8 ml-auto" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-10 ml-auto" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-5 w-10 rounded-full" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-7 w-16" />
                    </td>
                  </tr>
                ))}
              {!isLoading && allCoupons.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="admin-table-cell text-center py-12 text-muted-foreground"
                    data-ocid="admin-coupons-empty-state"
                  >
                    No coupons yet. Create your first coupon!
                  </td>
                </tr>
              )}
              {allCoupons.map((coupon, i) => (
                <tr
                  key={coupon.code}
                  className="admin-table-row"
                  data-ocid={`admin-coupon.item.${i + 1}`}
                >
                  <td className="admin-table-cell">
                    <span className="font-mono text-sm font-bold tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="admin-table-cell text-right font-semibold text-emerald-600">
                    {Number(coupon.discountPercent)}%
                  </td>
                  <td className="admin-table-cell text-right text-muted-foreground text-sm">
                    {Number(coupon.usageCount)}
                  </td>
                  <td className="admin-table-cell text-right text-muted-foreground text-sm">
                    {coupon.maxUses ? Number(coupon.maxUses) : "∞"}
                  </td>
                  <td className="admin-table-cell text-sm text-muted-foreground">
                    {formatExpiry(coupon)}
                  </td>
                  <td className="admin-table-cell">
                    <Switch
                      checked={coupon.isActive}
                      onCheckedChange={() => toggleMutation.mutate(coupon)}
                      disabled={toggleMutation.isPending}
                      data-ocid={`admin-coupon-toggle.${i + 1}`}
                    />
                  </td>
                  <td className="admin-table-cell">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="admin-action-btn admin-action-delete"
                          data-ocid={`admin-coupon-delete-button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent data-ocid="admin-delete-coupon-dialog">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Coupon?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Delete coupon <strong>{coupon.code}</strong>? This
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-ocid="admin-delete-coupon-cancel-button">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(coupon.code)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            data-ocid="admin-delete-coupon-confirm-button"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Coupon codes are case-insensitive on the customer side. Customers enter
        the code at checkout to apply the discount.
      </p>
    </AdminLayout>
  );
}
