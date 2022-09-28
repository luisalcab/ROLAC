import { createContext } from 'react';
import { useState } from 'react';

export const ProductInfoContext = createContext();

export const ProductInfoProvider = ({children}) => {
    const [productInfo, setProductInfo] = useState({});

    return (
        <ProductInfoContext.Provider value = {{productInfo, setProductInfo}}>
            {children}
        </ProductInfoContext.Provider>
    );
}