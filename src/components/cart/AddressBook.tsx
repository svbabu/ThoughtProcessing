// src/components/AddressBook.tsx
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, query, where, getDocs, deleteDoc, doc,setDoc,updateDoc } from "firebase/firestore";
import ShippingAddress from "./ShippingAddress"; // reuse your form
import { AddressFormType } from '../../typed/AddressFormType';
import { toast } from 'react-toastify';
import axios from "axios";
import { ShippingAddressDto,AddressWithId } from '../../typed/ShippingAddressDto';
import { saveAddress,fetchDefaultAddress,fetchAddresses,deleteAddress} from '../../typed/AddressService';
import {
  Box,
  Typography,
  Divider,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
//images
import addressbookicon from "@img/addressbookicon.png";

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
const initialFormState: AddressFormType  = {
  id: "",         // 🔑 include id
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



const AddressBook: React.FC = () =>
{
   // const [addresses, setAddresses] = useState<AddressWithId[]>([]);
     const [defaultAddress, setDefaultAddress] = useState<any>(null);
   /*  const [addresses, setAddresses] = useState<AddressFormType[]>([]); */
  /* const [addresses, setAddresses] = useState<any[]>([]); */
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
 //const [form, setForm] = useState<AddressWithId>(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  //new
const [form, setForm] = useState<AddressFormType>(initialFormState);
const [addresses, setAddresses] = useState<AddressWithId[]>([]);

function onClose() {
  setShowForm(false);     // hides the form
  setForm(initialFormState); // resets all fields
  setIsEditing(false);  // exits edit mode
}
 const handleSave = async () => {
   try {
     const userId = getAuth().currentUser?.uid;
     if (!userId) {
       toast.error("User not authenticated");
       return;
     }

     // Just pass form, since saveAddress handles mapping
     const savedAddress = await saveAddress(form);
     console.log("Saving form from addressbook:", form);

     // Update addresses state: replace existing or add new

setAddresses(prev =>
  prev.some(a => a.id === savedAddress.id || a.firestoreId === savedAddress.firestoreId)
    ? prev.map(a =>
        (a.id === savedAddress.id || a.firestoreId === savedAddress.firestoreId)
          ? { ...a, ...savedAddress }
          : a
      )
    : [...prev, { ...savedAddress }]
);

     // If default flag is set, update defaultAddress state too
     if (savedAddress.useDefault) {
       setDefaultAddress(savedAddress);
     }

    // 🔄 Refresh from Firestore
    await fetchAddresses();
     toast.success("Address book saved successfully!");
     onClose(); // Close form manually
   } catch (error) {
     console.error("❌ Failed to save address:", error);
     toast.error("Failed to save address");
   }
 };

useEffect(() => {
    const loadAddresses = async () => {
      const list = await fetchAddresses();
      setAddresses(list);

      const def = await fetchDefaultAddress();
      if (def) setDefaultAddress(def);
    };
    loadAddresses();
  }, []);

 const handleDelete = async (address: AddressWithId) => {
     const userId = getAuth().currentUser?.uid;
              if (!userId)
                return;
   try {
    /*  const uid = getAuth().currentUser?.uid;
     if (!uid) throw new Error("User not authenticated");
 */

     // Backend delete
     if (address.id) {
       await axios.delete(`http://localhost:8081/api/shipping/delete/${address.id}`);
       console.log("Deleting backend Id with address:", address.id);
     }

     // Firestore delete
     if (address.firestoreId) {
       await deleteDoc(doc(db, "addresses", address.firestoreId));
       console.log("Deleting Firestore doc Id  with address:", address.firestoreId);
     }

     if (!address.id && !address.firestoreId) {
       toast.error("Missing identifiers for this address");
       return;
     }
     // Optimistic removal
    setAddresses(prev =>
      prev.filter(a =>
        a.id !== address.id || a.firestoreId !== address.firestoreId
      )
    );
     // Refresh local state
     const list = await fetchAddresses();
     setAddresses(list);
     const def = await fetchDefaultAddress();
     if (def) setDefaultAddress(def);

     toast.success("Address deleted successfully!");
   } catch (error) {
     console.error("❌ Failed to delete address:", error);
     toast.error("Failed to delete address");
   }
 };





//handleedit
   const handleEdit = (address: AddressWithId) => {
     setForm({
       ...address,
      firestoreId: address.firestoreId ?? "", //keep firestorid
       id: String(address.id),  // use backend PK
     });
     setIsEditing(true);   // mark editing mode
     setShowForm(true);    // open the form
   };





    const handleAddNew = () => {
      setForm(initialFormState); // reset form for new address
      setIsEditing(false);       // 🔑 mark as new
      setShowForm(true);        // open form
    };

  return (
    <div className="address-book text-center ">
      <h3 className="text-start ps-4">
       <img
                src={addressbookicon}
                alt="Addressbook Icon"
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
      Address Book</h3>
       <p className="text-start ps-4">Manage your shipping and billing addresses.</p>
        <Divider sx={{  my: 2,
                                 borderStyle: "solid",
                                 borderColor: "#1976d2",        // ✅ red line
                                 borderBottomWidth: 3
                                   }} />
      <ul className="list-group d-inline-block text-start">
        {!showForm && (
          <li className="list-group-item">
          <div>
            <button
              className="btn btn-outline-primary"
              onClick={handleAddNew}
            >
              ➕ Create New Address
            </button>
            </div>
          </li>
        )}

        {addresses.map(addr => (
          <li
            key={addr.firestoreId || addr.id}
            className="list-group-item"
          >
            <div>
              <strong>{addr.fullName}</strong>
              {addr.useDefault && (
                <span className="badge bg-success ms-2">Default</span>
              )}
              <br />
              {addr.buildingName}, {addr.streetName}, {addr.city} - {addr.pincode}
              <br />
              Mobile Number: +91-{addr.mobileNumber}
            </div>
            <div className="mt-2 d-flex gap-5">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleEdit(addr)}
              >
                <FaEdit className="me-1" /> Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(addr)}
              >
                <FaTrash className="me-1" /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>


      {showForm && (
        <ShippingAddress
          form={form}
          setForm={setForm}
          onContinue={() => setShowForm(false)}
          onAddressSaved={fetchDefaultAddress}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );

};

export default AddressBook;
