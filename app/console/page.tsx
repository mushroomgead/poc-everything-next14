// @ts-nocheck
"use client";
import { useEffect } from "react";
import DevToolsDetector from "./DevToolsDetector";

export default function Page() {
  return (
    <h1>
      hello console
      <DevToolsDetector />
    </h1>
  );
}
