import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ContentLib "../lib/content";
import ContentTypes "../types/content";

mixin (
  accessControlState : AccessControl.AccessControlState,
  siteSettings : { var value : ContentTypes.SiteSettings },
  heroSlides : Map.Map<Text, ContentTypes.HeroSlide>,
  faqItems : Map.Map<Text, ContentTypes.FaqItem>,
  adminAuth : ContentTypes.AdminAuth,
  adminSessions : Map.Map<Text, Int>,
) {

  // ---- Admin Auth (Simple Password) ----
  public func adminLogin(username : Text, password : Text) : async { #ok : Text; #err : Text } {
    ContentLib.adminLogin(adminAuth, adminSessions, username, password);
  };

  public func validateAdminSession(token : Text) : async Bool {
    ContentLib.validateAdminSession(adminSessions, token);
  };

  public func adminLogout(token : Text) : async () {
    ContentLib.adminLogout(adminSessions, token);
  };

  public func changeAdminPassword(token : Text, currentPassword : Text, newPassword : Text) : async { #ok : (); #err : Text } {
    ContentLib.changeAdminPassword(adminAuth, adminSessions, token, currentPassword, newPassword);
  };

  // ---- Site Settings ----
  public query func getSiteSettings() : async ContentTypes.SiteSettings {
    ContentLib.getSettings(siteSettings);
  };

  // New partial-update endpoint — persists all settings fields including toggles
  public func updateSiteSettingsPartial(input : ContentTypes.SiteSettingsInput) : async ContentTypes.SiteSettings {
    ContentLib.updateSettingsFromInput(siteSettings, input);
  };

  // Legacy full-replace endpoint — kept for backward compatibility
  public shared ({ caller }) func updateSiteSettings(input : ContentTypes.SiteSettings) : async ContentTypes.SiteSettings {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };
    ContentLib.updateSettings(siteSettings, input);
  };

  // ---- Hero Slides ----
  public query func getHeroSlides() : async [ContentTypes.HeroSlide] {
    ContentLib.getHeroSlides(heroSlides);
  };

  public shared ({ caller }) func addHeroSlide(input : ContentTypes.HeroSlideInput) : async ContentTypes.HeroSlide {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage hero slides");
    };
    ContentLib.upsertHeroSlide(heroSlides, input);
  };

  public shared ({ caller }) func updateHeroSlide(id : Text, input : ContentTypes.HeroSlideInput) : async ?ContentTypes.HeroSlide {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage hero slides");
    };
    if (heroSlides.get(id) == null) {
      return null;
    };
    let updatedInput : ContentTypes.HeroSlideInput = { input with id = id };
    ?ContentLib.upsertHeroSlide(heroSlides, updatedInput);
  };

  // Backward-compat upsert
  public shared ({ caller }) func upsertHeroSlide(input : ContentTypes.HeroSlideInput) : async ContentTypes.HeroSlide {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage hero slides");
    };
    ContentLib.upsertHeroSlide(heroSlides, input);
  };

  public shared ({ caller }) func deleteHeroSlide(id : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete hero slides");
    };
    ContentLib.deleteHeroSlide(heroSlides, id);
  };

  // ---- FAQ ----
  public query func getFAQs() : async [ContentTypes.FaqItem] {
    ContentLib.getFaqItems(faqItems);
  };

  // Alias for backward compat
  public query func getFaqItems() : async [ContentTypes.FaqItem] {
    ContentLib.getFaqItems(faqItems);
  };

  public shared ({ caller }) func addFAQ(input : ContentTypes.FaqItemInput) : async ContentTypes.FaqItem {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage FAQ items");
    };
    ContentLib.upsertFaqItem(faqItems, input);
  };

  public shared ({ caller }) func updateFAQ(id : Text, input : ContentTypes.FaqItemInput) : async ?ContentTypes.FaqItem {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage FAQ items");
    };
    if (faqItems.get(id) == null) {
      return null;
    };
    let updatedInput : ContentTypes.FaqItemInput = { input with id = id };
    ?ContentLib.upsertFaqItem(faqItems, updatedInput);
  };

  public shared ({ caller }) func deleteFAQ(id : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete FAQ items");
    };
    ContentLib.deleteFaqItem(faqItems, id);
  };

  // Backward-compat upsert functions
  public shared ({ caller }) func upsertFaqItem(input : ContentTypes.FaqItemInput) : async ContentTypes.FaqItem {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can manage FAQ items");
    };
    ContentLib.upsertFaqItem(faqItems, input);
  };

  public shared ({ caller }) func deleteFaqItem(id : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete FAQ items");
    };
    ContentLib.deleteFaqItem(faqItems, id);
  };
};
