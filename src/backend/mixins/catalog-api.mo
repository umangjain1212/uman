import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CatalogLib "../lib/catalog";
import CatalogTypes "../types/catalog";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Text, CatalogTypes.Product>,
) {
  // Seed products on first admin call if empty
  private func ensureCatalogSeeded() {
    CatalogLib.seedDefaultProducts(products);
  };

  // Public reads — no auth required, returns visible products only
  public query func getProducts() : async [CatalogTypes.Product] {
    CatalogLib.getVisibleProducts(products);
  };

  public query func getProduct(id : Text) : async ?CatalogTypes.Product {
    CatalogLib.getProduct(products, id);
  };

  // Admin: get ALL products including hidden
  public shared ({ caller }) func getAdminProducts() : async [CatalogTypes.Product] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all products");
    };
    ensureCatalogSeeded();
    CatalogLib.getProducts(products);
  };

  // Admin mutations
  public shared ({ caller }) func addProduct(input : CatalogTypes.ProductInput) : async CatalogTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    CatalogLib.addProduct(products, input);
  };

  public shared ({ caller }) func updateProduct(id : Text, input : CatalogTypes.ProductInput) : async ?CatalogTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    CatalogLib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    CatalogLib.deleteProduct(products, id);
  };

  public shared ({ caller }) func toggleProductVisibility(id : Text) : async ?CatalogTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can toggle product visibility");
    };
    CatalogLib.toggleVisibility(products, id);
  };
};
