import React, { useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import useStore from "../store";

const Overlay = () => {
  const hasOverlays = useStore((state) => state.overlays.length > 0);
  const closeOverlay = useStore((state) => state.closeOverlay);
  const overlay = useStore(
    (state) => state.overlays[state.overlays.length - 1]
  );
  const [text, setText] = useState("");

  return hasOverlays ? (
    <TouchableWithoutFeedback onPress={closeOverlay}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder={overlay.placeholder}
            placeholderTextColor="#999"
            selectionColor="rgba(85,85,85,0.2)"
          />
          {overlay.buttonsGroups.map((group, index) => (
            <ScrollView style={styles.group} key={index} horizontal>
              {Object.entries(group).map(([buttonText, fn]) => (
                <View key={buttonText} style={styles.button}>
                  <TouchableNativeFeedback onPress={() => fn({ text })}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                  </TouchableNativeFeedback>
                </View>
              ))}
              <View style={{ width: 24 }}></View>
            </ScrollView>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  backdrop: {
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingBottom: 16,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: 8,
    shadowRadius: 4,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowColor: "#000",
    elevation: 7,
  },
  input: {
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    color: "#555",
  },
  group: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    color: "#999",
  },
});

export default Overlay;
