import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import useStore from "../store";
import { OverlayCallback } from "../types";
import Icon from "./Icon";

const Menu = () => {
  const openOverlay = useStore((state) => state.openOverlay);
  const addTodo = useStore((state) => state.addTodo);
  const createTodo: OverlayCallback = ({ closeOverlay, text }) => {
    if (text && text.length > 0) {
      addTodo({ title: text });
      closeOverlay();
    }
  };
  const showTodoOverlay = () =>
    openOverlay({
      placeholder: "New todo",
      submit: createTodo,
      buttonsGroups: [
        {
          selectable: false,
          buttons: [
            {
              buttonText: "Add",
              iconProps: {
                name: "add",
                width: 16,
                height: 16,
              },
              fn: createTodo,
            },
          ],
        },
      ],
    });

  return (
    <View style={styles.container}>
      <Icon name="dailyDisabled" width={24} height={24} />
      <Icon
        style={styles.button}
        onPress={showTodoOverlay}
        name="create"
        width={56}
        height={56}
      />
      <Icon name="categoriesDisabled" width={19} height={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    backgroundColor: "#FBFBFB",
    borderTopColor: "#CCCCCC",
    borderTopWidth: 1,
  },
  button: {
    position: "absolute",
    left: (Dimensions.get("screen").width - 56) / 2,
    top: -28,
  },
});

export default Menu;
