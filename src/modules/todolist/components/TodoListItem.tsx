import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { Todo } from "@src/types";
import Icon from "@/common/components/Icon";

interface TodoListItemProps {
  onChange: () => void;
  onPress: () => void;
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  onPress,
  onChange,
  todo,
}) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onChange}>
        <View style={styles.button}>
          <Icon name={todo.done ? "done" : "undone"} width={24} height={24} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.wrapper}>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={[
            styles.title,
            todo.done && styles.done,
            todo?.time?.length > 0 && { marginBottom: 8 },
          ]}
        >
          {todo.title}
        </Text>
        {todo?.time?.length > 0 ? (
          <Text style={styles.subtitle}>{todo.time}</Text>
        ) : null}
      </View>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingRight: 24,
    paddingLeft: 8,
  },
  wrapper: {
    flex: 1,
  },
  button: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
    color: "#555",
    maxWidth: "100%",
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
