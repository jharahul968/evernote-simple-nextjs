// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDddH55JiQq57Eby0XcpqY2-fMb4injYSM",
  authDomain: "evernote-clone-b744b.firebaseapp.com",
  projectId: "evernote-clone-b744b",
  storageBucket: "evernote-clone-b744b.appspot.com",
  messagingSenderId: "223041663581",
  appId: "1:223041663581:web:21ffb0285cd0d47907d3b4",
  measurementId: "G-5HV6J4G879"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database=getFirestore(app);