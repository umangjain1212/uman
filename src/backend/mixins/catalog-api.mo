import CatalogLib "../lib/catalog";
import CatalogTypes "../types/catalog";

mixin () {
  public query func getProducts() : async [CatalogTypes.Product] {
    CatalogLib.getProducts();
  };

  public query func getProduct(id : Text) : async ?CatalogTypes.Product {
    CatalogLib.getProduct(id);
  };
};
