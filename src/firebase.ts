import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  };
  const app = firebase.initializeApp(firebaseConfig);
  export const auth= app.auth();
  export const firestore = app.firestore();
  export const storage = app.storage();
