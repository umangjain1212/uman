import Map "mo:core/Map";
import Debug "mo:core/Debug";
import ContentTypes "../types/content";

module {
  // ---- Admin Principal Helpers ----

  public func initAdminPrincipalStore() : ContentTypes.AdminPrincipalStore {
    { var adminPrincipalText = null };
  };

  public func isAdmin(store : ContentTypes.AdminPrincipalStore, caller : Principal) : Bool {
    switch (store.adminPrincipalText) {
      case null false; // no admin set yet — no one is admin
      case (?txt) {
        caller.toText() == txt;
      };
    };
  };

  public func setAdminPrincipal(
    store : ContentTypes.AdminPrincipalStore,
    caller : Principal,
    newAdmin : Principal,
  ) : { #ok : (); #err : Text } {
    // Allow bootstrap (no admin set yet) OR only existing admin can change it
    let callerIsAdmin = isAdmin(store, caller);
    let isBootstrap = store.adminPrincipalText == null;
    if (not isBootstrap and not callerIsAdmin) {
      return #err("Unauthorized: Only current admin can change admin principal");
    };
    store.adminPrincipalText := ?newAdmin.toText();
    Debug.print("[Farm72] Admin principal set to: " # newAdmin.toText());
    #ok(());
  };

  // Bootstrap: caller becomes admin (first-login-becomes-admin flow).
  // If admin already set, only the current admin can reassign.
  public func bootstrapAdmin(
    store : ContentTypes.AdminPrincipalStore,
    caller : Principal,
  ) : { #ok : (); #err : Text } {
    let callerIsAdmin = isAdmin(store, caller);
    let isBootstrap = store.adminPrincipalText == null;
    if (not isBootstrap and not callerIsAdmin) {
      return #err("Unauthorized: Only current admin can change admin principal");
    };
    store.adminPrincipalText := ?caller.toText();
    Debug.print("[Farm72] Admin principal bootstrapped to caller: " # caller.toText());
    #ok(());
  };

  public func getAdminPrincipal(store : ContentTypes.AdminPrincipalStore) : ?Text {
    store.adminPrincipalText;
  };

  // Returns true if an admin principal has been set (bootstrap complete).
  public func hasAdminPrincipal(store : ContentTypes.AdminPrincipalStore) : Bool {
    store.adminPrincipalText != null;
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
    Debug.print("[Farm72] Site settings updated");
    updated;
  };

  // Full-replace update
  public func updateSettings(
    settings : { var value : ContentTypes.SiteSettings },
    updated : ContentTypes.SiteSettings,
  ) : ContentTypes.SiteSettings {
    settings.value := updated;
    Debug.print("[Farm72] Site settings replaced");
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
      highlight = input.highlight;
      displayOrder = input.displayOrder;
      isVisible = input.isVisible;
    };
    slides.add(input.id, slide);
    Debug.print("[Farm72] Hero slide upserted: " # input.id);
    slide;
  };

  public func deleteHeroSlide(slides : Map.Map<Text, ContentTypes.HeroSlide>, id : Text) : Bool {
    switch (slides.get(id)) {
      case null false;
      case (?_) {
        slides.remove(id);
        Debug.print("[Farm72] Hero slide deleted: " # id);
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
        { id = "slide-1"; imageUrl = "/assets/images/hero1.png"; title = "Pure Cold Pressed Oils"; subtitle = "Healthy Living Starts Here"; highlight = "Pressed"; displayOrder = 1; isVisible = true },
        { id = "slide-2"; imageUrl = "/assets/images/hero2.png"; title = "Wood Pressed Tradition"; subtitle = "Slow. Natural. Powerful"; highlight = "Tradition"; displayOrder = 2; isVisible = true },
        { id = "slide-3"; imageUrl = "/assets/images/hero3.png"; title = "From Pure Seeds"; subtitle = "Nothing Added. Nothing Removed"; highlight = "Pure"; displayOrder = 3; isVisible = true },
        { id = "slide-4"; imageUrl = "/assets/images/hero4.jpg"; title = "Himalayan Buransh Juice"; subtitle = "Pure. Refreshing. Naturally Powerful"; highlight = "Buransh"; displayOrder = 4; isVisible = true },
        { id = "slide-5"; imageUrl = "/assets/images/hero5.jpg"; title = "Crafted for Purity"; subtitle = "Premium Quality Oils"; highlight = "Purity"; displayOrder = 5; isVisible = true },
        { id = "slide-6"; imageUrl = "/assets/images/hero7.jpg"; title = "Farm72 Naturals"; subtitle = "Straight from Nature to Your Kitchen"; highlight = "Naturals"; displayOrder = 6; isVisible = true },
      ];
      for (s in slides.vals()) { heroSlides.add(s.id, s) };
      Debug.print("[Farm72] Hero slides seeded (6 slides)");
    };
    // FAQ is hardcoded in frontend only — no backend FAQ management needed
    ignore faqItems;
  };
};
