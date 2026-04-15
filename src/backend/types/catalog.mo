module {
  // Extended product variant
  public type ProductVariant = {
    variantId : Text;
    variantLabel : Text;
    price : Nat; // INR paisa
    stock : Nat;
  };

  // Extended product (replaces static version)
  public type Product = {
    id : Text;
    name : Text;
    shortDescription : Text;
    longDescription : Text;
    imageUrl : Text;
    category : Text;
    benefits : [Text];
    variants : [ProductVariant];
    isVisible : Bool;
    displayOrder : Nat;
    // legacy scalar price kept for Stripe compatibility
    price : Nat;
    description : Text;
  };

  public type ProductInput = {
    id : Text;
    name : Text;
    shortDescription : Text;
    longDescription : Text;
    imageUrl : Text;
    category : Text;
    benefits : [Text];
    variants : [ProductVariant];
    isVisible : Bool;
    displayOrder : Nat;
    price : Nat;
    description : Text;
  };
};
