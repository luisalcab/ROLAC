import {useState, useEffect ,createContext} from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore, onSnapshot, collection, doc, deleteDoc, setDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

//Create Context
export const BAMXContext = createContext();

//FireBase Cofiguration//Create Context
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

//BAMX provider
export const BAMXProvider = ({children}) => {
    const [docsNum, setDocsNum] = useState(null);
    const [docsData, setDocsData] = useState(null);

    //Number of notifications real time
    useEffect(() => onSnapshot(collection(db, "requests"), collection => {
        setDocsNum(collection.docs.length);
    } ),[]);

    //Gets all data from request
    useEffect(() => onSnapshot(collection(db, "requests"), collection => {
        setDocsData(collection.docs.map(doc => {return {data: doc.data(), id: doc.id}}));
    } ),[]);

    //Deletes a CCRequest document by id
    const delD = async id => await deleteDoc(doc(db, "requests", id));

    const addUser = async (email, data, id) => {
        const auth = getAuth(app);

        //generates a random password
        const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        
        //Create the user
        const CC = await createUserWithEmailAndPassword(auth, email, password);

        //Add the doc to the collection center collection
        await setDoc(doc(db, "collection_center", CC.user.uid), data);

        //Delete de doc from the request collection
        await deleteDoc(doc(db, "requests", id));
    }

    return(
        <BAMXContext.Provider value={{docsNum, docsData, delD, addUser}}>
            {children}
        </BAMXContext.Provider>
    )
}