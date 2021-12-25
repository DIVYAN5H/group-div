// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzqq11PMEZ6gaVvPsVbbO7AHPXAgqx0Ik",
  authDomain: "instagam-div.firebaseapp.com",
  projectId: "instagam-div",
  storageBucket: "instagam-div.appspot.com",
  messagingSenderId: "693732532876",
  appId: "1:693732532876:web:e560034ebbc1b64b2111a9",
  measurementId: "G-Y7XY4QZDWC",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
