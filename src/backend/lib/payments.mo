import Map "mo:core/Map";
import PaymentTypes "../types/payments";

module {
  // Placeholder — payment flow is handled directly by the mixin via Stripe extension.
  // This module provides helper utilities for order state management.

  public func storeOrder(
    orders : Map.Map<Text, PaymentTypes.StripeOrderRequest>,
    orderId : Text,
    req : PaymentTypes.StripeOrderRequest,
  ) : () {
    orders.add(orderId, req);
  };

  public func getOrder(
    orders : Map.Map<Text, PaymentTypes.StripeOrderRequest>,
    orderId : Text,
  ) : ?PaymentTypes.StripeOrderRequest {
    orders.get(orderId);
  };
};
