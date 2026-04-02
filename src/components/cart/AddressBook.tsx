// src/components/AddressBook.tsx
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, query, where, getDocs, deleteDoc, doc,setDoc,updateDoc } from "firebase/firestore";
import ShippingAddress from "./ShippingAddress"; // reuse your form
import { AddressFormType } from '../../typed/AddressFormType';
import { toast } from 'react-toastify';
import axios from "axios";



interface ShippingAddressProps {
 //form: AddressFormType;
   form: AddressFormType;
  setForm: React.Dispatch<React.SetStateAction<AddressFormType>>;
  onContinue: () => void;
  onAddressSaved?: () => void;
   isEditing: boolean;   // 🔑 add this
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // optional, if you want child to control it
     showForm: boolean;
      setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialFormState: AddressWithId = {
  id: "",          // 🔑 include id
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

interface AddressWithId extends AddressFormType {
  id: string;
  //useDefault?: boolean; // mirrors backend field, but optional in Firebase
    //isDefault?: boolean;
    // onAddressSaved?: () => void;
}

const AddressBook: React.FC = () => {
    const [addresses, setAddresses] = useState<AddressWithId[]>([]);
     const [defaultAddress, setDefaultAddress] = useState<any>(null);
   /*  const [addresses, setAddresses] = useState<AddressFormType[]>([]); */
  /* const [addresses, setAddresses] = useState<any[]>([]); */
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AddressWithId>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);


          /*  const newDocRef = doc(collection(db, "addresses"));

           await setDoc(newDocRef, {
             ...form,
             userId: uid,
             useDefault: form.useDefault
           });

           toast.success("Address saved successfully!");
           //if (onAddressSaved) onAddressSaved();
         } catch (error) {
           console.error("Error saving address:", error);
           toast.error("Failed to save address");
         } */




  /*   // 🔁 Clear existing defaults
    const q = query(collection(db, "addresses"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    snapshot.forEach(async docSnap => {
      await updateDoc(doc(db, "addresses", docSnap.id), { useDefault: false });
    });

    // ✅ Save this one as default
    await setDoc(doc(db, "addresses", uid), {
      ...form,
      userId: uid,
      useDefault: true
    }, { merge: true });

    toast.success("Address saved successfully!");
    //if (onAddressSaved) onAddressSaved();
  } catch (error) {
    console.error("Error saving address:", error);
    toast.error("Failed to save address");
  } */



 /* const newAddressRef = async () => {
   const uid = getAuth().currentUser?.uid;
   if (!uid) return;

   try {
     const newDocRef = doc(collection(db, "addresses")); // 🔑 unique Firestore doc ID
     await setDoc(newDocRef, {
       ...form,
       userId: uid,
       useDefault: form.useDefault
     });

     toast.success("Address saved successfully!");
     // if (onAddressSaved) onAddressSaved();
   } catch (error) {
     console.error("Error saving address:", error);
     toast.error("Failed to save address");
   }
 }; */
const saveAddress  = async (formData: AddressWithId) => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return;

  try {
    if (formData.id) {
      // ✅ Editing existing address
      await setDoc(doc(db, "addresses", formData.id), {
        ...formData,
        userId: uid,
        isDefault: formData.useDefault,
      }, { merge: true });
    } else {
      // ✅ Adding new address
      const newDocRef = doc(collection(db, "addresses"));
      await setDoc(newDocRef, {
        ...formData,
        userId: uid,
        isDefault: formData.useDefault,
      });
    }

    toast.success("Address saved successfully!");
    fetchAddresses();       // refresh list
    fetchDefaultAddress();  // refresh default
  } catch (error) {
    console.error("Error saving address:", error);
    toast.error("Failed to save address");
  }
};


   const fetchDefaultAddress = async () => {
     const userId = getAuth().currentUser?.uid;
     if (!userId) return;
     try {
       // Firestore first
     const q = query(
       collection(db, 'addresses'),
       where('userId', '==', userId),
       where('useDefault', '==', true)
     );



       const snapshot = await getDocs(q);
       if (!snapshot.empty) {
           setDefaultAddress({
             id: snapshot.docs[0].id,
             ...(snapshot.docs[0].data() as AddressFormType)
           });
         //setDefaultAddress(snapshot.docs[0].data() as AddressFormType);
         return;
       }

       // Backend fallback
       const res = await axios.get(`http://localhost:8081/api/shipping/default/${userId}`);
       if (res.data) {
         setDefaultAddress(res.data);
         toast.success('Default address loaded successfully');
       }
     } catch (error) {


   console.error('Error fetching default address:', error);
       toast.error('Failed to load default address');


  }
};



  const fetchAddresses = async () => {
     const userId = getAuth().currentUser?.uid;
        if (!userId) return;
        try {
          const q = query(collection(db, "addresses"), where("userId", "==", userId));
          const snapshot = await getDocs(q);
          const list: AddressWithId[] = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...(docSnap.data() as AddressFormType)
          }));
          setAddresses(list);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
 useEffect(() => {
   fetchAddresses();       // ✅ load all addresses
   fetchDefaultAddress();  // ✅ load default address
 }, []);



   const handleDelete = async (id: string) => {
     const uid = getAuth().currentUser?.uid;
     if (!uid) return;

     try {
       // ✅ Delete only if user owns the doc
       await deleteDoc(doc(db, "addresses", id));

       // Refresh both list and default
       fetchAddresses();
       fetchDefaultAddress();

       toast.success("Address deleted successfully!");
     } catch (error) {
       console.error("Error deleting address:", error);
       toast.error("Failed to delete address");
     }
   };


   const handleEdit = (address: AddressWithId) => {
     setForm(address);   // ✅ loads saved data  // ✅ form now includes id
      setIsEditing(true); // 🔑 mark as editing mode
     setShowForm(true); // ✅ opens form
   };



    const handleAddNew = () => {
      setForm(initialFormState); // reset form for new address
      setIsEditing(false);       // 🔑 mark as new
      setShowForm(true);
    };

  return (
     <div className="address-book">
          <h3>Address Book</h3>
          <p>Manage your shipping and billing addresses.</p>
          {!showForm && (
            <button className="btn btn-outline-primary mb-3" onClick={handleAddNew}>
              ➕ Create New Address
            </button>
          )}
      <ul className="list-group">
        {addresses.map(addr => (
          <li key={addr.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{addr.fullName}</strong>
              {addr.useDefault && <span className="badge bg-success ms-2">Default</span>}
              <br />
              {addr.buildingName}, {addr.streetName}, {addr.city} - {addr.pincode}
            </div>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(addr)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(addr.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>


            {showForm && (
                    <ShippingAddress
                      form={form as AddressFormType}
                      //setForm={setForm}
                      setForm={setForm as React.Dispatch<React.SetStateAction<AddressFormType>>}
                      onContinue={() => setShowForm(false)}
                      onAddressSaved={fetchDefaultAddress}
                       isEditing={isEditing}                 // 🔑 pass down
                       setIsEditing={setIsEditing}           // optional
                       showForm={showForm}
                       setShowForm={setShowForm}
                    />
                  )}
                </div>
  );
};

export default AddressBook;
