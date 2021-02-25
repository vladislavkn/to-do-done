import { State, Todo } from "../types";

export const hasOverlaysSelector = (state: State): boolean =>
  state.overlays.length > 0;

export const currentOverlaySelector = (state: State) =>
  state.overlays[state.overlays.length - 1];

export const categorizedTodosSelector = (name: string) => (state: State) => {
  const categoryId = state.categories.find((c) => c.name === name)?.id ?? "";
  return state.todos.filter((t) => t?.categoryId === categoryId);
};

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

export const currentCategoryNameSelector = (state: State) =>
  state.categories.find((c) => c.id === state.selectedCategoryId)?.name;

export const selectedCategorySortedTodosSelector = (state: State) =>
  sortedCategorizedTodosSelector(currentCategoryNameSelector(state) ?? "")(
    state
  );
