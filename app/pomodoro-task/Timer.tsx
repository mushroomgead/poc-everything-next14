"use client";
import { useEffect } from "react";
import { usePomodoroStore } from "./store";

export function Timer() {
  const { timeRemaining, isRunning, mode, setTimeRemaining, switchMode, start, pause, reset } =
    usePomodoroStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev: number) => {
        if (prev <= 1) {
          switchMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setTimeRemaining, switchMode]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-6">
      <div className="text-center mb-6">
        <span
          className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
            mode === "work" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {mode === "work" ? "Work" : "Break"}
        </span>
      </div>

      <div className="text-center mb-8">
        <span className="text-7xl font-mono font-bold text-gray-800">
          {formatTime(minutes)}:{formatTime(seconds)}
        </span>
      </div>

      <div className="flex justify-center gap-3">
        {isRunning ? (
          <button
            onClick={pause}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={start}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Start
          </button>
        )}
        <button
          onClick={reset}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
