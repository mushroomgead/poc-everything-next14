"use client";
import { memo, useCallback, useState } from "react";

type ButtonType = {
  handleClick: () => void;
  randomNumber: number;
};

function Button({ handleClick, randomNumber }: ButtonType) {
  console.log("button render");
  return <button onClick={handleClick}>click me - {randomNumber}</button>;
}

const MemoizedButton = memo(Button);
// without memo
// const MemoizedButton = Button;

export default function PageUseCallback() {
  const [count, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  const handleClick = useCallback(() => {
    console.log("button clicked");
    setRandomNumber(Math.random());
  }, []);

  //   const handleClick = () => {
  //     console.log("button clicked");
  //   };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoizedButton handleClick={handleClick} randomNumber={randomNumber} />
    </div>
  );
}
