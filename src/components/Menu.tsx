import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import useStore from "../store";
import Icon from "./Icon";

const Menu = () => {
  const openOverlay = useStore((store) => store.openOverlay);
  const showTodoOverlay = () =>
    openOverlay({
      placeholder: "New todo",
      buttonsGroups: [
        {
          add: (data) => alert(JSON.stringify(data)),
        },
        {
          test: () => alert("Hello!"),
          rest: () => alert("Hello!"),
          rete: () => alert("Hello!"),
          aersf: () => alert("Hello!"),
        },
      ],
    });

  return (
    <View style={styles.container}>
      <Icon name="dailyDisabled" width={24} height={24}></Icon>
      <Icon
        style={styles.button}
        onPress={showTodoOverlay}
        name="add"
        width={56}
        height={56}
      ></Icon>
      <Icon name="categoriesDisabled" width={19} height={24}></Icon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 56,
    flexDirection: "row",
    justifyContent: "space-between",
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
