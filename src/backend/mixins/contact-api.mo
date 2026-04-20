import List "mo:core/List";
import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";
import ContactLib "../lib/contact";
import ContactTypes "../types/contact";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  messages : List.List<ContactTypes.ContactMessage>,
) {
  // Public — anyone can submit a contact message
  public shared func submitContact(name : Text, email : Text, message : Text) : async { #ok : ContactTypes.ContactMessage; #err : Text } {
    Debug.print("[Farm72] submitContact from: " # name);
    ContactLib.submitContact(messages, name, email, message);
  };

  // Admin — view all contact messages (newest first)
  public shared ({ caller }) func getContactMessages() : async { #ok : [ContactTypes.ContactMessage]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    Debug.print("[Farm72] getContactMessages called by: " # caller.toText());
    #ok(ContactLib.getMessages(messages));
  };
};
