import { createActor } from "@/backend";
import type { AnalyticsSummary, TopProduct } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  IndianRupee,
  Package,
  ShoppingBag,
  TrendingUp,
  Truck,
} from "lucide-react";

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
      data-ocid={`analytics-stat-${label.toLowerCase().replace(/\s/g, "-")}`}
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

export function AdminAnalytics() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;

  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useQuery<AnalyticsSummary>({
    queryKey: ["admin-analytics-page"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getAnalyticsSummary();
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled,
  });

  const {
    data: topProducts,
    isLoading: topLoading,
    error: topError,
  } = useQuery<TopProduct[]>({
    queryKey: ["admin-analytics-top-products"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getTopProducts(BigInt(10));
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    enabled,
  });

  const statsLoading = analyticsLoading || actorFetching;

  return (
    <AdminLayout title="Analytics" breadcrumb={["Analytics"]}>
      {analyticsError && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Could not load analytics data.</span>
        </div>
      )}

      {/* Summary stat cards */}
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

      {/* Top Products */}
      <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden max-w-2xl">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-base text-foreground">
            Top Products by Revenue
          </h2>
        </div>

        {topError && (
          <div className="p-4">
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Could not load top products.</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr className="admin-table-head">
                <th className="admin-table-cell text-left font-semibold">#</th>
                <th className="admin-table-cell text-left font-semibold">
                  Product
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Orders
                </th>
                <th className="admin-table-cell text-right font-semibold">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {topLoading &&
                ["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <tr key={k} className="admin-table-row">
                    <td className="admin-table-cell">
                      <Skeleton className="h-5 w-6 rounded" />
                    </td>
                    <td className="admin-table-cell">
                      <Skeleton className="h-4 w-36" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-12 ml-auto" />
                    </td>
                    <td className="admin-table-cell text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </td>
                  </tr>
                ))}
              {!topLoading && (topProducts ?? []).length === 0 && !topError && (
                <tr>
                  <td
                    colSpan={4}
                    className="admin-table-cell text-center py-12 text-muted-foreground"
                    data-ocid="analytics-top-products-empty-state"
                  >
                    No sales data yet.
                  </td>
                </tr>
              )}
              {(topProducts ?? []).map((p, i) => (
                <tr
                  key={p.productId}
                  className="admin-table-row"
                  data-ocid={`analytics-top-product.item.${i + 1}`}
                >
                  <td className="admin-table-cell">
                    <Badge variant="secondary" className="text-[10px] px-1.5">
                      #{i + 1}
                    </Badge>
                  </td>
                  <td className="admin-table-cell text-sm font-medium">
                    {p.productName}
                  </td>
                  <td className="admin-table-cell text-right text-sm text-muted-foreground">
                    {Number(p.orderCount)}
                  </td>
                  <td className="admin-table-cell text-right text-sm font-semibold text-primary">
                    ₹{Number(p.revenue).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
