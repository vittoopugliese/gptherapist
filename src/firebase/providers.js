import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore, setDoc, updateDoc, doc, getDoc} from "firebase/firestore";
import {firebaseAuth} from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const {displayName, email, photoURL, uid} = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

// ...

export const saveUserState = async (userId, state) => {
  try {
    const db = getFirestore();
    const stateRef = doc(db, "state", userId);

    const docSnapshot = await getDoc(stateRef);

    if (docSnapshot.exists()) {
      await updateDoc(stateRef, state);
    } else {
      await setDoc(stateRef, state);
    }

    return {ok: true};
  } catch (error) {
    return {ok: false, error};
  }
};

export const getUserState = async (userId) => {
  try {
    const db = getFirestore();
    const stateRef = doc(db, "state", userId);

    const stateSnapshot = await getDoc(stateRef);

    if (stateSnapshot.exists()) {
      const stateData = stateSnapshot.data();
      return {ok: true, state: stateData};
    } else {
      return {ok: false, error: "El estado del usuario no existe en Firestore"};
    }
  } catch (error) {
    return {ok: false, error};
  }
};
