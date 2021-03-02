import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import useStore from "../store";
import { currentOverlaySelector } from "../store/selectors";
import { OverlayCallback, StringKeyedObject } from "../types";
import Icon from "./Icon";
import OverlayInput from "./OverlayInput";
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

const initialValues: StringKeyedObject = {
  text: { text: "" },
  time: { minutes: "0", hours: "0" },
  none: {},
};

const Overlay = () => {
  const overlay = useStore(currentOverlaySelector);
  const [setOverlayPayload, closeOverlay] = useStore((state) => [
    state.setOverlayPayload,
    state.closeOverlay,
  ]);

  const inputType = overlay.inputType ?? "none";
  const hasInitialValue = Object.keys(overlay.initialValue).length > 0;
  const getInitialValue = () =>
    hasInitialValue ? overlay.initialValue : initialValues[inputType];

  const [selectedButtons, setSelectedButtons] = useState<SelectedButtonState>(
    {}
  );
  const [value, setValue] = useState<StringKeyedObject>(getInitialValue());

  useEffect(() => {
    setValue(getInitialValue());
    setSelectedButtons({});
  }, [overlay.id]);

  const handleCallback = (fn?: OverlayCallback) =>
    fn &&
    fn({
      payload: { ...overlay.payload, value },
      setPayload: setOverlayPayload,
    });

  const handleButtonPress = (args: HandleButtonPressArgs) => {
    const { buttonText, groupIndex, fn } = args;

    if (overlay.buttonGroups[groupIndex].selectable) {
      setSelectedButtons((prevState) => ({
        [groupIndex]: prevState[groupIndex] === buttonText ? "" : buttonText,
      }));
    }

    handleCallback(fn);
  };

  const handleClose = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) {
      handleCallback(overlay?.submit);
      closeOverlay();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <OverlayInput
            inputType={inputType}
            value={value}
            onChange={setValue}
            onSubmitEditing={() => handleCallback(overlay?.submit)}
            placeholder={overlay.placeholder}
            placeholderTextColor="#999"
            selectionColor="rgba(85,85,85,0.2)"
            autoFocus={overlay.autofocus}
          />
          {overlay.buttonGroups.map((group, groupIndex) => (
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
  );
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
