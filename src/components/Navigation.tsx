import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useStore from "../store";
import { getFormattedDate } from "../utils";

const Navigation: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>
      {useStore((state) => state.screen) === "TodayTodoListPage"
        ? "Today"
        : "Categories"}
    </Text>
    <Text style={styles.subtitle}>{getFormattedDate()}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
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
});

export default Navigation;
