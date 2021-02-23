import React, { useState } from "react";
import TodoList from "../components/TodoList";
import useStore from "../store";
import { sortedCategorizedTodosSelector } from "../store/selectors";

const categorizedTodosPage = () => {
  const [category, setCategory] = useState<string>("daily");
  const todos = useStore(sortedCategorizedTodosSelector(category));

  return <TodoList todos={todos} />;
};

export default categorizedTodosPage;
