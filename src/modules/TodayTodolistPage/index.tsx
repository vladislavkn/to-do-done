import React from "react";
import { ScrollView } from "react-native";
import useStore from "@/app/store";
import { sortedTodayTodosSelector } from "@/app/selectors";
import TodoList from "@/todolist/components/TodoList";

const TodayTodoListPage = () => {
  const todos = useStore(sortedTodayTodosSelector);

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <TodoList todos={todos} />
    </ScrollView>
  );
};

export default TodayTodoListPage;
