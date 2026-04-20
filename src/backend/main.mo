import Map "mo:core/Map";
import List "mo:core/List";
import Debug "mo:core/Debug";
import Runtime "mo:core/Runtime";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ObjectStorage "mo:caffeineai-object-storage/Storage";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

import ContactTypes "types/contact";
import CatalogTypes "types/catalog";
import OrderTypes "types/orders";
import CouponTypes "types/coupons";
import ContentTypes "types/content";

import ContentLib "lib/content";
import CatalogLib "lib/catalog";
import CouponLib "lib/coupons";

import CatalogMixin "mixins/catalog-api";
import ContactMixin "mixins/contact-api";
import OrdersMixin "mixins/orders-api";
import CouponsMixin "mixins/coupons-api";
import AnalyticsMixin "mixins/analytics-api";
import ContentMixin "mixins/content-api";
import ImageMixin "mixins/image-api";


actor {
  // --- Object Storage ---
  let objectStorageState = ObjectStorage.new();
  include MixinObjectStorage();

  // --- Authorization (role-based access, provides isCallerAdmin()) ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Admin Identity (Internet Identity principal-based) ---
  let adminPrincipalStore = ContentLib.initAdminPrincipalStore();

  // --- Contact messages ---
  let contactMessages = List.empty<ContactTypes.ContactMessage>();
  include ContactMixin(adminPrincipalStore, contactMessages);

  // --- Products ---
  let products = Map.empty<Text, CatalogTypes.Product>();
  include CatalogMixin(adminPrincipalStore, products);

  // --- Orders ---
  let orders = Map.empty<Text, OrderTypes.Order>();
  let nextOrderIdRef = { var value : Nat = 1 };
  include OrdersMixin(adminPrincipalStore, orders, nextOrderIdRef);

  // --- Coupons ---
  let coupons = Map.empty<Text, CouponTypes.Coupon>();
  include CouponsMixin(adminPrincipalStore, coupons);

  // --- Analytics (read-only over orders) ---
  include AnalyticsMixin(adminPrincipalStore, orders);

  // --- Content (settings, hero slides, FAQ) ---
  let siteSettingsRef = {
    var value : ContentTypes.SiteSettings = {
      whatsappNumber = "919876543210";
      contactEmail = "info@farm72.com";
      footerText = "© 2026 Farm72. All rights reserved.";
      stripeEnabled = false;
      whatsappOrderEnabled = true;
      showAnnouncementBanner = false;
      announcementBannerText = "";
      maintenanceMode = false;
    };
  };
  let heroSlides = Map.empty<Text, ContentTypes.HeroSlide>();
  let faqItems = Map.empty<Text, ContentTypes.FaqItem>();
  include ContentMixin(adminPrincipalStore, siteSettingsRef, heroSlides, faqItems);

  // --- Image Upload (object storage backed) ---
  include ImageMixin(adminPrincipalStore, objectStorageState);

  // --- Seed default data on first initialization ---
  CatalogLib.seedDefaultProducts(products);
  CouponLib.seedDefaultCoupons(coupons);
  ContentLib.seedDefaultContent(heroSlides, faqItems);

  Debug.print("[Farm72] Actor initialized. Admin principal store ready.");

  // --- Unified admin initialization ---
  // Overrides the setAdminPrincipal() from ContentMixin.
  // On first call: bootstraps ContentLib AdminPrincipalStore AND AccessControl so
  // both isAdmin() (ContentLib) and isCallerAdmin() (AccessControl) return true for the same principal.
  // On subsequent calls by the same admin: returns #ok (idempotent).
  // On calls by a different principal once admin is set: returns #err.
  public shared ({ caller }) func setAdminPrincipal() : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    Debug.print("[Farm72] setAdminPrincipal called by: " # caller.toText());

    if (ContentLib.hasAdminPrincipal(adminPrincipalStore)) {
      // Admin already bootstrapped — idempotent for the same admin, blocked for others
      if (ContentLib.isAdmin(adminPrincipalStore, caller)) {
        // Ensure AccessControl is also in sync (e.g. after an upgrade that reset it)
        AccessControl.initialize(accessControlState, caller);
        return #ok(caller.toText());
      } else {
        return #err("Unauthorized: Admin already assigned to a different principal");
      };
    };

    // First call — bootstrap both systems with this caller
    switch (ContentLib.bootstrapAdmin(adminPrincipalStore, caller)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };
    // Sync AccessControl so isCallerAdmin() returns true for this same caller
    AccessControl.initialize(accessControlState, caller);
    Debug.print("[Farm72] Both admin stores initialized for: " # caller.toText());
    #ok(caller.toText());
  };

  // --- Stripe (mock/placeholder - no real payment gateway) ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
