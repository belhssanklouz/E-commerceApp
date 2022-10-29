// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDea5Kmo65FdTCEYr-B0CqDVfu9XGFjbYM",
  authDomain: "e-commere-shop.firebaseapp.com",
  projectId: "e-commere-shop",
  storageBucket: "e-commere-shop.appspot.com",
  messagingSenderId: "669732012503",
  appId: "1:669732012503:web:1b823a607677bbee594b92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;