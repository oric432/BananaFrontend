import React, { createContext, useState, useContext } from "react";

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [flag, setFlag] = useState(false);

  return (
    <FlagContext.Provider value={{ flag, setFlag }}>
      {children}
    </FlagContext.Provider>
  );
};

export const useFlag = () => useContext(FlagContext);
