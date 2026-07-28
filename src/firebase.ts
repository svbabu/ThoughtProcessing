// Import the functions you need from the SDKs you need
//src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore,enableIndexedDbPersistence,enableMultiTabIndexedDbPersistence } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {

    apiKey: "AIzaSyAHtCk04lo-ZkOAjer05OwKChfJYuE7gVY",
    authDomain: "smartcheckout-a2744.firebaseapp.com",
    projectId: "smartcheckout-a2744",
    storageBucket: "smartcheckout-a2744.appspot.com", // ✅ corrected
    messagingSenderId: "494710073079",
    appId: "1:494710073079:web:b8815ad6d646e007d015f2"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // ✅ Add this line

// Optional: enable offline persistence
/*  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition')
    { console.error("Persistence failed: multiple tabs open"); }
    else if (err.code === 'unimplemented')
    { console.error("Persistence not supported in this browser"); }
    }); */


// ✅ Enable multi-tab persistence
enableMultiTabIndexedDbPersistence(db).catch(err => {
  if (err.code === "failed-precondition") {
    console.error("Multi-tab persistence failed: another tab already has persistence.");
  } else if (err.code === "unimplemented") {
    console.error("Persistence not supported in this browser.");
  }
});

export const auth = getAuth(app);


/*export { auth };*/

