// AddressService.ts
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { collection, doc, setDoc, getDocs, query, where,deleteDoc } from "firebase/firestore";
import { AddressFormType } from "../typed/AddressFormType";
import { ShippingAddressDto,AddressWithId } from "../typed/ShippingAddressDto";


// Define a merged type
/* export interface AddressWithId extends ShippingAddressDto {
  // id?: string;
  firestoreId?: string;
   backendId?: number;
  useDefault?: boolean;

} */
// Map frontend form to backend payload
/* const mapFormToPayload = (formData: AddressFormType, userId: string) => ({
  userId,
  fullName: formData.fullName,
  mobileNumber: formData.mobileNumber,
  postalCode: formData.pincode,
  city: formData.city,
  state: formData.state,
  addressLine1: `${formData.buildingName} ${formData.streetName}`,
  landmark: formData.landmark,
  addressType: formData.addressType,
  useDefault: formData.useDefault,
});*/
const mapFormToPayload = (formData: AddressFormType, userId: string) => {
  const payload: any = {
    userId,
    fullName: formData.fullName,
    mobileNumber: formData.mobileNumber,
    buildingName:formData.buildingName,
    streetName:formData.streetName,
    pincode: formData.pincode,
    city: formData.city,
    state: formData.state,
    addressLine1: `${formData.buildingName} ${formData.streetName}`,
    landmark: formData.landmark,
    addressType: formData.addressType,
    useDefault: formData.useDefault,
  };

  if (formData.id) {
    payload.id = formData.id; // include backend id for update
  }

  return cleanPayload(payload);
};

// Utility: remove undefined values
   const cleanPayload = (payload: any) => {
     return Object.fromEntries(
       Object.entries(payload).filter(([_, v]) => v !== undefined)
     );
   };


// Save or update address
/*
export const saveAddress = async (formData: AddressFormType): Promise<ShippingAddressDto> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");

  */
/*  const firestorePayload = { ...formData, userId: uid, useDefault: formData.useDefault }; *//*

const firestorePayload = cleanPayload({
  ...formData,
  userId: uid,
  useDefault: formData.useDefault,
});

  const backendPayload = mapFormToPayload(formData, uid);

  let savedAddress: ShippingAddressDto;

   */
/* if (formData.firestoreId && formData.backendId) { *//*

      if (formData.firestoreId || formData.backendId) {
          // Firestore update only if firestoreId is defined
           if (formData.firestoreId) {
              await setDoc(
                doc(db, "addresses", formData.firestoreId),
                firestorePayload,
                { merge: true }
              );
            }

    // Edit existing
    //await setDoc(doc(db, "addresses", formData.firestoreId), firestorePayload, { merge: true });
      // Backend update only if backendId is defined
       if (formData.backendId) {
    const response = await axios.put(
      `http://localhost:8081/api/shipping/update/${formData.backendId}`,
      backendPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    savedAddress = response.data;
    }
   else {
    // If only Firestore was updated, reuse formData as "savedAddress"
    savedAddress = { ...formData } as ShippingAddressDto;
  }
  }//if
else {
    // Add new
    const newDocRef = doc(collection(db, "addresses"));
    await setDoc(newDocRef, firestorePayload);
    const response = await axios.post(
      "http://localhost:8081/api/shipping/save",
      backendPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    savedAddress = response.data;
    if (savedAddress.id) {
        await setDoc(newDocRef, { backendId: savedAddress.id }, { merge: true });
      }
    //await setDoc(newDocRef, { backendId: savedAddress.id }, { merge: true });
  }

  toast.success("Address saved successfully!");
   // 🔑 Return merged object with Firestore ID and useDefault
    */
/*  return {
      ...savedAddress,
      firestoreId,
      useDefault: formData.useDefault,
    }; *//*

  return savedAddress;
};
 */
 const API_URL = "http://localhost:8081/api/shipping";

 export const createAddress = async (dto: any) => {
   const res = await axios.post(`${API_URL}/save`, dto);
   return res.data; // includes id
 };

 export const updateAddress = async (id: number, dto: any) => {
   const res = await axios.put(`${API_URL}/update/${id}`, dto);
   return res.data; // includes id
 };

/*
export const saveAddress = async (formData: AddressFormType): Promise<ShippingAddressDto> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");

  const firestorePayload = cleanPayload({
    ...formData,
    userId: uid,
    useDefault: formData.useDefault,
  });

  const backendPayload = mapFormToPayload(formData, uid);

  let savedAddress: ShippingAddressDto;

  if (formData.backendId) {
    // Update existing
    const response = await axios.put(
      `http://localhost:8081/api/shipping/update/${formData.backendId}`,
      backendPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    savedAddress = response.data;

    try {
      await setDoc(
        doc(db, "addresses", String(formData.backendId)),
        firestorePayload,
        { merge: true }
      );
    } catch (err) {
      console.error("Firestore update failed:", err);
    }
  } else {
    // Create new
    const response = await axios.post(
      "http://localhost:8081/api/shipping/save",
      backendPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    savedAddress = response.data;

    try {
      await setDoc(
        doc(db, "addresses", String(savedAddress.id)),
        {
          ...firestorePayload,
          backendId: savedAddress.id,
        }
      );
    } catch (err) {
      console.error("Firestore create failed:", err);
    }
  }

  toast.success("Address saved successfully!");
  return savedAddress;
};
 */


