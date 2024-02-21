import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getCount, getFirestore, collection } from 'firebase/firestore/lite'
import { getAuth, updatePassword, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, beforeAuthStateChanged, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9aolCgDvMxgSrjVbeWlkRk4FhKEG__70",
  authDomain: "careerconnect-a82ba.firebaseapp.com",
  projectId: "careerconnect-a82ba",
  storageBucket: "careerconnect-a82ba.appspot.com",
  messagingSenderId: "1091431437955",
  appId: "1:1091431437955:web:ece1590313a7fad1bf2db6",
  measurementId: "G-3E21L6BW7M"
};

//firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage,
  getAuth,
	db,
  doc,
  getDoc,
	setDoc,
  addDoc,
	createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  updatePassword
}