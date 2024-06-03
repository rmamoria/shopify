// StateContext.js
import React, { createContext, useContext, useState } from 'react';


const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedFromCart, setSelectedFromCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
   const [user, setUser] = useState("");
   const [loggedIn, setLoggedIn] = useState(false);
  return (
    <StateContext.Provider value={{loggedIn,setLoggedIn, user,setUser, cartItems, setCartItems, addedToCart, setAddedToCart ,selectedFromCart,setSelectedFromCart}}>
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
