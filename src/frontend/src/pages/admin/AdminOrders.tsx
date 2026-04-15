import { createActor } from "@/backend";
import type { Order, OrderStatus } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
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
import { AdminOrderDetail } from "@/pages/admin/AdminOrderDetail";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const STATUSES: Array<string> = [
  "all",
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export function AdminOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getOrders();
    },
    enabled,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.updateOrderStatus(id, status);
      if (!result) throw new Error("Update failed");
      return result;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Order[]>(
        ["admin-orders"],
        (prev) => prev?.map((o) => (o.id === updated.id ? updated : o)) ?? [],
      );
      if (selectedOrder?.id === updated.id) {
        setSelectedOrder(updated);
      }
      toast.success(`Order ${updated.id} status updated`);
    },
    onError: () => toast.error("Failed to update order status"),
  });

  const allOrders = orders ?? [];

  const filtered = useMemo(() => {
    return allOrders.filter((o) => {
      const matchSearch =
        search === "" ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [allOrders, search, statusFilter]);

  function handleStatusChange(orderId: string, newStatus: string) {
    updateStatusMutation.mutate({
      id: orderId,
      status: newStatus as OrderStatus,
    });
  }

  return (
    <AdminLayout title="Orders" breadcrumb={["Orders"]}>
      {error && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Failed to load orders from backend.</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="admin-orders-search-input"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-full sm:w-44"
            data-ocid="admin-orders-status-filter"
          >
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s === "all" ? "All Statuses" : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr className="admin-table-head">
                <th className="admin-table-cell text-left font-semibold">
                  Order ID
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Customer
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Total
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Payment
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Status
                </th>
                <th className="admin-table-cell text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["sk1", "sk2", "sk3", "sk4"].map((k) => (
                  <tr key={k} className="admin-table-row">
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-7 w-28 rounded" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-7 w-16" />
                    </td>
                  </tr>
                ))}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="admin-table-cell text-center py-12 text-muted-foreground"
                    data-ocid="admin-orders-empty-state"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className="admin-table-row"
                  data-ocid={`admin-order.item.${i + 1}`}
                >
                  <td className="admin-table-cell font-mono text-xs font-semibold text-foreground">
                    {order.id}
                  </td>
                  <td className="admin-table-cell text-sm">
                    {order.customerName}
                  </td>
                  <td className="admin-table-cell text-right text-sm font-semibold text-primary">
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </td>
                  <td className="admin-table-cell text-xs">
                    {order.paymentMethod}
                  </td>
                  <td className="admin-table-cell">
                    <Select
                      value={order.status}
                      onValueChange={(v) => handleStatusChange(order.id, v)}
                      disabled={updateStatusMutation.isPending}
                    >
                      <SelectTrigger
                        className={`h-7 text-xs border font-medium capitalize w-32 ${STATUS_STYLES[order.status] ?? "bg-muted"}`}
                        data-ocid={`admin-order-status-select.${i + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          [
                            "Pending",
                            "Confirmed",
                            "Shipped",
                            "Delivered",
                            "Cancelled",
                          ] as string[]
                        ).map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="capitalize text-xs"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="admin-table-cell">
                    <button
                      type="button"
                      className="admin-action-btn admin-action-view"
                      onClick={() => setSelectedOrder(order)}
                      data-ocid={`admin-order-view-button.${i + 1}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && (
          <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground">
            Showing {filtered.length} of {allOrders.length} orders
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <AdminOrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={(newStatus) =>
            handleStatusChange(selectedOrder.id, newStatus)
          }
        />
      )}
    </AdminLayout>
  );
}
