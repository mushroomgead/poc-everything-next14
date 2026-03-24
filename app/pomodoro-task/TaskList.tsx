"use client";
import { useState } from "react";
import { usePomodoroStore } from "./store";

export function TaskList() {
  const [input, setInput] = useState("");
  const { tasks, addTask, toggleTask, deleteTask } = usePomodoroStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input.trim());
      setInput("");
    }
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks yet. Add one above!</p>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              To Do ({pendingTasks.length})
            </h3>
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>

          {completedTasks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Completed ({completedTasks.length})
              </h3>
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: { id: string; text: string; completed: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
      />
      <span className={`flex-1 ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 px-2 py-1 text-red-500 hover:bg-red-100 rounded transition-all"
      >
        Delete
      </button>
    </div>
  );
}
