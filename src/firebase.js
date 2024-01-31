import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDO-1m5VY_w55MFGbJ-STGQtoT9YtyV-3A",
  authDomain: "prayer-project-34d97.firebaseapp.com",
  projectId: "prayer-project-34d97",
  storageBucket: "prayer-project-34d97.appspot.com",
  messagingSenderId: "84355956809",
  appId: "1:84355956809:web:6061878925168ba67e3f98",
  measurementId: "G-1R70M34JD2"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()