import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import * as Constants from "../constants.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getDatabase,
  push,
  set,
  ref as realtimeRef,
  get,
  child,
} from "firebase/database";

import AsyncStorage from "@react-native-async-storage/async-storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyDWiw7hc4gzZgnkTa7g4ahcVC5dVOnN4AU",
//   authDomain: "smart-parking-system-968a6.firebaseapp.com",
//   databaseURL: "https://smart-parking-system-968a6-default-rtdb.firebaseio.com",
//   projectId: "smart-parking-system-968a6",
//   storageBucket: "smart-parking-system-968a6.appspot.com",
//   messagingSenderId: "267603281356",
//   appId: "1:267603281356:web:008f56b5e62c1ee17e0969",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDQpEVlbvscQUU7E3FehvPe1WEwNbluw8Q",
  authDomain: "fir-db-project-798a3.firebaseapp.com",
  databaseURL: "https://fir-db-project-798a3-default-rtdb.firebaseio.com",
  projectId: "fir-db-project-798a3",
  storageBucket: "fir-db-project-798a3.appspot.com",
  messagingSenderId: "298867210644",
  appId: "1:298867210644:web:3faa14e579755644fb7781",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const database = getDatabase(app);

export function signupUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function sendVerificationEmail(user) {
  return sendEmailVerification(user);
}

export function signinUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function addUser(user, collection) {
  return setDoc(doc(db, collection, user.userId), user);
}

export function addDocument(data, colectionName) {
  return addDoc(collection(db, colectionName), data);
}

export function getUser(id, collectionName) {
  return getDoc(doc(db, collectionName, id));
}

export function getMultipleDocuments(propertyValue, propertyName, operator) {
  console.log("in function");
  return query(
    collection(db, Constants.INSECTS_COLLECTION),
    where(`${propertyName}`, `${operator}`, `${propertyValue}`)
  );
}
export function signOutUser() {
  return signOut(auth);
}

export const getAllDocuments = (collectionName, callback, secondCallback) => {
  const q = query(collection(db, collectionName));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const mergedData = { ...doc.data(), ...{ insectId: doc.id } };
      data.push(mergedData);
    });
    if (callback) {
      callback(data);
      // console.log("in seond callback");
    }
    if (secondCallback) {
      secondCallback(data);
    }
  });
  return unsubscribe;
};

export async function getTable(tableName) {
  return realtimeRef(database, `${tableName}/`);
}
export function deleteDoument(id, collectionName) {
  return deleteDoc(doc(db, collectionName, id));
}

export async function setDocument(collection, id, object) {
  await setDoc(doc(db, collection, id), object);
}

export function likeInsect(userUid, insectId) {
  console.log(insectId);
  let ref = doc(db, Constants.INSECTS_COLLECTION, insectId);
  return updateDoc(ref, {
    liked_by: arrayUnion(`${userUid}`),
  });
}

export function unLikeInsect(userUid, insectId) {
  let ref = doc(db, Constants.INSECTS_COLLECTION, insectId);
  return updateDoc(ref, {
    liked_by: arrayRemove(`${userUid}`),
  });
}
export function getMultipleInsects(propertyValue, propertyName, operator) {
  return query(
    collection(db, Constants.INSECTS_COLLECTION),
    where(`${propertyName}`, `${operator}`, `${propertyValue}`)
  );
}

export async function writeRealtimeDocument(path, object) {
  const db = getDatabase();
  set(realtimeRef(db, path), object);
}

export async function GetRealtimeDocuments(path) {
  const dbRef = realtimeRef(getDatabase());
  return get(child(dbRef, path));
}
