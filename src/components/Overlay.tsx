import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import useStore from "../store";
import {
  currentOverlaySelector,
  hasOverlaysSelector,
} from "../store/selectors";
import {
  Overlay as OverlayType,
  OverlayCallback,
  StringKeyedObject,
} from "../types";
import Icon from "./Icon";
import OverlayTextInput from "./OverlayTextInput";
import OverlayTimeInput from "./OverlayTimeInput";

type HandleButtonPressArgs = {
  buttonText: string;
  groupIndex: number;
  fn: OverlayCallback;
};

type SelectedButtonState = {
  [key: number]: string;
};

const getInitialValue = (inputType: OverlayType["inputType"]) =>
  inputType === "text"
    ? { text: "" }
    : {
        minutes: "0",
        hours: "0",
      };

const Overlay = () => {
  const hasOverlays = useStore(hasOverlaysSelector);
  const overlay = useStore(currentOverlaySelector);
  const [setOverlayPayload, closeOverlay] = useStore((state) => [
    state.setOverlayPayload,
    state.closeOverlay,
  ]);
  const inputType = overlay?.inputType ?? "text";

  const [selectedButtons, setSelectedButtons] = useState<SelectedButtonState>(
    {}
  );
  const [value, setValue] = useState<StringKeyedObject>(
    getInitialValue(inputType)
  );

  useEffect(() => {
    setValue(overlay?.initialValue ?? getInitialValue(inputType));
    setSelectedButtons({});
  }, [overlay?.id]);

  const handleCallback = (fn: OverlayCallback) =>
    fn({
      payload: { ...overlay?.payload, value },
      setPayload: setOverlayPayload,
    });

  const handleButtonPress = (args: HandleButtonPressArgs) => {
    const { buttonText, groupIndex, fn } = args;

    if (overlay.buttonsGroups[groupIndex].selectable) {
      setSelectedButtons((prevState) => ({
        [groupIndex]: prevState[groupIndex] === buttonText ? "" : buttonText,
      }));
    }

    handleCallback(fn);
  };

  return hasOverlays ? (
    <TouchableWithoutFeedback
      onPress={(e) => e.target === e.currentTarget && closeOverlay()}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {inputType === "text" ? (
            <OverlayTextInput
              value={value}
              onChange={setValue}
              onSubmitEditing={() => handleCallback(overlay.submit)}
              placeholder={overlay.placeholder}
              placeholderTextColor="#999"
              selectionColor="rgba(85,85,85,0.2)"
            />
          ) : (
            <OverlayTimeInput
              value={value}
              onChange={setValue}
              onSubmitEditing={() => handleCallback(overlay.submit)}
              placeholderTextColor="#999"
              selectionColor="rgba(85,85,85,0.2)"
            />
          )}
          {overlay?.buttonsGroups?.map((group, groupIndex) => (
            <ScrollView
              contentContainerStyle={styles.group}
              key={groupIndex}
              keyboardShouldPersistTaps="always"
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              {group.buttons.map(
                ({ buttonText, iconProps = null, fn }, buttonIndex) => (
                  <TouchableNativeFeedback
                    key={buttonText}
                    onPress={() =>
                      handleButtonPress({ buttonText, groupIndex, fn })
                    }
                  >
                    <View
                      style={[
                        styles.button,
                        selectedButtons[groupIndex] === buttonText &&
                          styles.selectedButton,
                        buttonIndex !== group.buttons.length - 1 && {
                          marginRight: 16,
                        },
                      ]}
                    >
                      {iconProps ? (
                        <Icon style={styles.icon} {...iconProps} />
                      ) : null}
                      <Text style={styles.buttonText}>{buttonText}</Text>
                    </View>
                  </TouchableNativeFeedback>
                )
              )}
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
  group: {
    paddingLeft: 16,
    marginBottom: 16,
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    borderColor: "#f0f0f0",
    borderWidth: 1,
  },
  selectedButton: {
    borderColor: "#999",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
    color: "#999",
  },
  icon: {
    marginRight: 8,
  },
});

export default Overlay;
