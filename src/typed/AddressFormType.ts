import latop from '@img/latop.png';
import mobile from '@img/mobile1.png';
import shoes from '@img/shoes.png';

export type AddressFormType = {
     id?: string;
     firestoreId?: string;  // Firestore document ID (string like "2AXDu5elQwJeT66HYCcZ")
     backendId?: number;
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
   /* id?: string; // 🔑 optional Firestore doc ID
   // userId?: string;
    userId: string;

    fullName: string;
    //mobileNumber: string;
    mobileNumber?: string;
    pincode: string;
    city: string;
    state: string;
    buildingName: string;
    streetName: string;
    landmark: string;
    addressType: 'Home' | 'Office' | '';
    useDefault: boolean; */
};

// Extended type with Firestore doc id
export interface AddressWithId extends AddressFormType {
 id: string;   // 🔑 Firestore document ID
 firestoreId?: string;  // Firestore document ID (string like "2AXDu5elQwJeT66HYCcZ")
  backendId?: number;    // Backend DB ID (Long, e.g. 116)

}

const initialFormState: AddressWithId = {
  id: "",
  firestoreId: "",
  backendId: undefined,
  userId: "",
  fullName: "",
  mobileNumber: "",
  pincode: "",
  city: "",
  state: "",
  buildingName: "",
  streetName: "",
  landmark: "",
  addressType: "",
  useDefault: false,
};
