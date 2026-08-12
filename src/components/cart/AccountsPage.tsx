// src/pages/AccountsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../../firebase";
import { useAuth } from "./AuthProvider"; // centralized auth context
import axios from 'axios';
import { useCart } from '@cart/CartContext';

import { Link } from 'react-router-dom';
import '../../react-layout.css';
import {
  Box,
  Typography,
  Divider,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
/* import { db } from "../../firebase"; */ // path to your firebase.ts
import { collection,setDoc, addDoc,doc,getDoc,initializeFirestore,getFirestore,enableIndexedDbPersistence } from "firebase/firestore";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    UserCredential
} from 'firebase/auth';
import { AddressFormType } from '../../typed/AddressFormType';
import AddressBook from "./AddressBook";
import ProfilePage from "./ProfilePage";
import OrderHistory from "./OrderHistory";
//import Favourites from "./Favourites";
import profileicon from "@img/profileicon.png";
import addressbookicon from "@img/addressbookicon.png";
import ordericon from "@img/ordericon.png";
import paymenticon from "@img/paymenticon.png";
import mycredit from "@img/mycredit.png";
import favoriteicon from "@img/favoriteicon.png";
import homecentericon from "@img/homecentericon.png";
import communicationicon from "@img/communicationicon.png";
import reviewicon from "@img/reviewicon.png";
import landmarkicon from "@img/landmarkicon.png";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Favourites from "./Favourites";
import { ProductList } from "../WelcomeSection/ProductList"
import { LaptopPage } from "../WelcomeSection/LaptopPage"
import { featuredProducts } from '../../typed/Product';
import {Product,FavouriteProduct } from '../../typed/Product';// adjust path
import { CartItem } from '@cart/CartContext';
import latop from '@img/latop.png';
import { useFavourites } from "@cart/FavouritesContext";
import { useLocation } from "react-router-dom";

const AccountsPage: React.FC = () => {
     const { cart } = useCart();
    // const [favourites, setFavourites] = useState<string[]>([]);
    /*  const [products] = useState<Product[]>([
        { id: "1", productName: "Laptop A", image: "a.jpg", originalPrice: 1000, appliedPrice: 800, basePrice: 1000, discountPercentage: 20, saved: 200 },
        { id: "2", productName: "Laptop B", image: "b.jpg", originalPrice: 1200, appliedPrice: 950, basePrice: 1200, discountPercentage: 21, saved: 250 },
      ]); */
   const { dispatch } = useCart();   // ✅ now dispatch is available
    const [products, setProducts] = useState<Product[]>([]);   // ✅ declare products
    //const [favourites, setFavourites] = useState<FavouriteProduct[]>([]);
    //const { favourites, removeFavourite, addToCart } = useFavourites();
   //const [favourites, setFavourites] = useState<Product[]>([]);
     const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
     const [visible, setVisible] = useState(false); // ✅ define state
     const navigate = useNavigate(); // ✅ define navigate

    /* const db = initializeFirestore(app, { enableIndexedDbPersistence: true }); */
    const user = auth.currentUser;
    const name = user?.displayName || user?.phoneNumber;
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [profile, setProfile] = useState({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          birthday: "",
          gender: ""
          });
      //const { defaultAddress, fetchDefaultAddress, updateDefaultAddress } = useAddressBook();
        //const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
              const user = auth.currentUser;
              if (user) { setProfile({
                  firstName: user.displayName?.split(" ")[0] || "",
                  lastName: user.displayName?.split(" ")[1] || "",
                  mobile: user.phoneNumber || "",
                  email: user.email || "",
                  birthday:"", // will come from Firestoreif saved
                  gender: "" // will come from Firestore if saved
                   }); } }, []);
