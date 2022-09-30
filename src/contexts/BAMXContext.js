import {useState, useEffect ,createContext} from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore, onSnapshot, collection} from "firebase/firestore";

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

    useEffect(() => onSnapshot(collection(db, "requests"), col => {
        setDocsNum(col.docs.length);
    } ),[])

    return(
        <BAMXContext.Provider value={{docsNum}}>
            {children}
        </BAMXContext.Provider>
    )
}