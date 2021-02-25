import create from "zustand";
import { State, Overlay, Todo } from "../types";
import { generateId } from "../utils";
import { currentOverlaySelector } from "./selectors";

const useStore = create<State>((set) => ({
  todos: [],
  screen: "",
  categories: ["daily"],
  overlays: [],
  openOverlay: (overlay) =>
    set((state) => {
      overlay.id = generateId();
      overlay.payload = {};
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
  setOverlayPayload: (payload) =>
    set((state) => {
      const overlay = currentOverlaySelector(state);
      overlay.payload = {
        ...overlay.payload,
        ...payload,
      } as Overlay["payload"];
      return {
        overlays: state.overlays.map((o) =>
          o.id === overlay.id ? overlay : o
        ),
      };
    }),
  updateTodo: (todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    })),
  removeTodo: (todo) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== todo.id) })),
  addTodo: (todo) =>
    set((state) => ({ todos: [...state.todos, todo as Todo] })),
  navigate: (screen) => set(() => ({ screen })),
}));

export default useStore;