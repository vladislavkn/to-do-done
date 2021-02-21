import create from "zustand";
import { State, Overlay } from "../types";
import { generateId } from "../utils";

const useStore = create<State>((set) => ({
  todos: [
    {
      title: "Do the homework",
      duration: 1000,
      from: 1000,
      time: "30min | 15:00-15:30",
      done: false,
      id: "0",
      category: "daily",
    },
    {
      title: "Do the homework",
      duration: 1000,
      from: 1000,
      time: "30min | 15:00-15:30",
      done: true,
      id: "1",
      category: "daily",
    },
    {
      title: "Wash the dishes, clean up...",
      duration: 1000,
      from: 1000,
      time: "1h 30min | 15:30-16:00",
      done: true,
      id: "2",
      category: "daily",
    },
  ],
  categories: ["daily"],
  overlays: [],
  openOverlay: (overlay) =>
    set((state) => {
      overlay.id = generateId();
      return {
        overlays: [...state.overlays, overlay as Overlay],
      };
    }),
  closeOverlay: () =>
    set((state) => ({
      overlays:
        state.overlays.length > 0
          ? state.overlays.slice(0, -1)
          : state.overlays,
    })),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
  removeTodo: (todo) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== todo.id) })),
}));

export default useStore;
