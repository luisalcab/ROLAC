import {useState, useEffect ,createContext} from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

export const RegisterContext = createContext();

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

//Create the provider
export const RegisterCCProvider = ({children}) => {
    const [data, setData] = useState({
        name:"",
        email:"",
        dates: "",
        longitude:"",
        latitude:""
    })

    useEffect(() =>{
        const uploadData = async() => {
            console.log(data);
            // try{
            //     const docRef = await addDoc(collection(db, "users"), data);
            //     console.log(docRef.id);
            // }catch(error){
            //     console.log(error);
            // }
        }

        uploadData();
    },[data])

    //Main provider component
    return(
        <RegisterCCProvider.Provider value={{setData}}>
            {children}
        </RegisterCCProvider.Provider>
    )
}