import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import AnalyticsLib "../lib/analytics";
import AnalyticsTypes "../types/analytics";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Text, OrderTypes.Order>,
) {
  // getDashboardStats — primary name expected by admin panel
  public shared ({ caller }) func getDashboardStats() : async AnalyticsTypes.AnalyticsSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    AnalyticsLib.getSummary(orders);
  };

  // Alias for backward compat
  public shared ({ caller }) func getAnalyticsSummary() : async AnalyticsTypes.AnalyticsSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    AnalyticsLib.getSummary(orders);
  };

  public shared ({ caller }) func getTopProducts(limit : Nat) : async [AnalyticsTypes.TopProduct] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    AnalyticsLib.getTopProducts(orders, limit);
  };
};
