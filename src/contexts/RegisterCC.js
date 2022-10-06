import {useState, useEffect ,createContext} from 'react';
import { collection, addDoc } from "firebase/firestore";
import {enviromentVariables} from "../../utils/enviromentVariables"

export const RegisterContext = createContext();

//Create the provider
export const RegisterCCProvider = ({children}) => {
    const {db, app} = enviromentVariables;

    const [data, setData] = useState({
        name:"",
        email:"",
        address:"",
        dates: "",
        longitude:0,
        latitude:0
    })

    useEffect(() =>{
        const uploadData = async() => {
        const {name, email, address, dates, longitude, latitude} = data;

        //Validation for empty objects
        if([name, email, address, dates, longitude, latitude].includes("")) return;

        //The request to the database
        try{
            await addDoc(collection(db, "requests"), { data });
        }catch(error){
            console.log(error);
        }
    }

        //The function calling of the request
        uploadData();
    },[data])

    //Main provider component
    return(
        <RegisterContext.Provider value={{setData}}>
            {children}
        </RegisterContext.Provider>
    )
}