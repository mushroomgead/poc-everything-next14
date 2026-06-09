"use client";

import { useState } from "react";
import CalculatorButton from "./components/CalculatorButton";

const OPERATORS = new Set(["+", "-", "×", "÷", "="]);

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [waitNext, setWaitNext] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitNext) {
      setDisplay(digit);
      setWaitNext(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitNext) {
      setDisplay("0.");
      setWaitNext(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const clear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setWaitNext(false);
  };

  const toggleSign = () => setDisplay(String(parseFloat(display) * -1));
  const percent = () => setDisplay(String(parseFloat(display) / 100));

  const handleOperator = (nextOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op && !waitNext) {
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setWaitNext(true);
    setOp(nextOp === "=" ? null : nextOp);
  };

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const buttons = [
    { label: "AC", variant: "action" as const, action: clear },
    { label: "+/-", variant: "action" as const, action: toggleSign },
    { label: "%", variant: "action" as const, action: percent },
    { label: "÷", variant: "operator" as const, action: () => handleOperator("÷") },
    { label: "7", variant: "number" as const, action: () => inputDigit("7") },
    { label: "8", variant: "number" as const, action: () => inputDigit("8") },
    { label: "9", variant: "number" as const, action: () => inputDigit("9") },
    { label: "×", variant: "operator" as const, action: () => handleOperator("×") },
    { label: "4", variant: "number" as const, action: () => inputDigit("4") },
    { label: "5", variant: "number" as const, action: () => inputDigit("5") },
    { label: "6", variant: "number" as const, action: () => inputDigit("6") },
    { label: "-", variant: "operator" as const, action: () => handleOperator("-") },
    { label: "1", variant: "number" as const, action: () => inputDigit("1") },
    { label: "2", variant: "number" as const, action: () => inputDigit("2") },
    { label: "3", variant: "number" as const, action: () => inputDigit("3") },
    { label: "+", variant: "operator" as const, action: () => handleOperator("+") },
    { label: "0", variant: "number" as const, action: () => inputDigit("0"), wide: true },
    { label: ".", variant: "number" as const, action: inputDecimal },
    { label: "=", variant: "operator" as const, action: () => handleOperator("=") },
  ];

  return (
    <div className="min-h-screen bg-black flex items-end justify-center pb-8">
      <div className="w-80">
        <div className="text-white text-right text-6xl font-light px-4 py-6 overflow-hidden">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-3 px-4">
          {buttons.map(({ label, variant, action, wide }) => (
            <CalculatorButton
              key={label}
              label={label}
              variant={variant}
              onClick={action}
              wide={wide}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
