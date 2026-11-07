import React, { createContext, useContext } from 'react';

const LanguageContext = createContext<any>({ language: 'de', setLanguage: () => {}, t: {} });

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const useLanguage = () => useContext(LanguageContext);
