import {useState, useEffect, createContext, useContext} from "react";
import {initializeApp} from 'firebase/app';
import {getFirestore, addDoc, collection} from "firebase/firestore";

const FBContext = createContext();

export const FBProvider = async() =>{

    //FireBase Cofiguration
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
    
    const db = getFirestore(app);
    
    try {
        const docRef = await addDoc(collection(db, "1"), {
                first: "Alan",
                middle: "Mathison",
                last: "Turing",
                born: 1912
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.log("Error adding document: ", e);
        }

    return <FBContext.Provider value={"owo"}/>
}

export const useFB = () => {
    const context = useContext(FBContext);

    return context
}