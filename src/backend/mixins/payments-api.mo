import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import PaymentTypes "../types/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Text, PaymentTypes.StripeOrderRequest>,
  stripeConfig : { var config : ?Stripe.StripeConfiguration },
) {
  public query func isStripeConfigured() : async Bool {
    stripeConfig.config != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig.config := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to checkout");
    };
    let cfg = switch (stripeConfig.config) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(cfg, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let cfg = switch (stripeConfig.config) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(cfg, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
