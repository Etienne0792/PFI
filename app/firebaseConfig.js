
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZOm_1mqECuVvMrdPB7POoRpR5V1_3sus",
    authDomain: "pfi-mobile-78360.firebaseapp.com",
    projectId: "pfi-mobile-78360",
    storageBucket: "pfi-mobile-78360.firebasestorage.app",
    messagingSenderId: "40754816335",
    appId: "1:40754816335:web:565bc3de486cedd320d13a",
    measurementId: "G-W07EDSWP7R"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;