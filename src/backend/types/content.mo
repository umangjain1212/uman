module {
  // ---- Admin Auth (Internet Identity principal-based) ----
  // Stores the admin principal as text; null = no admin set yet (bootstrap state)
  public type AdminPrincipalStore = {
    var adminPrincipalText : ?Text;
  };

  // ---- Site Settings ----
  public type SiteSettings = {
    whatsappNumber : Text;
    contactEmail : Text;
    footerText : Text;
    stripeEnabled : Bool;
    whatsappOrderEnabled : Bool;
    showAnnouncementBanner : Bool;
    announcementBannerText : Text;
    maintenanceMode : Bool;
  };

  public type SiteSettingsInput = {
    whatsappNumber : ?Text;
    contactEmail : ?Text;
    footerText : ?Text;
    stripeEnabled : ?Bool;
    whatsappOrderEnabled : ?Bool;
    showAnnouncementBanner : ?Bool;
    announcementBannerText : ?Text;
    maintenanceMode : ?Bool;
  };

  // ---- Hero Slides ----
  public type HeroSlide = {
    id : Text;
    imageUrl : Text;
    title : Text;
    subtitle : Text;
    highlight : Text;
    displayOrder : Nat;
    isVisible : Bool;
  };

  public type HeroSlideInput = {
    id : Text;
    imageUrl : Text;
    title : Text;
    subtitle : Text;
    highlight : Text;
    displayOrder : Nat;
    isVisible : Bool;
  };

  // ---- FAQ ----
  public type FaqItem = {
    id : Text;
    question : Text;
    answer : Text;
    displayOrder : Nat;
    isVisible : Bool;
  };

  public type FaqItemInput = {
    id : Text;
    question : Text;
    answer : Text;
    displayOrder : Nat;
    isVisible : Bool;
  };
};
