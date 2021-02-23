import React from "react";
import { StyleSheet, View } from "react-native";
import useStore from "../store";
import { Todo } from "../types";
import { showEditTodoOverlay } from "../utils";
import TodoListItem from "./TodoListItem";

type TodoListProps = {
  todos: Todo[];
};

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const state = useStore();

  const handleChange = (todo: Todo) => {
    todo.done = !todo.done;
    state.updateTodo(todo);
  };

  const handlePress = (todo: Todo) => showEditTodoOverlay(todo, state);

  return (
    <View style={styles.container}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onChange={() => handleChange(todo)}
          onPress={() => handlePress(todo)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});

export default TodoList;
