import Map "mo:core/Map";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import OrderTypes "../types/orders";

module {
  public func storeOrder(
    orders : Map.Map<Text, OrderTypes.Order>,
    nextId : { var value : Nat },
    input : OrderTypes.OrderInput,
  ) : { #ok : OrderTypes.Order; #err : Text } {
    // Input validation
    if (input.customerName.size() == 0) {
      return #err("Customer name is required");
    };
    if (input.phone.size() == 0) {
      return #err("Phone number is required");
    };
    if (input.address.size() == 0) {
      return #err("Delivery address is required");
    };
    if (input.items.size() == 0) {
      return #err("Order must contain at least one item");
    };
    if (input.totalAmount == 0) {
      return #err("Order total must be greater than zero");
    };

    let id = "ORD-" # nextId.value.toText();
    nextId.value += 1;
    let order : OrderTypes.Order = {
      id = id;
      customerName = input.customerName;
      phone = input.phone;
      email = input.email;
      address = input.address;
      items = input.items;
      totalAmount = input.totalAmount;
      status = #Pending;
      paymentMethod = input.paymentMethod;
      createdAt = Time.now();
    };
    orders.add(id, order);
    Debug.print("[Farm72] Order created: " # id # " total=" # order.totalAmount.toText());
    #ok(order);
  };

  public func getOrders(orders : Map.Map<Text, OrderTypes.Order>) : [OrderTypes.Order] {
    let arr = orders.values().toArray();
    arr.sort(func(a : OrderTypes.Order, b : OrderTypes.Order) : { #less; #equal; #greater } {
      if (a.createdAt > b.createdAt) #less
      else if (a.createdAt < b.createdAt) #greater
      else #equal
    });
  };

  public func getOrder(orders : Map.Map<Text, OrderTypes.Order>, id : Text) : ?OrderTypes.Order {
    orders.get(id);
  };

  public func updateOrderStatus(
    orders : Map.Map<Text, OrderTypes.Order>,
    id : Text,
    status : OrderTypes.OrderStatus,
  ) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case null null;
      case (?existing) {
        let updated = { existing with status = status };
        orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func getRecentOrders(orders : Map.Map<Text, OrderTypes.Order>, limit : Nat) : [OrderTypes.Order] {
    let all = getOrders(orders);
    if (all.size() <= limit) all
    else all.sliceToArray(0, limit.toInt());
  };
};
