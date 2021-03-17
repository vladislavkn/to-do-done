import React from "react";
import { ScrollView } from "react-native";
import useStore from "@/app/store";
import { sortedTodayTodosSelector } from "@/app/selectors";
import TodoList from "@/todolist";

const TodayTodoListPage: React.FC = () => {
  const todos = useStore(sortedTodayTodosSelector);

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <TodoList todos={todos} />
    </ScrollView>
  );
};

export default TodayTodoListPage;
