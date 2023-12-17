
import { initializeApp, getApps } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyClgwIALC3zuThIc5IkYQ6i7eCriAh7VCo",
  authDomain: "test-next-80889.firebaseapp.com",
  projectId: "test-next-80889",
  storageBucket: "test-next-80889.appspot.com",
  messagingSenderId: "265761475047",
  appId: "1:265761475047:web:406e34bdc9861e7c0ed542",
  measurementId: "G-C2X2VG5K1N"
};


const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app