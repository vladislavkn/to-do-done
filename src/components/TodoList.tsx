import React from "react";
import { StyleSheet, View } from "react-native";
import TodoListItem, { todoItem } from "./TodoListItem";

type TodoListProps = {
  items: todoItem[];
  onChange: (todo: todoItem) => void;
  onItemLongPress: (todo: todoItem) => void;
};

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const onChange = (item: todoItem, value: boolean): void => {
    item.done = value;
    props.onChange(item);
  };

  return (
    <View style={styles.container}>
      {props.items.map((item) => (
        <TodoListItem
          key={item.id}
          onChange={(value) => onChange(item, value)}
          onLongPress={() => props.onItemLongPress(item)}
          title={item.title}
          time={item.time}
          done={item.done}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});

export default TodoList;
