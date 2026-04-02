// hooks/useOtpAuth.ts
import { useState, useEffect } from 'react';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    UserCredential
} from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';






export const useOtpAuth = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const navigate = useNavigate();
    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');

   /* useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                size: 'invisible',
                callback: () => {},
            }, getAuth());
        }
    }, []);

*/
    /*this code is by pass clent recapcha with otp verification*/
   /*  useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.warn("⚠️ Skipping OTP verification in development mode");
            setIsOtpVerified(true);
        }
    }, []); */

    /*this code is by pass clent recapcha with otp verification*/


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

/* const initRecaptcha = () => {
    if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier( 'recaptcha-container',
        { size: 'invisible' },
         auth );
         }
     }; */



    const sendOtp = async () => {
     /*    initRecaptcha(); */ // ✅ ensure verifier exists
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


    };
    const [isVerifying, setIsVerifying] = useState(false);


    const verifyOtp = () => {
        if (window.confirmationResult) {
            window.confirmationResult.confirm(otp)
                .then((result: UserCredential) => {
                    toast.success("✅ OTP verified successfully!");
                    setIsOtpVerified(true);
                    localStorage.setItem("isOtpVerified", "true");
                    navigate("/checkout", { state: { isOtpVerified: true } });
                })
                .catch((error) => {
                    toast.error("❌ Invalid OTP. Please try again.");
                    console.error("OTP verification failed:", error);
                });


        }

    };

    const changeNumber = () => {
        setMobile('');
        setOtp('');
        setIsOtpSent(false);
        setIsOtpVerified(false);
        toast.info("📱 You can now enter a new mobile number.");
        setStep('mobile');


    };

    return {
        mobile, setMobile,
        otp, setOtp,
        isOtpSent,
        isOtpVerified,
        cooldownTime,
        sendOtp,
        verifyOtp,
        changeNumber
    };
};
