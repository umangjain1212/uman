import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";
import OrderTypes "../types/orders";
import AnalyticsLib "../lib/analytics";
import AnalyticsTypes "../types/analytics";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  orders : Map.Map<Text, OrderTypes.Order>,
) {
  // getDashboardStats — primary name expected by admin panel
  public shared ({ caller }) func getDashboardStats() : async { #ok : AnalyticsTypes.AnalyticsSummary; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] getDashboardStats called by: " # caller.toText());
    #ok(AnalyticsLib.getSummary(orders));
  };

  // Alias for backward compat
  public shared ({ caller }) func getAnalyticsSummary() : async { #ok : AnalyticsTypes.AnalyticsSummary; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(AnalyticsLib.getSummary(orders));
  };

  public shared ({ caller }) func getTopProducts(limit : Nat) : async { #ok : [AnalyticsTypes.TopProduct]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(AnalyticsLib.getTopProducts(orders, limit));
  };
};
