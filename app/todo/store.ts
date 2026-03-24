"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (title: string) => void;
  editTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: crypto.randomUUID(), title, completed: false },
          ],
        })),
      editTodo: (id, title) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);
