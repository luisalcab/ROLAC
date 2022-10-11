import {useState, createContext} from 'react';
import {doc, getDoc, addDoc, collection } from "firebase/firestore";
import { enviromentVariables } from '../../utils/enviromentVariables';

//Create Context
export const CCContext = createContext();

//Provider
export const CCProvider = ({children}) => {
    const {db} = enviromentVariables;

    const [CCUser, setCCUser] = useState(null);
    const [CCEditViewS, setCCEditViewS] = useState(false);

    const getCCData = async() => {
        try{
            const data = await getDoc(doc(db, "collection_center", CCUser));

            if(data){
                return data.data()
            }else{
                throw("No se pudo obtener la información en este momento.\nPor Favor itente más tarde.")
            }
        }catch(error){
            alert(error);
        }
    }

    const addEdit = async(data) => {
        try{
            await addDoc(collection(db, "edit_requests"), data);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <CCContext.Provider value={{CCUser, CCEditViewS, setCCUser, setCCEditViewS, addEdit, getCCData}}>
            {children}
        </CCContext.Provider>
    )
}
