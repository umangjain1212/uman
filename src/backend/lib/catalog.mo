import Map "mo:core/Map";
import Debug "mo:core/Debug";
import CatalogTypes "../types/catalog";

module {
  // Returns ALL products (admin use)
  public func getProducts(products : Map.Map<Text, CatalogTypes.Product>) : [CatalogTypes.Product] {
    let arr = products.values().toArray();
    arr.sort(func(a : CatalogTypes.Product, b : CatalogTypes.Product) : { #less; #equal; #greater } {
      if (a.displayOrder < b.displayOrder) #less
      else if (a.displayOrder > b.displayOrder) #greater
      else #equal
    });
  };

  // Returns only visible products (public use)
  public func getVisibleProducts(products : Map.Map<Text, CatalogTypes.Product>) : [CatalogTypes.Product] {
    let all = getProducts(products);
    all.filter(func(p : CatalogTypes.Product) : Bool { p.isVisible });
  };

  public func getProduct(products : Map.Map<Text, CatalogTypes.Product>, id : Text) : ?CatalogTypes.Product {
    products.get(id);
  };

  public func addProduct(products : Map.Map<Text, CatalogTypes.Product>, input : CatalogTypes.ProductInput) : { #ok : CatalogTypes.Product; #err : Text } {
    if (input.id.size() == 0) return #err("Product ID is required");
    if (input.name.size() == 0) return #err("Product name is required");
    if (products.get(input.id) != null) return #err("Product with this ID already exists");
    let product : CatalogTypes.Product = {
      id = input.id;
      name = input.name;
      shortDescription = input.shortDescription;
      longDescription = input.longDescription;
      imageUrl = input.imageUrl;
      category = input.category;
      benefits = input.benefits;
      variants = input.variants;
      isVisible = input.isVisible;
      displayOrder = input.displayOrder;
      price = input.price;
      description = input.description;
    };
    products.add(input.id, product);
    Debug.print("[Farm72] Product added: " # input.id);
    #ok(product);
  };

  public func updateProduct(products : Map.Map<Text, CatalogTypes.Product>, id : Text, input : CatalogTypes.ProductInput) : ?CatalogTypes.Product {
    switch (products.get(id)) {
      case null null;
      case (?_existing) {
        let updated : CatalogTypes.Product = {
          id = id;
          name = input.name;
          shortDescription = input.shortDescription;
          longDescription = input.longDescription;
          imageUrl = input.imageUrl;
          category = input.category;
          benefits = input.benefits;
          variants = input.variants;
          isVisible = input.isVisible;
          displayOrder = input.displayOrder;
          price = input.price;
          description = input.description;
        };
        products.add(id, updated);
        Debug.print("[Farm72] Product updated: " # id);
        ?updated;
      };
    };
  };

  public func deleteProduct(products : Map.Map<Text, CatalogTypes.Product>, id : Text) : Bool {
    switch (products.get(id)) {
      case null false;
      case (?_) {
        products.remove(id);
        Debug.print("[Farm72] Product deleted: " # id);
        true;
      };
    };
  };

  public func toggleVisibility(products : Map.Map<Text, CatalogTypes.Product>, id : Text) : ?CatalogTypes.Product {
    switch (products.get(id)) {
      case null null;
      case (?existing) {
        let updated = { existing with isVisible = not existing.isVisible };
        products.add(id, updated);
        ?updated;
      };
    };
  };

  public func seedDefaultProducts(products : Map.Map<Text, CatalogTypes.Product>) : () {
    if (not products.isEmpty()) return;

    // Prices in INR (₹)
    let defaults : [CatalogTypes.Product] = [
      {
        id = "coconut-oil";
        name = "Cold Pressed Coconut Oil";
        shortDescription = "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.";
        longDescription = "Farm72 Cold Pressed Coconut Oil is extracted using the traditional Kacchi Ghani method without any heat or chemicals. Pure, natural, and packed with nutrients for cooking, hair, and skin care.";
        imageUrl = "/assets/images/coconut-oil.jpg";
        category = "oils";
        benefits = ["100% Pure Cold Pressed", "Rich in Medium Chain Fatty Acids", "No Additives or Preservatives", "Traditional Wood Press Method"];
        variants = [
          { variantId = "500ml"; variantLabel = "500ml"; price = 299; stock = 100 },
          { variantId = "1l"; variantLabel = "1L"; price = 549; stock = 100 },
        ];
        isVisible = true;
        displayOrder = 1;
        price = 299;
        description = "100% pure cold pressed coconut oil";
      },
      {
        id = "sesame-oil";
        name = "Cold Pressed Sesame Oil";
        shortDescription = "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.";
        longDescription = "Farm72 Cold Pressed Sesame Oil is rich in antioxidants and healthy fats. Extracted without heat to preserve all natural nutrients. Ideal for cooking and therapeutic use.";
        imageUrl = "/assets/images/sesame-oil.jpg";
        category = "oils";
        benefits = ["Rich in antioxidants", "Supports heart health", "Anti-inflammatory properties", "No chemicals", "Traditional extraction"];
        variants = [
          { variantId = "500ml"; variantLabel = "500ml"; price = 279; stock = 100 },
          { variantId = "1l"; variantLabel = "1L"; price = 499; stock = 100 },
        ];
        isVisible = true;
        displayOrder = 2;
        price = 279;
        description = "100% pure cold pressed sesame oil";
      },
      {
        id = "black-mustard-oil";
        name = "Cold Pressed Black Mustard Oil";
        shortDescription = "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.";
        longDescription = "Farm72 Cold Pressed Black Mustard Oil is extracted from premium black mustard seeds using the Kacchi Ghani method. Strong, pungent, and full of natural nutrients.";
        imageUrl = "/assets/images/black-mustard-oil.jpg";
        category = "oils";
        benefits = ["Antibacterial properties", "Boosts circulation", "Rich in omega-3", "No chemicals", "Kacchi Ghani method"];
        variants = [
          { variantId = "500ml"; variantLabel = "500ml"; price = 249; stock = 100 },
          { variantId = "1l"; variantLabel = "1L"; price = 449; stock = 100 },
        ];
        isVisible = true;
        displayOrder = 3;
        price = 249;
        description = "100% pure cold pressed black mustard oil";
      },
      {
        id = "yellow-mustard-oil";
        name = "Cold Pressed Yellow Mustard Oil";
        shortDescription = "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.";
        longDescription = "Farm72 Cold Pressed Yellow Mustard Oil is extracted from premium yellow mustard seeds. Rich in essential fatty acids and natural antioxidants.";
        imageUrl = "/assets/images/yellow-mustard-oil.jpg";
        category = "oils";
        benefits = ["Rich in vitamin E", "Supports digestion", "Natural preservative properties", "No additives", "Traditional process"];
        variants = [
          { variantId = "500ml"; variantLabel = "500ml"; price = 229; stock = 100 },
          { variantId = "1l"; variantLabel = "1L"; price = 429; stock = 100 },
        ];
        isVisible = true;
        displayOrder = 4;
        price = 229;
        description = "100% pure cold pressed yellow mustard oil";
      },
      {
        id = "buransh-juice";
        name = "Himalayan Buransh Juice";
        shortDescription = "Freshly extracted natural juice, preservative-free and chemical-free.";
        longDescription = "Farm72 Buransh Juice is made from fresh Himalayan Rhododendron flowers (Buransh). Handpicked from the Valley of Flowers, this pure Himalayan juice cools, heals, and nourishes naturally. No preservatives, no chemicals.";
        imageUrl = "/assets/images/buransh-juice.jpg";
        category = "juice";
        benefits = ["Keeps body cool in summer", "Good for stomach health", "Natural Himalayan flower benefits", "Rich in antioxidants", "No preservatives"];
        variants = [
          { variantId = "250ml"; variantLabel = "250ml"; price = 139; stock = 100 },
          { variantId = "500ml"; variantLabel = "500ml"; price = 249; stock = 100 },
        ];
        isVisible = true;
        displayOrder = 5;
        price = 139;
        description = "Pure Himalayan Buransh flower juice";
      },
      {
        id = "groundnut-oil";
        name = "Cold Pressed Groundnut Oil";
        shortDescription = "Cold pressed using traditional Kacchi Ghani method. 100% natural and chemical-free oil.";
        longDescription = "Farm72 Cold Pressed Groundnut Oil is extracted from premium quality groundnuts using the Kacchi Ghani method. Rich in healthy fats and natural antioxidants, perfect for everyday cooking.";
        imageUrl = "/assets/images/groundnut-oil.jpg";
        category = "oils";
        benefits = ["Rich in vitamin E", "Heart healthy fats", "High smoke point for cooking", "No chemicals", "Traditional cold press method"];
        variants = [
          { variantId = "500ml"; variantLabel = "500ml"; price = 319; stock = 100 },
          { variantId = "1l"; variantLabel = "1L"; price = 589; stock = 100 },
        ];
        isVisible = true;
        displayOrder = 6;
        price = 319;
        description = "100% pure cold pressed groundnut oil";
      },
    ];

    for (p in defaults.vals()) {
      products.add(p.id, p);
    };
    Debug.print("[Farm72] Default products seeded (6 products)");
  };
};
