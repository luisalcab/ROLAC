import React from 'react';
import {db} from '../contexts/FBConnection';
import {collection, addDoc} from "firebase/firestore";

const uploadData = async (values) => {
    const docRef = await addDoc(collection(db, "products"), values);
    console.log("Document written with ID: ", docRef.id);
}

export default uploadData;