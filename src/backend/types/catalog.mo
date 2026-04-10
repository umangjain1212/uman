module {
  public type Product = {
    id : Text;
    name : Text;
    price : Nat; // INR paisa
    imageUrl : Text;
    description : Text;
    category : Text;
    benefits : [Text];
  };
};
