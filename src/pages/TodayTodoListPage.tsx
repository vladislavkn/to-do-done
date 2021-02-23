import React from "react";
import TodoList from "../components/TodoList";
import useStore from "../store";
import { sortedCategorizedTodosSelector } from "../store/selectors";
const TodayTodoListPage = () => {
  const todos = useStore(sortedCategorizedTodosSelector("daily"));

  return <TodoList todos={todos} />;
};

export default TodayTodoListPage;
