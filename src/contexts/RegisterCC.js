import {useState, useEffect ,createContext} from 'react';
import { collection, addDoc } from "firebase/firestore";
import {enviromentVariables} from "../../utils/enviromentVariables"

export const RegisterContext = createContext();

//Create the provider
export const RegisterCCProvider = ({children}) => {
    const {db} = enviromentVariables;

    const [data, setData] = useState(null);

    useEffect(() =>{
        const uploadData = async() => {
            try{
                await addDoc(collection(db, "requests"), data);
            }catch(error){
                console.log(error);
            }
        }

        //The function calling of the request
        data ? uploadData() : false;
    },[data])

    //Main provider component
    return(
        <RegisterContext.Provider value={{setData}}>
            {children}
        </RegisterContext.Provider>
    )
}