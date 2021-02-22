import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import useStore from "../store";
import { OverlayCallback } from "../types";
import { showCreateTodoOverlay } from "../utils";
import Icon from "./Icon";

const Menu = () => {
  const state = useStore();

  return (
    <View style={styles.container}>
      <Icon name="dailyDisabled" width={24} height={24} />
      <Icon
        style={styles.button}
        onPress={() => showCreateTodoOverlay(state)}
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
