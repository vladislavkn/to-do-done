import React from "react";
import TodoList from "../components/TodoList";
import { useDailyTodos } from "../store/dailyTodos";

const TodayTodoListPage = () => {
  const todos = useDailyTodos((store) => store.todos);
  const editTodo = useDailyTodos((store) => store.editTodo);
  const removeTodo = useDailyTodos((store) => store.removeTodo);

  return (
    <TodoList items={todos} onChange={editTodo} onItemLongPress={removeTodo} />
  );
};

export default TodayTodoListPage;
