
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDDVaX9Y2SXyRJfrGTIoc-ECqW1VSgv_Yw",
  authDomain: "linkdin-clone-841fb.firebaseapp.com",
  projectId: "linkdin-clone-841fb",
  storageBucket: "linkdin-clone-841fb.appspot.com",
  messagingSenderId: "990747273001",
  appId: "1:990747273001:web:b921d884773dc6262db938"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)