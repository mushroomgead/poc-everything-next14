"use client";
import useBearStore from "./store";

export default function BearCounter() {
  const bears = useBearStore((state: any) => state.bears);

  return <h1>{bears} around here...</h1>;
}
