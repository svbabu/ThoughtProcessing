import React, {useEffect, useState} from 'react';
import '../../react-layout.css';
import Navbar from '@WelcomeSection/Navbar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast, ToastOptions, ToastPromiseParams} from "react-toastify";
import {getAuth} from "firebase/auth";
import {collection} from "firebase/firestore";
import {db} from "../../firebase";
import { getDocs,deleteDoc,addDoc,doc,setDoc,updateDoc } from 'firebase/firestore';
import promise = toast.promise;
import { AddressFormType } from '../../typed/AddressFormType';
import { ShippingAddressDto,AddressWithId } from '../../typed/ShippingAddressDto';
import { saveAddress,fetchDefaultAddress,fetchAddresses,deleteAddress} from '../../typed/AddressService';
/*import { AddressFormType } from '../../typed/address'; // adjust path as needed*/


/* export interface ShippingAddressDto {
  id?: string;
  userId: string;
  fullName: string;
  buildingName?: string;
  streetName?: string;
  city?: string;
  state?: string;
  pincode?: string;
  mobileNumber?: string;
  landmark?: string;
  //addressType?: string;
  addressType: 'Home' | 'Office' | '';
  useDefault?: boolean;
} */

interface ShippingAddressProps {
    form: AddressFormType;
   setForm: React.Dispatch<React.SetStateAction<AddressFormType>>;
    onContinue: () => void;
     onAddressSaved?: (address: ShippingAddressDto) => void; // 👈 updated
    //onAddressSaved?: () => void
    isEditing: boolean;   // 🔑 add this
      setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // 🔑 add this
      showForm: boolean;
      setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

/* interface AddressWithId extends AddressFormType {
  id?: string;
  firestoreId?: string;  // Firestore document ID (string like "2AXDu5elQwJeT66HYCcZ")
  backendId?: number;
  //useDefault?: boolean; // mirrors backend field, but optional in Firebase
    //isDefault?: boolean;
    // onAddressSaved?: () => void;
} */



export const ShippingAddress: React.FC<ShippingAddressProps> = (
    { form, setForm, onContinue, onAddressSaved, isEditing, setIsEditing,
         showForm, setShowForm}) => {

             const [isSaving, setIsSaving] = useState(false);
              const [addresses, setAddresses] = useState<AddressWithId[]>([]);
                const [defaultAddress, setDefaultAddress] = useState<any>(null);

const initialFormState: AddressFormType = {
 firestoreId: '',
   backendId: undefined,
  userId: '',
  fullName: '',
  mobileNumber: '',
  pincode: '',
  city: '',
  state: '',
  buildingName: '',
  streetName: '',
  landmark: '',
  addressType: '',
  useDefault: false,
};
const mapFormToPayload = (formData: AddressFormType, userId: string) => ({
 userId,
   fullName: formData.fullName,
   mobileNumber: formData.mobileNumber,
   buildingName:formData.buildingName,
   streetName:formData.streetName,
   pincode: formData.pincode,   // 🔑 mapped correctly
   city: formData.city,
   state: formData.state,
   addressLine1: `${formData.buildingName} ${formData.streetName}`,
   landmark: formData.landmark,
   addressType: formData.addressType,
   useDefault: formData.useDefault,
});
//const [form, setForm] = useState<AddressFormType>(initialFormState);

 //const [showForm, setShowForm] = useState(false);
//const [isEditing, setIsEditing] = useState(false);
                    /* {
        fullName: '',
        mobileNumber: '',
        pincode: '',
        city: '',
        state: '',
        buildingName: '',
        streetName: '',
        landmark: '',
        addressType: '',
        useDefault: false,
    } ); */




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
function onClose() {
  setShowForm(false);
  setForm(initialFormState);
  setIsEditing(false);
};

   /*  useEffect(() => {
        if (form.addressType === 'Home') {
            setShowForm(false);
        }
    }, [form.addressType]);
 */
/*
const saveAddress = async (formData: AddressFormType) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");
      const payload = { ...formData, userId };
      //await saveAddress(payload);
  try {
     */
/* const response = await axios.post("http://localhost:8081/api/shipping/save", formData, { *//*

            // ✅ Save to backend with UID
        const response = await axios.post("http://localhost:8081/api/shipping/save", payload, {
      headers: { "Content-Type": "application/json" }
    });
   // ✅ Save to Firestore with UID
 await addDoc(collection(db, "addresses"), {
      ...formData,
      userId,
      isDefault: formData.useDefault,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Failed to save address:", error);
    throw error;
  }
};

 */
 //const saveAddress = async (formData: AddressFormType) => {
   /*   const saveAddress = async (formData: AddressFormType): Promise<ShippingAddressDto> => {
   const userId = getAuth().currentUser?.uid;
   if (!userId) throw new Error("User not authenticated");

   try {
     if (formData.id) {
       // ✅ Editing existing address
       await setDoc(doc(db, "addresses", formData.id), {
         ...formData,
         userId,
         useDefault: formData.useDefault,   // ✅ aligned
         //isDefault: formData.useDefault,
       }, { merge: true });
     } else {
       // ✅ Adding new address
       const newDocRef = doc(collection(db, "addresses"));
       await setDoc(newDocRef, {
         ...formData,
         userId,
         useDefault: formData.useDefault,   // ✅ aligned
         //isDefault: formData.useDefault,
       });
     }

     // ✅ Save to backend too
      // Editing existing address → call update
       await axios.put(`http://localhost:8081/api/shipping/update/${formData.id}`, {
         ...formData,
         userId,
         useDefault: formData.useDefault,
       });
     const response=await axios.post("http://localhost:8081/api/shipping/save",
         { ...formData, userId, useDefault: formData.useDefault }, {
       headers: { "Content-Type": "application/json" }
     });
  const savedAddress: ShippingAddressDto = response.data;
      //const savedAddress = response.data; // this is your ShippingAddressDto
     toast.success("Address saved successfully!");
     setForm(initialFormState);
     if (onAddressSaved) onAddressSaved(savedAddress); // pass the DTO back
     //setAddresses(prev => [...prev, savedAddress]); // or replace if editing
     //return true;
     return savedAddress;
   } catch (error) {
     console.error("❌ Failed to save address:", error);
     toast.error("Failed to save address");
     throw error;
   }
 };

 */
/*
const saveAddress = async (formData: AddressFormType): Promise<ShippingAddressDto> => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) throw new Error("User not authenticated");

  try {
    let savedAddress: ShippingAddressDto;

    if (formData.id) {
      // ✅ Editing existing address in Firestore
      await setDoc(doc(db, "addresses", formData.firestoreId!), {
        ...formData,
        userId,
        useDefault: formData.useDefault,
      }, { merge: true });

      // ✅ Update in backend
      const response = await axios.put(
        `http://localhost:8081/api/shipping/update/${formData.backendId}`,
        { ...formData, userId, useDefault: formData.useDefault },
        { headers: { "Content-Type": "application/json" } }
      );
      savedAddress = response.data;

    } else {
      // ✅ Adding new address in Firestore
      const newDocRef = doc(collection(db, "addresses"));
      await setDoc(newDocRef, {
        ...formData,
        userId,
        useDefault: formData.useDefault,
      });

      // ✅ Save in backend
      const response = await axios.post(
        "http://localhost:8081/api/shipping/save",
        { ...formData, userId, useDefault: formData.useDefault },
        { headers: { "Content-Type": "application/json" } }
      );
      savedAddress = response.data;
    }

    toast.success("Address saved successfully!");
    setForm(initialFormState);
    if (onAddressSaved) onAddressSaved(savedAddress);

    return savedAddress;
  } catch (error) {
    console.error("❌ Failed to save address:", error);
    toast.error("Failed to save address");
    throw error;
  }
};
 */
//const [form, setForm] = useState<AddressFormType>(initialFormState);

//const saveAddress = async (formData: AddressWithIds): Promise<ShippingAddressDto> => {

 /* const saveAddress = async (formData: AddressFormType): Promise<ShippingAddressDto> => {
  const userId = getAuth().currentUser?.uid;
   if (!userId) throw new Error("User not authenticated");
  // Firestore payload (can keep your original fields)
  const firestorePayload = {
    ...formData,
    userId,
    useDefault: formData.useDefault,
  };
 // Backend payload (mapped to backend expectations)
 const backendPayload = mapFormToPayload(formData, userId);
//const userId = getAuth().currentUser?.uid;


  try {
    let savedAddress: ShippingAddressDto;

    if (formData.firestoreId && formData.backendId) {
      // Firestore update
      await setDoc(doc(db, "addresses", formData.firestoreId),
      firestorePayload, { merge: true });

      // Backend update
      const response = await axios.put(
           `http://localhost:8081/api/shipping/update/${formData.backendId}`,
              backendPayload,
              { headers: { "Content-Type": "application/json" } }
            );
         *//* `http://localhost:8081/api/shipping/update/${formData.backendId}`,
        { ...formData, userId, useDefault: formData.useDefault },
        { headers: { "Content-Type": "application/json" } }
      ); *//*
      savedAddress = response.data;

    } else {
      // Firestore create
      const newDocRef = doc(collection(db, "addresses"));
      await setDoc(newDocRef, backendPayload);

      // Backend create
      //const response = await axios.post(
           const response = await axios.post(
              "http://localhost:8081/api/shipping/save",
              backendPayload,
              { headers: { "Content-Type": "application/json" } }
      *//*    "http://localhost:8081/api/shipping/save",
        { ...formData, userId, useDefault: formData.useDefault },
        { headers: { "Content-Type": "application/json" } } *//*
      );
      savedAddress = response.data;
      // merge backendId back into Firestore
        await setDoc(newDocRef, { backendId: savedAddress.id }, { merge: true });
    }

    toast.success("Address saved successfully!");
    setForm(initialFormState);
    if (onAddressSaved) onAddressSaved(savedAddress);

    return savedAddress;
  } catch (error) {
    console.error("❌ Failed to save address:", error);
    toast.error("Failed to save address");
    throw error;
  }
}; */
/* const handleSave = async () => {
    try {
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        toast.error("User not authenticated");
        return;
      }
   *//* const payload = { ...form, userId, useDefault: form.useDefault };
    await saveAddress(payload); *//*

      // ✅ Just pass form, since saveAddress handles mapping
      const savedAddress = await saveAddress(form);
      // 🔑 Update addresses state: replace existing or add new
          setAddresses(prev =>
            prev.some(a => a.backendId === savedAddress.id)
              ? prev.map(a =>
                  a.backendId === savedAddress.id ? { ...a, ...savedAddress } : a
                )
              : [...prev, { ...savedAddress }]
          );

          // If default flag is set, update defaultAddress state too
          if (savedAddress.useDefault) {
            setDefaultAddress(savedAddress);
          }

      toast.success("Address saved successfully!");
      onClose(); // ✅ Close form manually
    } catch (error) {
      console.error("❌ Failed to save address:", error);
      toast.error("Failed to save address");
    }
  }; */
const handleSave = async () => {
  setIsSaving(true);
  try {
    const savedAddress = await saveAddress(form);
    console.log("Saving form from shipping address:", form);
       // ✅ propagate backendId into form state
        //setForm(prev => ({ ...prev, backendId: savedAddress.id }));

    // Update local addresses state
    setAddresses(prev =>
      prev.some(a => a.id === savedAddress.id)
        ? prev.map(a =>
            a.id === savedAddress.id ? { ...a, ...savedAddress } : a
          )
        : [...prev, { ...savedAddress }]
    );


    // Update default address if flagged
    if (savedAddress.useDefault) {
      setDefaultAddress(savedAddress);
    }

    // Propagate to parent if needed
    if (onAddressSaved) onAddressSaved(savedAddress);

    toast.success("from shipping Address saved successfully!");
    onClose(); // reset + close form
  } catch (error) {
    console.error("❌ Failed to save address:", error);
    toast.error("Failed to save address");
  } finally {
    setIsSaving(false); // always reset
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

/* useEffect(() => {
    (async () => {
      await fetchAddresses(); // calls your service to get all addresse
      const def = await fetchDefaultAddress(); // calls your service to get default
      if (def) setDefaultAddress(def);  // store result in component state
    })();
  }, []);
 useEffect(() => {
   fetchAddresses();       // ✅ load all addresses
   fetchDefaultAddress();  // ✅ load default address
 }, []); */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        console.log('Submitting:', form);

        const nameRegex = /^[A-Za-z\s]+$/;
        const digitsRegex = /^[0-9]+$/;
        if (!form.fullName || form.fullName.trim().length < 2 || !nameRegex.test(form.fullName.trim())) {
            alert('Name must be at least 2 characters and contain only letters');
            return;
        }
        if (!form.mobileNumber ||!digitsRegex.test(form.mobileNumber.trim())|| form.mobileNumber.trim().length !== 10) {
            alert('Mobile number must be 10 digits');
            return;
        }
        if (!form.pincode || !digitsRegex.test(form.pincode.trim())|| form.pincode.trim().length < 6) {
            alert('Pincode must be at least 6 digits');
            return;
        }
        if (!form.city || form.city.trim().length < 2 || !nameRegex.test(form.city.trim())) {
            alert('City must be at least 2 characters');
            return;
        }
        if (!form.state || form.state.trim().length < 2 || !nameRegex.test(form.city.trim())) {
            alert('State must be at least 2 characters');
            return;
        }
        if (!form.buildingName || form.buildingName.trim().length < 2) {
            alert('Building name must be at least 2 characters');
            return;
        }
        if (!form.streetName || form.streetName.trim().length < 2) {
            alert('Street name must be at least 2 characters');
            return;
        }
    // ✅ Only set isSaving once validation passes
          setIsSaving(true);
          try {
                           const savedAddress = await saveAddress(form);
                                  toast.success(" from shipping Address submitted successfully!");
                                  setForm(initialFormState);
                                  if (onAddressSaved) onAddressSaved(savedAddress);
                             /*  const response = await axios.post("/api/shipping/save", formData);
                              return response.data; */
                          } catch (error) {
                              console.error("❌ Failed to save address:", error);
                              toast.error("Failed to submit address");
                              throw error;
                          }
                       finally {
                        setIsSaving(false); // ✅ always reset
                      }
};
          /* try {
        const userId = getAuth().currentUser?.uid;

        const payload = {
            ...form,
            userId, // ✅ Add userId here for backend
        };
       try {
            // ✅ Save to backend
            const response = await axios.post('http://localhost:8081/api/shipping/save', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // ✅ Save to Firestore
            await addDoc(collection(db, 'addresses'), {
                ...form,
                userId: getAuth().currentUser?.uid,
                isDefault: form.useDefault,
            });


            toast.success('Address submitted successfully!');
            console.log('Shipping info saved:', response.data);
            alert('Address submitted successfully!');
            if (onAddressSaved) {
                onAddressSaved(); // ✅ Close the form
            }
        }
    catch (error) {
        toast.error("Failed to submit address");
        console.error("Error saving shipping info:", error); }
        finally {
            setIsSaving(false); // ✅ always reset
            }


          *//*    const saveAddress = async (form: {
                fullName: string;
                mobileNumber: string;
                pincode: string;
                city: string;
                state: string;
                buildingName: string;
                streetName: string;
                landmark: string;
                addressType: string;
                useDefault: boolean
            }, userId: string | undefined, formData: <TData = unknown, TError = unknown, TPending = unknown>(promise: (Promise<TData> | (() => Promise<TData>)), {
                pending,
                error,
                success
            }: ToastPromiseParams<TData, TError, TPending>, options?: ToastOptions<TData>) => Promise<TData>) => { *//*

             *//* }; *//*



            *//* {!showForm && defaultAddress && (
                <DefaultAddressCard data={defaultAddress} />
            )}
*//*

        } catch (error) {
            toast.error('Failed to submit address');
            console.error('Error saving shipping info:', error);
            alert('Failed to submit address');
        }
        finally {
            setIsSaving(false);
        }
 */





const handleAddNew = () => {
  setIsEditing(false);
  setForm(initialFormState);
  setShowForm(true);
};
const handleEdit = (address: AddressWithId) => {
     setForm({
       ...address,
       firestoreId: address.firestoreId, // keep Firestore doc ID
       id: address.id,                   // use backend PK
     });
     setIsEditing(true);   // mark editing mode
     setShowForm(true);    // open the form
   };
/*
export const deleteAddress = async (address: AddressWithId) => {
  try {
    // Delete from backend if backendId exists
    if (address.id || address.backendId) {
      await axios.delete(`http://localhost:8081/api/shipping/delete/${address.id ?? address.backendId}`);
    }

    // Delete from Firestore if firestoreId exists
    if (address.firestoreId) {
      await deleteDoc(doc(db, "addresses", address.firestoreId));
    }

    return true;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};
 */

/* const handleEdit = (address: AddressFormType) => {
  setIsEditing(true);
  setForm(address);
  setShowForm(true);
}; */
/*
const handleSave = async () => {
  try {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

     // Merge userId and useDefault into the form before saving
        const payload = {
          ...form,
          userId,
          useDefault: form.useDefault,   // ✅ ensure consistency
        };
    //delete (payload as any).isDefault; // ✅ remove legacy field
    //await saveAddress(payload);
    await saveAddress(form);
    onClose(); // ✅ Close form manually
  } catch (error) {
    console.error("❌ Failed to save address:", error);
    toast.error("Failed to save address");
  }
};
 */

/*  const handleSave = async () => {
                 *//* await saveAddress(form,userId,promise); *//*
  await saveAddress(form);
  onClose(); // ✅ Close form manually
  }; */
const handleCancel = () => {
    onClose(); // ✅ Close form manually
 };
 useEffect(() => {
            if (!showForm) {
                document.getElementById('default-address')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, [showForm]);


    return (
        <>
        {!showForm ? (
            <button className="btn btn-outline-primary m-3" onClick={() => setShowForm(true)}>
                ➕ Add New Address
            </button>
        ) : (
            <form onSubmit={handleSubmit}>
                <div className="form-section container mt-4">
                    <button type="button" className="btn-close float-end" onClick={onClose}>×</button>
                    <h1 className="display-5 text-center mb-4">Shipping & Payment</h1>
                    <h4 className="text-center mb-2">Shipping method: Home Delivery</h4>
                    <p className="text-center">(GET YOUR PRODUCT DELIVERED TO YOUR HOME)</p>
                    <h4>Select your shipping address</h4>

                    <div className="row g-3">
                        {/* Full Name */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                />
                                <label>Full Name</label>
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="mobileNumber"
                                   /* style={{ borderColor: /^\d{10}$/.test(form.mobileNumber) ? '#ccc' : 'red' }}*/


                                    placeholder="Mobile Number"
                                    value={form.mobileNumber}
                                    onChange={handleChange}
                                />
                                <label>Mobile Number</label>
                            </div>
                        </div>

                        {/* Pincode */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                />
                                <label>Pincode</label>
                            </div>
                        </div>

                        {/* City */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    placeholder="City"
                                    value={form.city}
                                    onChange={handleChange}
                                />
                                <label>City</label>
                            </div>
                        </div>

                        {/* State */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    placeholder="State"
                                    value={form.state}
                                    onChange={handleChange}
                                />
                                <label>State</label>
                            </div>
                        </div>

                        {/* Building Name */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="buildingName"
                                    placeholder="Building Name"
                                    value={form.buildingName}
                                    onChange={handleChange}
                                />
                                <label>Building Name</label>
                            </div>
                        </div>

                        {/* Street Name */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="streetName"
                                    placeholder="Street Name"
                                    value={form.streetName}
                                    onChange={handleChange}
                                />
                                <label>Street Name</label>
                            </div>
                        </div>

                        {/* Landmark */}
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="landmark"
                                    placeholder="Landmark"
                                    value={form.landmark}
                                    onChange={handleChange}
                                />
                                <label>Landmark (Optional)</label>
                            </div>
                        </div>

                        {/* Address Type */}
                        <div className="col-12">
                            <h5>Address Type</h5>
                            <div>
                                <label className="me-3">
                                    <input
                                        type="radio"
                                        name="addressType"
                                        value="Home"
                                        checked={form.addressType === 'Home'}
                                        onChange={handleChange}
                                    /> Home
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="addressType"
                                        value="Office"
                                        checked={form.addressType === 'Office'}
                                        onChange={handleChange}
                                    /> Office
                                </label>
                            </div>
                        </div>

                        {/* Use as Default */}
                        <div className="col-12 mt-3">
                            <label>
                                <input
                                    type="checkbox"
                                    name="useDefault"
                                    checked={form.useDefault}
                                    onChange={handleChange}
                                /> Use this as my default shipping address
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12 mt-4">

                           <button className="btn btn-primary py-2 px-4"
                                    disabled={isSaving}

                                    type="submit">
                                Save Address
                            </button>


                        </div>
                    </div>
                </div>
            </form>
    )}

</>
    );
};

export default ShippingAddress;
