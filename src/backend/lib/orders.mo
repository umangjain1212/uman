import Map "mo:core/Map";
import Time "mo:core/Time";
import OrderTypes "../types/orders";

module {
  public func storeOrder(
    orders : Map.Map<Text, OrderTypes.Order>,
    nextId : { var value : Nat },
    input : OrderTypes.OrderInput,
  ) : OrderTypes.Order {
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
    order;
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
