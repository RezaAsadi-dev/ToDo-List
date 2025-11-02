import { create } from "zustand";

// این قسمت رو اگر zustand نصب نکردید، باید با npm install zustand نصب کنید
// اگر نمیخواید zustand نصب کنید، از همون پیاده‌سازی قبلی استفاده کنید

export const useTodoStore = create((set) => ({
  folders: [
    { id: "personal", name: "شخصی", color: "purple", collapsed: false },
    { id: "work", name: "کاری", color: "blue", collapsed: false },
    { id: "shopping", name: "خرید", color: "pink", collapsed: false },
  ],
  todos: [],

  // Folder actions
  addFolder: (name, color) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          id: Date.now().toString(),
          name,
          color,
          collapsed: false,
        },
      ],
    })),

  updateFolder: (id, name, color) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id ? { ...folder, name, color } : folder
      ),
    })),

  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
      todos: state.todos.filter((todo) => todo.folderId !== id),
    })),

  toggleFolder: (id) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id ? { ...folder, collapsed: !folder.collapsed } : folder
      ),
    })),

  // Todo actions
  addTodo: (text, description, folderId) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          text,
          description,
          folderId,
          completed: false,
        },
      ],
    })),

  updateTodo: (id, text, description, folderId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text, description, folderId } : todo
      ),
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));
