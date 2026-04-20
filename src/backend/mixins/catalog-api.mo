import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";
import CatalogLib "../lib/catalog";
import CatalogTypes "../types/catalog";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  products : Map.Map<Text, CatalogTypes.Product>,
) {
  // Public reads — no auth required, returns visible products only
  public query func getProducts() : async [CatalogTypes.Product] {
    CatalogLib.getVisibleProducts(products);
  };

  public query func getProduct(id : Text) : async ?CatalogTypes.Product {
    CatalogLib.getProduct(products, id);
  };

  // Admin: get ALL products including hidden
  public shared ({ caller }) func getAdminProducts() : async { #ok : [CatalogTypes.Product]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] getAdminProducts called by: " # caller.toText());
    #ok(CatalogLib.getProducts(products));
  };

  // Admin mutations
  public shared ({ caller }) func addProduct(input : CatalogTypes.ProductInput) : async { #ok : CatalogTypes.Product; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] addProduct called by: " # caller.toText() # " id=" # input.id);
    CatalogLib.addProduct(products, input);
  };

  public shared ({ caller }) func updateProduct(id : Text, input : CatalogTypes.ProductInput) : async { #ok : CatalogTypes.Product; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] updateProduct called by: " # caller.toText() # " id=" # id);
    switch (CatalogLib.updateProduct(products, id, input)) {
      case null #err("Product not found: " # id);
      case (?p) #ok(p);
    };
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] deleteProduct called by: " # caller.toText() # " id=" # id);
    #ok(CatalogLib.deleteProduct(products, id));
  };

  public shared ({ caller }) func toggleProductVisibility(id : Text) : async { #ok : CatalogTypes.Product; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    switch (CatalogLib.toggleVisibility(products, id)) {
      case null #err("Product not found: " # id);
      case (?p) #ok(p);
    };
  };
};
