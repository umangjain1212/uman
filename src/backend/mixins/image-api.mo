import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import ContentLib "../lib/content";
import ContentTypes "../types/content";
import ObjectStorage "mo:caffeineai-object-storage/Storage";

mixin (
  adminPrincipalStore : ContentTypes.AdminPrincipalStore,
  objectStorageState : ObjectStorage.State,
) {

  // Admin-only: get an upload URL for a product or hero image.
  // The returned publicUrl can be stored as imageUrl in products/slides.
  // The uploadUrl is a pre-signed URL the frontend uses to PUT the file directly.
  public shared ({ caller }) func getImageUploadUrl(fileName : Text, _contentType : Text) : async { #ok : { uploadUrl : Text; publicUrl : Text }; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("User not authenticated");
    };
    if (not ContentLib.isAdmin(adminPrincipalStore, caller)) {
      return #err("Unauthorized: Admin access only");
    };
    if (fileName.size() == 0) {
      return #err("File name is required");
    };
    Debug.print("[Farm72] getImageUploadUrl called by: " # caller.toText() # " file=" # fileName);
    // Update gateway principals to get the latest authorized upload endpoint
    await ObjectStorage.updateGatewayPrincipals(objectStorageState);
    let authorized = objectStorageState.authorizedPrincipals;
    if (authorized.size() == 0) {
      return #err("Object storage gateway not configured");
    };
    let gatewayPrincipal = authorized[0];
    let gatewayActor = actor (gatewayPrincipal.toText()) : actor {
      storage_upload_url_v1 : ({ file_name : Text; content_type : Text }) -> async { upload_url : Text; public_url : Text };
    };
    let result = await gatewayActor.storage_upload_url_v1({
      file_name = fileName;
      content_type = _contentType;
    });
    #ok({ uploadUrl = result.upload_url; publicUrl = result.public_url });
  };
};
