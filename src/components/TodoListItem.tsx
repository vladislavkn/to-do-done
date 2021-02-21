import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { Todo } from "../types";
import Icon from "./Icon";

interface TodoListItemProps {
  onPress: () => void;
  onLongPress: () => void;
  todo: Todo;
}

const TodoListItem = ({ onPress, onLongPress, todo }: TodoListItemProps) => (
  <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress}>
    <View style={styles.container}>
      <View style={styles.button}>
        <Icon name={todo.done ? "done" : "undone"} width={24} height={24} />
      </View>
      <View>
        <Text style={[styles.title, todo.done && styles.done]}>
          {todo.title}
        </Text>
        {todo.time ? <Text style={styles.subtitle}>{todo.time}</Text> : null}
      </View>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  button: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 8,
    color: "#555",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "#999",
  },
  done: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#999",
  },
});

export default TodoListItem;
