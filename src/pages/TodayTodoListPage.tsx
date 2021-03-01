import React from "react";
import { ScrollView } from "react-native";
import TodoList from "../components/TodoList";
import useStore from "../store";
import { sortedTodayTodosSelector } from "../store/selectors";

const TodayTodoListPage = () => {
  const todos = useStore(sortedTodayTodosSelector);

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <TodoList todos={todos} />
    </ScrollView>
  );
};

export default TodayTodoListPage;
