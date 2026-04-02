// src/pages/HomePage.tsx

import React, { useState,useEffect } from 'react';
import { AuthModal } from '@cart/AuthModal';
import '../../react-layout.css';
import { useAuth } from '@cart/AuthProvider'; // centralized auth context
import {useOtpAuth} from '@cart/useOtpAuth';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    UserCredential
} from 'firebase/auth';
import { auth } from '../../firebase';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import goodobsertwolady from '@img/goodobsertwolady.png';
import homepage1 from '@img/homepage1.png';
import { LaptopPreview } from './LaptopPreview';

 const HomePage: React.FC = () => {
     /*  const navigate = useNavigate();
       const { isUserLoggedIn, userId } = useAuth();

       // 🔹 useOtpAuth provides OTP state + functions
       const {
         mobile,
         setMobile,
         otp,
         setOtp,
         isOtpSent,
         cooldownTime,
         sendOtp,
         verifyOtp,
         changeNumber,
       } = useOtpAuth();

       const [visible, setVisible] = useState(false);
 */


     const navigate = useNavigate();
     const { isUserLoggedIn, userId } = useAuth();
      const [visible, setVisible] = useState(false);
     const [mobile, setMobile] = useState('');
     const [otp, setOtp] = useState('');
     const [isOtpSent, setIsOtpSent] = useState(false);
     const [isOtpVerified, setIsOtpVerified] = useState(false);
      const [cooldownTime, setCooldownTime] = useState(30);
       const [step, setStep] = useState<'mobile' | 'otp'>('mobile');

     useEffect(() => {
             if (!window.recaptchaVerifier) {
                 window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                     size: 'invisible',
                     callback: (response: string) => {
                         console.log('reCAPTCHA solved:', response);
                     },
                 }, auth); // ✅ use your imported auth instance

                 window.recaptchaVerifier.render().then((widgetId) => {
                     console.log('reCAPTCHA widget rendered with ID:', widgetId);
                 });
             }
         }, []);
     const initRecaptcha = () => {
         if (!window.recaptchaVerifier) {
             window.recaptchaVerifier = new RecaptchaVerifier( 'recaptcha-container',
                 { size: 'invisible' }, auth );
                 }
             };
const sendOtp = async () => {
    initRecaptcha(); // ✅ ensure verifier exists
  try {
    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      toast.error("⚠️ reCAPTCHA not initialized.");
      return;
    }

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      `+91${mobile}`,
      appVerifier
    );

    window.confirmationResult = confirmationResult;   // ✅ critical
    setIsOtpSent(true);
    toast.success("✅ OTP sent successfully!");
    setStep("otp");
  } catch (error: any) {
    toast.error(`❌ ${error.message || "Something went wrong."}`);
  }
};
/* if (!otp) {
    toast.error("⚠️ Please enter the OTP."); return;
     } */

       /* const sendOtp = async () => {
              if (cooldownTime > 0 || !mobile) return;

              setCooldownTime(30);
              const countdown = setInterval(() => {
                  setCooldownTime(prev => {
                      if (prev <= 1) {
                          clearInterval(countdown);
                          return 0;
                      }
                      return prev - 1;
                  });
              }, 1000);

              const appVerifier = window.recaptchaVerifier;
              if (!appVerifier) {
                  toast.error("⚠️ reCAPTCHA not initialized.");
                  return;
              }
              try {
                  const confirmationResult = await signInWithPhoneNumber(
                      auth,
                      `+91${mobile}`,
                      appVerifier as RecaptchaVerifier


                  );
                  window.confirmationResult = confirmationResult;
                  setIsOtpSent(true);
                  toast.success("✅ OTP sent successfully!");
              } catch (error: any) {
                  toast.error(`❌ ${error.message || "Something went wrong."}`);
              }

              setStep('otp');//purpose is split the popupcard into mobile && otp seperaltly


          }; */

         /*  const verifyOtp = async () => { // backend call to verify OTP
              console.log("Verifying OTP:", otp);
              setVisible(false); // close modal on success
              }; */
       /*    const changeNumber = () =>
          {
              setMobile('');
              setIsOtpSent(false); }; */
     /*  const verifyOtpForAccount = () => verifyOtp("/account"); */
 const [isVerifying, setIsVerifying] = useState(false);
/*  const verifyOtp = async () => {
   if (!window.confirmationResult) {
     toast.error("⚠️ No OTP session found. Please request OTP again.");
     return;
   }

   try {
     const result = await window.confirmationResult.confirm(otp);
     toast.success("✅ OTP verified successfully!");
     setIsOtpVerified(true);
     setVisible(false);
     navigate("/account");
   } catch (error) {
     toast.error("❌ Invalid OTP. Please try again.");
     console.error("OTP verification failed:", error);
   }
 }; */
const changeNumber = () => {
        setMobile('');
        setOtp('');
        setIsOtpSent(false);
        setIsOtpVerified(false);
        toast.info("📱 You can now enter a new mobile number.");
        setStep('mobile');


    };

const handleSignOut = async () =>
{ await auth.signOut();
    changeNumber(); // ✅ reset OTP state
};
 const verifyOtp = () => {
        if (window.confirmationResult) {
            window.confirmationResult.confirm(otp)
                .then((result: UserCredential) => {
                    toast.success("✅ OTP verified successfully!");
                    setIsOtpVerified(true);
                   setVisible(false);
                    navigate("/account");
                     changeNumber();  // optional reset
                })
                .catch((error) => {
                    toast.error("❌ Invalid OTP. Please try again.");
                    console.error("OTP verification failed:", error);
                });


        }

    };





    return(
        <div>

        {/*  <div onClick={() => navigate('/home')}>...</div> */}
           <div className="home-section" id="home" style={{ backgroundColor: "white" }}>
                {/* Left Column */}

                <div className="home-text">
                  <h2 className="section-title">Welcome to Home</h2>
                  <p>
                    I'm being 6 years of working experience as a Java developer, web designer,
                    and backend specialist. My focus is clarity, care, and modular architecture.
                  </p>
                  <ul className="list-unstyled">
                    <li><i className="far fa-check-circle text-primary me-2"></i>Affordable Prices</li>
                    <li><i className="far fa-check-circle text-primary me-2"></i>High Quality Product</li>
                    <li><i className="far fa-check-circle text-primary me-2"></i>On Time Project Delivery</li>
                  </ul>
                </div>





  {/* Right Column */}
      <div className="home-images">

          <h2>Welcome to Home</h2>

          {isUserLoggedIn ? (
            <button onClick={() => navigate("/account")}>
              AccountPage ({userId})
            </button>
          ) : (
            <button onClick={() => setVisible(true)}>Sign Up/Sign In</button>
          )}



 {/*  <button className="btn btn-outline-secondary">Login with Google</button>
                   <button className="btn btn-outline-secondary">Login with MicroSoft</button> */}
                   <AuthModal
                           visible={visible}
                           onClose={() => setVisible(false)}
                           mobile={mobile}
                           setMobile={setMobile}
                           otp={otp}
                           setOtp={setOtp}
                           isOtpSent={isOtpSent}
                           cooldownTime={cooldownTime}
                           sendOtp={sendOtp}
                           verifyOtp={ verifyOtp}

                           changeNumber={changeNumber}
                         />


                     <img src={goodobsertwolady} alt="About" className="img-fluid rounded mb-3" />
                     <img src={homepage1} alt="About" className="img-fluid rounded" />
                    </div>
                 {/*   <div id="recaptcha-container" style={{ display: 'none' }}></div> */}
                 </div>
                 </div>

);
};
    export default HomePage;

