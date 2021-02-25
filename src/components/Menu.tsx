import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import useStore from "../store";
import { showAddTodoOverlay } from "../overlays";
import Icon from "./Icon";

const Menu = () => {
  const [navigate, screen] = useStore((state) => [
    state.navigate,
    state.screen,
  ]);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => navigate("TodayTodoListPage")}>
        <View style={styles.wrapper}>
          <Icon
            name={
              screen === "TodayTodoListPage" ? "dailyEnabled" : "dailyDisabled"
            }
            width={24}
            height={24}
          />
        </View>
      </TouchableNativeFeedback>
      <Icon
        style={styles.button}
        onPress={showAddTodoOverlay}
        name="create"
        width={56}
        height={56}
      />
      <TouchableNativeFeedback onPress={() => navigate("CategorizedTodosPage")}>
        <View style={styles.wrapper}>
          <Icon
            name={
              screen === "CategorizedTodosPage"
                ? "categoriesEnabled"
                : "categoriesDisabled"
            }
            width={19}
            height={24}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 48,
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
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default Menu;
