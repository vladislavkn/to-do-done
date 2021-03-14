import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";

import useStore from "../store";
import Icon from "../../common/components/Icon";
import { showAddTodoModal } from "../../modal/modals";

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
      <View style={styles.AddButtonWrapper}>
        <TouchableWithoutFeedback
          onPressIn={() => showAddTodoModal(screen === "TodayTodoListPage")}
        >
          <Icon name="create" width={56} height={56} />
        </TouchableWithoutFeedback>
      </View>
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
  AddButtonWrapper: {
    zIndex: 1,
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
