import {useEffect, useState} from "react";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';


export const useCheckout = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null); // ✅ Accepts both


    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsUserLoggedIn(true);
                setUserId(user.uid); // ✅ Capture userId here
            } else {
                setIsUserLoggedIn(false);
                setUserId(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return {
      /*  handleCheckoutClick,*/
        showAuthModal,
        setShowAuthModal,
        isUserLoggedIn,
        userId, // ✅ Expose userId
        loading


    };
};
