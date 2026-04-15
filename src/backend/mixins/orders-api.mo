import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/orders";
import OrderTypes "../types/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Text, OrderTypes.Order>,
  nextOrderId : { var value : Nat },
) {
  // Public — called from checkout/WhatsApp flow
  public shared func storeOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    OrderLib.storeOrder(orders, nextOrderId, input);
  };

  // Admin reads — returns all orders
  public shared ({ caller }) func getAdminOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.getOrders(orders);
  };

  // Alias kept for backward compat
  public shared ({ caller }) func getOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.getOrders(orders);
  };

  public shared ({ caller }) func getOrder(id : Text) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    OrderLib.getOrder(orders, id);
  };

  public shared ({ caller }) func getRecentOrders(limit : Nat) : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view recent orders");
    };
    OrderLib.getRecentOrders(orders, limit);
  };

  // Admin mutation — update order status, returns updated order or null
  public shared ({ caller }) func updateOrderStatus(id : Text, status : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, id, status);
  };
};
