import Types "../types/catalog";

module {
  let products : [Types.Product] = [
    {
      id = "coconut-oil";
      name = "Coconut Oil";
      price = 45000;
      imageUrl = "https://images.unsplash.com/photo-1621019736-dd5bfbdf1ca2?w=600&auto=format&fit=crop";
      description = "Pure cold-pressed coconut oil extracted using traditional Kacchi Ghani process. Rich in medium-chain fatty acids for optimal health.";
      category = "oil";
      benefits = ["Heart health", "Natural moisturizer", "Antimicrobial properties"];
    },
    {
      id = "sesame-oil";
      name = "Sesame Oil";
      price = 38000;
      imageUrl = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop";
      description = "Cold-pressed sesame oil with a rich, nutty flavour. A powerhouse of antioxidants and anti-inflammatory compounds.";
      category = "oil";
      benefits = ["Rich in antioxidants", "Anti-inflammatory", "Supports bone health"];
    },
    {
      id = "black-mustard-oil";
      name = "Black Mustard Oil";
      price = 29000;
      imageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop";
      description = "Traditional cold-pressed black mustard oil from premium quality seeds. A staple in Indian cooking with powerful therapeutic benefits.";
      category = "oil";
      benefits = ["Antibacterial properties", "Supports respiratory health", "Promotes hair growth"];
    },
    {
      id = "yellow-mustard-oil";
      name = "Yellow Mustard Oil";
      price = 27000;
      imageUrl = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop";
      description = "Bright and pungent yellow mustard oil cold-pressed to retain all natural goodness. Perfect for cooking and therapeutic use.";
      category = "oil";
      benefits = ["Aids digestive health", "Nourishes skin", "Improves circulation"];
    },
    {
      id = "sugarcane-juice";
      name = "Sugarcane Juice";
      price = 6000;
      imageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop";
      description = "Freshly pressed pure sugarcane juice with no additives or preservatives. Nature's energy drink packed with essential nutrients.";
      category = "juice";
      benefits = ["Instant energy boost", "Boosts immunity", "Supports liver health"];
    },
  ];

  public func getProducts() : [Types.Product] {
    products;
  };

  public func getProduct(id : Text) : ?Types.Product {
    products.find(func(p) { p.id == id });
  };
};
