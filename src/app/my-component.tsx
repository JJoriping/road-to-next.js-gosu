"use client";

import useMyContext from "@/contexts/my-context";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MyComponent = (props:{ 'position': number }) => {
  const $prevValue = useRef<number>();
  const $prevSum = useRef<number>();
  const $div = useRef<HTMLDivElement>(null);
  const myContext = useMyContext();
  const [includingComma, setIncludingComma] = useState(false);

  const value = myContext.counters[props.position];

  // 메모이제이션 (memoization)
  const sum = useMemo(
    () => {
      if($prevValue.current !== undefined
        && $prevSum.current !== undefined
        && $prevValue.current + 1 === value
      ){
        return $prevSum.current + value;
      }
      return sumTo(value);
    }, // 메모할 값을 반환하는 함수
    [value]             // 그 값이 어디에 의존하는지.
  );

  const handleClick = useCallback(() => {
    myContext.setCounters(prev => {
      const next = [...prev];
      next[props.position]++;
      return next; // 불변성 (immutability)
    });
  }, [myContext.setCounters, props.position]);

  // 이놈이 호출되는 경우
  // 1. 처음 렌더될 때
  // 2. dependency 배열 내 값 중 하나라도 바뀌어서 재렌더되었을 때
  useEffect(() => {
    $div.current?.scrollIntoView();

    $prevValue.current = value;
    $prevSum.current = sum;
  }, [value, sum]);

  return <div ref={$div}>
    <button onClick={handleClick}>
      [+1]
    </button>
    <button onClick={() => setIncludingComma(prev => !prev)}>
      [,]
    </button>
    {value} ({includingComma ? sum.toLocaleString() : sum})
  </div>;
};
export default MyComponent;

function sumTo(value:number):number{
  {
    const $baby = document.createElement("span");
    $baby.textContent = `[${value}]`;
    $baby.style.fontSize = "9px";
    document.body.append($baby);
  }
  let sum = 0;

  for(let i = 1; i <= value; i++) sum += i;
  return sum;
}