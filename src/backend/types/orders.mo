import CommonTypes "common";

module {
  public type OrderStatus = {
    #Pending;
    #Confirmed;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type PaymentMethod = {
    #Stripe;
    #WhatsApp;
  };

  public type OrderItem = {
    productId : Text;
    productName : Text;
    variantId : Text;
    variantLabel : Text;
    quantity : Nat;
    unitPrice : Nat; // INR paisa
  };

  public type Order = {
    id : Text;
    customerName : Text;
    phone : Text;
    email : Text;
    address : Text;
    items : [OrderItem];
    totalAmount : Nat; // INR paisa
    status : OrderStatus;
    paymentMethod : PaymentMethod;
    createdAt : CommonTypes.Timestamp;
  };

  public type OrderInput = {
    customerName : Text;
    phone : Text;
    email : Text;
    address : Text;
    items : [OrderItem];
    totalAmount : Nat;
    paymentMethod : PaymentMethod;
  };
};
