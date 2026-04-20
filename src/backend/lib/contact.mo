import List "mo:core/List";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import ContactTypes "../types/contact";

module {
  public func submitContact(
    messages : List.List<ContactTypes.ContactMessage>,
    name : Text,
    email : Text,
    message : Text,
  ) : { #ok : ContactTypes.ContactMessage; #err : Text } {
    if (name.size() == 0) return #err("Name is required");
    if (email.size() == 0) return #err("Email is required");
    if (message.size() < 20) return #err("Message must be at least 20 characters");
    let msg : ContactTypes.ContactMessage = {
      name = name;
      email = email;
      message = message;
      timestamp = Time.now();
    };
    messages.add(msg);
    Debug.print("[Farm72] Contact message from: " # name);
    #ok(msg);
  };

  public func getMessages(messages : List.List<ContactTypes.ContactMessage>) : [ContactTypes.ContactMessage] {
    // Return newest first
    let arr = messages.toArray();
    arr.reverse();
  };
};