export const saveAddress = async (formData: AddressFormType): Promise<AddressWithId> => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("User not authenticated");

  const firestorePayload = cleanPayload({
    ...formData,
    userId: uid,
    useDefault: formData.useDefault,
  });

  const backendPayload = mapFormToPayload(formData, uid);

  let savedAddress: AddressWithId;

  if (formData.id) {
    // Update existing
    const response = await axios.put(
      `http://localhost:8081/api/shipping/update/${formData.id}`,
      backendPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    savedAddress = response.data;

    try {
        if (!formData.firestoreId) {
          throw new Error("Missing firestoreId for update");
        }
      await setDoc(
        doc(db, "addresses", formData.firestoreId), // 👈 use firestoreId here
        {
          ...firestorePayload,
          id: savedAddress.id,              // backend PK stored
          userId: uid,                      // must match request.auth.uid
          firestoreId: formData.firestoreId // Firestore doc ID stored
        },
        { merge: true }
      );
      savedAddress.firestoreId = formData.firestoreId;
    } catch (err) {
      console.error("Firestore update failed:", err);
    }
  } else {
    // Create new
    const response = await axios.post(
      "http://localhost:8081/api/shipping/save",
      backendPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    savedAddress = response.data;

    try {
      // Generate a new Firestore doc reference
      const docRef = doc(collection(db, "addresses"));
      await setDoc(docRef, {
        ...firestorePayload,
        id: savedAddress.id,       // backend PK
        userId: uid,               // must match request.auth.uid
        firestoreId: docRef.id     // Firestore doc ID
      });

      savedAddress.firestoreId = docRef.id;
    } catch (err) {
      console.error("Firestore create failed:", err);
    }
  }

  toast.success("Address saved successfully!");
  console.log(":Saved Address:", savedAddress);
  return savedAddress;
};

// Fetch default address (Firestore first, fallback to backend)
//import { AddressWithId } from "../typed/ShippingAddressDto";

export const fetchDefaultAddress = async (): Promise<AddressWithId | null> => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) return null;

  try {
    // First check Firestore
    const q = query(
      collection(db, "addresses"),
      where("userId", "==", userId),
      where("useDefault", "==", true)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const docData = docSnap.data() as AddressWithId;
      return { ...docData, firestoreId: docSnap.id };
    }

    // Fallback to backend
    const res = await axios.get(
      `http://localhost:8081/api/shipping/default/${userId}`
    );
    return res.data ?? null;
  } catch (error) {
    console.error("Error fetching default address:", error);
    return null;
  }
};

// Update default address
export const updateDefaultAddress = async (addressData: AddressFormType) => {
  try {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      toast.error("No user logged in");
      return;
    }

    if (!addressData.firestoreId) {
      toast.error("Missing Firestore ID for address");
      return;
    }
const firestorePayload = cleanPayload({
      ...addressData,
      userId: uid,
      useDefault: true,
    });
    await setDoc(
      doc(db, "addresses", addressData.firestoreId),
      {
        ...addressData,
        userId: uid,
        useDefault: true,
      },
      { merge: true }
    );

    toast.success("Default address updated successfully!");
  } catch (error) {
    console.error("Error updating default address:", error);
    toast.error("Failed to update default address");
  }
};

// Fetch all addresses for the current user
export const fetchAddresses = async (): Promise<AddressWithId[]> => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) return [];

  try {
    const q = query(collection(db, "addresses"), where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const list: AddressWithId[] = snapshot.docs.map(docSnap => ({
      firestoreId: docSnap.id,
      backendId: (docSnap.data() as any).backendId,   // ✅ explicitly pull backendId
      ...(docSnap.data() as AddressFormType),
    }));

    return list;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    toast.error("Failed to fetch addresses");
    return [];
  }
};
/* import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // adjust import */

//export const deleteAddress = async (firestoreId: string, backendId?: number) => {



   export const deleteAddress = async (address: AddressWithId) => {
       const userId = getAuth().currentUser?.uid;
                if (!userId)
                  return;

    /*  const uid = getAuth().currentUser?.uid;
     if (!uid) throw new Error("User not authenticated");
 */
     // Backend delete
     try {
       if (address.id) {
         await axios.delete(`http://localhost:8081/api/shipping/delete/${address.id}`);
       }
     } catch (err) {
       console.error("Backend delete failed:", err);
     }

     try {
       if (address.firestoreId) {
         await deleteDoc(doc(db, "addresses", address.firestoreId));
       }
     } catch (err) {
       console.error("Firestore delete failed:", err);
     }
   };


