import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'KES' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInZAR: number) => string;
  exchangeRate: { KES: number; USD: number };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (approximate - you might want to fetch these from an API)
const EXCHANGE_RATES = {
  KES: 21.5,  // 1 ZAR = 21.5 KES
  USD: 0.054  // 1 ZAR = 0.054 USD (approximately)
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('KES');

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferred_currency');
    if (saved === 'KES' || saved === 'USD') {
      setCurrency(saved);
    }
  }, []);

  // Save preference when changed
  useEffect(() => {
    localStorage.setItem('preferred_currency', currency);
  }, [currency]);

  const convertPrice = (priceInZAR: number): string => {
    if (currency === 'KES') {
      const priceInKES = priceInZAR * EXCHANGE_RATES.KES;
      return `KSh ${Math.round(priceInKES).toLocaleString()}`;
    } else {
      const priceInUSD = priceInZAR * EXCHANGE_RATES.USD;
      return `$ ${priceInUSD.toFixed(2).toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      convertPrice,
      exchangeRate: EXCHANGE_RATES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
