import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import Icon from "./Icon";

export type todoItem = {
  title: string;
  duration: number;
  from: number;
  to: number;
  done: boolean;
  id: string;
  time: string;
};

type TodoListItemProps = {
  onChange: (value: boolean) => void;
  onLongPress: () => void;
  title: string;
  done: boolean;
  time: string;
};

const TodoListItem: React.FC<TodoListItemProps> = ({
  onChange,
  title,
  time,
  done,
  onLongPress,
}) => (
  <TouchableNativeFeedback
    onPress={() => onChange(!done)}
    onLongPress={onLongPress}
  >
    <View style={styles.container}>
      <View style={styles.button}>
        <Icon name={done ? "done" : "undone"} width={24} height={24} />
      </View>
      <View>
        <Text style={[styles.title, done && styles.done]}>{title}</Text>
        <Text style={styles.subtitle}>{time}</Text>
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
