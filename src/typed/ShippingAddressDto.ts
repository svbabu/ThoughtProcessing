import { AddressFormType } from "./AddressFormType";

export interface ShippingAddressDto extends AddressFormType {
  id?: string;
  userId: string;
  fullName: string;
  buildingName?: string;
  streetName?: string;
  addressLine1?: string;   // ✅ added
  addressLine2?: string;   // ✅ added
  city?: string;
  state?: string;
  pincode?: string;
  mobileNumber?: string;
  landmark?: string;
  //addressType?: string;
  addressType: 'Home' | 'Office' | '';
  useDefault?: boolean;
   postalCode?: string;     // ✅ if backend uses postalCode
    country?: string;
}

// Extended type for frontend state
export interface AddressWithId extends ShippingAddressDto {
  firestoreId?: string;       // Firestore document ID
}