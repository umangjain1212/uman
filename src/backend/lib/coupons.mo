import Map "mo:core/Map";
import Time "mo:core/Time";
import CouponTypes "../types/coupons";

module {
  public func createCoupon(
    coupons : Map.Map<Text, CouponTypes.Coupon>,
    input : CouponTypes.CouponInput,
  ) : CouponTypes.Coupon {
    let coupon : CouponTypes.Coupon = {
      code = input.code;
      discountPercent = input.discountPercent;
      expiryDate = input.expiryDate;
      maxUses = input.maxUses;
      usageCount = 0;
      isActive = input.isActive;
    };
    coupons.add(input.code, coupon);
    coupon;
  };

  public func getCoupons(coupons : Map.Map<Text, CouponTypes.Coupon>) : [CouponTypes.Coupon] {
    coupons.values().toArray();
  };

  public func getCoupon(coupons : Map.Map<Text, CouponTypes.Coupon>, code : Text) : ?CouponTypes.Coupon {
    coupons.get(code);
  };

  public func updateCoupon(
    coupons : Map.Map<Text, CouponTypes.Coupon>,
    code : Text,
    input : CouponTypes.CouponInput,
  ) : ?CouponTypes.Coupon {
    switch (coupons.get(code)) {
      case null null;
      case (?existing) {
        let updated : CouponTypes.Coupon = {
          code = code;
          discountPercent = input.discountPercent;
          expiryDate = input.expiryDate;
          maxUses = input.maxUses;
          usageCount = existing.usageCount;
          isActive = input.isActive;
        };
        coupons.add(code, updated);
        ?updated;
      };
    };
  };

  public func deleteCoupon(coupons : Map.Map<Text, CouponTypes.Coupon>, code : Text) : Bool {
    switch (coupons.get(code)) {
      case null false;
      case (?_) {
        coupons.remove(code);
        true;
      };
    };
  };

  public func validateCoupon(
    coupons : Map.Map<Text, CouponTypes.Coupon>,
    code : Text,
  ) : CouponTypes.CouponValidation {
    switch (coupons.get(code)) {
      case null #NotFound;
      case (?c) {
        if (not c.isActive) return #Inactive;
        switch (c.expiryDate) {
          case (?expiry) {
            if (Time.now() > expiry) return #Expired;
          };
          case null {};
        };
        switch (c.maxUses) {
          case (?maxUses) {
            if (c.usageCount >= maxUses) return #Exhausted;
          };
          case null {};
        };
        #Valid(c.discountPercent);
      };
    };
  };

  public func incrementUsage(coupons : Map.Map<Text, CouponTypes.Coupon>, code : Text) : () {
    switch (coupons.get(code)) {
      case null {};
      case (?c) {
        let updated = { c with usageCount = c.usageCount + 1 };
        coupons.add(code, updated);
      };
    };
  };

  public func toggleCoupon(coupons : Map.Map<Text, CouponTypes.Coupon>, code : Text) : ?CouponTypes.Coupon {
    switch (coupons.get(code)) {
      case null null;
      case (?c) {
        let updated = { c with isActive = not c.isActive };
        coupons.add(code, updated);
        ?updated;
      };
    };
  };

  public func seedDefaultCoupons(coupons : Map.Map<Text, CouponTypes.Coupon>) : () {
    if (not coupons.isEmpty()) return;
    let farm10 : CouponTypes.Coupon = {
      code = "FARM10";
      discountPercent = 10;
      expiryDate = null;
      maxUses = null;
      usageCount = 0;
      isActive = true;
    };
    coupons.add("FARM10", farm10);
  };
};
