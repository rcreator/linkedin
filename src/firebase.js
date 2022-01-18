
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDXpNMuVZ7ad0JgF6h6EHg_COcAcSf3eZc",
  authDomain: "linkedin-4b392.firebaseapp.com",
  projectId: "linkedin-4b392",
  storageBucket: "linkedin-4b392.appspot.com",
  messagingSenderId: "876404570835",
  appId: "1:876404570835:web:856292a2f1f678f73bf226"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const store = getStorage(app);

export { auth , provider, store};
export default db;