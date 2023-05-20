import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCv_swsQU3Q65jnsoHoy5vq7WVc_SFTFQk",
    authDomain: "daytics-6975c.firebaseapp.com",
    projectId: "daytics-6975c",
    storageBucket: "daytics-6975c.appspot.com",
    messagingSenderId: "101475479611",
    appId: "1:101475479611:web:e90e8bd379c9e25a9f2c1e",
    measurementId: "G-J93VCSM2VK"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
}

const auth = firebase.auth();

export {
    firebase,
    auth
}