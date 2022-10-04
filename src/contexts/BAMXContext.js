import {useState, useEffect ,createContext} from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore, onSnapshot, collection, doc, deleteDoc} from "firebase/firestore";

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
        setDocsData(collection.docs.map(doc => {return {data: doc.data(), id: doc.id, ref: doc.ref}}));
    } ),[]);

    //Deletes a document by id
    const delD = async id => await deleteDoc(doc(db, "requests", id));

    return(
        <BAMXContext.Provider value={{docsNum, docsData, delD}}>
            {children}
        </BAMXContext.Provider>
    )
}