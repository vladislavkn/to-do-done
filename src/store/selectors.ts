import { ModalState, State } from "../types";
import { getCurrentHoursAndMinutes, sortTodos } from "../utils";

export const hasOverlaysSelector = (state: State): boolean =>
  state.overlays.length > 0;

export const currentOverlaySelector = (state: State) =>
  state.overlays[state.overlays.length - 1];

export const sortedTodayTodosSelector = (state: State) =>
  sortTodos(state.todos.filter((t) => t.today));

export const categorizedTodosSelector = (name: string | undefined) => (
  state: State
) => {
  if (!name) return [];
  const categoryId = state.categories.find((c) => c.name === name)?.id ?? "";
  return state.todos.filter((t) => t?.categoryId === categoryId);
};

export const endTimeSelector = (state: State) => {
  const todos = sortedTodayTodosSelector(state);

  if (todos.length === 0) return getCurrentHoursAndMinutes().getTime();
  const lastTodo = todos[todos.length - 1];

  return lastTodo.from + lastTodo.duration;
};

export const currentCategoryNameSelector = (state: State) =>
  state.categories.find((c) => c.id === state.selectedCategoryId)?.name;

export const selectedCategorySortedTodosSelector = (state: State) =>
  sortTodos(
    categorizedTodosSelector(currentCategoryNameSelector(state))(state)
  );

/* ModalState */

export const hasModalsSelector = (state: ModalState) => state.stack.length > 0;
export const topModalSelector = (state: ModalState) =>
  state.stack[state.stack.length - 1];
