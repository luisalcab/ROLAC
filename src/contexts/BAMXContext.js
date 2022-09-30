import {useState, useEffect, createContext} from 'react';

//Create Context
export const BAMXContext = createContext();

//BAMX provider
export const BAMXProvider = ({children}) => {

    return(
        <BAMXContext.Provider>
            {children}
        </BAMXContext.Provider>
    )
}