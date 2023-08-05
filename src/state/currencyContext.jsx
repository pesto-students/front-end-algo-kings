
import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  // Conversion rates for different currencies
  const conversionRates = {
    USD: 1,
    INR: 74.5, 
    GBP: 0.72, 
  };

  const convertCurrency = (amount, targetCurrency) => {
    return amount * conversionRates[targetCurrency];
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
