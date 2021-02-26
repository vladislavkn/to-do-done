import React from "react";
import TodoList from "../components/TodoList";
import useStore from "../store";
import { sortedTodayTodosSelector } from "../store/selectors";

const TodayTodoListPage = () => {
  const todos = useStore(sortedTodayTodosSelector);

  return <TodoList todos={todos} />;
};

export default TodayTodoListPage;
