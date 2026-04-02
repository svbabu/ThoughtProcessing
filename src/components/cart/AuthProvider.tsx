import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext<any>(null);

 export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setuserName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
 /* const user = auth.currentUser;
 const name = user?.displayName || user?.phoneNumber;  */

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);
        setUserId(user.uid);
         setuserName(user.displayName);
        setPhoneNumber(user.phoneNumber);


      } else {
        setIsUserLoggedIn(false);
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);
/* auth.signOut().then(() => {
    toast.info("You've been signed out.");
   navigate("/home");
    }); */
  return (
    <AuthContext.Provider value={{ isUserLoggedIn, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
