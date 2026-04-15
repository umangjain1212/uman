import CommonTypes "common";

module {
  public type AnalyticsSummary = {
    totalOrders : Nat;
    totalRevenue : Nat; // INR paisa
    pendingOrders : Nat;
    deliveredOrders : Nat;
  };

  public type TopProduct = {
    productId : Text;
    productName : Text;
    orderCount : Nat;
    revenue : Nat; // INR paisa
  };
};
