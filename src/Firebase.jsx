// import axios from "axios";

// const firebase = axios.create({
//   baseURL: "https://hidroponik-e2f70-default-rtdb.asia-southeast1.firebasedatabase.app/.json",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default firebase;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKVM5RkLvWC4AfcwURr82SnjhvvPMay5A",
  authDomain: "hidroponik-e2f70.firebaseapp.com",
  databaseURL: "https://hidroponik-e2f70-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hidroponik-e2f70",
  storageBucket: "hidroponik-e2f70.firebasestorage.app",
  messagingSenderId: "632214951863",
  appId: "1:632214951863:web:820fe2d1342631d475ba32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);