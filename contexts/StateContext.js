// StateContext.js
import React, { createContext, useContext, useState } from 'react';


const StateContext = createContext();

export const StateProvider = ({ children }) => {

    const [cartItems, setCartItems]= useState([]);

  return (
    <StateContext.Provider value={{cartItems,setCartItems }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
