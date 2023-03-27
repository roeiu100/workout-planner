import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDytwfcHosEJGyDZjftWUC4qtQ3-yCvfII",
  authDomain: "testwork-d2d06.firebaseapp.com",
  projectId: "testwork-d2d06",
  storageBucket: "testwork-d2d06.appspot.com",
  messagingSenderId: "275055667856",
  appId: "1:275055667856:web:d01206030be56fc57a8615",
  measurementId: "G-N2NH6V32GE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);