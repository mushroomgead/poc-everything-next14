"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Mode = "work" | "break";

interface PomodoroState {
  timeRemaining: number;
  isRunning: boolean;
  mode: Mode;
  tasks: Task[];
  setTimeRemaining: (time: number | ((prev: number) => number)) => void;
  setIsRunning: (isRunning: boolean) => void;
  setMode: (mode: Mode) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  switchMode: () => void;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      timeRemaining: WORK_DURATION,
      isRunning: false,
      mode: "work",
      tasks: [],

      setTimeRemaining: (time) =>
        set((state) => ({
          timeRemaining: typeof time === "function" ? time(state.timeRemaining) : time,
        })),
      setIsRunning: (isRunning) => set({ isRunning }),
      setMode: (mode) => set({ mode, timeRemaining: mode === "work" ? WORK_DURATION : BREAK_DURATION }),

      start: () => set({ isRunning: true }),
      pause: () => set({ isRunning: false }),
      reset: () => {
        const { mode } = get();
        set({ isRunning: false, timeRemaining: mode === "work" ? WORK_DURATION : BREAK_DURATION });
      },
      switchMode: () => {
        const { mode } = get();
        const newMode = mode === "work" ? "break" : "work";
        set({
          mode: newMode,
          timeRemaining: newMode === "work" ? WORK_DURATION : BREAK_DURATION,
          isRunning: false,
        });
      },

      addTask: (text) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "pomodoro-task-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        mode: state.mode,
        timeRemaining: state.timeRemaining,
      }),
    }
  )
);
