import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtX3ohU85WeRy7CdHQtzlfd3SmcVN7cPY",
  authDomain: "hiwam0.firebaseapp.com",
  projectId: "hiwam0",
  storageBucket: "hiwam0.appspot.com",
  messagingSenderId: "967371380426",
  appId: "1:967371380426:web:2ded9a099468d85b30c633",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
