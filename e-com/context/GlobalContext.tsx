'use client';

import { countUnreadMessages } from "@/app/actions/countMessages";
import React, { createContext, useState, useContext, useEffect } from "react";

interface GlobalContextProps {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}
//create a context object hold global state
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Explicitly type the value object
  const value: GlobalContextProps = {
    unreadCount,
    setUnreadCount
  };

  useEffect(() =>{
    (async ()=>{
      const count = await countUnreadMessages();
      console.log('count =>',count);
      setUnreadCount(count!);
    })()
  },[])

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
