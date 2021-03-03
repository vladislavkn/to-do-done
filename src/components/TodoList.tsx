import React from "react";
import { StyleSheet, View, Text } from "react-native";
import useStore from "../store";
import { Todo } from "../types";
import { showEditTodoModal } from "../modals";
import TodoListItem from "./TodoListItem";

type TodoListProps = {
  todos: Todo[];
};

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const updateTodo = useStore((state) => state.updateTodo);

  const handleChange = (todo: Todo) => {
    todo.done = !todo.done;
    updateTodo(todo);
  };

  const handlePress = (todo: Todo) => showEditTodoModal(todo);

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
      {todos.length == 0 && (
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Time has come.</Text>
          <Text style={styles.text}>Start planning!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  textWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  text: {
    color: "#999",
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
  },
});

export default TodoList;
