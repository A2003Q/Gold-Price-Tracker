import { createContext, useState } from "react";

export const CurrencyContext =  createContext();

export function CurrencyProvider({children}){
    const [currency , setCurrency] = useState('JOD');

    return(
        <CurrencyContext.Provider value={{currency,setCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )
}