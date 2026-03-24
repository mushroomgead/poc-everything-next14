"use client";
import { Timer } from "./Timer";
import { TaskList } from "./TaskList";

export default function PomodoroTaskPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Pomodoro Task</h1>
        <Timer />
        <TaskList />
      </div>
    </div>
  );
}
