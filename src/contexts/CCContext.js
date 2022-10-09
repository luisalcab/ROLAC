import {useState, useEffect ,createContext} from 'react';

//Create Context
export const CCContext = createContext();

//Provider
export const CCProvider = ({children}) => {
    const [CCUser, setCCUser] = useState(null);
    const [CCEditViewS, setCCEditViewS] = useState(false);

    return(
        <CCContext.Provider value={{CCUser, CCEditViewS, setCCUser, setCCEditViewS}}>
            {children}
        </CCContext.Provider>
    )
}