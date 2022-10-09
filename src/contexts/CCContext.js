import {useState, createContext} from 'react';
import {doc, getDoc} from "firebase/firestore";
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
            const CCData = await getDoc(doc(db, "collection_center", CCUser));

            if(CCData){
                return CCData.data();
            }else{
                throw("No se pudo obtener la información en este momento.\nPor Favor itente más tarde.")
            }
        }catch(error){
            alert(error);
        }
    }

    return(
        <CCContext.Provider value={{CCUser, CCEditViewS, setCCUser, setCCEditViewS, getCCData}}>
            {children}
        </CCContext.Provider>
    )
}