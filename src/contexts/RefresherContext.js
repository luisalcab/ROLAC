import {useState} from 'react';
import { createContext } from 'react';

export const RefresherContext = createContext();

export const RefresherProvider = ({children}) => {
    const [refresh, setRefresh] = useState(false);

    return (
        <RefresherContext.Provider value = {{refresh, setRefresh}}>
            {children}
        </RefresherContext.Provider>
    );
}