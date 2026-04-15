import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CouponLib "../lib/coupons";
import CouponTypes "../types/coupons";

mixin (
  accessControlState : AccessControl.AccessControlState,
  coupons : Map.Map<Text, CouponTypes.Coupon>,
) {
  // Seed default coupons on first use
  private func ensureCouponsSeeded() {
    CouponLib.seedDefaultCoupons(coupons);
  };

  // Public — used by customers at checkout
  public query func validateCoupon(code : Text) : async CouponTypes.CouponValidation {
    CouponLib.validateCoupon(coupons, code);
  };

  public shared func applyCoupon(code : Text) : async CouponTypes.CouponValidation {
    ensureCouponsSeeded();
    let validation = CouponLib.validateCoupon(coupons, code);
    switch (validation) {
      case (#Valid(_)) {
        CouponLib.incrementUsage(coupons, code);
      };
      case (_) {};
    };
    validation;
  };

  // Admin reads — returns all coupons
  public shared ({ caller }) func getAdminCoupons() : async [CouponTypes.Coupon] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view coupons");
    };
    ensureCouponsSeeded();
    CouponLib.getCoupons(coupons);
  };

  // Alias kept for backward compat
  public shared ({ caller }) func getCoupons() : async [CouponTypes.Coupon] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view coupons");
    };
    ensureCouponsSeeded();
    CouponLib.getCoupons(coupons);
  };

  // Admin mutations
  public shared ({ caller }) func addCoupon(input : CouponTypes.CouponInput) : async CouponTypes.Coupon {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create coupons");
    };
    CouponLib.createCoupon(coupons, input);
  };

  // Alias: createCoupon kept for backward compat
  public shared ({ caller }) func createCoupon(input : CouponTypes.CouponInput) : async CouponTypes.Coupon {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create coupons");
    };
    CouponLib.createCoupon(coupons, input);
  };

  public shared ({ caller }) func updateCoupon(code : Text, input : CouponTypes.CouponInput) : async ?CouponTypes.Coupon {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update coupons");
    };
    CouponLib.updateCoupon(coupons, code, input);
  };

  public shared ({ caller }) func deleteCoupon(code : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete coupons");
    };
    CouponLib.deleteCoupon(coupons, code);
  };

  // Toggle coupon active/inactive
  public shared ({ caller }) func toggleCoupon(code : Text) : async ?CouponTypes.Coupon {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can toggle coupons");
    };
    CouponLib.toggleCoupon(coupons, code);
  };
};
