import {useState, useEffect ,createContext} from 'react';

//Create Context
export const CCContext = createContext();

//CCProvider
export const CCProvider = ({children}) => {
    const [currentCCUid, setCurrentCCUid] = useState(null);

    return(
        <CCContext.Provider value={{currentCCUid, setCurrentCCUid}}>
            {children}
        </CCContext.Provider>
    )
}