//const [shippingAddress, setShippingAddress] = useState<any>(null);



          const handleSubmit = async (e: React.FormEvent) =>
          {
              e.preventDefault();
               console.log("Profile submitted:", profile);
              // Example:Save to Firestore
              try{
                  const uid = auth.currentUser?.uid;
                  console.log("calling uid",uid)
                  if (!uid) {
                      alert("No user logged in"); return;
                      }
                  // 🔹 Save/update in Firestore with UID as key
              //await addDoc(collection(db, "profiles"),
              await setDoc(doc(db, "profiles", uid),
               { ...profile,
                   userId: auth.currentUser?.uid,
                   mobile: auth.currentUser?.phoneNumber || profile.mobile,


                   },{ merge: true });
                console.log("Profile submitted:", profile);
               alert("Profile updated successfully!");



           // 🔹 Also call backend REST API
           const response = await axios.put(`http://localhost:8081/api/profile/update`,

               {
                   ...profile,
                   userId: uid,
                   mobileNumber: auth.currentUser?.phoneNumber || profile.mobile,
                  /*  method: "PutMapping",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({ ...profile, userId: uid,
                   mobileNumber: auth.currentUser?.phoneNumber || profile.mobile, }), */
                   },
               { headers:{ "Content-Type": "application/json" },
               }
               );
           if (response.status === 200) {
               const updatedProfile = response.data;
                setProfile(updatedProfile);
                alert("Profile updated successfully!");
                }
                else {
                    alert("Failed to update profile in backend");
                    }

                   } //try

          catch (error) {
             /*  console.error("Error saving profile:", error); */
              alert("Failed to save profile");
              }
               };


useEffect(() => {
  const user = auth.currentUser;
   if (!user) return;
  //if (user) {
    // First set basic auth fields
    const baseProfile = {
      firstName: user.displayName?.split(" ")[0] || "",
      lastName: user.displayName?.split(" ")[1] || "",
      mobile: user.phoneNumber || "",
      email: user.email || "",
      birthday: "", // placeholder
      gender: ""    // placeholder
    };

    // Then fetch extra fields from Firestore
    const fetchProfile = async () => {
      const docRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          ...baseProfile,
          birthday: data.birthday || "",
          gender: data.gender || "",
          firstName:data.firstName||"",
          lastName:data.lastName||""
        });
      } else {
        setProfile(baseProfile);
      }
    };

    fetchProfile();
  //}
}, []);


    const { isUserLoggedIn, userId,loading } = useAuth();
if (loading) {
  return <p>Loading...</p>; // wait until auth state is ready
}

    if (!isUserLoggedIn) {
         return (
           <div>
             <p>Please sign in to view your account.</p>
            {/*  <button onClick={() => setVisible(true)}>Sign Up/Sign In</button> */}
            <button onClick={() => navigate("/home")}>Sign Up/Sign In</button>
           </div>
         );
        }
    const handleSignOut = async () => {
        await auth.signOut(); // 🔹 Firebase clears the session
        navigate("/home");
       /*  window.recaptchaVerifier = undefined;  */ // 🔹 remove old reCAPTCHA instance
        };

    /*  useEffect(() => {
        if (activeSection === "address") {
          fetchDefaultAddress();
        }
      }, [activeSection]); */
function MoreMenu({ handleSignOut }: { handleSignOut: () => void }) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as="a"
        className="nav-link d-flex align-items-center mx-2"
      >
        <BsThreeDotsVertical />

      </Dropdown.Toggle>
      <span className="ms-1">More</span>
      <Dropdown.Menu>
        <Dropdown.Item href="#settings">Settings</Dropdown.Item>
        <Dropdown.Item href="#profile">Profile</Dropdown.Item>

        {/* Sign Out now calls your function */}
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


const handleAddToCart = (product: Product | FavouriteProduct) => {
  dispatch({
    type: "ADD_ITEM",
    payload: {
      id: product.id,
      name: product.productName,
      description: product.description,
      originalPrice: product.originalPrice,
      basePrice: product.basePrice ?? product.originalPrice,
      appliedPrice: product.appliedPrice ?? product.originalPrice,
      price: product.appliedPrice ?? product.originalPrice,
      discountPercentage: product.discountPercentage ?? null,
      saved: product.saved??0,
      imageSrc: product.imageSrc || latop,
      quantity: 1,
      deliveryDates: product.deliveryDates ?? [],
      selectedDate: product.selectedDate ?? null,
      image: "",
      productName: "",
      imageUrl: product.image || latop,
      date: new Date().toISOString(), // ✅ required by CartItem
    },
  });
};



const handleViewMore = (product: Product) => {
  console.log("View more:", product);
};
// ✅ For Favourites
const handleRemoveFavourite = (id: string) => {
  //setFavourites(prev => prev.filter(f => f.id !== id));
};

const handleAddFavouriteToCart = (product: FavouriteProduct) => {
  console.log("Add favourite to cart:", product);
};

