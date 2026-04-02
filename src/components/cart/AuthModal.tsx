import React, {useState} from 'react';

interface AuthModalProps {
    visible: boolean;
    onClose: () => void;
    mobile: string;
    setMobile: (val: string) => void;
    otp: string;
    setOtp: (val: string) => void;
    isOtpSent: boolean;
    cooldownTime: number;
    sendOtp: () => void;
    verifyOtp:() => void;
    changeNumber: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
                                                        visible,
                                                        onClose,
                                                        mobile,
                                                        setMobile,
                                                        otp,
                                                        setOtp,
                                                        isOtpSent,
                                                        cooldownTime,
                                                        sendOtp,
                                                        verifyOtp,
                                                        changeNumber
                                                    }) => {
    if (!visible) return null;


    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');

    const [mobileError, setMobileError] = useState('');
    const isValidMobile = (num: string) => /^\d{10}$/.test(num);

    const handleContinue = async () => {
        if (!mobile || !isValidMobile(mobile)) {
            setMobileError('Please enter a valid 10-digit mobile number');
            return;
        }
        setMobileError('');
        await sendOtp();
        setStep('otp');
    };



    return (
        <div className="modal-overlay">
            <div className="auth-card">
                <button onClick={onClose}>×</button>
                {step === 'mobile' && (
                    <>
                        <h1>Sign up Or Sign in</h1>
                <p>Enjoy the convenience of a single account across all participating brands</p>

                <h4>Mobile Number</h4>
                        +91-<input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your Mobile Number"
                    maxLength={10}
                    />
                        {mobileError && <p className="error-text">{mobileError}</p>}
                       {/* <button onClick={async () => {
                    await sendOtp();     // Call the external sendOtp
                    setStep('otp');      // ✅ Switch to OTP card
                }}>Continue</button>*/}
                        <button onClick={handleContinue}>
                            Continue
                        </button>

                        <p>By creating your account you agree to our Terms and Conditions</p>
                    </>
                )}

               {/* {isOtpSent && (
                    <>*/}
                {step === 'otp' && (
                    <>

                        <h1>Sign up Or Sign in</h1>
                        <p>Enjoy the convenience of a single account across all participating brands</p>

                        <p>Sent to +91{mobile} <button onClick=
                                                           {() => {
                                                               changeNumber();   // your existing logic
                                                               setOtp('');  // ✅ clears OTP input
                                                               setStep('mobile'); // ✅ switch back to mobile card
                                                           }}

                        >Change?</button></p>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />
                         <button onClick={verifyOtp}>Verify with OTP</button>
                        {/*<button onClick={() => verifyOtp("/account")}>Verify</button>*/}


                        <p> We've sent your code.Try again in {cooldownTime}s</p>
                    </>
                )}
                <div id="recaptcha-container" style={{ display: 'none' }}></div>


            </div>
        </div>
    );
};
