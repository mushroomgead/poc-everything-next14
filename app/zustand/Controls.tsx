"use client";
import useBearStore from "./store";

export default function Controls() {
  const increasePopulation = useBearStore(
    (state: any) => state.increasePopulation
  );
  return (
    <button
      onClick={() => {
        console.log("click");

        increasePopulation();
      }}
    >
      one up
    </button>
  );
}
