import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";

import ContactTypes "types/contact";
import CatalogTypes "types/catalog";
import OrderTypes "types/orders";
import CouponTypes "types/coupons";
import ContentTypes "types/content";

import CatalogLib "lib/catalog";
import CouponLib "lib/coupons";
import ContentLib "lib/content";


import CatalogMixin "mixins/catalog-api";
import ContactMixin "mixins/contact-api";
import OrdersMixin "mixins/orders-api";
import CouponsMixin "mixins/coupons-api";
import AnalyticsMixin "mixins/analytics-api";
import ContentMixin "mixins/content-api";


actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Contact messages ---
  let contactMessages = List.empty<ContactTypes.ContactMessage>();
  include ContactMixin(contactMessages);

  // --- Products (dynamic, replaces static array) ---
  let products = Map.empty<Text, CatalogTypes.Product>();
  include CatalogMixin(accessControlState, products);

  // --- Orders ---
  let orders = Map.empty<Text, OrderTypes.Order>();
  let nextOrderIdRef = { var value : Nat = 1 };
  include OrdersMixin(accessControlState, orders, nextOrderIdRef);

  // --- Coupons ---
  let coupons = Map.empty<Text, CouponTypes.Coupon>();
  include CouponsMixin(accessControlState, coupons);

  // --- Analytics (read-only over orders) ---
  include AnalyticsMixin(accessControlState, orders);

  // --- Admin Auth (simple password, no Internet Identity required) ---
  let adminAuth = ContentLib.initAdminAuth();
  let adminSessions = Map.empty<Text, Int>();

  // --- Content (settings, hero slides, FAQ) ---
  let siteSettingsRef = {
    var value : ContentTypes.SiteSettings = {
      whatsappNumber = "+91 7500010488";
      contactEmail = "";
      footerText = "© 2026 Farm72. All rights reserved.";
      stripeEnabled = true;
      whatsappOrderEnabled = true;
      showAnnouncementBanner = false;
      announcementBannerText = "";
      maintenanceMode = false;
    };
  };
  let heroSlides = Map.empty<Text, ContentTypes.HeroSlide>();
  let faqItems = Map.empty<Text, ContentTypes.FaqItem>();
  include ContentMixin(accessControlState, siteSettingsRef, heroSlides, faqItems, adminAuth, adminSessions);

  // --- Seed default data on first initialization ---
  CatalogLib.seedDefaultProducts(products);
  CouponLib.seedDefaultCoupons(coupons);
  ContentLib.seedDefaultContent(heroSlides, faqItems);

  // --- Stripe ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
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
