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
import { getDatabase, push, set, ref as realtimeRef } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyDWiw7hc4gzZgnkTa7g4ahcVC5dVOnN4AU",
  authDomain: "smart-parking-system-968a6.firebaseapp.com",
  databaseURL: "https://smart-parking-system-968a6-default-rtdb.firebaseio.com",
  projectId: "smart-parking-system-968a6",
  storageBucket: "smart-parking-system-968a6.appspot.com",
  messagingSenderId: "267603281356",
  appId: "1:267603281356:web:008f56b5e62c1ee17e0969",
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

export async function sendMessage(currentUid, guestUid, message) {
  // return setDoc(doc(db, Constants.USER_COLLECTION, user.userId), user);

  return set(
    push(realtimeRef(database, `insectorsMessages/${currentUid}/${guestUid}`)),
    {
      sender: currentUid,
      reciever: guestUid,
      message: message,
    }
  );
}

export async function recieveMessage(currentUid, guestUid, message) {
  // return setDoc(doc(db, Constants.USER_COLLECTION, user.userId), user);
  return set(
    push(realtimeRef(database, `insectorsMessages/${guestUid}/${currentUid}`)),
    {
      sender: currentUid,
      reciever: guestUid,
      message: message,
    }
  );
}

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
