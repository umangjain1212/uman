import List "mo:core/List";
import ContactTypes "../types/contact";

module {
  public func submitContact(
    messages : List.List<ContactTypes.ContactMessage>,
    msg : ContactTypes.ContactMessage,
  ) : Bool {
    messages.add(msg);
    true;
  };
};
