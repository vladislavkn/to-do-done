import React from "react";
import TodoList from "../components/TodoList";
import useStore, { categorizedTodosSelector } from "../store";
import { Todo } from "../types";
import { showEditTodoOverlay } from "../utils";

const TodayTodoListPage = () => {
  const state = useStore();
  const todos = useStore(categorizedTodosSelector("daily"));
  const updateTodo = useStore((store) => store.updateTodo);

  const onItemPress = (todo: Todo) => {
    todo.done = !todo.done;
    updateTodo(todo);
  };

  return (
    <TodoList
      items={todos}
      onItemPress={onItemPress}
      onItemLongPress={(todo) => showEditTodoOverlay(todo, state)}
    />
  );
};

export default TodayTodoListPage;
