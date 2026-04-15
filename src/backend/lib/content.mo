import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import ContentTypes "../types/content";

module {
  // ---- Admin Auth ----
  let DEFAULT_PASSWORD = "Farm72@Admin";
  let SESSION_TTL_NS : Int = 86_400_000_000_000; // 24 hours in nanoseconds

  public func adminLogin(
    adminAuth : ContentTypes.AdminAuth,
    sessions : Map.Map<Text, Int>,
    username : Text,
    password : Text,
  ) : { #ok : Text; #err : Text } {
    if (username != "admin") {
      return #err("Invalid credentials");
    };
    if (password != adminAuth.passwordHash) {
      return #err("Invalid credentials");
    };
    // Generate a simple token based on timestamp
    let now = Time.now();
    let token = "farm72-" # now.toText();
    let expiry = now + SESSION_TTL_NS;
    sessions.add(token, expiry);
    #ok(token);
  };

  public func validateAdminSession(sessions : Map.Map<Text, Int>, token : Text) : Bool {
    switch (sessions.get(token)) {
      case null false;
      case (?expiry) {
        if (Time.now() > expiry) {
          sessions.remove(token);
          false;
        } else {
          true;
        };
      };
    };
  };

  public func adminLogout(sessions : Map.Map<Text, Int>, token : Text) : () {
    sessions.remove(token);
  };

  public func changeAdminPassword(
    adminAuth : ContentTypes.AdminAuth,
    sessions : Map.Map<Text, Int>,
    token : Text,
    currentPassword : Text,
    newPassword : Text,
  ) : { #ok : (); #err : Text } {
    if (not validateAdminSession(sessions, token)) {
      return #err("Invalid or expired session");
    };
    if (currentPassword != adminAuth.passwordHash) {
      return #err("Current password is incorrect");
    };
    if (newPassword.size() < 6) {
      return #err("New password must be at least 6 characters");
    };
    adminAuth.passwordHash := newPassword;
    #ok(());
  };

  public func initAdminAuth() : ContentTypes.AdminAuth {
    { var passwordHash = DEFAULT_PASSWORD };
  };

  // ---- Site Settings ----
  public func getSettings(settings : { var value : ContentTypes.SiteSettings }) : ContentTypes.SiteSettings {
    settings.value;
  };

  public func updateSettingsFromInput(
    settings : { var value : ContentTypes.SiteSettings },
    input : ContentTypes.SiteSettingsInput,
  ) : ContentTypes.SiteSettings {
    let current = settings.value;
    let updated : ContentTypes.SiteSettings = {
      whatsappNumber = switch (input.whatsappNumber) { case (?v) v; case null current.whatsappNumber };
      contactEmail = switch (input.contactEmail) { case (?v) v; case null current.contactEmail };
      footerText = switch (input.footerText) { case (?v) v; case null current.footerText };
      stripeEnabled = switch (input.stripeEnabled) { case (?v) v; case null current.stripeEnabled };
      whatsappOrderEnabled = switch (input.whatsappOrderEnabled) { case (?v) v; case null current.whatsappOrderEnabled };
      showAnnouncementBanner = switch (input.showAnnouncementBanner) { case (?v) v; case null current.showAnnouncementBanner };
      announcementBannerText = switch (input.announcementBannerText) { case (?v) v; case null current.announcementBannerText };
      maintenanceMode = switch (input.maintenanceMode) { case (?v) v; case null current.maintenanceMode };
    };
    settings.value := updated;
    updated;
  };

  // Keep backward compat for full-replace update
  public func updateSettings(
    settings : { var value : ContentTypes.SiteSettings },
    updated : ContentTypes.SiteSettings,
  ) : ContentTypes.SiteSettings {
    settings.value := updated;
    updated;
  };

  // ---- Hero Slides ----
  public func getHeroSlides(slides : Map.Map<Text, ContentTypes.HeroSlide>) : [ContentTypes.HeroSlide] {
    let arr = slides.values().toArray();
    arr.sort(func(a : ContentTypes.HeroSlide, b : ContentTypes.HeroSlide) : { #less; #equal; #greater } {
      if (a.displayOrder < b.displayOrder) #less
      else if (a.displayOrder > b.displayOrder) #greater
      else #equal
    });
  };

  public func upsertHeroSlide(
    slides : Map.Map<Text, ContentTypes.HeroSlide>,
    input : ContentTypes.HeroSlideInput,
  ) : ContentTypes.HeroSlide {
    let slide : ContentTypes.HeroSlide = {
      id = input.id;
      imageUrl = input.imageUrl;
      title = input.title;
      subtitle = input.subtitle;
      displayOrder = input.displayOrder;
      isVisible = input.isVisible;
    };
    slides.add(input.id, slide);
    slide;
  };

  public func deleteHeroSlide(slides : Map.Map<Text, ContentTypes.HeroSlide>, id : Text) : Bool {
    switch (slides.get(id)) {
      case null false;
      case (?_) {
        slides.remove(id);
        true;
      };
    };
  };

  // ---- FAQ ----
  public func getFaqItems(faq : Map.Map<Text, ContentTypes.FaqItem>) : [ContentTypes.FaqItem] {
    let arr = faq.values().toArray();
    arr.sort(func(a : ContentTypes.FaqItem, b : ContentTypes.FaqItem) : { #less; #equal; #greater } {
      if (a.displayOrder < b.displayOrder) #less
      else if (a.displayOrder > b.displayOrder) #greater
      else #equal
    });
  };

  public func upsertFaqItem(
    faq : Map.Map<Text, ContentTypes.FaqItem>,
    input : ContentTypes.FaqItemInput,
  ) : ContentTypes.FaqItem {
    let item : ContentTypes.FaqItem = {
      id = input.id;
      question = input.question;
      answer = input.answer;
      displayOrder = input.displayOrder;
      isVisible = input.isVisible;
    };
    faq.add(input.id, item);
    item;
  };

  public func deleteFaqItem(faq : Map.Map<Text, ContentTypes.FaqItem>, id : Text) : Bool {
    switch (faq.get(id)) {
      case null false;
      case (?_) {
        faq.remove(id);
        true;
      };
    };
  };

  public func seedDefaultContent(
    heroSlides : Map.Map<Text, ContentTypes.HeroSlide>,
    faqItems : Map.Map<Text, ContentTypes.FaqItem>,
  ) : () {
    // Seed hero slides if empty
    if (heroSlides.isEmpty()) {
      let slides : [ContentTypes.HeroSlide] = [
        { id = "hero1"; imageUrl = "/assets/hero1.jpg"; title = "Farm72: Pure Cold Pressed Oil & Buransh Juice"; subtitle = "100% Natural | Chemical Free | No Preservatives Added | Purely Natural"; displayOrder = 1; isVisible = true },
        { id = "hero2"; imageUrl = "/assets/hero2.jpg"; title = "Farm72: Pure Cold Pressed Oil & Buransh Juice"; subtitle = "100% Natural | Chemical Free | No Preservatives Added | Purely Natural"; displayOrder = 2; isVisible = true },
        { id = "hero3"; imageUrl = "/assets/hero3.jpg"; title = "Farm72: Pure Cold Pressed Oil & Buransh Juice"; subtitle = "100% Natural | Chemical Free | No Preservatives Added | Purely Natural"; displayOrder = 3; isVisible = true },
        { id = "hero4"; imageUrl = "/assets/hero4.jpg"; title = "Farm72: Pure Cold Pressed Oil & Buransh Juice"; subtitle = "100% Natural | Chemical Free | No Preservatives Added | Purely Natural"; displayOrder = 4; isVisible = true },
        { id = "hero5"; imageUrl = "/assets/hero5.jpg"; title = "Farm72: Pure Cold Pressed Oil & Buransh Juice"; subtitle = "100% Natural | Chemical Free | No Preservatives Added | Purely Natural"; displayOrder = 5; isVisible = true },
        { id = "hero6"; imageUrl = "/assets/hero6.jpg"; title = "Farm72: Pure Cold Pressed Oil & Buransh Juice"; subtitle = "100% Natural | Chemical Free | No Preservatives Added | Purely Natural"; displayOrder = 6; isVisible = true },
      ];
      for (s in slides.vals()) { heroSlides.add(s.id, s) };
    };

    // Seed FAQ items if empty — only seeds on first initialization, preserves user edits
    if (faqItems.isEmpty()) {
      let faqs : [ContentTypes.FaqItem] = [
        {
          id = "faq1";
          question = "Cold Pressed Oil kya hota hai?";
          answer = "Cold Pressed Oil woh tel hota hai jo beejo ya akhrot se bina kisi garmi ke nikala jaata hai. Beejo ko mechanically press kiya jaata hai kam temperature par — ise Kacchi Ghani process bhi kehte hain. Isse saare natural nutrients, vitamins, aur antioxidants preserve rehte hain.";
          displayOrder = 1;
          isVisible = true;
        },
        {
          id = "faq2";
          question = "Cold Pressed aur Expeller Pressed mein kya fark hai?";
          answer = "Cold Pressed oil 49°C se kam temperature par nikala jaata hai, jo saare nutrients preserve karta hai. Expeller Pressed mein friction se 60-99°C tak temperature badh jaata hai jisse kai natural compounds destroy ho jaate hain. Cold Pressed zyada healthy aur natural hota hai.";
          displayOrder = 2;
          isVisible = true;
        },
        {
          id = "faq3";
          question = "Cold Pressed oil ko Refined Oil se better kyun maana jaata hai?";
          answer = "Refined oil mein high heat, chemicals (hexane), bleaching, aur deodorization hoti hai jo zyada nutrients destroy kar deti hai. Cold Pressed oil mein koi chemical treatment nahi hoti — natural vitamins, omega fatty acids, aur antioxidants poore rehte hain. Isliye Cold Pressed far healthier hai.";
          displayOrder = 3;
          isVisible = true;
        },
        {
          id = "faq4";
          question = "Kya Cold Pressed Oil mein tali cheezein ban sakti hain?";
          answer = "Haan! Farm72 ke Cold Pressed oils moderate temperature par cooking ke liye perfectly suitable hain. Talna, tadka lagana, ya sabji banana — sab ke liye use kar sakte hain. Bas bahut high flame se bachein taaki nutrients preserve rahein.";
          displayOrder = 4;
          isVisible = true;
        },
        {
          id = "faq5";
          question = "Shelf life kitni hoti hai Cold Pressed Oil ki?";
          answer = "Farm72 ke Cold Pressed oils ki shelf life manufacturing date se 12 mahine hai. Inhe cool, dry jagah mein direct sunlight se door store karein. Khulne ke baad 6 mahine mein use kar lein best quality ke liye.";
          displayOrder = 5;
          isVisible = true;
        },
        {
          id = "faq6";
          question = "Tel mein talaab (sediment) kyun dikhta hai?";
          answer = "Yeh bilkul safe hai! Kyunki Farm72 ke oils kisi bhi chemical ya solvent se filter nahi kiye jaate, oil seeds ke natural particles neeche settle ho sakte hain. Yeh purity ki nishaani hai — use karne se pehle bottle ko achhe se shake kar lein.";
          displayOrder = 6;
          isVisible = true;
        },
        {
          id = "faq7";
          question = "Kya yeh oils lab tested hain?";
          answer = "Haan! Farm72 ke saare products quality check se guzarte hain. Hum ensure karte hain ki koi bhi product pure aur natural ho bina kisi adulteration ke. No chemicals, no artificial additives, no external processing agents.";
          displayOrder = 7;
          isVisible = true;
        },
        {
          id = "faq8";
          question = "Buransh Juice kya hai?";
          answer = "Buransh Juice Himalayan Rhododendron (Buransh) ke phoolon se banaya jaata hai. Yeh vibrant laal phool spring mein khilte hain aur Himalayas ki Valley of Flowers se fresh handpick kiye jaate hain. Bilkul pure aur natural — koi preservative nahi, koi chemical nahi.";
          displayOrder = 8;
          isVisible = true;
        },
        {
          id = "faq9";
          question = "Buransh Juice peene ke kya fayde hain?";
          answer = "Buransh Juice garmiyon mein sharir ko thanda rakhta hai, liver health support karta hai, digestion mein madad karta hai, aur antioxidants ka rich source hai. Traditionally heart health ke liye bhi use hota hai aur inflammation kam karta hai.";
          displayOrder = 9;
          isVisible = true;
        },
        {
          id = "faq10";
          question = "Buransh Juice mein koi preservative hai?";
          answer = "Bilkul nahi! Farm72 Buransh Juice freshly extracted hai aur 100% preservative-free aur chemical-free hai. Koi artificial color, flavor, ya preservative nahi daala jaata. Pure Himalayan goodness.";
          displayOrder = 10;
          isVisible = true;
        },
        {
          id = "faq11";
          question = "Kya Farm72 products safe hain?";
          answer = "Haan, poori tarah se safe hain. Farm72 ke saare products 100% pure aur natural hain — koi additives nahi, koi chemicals nahi, traditional extraction process. As the oil is not filtered using any chemical or solvents, oil seed particles might settle at the bottom which is completely natural and safe for consumption.";
          displayOrder = 11;
          isVisible = true;
        },
        {
          id = "faq12";
          question = "Farm72 se order kaise kare?";
          answer = "Farm72 se order karna bahut simple hai — hamare website ke Shop section mein jaayein, product choose karein, cart mein add karein, aur checkout karein. Aap WhatsApp pe +91 7500010488 par bhi directly order kar sakte hain ya phone pe contact kar sakte hain.";
          displayOrder = 12;
          isVisible = true;
        },
      ];
      for (f in faqs.vals()) { faqItems.add(f.id, f) };
    };
  };
};
