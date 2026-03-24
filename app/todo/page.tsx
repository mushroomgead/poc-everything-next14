"use client";

import { useState } from "react";
import { useTodoStore } from "./store";

export default function TodoPage() {
  const { todos, addTodo, editTodo, deleteTodo, toggleTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo List</h1>

        <form onSubmit={handleAdd} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 accent-blue-500"
              />

              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`flex-1 text-lg ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => handleEdit(todo.id, todo.title)}
                    className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No todos yet. Add one above!</p>
        )}

        <div className="mt-8 text-center text-gray-500">
          <p>Total: {todos.length} | Completed: {todos.filter((t) => t.completed).length}</p>
        </div>
      </div>
    </div>
  );
}
