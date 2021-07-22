import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPq55Oorbr-16MGM4hRlkVxZoO8YXrI0I",
    authDomain: "logindemo-8f2e6.firebaseapp.com",
    databaseURL: "https://logindemo-8f2e6.firebaseio.com",
    projectId: "logindemo-8f2e6",
    storageBucket: "logindemo-8f2e6.appspot.com",
    messagingSenderId: "636986436425",
    appId: "1:636986436425:web:0abfe6066e2f7266110898",
    measurementId: "G-BV0MQEFL1C"
  };
  const app = firebase.initializeApp(firebaseConfig);
  export const auth= app.auth();
  export const firestore = app.firestore();
  export const storage = app.storage();