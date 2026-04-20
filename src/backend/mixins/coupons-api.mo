import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";
import CouponLib "../lib/coupons";
import CouponTypes "../types/coupons";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  coupons : Map.Map<Text, CouponTypes.Coupon>,
) {
  // Public — used by customers at checkout (no auth required)
  public query func validateCoupon(code : Text) : async CouponTypes.CouponValidation {
    CouponLib.validateCoupon(coupons, code);
  };

  public shared func applyCoupon(code : Text) : async CouponTypes.CouponValidation {
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
  public shared ({ caller }) func getAdminCoupons() : async { #ok : [CouponTypes.Coupon]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] getAdminCoupons called by: " # caller.toText());
    #ok(CouponLib.getCoupons(coupons));
  };

  // Alias kept for backward compat
  public shared ({ caller }) func getCoupons() : async { #ok : [CouponTypes.Coupon]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(CouponLib.getCoupons(coupons));
  };

  // Admin mutations
  public shared ({ caller }) func addCoupon(input : CouponTypes.CouponInput) : async { #ok : CouponTypes.Coupon; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] addCoupon called by: " # caller.toText() # " code=" # input.code);
    CouponLib.createCoupon(coupons, input);
  };

  // Alias: createCoupon kept for backward compat
  public shared ({ caller }) func createCoupon(input : CouponTypes.CouponInput) : async { #ok : CouponTypes.Coupon; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    CouponLib.createCoupon(coupons, input);
  };

  public shared ({ caller }) func updateCoupon(code : Text, input : CouponTypes.CouponInput) : async { #ok : CouponTypes.Coupon; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    switch (CouponLib.updateCoupon(coupons, code, input)) {
      case null #err("Coupon not found: " # code);
      case (?c) #ok(c);
    };
  };

  public shared ({ caller }) func deleteCoupon(code : Text) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] deleteCoupon called by: " # caller.toText() # " code=" # code);
    #ok(CouponLib.deleteCoupon(coupons, code));
  };

  // Toggle coupon active/inactive
  public shared ({ caller }) func toggleCoupon(code : Text) : async { #ok : CouponTypes.Coupon; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    switch (CouponLib.toggleCoupon(coupons, code)) {
      case null #err("Coupon not found: " # code);
      case (?c) #ok(c);
    };
  };
};
