import React, {createContext, useContext} from "react";


export type TokenPrices = {
    tokens: any
    setTokens: (newTokenObject: any) => void
}

export const TokenPricesContext = createContext<TokenPrices|null>(null);
export const useTokenPrices = () => useContext<TokenPrices|null>(TokenPricesContext);
