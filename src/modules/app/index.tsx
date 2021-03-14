import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Navigation from "./components/Navigation";
import RouterView from "./components/RouterView";
import ModalWrapper from "../modal";
import Menu from "./components/Menu";
import routes, { initialRoute } from "./routes";
import useFontsLoad from "./hooks/useFontsLoad";

export default function App() {
  const fontsLoaded = useFontsLoad();

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Navigation />
      <RouterView routes={routes} initial={initialRoute} />
      <ModalWrapper />
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
