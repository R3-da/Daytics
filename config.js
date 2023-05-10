import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfjCeKxtbGQn89y3majfNLFzdfErnbofk",
    authDomain: "test-6c8e3.firebaseapp.com",
    projectId: "test-6c8e3",
    storageBucket: "test-6c8e3.appspot.com",
    messagingSenderId: "56597075149",
    appId: "1:56597075149:web:128b32d086473baf3d8584",
    measurementId: "G-VMCS8DBHNV"
}

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}