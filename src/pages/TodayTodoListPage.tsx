import React from "react";
import TodoList from "../components/TodoList";
import useStore from "../store";
import { Todo } from "../types";

const TodayTodoListPage = () => {
  const todos = useStore((store) =>
    store.todos.filter((t) => t.category === "daily")
  );
  const updateTodo = useStore((store) => store.updateTodo);
  const removeTodo = useStore((store) => store.removeTodo);

  const onItemPress = (todo: Todo) => {
    todo.done = !todo.done;
    updateTodo(todo);
  };

  return (
    <TodoList
      items={todos}
      onItemPress={onItemPress}
      onItemLongPress={removeTodo}
    />
  );
};

export default TodayTodoListPage;
