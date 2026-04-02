// src/typed/custom.d.ts
export {}; // ✅ ensures this file is treated as a module

declare global {
    interface Window {
        recaptchaVerifier?: import('firebase/auth').RecaptchaVerifier;
        confirmationResult?: import('firebase/auth').ConfirmationResult;
    }
}

