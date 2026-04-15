import CommonTypes "common";

module {
  public type Coupon = {
    code : Text;
    discountPercent : Nat; // 0–100
    expiryDate : ?CommonTypes.Timestamp; // null = no expiry
    maxUses : ?Nat; // null = unlimited
    usageCount : Nat;
    isActive : Bool;
  };

  public type CouponInput = {
    code : Text;
    discountPercent : Nat;
    expiryDate : ?CommonTypes.Timestamp;
    maxUses : ?Nat;
    isActive : Bool;
  };

  public type CouponValidation = {
    #Valid : Nat; // discount percent
    #Expired;
    #Exhausted;
    #Inactive;
    #NotFound;
  };
};
