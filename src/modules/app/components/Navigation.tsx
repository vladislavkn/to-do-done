import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import Icon from "@/common/components/Icon";
import { showOptionsModal } from "@/modal/modals";
import useStore from "../store";
import { getFormattedDate } from "@src/utils";

const Navigation: React.FC = () => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>
        {useStore((state) => state.screen) === "TodayTodoListPage"
          ? "Today"
          : "Categories"}
      </Text>
      <Text style={styles.subtitle}>{getFormattedDate()}</Text>
    </View>
    <TouchableNativeFeedback onPress={showOptionsModal}>
      <View style={styles.options}>
        <Icon name="options" width={6} height={24} />
      </View>
    </TouchableNativeFeedback>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    color: "#555",
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Montserrat_500Medium",
    color: "#999",
    fontSize: 18,
  },
  options: {
    paddingVertical: 4,
    paddingHorizontal: 13,
  },
});

export default Navigation;
