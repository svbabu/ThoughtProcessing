// src/components/cart/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // adjust path to your firebase config
//import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { collection,setDoc, addDoc,doc,getDoc,initializeFirestore,getFirestore,enableIndexedDbPersistence } from "firebase/firestore";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    UserCredential
} from 'firebase/auth';
import { AddressFormType } from '../../typed/AddressFormType';
import AddressBook from "./AddressBook";
import profileicon from "@img/profileicon.png";

//profileicon

const ProfilePage: React.FC = () => {
      const [showProfileForm, setShowProfileForm] = useState(false);
      const navigate = useNavigate(); // ✅ define navigate
  const user = auth.currentUser;
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    birthday: "",
    gender: ""
  });

  useEffect(() => {
    if (user) {
      const baseProfile = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        mobile: user.phoneNumber || "",
        email: user.email || "",
        birthday: "",
        gender: ""
      };

      const fetchProfile = async () => {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            ...baseProfile,
            birthday: data.birthday || "",
            gender: data.gender || "",
            firstName: data.firstName || baseProfile.firstName,
            lastName: data.lastName || baseProfile.lastName
          });
        } else {
          setProfile(baseProfile);
        }
      };

      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        alert("No user logged in");
        return;
      }

      await setDoc(doc(db, "profiles", uid), {
        ...profile,
        userId: uid,
        mobile: auth.currentUser?.phoneNumber || profile.mobile
      }, { merge: true });

      const response = await axios.put("http://localhost:8081/api/profile/update", {
        ...profile,
        userId: uid,
        mobileNumber: auth.currentUser?.phoneNumber || profile.mobile
      }, { headers: { "Content-Type": "application/json" } });

      if (response.status === 200) {
        setProfile(response.data);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile in backend");
      }
    } catch (error) {
      alert("Failed to save profile");
    }
  };

  return (
    <div className="profile-page container mt-4">
      <h4>
       <img
              src={profileicon}
              alt="Profile Icon"
              style={{ width: "40px", height: "35px", marginRight: "8px" }}
            />
       Profile</h4>
       <p className="mb-0" style={{ fontSize: "15px", color: "#666" }}>
       Personal details
       </p>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label>First Name</label>
          <input type="text" value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Last Name</label>
          <input type="text" value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Mobile</label>
          <input type="tel" value={profile.mobile}
            onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
            className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Email</label>
          <input type="email" value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Birthday</label>
          <input type="date" value={profile.birthday}
            onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
            className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Gender</label>
          <div>
            <input type="radio" name="gender" value="male"
              checked={profile.gender === "male"}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })} /> Male
            <input type="radio" name="gender" value="female"
              checked={profile.gender === "female"}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })} /> Female
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Update Profile</button>
         {/*  <button
                  type="button"
                  className="btn btn-secondary mt-3"
                  onClick={() => navigate("/account")} // go back to AccountsPage
                >
                  Back
                </button> */}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
