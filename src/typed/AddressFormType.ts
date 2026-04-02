import latop from '@img/latop.png';
import mobile from '@img/mobile1.png';
import shoes from '@img/shoes.png';

export type AddressFormType = {
   id?: string; // 🔑 optional Firestore doc ID
    userId?: string;
    fullName: string;
    mobileNumber: string;
    pincode: string;
    city: string;
    state: string;
    buildingName: string;
    streetName: string;
    landmark: string;
    addressType: 'Home' | 'Office' | '';
    useDefault: boolean;
};
// Extended type with Firestore doc id
export interface AddressWithId extends AddressFormType {
  id: string;   // 🔑 Firestore document ID


}