const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sectionFromQuery = queryParams.get("section"); // ✅ read ?section=favourites
  //const [activeSection, setActiveSection] = useState<string | null>(null);
  //const [activeSection, setActiveSection] = useState(sectionFromQuery ?? "profile");
  // Load from localStorage if no query
  const [activeSection, setActiveSection] = useState(
    sectionFromQuery ?? localStorage.getItem("lastSection") ?? "profile"
  );

  // Update activeSection whenever query changes
  useEffect(() => {
    if (sectionFromQuery) {
      setActiveSection(sectionFromQuery);
    }
  }, [sectionFromQuery]);
// Whenever activeSection changes, save it
useEffect(() => {
  if (activeSection) {
    localStorage.setItem("lastSection", activeSection);
  }
}, [activeSection]);

useEffect(() => {
  if (sectionFromQuery) {
    setActiveSection(sectionFromQuery);
  }
}, [sectionFromQuery]);

  const { favourites, removeFavourite, addToCart } = useFavourites();


    return (
         <div>
        <div className="accounts-page">

       <div className="account-topbar d-flex justify-content-between align-items-center p-3 border-bottom">
         {/* Left: Logo + Shop name */}
         <div className="d-flex align-items-center">
           <img src={homecentericon} alt="MY HOME" style={{ width: "100px", marginRight: "10px" }} />
           {/* <h4 className="mb-0">Home Center</h4> */}
         </div>
         <div className="flex-grow-1 mx-4">
           <div className="input-group">
             <span className="input-group-text">
               <i className="bi bi-search"></i> {/* Bootstrap search icon */}
             </span>
             <input
               type="text"
               className="form-control"
               placeholder="What are you looking for?"
             />
           </div>
         </div>


      {/* Right: Account actions */}
       <div className="d-flex align-items-center">
        <Dropdown>
          <Dropdown.Toggle
            as="a"
            className="nav-link d-flex align-items-center mx-2"
          >
            <FaUser style={{ marginRight: "6px" }} /> Account
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setActiveSection("profile")}>Profile</Dropdown.Item>
            <Dropdown.Item href="#orders">Order History</Dropdown.Item>
              <Dropdown.Item onClick={() => setActiveSection("address")}>Address Book</Dropdown.Item>

            <Dropdown.Item  onClick={() => setActiveSection("payment")}>Payment</Dropdown.Item>
             <Dropdown.Item onClick={() => setActiveSection("mycredit")}>My Credit</Dropdown.Item>
              <Dropdown.Item onClick={() => setActiveSection("favourites")}>Favourites</Dropdown.Item>
               <Dropdown.Item onClick={() => setActiveSection("communications")}>Communications</Dropdown.Item>
                <Dropdown.Item onClick={() => setActiveSection("reviews")}>Reviews</Dropdown.Item>
                <Dropdown.Item onClick={() => setActiveSection("landmarkrewards")}>Landmark Rewards</Dropdown.Item>
                <Dropdown.Item onClick={() => setActiveSection("appsettings")}>App Settings</Dropdown.Item>
                <Dropdown.Item onClick={() => setActiveSection("help")}>Help</Dropdown.Item>

                {/* Sign Out button inside dropdown */}
                <Dropdown.Item as="button" onClick={handleSignOut}>
                  Sign Out
                </Dropdown.Item>
            </Dropdown.Menu></Dropdown>
         {/* <a className="nav-link d-flex align-items-center mx-2">
           <FaHeart style={{ marginRight: "6px" }} /> Favourites
         </a> */}
         <Link
            to="/account?section=favourites"
           className="nav-link d-flex align-items-center mx-2"
         >
           <FaHeart style={{ marginRight: "6px" }} /> Favourites
         </Link>

          <Link to="/cart" className="nav-link d-flex align-items-center mx-2">
              <FaShoppingCart style={{ marginRight: "6px" }} /> Cart ({itemCount})
          </Link>
        {/*  <a className="nav-link d-flex align-items-center mx-2">
           <FaShoppingCart style={{ marginRight: "6px" }} /> Cart (0)
         </a> */}
       {/* ✅ Replace plain <a> with Dropdown */}
          <Dropdown>
              <Dropdown.Toggle
                  as="a"
                  className="nav-link d-flex align-items-center mx-2"
                >
                  <BsThreeDotsVertical />
                   {/* Label under/next to the dots */}
                </Dropdown.Toggle>

               <Dropdown.Menu>
                 <Dropdown.Item href="#settings">Settings</Dropdown.Item>
                  <Dropdown.Item onClick={() => setActiveSection("profile")}>
                     Profile
                   </Dropdown.Item>
                 <Dropdown.Item as="button" className="nav-link btn btn-link" onClick={handleSignOut}>
                     Sign Out
                   </Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
             <span className="ms-1">More</span>
             </div>
