"use client";

import useMyContext from "@/contexts/my-context";

const MinusButton = () => {
  const { setCounters } = useMyContext();
  
  return <button onClick={() => {
    setCounters(prev => prev.map(v => v - 1));
  }}>전부 1씩 빼기</button>;
};
export default MinusButton;