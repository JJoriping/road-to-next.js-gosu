"use client";

import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

const myContext = createContext({
  counters: [] as number[],
  setCounters: (value:SetStateAction<number[]>) => {}
});
// Context Provider <- pub
export const MyContextProvider = (props:{ 'children': ReactNode }) => {
  const [ counters, setCounters ] = useState([ 0, 100, 200 ]);

  return <myContext.Provider value={{
    counters,
    setCounters
  }}>
    {props.children}
  </myContext.Provider>;
};
// Context hook <- sub
const useMyContext = () => {
  return useContext(myContext);
};
export default useMyContext;