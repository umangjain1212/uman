// Migration: Drop accessControlState (was provided by MixinAuthorization, now removed).
// All other stable fields are unchanged and are inherited automatically.
import Map "mo:core/Map";

module {
  // ---- Old types (inlined from .old snapshot) ----
  type UserRole = { #admin; #guest; #user };

  type OldActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, UserRole>;
    };
  };

  // New actor has no accessControlState — explicitly discard it.
  type NewActor = {};

  public func run(old : OldActor) : NewActor {
    ignore old.accessControlState; // intentionally dropped
    {};
  };
};
