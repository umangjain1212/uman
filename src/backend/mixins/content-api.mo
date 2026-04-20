import Map "mo:core/Map";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  siteSettings : { var value : ContentTypes.SiteSettings },
  heroSlides : Map.Map<Text, ContentTypes.HeroSlide>,
  faqItems : Map.Map<Text, ContentTypes.FaqItem>,
) {

  // ---- Internet Identity Admin Auth ----

  // setAdminPrincipal() (no-arg) is intentionally NOT defined here.
  // It is defined in main.mo so it can also sync AccessControl.initialize().
  // Defining it here would cause M0051 duplicate definition.

  // Explicit-principal version: kept for backward compat.
  // Admin can use this to transfer admin to a different principal.
  public shared ({ caller }) func setAdminPrincipalExplicit(newAdmin : Principal) : async { #ok : (); #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    Debug.print("[Farm72] setAdminPrincipalExplicit called by: " # caller.toText());
    let isBootstrap = adminPrincipalStore.adminPrincipalText == null;
    if (isBootstrap) {
      return ContentLib.bootstrapAdmin(adminPrincipalStore, caller);
    };
    ContentLib.setAdminPrincipal(adminPrincipalStore, caller, newAdmin);
  };

  // Returns the stored admin principal text (admin only).
  public shared ({ caller }) func getAdminPrincipal() : async { #ok : ?Text; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.getAdminPrincipal(adminPrincipalStore));
  };

  // Frontend calls this to verify that the current II identity is the admin.
  // Returns #ok if the caller is the admin, #err otherwise.
  public shared ({ caller }) func checkIsAdmin() : async { #ok : (); #err : Text } {
    Debug.print("[Farm72] checkIsAdmin called by: " # caller.toText());
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (ContentLib.isAdmin(adminPrincipalStore, caller)) {
      #ok(());
    } else {
      #err("Unauthorized: You are not the admin");
    };
  };

  // Returns true if an admin principal has already been registered (bootstrap complete).
  // Returns false if no admin is set yet (first-login-becomes-admin bootstrap is still open).
  public query func hasAdmin() : async Bool {
    switch (adminPrincipalStore.adminPrincipalText) {
      case null false;
      case (?_) true;
    };
  };

  // ---- Site Settings ----
  public query func getSiteSettings() : async ContentTypes.SiteSettings {
    ContentLib.getSettings(siteSettings);
  };

  // Partial-update endpoint — persists all settings fields including toggles.
  // Requires admin caller.
  public shared ({ caller }) func updateSiteSettingsPartial(input : ContentTypes.SiteSettingsInput) : async { #ok : ContentTypes.SiteSettings; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.updateSettingsFromInput(siteSettings, input));
  };

  // Legacy full-replace endpoint — kept for backward compatibility.
  public shared ({ caller }) func updateSiteSettings(input : ContentTypes.SiteSettings) : async { #ok : ContentTypes.SiteSettings; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.updateSettings(siteSettings, input));
  };

  // ---- Hero Slides ----
  public query func getHeroSlides() : async [ContentTypes.HeroSlide] {
    ContentLib.getHeroSlides(heroSlides);
  };

  public shared ({ caller }) func addHeroSlide(input : ContentTypes.HeroSlideInput) : async { #ok : ContentTypes.HeroSlide; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.upsertHeroSlide(heroSlides, input));
  };

  public shared ({ caller }) func updateHeroSlide(id : Text, input : ContentTypes.HeroSlideInput) : async { #ok : ContentTypes.HeroSlide; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    if (heroSlides.get(id) == null) {
      return #err("Hero slide not found: " # id);
    };
    let updatedInput : ContentTypes.HeroSlideInput = { input with id = id };
    #ok(ContentLib.upsertHeroSlide(heroSlides, updatedInput));
  };

  // Backward-compat upsert
  public shared ({ caller }) func upsertHeroSlide(input : ContentTypes.HeroSlideInput) : async { #ok : ContentTypes.HeroSlide; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.upsertHeroSlide(heroSlides, input));
  };

  public shared ({ caller }) func deleteHeroSlide(id : Text) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.deleteHeroSlide(heroSlides, id));
  };

  // ---- FAQ ----
  public query func getFAQs() : async [ContentTypes.FaqItem] {
    ContentLib.getFaqItems(faqItems);
  };

  // Alias for backward compat
  public query func getFaqItems() : async [ContentTypes.FaqItem] {
    ContentLib.getFaqItems(faqItems);
  };

  public shared ({ caller }) func addFAQ(input : ContentTypes.FaqItemInput) : async { #ok : ContentTypes.FaqItem; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.upsertFaqItem(faqItems, input));
  };

  public shared ({ caller }) func updateFAQ(id : Text, input : ContentTypes.FaqItemInput) : async { #ok : ContentTypes.FaqItem; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    if (faqItems.get(id) == null) {
      return #err("FAQ item not found: " # id);
    };
    let updatedInput : ContentTypes.FaqItemInput = { input with id = id };
    #ok(ContentLib.upsertFaqItem(faqItems, updatedInput));
  };

  public shared ({ caller }) func deleteFAQ(id : Text) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.deleteFaqItem(faqItems, id));
  };

  // Backward-compat upsert
  public shared ({ caller }) func upsertFaqItem(input : ContentTypes.FaqItemInput) : async { #ok : ContentTypes.FaqItem; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.upsertFaqItem(faqItems, input));
  };

  public shared ({ caller }) func deleteFaqItem(id : Text) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    #ok(ContentLib.deleteFaqItem(faqItems, id));
  };
};
