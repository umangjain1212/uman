import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";
import OrderLib "../lib/orders";
import OrderTypes "../types/orders";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  orders : Map.Map<Text, OrderTypes.Order>,
  nextOrderId : { var value : Nat },
) {
  // Public — called from checkout/WhatsApp flow
  // Any caller (including anonymous) can place an order — this is the storefront checkout
  public shared ({ caller }) func storeOrder(input : OrderTypes.OrderInput) : async { #ok : OrderTypes.Order; #err : Text } {
    Debug.print("[Farm72] storeOrder called by: " # caller.toText());
    OrderLib.storeOrder(orders, nextOrderId, input);
  };

  // Admin reads — returns all orders
  public shared ({ caller }) func getAdminOrders() : async { #ok : [OrderTypes.Order]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] getAdminOrders called by: " # caller.toText());
    #ok(OrderLib.getOrders(orders));
  };

  // Alias kept for backward compat
  public shared ({ caller }) func getOrders() : async { #ok : [OrderTypes.Order]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(OrderLib.getOrders(orders));
  };

  public shared ({ caller }) func getOrder(id : Text) : async { #ok : ?OrderTypes.Order; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(OrderLib.getOrder(orders, id));
  };

  public shared ({ caller }) func getRecentOrders(limit : Nat) : async { #ok : [OrderTypes.Order]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(OrderLib.getRecentOrders(orders, limit));
  };

  // Admin mutation — update order status
  public shared ({ caller }) func updateOrderStatus(id : Text, status : OrderTypes.OrderStatus) : async { #ok : OrderTypes.Order; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    switch (OrderLib.updateOrderStatus(orders, id, status)) {
      case null #err("Order not found: " # id);
      case (?o) {
        Debug.print("[Farm72] Order status updated: " # id);
        #ok(o);
      };
    };
  };
};
