import {useState, useEffect ,createContext} from 'react';
//import {db} from "./FBConnection";
import {initializeApp} from 'firebase/app';
import {getFirestore, onSnapshot, collection} from "firebase/firestore";

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

//Context created
export const ProductContext = createContext();

//Provider

export const ProductContextProvider = ({children}) => {
    const [docsData, setDocsData] = useState(null);
    
    //Gets all data from request
    useEffect(() => 
    {
        onSnapshot(collection(db, "products"), collection => {
            setDocsData(collection.docs.map(doc => {return { data: doc.data(), id: doc.id }})); 
        })
    }
    ,[]);

    return(
        <ProductContext.Provider value={docsData}>
            {children}
        </ProductContext.Provider>
    )
}