import { createActor } from "@/backend";
import type { AnalyticsSummary, Order, TopProduct } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  IndianRupee,
  Package,
  ShoppingBag,
  TrendingUp,
  Truck,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  color,
  loading,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  sub?: string;
  color?: string;
  loading?: boolean;
}) {
  return (
    <div
      className="admin-stat-card"
      data-ocid={`admin-stat-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="flex items-start justify-between">
        <p className="admin-stat-label">{label}</p>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color ?? "bg-primary/10"}`}
        >
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      {loading ? (
        <Skeleton className="h-8 w-24 mt-2" />
      ) : (
        <p className="admin-stat-value">{value}</p>
      )}
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function AdminDashboard() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;

  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useQuery<AnalyticsSummary>({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getAnalyticsSummary();
    },
    enabled,
  });

  const {
    data: recentOrders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery<Order[]>({
    queryKey: ["admin-recent-orders"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getRecentOrders(BigInt(10));
    },
    enabled,
  });

  const {
    data: topProducts,
    isLoading: topLoading,
    error: topError,
  } = useQuery<TopProduct[]>({
    queryKey: ["admin-top-products"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getTopProducts(BigInt(5));
    },
    enabled,
  });

  const statsLoading = analyticsLoading || actorFetching;

  return (
    <AdminLayout title="Dashboard" breadcrumb={["Dashboard"]}>
      {analyticsError && (
        <ErrorBanner message="Could not load analytics. Showing partial data." />
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Orders"
          value={analytics ? String(analytics.totalOrders) : "—"}
          icon={ShoppingBag}
          sub="All time"
          loading={statsLoading}
        />
        <StatCard
          label="Total Revenue"
          value={
            analytics
              ? `₹${Number(analytics.totalRevenue).toLocaleString("en-IN")}`
              : "—"
          }
          icon={IndianRupee}
          sub="All time"
          color="bg-emerald-50"
          loading={statsLoading}
        />
        <StatCard
          label="Pending Orders"
          value={analytics ? String(analytics.pendingOrders) : "—"}
          icon={Package}
          sub="Need attention"
          color="bg-amber-50"
          loading={statsLoading}
        />
        <StatCard
          label="Delivered Orders"
          value={analytics ? String(analytics.deliveredOrders) : "—"}
          icon={Truck}
          sub="Completed"
          color="bg-blue-50"
          loading={statsLoading}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold text-base text-foreground">
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="admin-dashboard-all-orders-link"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {ordersError && (
            <div className="p-4">
              <ErrorBanner message="Could not load recent orders." />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-head">
                  <th className="admin-table-cell text-left font-semibold">
                    Order
                  </th>
                  <th className="admin-table-cell text-left font-semibold">
                    Customer
                  </th>
                  <th className="admin-table-cell text-right font-semibold">
                    Total
                  </th>
                  <th className="admin-table-cell text-left font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordersLoading ? (
                  <>
                    {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                      <tr key={k} className="admin-table-row">
                        <td className="admin-table-cell">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="admin-table-cell">
                          <Skeleton className="h-4 w-28" />
                        </td>
                        <td className="admin-table-cell text-right">
                          <Skeleton className="h-4 w-16 ml-auto" />
                        </td>
                        <td className="admin-table-cell">
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  (recentOrders ?? []).map((order, i) => (
                    <tr
                      key={order.id}
                      className="admin-table-row"
                      data-ocid={`admin-order-row.item.${i + 1}`}
                    >
                      <td className="admin-table-cell font-mono text-xs text-muted-foreground">
                        {order.id}
                      </td>
                      <td className="admin-table-cell text-sm font-medium">
                        {order.customerName}
                      </td>
                      <td className="admin-table-cell text-right text-sm font-semibold text-primary">
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                      </td>
                      <td className="admin-table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[order.status] ?? "bg-muted text-muted-foreground border-border"}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
                {!ordersLoading && (recentOrders ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="admin-table-cell text-center py-8 text-muted-foreground text-sm"
                      data-ocid="admin-dashboard-orders-empty-state"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold text-base text-foreground">
              Top Products
            </h2>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          {topError && (
            <div className="p-4">
              <ErrorBanner message="Could not load top products." />
            </div>
          )}
          <div className="divide-y divide-border">
            {topLoading ? (
              <>
                {["t1", "t2", "t3", "t4"].map((k) => (
                  <div key={k} className="flex items-center gap-3 px-6 py-4">
                    <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              (topProducts ?? []).map((p, i) => (
                <div
                  key={p.productId}
                  className="flex items-center gap-3 px-6 py-4"
                  data-ocid={`admin-top-product.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {p.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Number(p.orderCount)} orders · ₹
                      {Number(p.revenue).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] px-2">
                    #{i + 1}
                  </Badge>
                </div>
              ))
            )}
            {!topLoading && (topProducts ?? []).length === 0 && !topError && (
              <div
                className="px-6 py-8 text-center text-sm text-muted-foreground"
                data-ocid="admin-top-products-empty-state"
              >
                No sales data yet.
              </div>
            )}
          </div>
          <div className="px-6 py-3 border-t border-border">
            <Link
              to="/admin/products"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="admin-dashboard-all-products-link"
            >
              Manage products <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
