// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';
import { firebase } from "@react-native-firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAr91SyJ6wGRvkCMd7l-WyQbfRCcGCJrI",
  authDomain: "familyapp-33866.firebaseapp.com",
  projectId: "familyapp-33866",
  storageBucket: "familyapp-33866.appspot.com",
  messagingSenderId: "236430739032",
  appId: "1:236430739032:web:717c398757f010f2a5ac2d",
  measurementId: "G-CB6TBMTVBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const storage = getStorage(app);
