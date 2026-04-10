module {
  public type StripeOrderRequest = {
    amount : Nat;
    currency : Text;
    customerEmail : Text;
    productIds : [Text];
  };

  public type StripeOrderResult = {
    #ok : { clientSecret : Text; orderId : Text };
    #err : Text;
  };

  public type PaymentVerifyResult = {
    #ok : Text;
    #err : Text;
  };
};
