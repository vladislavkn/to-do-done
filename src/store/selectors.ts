import { State, Todo } from "../types";

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
  const todos = sortedCategorizedTodosSelector("daily")(state);

  if (todos.length === 0) return Date.now();
  const lastTodo = todos[todos.length - 1];

  return lastTodo.from + lastTodo.duration;
};