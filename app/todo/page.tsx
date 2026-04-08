"use client";

import { useState, useEffect, useRef } from "react";
import { useTodoStore } from "./store";

export default function TodoPage() {
  const { todos, addTodo, editTodo, deleteTodo, toggleTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCompletedCount(todos.filter((t) => t.completed).length);
    setIsDeleting(todos.length);
  }, [todos, completedCount]);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
      setIsAdding(false);
    }
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      editTodo(editingId, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (editingId) {
        handleSaveEdit();
      } else {
        handleAdd(e);
      }
    }
  };

  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;
  const completedTodos = todos.filter((t) => t.completed);
  const activeTodos = todos.filter((t) => !t.completed);

  const categories = [
    { name: "All Tasks", count: todos.length, icon: "📋" },
    { name: "Pending", count: activeTodos.length, icon: "⏳" },
    { name: "Completed", count: completedTodos.length, icon: "✅" },
  ];

  const getPriorityColor = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("urgent") || lower.includes("important"))
      return "from-red-500 to-orange-500";
    if (lower.includes("todo") || lower.includes("task"))
      return "from-blue-500 to-cyan-500";
    if (lower.includes("meeting") || lower.includes("call"))
      return "from-purple-500 to-pink-500";
    return "from-green-500 to-emerald-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-4 shadow-2xl">
              <span className="text-5xl">✨</span>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
            My TODOS
          </h1>
          <p className="text-xl text-purple-200 font-medium">
            Stay organized, get things done...
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-white shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-1">{category.icon}</div>
              <div className="text-2xl font-bold">{category.count}</div>
              <div className="text-sm text-purple-200">{category.name}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold text-lg">Progress</span>
            <span className="text-purple-200 font-bold text-xl">
              {completedCount}/{todos.length}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-purple-200 text-sm mt-2 text-center">
            {progress === 100
              ? "🎉 All tasks completed! Great job!"
              : progress === 0
                ? "🚀 Ready to get started?"
                : "Keep going, you're making progress!"}
          </p>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleAdd} className="mb-8">
          <div
            className={`relative bg-white rounded-2xl shadow-2xl p-2 transition-all duration-300 ${
              isAdding ? "scale-105 ring-4 ring-purple-400" : ""
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
                setIsAdding(e.target.value.length > 0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="w-full px-6 py-4 text-lg bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!newTodo.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                todo.completed ? "opacity-60 grayscale" : ""
              }`}
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div
                className="p-5 flex items-center gap-4"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.95) 100%)`,
                }}
              >
                {/* Custom Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    todo.completed
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-110 shadow-lg"
                      : "bg-gray-200 hover:bg-gray-300 text-transparent"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>

                {/* Todo Content */}
                <div className="flex-1 min-w-0">
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-4 py-2 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition-colors font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1 min-w-0 pr-4">
                        <p
                          className={`text-lg font-medium truncate transition-all duration-300 ${
                            todo.completed
                              ? "text-gray-400 line-through decoration-2"
                              : "text-gray-800"
                          }`}
                        >
                          {todo.title}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                            todo.completed
                              ? "bg-gray-200 text-gray-500"
                              : `bg-gradient-to-r ${getPriorityColor(
                                  todo.title,
                                )} text-white shadow-md`
                          }`}
                        >
                          {todo.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(todo.id, todo.title)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-xl transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Decorative bottom border */}
              <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, #a855f7, #ec4899)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <div
            className="text-center py-16 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20"
            style={{ animation: "fadeIn 0.8s ease-out" }}
          >
            <div className="text-8xl mb-4 animate-bounce">🌱</div>
            <h3 className="text-2xl font-bold text-white mb-2">No tasks yet</h3>
            <p className="text-purple-200 text-lg">
              Add your first task to get started!
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 shadow-xl border border-white/20">
            <p className="text-purple-200 text-sm font-medium">
              {activeTodos.length} task{activeTodos.length !== 1 ? "s" : ""}{" "}
              pending • {completedCount} completed
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
