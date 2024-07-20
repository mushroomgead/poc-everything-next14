"use client";
import { useMemo, useState } from "react";

export default function PageUsememo() {
  const [count, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  const expensiveCalculation = (num: number): number => {
    console.log("calculating...");
    return num * 2;
  };
  // without useMemo
  //   const memoizedValue = expensiveCalculation(count);
  // with useMemo
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <h1>Memorized value: {memoizedValue}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <h1>Random value: {randomNumber}</h1>
      <button onClick={() => setRandomNumber(Math.random())}>
        Random number
      </button>
    </div>
  );
}
