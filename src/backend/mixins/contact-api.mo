import List "mo:core/List";
import ContactLib "../lib/contact";
import ContactTypes "../types/contact";

mixin (messages : List.List<ContactTypes.ContactMessage>) {
  public shared func submitContact(msg : ContactTypes.ContactMessage) : async Bool {
    ContactLib.submitContact(messages, msg);
  };
};
