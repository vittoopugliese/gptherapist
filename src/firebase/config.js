import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDvLbG6gcl2S3uyXZ1BucudhFFReQqtByw",
  authDomain: "gptherapist-1ebda.firebaseapp.com",
  projectId: "gptherapist-1ebda",
  storageBucket: "gptherapist-1ebda.appspot.com",
  messagingSenderId: "122172358394",
  appId: "1:122172358394:web:31d4f07ed472096ea51343",
  measurementId: "G-42WF589NW6",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
