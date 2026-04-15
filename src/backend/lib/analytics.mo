import Map "mo:core/Map";
import Array "mo:core/Array";
import OrderTypes "../types/orders";
import AnalyticsTypes "../types/analytics";

module {
  public func getSummary(orders : Map.Map<Text, OrderTypes.Order>) : AnalyticsTypes.AnalyticsSummary {
    var totalOrders = 0;
    var totalRevenue = 0;
    var pendingOrders = 0;
    var deliveredOrders = 0;

    for ((_id, order) in orders.entries()) {
      totalOrders += 1;
      totalRevenue += order.totalAmount;
      switch (order.status) {
        case (#Pending) { pendingOrders += 1 };
        case (#Delivered) { deliveredOrders += 1 };
        case (_) {};
      };
    };

    { totalOrders; totalRevenue; pendingOrders; deliveredOrders };
  };

  public func getTopProducts(orders : Map.Map<Text, OrderTypes.Order>, limit : Nat) : [AnalyticsTypes.TopProduct] {
    // Build a map of productId -> (name, count, revenue)
    let countMap = Map.empty<Text, (Text, Nat, Nat)>();

    for ((_id, order) in orders.entries()) {
      for (item in order.items.vals()) {
        switch (countMap.get(item.productId)) {
          case null {
            countMap.add(item.productId, (item.productName, item.quantity, item.unitPrice * item.quantity));
          };
          case (?(name, cnt, rev)) {
            countMap.add(item.productId, (name, cnt + item.quantity, rev + item.unitPrice * item.quantity));
          };
        };
      };
    };

    let arr = countMap.entries().map(
      func((pid, (name, cnt, rev)) : (Text, (Text, Nat, Nat))) : AnalyticsTypes.TopProduct {
        { productId = pid; productName = name; orderCount = cnt; revenue = rev }
      }
    ).toArray();

    let sorted = arr.sort(func(a : AnalyticsTypes.TopProduct, b : AnalyticsTypes.TopProduct) : { #less; #equal; #greater } {
      if (a.orderCount > b.orderCount) #less
      else if (a.orderCount < b.orderCount) #greater
      else #equal
    });

    if (sorted.size() <= limit) sorted
    else sorted.sliceToArray(0, limit.toInt());
  };
};
