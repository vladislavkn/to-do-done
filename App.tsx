import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Navigation from "./src/components/Navigation";
import Menu from "./src/components/Menu";
import Overlay from "./src/components/Overlay";
import TodayTodoListPage from "./src/pages/TodayTodoListPage";
import CategorizedTodosPage from "./src/pages/CategorizedTodosPage";
import RouterView from "./src/components/RouterView";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Navigation />
      <RouterView
        routes={{ TodayTodoListPage, CategorizedTodosPage }}
        initial="TodayTodoListPage"
      />
      <Overlay />
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    maxHeight: Dimensions.get("screen").height,
  },
});
