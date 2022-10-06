import {initializeApp} from 'firebase/app';
<<<<<<< HEAD
import {getFirestore} from "firebase/firestore";

//FireBase Cofiguration//Create Context
=======
import {initializeFirestore} from "firebase/firestore";

>>>>>>> d050a29fe416362618451fd7c2e773ee39493681
const firebaseConfig = {
    apiKey: "AIzaSyDQoMWvjK0Dv2mJshp8Zc15H8Dq3z6G8Hc",
    authDomain: "rolac-f16b1.firebaseapp.com",
    projectId: "rolac-f16b1",
    storageBucket: "rolac-f16b1.appspot.com",
    messagingSenderId: "923719062098",
    appId: "1:923719062098:web:fb95301a590416e6dd858b",
    measurementId: "G-W8NSTTQS6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
const db = getFirestore(app);

=======
const db = initializeFirestore(app);
>>>>>>> d050a29fe416362618451fd7c2e773ee39493681

export const enviromentVariables = {
    publishableKey: "pk_test_51LkUu8L3fb2NBnm32ovLcCuet2FDgfprjfA1lAaL0cqZ8SdJHzS1v7erGYck9PWWpY43cfquaZAJUudpNihX0bqu00WVCmQvro",
    app,
    db
}