</div>
<div className="account-page container mt-4">
    {/* Account-level navigation */}
    <nav className="nav nav-tabs mb-3">

     <a className="nav-link active">Sale</a>
     <a className="nav-link">Living Room</a>
     <a className="nav-link">Bed Room</a>
     <a className="nav-link">Dining Room</a>
     <a className="nav-link">Decor</a>
     <a className="nav-link">Kitchen</a>
     <a className="nav-link">Furnishings</a>
     <a className="nav-link">Tableware</a>
     <a className="nav-link">Bath & Laundry</a>
     <a className="nav-link">Gifting</a>
     {/*  <a className="nav-link active">Overview</a>
      <a className="nav-link">Settings</a>
      <a className="nav-link">Security</a>
      <a className="nav-link">Account Management</a> */}

    </nav>

    </div>
        <h2>My Account</h2>
       {/*  <p>Manage your personal details</p> */}

        {/* <p>Logged in as: {userId}</p> */}
       <p>Logged in as {user?.phoneNumber || user?.email || 'Not available'}</p>
       <p>Name: {`${profile.firstName} ${profile.lastName}`.trim() || 'Not available'}</p>
        {!showProfileForm ? (<div><li className="list-group-item">
           {/* <strong>Profile:</strong> {user?.phoneNumber || 'Not available'}
>*/}
         </li>
         <li className="list-group-item">

                  {/*  <strong>Name:</strong> {`${profile.firstName} ${profile.lastName}`.trim() || 'Not available'} */}
                  </li>


<nav className="nav nav-pills flex-wrap">
  <a
      className={`nav-link ${activeSection === "profile" ? "active" : ""}`}
      onClick={() => setActiveSection("profile")}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      <img
        src={profileicon}
        alt="Profile Icon"
        style={{ width: "24px", height: "24px", marginRight: "8px" }}
      />
      <div>
        <span>Profile</span>
        <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
          Manage your personal details
        </p>
      </div>
  </a>

   <a
      className={`nav-link ${activeSection === "orders" ? "active" : ""}`}
      onClick={() => setActiveSection("orders")}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      <img
        src={ordericon}
        alt="Orders Icon"
        style={{ width: "24px", height: "24px", marginRight: "8px" }}
      />
      <div>
        <span>Order History</span>
        <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
          View and track your orders
        </p>
      </div>
    </a>

  <a
    className={`nav-link ${activeSection === "address" ? "active" : ""}`}
    onClick={() => setActiveSection("address")}
    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
  >
   <img
          src={addressbookicon}
          alt="Profile Icon"
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        />

        <div>
        <span>Address Book</span>
        <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                  Manage your shipping and billing addresses
                </p>
        </div>

  </a>

  <a className={`nav-link ${activeSection === "payment" ? "active" : ""}`}
        onClick={() => setActiveSection("payment")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
  >
  <img
            src={paymenticon}
            alt="Profile Icon"
            style={{ width: "24px", height: "24px", marginRight: "8px" }}
          />
  <div>
 <span> Payment</span>
 <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                   Manage your payment preferences
                 </p>
  </div>
  </a>
  <a className={`nav-link ${activeSection === "mycredit" ? "active" : ""}`}
             onClick={() => setActiveSection("mycredit")}
             style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
  >
  <img
              src={mycredit}
              alt="Profile Icon"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />
  <div>
  <span>My Credit</span>
  <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                    View your available credit balance
                   </p>
  </div>
  </a>
  <a className={`nav-link ${activeSection === "favourites" ? "active" : ""}`}
                  onClick={() => setActiveSection("favourites")}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <img
                                src={favoriteicon}
                                alt="favorite Icon"
                                style={{ width: "24px", height: "24px", marginRight: "8px" }}
                              />
  <div>
  <span>Favourites
  </span>
  <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                     View your most wanted products
                   </p>
  </div></a>
   <a className={`nav-link ${activeSection === "communications" ? "active" : ""}`}
                    onClick={() => setActiveSection("communications")}
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <img
                                  src={communicationicon}
                                  alt="Profile Icon"
                                  style={{ width: "24px", height: "24px", marginRight: "8px" }}
                                />
  <div>
  <span>Communications</span>
   <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                       Manage your newsletters and email preferences
                     </p>
  </div></a>


<a className={`nav-link ${activeSection === "reviews" ? "active" : ""}`}
                      onClick={() => setActiveSection("reviews")}
                      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                      <img
                                    src={reviewicon}
                                    alt="Profile Icon"
                                    style={{ width: "24px", height: "24px", marginRight: "8px" }}
                                  />

  <div>
  <span>Reviews</span>
   <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                        View all are reviews
                       </p>
  </div>

  </a>

   <a className={`nav-link ${activeSection === "landmark" ? "active" : ""}`}
                                      onClick={() => setActiveSection("landmark")}
                                      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                      <img
                                                    src={landmarkicon}
                                                    alt="Profile Icon"
                                                    style={{ width: "70px", height: "55px", marginRight: "8px" }}
                                                  />
  <div>
  <span>
  Landmark Rewards
  </span>
  <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                          Earn and spend valuable loyalty points for instant savings
                         </p>
  </div>
  </a>
  <a className="nav-link">
  <div>
  <span>App Settings</span>
  <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                            You can change defaults
                           </p>
  </div>
  </a>
  <a className="nav-link">
 <div><span> Help</span></div>
 <p className="mb-0" style={{ fontSize: "12px", color: "#666" }}>
                             How can we help?
                            </p>
  </a>

  <button className="nav-link btn btn-link" onClick={handleSignOut}>
    Sign Out
  </button>
</nav>
  <Divider sx={{  my: 2,
                           borderStyle: "solid",
                           borderColor: "#1976d2",        // ✅ red line
                           borderBottomWidth: 3
                             }} />

<div className="account-content mt-4">
  {activeSection === "profile" && <ProfilePage />}
  {activeSection === "orders" && <OrderHistory />}
  {activeSection === "address" && <AddressBook />}
   {activeSection === "payment" && <div>Payment Preferences Component</div>}
   {activeSection === "mycredit" && <div>My Credit Component</div>}

   {activeSection === "favourites" && (
     <Favourites
               //favourites={favourites}
               favourites={favourites as FavouriteProduct[]}   // ✅ matches
               onRemove={removeFavourite}
               onAddToCart={addToCart}

     />
   )}

 {activeSection === "communications" && <div>Communications Component</div>}
  {activeSection === "reviews" && <div>Reviews Component</div>}
  {activeSection === "landmark" && <div>Landmark Rewards Component</div>}
  {activeSection === "appsettings" && <div>App Settings Component</div>}
  {activeSection === "help" && <div>Help Component</div>}
</div>

</div>

        ):(
            <div className="row g-3">
           <form className="profile-form row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
            {/* <h5><strong>Personal Details</strong></h5> */}
                <div className="form-group mb-3">
                  <label>First Name</label>
                  <input type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="form-control" placeholder="Enter first name" />

                </div>
              </div>
                                 <div className="col-md-6">
                                 <div className="form-group mb-3">
                                   <label>Last Name</label>
                                   <input type="text"
                                   value={profile.lastName}
                                   onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                   className="form-control" placeholder="Enter last name" />
                     </div>
                     </div>
                                 <div className="col-md-6">
                                 <div className="form-group mb-3">
                                   <label>Mobile Number</label>
                                   <input type="tel"
                                   value={profile.mobile}
                                   onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                                   className="form-control" placeholder="Enter mobile number" />
                        </div>
                        </div>
                                 <div className="col-md-6">
                                 <div className="form-group mb-3">
                                             <label>Email</label>
                                             <input type="email"
                                              value={profile.email}
                                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                              className="form-control" placeholder="Enter email" />
                           </div>
                           </div>
                                           <div className="col-md-6">
                                           <div className="form-group mb-3">
                                             <label>Birthday</label>
                                             <input type="date"
                                              value={profile.birthday}
                                              onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                                              className="form-control" />
                            </div>
                            </div>
                                           <div className="col-md-6">
                                             <div className="form-group mb-3">
                                             <label>Gender</label>
                             <div>
                                               <input type="radio" name="gender" value="male"
                                                checked={profile.gender === "male"}
                                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}

                                               /> Male
                                               <input type="radio" name="gender" value="female"
                                               checked={profile.gender === "female"}
                                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                               /> Female
                             </div>
                                             </div>
                                             </div>
                            <button type="submit" className="btn btn-primary">
                                       Update Profile
                                     </button>
                                    {/*  <button type="button" className="btn btn-secondary"
                                     onClick={() => setShowProfileForm(false)}
                                     >
                                       Back
                                     </button> */}

                                   </form>

                               </div>

                               )}

</div>
</div>

            );
    };
        export default AccountsPage;