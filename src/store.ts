import create from "zustand";
import { State, Overlay, Todo } from "./types";
import { generateId } from "./utils";

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
}));

export const hasOverlaysSelector = (state: State): boolean =>
  state.overlays.length > 0;
export const currentOverlaySelector = (state: State) =>
  state.overlays[state.overlays.length - 1];
export const categorizedTodosSelector = (category: string) => (state: State) =>
  state.todos.filter((t) => t?.category === category);
export const sortedCategorizedTodosSelector = (category: string) => (
  state: State
) =>
  categorizedTodosSelector(category)(state).sort(
    (a: Todo, b: Todo) => a.from - b.from
  );
export const endTimeSelector = (state: State) => {
  const todos = categorizedTodosSelector("daily")(state);

  if (todos.length === 0) return Date.now();
  const lastTodo = todos[todos.length - 1];

  return lastTodo.from + lastTodo.duration;
};

export default useStore;
