import React from "react";
import { StyleSheet, View } from "react-native";
import { Todo } from "../types";
import TodoListItem from "./TodoListItem";

type TodoListProps = {
  items: Todo[];
  onItemPress: (todo: Todo) => void;
  onItemLongPress: (todo: Todo) => void;
};

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  return (
    <View style={styles.container}>
      {props.items.map((item) => (
        <TodoListItem
          key={item.id}
          todo={item}
          onPress={() => props.onItemPress(item)}
          onLongPress={() => props.onItemLongPress(item)}
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
